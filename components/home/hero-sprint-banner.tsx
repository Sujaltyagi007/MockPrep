import Link from "next/link";
import { Flame, ArrowRight, Calendar } from "lucide-react";

export function HeroSprintBanner() {
  return (
    <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-3xl bg-[#0a180e] border border-emerald-900/50 p-5 text-white shadow-xl shadow-black/25 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3.5 min-w-0 flex-1">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-amber-400/20 text-sun ring-1 ring-amber-400/40">
            <Flame className="size-6 text-amber-400 animate-pulse" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-amber-400/20 px-2.5 py-0.5 text-xs font-semibold text-amber-300 ring-1 ring-amber-400/30">
                Daily Booster Live
              </span>
              <span className="text-xs text-slate-300">Resetting at Midnight IST</span>
            </div>
            <h4 className="mt-1 text-base font-bold text-white sm:text-lg break-words">
              Stay Ahead of Cut-offs! Today&apos;s 10-Question Sprint is active
            </h4>
            <p className="mt-1 text-xs text-slate-200 sm:text-sm leading-relaxed break-words">
              87% of aspirants who practice daily clear Prelims on their first attempt. Benchmark your speed today.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-2 sm:pt-0 w-full sm:w-auto">
          <Link
            href="/test/quant-reasoning-drill"
            className="inline-flex min-h-[44px] sm:min-h-0 items-center justify-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-xs font-bold text-navy-950 shadow-md shadow-emerald-950/20 transition hover:bg-emerald-300 active:scale-95 sm:text-sm"
          >
            Take Sprint Now
            <ArrowRight className="size-4 text-navy-950" />
          </Link>
          <Link
            href="#practice"
            className="inline-flex min-h-[44px] sm:min-h-0 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2.5 text-xs font-semibold text-white backdrop-blur-xs transition hover:bg-white/20 sm:text-sm"
          >
            <Calendar className="size-4 text-emerald-300" />
            Full Schedule
          </Link>
        </div>
      </div>
    </div>
  );
}
