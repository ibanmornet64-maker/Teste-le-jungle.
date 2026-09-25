export type NavItem = { label: string; href: string };

/** Liens principaux (menu). Garder une liste courte. */
export const MAIN_NAV: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "Le Jungle", href: "/le-concept" },
  { label: "Activités", href: "/activites" },
  { label: "Carte", href: "/manger-boire" },
  { label: "Événements", href: "/evenements" },
  { label: "Groupes", href: "/groupes" },
  { label: "Contact", href: "/contact" },
];

/** Liens secondaires (footer). */
export const FOOTER_NAV: NavItem[] = [
  { label: "Bowling", href: "/activites/bowling" },
  { label: "Billard & fléchettes", href: "/activites/billard-flechettes" },
  { label: "Anniversaires & groupes", href: "/groupes" },
  { label: "Galerie", href: "/galerie" },
  { label: "FAQ", href: "/faq" },
  { label: "Réserver", href: "/reserver" },
];

export const LEGAL_NAV: NavItem[] = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/confidentialite" },
];
