"use client";

import { useState } from "react";
import { cn } from "@/lib/format";
import { Icon } from "./Icon";

/** Partage natif (mobile) ou copie du lien (ordinateur). */
export function ShareButton({ title, path, className }: { title: string; path: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = new URL(path, window.location.origin).toString();
    try {
      if (navigator.share) {
        await navigator.share({ title: `${title} — Le Jungle`, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* partage annulé par l'utilisateur */
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      className={cn(
        "inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-sm font-medium text-cream/80 transition-colors hover:bg-cream/10 hover:text-cream",
        className,
      )}
      aria-label={`Partager : ${title}`}
    >
      <Icon name={copied ? "check" : "share"} size={18} />
      <span aria-live="polite">{copied ? "Lien copié" : "Partager"}</span>
    </button>
  );
}
