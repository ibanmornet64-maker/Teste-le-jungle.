import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { Icon } from "@/components/ui/Icon";
import { BowlingDots, Glow } from "@/components/decor/Foliage";
import type { Activity } from "@/data/activities";
import { cn } from "@/lib/format";
import { getReservationCta } from "@/lib/reservation";

/**
 * Présentation détaillée d'une activité : grande image, description,
 * équipements, public, ambiance, durée et tarif (si confirmés), réservation.
 */
export function ActivityFeature({
  activity,
  reverse = false,
  headingLevel = "h2",
}: {
  activity: Activity;
  reverse?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const cta = getReservationCta();
  const H = headingLevel;
  const isEvening = activity.slug === "soirees";

  return (
    <article id={activity.slug} className="relative py-14 md:py-20" aria-labelledby={`${activity.slug}-title`}>
      <div className={cn("grid items-center gap-10 lg:grid-cols-2 lg:gap-16", reverse && "lg:[&>*:first-child]:order-2")}>
        <div className="relative" data-reveal="fade">
          <Glow color={isEvening ? "purple" : "orange"} className="-bottom-20 -left-20 size-[24rem] opacity-40" />
          <div className="img-zoom relative aspect-[4/3] overflow-hidden rounded-[2rem] ring-1 ring-cream/10">
            {activity.image ? (
              <Image
                src={activity.image.src}
                alt={activity.image.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="dot-pattern flex size-full items-center justify-center bg-gradient-to-br from-leaf to-deep">
                <Icon name={activity.icon} size={120} className="text-cream/30" />
              </div>
            )}
          </div>
          {activity.count !== null && (
            <div className="absolute -right-2 -bottom-6 rounded-3xl bg-gold px-6 py-4 text-night shadow-2xl md:right-6">
              <span className="block font-display text-5xl leading-none font-semibold">
                <CountUp value={activity.count} />
              </span>
              <span className="text-sm font-semibold">{activity.countLabel}</span>
            </div>
          )}
        </div>

        <div data-reveal>
          <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            <BowlingDots /> {activity.tagline}
          </p>
          <H id={`${activity.slug}-title`} className="mt-3 text-4xl font-semibold text-cream md:text-6xl">
            {activity.name}
          </H>
          <p className="mt-5 text-lg leading-relaxed text-cream/85">{activity.description}</p>

          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-cream/10 bg-jungle-dark/50 p-5">
              <dt className="flex items-center gap-2 text-sm font-semibold text-gold">
                <Icon name="users" size={18} /> Pour qui ?
              </dt>
              <dd className="mt-2 text-sm text-cream/80">{activity.audience.join(" · ")}</dd>
            </div>
            <div className="rounded-2xl border border-cream/10 bg-jungle-dark/50 p-5">
              <dt className="flex items-center gap-2 text-sm font-semibold text-gold">
                <Icon name="sparkles" size={18} /> Ambiance
              </dt>
              <dd className="mt-2 text-sm text-cream/80">{activity.ambiance}</dd>
            </div>
            {activity.duration && (
              <div className="rounded-2xl border border-cream/10 bg-jungle-dark/50 p-5">
                <dt className="flex items-center gap-2 text-sm font-semibold text-gold">
                  <Icon name="clock" size={18} /> Durée indicative
                </dt>
                <dd className="mt-2 text-sm text-cream/80">{activity.duration}</dd>
              </div>
            )}
            {activity.price && (
              <div className="rounded-2xl border border-cream/10 bg-jungle-dark/50 p-5">
                <dt className="flex items-center gap-2 text-sm font-semibold text-gold">
                  <Icon name="ticket" size={18} /> Tarif
                </dt>
                <dd className="mt-2 text-sm text-cream/80">{activity.price}</dd>
              </div>
            )}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            {isEvening ? (
              <ButtonLink href="/evenements" icon="arrow-right">
                Voir les événements
              </ButtonLink>
            ) : (
              <ButtonLink href={cta.href} external={cta.external} icon="calendar" iconPosition="left">
                {cta.label}
              </ButtonLink>
            )}
            {headingLevel === "h2" && activity.href !== "/evenements" && !activity.href.includes("#") && (
              <ButtonLink href={activity.href} variant="secondary" icon="arrow-right">
                En savoir plus
              </ButtonLink>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
