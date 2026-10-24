"use client";
import { cn } from "@/lib/utils";
import { usePreferences } from "@/context/preferences-context";
import { Accessibility, Contrast, Languages, Type } from "lucide-react";

export function AccessibilityBar() {
  const { lang, setLang, highContrast, largeText, toggleHighContrast, toggleLargeText } = usePreferences();

  const options = [
    { label: "Contrast", icon: Contrast, on: highContrast, onClick: toggleHighContrast },
    { label: "Font Size", icon: Type, on: largeText, onClick: toggleLargeText },
    { label: lang === "hi" ? "English" : "हिन्दी", icon: Languages, on: lang === "hi", onClick: () => setLang(lang === "hi" ? "en" : "hi") },
  ];

  return (
    <section id="accessibility" aria-labelledby="a11y-title" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-16 sm:px-8 sm:pb-20">
      <div className="flex flex-col gap-5 rounded-3xl border border-leaf-200 bg-linear-to-r from-leaf-50 to-white p-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-leaf-800 text-white">
            <Accessibility className="size-5" aria-hidden />
          </span>
          <div>
            <h2 id="a11y-title" className="font-semibold text-ink">Universal Accessibility &amp; Multilingual Parity</h2>
            <p className="text-sm text-slate-600">Built to WCAG 2.1 AA guidelines for every aspiring candidate.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {options.map(({ label, icon: Icon, on, onClick }) => (
            <button key={label} type="button" aria-pressed={on} onClick={onClick}
              className={cn("inline-flex h-9 items-center gap-1.5 rounded-full border px-4 text-xs font-semibold transition", on ? "border-leaf-700 bg-leaf-700 text-white" : "border-leaf-300 bg-white text-leaf-900 hover:bg-leaf-50")}>
              <Icon className="size-3.5" aria-hidden />
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
