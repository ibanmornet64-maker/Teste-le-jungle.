"use client";

import { useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useFocusTrap } from "@/lib/use-focus-trap";
import { cn } from "@/lib/format";
import { Icon } from "./Icon";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
};

/** Dialogue accessible : focus piégé, Échap, clic sur le fond, titre annoncé. */
export function Modal({ open, onClose, title, children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const titleId = useId();
  useFocusTrap(ref, open, onClose);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-3 sm:items-center sm:p-6">
      <div className="absolute inset-0 animate-fade bg-night/80 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          "relative max-h-[90svh] w-full max-w-lg animate-rise overflow-y-auto rounded-3xl border border-cream/10 bg-deep p-6 text-cream shadow-2xl sm:p-8",
          className,
        )}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-2xl font-semibold">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-cream/15 hover:bg-cream/10"
            aria-label="Fermer"
          >
            <Icon name="close" size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
}
