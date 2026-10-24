"use client";
import { LoaderCircle } from "lucide-react";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { Fragment, useState, useTransition, type ReactNode } from "react";

type Props = {
  action: () => void | Promise<void>;
  label: string;
  className: string;
  children: ReactNode;
  confirm?: string;
  confirmTitle?: string;
  confirmActionLabel?: string;
  confirmTone?: "danger" | "primary";
  disabled?: boolean;
  showLabel?: boolean;
};

export function ActionButton({ action, confirm, confirmTitle, confirmActionLabel, confirmTone, ...button }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const handleAction = () => {
    if (confirm) {
      setIsOpen(true);
    } else {
      startTransition(async () => {
        try {
          await action();
        } catch (error) {
          console.error("Action failed:", error);
        }
      });
    }
  };

  const handleConfirm = () => {
    startTransition(async () => {
      try {
        await action();
      } catch (error) {
        console.error("Action failed:", error);
      } finally {
        setIsOpen(false);
      }
    });
  };

  return (
    <Fragment>
      <button type="button" disabled={button.disabled || pending} aria-label={button.showLabel ? undefined : button.label} title={button.showLabel ? undefined : button.label} className={button.className} onClick={handleAction}>
        {pending ? <LoaderCircle className="size-4 animate-spin" /> : button.children}
        {button.showLabel && <span>{button.label}</span>}
      </button>

      {confirm && (
        <ConfirmDialog isOpen={isOpen} onClose={() => !pending && setIsOpen(false)} onConfirm={handleConfirm} title={confirmTitle} description={confirm} confirmLabel={confirmActionLabel} tone={confirmTone} pending={pending} />
      )}
    </Fragment>
  );
}
