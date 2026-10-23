"use server";

import { randomUUID } from "node:crypto";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { asLocalized } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/lib/generated/prisma/client";
import { DEFAULT_SECTION, newDraft, parseDraftData, publishProblems, sectionsOf, type DraftData } from "@/lib/import/draft";

// Server Actions for the admin test builder.
// TODO(auth): /admin has no sign-in yet, so anyone who can reach these can
// change tests. Add a session/role check at the top of each action once auth exists.

const MAX_QUESTIONS = 500;

/** Validate untrusted editor state and keep it within sane sizes. */
function clean(input: unknown): DraftData {
  const data = parseDraftData(input);
  if (data.questions.length > MAX_QUESTIONS) throw new Error(`A test can have at most ${MAX_QUESTIONS} questions.`);
  const cap = (s: string, n: number) => s.slice(0, n);
  return {
    ...data,
    title: cap(data.title, 200),
    summary: cap(data.summary, 1000),
    questions: data.questions.map((q) => ({
      ...q,
      prompt: cap(q.prompt, 5000),
      options: q.options.slice(0, 6).map((o) => cap(o, 1000)),
      explanation: cap(q.explanation, 5000),
      section: cap(q.section, 80),
      source: q.source ? cap(q.source, 1500) : undefined,
    })),
  };
}

const json = (data: DraftData) => data as unknown as Prisma.InputJsonValue;

export async function createDraft(input: unknown): Promise<{ id: string }> {
  const data = clean(input);
  const draft = await prisma.testDraft.create({
    data: { title: data.title, questionCount: data.questions.length, data: json(data) },
  });
  return { id: draft.id };
}

export async function saveDraft(id: string, input: unknown): Promise<{ savedAt: string }> {
  const data = clean(input);
  const draft = await prisma.testDraft.update({
    where: { id },
    data: { title: data.title, questionCount: data.questions.length, data: json(data) },
  });
  return { savedAt: draft.updatedAt.toISOString() };
}

export async function deleteDraft(id: string): Promise<void> {
  await prisma.testDraft.delete({ where: { id } });
  redirect("/admin/tests");
}

/** Open a live test in the builder (reusing its draft if one is already open). */
export async function editTest(testId: string): Promise<void> {
  const existing = await prisma.testDraft.findUnique({ where: { testId }, select: { id: true } });
  if (existing) redirect(`/admin/tests/drafts/${existing.id}`);

  const test = await prisma.test.findUniqueOrThrow({
    where: { id: testId },
    include: {
      exam: { select: { slug: true } },
      questions: {
        orderBy: { position: "asc" },
        include: { section: true, question: { include: { translations: { where: { lang: "en" } } } } },
      },
    },
  });

  const data: DraftData = {
    ...newDraft([]),
    title: test.title,
    summary: test.summary,
    category: test.category,
    examSlug: test.exam?.slug ?? null,
    durationMinutes: test.durationMinutes,
    marksCorrect: test.marksCorrect,
    marksWrong: test.marksWrong,
    featured: test.featured,
    questions: test.questions.map(({ question, section }) => {
      const en = question.translations[0];
      return {
        key: question.id,
        dbId: question.id,
        prompt: en?.prompt ?? "",
        options: en?.options ?? [],
        answerIndex: question.answerIndex,
        explanation: en?.explanation ?? "",
        section: asLocalized(section.name).en,
        approved: true, // already live, so already checked
      };
    }),
  };

  const draft = await prisma.testDraft.create({
    data: { testId: test.id, title: data.title, questionCount: data.questions.length, data: json(data) },
  });
  redirect(`/admin/tests/drafts/${draft.id}`);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "");
}

type PublishResult = { ok: true; slug: string } | { ok: false; problems: string[] };

/** Validate a draft and write it as a live test (creating it, or updating the test it edits). */
export async function publishDraft(id: string): Promise<PublishResult> {
  const draft = await prisma.testDraft.findUnique({ where: { id } });
  if (!draft) return { ok: false, problems: ["This draft no longer exists."] };

  const data = clean(draft.data);
  const problems = publishProblems(data);
  if (problems.length) return { ok: false, problems };

  const exam = data.examSlug ? await prisma.exam.findUnique({ where: { slug: data.examSlug }, select: { id: true } }) : null;

  // Section keys must be unique within a test.
  const sectionKeys = new Map<string, string>();
  for (const name of sectionsOf(data)) {
    const base = slugify(name) || "section";
    let key = base;
    for (let n = 2; [...sectionKeys.values()].includes(key); n++) key = `${base}-${n}`;
    sectionKeys.set(name, key);
  }
  const sectionOf = (name: string) => name.trim() || DEFAULT_SECTION;

  const slug = await prisma.$transaction(
    async (tx) => {
      const fields = {
        title: data.title.trim(),
        summary: data.summary.trim(),
        category: data.category,
        examId: exam?.id ?? null,
        durationMinutes: Math.round(data.durationMinutes),
        marksCorrect: data.marksCorrect,
        marksWrong: data.marksWrong,
        featured: data.featured,
        status: "PUBLISHED" as const,
      };

      let testId: string;
      let testSlug: string;
      let previousQuestionIds: string[] = [];

      if (draft.testId) {
        const previous = await tx.testQuestion.findMany({ where: { testId: draft.testId }, select: { questionId: true } });
        previousQuestionIds = previous.map((p) => p.questionId);
        await tx.testSection.deleteMany({ where: { testId: draft.testId } }); // cascades to TestQuestion
        const test = await tx.test.update({ where: { id: draft.testId }, data: fields });
        testId = test.id;
        testSlug = test.slug;
      } else {
        const base = slugify(data.title) || "test";
        const taken = new Set((await tx.test.findMany({ where: { slug: { startsWith: base } }, select: { slug: true } })).map((t) => t.slug));
        testSlug = base;
        for (let n = 2; taken.has(testSlug); n++) testSlug = `${base}-${n}`;
        const test = await tx.test.create({ data: { ...fields, slug: testSlug, languages: ["en"], publishedAt: new Date() } });
        testId = test.id;
      }

      const sectionIds = new Map([...sectionKeys].map(([name]) => [name, randomUUID()]));
      await tx.testSection.createMany({
        data: [...sectionKeys].map(([name, key], position) => ({ id: sectionIds.get(name)!, testId, key, position, name: { en: name } })),
      });

      // Questions that already exist are updated in place (attempt history
      // points at them); new ones are created in one batch.
      // One read for all of them, then writes only where something changed,
      // so re-publishing a large test after a small fix stays fast.
      const current = await tx.question.findMany({
        where: { id: { in: data.questions.flatMap((q) => (q.dbId ? [q.dbId] : [])) } },
        select: { id: true, answerIndex: true, subject: true, translations: { where: { lang: "en" } } },
      });
      const existing = new Map(current.map((c) => [c.id, c]));
      const ids = data.questions.map((q) => (q.dbId && existing.has(q.dbId) ? q.dbId : randomUUID()));
      const fresh = data.questions.map((q, i) => ({ q, id: ids[i] })).filter(({ q, id }) => q.dbId !== id);

      for (const [i, q] of data.questions.entries()) {
        const before = existing.get(ids[i]);
        if (!before) continue;
        const subject = sectionKeys.get(sectionOf(q.section))!;
        if (before.answerIndex !== q.answerIndex || before.subject !== subject) {
          await tx.question.update({ where: { id: ids[i] }, data: { answerIndex: q.answerIndex!, subject } });
        }
        const en = before.translations[0];
        const changed = !en || en.prompt !== q.prompt || en.explanation !== q.explanation || en.options.join("\u0001") !== q.options.join("\u0001");
        if (changed) {
          await tx.questionTranslation.upsert({
            where: { questionId_lang: { questionId: ids[i], lang: "en" } },
            create: { questionId: ids[i], lang: "en", prompt: q.prompt, options: q.options, explanation: q.explanation, reviewedAt: new Date() },
            update: { prompt: q.prompt, options: q.options, explanation: q.explanation, reviewedAt: new Date() },
          });
          // Other languages no longer match the edited English; the test falls back to English for this question.
          await tx.questionTranslation.deleteMany({ where: { questionId: ids[i], lang: { not: "en" } } });
        }
      }

      await tx.question.createMany({
        data: fresh.map(({ q, id }) => ({
          id,
          subject: sectionKeys.get(sectionOf(q.section))!,
          answerIndex: q.answerIndex!,
          source: "import",
          status: "PUBLISHED" as const,
        })),
      });
      await tx.questionTranslation.createMany({
        data: fresh.map(({ q, id }) => ({ questionId: id, lang: "en" as const, prompt: q.prompt, options: q.options, explanation: q.explanation, reviewedAt: new Date() })),
      });
      await tx.testQuestion.createMany({
        data: data.questions.map((q, position) => ({ testId, questionId: ids[position], sectionId: sectionIds.get(sectionOf(q.section))!, position })),
      });

      // Questions dropped from the test: delete if nothing else uses them.
      const dropped = previousQuestionIds.filter((qid) => !ids.includes(qid));
      if (dropped.length) {
        await tx.question.deleteMany({ where: { id: { in: dropped }, tests: { none: {} }, answers: { none: {} } } });
      }

      await tx.testDraft.delete({ where: { id } });
      return testSlug;
    },
    { timeout: 60_000 },
  );

  // Show the change immediately on the site and in admin.
  for (const tag of ["tests", `test:${slug}`, "exams", "jobs"]) updateTag(tag);
  return { ok: true, slug };
}
