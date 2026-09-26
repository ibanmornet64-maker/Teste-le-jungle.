import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { FoodCategoryCard } from "@/components/cards/FoodCard";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { MonsteraLeaf } from "@/components/decor/Foliage";
import { DATA_TO_CONFIRM } from "@/config/data-to-confirm";
import { IMAGES } from "@/data/images";
import { getPrimaryAction } from "@/lib/contact-actions";
import { menuHasItems, visibleMenu } from "@/data/menu";

export const metadata: Metadata = {
  title: "Manger & boire — pinsas, tapas, cocktails à Oloron",
  description:
    "Pinsas, tapas, planches à partager, gaufres, smoothies, cocktails et mocktails au Jungle, à Oloron-Sainte-Marie. Du goûter à la soirée.",
  alternates: { canonical: "/manger-boire" },
};

export default function FoodPage() {
  const askMenu = getPrimaryAction();
  const fullMenu = DATA_TO_CONFIRM.fullMenuAvailable && menuHasItems;
  return (
    <>
      <PageHero
        eyebrow="La carte"
        title={
          <>
            Manger & <span className="text-gold">boire</span>
          </>
        }
        lead="Pinsas, tapas, planches à partager, gaufres et smoothies, cocktails et mocktails : du goûter jusqu’à la soirée, il y a toujours une bonne raison de passer à table."
        image={IMAGES.pinsa}
        crumbs={[{ name: "Manger & boire", href: "/manger-boire" }]}
        actions={
          <ButtonLink href="#carte" size="lg" icon="arrow-down">
            Voir la carte
          </ButtonLink>
        }
      />

      <section id="carte" className="relative overflow-hidden bg-sand py-20 text-night md:py-28" aria-labelledby="carte-title">
        <MonsteraLeaf className="absolute -top-10 -left-24 size-[24rem] rotate-[160deg] text-jungle-dark/[0.06]" />
        <div className="container-jungle relative">
          <SectionTitle
            id="carte-title"
            tone="light"
            eyebrow="Au menu"
            title="Nos envies du moment"
            intro={
              fullMenu
                ? "Toute la carte, avec les allergènes et les options végétariennes."
                : "Voici ce que vous trouverez au Jungle. La carte détaillée, avec les prix, est disponible sur place."
            }
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleMenu.map((c, i) => (
              <FoodCategoryCard key={c.id} category={c} delay={(i % 3) * 80} className={i === 0 ? "lg:row-span-1" : ""} />
            ))}

            {!fullMenu && (
              <aside
                className="flex flex-col justify-between rounded-[1.75rem] bg-jungle-dark p-8 text-cream"
                data-reveal
                aria-labelledby="carte-sur-place"
              >
                <div>
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-gold text-night">
                    <Icon name="sparkles" size={28} />
                  </span>
                  <h3 id="carte-sur-place" className="mt-6 text-3xl font-semibold">
                    La carte complète vous attend sur place
                  </h3>
                  <p className="mt-3 text-cream/80">
                    Envie de connaître les plats, les boissons et les prix avant de venir ? Demandez-nous la carte.
                  </p>
                </div>
                <div className="mt-8 flex flex-col gap-3">
                  <ButtonLink href={askMenu.href} external={askMenu.external} icon={askMenu.icon} iconPosition="left">
                    Demander la carte
                  </ButtonLink>
                  <ButtonLink href="/contact#acces" variant="secondary" icon="map-pin" iconPosition="left">
                    Découvrir la carte sur place
                  </ButtonLink>
                </div>
              </aside>
            )}
          </div>

          <p className="mt-10 flex items-start gap-2 text-sm text-night/70">
            <Icon name="info" size={18} className="mt-0.5 shrink-0 text-jungle-dark" />
            Allergies ou régime particulier ? Signalez-le à l’équipe, elle vous renseignera sur la composition des plats.
          </p>
        </div>
      </section>

      <CtaSection title="On se retrouve à table ?" />
    </>
  );
}
