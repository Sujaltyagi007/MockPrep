"use client";

import { useState } from "react";
import {
  HelpCircle,
  Plus,
  Search,
  CheckCircle2,
  X,
  Sparkles,
  BookOpen,
} from "lucide-react";
import {
  Badge,
  Card,
  PageHeader,
  buttonClass,
} from "@/components/admin/ui";

interface QuestionItem {
  id: string;
  topic: string;
  category: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  languages: string[];
}

const INITIAL_QUESTIONS: QuestionItem[] = [
  {
    id: "q-1",
    topic: "Indian Polity",
    category: "CIVIL",
    difficulty: "HARD",
    prompt: "Which constitutional provision empowers the Parliament of India to admit or establish new States in the Union?",
    options: ["Article 1", "Article 2", "Article 3", "Article 4"],
    correctIndex: 1,
    explanation: "Article 2 empowers Parliament to admit into the Union, or establish, new States on terms and conditions as it thinks fit.",
    languages: ["en", "hi"],
  },
  {
    id: "q-2",
    topic: "Quantitative Aptitude",
    category: "BANKING_SSC",
    difficulty: "MEDIUM",
    prompt: "A train running at 72 km/h crosses a 200m long bridge in 20 seconds. What is the length of the train?",
    options: ["180 meters", "200 meters", "220 meters", "250 meters"],
    correctIndex: 1,
    explanation: "Speed = 72 * (5/18) = 20 m/s. Total distance in 20s = 400m. Length of train = 400 - 200 = 200 meters.",
    languages: ["en", "hi"],
  },
  {
    id: "q-3",
    topic: "General Science",
    category: "RAILWAYS",
    difficulty: "EASY",
    prompt: "Which gas is primarily responsible for the greenhouse effect and climate warming on Earth?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
    correctIndex: 1,
    explanation: "Carbon dioxide (CO2) is the primary greenhouse gas emitted through human activities and industrial combustion.",
    languages: ["en", "hi"],
  },
  {
    id: "q-4",
    topic: "History of Modern India",
    category: "CIVIL",
    difficulty: "MEDIUM",
    prompt: "The historic Champaran Satyagraha of 1917 was organized to address the grievances of which agricultural community?",
    options: ["Cotton growers", "Indigo cultivators", "Tea estate workers", "Opium farmers"],
    correctIndex: 1,
    explanation: "Mahatma Gandhi's first Satyagraha in India was against the exploitative Tinkathia system imposed on Indigo farmers in Champaran, Bihar.",
    languages: ["en", "hi"],
  },
];

export default function QuestionsAdminPage() {
  const [questions, setQuestions] = useState<QuestionItem[]>(INITIAL_QUESTIONS);
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New question form state
  const [topic, setTopic] = useState("Indian Polity");
  const [category, setCategory] = useState("CIVIL");
  const [difficulty, setDifficulty] = useState<"EASY" | "MEDIUM" | "HARD">("MEDIUM");
  const [prompt, setPrompt] = useState("");
  const [opt0, setOpt0] = useState("");
  const [opt1, setOpt1] = useState("");
  const [opt2, setOpt2] = useState("");
  const [opt3, setOpt3] = useState("");
  const [correctIndex, setCorrectIndex] = useState(0);
  const [explanation, setExplanation] = useState("");

  const filteredQuestions = questions.filter((q) => {
    const matchSearch =
      q.prompt.toLowerCase().includes(search.toLowerCase()) ||
      q.topic.toLowerCase().includes(search.toLowerCase());
    const matchDiff = difficultyFilter === "ALL" || q.difficulty === difficultyFilter;
    return matchSearch && matchDiff;
  });

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || !opt0.trim() || !opt1.trim()) return;

    const newQ: QuestionItem = {
      id: `q-${Date.now()}`,
      topic,
      category,
      difficulty,
      prompt,
      options: [opt0, opt1, opt2 || "Option C", opt3 || "Option D"],
      correctIndex,
      explanation: explanation || "Verified question solution.",
      languages: ["en", "hi"],
    };

    setQuestions([newQ, ...questions]);
    setIsModalOpen(false);
    setPrompt("");
    setOpt0("");
    setOpt1("");
    setOpt2("");
    setOpt3("");
    setExplanation("");
  };

  return (
    <div>
      <PageHeader
        title="Question Bank"
        description="Review bilingual prompts, options, answers, and comprehensive explanations."
      >
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className={buttonClass.primary}
        >
          <Plus className="size-4" />
          <span>Add Question</span>
        </button>
      </PageHeader>

      {/* Filter and Search Bar */}
      <div className="mb-6 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink/40" />
          <input
            type="text"
            placeholder="Search questions by topic or prompt text..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-black/10 bg-white py-2 pl-9 pr-4 text-xs text-ink outline-none transition focus:border-forest focus:ring-1 focus:ring-forest"
          />
        </div>

        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          className="w-full sm:w-auto rounded-xl border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-ink outline-none focus:border-forest"
        >
          <option value="ALL">All Difficulties</option>
          <option value="EASY">Easy</option>
          <option value="MEDIUM">Medium</option>
          <option value="HARD">Advanced / Hard</option>
        </select>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((q, idx) => (
          <Card key={q.id} className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/5 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-forest">#{idx + 1}</span>
                <span className="rounded-full bg-sand px-2.5 py-0.5 text-xs font-bold text-ink">
                  {q.topic}
                </span>
                <span className="rounded-full bg-forest-tint px-2 py-0.5 text-xs font-bold text-forest">
                  {q.category}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Badge
                  tone={
                    q.difficulty === "HARD"
                      ? "red"
                      : q.difficulty === "MEDIUM"
                      ? "yellow"
                      : "green"
                  }
                >
                  {q.difficulty}
                </Badge>
                <span className="text-xs font-semibold text-body">
                  EN / HI
                </span>
              </div>
            </div>

            <p className="mt-3 text-sm font-semibold text-ink leading-relaxed">
              {q.prompt}
            </p>

            {/* Options List */}
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {q.options.map((opt, optIdx) => {
                const isCorrect = optIdx === q.correctIndex;
                return (
                  <div
                    key={optIdx}
                    className={`flex items-center gap-2.5 rounded-xl border px-3 py-2 text-xs transition ${
                      isCorrect
                        ? "border-forest bg-forest-tint/40 font-semibold text-forest"
                        : "border-black/8 bg-sand/20 text-ink/80"
                    }`}
                  >
                    <span
                      className={`grid size-5 place-items-center rounded-md font-bold text-xs ${
                        isCorrect ? "bg-forest text-white" : "bg-black/5 text-ink/70"
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="flex-1 truncate">{opt}</span>
                    {isCorrect && <CheckCircle2 className="size-3.5 text-forest shrink-0" />}
                  </div>
                );
              })}
            </div>

            {/* Explanation */}
            <div className="mt-3 rounded-xl border border-black/5 bg-sand/30 p-3 text-xs leading-relaxed text-body">
              <span className="font-bold text-ink">Explanation: </span>
              {q.explanation}
            </div>
          </Card>
        ))}
      </div>

      {/* Add Question Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-ink/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="dialog-card-in relative w-full max-w-lg rounded-2xl border border-black/10 bg-white p-6 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-black/5 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="flex size-8 items-center justify-center rounded-xl bg-forest-tint text-forest">
                  <HelpCircle className="size-4.5" />
                </span>
                <h3 className="font-display text-base font-bold text-ink">Add Question to Bank</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex size-7 items-center justify-center rounded-lg text-ink/40 hover:bg-sand hover:text-ink"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleAddQuestion} className="mt-4 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-ink mb-1">Topic</label>
                  <input
                    type="text"
                    required
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full rounded-xl border border-black/10 px-3 py-2 outline-none focus:border-forest"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-ink mb-1">Difficulty</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as "EASY" | "MEDIUM" | "HARD")}
                    className="w-full rounded-xl border border-black/10 px-3 py-2 outline-none focus:border-forest"
                  >
                    <option value="EASY">Easy</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HARD">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-ink mb-1">Question Prompt</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Enter the complete question statement..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full rounded-xl border border-black/10 px-3 py-2 outline-none focus:border-forest"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-semibold text-ink">Options & Correct Answer</label>
                {[
                  { val: opt0, set: setOpt0, idx: 0, label: "A" },
                  { val: opt1, set: setOpt1, idx: 1, label: "B" },
                  { val: opt2, set: setOpt2, idx: 2, label: "C" },
                  { val: opt3, set: setOpt3, idx: 3, label: "D" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correctOption"
                      checked={correctIndex === item.idx}
                      onChange={() => setCorrectIndex(item.idx)}
                      title={`Mark ${item.label} as correct answer`}
                      className="size-4 accent-forest cursor-pointer"
                    />
                    <input
                      type="text"
                      required={item.idx < 2}
                      placeholder={`Option ${item.label}`}
                      value={item.val}
                      onChange={(e) => item.set(e.target.value)}
                      className="flex-1 rounded-xl border border-black/10 px-3 py-1.5 outline-none focus:border-forest"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block font-semibold text-ink mb-1">Explanation & Solution</label>
                <textarea
                  rows={2}
                  placeholder="Detailed rationale for the correct answer..."
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  className="w-full rounded-xl border border-black/10 px-3 py-2 outline-none focus:border-forest"
                />
              </div>

              <div className="mt-5 flex items-center justify-end gap-2 border-t border-black/5 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className={buttonClass.secondary}
                >
                  Cancel
                </button>
                <button type="submit" className={buttonClass.primary}>
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
