/**
 * ============================================================================
 *  Carte — Manger & boire
 * ============================================================================
 *  La carte complète n'a pas encore été communiquée : seules les catégories
 *  confirmées sont affichées, sans plats inventés.
 *
 *  Pour ajouter un produit, complétez `items` dans la catégorie voulue :
 *   { name: "Pinsa …", description: "…", price: "12 €", allergens: ["Gluten", "Lait"], vegetarian: true }
 *
 *  Pour afficher une catégorie en attente (Desserts, Boissons, Formules),
 *  passez `confirmed` à true.
 *  Pensez à passer DATA_TO_CONFIRM.fullMenuAvailable à true quand la carte
 *  est complète.
 * ============================================================================
 */
import { IMAGES, type SiteImage } from "./images";
import type { IconName } from "@/components/ui/Icon";

export type MenuItem = {
  name: string;
  description?: string;
  price?: string;
  allergens?: string[];
  vegetarian?: boolean;
  image?: SiteImage;
};

export type MenuCategory = {
  id: string;
  name: string;
  icon: IconName;
  moment: "Journée" | "Soirée" | "Toute la journée";
  description: string;
  highlights: string[];
  image: SiteImage | null;
  items: MenuItem[];
  confirmed: boolean;
};

export const MENU: MenuCategory[] = [
  {
    id: "a-partager",
    name: "À partager",
    icon: "share-plate",
    moment: "Toute la journée",
    description: "Tapas, assiettes et planches apéritives à poser au centre de la table.",
    highlights: ["Tapas", "Assiettes à partager", "Planches apéritives"],
    image: IMAGES.planche,
    items: [],
    confirmed: true,
  },
  {
    id: "pinsas",
    name: "Pinsas",
    icon: "pinsa",
    moment: "Toute la journée",
    description: "La pinsa, pâte légère d’inspiration romaine, à partager ou à savourer seul.",
    highlights: ["Pinsas"],
    image: IMAGES.pinsa,
    items: [],
    confirmed: true,
  },
  {
    id: "gouter",
    name: "Goûter",
    icon: "waffle",
    moment: "Journée",
    description: "Gaufres et smoothies pour une pause gourmande l’après-midi.",
    highlights: ["Gaufres", "Smoothies", "Goûters"],
    image: IMAGES.gouter,
    items: [],
    confirmed: true,
  },
  {
    id: "cocktails",
    name: "Cocktails",
    icon: "cocktail",
    moment: "Soirée",
    description: "Des cocktails colorés pour trinquer entre deux parties.",
    highlights: ["Cocktails"],
    image: IMAGES.cocktails,
    items: [],
    confirmed: true,
  },
  {
    id: "mocktails",
    name: "Mocktails & smoothies",
    icon: "smoothie",
    moment: "Toute la journée",
    description: "Sans alcool, mais pas sans saveur : mocktails et smoothies pour tous.",
    highlights: ["Mocktails", "Smoothies"],
    image: IMAGES.mocktails,
    items: [],
    confirmed: true,
  },
  {
    id: "desserts",
    name: "Desserts",
    icon: "waffle",
    moment: "Toute la journée",
    description: "",
    highlights: [],
    image: null,
    items: [],
    confirmed: false,
  },
  {
    id: "boissons",
    name: "Boissons",
    icon: "glass",
    moment: "Toute la journée",
    description: "",
    highlights: [],
    image: null,
    items: [],
    confirmed: false,
  },
  {
    id: "formules",
    name: "Menus & formules",
    icon: "star",
    moment: "Toute la journée",
    description: "",
    highlights: [],
    image: null,
    items: [],
    confirmed: false,
  },
];

export const visibleMenu = MENU.filter((c) => c.confirmed);
export const menuHasItems = visibleMenu.some((c) => c.items.length > 0);

/** Mots-clés gourmands affichés en « chips ». */
export const FOOD_KEYWORDS = [
  "Pinsas",
  "Tapas",
  "Planches à partager",
  "Gaufres",
  "Smoothies",
  "Cocktails",
  "Mocktails",
];
