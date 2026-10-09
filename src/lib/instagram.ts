/**
 * ============================================================================
 *  Dernières publications Instagram (@lejungle64)
 * ============================================================================
 *
 *  Source : un flux JSON Behold.so (https://behold.so), relié au compte
 *  Instagram du Jungle avec l'autorisation officielle d'Instagram. Aucun jeton
 *  ni mot de passe n'est stocké dans le site.
 *
 *  Fonctionnement :
 *  - le flux est lu par le site au moment de la génération des pages, jamais
 *    par le navigateur des visiteurs ;
 *  - la page d'accueil se régénère au plus une fois par heure (Vercel s'en
 *    charge seul) : une nouvelle publication apparaît donc automatiquement,
 *    sans redéploiement, dès que Behold a mis son flux à jour (1 fois par jour
 *    en formule gratuite) ;
 *  - au plus 24 lectures par jour, soit moins de 750 par mois, sous la limite
 *    de 1 200 « vues » mensuelles de la formule gratuite de Behold ;
 *  - en cas d'absence de configuration ou de panne, le bloc est simplement
 *    masqué : jamais de bloc vide ni de message d'erreur public.
 * ============================================================================
 */
import { DATA_TO_CONFIRM } from "@/config/data-to-confirm";

/** Intervalle de régénération de la page d'accueil quand le flux est actif (secondes). */
export const INSTAGRAM_REVALIDATE_SECONDS = 3600;

export type InstagramPostKind = "image" | "video" | "reel" | "album";

export type InstagramPost = {
  id: string;
  permalink: string;
  /** Date de publication, ISO 8601 */
  date: string;
  kind: InstagramPostKind;
  image: { src: string; width: number; height: number };
  /** Texte alternatif saisi sur Instagram (peut être vide) */
  alt: string;
  /** Légende sans les hashtags */
  caption: string;
  /** Couleur dominante, affichée pendant le chargement de l'image */
  placeholderColor: string | null;
};

/** URL du flux : variable d'environnement INSTAGRAM_FEED_URL, sinon data-to-confirm.ts. */
export function getInstagramFeedUrl(): string | null {
  const raw = (process.env.INSTAGRAM_FEED_URL || DATA_TO_CONFIRM.instagramFeedUrl || "").trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    const httpAllowed = process.env.NODE_ENV !== "production" && url.protocol === "http:";
    if (url.protocol !== "https:" && !httpAllowed) return null;
    return url.toString();
  } catch {
    return null;
  }
}

/* ----------------------------- Lecture du flux ---------------------------- */

type Json = Record<string, unknown>;
const isObj = (v: unknown): v is Json => typeof v === "object" && v !== null && !Array.isArray(v);
const str = (v: unknown) => (typeof v === "string" ? v : "");

/** Seules les images du CDN Behold (autorisées dans next.config.ts) ou locales sont acceptées. */
function isAllowedImage(src: string): boolean {
  if (src.startsWith("/") && !src.startsWith("//")) return true;
  try {
    const { protocol, hostname } = new URL(src);
    return protocol === "https:" && (hostname === "behold.pictures" || hostname.endsWith(".behold.pictures"));
  } catch {
    return false;
  }
}

function isInstagramLink(href: string): boolean {
  try {
    const { protocol, hostname } = new URL(href);
    return protocol === "https:" && (hostname === "instagram.com" || hostname.endsWith(".instagram.com"));
  } catch {
    return false;
  }
}

/** "2026-10-08T19:02:11+0000" → "2026-10-08T19:02:11+00:00" (format accepté partout). */
function normalizeDate(value: string): string | null {
  const iso = value.replace(/([+-]\d{2})(\d{2})$/, "$1:$2");
  const time = Date.parse(iso);
  return Number.isNaN(time) ? null : new Date(time).toISOString();
}

function pickImage(sizes: unknown): InstagramPost["image"] | null {
  if (!isObj(sizes)) return null;
  for (const key of ["medium", "large", "small", "full"]) {
    const size = sizes[key];
    if (!isObj(size)) continue;
    const src = str(size.mediaUrl);
    const width = Number(size.width);
    const height = Number(size.height);
    if (src && isAllowedImage(src) && width > 0 && height > 0) return { src, width, height };
  }
  return null;
}

function toPost(raw: unknown): InstagramPost | null {
  if (!isObj(raw)) return null;
  // Publication masquée depuis le tableau de bord Behold
  if (raw.visibility === "hidden") return null;
  const id = str(raw.id);
  const permalink = str(raw.permalink);
  const date = normalizeDate(str(raw.timestamp));
  const image = pickImage(raw.sizes);
  if (!id || !date || !image || !isInstagramLink(permalink)) return null;

  const mediaType = str(raw.mediaType);
  const kind: InstagramPostKind =
    mediaType === "CAROUSEL_ALBUM" ? "album" : mediaType === "VIDEO" ? (raw.isReel ? "reel" : "video") : "image";

  const palette = isObj(raw.colorPalette) ? str(raw.colorPalette.mutedDark || raw.colorPalette.dominant) : "";
  const placeholderColor = /^\d{1,3},\d{1,3},\d{1,3}$/.test(palette) ? `rgb(${palette})` : null;

  return {
    id,
    permalink,
    date,
    kind,
    image,
    alt: str(raw.altText).slice(0, 300),
    caption: str(raw.prunedCaption || raw.caption).replace(/\s+/g, " ").trim().slice(0, 280),
    placeholderColor,
  };
}

/**
 * Les `limit` publications les plus récentes, ou une liste vide si le flux
 * n'est pas configuré ou indisponible.
 */
export async function getLatestInstagramPosts(limit = 4): Promise<InstagramPost[]> {
  const url = getInstagramFeedUrl();
  if (!url) return [];
  try {
    const res = await fetch(url, {
      headers: { accept: "application/json" },
      next: { revalidate: INSTAGRAM_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return [];
    const data: unknown = await res.json();
    const list = isObj(data) && Array.isArray(data.posts) ? data.posts : Array.isArray(data) ? data : [];
    return list
      .map(toPost)
      .filter((p): p is InstagramPost => p !== null)
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, limit);
  } catch {
    return [];
  }
}
