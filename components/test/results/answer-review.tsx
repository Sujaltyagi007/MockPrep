"use client";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Check, X } from "lucide-react";
import type { Answers, MockTest } from "@/lib/types";
import { ToggleChip } from "@/components/ui/toggle-chip";
import { usePreferences } from "@/context/preferences-context";

const filters = [
  { id: "all", label: "All" },
  { id: "correct", label: "Correct" },
  { id: "wrong", label: "Wrong" },
  { id: "skipped", label: "Skipped" },
] as const;

type Filter = (typeof filters)[number]["id"];

export function AnswerReview({ test, answers }: { test: MockTest; answers: Answers }) {
  const { lang } = usePreferences();
  const [filter, setFilter] = useState<Filter>("all");

  const reviewed = test.questions.map((q, i) => ({ q, n: i + 1, chosen: answers[q.id] })).filter(({ q, chosen }) => {
    if (filter === "correct") return chosen === q.answerIndex;
    if (filter === "skipped") return chosen === undefined;
    if (filter === "wrong") return chosen !== undefined && chosen !== q.answerIndex;
    return true;
  });

  return (
    <section aria-labelledby="review-title" className="result-enter mt-6 [animation-delay:180ms]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id="review-title" className="font-semibold text-ink">Review answers</h2>
          <p className="mt-1 text-sm text-slate-600">Check the correct answer and explanation for each question.</p>
        </div>
        <div className="flex gap-2" role="group" aria-label="Filter questions">
          {filters.map((f) => (
            <ToggleChip key={f.id} active={filter === f.id} aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
              {f.label}
            </ToggleChip>
          ))}
        </div>
      </div>

      <ol className="mt-4 space-y-3">
        {reviewed.length === 0 && (
          <li className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-slate-600">Nothing here.</li>
        )}
        {reviewed.map(({ q, n, chosen }) => (
          <li key={q.id} className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="font-medium text-ink">
              <span className="text-slate-500">Q{n}.</span> {t(q.prompt, lang)}
            </p>
            <ul className="mt-3 space-y-1.5 text-sm">
              {q.options.map((option, i) => {
                const isAnswer = i === q.answerIndex;
                const isChosen = i === chosen;
                return (
                  <li key={i} className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2",
                    isAnswer && "bg-leaf-50 font-semibold text-leaf-800",
                    !isAnswer && isChosen && "bg-red-50 font-semibold text-red-700",
                    !isAnswer && !isChosen && "text-slate-600",
                  )}>
                    {isAnswer ? (
                      <Check className="size-4 shrink-0" aria-label="Correct answer" />
                    ) : isChosen ? (
                      <X className="size-4 shrink-0" aria-label="Wrong answer" />
                    ) : (
                      <span className="w-4 shrink-0" aria-hidden />
                    )}
                    {t(option, lang)}
                    {isChosen && <span className="ml-auto text-xs font-normal">Your answer</span>}
                  </li>
                );
              })}
            </ul>
            {chosen === undefined && <p className="mt-2 text-xs font-semibold text-slate-500">Not attempted</p>}
            <p className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
              <span className="font-semibold text-leaf-900">Why:</span> {t(q.explanation, lang)}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
