"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { categoryLabels } from "@/lib/i18n";
import type { ExamCategory } from "@/lib/types";
import { editTest } from "@/app/admin/tests/actions";
import type { AdminMockTest } from "@/lib/admin/types";
import type { DraftSummary } from "@/lib/admin/test-drafts";
import { Award, Clock, FilePen, Plus, Search, SquarePen } from "lucide-react";
import { Badge, PageHeader, buttonClass, formatDateTime } from "@/components/admin/ui";

const isUuid = (id: string) => /^[0-9a-f-]{36}$/i.test(id);

export function TestsBoard({ tests, drafts }: { tests: AdminMockTest[]; drafts: DraftSummary[] }) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredTests = useMemo(() => {
    const q = search.toLowerCase();
    return tests.filter(
      (t) =>
        (t.title.toLowerCase().includes(q) || t.summary.toLowerCase().includes(q)) &&
        (categoryFilter === "ALL" || t.category === categoryFilter) &&
        (statusFilter === "ALL" || t.status === statusFilter),
    );
  }, [tests, search, categoryFilter, statusFilter]);

  return (
    <div>
      <PageHeader title="Mock Test Series" description="Create tests from a PDF, check every question, then publish.">
        <Link href="/admin/tests/new" className={buttonClass.primary}>
          <Plus className="size-4" aria-hidden />
          <span>Create test</span>
        </Link>
      </PageHeader>

      {drafts.length > 0 && (
        <section aria-labelledby="drafts-title" className="mb-6 rounded-2xl border border-honey bg-honey-soft/60 p-4 sm:p-5">
          <h2 id="drafts-title" className="flex items-center gap-2 font-display text-base font-semibold text-ink">
            <FilePen className="size-4 text-olive" aria-hidden /> In progress
          </h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {drafts.map((d) => (
              <li key={d.id}>
                <Link href={`/admin/tests/drafts/${d.id}`} className="flex items-center justify-between gap-3 rounded-xl bg-white p-3.5 shadow-2xs transition hover:shadow-xs">
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-ink">{d.title || "Untitled test"}</span>
                    <span className="block text-xs text-body">
                      {d.questionCount} questions · saved {formatDateTime(d.updatedAt)}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2">
                    {d.liveSlug && <Badge tone="green">Editing live test</Badge>}
                    <span className="text-xs font-semibold text-forest">Continue →</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ["Total tests", tests.length, "text-ink"],
          ["Published", tests.filter((t) => t.status === "PUBLISHED").length, "text-forest"],
          ["Drafts", drafts.length, "text-olive"],
          ["On home page", tests.filter((t) => t.featured).length, "text-ink"],
        ].map(([label, value, tone]) => (
          <div key={label} className="rounded-2xl border border-black/6 bg-white p-4 shadow-2xs">
            <p className="text-xs font-bold uppercase tracking-wider text-body">{label}</p>
            <p className={`mt-1 font-display text-2xl font-bold ${tone}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="mb-6 flex flex-col items-center gap-3 sm:flex-row">
        <div className="relative w-full flex-1">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink/40" aria-hidden />
          <input
            type="search"
            aria-label="Search tests"
            placeholder="Search tests by title or description…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-black/10 bg-white py-2 pl-9 pr-4 text-xs text-ink outline-none transition focus:border-forest focus:ring-1 focus:ring-forest"
          />
        </div>
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <select aria-label="Category" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="min-w-0 flex-1 rounded-xl border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-ink outline-none focus:border-forest sm:flex-none">
            <option value="ALL">All categories</option>
            {(Object.keys(categoryLabels) as ExamCategory[]).map((c) => (
              <option key={c} value={c}>
                {categoryLabels[c]}
              </option>
            ))}
          </select>
          <select aria-label="Status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="min-w-0 flex-1 rounded-xl border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-ink outline-none focus:border-forest sm:flex-none">
            <option value="ALL">All status</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {filteredTests.map((test) => (
          <div key={test.id} className="flex flex-col justify-between rounded-2xl border border-black/6 bg-white p-5 shadow-xs transition hover:border-forest/40">
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="rounded-full bg-forest-tint px-2.5 py-0.5 text-xs font-bold text-forest">
                  {categoryLabels[test.category as ExamCategory] ?? test.category}
                </span>
                <Badge tone={test.status === "PUBLISHED" ? "green" : "yellow"}>{test.status}</Badge>
              </div>
              <h3 className="mt-3 font-display text-base font-bold leading-snug text-ink">{test.title}</h3>
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-body">{test.summary}</p>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-3 text-xs text-body">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5 text-forest" aria-hidden />
                  {test.durationMinutes} mins
                </span>
                <span aria-hidden>&bull;</span>
                <span className="flex items-center gap-1">
                  <Award className="size-3.5 text-forest" aria-hidden />
                  {test.questionCount} questions
                </span>
              </div>
              <div className="flex items-center gap-3">
                {isUuid(test.id) && (
                  <form action={editTest.bind(null, test.id)}>
                    <button type="submit" className="inline-flex items-center gap-1 font-semibold text-ink hover:text-forest">
                      <SquarePen className="size-3.5" aria-hidden /> Edit
                    </button>
                  </form>
                )}
                <Link href={`/test/${test.slug}`} target="_blank" className="font-semibold text-forest hover:underline">
                  Open &rarr;
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
