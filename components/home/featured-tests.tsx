"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { categoryLabels } from "@/lib/i18n";
import { usePersonalized } from "./personalize";
import { Section, SectionHeading } from "./section";
import { categoryStyles } from "./category-styles";
import { useTestProgress } from "./test-progress";
import { setTestFilter, useTestFilter } from "./test-filter";
import type { ExamCategory, TestSummary } from "@/lib/types";
import { BadgeCheck, CheckCircle2, Hourglass, Unlock, X } from "lucide-react";

const progressUi = {
  "new": { action: "Begin Test", note: "Free · No login", icon: Unlock, tone: "text-slate-500" },
  "in-progress": { action: "Resume", note: "In progress", icon: Hourglass, tone: "text-amber-700" },
  "done": { action: "See Result", note: "Completed", icon: CheckCircle2, tone: "text-leaf-700" },
} as const;

export function FeaturedTests({ tests }: { tests: TestSummary[] }) {
  const { items, notice } = usePersonalized(tests, (t) => t.eligibleQuals);
  const { query, category } = useTestFilter();

  const categories = [...new Set(items.map((t) => t.category))];
  const needle = query.toLowerCase();
  const shown = items.filter((t) =>
    (!category || t.category === category) &&
    (!needle || `${t.title} ${t.summary} ${categoryLabels[t.category]}`.toLowerCase().includes(needle)));

  const tab = (value: ExamCategory | null, label: string) => {
    const selected = category === value;
    return (
      <button key={value ?? "all"} type="button" aria-pressed={selected} onClick={() => setTestFilter({ category: value })}
        className={cn("whitespace-nowrap rounded-full px-4 py-2 text-sm transition", selected ? "bg-leaf-800 font-semibold text-white shadow" : "text-slate-600 hover:bg-white hover:text-ink")}>
        {label}
      </button>
    );
  };

  return (
    <Section id="practice" labelledBy="practice-title">
      <SectionHeading
        id="practice-title"
        eyebrow="Free Practice Benches"
        icon={BadgeCheck}
        title="Featured Timed Assessments"
        description="Every mock follows the official exam pattern, with real negative marking and instant scored results."
        aside={
          <div className="flex w-fit flex-wrap gap-1 rounded-3xl border border-slate-200 bg-slate-50 p-1">
            {tab(null, `All Categories (${items.length})`)}
            {categories.map((c) => tab(c, categoryLabels[c]))}
          </div>
        }
      />

      <div className="mt-8 space-y-4">
        {notice}
        {query && (
          <p className="flex flex-wrap items-center justify-center gap-2 text-sm text-slate-500">
            Results for <strong className="font-semibold text-ink">“{query}”</strong>
            <button type="button" onClick={() => setTestFilter({ query: "" })} className="inline-flex min-h-11 items-center gap-1 font-semibold text-leaf-700 hover:underline">
              <X className="size-3.5" aria-hidden />
              Clear search
            </button>
          </p>
        )}

        {shown.length === 0 ? (
          <p className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-500">No tests match yet. Try another category or search.</p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((test) => <TestCard key={test.id} test={test} />)}
          </ul>
        )}
      </div>
    </Section>
  );
}

function TestCard({ test }: { test: TestSummary }) {
  const progress = progressUi[useTestProgress(test.id)];
  const style = categoryStyles[test.category];
  const ProgressIcon = progress.icon;

  return (
    <li className={cn("flex flex-col rounded-3xl border bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg sm:p-7", style.border)}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold", style.chip)}>
          <span className={cn("size-1.5 rounded-full", style.dot)} aria-hidden />
          {categoryLabels[test.category]}
        </span>
        <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-500">{test.bilingual ? "Bilingual (EN / HI)" : "English"}</span>
      </div>

      <h3 className="mt-5 text-xl font-bold leading-snug text-ink">{test.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{test.summary}</p>

      <dl className="mt-6 grid grid-cols-3 divide-x divide-slate-200 rounded-2xl border border-slate-100 bg-slate-50/70 py-4 text-center">
        <Stat label="Questions" value={test.questionCount} />
        <Stat label="Minutes" value={test.durationMinutes} />
        <Stat label={test.negativeMarks ? `Marks · −${Math.abs(test.negativeMarks)}` : "Max Marks"} value={test.maxMarks} accent={style.accent} />
      </dl>

      <div className="mt-7 flex items-center justify-between gap-3">
        <span className={cn("flex items-center gap-1.5 text-xs font-medium", progress.tone)}>
          <ProgressIcon className="size-4" aria-hidden />
          {progress.note}
        </span>
        <Link href={`/test/${test.id}`} className={cn("inline-flex h-11 items-center rounded-full px-5 text-sm font-semibold text-white shadow-sm transition hover:brightness-110", style.button)}>
          {progress.action}
        </Link>
      </div>
    </li>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: string }) {
  return (
    <div className="flex flex-col-reverse px-2">
      <dt className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</dt>
      <dd className={cn("text-lg font-bold", accent ?? "text-ink")}>{value}</dd>
    </div>
  );
}
