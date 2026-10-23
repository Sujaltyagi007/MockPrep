"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "./language-toggle";
import { ArrowLeft, ArrowRight, Check, ShieldCheck } from "lucide-react";
import { useTestSession } from "@/context/test-session-context";

export function TestIntro() {
  const { test, start } = useTestSession();
  const { correct, wrong } = test.marking;

  const rules = [
    `+${correct} marks for each correct answer.`,
    wrong < 0 ? `${wrong} marks for each wrong answer. Skipped questions score 0.` : "No negative marking — attempt every question.",
    "The test submits automatically when the timer reaches zero.",
    "Your answers are saved on this device, so you can safely refresh.",
    "Keep this tab open. Leaving the test is recorded on this device.",
  ];

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10">
      <Link href="/#tests" className="inline-flex h-11 items-center gap-2 text-sm font-semibold text-slate-600 hover:text-navy-950">
        <ArrowLeft className="size-4" aria-hidden /> All tests
      </Link>
      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-navy-950">{test.title}</h1>
        <p className="mt-2 text-slate-600">{test.summary}</p>

        <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
          {[
            ["Questions", test.questions.length],
            ["Minutes", test.durationMinutes],
            ["Sections", test.sections.length],
          ].map(([label, value]) => (
            <div key={label} className="flex flex-col-reverse rounded-xl bg-slate-50 py-4">
              <dt className="text-xs text-slate-500">{label}</dt>
              <dd className="text-2xl font-bold text-navy-950">{value}</dd>
            </div>
          ))}
        </dl>

        <h2 className="mt-8 font-semibold text-navy-950">Before you start</h2>
        <ul className="mt-3 space-y-2 text-slate-700">
          {rules.map((rule) => (
            <li key={rule} className="flex gap-2">
              <Check className="mt-0.5 size-5 shrink-0 text-leaf-600" aria-hidden /> {rule}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex gap-3 rounded-xl border border-navy-100 bg-navy-50 p-4 text-sm text-navy-800">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-leaf-700" aria-hidden />
          <p>For the best experience, take the test in one sitting and keep this tab open. Tab switches are noted on this device.</p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button onClick={start} className="flex-1">
            Start test <ArrowRight className="size-5" aria-hidden />
          </Button>
          <LanguageToggle available={test.languages} />
        </div>
      </div>
    </main>
  );
}
