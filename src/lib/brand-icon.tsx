/**
 * Génère le favicon et l'icône d'écran d'accueil à partir du logo officiel
 * (fichier détecté dans /public/brand/). Sans logo : feuille temporaire.
 * Exécuté au moment du build (images statiques).
 */
import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

const MIME: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
};

async function readLogoAsDataUrl(): Promise<string | null> {
  const logo = process.env.NEXT_PUBLIC_BRAND_LOGO;
  if (!logo) return null;
  const file = decodeURIComponent(logo.replace(/^\//, ""));
  const mime = MIME[path.extname(file).toLowerCase()];
  if (!mime) return null; // WebP/AVIF : non pris en charge ici, on garde la feuille
  try {
    const buf = await fs.readFile(path.join(process.cwd(), "public", file));
    return `data:${mime};base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

export async function renderBrandIcon(size: number, { rounded }: { rounded: boolean }) {
  const logo = await readLogoAsDataUrl();
  const radius = rounded ? Math.round(size * 0.22) : 0;

  return new ImageResponse(
    logo ? (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#0c2714", borderRadius: radius, overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- rendu ImageResponse (pas de next/image) */}
        <img src={logo} width={size} height={size} alt="" style={{ objectFit: "cover" }} />
      </div>
    ) : (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#0c2714",
          borderRadius: radius,
        }}
      >
        <svg width={size * 0.72} height={size * 0.72} viewBox="0 0 64 64">
          <path d="M52 12C30 12 13 24 13 42c0 4.4 1.4 7.8 2.9 11C35 53 52 39 52 12Z" fill="#e2892f" />
          <path d="M16 53c7.3-11 16.6-21.2 29.3-31.4" stroke="#0c2714" strokeWidth="2.8" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    ),
    { width: size, height: size },
  );
}
