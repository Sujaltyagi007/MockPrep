"use client";
import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import { useStoredValue, writeItem } from "@/lib/local-store";

const PUZZLES = [
  {
    prompt: "Quantitative Speed Riddle: Train crossing a pole at 72 km/h in 15 seconds. Find the train's length?",
    options: ["300 Meters", "360 Meters"],
    answer: 0,
    hint: "Convert km/h to m/s by multiplying by 5/18, then length = speed × time.",
    explanation: "72 × 5/18 = 20 m/s, and 20 × 15 = 300 m.",
  },
  {
    prompt: "Simple Interest Sprint: ₹8,000 at 5% per annum for 3 years. Find the interest?",
    options: ["₹1,200", "₹1,000"],
    answer: 0,
    hint: "SI = P × R × T ÷ 100.",
    explanation: "8,000 × 5 × 3 ÷ 100 = ₹1,200.",
  },
  {
    prompt: "Percentage Flash: A price rises by 20% and then falls by 20%. What is the net change?",
    options: ["No change", "4% decrease"],
    answer: 1,
    hint: "Use a + b + ab/100 with a = 20 and b = −20.",
    explanation: "20 − 20 − 400/100 = −4%, a 4% decrease.",
  },
  {
    prompt: "Ratio Riddle: The ages of A and B are in the ratio 3 : 5 and add up to 64 years. Find B's age?",
    options: ["24 Years", "40 Years"],
    answer: 1,
    hint: "Total parts = 3 + 5 = 8, so one part = 64 ÷ 8.",
    explanation: "One part is 8 years, so B is 5 × 8 = 40 years.",
  },
  {
    prompt: "Work & Time: A finishes a job in 10 days and B in 15 days. How long do they take together?",
    options: ["6 Days", "12.5 Days"],
    answer: 0,
    hint: "Add one day's work: 1/10 + 1/15.",
    explanation: "1/10 + 1/15 = 1/6, so together they need 6 days.",
  },
];

const STREAK_KEY = "mockprep:daily-streak";

/** Days since the epoch in the visitor's own time zone. */
function today() {
  return Math.floor((Date.now() - new Date().getTimezoneOffset() * 60_000) / 86_400_000);
}

const noopSubscribe = () => () => {};

function parseStreak(raw: string | null): { last: number; count: number } {
  try {
    return raw ? JSON.parse(raw) : { last: -1, count: 0 };
  } catch {
    return { last: -1, count: 0 };
  }
}

export function DailyChallenge() {
  // null while rendering on the server; the puzzle settles on the visitor's date after hydration.
  const day = useSyncExternalStore(noopSubscribe, today, () => null);
  const streak = parseStreak(useStoredValue(STREAK_KEY));
  const [picked, setPicked] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);

  const puzzle = PUZZLES[(day ?? 0) % PUZZLES.length];
  const solvedToday = day !== null && streak.last === day;
  const currentStreak = day !== null && (solvedToday || streak.last === day - 1) ? streak.count : 0;
  const status = solvedToday ? "solved" : picked === null ? "open" : "wrong";

  function answer(idx: number) {
    setPicked(idx);
    if (idx !== puzzle.answer || day === null || solvedToday) return;
    const count = streak.last === day - 1 ? streak.count + 1 : 1;
    writeItem(STREAK_KEY, JSON.stringify({ last: day, count }));
  }

  return (
    <div id="daily-challenge" className="mt-8 scroll-mt-24 overflow-hidden rounded-3xl border border-amber-200/80 bg-linear-to-r from-amber-50 via-white to-leaf-50 p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
        <div className="flex min-w-0 flex-1 items-start gap-4">
          <div className="grid size-14 shrink-0 place-items-center rounded-2xl border border-amber-300 bg-amber-100 text-amber-700" aria-label={`${currentStreak}-day streak`}>
            <Flame className="size-5" aria-hidden />
            <span className="text-xs font-bold">{currentStreak > 0 ? `DAY ${currentStreak}` : "START"}</span>
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 font-semibold text-amber-800 ring-1 ring-amber-200">Daily Challenge Active</span>
              <span className="text-leaf-700">New puzzle every midnight</span>
            </div>
            <h3 className="mt-2 text-base font-bold leading-snug text-ink sm:text-lg">{puzzle.prompt}</h3>
            <p className="mt-1 text-xs text-slate-600 sm:text-sm" aria-live="polite">
              {status === "solved" && <span className="font-medium text-leaf-700">Correct! {puzzle.explanation} See you tomorrow.</span>}
              {status === "wrong" && (showHint ? puzzle.hint : <span className="font-medium text-rose-600">Not quite. Try the other answer or tap Hint.</span>)}
              {status === "open" && (showHint ? puzzle.hint : "Answer correctly to keep your preparation streak flame glowing!")}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {puzzle.options.map((option, idx) => (
            <button key={option} type="button" disabled={solvedToday} onClick={() => answer(idx)}
              className={cn(
                "h-11 rounded-xl border px-5 text-sm font-medium transition disabled:cursor-default",
                solvedToday && idx === puzzle.answer ? "border-leaf-400 bg-leaf-50 text-leaf-800"
                  : picked === idx && idx !== puzzle.answer ? "border-rose-300 bg-rose-50 text-rose-700"
                    : "border-slate-200 bg-white text-slate-800 hover:border-leaf-300 hover:bg-leaf-50",
              )}>
              {option}
            </button>
          ))}
          {!solvedToday && (
            <button type="button" onClick={() => setShowHint(true)} className="h-11 rounded-xl bg-leaf-700 px-5 text-sm font-bold text-white transition hover:bg-leaf-800">
              Hint
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
