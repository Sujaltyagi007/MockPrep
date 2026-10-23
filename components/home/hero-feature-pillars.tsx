import Link from "next/link";
import { BookOpenCheck, LineChart, Newspaper, Target, ArrowUpRight } from "lucide-react";

const pillars = [
  {
    title: "1,000+ Assessments",
    tag: "Full + Sectional",
    description: "Timed exam-hall environment with instant All India Rank (AIR) and detailed solutions.",
    icon: BookOpenCheck,
    color: "emerald",
    bgIcon: "bg-emerald-50 text-emerald-700 ring-emerald-200/60",
    badge: "bg-emerald-100/80 text-emerald-800",
    href: "#practice",
  },
  {
    title: "Detailed Analytics",
    tag: "AI-Powered",
    description: "Deep performance breakdown by topic accuracy, time spent per question, and cut-off safety.",
    icon: LineChart,
    color: "amber",
    bgIcon: "bg-amber-50 text-amber-700 ring-amber-200/60",
    badge: "bg-amber-100/80 text-amber-800",
    href: "/test/gs-paper-1",
  },
  {
    title: "Current Affairs Digest",
    tag: "Daily & Weekly",
    description: "High-yield daily summaries paired with rapid 10-MCQ revision boosters for fast retention.",
    icon: Newspaper,
    color: "blue",
    bgIcon: "bg-sky-50 text-sky-700 ring-sky-200/60",
    badge: "bg-sky-100/80 text-sky-800",
    href: "#apply",
  },
  {
    title: "Personalized Study Plan",
    tag: "Adaptive",
    description: "Targeted roadmaps filtered by your exact qualification, syllabus weightage, and target exam.",
    icon: Target,
    color: "purple",
    bgIcon: "bg-purple-50 text-purple-700 ring-purple-200/60",
    badge: "bg-purple-100/80 text-purple-800",
    href: "#plan",
  },
];

export function HeroFeaturePillars() {
  return (
    <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {pillars.map((p) => {
        const Icon = p.icon;
        return (
          <Link
            key={p.title}
            href={p.href}
            className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-leaf-300 hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className={`flex size-11 items-center justify-center rounded-2xl ring-1 ${p.bgIcon}`}>
                  <Icon className="size-5" />
                </span>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${p.badge}`}>
                  {p.tag}
                </span>
              </div>
              <h3 className="mt-4 text-base font-bold text-navy-950 group-hover:text-leaf-800 transition-colors">
                {p.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                {p.description}
              </p>
            </div>

            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-leaf-700 opacity-90 group-hover:opacity-100">
              <span>Explore feature</span>
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
