import { LiveMockPreview } from "./live-mock-preview";
import { ArrowRight, BadgeCheck, BellRing, Lock, Route, Star } from "lucide-react";

export function Hero() {
  return (
    <section id="start" className="relative overflow-hidden bg-linear-to-b from-leaf-50/70 via-white to-amber-50/50">
      <div className="pointer-events-none absolute left-1/2 top-0 h-112 w-176 -translate-x-1/2 rounded-full bg-leaf-200/40 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -left-40 top-96 size-96 rounded-full bg-amber-100/70 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-32 top-48 size-96 rounded-full bg-leaf-100/70 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-8 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-leaf-200 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-xs">
            <span className="size-2 rounded-full bg-leaf-500" aria-hidden /> Mock Tests • Job Alerts • Selection Roadmaps
            <span className="rounded-full bg-linear-to-r from-leaf-700 to-leaf-600 px-2 py-0.5 text-xs font-bold text-white">100% Free Forever</span>
          </p>

          <h1 className="mt-6 text-[clamp(2.5rem,1.2rem+3.8vw,4.5rem)] font-extrabold leading-none tracking-tighter text-ink">
            Preparation,{" "}
            <span className="bg-linear-to-r from-leaf-800 to-leaf-500 bg-clip-text text-transparent">perfected.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-[clamp(1rem,0.9rem+0.45vw,1.25rem)] leading-relaxed text-slate-600">
            Bilingual timed mock tests, verified job alerts, and a step-by-step roadmap from notification to selection. Zero paywalls.
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <a href="#practice" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-linear-to-r from-leaf-800 to-leaf-700 px-7 font-semibold text-white shadow-lg shadow-leaf-700/20 transition hover:brightness-125">
              Take a Free Mock Test
              <ArrowRight className="size-4" aria-hidden />
            </a>
            <a href="#jobs" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-leaf-300 bg-leaf-50/60 px-6 font-medium text-leaf-950 transition hover:bg-leaf-100/70">
              <BellRing className="size-4 text-leaf-700" aria-hidden />
              Latest Job Alerts
            </a>
            <a href="#roadmap" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 font-medium text-slate-800 transition hover:bg-slate-50">
              <Route className="size-4 text-sky-600" aria-hidden />
              Selection Roadmap
            </a>
          </div>

          <ul className="mt-7 flex flex-wrap items-center justify-center gap-2.5 text-xs text-slate-700 sm:text-sm">
            <li className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5">
              <BadgeCheck className="size-4 text-leaf-600" aria-hidden />
              48,000+ candidates joined
            </li>
            <li className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5">
              <Star className="size-4 fill-amber-400 text-amber-400" aria-hidden />
              <span className="font-semibold">4.9 / 5.0 Rating</span>
              <span className="text-slate-400">(12,400+ reviews)</span>
            </li>
            <li className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-leaf-900">
              <Lock className="size-4 text-leaf-600" aria-hidden />
              No Credit Card or Login
            </li>
          </ul>
        </div>

        <div className="mt-14">
          <LiveMockPreview />
        </div>
      </div>
    </section>
  );
}
