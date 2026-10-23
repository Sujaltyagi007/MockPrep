import Link from "next/link";
import { ArrowRight, PlayCircle, Zap, CheckCircle2, Sparkles } from "lucide-react";
import { LiveMockPreview } from "./live-mock-preview";
import { HeroFeaturePillars } from "./hero-feature-pillars";
import { HeroSprintBanner } from "./hero-sprint-banner";
import { HeroJourney } from "./hero-journey";
import { QualificationPicker } from "./qualification-picker";

export function Hero() {
  return (
    <section id="start" className="relative overflow-hidden bg-gradient-to-b from-leaf-50/70 via-white to-transparent pb-12 pt-16 sm:pb-20 sm:pt-24">
      <div className="pointer-events-none absolute -left-28 top-8 size-96 rounded-full bg-leaf-200/35 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-28 top-16 size-96 rounded-full bg-emerald-200/30 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-1.5 sm:gap-2 rounded-full border border-leaf-200/80 bg-white/95 px-3 py-1.5 text-[11px] sm:text-xs font-semibold text-leaf-800 shadow-2xs backdrop-blur-xs transition hover:border-leaf-300">
            <span className="flex items-center gap-1">
              <Sparkles className="size-3.5 text-amber-500 fill-amber-500 shrink-0" />
              <span>TRUSTED BY 1.2M+ ASPIRANTS</span>
            </span>
            <span className="text-leaf-300 hidden sm:inline">|</span>
            <a href="#exams" className="group flex items-center gap-0.5 text-leaf-700 hover:text-leaf-900">
              <span>Explore Categories</span>
              <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Main Headline */}
          <h1 className="mt-5 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-navy-950 break-words leading-tight sm:leading-none">
            Preparation,{" "}
            <span className="bg-linear-to-r from-leaf-700 via-leaf-600 to-emerald-500 bg-clip-text text-transparent">
              perfected.
            </span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 leading-relaxed px-1 sm:px-0">
            All-in-one UPSC, State PSC, SSC, Banking, and Defence platform. Learn faster, retain more, and clear the exam with personalized guidance &amp; daily mock drills.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 w-full sm:w-auto px-2 sm:px-0">
            <Link
              href="#practice"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-leaf-800 px-6 py-3 text-sm font-bold text-white shadow-md shadow-leaf-900/15 transition-all hover:bg-leaf-700 active:scale-98 min-h-[44px]"
            >
              Start Practice Free
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="#practice"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-navy-950 shadow-2xs transition-all hover:bg-slate-50 hover:border-slate-400 active:scale-98 min-h-[44px]"
            >
              <PlayCircle className="size-4 text-leaf-600" />
              Browse Mock Tests
            </Link>
            <Link
              href="#exams"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-2xs transition-all hover:bg-slate-50 active:scale-98 min-h-[44px]"
            >
              <Zap className="size-4 text-amber-500" />
              Daily Current Affairs
            </Link>
          </div>

          {/* Trust Checkmarks */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-medium text-slate-600">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
              <span>50,000+ Questions</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
              <span>4.9/5 Rating (12k+ Reviews)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
              <span>100% Real Exam UI</span>
            </div>
          </div>
        </div>

        {/* Live Mock Test Preview Card (The centerpiece) */}
        <div className="mt-12">
          <LiveMockPreview />
        </div>

        {/* 4 Feature Value Pillars */}
        <HeroFeaturePillars />

        {/* Daily 10-Question Sprint Live Alert Banner */}
        <HeroSprintBanner />

        {/* 5-Stage Selection Journey */}
        <HeroJourney />

        {/* Find Your Exact Prep Roadmap (Qualification Selector) */}
        <QualificationPicker variant="banner" />
      </div>
    </section>
  );
}
