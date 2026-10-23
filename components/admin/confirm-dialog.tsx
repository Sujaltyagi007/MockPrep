"use client";
import { createPortal } from "react-dom";
import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import { AlertTriangle, LoaderCircle, Save, Trash2, X, type LucideIcon } from "lucide-react";

export type ConfirmDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title?: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  pending?: boolean;
  tone?: "danger" | "primary";
  icon?: LucideIcon;
  pendingLabel?: string;
  deleteNote?: boolean;
  children?: ReactNode;
};

const noop = () => () => { };

export function ConfirmDialog({ isOpen, onClose, onConfirm, title, description, confirmLabel, cancelLabel = "Cancel", pending = false, tone = "danger", icon, pendingLabel, deleteNote, children }: ConfirmDialogProps) {
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => cancelRef.current?.focus(), 40);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !pending) {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, pending]);

  if (!mounted || !isOpen) return null;

  const isDanger = tone === "danger";
  const dialogTitle = title ?? (isDanger ? "Confirm Action" : "Are you sure?");
  const dialogConfirmLabel = confirmLabel ?? (isDanger ? "Proceed" : "Confirm");
  const Icon = icon ?? (isDanger ? AlertTriangle : Save);
  const ButtonIcon = icon ?? (isDanger ? Trash2 : Save);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      <div
        className="fixed inset-0 bg-ink/40 backdrop-blur-xs transition-opacity"
        onClick={() => !pending && onClose()}
        aria-hidden="true"
      />
      <div className="dialog-card-in relative w-full max-w-md overflow-hidden rounded-2xl border border-black/10 bg-white p-5 shadow-2xl transition-all">
        <button
          type="button"
          onClick={onClose}
          disabled={pending}
          aria-label="Close dialog"
          className="absolute top-3.5 right-3.5 flex size-7 items-center justify-center rounded-lg text-ink/40 transition hover:bg-sand hover:text-ink disabled:opacity-40"
        >
          <X className="size-4" />
        </button>

        <div className="flex items-center gap-3 pr-6">
          <div
            className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${isDanger ? "bg-blush/70 text-brick" : "bg-forest-tint text-forest"
              }`}
          >
            <Icon className="size-4.5 stroke-[2.2]" />
          </div>
          <h2
            id="confirm-dialog-title"
            className="font-display text-base font-semibold text-ink sm:text-[17px] leading-snug"
          >
            {dialogTitle}
          </h2>
        </div>

        <div className="mt-3 text-[13.5px] leading-relaxed text-body">
          <p>{description}</p>
          {children}
          {deleteNote && (
            <p className="mt-2.5 text-xs text-body/80">
              This action modifies system configuration.
            </p>
          )}
        </div>

        <div className="mt-5 flex items-center justify-end gap-2 border-t border-black/5 pt-3">
          <button
            ref={cancelRef}
            type="button"
            disabled={pending}
            onClick={onClose}
            className="h-9 cursor-pointer rounded-xl border border-black/10 bg-white px-3.5 text-xs font-semibold text-ink transition hover:bg-sand active:scale-[.98] disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={onConfirm}
            className={`inline-flex h-9 cursor-pointer shrink-0 items-center justify-center gap-1.5 rounded-xl px-4 text-xs font-semibold text-white shadow-xs transition hover:brightness-110 active:scale-[.98] disabled:opacity-50 ${isDanger ? "bg-brick" : "bg-forest"
              }`}
          >
            {pending ? (
              <>
                <LoaderCircle className="size-3.5 animate-spin" />
                <span>{pendingLabel ?? "Processing..."}</span>
              </>
            ) : (
              <>
                <ButtonIcon className="size-3.5" />
                <span>{dialogConfirmLabel}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
