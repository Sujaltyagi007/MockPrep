"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { categoryLabels } from "@/lib/i18n";
import type { ExamCategory, TestSummary } from "@/lib/types";
import { useTestProgress } from "@/components/home/test-progress";
import { DailyChallenge } from "@/components/home/daily-challenge";
import { setTestFilter, useTestFilter } from "@/components/home/test-filter";
import { BadgeCheck, ChevronLeft, ChevronRight, Info, Languages, Search, ShieldCheck, Zap } from "lucide-react";

const PAGE_SIZE = 6;

const LANGUAGES = [
  { value: "all", label: "All languages" },
  { value: "bilingual", label: "Bilingual (EN / हिं)" },
  { value: "english", label: "English only" },
] as const;

type LanguageFilter = (typeof LANGUAGES)[number]["value"];

export function MockCatalog({ mocks, drillCount }: { mocks: TestSummary[]; drillCount: number }) {
  const { query, category } = useTestFilter();
  const [language, setLanguage] = useState<LanguageFilter>("all");
  const [page, setPage] = useState(1);

  const categories = [...new Set(mocks.map((t) => t.category))];
  const needle = query.trim().toLowerCase();
  const shown = mocks.filter((t) =>
    (!category || t.category === category) &&
    (language === "all" || (language === "bilingual") === t.bilingual) &&
    (!needle || [t.title, t.summary, t.examName ?? "", categoryLabels[t.category], ...t.sectionNames].join(" ").toLowerCase().includes(needle)));

  const pageCount = Math.max(1, Math.ceil(shown.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const pageItems = shown.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  function filter(patch: Parameters<typeof setTestFilter>[0]) {
    setTestFilter(patch);
    setPage(1);
  }

  function goTo(n: number) {
    setPage(n);
    document.getElementById("practice")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const tab = (value: ExamCategory | null, label: string, count: number) => {
    const selected = category === value;
    return (
      <button key={value ?? "all"} type="button" aria-pressed={selected} onClick={() => filter({ category: value })}
        className={cn("inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold transition sm:text-sm",
          selected ? "bg-leaf-800 text-white shadow-sm" : "text-slate-600 hover:bg-white hover:text-ink")}>
        {label}
        <span className={cn("rounded-full px-1.5 text-xs font-bold", selected ? "bg-white/20" : "bg-slate-200/80 text-slate-500")}>{count}</span>
      </button>
    );
  };

  return (
    <>
      <section aria-labelledby="catalog-title" className="mx-auto max-w-6xl px-4 pt-10 sm:px-8 sm:pt-14">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-leaf-200 px-3 py-1 text-xs font-bold uppercase tracking-wider text-leaf-900">
          <ShieldCheck className="size-3.5" aria-hidden />
          Real exam patterns · Free forever
        </span>
        <h1 id="catalog-title" className="mt-4 text-[clamp(1.875rem,1.2rem+2.4vw,3rem)] font-bold leading-tight tracking-tight text-ink">
          All-India Mock Test Series &amp; Speed Drills
        </h1>
        <p className="mt-3 max-w-3xl text-[clamp(0.95rem,0.9rem+0.3vw,1.125rem)] leading-relaxed text-slate-600">
          {mocks.length} full-length timed mock {mocks.length === 1 ? "test" : "tests"}{drillCount > 0 && ` and ${drillCount} topic ${drillCount === 1 ? "drill" : "drills"}`} in the real exam pattern, with negative marking, bilingual papers and instant section-wise results. Zero paywalls, zero locked modules.
        </p>

        <div role="group" aria-label="Filter by category" className="mt-7 flex flex-wrap gap-1 rounded-3xl border border-slate-200 bg-slate-50 p-1 sm:w-fit">
          {tab(null, "All Tests", mocks.length)}
          {categories.map((c) => tab(c, categoryLabels[c], mocks.filter((t) => t.category === c).length))}
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search tests</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden />
            <input type="search" value={query} onChange={(e) => filter({ query: e.target.value })} placeholder="Search by test, exam or topic (e.g. GS-1, Polity, SQL)"
              className="h-11 w-full rounded-full border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-leaf-500 focus:outline-none focus:ring-1 focus:ring-leaf-500" />
          </label>
          <label className="flex h-11 items-center gap-2 rounded-full border border-slate-200 bg-white pl-4 pr-2 text-sm">
            <span className="text-slate-500">Language:</span>
            <select value={language} onChange={(e) => { setLanguage(e.target.value as LanguageFilter); setPage(1); }} className="h-full bg-transparent pr-1 font-semibold text-ink focus:outline-none">
              {LANGUAGES.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
            </select>
          </label>
        </div>

        <DailyChallenge />
      </section>

      <section id="practice" aria-labelledby="mocks-title" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-16 pt-14 sm:px-8 sm:pt-20">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-leaf-700">
              <BadgeCheck className="size-3.5" aria-hidden />
              Full-length mocks
            </span>
            <h2 id="mocks-title" className="mt-2 text-[clamp(1.625rem,1.15rem+1.6vw,2.5rem)] font-bold leading-tight tracking-tight text-ink">Full-Length Benchmark Mock Exams</h2>
            <p className="mt-1 text-sm text-slate-600">Built on each exam&apos;s official pattern: same sections, same time limit, same negative marking.</p>
          </div>
        </div>

        {query && (
          <p className="mt-5 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            Results for <strong className="font-semibold text-ink">“{query}”</strong>
            <button type="button" onClick={() => filter({ query: "" })} className="min-h-11 font-semibold text-leaf-700 hover:underline">Clear search</button>
          </p>
        )}

        {pageItems.length === 0 ? (
          <p className="mt-8 rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-500">No mock tests match these filters yet.</p>
        ) : (
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pageItems.map((test) => <MockCard key={test.id} test={test} />)}
          </ul>
        )}

        {shown.length > 0 && (
          <nav aria-label="Pagination" className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-slate-500">
              Showing {(current - 1) * PAGE_SIZE + 1}–{Math.min(current * PAGE_SIZE, shown.length)} of {shown.length} mock {shown.length === 1 ? "exam" : "exams"}
            </p>
            {pageCount > 1 && (
              <div className="flex items-center gap-1.5">
                <PageButton label="Previous page" disabled={current === 1} onClick={() => goTo(current - 1)}><ChevronLeft className="size-4" aria-hidden /></PageButton>
                {pageNumbers(current, pageCount).map((n, i) =>
                  n === null ? <span key={`gap-${i}`} className="px-1 text-slate-400">…</span> : (
                    <PageButton key={n} label={`Page ${n}`} current={n === current} onClick={() => goTo(n)}>{n}</PageButton>
                  ))}
                <PageButton label="Next page" disabled={current === pageCount} onClick={() => goTo(current + 1)}><ChevronRight className="size-4" aria-hidden /></PageButton>
              </div>
            )}
          </nav>
        )}
      </section>
    </>
  );
}

/** 1 … 4 5 6 … 20 */
function pageNumbers(current: number, count: number): (number | null)[] {
  const wanted = [...new Set([1, current - 1, current, current + 1, count])].filter((n) => n >= 1 && n <= count).sort((a, b) => a - b);
  return wanted.flatMap((n, i) => (i > 0 && n - wanted[i - 1] > 1 ? [null, n] : [n]));
}

function PageButton({ label, current, disabled, onClick, children }: { label: string; current?: boolean; disabled?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" aria-label={label} aria-current={current ? "page" : undefined} disabled={disabled} onClick={onClick}
      className={cn("grid size-10 place-items-center rounded-full border text-sm font-semibold transition disabled:opacity-40",
        current ? "border-leaf-800 bg-leaf-800 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50")}>
      {children}
    </button>
  );
}

const actionLabels = { "new": "Take Free Test", "in-progress": "Resume Test", "done": "See Result" } as const;

function MockCard({ test }: { test: TestSummary }) {
  const progress = useTestProgress(test.id);
  const [showInfo, setShowInfo] = useState(false);
  const infoId = `info-${test.id}`;
  const penalty = Math.abs(test.negativeMarks);

  return (
    <li className="flex flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-xs transition hover:shadow-md sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-leaf-200 px-2.5 py-0.5 text-xs font-semibold text-leaf-900">{categoryLabels[test.category]}</span>
        {test.examName && <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600">{test.examName}</span>}
        {progress !== "new" && (
          <span className={cn("ml-auto rounded-full px-2 py-0.5 text-xs font-semibold", progress === "done" ? "bg-leaf-50 text-leaf-800" : "bg-amber-100 text-amber-800")}>
            {progress === "done" ? "Completed" : "In progress"}
          </span>
        )}
      </div>

      <h3 className="mt-4 text-lg font-bold leading-snug text-ink">{test.title}</h3>
      <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-600">{test.summary}</p>

      <dl className="mt-5 grid grid-cols-3 divide-x divide-slate-200 rounded-2xl bg-slate-50 py-3.5 text-center">
        <Stat label="Questions" value={String(test.questionCount)} />
        <Stat label="Minutes" value={String(test.durationMinutes)} />
        <Stat label="Penalty" value={penalty ? `−${penalty}` : "No Pen."} tone={penalty ? "text-rose-600" : "text-leaf-700"} />
      </dl>

      <p className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1.5">
          <Languages className="size-3.5 text-leaf-700" aria-hidden />
          {test.bilingual ? "Bilingual (EN / हिं)" : "English"}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Zap className="size-3.5 text-leaf-700" aria-hidden />
          Instant result &amp; explanations
        </span>
      </p>

      {showInfo && (
        <div id={infoId} className="mt-4 rounded-2xl border border-leaf-100 bg-leaf-50/60 p-4 text-xs leading-relaxed text-slate-700">
          <p><span className="font-semibold text-ink">Marking:</span> +{test.maxMarks / Math.max(1, test.questionCount)} correct · {penalty ? `−${penalty}` : "0"} wrong · 0 skipped</p>
          {test.sectionNames.length > 0 && <p className="mt-1"><span className="font-semibold text-ink">Sections:</span> {test.sectionNames.join(", ")}</p>}
          <p className="mt-1"><span className="font-semibold text-ink">Maximum marks:</span> {test.maxMarks}</p>
        </div>
      )}

      <div className="mt-5 flex items-center gap-2">
        <Link href={`/test/${test.id}`} className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-leaf-800 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-leaf-900">
          {actionLabels[progress]}
        </Link>
        <button type="button" aria-label="Test details" aria-expanded={showInfo} aria-controls={infoId} onClick={() => setShowInfo(!showInfo)}
          className={cn("grid size-11 shrink-0 place-items-center rounded-full border transition", showInfo ? "border-leaf-700 bg-leaf-50 text-leaf-800" : "border-slate-200 text-slate-500 hover:bg-slate-50")}>
          <Info className="size-4" aria-hidden />
        </button>
      </div>
    </li>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="flex flex-col-reverse px-2">
      <dt className="mt-0.5 text-xs text-slate-500">{label}</dt>
      <dd className={cn("text-lg font-bold", tone ?? "text-ink")}>{value}</dd>
    </div>
  );
}
