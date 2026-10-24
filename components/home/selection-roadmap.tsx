"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { JobGuide, Lang } from "@/lib/types";
import { afterApplying } from "@/lib/site-content";
import { qualificationLabels, t } from "@/lib/i18n";
import { Section, SectionHeading } from "./section";
import { useStoredValue, writeItem } from "@/lib/local-store";
import { usePreferences } from "@/context/preferences-context";
import { setRoadmapJob, useRoadmapJob } from "./roadmap-selection";
import { ArrowRight, Check, ExternalLink, Route, Timer } from "lucide-react";

type Phase = { title: string; steps: { title: string; text?: string }[] };

const tones = [
  { label: "text-leaf-700", dot: "bg-leaf-500", card: "border-leaf-200/80 from-leaf-50/80" },
  { label: "text-sky-700", dot: "bg-sky-400", card: "border-sky-100 from-sky-50/80" },
  { label: "text-violet-700", dot: "bg-violet-400", card: "border-violet-100 from-violet-50/80" },
  { label: "text-amber-700", dot: "bg-amber-400", card: "border-amber-100 from-amber-50/80" },
  { label: "text-rose-700", dot: "bg-rose-400", card: "border-rose-100 from-rose-50/80" },
];

function buildPhases(guide: JobGuide, lang: Lang): Phase[] {
  return [
    {
      title: "Eligibility Check",
      steps: [
        { title: "Confirm your qualification", text: guide.eligibleQuals.map((q) => qualificationLabels[q]).join(" / ") },
        { title: "Confirm the age limit", text: t(guide.ageLimit, lang) },
        { title: "Read the official notification", text: "Check vacancies, important dates and fees on the official portal." },
      ],
    },
    {
      title: "Online Application",
      steps: [
        { title: "Keep your documents ready", text: guide.documents.map((d) => t(d, lang)).join(" · ") },
        ...guide.steps.map((s) => ({ title: t(s, lang) })),
      ],
    },
    {
      title: "Mock Preparation",
      steps: [
        { title: "Take a full-length timed mock", text: "Practise in the real exam pattern, with negative marking." },
        { title: "Review every explanation", text: "Note your weak sections and revise them before the next attempt." },
        { title: "Build speed with the daily puzzle", text: "A short daily drill keeps calculation speed sharp." },
      ],
    },
    { title: "Exam & Result", steps: afterApplying.slice(0, 3) },
    { title: "Verification & Joining", steps: afterApplying.slice(3) },
  ];
}

function parseDone(raw: string | null): Set<string> {
  try {
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

export function SelectionRoadmap({ guides }: { guides: JobGuide[] }) {
  const chosen = useRoadmapJob();
  const guide = guides.find((g) => g.id === chosen) ?? guides[0];
  if (!guide) return null;

  return (
    <Section id="roadmap" labelledBy="roadmap-title">
      <SectionHeading
        id="roadmap-title"
        eyebrow="Notification to Joining Letter"
        icon={Route}
        title="Step-by-Step Selection Roadmap"
        description="Pick a job to see exactly what to do next, from checking eligibility to your joining letter. Tick steps off as you go."
      />
      <RoadmapBody key={guide.id} guides={guides} guide={guide} />
    </Section>
  );
}

function RoadmapBody({ guides, guide }: { guides: JobGuide[]; guide: JobGuide }) {
  const { lang } = usePreferences();
  const storageKey = `mockprep:roadmap:${guide.id}`;
  const done = parseDone(useStoredValue(storageKey));
  const [openPhase, setOpenPhase] = useState<number | null>(null);

  const phases = buildPhases(guide, lang);
  const counts = phases.map((p, i) => p.steps.filter((_, j) => done.has(`${i}-${j}`)).length);
  const current = phases.findIndex((p, i) => counts[i] < p.steps.length);
  const shown = openPhase ?? (current === -1 ? phases.length - 1 : current);
  const total = phases.reduce((n, p) => n + p.steps.length, 0);
  const percent = Math.round((counts.reduce((a, b) => a + b, 0) / total) * 100);
  const phase = phases[shown];

  function toggle(key: string) {
    const next = new Set(done);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    writeItem(storageKey, next.size ? JSON.stringify([...next]) : null);
  }

  return (
    <div className="mt-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Choose a job" className="flex flex-wrap gap-2">
          {guides.map((g) => {
            const selected = g.id === guide.id;
            return (
              <button key={g.id} type="button" aria-pressed={selected} onClick={() => setRoadmapJob(g.id)}
                className={cn("rounded-full px-4 py-2 text-sm transition", selected ? "bg-leaf-800 font-semibold text-white shadow" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-ink")}>
                {t(g.title, lang)}
              </button>
            );
          })}
        </div>
        <div className="flex w-fit items-center gap-3 rounded-full border border-leaf-200 bg-leaf-50 px-4 py-1.5 text-xs font-semibold text-leaf-800">
          {current === -1 ? "All stages complete" : `Stage ${current + 1} of ${phases.length} · ${percent}% complete`}
          <span className="h-1.5 w-16 overflow-hidden rounded-full bg-leaf-200" aria-hidden>
            <span className="block h-full rounded-full bg-leaf-600 transition-all" style={{ width: `${percent}%` }} />
          </span>
        </div>
      </div>

      <ol className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {phases.map((p, i) => {
          const tone = tones[i];
          const complete = counts[i] === p.steps.length;
          const isCurrent = i === current;
          return (
            <li key={p.title} className="relative">
              {isCurrent && (
                <span className="absolute -top-2.5 left-4 z-10 rounded-full bg-leaf-800 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-white">Current Focus</span>
              )}
              <button type="button" aria-pressed={shown === i} onClick={() => setOpenPhase(i)}
                className={cn(
                  "flex h-full w-full flex-col rounded-2xl border bg-linear-to-b to-white p-5 text-left transition hover:-translate-y-0.5 hover:shadow-md",
                  isCurrent ? "border-2 border-leaf-600 from-leaf-50 shadow-lg shadow-leaf-900/10" : tone.card,
                  shown === i && !isCurrent && "ring-2 ring-leaf-500/40",
                )}>
                <span className="flex items-center justify-between">
                  <span className={cn("text-xs font-bold uppercase", tone.label)}>Stage {String(i + 1).padStart(2, "0")}</span>
                  {complete ? (
                    <span className="grid size-5 place-items-center rounded-full bg-leaf-600 text-white"><Check className="size-3.5" strokeWidth={3} aria-hidden /></span>
                  ) : (
                    <span className={cn("size-2 rounded-full", tone.dot)} aria-hidden />
                  )}
                </span>
                <span className={cn("mt-4 flex-1 font-bold", isCurrent ? "text-leaf-900" : "text-ink")}>{p.title}</span>
                <span className="mt-5 flex items-center justify-between gap-2 border-t border-slate-200/80 pt-3 text-xs">
                  <span className={cn("font-semibold", complete ? "text-leaf-700" : isCurrent ? "text-leaf-800" : "text-slate-500")}>
                    {complete ? "Completed" : isCurrent ? "In Progress" : "Upcoming"}
                  </span>
                  <span className="text-slate-500">{counts[i]}/{p.steps.length}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 sm:p-7" aria-live="polite">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-lg font-bold text-ink">
            <span className={tones[shown].label}>Stage {String(shown + 1).padStart(2, "0")}</span> · {phase.title}
          </h3>
          <span className="text-sm text-slate-500">{counts[shown]} of {phase.steps.length} done</span>
        </div>

        <ul className="mt-4 space-y-1">
          {phase.steps.map((step, j) => {
            const key = `${shown}-${j}`;
            const isDone = done.has(key);
            return (
              <li key={key}>
                <label className="flex cursor-pointer gap-3 rounded-xl p-3 hover:bg-slate-50">
                  <input type="checkbox" checked={isDone} onChange={() => toggle(key)} className="peer sr-only" />
                  <span className={cn(
                    "mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border-2 transition peer-focus-visible:ring-2 peer-focus-visible:ring-leaf-600 peer-focus-visible:ring-offset-2",
                    isDone ? "border-leaf-600 bg-leaf-600 text-white" : "border-slate-300 bg-white",
                  )}>
                    {isDone && <Check className="size-3.5" strokeWidth={3} aria-hidden />}
                  </span>
                  <span>
                    <span className={cn("block text-sm font-medium", isDone ? "text-slate-400 line-through" : "text-ink")}>{step.title}</span>
                    {step.text && <span className="mt-0.5 block text-sm text-slate-500">{step.text}</span>}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>

        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-5">
          {shown <= 1 && (
            <a href={guide.officialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-1.5 rounded-full bg-linear-to-r from-leaf-800 to-leaf-600 px-4 text-sm font-semibold text-white hover:brightness-110">
              <ExternalLink className="size-4" aria-hidden />
              Official Portal
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
          {shown === 2 && (
            <Link href={guide.practiceTestId ? `/test/${guide.practiceTestId}` : "/#practice"} className="inline-flex h-10 items-center gap-1.5 rounded-full bg-linear-to-r from-leaf-800 to-leaf-600 px-4 text-sm font-semibold text-white hover:brightness-110">
              <Timer className="size-4" aria-hidden />
              {guide.practiceTestId ? "Start the Matching Mock" : "Browse Mock Tests"}
            </Link>
          )}
          {shown < phases.length - 1 && (
            <button type="button" onClick={() => setOpenPhase(shown + 1)} className="inline-flex h-10 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Next Stage
              <ArrowRight className="size-4" aria-hidden />
            </button>
          )}
          <p className="ml-auto text-xs text-slate-400">Progress is saved in this browser.</p>
        </div>
      </div>
    </div>
  );
}
