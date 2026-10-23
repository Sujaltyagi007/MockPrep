"use client";
import Link from "next/link";
import { useEffect } from "react";
import type { JobGuide } from "@/lib/types";
import { usePersonalized } from "./personalize";
import { afterApplying } from "@/lib/site-content";
import { ChevronDown, ExternalLink } from "lucide-react";
import { qualificationLabels, t } from "@/lib/i18n";
import { usePreferences } from "@/context/preferences-context";

export function ApplyPanel({ guides }: { guides: JobGuide[] }) {
  const { items, notice } = usePersonalized(guides, (g) => g.eligibleQuals);
  useOpenGuideFromHash();

  return (
    <div className="space-y-4">
      {notice}
      {items.length === 0 ? (
        <p className="rounded-3xl bg-white p-8 text-center text-slate-500 ring-1 ring-slate-200">
          No application guides for your qualification yet.
        </p>
      ) : (
        <ul className="space-y-3">
          {items.map((guide) => (
            <li key={guide.id}>
              <GuideItem guide={guide} />
            </li>
          ))}
        </ul>
      )}

      <details className="group rounded-3xl bg-leaf-50 ring-1 ring-leaf-200">
        <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 px-6 font-semibold text-navy-950">
          What happens after you apply?
          <ChevronDown className="size-5 shrink-0 text-slate-500 transition-transform group-open:rotate-180" aria-hidden />
        </summary>
        <ol className="grid gap-4 px-6 pb-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {afterApplying.map((item, i) => (
            <li key={item.title}>
              <span className="text-xs font-bold text-leaf-700">{i + 1}</span>
              <p className="font-semibold text-navy-950">{item.title}</p>
              <p className="mt-1 text-sm text-slate-600">{item.text}</p>
            </li>
          ))}
        </ol>
      </details>

      <p className="text-center text-xs text-slate-400">Always confirm dates and fees in the official notification.</p>
    </div>
  );
}

/** "How to apply" links point at #guide-<id>; open and reveal that guide. */
function useOpenGuideFromHash() {
  useEffect(() => {
    function openTarget() {
      if (!location.hash.startsWith("#guide-")) return;
      const el = document.getElementById(location.hash.slice(1));
      if (el instanceof HTMLDetailsElement) {
        el.open = true;
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
    openTarget();
    window.addEventListener("hashchange", openTarget);
    return () => window.removeEventListener("hashchange", openTarget);
  }, []);
}

function GuideItem({ guide }: { guide: JobGuide }) {
  const { lang } = usePreferences();

  return (
    <details id={`guide-${guide.id}`} className="group rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 open:ring-leaf-500">
      <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-4 px-6 py-4">
        <span>
          <span className="block font-semibold text-navy-950">{t(guide.title, lang)}</span>
          <span className="block text-sm text-slate-500">{guide.organization}</span>
        </span>
        <ChevronDown className="size-5 shrink-0 text-slate-500 transition-transform group-open:rotate-180" aria-hidden />
      </summary>

      <div className="space-y-6 px-6 pb-6">
        <ol className="space-y-3">
          {guide.steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-slate-700">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-leaf-600 text-sm font-bold text-white">{i + 1}</span>
              <span className="pt-0.5">{t(step, lang)}</span>
            </li>
          ))}
        </ol>

        <div className="rounded-2xl bg-slate-50 p-4 text-sm">
          <p className="font-semibold text-navy-950">Keep ready</p>
          <p className="mt-1 text-slate-600">{guide.documents.map((d) => t(d, lang)).join(" · ")}</p>
          <p className="mt-3 text-slate-600">
            <span className="font-semibold text-navy-950">Who:</span> {guide.eligibleQuals.map((q) => qualificationLabels[q]).join(", ")}
            {" · "}
            <span className="font-semibold text-navy-950">Age:</span> {t(guide.ageLimit, lang)}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <a href={guide.officialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full bg-navy-900 px-5 text-sm font-semibold text-white hover:bg-navy-800">
            Official website <ExternalLink className="size-4" aria-hidden />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          {guide.practiceTestId && (
            <Link href={`/test/${guide.practiceTestId}`} className="inline-flex h-11 items-center rounded-full px-5 text-sm font-semibold text-navy-900 ring-1 ring-slate-200 hover:bg-slate-50">
              Practise first
            </Link>
          )}
        </div>
      </div>
    </details>
  );
}
