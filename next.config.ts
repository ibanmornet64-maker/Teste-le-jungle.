import fs from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";

/**
 * Logo officiel détecté automatiquement dans /public/brand/.
 * Il suffit d'y déposer le fichier (ex. logo.png) : il remplace le logo texte
 * temporaire partout (header, footer, favicon, données Google).
 * Priorité au fichier nommé « logo.* », sinon la première image du dossier.
 * Les fichiers commençant par « _ » ou « . » sont ignorés.
 */
function detectBrandLogo(): string {
  try {
    const files = fs
      .readdirSync(path.join(process.cwd(), "public", "brand"))
      .filter((f) => /\.(png|jpe?g|webp|avif|svg)$/i.test(f) && !/^[._]/.test(f))
      .sort();
    const pick = files.find((f) => /^logo\./i.test(f)) ?? files[0];
    return pick ? `/brand/${encodeURIComponent(pick)}` : "";
  } catch {
    return "";
  }
}

/**
 * En-têtes de sécurité renforcés : automatiques sur Vercel (VERCEL=1 est
 * fourni par la plateforme), ou via STRICT_SECURITY_HEADERS=true ailleurs.
 */
const strictHeaders = process.env.VERCEL === "1" || process.env.STRICT_SECURITY_HEADERS === "true";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // Protection anti-clickjacking : activée en ligne (Vercel) uniquement,
  // pour laisser fonctionner les aperçus de développement en iframe.
  ...(strictHeaders
    ? [
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
        { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
      ]
    : []),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_BRAND_LOGO: detectBrandLogo(),
  },
  // Aperçus distants (tunnels de développement)
  allowedDevOrigins: ["*.e2b.app", "**.e2b.app"],
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 80],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Vignettes des publications Instagram (flux Behold). Elles sont optimisées
    // et servies depuis le site lui-même : le navigateur du visiteur ne contacte
    // ni Instagram ni Behold.
    remotePatterns: [
      { protocol: "https", hostname: "behold.pictures" },
      { protocol: "https", hostname: "**.behold.pictures" },
    ],
  },
  // Ancienne page de réservation (formulaire supprimé) → page contact.
  async redirects() {
    return [{ source: "/reserver", destination: "/contact", permanent: true }];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;
