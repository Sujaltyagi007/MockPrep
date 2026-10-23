"use client";

import { useState } from "react";
import { AdminAvatar } from "@/components/admin/admin-avatar";
import {
  Shuffle,
  RefreshCw,
  Check,
  RotateCcw,
  CheckCircle2,
  Sliders,
  Sparkles,
  Save,
  CheckCircle,
} from "lucide-react";
import {
  useAdminTheme,
  useAdminAvatar,
  useAdminScratchpad,
  saveTheme,
  saveAvatar,
  saveScratchpad,
  THEME_PRESETS,
  AVATAR_STYLES,
  INITIAL_GRADIENTS,
  PRESET_AVATARS,
  DEFAULT_THEME,
  DEFAULT_AVATAR,
  type AdminThemeConfig,
} from "@/lib/admin/admin-preferences";

export type CustomizerSection = "avatar" | "theme" | "scratchpad" | "platform";

interface UserCustomizerProps {
  adminName: string;
  adminEmail: string;
  adminRole: string;
  section: CustomizerSection;
}

export function UserCustomizer({
  adminName,
  adminEmail,
  adminRole,
  section: activeTab,
}: UserCustomizerProps) {
  const currentTheme = useAdminTheme();
  const currentAvatar = useAdminAvatar();
  const scratchpadNote = useAdminScratchpad();

  const [customSeed, setCustomSeed] = useState(currentAvatar.seed || adminName || "mockprep");
  const [customUrl, setCustomUrl] = useState(currentAvatar.url || "");
  const [selectedStyle, setSelectedStyle] = useState(currentAvatar.style || "notionists");
  const [localNote, setLocalNote] = useState(scratchpadNote);
  const [noteSavedBanner, setNoteSavedBanner] = useState(false);

  // Platform engine state
  const [passingThreshold, setPassingThreshold] = useState("60");
  const [timerStrictness, setTimerStrictness] = useState("strict");
  const [defaultLang, setDefaultLang] = useState("en");
  const [negativeMarks, setNegativeMarks] = useState("standard");
  const [engineSaved, setEngineSaved] = useState(false);

  const handleRandomizeAvatar = () => {
    const randomSeed = Math.random().toString(36).substring(2, 9);
    setCustomSeed(randomSeed);
    saveAvatar({
      ...currentAvatar,
      type: "dicebear",
      style: selectedStyle,
      seed: randomSeed,
    });
  };

  const handleSelectStyle = (styleId: string) => {
    setSelectedStyle(styleId);
    saveAvatar({
      ...currentAvatar,
      type: "dicebear",
      style: styleId,
      seed: customSeed,
    });
  };

  const handleSelectPresetAvatar = (url: string) => {
    setCustomUrl(url);
    saveAvatar({
      ...currentAvatar,
      type: "custom",
      url,
    });
  };

  const handleSelectInitialBg = (bgClass: string) => {
    saveAvatar({
      ...currentAvatar,
      type: "initials",
      initialsBg: bgClass,
    });
  };

  const handleResetAvatar = () => {
    saveAvatar(DEFAULT_AVATAR);
    setCustomUrl("");
    setCustomSeed(adminName || "mockprep");
  };

  const handleApplyPresetTheme = (preset: AdminThemeConfig) => {
    saveTheme(preset);
  };

  const handleCustomPrimaryColor = (color: string) => {
    saveTheme({
      ...currentTheme,
      primaryColor: color,
      borderColor: `color-mix(in srgb, ${color} 16%, rgba(28, 27, 27, 0.08))`,
    });
  };

  const handleCustomBorderRadius = (radius: "sharp" | "modern" | "smooth") => {
    saveTheme({
      ...currentTheme,
      borderRadius: radius,
    });
  };

  const handleCustomCanvas = (canvas: string) => {
    saveTheme({
      ...currentTheme,
      canvasTone: canvas,
    });
  };

  const handleCustomBorderOpacity = (opacityVal: string) => {
    saveTheme({
      ...currentTheme,
      borderColor: opacityVal,
    });
  };

  const handleResetTheme = () => {
    saveTheme(DEFAULT_THEME);
  };

  const handleNoteChange = (text: string) => {
    setLocalNote(text);
    saveScratchpad(text);
    setNoteSavedBanner(true);
    setTimeout(() => setNoteSavedBanner(false), 2000);
  };

  const handleSaveEngineSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setEngineSaved(true);
    setTimeout(() => setEngineSaved(false), 3000);
  };

  return (
    <div className="rounded-2xl border border-black/8 bg-white shadow-xs overflow-hidden">
      <div className="p-6">
        {/* ========================================================= */}
        {/* TAB 1: AVATAR GENERATOR & PROFILE PICTURE */}
        {/* ========================================================= */}
        {activeTab === "avatar" && (
          <div className="space-y-6">
            {/* Live Profile Header Display */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 rounded-2xl border border-black/6 bg-sand/30 p-5">
              <div className="relative group">
                <AdminAvatar name={adminName} size="xl" showStatusIndicator />
                <button
                  type="button"
                  onClick={handleRandomizeAvatar}
                  title="Randomize avatar"
                  className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full bg-forest text-white shadow-md transition hover:scale-110 active:scale-95"
                >
                  <Shuffle className="size-3.5" />
                </button>
              </div>

              <div className="min-w-0 flex-1 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h3 className="font-display text-lg font-bold text-ink">{adminName}</h3>
                  <span className="rounded-full bg-forest-tint px-2.5 py-0.5 text-xs font-semibold text-forest">
                    {adminRole === "SUPER_ADMIN" ? "Super Admin" : "Content Editor"}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-body">{adminEmail}</p>
                <p className="mt-2 text-xs leading-relaxed text-body max-w-lg">
                  Customize how your profile appears on the top header, sidebar rail, and team lists. Generate dynamic illustrated avatars or link a custom photo.
                </p>

                <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
                  <button
                    type="button"
                    onClick={handleRandomizeAvatar}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-ink shadow-2xs transition hover:bg-sand"
                  >
                    <Shuffle className="size-3.5 text-forest" />
                    Randomize Avatar
                  </button>
                  <button
                    type="button"
                    onClick={handleResetAvatar}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-black/10 bg-white px-3 py-1.5 text-xs font-medium text-body transition hover:bg-sand hover:text-ink"
                  >
                    <RotateCcw className="size-3.5" />
                    Reset to Default Initial
                  </button>
                </div>
              </div>
            </div>

            {/* Avatar Generation Styles */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-display text-sm font-bold text-ink">Avatar Generator Styles</h4>
                  <p className="text-xs text-body">Pick an artistic vector style powered by open illustrations.</p>
                </div>
                <button
                  type="button"
                  onClick={handleRandomizeAvatar}
                  className="flex items-center gap-1 text-xs font-semibold text-forest hover:underline"
                >
                  <RefreshCw className="size-3" />
                  Shuffle Seed
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {AVATAR_STYLES.map((style) => {
                  const previewUrl = `https://api.dicebear.com/9.x/${style.id}/svg?seed=${encodeURIComponent(
                    customSeed
                  )}`;
                  const isSelected = currentAvatar.type === "dicebear" && selectedStyle === style.id;
                  return (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => handleSelectStyle(style.id)}
                      className={`group flex flex-col items-center rounded-xl border p-2.5 text-center transition ${
                        isSelected
                          ? "border-forest bg-forest-tint/40 shadow-xs ring-1 ring-forest"
                          : "border-black/8 bg-white hover:border-black/15 hover:bg-sand/30"
                      }`}
                    >
                      <img
                        src={previewUrl}
                        alt={style.label}
                        className="size-11 rounded-full object-cover shadow-2xs transition group-hover:scale-105"
                      />
                      <span className="mt-2 font-display text-[11px] font-bold text-ink truncate w-full">
                        {style.label.split(" ")[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Curated Preset Avatars */}
            <div>
              <h4 className="font-display text-sm font-bold text-ink mb-1">Quick-Pick Avatars</h4>
              <p className="text-xs text-body mb-3">Click any persona to instantly apply it to your account.</p>

              <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                {PRESET_AVATARS.map((preset) => (
                  <button
                    key={preset.url}
                    type="button"
                    onClick={() => handleSelectPresetAvatar(preset.url)}
                    className="group relative flex flex-col items-center rounded-xl border border-black/8 bg-white p-2 transition hover:-translate-y-0.5 hover:border-forest/40 hover:shadow-xs"
                    title={preset.label}
                  >
                    <img src={preset.url} alt={preset.label} className="size-10 rounded-full object-cover" />
                    <span className="mt-1 text-[10px] font-medium text-body truncate w-full text-center">
                      {preset.label.split(" ")[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Initial Avatar Color Customizer */}
            <div>
              <h4 className="font-display text-sm font-bold text-ink mb-1">Initials Background Tone</h4>
              <p className="text-xs text-body mb-3">Prefer your name initial? Pick a tailored background tone.</p>

              <div className="flex flex-wrap gap-2.5">
                {INITIAL_GRADIENTS.map((grad) => {
                  const isSelected =
                    currentAvatar.type === "initials" && currentAvatar.initialsBg === grad.bgClass;
                  return (
                    <button
                      key={grad.id}
                      type="button"
                      onClick={() => handleSelectInitialBg(grad.bgClass)}
                      className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                        isSelected
                          ? "border-forest bg-forest-tint text-forest ring-1 ring-forest"
                          : "border-black/10 bg-white text-ink hover:bg-sand"
                      }`}
                    >
                      <span className={`size-4 rounded-full ${grad.bgClass}`} />
                      <span>{grad.label}</span>
                      {isSelected && <Check className="size-3.5 text-forest" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Direct Image URL */}
            <div className="border-t border-black/6 pt-4">
              <h4 className="font-display text-sm font-bold text-ink mb-1">Custom Photo URL</h4>
              <p className="text-xs text-body mb-3">Or paste an image web link from your media or cloud storage.</p>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="url"
                  placeholder="https://example.com/avatar.jpg"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  className="flex-1 rounded-xl border border-black/10 bg-white px-3.5 py-2 text-xs text-ink outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/20"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (customUrl.trim()) {
                      saveAvatar({ ...currentAvatar, type: "custom", url: customUrl.trim() });
                    }
                  }}
                  className="rounded-xl bg-forest px-4 py-2 text-xs font-semibold text-white transition hover:brightness-110 active:scale-95"
                >
                  Apply Photo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: THEME CUSTOMIZER & LIVE PREVIEW */}
        {/* ========================================================= */}
        {activeTab === "theme" && (
          <div className="space-y-6">
            {/* Live Interface Preview */}
            <div className="rounded-2xl border border-black/10 bg-sand/40 p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h4 className="font-display text-sm font-bold text-ink">Live Interface Preview</h4>
                  <p className="text-xs text-body">
                    See how your buttons, badges, rail pills, and card borders update in real-time.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleResetTheme}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 bg-white px-3 py-1.5 text-xs font-medium text-body transition hover:bg-sand hover:text-ink"
                >
                  <RotateCcw className="size-3.5" />
                  Reset to Default Theme
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-black/10 bg-white p-4 space-y-2.5 shadow-2xs">
                  <span className="text-[10px] font-bold text-body uppercase tracking-wider">
                    Primary Action Button
                  </span>
                  <button
                    type="button"
                    className="w-full rounded-xl bg-forest py-2 px-3 text-xs font-semibold text-white shadow-xs transition hover:brightness-110"
                  >
                    Start Mock Test
                  </button>
                </div>

                <div className="rounded-xl border border-black/10 bg-white p-4 space-y-2.5 shadow-2xs">
                  <span className="text-[10px] font-bold text-body uppercase tracking-wider">
                    Secondary Button
                  </span>
                  <button
                    type="button"
                    className="w-full rounded-xl border border-black/10 bg-white py-2 px-3 text-xs font-semibold text-ink transition hover:bg-sand"
                  >
                    Edit Syllabus Guide
                  </button>
                </div>

                <div className="rounded-xl border border-black/10 bg-white p-4 space-y-2.5 shadow-2xs">
                  <span className="text-[10px] font-bold text-body uppercase tracking-wider">
                    Badges & Active Pills
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-forest-tint px-2.5 py-0.5 text-xs font-semibold text-forest">
                      Published Test
                    </span>
                    <span className="size-2 rounded-full bg-forest animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            {/* Curated Theme Presets */}
            <div>
              <h4 className="font-display text-sm font-bold text-ink mb-1">Curated Theme Presets</h4>
              <p className="text-xs text-body mb-3">Choose a pre-balanced color harmony for your dashboard.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {THEME_PRESETS.map((preset) => {
                  const isSelected = currentTheme.primaryColor === preset.primaryColor;
                  return (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => handleApplyPresetTheme(preset)}
                      className={`flex flex-col rounded-2xl border p-4 text-left transition ${
                        isSelected
                          ? "border-forest bg-forest-tint/30 shadow-xs ring-2 ring-forest"
                          : "border-black/8 bg-white hover:border-black/15 hover:shadow-2xs"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className="size-5 rounded-full border border-black/15 shadow-2xs"
                            style={{ backgroundColor: preset.primaryColor }}
                          />
                          <span
                            className="size-4 rounded-md border border-black/15 shadow-2xs"
                            style={{ backgroundColor: preset.canvasTone }}
                          />
                        </div>
                        {isSelected && <CheckCircle2 className="size-4 text-forest" />}
                      </div>

                      <h5 className="mt-3 font-display text-xs font-bold text-ink">{preset.name}</h5>
                      <div className="mt-2 flex items-center justify-between text-[11px] text-body">
                        <span>{preset.borderRadius} radius</span>
                        <code className="font-mono">{preset.primaryColor}</code>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Granular Appearance Controls */}
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Primary Color Picker */}
              <div className="rounded-xl border border-black/8 bg-sand/20 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-display text-sm font-bold text-ink">Button & Accent Color</h4>
                  <code className="font-mono text-xs font-bold text-forest">{currentTheme.primaryColor}</code>
                </div>
                <p className="text-xs text-body leading-relaxed">
                  Controls the primary button background, sidebar active indicator, and active navigation highlights.
                </p>

                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={currentTheme.primaryColor}
                    onChange={(e) => handleCustomPrimaryColor(e.target.value)}
                    className="size-10 cursor-pointer rounded-xl border border-black/15 bg-white p-1"
                  />
                  <div className="flex flex-wrap gap-1.5">
                    {["#2d7305", "#01518b", "#ea580c", "#7c3aed", "#0f766e", "#be123c", "#18181b"].map((col) => (
                      <button
                        key={col}
                        type="button"
                        onClick={() => handleCustomPrimaryColor(col)}
                        className="size-7 rounded-lg border border-black/10 transition hover:scale-110 active:scale-95"
                        style={{ backgroundColor: col }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Corner Curvature */}
              <div className="rounded-xl border border-black/8 bg-sand/20 p-4 space-y-3">
                <h4 className="font-display text-sm font-bold text-ink">Corner Curvature (Radius)</h4>
                <p className="text-xs text-body leading-relaxed">
                  Adjust how rounded buttons, cards, and input fields appear across the panel.
                </p>

                <div className="grid grid-cols-3 gap-2 pt-1">
                  {(
                    [
                      { id: "sharp", label: "Sharp", radius: "6px" },
                      { id: "modern", label: "Modern", radius: "12px" },
                      { id: "smooth", label: "Smooth Pill", radius: "18px" },
                    ] as const
                  ).map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => handleCustomBorderRadius(r.id)}
                      className={`flex flex-col items-center rounded-xl border py-2 px-2 text-xs font-semibold transition ${
                        currentTheme.borderRadius === r.id
                          ? "border-forest bg-forest text-white shadow-xs"
                          : "border-black/10 bg-white text-ink hover:bg-sand"
                      }`}
                    >
                      <span>{r.label}</span>
                      <span className="text-[10px] opacity-75 font-normal">{r.radius}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Border Contrast & Tone */}
              <div className="rounded-xl border border-black/8 bg-sand/20 p-4 space-y-3">
                <h4 className="font-display text-sm font-bold text-ink">Border Contrast & Tone</h4>
                <p className="text-xs text-body leading-relaxed">
                  Controls the outlines of cards, tables, inputs, and secondary buttons.
                </p>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Subtle (5%)", val: "rgba(28, 27, 27, 0.05)" },
                    { label: "Standard (10%)", val: "rgba(28, 27, 27, 0.10)" },
                    { label: "High Contrast (18%)", val: "rgba(28, 27, 27, 0.18)" },
                    {
                      label: "Theme Tinted",
                      val: `color-mix(in srgb, ${currentTheme.primaryColor} 18%, rgba(28, 27, 27, 0.08))`,
                    },
                  ].map((b) => (
                    <button
                      key={b.label}
                      type="button"
                      onClick={() => handleCustomBorderOpacity(b.val)}
                      className={`rounded-xl border py-2 px-2.5 text-center text-xs font-medium transition ${
                        currentTheme.borderColor === b.val
                          ? "border-forest bg-forest-tint text-forest font-bold ring-1 ring-forest"
                          : "border-black/10 bg-white text-ink hover:bg-sand"
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Canvas Background Tone */}
              <div className="rounded-xl border border-black/8 bg-sand/20 p-4 space-y-3">
                <h4 className="font-display text-sm font-bold text-ink">Canvas Background Tone</h4>
                <p className="text-xs text-body leading-relaxed">
                  Choose the overall background tint behind panels and content cards.
                </p>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "sand", label: "Soft Sand", bg: "#f5f5f5" },
                    { id: "cream", label: "Warm Linen", bg: "#faf8f5" },
                    { id: "mist", label: "Cool Slate", bg: "#f1f5f9" },
                    { id: "white", label: "Pure White", bg: "#ffffff" },
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => handleCustomCanvas(c.bg)}
                      className={`flex items-center justify-between rounded-xl border py-2 px-3 text-xs font-semibold transition ${
                        currentTheme.canvasTone === c.bg
                          ? "border-forest bg-white text-ink ring-1 ring-forest shadow-2xs"
                          : "border-black/10 bg-white text-ink hover:bg-sand"
                      }`}
                    >
                      <span>{c.label}</span>
                      <span className="size-3.5 rounded-full border border-black/15" style={{ backgroundColor: c.bg }} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: ADMIN SCRATCHPAD & PERSONAL NOTES */}
        {/* ========================================================= */}
        {activeTab === "scratchpad" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h4 className="font-display text-sm font-bold text-ink">Private Admin Scratchpad</h4>
                <p className="text-xs text-body">
                  A private notepad saved automatically in your browser for drafts, test formulas, or syllabus checklists.
                </p>
              </div>
              <div className="flex items-center gap-2">
                {noteSavedBanner && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-forest-tint px-2 py-0.5 text-xs font-semibold text-forest">
                    <CheckCircle className="size-3" /> Auto-saved
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => handleNoteChange("")}
                  className="rounded-lg border border-black/10 bg-white px-2.5 py-1 text-xs text-body hover:bg-sand"
                >
                  Clear Notes
                </button>
              </div>
            </div>

            <textarea
              rows={12}
              value={localNote}
              onChange={(e) => handleNoteChange(e.target.value)}
              placeholder="Type your notes here... (e.g. UPSC Prelims cut-off trends, upcoming SSC CGL test additions, Hindi translation review notes)"
              className="w-full rounded-2xl border border-black/10 bg-sand/20 p-4 font-mono text-xs sm:text-sm text-ink outline-none transition focus:border-forest focus:bg-white focus:ring-2 focus:ring-forest/20 leading-relaxed"
            />

            <div className="flex items-center justify-between text-xs text-body">
              <span>{localNote.trim().split(/\s+/).filter(Boolean).length} words &bull; {localNote.length} characters</span>
              <span className="text-[11px] text-body/80">Stored locally in your secure admin session</span>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: MOCKPREP ENGINE CONFIGURATION */}
        {/* ========================================================= */}
        {activeTab === "platform" && (
          <form onSubmit={handleSaveEngineSettings} className="space-y-6">
            <div>
              <h4 className="font-display text-sm font-bold text-ink mb-1">Exam & Mock Test Engine Defaults</h4>
              <p className="text-xs text-body">
                Global parameters governing candidate evaluation, negative marks calculations, and test timers.
              </p>
            </div>

            {engineSaved && (
              <div className="rounded-xl bg-forest-tint p-3 text-xs font-semibold text-forest flex items-center gap-2">
                <CheckCircle2 className="size-4" />
                <span>MockPrep platform engine settings updated successfully.</span>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-ink">Qualifying Cut-off Threshold (%)</label>
                <input
                  type="number"
                  min="30"
                  max="90"
                  value={passingThreshold}
                  onChange={(e) => setPassingThreshold(e.target.value)}
                  className="w-full rounded-xl border border-black/10 bg-white px-3.5 py-2 text-xs text-ink outline-none focus:border-forest focus:ring-1 focus:ring-forest"
                />
                <p className="text-[11px] text-body">Score percentage required to display a passing badge.</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-ink">Negative Marking Rule</label>
                <select
                  value={negativeMarks}
                  onChange={(e) => setNegativeMarks(e.target.value)}
                  className="w-full rounded-xl border border-black/10 bg-white px-3.5 py-2 text-xs text-ink outline-none focus:border-forest focus:ring-1 focus:ring-forest"
                >
                  <option value="standard">Standard (1/3rd deduction for 3-mark questions)</option>
                  <option value="quarter">1/4th deduction (Banking pattern)</option>
                  <option value="none">Zero negative marks (Special diagnostic tests)</option>
                </select>
                <p className="text-[11px] text-body">Default penalty applied per incorrect question.</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-ink">Default Question Language</label>
                <select
                  value={defaultLang}
                  onChange={(e) => setDefaultLang(e.target.value)}
                  className="w-full rounded-xl border border-black/10 bg-white px-3.5 py-2 text-xs text-ink outline-none focus:border-forest focus:ring-1 focus:ring-forest"
                >
                  <option value="en">English (Primary)</option>
                  <option value="hi">Hindi (हिन्दी)</option>
                </select>
                <p className="text-[11px] text-body">Language presented when candidate first launches test.</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-ink">Test Timer Enforcement</label>
                <select
                  value={timerStrictness}
                  onChange={(e) => setTimerStrictness(e.target.value)}
                  className="w-full rounded-xl border border-black/10 bg-white px-3.5 py-2 text-xs text-ink outline-none focus:border-forest focus:ring-1 focus:ring-forest"
                >
                  <option value="strict">Strict (Auto-submit when timer reaches 00:00)</option>
                  <option value="lenient">Lenient with warning banner</option>
                </select>
                <p className="text-[11px] text-body">Candidate experience during timed mock sessions.</p>
              </div>
            </div>

            <div className="border-t border-black/6 pt-4 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-forest px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:brightness-110 active:scale-95"
              >
                <Save className="size-3.5" />
                Save Engine Defaults
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
