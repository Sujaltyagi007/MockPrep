"use client";
import { languages } from "@/lib/i18n";
import type { Lang } from "@/lib/types";
import { Languages } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { usePreferences } from "@/context/preferences-context";

export function LanguageToggle({ available }: { available: Lang[] }) {
  const { lang, setLang } = usePreferences();
  if (available.length < 2) return null;

  const next = available[(available.indexOf(lang) + 1) % available.length] ?? "en";
  const label = languages.find((l) => l.code === next)?.label ?? next;

  return (
    <button type="button" onClick={() => setLang(next)} aria-label={`Switch language to ${label}`} className={buttonStyles({ variant: "outline", size: "md", shape: "pill" })}>
      <Languages className="size-4" aria-hidden /> <span lang={next}>{label}</span>
    </button>
  );
}
