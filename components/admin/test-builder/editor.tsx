"use client";
import { cn } from "@/lib/utils";
import { Stepper } from "./stepper";
import { DetailsForm } from "./details-form";
import { draftReducer } from "./draft-reducer";
import { QuestionCard } from "./question-card";
import { PublishPanel } from "./publish-panel";
import { Fragment } from "react/jsx-runtime";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import type { ExamOption } from "@/lib/admin/test-drafts";
import { Notice, PageHeader, buttonClass } from "@/components/admin/ui";
import { deleteDraft, publishDraft, saveDraft } from "@/app/admin/tests/actions";
import { questionIssues, sectionsOf, type DraftData } from "@/lib/import/draft";
import { useCallback, useEffect, useId, useMemo, useReducer, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCheck, CircleAlert, CloudCheck, LoaderCircle, Plus, Trash2, X } from "lucide-react";

type Filter = "all" | "fix" | "todo";
type SaveState = "saved" | "saving" | "error";

/**
 * Steps 2–4 of the test builder for one draft. Every change autosaves (debounced,
 * saves run one at a time in order), so reviewers can leave and come back.
 */
export function TestEditor({ draftId, initial, liveSlug, exams }: { draftId: string; initial: DraftData; liveSlug: string | null; exams: ExamOption[] }) {
  const [data, dispatch] = useReducer(draftReducer, initial);
  const [step, setStep] = useState(1);
  const [save, setSave] = useState<SaveState>("saved");
  const [deleting, setDeleting] = useState(false);
  const [published, setPublished] = useState(false);
  const [warningsHidden, setWarningsHidden] = useState(false);
  const [filter, setFilter] = useState<{ kind: Filter; keys: Set<string> }>({ kind: "all", keys: new Set() });
  const sectionListId = useId();

  // ── Autosave ──
  const queue = useRef(Promise.resolve());
  const dirty = useRef(false);
  const latest = useRef(data);
  const mounted = useRef(false);

  const persist = useCallback(
    (snapshot: DraftData) => {
      queue.current = queue.current.then(async () => {
        setSave("saving");
        try {
          await saveDraft(draftId, snapshot);
          if (latest.current === snapshot) dirty.current = false;
          setSave("saved");
        } catch {
          setSave("error");
        }
      });
      return queue.current;
    },
    [draftId],
  );

  useEffect(() => {
    latest.current = data;
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (published) return;
    dirty.current = true;
    const timer = setTimeout(() => persist(data), 800);
    return () => clearTimeout(timer);
  }, [data, persist, published]);

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirty.current) e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, []);

  // ── Derived ──
  const issueCount = useMemo(() => data.questions.filter((q) => questionIssues(q).length > 0).length, [data.questions]);
  const readyKeys = useMemo(() => data.questions.filter((q) => !q.approved && questionIssues(q).length === 0).map((q) => q.key), [data.questions]);
  const todoCount = data.questions.filter((q) => !q.approved).length;
  const sections = sectionsOf(data);

  /** Filters keep the questions they showed when chosen, so a card doesn't vanish mid-edit. */
  const chooseFilter = (kind: Filter) => {
    const keys = new Set(
      data.questions.filter((q) => (kind === "fix" ? questionIssues(q).length > 0 : kind === "todo" ? !q.approved : true)).map((q) => q.key),
    );
    setFilter({ kind, keys });
  };
  const visible = data.questions.map((q, i) => ({ q, n: i + 1 })).filter(({ q }) => filter.kind === "all" || filter.keys.has(q.key));

  const goTo = (target: number, f?: "fix" | "todo") => {
    setStep(target);
    if (f) chooseFilter(f);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  async function publish() {
    await persist(latest.current); // make sure the server has the latest edits
    const result = await publishDraft(draftId);
    if (result.ok) {
      dirty.current = false;
      setPublished(true);
    }
    return result;
  }

  const saveLabel = { saved: "All changes saved", saving: "Saving…", error: "Couldn't save — will retry on next change" }[save];

  return (
    <div>
      <PageHeader title={data.title.trim() || "Untitled test"} description={liveSlug ? `Editing the live test /test/${liveSlug}` : `Draft · ${data.sources.join(", ") || "written by hand"}`}>
        {!published && (
          <Fragment>
            <span role="status" className={cn("hidden items-center gap-1.5 text-xs font-medium sm:flex", save === "error" ? "text-brick" : "text-body")}>
              {save === "saving" ? <LoaderCircle className="size-3.5 animate-spin" aria-hidden /> : save === "error" ? <CircleAlert className="size-3.5" aria-hidden /> : <CloudCheck className="size-3.5" aria-hidden />}
              {saveLabel}
            </span>
            <button type="button" onClick={() => setDeleting(true)} className={buttonClass.iconDanger} aria-label="Delete draft" title="Delete draft">
              <Trash2 className="size-4" aria-hidden />
            </button>
          </Fragment>
        )}
      </PageHeader>

      <Stepper current={step} onSelect={published ? undefined : goTo} badges={{ 1: issueCount ? `${issueCount} to fix` : todoCount ? `${todoCount} to approve` : undefined }} />

      {step === 1 && (
        <section aria-label="Check questions">
          {data.warnings.length > 0 && !warningsHidden && (
            <Notice tone="info" className="mb-4">
              <div className="flex items-start gap-3">
                <ul className="flex-1 list-disc space-y-1 pl-4">
                  {data.warnings.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
                <button type="button" onClick={() => setWarningsHidden(true)} aria-label="Hide these notes" className="grid size-7 place-items-center rounded-lg hover:bg-white/60">
                  <X className="size-4" aria-hidden />
                </button>
              </div>
            </Notice>
          )}

          <div className="sticky top-16 z-20 -mx-1 mb-4 flex flex-wrap items-center gap-2 rounded-2xl border border-black/5 bg-white/95 p-2 shadow-2xs backdrop-blur">
            <div role="group" aria-label="Show questions" className="flex flex-wrap gap-1">
              {(
                [
                  ["all", `All ${data.questions.length}`],
                  ["fix", `Needs fixing ${issueCount}`],
                  ["todo", `Not approved ${todoCount}`],
                ] as const
              ).map(([kind, label]) => (
                <button
                  key={kind}
                  type="button"
                  aria-pressed={filter.kind === kind}
                  onClick={() => chooseFilter(kind)}
                  className={cn("h-9 rounded-xl px-3 text-xs font-semibold transition", filter.kind === kind ? "bg-ink text-white" : "text-body hover:bg-sand hover:text-ink")}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="ml-auto flex gap-2">
              <button type="button" disabled={readyKeys.length === 0} onClick={() => dispatch({ type: "approveReady" })} className={cn(buttonClass.secondary, "h-9 text-xs")}>
                <CheckCheck className="size-4" aria-hidden /> Approve all ready ({readyKeys.length})
              </button>
              <button type="button" onClick={() => dispatch({ type: "add" })} className={cn(buttonClass.secondary, "h-9 text-xs")}>
                <Plus className="size-4" aria-hidden /> Add question
              </button>
            </div>
          </div>

          <datalist id={sectionListId}>
            {sections.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>

          <div className="space-y-3">
            {visible.map(({ q, n }) => (
              <QuestionCard key={q.key} question={q} number={n} sectionListId={sectionListId} dispatch={dispatch} />
            ))}
            {visible.length === 0 && (
              <p className="rounded-2xl border border-dashed border-black/15 bg-white p-8 text-center text-sm text-body">
                {filter.kind === "all" ? "No questions yet." : "Nothing here — nice work."}{" "}
                <button type="button" onClick={() => chooseFilter("all")} className="font-semibold text-forest hover:underline">
                  Show all questions
                </button>
              </p>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <button type="button" onClick={() => goTo(2)} className={cn(buttonClass.primary, "h-11 px-6")}>
              Next: test details <ArrowRight className="size-4" aria-hidden />
            </button>
          </div>
        </section>
      )}

      {step === 2 && (
        <section aria-label="Test details" className="mx-auto max-w-3xl">
          <DetailsForm data={data} dispatch={dispatch} exams={exams} />
          <div className="mt-6 flex justify-between">
            <button type="button" onClick={() => goTo(1)} className={buttonClass.secondary}>
              <ArrowLeft className="size-4" aria-hidden /> Questions
            </button>
            <button type="button" onClick={() => goTo(3)} className={cn(buttonClass.primary, "h-11 px-6")}>
              Next: publish <ArrowRight className="size-4" aria-hidden />
            </button>
          </div>
        </section>
      )}

      {step === 3 && <PublishPanel data={data} isUpdate={Boolean(liveSlug)} onGoTo={goTo} onPublish={publish} />}

      <ConfirmDialog
        isOpen={deleting}
        onClose={() => setDeleting(false)}
        onConfirm={async () => {
          dirty.current = false;
          await deleteDraft(draftId);
        }}
        title="Delete this draft?"
        description={liveSlug ? "Your unpublished changes will be lost. The live test stays as it is." : "The imported questions and everything you've checked will be deleted."}
        confirmLabel="Delete draft"
      />
    </div>
  );
}
