"use client";
import type { Lang, Qualification } from "@/lib/types";
import { useStoredValue, writeItem } from "@/lib/local-store";
import { createContext, use, useCallback, useEffect, useMemo, type ReactNode } from "react";

type Preferences = {
  lang: Lang;
  highContrast: boolean;
  largeText: boolean;
  qualification: Qualification | null;
};

type PreferencesContextValue = Preferences & {
  setLang: (lang: Lang) => void;
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
  setQualification: (qualification: Qualification | null) => void;
};

const STORAGE_KEY = "mockprep:preferences";
const defaults: Preferences = { lang: "en", highContrast: false, largeText: false, qualification: null };

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

function parse(raw: string | null): Preferences {
  try {
    return raw ? { ...defaults, ...(JSON.parse(raw) as Partial<Preferences>) } : defaults;
  } catch {
    return defaults;
  }
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const raw = useStoredValue(STORAGE_KEY);
  const prefs = useMemo(() => parse(raw), [raw]);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = prefs.lang;
    if (prefs.highContrast) root.dataset.contrast = "high";
    else delete root.dataset.contrast;
    if (prefs.largeText) root.dataset.font = "lg";
    else delete root.dataset.font;
  }, [prefs]);

  const update = useCallback(
    (patch: Partial<Preferences>) => writeItem(STORAGE_KEY, JSON.stringify({ ...prefs, ...patch })),
    [prefs],
  );

  const value = useMemo<PreferencesContextValue>(() => ({
    ...prefs, setLang: (lang) => update({ lang }),
    toggleHighContrast: () => update({ highContrast: !prefs.highContrast }),
    toggleLargeText: () => update({ largeText: !prefs.largeText }),
    setQualification: (qualification) => update({ qualification }),
  }), [prefs, update]);

  return <PreferencesContext value={value}>{children}</PreferencesContext>;
}

export function usePreferences(): PreferencesContextValue {
  const ctx = use(PreferencesContext);
  if (!ctx) throw new Error("usePreferences must be used inside <PreferencesProvider>");
  return ctx;
}
