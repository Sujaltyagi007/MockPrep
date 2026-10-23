"use client";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { buttonClass, Notice } from "@/components/admin/ui";
import { questionIssues, sectionsOf, type DraftData } from "@/lib/import/draft";
import { CheckCircle2, Circle, ExternalLink, LoaderCircle, PartyPopper, Rocket } from "lucide-react";

type Check = { label: string; ok: boolean; fix?: { step: number; label: string } };

export function PublishPanel({
  data,
  isUpdate,
  onGoTo,
  onPublish,
}: {
  data: DraftData;
  isUpdate: boolean;
  onGoTo: (step: number, filter?: "fix" | "todo") => void;
  onPublish: () => Promise<{ ok: true; slug: string } | { ok: false; problems: string[] }>;
}) {
  const [state, setState] = useState<{ phase: "idle" | "publishing" } | { phase: "done"; slug: string } | { phase: "error"; problems: string[] }>({ phase: "idle" });

  const n = data.questions.length;
  const broken = data.questions.filter((q) => questionIssues(q).length > 0).length;
  const unapproved = data.questions.filter((q) => !q.approved).length;
  const checks: Check[] = [
    { label: "The test has a title", ok: Boolean(data.title.trim()), fix: { step: 2, label: "Add title" } },
    { label: n ? `All ${n} questions are complete` : "The test has questions", ok: n > 0 && broken === 0, fix: { step: 1, label: `Fix ${broken || ""}`.trim() } },
    { label: "You approved every question", ok: n > 0 && unapproved === 0, fix: { step: 1, label: `Review ${unapproved}` } },
    {
      label: "Time limit and marks are set",
      ok: data.durationMinutes >= 1 && data.durationMinutes <= 600 && data.marksCorrect > 0 && data.marksWrong <= 0,
      fix: { step: 2, label: "Set" },
    },
  ];
  const ready = checks.every((c) => c.ok);
  const sections = sectionsOf(data);

  if (state.phase === "done") {
    return (
      <div className="rounded-2xl border border-forest/20 bg-white p-8 text-center shadow-2xs">
        <PartyPopper className="mx-auto size-10 text-forest" aria-hidden />
        <h2 className="mt-3 font-display text-xl font-bold text-ink">“{data.title}” is live</h2>
        <p className="mt-1 text-sm text-body">Students can take it now{data.featured ? ", and it's shown on the home page" : ""}.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Link href={`/test/${state.slug}`} target="_blank" className={buttonClass.primary}>
            Open the test <ExternalLink className="size-4" aria-hidden />
          </Link>
          <Link href="/admin/tests" className={buttonClass.secondary}>
            Back to all tests
          </Link>
          <Link href="/admin/tests/new" className={buttonClass.secondary}>
            Create another
          </Link>
        </div>
      </div>
    );
  }

  async function publish() {
    setState({ phase: "publishing" });
    const result = await onPublish().catch(() => ({ ok: false as const, problems: ["Couldn't reach the server. Check your connection and try again."] }));
    setState(result.ok ? { phase: "done", slug: result.slug } : { phase: "error", problems: result.problems });
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
      <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-2xs sm:p-7">
        <h2 className="font-display text-lg font-semibold text-ink">Before it goes live</h2>
        <ul className="mt-4 space-y-2">
          {checks.map((c) => (
            <li key={c.label} className={cn("flex min-h-12 items-center gap-3 rounded-xl px-3", c.ok ? "bg-forest-tint/50" : "bg-honey-soft")}>
              {c.ok ? <CheckCircle2 className="size-5 shrink-0 text-forest" aria-hidden /> : <Circle className="size-5 shrink-0 text-olive" aria-hidden />}
              <span className={cn("flex-1 text-sm font-medium", c.ok ? "text-ink" : "text-olive")}>
                {c.label}
                <span className="sr-only">{c.ok ? " — done" : " — not done"}</span>
              </span>
              {!c.ok && c.fix && (
                <button type="button" onClick={() => onGoTo(c.fix!.step, c.fix!.step === 1 ? (broken ? "fix" : "todo") : undefined)} className="rounded-lg px-3 py-1.5 text-xs font-semibold text-olive underline-offset-2 hover:bg-white hover:underline">
                  {c.fix.label} →
                </button>
              )}
            </li>
          ))}
        </ul>

        {state.phase === "error" && (
          <Notice tone="error" className="mt-4">
            <ul className="list-disc pl-4">
              {state.problems.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </Notice>
        )}

        <button type="button" disabled={!ready || state.phase === "publishing"} onClick={publish} className={cn(buttonClass.primary, "mt-6 h-12 w-full text-base")}>
          {state.phase === "publishing" ? (
            <LoaderCircle className="size-5 animate-spin" aria-hidden />
          ) : (
            <Rocket className="size-5" aria-hidden />
          )}
          {state.phase === "publishing" ? "Publishing…" : isUpdate ? "Update the live test" : "Publish test"}
        </button>
        {!ready && <p className="mt-2 text-center text-xs text-body">Finish the steps above to publish.</p>}
      </div>

      <aside className="h-fit rounded-2xl border border-black/5 bg-white p-5 shadow-2xs">
        <p className="text-xs font-bold uppercase tracking-wider text-body">Summary</p>
        <p className="mt-2 font-display text-base font-bold text-ink">{data.title || "Untitled test"}</p>
        <dl className="mt-4 space-y-2 text-sm">
          {[
            ["Questions", String(n)],
            ["Sections", sections.join(", ") || "—"],
            ["Time", `${data.durationMinutes} min`],
            ["Max marks", String(Math.round(n * data.marksCorrect * 100) / 100)],
            ["Wrong answer", data.marksWrong ? String(data.marksWrong) : "No penalty"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-3">
              <dt className="text-body">{k}</dt>
              <dd className="text-right font-semibold text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </aside>
    </div>
  );
}
