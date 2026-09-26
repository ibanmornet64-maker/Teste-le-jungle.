/**
 * ============================================================================
 *  Boutons de contact — site vitrine, sans formulaire ni serveur
 * ============================================================================
 *  Le bouton principal (header, hero, bas de page, barre mobile…) s'adapte
 *  automatiquement aux informations renseignées dans
 *  src/config/data-to-confirm.ts :
 *
 *   1. reservationUrl renseignée → « Réserver en ligne » (plateforme externe)
 *   2. sinon, téléphone renseigné → « Appeler »
 *   3. sinon                      → « Envoyer un message sur Instagram »
 *
 *  Aucune réservation n'est enregistrée par le site : tout passe par
 *  Instagram, le téléphone ou l'email du Jungle.
 * ============================================================================
 */
import type { IconName } from "@/components/ui/Icon";
import { CONTACT, SITE, phoneHref } from "@/config/site";
import { DATA_TO_CONFIRM } from "@/config/data-to-confirm";

export type ContactAction = {
  id: "booking" | "phone" | "instagram" | "email";
  /** Libellé complet (boutons larges, pages intérieures) */
  label: string;
  /** Libellé court (header, barre mobile) */
  shortLabel: string;
  href: string;
  /** Ouvre un nouvel onglet (liens web) */
  external: boolean;
  icon: IconName;
  /** Détail affiché sous le libellé (numéro, pseudo…) */
  detail?: string;
};

export const INSTAGRAM_ACTION: ContactAction = {
  id: "instagram",
  label: "Envoyer un message sur Instagram",
  shortLabel: "Nous écrire",
  href: SITE.social.instagram.dm,
  external: true,
  icon: "instagram",
  detail: SITE.social.instagram.handle,
};

/** Toutes les façons de joindre Le Jungle, dans l'ordre de préférence. */
export function getContactActions(): ContactAction[] {
  const actions: ContactAction[] = [];
  if (DATA_TO_CONFIRM.reservationUrl) {
    actions.push({
      id: "booking",
      label: "Réserver en ligne",
      shortLabel: "Réserver",
      href: DATA_TO_CONFIRM.reservationUrl,
      external: true,
      icon: "calendar",
    });
  }
  if (CONTACT.phone) {
    actions.push({
      id: "phone",
      label: "Appeler Le Jungle",
      shortLabel: "Appeler",
      href: phoneHref(CONTACT.phone),
      external: false,
      icon: "phone",
      detail: CONTACT.phone,
    });
  }
  actions.push(INSTAGRAM_ACTION);
  if (CONTACT.email) {
    actions.push({
      id: "email",
      label: "Envoyer un email",
      shortLabel: "Email",
      href: `mailto:${CONTACT.email}`,
      external: false,
      icon: "mail",
      detail: CONTACT.email,
    });
  }
  return actions;
}

/** Bouton principal du site. */
export function getPrimaryAction(): ContactAction {
  return getContactActions()[0];
}

/** Deuxième moyen de contact (ex. Instagram quand le principal est « Appeler »). */
export function getSecondaryAction(): ContactAction | undefined {
  return getContactActions()[1];
}

/**
 * Bouton « réserver » d'un événement : lien de billetterie de l'événement
 * s'il existe, sinon le contact principal (appel ou message Instagram).
 */
export function getEventBookingAction(event: { reservationUrl?: string | null }): ContactAction {
  if (event.reservationUrl) {
    return { id: "booking", label: "Réserver", shortLabel: "Réserver", href: event.reservationUrl, external: true, icon: "ticket" };
  }
  const primary = getPrimaryAction();
  const label =
    primary.id === "phone" ? "Appeler pour réserver" : primary.id === "instagram" ? "Réserver par message" : primary.label;
  return { ...primary, label, shortLabel: label };
}
