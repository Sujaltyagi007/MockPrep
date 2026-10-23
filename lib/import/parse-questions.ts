// Turns the plain text of a question paper (and optionally a separate answer
// key) into draft questions for a human to check. It is deliberately
// forgiving: anything it can't work out is left for the reviewer, with the
// original text attached to each question.
//
// Understands, in English and Hindi:
//   numbering   1.  1)  Q1  Q.1  Question 1  प्रश्न 1
//   options     (a) a) A. [a]  (1) 1)  (क) — one per line or several on a line
//   answers     "Answer: (b)", "Ans. B", "उत्तर: (ख)" inside the question,
//               an "Answer Key" section at the end, or a separate key file
//               ("1. (b)", "1-b", "Q1: C", or a table "1 b 2 c 3 a")
//   sections    "Section A: Reasoning", "Part II", "भाग 1"

import { DEFAULT_SECTION, newKey, type DraftQuestion } from "./draft";

export type ParseResult = {
  questions: DraftQuestion[];
  /** Problems with the file as a whole, e.g. answers that don't line up. */
  warnings: string[];
};

const OPTION_SETS = [
  ["a", "b", "c", "d", "e"],
  ["A", "B", "C", "D", "E"],
  ["1", "2", "3", "4", "5"],
  ["क", "ख", "ग", "घ", "ङ"],
];

const ANSWER_CHAR = "[a-eA-E1-5कखगघङ]";

/** Marker shapes, most specific first: "(a)" beats "a)" beats "a.". */
const OPTION_FORMATS = [
  (x: string) => `[\\(\\[]${x}[\\)\\]]`,
  (x: string) => `${x}\\)`,
  (x: string) => `${x}[.:]`,
];

const QUESTION_START =
  /^(?:(?:Q(?:uestion)?|प्रश्न)\s*(?:no\.?)?\s*[.:\-–]?\s*(\d{1,3})\s*[.):\]\-–]?\s*|(\d{1,3})\s*[.)\]:]\s*)(.*)$/i;

const SECTION_HEADING = /^(?:section|part|भाग|खंड|खण्ड)\b\s*[-–:]?\s*([A-Z]|[IVX]{1,4}|\d{1,2})?\s*[-–:.)]?\s*(.*)$/i;

const ANSWER_KEY_HEADING =
  /^(?:answer\s*key|answer\s*sheet|answers?|key|solutions?|उत्तर\s*(?:कुंजी|कुन्जी|माला)?|उत्तरमाला)\s*[:\-–]?$/i;

const INLINE_ANSWER = new RegExp(
  `(?:^|\\s)(?:correct\\s+)?(?:ans(?:wer)?|सही\\s*उत्तर|उत्तर)\\s*(?:is)?\\s*[.:\\-–=]*\\s*(?:option\\s*)?[\\(\\[]?(${ANSWER_CHAR})[\\)\\]]?(?=$|[\\s.,;])`,
  "i",
);

/** Only at the start of a line, so "Find the solution." in a question isn't mistaken for one. */
const EXPLANATION = /(?:^|\n)\s*(?:explanation|solution|sol\.|व्याख्या|हल)\s*[:.\-–]\s*/i;

export function answerIndexOf(symbol: string): number | null {
  for (const set of OPTION_SETS) {
    const i = set.indexOf(symbol);
    if (i >= 0) return i;
  }
  const lower = OPTION_SETS[0].indexOf(symbol.toLowerCase());
  return lower >= 0 ? lower : null;
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Devanagari digits to ASCII, tidy whitespace, drop page-number lines. */
export function normalizeText(text: string): string[] {
  const lines = text
    .replace(/\r\n?/g, "\n")
    .replace(/[  -​]/g, " ")
    .replace(/[०-९]/g, (d) => String(d.charCodeAt(0) - 0x0966))
    .split("\n")
    .map((l) => l.replace(/\s+/g, " ").trim())
    .filter((l) => l && !/^(?:page\s*)?\d+\s*(?:(?:of|\/)\s*\d+)?$/i.test(l));

  // PDFs sometimes put "Q" / "प्रश्न" and its number on separate lines.
  const joined: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (/^(?:Q\.?|Question|प्रश्न)$/i.test(lines[i]) && /^\d/.test(lines[i + 1] ?? "")) {
      joined.push(`${lines[i]} ${lines[i + 1]}`);
      i++;
    } else {
      joined.push(lines[i]);
    }
  }
  return joined;
}

// ─── Options ───────────────────────────────────────────────────────────────

type OptionHit = { start: number; end: number };

/** Find option markers in one question's text, picking the marker style that matches the most options. */
function findOptions(text: string): OptionHit[] {
  let best: OptionHit[] = [];
  for (const set of OPTION_SETS) {
    for (const format of OPTION_FORMATS) {
      const hits: OptionHit[] = [];
      let from = 0;
      for (const symbol of set) {
        const re = new RegExp(`(?:^|\\s)(${format(escape(symbol))})\\s*`, "g");
        re.lastIndex = from;
        const m = re.exec(text);
        if (!m) break;
        const start = m.index + m[0].indexOf(m[1]);
        hits.push({ start, end: m.index + m[0].length });
        from = m.index + m[0].length;
      }
      if (hits.length > best.length) best = hits;
      if (best.length >= 4) return best;
    }
  }
  return best.length >= 2 ? best : [];
}

// ─── Answer keys ───────────────────────────────────────────────────────────

type KeyEntry = { index: number | null; explanation: string };

/** Parse a standalone answer key into question number → answer. */
export function parseAnswerKey(text: string): Map<number, KeyEntry> {
  const key = new Map<number, KeyEntry>();
  const single = new RegExp(`^(?:Q\\.?\\s*)?(\\d{1,3})(?:\\s*[.):\\-–]\\s*|\\s+)[\\(\\[]?(${ANSWER_CHAR})[\\)\\]]?(?:[\\s.):\\-–]+(.*))?$`, "i");
  const table = new RegExp(`(?:^|\\s)(?:Q\\.?\\s*)?(\\d{1,3})(?:\\s*[.):\\-–]\\s*|\\s+)[\\(\\[]?(${ANSWER_CHAR})[\\)\\]]?(?=$|[\\s.,;])`, "gi");
  let last: KeyEntry | null = null;

  for (const line of normalizeText(text)) {
    if (ANSWER_KEY_HEADING.test(line)) continue;
    const m = single.exec(line);
    // A line with real text after the answer is "number, answer, explanation".
    if (m && (m[3] ?? "").trim().length > 12) {
      last = { index: answerIndexOf(m[2]), explanation: m[3].replace(EXPLANATION, "").trim() };
      key.set(Number(m[1]), last);
      continue;
    }
    const pairs = [...line.matchAll(table)];
    if (pairs.length > 0) {
      for (const p of pairs) {
        last = { index: answerIndexOf(p[2]), explanation: "" };
        key.set(Number(p[1]), last);
      }
    } else if (last) {
      // Continuation of the previous answer's explanation.
      last.explanation = `${last.explanation} ${line}`.trim();
    }
  }
  return key;
}

// ─── Questions ─────────────────────────────────────────────────────────────

type Candidate = { line: number; number: number; rest: string };

function blockText(lines: string[], first: Candidate, endLine: number, isHeading: (i: number) => boolean): string {
  const parts = [first.rest];
  for (let i = first.line + 1; i < endLine; i++) if (!isHeading(i)) parts.push(lines[i]);
  return parts.join("\n").trim();
}

/**
 * Pick which numbered lines are real question starts: the chain of
 * (nearly) consecutive numbers whose blocks contain options scores highest.
 * This skips numbered instructions and statement lists inside questions.
 */
function chooseQuestionStarts(lines: string[], candidates: Candidate[], isHeading: (i: number) => boolean): { starts: Candidate[]; missing: number[] } {
  const n = candidates.length;
  if (n === 0) return { starts: [], missing: [] };

  // How good a question block is: options inside it count; a block whose own
  // inner numbering restarts (e.g. instructions "2. 3." then "1.") probably
  // swallowed two numbering systems, while statement lists inside a real
  // question only count upward ("1. 2.").
  const blockScore = (i: number, endLine: number) => {
    if (findOptions(cut(blockText(lines, candidates[i], endLine, isHeading)).body).length < 2) return 0.1;
    const inner = candidates.filter((c) => c.line > candidates[i].line && c.line < endLine).map((c) => c.number);
    const restarts = inner.some((num, k) => k > 0 && num <= inner[k - 1]);
    return restarts ? 0.2 : 1;
  };

  const score = new Array<number>(n).fill(0);
  const prev = new Array<number>(n).fill(-1);
  for (let i = 0; i < n; i++) {
    score[i] = 0;
    for (let j = 0; j < i; j++) {
      const gap = candidates[i].number - candidates[j].number;
      if (gap < 1 || gap > 3 || score[j] <= 0) continue;
      const s = score[j] + blockScore(j, candidates[i].line) - (gap - 1) * 0.5;
      if (s > score[i]) {
        score[i] = s;
        prev[i] = j;
      }
    }
    if (prev[i] === -1) score[i] = 0.01; // a chain can start anywhere
  }

  // Close each chain with its last block (to the end of the text).
  let bestEnd = 0;
  let bestScore = -Infinity;
  for (let i = 0; i < n; i++) {
    const total = score[i] + blockScore(i, lines.length);
    if (total > bestScore) {
      bestScore = total;
      bestEnd = i;
    }
  }

  const starts: Candidate[] = [];
  for (let i = bestEnd; i !== -1; i = prev[i]) starts.unshift(candidates[i]);
  const missing: number[] = [];
  for (let k = 1; k < starts.length; k++) {
    for (let m = starts[k - 1].number + 1; m < starts[k].number; m++) missing.push(m);
  }
  return { starts, missing };
}

/** Split a question block into body (prompt + options), inline answer and explanation. */
function cut(block: string): { body: string; answer: string | null; explanation: string } {
  let body = block;
  let answer: string | null = null;
  let explanation = "";

  const exp = EXPLANATION.exec(body);
  if (exp) {
    explanation = body.slice(exp.index + exp[0].length).trim();
    body = body.slice(0, exp.index);
  }
  const ans = INLINE_ANSWER.exec(body);
  if (ans) {
    answer = ans[1];
    const after = body.slice(ans.index + ans[0].length).trim();
    if (after && !explanation) explanation = after;
    body = body.slice(0, ans.index);
  }
  return { body: body.trim(), answer, explanation };
}

const clean = (s: string) => s.replace(/\s*\n\s*/g, " ").replace(/\s+/g, " ").trim();

export function parseQuestions(questionsText: string, answerKeyText?: string): ParseResult {
  const warnings: string[] = [];
  let lines = normalizeText(questionsText);

  // An answer key at the end of the same file.
  let keyText = answerKeyText ?? "";
  const keyHeading = lines.findIndex((l, i) => i > 0 && ANSWER_KEY_HEADING.test(l));
  if (keyHeading > 0) {
    keyText = `${lines.slice(keyHeading + 1).join("\n")}\n${keyText}`;
    lines = lines.slice(0, keyHeading);
  }

  const headings = new Map<number, string>();
  lines.forEach((l, i) => {
    if (l.length > 70) return;
    const m = SECTION_HEADING.exec(l);
    if (m && !QUESTION_START.test(l)) headings.set(i, clean(m[2]) || clean(l));
  });
  const isHeading = (i: number) => headings.has(i);

  const candidates: Candidate[] = [];
  lines.forEach((l, i) => {
    if (isHeading(i)) return;
    const m = QUESTION_START.exec(l);
    if (m) candidates.push({ line: i, number: Number(m[1] ?? m[2]), rest: m[3] ?? "" });
  });

  const { starts, missing } = chooseQuestionStarts(lines, candidates, isHeading);
  if (starts.length === 0) {
    return {
      questions: [],
      warnings: ["We couldn't find numbered questions. Questions should start with a number like “1.”, “Q1” or “Question 1”."],
    };
  }
  if (missing.length) {
    warnings.push(`Question${missing.length > 1 ? "s" : ""} ${missing.join(", ")} could not be found in the file. Add ${missing.length > 1 ? "them" : "it"} by hand if needed.`);
  }

  const key = keyText.trim() ? parseAnswerKey(keyText) : new Map<number, KeyEntry>();
  let section = DEFAULT_SECTION;
  let headingCursor = 0;
  const headingLines = [...headings.keys()].sort((a, b) => a - b);
  const conflicts: number[] = [];

  const questions = starts.map((start, i) => {
    while (headingCursor < headingLines.length && headingLines[headingCursor] < start.line) {
      section = headings.get(headingLines[headingCursor])!;
      headingCursor++;
    }
    const endLine = starts[i + 1]?.line ?? lines.length;
    const block = blockText(lines, start, endLine, isHeading);
    const { body, answer, explanation } = cut(block);
    const hits = findOptions(body);

    const prompt = (hits.length ? body.slice(0, hits[0].start) : body).trim();
    const options = hits.map((h, k) => clean(body.slice(h.end, hits[k + 1]?.start ?? body.length)));

    const fromKey = key.get(start.number);
    const inline = answer ? answerIndexOf(answer) : null;
    if (fromKey && inline !== null && fromKey.index !== inline) conflicts.push(start.number);

    const question: DraftQuestion = {
      key: newKey(),
      prompt,
      options,
      answerIndex: fromKey?.index ?? inline,
      explanation: clean(explanation || fromKey?.explanation || ""),
      section,
      source: `${start.number}. ${block}`.slice(0, 1500),
      approved: false,
    };
    return question;
  });

  if (key.size > 0 && key.size !== starts.length) {
    warnings.push(`The answer key has ${key.size} answers but ${starts.length} questions were found. Check the answers carefully.`);
  }
  const unreadable = questions.filter((q) => q.source?.includes("�")).length;
  if (unreadable) {
    warnings.push(
      `${unreadable} question${unreadable === 1 ? " has" : "s have"} letters the PDF didn't store as text (shown as �). This is common with Hindi PDFs — retype them, or paste the text from the original document instead.`,
    );
  }
  if (conflicts.length) {
    warnings.push(`The answer key and the answers written under questions ${conflicts.join(", ")} disagree. The answer key was used.`);
  }
  return { questions, warnings };
}
