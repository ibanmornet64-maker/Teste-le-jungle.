import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";
import { getUpcomingEvents } from "@/data/events";

export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");
  const pages: [string, number][] = [
    ["/", 1],
    ["/le-concept", 0.8],
    ["/activites", 0.9],
    ["/activites/bowling", 0.9],
    ["/activites/billard-flechettes", 0.8],
    ["/manger-boire", 0.8],
    ["/evenements", 0.8],
    ["/groupes", 0.8],
    ["/galerie", 0.6],
    ["/faq", 0.6],
    ["/contact", 0.8],
    ["/reserver", 0.7],
    ["/mentions-legales", 0.2],
    ["/confidentialite", 0.2],
  ];
  const now = new Date();
  return [
    ...pages.map(([path, priority]) => ({ url: `${base}${path}`, lastModified: now, priority })),
    ...getUpcomingEvents().map((e) => ({ url: `${base}/evenements/${e.slug}`, lastModified: now, priority: 0.7 })),
  ];
}
