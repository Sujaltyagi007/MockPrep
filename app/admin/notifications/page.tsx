"use client";

import { useState } from "react";
import { Sparkles, CheckCircle2, AlertTriangle } from "lucide-react";
import { Badge, Card, PageHeader, buttonClass, formatDateTime } from "@/components/admin/ui";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  urgent: boolean;
  type: "TEST_SUBMISSION" | "JOB_EXPIRING" | "SYSTEM";
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "High Percentile Mock Score Alert",
    message: "Aarav Sharma scored 134.66 / 200 in UPSC CSE Prelims GS-1 (Top 1% accuracy). Review test evaluation sheet.",
    createdAt: "2026-04-23T09:45:00Z",
    read: false,
    urgent: false,
    type: "TEST_SUBMISSION",
  },
  {
    id: "notif-2",
    title: "Job Application Deadline Nearing",
    message: "SSC CGL 2026 applications close in 7 days. Ensure notification step guides and syllabus links are up to date.",
    createdAt: "2026-04-23T07:00:00Z",
    read: false,
    urgent: true,
    type: "JOB_EXPIRING",
  },
  {
    id: "notif-3",
    title: "Bilingual Question Submissions",
    message: "4 new bilingual questions submitted for Indian Polity topic awaiting editorial verification.",
    createdAt: "2026-04-22T14:20:00Z",
    read: true,
    urgent: false,
    type: "SYSTEM",
  },
  {
    id: "notif-4",
    title: "Platform Backup Completed",
    message: "Weekly PostgreSQL snapshot and question bank exports successfully mirrored to cloud storage.",
    createdAt: "2026-04-21T03:00:00Z",
    read: true,
    urgent: false,
    type: "SYSTEM",
  },
];

export default function NotificationsAdminPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<"ALL" | "UNREAD" | "URGENT">("ALL");

  const filtered = notifications.filter((n) => {
    if (filter === "UNREAD") return !n.read;
    if (filter === "URGENT") return n.urgent;
    return true;
  });

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const toggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  return (
    <div>
      <PageHeader
        title="Alerts & Triggers"
        description="Important candidate milestones, deadline timers, and editorial tasks."
      >
        <button
          type="button"
          onClick={markAllRead}
          className={buttonClass.secondary}
        >
          <CheckCircle2 className="size-4 text-forest" />
          <span>Mark all as read</span>
        </button>
      </PageHeader>

      {/* Filter Tabs */}
      <div className="mb-6 flex gap-2">
        {(
          [
            { id: "ALL", label: "All Alerts" },
            { id: "UNREAD", label: "Unread Only" },
            { id: "URGENT", label: "High Priority" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter(tab.id)}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${filter === tab.id
                ? "bg-forest text-white shadow-xs"
                : "border border-black/10 bg-white text-ink hover:bg-sand"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List */}
      <Card className="overflow-hidden">
        <ul className="divide-y divide-black/5">
          {filtered.map((n) => (
            <li
              key={n.id}
              className={`p-4 sm:px-6 transition flex items-start gap-3.5 ${!n.read ? "bg-forest-tint/15" : "hover:bg-sand/30"
                }`}
            >
              <span
                className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl ${n.urgent
                    ? "bg-blush text-brick"
                    : !n.read
                      ? "bg-forest-tint text-forest"
                      : "bg-sand text-body"
                  }`}
              >
                {n.urgent ? (
                  <AlertTriangle className="size-4" />
                ) : (
                  <Sparkles className="size-4" />
                )}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h3
                      className={`text-xs font-bold ${!n.read ? "text-ink font-extrabold" : "text-ink/80"
                        }`}
                    >
                      {n.title}
                    </h3>
                    {n.urgent && <Badge tone="red">Urgent</Badge>}
                    {!n.read && <Badge tone="green">New</Badge>}
                  </div>
                  <span className="text-xs text-body">
                    {formatDateTime(n.createdAt)}
                  </span>
                </div>
                <p className="mt-1 text-xs text-body leading-relaxed">{n.message}</p>
              </div>

              <button
                type="button"
                onClick={() => toggleRead(n.id)}
                className="text-xs font-semibold text-body hover:text-forest transition shrink-0"
              >
                {n.read ? "Mark unread" : "Dismiss"}
              </button>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
