"use client";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { usePreferences } from "@/context/preferences-context";
import { ArrowLeft, ArrowRight, Check, Flag } from "lucide-react";
import { useRunningAttempt } from "@/context/test-session-context";

export function QuestionCard() {
  const { lang } = usePreferences();
  const { test, attempt, confirmingSubmit, choose, clearAnswer, toggleMarked, goTo, requestSubmit } = useRunningAttempt();

  const index = attempt.current;
  const question = test.questions[index];
  const section = test.sections.find((s) => s.id === question.sectionId);
  const chosen = attempt.answers[question.id];
  const isMarked = attempt.marked.includes(question.id);
  const isLast = index === test.questions.length - 1;

  useEffect(() => {
    if (confirmingSubmit) return;
    function onKey(e: KeyboardEvent) {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const n = Number(e.key);
      if (n >= 1 && n <= 4) choose(n - 1);
      else if (e.key === "ArrowRight") goTo(index + 1);
      else if (e.key === "ArrowLeft") goTo(index - 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [confirmingSubmit, choose, goTo, index]);

  return (
    <section aria-labelledby="question-text" className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className="font-semibold text-slate-500">
          Question {index + 1} of {test.questions.length}
          {section && ` · ${t(section.name, lang)}`}
        </span>
        <span className="text-xs text-slate-500">
          +{test.marking.correct} correct
          {test.marking.wrong < 0 && ` · ${test.marking.wrong} wrong`}
        </span>
      </div>
      <h1 id="question-text" className="mt-3 text-xl font-semibold leading-snug text-navy-950 sm:text-2xl">
        {t(question.prompt, lang)}
      </h1>

      <div role="radiogroup" aria-labelledby="question-text" className="mt-6 space-y-3">
        {question.options.map((option, i) => {
          const selected = chosen === i;
          return (
            <button key={i} type="button" role="radio" aria-checked={selected} onClick={() => choose(i)} className={cn("flex min-h-14 w-full items-center gap-4 rounded-xl border-2 px-4 py-3 text-left transition-colors", selected ? "border-leaf-500 bg-leaf-50 font-semibold text-leaf-800" : "border-slate-200 text-navy-950 hover:border-slate-300 hover:bg-slate-50")}>
              <span className={cn("grid size-8 shrink-0 place-items-center rounded-lg text-sm font-bold", selected ? "bg-leaf-600 text-white" : "bg-slate-100 text-slate-600")}>{String.fromCharCode(65 + i)}</span>
              <span className="flex-1">{t(option, lang)}</span>
              {selected && <Check className="size-5 shrink-0 text-leaf-600" aria-hidden />}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button variant="outline" size="md" aria-pressed={isMarked} onClick={toggleMarked} className={cn(isMarked && "border-violet-500 bg-violet-50 text-violet-700 hover:bg-violet-50")}>
          <Flag className="size-4" aria-hidden /> {isMarked ? "Marked for review" : "Mark for review"}
        </Button>
        {chosen !== undefined && (
          <Button variant="outline" size="md" onClick={clearAnswer}>
            Clear answer
          </Button>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between gap-3 border-t border-slate-200 pt-6">
        <Button variant="outline" onClick={() => goTo(index - 1)} disabled={index === 0} className="px-5">
          <ArrowLeft className="size-5" aria-hidden /> Previous
        </Button>
        {isLast ? (
          <Button variant="success" onClick={requestSubmit} className="px-5">
            Submit test
          </Button>
        ) : (
          <Button onClick={() => goTo(index + 1)} className="px-5">
            Save &amp; next <ArrowRight className="size-5" aria-hidden />
          </Button>
        )}
      </div>
      <p className="mt-4 hidden text-xs text-slate-500 sm:block">Tip: press 1–4 to answer and ← → to move between questions.</p>
    </section>
  );
}
