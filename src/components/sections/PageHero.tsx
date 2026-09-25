import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Glow, MonsteraLeaf, PalmFrond } from "@/components/decor/Foliage";
import { BowlingDots } from "@/components/decor/Foliage";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import type { SiteImage } from "@/data/images";
import { breadcrumbSchema } from "@/lib/schema";
import { cn } from "@/lib/format";

type Crumb = { name: string; href: string };

type Props = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  image?: SiteImage | null;
  crumbs?: Crumb[];
  actions?: ReactNode;
  accent?: "orange" | "purple" | "coral" | "gold";
  children?: ReactNode;
  compact?: boolean;
};

/** En-tête immersif des pages intérieures (fil d'Ariane + données structurées). */
export function PageHero({ eyebrow, title, lead, image, crumbs = [], actions, accent = "orange", children, compact }: Props) {
  const trail = [{ name: "Accueil", href: "/" }, ...crumbs];
  return (
    <section
      className={cn(
        "grain relative isolate flex items-end overflow-hidden bg-deep",
        compact ? "min-h-[48svh]" : "min-h-[68svh] md:min-h-[72svh]",
      )}
    >
      {image && (
        <div className="animate-slow-zoom absolute inset-0 -z-30">
          <Image src={image.src} alt="" fill preload sizes="100vw" className="object-cover" />
        </div>
      )}
      <div aria-hidden className="absolute inset-0 -z-20 bg-night/45" />
      <div aria-hidden className="absolute inset-0 -z-20 bg-gradient-to-t from-deep via-deep/55 to-night/40" />
      <div aria-hidden className="absolute inset-0 -z-20 bg-gradient-to-r from-night/80 via-night/30 to-transparent" />
      <Glow color={accent} className="animate-drift -bottom-48 -left-40 -z-10 size-[36rem] opacity-60" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <PalmFrond
          className="animate-sway absolute -top-24 -right-16 h-[24rem] rotate-[215deg] text-night/85 md:h-[30rem]"
          style={{ ["--origin" as string]: "50% 100%", ["--sway-duration" as string]: "12s" }}
        />
        <MonsteraLeaf className="absolute -bottom-20 -left-24 hidden size-[20rem] rotate-[30deg] text-night/80 md:block" />
      </div>

      <div className="container-jungle relative pt-32 pb-14 md:pt-40 md:pb-20">
        {crumbs.length > 0 && (
          <>
            <nav aria-label="Fil d’Ariane" className="animate-fade mb-6 text-sm text-cream/70">
              <ol className="flex flex-wrap items-center gap-1.5">
                {trail.map((c, i) => (
                  <li key={c.href} className="inline-flex items-center gap-1.5">
                    {i > 0 && <Icon name="chevron-right" size={14} className="text-cream/40" />}
                    {i === trail.length - 1 ? (
                      <span aria-current="page" className="text-cream">
                        {c.name}
                      </span>
                    ) : (
                      <Link href={c.href} className="hover:text-gold">
                        {c.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
            <JsonLd data={breadcrumbSchema(trail)} />
          </>
        )}
        <div className="grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="max-w-3xl">
            <p className="animate-rise mb-4 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              <BowlingDots /> {eyebrow}
            </p>
            <h1
              className="animate-rise text-glow text-[2.7rem] leading-[0.98] font-semibold text-cream sm:text-6xl md:text-7xl"
              style={{ ["--delay" as string]: "120ms" }}
            >
              {title}
            </h1>
            {lead && (
              <div
                className="animate-rise mt-6 max-w-2xl text-base leading-relaxed text-cream/85 text-shadow-soft md:text-lg"
                style={{ ["--delay" as string]: "240ms" }}
              >
                {lead}
              </div>
            )}
            {actions && (
              <div className="animate-rise mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={{ ["--delay" as string]: "360ms" }}>
                {actions}
              </div>
            )}
          </div>
          {children && (
            <div className="animate-rise" style={{ ["--delay" as string]: "420ms" }}>
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
