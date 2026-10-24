import { BarChart3, Languages, MinusCircle, Monitor } from "lucide-react";

const features = [
  {
    title: "Exam-Style CBT Screen",
    text: "Question palette, mark-for-review and a running timer, laid out like the official computer-based test, so exam day feels familiar.",
    icon: Monitor,
  },
  {
    title: "Real Negative Marking",
    text: "Every test uses its official marking scheme (for example +2 / −0.66 in UPSC GS), so blind guessing costs marks here too.",
    icon: MinusCircle,
  },
  {
    title: "Switch EN / हिन्दी Anytime",
    text: "Bilingual tests switch language mid-test without losing a single answer.",
    icon: Languages,
  },
  {
    title: "Section-Wise Results",
    text: "Score, accuracy and marks for every section, your weakest section to revise next, and an explanation for each question.",
    icon: BarChart3,
  },
];

export function WhyMockPrep() {
  return (
    <section aria-labelledby="why-title" className="mx-auto max-w-6xl px-4 pb-16 sm:px-8 sm:pb-20">
      <span className="text-xs font-bold uppercase tracking-wider text-leaf-700">Built like the real exam</span>
      <h2 id="why-title" className="mt-2 max-w-2xl text-[clamp(1.625rem,1.15rem+1.6vw,2.5rem)] font-bold leading-tight tracking-tight text-ink">
        What Makes MockPrep Simulations Truly Exam-Ready
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
        Most test portals only show a score. MockPrep recreates the exam screen and shows exactly where you gain and lose marks.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ title, text, icon: Icon }) => (
          <li key={title} className="rounded-2xl border border-slate-200 bg-white p-5">
            <span className="grid size-10 place-items-center rounded-xl bg-leaf-200 text-leaf-900">
              <Icon className="size-5" aria-hidden />
            </span>
            <h3 className="mt-4 font-bold text-ink">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
