/**
 * Données structurées Schema.org (JSON-LD).
 * Aucune donnée non confirmée n'est publiée : téléphone, email et prix ne
 * sont ajoutés que s'ils sont renseignés dans DATA_TO_CONFIRM.
 */
import { CONTACT, SITE } from "@/config/site";
import type { EventItem } from "@/data/events";
import type { FaqItem } from "@/data/faq";
import { OG_IMAGE } from "@/data/images";

const abs = (path: string) => new URL(path, SITE.url).toString();
export const BUSINESS_ID = `${SITE.url.replace(/\/$/, "")}/#le-jungle`;

export function localBusinessSchema() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["BowlingAlley", "BarOrPub"],
    "@id": BUSINESS_ID,
    name: SITE.name,
    alternateName: SITE.alternateName,
    slogan: SITE.tagline,
    description:
      "Lieu de loisirs et de convivialité à Oloron-Sainte-Marie : bowling (4 pistes), billard (3 tables), fléchettes (2 postes), pinsas, tapas, goûters, cocktails, mocktails et soirées.",
    url: SITE.url,
    image: abs(OG_IMAGE.src),
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      postalCode: SITE.address.postalCode,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.countryCode,
    },
    areaServed: ["Oloron-Sainte-Marie", "Béarn", "Pyrénées-Atlantiques"],
    sameAs: [SITE.social.instagram.url],
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Pistes de bowling", value: SITE.equipment.bowlingLanes },
      { "@type": "LocationFeatureSpecification", name: "Billards", value: SITE.equipment.billiards },
      { "@type": "LocationFeatureSpecification", name: "Postes de fléchettes", value: SITE.equipment.dartboards },
    ],
  };

  if (CONTACT.hoursVisible) {
    data.openingHoursSpecification = SITE.hours.specification.map((s) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: s.days.map((d) => `https://schema.org/${d}`),
      opens: s.opens,
      closes: s.closes,
    }));
  }
  if (CONTACT.phone) data.telephone = CONTACT.phone;
  if (CONTACT.email) data.email = CONTACT.email;

  return data;
}

/** Décalage horaire de Paris pour une date donnée ("+01:00" l'hiver, "+02:00" l'été). */
function parisOffset(isoDay: string): string {
  const d = new Date(`${isoDay}T12:00:00Z`);
  const part = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Paris",
    timeZoneName: "longOffset",
  })
    .formatToParts(d)
    .find((p) => p.type === "timeZoneName")?.value;
  const m = part?.match(/GMT([+-]\d{2}:\d{2})/);
  return m ? m[1] : "+01:00";
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: { "@type": "Answer", text: i.answer },
    })),
  };
}

export function eventSchema(event: EventItem) {
  if (!event.date) return null;
  const start = event.startTime
    ? `${event.date}T${event.startTime}:00${parisOffset(event.date)}`
    : event.date;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.summary,
    startDate: start,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: abs(event.image.src),
    url: abs(`/evenements/${event.slug}`),
    location: {
      "@type": "Place",
      name: SITE.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.address.street,
        postalCode: SITE.address.postalCode,
        addressLocality: SITE.address.city,
        addressCountry: SITE.address.countryCode,
      },
    },
    organizer: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };
  if (event.price) {
    data.offers = {
      "@type": "Offer",
      description: event.price,
      url: event.reservationUrl ?? abs(`/evenements/${event.slug}`),
      availability: "https://schema.org/InStock",
    };
  }
  return data;
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.href),
    })),
  };
}
