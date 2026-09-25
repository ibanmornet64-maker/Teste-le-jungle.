/**
 * ============================================================================
 *  Médiathèque centrale
 * ============================================================================
 *  ⚠️ Tous les visuels actuels sont des IMAGES D'ILLUSTRATION TEMPORAIRES
 *  (générées pour la maquette). Elles ne représentent PAS le lieu réel et
 *  doivent être remplacées par des photos officielles avant publication.
 *
 *  Pour remplacer une image :
 *   1. Déposer la photo dans /public/images/ (idéalement en .webp ou .avif,
 *      ~2000 px de large pour le hero, ~1600 px pour le reste).
 *   2. Mettre à jour `src`, `width`, `height`, `alt` ci-dessous.
 *   3. Passer `temporary` à `false`.
 *
 *  Next.js génère automatiquement les variantes AVIF/WebP responsive.
 * ============================================================================
 */

export type SiteImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** true = visuel d'illustration à remplacer */
  temporary: boolean;
};

const temp = (file: string, alt: string, width = 1536, height = 1024): SiteImage => ({
  src: `/images/temp/${file}`,
  width,
  height,
  alt,
  temporary: true,
});

export const IMAGES = {
  hero: temp(
    "hero.webp",
    "Pistes de bowling éclairées dans une ambiance tropicale tamisée, entourées de plantes",
    1672,
    941,
  ),
  bowling: temp(
    "bowling.webp",
    "Boule de bowling verte sur une piste en bois, quilles en arrière-plan",
  ),
  billard: temp(
    "billard.webp",
    "Table de billard au tapis vert sous une suspension chaleureuse, plantes autour",
  ),
  flechettes: temp(
    "flechettes.webp",
    "Cible de fléchettes avec trois fléchettes plantées près du centre",
  ),
  soirees: temp(
    "soirees.webp",
    "Silhouettes de personnes qui dansent sous des lumières orange et violettes",
  ),
  cocktails: temp(
    "cocktails.webp",
    "Deux cocktails colorés posés sur un comptoir en bois, feuillage en arrière-plan",
  ),
  mocktails: temp(
    "mocktails.webp",
    "Trois boissons sans alcool colorées garnies de fruits frais",
  ),
  pinsa: temp("pinsa.webp", "Pinsa à la tomate, mozzarella et basilic sur une planche en bois"),
  planche: temp(
    "planche.webp",
    "Planche apéritive à partager avec charcuterie, fromages, olives et pain",
  ),
  gouter: temp(
    "gouter.webp",
    "Gaufres aux fruits rouges et smoothie à la framboise pour le goûter",
  ),

  /* Emplacements prévus, en attente de photos officielles (non affichés tant que null). */
  facade: null as SiteImage | null,
  equipe: null as SiteImage | null,
} satisfies Record<string, SiteImage | null>;

export const OG_IMAGE = {
  src: "/images/temp/og-le-jungle.jpg",
  width: 1200,
  height: 630,
  alt: "Le Jungle — bowling, billard, fléchettes et bar à Oloron-Sainte-Marie",
};

export const hasTemporaryMedia = Object.values(IMAGES).some((img) => img?.temporary);
