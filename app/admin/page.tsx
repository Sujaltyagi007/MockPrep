import Link from "next/link";
import { Fragment } from "react";
import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenCheck,
  Briefcase,
  GraduationCap,
  HelpCircle,
  Plus,
  Sparkles,
  UsersRound,
  Palette,
  CheckCircle2,
  Clock,
  Award,
} from "lucide-react";
import {
  Badge,
  Card,
  CardHeader,
  EmptyState,
  PageHeader,
  buttonClass,
  formatDateTime,
} from "@/components/admin/ui";
import { SpotlightLink } from "@/components/admin/spotlight-link";
import {
  getAdminStats,
  getRecentAttempts,
  DEFAULT_ADMIN,
} from "@/lib/admin/admin-service";

export const metadata: Metadata = {
  title: "Admin Dashboard - MockPrep",
};

export const instant = false;

export default async function DashboardPage() {
  const stats = await getAdminStats();
  const recentAttempts = await getRecentAttempts();

  const tiles = [
    {
      label: "Mock Test Series",
      value: stats.totalTests,
      href: "/admin/tests",
      Icon: BookOpenCheck,
      accent: true,
      hint: "Active timed tests",
    },
    {
      label: "Question Bank",
      value: stats.totalQuestions,
      href: "/admin/questions",
      Icon: HelpCircle,
      accent: false,
      hint: "Bilingual questions",
    },
    {
      label: "Job Vacancies",
      value: stats.totalJobs,
      href: "/admin/jobs",
      Icon: Briefcase,
      accent: false,
      hint: "Govt exam guides",
    },
    {
      label: "Active Aspirants",
      value: stats.totalStudents,
      href: "/admin/users",
      Icon: UsersRound,
      accent: false,
      hint: "Registered learners",
    },
  ];

  const examCategories = [
    {
      name: "Civil Services (UPSC CSE)",
      slug: "CIVIL",
      testsCount: 6,
      icon: GraduationCap,
      description: "IAS/IPS GS Paper 1 & CSAT Paper 2 full mock papers.",
    },
    {
      name: "Banking & SSC CGL",
      slug: "BANKING_SSC",
      testsCount: 8,
      icon: Award,
      description: "Tier 1 & Tier 2 speed tests, Quant, Reasoning, English.",
    },
    {
      name: "Railways Recruitment (RRB)",
      slug: "RAILWAYS",
      testsCount: 4,
      icon: Clock,
      description: "NTPC & ALP computer-based tests with timer mechanics.",
    },
  ];

  return (
    <Fragment>
      <PageHeader
        title={`Welcome back, ${DEFAULT_ADMIN.name.split(" ")[0]}`}
        description="Monitor candidates, review mock test series, and manage exam guides."
      >
        <Link href="/admin/tests" className={buttonClass.primary}>
          <Plus className="size-4" />
          <span>New Mock Test</span>
        </Link>
      </PageHeader>

      {/* 4 Stat Tiles with Spotlight Mouse Gradient */}
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {tiles.map((tile) => (
          <li key={tile.label}>
            <SpotlightLink
              href={tile.href}
              className="group relative block rounded-2xl border border-black/5 bg-white p-4 shadow-[0_1px_3px_rgba(28,27,27,0.04)] hover:border-forest/30 sm:p-5"
            >
              <ArrowUpRight className="absolute right-4 top-4 size-4 text-body/50 transition duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-forest sm:right-5 sm:top-5" />
              <span
                className={`flex size-10 items-center justify-center rounded-xl ${
                  tile.accent ? "bg-forest text-white" : "bg-forest-tint text-forest"
                } transition-transform duration-200 group-hover:scale-105 group-hover:-rotate-3`}
              >
                <tile.Icon className="size-5" />
              </span>
              <p className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink tabular-nums">
                {tile.value}
              </p>
              <p className="text-xs font-semibold text-ink/80">{tile.label}</p>
              <p className="text-[11px] text-body">{tile.hint}</p>
            </SpotlightLink>
          </li>
        ))}
      </ul>

      {/* Quick Actions Shortcuts Banner */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-black/6 bg-white p-4 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-forest-tint text-forest">
            <Sparkles className="size-4.5" />
          </span>
          <div>
            <h3 className="font-display text-sm font-bold text-ink">Admin Shortcuts</h3>
            <p className="text-xs text-body">Direct access to frequent actions and profile styling.</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link href="/admin/questions" className={`${buttonClass.secondary} text-xs`}>
            <HelpCircle className="size-3.5" />
            Add Question
          </Link>
          <Link href="/admin/jobs" className={`${buttonClass.secondary} text-xs`}>
            <Briefcase className="size-3.5" />
            Post Vacancy
          </Link>
          <Link href="/admin/account?tab=theme" className={`${buttonClass.secondary} text-xs`}>
            <Palette className="size-3.5 text-forest" />
            Customize Theme
          </Link>
        </div>
      </div>

      {/* Recent Student Mock Test Submissions */}
      <Card className="mt-6">
        <CardHeader
          title="Recent Mock Test Submissions"
          description="Real-time test attempts submitted by exam aspirants."
        >
          <Link
            href="/admin/users"
            className="group inline-flex items-center gap-1 text-sm font-semibold text-forest hover:underline"
          >
            <span>View all aspirants</span>
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </CardHeader>

        {recentAttempts.length === 0 ? (
          <EmptyState>No mock test attempts recorded yet.</EmptyState>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-black/5 bg-sand/30 text-body font-semibold">
                  <th className="py-3 px-4 sm:px-6">Candidate</th>
                  <th className="py-3 px-3">Test Series</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Score</th>
                  <th className="py-3 px-3">Accuracy</th>
                  <th className="py-3 px-4 sm:px-6 text-right">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {recentAttempts.map((attempt) => {
                  const percent = Math.round((attempt.score / attempt.maxMarks) * 100);
                  const isPass = percent >= 50;
                  return (
                    <tr
                      key={attempt.id}
                      className="transition-colors hover:bg-sand/40"
                    >
                      <td className="py-3.5 px-4 sm:px-6 font-semibold text-ink whitespace-nowrap">
                        {attempt.studentName}
                      </td>
                      <td className="py-3.5 px-3 max-w-xs truncate text-ink">
                        {attempt.testTitle}
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <Badge tone={attempt.category === "CIVIL" ? "yellow" : "grey"}>
                          {attempt.category.replace("_", " ")}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-3 font-mono font-bold text-ink whitespace-nowrap">
                        {attempt.score.toFixed(1)} / {attempt.maxMarks}
                        <span
                          className={`ml-1.5 text-[11px] ${
                            isPass ? "text-forest" : "text-brick"
                          }`}
                        >
                          ({percent}%)
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-body whitespace-nowrap">
                        <span className="text-forest font-semibold">{attempt.correct} correct</span> &bull;{" "}
                        <span className="text-brick">{attempt.wrong} wrong</span>
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-right text-body whitespace-nowrap">
                        {formatDateTime(attempt.submittedAt)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Categorized Test Series Sections */}
      <section className="mt-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">Exam Preparation Categories</h2>
            <p className="text-xs text-body">Manage questions, syllabi, and test series by national exam categories.</p>
          </div>
          <Link href="/admin/tests" className="text-xs font-semibold text-forest hover:underline">
            Browse all categories &rarr;
          </Link>
        </div>

        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {examCategories.map((cat) => (
            <li key={cat.slug}>
              <SpotlightLink
                href={`/admin/tests?category=${cat.slug}`}
                className="group flex h-full items-start gap-3 rounded-2xl border border-black/5 bg-white p-4.5 hover:border-forest/30"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sand text-forest transition-transform duration-200 group-hover:scale-105 group-hover:-rotate-3">
                  <cat.icon className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="flex items-center justify-between gap-1">
                    <span className="block font-semibold text-ink text-sm">{cat.name}</span>
                    <span className="rounded-full bg-forest-tint px-2 py-0.5 text-[10px] font-bold text-forest">
                      {cat.testsCount} tests
                    </span>
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-body">{cat.description}</span>
                </span>
              </SpotlightLink>
            </li>
          ))}
        </ul>
      </section>
    </Fragment>
  );
}
