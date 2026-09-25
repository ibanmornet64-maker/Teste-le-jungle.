import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { PracticalInfo } from "@/components/sections/PracticalInfo";
import { ContactForm } from "@/components/forms/ContactForm";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CONTACT, SITE, directionsUrl, fullAddress, phoneHref } from "@/config/site";
import { DATA_TO_CONFIRM } from "@/config/data-to-confirm";
import { IMAGES } from "@/data/images";

export const metadata: Metadata = {
  title: "Contact & accès — 57 rue Carrerot, Oloron-Sainte-Marie",
  description:
    "Adresse, horaires, itinéraire et formulaire de contact du Jungle, 57 rue Carrerot, 64400 Oloron-Sainte-Marie.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        compact
        eyebrow="Contact & accès"
        title={
          <>
            On vous <span className="text-gold">attend</span>
          </>
        }
        lead={<p>{fullAddress}, au cœur du Béarn.</p>}
        image={IMAGES.hero}
        crumbs={[{ name: "Contact", href: "/contact" }]}
        actions={
          <>
            <ButtonLink href={directionsUrl} size="lg" icon="route" iconPosition="left" ariaLabel="Voir l’itinéraire">
              Voir l’itinéraire
            </ButtonLink>
            {CONTACT.phone ? (
              <ButtonLink href={phoneHref(CONTACT.phone)} variant="secondary" size="lg" icon="phone" iconPosition="left">
                Appeler
              </ButtonLink>
            ) : (
              <ButtonLink href={SITE.social.instagram.url} variant="secondary" size="lg" icon="instagram" iconPosition="left" ariaLabel="Écrire sur Instagram">
                Écrire sur Instagram
              </ButtonLink>
            )}
          </>
        }
      />

      <div id="acces">
        <PracticalInfo withTitle={false} detailedHours />
      </div>

      {(DATA_TO_CONFIRM.accessConditions || DATA_TO_CONFIRM.walkInPolicy) && (
        <section className="bg-deep pb-10" aria-label="Conditions d’accès">
          <div className="container-jungle">
            <div className="rounded-[1.5rem] border border-cream/10 bg-jungle-dark/50 p-6 text-cream/80">
              {DATA_TO_CONFIRM.accessConditions && <p>{DATA_TO_CONFIRM.accessConditions}</p>}
              {DATA_TO_CONFIRM.walkInPolicy && <p className="mt-2">{DATA_TO_CONFIRM.walkInPolicy}</p>}
            </div>
          </div>
        </section>
      )}

      <section id="formulaire" className="section-y bg-night" aria-labelledby="form-title">
        <div className="container-jungle grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionTitle
              id="form-title"
              eyebrow="Écrivez-nous"
              title="Une question, une envie ?"
              intro="Réservation, anniversaire, événement, partenariat ou simple question : utilisez ce formulaire, l’équipe du Jungle vous répondra."
            />
            <div className="mt-8 space-y-3 text-sm text-cream/75" data-reveal>
              <p className="flex gap-3">
                <Icon name="instagram" size={20} className="shrink-0 text-gold" />
                <span>
                  Également sur Instagram :{" "}
                  <a href={SITE.social.instagram.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-gold underline">
                    {SITE.social.instagram.handle}
                  </a>
                </span>
              </p>
              {CONTACT.email && (
                <p className="flex gap-3">
                  <Icon name="mail" size={20} className="shrink-0 text-gold" />
                  <a href={`mailto:${CONTACT.email}`} className="font-semibold text-gold underline">
                    {CONTACT.email}
                  </a>
                </p>
              )}
            </div>
          </div>
          <ContactForm variant="contact" />
        </div>
      </section>
    </>
  );
}
