import type { ExamCategory, Lang, LocalizedText, Qualification } from "./types";

export const languages: { code: Lang; label: string }[] = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
];

export function t(text: LocalizedText, lang: Lang): string {
  return text[lang] ?? text.en;
}

export function asLocalized(value: unknown): LocalizedText {
  if (value && typeof value === "object" && typeof (value as { en?: unknown }).en === "string") {
    return value as LocalizedText;
  }
  throw new Error(`Expected LocalizedText with an "en" key, got ${JSON.stringify(value)}`);
}

export const qualificationLabels: Record<Qualification, string> = {
  CLASS_10: "10th pass",
  CLASS_12: "12th pass",
  DIPLOMA: "Diploma",
  GRADUATE: "Any graduate",
  BTECH: "B.Tech / MCA",
  POSTGRADUATE: "Postgraduate",
};

export const categoryLabels: Record<ExamCategory, string> = {
  CIVIL: "Civil & UPSC",
  BANKING_SSC: "Banking & SSC",
  RAILWAYS: "Railways",
  DEFENCE: "Defence",
  STATE_PSC: "State PSC",
  TECH: "Tech & IT",
  TEACHING: "Teaching",
};
