import Link from "next/link";
import { Fragment, Suspense } from "react";
import type { Metadata } from "next";
import {
  ShieldCheck,
  UserCheck,
  CheckCircle2,
  BookOpenCheck,
  HelpCircle,
} from "lucide-react";
import {
  Badge,
  Card,
  CardHeader,
  PageHeader,
  buttonClass,
} from "@/components/admin/ui";
import { AdminAvatar } from "@/components/admin/admin-avatar";
import { UserCustomizer } from "@/components/admin/account/user-customizer";
import {
  accountHref,
  accountSectionsFor,
  type AccountSectionId,
} from "@/lib/admin/account-sections";
import { DEFAULT_ADMIN, getAdminUsers } from "@/lib/admin/admin-service";

export const metadata: Metadata = {
  title: "Account Settings - MockPrep Admin",
};

export const instant = false;

const THEME_PALETTE = [
  { name: "Forest Emerald", hex: "#2d7305", bgClass: "bg-[#2d7305]", role: "Primary Brand, Active Rail & CTA" },
  { name: "Flame Amber", hex: "#fc7c02", bgClass: "bg-[#fc7c02]", role: "Urgent Alerts, Badges & Focus" },
  { name: "Honey Glow", hex: "#ffe6c7", bgClass: "bg-[#ffe6c7]", role: "Warm Badges & Highlights" },
  { name: "Sand & Linen", hex: "#f5f5f5", bgClass: "bg-[#f5f5f5]", role: "Canvas Background & Card Surfaces" },
  { name: "Deep Ink", hex: "#1c1b1b", bgClass: "bg-[#1c1b1b]", role: "Headings & Primary Typography" },
];

function AccountSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-8 w-48 skeleton rounded-xl" />
      <div className="h-64 w-full skeleton rounded-2xl" />
    </div>
  );
}

interface AccountPageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default function AccountPage({ searchParams }: AccountPageProps) {
  return (
    <Suspense fallback={<AccountSkeleton />}>
      <AccountContent searchParams={searchParams} />
    </Suspense>
  );
}

async function AccountContent({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const admin = DEFAULT_ADMIN;
  const isSuperAdmin = admin.role === "SUPER_ADMIN";
  const sections = accountSectionsFor(isSuperAdmin);

  const resolvedParams = await searchParams;
  const tab = resolvedParams.tab;
  const current = sections.find((section) => section.id === tab) ?? sections[0];
  const show = (id: AccountSectionId) => current.id === id;

  const teamUsers = await getAdminUsers();

  return (
    <Fragment>
      <PageHeader title={current.label} description={current.hint} />

      {/* Mobile / Tablet Horizontal Tab Scrollbar */}
      <nav
        aria-label="Account sections"
        className="-mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-1 lg:hidden"
      >
        {sections.map((section) => {
          const active = section.id === current.id;
          const Icon = section.icon;
          return (
            <Link
              key={section.id}
              href={accountHref(section.id)}
              aria-current={active ? "page" : undefined}
              className={`inline-flex h-9 shrink-0 items-center gap-2 rounded-full border px-3.5 text-xs font-semibold transition ${
                active
                  ? "border-forest bg-forest text-white"
                  : "border-black/10 bg-white text-ink hover:bg-sand"
              }`}
            >
              <Icon className="size-3.5" />
              {section.label}
            </Link>
          );
        })}
      </nav>

      {/* TAB 1: Profile & Credentials */}
      {show("profile") && (
        <div className="grid items-start gap-6 lg:grid-cols-12">
          <Card className="p-5 lg:col-span-7">
            <div className="mb-5 flex items-center gap-3.5 border-b border-black/5 pb-4">
              <AdminAvatar name={admin.name} size="lg" showStatusIndicator />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="truncate font-display text-base font-bold text-ink">
                    {admin.name}
                  </h2>
                  <Badge tone={isSuperAdmin ? "yellow" : "grey"}>
                    {isSuperAdmin ? "Super Admin" : "Content Editor"}
                  </Badge>
                </div>
                <p className="truncate text-xs text-body">{admin.email}</p>
              </div>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Administrator Display Name
                </label>
                <input
                  type="text"
                  defaultValue={admin.name}
                  className="w-full rounded-xl border border-black/10 bg-white px-3.5 py-2 text-xs text-ink outline-none focus:border-forest focus:ring-1 focus:ring-forest"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue={admin.email}
                  disabled
                  className="w-full rounded-xl border border-black/10 bg-sand/40 px-3.5 py-2 text-xs text-body outline-none cursor-not-allowed"
                />
                <p className="mt-1 text-[11px] text-body">
                  Email authentication is bound to your primary administrative credential.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  className={buttonClass.primary}
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </Card>

          <Card className="p-5 lg:col-span-5">
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-forest-tint text-forest">
                {isSuperAdmin ? (
                  <ShieldCheck className="size-5" />
                ) : (
                  <UserCheck className="size-5" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-sm font-bold text-ink">
                  {isSuperAdmin ? "Super Admin Privileges" : "Editor Privileges"}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-body">
                  {isSuperAdmin
                    ? "Full administrative access: create & publish mock tests, manage question bank, edit exam application guides, review candidate attempts, and customize portal themes."
                    : "Publishing access: author questions, review syllabus, and monitor student test results."}
                </p>

                <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-body">
                  {[
                    "Mock Test Creation",
                    "Question Bank",
                    "Job Vacancies",
                    "Aspirant Directory",
                    "Appearance & Theme",
                  ].map((privilege) => (
                    <span
                      key={privilege}
                      className="inline-flex items-center gap-1 rounded-md bg-sand px-2 py-0.5 font-medium text-ink"
                    >
                      <CheckCircle2 className="size-3 text-forest" /> {privilege}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 2: Avatar & Persona */}
      {show("avatar") && (
        <UserCustomizer
          adminName={admin.name}
          adminEmail={admin.email}
          adminRole={admin.role}
          section="avatar"
        />
      )}

      {/* TAB 3: Panel Theme & Live Palette */}
      {show("theme") && (
        <div className="space-y-6">
          <UserCustomizer
            adminName={admin.name}
            adminEmail={admin.email}
            adminRole={admin.role}
            section="theme"
          />

          <Card className="overflow-hidden">
            <CardHeader
              title="MockPrep Brand & Color System"
              description="Live visual identity tokens applied across the platform."
            />
            <div className="grid gap-5 p-5 md:grid-cols-2">
              <div className="space-y-4">
                <div className="rounded-2xl border border-black/8 bg-sand/50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="grid size-12 place-items-center rounded-xl bg-forest text-white font-display font-extrabold text-lg shadow-xs">
                      MP
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-bold text-ink">MockPrep Portal</h4>
                      <p className="text-xs text-body">Free competitive mock tests, guides & roadmaps</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Link href="/admin/tests" className={`${buttonClass.primary} w-full text-xs`}>
                    <BookOpenCheck className="size-4" />
                    Manage Mock Test Series
                  </Link>
                  <Link href="/admin/questions" className={`${buttonClass.secondary} w-full text-xs`}>
                    <HelpCircle className="size-4" />
                    Review Question Bank
                  </Link>
                </div>
              </div>

              <div>
                <p className="mb-2.5 text-xs font-bold tracking-wider text-body uppercase">
                  Website Color Palette
                </p>
                <div className="space-y-2">
                  {THEME_PALETTE.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between rounded-xl border border-black/6 bg-white p-2.5 shadow-2xs"
                    >
                      <div className="flex min-w-0 items-center gap-2.5">
                        <span
                          className={`size-6 shrink-0 rounded-lg border border-black/10 shadow-2xs ${item.bgClass}`}
                        />
                        <div className="min-w-0">
                          <p className="truncate text-xs font-bold text-ink">{item.name}</p>
                          <p className="truncate text-[10.5px] text-body">{item.role}</p>
                        </div>
                      </div>
                      <code className="rounded bg-sand px-1.5 py-0.5 font-mono text-[10.5px] text-body">
                        {item.hex}
                      </code>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 4: Private Scratchpad */}
      {show("notes") && (
        <UserCustomizer
          adminName={admin.name}
          adminEmail={admin.email}
          adminRole={admin.role}
          section="scratchpad"
        />
      )}

      {/* TAB 5: MockPrep Platform Engine */}
      {show("platform") && (
        <UserCustomizer
          adminName={admin.name}
          adminEmail={admin.email}
          adminRole={admin.role}
          section="platform"
        />
      )}

      {/* TAB 6: Team & Admin Access */}
      {show("team") && (
        <Card className="overflow-hidden">
          <CardHeader
            title="Team & Access Control"
            description="Manage administrators and test series editors for MockPrep."
          >
            <button type="button" className={`${buttonClass.primary} text-xs`}>
              Invite Administrator
            </button>
          </CardHeader>

          <div className="divide-y divide-black/5">
            {teamUsers
              .filter((u) => u.role !== "STUDENT")
              .map((u) => (
                <div
                  key={u.id}
                  className="flex items-center justify-between p-4 sm:px-6 hover:bg-sand/30 transition"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <AdminAvatar name={u.name} size="md" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-bold text-ink truncate">{u.name}</p>
                        <Badge tone={u.role === "SUPER_ADMIN" ? "yellow" : "green"}>
                          {u.role === "SUPER_ADMIN" ? "Super Admin" : "Content Editor"}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-body truncate">{u.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-forest-tint px-2.5 py-0.5 text-[11px] font-semibold text-forest">
                      Active
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      )}
    </Fragment>
  );
}
