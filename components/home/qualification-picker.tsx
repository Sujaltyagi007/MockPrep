"use client";
import { cn } from "@/lib/utils";
import { qualificationLabels } from "@/lib/i18n";
import type { Qualification } from "@/lib/types";
import { usePreferences } from "@/context/preferences-context";
import { Backpack, GraduationCap, Laptop, School, type LucideIcon, Filter, Check, X } from "lucide-react";

const options: { value: Qualification; icon: LucideIcon }[] = [
  { value: "CLASS_10", icon: School },
  { value: "CLASS_12", icon: Backpack },
  { value: "GRADUATE", icon: GraduationCap },
  { value: "BTECH", icon: Laptop },
];

export function QualificationPicker({ variant = "banner" }: { variant?: "banner" | "grid" }) {
  const { qualification, setQualification } = usePreferences();

  if (variant === "grid") {
    return (
      <fieldset className="w-full">
        <legend className="sr-only">What have you studied?</legend>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {options.map(({ value, icon: Icon }) => {
            const isSelected = qualification === value;
            return (
              <label key={value} className={cn(
                "flex min-h-20 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border p-3 text-center transition-all",
                isSelected
                  ? "border-leaf-600 bg-leaf-600 text-white shadow-md"
                  : "border-slate-200 bg-white text-navy-950 hover:border-leaf-400 hover:shadow-xs",
              )}
              >
                <input type="radio" name="qualification-grid" value={value} checked={isSelected} onChange={() => setQualification(value)} className="sr-only" />
                <Icon className={cn("size-5", isSelected ? "text-white" : "text-leaf-600")} aria-hidden />
                <span className="text-xs font-semibold sm:text-sm">{qualificationLabels[value]}</span>
              </label>
            );
          })}
        </div>
      </fieldset>
    );
  }

  return (
    <div className="mx-auto mt-16 max-w-5xl overflow-hidden rounded-3xl bg-[#0a180e] border border-emerald-900/50 p-6 text-white shadow-xl shadow-black/25 sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-md">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <Filter className="size-3.5 text-emerald-400" />
            <span>Targeted Eligibility Matcher</span>
          </div>
          <h3 className="mt-2 text-xl font-extrabold tracking-tight text-white sm:text-2xl">
            Find Your Exact Prep Roadmap
          </h3>
          <p className="mt-2 text-xs text-slate-200 sm:text-sm leading-relaxed">
            Select your highest qualification to instantly filter 40+ Govt exams, syllabus guides, and free mock tests.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <fieldset>
            <legend className="sr-only">Choose qualification to filter exams</legend>
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              {options.map(({ value, icon: Icon }) => {
                const isSelected = qualification === value;
                return (
                  <button key={value} type="button" onClick={() => setQualification(isSelected ? null : value)} className={cn("inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all sm:text-sm", isSelected ? "bg-emerald-400 text-navy-950 shadow-md shadow-emerald-400/30 ring-2 ring-emerald-300 scale-102" : "border border-white/20 bg-white/10 text-white hover:bg-white/20 hover:border-white/30",)}>
                    <Icon className={cn("size-4", isSelected ? "text-navy-950" : "text-emerald-300")} />
                    <span>{qualificationLabels[value]}</span>
                    {isSelected && <Check className="size-3.5 text-navy-950" />}
                  </button>
                );
              })}
            </div>
          </fieldset>

          {qualification && (
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-1 text-xs text-slate-200">
              <span className="flex items-center gap-1 font-semibold text-emerald-300">
                <Check className="size-3.5" />
                Filtered for {qualificationLabels[qualification]}
              </span>
              <span className="text-slate-400">·</span>
              <a href="#plan" className="font-semibold text-white underline decoration-emerald-400 hover:text-emerald-200">
                View Matched Tests Below ↓
              </a>
              <span className="text-slate-400">·</span>
              <button
                type="button"
                onClick={() => setQualification(null)}
                className="inline-flex items-center gap-1 text-slate-300 hover:text-white hover:underline"
              >
                <X className="size-3" />
                Clear
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
