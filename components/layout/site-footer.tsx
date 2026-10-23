import { Logo } from "./logo";

const links = [
  { href: "/#exams", label: "Exams" },
  { href: "/#practice", label: "Practice" },
  { href: "/#apply", label: "Apply" },
  { href: "/#faq", label: "Help" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/70 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 pb-24 sm:pb-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <Logo animated={false} />
          <p className="text-sm text-slate-500">Free preparation for every aspirant.</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-1 text-sm text-slate-600">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="inline-block rounded-lg px-3 py-3 hover:bg-slate-50 hover:text-navy-950">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
