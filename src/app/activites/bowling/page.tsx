import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ActivityFeature } from "@/components/sections/ActivityFeature";
import { CtaSection } from "@/components/sections/CtaSection";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getActivity } from "@/data/activities";
import { IMAGES } from "@/data/images";
import { getPrimaryAction } from "@/lib/contact-actions";

export const metadata: Metadata = {
  title: "Bowling à Oloron-Sainte-Marie — 4 pistes",
  description:
    "Le Jungle, le bowling d’Oloron-Sainte-Marie : 4 pistes pour une partie entre amis, en famille, un anniversaire ou un afterwork. Demandez votre réservation en ligne.",
  alternates: { canonical: "/activites/bowling" },
};

const OCCASIONS: { icon: IconName; title: string; text: string }[] = [
  { icon: "users", title: "Entre amis", text: "Le classique indémodable : une partie, une revanche, et on refait le match autour d’un verre." },
  { icon: "cake", title: "Anniversaires", text: "Pour les enfants, les ados ou les adultes, le bowling met tout le monde d’accord." },
  { icon: "briefcase", title: "Afterworks", text: "Décompresser entre collègues, sur les pistes puis autour d’une planche." },
  { icon: "star", title: "En famille", text: "Une sortie qui réunit toutes les générations, l’après-midi comme le soir." },
];

export default function BowlingPage() {
  const bowling = getActivity("bowling")!;
  const cta = getPrimaryAction();
  return (
    <>
      <PageHero
        eyebrow="Bowling Oloron"
        title={
          <>
            4 pistes, <span className="text-gold">zéro prise de tête</span>
          </>
        }
        lead="Le bowling du Jungle vous attend à Oloron-Sainte-Marie pour une partie entre amis, une sortie en famille, un anniversaire ou un afterwork."
        image={IMAGES.hero}
        crumbs={[
          { name: "Activités", href: "/activites" },
          { name: "Bowling", href: "/activites/bowling" },
        ]}
        actions={
          <ButtonLink href={cta.href} external={cta.external} size="lg" icon={cta.icon} iconPosition="left">
            {cta.label}
          </ButtonLink>
        }
      />

      <div className="bg-deep">
        <div className="container-jungle">
          <ActivityFeature activity={bowling} />
        </div>
      </div>

      <section className="section-y bg-night" aria-labelledby="occasions-title">
        <div className="container-jungle">
          <SectionTitle id="occasions-title" eyebrow="Pour toutes les occasions" title="Un strike pour chaque sortie" align="center" className="mx-auto" />
          <ul className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {OCCASIONS.map((o, i) => (
              <li key={o.title} className="flex gap-4 rounded-[1.5rem] border border-cream/10 bg-jungle-dark/60 p-5 sm:block sm:p-6" data-reveal style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}>
                <Icon name={o.icon} size={30} className="mt-0.5 shrink-0 text-gold" />
                <div>
                  <h3 className="text-xl font-semibold text-cream sm:mt-4 sm:text-2xl">{o.title}</h3>
                  <p className="mt-1 text-sm text-cream/75 sm:mt-2">{o.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-center text-sm text-cream/60">
            Tarifs, durée des parties et conditions : l’équipe vous renseigne quand vous la contactez pour réserver.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/groupes" variant="secondary" icon="arrow-right">
              Anniversaires & groupes
            </ButtonLink>
            <ButtonLink href="/faq" variant="ghost" icon="arrow-right">
              Questions fréquentes
            </ButtonLink>
          </div>
        </div>
      </section>

      <CtaSection title="Prêt pour le strike ?" />
    </>
  );
}
