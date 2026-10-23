"use client";
import { useState } from "react";
import { qualificationLabels } from "@/lib/i18n";
import type { Qualification } from "@/lib/types";
import { usePreferences } from "@/context/preferences-context";


export function usePersonalized<T>(items: T[], eligibility: (item: T) => Qualification[] | null) {
  const { qualification } = usePreferences();
  const [showAll, setShowAll] = useState(false);
  const matching = qualification ? items.filter((item) => eligibility(item)?.includes(qualification) ?? true) : items;
  const filtering = qualification !== null && !showAll;

  return {
    items: filtering ? matching : items,
    notice: <FilterNotice qualification={qualification} filtering={filtering} hiddenCount={items.length - matching.length} onToggle={() => setShowAll(!showAll)} />
  };
}

function FilterNotice({ qualification, filtering, hiddenCount, onToggle }: {
  qualification: Qualification | null;
  filtering: boolean;
  hiddenCount: number;
  onToggle: () => void;
}) {
  if (!qualification || hiddenCount === 0) return null;

  return (
    <p className="flex flex-wrap items-center justify-center gap-x-2 text-sm text-slate-500">
      <span>
        {filtering ? "Only what fits" : "Everything, not just"}{" "}
        <strong className="font-semibold text-navy-950">{qualificationLabels[qualification]}</strong>
      </span>
      <span aria-hidden>·</span>
      <button type="button" onClick={onToggle} className="min-h-11 font-semibold text-leaf-700 hover:underline">
        {filtering ? `Show all (${hiddenCount} more)` : "Show only mine"}
      </button>
    </p>
  );
}
