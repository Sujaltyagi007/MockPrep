"use client";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import { FileDrop } from "./file-drop";
import { Stepper } from "./stepper";
import { useRouter } from "next/navigation";
import { createDraft } from "@/app/admin/tests/actions";
import { parseQuestions } from "@/lib/import/parse-questions";
import { emptyQuestion, newDraft } from "@/lib/import/draft";
import { Notice, PageHeader, buttonClass, inputClass } from "@/components/admin/ui";
import { ClipboardPaste, FileStack, FileText, LoaderCircle, PencilLine, type LucideIcon } from "lucide-react";

type Mode = "combined" | "separate" | "paste";

const modes: { id: Mode; icon: LucideIcon; title: string; text: string }[] = [
  { id: "combined", icon: FileText, title: "One PDF", text: "Questions with their answers, or an answer key at the end" },
  { id: "separate", icon: FileStack, title: "Questions + answer key", text: "Two separate PDF files" },
  { id: "paste", icon: ClipboardPaste, title: "Paste text", text: "Copy from Word, a website or an email" },
];

/** PDF → text on the server; .txt files are read in the browser. */
async function readFile(file: File): Promise<string> {
  if (file.type === "text/plain" || file.name.toLowerCase().endsWith(".txt")) return file.text();
  const body = new FormData();
  body.set("file", file);
  const res = await fetch("/api/admin/pdf-text", { method: "POST", body });
  const json = (await res.json().catch(() => ({}))) as { text?: string; error?: string };
  if (!res.ok || !json.text) throw new Error(json.error ?? `Couldn't read ${file.name}.`);
  return json.text;
}

export function TestImporter() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("combined");
  const [questionsFile, setQuestionsFile] = useState<File | null>(null);
  const [keyFile, setKeyFile] = useState<File | null>(null);
  const [pasted, setPasted] = useState("");
  const [pastedKey, setPastedKey] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<{ message: string; tips?: string[] } | null>(null);

  const ready =
    mode === "paste" ? pasted.trim().length > 0 : mode === "separate" ? Boolean(questionsFile && keyFile) : Boolean(questionsFile);

  async function read() {
    setError(null);
    try {
      setBusy("Reading your file…");
      const questionsText = mode === "paste" ? pasted : await readFile(questionsFile!);
      const keyText = mode === "separate" ? await readFile(keyFile!) : mode === "paste" ? pastedKey : undefined;

      setBusy("Finding questions…");
      const { questions, warnings } = parseQuestions(questionsText, keyText);
      if (questions.length === 0) {
        setBusy(null);
        setError({ message: warnings[0] ?? "No questions found.", tips: TIPS });
        return;
      }

      setBusy(`Found ${questions.length} questions. Opening them for checking…`);
      const sources = mode === "paste" ? ["Pasted text"] : [questionsFile, keyFile].flatMap((f) => (f ? [f.name] : []));
      const { id } = await createDraft(newDraft(questions, sources, warnings));
      router.push(`/admin/tests/drafts/${id}`);
    } catch (e) {
      setBusy(null);
      setError({ message: e instanceof Error ? e.message : "Something went wrong. Please try again." });
    }
  }

  async function startBlank() {
    setBusy("Creating a blank test…");
    const { id } = await createDraft(newDraft([emptyQuestion()]));
    router.push(`/admin/tests/drafts/${id}`);
  }

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Create a test" description="Upload a question paper — we'll pull out the questions for you to check." />
      <Stepper current={0} />

      <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-2xs sm:p-7">
        <h2 className="font-display text-lg font-semibold text-ink">What do you have?</h2>
        <div role="radiogroup" aria-label="What do you have?" className="mt-4 grid gap-3 sm:grid-cols-3">
          {modes.map(({ id, icon: Icon, title, text }) => (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={mode === id}
              onClick={() => setMode(id)}
              className={cn(
                "flex flex-col gap-2 rounded-2xl border-2 p-4 text-left transition",
                mode === id ? "border-forest bg-forest-tint/50" : "border-black/8 hover:border-forest/40",
              )}
            >
              <Icon className={cn("size-5", mode === id ? "text-forest" : "text-body")} aria-hidden />
              <span className="text-sm font-semibold text-ink">{title}</span>
              <span className="text-xs leading-5 text-body">{text}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          {mode === "paste" ? (
            <Fragment>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-ink">Questions</span>
                <textarea
                  rows={10}
                  value={pasted}
                  onChange={(e) => setPasted(e.target.value)}
                  placeholder={"1. Which Article guarantees the Right to Constitutional Remedies?\n(a) Article 19\n(b) Article 21\n(c) Article 32\n(d) Article 226\nAnswer: (c)"}
                  className={cn(inputClass, "font-mono text-[13px]")}
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-ink">
                  Answer key <span className="font-normal text-body">(optional, if answers aren&apos;t written above)</span>
                </span>
                <textarea rows={3} value={pastedKey} onChange={(e) => setPastedKey(e.target.value)} placeholder="1-c 2-a 3-b …" className={cn(inputClass, "font-mono text-[13px]")} />
              </label>
            </Fragment>
          ) : (
            <Fragment>
              <FileDrop label={mode === "separate" ? "Questions PDF" : "Question paper PDF"} hint="Drag it here, or choose a file · up to 15 MB" file={questionsFile} onChange={setQuestionsFile} />
              {mode === "separate" && <FileDrop label="Answer key PDF" hint="Any layout: 1-b, 1. (b), Q1: B or a table" file={keyFile} onChange={setKeyFile} />}
            </Fragment>
          )}
        </div>

        {error && (
          <Notice tone="error" className="mt-5">
            <p>{error.message}</p>
            {error.tips && (
              <ul className="mt-2 list-disc space-y-1 pl-4 font-normal">
                {error.tips.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            )}
          </Notice>
        )}

        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-black/5 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <button type="button" onClick={startBlank} disabled={busy !== null} className="inline-flex items-center gap-2 text-sm font-semibold text-body hover:text-ink disabled:opacity-50">
            <PencilLine className="size-4" aria-hidden /> Or write questions yourself
          </button>
          <button type="button" onClick={read} disabled={!ready || busy !== null} className={cn(buttonClass.primary, "h-11 px-6")}>
            {busy ? (
              <Fragment>
                <LoaderCircle className="size-4 animate-spin" aria-hidden /> {busy}
              </Fragment>
            ) : (
              "Find questions"
            )}
          </button>
        </div>
        <p className="sr-only" aria-live="polite">
          {busy ?? ""}
        </p>
      </div>

      <details className="mt-4 rounded-2xl border border-black/5 bg-white px-5 py-4 text-sm text-body">
        <summary className="cursor-pointer font-semibold text-ink">Which formats work?</summary>
        <ul className="mt-3 list-disc space-y-1.5 pl-5">
          {TIPS.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </details>
    </div>
  );
}

const TIPS = [
  "Questions start with a number: “1.”, “1)”, “Q1”, “Question 1” or “प्रश्न 1”.",
  "Options are marked (a)–(d), A.–D., (1)–(4) or (क)–(घ), on separate lines or on one line.",
  "Answers can be under each question (“Answer: (b)”, “Ans. B”, “उत्तर: (ख)”), in an “Answer Key” at the end, or in a separate file.",
  "Scanned PDFs (photos of pages) have no text to read — copy the text instead, or type the questions.",
  "You'll check every question before anything is published, so small mistakes are easy to fix.",
];
