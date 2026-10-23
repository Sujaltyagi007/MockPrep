"use client";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { LanguageToggle } from "./language-toggle";
import { useRunningAttempt } from "@/context/test-session-context";

export function TestHeader() {
  const { test, attempt } = useRunningAttempt();
  const answered = Object.keys(attempt.answers).length;
  const progress = answered / test.questions.length;

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <div className="min-w-0">
          <p className="truncate font-semibold text-navy-950">{test.title}</p>
          <p className="text-xs text-slate-500">{answered} of {test.questions.length} answered</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <LanguageToggle available={test.languages} />
          <Countdown />
        </div>
      </div>
      <div className="h-1 bg-slate-100" role="progressbar" aria-label="Questions answered" aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full bg-leaf-500 transition-[width] duration-300" style={{ width: `${progress * 100}%` }} />
      </div>
    </header>
  );
}

function Countdown() {
  const { deadline, test, submit } = useRunningAttempt();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const current = Date.now();
      setNow(current);
      if (current >= deadline) submit();
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [deadline, submit]);

  const remaining = now === null ? test.durationMinutes * 60_000 : deadline - now;
  const total = Math.max(0, Math.ceil(remaining / 1000));
  const label = `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;

  return (
    <span role="timer" aria-label="Time remaining" className={cn("flex h-11 items-center gap-1.5 rounded-full px-4 font-mono text-sm font-semibold", remaining < 60_000 ? "bg-red-100 text-red-700 motion-safe:animate-pulse" : remaining < 5 * 60_000 ? "bg-amber-100 text-amber-900" : "bg-navy-50 text-navy-900")}>
      <Clock className="size-4" aria-hidden /> {label}
    </span>
  );
}
