"use client";
import { cn } from "@/lib/utils";
import type { JobGuide } from "@/lib/types";
import { usePersonalized } from "./personalize";
import { showRoadmap } from "./roadmap-selection";
import { Section, SectionHeading } from "./section";
import { qualificationLabels, t } from "@/lib/i18n";
import { usePreferences } from "@/context/preferences-context";
import { BellRing, Building2, Cloud, ExternalLink, Landmark, Route } from "lucide-react";

const tones = [
  { icon: Landmark, tile: "from-leaf-600 to-leaf-800", accent: "text-leaf-700", button: "from-leaf-800 to-leaf-600" },
  { icon: Cloud, tile: "from-sky-500 to-blue-600", accent: "text-sky-700", button: "from-sky-600 to-blue-700" },
  { icon: Building2, tile: "from-amber-500 to-orange-600", accent: "text-orange-700", button: "from-amber-600 to-orange-700" },
];

import Link from "next/link";

export function JobRadar({ guides }: { guides: JobGuide[] }) {
  const { items, notice } = usePersonalized(guides, (g) => g.eligibleQuals);

  return (
    <Section id="jobs" labelledBy="jobs-title">
      <SectionHeading id="jobs-title" eyebrow="Job Alerts" icon={BellRing}
        tone="amber" title="Verified Job Alerts" aside={
          <div className="flex flex-col items-start gap-2 lg:items-end">
            <p className="text-sm text-slate-600 lg:max-w-sm lg:text-right">Zero sponsored clutter. Every alert is checked against official commission portals.</p>
            <Link href="/jobs" className="inline-flex h-8 items-center gap-1.5 rounded-full bg-linear-to-r from-leaf-950 to-leaf-800 px-3.5 text-xs font-semibold text-white shadow-xs transition hover:brightness-125">
              Full Job Radar (184+ Openings) →
            </Link>
          </div>
        }
      />

      <div className="mt-8 space-y-4">
        {notice}
        {items.length === 0 ? (
          <p className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-500">No job alerts for your qualification yet.</p>
        ) : (
          <ul className="divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white">
            {items.map((guide, i) => <GuideRow key={guide.id} guide={guide} tone={tones[i % tones.length]} />)}
          </ul>
        )}
      </div>
    </Section>
  );
}

function GuideRow({ guide, tone }: { guide: JobGuide; tone: (typeof tones)[number] }) {
  const { lang } = usePreferences();
  const Icon = tone.icon;

  return (
    <li className="flex flex-col gap-4 p-5 sm:p-6 md:flex-row md:items-center">
      <div className="flex min-w-0 flex-1 gap-4">
        <span className={cn("grid size-12 shrink-0 place-items-center rounded-2xl bg-linear-to-br text-white shadow-sm", tone.tile)}>
          <Icon className="size-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-ink">{t(guide.title, lang)}</h3>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-leaf-100 px-2.5 py-0.5 text-xs font-semibold text-leaf-800">
              <span className="size-1.5 rounded-full bg-leaf-500" aria-hidden />
              Verified
            </span>
            <span className="rounded-full border border-sky-200 bg-sky-50 px-2.5 py-0.5 text-xs font-medium text-sky-800">{guide.steps.length}-Step Application</span>
          </div>
          <p className="mt-1.5 flex flex-wrap gap-x-2 gap-y-1 text-sm text-slate-600">
            <span>{guide.organization}</span>
            <span aria-hidden>•</span>
            <span>{guide.eligibleQuals.map((q) => qualificationLabels[q]).join(" / ")}</span>
            <span aria-hidden>•</span>
            <span className={cn("font-medium", tone.accent)}>Age {t(guide.ageLimit, lang)}</span>
          </p>
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap gap-2 pl-16 md:pl-0">
        <button type="button" onClick={() => showRoadmap(guide.id)} className="inline-flex h-10 items-center gap-1.5 rounded-full bg-slate-100 px-4 text-sm font-medium text-slate-700 hover:bg-slate-200">
          <Route className="size-4" aria-hidden />
          Selection Roadmap
        </button>
        <a href={guide.officialUrl} target="_blank" rel="noopener noreferrer" className={cn("inline-flex h-10 items-center gap-1.5 rounded-full bg-linear-to-r px-4 text-sm font-semibold text-white shadow-sm hover:brightness-110", tone.button)}>
          <ExternalLink className="size-4" aria-hidden />
          Official Portal
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </li>
  );
}
