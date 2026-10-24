import type { ExamCategory } from "@/lib/types";

type CategoryStyle = { chip: string; dot: string; border: string; accent: string; button: string };

export const categoryStyles: Record<ExamCategory, CategoryStyle> = {
  CIVIL: { chip: "bg-leaf-100 text-leaf-800", dot: "bg-leaf-500", border: "border-leaf-200", accent: "text-leaf-700", button: "bg-linear-to-r from-leaf-800 to-leaf-600" },
  TECH: { chip: "bg-sky-100 text-sky-800", dot: "bg-sky-500", border: "border-sky-200", accent: "text-sky-700", button: "bg-linear-to-r from-sky-600 to-blue-700" },
  BANKING_SSC: { chip: "bg-amber-100 text-amber-800", dot: "bg-amber-500", border: "border-amber-200", accent: "text-orange-700", button: "bg-linear-to-r from-amber-600 to-orange-700" },
  RAILWAYS: { chip: "bg-rose-100 text-rose-800", dot: "bg-rose-500", border: "border-rose-200", accent: "text-rose-700", button: "bg-linear-to-r from-rose-600 to-red-700" },
  STATE_PSC: { chip: "bg-teal-100 text-teal-800", dot: "bg-teal-500", border: "border-teal-200", accent: "text-teal-700", button: "bg-linear-to-r from-teal-600 to-leaf-800" },
  TEACHING: { chip: "bg-violet-100 text-violet-800", dot: "bg-violet-500", border: "border-violet-200", accent: "text-violet-700", button: "bg-linear-to-r from-violet-600 to-indigo-700" },
  DEFENCE: { chip: "bg-slate-200 text-slate-800", dot: "bg-slate-500", border: "border-slate-300", accent: "text-slate-700", button: "bg-linear-to-r from-slate-700 to-slate-900" },
};
