import { Suspense, type ReactNode } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { NotificationBell } from "@/components/admin/notification-bell";
import { DEFAULT_ADMIN } from "@/lib/admin/types";

function SidebarSkeleton() {
  return (
    <aside
      aria-hidden
      className="sticky top-0 z-40 hidden h-screen w-17 shrink-0 border-r border-black/8 bg-white py-3.5 select-none lg:flex flex-col items-center justify-between"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="skeleton size-11 rounded-2xl" />
        <div className="h-px w-8 bg-black/8" />
        <div className="flex flex-col items-center gap-1.5">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="skeleton size-11 rounded-xl" />
          ))}
        </div>
      </div>
      <div className="skeleton size-10 rounded-full" />
    </aside>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminShell
      admin={DEFAULT_ADMIN}
      unreadNotifications={2}
      headerActions={
        <Suspense fallback={null}>
          <NotificationBell />
        </Suspense>
      }
    >
      {children}
    </AdminShell>
  );
}
