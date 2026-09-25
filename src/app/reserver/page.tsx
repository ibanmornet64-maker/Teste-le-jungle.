import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { ReservationForm } from "@/components/forms/ReservationForm";
import { Icon } from "@/components/ui/Icon";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CONTACT, SITE } from "@/config/site";
import { IMAGES } from "@/data/images";
import { getReservationCta } from "@/lib/reservation";

export const metadata: Metadata = {
  title: "Réserver — bowling, billard, fléchettes à Oloron",
  description:
    "Envoyez votre demande de réservation au Jungle à Oloron-Sainte-Marie : bowling, billard, fléchettes, restauration. L’équipe vous recontacte pour confirmer.",
  alternates: { canonical: "/reserver" },
};

export default function ReservePage() {
  const cta = getReservationCta();
  return (
    <>
      <PageHero
        compact
        eyebrow="Réservation"
        title={
          <>
            {cta.external ? "Réserver en ligne" : "Demander une réservation"}
          </>
        }
        lead={
          cta.external
            ? "Réservez directement votre créneau sur notre plateforme officielle."
            : "Indiquez-nous la date, le nombre de personnes et vos envies : l’équipe du Jungle vous recontacte pour confirmer la disponibilité."
        }
        image={IMAGES.bowling}
        crumbs={[{ name: "Réserver", href: "/reserver" }]}
      />
      <section className="section-y bg-night" aria-labelledby="resa-title">
        <div className="container-jungle grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionTitle
              id="resa-title"
              eyebrow="Bon à savoir"
              title="Comment ça se passe ?"
            />
            <ol className="mt-8 space-y-5" data-reveal>
              {[
                "Vous envoyez votre demande avec la date et le nombre de personnes.",
                "L’équipe vérifie les disponibilités et vous répond.",
                "Votre réservation est confirmée uniquement après la réponse de l’équipe.",
              ].map((t, i) => (
                <li key={t} className="flex gap-4 text-cream/85">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold font-display font-semibold text-night">
                    {i + 1}
                  </span>
                  <span className="pt-1.5">{t}</span>
                </li>
              ))}
            </ol>
            <div className="mt-10 space-y-3 text-sm text-cream/75" data-reveal>
              {CONTACT.hoursVisible && (
                <p className="flex gap-3">
                  <Icon name="clock" size={20} className="shrink-0 text-gold" /> {SITE.hours.summary}
                </p>
              )}
              <p className="flex gap-3">
                <Icon name="users" size={20} className="shrink-0 text-gold" />
                <span>
                  Un groupe ou un anniversaire ?{" "}
                  <Link href="/groupes#demande" className="font-semibold text-gold underline">
                    Utilisez le formulaire groupes
                  </Link>
                  .
                </span>
              </p>
            </div>
          </div>
          <ReservationForm />
        </div>
      </section>
    </>
  );
}
