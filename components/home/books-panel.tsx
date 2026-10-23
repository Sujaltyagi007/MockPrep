"use client";
import type { Book } from "@/lib/types";
import { BookOpen } from "lucide-react";
import { categoryLabels } from "@/lib/i18n";
import { usePersonalized } from "./personalize";

export function BooksPanel({ books }: { books: Book[] }) {
  const { items, notice } = usePersonalized(books, (b) => b.eligibleQuals);

  return (
    <div className="space-y-4">
      {notice}
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((book) => (
          <li key={book.id} className="flex gap-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-leaf-50 text-leaf-600">
              <BookOpen className="size-5" aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold text-navy-950 break-words">{book.title}</span>
              <span className="block text-sm text-slate-500 truncate">{book.author}</span>
              <span className="mt-1 block text-xs text-slate-400 break-words">
                {categoryLabels[book.category]} · {book.useFor}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
