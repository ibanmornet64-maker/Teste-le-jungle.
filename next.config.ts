import type { NextConfig } from "next";

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
  // Aperçus distants (tunnels de développement)
  allowedDevOrigins: ["*.e2b.app", "**.e2b.app"],
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 80],
    minimumCacheTTL: 60 * 60 * 24 * 30,
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
