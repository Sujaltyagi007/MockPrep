"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Clock3, Zap } from "lucide-react";
import type { DrillSubject, TestSummary } from "@/lib/types";
import { DRILL_SUBJECTS } from "@/lib/import/draft";
import { difficultyLabels, drillSubjectLabels } from "@/lib/i18n";

const difficultyBars = { EASY: 1, MODERATE: 2, HARD: 3 } as const;

export function DrillSection({ drills }: { drills: TestSummary[] }) {
  const subjects = DRILL_SUBJECTS.filter((s) => drills.some((d) => d.drillSubject === s));
  const [chosen, setChosen] = useState<DrillSubject | null>(null);
  const subject = chosen ?? subjects[0] ?? null;
  const shown = drills.filter((d) => d.drillSubject === subject);

  return (
    <section id="drills" aria-labelledby="drills-title" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-16 sm:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white/70 p-5 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-leaf-700">Bite-sized focus practice</span>
            <h2 id="drills-title" className="mt-2 text-[clamp(1.625rem,1.15rem+1.6vw,2.5rem)] font-bold leading-tight tracking-tight text-ink">Sectional &amp; Topic-Wise Speed Drills</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">Short on time? Sharpen one topic at a time with short, timed drills that build question-solving speed.</p>
          </div>
          {subjects.length > 0 && (
            <div role="group" aria-label="Drill subject" className="flex w-fit flex-wrap gap-1 rounded-3xl border border-slate-200 bg-slate-50 p-1">
              {subjects.map((s) => (
                <button key={s} type="button" aria-pressed={s === subject} onClick={() => setChosen(s)}
                  className={cn("rounded-full px-4 py-2 text-center text-sm leading-tight transition", s === subject ? "bg-leaf-800 font-semibold text-white" : "text-slate-600 hover:bg-white hover:text-ink")}>
                  {drillSubjectLabels[s]}
                  <span className="block text-xs opacity-75">({drills.filter((d) => d.drillSubject === s).length})</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {drills.length === 0 ? (
          <p className="mt-8 rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
            Topic drills are on their way. New drills appear here as soon as they&apos;re published.
          </p>
        ) : (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {shown.map((drill) => <DrillCard key={drill.id} drill={drill} />)}
          </ul>
        )}
      </div>
    </section>
  );
}

function DrillCard({ drill }: { drill: TestSummary }) {
  const bars = drill.difficulty ? difficultyBars[drill.difficulty] : 0;

  return (
    <li className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="rounded-full bg-leaf-200 px-2.5 py-0.5 font-semibold text-leaf-900">{drill.drillSubject && drillSubjectLabels[drill.drillSubject]}</span>
        <span className="inline-flex items-center gap-1 text-slate-500">
          <Clock3 className="size-3.5" aria-hidden />
          {drill.durationMinutes} mins
        </span>
      </div>
      <h3 className="mt-3 font-bold leading-snug text-ink">{drill.title}</h3>
      <p className="mt-1 line-clamp-2 flex-1 text-sm text-slate-600">{drill.summary}</p>
      {drill.difficulty && (
        <p className="mt-4 flex items-center justify-between text-xs">
          <span className="text-slate-500">Difficulty: <span className="font-semibold text-ink">{difficultyLabels[drill.difficulty]}</span></span>
          <span className="flex gap-1" aria-hidden>
            {[1, 2, 3].map((n) => <span key={n} className={cn("h-1.5 w-4 rounded-full", n <= bars ? "bg-leaf-700" : "bg-slate-200")} />)}
          </span>
        </p>
      )}
      <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
        <span className="text-xs text-slate-500">{drill.questionCount} questions</span>
        <Link href={`/test/${drill.id}`} className="inline-flex h-9 items-center gap-1 rounded-full bg-leaf-800 px-4 text-xs font-semibold text-white hover:bg-leaf-900">
          <Zap className="size-3.5" aria-hidden />
          Quick Start
        </Link>
      </div>
    </li>
  );
}
