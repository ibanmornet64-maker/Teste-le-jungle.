/**
 * Frise « Une journée au Jungle » — simple suggestion d'expérience.
 * Les étapes `requires` ne s'affichent que si l'équipement est confirmé.
 */
import { DATA_TO_CONFIRM } from "@/config/data-to-confirm";
import type { IconName } from "@/components/ui/Icon";

export type TimelineStep = {
  time: string;
  title: string;
  text: string;
  icon: IconName;
  visible: boolean;
};

const steps: TimelineStep[] = [
  { time: "15 h", title: "Goûter", text: "Une gaufre, un smoothie : on démarre en douceur.", icon: "waffle", visible: true },
  { time: "16 h", title: "Billard", text: "Une partie tranquille, la queue à la main.", icon: "billiard", visible: true },
  { time: "17 h", title: "Mocktail", text: "Pause fraîcheur, sans alcool mais pleine de saveurs.", icon: "smoothie", visible: true },
  { time: "18 h", title: "Fléchettes", text: "Le défi du jour : qui visera le plus juste ?", icon: "darts", visible: true },
  { time: "19 h", title: "Pinsa & cocktail", text: "Le soleil décline, la table se remplit.", icon: "pinsa", visible: true },
  { time: "20 h", title: "Photomaton", text: "La photo souvenir de la bande.", icon: "camera", visible: DATA_TO_CONFIRM.hasPhotobooth },
  { time: "21 h", title: "Planche à partager", text: "Tout le monde pioche, personne ne compte.", icon: "share-plate", visible: true },
  { time: "Et ensuite", title: "Bowling & soirée", text: "Les pistes s’illuminent, la soirée commence.", icon: "bowling", visible: true },
];

export const TIMELINE = steps.filter((s) => s.visible);
