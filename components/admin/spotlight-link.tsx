"use client";
import Link, { type LinkProps } from "next/link";
import type { PointerEvent, ReactNode } from "react";

type Props = LinkProps & {
  children: ReactNode;
  className?: string;
  title?: string;
};

export function SpotlightLink({ children, className = "", ...props }: Props) {
  const updateSpotlight = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType === "touch") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--spotlight-x",
      `${event.clientX - bounds.left}px`
    );
    event.currentTarget.style.setProperty(
      "--spotlight-y",
      `${event.clientY - bounds.top}px`
    );
  };

  const resetSpotlight = (event: PointerEvent<HTMLAnchorElement>) => {
    event.currentTarget.style.removeProperty("--spotlight-x");
    event.currentTarget.style.removeProperty("--spotlight-y");
  };

  return (
    <Link { ...props} onPointerMove={updateSpotlight} onPointerLeave={resetSpotlight} className={`admin-spotlight-link ${className}`} >
      {children}
    </Link>
  );
}
