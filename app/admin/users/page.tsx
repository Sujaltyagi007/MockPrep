"use client";

import { useState } from "react";
import Link from "next/link";
import {
  UsersRound,
  ShieldCheck,
  Search,
  Plus,
  GraduationCap,
  Award,
  CheckCircle2,
} from "lucide-react";
import {
  Badge,
  Card,
  CardHeader,
  PageHeader,
  buttonClass,
  formatDateTime,
} from "@/components/admin/ui";
import { AdminAvatar } from "@/components/admin/admin-avatar";

interface UserRow {
  id: string;
  name: string;
  email: string;
  role: "SUPER_ADMIN" | "EDITOR" | "STUDENT";
  phone?: string;
  qualification?: string;
  joinedAt: string;
  attemptsCount: number;
  status: "ACTIVE" | "PENDING";
}

const INITIAL_USERS: UserRow[] = [
  {
    id: "u-1",
    name: "MockPrep Administrator",
    email: "admin@mockprep.org",
    role: "SUPER_ADMIN",
    joinedAt: "2026-01-01T00:00:00Z",
    attemptsCount: 0,
    status: "ACTIVE",
  },
  {
    id: "u-2",
    name: "Dr. K. Swaminathan",
    email: "swami.educator@mockprep.org",
    role: "EDITOR",
    joinedAt: "2026-01-15T12:00:00Z",
    attemptsCount: 0,
    status: "ACTIVE",
  },
  {
    id: "u-3",
    name: "Aarav Sharma",
    email: "aarav.sharma22@gmail.com",
    role: "STUDENT",
    phone: "+91 98765 43210",
    qualification: "GRADUATE",
    joinedAt: "2026-02-10T14:30:00Z",
    attemptsCount: 14,
    status: "ACTIVE",
  },
  {
    id: "u-4",
    name: "Priya Patel",
    email: "priya.p@outlook.com",
    role: "STUDENT",
    phone: "+91 97123 45678",
    qualification: "BTECH",
    joinedAt: "2026-02-18T10:15:00Z",
    attemptsCount: 22,
    status: "ACTIVE",
  },
  {
    id: "u-5",
    name: "Vikramaditya Rao",
    email: "vikram.rao@gmail.com",
    role: "STUDENT",
    phone: "+91 94455 66778",
    qualification: "CLASS_12",
    joinedAt: "2026-03-05T16:45:00Z",
    attemptsCount: 8,
    status: "ACTIVE",
  },
  {
    id: "u-6",
    name: "Ananya Mukherjee",
    email: "ananya.m@gmail.com",
    role: "STUDENT",
    phone: "+91 98111 22334",
    qualification: "POSTGRADUATE",
    joinedAt: "2026-03-12T11:20:00Z",
    attemptsCount: 19,
    status: "ACTIVE",
  },
];

export default function UsersAdminPage() {
  const [users, setUsers] = useState<UserRow[]>(INITIAL_USERS);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole =
      roleFilter === "ALL"
        ? true
        : roleFilter === "ADMIN"
        ? u.role === "SUPER_ADMIN" || u.role === "EDITOR"
        : u.role === "STUDENT";
    return matchSearch && matchRole;
  });

  return (
    <div>
      <PageHeader
        title="Students & Access"
        description="Monitor registered aspirants, test participation rates, and admin permissions."
      >
        <Link href="/admin/account?tab=team" className={buttonClass.secondary}>
          <ShieldCheck className="size-4" />
          <span>Team Roles</span>
        </Link>
      </PageHeader>

      {/* Summary Row */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-black/6 bg-white p-4 shadow-2xs">
          <p className="text-[11px] font-bold text-body uppercase tracking-wider">Total Aspirants</p>
          <p className="mt-1 font-display text-2xl font-bold text-ink">1,248</p>
        </div>
        <div className="rounded-2xl border border-black/6 bg-white p-4 shadow-2xs">
          <p className="text-[11px] font-bold text-body uppercase tracking-wider">Active This Week</p>
          <p className="mt-1 font-display text-2xl font-bold text-forest">384</p>
        </div>
        <div className="rounded-2xl border border-black/6 bg-white p-4 shadow-2xs">
          <p className="text-[11px] font-bold text-body uppercase tracking-wider">Total Attempts</p>
          <p className="mt-1 font-display text-2xl font-bold text-olive">4,912</p>
        </div>
        <div className="rounded-2xl border border-black/6 bg-white p-4 shadow-2xs">
          <p className="text-[11px] font-bold text-body uppercase tracking-wider">Staff / Admins</p>
          <p className="mt-1 font-display text-2xl font-bold text-ink">2</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-6 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink/40" />
          <input
            type="text"
            placeholder="Search candidates by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-black/10 bg-white py-2 pl-9 pr-4 text-xs text-ink outline-none transition focus:border-forest focus:ring-1 focus:ring-forest"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="w-full sm:w-auto rounded-xl border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-ink outline-none focus:border-forest"
        >
          <option value="ALL">All Accounts</option>
          <option value="STUDENT">Aspirants / Students</option>
          <option value="ADMIN">Admins & Educators</option>
        </select>
      </div>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-black/5 bg-sand/30 text-body font-semibold">
                <th className="py-3 px-4 sm:px-6">User</th>
                <th className="py-3 px-3">Role</th>
                <th className="py-3 px-3">Qualification</th>
                <th className="py-3 px-3">Mock Attempts</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 sm:px-6 text-right">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="transition hover:bg-sand/30">
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <AdminAvatar name={u.name} size="sm" />
                      <div className="min-w-0">
                        <p className="font-semibold text-ink">{u.name}</p>
                        <p className="text-[11px] text-body">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3">
                    <Badge
                      tone={
                        u.role === "SUPER_ADMIN"
                          ? "yellow"
                          : u.role === "EDITOR"
                          ? "green"
                          : "grey"
                      }
                    >
                      {u.role === "SUPER_ADMIN"
                        ? "Super Admin"
                        : u.role === "EDITOR"
                        ? "Educator"
                        : "Aspirant"}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-3 text-body">
                    {u.qualification || "—"}
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-ink">
                    {u.role === "STUDENT" ? `${u.attemptsCount} tests` : "Admin"}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-forest-tint px-2 py-0.5 text-[10px] font-bold text-forest">
                      <span className="size-1.5 rounded-full bg-forest" />
                      Active
                    </span>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-right text-body">
                    {formatDateTime(u.joinedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
