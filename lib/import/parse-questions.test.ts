import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parseAnswerKey, parseQuestions } from "./parse-questions";
import { publishProblems, newDraft, questionIssues } from "./draft";

const pick = (text: string, key?: string) =>
  parseQuestions(text, key).questions.map((q) => ({
    prompt: q.prompt,
    options: q.options,
    answer: q.answerIndex,
    explanation: q.explanation,
    section: q.section,
  }));

describe("parseQuestions", () => {
  it("reads questions with answers and explanations written under them", () => {
    const text = `
1. Which Article guarantees the Right to Constitutional Remedies?
(a) Article 19
(b) Article 21
(c) Article 32
(d) Article 226
Answer: (c)
Explanation: Article 32 lets citizens move the Supreme Court directly.

2. In which year was the Battle of Plassey fought?
(a) 1757 (b) 1764 (c) 1773 (d) 1857
Ans. A`;
    assert.deepEqual(pick(text), [
      {
        prompt: "Which Article guarantees the Right to Constitutional Remedies?",
        options: ["Article 19", "Article 21", "Article 32", "Article 226"],
        answer: 2,
        explanation: "Article 32 lets citizens move the Supreme Court directly.",
        section: "General",
      },
      {
        prompt: "In which year was the Battle of Plassey fought?",
        options: ["1757", "1764", "1773", "1857"],
        answer: 0,
        explanation: "",
        section: "General",
      },
    ]);
  });

  it("uses an answer key at the end of the same file", () => {
    const text = `Q1. 2 + 2 = ?
A. 3
B. 4
C. 5
D. 6
Q2. Capital of France?
A. Rome
B. Madrid
C. Paris
D. Berlin

Answer Key
1. B
2. C`;
    const qs = pick(text);
    assert.equal(qs.length, 2);
    assert.deepEqual(qs.map((q) => q.answer), [1, 2]);
    assert.deepEqual(qs[1].options, ["Rome", "Madrid", "Paris", "Berlin"]);
  });

  it("uses a separate answer key file, including table layouts", () => {
    const text = `1) Odd one out?\n(a) Apple (b) Mango (c) Potato (d) Banana\n2) Next: 2, 6, 12, 20, ?\n(a) 28 (b) 30 (c) 32 (d) 36\n3) LIFO structure?\n(a) Queue (b) Stack (c) Heap (d) Tree`;
    const key = `1-c 2-b 3-b`;
    assert.deepEqual(pick(text, key).map((q) => q.answer), [2, 1, 1]);
  });

  it("skips numbered instructions before the paper", () => {
    const text = `Instructions
1. All questions are compulsory.
2. Each question carries 2 marks.
3. There is negative marking.
1. Largest planet?
(a) Earth (b) Jupiter (c) Mars (d) Venus
2. Smallest prime?
(a) 0 (b) 1 (c) 2 (d) 3`;
    const qs = pick(text, "1 b\n2 c");
    assert.equal(qs.length, 2);
    assert.equal(qs[0].prompt, "Largest planet?");
    assert.deepEqual(qs.map((q) => q.answer), [1, 2]);
  });

  it("keeps numbered statements inside a question", () => {
    const text = `1. Consider the following statements:
1. The President is elected indirectly.
2. The Vice-President chairs the Rajya Sabha.
Which of the statements given above is/are correct?
(a) 1 only
(b) 2 only
(c) Both 1 and 2
(d) Neither 1 nor 2
Answer: (c)
2. Who appoints the Chief Justice of India?
(a) Prime Minister (b) President (c) Parliament (d) Law Minister
Answer: (b)`;
    const qs = pick(text);
    assert.equal(qs.length, 2);
    assert.match(qs[0].prompt, /1\. The President is elected indirectly\.\n2\. The Vice-President/);
    assert.deepEqual(qs[0].options, ["1 only", "2 only", "Both 1 and 2", "Neither 1 nor 2"]);
    assert.deepEqual(qs.map((q) => q.answer), [2, 1]);
  });

  it("reads Hindi questions with Devanagari digits and options", () => {
    const text = `प्रश्न १. भारत का राष्ट्रपति बनने की न्यूनतम आयु क्या है?
(क) 25 वर्ष
(ख) 30 वर्ष
(ग) 35 वर्ष
(घ) 40 वर्ष
उत्तर: (ग)`;
    const [q] = pick(text);
    assert.equal(q.prompt, "भारत का राष्ट्रपति बनने की न्यूनतम आयु क्या है?");
    assert.equal(q.options.length, 4);
    assert.equal(q.answer, 2);
  });

  it("joins a question word split from its number, and flags unreadable letters", () => {
    const result = parseQuestions(`प्रश्न\n1. रा�पति?\n(क) अ (ख) ब\nउत्तर: (ख)\nप्रश्न\n2. दूसरा?\n(क) अ (ख) ब\nउत्तर: (क)`);
    assert.deepEqual(result.questions.map((q) => [q.answerIndex, q.explanation]), [[1, ""], [0, ""]]);
    assert.ok(questionIssues(result.questions[0]).some((i) => i.includes("couldn't be read")));
    assert.ok(result.warnings.some((w) => w.includes("Hindi")));
  });

  it("assigns sections from headings", () => {
    const text = `Section A: Reasoning
1. Odd one out? (a) 2 (b) 4 (c) 7 (d) 8
Section B: English
2. Synonym of big? (a) Small (b) Large (c) Thin (d) Short`;
    assert.deepEqual(pick(text).map((q) => q.section), ["Reasoning", "English"]);
  });

  it("leaves the answer empty when there is none, and warns about gaps", () => {
    const result = parseQuestions(`1. A? (a) x (b) y\n2. B? (a) x (b) y\n4. D? (a) x (b) y`);
    assert.deepEqual(result.questions.map((q) => q.answerIndex), [null, null, null]);
    assert.ok(result.warnings.some((w) => w.includes("3")));
  });

  it("explains when nothing looks like a question", () => {
    const result = parseQuestions("This is a cover page with no questions.");
    assert.equal(result.questions.length, 0);
    assert.equal(result.warnings.length, 1);
  });
});

describe("parseAnswerKey", () => {
  it("handles common layouts", () => {
    const key = parseAnswerKey(`Answers\n1. (b)\nQ2: C\n3 - d\n4.a 5.b`);
    assert.deepEqual([...key].map(([n, e]) => [n, e.index]), [[1, 1], [2, 2], [3, 3], [4, 0], [5, 1]]);
  });

  it("keeps explanations from solution-style keys", () => {
    const key = parseAnswerKey(`1. (b) Speed is 20 m/s, so the length is 300 m.\n2. (a)`);
    assert.equal(key.get(1)?.explanation, "Speed is 20 m/s, so the length is 300 m.");
    assert.equal(key.get(2)?.index, 0);
  });
});

describe("draft checks", () => {
  it("blocks publishing until every question is complete and approved", () => {
    const { questions } = parseQuestions(`1. A? (a) x (b) y\nAnswer: a`);
    const draft = { ...newDraft(questions), title: "T" };
    assert.deepEqual(questionIssues(questions[0]), []);
    assert.deepEqual(publishProblems(draft), ["1 question is not approved yet."]);
    draft.questions[0].approved = true;
    assert.deepEqual(publishProblems(draft), []);
  });
});
