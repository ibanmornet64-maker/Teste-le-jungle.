/**
 * Zone logo.
 * - Si un logo officiel est disponible (fichier dans /public/brand/ ou
 *   DATA_TO_CONFIRM.officialLogo) :
 *   badge « Le Jungle Café » + nom en toutes lettres (lisible même en petit).
 * - Sinon : logo texte TEMPORAIRE (feuille + « Le Jungle »), qui n'est pas un logo officiel.
 */
import Image from "next/image";
import { getBrandLogo } from "@/lib/brand";
import { cn } from "@/lib/format";

type Props = {
  /** light = pour fond sombre (texte clair) ; dark = pour fond clair */
  tone?: "light" | "dark";
  /** Version réduite : badge seul (menu mobile, petits écrans) */
  compact?: boolean;
  /** md = header ; lg = footer */
  size?: "md" | "lg";
  className?: string;
};

function LeafMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden focusable="false">
      <path d="M28 4C15 4 5 11 5 21.5c0 2.6.8 4.6 1.7 6.5C18 28 28 20 28 4Z" fill="var(--color-orange)" />
      <path d="M6.7 28C11 21.5 16.5 15.5 24 9.5" stroke="var(--color-deep)" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function Wordmark({ tone, subline }: { tone: "light" | "dark"; subline: string }) {
  return (
    <span className="flex flex-col">
      <span
        className={cn(
          "font-display text-[1.45rem] font-semibold tracking-tight md:text-[1.6rem]",
          tone === "light" ? "text-cream" : "text-deep",
        )}
      >
        <span className="mr-[0.12em] align-[0.35em] text-[0.62em] font-medium opacity-90">Le</span>
        Jungle
      </span>
      <span
        className={cn(
          "mt-0.5 text-[0.6rem] font-semibold tracking-[0.32em] uppercase",
          tone === "light" ? "text-gold/90" : "text-jungle-dark",
        )}
      >
        {subline}
      </span>
    </span>
  );
}

export function Logo({ tone = "light", compact = false, size = "md", className }: Props) {
  const official = getBrandLogo();

  if (official) {
    return (
      <span className={cn("inline-flex items-center gap-3 leading-none", className)}>
        <Image
          src={official.src}
          width={official.width}
          height={official.height}
          // Nom écrit à côté : l'image devient décorative, sauf en version compacte.
          alt={compact ? "Le Jungle Café" : ""}
          sizes={size === "lg" ? "96px" : "56px"}
          quality={80}
          className={cn(
            "shrink-0 rounded-xl bg-deep object-contain shadow-[0_8px_24px_-10px_rgb(0_0_0/0.8)] ring-1 ring-gold/25",
            size === "lg" ? "size-20 rounded-2xl" : "size-11 md:size-12",
          )}
        />
        {!compact && <Wordmark tone={tone} subline="Café · Oloron" />}
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-2.5 leading-none", className)}>
      <LeafMark className="size-8 shrink-0 md:size-9" />
      {compact ? (
        <span className={cn("font-display text-[1.45rem] font-semibold tracking-tight", tone === "light" ? "text-cream" : "text-deep")}>
          <span className="mr-[0.12em] align-[0.35em] text-[0.62em] font-medium opacity-90">Le</span>
          Jungle
        </span>
      ) : (
        <Wordmark tone={tone} subline="Oloron-Sainte-Marie" />
      )}
    </span>
  );
}
