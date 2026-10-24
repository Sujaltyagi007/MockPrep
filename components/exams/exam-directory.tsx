"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Fragment, useState } from "react";
import { qualificationLabels, t } from "@/lib/i18n";
import { usePreferences } from "@/context/preferences-context";
import { usePersonalized } from "@/components/home/personalize";
import type { ExamCategory, ExamListing, Qualification } from "@/lib/types";
import { ArrowDown, BadgeCheck, ExternalLink, FileText, Library, RotateCcw, Search, Sparkles, Timer } from "lucide-react";

const STREAMS: { label: string; categories: ExamCategory[] }[] = [
  { label: "Central Govt", categories: ["CIVIL", "RAILWAYS"] },
  { label: "Banking & SSC", categories: ["BANKING_SSC"] },
  { label: "State PSCs", categories: ["STATE_PSC"] },
  { label: "Engineering & Tech", categories: ["TECH"] },
  { label: "Defence & Police", categories: ["DEFENCE"] },
  { label: "Teaching & Academia", categories: ["TEACHING"] },
];

const streamOf = (category: ExamCategory) => STREAMS.find((s) => s.categories.includes(category))!;

const QUALIFICATIONS = Object.keys(qualificationLabels) as Qualification[];

export function ExamDirectory({ exams }: { exams: ExamListing[] }) {
  const { lang, qualification, setQualification } = usePreferences();
  const { items, notice } = usePersonalized(exams, (e) => e.eligibleQuals);
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [stream, setStream] = useState<string | null>(null);

  const streams = STREAMS.filter((s) => exams.some((e) => s.categories.includes(e.category)));
  const matched = qualification ? exams.filter((e) => e.eligibleQuals.includes(qualification)).length : exams.length;
  const needle = query.trim().toLowerCase();
  const shown = items.filter((e) =>
    (!stream || streamOf(e.category).label === stream) &&
    (!needle || [t(e.name, lang), e.name.en, e.conductingBody, e.summary ? t(e.summary, lang) : "", streamOf(e.category).label].join(" ").toLowerCase().includes(needle)));

  function reset() {
    setDraft("");
    setQuery("");
    setStream(null);
  }

  return (
    <Fragment>
      <section aria-labelledby="exams-title" className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-leaf-200/50 blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 pt-10 sm:px-8 sm:pt-14">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-leaf-200 px-3 py-1 text-xs font-bold uppercase tracking-wider text-leaf-900">
            <span className="size-1.5 rounded-full bg-leaf-700" aria-hidden />
            Exam directory · Official sources only
          </span>
          <h1 id="exams-title" className="mt-4 max-w-4xl text-[clamp(1.875rem,1.2rem+2.4vw,3rem)] font-bold leading-tight tracking-tight text-ink">
            Comprehensive Competitive Exams Directory &amp; Official Syllabi
          </h1>
          <p className="mt-3 max-w-3xl text-[clamp(0.95rem,0.9rem+0.3vw,1.125rem)] leading-relaxed text-slate-600">
            Everything you need to know about {exams.length} Central and State examinations: who conducts them, who can apply, free mock tests, and the official website for the latest notification and syllabus.
          </p>

          <div className="mt-7 rounded-3xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5">
            <form role="search" onSubmit={(e) => { e.preventDefault(); setQuery(draft); }} className="flex flex-col gap-2 sm:flex-row">
              <label className="relative flex-1">
                <span className="sr-only">Search exams</span>
                <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden />
                <input type="search" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Search by exam name or conducting body (e.g. UPSC CSE, SSC CGL, IBPS)"
                  className="h-11 w-full rounded-full border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-leaf-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-leaf-500" />
              </label>
              <div className="flex gap-2">
                <button type="button" onClick={reset} className="inline-flex h-11 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 hover:bg-slate-50">
                  <RotateCcw className="size-4" aria-hidden />
                  Reset
                </button>
                <button type="submit" className="inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full bg-leaf-800 px-5 text-sm font-semibold text-white hover:bg-leaf-900 sm:flex-none">
                  <Library className="size-4" aria-hidden />
                  Search Exams
                </button>
              </div>
            </form>
            <div role="group" aria-label="Stream filter" className="mt-4 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs font-bold uppercase tracking-wider text-slate-500">Stream filter:</span>
              {[{ label: "All Streams" }, ...streams].map(({ label }) => {
                const value = label === "All Streams" ? null : label;
                const selected = stream === value;
                return (
                  <button key={label} type="button" aria-pressed={selected} onClick={() => setStream(value)}
                    className={cn("rounded-full px-3 py-1.5 text-xs font-semibold transition", selected ? "bg-leaf-800 text-white" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50")}>
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="matcher-title" className="mx-auto max-w-6xl px-4 pt-10 sm:px-8">
        <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5 sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-leaf-700">
                <Sparkles className="size-3.5" aria-hidden />
                Instant qualification check
              </span>
              <h2 id="matcher-title" className="mt-2 text-xl font-bold text-ink sm:text-2xl">Exam Eligibility Matcher</h2>
              <p className="mt-1 text-sm text-slate-600">Select your highest education level to see the exams you can apply for.</p>
            </div>
            <label className="block w-full lg:w-64">
              <span className="block text-xs font-semibold text-slate-500">Education level</span>
              <select value={qualification ?? ""} onChange={(e) => setQualification((e.target.value || null) as Qualification | null)}
                className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-ink focus:border-leaf-500 focus:outline-none">
                <option value="">Any education level</option>
                {QUALIFICATIONS.map((q) => <option key={q} value={q}>{qualificationLabels[q]}</option>)}
              </select>
            </label>
          </div>
          <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-leaf-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-3 text-sm">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-leaf-200 text-leaf-900"><BadgeCheck className="size-5" aria-hidden /></span>
              <span>
                <span className="font-semibold text-ink">Matched: {matched} {matched === 1 ? "examination" : "examinations"}</span>
                <span className="block text-xs text-slate-500">{qualification ? `Open to ${qualificationLabels[qualification]} candidates` : "Pick an education level to narrow the list"}</span>
              </span>
            </p>
            <a href="#directory" className="inline-flex h-10 w-fit items-center gap-1.5 rounded-full bg-leaf-800 px-4 text-xs font-semibold text-white hover:bg-leaf-900">
              {qualification ? "View My Matches" : "View All Exams"}
              <ArrowDown className="size-3.5" aria-hidden />
            </a>
          </div>
        </div>
      </section>

      <section id="directory" aria-labelledby="directory-title" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-16 pt-14 sm:px-8 sm:pt-20">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-leaf-700">All examinations</span>
            <h2 id="directory-title" className="mt-2 text-[clamp(1.625rem,1.15rem+1.6vw,2.5rem)] font-bold leading-tight tracking-tight text-ink">Primary Examination Directory</h2>
          </div>
          <p className="max-w-sm text-sm text-slate-500 lg:text-right">Dates, fees and syllabus change every cycle. Always confirm them in the official notification.</p>
        </div>

        <div className="mt-8 space-y-4">
          {notice}
          {shown.length === 0 ? (
            <p className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-500">No exams match your search yet.</p>
          ) : (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((exam) => <ExamCard key={exam.slug} exam={exam} />)}
            </ul>
          )}
        </div>
      </section>
    </Fragment>
  );
}

function ExamCard({ exam }: { exam: ExamListing }) {
  const { lang } = usePreferences();

  return (
    <li className="flex flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-xs transition hover:shadow-md sm:p-6">
      <div className="flex items-center justify-between gap-2">
        <span className="rounded-full bg-leaf-200 px-2.5 py-0.5 text-xs font-semibold text-leaf-900">{streamOf(exam.category).label}</span>
        {exam.mockCount > 0 && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-leaf-800">
            <span className="size-1.5 rounded-full bg-leaf-600" aria-hidden />
            {exam.mockCount} free {exam.mockCount === 1 ? "mock" : "mocks"}
          </span>
        )}
      </div>

      <h3 className="mt-4 text-lg font-bold leading-snug text-ink">{t(exam.name, lang)}</h3>
      {exam.summary && <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{t(exam.summary, lang)}</p>}

      <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3 rounded-2xl bg-slate-50 p-4 text-sm">
        <div className="col-span-2">
          <dt className="text-xs text-slate-500">Conducting body</dt>
          <dd className="font-semibold text-ink">{exam.conductingBody}</dd>
        </div>
        <div>
          <dt className="text-xs text-slate-500">Free mock tests</dt>
          <dd className="font-semibold text-ink">{exam.mockCount || "Coming soon"}</dd>
        </div>
        <div>
          <dt className="text-xs text-slate-500">Application guide</dt>
          <dd className="font-semibold text-ink">{exam.hasGuide ? "Available" : "Not yet"}</dd>
        </div>
      </dl>

      <div className="mt-4 flex-1">
        <p className="text-xs font-semibold text-slate-500">Who can apply</p>
        <ul className="mt-1.5 flex flex-wrap gap-1.5">
          {exam.eligibleQuals.map((q) => (
            <li key={q} className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-xs text-slate-700">{qualificationLabels[q]}</li>
          ))}
        </ul>
      </div>

      <div className="mt-5 space-y-2">
        {exam.practiceTestId && (
          <Link href={`/test/${exam.practiceTestId}`} className="flex h-11 items-center justify-center gap-1.5 rounded-full bg-leaf-800 text-sm font-semibold text-white hover:bg-leaf-900">
            <Timer className="size-4" aria-hidden />
            Take Mock Test
          </Link>
        )}
        {(exam.hasGuide || exam.officialUrl) && (
          <div className="flex gap-2">
            {exam.hasGuide && (
              <Link href="/jobs" className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50">
                <FileText className="size-3.5" aria-hidden />
                Application Guide
              </Link>
            )}
            {exam.officialUrl && (
              <a href={exam.officialUrl} target="_blank" rel="noopener noreferrer" className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50">
                <ExternalLink className="size-3.5" aria-hidden />
                Official Website
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>
        )}
      </div>
    </li>
  );
}
