"use client";
import { cn } from "@/lib/utils";
import { languages } from "@/lib/i18n";
import { usePreferences } from "@/context/preferences-context";

export function LanguageSwitch() {
  const { lang, setLang } = usePreferences();

  return (
    <div role="radiogroup" aria-label="Language" className="flex rounded-full border border-slate-300 bg-white p-0.5">
      {languages.map((l) => (
        <button key={l.code} type="button" role="radio" aria-checked={lang === l.code} lang={l.code} onClick={() => setLang(l.code)}
          className={cn("h-10 rounded-full px-3 text-sm font-semibold transition-colors", lang === l.code ? "bg-leaf-800 text-white" : "text-slate-600 hover:text-ink")}>
          {l.code === "en" ? "EN" : l.label}
        </button>
      ))}
    </div>
  );
}
