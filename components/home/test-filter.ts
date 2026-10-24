"use client";
import { useSyncExternalStore } from "react";
import type { ExamCategory } from "@/lib/types";

type TestFilter = { query: string; category: ExamCategory | null };

const initial: TestFilter = { query: "", category: null };
let filter = initial;
const listeners = new Set<() => void>();

export function setTestFilter(patch: Partial<TestFilter>) {
  filter = { ...filter, ...patch };
  listeners.forEach((l) => l());
}

export function showTests(patch: Partial<TestFilter> = {}) {
  setTestFilter(patch);
  if (!document.getElementById("practice")) {
    location.href = "/mock-tests";
    return;
  }
  history.replaceState(null, "", "#practice");
  document.getElementById("practice")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useTestFilter(): TestFilter {
  return useSyncExternalStore(subscribe, () => filter, () => initial);
}
