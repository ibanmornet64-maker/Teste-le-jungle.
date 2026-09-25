/**
 * Galerie — sélection manuelle (pas de flux Instagram automatique).
 * `span` pilote la mosaïque asymétrique : "tall", "wide", "big" ou "normal".
 * Pour ajouter des photos issues d'Instagram, obtenir l'autorisation
 * préalable, puis les déposer dans /public/images/.
 */
import { IMAGES, type SiteImage } from "./images";

export type GalleryItem = {
  image: SiteImage;
  caption: string;
  category: "Jeux" | "Gourmand" | "Ambiance";
  span: "normal" | "tall" | "wide" | "big";
};

export const GALLERY: GalleryItem[] = [
  { image: IMAGES.hero, caption: "Les pistes de bowling", category: "Jeux", span: "big" },
  { image: IMAGES.cocktails, caption: "Cocktails maison", category: "Gourmand", span: "tall" },
  { image: IMAGES.pinsa, caption: "Pinsa à partager", category: "Gourmand", span: "normal" },
  { image: IMAGES.billard, caption: "Les billards", category: "Jeux", span: "normal" },
  { image: IMAGES.soirees, caption: "Soirée dansante", category: "Ambiance", span: "wide" },
  { image: IMAGES.flechettes, caption: "Les fléchettes", category: "Jeux", span: "normal" },
  { image: IMAGES.planche, caption: "Planche entre amis", category: "Ambiance", span: "normal" },
  { image: IMAGES.mocktails, caption: "Mocktails & smoothies", category: "Gourmand", span: "normal" },
  { image: IMAGES.gouter, caption: "L’heure du goûter", category: "Gourmand", span: "wide" },
  { image: IMAGES.bowling, caption: "Prêt pour le strike", category: "Jeux", span: "normal" },
];

/** Sélection courte pour la page d'accueil. */
export const HOME_GALLERY = GALLERY.slice(0, 7);
