"use client";
import { useEffect, useState } from "react";
import { Eye, X } from "lucide-react";
import { TestIntro } from "./test-intro";
import { TestHeader } from "./test-header";
import type { MockTest } from "@/lib/types";
import { QuestionCard } from "./question-card";
import { SubmitDialog } from "./submit-dialog";
import { QuestionPalette } from "./question-palette";
import { ResultsView } from "./results/results-view";
import { TestSessionProvider, useTestSession } from "@/context/test-session-context";

export function TestRunner({ test }: { test: MockTest }) {
  return (
    <TestSessionProvider test={test}>
      <TestScreen />
    </TestSessionProvider>
  );
}

function TestScreen() {
  const { status } = useTestSession();

  if (status === "intro") return <TestIntro />;
  if (status === "finished") return <ResultsView />;

  return (
    <div className="flex min-h-screen flex-col">
      <FocusMonitor />
      <TestHeader />
      <main className="mx-auto grid w-full max-w-6xl flex-1 gap-6 px-4 py-6 lg:grid-cols-[1fr_300px]">
        <QuestionCard />
        <QuestionPalette />
      </main>
      <SubmitDialog />
    </div>
  );
}

function FocusMonitor() {
  const { registerFocusLoss, attempt } = useTestSession();
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    let leftTest = false;
    function onVisibilityChange() {
      if (document.visibilityState === "hidden") {
        leftTest = true;
        registerFocusLoss();
      } else if (leftTest) {
        leftTest = false;
        setShowNotice(true);
      }
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [registerFocusLoss]);

  if (!showNotice) return null;

  return (
    <div role="status" className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-lg items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-amber-950 shadow-xl">
      <Eye className="mt-0.5 size-5 shrink-0 text-amber-700" aria-hidden />
      <div className="flex-1 text-sm">
        <p className="font-semibold">You left the test</p>
        <p className="mt-1">This activity is recorded on this device ({attempt?.focusLossCount ?? 0} time{attempt?.focusLossCount === 1 ? "" : "s"}). Keep this tab open to stay focused.</p>
      </div>
      <button type="button" onClick={() => setShowNotice(false)} aria-label="Dismiss notice" className="grid size-8 shrink-0 place-items-center rounded-lg text-amber-900 hover:bg-amber-100">
        <X className="size-4" aria-hidden />
      </button>
    </div>
  );
}
