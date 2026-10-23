import "server-only";
import { asLocalized } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";
import { parseDraftData, type DraftData } from "@/lib/import/draft";

// Reads for the admin test builder. Always fresh (no "use cache"): editors
// must see their own latest saves. Callers render behind connection().

export type DraftSummary = {
  id: string;
  title: string;
  questionCount: number;
  updatedAt: string;
  /** Set when this draft edits a test that is already live. */
  liveSlug: string | null;
};

export async function listDrafts(): Promise<DraftSummary[]> {
  const drafts = await prisma.testDraft.findMany({
    orderBy: { updatedAt: "desc" },
    select: { id: true, title: true, questionCount: true, updatedAt: true, test: { select: { slug: true } } },
  });
  return drafts.map((d) => ({
    id: d.id,
    title: d.title,
    questionCount: d.questionCount,
    updatedAt: d.updatedAt.toISOString(),
    liveSlug: d.test?.slug ?? null,
  }));
}

export async function getDraft(id: string): Promise<{ id: string; data: DraftData; liveSlug: string | null } | null> {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  const draft = await prisma.testDraft.findUnique({ where: { id }, include: { test: { select: { slug: true } } } });
  if (!draft) return null;
  return { id: draft.id, data: parseDraftData(draft.data), liveSlug: draft.test?.slug ?? null };
}

export type ExamOption = { slug: string; name: string };

export async function getExamOptions(): Promise<ExamOption[]> {
  const exams = await prisma.exam.findMany({ orderBy: { slug: "asc" }, select: { slug: true, name: true } });
  return exams.map((e) => ({ slug: e.slug, name: asLocalized(e.name).en }));
}
