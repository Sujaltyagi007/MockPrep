export function ReadyBand({ testCount }: { testCount: number }) {
  return (
    <section aria-labelledby="ready-title" className="mx-auto max-w-6xl px-4 pb-16 sm:px-8 sm:pb-20">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-100/80 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <h2 id="ready-title" className="text-xl font-bold text-ink sm:text-2xl">Ready to check your exam readiness?</h2>
          <p className="mt-1 text-sm text-slate-600">Begin with zero setup. Pick any mock test and start in seconds.</p>
        </div>
        <a href="#practice" className="inline-flex h-11 w-fit items-center rounded-full bg-leaf-800 px-6 text-sm font-semibold text-white hover:bg-leaf-900">
          Browse All {testCount} Tests
        </a>
      </div>
    </section>
  );
}
