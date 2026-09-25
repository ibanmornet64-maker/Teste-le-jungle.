/**
 * ============================================================================
 *  DATA_TO_CONFIRM — Informations en attente de validation par Le Jungle
 * ============================================================================
 *
 *  RÈGLE D'OR : tant qu'une valeur vaut `null` (ou `false` pour les options),
 *  le bloc correspondant N'EST PAS affiché sur le site public.
 *  Rien n'est inventé : pas de faux téléphone, de faux prix ou de faux horaires.
 *
 *  ➜ Pour publier une information, remplacez simplement `null` par la valeur
 *    validée. Le site s'adapte automatiquement (boutons, FAQ, données
 *    structurées Google, footer, etc.).
 *
 *  ➜ La page /admin (visible uniquement en développement, ou si la variable
 *    d'environnement ADMIN_PREVIEW=true) affiche l'état de chaque champ.
 * ============================================================================
 */

export type LegalInfo = {
  /** Raison sociale, ex. « SARL Le Jungle » */
  companyName: string | null;
  /** Forme juridique, ex. « SARL au capital de 10 000 € » */
  legalForm: string | null;
  siret: string | null;
  rcs: string | null;
  vatNumber: string | null;
  /** Directeur·rice de la publication */
  publicationDirector: string | null;
  /** Hébergeur : nom, adresse, contact */
  host: string | null;
};

export type Prices = {
  bowling: string | null;
  billard: string | null;
  flechettes: string | null;
};

export const DATA_TO_CONFIRM = {
  /** Numéro de téléphone public, ex. "+33 5 59 00 00 00" */
  phone: null as string | null,

  /** Adresse email publique, ex. "contact@domaine.fr" */
  email: null as string | null,

  /** Nom de domaine définitif, ex. "https://www.lejungle64.fr" (sert au SEO, sitemap, Open Graph) */
  siteUrl: null as string | null,

  /**
   * URL officielle de réservation en ligne (plateforme tierce).
   * - Si renseignée : les boutons affichent « Réserver en ligne ».
   * - Sinon : les boutons affichent « Demander une réservation » (formulaire).
   */
  reservationUrl: null as string | null,

  /** Tarifs par activité (texte libre, ex. "6 € la partie") */
  prices: { bowling: null, billard: null, flechettes: null } as Prices,

  /** Durée indicative par activité (ex. "Environ 1 h pour 6 joueurs") */
  durations: { bowling: null, billard: null, flechettes: null } as Prices,

  /**
   * Horaires généraux affichés sur Instagram : « Tous les jours, de 15 h à 00 h ».
   * Mettre à `false` pour masquer les horaires partout si ceux-ci changent
   * avant mise à jour du fichier src/config/site.ts.
   */
  generalHoursConfirmed: true,

  /** Horaires détaillés par activité ou par saison (texte libre) */
  detailedHours: null as string | null,

  /** La carte complète est-elle saisie dans src/data/menu.ts ? */
  fullMenuAvailable: false,

  /** Formules anniversaire / groupes validées (texte libre ou liste) */
  birthdayFormulas: null as string[] | null,

  /** Conditions d'accès : âge minimum, chaussures, règles de réservation… */
  accessConditions: null as string | null,

  /** Politique « sans réservation » (ex. "Oui, dans la limite des pistes disponibles.") */
  walkInPolicy: null as string | null,

  /** Plats végétariens confirmés ? (texte de réponse FAQ) */
  vegetarianOptions: null as string | null,

  /** Accessibilité PMR (texte de réponse FAQ + page contact) */
  accessibility: null as string | null,

  /** Stationnement à proximité (texte de réponse FAQ + page contact) */
  parking: null as string | null,

  /** Présence confirmée d'un baby-foot */
  hasBabyFoot: false,

  /** Présence confirmée d'un photomaton */
  hasPhotobooth: false,

  /**
   * Logo officiel. Déposer les fichiers dans /public/brand/ puis renseigner :
   * { light: "/brand/logo-clair.svg", dark: "/brand/logo-sombre.svg", compact: "/brand/logo-compact.svg" }
   * - light  : version claire, pour fonds sombres
   * - dark   : version sombre, pour fonds clairs
   * - compact: version réduite (menu mobile)
   */
  officialLogo: null as { light: string; dark: string; compact: string } | null,

  /** Passer à true lorsque src/styles/theme.css contient la charte officielle */
  officialColors: false,

  /** Les photos du site sont-elles des photos officielles du lieu ? */
  officialPhotos: false,

  /** Mentions légales */
  legal: {
    companyName: null,
    legalForm: null,
    siret: null,
    rcs: null,
    vatNumber: null,
    publicationDirector: null,
    host: null,
  } as LegalInfo,
};

/** Liste lisible utilisée par la page /admin. */
export const DATA_TO_CONFIRM_LABELS: Record<string, string> = {
  phone: "Téléphone",
  email: "Email",
  siteUrl: "Nom de domaine",
  reservationUrl: "URL de réservation en ligne",
  prices: "Tarifs des activités",
  durations: "Durées indicatives",
  generalHoursConfirmed: "Horaires généraux (15 h – 00 h)",
  detailedHours: "Horaires détaillés",
  fullMenuAvailable: "Carte complète",
  birthdayFormulas: "Formules anniversaire / groupes",
  accessConditions: "Conditions d'accès",
  walkInPolicy: "Venue sans réservation",
  vegetarianOptions: "Options végétariennes",
  accessibility: "Accessibilité PMR",
  parking: "Stationnement",
  hasBabyFoot: "Baby-foot",
  hasPhotobooth: "Photomaton",
  officialLogo: "Logo officiel",
  officialColors: "Couleurs officielles",
  officialPhotos: "Photos officielles",
  legal: "Mentions légales (société, SIRET, hébergeur…)",
};
