"use client";

import { Logo } from "./logo";
import { ArrowUp, BellRing, BookOpen, Compass, Flame, Globe, Route, ShieldCheck, Zap } from "lucide-react";

const QUICK_ACTIONS = [
  { href: "/exams", label: "Exams Directory", icon: Compass },
  { href: "/mock-tests", label: "Free Tests", icon: Zap },
  { href: "/jobs", label: "Verified Jobs", icon: BellRing },
  { href: "/vault", label: "Study Vault", icon: BookOpen },
  { href: "/#roadmap", label: "5-Stage Roadmap", icon: Route },
  { href: "/#daily-challenge", label: "Daily Puzzle", icon: Flame },
  { href: "/#accessibility", label: "Bilingual Mode", icon: Globe },
];

const COLUMNS = [
  {
    title: "Mock Tests",
    links: [
      { href: "/#practice", label: "Civil Services & UPSC" },
      { href: "/#practice", label: "Banking & SSC CGL" },
      { href: "/#practice", label: "Tech & Engineering" },
      { href: "/#daily-challenge", label: "Daily Timed Puzzle" },
      { href: "/mock-tests", label: "All Bilingual Tests" },
    ],
  },
  {
    title: "Job Alerts",
    links: [
      { href: "/jobs", label: "Verified Career Radar" },
      { href: "/#matcher", label: "Eligibility Checker" },
      { href: "/jobs", label: "Official Portal Links" },
      { href: "/#faq", label: "Verification Process" },
      { href: "/jobs", label: "Direct PDF Notices" },
    ],
  },
  {
    title: "Prep Roadmap",
    links: [
      { href: "/#roadmap", label: "1. Eligibility & Criteria" },
      { href: "/#roadmap", label: "2. Application Form Guide" },
      { href: "/#roadmap", label: "3. Tier-1 & Prelims" },
      { href: "/#roadmap", label: "4. Mains & Interview" },
      { href: "/#roadmap", label: "5. Document Verification" },
    ],
  },
  {
    title: "Platform & Trust",
    links: [
      { href: "/#accessibility", label: "English / हिन्दी Mode" },
      { href: "/#faq", label: "Zero Paywalls Policy" },
      { href: "/#faq", label: "Distraction-Free Pledge" },
      { href: "/#faq", label: "Frequently Asked Questions" },
      { href: "/#start", label: "Candidate Community" },
    ],
  },
];

export function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-slate-200/80 bg-slate-50/90 text-slate-600">
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-20 sm:pt-9 sm:px-8 md:pb-8">
        {/* Quick-Jump Action Bar for rapid navigation */}
        <div className="mb-7 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/70 pb-4">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 text-xs font-bold uppercase tracking-wider text-slate-400">Quick Jump:</span>
            {QUICK_ACTIONS.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-xs font-medium text-slate-700 shadow-2xs transition hover:border-leaf-300 hover:bg-leaf-50/60 hover:text-leaf-900"
              >
                <Icon className="size-3 text-leaf-600" aria-hidden />
                {label}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="hidden items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-xs font-medium text-slate-600 shadow-2xs transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 sm:inline-flex"
          >
            Top <ArrowUp className="size-3" aria-hidden />
          </button>
        </div>

        {/* Dense, Scannable Multi-Column Grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {/* Brand Info Column */}
          <div className="col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-1">
            <Logo animated={false} />
            <p className="mt-2.5 text-xs leading-relaxed text-slate-500">
              Distraction-free preparation launchpad engineered for competitive exam aspirants.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-full border border-leaf-200 bg-leaf-50 px-2 py-0.5 text-xs font-semibold text-leaf-800">
                <span className="size-1.5 rounded-full bg-leaf-500" aria-hidden />
                100% Free Public Initiative
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-0.5 text-xs font-semibold text-slate-600">
                <ShieldCheck className="size-3 text-leaf-600" aria-hidden />
                Zero Paywalls
              </span>
            </div>
          </div>

          {/* Directory Link Columns */}
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-xs font-bold uppercase tracking-wider text-ink">{col.title}</h2>
              <ul className="mt-2.5 space-y-1">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="inline-block py-0.5 text-xs text-slate-600 transition hover:text-leaf-700 hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Compact Bottom Bar */}
        <div className="mt-7 flex flex-col gap-2.5 border-t border-slate-200/70 pt-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p>© 2026 MockPrep. Free & Open Public Initiative.</p>
            <span className="hidden text-slate-300 sm:inline" aria-hidden>•</span>
            <p className="text-slate-400">Verify dates & eligibility on official commission portals.</p>
          </div>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 text-slate-600 transition hover:text-leaf-700 sm:hidden"
            aria-label="Scroll back to top"
          >
            Back to top
            <ArrowUp className="size-3" aria-hidden />
          </button>
        </div>
      </div>
    </footer>
  );
}

