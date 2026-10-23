"use client";
import Link from "next/link";
import type { Admin } from "@/lib/admin/types";
import { AdminAvatar } from "@/components/admin/admin-avatar";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, useMemo, useCallback, useSyncExternalStore, Fragment, type ReactNode } from "react";
import { LayoutDashboard, BookOpenCheck, HelpCircle, Briefcase, UsersRound, Bell, UserCog, LogOut, PanelLeftClose, PanelLeftOpen, Search, X, ChevronRight, ShieldCheck, Sparkles, FileText, Sliders, CheckCircle2, GraduationCap, type LucideIcon, } from "lucide-react";
import { accountHref, accountSectionsFor } from "@/lib/admin/account-sections";

export interface AppSidebarProps {
  admin: Admin;
  unreadNotifications?: number;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export type RailTabId =
  | "dashboard"
  | "tests"
  | "questions"
  | "jobs"
  | "users"
  | "notifications"
  | "account";

interface RailItem {
  id: RailTabId;
  label: string;
  icon: LucideIcon;
  href?: string;
  badge?: number;
}

const SIDEBAR_COLLAPSED_KEY = "mp_sidebar_collapsed";
const SIDEBAR_PREFERENCE_EVENT = "mp-sidebar-preference-change";
let sidebarCollapsedFallback: boolean | null = null;

function subscribeToSidebarPreference(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(SIDEBAR_PREFERENCE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(SIDEBAR_PREFERENCE_EVENT, onChange);
  };
}

function getSidebarPreferenceSnapshot() {
  try {
    const saved = window.localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
    return saved === null ? sidebarCollapsedFallback ?? false : saved === "true";
  } catch {
    return sidebarCollapsedFallback ?? false;
  }
}

function getServerSidebarPreferenceSnapshot() {
  return false;
}

const getRailTabFromPath = (pathname: string): RailTabId => {
  if (pathname === "/admin") return "dashboard";
  if (pathname.startsWith("/admin/tests")) return "tests";
  if (pathname.startsWith("/admin/questions")) return "questions";
  if (pathname.startsWith("/admin/jobs")) return "jobs";
  if (pathname.startsWith("/admin/users")) return "users";
  if (pathname.startsWith("/admin/notifications")) return "notifications";
  if (pathname.startsWith("/admin/account")) return "account";
  return "dashboard";
};

export function AppSidebar({
  admin,
  unreadNotifications = 2,
  mobileOpen,
  onMobileClose,
}: AppSidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const accountTab = searchParams.get("tab") ?? "profile";

  const currentTabFromUrl = useMemo<RailTabId>(() => getRailTabFromPath(pathname), [pathname]);
  const [selected, setSelected] = useState<{ tab: RailTabId; path: string } | null>(null);
  const setSelectedTab = (tab: RailTabId) => setSelected({ tab, path: pathname });

  const panelCollapsed = useSyncExternalStore(
    subscribeToSidebarPreference,
    getSidebarPreferenceSnapshot,
    getServerSidebarPreferenceSnapshot
  );

  const [searchQuery, setSearchQuery] = useState("");

  const activeTab: RailTabId = selected?.path === pathname ? selected.tab : currentTabFromUrl;

  const togglePanel = useCallback(() => {
    const next = !panelCollapsed;
    sidebarCollapsedFallback = next;
    try {
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(next));
    } catch { }
    window.dispatchEvent(new Event(SIDEBAR_PREFERENCE_EVENT));
  }, [panelCollapsed]);

  // Support Ctrl+B or Cmd+B to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        togglePanel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePanel]);

  const railItems: RailItem[] = [
    {
      id: "dashboard",
      label: "Dashboard Overview",
      icon: LayoutDashboard,
      href: "/admin",
    },
    {
      id: "tests",
      label: "Mock Tests",
      icon: BookOpenCheck,
      href: "/admin/tests",
    },
    {
      id: "questions",
      label: "Question Bank",
      icon: HelpCircle,
      href: "/admin/questions",
    },
    {
      id: "jobs",
      label: "Job Guides & Vacancies",
      icon: Briefcase,
      href: "/admin/jobs",
    },
    {
      id: "users",
      label: "Students & Team",
      icon: UsersRound,
      href: "/admin/users",
    },
    {
      id: "notifications",
      label: "Alerts & Triggers",
      icon: Bell,
      href: "/admin/notifications",
      badge: unreadNotifications,
    },
    {
      id: "account",
      label: "Account & Settings",
      icon: UserCog,
      href: "/admin/account",
    },
  ];

  const activeIndex = railItems.findIndex((item) => item.id === activeTab);

  const renderIconRail = (
    <div className="flex h-full w-17 shrink-0 flex-col items-center justify-between border-r border-black/8 bg-white py-3.5 select-none z-10">
      <div className="flex flex-col items-center gap-4">
        {/* Brand Logo Button */}
        <button
          type="button"
          onClick={() => {
            togglePanel();
            if (mobileOpen) onMobileClose();
          }}
          aria-label={panelCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!panelCollapsed}
          className="group relative flex size-12 items-center justify-center rounded-2xl border border-black/8 bg-white shadow-xs transition-transform duration-200 hover:scale-105"
          title={panelCollapsed ? "Expand sidebar (Ctrl+B)" : "Collapse sidebar (Ctrl+B)"}
        >
          <div className="grid size-10 place-items-center rounded-xl bg-forest text-white font-display font-extrabold text-base tracking-tighter shadow-xs">
            MP
          </div>
        </button>

        <div className="h-px w-8 bg-black/8" />

        {/* Rail navigation tabs */}
        <nav className="relative flex flex-col items-center gap-1.5" aria-label="Main rail">
          {activeIndex >= 0 && (
            <Fragment>
              <span
                aria-hidden
                className="rail-pill pointer-events-none absolute top-0 left-0 size-11 rounded-xl bg-forest shadow-md shadow-forest/25"
                style={{ transform: `translateY(${activeIndex * 3.125}rem)` }}
              />
              <span
                aria-hidden
                className="rail-pill pointer-events-none absolute top-2.5 -left-3 h-6 w-1"
                style={{ transform: `translateY(${activeIndex * 3.125}rem)` }}
              >
                <span key={activeTab} className="rail-marker block size-full rounded-r-full bg-forest" />
              </span>
            </Fragment>
          )}

          {railItems.map((item) => {
            const IconComponent = item.icon;
            const isHighlighted = activeTab === item.id;

            const handleItemClick = (e: React.MouseEvent) => {
              if (item.id === activeTab && !panelCollapsed) {
                if (!item.href || pathname === item.href) {
                  e.preventDefault();
                  togglePanel();
                  return;
                }
              }
              setSelectedTab(item.id);
              if (panelCollapsed) {
                sidebarCollapsedFallback = false;
                try {
                  localStorage.setItem(SIDEBAR_COLLAPSED_KEY, "false");
                } catch { }
                window.dispatchEvent(new Event(SIDEBAR_PREFERENCE_EVENT));
              }
            };

            return (
              <div key={item.id} className="group relative">
                {item.href ? (
                  <Link
                    href={item.href}
                    onClick={handleItemClick}
                    aria-current={isHighlighted ? "page" : undefined}
                    aria-label={item.label}
                    className={`group relative flex size-11 items-center justify-center rounded-xl transition-colors duration-300 ${isHighlighted ? "text-white" : "text-ink/65 hover:bg-sand hover:text-ink"
                      }`}
                  >
                    <span className={`flex ${isHighlighted ? "rail-icon-pop" : ""}`}>
                      <IconComponent className="size-5 transition-transform duration-200 group-hover:scale-110" />
                    </span>
                    {Boolean(item.badge && item.badge > 0) && (
                      <span
                        className={`absolute -top-1 -right-1 flex min-w-4.5 items-center justify-center rounded-full px-1 py-0.5 text-[10px] font-bold leading-none ${isHighlighted ? "bg-flame text-white shadow" : "bg-flame text-white"
                          }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={handleItemClick}
                    aria-current={isHighlighted ? "page" : undefined}
                    aria-label={item.label}
                    className={`group relative flex size-11 items-center justify-center rounded-xl transition-colors duration-300 ${isHighlighted ? "text-white" : "text-ink/65 hover:bg-sand hover:text-ink"
                      }`}
                  >
                    <span className={`flex ${isHighlighted ? "rail-icon-pop" : ""}`}>
                      <IconComponent className="size-5 transition-transform duration-200 group-hover:scale-110" />
                    </span>
                  </button>
                )}

                {/* Hover Tooltip */}
                <div className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 hidden items-center whitespace-nowrap rounded-lg bg-ink px-2.5 py-1 text-xs font-semibold text-white shadow-lg md:group-hover:flex">
                  <span className="absolute -left-1 top-1/2 -translate-y-1/2 border-y-4 border-r-4 border-y-transparent border-r-ink" />
                  {item.label}
                </div>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Rail Bottom Controls */}
      <div className="flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={togglePanel}
          className="group relative flex size-10 items-center justify-center rounded-xl text-ink/50 transition hover:bg-sand hover:text-ink"
          title={panelCollapsed ? "Expand sidebar (Ctrl+B)" : "Collapse sidebar (Ctrl+B)"}
          aria-label={panelCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {panelCollapsed ? (
            <PanelLeftOpen className="size-5 transition group-hover:scale-110" />
          ) : (
            <PanelLeftClose className="size-5 transition group-hover:scale-110" />
          )}
          <div className="pointer-events-none absolute left-full ml-3 z-50 hidden items-center whitespace-nowrap rounded-lg bg-ink px-2.5 py-1 text-xs font-semibold text-white shadow-lg md:group-hover:flex">
            <span className="absolute -left-1 top-1/2 -translate-y-1/2 border-y-4 border-r-4 border-y-transparent border-r-ink" />
            {panelCollapsed ? "Expand Sidebar (Ctrl+B)" : "Collapse Sidebar (Ctrl+B)"}
          </div>
        </button>

        <Link
          href="/admin/account"
          onClick={() => onMobileClose()}
          className="group relative pt-1 block"
          title="Account & Theme Settings"
        >
          <div className="flex size-10 cursor-pointer items-center justify-center rounded-full ring-2 ring-transparent transition hover:scale-105 hover:ring-forest/30">
            <AdminAvatar name={admin.name} size="md" />
          </div>
          <div className="pointer-events-none absolute left-full ml-3 bottom-0 z-50 hidden items-center whitespace-nowrap rounded-lg bg-ink px-2.5 py-1 text-xs font-semibold text-white shadow-lg md:group-hover:flex">
            <span className="absolute -left-1 top-1/2 -translate-y-1/2 border-y-4 border-r-4 border-y-transparent border-r-ink" />
            {admin.name} ({admin.role === "SUPER_ADMIN" ? "Super Admin" : "Content Editor"})
          </div>
        </Link>
      </div>
    </div>
  );

  const renderSecondaryPanelContent = (isMobile: boolean) => (
    <Fragment>
      {/* Secondary Panel Header */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-black/8 px-4">
        <div key={activeTab} className="panel-swap min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h2 className="truncate font-display text-[15px] font-bold text-ink">
              {activeTab === "dashboard" && "Dashboard"}
              {activeTab === "tests" && "Mock Tests"}
              {activeTab === "questions" && "Question Bank"}
              {activeTab === "jobs" && "Job Guides"}
              {activeTab === "users" && "Students & Staff"}
              {activeTab === "notifications" && "Alerts & Triggers"}
              {activeTab === "account" && "Account & Settings"}
            </h2>
            {activeTab === "notifications" && unreadNotifications > 0 && (
              <span className="rounded-full bg-flame/15 px-1.5 py-0.5 text-[10.5px] font-bold text-flame">
                {unreadNotifications}
              </span>
            )}
          </div>
          <p className="truncate text-[11px] text-body">
            {activeTab === "dashboard" && "Real-time summary"}
            {activeTab === "tests" && "All competitive exam series"}
            {activeTab === "questions" && "Bilingual question bank"}
            {activeTab === "jobs" && "Official notifications & steps"}
            {activeTab === "users" && "Aspirants & educator access"}
            {activeTab === "notifications" && "System & score alerts"}
            {activeTab === "account" && admin.email}
          </p>
        </div>

        {isMobile ? (
          <button
            type="button"
            onClick={onMobileClose}
            className="flex size-8 items-center justify-center rounded-lg text-ink/60 transition hover:bg-sand hover:text-ink"
            aria-label="Close menu"
          >
            <X className="size-4.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={togglePanel}
            className="flex size-7 items-center justify-center rounded-lg text-ink/40 transition hover:bg-sand hover:text-ink"
            title="Collapse panel"
          >
            <PanelLeftClose className="size-4" />
          </button>
        )}
      </div>

      {/* Secondary panel search if on tests or questions */}
      {(activeTab === "tests" || activeTab === "questions" || activeTab === "jobs") && (
        <div className="panel-swap border-b border-black/8 p-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-ink/40" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-black/10 bg-sand/60 py-1.5 pr-7 pl-8 text-xs text-ink placeholder:text-body/60 outline-none transition focus:border-forest focus:bg-white focus:ring-1 focus:ring-forest"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink"
                title="Clear search"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Secondary Panel Body */}
      <div key={activeTab} className="panel-swap panel-stagger flex-1 overflow-y-auto px-3 py-3">
        {activeTab === "dashboard" && (
          <div className="space-y-2">
            <Link
              href="/admin"
              onClick={onMobileClose}
              className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold transition ${pathname === "/admin" ? "bg-forest text-white" : "text-ink/80 hover:bg-sand hover:text-ink"
                }`}
            >
              <LayoutDashboard className="size-4" />
              <span>Dashboard Home</span>
            </Link>

            <div className="mt-4 rounded-xl border border-black/8 bg-sand/40 p-3">
              <p className="text-[11px] font-bold text-forest uppercase tracking-wider">Quick Navigation</p>
              <p className="mt-1 text-xs text-body leading-relaxed">
                Click any section icon on the left rail to manage mock tests, question bank, job guides, or customize account appearance.
              </p>
            </div>
          </div>
        )}

        {activeTab === "tests" && (
          <div className="space-y-1">
            <p className="px-2 pb-1 text-[10.5px] font-bold tracking-wider text-body/70 uppercase">
              Mock Test Series
            </p>
            {[
              { href: "/admin/tests", label: "All Mock Tests", icon: BookOpenCheck },
              { href: "/admin/tests?category=CIVIL", label: "Civil Services (UPSC)", icon: GraduationCap },
              { href: "/admin/tests?category=BANKING_SSC", label: "Banking & SSC CGL", icon: FileText },
              { href: "/admin/tests?category=RAILWAYS", label: "Railways (RRB)", icon: CheckCircle2 },
              { href: "/admin/tests?status=DRAFT", label: "Draft Tests", icon: Sliders },
            ].map(({ href, label, icon: TabIcon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={onMobileClose}
                  className={`flex items-center justify-between rounded-xl px-2.5 py-2 text-xs transition ${active ? "bg-forest text-white font-semibold shadow-xs" : "text-ink/80 hover:bg-sand hover:text-ink font-medium"
                    }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <TabIcon className={`size-4 shrink-0 ${active ? "text-white" : "text-forest"}`} />
                    <span className="truncate">{label}</span>
                  </div>
                  <ChevronRight className={`size-3.5 ${active ? "text-white" : "text-ink/30"}`} />
                </Link>
              );
            })}
          </div>
        )}

        {activeTab === "questions" && (
          <div className="space-y-1">
            <p className="px-2 pb-1 text-[10.5px] font-bold tracking-wider text-body/70 uppercase">
              Question Management
            </p>
            {[
              { href: "/admin/questions", label: "All Questions", icon: HelpCircle },
              { href: "/admin/questions?difficulty=HARD", label: "Advanced Level", icon: Sparkles },
              { href: "/admin/questions?difficulty=MEDIUM", label: "Medium Practice", icon: CheckCircle2 },
              { href: "/admin/questions?difficulty=EASY", label: "Beginner Sets", icon: FileText },
            ].map(({ href, label, icon: TabIcon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={onMobileClose}
                  className={`flex items-center justify-between rounded-xl px-2.5 py-2 text-xs transition ${active ? "bg-forest text-white font-semibold shadow-xs" : "text-ink/80 hover:bg-sand hover:text-ink font-medium"
                    }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <TabIcon className={`size-4 shrink-0 ${active ? "text-white" : "text-forest"}`} />
                    <span className="truncate">{label}</span>
                  </div>
                  <ChevronRight className={`size-3.5 ${active ? "text-white" : "text-ink/30"}`} />
                </Link>
              );
            })}
          </div>
        )}

        {activeTab === "jobs" && (
          <div className="space-y-1">
            <p className="px-2 pb-1 text-[10.5px] font-bold tracking-wider text-body/70 uppercase">
              Job Postings
            </p>
            {[
              { href: "/admin/jobs", label: "Active Notifications", icon: Briefcase },
              { href: "/admin/jobs?status=PUBLISHED", label: "Verified Application Guides", icon: CheckCircle2 },
              { href: "/admin/jobs?filter=expiring", label: "Closing Soon Alerts", icon: Bell },
            ].map(({ href, label, icon: TabIcon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={onMobileClose}
                  className={`flex items-center justify-between rounded-xl px-2.5 py-2 text-xs transition ${active ? "bg-forest text-white font-semibold shadow-xs" : "text-ink/80 hover:bg-sand hover:text-ink font-medium"
                    }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <TabIcon className={`size-4 shrink-0 ${active ? "text-white" : "text-forest"}`} />
                    <span className="truncate">{label}</span>
                  </div>
                  <ChevronRight className={`size-3.5 ${active ? "text-white" : "text-ink/30"}`} />
                </Link>
              );
            })}
          </div>
        )}

        {activeTab === "users" && (
          <div className="space-y-1">
            <p className="px-2 pb-1 text-[10.5px] font-bold tracking-wider text-body/70 uppercase">
              Community & Access
            </p>
            {[
              { href: "/admin/users", label: "Student Aspirants", icon: UsersRound },
              { href: "/admin/users?role=ADMIN", label: "Educators & Admins", icon: ShieldCheck },
            ].map(({ href, label, icon: TabIcon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={onMobileClose}
                  className={`flex items-center justify-between rounded-xl px-2.5 py-2 text-xs transition ${active ? "bg-forest text-white font-semibold shadow-xs" : "text-ink/80 hover:bg-sand hover:text-ink font-medium"
                    }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <TabIcon className={`size-4 shrink-0 ${active ? "text-white" : "text-forest"}`} />
                    <span className="truncate">{label}</span>
                  </div>
                  <ChevronRight className={`size-3.5 ${active ? "text-white" : "text-ink/30"}`} />
                </Link>
              );
            })}
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="space-y-1">
            <p className="px-2 pb-1 text-[10.5px] font-bold tracking-wider text-body/70 uppercase">
              Alert Feeds
            </p>
            {[
              { href: "/admin/notifications", label: "All Notifications", icon: Bell },
              { href: "/admin/notifications?filter=urgent", label: "High Priority Alerts", icon: Sparkles },
            ].map(({ href, label, icon: TabIcon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={onMobileClose}
                  className={`flex items-center justify-between rounded-xl px-2.5 py-2 text-xs transition ${active ? "bg-forest text-white font-semibold shadow-xs" : "text-ink/80 hover:bg-sand hover:text-ink font-medium"
                    }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <TabIcon className={`size-4 shrink-0 ${active ? "text-white" : "text-forest"}`} />
                    <span className="truncate">{label}</span>
                  </div>
                  <ChevronRight className={`size-3.5 ${active ? "text-white" : "text-ink/30"}`} />
                </Link>
              );
            })}
          </div>
        )}

        {activeTab === "account" && (
          <div className="space-y-5">
            <div>
              <p className="px-3 pb-1.5 text-[10.5px] font-bold tracking-wider text-body/70 uppercase">
                Account Settings
              </p>
              <div className="space-y-0.5">
                {accountSectionsFor(admin.role === "SUPER_ADMIN").map((section) => {
                  const active = pathname === "/admin/account" && accountTab === section.id;
                  const Icon = section.icon;
                  return (
                    <Link
                      key={section.id}
                      href={accountHref(section.id)}
                      onClick={onMobileClose}
                      aria-current={active ? "page" : undefined}
                      className={`group flex items-center gap-3 rounded-xl px-2.5 py-2 transition ${active ? "bg-forest-tint" : "hover:bg-sand"
                        }`}
                    >
                      <span
                        className={`flex size-8 shrink-0 items-center justify-center rounded-lg transition ${active
                            ? "bg-forest text-white shadow-xs"
                            : "bg-sand text-ink/70 group-hover:bg-white group-hover:text-forest"
                          }`}
                      >
                        <Icon className="size-4" />
                      </span>
                      <span className="min-w-0">
                        <span className={`block truncate text-xs font-semibold ${active ? "text-forest" : "text-ink"}`}>
                          {section.label}
                        </span>
                        <span className="block truncate text-[11px] text-body">{section.hint}</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Secondary Panel Bottom User Card */}
      <div className="shrink-0 border-t border-black/8 bg-white p-3">
        <div className="flex items-center justify-between gap-2.5 rounded-xl bg-sand/60 px-2.5 py-2">
          <Link
            href="/admin/account"
            onClick={onMobileClose}
            className="flex min-w-0 flex-1 items-center gap-2 hover:opacity-85 transition"
          >
            <AdminAvatar name={admin.name} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-ink">{admin.name}</p>
              <p className="truncate text-[10.5px] text-body">
                {admin.role === "SUPER_ADMIN" ? "Super Admin" : "Content Editor"}
              </p>
            </div>
          </Link>
          <Link
            href="/"
            title="Exit Admin Panel"
            className="flex size-7 items-center justify-center rounded-lg text-ink/70 transition hover:bg-sand hover:text-brick"
          >
            <LogOut className="size-4" />
          </Link>
        </div>
      </div>
    </Fragment>
  );

  return (
    <Fragment>
      {/* Desktop Sticky Rail + Collapsible Secondary Panel */}
      <aside className="sticky top-0 z-40 hidden h-screen shrink-0 lg:flex">
        {renderIconRail}
        <div
          className={`relative flex h-full flex-col border-r border-black/8 bg-white/95 backdrop-blur-sm transition-[width,opacity] duration-250 ease-in-out ${panelCollapsed ? "w-0 overflow-hidden border-r-0 opacity-0" : "w-64 opacity-100"
            }`}
        >
          <div className="flex h-full w-64 flex-col">{renderSecondaryPanelContent(false)}</div>
        </div>
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-xs transition-opacity" onClick={onMobileClose} />
          <aside className="relative flex h-full max-w-[92vw] bg-white shadow-2xl">
            {renderIconRail}
            <div className="flex h-full w-64 flex-col border-r border-black/8 bg-white">
              {renderSecondaryPanelContent(true)}
            </div>
          </aside>
        </div>
      )}
    </Fragment>
  );
}
