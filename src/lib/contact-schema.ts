/**
 * Validation partagée des formulaires (client ET serveur).
 * Aucune dépendance externe : les mêmes règles tournent dans le navigateur
 * (retour immédiat) et dans l'API (sécurité).
 */

export const REQUEST_TYPES = {
  reservation: "Réservation",
  anniversaire: "Anniversaire",
  groupe: "Groupe",
  entreprise: "Entreprise",
  evenement: "Événement",
  question: "Question générale",
  partenariat: "Partenariat",
} as const;

export type RequestType = keyof typeof REQUEST_TYPES;
export type FormVariant = "contact" | "reservation" | "group";

export const GROUP_EVENT_TYPES = [
  "Anniversaire enfant",
  "Anniversaire ado",
  "Anniversaire adulte",
  "Groupe d’amis",
  "Entreprise / afterwork",
  "Team building",
  "Association / club",
  "Événement privé",
] as const;

export const ACTIVITY_CHOICES = [
  "Bowling",
  "Billard",
  "Fléchettes",
  "Restauration",
  "Boissons / cocktails",
] as const;

export type ContactPayload = {
  variant: FormVariant;
  name: string;
  email: string;
  phone: string;
  requestType: RequestType;
  date: string;
  guests: string;
  eventType: string;
  activities: string[];
  budget: string;
  message: string;
  consent: boolean;
  /** Champ piège anti-robot : doit rester vide */
  website: string;
  /** Horodatage d'ouverture du formulaire (anti-robot) */
  startedAt: number;
};

export type FieldErrors = Partial<Record<keyof ContactPayload, string>>;

export const LIMITS = {
  name: 80,
  email: 120,
  phone: 25,
  message: 2000,
  budget: 60,
  maxGuests: 300,
  minFillMs: 3000,
};

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;
const PHONE_RE = /^\+?[0-9 .()-]{6,25}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function todayIso(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

const str = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/\u0000/g, "").trim().slice(0, max) : "";

/** Normalise une entrée inconnue (JSON) en payload typé. */
export function normalizePayload(raw: unknown): ContactPayload {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const variant: FormVariant =
    r.variant === "reservation" || r.variant === "group" ? r.variant : "contact";
  const requestType = (
    typeof r.requestType === "string" && r.requestType in REQUEST_TYPES
      ? r.requestType
      : ""
  ) as RequestType;
  return {
    variant,
    name: str(r.name, LIMITS.name + 1),
    email: str(r.email, LIMITS.email + 1).toLowerCase(),
    phone: str(r.phone, LIMITS.phone + 1),
    requestType,
    date: str(r.date, 10),
    guests: str(String(r.guests ?? ""), 4),
    eventType: str(r.eventType, 60),
    activities: Array.isArray(r.activities)
      ? r.activities.filter(
          (a): a is string =>
            typeof a === "string" && (ACTIVITY_CHOICES as readonly string[]).includes(a),
        )
      : [],
    budget: str(r.budget, LIMITS.budget + 1),
    message: str(r.message, LIMITS.message + 1),
    consent: r.consent === true,
    website: str(r.website, 200),
    startedAt: typeof r.startedAt === "number" ? r.startedAt : 0,
  };
}

/** Retourne les erreurs par champ (objet vide = valide). */
export function validatePayload(p: ContactPayload): FieldErrors {
  const e: FieldErrors = {};

  if (p.name.length < 2) e.name = "Indiquez votre nom (2 caractères minimum).";
  else if (p.name.length > LIMITS.name) e.name = `${LIMITS.name} caractères maximum.`;

  if (!p.email) e.email = "Indiquez votre adresse email.";
  else if (!EMAIL_RE.test(p.email) || p.email.length > LIMITS.email)
    e.email = "Cette adresse email ne semble pas valide (exemple : prenom@domaine.fr).";

  if (p.phone && !PHONE_RE.test(p.phone))
    e.phone = "Ce numéro ne semble pas valide (chiffres, espaces et + uniquement).";

  if (!p.requestType) e.requestType = "Choisissez le type de demande.";

  const needsDate = p.variant === "reservation" || p.variant === "group";
  if (p.date) {
    if (!DATE_RE.test(p.date) || Number.isNaN(Date.parse(p.date)))
      e.date = "Date invalide.";
    else if (p.date < todayIso()) e.date = "La date souhaitée est déjà passée.";
  } else if (needsDate) {
    e.date = "Indiquez la date souhaitée.";
  }

  if (p.guests) {
    const n = Number(p.guests);
    if (!Number.isInteger(n) || n < 1) e.guests = "Indiquez un nombre de personnes valide.";
    else if (n > LIMITS.maxGuests)
      e.guests = `Pour plus de ${LIMITS.maxGuests} personnes, précisez-le dans votre message.`;
  } else if (needsDate) {
    e.guests = "Indiquez le nombre de personnes.";
  }

  if (p.variant === "group" && !p.eventType) e.eventType = "Choisissez le type d’événement.";

  if (p.budget.length > LIMITS.budget) e.budget = `${LIMITS.budget} caractères maximum.`;

  const minMessage = p.variant === "contact" ? 10 : 0;
  if (p.message.length < minMessage)
    e.message = "Votre message est un peu court (10 caractères minimum).";
  else if (p.message.length > LIMITS.message)
    e.message = `${LIMITS.message} caractères maximum.`;

  if (!p.consent) e.consent = "Merci d’accepter l’utilisation de vos données pour traiter la demande.";

  return e;
}

/** Détection simple de robots (champ piège + remplissage trop rapide). */
export function looksLikeBot(p: ContactPayload, now = Date.now()): boolean {
  if (p.website) return true;
  if (!p.startedAt || now - p.startedAt < LIMITS.minFillMs) return true;
  if (now - p.startedAt > 1000 * 60 * 60 * 24) return true;
  return false;
}
