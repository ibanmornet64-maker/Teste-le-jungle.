import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { PracticalInfo } from "@/components/sections/PracticalInfo";
import { ContactOptions } from "@/components/contact/ContactOptions";
import { ButtonLink } from "@/components/ui/Button";
import { directionsUrl, fullAddress } from "@/config/site";
import { getPrimaryAction } from "@/lib/contact-actions";
import { DATA_TO_CONFIRM } from "@/config/data-to-confirm";
import { IMAGES } from "@/data/images";

export const metadata: Metadata = {
  title: "Contact & accès — 57 rue Carrerot, Oloron-Sainte-Marie",
  description:
    "Adresse, horaires, itinéraire et contact du Jungle (Instagram, téléphone), 57 rue Carrerot, 64400 Oloron-Sainte-Marie.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const cta = getPrimaryAction();
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
            <ButtonLink href="#nous-ecrire" variant="secondary" size="lg" icon={cta.icon} iconPosition="left">
              {cta.id === "phone" ? "Appeler ou écrire" : "Nous écrire"}
            </ButtonLink>
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

      <ContactOptions
        id="nous-ecrire"
        eyebrow="Nous contacter"
        title="Une question, une envie ?"
        intro="Réservation, anniversaire, événement, partenariat ou simple question : contactez directement l’équipe du Jungle."
        checklist={["Votre demande (réservation, question, événement…)", "La date et l’heure souhaitées", "Le nombre de personnes"]}
      />
    </>
  );
}
