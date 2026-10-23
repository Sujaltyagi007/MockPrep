"use client";
import { cn } from "@/lib/utils";
import { BooksPanel } from "./books-panel";
import { ApplyPanel } from "./apply-panel";
import { ExamsPanel } from "./exams-panel";
import { PracticePanel } from "./practice-panel";
import { planTabs, tabFromHash, type PlanTabId } from "./plan-tabs-config";
import type { Book, ExamMatch, JobGuide, TestSummary } from "@/lib/types";
import { useEffect, useRef, useSyncExternalStore, type KeyboardEvent } from "react";

const HASH_EVENT = "mockprep:hash";

function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  window.addEventListener(HASH_EVENT, onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener(HASH_EVENT, onChange);
  };
}

function useActiveTab(): [PlanTabId, (id: PlanTabId) => void] {
  const hash = useSyncExternalStore(subscribe, () => location.hash, () => "");
  const select = (id: PlanTabId) => {
    history.replaceState(null, "", `#${id}`); // no jump: the tab bar is already in view
    window.dispatchEvent(new Event(HASH_EVENT));
  };
  return [tabFromHash(hash) ?? "exams", select];
}

export function PlanTabs({ exams, tests, guides, books }: { exams: ExamMatch[]; tests: TestSummary[]; guides: JobGuide[]; books: Book[] }) {
  const [active, select] = useActiveTab();
  const section = useRef<HTMLElement>(null);
  const tabRefs = useRef<Partial<Record<PlanTabId, HTMLButtonElement | null>>>({});

  useEffect(() => {
    function reveal() {
      if (tabFromHash(location.hash)) section.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    window.addEventListener("hashchange", reveal);
    return () => window.removeEventListener("hashchange", reveal);
  }, []);

  function onKeyDown(e: KeyboardEvent) {
    const i = planTabs.findIndex((t) => t.id === active);
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    const next = planTabs[(i + step + planTabs.length) % planTabs.length].id;
    select(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section ref={section} id="plan" aria-label="Your plan" className="mx-auto max-w-5xl scroll-mt-4 px-4 pb-16 pt-4">
      <div role="tablist" aria-label="Your plan" onKeyDown={onKeyDown} className="mx-auto grid max-w-xl grid-cols-4 gap-1 rounded-2xl bg-white p-1 shadow-sm ring-1 ring-slate-200">
        {planTabs.map(({ id, label, icon: Icon }) => {
          const selected = id === active;
          return (
            <button key={id} ref={(el) => { tabRefs.current[id] = el; }} type="button" role="tab" id={`tab-${id}`} aria-selected={selected} aria-controls={`panel-${id}`} tabIndex={selected ? 0 : -1} onClick={() => select(id)} className={cn("flex h-12 items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-colors", selected ? "bg-navy-900 text-white shadow" : "text-slate-600 hover:bg-slate-50 hover:text-navy-950")}>
              <Icon className="hidden size-4 sm:block" aria-hidden />
              {label}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`} tabIndex={0} className="mt-8 focus-visible:outline-none">
        {active === "exams" && <ExamsPanel exams={exams} guides={guides} />}
        {active === "practice" && <PracticePanel tests={tests} />}
        {active === "apply" && <ApplyPanel guides={guides} />}
        {active === "books" && <BooksPanel books={books} />}
      </div>
    </section>
  );
}
