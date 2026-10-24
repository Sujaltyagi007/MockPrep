"use client";
import { cn } from "@/lib/utils";
import { Fragment } from "react/jsx-runtime";
import { AArrowUp, Contrast, Type } from "lucide-react";
import { usePreferences } from "@/context/preferences-context";

export function ReadingOptions() {
  const { highContrast, largeText, toggleHighContrast, toggleLargeText } = usePreferences();

  const options = [
    { label: "Larger text", icon: AArrowUp, on: largeText, toggle: toggleLargeText },
    { label: "High contrast", icon: Contrast, on: highContrast, toggle: toggleHighContrast },
  ];

  return (
    <Fragment>
      <button type="button" popoverTarget="reading-options" aria-label="Reading options" className="grid size-11 place-items-center rounded-full border border-slate-300 bg-white text-leaf-900 hover:bg-slate-50">
        <Type className="size-5" aria-hidden />
      </button>
      <div id="reading-options" popover="auto" className="fixed inset-auto right-4 top-18 m-0 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
        <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Reading options</p>
        {options.map(({ label, icon: Icon, on, toggle }) => (
          <button key={label} type="button" role="switch" aria-checked={on} onClick={toggle} className="flex min-h-12 w-full items-center gap-3 rounded-xl px-3 text-left font-medium text-ink hover:bg-slate-50">
            <Icon className="size-5 text-slate-500" aria-hidden />
            <span className="flex-1">{label}</span>
            <span className={cn("flex h-6 w-10 items-center rounded-full p-0.5 transition-colors", on ? "bg-leaf-600" : "bg-slate-300")} aria-hidden>
              <span className={cn("size-5 rounded-full bg-white shadow transition-transform", on && "translate-x-4")} />
            </span>
          </button>
        ))}
      </div>
    </Fragment>
  );
}
