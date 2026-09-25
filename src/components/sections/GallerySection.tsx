import { ButtonLink } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Gallery } from "@/components/sections/Gallery";
import { SITE } from "@/config/site";
import { HOME_GALLERY } from "@/data/gallery";

export function GallerySection() {
  return (
    <section aria-labelledby="galerie-title" className="section-y relative bg-deep">
      <div className="container-jungle">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle
            id="galerie-title"
            eyebrow="Galerie"
            title={
              <>
                L’ambiance <span className="text-gold">en images</span>
              </>
            }
            intro="Pistes, cocktails, pinsas et lumières du soir : un avant-goût de ce qui vous attend."
          />
          <div className="flex shrink-0 flex-wrap gap-3">
            <ButtonLink href="/galerie" variant="secondary" icon="arrow-right">
              Toute la galerie
            </ButtonLink>
            <ButtonLink href={SITE.social.instagram.url} variant="ghost" icon="instagram" iconPosition="left" ariaLabel="Suivre Le Jungle sur Instagram">
              Suivre Le Jungle
            </ButtonLink>
          </div>
        </div>
        <Gallery items={HOME_GALLERY} className="mt-12" />
      </div>
    </section>
  );
}
