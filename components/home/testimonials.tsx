import { cn } from "@/lib/utils";
import { Trophy } from "lucide-react";
import { Section, SectionHeading } from "./section";
import { testimonials } from "@/lib/site-content";

const tones = [
  { card: "border-leaf-200", avatar: "bg-leaf-700", badge: "bg-leaf-50 text-leaf-800" },
  { card: "border-sky-200", avatar: "bg-blue-600", badge: "bg-sky-50 text-sky-800" },
  { card: "border-amber-200", avatar: "bg-orange-600", badge: "bg-amber-50 text-amber-800" },
];

export function Testimonials() {
  return (
    <Section labelledBy="stories-title">
      <SectionHeading id="stories-title" eyebrow="Aspirant Hall of Fame" icon={Trophy} title="Proven by Top Rank Holders"
        description="Real test takers who transformed their speed and accuracy with MockPrep drills." center />

      <ul className="mt-10 grid gap-6 md:grid-cols-3">
        {testimonials.map((s, i) => {
          const tone = tones[i % tones.length];
          const initials = s.name.split(" ").map((w) => w[0]).join("");
          return (
            <li key={s.name}>
              <figure className={cn("flex h-full flex-col rounded-3xl border bg-white p-6", tone.card)}>
                <blockquote className="flex-1 text-sm italic leading-relaxed text-slate-700">“{s.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                  <span className={cn("grid size-10 shrink-0 place-items-center rounded-full text-sm font-bold text-white", tone.avatar)} aria-hidden>{initials}</span>
                  <span>
                    <span className="block font-semibold text-ink">{s.name}</span>
                    <span className={cn("mt-0.5 inline-block rounded px-2 py-0.5 text-xs font-semibold", tone.badge)}>{s.result}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
