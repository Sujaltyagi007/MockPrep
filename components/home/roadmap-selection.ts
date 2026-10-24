"use client";
import { useSyncExternalStore } from "react";

let selected: string | null = null;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useRoadmapJob(): string | null {
  return useSyncExternalStore(subscribe, () => selected, () => null);
}

export function setRoadmapJob(id: string) {
  selected = id;
  listeners.forEach((l) => l());
}

export function showRoadmap(id: string) {
  setRoadmapJob(id);
  history.replaceState(null, "", "#roadmap");
  document.getElementById("roadmap")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
