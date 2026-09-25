import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Parallax } from "@/components/ui/Parallax";
import { Glow, MonsteraLeaf, PalmFrond, SimpleLeaf } from "@/components/decor/Foliage";
import { CONTACT, SITE } from "@/config/site";
import { IMAGES } from "@/data/images";
import { getReservationCta } from "@/lib/reservation";

const d = (ms: number) => ({ ["--delay" as string]: `${ms}ms` });

/** Hero immersif de la page d'accueil. */
export function Hero() {
  const cta = getReservationCta();
  const img = IMAGES.hero;

  return (
    <section
      aria-labelledby="hero-title"
      className="grain relative isolate flex min-h-[100svh] items-end overflow-hidden bg-night md:items-center"
    >
      {/* Image de fond + parallax + zoom lent */}
      <Parallax speed={0.28} className="absolute inset-0 -z-30">
        <div className="animate-slow-zoom absolute inset-0">
          <Image
            src={img.src}
            alt={img.alt}
            fill
            preload
            fetchPriority="high"
            quality={80}
            sizes="100vw"
            className="object-cover object-[60%_center]"
          />
        </div>
      </Parallax>

      {/* Voiles sombres pour la lisibilité */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-night/25" />
      <div aria-hidden className="absolute inset-0 -z-20 bg-gradient-to-t from-deep via-deep/45 to-night/30" />
      <div aria-hidden className="absolute inset-0 -z-20 bg-gradient-to-r from-night/85 via-night/35 to-transparent" />

      {/* Lueurs colorées (dégradés, sans filtre coûteux) */}
      <Glow color="orange" className="animate-drift -bottom-40 -left-32 -z-10 size-[38rem] opacity-70" />
      <Glow
        color="purple"
        className="animate-drift top-[-10%] right-[-10%] -z-10 size-[34rem] opacity-60"
        style={{ ["--drift-x" as string]: "-40px", ["--drift-y" as string]: "30px", ["--drift-duration" as string]: "22s" }}
      />
      <Glow color="gold" className="animate-drift top-1/3 left-1/3 -z-10 size-[20rem] opacity-25" />

      {/* Feuillage en silhouette, animé lentement */}
      <Parallax speed={-0.06} className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute -top-16 -left-20 md:-left-10">
          <PalmFrond
            className="animate-sway h-[22rem] w-auto rotate-[140deg] text-night/90 md:h-[34rem]"
            style={{ ["--origin" as string]: "50% 100%", ["--sway-duration" as string]: "11s" }}
          />
        </div>
        <div className="absolute -top-24 right-[-4rem] hidden md:block">
          <PalmFrond
            className="animate-sway h-[30rem] w-auto rotate-[215deg] text-deep/90"
            style={{ ["--origin" as string]: "50% 100%", ["--sway-duration" as string]: "13s", ["--sway-from" as string]: "2deg", ["--sway-to" as string]: "-2deg" }}
          />
        </div>
        <div className="absolute -right-24 -bottom-24 md:-right-16 md:-bottom-28">
          <MonsteraLeaf
            className="animate-sway size-[16rem] -rotate-[25deg] text-night/85 md:size-[26rem]"
            style={{ ["--origin" as string]: "80% 90%", ["--sway-duration" as string]: "12s" }}
          />
        </div>
        <SimpleLeaf className="animate-sway absolute bottom-[30%] left-[46%] hidden size-10 rotate-12 text-leaf/50 lg:block" />
      </Parallax>

      {/* Contenu */}
      <div className="container-jungle relative pt-32 pb-28 md:pt-40 md:pb-32">
        <div className="max-w-3xl">
          <p
            className="animate-rise mb-6 inline-flex items-center gap-2 rounded-full border border-cream/20 bg-night/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cream/90 backdrop-blur-md"
            style={d(100)}
          >
            <Icon name="map-pin" size={14} className="text-gold" />
            Oloron-Sainte-Marie · Béarn
          </p>

          <h1 id="hero-title" className="animate-rise text-glow font-display leading-[0.9] font-semibold text-cream" style={d(220)}>
            <span className="block text-[1.7rem] font-medium tracking-wide text-gold md:text-4xl">Le</span>
            <span className="block text-[5.2rem] tracking-[-0.03em] sm:text-[7rem] md:text-[9.5rem] lg:text-[11rem]">
              Jungle
            </span>
            <span className="sr-only"> — bowling, billard, fléchettes et bar à Oloron-Sainte-Marie</span>
          </h1>

          <p className="animate-rise mt-8 font-display text-2xl font-medium text-cream sm:text-3xl md:text-4xl" style={d(420)}>
            Manger. <span className="text-gold">Jouer.</span> Se retrouver.
          </p>

          <p className="animate-rise mt-4 max-w-xl text-base leading-relaxed text-cream/85 text-shadow-soft md:text-lg" style={d(540)}>
            {SITE.shortPitch}
          </p>

          <div className="animate-rise mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={d(680)}>
            <ButtonLink href={cta.href} external={cta.external} size="lg" icon="calendar" iconPosition="left" ariaLabel={cta.label}>
              {cta.shortLabel}
            </ButtonLink>
            <ButtonLink href="/activites" variant="secondary" size="lg" icon="arrow-right">
              Explorer les activités
            </ButtonLink>
          </div>

          {CONTACT.hoursVisible && (
            <p className="animate-fade mt-7 inline-flex items-center gap-2.5 text-sm text-cream/80" style={d(900)}>
              <span className="relative flex size-2.5" aria-hidden>
                <span className="absolute inline-flex size-full rounded-full bg-gold opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex size-2.5 rounded-full bg-gold" />
              </span>
              Ouvert tous les jours de 15 h à 00 h
            </p>
          )}
        </div>
      </div>

      {/* Indication de défilement */}
      <a
        href="#bienvenue"
        className="animate-fade absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-cream/70 hover:text-cream md:flex"
        style={d(1200)}
      >
        Découvrir Le Jungle
        <span className="flex h-10 w-6 justify-center rounded-full border border-cream/40 pt-2" aria-hidden>
          <span className="animate-scroll-cue block h-2 w-1 rounded-full bg-gold" />
        </span>
      </a>
    </section>
  );
}
