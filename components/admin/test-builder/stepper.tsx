import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export const BUILDER_STEPS = ["Upload", "Check questions", "Test details", "Publish"] as const;

export function Stepper({ current, onSelect, badges = {} }: { current: number; onSelect?: (step: number) => void; badges?: Partial<Record<number, string>> }) {
  return (
    <nav aria-label="Test builder steps" className="mb-6 overflow-x-auto">
      <ol className="flex min-w-max items-center gap-2">
        {BUILDER_STEPS.map((label, i) => {
          const done = i < current;
          const active = i === current;
          const clickable = Boolean(onSelect) && i > 0 && !active;
          const inner = (
            <span className="flex items-center gap-2">
              <span className={cn("grid size-7 place-items-center rounded-full text-xs font-bold", active && "bg-forest text-white", done && "bg-forest-tint text-forest", !active && !done && "bg-stone text-body")}>
                {done && i === 0 ? <Check className="size-3.5" aria-hidden /> : i + 1}
              </span>
              <span className={cn("text-sm font-semibold", active ? "text-ink" : "text-body")}>{label}</span>
              {badges[i] && <span className="rounded-full bg-honey px-2 py-0.5 text-xs font-bold text-olive">{badges[i]}</span>}
            </span>
          );
          return (
            <li key={label} className="flex items-center gap-2">
              {i > 0 && <span className="h-px w-6 bg-black/10" aria-hidden />}
              {clickable ? (
                <button type="button" onClick={() => onSelect?.(i)} className="rounded-xl px-2 py-2 hover:bg-white">
                  {inner}
                </button>
              ) : (
                <span aria-current={active ? "step" : undefined} className="px-2 py-2">
                  {inner}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
