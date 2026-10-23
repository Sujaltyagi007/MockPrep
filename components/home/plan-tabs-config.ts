import { BookOpen, Compass, FileCheck, Timer } from "lucide-react";

export const planTabs = [
  { id: "exams", label: "Exams", icon: Compass },
  { id: "practice", label: "Practice", icon: Timer },
  { id: "apply", label: "Apply", icon: FileCheck },
  { id: "books", label: "Books", icon: BookOpen },
] as const;

export type PlanTabId = (typeof planTabs)[number]["id"];

export function tabFromHash(hash: string): PlanTabId | null {
  if (hash.startsWith("#guide-")) return "apply";
  return planTabs.find((t) => `#${t.id}` === hash)?.id ?? null;
}
