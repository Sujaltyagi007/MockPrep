import type { Difficulty, DrillSubject, ExamCategory, Lang, Qualification, TestKind } from "@/lib/generated/prisma/enums";
export type { Difficulty, DrillSubject, ExamCategory, Lang, Qualification, TestKind };
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
  kind: TestKind;
  drillSubject: DrillSubject | null;
  difficulty: Difficulty | null;
  examName: string | null;
  sectionNames: string[];
  publishedAt: string | null;
};

export type Answers = Record<string, number>;

export type ExamMatch = {
  slug: string;
  name: LocalizedText;
  summary: LocalizedText | null;
  eligibleQuals: Qualification[];
  practiceTestId: string | null;
};

export type ExamListing = {
  slug: string;
  name: LocalizedText;
  summary: LocalizedText | null;
  conductingBody: string;
  category: ExamCategory;
  eligibleQuals: Qualification[];
  officialUrl: string | null;
  practiceTestId: string | null;
  mockCount: number;
  hasGuide: boolean;
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
