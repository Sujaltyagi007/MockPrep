import { cn } from "@/lib/utils";
import { BookOpen, ClipboardCheck, FileSearch, ListTree, UserCheck } from "lucide-react";

const stages = [
  {
    title: "Notification Analysis",
    text: "Read the official notification end to end: eligibility, age limit, reservation rules, important dates and the exam pattern.",
    icon: FileSearch,
  },
  {
    title: "Syllabus Deconstruction",
    text: "Break the official syllabus into small topics, then use past papers to see which topics are asked most often.",
    icon: ListTree,
  },
  {
    title: "Foundation Study",
    text: "Build concepts from standard textbooks and NCERTs, and keep short revision notes for every topic.",
    icon: BookOpen,
    featured: true,
  },
  {
    title: "Test Series & Error Log",
    text: "Take timed sectional and full-length mocks, and log every wrong answer so the same mistake doesn't repeat.",
    icon: ClipboardCheck,
  },
  {
    title: "Interview & Document Check",
    text: "Prepare for the interview or skill test where there is one, and keep every certificate ready for document verification.",
    icon: UserCheck,
  },
];

export function PreparationLifecycle() {
  return (
    <section aria-labelledby="lifecycle-title" className="mx-auto max-w-6xl px-4 pb-16 sm:px-8 sm:pb-20">
      <div className="rounded-3xl border border-slate-200 bg-white/70 p-5 sm:p-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-leaf-700">
              <span className="size-1.5 rounded-full bg-leaf-700" aria-hidden />
              Step-by-step method
            </span>
            <h2 id="lifecycle-title" className="mt-2 text-[clamp(1.625rem,1.15rem+1.6vw,2.5rem)] font-bold leading-tight tracking-tight text-ink">5-Stage Examination Preparation Lifecycle</h2>
          </div>
          <p className="max-w-sm text-sm text-slate-600 lg:text-right">A simple order of preparation that works for most competitive exams, from the first notification to the final merit list.</p>
        </div>

        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {stages.map(({ title, text, icon: Icon, featured }, i) => (
            <li key={title} className={cn("rounded-2xl border p-5", featured ? "border-leaf-300 bg-leaf-50" : "border-slate-200 bg-white")}>
              <span className="flex items-center justify-between">
                <span className="grid size-8 place-items-center rounded-full bg-leaf-800 text-xs font-bold text-white">{String(i + 1).padStart(2, "0")}</span>
                <Icon className="size-5 text-leaf-700" aria-hidden />
              </span>
              <h3 className="mt-4 font-bold leading-snug text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
