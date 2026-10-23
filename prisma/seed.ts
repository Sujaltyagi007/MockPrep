import "dotenv/config";
import { randomUUID } from "node:crypto";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";
import { books, exams, jobs } from "./seed-data/catalog";
import { tests } from "./seed-data/tests";
import type { SeedText } from "./seed-data/types";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

// Idempotent: content is keyed by slug and re-seeding replaces it, so this is
// safe to run after editing seed-data/.
async function main() {
  const examIds = new Map<string, string>();
  for (const e of exams) {
    const data = { ...e, officialUrl: e.officialUrl ?? null };
    const row = await prisma.exam.upsert({ where: { slug: e.slug }, create: data, update: data });
    examIds.set(e.slug, row.id);
  }

  for (const t of tests) {
    await seedTest(t, t.examSlug ? examIds.get(t.examSlug) : undefined);
  }

  for (const j of jobs) {
    const { examSlug, steps, documents, ...fields } = j;
    const data = { ...fields, examId: examIds.get(examSlug), status: "PUBLISHED" as const, verifiedAt: new Date(), publishedAt: new Date() };
    await prisma.jobPosting.deleteMany({ where: { slug: j.slug } });
    await prisma.jobPosting.create({
      data: {
        ...data,
        steps: { create: steps.map((body, i) => ({ position: i, body })) },
        documents: { create: documents.map((body, i) => ({ position: i, body })) },
      },
    });
  }

  for (const b of books) {
    const { examSlugs, ...fields } = b;
    const book = await prisma.book.upsert({
      where: { title_author: { title: b.title, author: b.author } },
      create: fields,
      update: fields,
    });
    for (const [position, slug] of examSlugs.entries()) {
      const examId = examIds.get(slug)!;
      await prisma.examBook.upsert({
        where: { examId_bookId: { examId, bookId: book.id } },
        create: { examId, bookId: book.id, position },
        update: { position },
      });
    }
  }

  console.log(`Seeded ${exams.length} exams, ${tests.length} tests, ${jobs.length} job guides, ${books.length} books.`);
}

async function seedTest(t: (typeof tests)[number], examId: string | undefined) {
  // Replacing the test cascades to sections and links; orphaned bank
  // questions from the previous seed are removed below.
  const previous = await prisma.test.findUnique({
    where: { slug: t.id },
    select: { questions: { select: { questionId: true } } },
  });
  if (previous) {
    await prisma.test.delete({ where: { slug: t.id } });
    await prisma.question.deleteMany({
      where: { id: { in: previous.questions.map((q) => q.questionId) }, tests: { none: {} }, answers: { none: {} } },
    });
  }

  await prisma.$transaction(async (tx) => {
    const test = await tx.test.create({
      data: {
        slug: t.id,
        examId,
        title: t.title,
        summary: t.summary,
        category: t.category,
        durationMinutes: t.durationMinutes,
        marksCorrect: t.marking.correct,
        marksWrong: t.marking.wrong,
        languages: t.languages,
        featured: true,
        status: "PUBLISHED",
        publishedAt: new Date(),
        sections: { create: t.sections.map((s, i) => ({ key: s.id, position: i, name: s.name })) },
      },
      include: { sections: true },
    });
    const sectionIds = new Map(test.sections.map((s) => [s.key, s.id]));

    // IDs are generated here so the three inserts can be batched: a remote
    // database would otherwise need one round trip per question.
    const rows = t.questions.map((q) => ({ id: randomUUID(), q }));

    await tx.question.createMany({
      data: rows.map(({ id, q }) => ({
        id,
        subject: q.sectionId,
        answerIndex: q.answerIndex,
        source: "original",
        status: "PUBLISHED" as const,
      })),
    });
    await tx.questionTranslation.createMany({
      data: rows.flatMap(({ id, q }) =>
        t.languages.map((lang) => ({
          questionId: id,
          lang,
          prompt: pick(q.prompt, lang),
          options: q.options.map((o) => pick(o, lang)),
          explanation: pick(q.explanation, lang),
          reviewedAt: new Date(),
        })),
      ),
    });
    await tx.testQuestion.createMany({
      data: rows.map(({ id, q }, position) => ({
        testId: test.id,
        sectionId: sectionIds.get(q.sectionId)!,
        questionId: id,
        position,
      })),
    });
  }, { timeout: 30_000 });
}

/** Options like "300 m" are language-neutral and only have `en`. */
function pick(text: SeedText, lang: keyof SeedText) {
  return text[lang] ?? text.en;
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
