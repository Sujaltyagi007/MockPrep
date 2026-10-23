import type { ComponentProps, ReactNode } from "react";
import { CircleAlert, CircleCheck, Info } from "lucide-react";

const buttonBase =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-60";

export const buttonClass = {
  primary: `${buttonBase} h-10 bg-forest px-4 text-white hover:brightness-110`,
  secondary: `${buttonBase} h-10 border border-black/10 bg-white px-4 text-ink hover:bg-sand`,
  danger: `${buttonBase} h-10 border border-brick/20 bg-white px-4 text-brick hover:bg-blush/40`,
  icon: `${buttonBase} size-9 border border-black/10 bg-white text-ink/70 hover:bg-sand hover:text-ink`,
  iconDanger: `${buttonBase} size-9 border border-black/10 bg-white text-brick hover:bg-blush/40`,
};

export const inputClass =
  "w-full rounded-xl border border-black/10 bg-white px-3.5 py-2 text-[14px] text-ink outline-none transition placeholder:text-ink/35 focus:border-forest focus:ring-2 focus:ring-forest/20";

export { PageHeader } from "@/components/admin/page-header";

export function Card({ className = "", ...props }: ComponentProps<"section">) {
  return (
    <section
      className={`rounded-2xl border border-black/5 bg-white shadow-[0_1px_3px_rgba(28,27,27,0.04)] ${className}`}
      {...props}
    />
  );
}

export function CardHeader({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3 border-b border-black/5 px-4 py-4 sm:px-6">
      <div className="min-w-0">
        <h2 className="font-display text-lg font-semibold text-ink">{title}</h2>
        {description && (
          <p className="mt-0.5 text-xs sm:text-sm leading-5 text-body">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}

const noticeStyles = {
  success: { box: "bg-forest-tint text-forest", Icon: CircleCheck },
  error: { box: "bg-blush/60 text-brick", Icon: CircleAlert },
  info: { box: "bg-honey-soft text-olive", Icon: Info },
};

export function Notice({
  tone = "info",
  className = "",
  children,
}: {
  tone?: keyof typeof noticeStyles;
  className?: string;
  children: ReactNode;
}) {
  const { box, Icon } = noticeStyles[tone];
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={`flex gap-2.5 rounded-xl px-3.5 py-3 text-sm leading-5 font-medium ${box} ${className}`}
    >
      <Icon className="mt-0.5 size-4 shrink-0" />
      <div className="min-w-0">{children}</div>
    </div>
  );
}

const badgeStyles = {
  green: "bg-forest-tint text-forest",
  yellow: "bg-honey text-olive",
  red: "bg-blush text-brick",
  grey: "bg-stone text-body",
};

export function Badge({
  tone = "grey",
  children,
}: {
  tone?: keyof typeof badgeStyles;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap ${badgeStyles[tone]}`}
    >
      {children}
    </span>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <p className="px-4 py-10 text-center text-sm text-body sm:px-6">
      {children}
    </p>
  );
}

const dateTime = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Kolkata",
});

export const formatDateTime = (date: Date | string) => {
  const d = typeof date === "string" ? new Date(date) : date;
  return dateTime.format(d);
};
