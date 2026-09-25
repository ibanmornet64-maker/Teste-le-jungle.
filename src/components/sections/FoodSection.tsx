import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { MonsteraLeaf } from "@/components/decor/Foliage";
import { FOOD_KEYWORDS } from "@/data/menu";
import { IMAGES, type SiteImage } from "@/data/images";
import { cn } from "@/lib/format";

const TILES: { image: SiteImage; label: string; className: string; sizes: string }[] = [
  { image: IMAGES.pinsa, label: "Pinsas", className: "col-span-6 row-span-2 sm:col-span-4", sizes: "(min-width: 1024px) 34vw, (min-width: 640px) 66vw, 100vw" },
  { image: IMAGES.cocktails, label: "Cocktails", className: "col-span-3 row-span-2 sm:col-span-2", sizes: "(min-width: 1024px) 17vw, 50vw" },
  { image: IMAGES.planche, label: "Planches à partager", className: "col-span-3 sm:col-span-2", sizes: "(min-width: 1024px) 17vw, 50vw" },
  { image: IMAGES.gouter, label: "Gaufres & goûters", className: "col-span-3 sm:col-span-2", sizes: "(min-width: 1024px) 17vw, 50vw" },
  { image: IMAGES.mocktails, label: "Mocktails & smoothies", className: "col-span-3 sm:col-span-2", sizes: "(min-width: 1024px) 17vw, 50vw" },
];

/** Section chaleureuse « Manger & boire » sur fond sable. */
export function FoodSection() {
  return (
    <section aria-labelledby="food-title" className="relative overflow-hidden bg-sand text-night">
      {/* Transition organique depuis la section sombre */}
      <svg aria-hidden viewBox="0 0 1440 80" preserveAspectRatio="none" className="block h-12 w-full text-night md:h-20">
        <path d="M0 0h1440v30C1200 80 960 80 720 50S240 10 0 60Z" fill="currentColor" />
      </svg>
      <MonsteraLeaf className="absolute -top-6 -right-24 size-[26rem] rotate-[200deg] text-jungle-dark/[0.07]" />

      <div className="container-jungle relative grid gap-14 py-16 md:py-24 lg:grid-cols-[1fr_1.35fr] lg:items-center lg:gap-16">
        <div>
          <SectionTitle
            id="food-title"
            tone="light"
            eyebrow="Manger & boire"
            title={
              <>
                Des envies à <span className="text-jungle-dark underline decoration-orange decoration-4 underline-offset-8">partager</span>
              </>
            }
            intro={
              <p>
                Pinsas à la pâte légère, tapas et planches au centre de la table, gaufres et smoothies pour le goûter,
                cocktails et mocktails quand la soirée démarre.
              </p>
            }
          />
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Au menu" data-reveal>
            {FOOD_KEYWORDS.map((k) => (
              <li key={k} className="rounded-full border border-jungle-dark/20 bg-cream px-4 py-2 text-sm font-medium text-deep">
                {k}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3" data-reveal>
            <ButtonLink href="/manger-boire" variant="dark" icon="arrow-right">
              Voir la carte
            </ButtonLink>
          </div>
        </div>

        <ul className="grid grid-cols-6 gap-3 [grid-auto-rows:8.5rem] sm:[grid-auto-rows:10rem] md:gap-4 lg:[grid-auto-rows:11rem]">
          {TILES.map((t, i) => (
            <li
              key={t.label}
              className={cn("group img-zoom relative overflow-hidden rounded-[1.5rem] shadow-[0_20px_40px_-25px_rgb(16_21_18/0.7)]", t.className)}
              data-reveal="zoom"
              style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
            >
              <Image src={t.image.src} alt={t.image.alt} fill sizes={t.sizes} className="object-cover" />
              <span className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent" aria-hidden />
              <span className="absolute bottom-3 left-3 rounded-full bg-cream/95 px-3 py-1 text-xs font-semibold text-deep md:bottom-4 md:left-4 md:text-sm">
                {t.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <svg aria-hidden viewBox="0 0 1440 80" preserveAspectRatio="none" className="block h-12 w-full text-deep md:h-20">
        <path d="M0 80h1440V20C1180 70 900 0 640 30S200 70 0 20Z" fill="currentColor" />
      </svg>
    </section>
  );
}
