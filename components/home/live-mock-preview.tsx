"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, XCircle, RotateCcw, Lightbulb, Clock, Sparkles } from "lucide-react";

interface SampleQuestion {
  id: string;
  category: string;
  questionNumber: number;
  totalQuestions: number;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  testSlug: string;
}

const SAMPLE_QUESTIONS: SampleQuestion[] = [
  {
    id: "q1",
    category: "UPSC CSE 2026 Prelims · Paper I",
    questionNumber: 4,
    totalQuestions: 100,
    prompt:
      "Which constitutional amendment act replaced the word 'internal disturbance' with 'armed rebellion' in the context of National Emergency?",
    options: [
      "42nd Constitutional Amendment Act, 1976",
      "44th Constitutional Amendment Act, 1978",
      "52nd Constitutional Amendment Act, 1985",
      "86th Constitutional Amendment Act, 2002",
    ],
    correctIndex: 1,
    explanation:
      "The 44th Constitutional Amendment Act of 1978 substituted 'armed rebellion' for 'internal disturbance' under Article 352 to safeguard against arbitrary proclamations of National Emergency.",
    testSlug: "gs-paper-1",
  },
  {
    id: "q2",
    category: "SSC CGL Tier-1 · General Awareness",
    questionNumber: 12,
    totalQuestions: 25,
    prompt:
      "Which constitutional amendment introduced the Goods and Services Tax (GST) and inserted Article 246A in India?",
    options: [
      "99th Constitutional Amendment Act",
      "101st Constitutional Amendment Act",
      "103rd Constitutional Amendment Act",
      "104th Constitutional Amendment Act",
    ],
    correctIndex: 1,
    explanation:
      "The Constitution (One Hundred and First Amendment) Act, 2016 introduced the Goods and Services Tax (GST) and inserted Article 246A, empowering both Parliament and State Legislatures to make laws regarding GST.",
    testSlug: "quant-reasoning-drill",
  },
  {
    id: "q3",
    category: "UPSC CSE GS Paper I · Indian Polity",
    questionNumber: 18,
    totalQuestions: 100,
    prompt:
      "Which Article guarantees the Right to Constitutional Remedies, described by Dr. B.R. Ambedkar as the 'Heart and Soul' of the Constitution?",
    options: [
      "Article 19 — Protection of certain freedoms",
      "Article 21 — Protection of life & personal liberty",
      "Article 32 — Remedies for enforcement of Fundamental Rights",
      "Article 226 — Power of High Courts to issue certain writs",
    ],
    correctIndex: 2,
    explanation:
      "Article 32 gives citizens the right to directly move the Supreme Court by appropriate proceedings for the enforcement of Fundamental Rights. Dr. Ambedkar called it the cornerstone and heart of the Constitution.",
    testSlug: "gs-paper-1",
  },
];

export function LiveMockPreview() {
  const [qIndex, setQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(1); // preselected on option B to match initial impression
  const [secondsLeft, setSecondsLeft] = useState(105); // 01:45
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  const currentQ = SAMPLE_QUESTIONS[qIndex];
  const isAnswered = selectedOption !== null;
  const isCorrect = selectedOption === currentQ.correctIndex;

  // Running countdown timer
  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 105));
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleSelectOption = (idx: number) => {
    setSelectedOption(idx);
  };

  const handleNextQuestion = () => {
    const nextIdx = (qIndex + 1) % SAMPLE_QUESTIONS.length;
    setQIndex(nextIdx);
    setSelectedOption(null);
  };

  return (
    <div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-leaf-950/5 transition-all">
      {/* Top Banner Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 border-b border-slate-100 bg-slate-50/90 px-4 py-3 text-xs sm:px-6">
        <div className="flex items-center justify-between sm:justify-start gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 px-2.5 py-0.5 text-[11px] sm:text-xs font-bold text-emerald-800 ring-1 ring-emerald-300/60">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-600" />
            </span>
            LIVE MOCK PREVIEW
          </span>
          <span className="hidden text-slate-400 sm:inline">•</span>
          <span className="truncate text-xs font-medium text-slate-700 sm:max-w-none">{currentQ.category}</span>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2.5">
          <button
            type="button"
            onClick={() => setIsTimerRunning((r) => !r)}
            title="Click to toggle timer"
            className="flex items-center gap-1.5 rounded-md bg-white px-2 py-1 font-mono text-xs font-semibold text-slate-700 shadow-2xs ring-1 ring-slate-200 hover:bg-slate-50"
          >
            <Clock className="size-3.5 text-leaf-600" aria-hidden />
            <span>Time Left: {formatTimer(secondsLeft)}</span>
          </button>
          <span className="rounded-md bg-emerald-50 px-2 py-1 font-bold text-emerald-700 ring-1 ring-emerald-200">
            +2.0 / -0.66
          </span>
        </div>
      </div>

      {/* Main Question Body */}
      <div className="p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-leaf-700">
            <span className="rounded-md bg-leaf-100 px-2 py-0.5 text-leaf-800">
              Question {currentQ.questionNumber} of {currentQ.totalQuestions}
            </span>
            <span className="text-slate-400">· Single Choice</span>
          </div>
          <button
            type="button"
            onClick={handleNextQuestion}
            className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-leaf-700"
          >
            <RotateCcw className="size-3" />
            Try another
          </button>
        </div>

        <p className="mt-3 text-base font-semibold leading-relaxed text-navy-950 sm:text-lg">
          {currentQ.prompt}
        </p>

        <div className="mt-5 space-y-2.5">
          {currentQ.options.map((option, idx) => {
            const letter = String.fromCharCode(65 + idx);
            const isSelected = selectedOption === idx;
            const isThisCorrect = idx === currentQ.correctIndex;

            let optionStyle =
              "border-slate-200 hover:border-leaf-400 hover:bg-leaf-50/30 text-slate-700";
            let circleStyle = "border-slate-300 text-slate-600 bg-white";

            if (isAnswered) {
              if (isSelected && isCorrect) {
                optionStyle =
                  "border-emerald-500 bg-emerald-50/70 text-emerald-950 ring-2 ring-emerald-500/20 shadow-2xs";
                circleStyle = "border-emerald-600 bg-emerald-600 text-white";
              } else if (isSelected && !isCorrect) {
                optionStyle =
                  "border-rose-400 bg-rose-50/70 text-rose-950 ring-2 ring-rose-400/20";
                circleStyle = "border-rose-600 bg-rose-600 text-white";
              } else if (isThisCorrect) {
                optionStyle =
                  "border-emerald-400/70 bg-emerald-50/40 text-emerald-900 border-dashed";
                circleStyle = "border-emerald-500 text-emerald-700 bg-emerald-100";
              } else {
                optionStyle = "border-slate-200 opacity-60 text-slate-500";
              }
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(idx)}
                className={cn(
                  "group flex w-full cursor-pointer items-center justify-between rounded-2xl border p-3.5 text-left text-sm transition-all sm:text-base",
                  optionStyle,
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex size-7 shrink-0 items-center justify-center rounded-xl border text-xs font-bold transition-all",
                      circleStyle,
                    )}
                  >
                    {letter}
                  </span>
                  <span className="font-medium leading-snug">{option}</span>
                </div>

                {isAnswered && (
                  <div className="shrink-0 pl-2">
                    {isSelected && isCorrect && (
                      <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700">
                        <CheckCircle2 className="size-4 text-emerald-600" />
                        <span className="hidden sm:inline">Correct (+2.0)</span>
                      </span>
                    )}
                    {isSelected && !isCorrect && (
                      <span className="flex items-center gap-1 text-xs font-semibold text-rose-600">
                        <XCircle className="size-4 text-rose-500" />
                        <span className="hidden sm:inline">Wrong (-0.66)</span>
                      </span>
                    )}
                    {!isSelected && isThisCorrect && (
                      <span className="text-xs font-medium text-emerald-700 hidden sm:inline">
                        Correct Answer
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Explanation Drawer */}
        {isAnswered && (
          <div className="mt-4 rounded-2xl border border-leaf-200/80 bg-leaf-50/60 p-4 text-sm text-slate-700 transition-all">
            <div className="flex items-center gap-2 font-semibold text-leaf-900">
              <Lightbulb className="size-4 text-amber-600" />
              <span>Explanation & Key Insight:</span>
            </div>
            <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-700">
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Card Footer Actions */}
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-100 pt-5">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Sparkles className="size-3.5 text-amber-500 shrink-0" />
            <span>Click any option to test your knowledge in real-time</span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <button
              type="button"
              onClick={handleNextQuestion}
              className="inline-flex min-h-[44px] sm:min-h-0 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 sm:py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 active:scale-98 transition"
            >
              <RotateCcw className="size-3.5" />
              Next Question
            </button>
            <Link
              href={`/test/${currentQ.testSlug}`}
              className="inline-flex min-h-[44px] sm:min-h-0 items-center justify-center gap-1.5 rounded-xl bg-leaf-700 px-4 py-2.5 sm:py-2 text-xs font-semibold text-white shadow-sm hover:bg-leaf-800 active:scale-98 transition"
            >
              Start Full Simulation
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
