"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, RotateCcw, BellRing, ExternalLink, FileText, BadgeCheck,  Calendar, ArrowRight, ShieldCheck, CheckCircle2, X, Sparkles, BookOpen, Filter, Building2,
  Landmark, Cloud, Rocket, Shield,HelpCircle, TrendingUp,} from "lucide-react";
import {
  VERIFIED_JOBS_CATALOG,
  APPLICATION_WALKTHROUGH_STEPS,
  APPLICATION_FAQS,
  DEADLINE_CALENDAR,
  type VerifiedJob,
} from "@/lib/data/jobs-data";

export function JobsPortal() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [qualFilter, setQualFilter] = useState("ALL");
  const [scopeFilter, setScopeFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("CLOSING_SOON");
  const [matcherQual, setMatcherQual] = useState("GRADUATE");
  const [matcherStream, setMatcherStream] = useState("ALL");
  const [matcherState, setMatcherState] = useState("ALL");
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activeGuideJob, setActiveGuideJob] = useState<VerifiedJob | null>(null);

  const filteredJobs = useMemo(() => {
    return VERIFIED_JOBS_CATALOG.filter((job) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery =
          job.title.toLowerCase().includes(q) ||
          job.organization.toLowerCase().includes(q) ||
          job.shortOrg.toLowerCase().includes(q) ||
          job.salary.toLowerCase().includes(q) ||
          job.eligibleQualDisplay.toLowerCase().includes(q) ||
          job.stream.toLowerCase().includes(q) ||
          job.location.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // Category
      if (categoryFilter !== "ALL" && job.category !== categoryFilter) {
        return false;
      }

      // Qualification
      if (qualFilter !== "ALL") {
        if (qualFilter === "BTECH" && job.eligibleQual !== "BTECH") return false;
        if (qualFilter === "CLASS_12" && job.eligibleQual !== "CLASS_12") return false;
        if (qualFilter === "GRADUATE" && job.eligibleQual !== "GRADUATE" && job.eligibleQual !== "CLASS_12") return false;
      }

      // Scope
      if (scopeFilter !== "ALL" && job.scope !== scopeFilter) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "CLOSING_SOON") return a.daysRemaining - b.daysRemaining;
      if (sortBy === "VACANCIES_DESC") return b.vacancies - a.vacancies;
      if (sortBy === "SALARY_DESC") return b.salaryNum - a.salaryNum;
      if (sortBy === "LATEST") return a.id.localeCompare(b.id);
      return 0;
    });
  }, [searchQuery, categoryFilter, qualFilter, scopeFilter, sortBy]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim()) count++;
    if (categoryFilter !== "ALL") count++;
    if (qualFilter !== "ALL") count++;
    if (scopeFilter !== "ALL") count++;
    if (sortBy !== "CLOSING_SOON") count++;
    return count;
  }, [searchQuery, categoryFilter, qualFilter, scopeFilter, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setCategoryFilter("ALL");
    setQualFilter("ALL");
    setScopeFilter("ALL");
    setSortBy("CLOSING_SOON");
  };

  const handleApplyMatcher = (e: React.FormEvent) => {
    e.preventDefault();
    setQualFilter(matcherQual);
    if (matcherStream.includes("CS") || matcherStream.includes("Tech")) {
      setCategoryFilter("TECH");
    }
    // Scroll down to the job openings smoothly
    const listElem = document.getElementById("openings-list");
    if (listElem) {
      listElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes("@")) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmailInput("");
    }, 2000);
  };

  const getCategoryIcon = (category: VerifiedJob["category"]) => {
    switch (category) {
      case "CENTRAL":
        return Landmark;
      case "BANKING":
        return Building2;
      case "TECH":
        return Cloud;
      case "DEFENCE":
        return Shield;
      case "COMMISSION":
        return Rocket;
      default:
        return Building2;
    }
  };

  const getCategoryGradient = (category: VerifiedJob["category"]) => {
    switch (category) {
      case "CENTRAL":
        return "from-emerald-600 to-teal-700 text-white";
      case "BANKING":
        return "from-amber-500 to-orange-600 text-white";
      case "TECH":
        return "from-sky-500 to-blue-600 text-white";
      case "DEFENCE":
        return "from-slate-700 to-slate-900 text-white";
      case "COMMISSION":
        return "from-purple-600 to-indigo-700 text-white";
      default:
        return "from-emerald-600 to-teal-700 text-white";
    }
  };

  return (
    <div className="min-h-screen-dvh bg-slate-50/60 pb-16">
      {/* Hero Header Section */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-linear-to-b from-emerald-50/70 via-white to-slate-50/50 pt-10 pb-12 sm:pt-14 sm:pb-16">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-160 -translate-x-1/2 rounded-full bg-emerald-200/30 blur-3xl" aria-hidden />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-8">
          {/* Eyebrow Pill */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-white/90 px-3 py-1 text-xs font-semibold text-emerald-900 shadow-2xs">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-600" />
              </span>
              Live Government &amp; Public Sector Employment Alerts • Verified with Official Commission Portals
            </span>
          </div>

          {/* Large Title & Subtitle */}
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Verified Job Radar &amp;{" "}
            <span className="bg-linear-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
              Application Guides
            </span>
          </h1>
          <p className="mt-3.5 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Zero clickbait, zero fake employment circulars. Every recruitment notification below is checked against official union/state commissions, and paired with free syllabus guides, genuine PDFs, and step-by-step application walkthroughs.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#eligibility-matcher"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-linear-to-r from-emerald-950 to-emerald-800 px-5 text-sm font-semibold text-white shadow-md shadow-emerald-950/20 transition hover:brightness-125"
            >
              <Sparkles className="size-4" aria-hidden />
              Check My Eligibility
            </a>
            <a
              href="#walkthrough"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-emerald-300 bg-white px-5 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50/80"
            >
              <BookOpen className="size-4 text-emerald-700" aria-hidden />
              View Application Walkthrough
            </a>
          </div>

          {/* Key Stat Counters (4-card metric strip) */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs transition hover:border-slate-300">
              <span className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">184</span>
              <p className="mt-1 text-xs font-medium text-slate-500">Active Verified Openings</p>
            </div>
            <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs transition hover:border-slate-300">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">32,400+</span>
                <span className="text-emerald-600" aria-hidden>
                  <TrendingUp className="size-4" />
                </span>
              </div>
              <p className="mt-1 text-xs font-medium text-slate-500">Aggregated Vacancies</p>
            </div>
            <div className="rounded-2xl border border-rose-200/80 bg-rose-50/30 p-4 shadow-2xs transition hover:border-rose-300">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold tracking-tight text-rose-700 sm:text-3xl">14</span>
                <span className="rounded bg-rose-100 px-1.5 py-0.5 text-xs font-bold uppercase tracking-wider text-rose-700">
                  CLOSING SOON
                </span>
              </div>
              <p className="mt-1 text-xs font-medium text-rose-900/70">Applications Ending Shortly</p>
            </div>
            <div className="rounded-2xl border border-emerald-900/20 bg-linear-to-br from-emerald-950 to-emerald-900 p-4 text-white shadow-md shadow-emerald-950/20">
              <span className="text-2xl font-extrabold tracking-tight sm:text-3xl">100% Free</span>
              <p className="mt-1 text-xs font-medium text-emerald-200">Public Syllabus &amp; Vaults</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        {/* Search & Filter Bar */}
        <section aria-label="Search and filter job alerts" className="sticky top-16 z-20 mt-6">
          <div className="rounded-2xl border border-slate-200/90 bg-white/95 p-3 shadow-md shadow-slate-200/50 backdrop-blur-md sm:p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              {/* Search input */}
              <div className="relative min-w-0 flex-1">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title, department, pay scale, or qualification..."
                  className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-800 transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              {/* Filter Dropdowns */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Category Dropdown */}
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  aria-label="Filter by category"
                  className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 transition focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="ALL">All Categories</option>
                  <option value="CENTRAL">Central Govt</option>
                  <option value="BANKING">Banking &amp; PSU</option>
                  <option value="TECH">Engineering &amp; IT</option>
                  <option value="DEFENCE">Defence &amp; Police</option>
                  <option value="COMMISSION">Staff Selection</option>
                </select>

                {/* Education Dropdown */}
                <select
                  value={qualFilter}
                  onChange={(e) => setQualFilter(e.target.value)}
                  aria-label="Filter by education level"
                  className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 transition focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="ALL">All Education Levels</option>
                  <option value="GRADUATE">Graduate / Any Degree</option>
                  <option value="BTECH">B.E. / B.Tech / MCA</option>
                  <option value="CLASS_12">10+2 / Higher Secondary</option>
                </select>

                {/* Scope Dropdown */}
                <select
                  value={scopeFilter}
                  onChange={(e) => setScopeFilter(e.target.value)}
                  aria-label="Filter by state or central scope"
                  className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 transition focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="ALL">All State / Central</option>
                  <option value="CENTRAL">Central Government</option>
                  <option value="PAN_INDIA">Pan-India Posting</option>
                </select>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort openings"
                  className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 transition focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="CLOSING_SOON">Closing Soon First</option>
                  <option value="VACANCIES_DESC">Highest Vacancies</option>
                  <option value="SALARY_DESC">Pay Scale (High to Low)</option>
                  <option value="LATEST">Latest Added</option>
                </select>

                {/* Reset Filters button */}
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 px-3 text-xs font-medium text-slate-700 hover:bg-slate-200 hover:text-ink transition"
                  >
                    <RotateCcw className="size-3.5" aria-hidden />
                    Reset ({activeFilterCount})
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 2-Column Main Section: Job Cards (Left) + Sidebar (Right) */}
        <div id="openings-list" className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column: Job Cards List */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-ink">Priority Governed Openings</h2>
                <p className="mt-0.5 text-xs text-slate-500">
                  Showing {filteredJobs.length} of {VERIFIED_JOBS_CATALOG.length} positions
                  {qualFilter !== "ALL" && ` • Filtered for ${qualFilter}`}
                </p>
              </div>
              <span className="hidden items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-800 sm:inline-flex">
                <BadgeCheck className="size-3.5 text-emerald-600" aria-hidden />
                100% Commission Verified
              </span>
            </div>

            {/* List of Job Cards */}
            {filteredJobs.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-xs">
                <Building2 className="mx-auto size-10 text-slate-400" aria-hidden />
                <h3 className="mt-3 text-base font-semibold text-slate-800">No matching job alerts found</h3>
                <p className="mt-1 text-xs text-slate-500">
                  Try clearing your search query or broadening your qualification and category filters.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-900 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-800"
                >
                  <RotateCcw className="size-3.5" aria-hidden />
                  Reset all filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map((job) => {
                  const Icon = getCategoryIcon(job.category);
                  const gradientClass = getCategoryGradient(job.category);

                  return (
                    <article
                      key={job.id}
                      id={job.id}
                      className="group relative rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition hover:border-emerald-300 hover:shadow-md sm:p-6"
                    >
                      {/* Top Header Row with Icon & Badges */}
                      <div className="flex items-start gap-4">
                        {/* Category Icon Badge */}
                        <div
                          className={`grid size-12 shrink-0 place-items-center rounded-xl bg-linear-to-br shadow-xs ${gradientClass}`}
                        >
                          <Icon className="size-6" aria-hidden />
                        </div>

                        {/* Title, Dept & Badges */}
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            {job.badges.map((b, idx) => {
                              const badgeColor =
                                b.tone === "rose"
                                  ? "border-rose-200 bg-rose-50 text-rose-700"
                                  : b.tone === "amber"
                                  ? "border-amber-200 bg-amber-50 text-amber-800"
                                  : b.tone === "sky"
                                  ? "border-sky-200 bg-sky-50 text-sky-800"
                                  : b.tone === "indigo"
                                  ? "border-indigo-200 bg-indigo-50 text-indigo-800"
                                  : "border-emerald-200 bg-emerald-50 text-emerald-800";
                              return (
                                <span
                                  key={idx}
                                  className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold ${badgeColor}`}
                                >
                                  {b.tone === "emerald" && <span className="mr-1 size-1.5 rounded-full bg-emerald-500" />}
                                  {b.text}
                                </span>
                              );
                            })}
                          </div>

                          {/* Job Title */}
                          <h3 className="mt-2 text-base font-bold leading-snug text-ink sm:text-lg group-hover:text-emerald-900 transition-colors">
                            {job.title}
                          </h3>

                          {/* Department / Conducting Body */}
                          <p className="mt-0.5 text-xs text-slate-500">
                            {job.organization}
                          </p>
                        </div>

                        {/* Salary Highlight */}
                        <div className="hidden shrink-0 text-right sm:block">
                          <span className="text-sm font-extrabold text-ink">{job.salary.split("/")[0]}</span>
                          <p className="text-xs text-slate-400">
                            {job.salary.includes("/") ? "/" + job.salary.split("/")[1] : "Pay Scale"}
                          </p>
                        </div>
                      </div>

                      {/* Mobile Salary Pill */}
                      <div className="mt-3 block rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 sm:hidden">
                        Pay Scale: <span className="font-bold text-ink">{job.salary}</span>
                      </div>

                      {/* 4-Chip Metadata Grid */}
                      <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-slate-50/70 p-3 text-xs sm:grid-cols-4">
                        <div>
                          <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Vacancies
                          </span>
                          <span className="font-semibold text-slate-800">{job.vacanciesDisplay}</span>
                        </div>
                        <div>
                          <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Qualification
                          </span>
                          <span className="font-semibold text-slate-800 truncate block" title={job.eligibleQualDisplay}>
                            {job.eligibleQualDisplay}
                          </span>
                        </div>
                        <div>
                          <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Location
                          </span>
                          <span className="font-semibold text-slate-800 truncate block" title={job.location}>
                            {job.location}
                          </span>
                        </div>
                        <div>
                          <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Application Closes
                          </span>
                          <span className={`font-semibold ${job.isClosingSoon ? "text-rose-600" : "text-slate-800"}`}>
                            {job.deadlineDisplay}
                          </span>
                        </div>
                      </div>

                      {/* Bottom Action Buttons */}
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <a
                            href={job.officialNoticeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-ink"
                          >
                            <FileText className="size-3.5 text-slate-500" aria-hidden />
                            Official Notification (PDF)
                          </a>

                          <button
                            type="button"
                            onClick={() => {
                              setQualFilter(job.eligibleQual);
                              const matcherSection = document.getElementById("eligibility-matcher");
                              if (matcherSection) matcherSection.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/70 px-3 py-1.5 text-xs font-medium text-emerald-900 transition hover:bg-emerald-100"
                          >
                            <CheckCircle2 className="size-3.5 text-emerald-600" aria-hidden />
                            Check My Eligibility
                          </button>
                        </div>

                        {/* Step-by-Step Guide Modal Trigger or Apply */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setActiveGuideJob(job)}
                            className="inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-emerald-950 to-emerald-800 px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:brightness-125"
                          >
                            Step-by-Step Guide
                            <ArrowRight className="size-3.5" aria-hidden />
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Sticky Sidebar Widgets */}
          <aside className="space-y-6">
            {/* Widget 1: Eligibility Matcher */}
            <div
              id="eligibility-matcher"
              className="rounded-2xl border border-emerald-200/90 bg-white p-5 shadow-xs transition hover:border-emerald-300"
            >
              <div className="flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-lg bg-emerald-100 text-emerald-800">
                  <Sparkles className="size-4" aria-hidden />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-ink">Eligibility Matcher</h3>
                  <p className="text-xs text-slate-500">Find jobs matching your exact qualifications</p>
                </div>
              </div>

              <form onSubmit={handleApplyMatcher} className="mt-4 space-y-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Your Highest Qualification
                  </label>
                  <select
                    value={matcherQual}
                    onChange={(e) => setMatcherQual(e.target.value)}
                    className="mt-1 h-9 w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 text-xs font-medium text-slate-800 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="GRADUATE">Any Graduate / Bachelor&apos;s</option>
                    <option value="BTECH">B.Tech / B.E. / MCA</option>
                    <option value="CLASS_12">10+2 / Higher Secondary</option>
                    <option value="POSTGRADUATE">Postgraduate / Master&apos;s</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Discipline / Stream
                  </label>
                  <select
                    value={matcherStream}
                    onChange={(e) => setMatcherStream(e.target.value)}
                    className="mt-1 h-9 w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 text-xs font-medium text-slate-800 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="ALL">All Streams / General</option>
                    <option value="CS">Computer Science / IT</option>
                    <option value="COMMERCE">Commerce &amp; Accounts</option>
                    <option value="SCIENCE">Pure Science / Math</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Posting Preference
                  </label>
                  <select
                    value={matcherState}
                    onChange={(e) => setMatcherState(e.target.value)}
                    className="mt-1 h-9 w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 text-xs font-medium text-slate-800 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="ALL">Pan-India / All Locations</option>
                    <option value="CENTRAL">Central Headquarters (Delhi)</option>
                    <option value="STATE">Regional / State Cadres</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="mt-2 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-xl bg-linear-to-r from-emerald-950 to-emerald-800 text-xs font-semibold text-white shadow-sm transition hover:brightness-125"
                >
                  <Filter className="size-3.5" aria-hidden />
                  Filter Matching Jobs
                </button>
              </form>
            </div>

            {/* Widget 2: Zero Spam Free Job Alerts */}
            <div className="rounded-2xl border border-slate-200 bg-linear-to-br from-emerald-50/60 via-white to-amber-50/40 p-5 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-lg bg-emerald-500/15 text-emerald-800">
                  <BellRing className="size-4 text-emerald-700" aria-hidden />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-ink">Zero-Spam Free Job Alerts</h3>
                  <span className="inline-block rounded-full bg-emerald-100 px-1.5 py-0.2 text-xs font-bold text-emerald-800">
                    OFFICIAL COMMISSIONS ONLY
                  </span>
                </div>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Get instant notification alerts on your device. Only genuine notifications verified against official commission portals.
              </p>

              {subscribed ? (
                <div className="mt-3 rounded-xl border border-emerald-300 bg-emerald-50 p-3 text-center text-xs font-medium text-emerald-900">
                  <CheckCircle2 className="mx-auto size-5 text-emerald-600" />
                  <p className="mt-1 font-semibold">Subscribed successfully!</p>
                  <p className="text-xs text-emerald-700">You will receive direct notification digests.</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="mt-3 space-y-2">
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter your email address..."
                    className="h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <button
                    type="submit"
                    className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-xl bg-slate-900 text-xs font-semibold text-white transition hover:bg-slate-800"
                  >
                    Subscribe / Alert Me
                  </button>
                  <p className="text-center text-xs text-slate-400">Zero spam. Unsubscribe anytime with 1-click.</p>
                </form>
              )}
            </div>

            {/* Widget 3: Weekly Deadline Calendar */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Calendar className="size-4 text-emerald-700" aria-hidden />
                  <h3 className="text-sm font-bold text-ink">Weekly Deadline Calendar</h3>
                </div>
                <span className="rounded bg-rose-100 px-1.5 py-0.5 text-xs font-bold text-rose-700">
                  Closing Soon
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {DEADLINE_CALENDAR.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    className="group block rounded-xl border border-slate-100 bg-slate-50/60 p-2.5 transition hover:border-emerald-200 hover:bg-emerald-50/40"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">
                        {item.day} <span className="font-normal text-slate-400">({item.date})</span>
                      </span>
                      <span
                        className={`rounded px-1.5 py-0.2 text-xs font-semibold ${
                          item.tone === "rose"
                            ? "bg-rose-100 text-rose-700"
                            : item.tone === "amber"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-1 text-xs font-medium text-slate-700 group-hover:text-emerald-900">
                      {item.title}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Section: The 4-Step Application Walkthrough */}
        <section id="walkthrough" className="mt-20 scroll-mt-24">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900">
              <ShieldCheck className="size-3.5 text-emerald-600" aria-hidden />
              OFFICIAL COMMISSION PROTOCOLS
            </span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              The 4-Step Application Walkthrough
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-xs sm:text-sm text-slate-600">
              Over 62% of rejected applications happen due to avoidable errors during registration. Every MockPrep job guide provides step-by-step guidance, upload photo/signature specs, and verified fee details.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {APPLICATION_WALKTHROUGH_STEPS.map((step) => (
              <div
                key={step.number}
                className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-emerald-300 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-slate-200 group-hover:text-emerald-500 transition-colors">
                    {step.number}
                  </span>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-800 border border-emerald-200/60">
                    Step {step.number}
                  </span>
                </div>
                <h3 className="mt-3 text-base font-bold text-ink">{step.title}</h3>
                <p className="text-xs font-semibold text-emerald-700">{step.tagline}</p>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{step.description}</p>

                <div className="mt-4 flex flex-wrap gap-1 border-t border-slate-100 pt-3">
                  {step.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-medium text-slate-700"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Pair Every Job Notification with Verified Syllabus Vaults */}
        <section className="mt-16">
          <div className="overflow-hidden rounded-3xl border border-emerald-900/30 bg-linear-to-r from-emerald-950 via-[#071d15] to-emerald-950 p-6 text-white sm:p-10">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  <Sparkles className="size-3.5 text-emerald-400" aria-hidden />
                  PREPARATION ROADMAP INCLUDED
                </span>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Pair Every Job Notification with Verified Syllabus Vaults
                </h2>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-emerald-100/80">
                  Don&apos;t study blind. Each job opening has an accompanying curated study vault with previous year questions, section-wise syllabus weightage, and standard reference books.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/#vault"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-linear-to-r from-emerald-500 to-lime-500 px-5 text-xs font-bold text-slate-950 shadow-md transition hover:brightness-110"
                  >
                    <BookOpen className="size-3.5" aria-hidden />
                    Explore Study Vaults &amp; Syllabus
                  </Link>
                  <Link
                    href="/#practice"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-emerald-500/30 bg-white/10 px-5 text-xs font-semibold text-white backdrop-blur-xs transition hover:bg-white/20"
                  >
                    Browse Free Mock Tests →
                  </Link>
                </div>
              </div>

              {/* Progress Card Visual */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-900/40 p-5 backdrop-blur-md">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-emerald-200">LIC / IBPS Syllabus Coverage</span>
                    <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-300">
                      2026-27 PATTERN
                    </span>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div>
                      <div className="flex justify-between text-xs text-emerald-100/90">
                        <span>General &amp; Financial Awareness</span>
                        <span className="font-bold text-emerald-300">85% Mapped</span>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-emerald-950">
                        <div className="h-2 rounded-full bg-linear-to-r from-emerald-400 to-lime-400" style={{ width: "85%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-emerald-100/90">
                        <span>Quantitative Aptitude &amp; DI</span>
                        <span className="font-bold text-emerald-300">92% Mapped</span>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-emerald-950">
                        <div className="h-2 rounded-full bg-linear-to-r from-emerald-400 to-lime-400" style={{ width: "92%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-emerald-100/90">
                        <span>Reasoning &amp; Computer Knowledge</span>
                        <span className="font-bold text-emerald-300">78% Mapped</span>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-emerald-950">
                        <div className="h-2 rounded-full bg-linear-to-r from-emerald-400 to-lime-400" style={{ width: "78%" }} />
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 flex items-center gap-1.5 text-xs text-emerald-300/80">
                    <BadgeCheck className="size-3.5 text-emerald-400 shrink-0" aria-hidden />
                    Free syllabus mapped directly to official notification annexures
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Government & Public Sector Application FAQs */}
        <section className="mt-16">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              <HelpCircle className="size-3.5 text-slate-500" aria-hidden />
              OFFICIAL APPLICATION RULES &amp; FAQ
            </span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Government &amp; Public Sector Application FAQs
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-xs sm:text-sm text-slate-600">
              Clear answers to the most common questions candidates encounter while applying on official portals.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {APPLICATION_FAQS.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-emerald-200"
              >
                <h3 className="text-sm font-bold leading-snug text-ink sm:text-base">
                  {faq.question}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Step-by-Step Guide Modal */}
      {activeGuideJob && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
        >
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveGuideJob(null)}
              className="absolute right-5 top-5 grid size-8 place-items-center rounded-full border border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              aria-label="Close guide modal"
            >
              <X className="size-4" />
            </button>

            {/* Header info */}
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                <BadgeCheck className="size-3.5 text-emerald-600" />
                Verified Step-by-Step Guide
              </span>
              <h2 className="mt-2 text-xl font-extrabold text-ink sm:text-2xl">
                {activeGuideJob.title}
              </h2>
              <p className="text-xs text-slate-500">{activeGuideJob.organization}</p>
            </div>

            {/* Pay Scale & Meta */}
            <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl bg-slate-50 p-3 text-xs">
              <span className="font-bold text-ink">{activeGuideJob.salary}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600">{activeGuideJob.vacanciesDisplay}</span>
              <span className="text-slate-300">•</span>
              <span className="font-semibold text-rose-600">{activeGuideJob.deadlineDisplay}</span>
            </div>

            {/* Step-by-step application instructions */}
            <div className="mt-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Application Steps &amp; Registration Flow
              </h3>
              <div className="mt-3 space-y-3">
                {activeGuideJob.steps.map((st) => (
                  <div key={st.stepNum} className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                      {st.stepNum}
                    </span>
                    <div className="text-xs">
                      <h4 className="font-bold text-slate-800">{st.title}</h4>
                      <p className="mt-0.5 text-slate-600">{st.instructions}</p>
                      {st.tips && (
                        <p className="mt-1 rounded bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-800 border border-amber-200/50">
                          Tip: {st.tips}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upload Specifications */}
            <div className="mt-6 border-t border-slate-100 pt-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Upload Specifications &amp; Fee Details
              </h3>
              <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2 text-xs">
                <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-3">
                  <span className="block text-xs font-bold uppercase text-slate-400">Photo Specification</span>
                  <p className="mt-1 text-slate-700 font-medium">{activeGuideJob.specifications.photoSpec}</p>
                </div>
                <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-3">
                  <span className="block text-xs font-bold uppercase text-slate-400">Signature Specification</span>
                  <p className="mt-1 text-slate-700 font-medium">{activeGuideJob.specifications.signatureSpec}</p>
                </div>
                <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-3">
                  <span className="block text-xs font-bold uppercase text-slate-400">General / OBC / EWS Fee</span>
                  <p className="mt-1 text-slate-700 font-medium">{activeGuideJob.specifications.feeGeneral}</p>
                </div>
                <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-3">
                  <span className="block text-xs font-bold uppercase text-slate-400">SC / ST / PwD / Female Fee</span>
                  <p className="mt-1 text-slate-700 font-medium">{activeGuideJob.specifications.feeReserved}</p>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
              <a
                href={activeGuideJob.officialNoticeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <FileText className="size-4" />
                Download Official Notice (PDF)
              </a>

              <a
                href={activeGuideJob.officialApplyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-emerald-950 to-emerald-800 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:brightness-125"
              >
                Apply on Official Portal
                <ExternalLink className="size-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
