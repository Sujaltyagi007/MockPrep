import { faqs } from "@/lib/site-content";
import { ChevronDown } from "lucide-react";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="mx-auto max-w-2xl scroll-mt-4 px-4 pb-20">
      <h2 id="faq-title" className="text-center text-2xl font-bold tracking-tight text-navy-950">Questions?</h2>
      <ul className="mt-6 divide-y divide-slate-100 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
        {faqs.map((f) => (
          <li key={f.q}>
            <details className="group">
              <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 px-6 py-3 font-medium text-navy-950">
                {f.q}
                <ChevronDown className="size-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180" aria-hidden />
              </summary>
              <p className="px-6 pb-5 text-slate-600">{f.a}</p>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}
