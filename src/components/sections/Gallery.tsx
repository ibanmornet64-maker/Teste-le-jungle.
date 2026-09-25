"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Lightbox } from "@/components/ui/Lightbox";
import type { GalleryItem } from "@/data/gallery";
import { cn } from "@/lib/format";

const spans: Record<GalleryItem["span"], string> = {
  normal: "",
  tall: "row-span-2",
  wide: "col-span-2",
  big: "col-span-2 row-span-2",
};

/** Mosaïque asymétrique + ouverture en lightbox. */
export function Gallery({ items, className }: { items: GalleryItem[]; className?: string }) {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <ul
        className={cn(
          "grid grid-flow-dense grid-cols-2 gap-3 [grid-auto-rows:9.5rem] sm:[grid-auto-rows:12rem] md:grid-cols-4 md:gap-4 lg:[grid-auto-rows:14rem]",
          className,
        )}
      >
        {items.map((item, i) => (
          <li
            key={item.image.src + i}
            className={cn("relative", spans[item.span])}
            data-reveal="zoom"
            style={{ ["--reveal-delay" as string]: `${(i % 4) * 70}ms` }}
          >
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group img-zoom relative block size-full overflow-hidden rounded-2xl bg-jungle-dark md:rounded-3xl"
              aria-label={`Agrandir la photo : ${item.caption}`}
            >
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes={item.span === "big" || item.span === "wide" ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                className="object-cover"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-night/75 via-night/0 to-night/0 opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 text-left md:p-4">
                <span className="text-sm font-semibold text-cream text-shadow-soft md:text-base">{item.caption}</span>
                <span className="hidden size-9 shrink-0 items-center justify-center rounded-full bg-cream/15 text-cream backdrop-blur-md transition-transform duration-500 group-hover:scale-110 sm:inline-flex">
                  <Icon name="expand" size={16} />
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <Lightbox items={items} index={index} onClose={() => setIndex(null)} onChange={setIndex} />
    </>
  );
}
