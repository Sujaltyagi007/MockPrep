"use client";
import Link from "next/link";
import { Logo } from "./logo";
import { useState } from "react";
import { LanguageSwitch } from "./language-switch";
import { ReadingOptions } from "./reading-options";
import { Compass, Timer, FileCheck, BookOpen, HelpCircle, Search, ArrowRight, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Mock Tests", href: "#practice", icon: Timer, badge: "Popular" },
  { label: "Exams", href: "#exams", icon: Compass },
  { label: "Job Guides", href: "#apply", icon: FileCheck },
  { label: "Books", href: "#books", icon: BookOpen },
  { label: "FAQs", href: "#faq", icon: HelpCircle },
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);

    if (typeof window === "undefined") return;

    if (window.location.pathname === "/") {
      if (href === "#faq") {
        document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
      } else if (href.startsWith("#")) {
        window.location.hash = href;
        window.dispatchEvent(new Event("mockprep:hash"));
        document.getElementById("plan")?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = `/${href}`;
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNavClick("#exams");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Logo />
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map(({ label, href, icon: Icon, badge }) => (
              <button key={label} type="button" onClick={() => handleNavClick(href)} className="group relative flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-navy-950 cursor-pointer">
                <span>{label}</span>
                {badge && (
                  <span className="rounded-full bg-emerald-100 px-1.5 py-0.2 text-[10px] font-bold text-emerald-800">
                    {badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="hidden md:flex items-center">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search tests & exams..." className="h-9 w-40 rounded-full border border-slate-200 bg-slate-50 pl-8 pr-3 text-xs text-slate-700 transition-all placeholder:text-slate-400 focus:w-56 focus:border-leaf-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-leaf-500" />
          </form>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5">
          <LanguageSwitch />
          <ReadingOptions />
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
            className="inline-flex lg:hidden size-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 pb-6 pt-3 shadow-xl lg:hidden animate-in fade-in slide-in-from-top-2 duration-150">
          <form onSubmit={handleSearchSubmit} className="relative mb-3">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search mock tests, exams, syllabus..." className="h-10 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-leaf-500 focus:bg-white focus:outline-none" />
          </form>

          <ul className="space-y-1">
            {NAV_LINKS.map(({ label, href, icon: Icon, badge }) => (
              <li key={label}>
                <button type="button" onClick={() => handleNavClick(href)} className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-navy-950 active:bg-slate-100">
                  <div className="flex items-center gap-2.5">
                    <Icon className="size-4 text-leaf-600" />
                    <span>{label}</span>
                  </div>
                  {badge && (
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
                      {badge}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <Link href="/test/gs-paper-1" onClick={() => setMobileMenuOpen(false)} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-leaf-800 py-3 text-sm font-bold text-white shadow-md active:scale-98">
              <span>Start Free Mock Test</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
