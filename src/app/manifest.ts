import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — Oloron-Sainte-Marie`,
    short_name: SITE.name,
    description: SITE.shortPitch,
    start_url: "/",
    display: "standalone",
    background_color: "#0c2714",
    theme_color: "#0c2714",
    lang: "fr",
    icons: [
      { src: "/icon", sizes: "64x64", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
