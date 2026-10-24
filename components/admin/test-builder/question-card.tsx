"use client";
import { cn } from "@/lib/utils";
import { memo, useId } from "react";
import type { Dispatch } from "react";
import { Badge } from "@/components/admin/ui";
import type { DraftAction } from "./draft-reducer";
import { AlertTriangle, Check, Plus, Trash2, X } from "lucide-react";
import { questionIssues, type DraftQuestion } from "@/lib/import/draft";

const LETTERS = ["A", "B", "C", "D", "E", "F"];

const field = "w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-[14px] text-ink outline-none transition [field-sizing:content] placeholder:text-ink/35 focus:border-forest focus:ring-2 focus:ring-forest/20";

export const QuestionCard = memo(function QuestionCard({
  question: q,
  number,
  sectionListId,
  dispatch,
}: {
  question: DraftQuestion;
  number: number;
  sectionListId: string;
  dispatch: Dispatch<DraftAction>;
}) {
  const id = useId();
  const issues = questionIssues(q);
  const status = issues.length ? "fix" : q.approved ? "approved" : "ready";
  const set = (patch: Partial<DraftQuestion>) => dispatch({ type: "question", key: q.key, patch });

  const setOption = (i: number, text: string) => set({ options: q.options.map((o, k) => (k === i ? text : o)) });
  const removeOption = (i: number) =>
    set({
      options: q.options.filter((_, k) => k !== i),
      answerIndex: q.answerIndex === null || q.answerIndex === i ? null : q.answerIndex > i ? q.answerIndex - 1 : q.answerIndex,
    });

  return (
    <article aria-labelledby={`${id}-n`} className={cn(
      "rounded-2xl border bg-white p-4 shadow-2xs sm:p-5",
      status === "fix" && "border-honey border-l-4 border-l-sun",
      status === "ready" && "border-black/8",
      status === "approved" && "border-forest/25",
    )}
    >
      <header className="flex flex-wrap items-center gap-2">
        <h3 id={`${id}-n`} className="font-display text-base font-bold text-ink">
          Q{number}
        </h3>
        <label className="flex items-center gap-1.5 text-xs text-body">
          <span className="sr-only">Section</span>
          <input
            value={q.section}
            onChange={(e) => set({ section: e.target.value })}
            list={sectionListId}
            className="h-8 w-40 rounded-lg border border-black/10 bg-sand/60 px-2.5 text-xs font-semibold text-ink outline-none focus:border-forest"
            aria-label={`Section for question ${number}`}
          />
        </label>
        <span className="ml-auto">
          {status === "fix" && <Badge tone="yellow">Needs fixing</Badge>}
          {status === "ready" && <Badge tone="grey">Ready to approve</Badge>}
          {status === "approved" && <Badge tone="green">Approved</Badge>}
        </span>
      </header>

      <label className="mt-3 block">
        <span className="sr-only">Question {number} text</span>
        <textarea
          value={q.prompt}
          onChange={(e) => set({ prompt: e.target.value })}
          placeholder="Type the question"
          rows={2}
          className={cn(field, "min-h-16 font-medium")}
        />
      </label>

      <fieldset className="mt-3">
        <legend className="mb-2 text-xs font-semibold text-body">Options — tick the correct answer</legend>
        <ul className="space-y-2">
          {q.options.map((option, i) => {
            const correct = q.answerIndex === i;
            return (
              <li key={i} className={cn("flex items-center gap-2 rounded-xl p-1 pr-1.5", correct && "bg-forest-tint")}>
                <label className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-lg" title="Mark as correct answer">
                  <input type="radio" name={`${id}-answer`} checked={correct} onChange={() => set({ answerIndex: i })} className="size-4 accent-forest" aria-label={`Option ${LETTERS[i]} is correct`} />
                </label>
                <span className={cn("w-4 shrink-0 text-xs font-bold", correct ? "text-forest" : "text-body")}>{LETTERS[i]}</span>
                <input value={option} onChange={(e) => setOption(i, e.target.value)} placeholder={`Option ${LETTERS[i]}`} aria-label={`Option ${LETTERS[i]}`} className={cn(field, "h-10 py-0")} />
                <button type="button" onClick={() => removeOption(i)} aria-label={`Remove option ${LETTERS[i]}`} className="grid size-9 shrink-0 place-items-center rounded-lg text-ink/35 hover:bg-blush/50 hover:text-brick">
                  <X className="size-4" aria-hidden />
                </button>
              </li>
            );
          })}
        </ul>
        {q.options.length < LETTERS.length && (
          <button type="button" onClick={() => set({ options: [...q.options, ""] })} className="mt-2 inline-flex h-9 items-center gap-1.5 rounded-lg px-2 text-xs font-semibold text-forest hover:bg-forest-tint">
            <Plus className="size-3.5" aria-hidden /> Add option
          </button>
        )}
      </fieldset>

      <label className="mt-3 block">
        <span className="mb-1 block text-xs font-semibold text-body">
          Explanation <span className="font-normal">(optional — students see it after the test)</span>
        </span>
        <textarea value={q.explanation} onChange={(e) => set({ explanation: e.target.value })} rows={1} className={cn(field, "text-[13px]")} />
      </label>

      {issues.length > 0 && (
        <ul className="mt-3 space-y-1 rounded-xl bg-honey-soft px-3.5 py-2.5 text-sm text-olive">
          {issues.map((issue) => (
            <li key={issue} className="flex gap-2">
              <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden /> {issue}
            </li>
          ))}
        </ul>
      )}

      {q.source && (
        <details className="mt-3 text-xs text-body">
          <summary className="cursor-pointer font-semibold hover:text-ink">Compare with the text from the file</summary>
          <pre className="mt-2 max-h-60 overflow-auto whitespace-pre-wrap rounded-xl bg-sand p-3 font-sans leading-5">{q.source}</pre>
        </details>
      )}

      <footer className="mt-4 flex items-center justify-between gap-2 border-t border-black/5 pt-3">
        <div className="flex gap-1">
          <button type="button" onClick={() => dispatch({ type: "remove", key: q.key })} className="inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold text-brick hover:bg-blush/50">
            <Trash2 className="size-3.5" aria-hidden /> Delete
          </button>
          <button type="button" onClick={() => dispatch({ type: "add", afterKey: q.key })} className="inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold text-body hover:bg-sand hover:text-ink">
            <Plus className="size-3.5" aria-hidden /> Insert below
          </button>
        </div>
        <button type="button" aria-pressed={q.approved} disabled={issues.length > 0 && !q.approved} title={issues.length ? "Fix the problems above first" : undefined} onClick={() => set({ approved: !q.approved })} className={cn("inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50", q.approved ? "bg-forest-tint text-forest hover:bg-forest-tint/70" : "bg-forest text-white hover:brightness-110")}>
          <Check className="size-4" aria-hidden /> {q.approved ? "Approved" : "Approve"}
        </button>
      </footer>
    </article>
  );
});
