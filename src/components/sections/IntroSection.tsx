import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Glow, Vine } from "@/components/decor/Foliage";
import { CONTACT, SITE } from "@/config/site";
import { IMAGES } from "@/data/images";

/** « Bienvenue dans la jungle » — présentation + images superposées + compteurs. */
export function IntroSection() {
  const stats = [
    { value: SITE.equipment.bowlingLanes, label: "pistes de bowling" },
    { value: SITE.equipment.billiards, label: "billards" },
    { value: SITE.equipment.dartboards, label: "postes de fléchettes" },
  ];

  return (
    <section id="bienvenue" aria-labelledby="bienvenue-title" className="section-y relative overflow-hidden bg-deep">
      <Glow color="leaf" className="top-10 -right-40 size-[36rem] opacity-50" />
      <Vine className="absolute top-0 left-[8%] hidden h-80 text-leaf/30 lg:block" />

      <div className="container-jungle relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Composition d'images */}
        <div className="relative order-2 lg:order-1" data-reveal="fade">
          <div className="img-zoom relative aspect-[4/5] w-[86%] overflow-hidden rounded-[2rem] ring-1 ring-cream/10 sm:aspect-[5/5]">
            <Image
              src={IMAGES.billard.src}
              alt={IMAGES.billard.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 86vw"
              className="object-cover"
            />
          </div>
          <div className="img-zoom absolute right-0 -bottom-10 aspect-square w-[48%] overflow-hidden rounded-[1.75rem] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.85)] ring-8 ring-deep">
            <Image
              src={IMAGES.cocktails.src}
              alt={IMAGES.cocktails.alt}
              fill
              sizes="(min-width: 1024px) 22vw, 48vw"
              className="object-cover"
            />
          </div>
          {CONTACT.hoursVisible && (
            <div className="absolute top-6 right-2 flex size-28 rotate-[8deg] flex-col items-center justify-center rounded-full bg-gold text-center text-night shadow-xl sm:right-6 sm:size-32">
              <span className="text-[0.62rem] font-bold uppercase tracking-[0.18em]">Tous les jours</span>
              <span className="font-display text-2xl leading-tight font-semibold sm:text-[1.7rem]">15 h</span>
              <span className="text-xs font-semibold">jusqu’à minuit</span>
            </div>
          )}
        </div>

        {/* Texte */}
        <div className="order-1 lg:order-2">
          <SectionTitle
            id="bienvenue-title"
            eyebrow="Le Jungle"
            title={
              <>
                Bienvenue dans <span className="text-gold">la jungle</span>
              </>
            }
            intro={
              <p>
                Le Jungle est un lieu de vie à Oloron-Sainte-Marie où l’on vient pour jouer, manger, boire un verre et
                passer un bon moment. Bowling, billard, fléchettes, gourmandises, cocktails et soirées se retrouvent
                dans une ambiance tropicale et conviviale.
              </p>
            }
          />

          <dl className="mt-10 grid grid-cols-3 gap-3 sm:gap-4" data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-cream/10 bg-jungle-dark/60 p-4 sm:p-5">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-5xl leading-none font-semibold text-gold sm:text-6xl">
                    <CountUp value={s.value} />
                  </span>
                  <span className="mt-2 block text-xs leading-snug text-cream/75 sm:text-sm" aria-hidden>
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap gap-3" data-reveal style={{ ["--reveal-delay" as string]: "200ms" }}>
            <ButtonLink href="/le-concept" variant="secondary" icon="arrow-right">
              Découvrir le concept
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
