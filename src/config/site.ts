/**
 * ============================================================================
 *  Informations générales du Jungle — fichier central à modifier
 * ============================================================================
 *  Seules les informations CONFIRMÉES sont ici. Les informations en attente
 *  se trouvent dans ./data-to-confirm.ts
 * ============================================================================
 */
import { DATA_TO_CONFIRM } from "./data-to-confirm";

export const SITE = {
  name: "Le Jungle",
  alternateName: "Le Jungle Café",
  tagline: "Manger. Jouer. Se retrouver.",
  shortPitch:
    "Bowling, billard, fléchettes, gourmandises et soirées à Oloron-Sainte-Marie.",
  promise:
    "Un endroit où l’on peut manger, boire un verre, jouer, rire, se retrouver entre amis ou en famille et prolonger la soirée dans une ambiance inspirée de la jungle.",

  /** URL publique du site (variable d'env > DATA_TO_CONFIRM > localhost) */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    DATA_TO_CONFIRM.siteUrl ??
    "http://localhost:3000",

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
