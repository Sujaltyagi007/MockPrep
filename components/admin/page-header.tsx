"use client";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { useSyncExternalStore } from "react";
import { Fragment } from "react/jsx-runtime";

export const PAGE_HEADING_SLOT_ID = "admin-page-heading";

const noop = () => () => { };
const findSlot = () => document.getElementById(PAGE_HEADING_SLOT_ID);

export function PageHeader({ title, description, children }: { title: string; description?: string; children?: ReactNode; }) {
  const slot = useSyncExternalStore(noop, findSlot, () => null);

  return (
    <Fragment>
      <span data-page-heading hidden />
      {slot &&
        createPortal(
          <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
            <div className="min-w-0">
              <h1 className="truncate font-display text-lg leading-tight font-semibold tracking-tight text-ink sm:text-xl">
                {title}
              </h1>
              {description && (
                <p className="hidden truncate text-xs text-body sm:block" title={description}>
                  {description}
                </p>
              )}
            </div>
            {children && <div className="flex shrink-0 items-center gap-2">{children}</div>}
          </div>,
          slot
        )}
    </Fragment>
  );
}
