import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQ } from "@/data/faq";
import { IMAGES } from "@/data/images";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "FAQ — questions fréquentes",
  description:
    "Horaires, réservation, anniversaires, restauration, accès : toutes les réponses à vos questions sur Le Jungle à Oloron-Sainte-Marie.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        compact
        eyebrow="FAQ"
        title={
          <>
            Questions <span className="text-gold">fréquentes</span>
          </>
        }
        lead="Tout ce qu’il faut savoir avant de venir au Jungle."
        image={IMAGES.flechettes}
        crumbs={[{ name: "FAQ", href: "/faq" }]}
      />
      <section className="section-y bg-deep" aria-label="Questions et réponses">
        <div className="container-jungle max-w-4xl">
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <details
                key={item.question}
                className="group rounded-[1.25rem] border border-cream/10 bg-jungle-dark/50 transition-colors open:border-gold/40 open:bg-jungle-dark"
                data-reveal
                style={{ ["--reveal-delay" as string]: `${Math.min(i, 6) * 40}ms` }}
              >
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 rounded-[1.25rem] px-6 py-4 font-display text-lg font-medium text-cream md:text-xl [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-cream/10 text-gold transition-transform duration-300 group-open:rotate-180">
                    <Icon name="chevron-down" size={20} />
                  </span>
                </summary>
                <div className="px-6 pb-6 text-cream/80">
                  <p className="leading-relaxed">{item.answer}</p>
                  {item.link && (
                    <Link href={item.link.href} className="mt-3 inline-flex items-center gap-1.5 font-semibold text-gold hover:underline">
                      {item.link.label} <Icon name="arrow-right" size={16} />
                    </Link>
                  )}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-14 text-center" data-reveal>
            <p className="text-cream/75">Vous ne trouvez pas votre réponse ?</p>
            <ButtonLink href="/contact#nous-ecrire" className="mt-4" icon="arrow-right">
              Posez-nous la question
            </ButtonLink>
          </div>
        </div>
      </section>
      <JsonLd data={faqSchema(FAQ)} />
    </>
  );
}
