"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Bell, ChevronRight, Sparkles } from "lucide-react";

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const mockNotifications = [
    {
      id: "1",
      title: "Top 1% Mock Score Alert",
      text: "Aarav Sharma scored 134.66 / 200 on UPSC Prelims GS-1.",
      time: "12m ago",
      urgent: false,
    },
    {
      id: "2",
      title: "SSC CGL 2026 Alert",
      text: "Application closing deadline approaching in 7 days.",
      time: "2h ago",
      urgent: true,
    },
    {
      id: "3",
      title: "Question Bank Review",
      text: "4 new bilingual questions submitted for Indian Polity.",
      time: "1d ago",
      urgent: false,
    },
  ];

  const unreadCount = 2;

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button type="button" onClick={() => setOpen((prev) => !prev)} aria-label="Notifications" title="Admin Notifications" className="relative inline-flex size-10 items-center justify-center rounded-xl border border-black/10 bg-white text-ink transition hover:-translate-y-0.5 hover:border-forest/25 hover:bg-sand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest">
        <Bell className="size-4.5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-flame px-1 text-xs font-bold text-white tabular-nums ring-2 ring-white">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="dialog-card-in absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-black/10 bg-white p-3 shadow-xl z-50">
          <div className="flex items-center justify-between border-b border-black/5 pb-2.5 px-2">
            <div className="flex items-center gap-2">
              <span className="font-display text-sm font-bold text-ink">Notifications</span>
              <span className="rounded-full bg-forest-tint px-2 py-0.5 text-xs font-bold text-forest">
                {unreadCount} new
              </span>
            </div>
            <Link href="/admin/notifications" onClick={() => setOpen(false)} className="text-xs font-semibold text-forest hover:underline">
              View all
            </Link>
          </div>

          <div className="divide-y divide-black/5 max-h-72 overflow-y-auto my-1">
            {mockNotifications.map((n) => (
              <div key={n.id} className="p-2.5 transition hover:bg-sand/50 rounded-xl">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-semibold text-ink flex items-center gap-1.5">
                    {n.urgent ? (
                      <span className="size-2 rounded-full bg-flame shrink-0" />
                    ) : (
                      <Sparkles className="size-3 text-forest shrink-0" />
                    )}
                    {n.title}
                  </p>
                  <span className="text-xs text-body whitespace-nowrap">{n.time}</span>
                </div>
                <p className="mt-1 text-xs text-body leading-relaxed">{n.text}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-black/5 pt-2 text-center">
            <Link href="/admin/notifications" onClick={() => setOpen(false)} className="inline-flex items-center gap-1 text-xs font-semibold text-ink hover:text-forest transition">
              <span>Manage all alerts & triggers</span>
              <ChevronRight className="size-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
