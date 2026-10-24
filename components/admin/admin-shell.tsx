"use client";
import Link from "next/link";
import { ExternalLink, Menu } from "lucide-react";
import { AppSidebar } from "@/components/admin/app-sidebar";
import { type Admin, DEFAULT_ADMIN } from "@/lib/admin/types";
import { PAGE_HEADING_SLOT_ID } from "@/components/admin/page-header";
import { AdminThemeProvider } from "@/components/admin/theme-provider";
import { createContext, useContext, useState, Suspense, type ReactNode } from "react";

interface AdminShellContextType {
  menuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
}

const AdminShellContext = createContext<AdminShellContextType>({
  menuOpen: false,
  openMenu: () => { },
  closeMenu: () => { },
});

export const useAdminShell = () => useContext(AdminShellContext);

type Props = {
  admin?: Admin;
  unreadNotifications?: number;
  sidebar?: ReactNode;
  headerActions?: ReactNode;
  children: ReactNode;
};

export function AdminShell({
  admin = DEFAULT_ADMIN,
  unreadNotifications = 2,
  sidebar,
  headerActions,
  children,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <AdminShellContext.Provider value={{ menuOpen, openMenu: () => setMenuOpen(true), closeMenu: () => setMenuOpen(false), }}>
      <div data-admin className="flex min-h-screen-dvh w-full bg-sand text-ink">
        <AdminThemeProvider />
        {sidebar ? (sidebar) : (<Suspense fallback={null}>
          <AppSidebar admin={admin} unreadNotifications={unreadNotifications} mobileOpen={menuOpen} onMobileClose={() => setMenuOpen(false)} />
        </Suspense>
        )}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-3 border-b border-black/5 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 lg:hidden">
              <button type="button" aria-label="Open menu" onClick={() => setMenuOpen(true)} className="flex size-10 items-center justify-center rounded-xl bg-sand text-ink transition hover:scale-105 hover:bg-black/5 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest">
                <Menu className="size-5 transition-transform duration-200" />
              </button>
              <span data-top-bar-fallback className="font-display text-[17px] font-semibold text-forest">
                MockPrep Admin
              </span>
            </div>

            <div id={PAGE_HEADING_SLOT_ID} className="flex min-w-0 flex-1 items-center empty:hidden" />
            <div className="flex shrink-0 items-center gap-2">
              {headerActions}
              <Link href="/" target="_blank" className="group inline-flex h-10 items-center gap-2 rounded-xl border border-black/10 bg-white px-3.5 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-forest/25 hover:bg-sand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest active:translate-y-0" >
                <ExternalLink className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                <span className="hidden sm:inline">View site</span>
              </Link>
            </div>
          </header>
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-6xl">{children}</div>
          </main>
        </div>
      </div>
    </AdminShellContext.Provider>
  );
}
