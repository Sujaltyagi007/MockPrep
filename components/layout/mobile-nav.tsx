import { BellRing, HelpCircle, Library, Route, Timer } from "lucide-react";

const links = [
  { href: "/exams", label: "Exams", icon: Library },
  { href: "/mock-tests", label: "Mock Tests", icon: Timer },
  { href: "/jobs", label: "Job Alerts", icon: BellRing },
  { href: "/#roadmap", label: "Roadmap", icon: Route },
  { href: "/#faq", label: "Help", icon: HelpCircle },
];

export function MobileNav() {
  return (
    <nav aria-label="Quick links" className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <ul className="grid grid-cols-5">
        {links.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <a href={href} className="flex h-16 flex-col items-center justify-center gap-1 text-center text-xs leading-tight font-medium text-slate-600 active:bg-slate-100">
              <Icon className="size-5" aria-hidden />
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
