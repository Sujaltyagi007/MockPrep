"use client";
import Link from "next/link";
import { Logo } from "./logo";
import { useEffect, useRef, useState } from "react";
import { showTests } from "@/components/home/test-filter";
import { Search, Zap, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Exams", href: "/exams" },
  { label: "Mock Tests", href: "/mock-tests" },
  { label: "Job Alerts", href: "/jobs" },
  { label: "Study Vault", href: "/vault" },
  { label: "Selection Roadmap", href: "/#roadmap" },
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInput.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    showTests({ query: searchQuery.trim(), category: null });
  };

  const searchField = (ref?: React.Ref<HTMLInputElement>) => (
    <form role="search" onSubmit={handleSearchSubmit} className="relative">
      <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden />
      <input ref={ref} type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search tests, syllabus, jobs..." aria-label="Search tests" className="h-10 w-full rounded-full border border-slate-200 bg-slate-50 pl-10 pr-12 text-sm text-slate-700 transition placeholder:text-slate-400 focus:border-leaf-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-leaf-500 md:w-56" />
      <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-slate-200 bg-white px-1.5 py-0.5 font-sans text-xs font-semibold text-slate-500 md:block">⌘K</kbd>
    </form>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-4 sm:gap-4 sm:px-8">
        <Logo />

        <nav aria-label="Main" className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={href} href={href} className="rounded-full px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-ink">
              {label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-2.5 lg:ml-0">
          <div className="hidden md:block">{searchField(searchInput)}</div>
          <Link href="/#practice" className="inline-flex h-11 items-center gap-1.5 rounded-full bg-linear-to-r from-leaf-800 to-leaf-700 px-4 sm:px-5 text-sm font-semibold text-white shadow-md shadow-leaf-700/20 transition hover:brightness-125">
            <Zap className="hidden size-4 sm:block" aria-hidden />
            Start Free
          </Link>
          <button type="button" onClick={() => setMobileMenuOpen((open) => !open)} aria-label="Toggle navigation menu" aria-expanded={mobileMenuOpen} className="grid size-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 lg:hidden">
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-slate-100 bg-white px-4 pb-5 pt-3 shadow-xl lg:hidden">
          <div className="md:hidden">{searchField()}</div>
          <ul className="mt-2 space-y-1">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a href={href} onClick={() => setMobileMenuOpen(false)} className="block rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-ink">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
