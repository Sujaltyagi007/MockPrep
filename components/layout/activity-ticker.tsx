import type { JobGuide, TestSummary } from "@/lib/types";

export function ActivityTicker({ tests, guides }: { tests: TestSummary[]; guides: JobGuide[] }) {
  const items = [
    ...tests.map((t) => ({ label: "Free mock", text: t.title, href: `/test/${t.id}` })),
    ...guides.map((g) => ({ label: "Verified guide", text: g.title.en, href: "/#jobs" })),
  ];
  if (items.length === 0) return null;

  // Duplicate items sufficiently so the half-track is wider than wide desktop screens for a seamless loop
  let track = items;
  while (track.length < 8) {
    track = [...track, ...items];
  }
  const displayItems = [...track, ...track];

  return (
    <div
      role="region"
      aria-label="Latest updates"
      className="relative z-30 border-b border-leaf-100 bg-linear-to-r from-leaf-50 via-white to-leaf-50 text-leaf-900"
    >
      <div className="mx-auto flex h-7.5 sm:h-8 pointer-coarse:h-11 max-w-6xl items-center gap-3 px-4 sm:px-8">
        {/* Modern Live Pulse Badge */}
        <div className="hidden shrink-0 items-center gap-1.5 rounded-full border border-leaf-300 bg-white px-2 py-0.5 text-xs font-semibold tracking-wider text-leaf-700 sm:inline-flex">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf-400 opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-leaf-400" />
          </span>
          UPDATES
        </div>

        {/* Marquee viewport with smooth edge masks and hardware-accelerated glide */}
        <div className="ticker-mask relative min-w-0 flex-1 overflow-hidden py-0.5">
          <ul className="ticker-track flex w-max items-center">
            {displayItems.map((item, i) => {
              const isDuplicate = i >= track.length;
              return (
                <li
                  key={`${item.href}-${i}`}
                  aria-hidden={isDuplicate || undefined}
                  className="flex items-center gap-2 whitespace-nowrap pr-8 text-xs sm:text-xs"
                >
                  <span className="inline-flex items-center rounded-full border border-leaf-200 bg-leaf-100 px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-leaf-800">
                    {item.label}
                  </span>
                  <a
                    href={item.href}
                    tabIndex={isDuplicate ? -1 : undefined}
                    className="font-medium text-ink pointer-coarse:py-3 transition-colors duration-150 hover:text-leaf-700 hover:underline"
                  >
                    {item.text}
                  </a>
                  <span className="size-1 rounded-full bg-leaf-300" aria-hidden />
                </li>
              );
            })}
          </ul>
        </div>

        {/* Slim, simple right metadata */}
        <div className="hidden shrink-0 items-center gap-2 text-xs font-medium text-leaf-800 md:flex">
          <span className="text-leaf-700">{tests.length} Mocks</span>
          <span className="h-2.5 w-px bg-leaf-200" aria-hidden />
          <a
            href="#accessibility"
            className="transition-colors duration-150 hover:text-ink"
          >
            Bilingual EN/HI →
          </a>
        </div>
      </div>
    </div>
  );
}
