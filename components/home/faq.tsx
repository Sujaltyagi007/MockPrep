import { faqs } from "@/lib/site-content";
import { ChevronDown } from "lucide-react";

type FaqItem = { q: string; a: string };

export function Faq({ items = faqs, description = "Everything you need to know about MockPrep's 100% free initiative." }: { items?: FaqItem[]; description?: string }) {
  return (
    <section id="faq" aria-labelledby="faq-title" className="mx-auto max-w-3xl scroll-mt-24 px-4 pb-16 sm:px-8">
      <h2 id="faq-title" className="text-center text-2xl font-bold tracking-tight text-ink">Frequently Asked Questions</h2>
      <p className="mt-2 text-center text-sm text-slate-500">{description}</p>
      <ul className="mt-8 space-y-3">
        {items.map((f) => (
          <li key={f.q}>
            <details className="group rounded-2xl border border-slate-200 bg-white">
              <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 px-5 py-3 font-semibold text-ink">
                {f.q}
                <ChevronDown className="size-4 shrink-0 text-leaf-700 transition-transform group-open:rotate-180" aria-hidden />
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">{f.a}</p>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}
