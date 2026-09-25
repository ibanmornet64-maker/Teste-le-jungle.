import { ButtonLink } from "@/components/ui/Button";
import { Glow, MonsteraLeaf, PalmFrond } from "@/components/decor/Foliage";

export default function NotFound() {
  return (
    <section className="grain relative isolate flex min-h-[90svh] items-center overflow-hidden bg-deep pt-24">
      <Glow color="orange" className="-bottom-40 -left-40 -z-10 size-[36rem] opacity-50" />
      <PalmFrond className="absolute -top-20 -right-20 -z-10 h-[30rem] rotate-[210deg] text-night" />
      <MonsteraLeaf className="absolute -bottom-24 -left-24 -z-10 size-[22rem] rotate-[30deg] text-night" />
      <div className="container-jungle text-center">
        <p className="font-display text-[7rem] leading-none font-semibold text-gold md:text-[10rem]">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-cream md:text-5xl">Perdu dans la jungle ?</h1>
        <p className="mx-auto mt-4 max-w-md text-cream/75">Cette page n’existe pas ou a été déplacée. Retrouvons le bon chemin.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" icon="arrow-right">
            Retour à l’accueil
          </ButtonLink>
          <ButtonLink href="/activites" variant="secondary">
            Voir les activités
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
