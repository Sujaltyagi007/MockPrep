import { emptyQuestion, questionIssues, type DraftData, type DraftQuestion } from "@/lib/import/draft";

export type DraftAction =
  | { type: "set"; patch: Partial<DraftData> }
  | { type: "question"; key: string; patch: Partial<DraftQuestion> }
  | { type: "remove"; key: string }
  | { type: "add"; afterKey?: string }
  | { type: "approveReady" };

export function draftReducer(state: DraftData, action: DraftAction): DraftData {
  switch (action.type) {
    case "set":
      return { ...state, ...action.patch };
    case "question":
      return { ...state, questions: state.questions.map((q) => (q.key === action.key ? { ...q, ...action.patch } : q)) };
    case "remove":
      return { ...state, questions: state.questions.filter((q) => q.key !== action.key) };
    case "add": {
      const at = action.afterKey ? state.questions.findIndex((q) => q.key === action.afterKey) + 1 : state.questions.length;
      const near = state.questions[at - 1] ?? state.questions[at];
      const questions = [...state.questions];
      questions.splice(at, 0, emptyQuestion(near?.section));
      return { ...state, questions };
    }
    case "approveReady":
      return { ...state, questions: state.questions.map((q) => (questionIssues(q).length === 0 ? { ...q, approved: true } : q)) };
  }
}
