import type { ExamCategory, Lang, Qualification } from "../../lib/generated/prisma/enums";

export type SeedText = { en: string } & Partial<Record<Exclude<Lang, "en">, string>>;

export type SeedTest = {
  id: string; // becomes Test.slug
  examSlug?: string;
  title: string;
  category: ExamCategory;
  summary: string;
  durationMinutes: number;
  marking: { correct: number; wrong: number };
  languages: Lang[];
  sections: { id: string; name: SeedText }[];
  questions: {
    id: string;
    sectionId: string;
    prompt: SeedText;
    options: SeedText[];
    answerIndex: number;
    explanation: SeedText;
  }[];
};

export type SeedExam = {
  slug: string;
  name: SeedText;
  conductingBody: string;
  category: ExamCategory;
  eligibleQuals: Qualification[];
  officialUrl?: string;
  summary: SeedText;
};

export type SeedJob = {
  slug: string;
  examSlug: string;
  title: SeedText;
  organization: string;
  eligibleQuals: Qualification[];
  ageLimit: SeedText;
  officialUrl: string;
  steps: SeedText[];
  documents: SeedText[];
};

export type SeedBook = {
  title: string;
  author: string;
  useFor: string;
  category: ExamCategory;
  examSlugs: string[];
};
