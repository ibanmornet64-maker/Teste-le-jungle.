/**
 * Activités du Jungle.
 * Les champs `price` et `duration` proviennent de DATA_TO_CONFIRM : ils ne
 * s'affichent que lorsqu'ils sont renseignés.
 */
import { DATA_TO_CONFIRM } from "@/config/data-to-confirm";
import { SITE } from "@/config/site";
import { IMAGES, type SiteImage } from "./images";
import type { IconName } from "@/components/ui/Icon";

export type Activity = {
  slug: string;
  name: string;
  icon: IconName;
  /** Nombre d'équipements (null = non communiqué) */
  count: number | null;
  countLabel: string;
  tagline: string;
  short: string;
  description: string;
  image: SiteImage | null;
  audience: string[];
  ambiance: string;
  duration: string | null;
  price: string | null;
  href: string;
  /** false = activité masquée sur le site public */
  visible: boolean;
};

export const ACTIVITIES: Activity[] = [
  {
    slug: "bowling",
    name: "Bowling",
    icon: "bowling",
    count: SITE.equipment.bowlingLanes,
    countLabel: "pistes de bowling",
    tagline: "Strike entre amis",
    short: "4 pistes pour une partie entre amis, en famille ou entre collègues.",
    description:
      "Avec 4 pistes de bowling, Le Jungle est l’endroit idéal pour une partie entre amis, une sortie en famille, un anniversaire ou un afterwork.",
    image: IMAGES.bowling,
    audience: ["Entre amis", "En famille", "Anniversaires", "Afterworks"],
    ambiance: "Lumières tamisées, musique et esprit de compétition bon enfant.",
    duration: DATA_TO_CONFIRM.durations.bowling,
    price: DATA_TO_CONFIRM.prices.bowling,
    href: "/activites/bowling",
    visible: true,
  },
  {
    slug: "billard",
    name: "Billard",
    icon: "billiard",
    count: SITE.equipment.billiards,
    countLabel: "billards",
    tagline: "Le coup parfait",
    short: "3 billards pour prolonger la soirée, un verre à la main.",
    description:
      "Les 3 billards permettent de prolonger la soirée dans une ambiance détendue, entre deux parties ou autour d’un verre.",
    image: IMAGES.billard,
    audience: ["Entre amis", "En duo", "Afterworks"],
    ambiance: "Détendue, sous la lumière des suspensions.",
    duration: DATA_TO_CONFIRM.durations.billard,
    price: DATA_TO_CONFIRM.prices.billard,
    href: "/activites/billard-flechettes#billard",
    visible: true,
  },
  {
    slug: "flechettes",
    name: "Fléchettes",
    icon: "darts",
    count: SITE.equipment.dartboards,
    countLabel: "postes de fléchettes",
    tagline: "Visez juste",
    short: "2 postes pour des défis express et des revanches.",
    description:
      "Avec 2 postes de fléchettes, lancez-vous des défis entre amis et ajoutez une dose de compétition à votre sortie.",
    image: IMAGES.flechettes,
    audience: ["Entre amis", "Entre collègues", "Défis en équipe"],
    ambiance: "Compétitive, rapide et toujours dans la bonne humeur.",
    duration: DATA_TO_CONFIRM.durations.flechettes,
    price: DATA_TO_CONFIRM.prices.flechettes,
    href: "/activites/billard-flechettes#flechettes",
    visible: true,
  },
  {
    slug: "soirees",
    name: "Soirées",
    icon: "party",
    count: null,
    countLabel: "",
    tagline: "La jungle by night",
    short: "Soirées dansantes, afterworks et soirées à thème au fil de l’année.",
    description:
      "Quand la nuit tombe, Le Jungle change d’ambiance : soirées dansantes, afterworks et soirées à thème. Le programme évolue régulièrement, suivez-le sur Instagram.",
    image: IMAGES.soirees,
    audience: ["Entre amis", "Afterworks", "Soirées à thème"],
    ambiance: "Colorée, festive et immersive.",
    duration: null,
    price: null,
    href: "/evenements",
    visible: true,
  },
  {
    slug: "baby-foot",
    name: "Baby-foot",
    icon: "football",
    count: null,
    countLabel: "",
    tagline: "Match éclair",
    short: "Un baby-foot pour les matchs éclairs entre deux parties.",
    description: "Un baby-foot pour des matchs éclairs entre deux parties.",
    image: null,
    audience: ["Entre amis", "En famille"],
    ambiance: "Rapide et animée.",
    duration: null,
    price: null,
    href: "/activites",
    visible: DATA_TO_CONFIRM.hasBabyFoot,
  },
  {
    slug: "photomaton",
    name: "Photomaton",
    icon: "camera",
    count: null,
    countLabel: "",
    tagline: "Souvenir garanti",
    short: "Un photomaton pour repartir avec un souvenir de la soirée.",
    description: "Un photomaton pour immortaliser la soirée et repartir avec un souvenir.",
    image: null,
    audience: ["Entre amis", "En famille", "Anniversaires"],
    ambiance: "Fun et décalée.",
    duration: null,
    price: null,
    href: "/activites",
    visible: DATA_TO_CONFIRM.hasPhotobooth,
  },
];

export const visibleActivities = ACTIVITIES.filter((a) => a.visible);
export const getActivity = (slug: string) => ACTIVITIES.find((a) => a.slug === slug);

/** Activités « jouables » (hors soirées), utilisées dans les formulaires. */
export const GAME_ACTIVITIES = visibleActivities
  .filter((a) => a.slug !== "soirees")
  .map((a) => a.name);
