import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { ActivityFeature } from "@/components/sections/ActivityFeature";
import { CtaSection } from "@/components/sections/CtaSection";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { LaneLines } from "@/components/decor/Foliage";
import { visibleActivities } from "@/data/activities";
import { IMAGES } from "@/data/images";
import { getPrimaryAction } from "@/lib/contact-actions";

export const metadata: Metadata = {
  title: "Activités — bowling, billard et fléchettes à Oloron",
  description:
    "Bowling (4 pistes), billard (3 tables), fléchettes (2 postes) et soirées au Jungle, à Oloron-Sainte-Marie. Une sortie idéale entre amis, en famille ou entre collègues.",
  alternates: { canonical: "/activites" },
};

export default function ActivitiesPage() {
  const cta = getPrimaryAction();
  return (
    <>
      <PageHero
        eyebrow="Activités"
        title={
          <>
            Jouez, défiez, <span className="text-gold">recommencez</span>
          </>
        }
        lead="Bowling, billard, fléchettes et soirées : toutes les activités du Jungle, au même endroit, à Oloron-Sainte-Marie."
        image={IMAGES.bowling}
        crumbs={[{ name: "Activités", href: "/activites" }]}
        actions={
          <>
            <ButtonLink href={cta.href} external={cta.external} size="lg" icon={cta.icon} iconPosition="left">
              {cta.label}
            </ButtonLink>
            <ButtonLink href="/groupes" variant="secondary" size="lg" icon="arrow-right">
              Venir en groupe
            </ButtonLink>
          </>
        }
      />

      {/* Sommaire rapide */}
      <nav aria-label="Aller à une activité" className="sticky top-[4.25rem] z-20 border-b border-cream/10 bg-deep/90 backdrop-blur-xl">
        <ul className="container-jungle no-scrollbar flex gap-2 overflow-x-auto py-3 max-sm:[mask-image:linear-gradient(to_right,black_85%,transparent)]">
          {visibleActivities.map((a) => (
            <li key={a.slug}>
              <Link
                href={`#${a.slug}`}
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-cream/15 px-4 text-sm font-medium whitespace-nowrap text-cream/85 transition-colors hover:border-gold hover:text-gold"
              >
                <Icon name={a.icon} size={18} /> {a.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="relative overflow-hidden bg-deep">
        <LaneLines className="absolute inset-x-0 top-10 h-24 w-full text-leaf/30" />
        <div className="container-jungle relative py-6 md:py-10">
          {visibleActivities.map((a, i) => (
            <ActivityFeature key={a.slug} activity={a} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>

      <CtaSection title="On se fait une partie ?" />
    </>
  );
}
