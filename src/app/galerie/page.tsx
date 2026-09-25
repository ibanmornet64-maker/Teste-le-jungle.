import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Gallery } from "@/components/sections/Gallery";
import { CtaSection } from "@/components/sections/CtaSection";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SITE } from "@/config/site";
import { GALLERY } from "@/data/gallery";
import { IMAGES } from "@/data/images";

export const metadata: Metadata = {
  title: "Galerie — l’ambiance du Jungle en images",
  description: "Bowling, billard, cocktails, pinsas et soirées : découvrez l’ambiance du Jungle à Oloron-Sainte-Marie en images.",
  alternates: { canonical: "/galerie" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        compact
        eyebrow="Galerie"
        title={
          <>
            L’ambiance <span className="text-gold">en images</span>
          </>
        }
        lead="Pistes, billards, cocktails, pinsas et lumières du soir. Touchez une photo pour l’agrandir."
        image={IMAGES.cocktails}
        crumbs={[{ name: "Galerie", href: "/galerie" }]}
      />
      <section className="section-y bg-deep" aria-label="Photos">
        <div className="container-jungle">
          <Gallery items={GALLERY} />

          <div className="mt-16 flex flex-col items-center gap-5 rounded-[2rem] border border-cream/10 bg-jungle-dark/50 p-10 text-center" data-reveal>
            <Icon name="instagram" size={40} className="text-gold" />
            <h2 className="text-3xl font-semibold text-cream md:text-4xl">Vu sur Instagram</h2>
            <p className="max-w-md text-cream/75">
              Soirées, nouveautés, coulisses : toute l’actualité du Jungle se passe sur {SITE.social.instagram.handle}.
            </p>
            <ButtonLink href={SITE.social.instagram.url} icon="arrow-up-right" ariaLabel="Suivre Le Jungle sur Instagram">
              Suivre Le Jungle
            </ButtonLink>
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
