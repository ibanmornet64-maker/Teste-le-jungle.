import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Glow, MonsteraLeaf, PalmFrond } from "@/components/decor/Foliage";
import { SITE, directionsUrl } from "@/config/site";
import { IMAGES } from "@/data/images";
import { getReservationCta } from "@/lib/reservation";

/** Grand appel à l'action « Prêt à entrer dans la jungle ? » */
export function CtaSection({ title = "Prêt à entrer dans la jungle ?" }: { title?: string }) {
  const cta = getReservationCta();
  return (
    <section aria-labelledby="cta-title" className="grain relative isolate overflow-hidden bg-night py-28 md:py-40">
      <Image src={IMAGES.soirees.src} alt="" fill sizes="100vw" className="-z-30 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-20 bg-night/70" />
      <div aria-hidden className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-night)_85%)]" />
      <Glow color="orange" className="animate-drift top-1/2 left-1/2 -z-10 size-[40rem] -translate-x-1/2 -translate-y-1/2 opacity-50" />
      <Glow color="lime" className="animate-drift -top-20 -right-20 -z-10 size-[30rem] opacity-60" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <PalmFrond
          className="animate-sway absolute -top-10 -left-20 h-[26rem] rotate-[130deg] text-night md:h-[36rem]"
          style={{ ["--origin" as string]: "50% 100%" }}
        />
        <MonsteraLeaf
          className="animate-sway absolute -right-24 -bottom-24 size-[20rem] -rotate-12 text-night md:size-[30rem]"
          style={{ ["--origin" as string]: "80% 90%", ["--sway-duration" as string]: "14s" }}
        />
      </div>

      <div className="container-jungle relative text-center">
        <h2 id="cta-title" className="text-glow mx-auto max-w-4xl text-5xl leading-[0.95] font-semibold text-cream sm:text-6xl md:text-8xl" data-reveal>
          {title}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-cream/85" data-reveal style={{ ["--reveal-delay" as string]: "100ms" }}>
          {SITE.tagline} On vous attend au 57 rue Carrerot.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap" data-reveal style={{ ["--reveal-delay" as string]: "200ms" }}>
          <ButtonLink href={cta.href} external={cta.external} size="lg" icon="calendar" iconPosition="left" ariaLabel={cta.label}>
            {cta.shortLabel}
          </ButtonLink>
          <ButtonLink href={directionsUrl} variant="secondary" size="lg" icon="route" iconPosition="left" ariaLabel="Voir l’itinéraire">
            Voir l’itinéraire
          </ButtonLink>
          <ButtonLink href={SITE.social.instagram.url} variant="secondary" size="lg" icon="instagram" iconPosition="left" ariaLabel="Nous suivre sur Instagram">
            Nous suivre sur Instagram
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
