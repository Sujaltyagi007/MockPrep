"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Download,
  FileText,
  Search,
  Sparkles,
  CheckCircle2,
  Bookmark,
  ExternalLink,
  Eye,
  X,
  Layers,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  WifiOff,
  Zap,
  FolderDown,
  Landmark,
  Calculator,
  Cloud,
  Globe,
  Leaf,
  GraduationCap,
} from "lucide-react";
import {
  VAULT_STATS,
  VAULT_CATEGORIES,
  FEATURED_VAULT_VOLUMES,
  REVISION_CHEAT_SHEETS,
  NCERT_SUMMARIES,
  type VaultVolume,
  type CheatSheet,
  type NcertBookSummary,
} from "@/lib/data/vault-data";

export function VaultPortal() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedClassTier, setSelectedClassTier] = useState<"6-8" | "9-10" | "11-12">("6-8");
  const [activePreviewVolume, setActivePreviewVolume] = useState<VaultVolume | null>(null);
  const [activeCheatSheet, setActiveCheatSheet] = useState<CheatSheet | null>(null);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const triggerDownload = (title: string, size: string) => {
    setDownloadToast(`Downloading "${title}" (${size})...`);
    setTimeout(() => {
      setDownloadToast(`✓ "${title}" successfully prepared for offline revision.`);
      setTimeout(() => {
        setDownloadToast(null);
      }, 3500);
    }, 1200);
  };

  const filteredVolumes = FEATURED_VAULT_VOLUMES.filter((v) => {
    if (selectedCategory === "ALL") return true;
    return v.category === selectedCategory;
  });

  const filteredNcert = NCERT_SUMMARIES.filter((n) => {
    return n.classTier === selectedClassTier;
  });

  const getCategoryCoverIcon = (category: VaultVolume["category"]) => {
    switch (category) {
      case "POLITY":
        return Landmark;
      case "MATH":
        return Calculator;
      case "TECH":
        return Cloud;
      case "CURRENT_AFFAIRS":
        return Globe;
      case "HISTORY":
        return BookOpen;
      case "SCIENCE":
        return Leaf;
      default:
        return BookOpen;
    }
  };

  return (
    <div className="min-h-screen-dvh bg-slate-50/60 pb-20">
      {/* Toast Notification */}
      {downloadToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl border border-emerald-500/30 bg-emerald-950 px-4 py-3 text-xs font-semibold text-white shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-4">
          <Download className="size-4 text-emerald-400 animate-bounce" />
          <span>{downloadToast}</span>
        </div>
      )}

      {/* Hero Header Section */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-linear-to-b from-emerald-50/70 via-white to-slate-50/50 pt-10 pb-12 sm:pt-14 sm:pb-16">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-160 -translate-x-1/2 rounded-full bg-emerald-200/30 blur-3xl" aria-hidden />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-8">
          {/* Eyebrow Tag */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-white/90 px-3 py-1 text-xs font-semibold text-emerald-900 shadow-2xs">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-600" />
              </span>
              OPEN EDUCATION PUBLIC ARCHIVE • Updated Daily • Spring 2026 Edition
            </span>
          </div>

          {/* Main Title & Subtitle */}
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Curated Study Vault,{" "}
            <span className="bg-linear-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
              Handbooks &amp; Free Digital Books
            </span>
          </h1>
          <p className="mt-3.5 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Bilingual subject digests, NCERT mind maps, tabulated formula sheets, and standard reference handbooks for competitive aspirants. 100% free downloads, zero paywalls.
          </p>

          {/* Action Button */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#vault-volumes"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-linear-to-r from-emerald-950 to-emerald-800 px-6 text-sm font-semibold text-white shadow-md shadow-emerald-950/20 transition hover:brightness-125"
            >
              <BookOpen className="size-4" aria-hidden />
              Explore All Vault Volumes
            </a>
            <a
              href="#cheat-sheets"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-50"
            >
              1-Page Cheat Sheets →
            </a>
          </div>

          {/* Stat Counter Strip (4 cards) */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {VAULT_STATS.map((st, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs transition hover:border-slate-300"
              >
                <span className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                  {st.value}
                </span>
                <p className="mt-1 text-xs font-semibold text-slate-800">{st.label}</p>
                <p className="text-xs text-slate-400">{st.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        {/* Category Filter Pills */}
        <section aria-label="Vault categories" className="mt-8">
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-200/80 pb-4">
            {VAULT_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                    isActive
                      ? "bg-emerald-950 text-white shadow-sm"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:bg-emerald-50/50 hover:text-emerald-950"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Section 1: Featured Study Handbooks & Vault Volumes */}
        <section id="vault-volumes" className="mt-10 scroll-mt-24">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                CORE CURRICULUM DIGESTS
              </span>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                Featured Study Handbooks &amp; Vault Volumes
              </h2>
            </div>
            <p className="text-xs text-slate-500 sm:max-w-xs sm:text-right">
              Standard book-length revision handbooks compiled into downloadable PDF volumes.
            </p>
          </div>

          {/* 3x2 Grid of Book Cards */}
          <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredVolumes.map((vol) => {
              const CoverIcon = getCategoryCoverIcon(vol.category);

              return (
                <article
                  key={vol.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xs transition hover:border-emerald-300 hover:shadow-lg"
                >
                  <div>
                    {/* Top Dark Emerald Book Cover Header */}
                    <div className="relative bg-linear-to-br from-[#0c2b1e] via-[#092117] to-[#04130c] p-5 text-white">
                      <div className="flex items-center justify-between">
                        <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-emerald-300">
                          {vol.badge}
                        </span>
                        <CoverIcon className="size-4 text-emerald-400/80" aria-hidden />
                      </div>

                      <h3 className="mt-4 text-base font-bold leading-snug text-white group-hover:text-emerald-200 transition-colors">
                        {vol.title}
                      </h3>

                      <div className="mt-4 flex items-center justify-between border-t border-emerald-900/50 pt-2.5 text-xs text-emerald-200/70">
                        <span>{vol.author}</span>
                        <span className="font-semibold text-emerald-400">{vol.pageCount}</span>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-5">
                      {/* Meta Sub-Badges */}
                      <div className="flex flex-wrap gap-1.5">
                        {vol.subBadges.map((b, idx) => (
                          <span
                            key={idx}
                            className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700"
                          >
                            {b}
                          </span>
                        ))}
                      </div>

                      {/* Description */}
                      <p className="mt-3 text-xs leading-relaxed text-slate-600">
                        {vol.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Action Buttons */}
                  <div className="flex items-center gap-2 border-t border-slate-100 p-4 pt-3">
                    <button
                      type="button"
                      onClick={() => setActivePreviewVolume(vol)}
                      className="flex-1 inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-linear-to-r from-emerald-950 to-emerald-800 text-xs font-semibold text-white shadow-xs transition hover:brightness-125"
                    >
                      <Eye className="size-3.5" aria-hidden />
                      Read Online / Flipbook
                    </button>
                    <button
                      type="button"
                      onClick={() => triggerDownload(vol.title, vol.fileSize)}
                      title={`Download PDF (${vol.fileSize})`}
                      className="grid size-9 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-900"
                      aria-label={`Download ${vol.title}`}
                    >
                      <Download className="size-4" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Section 2: 1-Page Visual Revision Cheat Sheets */}
        <section id="cheat-sheets" className="mt-20 scroll-mt-24">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-emerald-800">
              <Sparkles className="size-3 text-emerald-600" />
              Quick High-Yield Revision
            </span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              1-Page Visual Revision Cheat Sheets
            </h2>
            <p className="mt-1 text-xs text-slate-600 sm:text-sm">
              High-yield revision infographics. Print them, paste them by your study desk, or review 10 minutes before entering the exam center.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {REVISION_CHEAT_SHEETS.map((sheet) => (
              <div
                key={sheet.id}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition hover:border-emerald-300 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="rounded bg-emerald-50 px-2 py-0.5 font-bold uppercase tracking-wider text-emerald-800 border border-emerald-200/50">
                      {sheet.category}
                    </span>
                    <span className="text-slate-400 font-medium">{sheet.badge}</span>
                  </div>

                  {/* Laminated Document Header Simulation */}
                  <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                    <div className="h-1.5 w-1/3 rounded-full bg-emerald-500/50" />
                    <div className="mt-2 h-1 w-full rounded-full bg-slate-200" />
                    <div className="mt-1 h-1 w-2/3 rounded-full bg-slate-200" />
                  </div>

                  <h3 className="mt-4 text-sm font-bold text-ink group-hover:text-emerald-900 transition-colors">
                    {sheet.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                    {sheet.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                  <button
                    type="button"
                    onClick={() => setActiveCheatSheet(sheet)}
                    className="text-xs font-semibold text-emerald-800 hover:underline"
                  >
                    View Full Sheet
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerDownload(sheet.title, sheet.fileSize)}
                    className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-ink transition"
                  >
                    <Download className="size-3" />
                    {sheet.fileSize}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: NCERT Gist Library (Classes 6th to 12th) */}
        <section id="ncert" className="mt-20 scroll-mt-24">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                FOUNDATIONAL NCERT VAULT
              </span>
              <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                NCERT Gist Library (Classes 6th to 12th)
              </h2>
              <p className="mt-1 max-w-2xl text-xs sm:text-sm text-slate-600">
                Save 300+ hours of raw textbook reading. We distilled each standard NCERT textbook into 20-page chapter summaries, concept maps, and key vocabulary definitions.
              </p>
            </div>

            {/* Class Tier Switcher */}
            <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 text-xs">
              <button
                type="button"
                onClick={() => setSelectedClassTier("6-8")}
                className={`rounded-lg px-3 py-1 font-semibold transition ${
                  selectedClassTier === "6-8"
                    ? "bg-emerald-950 text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Class 6th to 8th
              </button>
              <button
                type="button"
                onClick={() => setSelectedClassTier("9-10")}
                className={`rounded-lg px-3 py-1 font-semibold transition ${
                  selectedClassTier === "9-10"
                    ? "bg-emerald-950 text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Class 9th &amp; 10th
              </button>
              <button
                type="button"
                onClick={() => setSelectedClassTier("11-12")}
                className={`rounded-lg px-3 py-1 font-semibold transition ${
                  selectedClassTier === "11-12"
                    ? "bg-emerald-950 text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Class 11th &amp; 12th
              </button>
            </div>
          </div>

          {/* NCERT Summary Cards */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filteredNcert.map((nc) => (
              <div
                key={nc.id}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-emerald-300"
              >
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="rounded bg-emerald-50 px-2 py-0.5 font-bold text-emerald-800 border border-emerald-200/60">
                      {nc.classLabel}
                    </span>
                    <GraduationCap className="size-4 text-emerald-600" />
                  </div>

                  <h3 className="mt-3 text-sm font-bold text-ink group-hover:text-emerald-900 transition-colors">
                    {nc.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {nc.description}
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-xs font-medium text-slate-400">
                    <span>{nc.chaptersCount} Chapters</span>
                    <span>•</span>
                    <span>{nc.pagesCount} Pages Summary</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                  <span className="font-semibold text-slate-500">{nc.subject}</span>
                  <button
                    type="button"
                    onClick={() => triggerDownload(nc.title, nc.fileSize)}
                    className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-900 border border-emerald-200/60 hover:bg-emerald-100 transition"
                  >
                    <Download className="size-3 text-emerald-700" />
                    PDF ({nc.fileSize})
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* NCERT Mega Bundle Banner */}
          <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-emerald-900/30 bg-linear-to-r from-emerald-950 via-[#0a2319] to-emerald-950 p-4 text-white sm:flex-row sm:px-6">
            <div className="flex items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-emerald-500/20 text-emerald-400">
                <FolderDown className="size-5" />
              </span>
              <div>
                <h4 className="text-sm font-bold text-white">Need the Complete NCERT 6–12 Mega Bundle?</h4>
                <p className="text-xs text-emerald-200/80">
                  Download all History, Geography, Polity &amp; Science summaries in one zip file (180 MB).
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => triggerDownload("NCERT 6-12 Mega Bundle", "180 MB")}
              className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-linear-to-r from-emerald-500 to-lime-500 px-5 text-xs font-bold text-slate-950 shadow-sm transition hover:brightness-110"
            >
              <Download className="size-3.5" />
              Download Mega Bundle (180 MB)
            </button>
          </div>
        </section>

        {/* Section 4: Offline Reader Feature Spotlight */}
        <section className="mt-20">
          <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs sm:p-10">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              {/* Left Side: Mockup Card */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-rose-400" />
                      <span className="size-2 rounded-full bg-amber-400" />
                      <span className="size-2 rounded-full bg-emerald-400" />
                    </div>
                    <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
                      OFFLINE READY
                    </span>
                  </div>

                  <div className="mt-3 space-y-2.5">
                    <div className="flex items-center justify-between rounded-xl bg-white p-2.5 border border-slate-200/80 shadow-2xs">
                      <div className="flex items-center gap-2">
                        <BookOpen className="size-4 text-emerald-700" />
                        <div>
                          <p className="text-xs font-bold text-slate-800">Indian Polity &amp; Constitutional Framework</p>
                          <span className="text-xs text-slate-400">196 Pages • 18.4 MB (Saved)</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-600">✓ 100%</span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-white p-2.5 border border-slate-200/80 shadow-2xs">
                      <div className="flex items-center gap-2">
                        <Calculator className="size-4 text-emerald-700" />
                        <div>
                          <p className="text-xs font-bold text-slate-800">Quantitative Speed Hacks &amp; Formulas</p>
                          <span className="text-xs text-slate-400">142 Pages • 12.2 MB (Saved)</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-600">✓ 100%</span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-white p-2.5 border border-slate-200/80 shadow-2xs">
                      <div className="flex items-center gap-2">
                        <Leaf className="size-4 text-emerald-700" />
                        <div>
                          <p className="text-xs font-bold text-slate-800">Environmental Ecology &amp; Biodiversity</p>
                          <span className="text-xs text-slate-400">132 Pages • 11.4 MB (Saved)</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-600">✓ 100%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Text & Features */}
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900">
                  <WifiOff className="size-3.5 text-emerald-700" />
                  OFFLINE-FIRST ARCHITECTURE
                </span>
                <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                  Revise During Commutes With Zero Data Drops
                </h2>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">
                  Download once, access forever. All study handbooks and NCERT summaries on MockPrep are engineered for lightweight offline access on low-end smartphones. Zero distraction algorithms, zero popups, zero intrusive ads.
                </p>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
                  <div className="flex items-start gap-2 rounded-xl bg-slate-50 p-3">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-800">Lightweight PDF &amp; EPUB</p>
                      <p className="mt-0.5 text-slate-500 text-xs">Optimized for fast rendering on 2G/3G mobile networks.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 rounded-xl bg-slate-50 p-3">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-800">100% Ad-Free &amp; Offline</p>
                      <p className="mt-0.5 text-slate-500 text-xs">No annoying popups or data trackers while you study.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <a
                    href="#vault-volumes"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-linear-to-r from-emerald-950 to-emerald-800 px-6 text-xs font-semibold text-white shadow-sm transition hover:brightness-125"
                  >
                    Browse Complete Vault (250+ Free Volumes)
                    <ArrowRight className="size-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Interactive Volume Preview Modal */}
      {activePreviewVolume && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
        >
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8">
            <button
              type="button"
              onClick={() => setActivePreviewVolume(null)}
              className="absolute right-5 top-5 grid size-8 place-items-center rounded-full border border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              aria-label="Close preview modal"
            >
              <X className="size-4" />
            </button>

            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                <Bookmark className="size-3.5 text-emerald-600" />
                {activePreviewVolume.badge}
              </span>
              <h2 className="mt-2 text-xl font-extrabold text-ink sm:text-2xl">
                {activePreviewVolume.title}
              </h2>
              <p className="text-xs text-slate-500">{activePreviewVolume.author} • {activePreviewVolume.pageCount}</p>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-slate-600">
              {activePreviewVolume.description}
            </p>

            {/* Table of Contents */}
            <div className="mt-5 border-t border-slate-100 pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Table of Contents &amp; Modules
              </h3>
              <ul className="mt-2.5 space-y-1.5">
                {activePreviewVolume.tableOfContents.map((ch, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    <span>{ch}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sample Key Notes */}
            <div className="mt-5 border-t border-slate-100 pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                High-Yield Sample Notes
              </h3>
              <div className="mt-2 space-y-2">
                {activePreviewVolume.sampleNotes.map((note, idx) => (
                  <div key={idx} className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-2.5 text-xs text-emerald-950">
                    {note}
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => {
                  triggerDownload(activePreviewVolume.title, activePreviewVolume.fileSize);
                  setActivePreviewVolume(null);
                }}
                className="inline-flex h-9 items-center gap-1.5 rounded-full bg-linear-to-r from-emerald-950 to-emerald-800 px-5 text-xs font-semibold text-white shadow-sm transition hover:brightness-125"
              >
                <Download className="size-3.5" />
                Download PDF ({activePreviewVolume.fileSize})
              </button>
              <button
                type="button"
                onClick={() => setActivePreviewVolume(null)}
                className="rounded-full border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cheat Sheet Preview Modal */}
      {activeCheatSheet && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
        >
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setActiveCheatSheet(null)}
              className="absolute right-5 top-5 grid size-8 place-items-center rounded-full border border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100"
              aria-label="Close sheet modal"
            >
              <X className="size-4" />
            </button>

            <div>
              <span className="rounded bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-800 border border-emerald-200">
                {activeCheatSheet.category} • {activeCheatSheet.badge}
              </span>
              <h2 className="mt-2 text-lg font-bold text-ink">{activeCheatSheet.title}</h2>
              <p className="mt-1 text-xs text-slate-500">{activeCheatSheet.description}</p>
            </div>

            <div className="mt-4 border-t border-slate-100 pt-3">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Infographic Breakdown Points
              </h3>
              <div className="mt-2 space-y-2">
                {activeCheatSheet.points.map((pt, idx) => (
                  <div key={idx} className="flex items-center gap-2 rounded-lg bg-slate-50 p-2 text-xs text-slate-700">
                    <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => {
                  triggerDownload(activeCheatSheet.title, activeCheatSheet.fileSize);
                  setActiveCheatSheet(null);
                }}
                className="inline-flex h-9 items-center gap-1.5 rounded-full bg-emerald-950 px-4 text-xs font-semibold text-white hover:bg-emerald-900"
              >
                <Download className="size-3.5" />
                Download ({activeCheatSheet.fileSize})
              </button>
              <button
                type="button"
                onClick={() => setActiveCheatSheet(null)}
                className="rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
