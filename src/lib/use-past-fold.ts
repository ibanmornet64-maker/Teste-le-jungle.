"use client";

import { useSyncExternalStore } from "react";

const subscribe = (onChange: () => void) => {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
};

/**
 * `true` une fois la page défilée au-delà de `ratio` × hauteur d'écran.
 * Partagé par le header et la barre d'actions mobile pour que le bouton de
 * contact « passe » de l'un à l'autre, sans jamais apparaître en double.
 */
export function usePastFold(ratio = 0.6): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > window.innerHeight * ratio,
    () => false,
  );
}
