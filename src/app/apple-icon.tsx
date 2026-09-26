import { renderBrandIcon } from "@/lib/brand-icon";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Icône d'écran d'accueil iOS (iOS arrondit lui-même les coins). */
export default function AppleIcon() {
  return renderBrandIcon(180, { rounded: false });
}
