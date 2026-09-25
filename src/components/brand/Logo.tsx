/**
 * Zone logo.
 * - Si un logo officiel est renseigné dans DATA_TO_CONFIRM.officialLogo,
 *   il est affiché (versions claire / sombre / compacte).
 * - Sinon : wordmark TEMPORAIRE typographique (ce n'est pas un logo officiel).
 */
import Image from "next/image";
import { DATA_TO_CONFIRM } from "@/config/data-to-confirm";
import { cn } from "@/lib/format";

type Props = {
  /** light = pour fond sombre (texte clair) ; dark = pour fond clair */
  tone?: "light" | "dark";
  compact?: boolean;
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

export function Logo({ tone = "light", compact = false, className }: Props) {
  const official = DATA_TO_CONFIRM.officialLogo;
  if (official) {
    const src = compact ? official.compact : tone === "light" ? official.light : official.dark;
    return (
      <Image
        src={src}
        alt="Le Jungle"
        width={compact ? 120 : 180}
        height={compact ? 40 : 60}
        className={cn("h-10 w-auto", className)}
      />
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-2.5 leading-none", className)}>
      <LeafMark className="size-8 shrink-0 md:size-9" />
      <span className="flex flex-col">
        <span
          className={cn(
            "font-display text-[1.45rem] font-semibold tracking-tight md:text-[1.6rem]",
            tone === "light" ? "text-cream" : "text-deep",
          )}
        >
          <span className="mr-[0.12em] text-[0.62em] font-medium align-[0.35em] opacity-90">Le</span>
          Jungle
        </span>
        {!compact && (
          <span
            className={cn(
              "mt-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.32em]",
              tone === "light" ? "text-gold/90" : "text-jungle-dark",
            )}
          >
            Oloron-Sainte-Marie
          </span>
        )}
      </span>
    </span>
  );
}
