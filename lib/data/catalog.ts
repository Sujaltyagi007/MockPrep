import "server-only";
import { prisma } from "@/lib/prisma";
import { asLocalized } from "@/lib/i18n";
import { cacheLife, cacheTag } from "next/cache";
import type { Book, ExamMatch, JobGuide } from "@/lib/types";

const firstPublishedTest = {
  where: { status: "PUBLISHED" as const },
  orderBy: { publishedAt: "asc" as const },
  take: 1,
  select: { slug: true },
};

export async function getExamsForMatcher(): Promise<ExamMatch[]> {
  "use cache";
  cacheTag("exams");
  cacheLife("days");

  const exams = await prisma.exam.findMany({
    orderBy: { slug: "asc" },
    include: { tests: firstPublishedTest },
  });

  return exams.map((e) => ({
    slug: e.slug,
    name: asLocalized(e.name),
    summary: e.summary ? asLocalized(e.summary) : null,
    eligibleQuals: e.eligibleQuals,
    practiceTestId: e.tests[0]?.slug ?? null,
  }));
}

export async function getJobGuides(): Promise<JobGuide[]> {
  "use cache";
  cacheTag("jobs");
  cacheLife("hours");

  const jobs = await prisma.jobPosting.findMany({
    where: { status: "PUBLISHED", verifiedAt: { not: null } },
    orderBy: { publishedAt: "desc" },
    include: {
      steps: { orderBy: { position: "asc" } },
      documents: { orderBy: { position: "asc" } },
      exam: { select: { slug: true, tests: firstPublishedTest } },
    },
  });

  return jobs.map((j) => ({
    id: j.slug,
    examSlug: j.exam?.slug ?? null,
    title: asLocalized(j.title),
    organization: j.organization,
    eligibleQuals: j.eligibleQuals,
    ageLimit: asLocalized(j.ageLimit),
    officialUrl: j.officialUrl,
    steps: j.steps.map((s) => asLocalized(s.body)),
    documents: j.documents.map((d) => asLocalized(d.body)),
    practiceTestId: j.exam?.tests[0]?.slug ?? null,
  }));
}

export async function getBooks(): Promise<Book[]> {
  "use cache";
  cacheTag("books");
  cacheLife("days");

  const books = await prisma.book.findMany({
    orderBy: { title: "asc" },
    include: { exams: { select: { exam: { select: { eligibleQuals: true } } } } },
  });

  return books.map((b) => ({
    id: b.id,
    title: b.title,
    author: b.author,
    useFor: b.useFor,
    category: b.category,
    eligibleQuals: [...new Set(b.exams.flatMap((e) => e.exam.eligibleQuals))],
  }));
}
