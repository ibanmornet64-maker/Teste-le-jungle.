import { ActivityCard } from "@/components/cards/ActivityCard";
import { ButtonLink } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { LaneLines } from "@/components/decor/Foliage";
import { getActivity } from "@/data/activities";

/** Grille d'activités : le bowling est mis en avant (carte plus grande). */
export function ActivitiesSection() {
  const bowling = getActivity("bowling")!;
  const billard = getActivity("billard")!;
  const flechettes = getActivity("flechettes")!;
  const soirees = getActivity("soirees")!;

  return (
    <section aria-labelledby="activites-title" className="section-y relative overflow-hidden bg-night">
      <LaneLines className="absolute inset-x-0 top-0 h-28 w-full text-leaf/40" />
      <div className="container-jungle relative">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle
            id="activites-title"
            eyebrow="Jouer"
            title={
              <>
                Choisissez votre <span className="text-gold">terrain de jeu</span>
              </>
            }
            intro="Une partie de bowling, un billard entre deux verres, un défi aux fléchettes : ici, chacun trouve son jeu."
          />
          <ButtonLink href="/activites" variant="secondary" icon="arrow-right" className="shrink-0">
            Toutes les activités
          </ButtonLink>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4 lg:grid-rows-[minmax(20rem,1fr)_minmax(20rem,1fr)]">
          <ActivityCard activity={bowling} featured className="sm:col-span-2 lg:row-span-2" />
          <ActivityCard activity={billard} delay={80} />
          <ActivityCard activity={flechettes} delay={160} />
          <ActivityCard activity={soirees} delay={240} className="sm:col-span-2" />
        </div>
      </div>
    </section>
  );
}
