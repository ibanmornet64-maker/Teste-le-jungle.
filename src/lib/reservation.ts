import { DATA_TO_CONFIRM } from "@/config/data-to-confirm";

export type ReservationCta = {
  /** Libellé complet (« Réserver en ligne » / « Demander une réservation ») */
  label: string;
  /** Libellé court pour le header et le hero */
  shortLabel: string;
  href: string;
  external: boolean;
};

/**
 * Le bouton de réservation s'adapte automatiquement à la configuration :
 * - URL officielle renseignée → « Réserver en ligne » (lien externe)
 * - Sinon → « Demander une réservation » (formulaire, aucune confirmation automatique)
 */
export function getReservationCta(): ReservationCta {
  const url = DATA_TO_CONFIRM.reservationUrl;
  if (url) {
    return { label: "Réserver en ligne", shortLabel: "Réserver", href: url, external: true };
  }
  return {
    label: "Demander une réservation",
    shortLabel: "Réserver",
    href: "/reserver",
    external: false,
  };
}
