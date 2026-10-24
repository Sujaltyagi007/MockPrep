"use client";
import { useStoredValue } from "@/lib/local-store";

export type Progress = "new" | "in-progress" | "done";

export function useTestProgress(testId: string): Progress {
  const raw = useStoredValue(`mockprep:attempt:${testId}`);
  if (!raw) return "new";
  try {
    return (JSON.parse(raw) as { finishedAt?: number }).finishedAt === undefined ? "in-progress" : "done";
  } catch {
    return "new";
  }
}
