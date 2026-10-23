"use client";
import { useSyncExternalStore } from "react";

const memory = new Map<string, string>();
const listeners = new Set<() => void>();

export function readItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return memory.get(key) ?? null;
  }
}

export function writeItem(key: string, value: string | null) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    if (value === null) memory.delete(key);
    else memory.set(key, value);
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export function useStoredValue(key: string): string | null {
  return useSyncExternalStore(subscribe, () => readItem(key), () => null);
}
