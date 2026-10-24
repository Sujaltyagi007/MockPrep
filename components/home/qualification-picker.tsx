"use client";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import { showTests } from "./test-filter";
import { qualificationLabels } from "@/lib/i18n";
import type { Qualification, TestSummary } from "@/lib/types";
import { usePreferences } from "@/context/preferences-context";

const options: Qualification[] = ["BTECH", "GRADUATE", "POSTGRADUATE", "CLASS_12", "CLASS_10"];

export function QualificationPicker({ tests }: { tests: TestSummary[] }) {
  const { qualification, setQualification } = usePreferences();
  const matching = qualification ? tests.filter((t) => t.eligibleQuals?.includes(qualification) ?? true).length : tests.length;

  return (
    <section id="matcher" aria-labelledby="matcher-title" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-14 sm:px-8 sm:pb-20">
      <div className="rounded-3xl border border-leaf-200 bg-linear-to-br from-leaf-50 via-white to-sky-50 p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-md">
            <span className="inline-block rounded-full border border-leaf-300 bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-leaf-700">2-Click Quick Matcher</span>
            <h2 id="matcher-title" className="mt-3 text-[clamp(1.5rem,1.1rem+1.2vw,2rem)] font-bold leading-tight tracking-tight text-ink">Find Your Exact Prep Roadmap</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Select your qualification to filter the mock tests and job alerts below to what you can actually apply for.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3">
            <fieldset className="rounded-2xl border border-slate-200 bg-white/80 p-1.5">
              <legend className="sr-only">Your highest qualification</legend>
              <div className="flex flex-wrap gap-1.5">
                {options.map((value) => {
                  const isSelected = qualification === value;
                  return (
                    <button key={value} type="button" aria-pressed={isSelected} onClick={() => setQualification(isSelected ? null : value)}
                      className={cn("h-9 rounded-xl px-4 text-sm transition", isSelected ? "bg-leaf-700 font-semibold text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200")}>
                      {qualificationLabels[value]}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="flex flex-wrap items-center gap-3">
              <button type="button" onClick={() => showTests()} className="inline-flex h-11 items-center gap-2 rounded-xl bg-linear-to-r from-leaf-800 to-leaf-700 px-5 text-sm font-bold text-white shadow-md shadow-leaf-700/20 transition hover:brightness-110">
                <Search className="size-4" aria-hidden />
                {qualification ? `Show My ${matching} ${matching === 1 ? "Test" : "Tests"}` : `Show All ${matching} Tests`}
              </button>
              {qualification && (
                <button type="button" onClick={() => setQualification(null)} className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-ink hover:underline">
                  <X className="size-3" aria-hidden />
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
