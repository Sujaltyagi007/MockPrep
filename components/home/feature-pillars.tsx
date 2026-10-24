import { cn } from "@/lib/utils";
import { ArrowRight, BellRing, ClipboardList, Route } from "lucide-react";

export function FeaturePillars({ testCount, guideCount }: { testCount: number; guideCount: number }) {
  const services = [
    {
      title: "Mock Tests",
      tag: `${testCount} Free Mocks`,
      description: "Timed, bilingual mocks in the real exam pattern, with negative marking and instant section-wise results.",
      icon: ClipboardList,
      href: "#practice",
      cta: "Take a mock",
      card: "border-leaf-200/80 from-leaf-50/80",
      tile: "from-leaf-600 to-leaf-800",
      badge: "bg-leaf-100 text-leaf-800",
      link: "text-leaf-800",
    },
    {
      title: "Job Alerts",
      tag: `${guideCount} Verified`,
      description: "Official notifications with eligibility, age limits and a direct link to the official portal. No sponsored clutter.",
      icon: BellRing,
      href: "#jobs",
      cta: "See job alerts",
      card: "border-amber-200/80 from-amber-50/80",
      tile: "from-amber-500 to-orange-600",
      badge: "bg-amber-100 text-amber-800",
      link: "text-orange-800",
    },
    {
      title: "Selection Roadmap",
      tag: "5 Stages",
      description: "Step-by-step guidance for every job: application form, admit card, exam, result, document verification and joining.",
      icon: Route,
      href: "#roadmap",
      cta: "Open the roadmap",
      card: "border-sky-200/80 from-sky-50/80",
      tile: "from-sky-500 to-blue-600",
      badge: "bg-sky-100 text-sky-800",
      link: "text-sky-800",
    },
  ];

  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {services.map(({ title, tag, description, icon: Icon, href, cta, card, tile, badge, link }, i) => (
        <li key={title}>
          <a href={href} className={cn("group flex h-full flex-col rounded-2xl border bg-linear-to-br to-white p-6 transition hover:-translate-y-0.5 hover:shadow-md", card)}>
            <span className="flex items-start justify-between">
              <span className={cn("grid size-11 place-items-center rounded-xl bg-linear-to-br text-white shadow-sm", tile)}>
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="text-xs font-bold text-slate-400">SERVICE {String(i + 1).padStart(2, "0")}</span>
            </span>
            <span className="mt-6 flex items-center justify-between gap-2">
              <span className="text-lg font-bold text-ink">{title}</span>
              <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold", badge)}>{tag}</span>
            </span>
            <span className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-600">{description}</span>
            <span className={cn("mt-5 inline-flex items-center gap-1 text-sm font-semibold", link)}>
              {cta}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
