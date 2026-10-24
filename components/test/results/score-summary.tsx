"use client";
import { t } from "@/lib/i18n";
import type { MockTest } from "@/lib/types";
import { useEffect, useState } from "react";
import type { TestResult } from "@/lib/scoring";
import { usePreferences } from "@/context/preferences-context";
import { Clock3, Sparkles, Target, Trophy } from "lucide-react";

function formatDuration(ms: number) {
  const s = Math.round(ms / 1000);
  return `${Math.floor(s / 60)}m ${s % 60}s`;
}

export function ScoreSummary({ test, result, timeTakenMs, focusLossCount }: { test: MockTest; result: TestResult; timeTakenMs: number; focusLossCount: number }) {
  const { lang } = usePreferences();
  const share = result.maxScore === 0 ? 0 : Math.min(1, Math.max(0, result.score / result.maxScore));
  const [animatedShare, setAnimatedShare] = useState(0);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setAnimatedShare(share));
    return () => cancelAnimationFrame(frame);
  }, [share]);
  const percentage = Math.round(share * 100);
  const Icon = percentage >= 80 ? Trophy : percentage >= 50 ? Target : Sparkles;
  const headline = percentage >= 80 ? "Excellent work!" : percentage >= 50 ? "Good progress!" : "Every attempt is progress";
  const weakest = result.sections
    .filter((s) => s.maxScore > 0 && s.score < s.maxScore)
    .sort((a, b) => a.score / a.maxScore - b.score / b.maxScore)[0];
  const weakestName = weakest && test.sections.find((s) => s.id === weakest.sectionId)?.name;

  return (
    <section aria-labelledby="result-title" className="result-enter mt-5 overflow-hidden rounded-3xl border border-leaf-200 bg-linear-to-br from-leaf-50 via-white to-sky-50 p-6 text-ink shadow-sm sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">{test.title}</p>
          <h1 id="result-title" className="mt-1 text-2xl font-bold sm:text-3xl">Test complete</h1>
          <p className="mt-2 flex items-center gap-2 text-leaf-700">
            <Icon className="size-5" aria-hidden />
            <span className="font-semibold">{headline}</span>
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700">
          <Clock3 className="size-4" aria-hidden /> {formatDuration(timeTakenMs)} taken
        </span>
      </div>
      <div className="mt-7 flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="relative grid size-36 shrink-0 place-items-center self-center sm:self-auto" role="img" aria-label={`Score: ${result.score} out of ${result.maxScore}, ${percentage} percent`}>
          <svg viewBox="0 0 36 36" className="absolute inset-0 -rotate-90" aria-hidden>
            <circle cx="18" cy="18" r="15.9" fill="none" strokeWidth="3" className="stroke-leaf-100" />
            <circle cx="18" cy="18" r="15.9" fill="none" strokeWidth="3" strokeLinecap="round" pathLength={100} strokeDasharray={`${animatedShare * 100} 100`} className="stroke-leaf-500 transition-[stroke-dasharray] duration-1000 ease-out motion-reduce:transition-none" />
          </svg>
          <p className="text-center">
            <span className="block text-3xl font-bold">{result.score}</span>
            <span className="text-xs text-slate-500">of {result.maxScore} marks</span>
            <span className="mt-1 block text-xs font-semibold text-leaf-700">{percentage}% score</span>
          </p>
        </div>
        <dl className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Correct" value={result.correct} tone="text-leaf-700" />
          <Stat label="Incorrect" value={result.wrong} tone="text-rose-600" />
          <Stat label="Skipped" value={result.skipped} tone="text-slate-700" />
          <Stat label="Accuracy (attempted)" value={`${Math.round(result.accuracy * 100)}%`} tone="text-ink" />
        </dl>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4 text-sm text-slate-500">
        <p>Marking: +{test.marking.correct} correct <span aria-hidden>·</span> {test.marking.wrong} incorrect <span aria-hidden>·</span> 0 skipped</p>
        <p>Time limit: {test.durationMinutes} min</p>
      </div>
      {weakestName && (
        <p className="mt-4 rounded-xl border border-leaf-100 bg-white px-4 py-3 text-sm text-slate-700">
          <span className="font-semibold text-ink">A good next focus:</span> {t(weakestName, lang)} — review this section below.
        </p>
      )}
      {focusLossCount > 0 && (
        <p className="mt-3 text-xs text-slate-500">
          {focusLossCount} tab switch{focusLossCount === 1 ? "" : "es"} recorded on this device during the test.
        </p>
      )}
    </section>
  );
}

function Stat({ label, value, tone }: { label: string; value: number | string; tone: string }) {
  return (
    <div className="flex flex-col-reverse rounded-xl border border-slate-200 bg-white p-3">
      <dt className="text-xs text-slate-500">{label}</dt>
      <dd className={`text-xl font-bold ${tone}`}>{value}</dd>
    </div>
  );
}
