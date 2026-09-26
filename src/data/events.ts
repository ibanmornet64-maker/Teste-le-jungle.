/**
 * ============================================================================
 *  Événements
 * ============================================================================
 *  - Seuls les événements `published: true` ET à venir sont affichés.
 *  - Les événements passés disparaissent automatiquement.
 *  - Ne publier un événement qu'après vérification (date, heure, tarif).
 *
 *  Exemple d'événement :
 *  {
 *    slug: "soiree-salsa-bachata-2026-10-17",   // unique, sans accents ni espaces
 *    title: "Soirée salsa & bachata",
 *    type: "salsa",
 *    date: "2026-10-17",                          // AAAA-MM-JJ
 *    startTime: "20:00",
 *    endTime: "00:00",                            // facultatif
 *    summary: "Initiation puis soirée dansante.",
 *    description: "Texte plus long…",
 *    image: IMAGES.soirees,
 *    price: null,                                 // ex. "10 €" — uniquement si confirmé
 *    reservationUrl: null,                        // billetterie externe, sinon Instagram / téléphone
 *    bookable: true,                              // affiche un bouton « Réserver par message » / « Appeler »
 *    featured: true,                              // mis à la une
 *    published: true,
 *  }
 * ============================================================================
 */
import { IMAGES, type SiteImage } from "./images";

export const EVENT_TYPES = {
  "soiree-dansante": "Soirée dansante",
  salsa: "Salsa",
  bachata: "Bachata",
  afterwork: "Afterwork",
  sport: "Soirée sportive",
  tournoi: "Tournoi",
  famille: "Animation familiale",
  theme: "Soirée à thème",
} as const;

export type EventType = keyof typeof EVENT_TYPES;

export type EventItem = {
  slug: string;
  title: string;
  type: EventType;
  /** AAAA-MM-JJ — null tant que la date n'est pas vérifiée */
  date: string | null;
  startTime: string | null;
  endTime?: string | null;
  summary: string;
  description: string;
  image: SiteImage;
  price: string | null;
  reservationUrl: string | null;
  bookable: boolean;
  featured?: boolean;
  published: boolean;
};

export const EVENTS: EventItem[] = [
  {
    // Brouillon : une soirée salsa/bachata a été annoncée dans les agendas
    // locaux. À VÉRIFIER (date, horaires, tarif) avant de passer published à true.
    slug: "soiree-salsa-bachata",
    title: "Soirée salsa & bachata",
    type: "salsa",
    date: null,
    startTime: null,
    endTime: null,
    summary: "Initiation salsa et bachata, puis soirée dansante.",
    description:
      "On commence par une initiation pour apprendre les premiers pas, puis la piste s’ouvre à tous pour une soirée dansante aux rythmes latinos.",
    image: IMAGES.soirees,
    price: null,
    reservationUrl: null,
    bookable: true,
    featured: true,
    published: false,
  },
];

/** Date du jour au format AAAA-MM-JJ, fuseau Europe/Paris. */
export function todayInParis(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function isUpcoming(event: EventItem, today = todayInParis()): boolean {
  return event.published && !!event.date && event.date >= today;
}

export function getUpcomingEvents(today = todayInParis()): EventItem[] {
  return EVENTS.filter((e) => isUpcoming(e, today)).sort((a, b) =>
    `${a.date}${a.startTime ?? ""}`.localeCompare(`${b.date}${b.startTime ?? ""}`),
  );
}

export const getEvent = (slug: string) => EVENTS.find((e) => e.slug === slug);
