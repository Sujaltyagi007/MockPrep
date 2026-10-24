import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

const eyebrowTones = {
  emerald: "bg-leaf-100 text-leaf-800",
  amber: "bg-amber-100 text-amber-800",
  violet: "bg-violet-100 text-violet-800",
} as const;

export function Section({ id, labelledBy, divider = true, className, children }: {
  id?: string;
  labelledBy?: string;
  divider?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className="mx-auto max-w-6xl scroll-mt-20 px-4 sm:px-8">
      <div className={cn("py-14 sm:py-20", divider && "border-t border-slate-200", className)}>{children}</div>
    </section>
  );
}

export function SectionHeading({ id, eyebrow, icon: Icon, tone = "emerald", title, description, aside, center }: {
  id: string;
  eyebrow: string;
  icon?: LucideIcon;
  tone?: keyof typeof eyebrowTones;
  title: string;
  description?: string;
  aside?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={cn("flex flex-col gap-4", center ? "items-center text-center" : "lg:flex-row lg:items-end lg:justify-between")}>
      <div className="max-w-2xl">
        <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider", eyebrowTones[tone])}>
          {Icon ? <Icon className="size-3.5" aria-hidden /> : <span className="size-1.5 rounded-full bg-current" aria-hidden />}
          {eyebrow}
        </span>
        <h2 id={id} className="mt-3 text-[clamp(1.625rem,1.15rem+1.6vw,2.5rem)] font-bold leading-tight tracking-tight text-ink">{title}</h2>
        {description && <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">{description}</p>}
      </div>
      {aside && <div className="lg:shrink-0">{aside}</div>}
    </div>
  );
}
