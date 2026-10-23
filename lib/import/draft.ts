// The test builder's working copy. Stored as JSON in TestDraft.data so a
// half-checked import (questions without answers, stray text) can be saved
// and resumed; publishing validates it with `publishProblems` first.
// Pure module: shared by the browser editor and the server actions.

import type { ExamCategory } from "@/lib/types";

export type DraftQuestion = {
  /** Stable key for React lists and edits. */
  key: string;
  /** Question row id once published; lets re-publishing update instead of duplicate. */
  dbId?: string;
  prompt: string;
  options: string[];
  answerIndex: number | null;
  explanation: string;
  section: string;
  /** The text this question was parsed from, shown to reviewers for checking. */
  source?: string;
  /** Ticked by the reviewer after checking it. */
  approved: boolean;
};

export type DraftData = {
  title: string;
  summary: string;
  category: ExamCategory;
  examSlug: string | null;
  durationMinutes: number;
  marksCorrect: number;
  /** Zero or negative. */
  marksWrong: number;
  featured: boolean;
  questions: DraftQuestion[];
  /** File names the questions came from, for reference. */
  sources: string[];
  /** Import notes for the reviewer, e.g. "the answer key has 48 answers for 50 questions". */
  warnings: string[];
};

export const DEFAULT_SECTION = "General";

export function newKey(): string {
  return `q-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function emptyQuestion(section = DEFAULT_SECTION): DraftQuestion {
  return { key: newKey(), prompt: "", options: ["", "", "", ""], answerIndex: null, explanation: "", section, approved: false };
}

/** About one minute per question, rounded up to the next 5 minutes. */
export function suggestedDuration(questionCount: number): number {
  return Math.max(5, Math.ceil(questionCount / 5) * 5);
}

export function newDraft(questions: DraftQuestion[], sources: string[] = [], warnings: string[] = []): DraftData {
  return {
    title: "",
    summary: "",
    category: "CIVIL",
    examSlug: null,
    durationMinutes: suggestedDuration(questions.length),
    marksCorrect: 1,
    marksWrong: 0,
    featured: true,
    questions,
    sources,
    warnings,
  };
}

/** Problems a reviewer must fix in one question before the test can go live. */
export function questionIssues(q: DraftQuestion): string[] {
  const issues: string[] = [];
  const filled = q.options.filter((o) => o.trim());
  if (!q.prompt.trim()) issues.push("Question text is empty.");
  if (filled.length < 2) issues.push("Add at least 2 options.");
  if (filled.length !== q.options.length) issues.push("Remove or fill the empty option.");
  if (q.answerIndex === null) issues.push("Choose the correct answer.");
  else if (q.answerIndex >= q.options.length || !q.options[q.answerIndex]?.trim()) issues.push("The chosen answer is empty.");
  // U+FFFD marks letters the PDF's font gave no text for (common with Hindi PDFs).
  if ([q.prompt, q.explanation, ...q.options].some((t) => t.includes("�"))) {
    issues.push("Some letters couldn't be read from the PDF (shown as �). Retype them from the original.");
  }
  return issues;
}

/** Everything blocking publication, in plain words for the checklist. Empty means ready. */
export function publishProblems(d: DraftData): string[] {
  const problems: string[] = [];
  if (!d.title.trim()) problems.push("Give the test a title.");
  if (d.questions.length === 0) problems.push("Add at least one question.");
  const broken = d.questions.filter((q) => questionIssues(q).length > 0).length;
  if (broken) problems.push(`${broken} question${broken === 1 ? " needs" : "s need"} fixing.`);
  const unchecked = d.questions.filter((q) => !q.approved).length;
  if (unchecked) problems.push(`${unchecked} question${unchecked === 1 ? " is" : "s are"} not approved yet.`);
  if (!(d.durationMinutes >= 1 && d.durationMinutes <= 600)) problems.push("Set a duration between 1 and 600 minutes.");
  if (!(d.marksCorrect > 0)) problems.push("Marks for a correct answer must be above 0.");
  if (d.marksWrong > 0) problems.push("Negative marking must be 0 or below.");
  return problems;
}

/** Sections in first-appearance order. */
export function sectionsOf(d: DraftData): string[] {
  return [...new Set(d.questions.map((q) => q.section.trim() || DEFAULT_SECTION))];
}

/**
 * Narrow untrusted JSON (from the database or a client request) to DraftData,
 * filling defaults. Throws on shapes that can't be repaired.
 */
export function parseDraftData(value: unknown): DraftData {
  if (!value || typeof value !== "object") throw new Error("Draft data is not an object");
  const v = value as Partial<DraftData>;
  if (!Array.isArray(v.questions)) throw new Error("Draft data has no questions array");
  const base = newDraft([]);
  return {
    ...base,
    ...v,
    title: String(v.title ?? ""),
    summary: String(v.summary ?? ""),
    durationMinutes: Number(v.durationMinutes ?? base.durationMinutes),
    marksCorrect: Number(v.marksCorrect ?? base.marksCorrect),
    marksWrong: Number(v.marksWrong ?? base.marksWrong),
    sources: Array.isArray(v.sources) ? v.sources.map(String) : [],
    warnings: Array.isArray(v.warnings) ? v.warnings.map(String) : [],
    questions: v.questions.map((q) => ({
      key: String(q?.key ?? newKey()),
      dbId: q?.dbId ? String(q.dbId) : undefined,
      prompt: String(q?.prompt ?? ""),
      options: Array.isArray(q?.options) ? q.options.map(String) : [],
      answerIndex: typeof q?.answerIndex === "number" ? q.answerIndex : null,
      explanation: String(q?.explanation ?? ""),
      section: String(q?.section ?? DEFAULT_SECTION),
      source: q?.source ? String(q.source) : undefined,
      approved: Boolean(q?.approved),
    })),
  };
}
