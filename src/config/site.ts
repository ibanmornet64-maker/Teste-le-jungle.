/**
 * ============================================================================
 *  Informations générales du Jungle — fichier central à modifier
 * ============================================================================
 *  Seules les informations CONFIRMÉES sont ici. Les informations en attente
 *  se trouvent dans ./data-to-confirm.ts
 * ============================================================================
 */
import { DATA_TO_CONFIRM } from "./data-to-confirm";

/** Adresse fournie automatiquement par Vercel (sans https://). */
function vercelHost(): string | undefined {
  if (process.env.VERCEL_ENV === "production") {
    return process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  }
  return process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL;
}

function resolveSiteUrl(): string {
  const host = vercelHost();
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ||
    DATA_TO_CONFIRM.siteUrl ||
    (host ? `https://${host}` : "http://localhost:3000");
  return url.replace(/\/$/, "");
}

/**
 * Le site peut-il être indexé par Google ?
 *  - Non sur les déploiements de prévisualisation Vercel (branches, pull requests).
 *  - Non si SITE_NOINDEX=true (utile tant que les photos temporaires sont en place).
 *  - Oui sinon.
 */
export const SITE_INDEXABLE =
  process.env.VERCEL_ENV !== "preview" && process.env.SITE_NOINDEX !== "true";

export const SITE = {
  name: "Le Jungle",
  alternateName: "Le Jungle Café",
  tagline: "Manger. Jouer. Se retrouver.",
  shortPitch:
    "Bowling, billard, fléchettes, gourmandises et soirées à Oloron-Sainte-Marie.",
  promise:
    "Un endroit où l’on peut manger, boire un verre, jouer, rire, se retrouver entre amis ou en famille et prolonger la soirée dans une ambiance inspirée de la jungle.",

  /**
   * URL publique du site, par ordre de priorité :
   *  1. variable d'environnement NEXT_PUBLIC_SITE_URL (ex. https://www.lejungle64.fr)
   *  2. DATA_TO_CONFIRM.siteUrl
   *  3. adresse fournie automatiquement par Vercel (xxx.vercel.app)
   *  4. http://localhost:3000 en local
   */
  url: resolveSiteUrl(),

  locale: "fr_FR",

  address: {
    street: "57 rue Carrerot",
    postalCode: "64400",
    city: "Oloron-Sainte-Marie",
    department: "Pyrénées-Atlantiques",
    region: "Nouvelle-Aquitaine",
    area: "Béarn",
    country: "France",
    countryCode: "FR",
  },

  /**
   * Coordonnées approximatives obtenues par géocodage de l'adresse
   * (OpenStreetMap). Utilisées uniquement pour centrer la carte interactive.
   */
  mapCenter: { lat: 43.1915844, lng: -0.6131152 },

  social: {
    instagram: {
      handle: "@lejungle64",
      url: "https://www.instagram.com/lejungle64/",
      /** Lien direct vers la messagerie Instagram du Jungle (ouvre l'app sur mobile). */
      dm: "https://ig.me/m/lejungle64",
    },
  },

  /** Horaires affichés sur Instagram. */
  hours: {
    summary: "Tous les jours, de 15 h à 00 h",
    short: "Ouvert tous les jours · 15 h – 00 h",
    /** Format Schema.org — ne modifier que si les horaires changent. */
    specification: [
      {
        days: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "15:00",
        closes: "00:00",
      },
    ],
  },

  /** Équipements communiqués. */
  equipment: {
    bowlingLanes: 4,
    billiards: 3,
    dartboards: 2,
  },
} as const;

export const CONTACT = {
  phone: DATA_TO_CONFIRM.phone,
  email: DATA_TO_CONFIRM.email,
  hoursVisible: DATA_TO_CONFIRM.generalHoursConfirmed,
};

export const fullAddress = `${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}`;

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `Le Jungle, ${fullAddress}, France`,
)}`;

export const phoneHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;
