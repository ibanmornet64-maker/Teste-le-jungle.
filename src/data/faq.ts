/**
 * FAQ — questions et réponses faciles à modifier.
 * Règle : on ne répond que ce qui est confirmé. Sinon, on renvoie vers
 * l'équipe avec la réponse neutre `ASK_TEAM`.
 * Les réponses sont aussi publiées en données structurées (FAQPage).
 */
import { DATA_TO_CONFIRM } from "@/config/data-to-confirm";
import { CONTACT, SITE, fullAddress } from "@/config/site";

export type FaqItem = {
  question: string;
  answer: string;
  link?: { label: string; href: string };
};

const ASK_TEAM = "Contactez directement Le Jungle pour connaître les conditions actuelles.";
const contactLink = { label: "Contacter Le Jungle", href: "/contact" };

const hoursAnswer = CONTACT.hoursVisible
  ? `Le Jungle est ouvert ${SITE.hours.summary.toLowerCase()}.${
      DATA_TO_CONFIRM.detailedHours ? ` ${DATA_TO_CONFIRM.detailedHours}` : ""
    } Les horaires peuvent évoluer lors d’événements : pensez à consulter notre Instagram.`
  : ASK_TEAM;

export const FAQ: FaqItem[] = [
  {
    question: "Où se trouve Le Jungle ?",
    answer: `Le Jungle se trouve au ${fullAddress}, dans le Béarn (Pyrénées-Atlantiques).`,
    link: { label: "Voir l’accès", href: "/contact#acces" },
  },
  {
    question: "Quels sont les horaires ?",
    answer: hoursAnswer,
    link: CONTACT.hoursVisible ? undefined : contactLink,
  },
  {
    question: "Combien y a-t-il de pistes de bowling ?",
    answer: `Le Jungle compte ${SITE.equipment.bowlingLanes} pistes de bowling, ${SITE.equipment.billiards} billards et ${SITE.equipment.dartboards} postes de fléchettes.`,
    link: { label: "Découvrir le bowling", href: "/activites/bowling" },
  },
  {
    question: "Peut-on venir sans réserver ?",
    answer: DATA_TO_CONFIRM.walkInPolicy ?? ASK_TEAM,
    link: DATA_TO_CONFIRM.walkInPolicy ? undefined : contactLink,
  },
  {
    question: "Peut-on réserver une piste ?",
    answer: DATA_TO_CONFIRM.reservationUrl
      ? "Oui, vous pouvez réserver directement en ligne."
      : "Vous pouvez envoyer une demande de réservation grâce à notre formulaire. L’équipe du Jungle vous recontacte pour confirmer la disponibilité : la réservation n’est validée qu’après sa confirmation.",
    link: { label: "Faire une demande", href: DATA_TO_CONFIRM.reservationUrl ?? "/reserver" },
  },
  {
    question: "Le lieu est-il adapté aux enfants ?",
    answer: DATA_TO_CONFIRM.accessConditions
      ? `Le Jungle accueille les familles. ${DATA_TO_CONFIRM.accessConditions}`
      : "Le Jungle accueille les familles, notamment en journée avec le bowling et les goûters. Pour les conditions d’accès des mineurs, en particulier en soirée, contactez directement l’équipe.",
    link: DATA_TO_CONFIRM.accessConditions ? undefined : contactLink,
  },
  {
    question: "Peut-on organiser un anniversaire ?",
    answer:
      "Oui, Le Jungle accueille les anniversaires d’enfants, d’ados et d’adultes. Envoyez-nous votre demande avec la date et le nombre de participants : l’équipe vous répond avec les possibilités.",
    link: { label: "Anniversaires & groupes", href: "/groupes" },
  },
  {
    question: "Peut-on organiser un événement d’entreprise ?",
    answer:
      "Oui : afterworks, team building ou soirée d’équipe. Décrivez votre projet dans le formulaire groupes et l’équipe vous recontacte.",
    link: { label: "Demande pour un groupe", href: "/groupes#demande" },
  },
  {
    question: "Peut-on manger sur place ?",
    answer:
      "Oui : pinsas, tapas, assiettes et planches à partager, ainsi que des gaufres et smoothies pour le goûter.",
    link: { label: "Voir la carte", href: "/manger-boire" },
  },
  {
    question: "Y a-t-il des plats végétariens ?",
    answer: DATA_TO_CONFIRM.vegetarianOptions ?? ASK_TEAM,
    link: DATA_TO_CONFIRM.vegetarianOptions ? undefined : contactLink,
  },
  {
    question: "Peut-on venir uniquement boire un verre ?",
    answer:
      "Bien sûr. Cocktails, mocktails ou smoothies : vous pouvez simplement passer boire un verre, avec ou sans partie.",
  },
  {
    question: "Y a-t-il des événements ?",
    answer:
      "Oui, Le Jungle organise régulièrement des soirées : soirées dansantes, afterworks, soirées à thème… Le programme est publié sur la page Événements et sur Instagram.",
    link: { label: "Voir les événements", href: "/evenements" },
  },
  {
    question: "Le lieu est-il accessible aux personnes à mobilité réduite ?",
    answer: DATA_TO_CONFIRM.accessibility ?? ASK_TEAM,
    link: DATA_TO_CONFIRM.accessibility ? undefined : contactLink,
  },
  {
    question: "Peut-on se garer à proximité ?",
    answer: DATA_TO_CONFIRM.parking ?? ASK_TEAM,
    link: DATA_TO_CONFIRM.parking ? undefined : contactLink,
  },
];
