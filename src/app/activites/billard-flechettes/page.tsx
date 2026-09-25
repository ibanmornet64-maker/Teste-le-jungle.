import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ActivityFeature } from "@/components/sections/ActivityFeature";
import { CtaSection } from "@/components/sections/CtaSection";
import { ButtonLink } from "@/components/ui/Button";
import { getActivity } from "@/data/activities";
import { IMAGES } from "@/data/images";

export const metadata: Metadata = {
  title: "Billard et fléchettes à Oloron-Sainte-Marie",
  description:
    "3 billards et 2 postes de fléchettes au Jungle, à Oloron-Sainte-Marie : prolongez la soirée entre amis, un verre à la main.",
  alternates: { canonical: "/activites/billard-flechettes" },
};

export default function BilliardDartsPage() {
  const billard = getActivity("billard")!;
  const flechettes = getActivity("flechettes")!;
  const extras = [getActivity("baby-foot")!, getActivity("photomaton")!].filter((a) => a.visible);

  return (
    <>
      <PageHero
        eyebrow="Billard & fléchettes"
        title={
          <>
            Le bon coup, <span className="text-gold">la bonne cible</span>
          </>
        }
        lead="3 billards et 2 postes de fléchettes pour prolonger la soirée entre deux parties de bowling ou autour d’un verre."
        image={IMAGES.billard}
        crumbs={[
          { name: "Activités", href: "/activites" },
          { name: "Billard & fléchettes", href: "/activites/billard-flechettes" },
        ]}
        actions={
          <>
            <ButtonLink href="#billard" size="lg" variant="secondary" icon="arrow-down">
              Billard
            </ButtonLink>
            <ButtonLink href="#flechettes" size="lg" variant="secondary" icon="arrow-down">
              Fléchettes
            </ButtonLink>
          </>
        }
      />
      <div className="bg-deep">
        <div className="container-jungle">
          <ActivityFeature activity={billard} />
          <ActivityFeature activity={flechettes} reverse />
          {extras.map((a, i) => (
            <ActivityFeature key={a.slug} activity={a} reverse={i % 2 === 0} />
          ))}
        </div>
      </div>
      <CtaSection title="Qui relève le défi ?" />
    </>
  );
}
