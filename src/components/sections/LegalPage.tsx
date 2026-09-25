import type { ReactNode } from "react";
import { PageHero } from "@/components/sections/PageHero";

/** Mise en page sobre et lisible pour les pages légales. */
export function LegalPage({ title, href, children }: { title: string; href: string; children: ReactNode }) {
  return (
    <>
      <PageHero compact eyebrow="Informations légales" title={title} crumbs={[{ name: title, href }]} />
      <section className="section-y bg-deep">
        <div
          className="container-jungle max-w-3xl space-y-10 text-cream/80
            [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-cream
            [&_p]:leading-relaxed [&_p+p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5
            [&_a]:text-gold [&_a]:underline [&_strong]:text-cream"
        >
          {children}
        </div>
      </section>
    </>
  );
}
