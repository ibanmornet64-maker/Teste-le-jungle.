import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { DayTimeline } from "@/components/sections/DayTimeline";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Glow } from "@/components/decor/Foliage";
import { IMAGES } from "@/data/images";

export const metadata: Metadata = {
  title: "Le concept — un lieu pour manger, jouer et se retrouver",
  description:
    "Le Jungle à Oloron-Sainte-Marie : bowling, billard, fléchettes, pinsas, tapas, goûters, cocktails et soirées réunis dans une ambiance tropicale et conviviale.",
  alternates: { canonical: "/le-concept" },
};

const PILLARS: { icon: IconName; title: string; text: string }[] = [
  { icon: "pinsa", title: "Manger", text: "Pinsas, tapas, planches à partager, gaufres et smoothies : de quoi grignoter du goûter jusqu’au soir." },
  { icon: "bowling", title: "Jouer", text: "4 pistes de bowling, 3 billards et 2 postes de fléchettes pour se lancer des défis." },
  { icon: "users", title: "Se retrouver", text: "Entre amis, en famille ou entre collègues, autour d’une table ou d’une piste." },
];

export default function ConceptPage() {
  return (
    <>
      <PageHero
        eyebrow="Le concept"
        title={
          <>
            Manger. <span className="text-gold">Jouer.</span> Se retrouver.
          </>
        }
        lead={
          <p>
            Bienvenue au Jungle, votre nouveau lieu de vie à Oloron-Sainte-Marie. Venez manger, jouer et vous retrouver
            dans une ambiance tropicale et conviviale.
          </p>
        }
        image={IMAGES.hero}
        crumbs={[{ name: "Le concept", href: "/le-concept" }]}
      />

      <section className="section-y relative overflow-hidden bg-deep" aria-labelledby="piliers-title">
        <Glow color="orange" className="-top-40 right-0 size-[30rem] opacity-40" />
        <div className="container-jungle relative">
          <SectionTitle
            id="piliers-title"
            eyebrow="Trois envies, un seul lieu"
            title="Chacun crée sa propre expérience"
            intro="Bowling, billard, fléchettes, pinsas, tapas, goûters, cocktails et soirées : ici, pas de programme imposé. On passe pour un goûter, on reste pour une partie, on prolonge pour la soirée."
          />
          <ul className="mt-14 grid gap-5 md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <li
                key={p.title}
                className="relative overflow-hidden rounded-[1.75rem] border border-cream/10 bg-jungle-dark/60 p-8"
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
              >
                <span className="absolute -top-6 -right-4 font-display text-[7rem] leading-none font-semibold text-cream/[0.04]" aria-hidden>
                  0{i + 1}
                </span>
                <span className="flex size-14 items-center justify-center rounded-2xl bg-orange text-night">
                  <Icon name={p.icon} size={28} />
                </span>
                <h3 className="mt-6 text-3xl font-semibold text-cream">{p.title}</h3>
                <p className="mt-3 text-cream/75">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden bg-sand text-night" aria-labelledby="jour-nuit-title">
        <div className="container-jungle grid gap-12 py-20 md:py-28 lg:grid-cols-2 lg:items-center">
          <SectionTitle
            id="jour-nuit-title"
            tone="light"
            eyebrow="Deux ambiances"
            title="Familial le jour, festif le soir"
            intro={
              <div className="space-y-4">
                <p>
                  <strong className="text-deep">L’après-midi</strong>, Le Jungle accueille les familles et les copains
                  pour un goûter, une partie de bowling ou de billard.
                </p>
                <p>
                  <strong className="text-deep">Le soir</strong>, les lumières changent : cocktails, planches à partager,
                  soirées dansantes et afterworks prennent le relais.
                </p>
              </div>
            }
          />
          <div className="grid grid-cols-2 gap-4" data-reveal="fade">
            <figure className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem]">
              <Image src={IMAGES.gouter.src} alt={IMAGES.gouter.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-cream px-3 py-1 text-sm font-semibold text-deep">Le jour</figcaption>
            </figure>
            <figure className="relative mt-10 aspect-[3/4] overflow-hidden rounded-[1.75rem]">
              <Image src={IMAGES.soirees.src} alt={IMAGES.soirees.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-night px-3 py-1 text-sm font-semibold text-cream">Le soir</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <DayTimeline />

      <section className="bg-night pb-20" aria-label="Aller plus loin">
        <div className="container-jungle flex flex-col gap-3 sm:flex-row sm:justify-center">
          <ButtonLink href="/activites" icon="arrow-right">
            Voir les activités
          </ButtonLink>
          <ButtonLink href="/manger-boire" variant="secondary" icon="arrow-right">
            Voir la carte
          </ButtonLink>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
