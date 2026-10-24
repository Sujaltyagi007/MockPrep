"use client";
import { cn } from "@/lib/utils";
import type { Dispatch } from "react";
import type { ExamCategory } from "@/lib/types";
import type { DraftAction } from "./draft-reducer";
import { inputClass } from "@/components/admin/ui";
import type { ExamOption } from "@/lib/admin/test-drafts";
import { categoryLabels, difficultyLabels, drillSubjectLabels } from "@/lib/i18n";
import { DIFFICULTIES, DRILL_SUBJECTS, suggestedDuration, type DraftData } from "@/lib/import/draft";

const CATEGORIES = Object.keys(categoryLabels) as ExamCategory[];

const KINDS = [
  { value: "MOCK", label: "Full mock", hint: "A complete paper in the exam pattern." },
  { value: "DRILL", label: "Topic drill", hint: "A short practice set on one topic." },
] as const;

function Choice({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" aria-pressed={selected} onClick={onClick}
      className={cn("h-10 rounded-xl border px-4 text-sm font-semibold transition", selected ? "border-forest bg-forest text-white" : "border-black/10 bg-white text-ink hover:bg-sand")}>
      {children}
    </button>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-ink">{label}</span>
      {hint && <span className="mt-0.5 block text-xs text-body">{hint}</span>}
      <span className="mt-1.5 block">{children}</span>
    </label>
  );
}

export function DetailsForm({ data, dispatch, exams }: { data: DraftData; dispatch: Dispatch<DraftAction>; exams: ExamOption[] }) {
  const set = (patch: Partial<DraftData>) => dispatch({ type: "set", patch });
  const suggested = suggestedDuration(data.questions.length);
  const negativeOptions = [
    { label: "None", value: 0 },
    { label: "¼ mark", value: -round(data.marksCorrect / 4) },
    { label: "⅓ mark", value: -round(data.marksCorrect / 3) },
  ];
  const custom = !negativeOptions.some((o) => o.value === data.marksWrong);

  return (
    <div className="grid gap-5 rounded-2xl border border-black/5 bg-white p-5 shadow-2xs sm:p-7">
      <Field label="Test title" hint="Students see this on the test card.">
        <input value={data.title} onChange={(e) => set({ title: e.target.value })} placeholder="e.g. UPSC Prelims GS — Polity Practice Set 1" className={inputClass} />
      </Field>

      <Field label="Short description" hint="One line about what the test covers.">
        <textarea value={data.summary} onChange={(e) => set({ summary: e.target.value })} rows={2} className={inputClass} />
      </Field>

      <fieldset>
        <legend className="text-sm font-semibold text-ink">Test type</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {KINDS.map((k) => (
            <button key={k.value} type="button" aria-pressed={data.kind === k.value}
              onClick={() => set(k.value === "DRILL" ? { kind: "DRILL" } : { kind: "MOCK", drillSubject: null, difficulty: null })}
              className={cn("rounded-xl border px-4 py-3 text-left transition", data.kind === k.value ? "border-forest bg-forest-tint/60" : "border-black/10 bg-white hover:bg-sand")}>
              <span className="block text-sm font-semibold text-ink">{k.label}</span>
              <span className="block text-xs text-body">{k.hint}</span>
            </button>
          ))}
        </div>
      </fieldset>

      {data.kind === "DRILL" && (
        <div className="grid gap-5 rounded-xl bg-sand/60 p-4">
          <fieldset>
            <legend className="text-sm font-semibold text-ink">Drill subject</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {DRILL_SUBJECTS.map((subject) => (
                <Choice key={subject} selected={data.drillSubject === subject} onClick={() => set({ drillSubject: subject })}>
                  {drillSubjectLabels[subject]}
                </Choice>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="text-sm font-semibold text-ink">Difficulty</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {DIFFICULTIES.map((level) => (
                <Choice key={level} selected={data.difficulty === level} onClick={() => set({ difficulty: level })}>
                  {difficultyLabels[level]}
                </Choice>
              ))}
            </div>
          </fieldset>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Category">
          <select value={data.category} onChange={(e) => set({ category: e.target.value as ExamCategory })} className={inputClass}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {categoryLabels[c]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Exam" hint="Optional. Links the test to that exam's page.">
          <select value={data.examSlug ?? ""} onChange={(e) => set({ examSlug: e.target.value || null })} className={inputClass}>
            <option value="">Not linked</option>
            {exams.map((e) => (
              <option key={e.slug} value={e.slug}>
                {e.name}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Time limit (minutes)">
          <input type="number" min={1} max={600} value={data.durationMinutes} onChange={(e) => set({ durationMinutes: Number(e.target.value) })} className={inputClass} />
          {data.durationMinutes !== suggested && (
            <button type="button" onClick={() => set({ durationMinutes: suggested })} className="mt-1.5 text-xs font-semibold text-forest hover:underline">
              Use {suggested} min (about 1 minute per question)
            </button>
          )}
        </Field>
        <Field label="Marks for a correct answer">
          <input type="number" min={0.25} step={0.25} value={data.marksCorrect} onChange={(e) => set({ marksCorrect: Number(e.target.value) })} className={inputClass} />
        </Field>
      </div>

      <fieldset>
        <legend className="text-sm font-semibold text-ink">Negative marking for a wrong answer</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {negativeOptions.map((o) => (
            <button key={o.label} type="button" aria-pressed={data.marksWrong === o.value}
              onClick={() => set({ marksWrong: o.value })} className={cn(
                "h-10 rounded-xl border px-4 text-sm font-semibold transition",
                data.marksWrong === o.value ? "border-forest bg-forest text-white" : "border-black/10 bg-white text-ink hover:bg-sand",
              )}>
              {o.label}
              {o.value !== 0 && <span className="ml-1 font-normal opacity-80">({o.value})</span>}
            </button>
          ))}
          <label className={cn("flex h-10 items-center gap-2 rounded-xl border px-3 text-sm", custom ? "border-forest" : "border-black/10")}>
            <span className="font-semibold text-ink">Custom</span>
            <input type="number" max={0} step={0.01} value={data.marksWrong} onChange={(e) => set({ marksWrong: -Math.abs(Number(e.target.value)) })} className="w-20 bg-transparent text-right outline-none" aria-label="Custom negative marks" />
          </label>
        </div>
      </fieldset>

      <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl bg-sand/60 px-4 py-3">
        <span>
          <span className="block text-sm font-semibold text-ink">Show on the home page</span>
          <span className="block text-xs text-body">Featured tests appear in the Practice tab.</span>
        </span>
        <input type="checkbox" checked={data.featured} onChange={(e) => set({ featured: e.target.checked })} className="size-5 accent-forest" />
      </label>
    </div>
  );
}

const round = (n: number) => Math.round(n * 100) / 100;
