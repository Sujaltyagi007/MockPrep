import type { ExamCategory, Lang, Qualification } from "@/lib/generated/prisma/enums";
export type { ExamCategory, Lang, Qualification };
export type LocalizedText = { en: string } & Partial<Record<Exclude<Lang, "en">, string>>;

export type Section = {
  id: string;
  name: LocalizedText;
};

export type Question = {
  id: string;
  sectionId: string;
  prompt: LocalizedText;
  options: LocalizedText[];
  answerIndex: number;
  explanation: LocalizedText;
};

export type MockTest = {
  id: string;
  title: string;
  category: ExamCategory;
  summary: string;
  durationMinutes: number;
  marking: { correct: number; wrong: number };
  languages: Lang[];
  sections: Section[];
  questions: Question[];
};

export type TestSummary = {
  id: string;
  title: string;
  summary: string;
  category: ExamCategory;
  questionCount: number;
  durationMinutes: number;
  maxMarks: number;
  negativeMarks: number;
  bilingual: boolean;
  eligibleQuals: Qualification[] | null;
};

export type Answers = Record<string, number>;

export type ExamMatch = {
  slug: string;
  name: LocalizedText;
  summary: LocalizedText | null;
  eligibleQuals: Qualification[];
  practiceTestId: string | null;
};

export type JobGuide = {
  id: string;
  examSlug: string | null;
  title: LocalizedText;
  organization: string;
  eligibleQuals: Qualification[];
  ageLimit: LocalizedText;
  officialUrl: string;
  steps: LocalizedText[];
  documents: LocalizedText[];
  practiceTestId: string | null;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  useFor: string;
  category: ExamCategory;
  eligibleQuals: Qualification[];
};
