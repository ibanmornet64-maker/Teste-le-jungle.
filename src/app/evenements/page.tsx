import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { EventsExplorer } from "@/components/sections/EventsExplorer";
import { CtaSection } from "@/components/sections/CtaSection";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/config/site";
import { getUpcomingEvents } from "@/data/events";
import { IMAGES } from "@/data/images";
import { eventSchema } from "@/lib/schema";
import { getReservationCta } from "@/lib/reservation";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Événements & soirées à Oloron-Sainte-Marie",
  description:
    "Soirées dansantes, afterworks, tournois et soirées à thème au Jungle, à Oloron-Sainte-Marie. Consultez l’agenda et réservez votre place.",
  alternates: { canonical: "/evenements" },
};

export default function EventsPage() {
  const events = getUpcomingEvents();
  const cta = getReservationCta();
  return (
    <>
      <PageHero
        eyebrow="Agenda"
        accent="purple"
        title={
          <>
            Les soirées <span className="text-coral">du Jungle</span>
          </>
        }
        lead="Soirées dansantes, afterworks, tournois et soirées à thème : retrouvez ici les prochains rendez-vous du Jungle."
        image={IMAGES.soirees}
        crumbs={[{ name: "Événements", href: "/evenements" }]}
        actions={
          <>
            <ButtonLink href={SITE.social.instagram.url} size="lg" icon="instagram" iconPosition="left" ariaLabel="Suivre les événements sur Instagram">
              Suivre sur Instagram
            </ButtonLink>
            <ButtonLink href={cta.href} external={cta.external} variant="secondary" size="lg" icon="calendar" iconPosition="left">
              {cta.label}
            </ButtonLink>
          </>
        }
      />
      <section className="section-y bg-night" aria-label="Liste des événements">
        <div className="container-jungle">
          <EventsExplorer events={events} />
        </div>
      </section>
      {events.map((e) => (
        <JsonLd key={e.slug} data={eventSchema(e)} />
      ))}
      <CtaSection title="Envie d’organiser votre soirée ?" />
    </>
  );
}
