"use client";
import Link from "next/link";
import { t } from "@/lib/i18n";
import { ArrowRight } from "lucide-react";
import { usePersonalized } from "./personalize";
import type { ExamMatch, JobGuide } from "@/lib/types";
import { usePreferences } from "@/context/preferences-context";

export function ExamsPanel({ exams, guides }: { exams: ExamMatch[]; guides: JobGuide[] }) {
  const { lang } = usePreferences();
  const { items, notice } = usePersonalized(exams, (e) => e.eligibleQuals);

  return (
    <div className="space-y-4">
      {notice}
      <ul className="divide-y divide-slate-100 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
        {items.map((exam) => {
          const guide = guides.find((g) => g.examSlug === exam.slug);
          return (
            <li key={exam.slug} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-navy-950 break-words">{t(exam.name, lang)}</h3>
                {exam.summary && <p className="text-sm text-slate-500 break-words">{t(exam.summary, lang)}</p>}
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1 sm:pt-0">
                {exam.practiceTestId && (
                  <Link href={`/test/${exam.practiceTestId}`} className="inline-flex h-11 items-center gap-1.5 rounded-full bg-leaf-50 px-4 text-sm font-semibold text-leaf-700 hover:bg-leaf-100">
                    Practise <ArrowRight className="size-4" aria-hidden />
                  </Link>
                )}
                {guide && (
                  <a href={`#guide-${guide.id}`} className="inline-flex h-11 items-center rounded-full px-4 text-sm font-semibold text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50">
                    How to apply
                  </a>
                )}
                {!exam.practiceTestId && !guide && <span className="text-sm text-slate-400">Coming soon</span>}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
