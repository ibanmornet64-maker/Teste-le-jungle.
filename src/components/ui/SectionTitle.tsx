import type { ReactNode } from "react";
import { cn } from "@/lib/format";
import { BowlingDots } from "@/components/decor/Foliage";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2" | "h3";
  className?: string;
  id?: string;
};

/**
 * Titre de section : sur-titre (avec motif boule de bowling), titre, intro.
 * tone="dark" = section sur fond sombre (texte clair), "light" = fond sable.
 */
export function SectionTitle({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  as: Tag = "h2",
  className,
  id,
}: Props) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
      data-reveal
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-4 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em]",
            tone === "dark" ? "text-gold" : "text-jungle-dark",
          )}
        >
          <BowlingDots />
          {eyebrow}
        </p>
      )}
      <Tag
        id={id}
        className={cn(
          "text-[2.1rem] leading-[1.05] font-semibold sm:text-5xl md:text-[3.4rem]",
          tone === "dark" ? "text-cream" : "text-deep",
        )}
      >
        {title}
      </Tag>
      {intro && (
        <div
          className={cn(
            "mt-5 text-base leading-relaxed md:text-lg",
            tone === "dark" ? "text-cream/78" : "text-night/80",
          )}
        >
          {intro}
        </div>
      )}
    </div>
  );
}
