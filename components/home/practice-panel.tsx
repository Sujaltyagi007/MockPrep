"use client";
import { cn } from "@/lib/utils";
import type { TestSummary } from "@/lib/types";
import { usePersonalized } from "./personalize";
import { useStoredValue } from "@/lib/local-store";
import { ButtonLink } from "@/components/ui/button";

type Progress = "new" | "in-progress" | "done";

function useTestProgress(testId: string): Progress {
  const raw = useStoredValue(`mockprep:attempt:${testId}`);
  if (!raw) return "new";
  try {
    return (JSON.parse(raw) as { finishedAt?: number }).finishedAt === undefined ? "in-progress" : "done";
  } catch {
    return "new";
  }
}

const progressUi = {
  "new": { action: "Start", variant: "primary", badge: null },
  "in-progress": { action: "Resume", variant: "success", badge: "In progress" },
  "done": { action: "See result", variant: "outline", badge: "Done" },
} as const;

export function PracticePanel({ tests }: { tests: TestSummary[] }) {
  const { items, notice } = usePersonalized(tests, (t) => t.eligibleQuals);

  return (
    <div className="space-y-4">
      {notice}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((test) => (
          <TestCard key={test.id} test={test} />
        ))}
      </ul>
    </div>
  );
}

function TestCard({ test }: { test: TestSummary }) {
  const progress = progressUi[useTestProgress(test.id)];

  return (
    <li className="flex flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      {progress.badge && (
        <span className={cn("mb-3 w-fit rounded-full px-2.5 py-1 text-xs font-semibold", progress.badge === "Done" ? "bg-navy-50 text-navy-800" : "bg-amber-100 text-amber-800")}>
          {progress.badge}
        </span>
      )}
      <h3 className="font-semibold leading-snug text-navy-950">{test.title}</h3>
      <p className="mt-2 flex-1 text-sm text-slate-500">
        {test.questionCount} questions · {test.durationMinutes} min{test.bilingual && " · EN / हिंदी"}
      </p>
      <ButtonLink href={`/test/${test.id}`} variant={progress.variant} shape="pill" className="mt-6">
        {progress.action}
      </ButtonLink>
    </li>
  );
}
