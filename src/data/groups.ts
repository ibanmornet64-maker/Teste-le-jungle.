import type { IconName } from "@/components/ui/Icon";
import { DATA_TO_CONFIRM } from "@/config/data-to-confirm";

export type GroupSegment = {
  id: string;
  label: string;
  text: string;
  icon: IconName;
};

export const GROUP_SEGMENTS: GroupSegment[] = [
  { id: "anniv-enfant", label: "Anniversaire enfant", text: "Bowling, goûter et gaufres : la fête version aventure.", icon: "cake" },
  { id: "anniv-ado", label: "Anniversaire ado", text: "Entre potes, sur les pistes ou autour du billard.", icon: "bowling" },
  { id: "anniv-adulte", label: "Anniversaire adulte", text: "Planches, cocktails, parties endiablées et soirée.", icon: "cocktail" },
  { id: "amis", label: "Groupe d’amis", text: "Un lieu pour tout le monde, quelle que soit la taille de la bande.", icon: "users" },
  { id: "entreprise", label: "Entreprise & afterwork", text: "Décompresser entre collègues après le travail.", icon: "briefcase" },
  { id: "team-building", label: "Team building", text: "Des équipes, des défis, un classement… et beaucoup de rires.", icon: "trophy" },
  { id: "association", label: "Association & club", text: "Fêter une saison ou rassembler vos membres.", icon: "star" },
  { id: "prive", label: "Événement privé", text: "Un moment à part, pensé avec l’équipe du Jungle.", icon: "sparkles" },
];

/** Formules validées (vides tant que non confirmées → bloc masqué). */
export const GROUP_FORMULAS = DATA_TO_CONFIRM.birthdayFormulas;
