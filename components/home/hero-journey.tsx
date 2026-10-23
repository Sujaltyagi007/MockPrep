import Link from "next/link";
import { CheckCircle2, ChevronRight, FileSpreadsheet, BookOpen, Layers, Trophy, Award } from "lucide-react";

const stages = [
  {
    step: "01",
    title: "Syllabus & PYQs",
    desc: "Analyze notification & 10-year question trends to prioritize high-yield topics.",
    icon: FileSpreadsheet,
    color: "emerald",
    bg: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  },
  {
    step: "02",
    title: "Concept Foundation",
    desc: "Build rock-solid clarity using standard books & curated syllabus notes.",
    icon: BookOpen,
    color: "leaf",
    bg: "bg-leaf-50 text-leaf-700 ring-leaf-200",
  },
  {
    step: "03",
    title: "Sectional Mastery",
    desc: "Targeted subject drills to eliminate recurring errors and build rapid speed.",
    icon: Layers,
    color: "sky",
    bg: "bg-sky-50 text-sky-700 ring-sky-200",
  },
  {
    step: "04",
    title: "Full Mocks & AIR",
    desc: "Simulate exam-hall pressure with authentic negative marking and All-India Rank.",
    icon: Trophy,
    color: "purple",
    bg: "bg-purple-50 text-purple-700 ring-purple-200",
  },
  {
    step: "05",
    title: "Interview & Selection",
    desc: "Board interview preparation, document checklists, and final merit list.",
    icon: Award,
    color: "amber",
    bg: "bg-amber-50 text-amber-700 ring-amber-200",
  },
];

export function HeroJourney() {
  return (
    <div className="mx-auto mt-12 sm:mt-16 max-w-5xl">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-leaf-700">
            Selection Blueprint
          </span>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-navy-950">
            Your 5-Stage Journey to Selection
          </h3>
        </div>
        <Link
          href="#apply"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-leaf-700 hover:text-leaf-800 hover:underline"
        >
          View Full Preparation Roadmap
          <ChevronRight className="size-4" />
        </Link>
      </div>

      <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          return (
            <div
              key={stage.step}
              className="relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-5 shadow-2xs transition hover:border-leaf-300 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-400">STAGE {stage.step}</span>
                  <span className={`flex size-8 items-center justify-center rounded-xl ring-1 ${stage.bg}`}>
                    <Icon className="size-4" />
                  </span>
                </div>
                <h4 className="mt-4 font-bold text-navy-950">{stage.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">{stage.desc}</p>
              </div>

              <div className="mt-5 flex items-center gap-1.5 text-2xs font-semibold text-leaf-700">
                <CheckCircle2 className="size-3.5" />
                <span>Essential Step</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
