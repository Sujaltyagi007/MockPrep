import type { Answers, MockTest } from "./types";

export type SectionResult = {
  sectionId: string;
  total: number;
  correct: number;
  wrong: number;
  skipped: number;
  score: number;
  maxScore: number;
};

export type TestResult = {
  score: number;
  maxScore: number;
  correct: number;
  wrong: number;
  skipped: number;
  accuracy: number;
  sections: SectionResult[];
};

export function scoreAttempt(test: MockTest, answers: Answers): TestResult {
  const { correct: plus, wrong: minus } = test.marking;
  const bySection = new Map<string, SectionResult>(
    test.sections.map((s) => [
      s.id,
      { sectionId: s.id, total: 0, correct: 0, wrong: 0, skipped: 0, score: 0, maxScore: 0 },
    ]),
  );

  for (const q of test.questions) {
    const section = bySection.get(q.sectionId)!;
    section.total += 1;
    section.maxScore += plus;
    const chosen = answers[q.id];
    if (chosen === undefined) {
      section.skipped += 1;
    } else if (chosen === q.answerIndex) {
      section.correct += 1;
      section.score += plus;
    } else {
      section.wrong += 1;
      section.score += minus;
    }
  }

  const sections = [...bySection.values()].map((s) => ({ ...s, score: round2(s.score) }));
  const sum = (key: keyof SectionResult) => sections.reduce((n, s) => n + (s[key] as number), 0);
  const correct = sum("correct");
  const wrong = sum("wrong");

  return {
    score: round2(sum("score")),
    maxScore: sum("maxScore"),
    correct,
    wrong,
    skipped: sum("skipped"),
    accuracy: correct + wrong === 0 ? 0 : correct / (correct + wrong),
    sections,
  };
}

function round2(n: number) {
  return Math.round(n * 100) / 100;
}
