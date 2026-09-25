"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { GalleryItem } from "@/data/gallery";
import { useFocusTrap } from "@/lib/use-focus-trap";
import { Icon } from "./Icon";

type Props = {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
};

/** Visionneuse accessible : flèches clavier, balayage tactile, Échap. */
export function Lightbox({ items, index, onClose, onChange }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const open = index !== null;
  useFocusTrap(ref, open, onClose);

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onChange((index + dir + items.length) % items.length);
    },
    [index, items.length, onChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  if (!open || typeof document === "undefined") return null;
  const item = items[index];

  return createPortal(
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={`Galerie photo — ${item.caption}`}
      className="fixed inset-0 z-[80] flex animate-fade flex-col bg-night/96 backdrop-blur-md"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 text-sm text-cream/75 md:px-8 md:py-5">
        <span aria-live="polite">
          {index + 1} / {items.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          data-autofocus
          className="inline-flex size-12 items-center justify-center rounded-full border border-cream/20 text-cream hover:bg-cream/10"
          aria-label="Fermer la galerie"
        >
          <Icon name="close" size={22} />
        </button>
      </div>

      <div className="relative flex-1">
        <Image
          key={item.image.src}
          src={item.image.src}
          alt={item.image.alt}
          fill
          sizes="100vw"
          className="animate-fade object-contain px-2 md:px-20"
        />
        <button
          type="button"
          onClick={() => go(-1)}
          className="absolute top-1/2 left-2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-night/70 text-cream ring-1 ring-cream/20 hover:bg-deep md:left-6"
          aria-label="Photo précédente"
        >
          <Icon name="chevron-left" size={24} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="absolute top-1/2 right-2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-night/70 text-cream ring-1 ring-cream/20 hover:bg-deep md:right-6"
          aria-label="Photo suivante"
        >
          <Icon name="chevron-right" size={24} />
        </button>
      </div>

      <div className="px-4 py-5 text-center md:py-7">
        <p className="font-display text-lg font-medium text-cream">{item.caption}</p>
        {item.image.temporary && <p className="mt-1 text-xs text-cream/50">Visuel d’illustration</p>}
      </div>
    </div>,
    document.body,
  );
}
