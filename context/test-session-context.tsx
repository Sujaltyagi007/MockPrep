"use client";
import type { Answers, MockTest } from "@/lib/types";
import { readItem, useStoredValue, writeItem } from "@/lib/local-store";
import { createContext, use, useCallback, useMemo, useState, type ReactNode } from "react";

export type Attempt = {
  startedAt: number;
  finishedAt?: number;
  answers: Answers;
  marked: string[];
  visited: string[];
  current: number;
  focusLossCount?: number;
};

export type TestStatus = "intro" | "running" | "finished";

type TestSessionContextValue = {
  test: MockTest;
  attempt: Attempt | null;
  status: TestStatus;
  deadline: number;
  confirmingSubmit: boolean;
  start: () => void;
  goTo: (index: number) => void;
  choose: (optionIndex: number) => void;
  clearAnswer: () => void;
  toggleMarked: () => void;
  registerFocusLoss: () => void;
  requestSubmit: () => void;
  cancelSubmit: () => void;
  submit: () => void;
  restart: () => void;
};

const TestSessionContext = createContext<TestSessionContextValue | null>(null);

function parseAttempt(raw: string | null): Attempt | null {
  try {
    return raw ? (JSON.parse(raw) as Attempt) : null;
  } catch {
    return null;
  }
}

export function TestSessionProvider({ test, children }: { test: MockTest; children: ReactNode }) {
  const storageKey = `mockprep:attempt:${test.id}`;
  const durationMs = test.durationMinutes * 60_000;

  const raw = useStoredValue(storageKey);
  const attempt = useMemo(() => parseAttempt(raw), [raw]);
  const [confirmingSubmit, setConfirmingSubmit] = useState(false);

  const update = useCallback((fn: (a: Attempt) => Attempt) => {
    const current = parseAttempt(readItem(storageKey));
    if (current) writeItem(storageKey, JSON.stringify(fn(current)));
  }, [storageKey]);
  const registerFocusLoss = useCallback(
    () => update((a) => ({ ...a, focusLossCount: (a.focusLossCount ?? 0) + 1 })),
    [update],
  );

  const value = useMemo<TestSessionContextValue>(() => {
    const status: TestStatus = !attempt ? "intro" : attempt.finishedAt === undefined ? "running" : "finished";
    const clamp = (i: number) => Math.max(0, Math.min(test.questions.length - 1, i));

    return {
      test,
      attempt,
      status,
      deadline: attempt ? attempt.startedAt + durationMs : 0,
      confirmingSubmit,

      start: () => writeItem(
        storageKey,
        JSON.stringify({
          startedAt: Date.now(),
          answers: {},
          marked: [],
          visited: [test.questions[0].id],
          current: 0,
          focusLossCount: 0,
        } satisfies Attempt),
      ),

      goTo: (index) => update((a) => {
        const i = clamp(index);
        const id = test.questions[i].id;
        return { ...a, current: i, visited: a.visited.includes(id) ? a.visited : [...a.visited, id] };
      }),

      choose: (optionIndex) =>
        update((a) => {
          const q = test.questions[a.current];
          if (optionIndex < 0 || optionIndex >= q.options.length) return a;
          return { ...a, answers: { ...a.answers, [q.id]: optionIndex } };
        }),

      clearAnswer: () =>
        update((a) => {
          const answers = { ...a.answers };
          delete answers[test.questions[a.current].id];
          return { ...a, answers };
        }),

      toggleMarked: () =>
        update((a) => {
          const id = test.questions[a.current].id;
          return { ...a, marked: a.marked.includes(id) ? a.marked.filter((m) => m !== id) : [...a.marked, id] };
        }),

      registerFocusLoss,
      requestSubmit: () => setConfirmingSubmit(true),
      cancelSubmit: () => setConfirmingSubmit(false),

      submit: () => {
        setConfirmingSubmit(false);
        update((a) =>
          a.finishedAt === undefined ? { ...a, finishedAt: Math.min(Date.now(), a.startedAt + durationMs) } : a,
        );
      },

      restart: () => writeItem(storageKey, null),
    };
  }, [attempt, confirmingSubmit, durationMs, registerFocusLoss, storageKey, test, update]);

  return <TestSessionContext value={value}>{children}</TestSessionContext>;
}

export function useTestSession(): TestSessionContextValue {
  const ctx = use(TestSessionContext);
  if (!ctx) throw new Error("useTestSession must be used inside <TestSessionProvider>");
  return ctx;
}

export function useRunningAttempt() {
  const session = useTestSession();
  if (!session.attempt) throw new Error("No attempt in progress");
  return { ...session, attempt: session.attempt };
}
