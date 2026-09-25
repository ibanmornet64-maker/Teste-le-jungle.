import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";
import { ShareButton } from "@/components/ui/ShareButton";
import { EVENT_TYPES, type EventItem } from "@/data/events";
import { cn, formatDayMonth, formatTime } from "@/lib/format";

/** Carte événement : date, heure, nom, image, description, tarif (si confirmé), actions. */
export function EventCard({ event, featured = false }: { event: EventItem; featured?: boolean }) {
  if (!event.date) return null;
  const d = formatDayMonth(event.date);
  const bookingHref = event.reservationUrl ?? `/reserver?evenement=${encodeURIComponent(event.slug)}`;

  return (
    <article
      className={cn(
        "group relative flex overflow-hidden rounded-[1.75rem] bg-jungle-dark ring-1 ring-cream/10",
        featured ? "flex-col lg:flex-row" : "flex-col",
      )}
      data-reveal
    >
      <div className={cn("img-zoom relative overflow-hidden", featured ? "aspect-[16/10] lg:aspect-auto lg:w-3/5" : "aspect-[16/10]")}>
        <Image
          src={event.image.src}
          alt={event.image.alt}
          fill
          sizes={featured ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night/70 to-transparent" aria-hidden />
        <div className="absolute top-4 left-4 flex flex-col items-center rounded-2xl bg-cream px-3.5 py-2 text-center text-deep shadow-lg">
          <span className="text-[0.65rem] font-bold uppercase tracking-wider text-jungle-dark">{d.weekday}</span>
          <span className="font-display text-2xl leading-none font-semibold">{d.day}</span>
          <span className="text-xs font-semibold uppercase">{d.month}</span>
        </div>
        <span className="absolute top-4 right-4 rounded-full bg-coral px-3 py-1 text-xs font-bold text-night">
          {EVENT_TYPES[event.type]}
        </span>
      </div>

      <div className={cn("flex flex-1 flex-col p-6", featured && "lg:p-10")}>
        {featured && (
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            <Icon name="star" size={14} /> À la une
          </p>
        )}
        <h3 className={cn("font-semibold text-cream", featured ? "text-3xl md:text-4xl" : "text-2xl")}>
          <Link href={`/evenements/${event.slug}`} className="hover:text-gold">
            {event.title}
          </Link>
        </h3>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-cream/75">
          {event.startTime && (
            <li className="inline-flex items-center gap-1.5">
              <Icon name="clock" size={16} className="text-gold" />
              {formatTime(event.startTime)}
              {event.endTime ? ` – ${formatTime(event.endTime)}` : ""}
            </li>
          )}
          {event.price && (
            <li className="inline-flex items-center gap-1.5">
              <Icon name="ticket" size={16} className="text-gold" />
              {event.price}
            </li>
          )}
        </ul>
        <p className="mt-4 flex-1 text-cream/80">{event.summary}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <ButtonLink href={`/evenements/${event.slug}`} variant="secondary" size="sm" icon="arrow-right" ariaLabel={`En savoir plus : ${event.title}`}>
            En savoir plus
          </ButtonLink>
          {(event.bookable || event.reservationUrl) && (
            <ButtonLink href={bookingHref} size="sm" ariaLabel={`Réserver : ${event.title}`}>
              Réserver
            </ButtonLink>
          )}
          <ShareButton title={event.title} path={`/evenements/${event.slug}`} className="ml-auto" />
        </div>
      </div>
    </article>
  );
}
