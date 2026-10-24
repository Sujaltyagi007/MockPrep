"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRunningAttempt } from "@/context/test-session-context";

const statusStyles = {
  answered: "bg-leaf-600 text-white",
  "not answered": "bg-white text-red-700 ring-1 ring-inset ring-red-300",
  "marked for review": "bg-violet-600 text-white",
  "not visited": "bg-slate-100 text-slate-600",
} as const;

type Status = keyof typeof statusStyles;

const legend: { status: Status; label: string }[] = [
  { status: "answered", label: "Answered" },
  { status: "not answered", label: "Not answered" },
  { status: "marked for review", label: "For review" },
  { status: "not visited", label: "Not visited" },
];

export function QuestionPalette() {
  const { test, attempt, goTo, requestSubmit } = useRunningAttempt();
  const answered = Object.keys(attempt.answers).length;

  function statusOf(id: string): Status {
    if (attempt.marked.includes(id)) return "marked for review";
    if (attempt.answers[id] !== undefined) return "answered";
    if (attempt.visited.includes(id)) return "not answered";
    return "not visited";
  }

  return (
    <aside aria-label="Question palette" className="h-fit rounded-2xl border border-slate-200 bg-white p-5 lg:sticky lg:top-24">
      <h2 className="font-semibold text-ink">Questions</h2>
      <p className="mt-1 text-sm text-slate-600">{answered} answered · {test.questions.length - answered} remaining</p>
      <ol className="mt-4 grid grid-cols-5 gap-2">
        {test.questions.map((q, i) => {
          const status = statusOf(q.id);
          const current = i === attempt.current;
          return (
            <li key={q.id}>
              <button type="button" onClick={() => goTo(i)}
                aria-label={`Question ${i + 1}, ${status}`}
                aria-current={current ? "step" : undefined}
                className={cn("grid h-11 w-full place-items-center rounded-lg text-sm font-semibold",
                  statusStyles[status], current && "outline-2 outline-offset-2 outline-leaf-800",
                )}              >
                {i + 1}
              </button>
            </li>
          );
        })}
      </ol>
      <ul className="mt-5 grid grid-cols-2 gap-2 text-xs text-slate-600">
        {legend.map(({ status, label }) => (
          <li key={status} className="flex items-center gap-2">
            <span className={cn("size-3.5 rounded", statusStyles[status])} aria-hidden /> {label}
          </li>
        ))}
      </ul>
      <Button variant="success" onClick={requestSubmit} className="mt-6 w-full">
        Submit test
      </Button>
    </aside>
  );
}
