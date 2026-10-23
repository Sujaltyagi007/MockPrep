import { Fragment, type CSSProperties, type ReactNode } from "react";

export function SkeletonPage({ children }: { children: ReactNode }) {
  return (
    <div role="status" aria-busy="true">
      <span className="sr-only">Loading...</span>
      <div aria-hidden>{children}</div>
    </div>
  );
}

export function Bone({ className, style }: { className: string; style?: CSSProperties }) {
  return <div className={`skeleton ${className}`} style={style} />;
}

export function Line({ box, className }: { box: string; className: string }) {
  return (
    <div className={`flex items-center ${box}`}>
      <Bone className={`max-w-full rounded-md ${className}`} />
    </div>
  );
}

export function PageHeaderSkeleton({ back = false }: { back?: boolean }) {
  return (
    <Fragment>
      {back && <Line box="mb-4 h-6" className="h-3.5 w-28" />}
    </Fragment>
  );
}

export function CardHeaderSkeleton({ children }: { children?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3 border-b border-black/5 px-4 py-4 sm:px-6">
      <div className="min-w-0">
        <Line box="h-7" className="h-5 w-40" />
        <Line box="mt-0.5 h-5" className="h-3.5 w-64" />
      </div>
      {children}
    </div>
  );
}
