import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

const tones = {
  green: "bg-leaf-100 text-leaf-700",
  navy: "bg-navy-50 text-navy-800",
} as const;

export function IconBadge({ icon: Icon, tone = "green", className, }: { icon: LucideIcon; tone?: keyof typeof tones; className?: string; }) {
  return (
    <span className={cn("grid size-11 shrink-0 place-items-center rounded-xl", tones[tone], className)}>
      <Icon className="size-5" aria-hidden />
    </span>
  );
}
