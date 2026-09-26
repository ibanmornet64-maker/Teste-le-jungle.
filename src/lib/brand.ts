import { DATA_TO_CONFIRM } from "@/config/data-to-confirm";

export type BrandLogo = { src: string; width: number; height: number };

/**
 * Logo officiel à afficher :
 *  1. DATA_TO_CONFIRM.officialLogo s'il est renseigné à la main ;
 *  2. sinon, le fichier détecté automatiquement dans /public/brand/ (next.config.ts) ;
 *  3. sinon, null : le logo texte temporaire est utilisé.
 */
export function getBrandLogo(): BrandLogo | null {
  if (DATA_TO_CONFIRM.officialLogo) return DATA_TO_CONFIRM.officialLogo;
  const detected = process.env.NEXT_PUBLIC_BRAND_LOGO;
  return detected ? { src: detected, width: 512, height: 512 } : null;
}
