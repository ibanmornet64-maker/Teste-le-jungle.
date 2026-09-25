"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Observe tous les éléments [data-reveal] et ajoute .is-visible à l'entrée
 * dans le viewport. Un seul observer pour toute la page (performant).
 * Sans JS ou avec prefers-reduced-motion, le contenu reste visible (CSS).
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
