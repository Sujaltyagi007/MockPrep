import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

const tones = {
  light: {
    on: "bg-navy-900 text-white",
    off: "border border-slate-300 bg-white text-navy-900 hover:bg-slate-50",
  },
  green: {
    on: "bg-leaf-600 text-white",
    off: "border border-slate-300 bg-white text-navy-900 hover:bg-slate-50",
  },
  dark: {
    on: "border border-leaf-500 bg-leaf-500 text-navy-950",
    off: "border border-white/25 bg-white/5 text-white hover:bg-white/10",
  },
} as const;

export function ToggleChip({ active, tone = "light", className, ...props }: { active: boolean; tone?: keyof typeof tones } & ComponentProps<"button">) {
  return (
    <button type="button" className={cn("h-11 rounded-full px-4 text-sm font-semibold transition-colors", active ? tones[tone].on : tones[tone].off, className,)} {...props} />
  );
}
