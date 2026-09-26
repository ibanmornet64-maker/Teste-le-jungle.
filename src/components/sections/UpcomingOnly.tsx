"use client";

/**
 * Filtrage des événements passés directement dans le navigateur.
 * Le site étant 100 % statique, un événement passé disparaît ainsi dès le
 * lendemain, même sans nouveau déploiement.
 */
import { useSyncExternalStore, type ReactNode } from "react";
import { EventCard } from "@/components/cards/EventCard";
import { isUpcoming, todayInParis, type EventItem } from "@/data/events";

const noopSubscribe = () => () => {};

/** Date du jour (Europe/Paris) côté navigateur ; null pendant le rendu statique. */
export function useTodayInParis(): string | null {
  return useSyncExternalStore(noopSubscribe, todayInParis, () => null);
}

export function UpcomingEventsGrid({ events, empty }: { events: EventItem[]; empty: ReactNode }) {
  const today = useTodayInParis();
  const list = today ? events.filter((e) => isUpcoming(e, today)) : events;
  if (list.length === 0) return <>{empty}</>;
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {list.map((e) => (
        <EventCard key={e.slug} event={e} />
      ))}
    </div>
  );
}

/** Affiche `children` tant que la date n'est pas passée, sinon `fallback`. */
export function UpcomingOnly({ date, children, fallback = null }: { date: string; children: ReactNode; fallback?: ReactNode }) {
  const today = useTodayInParis();
  return <>{today && date < today ? fallback : children}</>;
}
