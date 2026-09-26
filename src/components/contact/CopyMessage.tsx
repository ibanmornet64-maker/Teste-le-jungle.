"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/format";

/**
 * Message type à copier en un clic, pour le coller ensuite dans Instagram,
 * un SMS ou un email. Tout se passe dans le navigateur : rien n'est envoyé.
 */
export function CopyMessage({ text, className }: { text: string; className?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("error");
    }
    window.setTimeout(() => setState("idle"), 3000);
  }

  return (
    <div className={cn("rounded-[1.5rem] border border-cream/12 bg-deep/70 p-5 md:p-6", className)}>
      <p className="text-xs font-bold tracking-[0.2em] text-gold uppercase">Message type</p>
      <p className="mt-3 text-sm leading-relaxed whitespace-pre-line text-cream/85 select-all">{text}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={copy}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-cream/25 px-5 text-sm font-semibold text-cream transition-colors hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <Icon name={state === "copied" ? "check" : "copy"} size={18} />
          {state === "copied" ? "Copié !" : "Copier le message"}
        </button>
        <span role="status" aria-live="polite" className="text-xs text-cream/60">
          {state === "copied" && "Collez-le dans votre message Instagram, SMS ou email."}
          {state === "error" && "Copie impossible : sélectionnez le texte ci-dessus pour le copier."}
        </span>
      </div>
    </div>
  );
}
