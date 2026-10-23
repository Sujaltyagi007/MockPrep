"use client";
import Link from "next/link";
import { useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import { scoreAttempt } from "@/lib/scoring";
import { AnswerReview } from "./answer-review";
import { ScoreSummary } from "./score-summary";
import { LanguageToggle } from "../language-toggle";
import { SectionBreakdown } from "./section-breakdown";
import { Button, ButtonLink } from "@/components/ui/button";
import { useTestSession } from "@/context/test-session-context";

export function ResultsView() {
  const { test, attempt, restart } = useTestSession();
  const answers = useMemo(() => attempt?.answers ?? {}, [attempt]);
  const result = useMemo(() => scoreAttempt(test, answers), [test, answers]);
  if (!attempt?.finishedAt) return null;

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10">
      <div className="flex items-center justify-between gap-3">
        <Link href="/#tests" className="inline-flex h-11 items-center gap-2 text-sm font-semibold text-slate-600 hover:text-navy-950">
          <ArrowLeft className="size-4" aria-hidden /> All tests
        </Link>
        <LanguageToggle available={test.languages} />
      </div>

      <ScoreSummary test={test} result={result} timeTakenMs={attempt.finishedAt - attempt.startedAt} focusLossCount={attempt.focusLossCount ?? 0} />
      <SectionBreakdown test={test} result={result} />
      <AnswerReview test={test} answers={answers} />

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button onClick={restart} className="flex-1">Retake test</Button>
        <ButtonLink href="/#tests" variant="outline" className="flex-1">Try another test</ButtonLink>
      </div>
    </main>
  );
}
