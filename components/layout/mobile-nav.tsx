import { planTabs } from "@/components/home/plan-tabs-config";

export function MobileNav() {
  return (
    <nav aria-label="Quick links" className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <ul className="grid grid-cols-4">
        {planTabs.map(({ id, label, icon: Icon }) => (
          <li key={id}>
            <a href={`#${id}`} className="flex h-16 flex-col items-center justify-center gap-1 text-xs font-medium text-slate-600 active:bg-slate-100">
              <Icon className="size-5" aria-hidden />
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
