"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { EventCard } from "@/components/cards/EventCard";
import { EventsEmptyState } from "@/components/sections/EventsPreview";
import { Icon } from "@/components/ui/Icon";
import { EVENT_TYPES, isUpcoming, todayInParis, type EventItem, type EventType } from "@/data/events";
import { cn, formatMonthKey, formatMonthLabel } from "@/lib/format";

/**
 * Agenda interactif : filtres par type et par mois, événement à la une.
 * Filtre à nouveau côté navigateur pour ne jamais afficher un événement passé.
 */
const noopSubscribe = () => () => {};

export function EventsExplorer({ events: initial }: { events: EventItem[] }) {
  const [type, setType] = useState<EventType | "all">("all");
  const [month, setMonth] = useState<string>("all");
  // Date du jour côté navigateur (null pendant le rendu serveur)
  const today = useSyncExternalStore(noopSubscribe, todayInParis, () => null);
  const events = useMemo(
    () => (today ? initial.filter((e) => isUpcoming(e, today)) : initial),
    [initial, today],
  );

  const types = useMemo(() => Array.from(new Set(events.map((e) => e.type))), [events]);
  const months = useMemo(() => Array.from(new Set(events.map((e) => formatMonthKey(e.date!)))), [events]);

  const filtered = events.filter(
    (e) => (type === "all" || e.type === type) && (month === "all" || formatMonthKey(e.date!) === month),
  );
  const featured = filtered.find((e) => e.featured) ?? null;
  const rest = filtered.filter((e) => e !== featured);

  if (events.length === 0) return <EventsEmptyState />;

  const chip = (active: boolean) =>
    cn(
      "inline-flex min-h-10 items-center rounded-full border px-4 text-sm font-medium whitespace-nowrap transition-colors",
      active ? "border-gold bg-gold text-night" : "border-cream/20 text-cream/85 hover:border-cream/50",
    );

  return (
    <div>
      <div className="flex flex-col gap-5 rounded-[1.5rem] border border-cream/10 bg-jungle-dark/50 p-5 md:flex-row md:items-center md:justify-between">
        <fieldset>
          <legend className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            <Icon name="sparkles" size={14} /> Type
          </legend>
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            <button type="button" className={chip(type === "all")} aria-pressed={type === "all"} onClick={() => setType("all")}>
              Tous
            </button>
            {types.map((t) => (
              <button key={t} type="button" className={chip(type === t)} aria-pressed={type === t} onClick={() => setType(t)}>
                {EVENT_TYPES[t]}
              </button>
            ))}
          </div>
        </fieldset>
        <div>
          <label htmlFor="filtre-mois" className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            <Icon name="calendar" size={14} /> Mois
          </label>
          <select
            id="filtre-mois"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="min-h-11 w-full rounded-full border border-cream/20 bg-night/60 px-4 text-sm text-cream md:w-56"
          >
            <option value="all">Tous les mois</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {formatMonthLabel(m)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {filtered.length} événement{filtered.length > 1 ? "s" : ""} affiché{filtered.length > 1 ? "s" : ""}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-cream/10 p-8 text-center text-cream/75">
          Aucun événement ne correspond à ces filtres.{" "}
          <button type="button" className="font-semibold text-gold underline" onClick={() => { setType("all"); setMonth("all"); }}>
            Réinitialiser
          </button>
        </p>
      ) : (
        <div className="mt-10 space-y-6">
          {featured && <EventCard event={featured} featured />}
          {rest.length > 0 && (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((e) => (
                <EventCard key={e.slug} event={e} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
