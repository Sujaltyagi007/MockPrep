"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ArrowRight, Check, Clock, Lightbulb, RotateCcw, X, Zap } from "lucide-react";

interface SampleQuestion {
  set: string;
  section: string;
  number: number;
  total: number;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  testSlug: string;
}

const SAMPLE_QUESTIONS: SampleQuestion[] = [
  {
    set: "Set A • UPSC Prelims",
    section: "General Studies",
    number: 4,    total: 25,
    prompt: "Which constitutional amendment introduced the Goods and Services Tax (GST) in India?",
    options: ["99th Constitutional Amendment", "101st Constitutional Amendment", "103rd Constitutional Amendment"],
    correctIndex: 1,
    explanation: "The Constitution (One Hundred and First Amendment) Act, 2016 introduced GST and inserted Article 246A, letting both Parliament and State Legislatures make GST laws.",
    testSlug: "gs-paper-1",
  },
  {
    set: "Set B • UPSC Prelims",
    section: "Indian Polity",
    number: 18,    total: 25,
    prompt: "Which Article guarantees the Right to Constitutional Remedies, called the 'Heart and Soul' of the Constitution by Dr. B.R. Ambedkar?",
    options: ["Article 21", "Article 32", "Article 226"],
    correctIndex: 1,
    explanation: "Article 32 lets citizens move the Supreme Court directly to enforce Fundamental Rights. Dr. Ambedkar called it the heart and soul of the Constitution.",
    testSlug: "gs-paper-1",
  },
  {
    set: "Set C • UPSC Prelims",
    section: "Polity",
    number: 9,    total: 25,
    prompt: "Which amendment replaced 'internal disturbance' with 'armed rebellion' as a ground for National Emergency?",
    options: ["42nd Amendment, 1976", "44th Amendment, 1978", "52nd Amendment, 1985"],
    correctIndex: 1,
    explanation: "The 44th Amendment Act, 1978 substituted 'armed rebellion' for 'internal disturbance' in Article 352 to guard against arbitrary emergency proclamations.",
    testSlug: "gs-paper-1",
  },
];

const START_SECONDS = 18 * 60 + 44;

export function LiveMockPreview() {
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(SAMPLE_QUESTIONS[0].correctIndex);
  const [revealed, setRevealed] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(START_SECONDS);
  const [running, setRunning] = useState(true);

  const q = SAMPLE_QUESTIONS[qIndex];

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : START_SECONDS)), 1000);
    return () => clearInterval(id);
  }, [running]);

  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const secs = String(secondsLeft % 60).padStart(2, "0");

  function choose(idx: number) {
    setSelected(idx);
    setRevealed(true);
  }

  function nextQuestion() {
    setQIndex((i) => (i + 1) % SAMPLE_QUESTIONS.length);
    setSelected(null);
    setRevealed(false);
  }

  return (
    <div className="relative mx-auto w-full max-w-2xl rounded-3xl border border-leaf-200/80 bg-white p-5 shadow-[0_24px_60px_-24px_rgba(6,78,59,0.25)] sm:p-8">
      <span className="absolute -top-3 right-4 inline-flex items-center gap-1 rounded-full bg-leaf-700 px-3 py-1 text-xs font-semibold text-white shadow-md sm:right-6 sm:text-xs">
        <Zap className="size-3.5" aria-hidden />
        Instant Negative-Marking Simulator
      </span>

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-leaf-800">
          <span className="relative flex size-2" aria-hidden>
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-leaf-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-leaf-500" />
          </span>
          Live Simulation Preview
        </span>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600">{q.set}</span>
          <button type="button" onClick={() => setRunning((r) => !r)} aria-label={running ? "Pause timer" : "Resume timer"} className="inline-flex items-center gap-1.5 rounded-full border border-leaf-200 bg-leaf-50 px-3 py-1 font-mono text-sm font-semibold tabular-nums text-slate-800">
            <Clock className="size-3.5 text-leaf-700" aria-hidden />
            {mins} : {secs}
          </button>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs uppercase tracking-wide text-slate-500">
          Question {String(q.number).padStart(2, "0")} of {q.total} • {q.section}
        </p>
        <span className="rounded-full border border-leaf-200 bg-leaf-50 px-2.5 py-1 text-xs font-bold text-leaf-800">
          +2.0 MARKS / -0.66 NEG
        </span>
      </div>

      <p className="mt-3 text-lg font-semibold leading-snug text-ink sm:text-xl">{q.prompt}</p>

      <div className="mt-5 space-y-3">
        {q.options.map((option, idx) => {
          const isSelected = selected === idx;
          const isCorrect = idx === q.correctIndex;
          const state = isSelected ? (isCorrect ? "right" : "wrong") : revealed && isCorrect ? "answer" : "idle";

          return (
            <button key={option} type="button" onClick={() => choose(idx)} aria-pressed={isSelected}
              className={cn(
                "flex w-full items-center gap-4 rounded-xl border px-4 py-3.5 text-left transition",
                state === "right" && "border-2 border-leaf-600 bg-leaf-50 font-semibold text-leaf-950",
                state === "wrong" && "border-2 border-rose-400 bg-rose-50 text-rose-950",
                state === "answer" && "border-dashed border-leaf-400 bg-leaf-50/40 text-leaf-900",
                state === "idle" && "border-slate-200 text-slate-600 hover:border-leaf-300 hover:bg-leaf-50/30",
              )}>
              <span className={cn(
                "grid size-7 shrink-0 place-items-center rounded-md text-xs font-semibold",
                state === "right" ? "bg-leaf-700 text-white" : state === "wrong" ? "bg-rose-600 text-white" : "bg-slate-100 text-slate-500",
              )}>
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1">{option}{state === "right" && " (Correct)"}</span>
              {state === "right" ? (
                <span className="grid size-5 place-items-center rounded-full bg-leaf-600 text-white"><Check className="size-3.5" strokeWidth={3} aria-hidden /></span>
              ) : state === "wrong" ? (
                <span className="grid size-5 place-items-center rounded-full bg-rose-500 text-white"><X className="size-3.5" strokeWidth={3} aria-hidden /></span>
              ) : (
                <span className="size-4 rounded-full border border-slate-300" aria-hidden />
              )}
            </button>
          );
        })}
      </div>

      {revealed && (
        <div className="mt-4 rounded-xl border border-leaf-100 bg-leaf-50/60 p-4 text-sm leading-relaxed text-slate-700" aria-live="polite">
          <p>{q.explanation}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={nextQuestion} className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50">
              <RotateCcw className="size-3.5" aria-hidden />
              Next question
            </button>
            <Link href={`/test/${q.testSlug}`} className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-leaf-800 px-3 text-xs font-semibold text-white hover:bg-leaf-700">
              Start full simulation
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <p className="flex items-center gap-1.5 text-xs text-slate-500">
          <Lightbulb className="size-4 text-leaf-600" aria-hidden />
          Detailed rationale &amp; NCERT reference attached
        </p>
        <span className="rounded-md bg-leaf-100 px-2 py-1 text-xs font-semibold text-leaf-800">Bilingual (EN / हिन्दी)</span>
      </div>
    </div>
  );
}
