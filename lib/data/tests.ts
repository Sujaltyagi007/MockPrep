import "server-only";
import { prisma } from "@/lib/prisma";
import { asLocalized } from "@/lib/i18n";
import { cacheLife, cacheTag } from "next/cache";
import type { LocalizedText, MockTest, TestSummary } from "@/lib/types";
import type { QuestionTranslation } from "@/lib/generated/prisma/client";

export async function getFeaturedTests(): Promise<TestSummary[]> {
  "use cache";
  cacheTag("tests");
  cacheLife("hours");

  const tests = await prisma.test.findMany({
    where: { status: "PUBLISHED", featured: true },
    orderBy: { publishedAt: "asc" },
    include: { _count: { select: { questions: true } }, exam: { select: { eligibleQuals: true } } },
  });

  return tests.map((t) => ({
    id: t.slug,
    title: t.title,
    summary: t.summary,
    category: t.category,
    questionCount: t._count.questions,
    durationMinutes: t.durationMinutes,
    maxMarks: t._count.questions * t.marksCorrect,
    negativeMarks: t.marksWrong,
    bilingual: t.languages.includes("hi"),
    eligibleQuals: t.exam?.eligibleQuals ?? null,
  }));
}

export async function getPublishedTestSlugs(): Promise<string[]> {
  "use cache";
  cacheTag("tests");

  const tests = await prisma.test.findMany({ where: { status: "PUBLISHED" }, select: { slug: true } });
  return tests.map((t) => t.slug);
}

export async function getTestBySlug(slug: string): Promise<MockTest | null> {
  "use cache";
  cacheTag("tests", `test:${slug}`);
  cacheLife("hours");

  const test = await prisma.test.findUnique({
    where: { slug, status: "PUBLISHED" },
    include: {
      sections: { orderBy: { position: "asc" } },
      questions: {
        orderBy: { position: "asc" },
        include: { section: true, question: { include: { translations: true } } },
      },
    },
  });
  if (!test) return null;

  return {
    id: test.slug,
    title: test.title,
    category: test.category,
    summary: test.summary,
    durationMinutes: test.durationMinutes,
    marking: { correct: test.marksCorrect, wrong: test.marksWrong },
    languages: test.languages,
    sections: test.sections.map((s) => ({ id: s.key, name: asLocalized(s.name) })),
    questions: test.questions.map(({ question, section }) => {
      const en = question.translations.find((tr) => tr.lang === "en");
      if (!en) throw new Error(`Question ${question.id} has no English translation`);
      const others = question.translations.filter((tr) => tr.lang !== "en");
      const localize = (pick: (tr: QuestionTranslation) => string): LocalizedText =>
        Object.assign({ en: pick(en) }, ...others.map((tr) => ({ [tr.lang]: pick(tr) })));

      return {
        id: question.id,
        sectionId: section.key,
        prompt: localize((tr) => tr.prompt),
        options: en.options.map((_, i) => localize((tr) => tr.options[i] ?? en.options[i])),
        answerIndex: question.answerIndex,
        explanation: localize((tr) => tr.explanation),
      };
    }),
  };
}
