import type { MetadataRoute } from "next";
import { SITE, SITE_INDEXABLE } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  // Prévisualisations Vercel ou SITE_NOINDEX=true : on bloque toute indexation.
  if (!SITE_INDEXABLE) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] }],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
