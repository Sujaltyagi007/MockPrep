"use client";

import { useSyncExternalStore } from "react";

export interface AdminThemeConfig {
  id?: string;
  name: string;
  primaryColor: string;
  borderColor: string;
  borderRadius: "sharp" | "modern" | "smooth";
  canvasTone: string;
}

export interface AdminAvatarConfig {
  type: "dicebear" | "custom" | "initials";
  url?: string;
  style?: string;
  seed?: string;
  initialsBg?: string;
  statusTitle?: string;
}

export const THEME_PRESETS: AdminThemeConfig[] = [
  {
    id: "forest",
    name: "Forest Emerald (Default)",
    primaryColor: "#2d7305",
    borderColor: "rgba(45, 115, 5, 0.16)",
    borderRadius: "modern",
    canvasTone: "#f5f5f5",
  },
  {
    id: "sapphire",
    name: "Royal Sapphire",
    primaryColor: "#01518b",
    borderColor: "rgba(1, 81, 139, 0.16)",
    borderRadius: "modern",
    canvasTone: "#f1f5f9",
  },
  {
    id: "flame",
    name: "Flame Amber",
    primaryColor: "#ea580c",
    borderColor: "rgba(234, 88, 12, 0.16)",
    borderRadius: "modern",
    canvasTone: "#faf8f5",
  },
  {
    id: "amethyst",
    name: "Deep Amethyst",
    primaryColor: "#7c3aed",
    borderColor: "rgba(124, 58, 237, 0.16)",
    borderRadius: "smooth",
    canvasTone: "#f8fafc",
  },
  {
    id: "teal",
    name: "Nordic Teal",
    primaryColor: "#0f766e",
    borderColor: "rgba(15, 118, 110, 0.16)",
    borderRadius: "modern",
    canvasTone: "#f0fdfa",
  },
  {
    id: "rose",
    name: "Rose Velvet",
    primaryColor: "#be123c",
    borderColor: "rgba(190, 18, 60, 0.16)",
    borderRadius: "smooth",
    canvasTone: "#fff1f2",
  },
  {
    id: "slate",
    name: "Monochrome Slate",
    primaryColor: "#18181b",
    borderColor: "rgba(24, 24, 27, 0.18)",
    borderRadius: "sharp",
    canvasTone: "#ffffff",
  },
];

export const AVATAR_STYLES = [
  { id: "notionists", label: "Notionists (Minimalist)" },
  { id: "lorelei", label: "Lorelei (Artistic)" },
  { id: "bottts", label: "Bottts (Friendly Tech)" },
  { id: "micah", label: "Micah (Modern Flat)" },
  { id: "fun-emoji", label: "Fun Emoji (Playful)" },
  { id: "identicon", label: "Identicon (Geometric)" },
] as const;

export const INITIAL_GRADIENTS = [
  { id: "forest", label: "Forest Green", bgClass: "bg-[#2d7305]" },
  { id: "sapphire", label: "Royal Sapphire", bgClass: "bg-[#01518b]" },
  { id: "amber", label: "Flame Amber", bgClass: "bg-[#ea580c]" },
  { id: "violet", label: "Deep Amethyst", bgClass: "bg-[#7c3aed]" },
  { id: "teal", label: "Nordic Teal", bgClass: "bg-[#0f766e]" },
  { id: "crimson", label: "Rose Crimson", bgClass: "bg-[#be123c]" },
  { id: "dark", label: "Obsidian Slate", bgClass: "bg-[#18181b]" },
];

export const PRESET_AVATARS = [
  { label: "Exam Lead", url: "https://api.dicebear.com/9.x/lorelei/svg?seed=Aiden" },
  { label: "Content Head", url: "https://api.dicebear.com/9.x/notionists/svg?seed=Harper" },
  { label: "Question Reviewer", url: "https://api.dicebear.com/9.x/micah/svg?seed=Riley" },
  { label: "Academic Mentor", url: "https://api.dicebear.com/9.x/lorelei/svg?seed=Maya" },
  { label: "Syllabus Expert", url: "https://api.dicebear.com/9.x/notionists/svg?seed=Sasha" },
  { label: "Tech Architect", url: "https://api.dicebear.com/9.x/bottts/svg?seed=Felix" },
  { label: "Guidance Counselor", url: "https://api.dicebear.com/9.x/micah/svg?seed=Taylor" },
  { label: "Student Success", url: "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Sunny" },
];

const THEME_STORAGE_KEY = "mp_admin_theme_settings";
const AVATAR_STORAGE_KEY = "mp_admin_avatar_settings";
const SCRATCHPAD_STORAGE_KEY = "mp_admin_scratchpad";
export const PREFERENCES_EVENT = "mp-admin-preferences-change";

export const DEFAULT_THEME: AdminThemeConfig = THEME_PRESETS[0];

export const DEFAULT_AVATAR: AdminAvatarConfig = {
  type: "initials",
  initialsBg: "bg-[#2d7305]",
  statusTitle: "Active Administrator",
};

let cachedThemeRaw: string | null = null;
let cachedThemeObj: AdminThemeConfig = DEFAULT_THEME;

export function getStoredTheme(): AdminThemeConfig {
  if (typeof window === "undefined") return DEFAULT_THEME;
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY);
    if (raw === cachedThemeRaw) {
      return cachedThemeObj;
    }
    cachedThemeRaw = raw;
    cachedThemeObj = raw ? (JSON.parse(raw) as AdminThemeConfig) : DEFAULT_THEME;
    return cachedThemeObj;
  } catch {
    return DEFAULT_THEME;
  }
}

export function saveTheme(theme: AdminThemeConfig) {
  try {
    const raw = JSON.stringify(theme);
    cachedThemeRaw = raw;
    cachedThemeObj = theme;
    localStorage.setItem(THEME_STORAGE_KEY, raw);
    applyThemeToDOM(theme);
    window.dispatchEvent(new Event(PREFERENCES_EVENT));
  } catch (err) {
    console.error("Failed to save admin theme:", err);
  }
}

let cachedAvatarRaw: string | null = null;
let cachedAvatarObj: AdminAvatarConfig = DEFAULT_AVATAR;

export function getStoredAvatar(): AdminAvatarConfig {
  if (typeof window === "undefined") return DEFAULT_AVATAR;
  try {
    const raw = localStorage.getItem(AVATAR_STORAGE_KEY);
    if (raw === cachedAvatarRaw) {
      return cachedAvatarObj;
    }
    cachedAvatarRaw = raw;
    cachedAvatarObj = raw ? (JSON.parse(raw) as AdminAvatarConfig) : DEFAULT_AVATAR;
    return cachedAvatarObj;
  } catch {
    return DEFAULT_AVATAR;
  }
}

export function saveAvatar(avatar: AdminAvatarConfig) {
  try {
    const raw = JSON.stringify(avatar);
    cachedAvatarRaw = raw;
    cachedAvatarObj = avatar;
    localStorage.setItem(AVATAR_STORAGE_KEY, raw);
    window.dispatchEvent(new Event(PREFERENCES_EVENT));
  } catch (err) {
    console.error("Failed to save admin avatar:", err);
  }
}

let cachedScratchpad: string = "";

export function getStoredScratchpad(): string {
  if (typeof window === "undefined") return "";
  try {
    const note = localStorage.getItem(SCRATCHPAD_STORAGE_KEY) ?? "";
    cachedScratchpad = note;
    return note;
  } catch {
    return "";
  }
}

export function saveScratchpad(note: string) {
  try {
    cachedScratchpad = note;
    localStorage.setItem(SCRATCHPAD_STORAGE_KEY, note);
    window.dispatchEvent(new Event(PREFERENCES_EVENT));
  } catch (err) {
    console.error("Failed to save scratchpad:", err);
  }
}

export function applyThemeToDOM(theme: AdminThemeConfig) {
  if (typeof document === "undefined") return;
  const adminEls = document.querySelectorAll("[data-admin]");
  const root = adminEls.length > 0 ? (adminEls[0] as HTMLElement) : document.documentElement;

  const radiusMap = {
    sharp: "0.375rem",
    modern: "0.75rem",
    smooth: "1.125rem",
  };

  root.style.setProperty("--admin-primary", theme.primaryColor);
  root.style.setProperty("--admin-border-color", theme.borderColor);
  root.style.setProperty("--admin-radius", radiusMap[theme.borderRadius] || "0.75rem");
  root.style.setProperty("--admin-canvas", theme.canvasTone);
}

function subscribePreferences(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(PREFERENCES_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(PREFERENCES_EVENT, callback);
  };
}

export function useAdminTheme() {
  return useSyncExternalStore(
    subscribePreferences,
    getStoredTheme,
    () => DEFAULT_THEME,
  );
}

export function useAdminAvatar() {
  return useSyncExternalStore(
    subscribePreferences,
    getStoredAvatar,
    () => DEFAULT_AVATAR,
  );
}

export function useAdminScratchpad() {
  return useSyncExternalStore(
    subscribePreferences,
    getStoredScratchpad,
    () => "",
  );
}
