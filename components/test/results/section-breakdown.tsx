"use client";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { MockTest } from "@/lib/types";
import type { TestResult } from "@/lib/scoring";
import { usePreferences } from "@/context/preferences-context";

export function SectionBreakdown({ test, result }: { test: MockTest; result: TestResult }) {
  const { lang } = usePreferences();

  return (
    <section aria-labelledby="sections-title" className="result-enter mt-6 rounded-2xl border border-slate-200 bg-white p-6 [animation-delay:100ms]">
      <h2 id="sections-title" className="font-semibold text-ink">Section-wise breakdown</h2>
      <p className="mt-1 text-sm text-slate-600">See what went well and where to focus next.</p>
      <ul className="mt-4 space-y-4">
        {result.sections.map((s) => {
          const section = test.sections.find((sec) => sec.id === s.sectionId);
          const share = s.maxScore === 0 ? 0 : Math.max(0, s.score / s.maxScore);
          return (
            <li key={s.sectionId}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 text-sm">
                <span className="font-medium text-ink">{section ? t(section.name, lang) : s.sectionId}</span>
                <span className="text-slate-600">
                  {s.score} / {s.maxScore} ({Math.round(share * 100)}%) · {s.correct} correct, {s.wrong} wrong, {s.skipped} skipped
                </span>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-label={`${section ? t(section.name, lang) : s.sectionId} score`} aria-valuenow={Math.round(share * 100)} aria-valuemin={0} aria-valuemax={100}>
                <div
                  className={cn("h-full rounded-full transition-[width] duration-700 motion-reduce:transition-none", share >= 0.6 ? "bg-leaf-500" : share >= 0.35 ? "bg-amber-500" : "bg-red-500")}
                  style={{ width: `${share * 100}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
