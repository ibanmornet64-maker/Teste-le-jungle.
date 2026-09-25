import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ShareButton } from "@/components/ui/ShareButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE, fullAddress } from "@/config/site";
import { EVENTS, EVENT_TYPES, getEvent, isUpcoming } from "@/data/events";
import { formatDateLong, formatTime } from "@/lib/format";
import { eventSchema } from "@/lib/schema";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  // Seuls les événements publiés et datés sont générés (jamais les brouillons).
  return EVENTS.filter((e) => e.published && e.date).map((e) => ({ slug: e.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event || !event.published || !event.date) return {};
  return {
    title: `${event.title} — ${formatDateLong(event.date)}`,
    description: event.summary,
    alternates: { canonical: `/evenements/${event.slug}` },
    openGraph: { images: [{ url: event.image.src, alt: event.image.alt }] },
  };
}

export default async function EventPage({ params }: Params) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event || !isUpcoming(event)) notFound();

  const booking = event.reservationUrl ?? `/reserver?evenement=${encodeURIComponent(event.slug)}`;

  return (
    <>
      <PageHero
        eyebrow={EVENT_TYPES[event.type]}
        accent="purple"
        title={event.title}
        lead={event.summary}
        image={event.image}
        crumbs={[
          { name: "Événements", href: "/evenements" },
          { name: event.title, href: `/evenements/${event.slug}` },
        ]}
        actions={
          (event.bookable || event.reservationUrl) && (
            <ButtonLink href={booking} size="lg" icon="calendar" iconPosition="left">
              Réserver
            </ButtonLink>
          )
        }
      />
      <section className="section-y bg-deep">
        <div className="container-jungle grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem]">
              <Image src={event.image.src} alt={event.image.alt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
            </div>
            <p className="mt-8 text-lg leading-relaxed whitespace-pre-line text-cream/85">{event.description}</p>
          </div>
          <aside className="h-fit rounded-[1.75rem] border border-cream/10 bg-jungle-dark/60 p-7">
            <h2 className="text-2xl font-semibold text-cream">Infos pratiques</h2>
            <ul className="mt-5 space-y-4 text-cream/85">
              <li className="flex gap-3">
                <Icon name="calendar" className="shrink-0 text-gold" />
                <span className="first-letter:uppercase">{formatDateLong(event.date!)}</span>
              </li>
              {event.startTime && (
                <li className="flex gap-3">
                  <Icon name="clock" className="shrink-0 text-gold" />
                  {formatTime(event.startTime)}
                  {event.endTime ? ` – ${formatTime(event.endTime)}` : ""}
                </li>
              )}
              {event.price && (
                <li className="flex gap-3">
                  <Icon name="ticket" className="shrink-0 text-gold" />
                  {event.price}
                </li>
              )}
              <li className="flex gap-3">
                <Icon name="map-pin" className="shrink-0 text-gold" />
                {SITE.name}, {fullAddress}
              </li>
            </ul>
            <div className="mt-7 flex flex-col gap-3">
              {(event.bookable || event.reservationUrl) && (
                <ButtonLink href={booking} icon="calendar" iconPosition="left">
                  Réserver
                </ButtonLink>
              )}
              <ButtonLink href={SITE.social.instagram.url} variant="secondary" icon="instagram" iconPosition="left" ariaLabel="Voir sur Instagram">
                Voir sur Instagram
              </ButtonLink>
              <ShareButton title={event.title} path={`/evenements/${event.slug}`} className="justify-center" />
            </div>
          </aside>
        </div>
      </section>
      <JsonLd data={eventSchema(event)} />
    </>
  );
}
