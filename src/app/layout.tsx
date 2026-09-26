import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { RevealObserver } from "@/components/layout/RevealObserver";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE, SITE_INDEXABLE } from "@/config/site";
import { OG_IMAGE } from "@/data/images";
import { localBusinessSchema } from "@/lib/schema";
import "./globals.css";

/* Polices auto-hébergées (aucun appel à Google Fonts : rapide et respectueux de la vie privée) */
const fredoka = localFont({
  src: "../fonts/fredoka-latin-var.woff2",
  variable: "--font-fredoka",
  display: "swap",
  weight: "300 700",
  preload: true,
});

const inter = localFont({
  src: "../fonts/inter-latin-var.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
  preload: true,
});

const TITLE = "Le Jungle Oloron — Bowling, billard, fléchettes, cocktails et soirées";
const DESCRIPTION =
  "Découvrez Le Jungle à Oloron-Sainte-Marie : bowling, billard, fléchettes, pinsas, tapas, cocktails, goûters, événements et soirées.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: TITLE, template: "%s | Le Jungle Oloron" },
  description: DESCRIPTION,
  applicationName: SITE.name,
  keywords: [
    "Bowling Oloron-Sainte-Marie",
    "Bowling Oloron",
    "Billard Oloron",
    "Fléchettes Oloron",
    "Bar Oloron-Sainte-Marie",
    "Sortie à Oloron",
    "Activité famille Oloron",
    "Afterwork Oloron",
    "Anniversaire bowling Oloron",
    "Cocktails Oloron",
    "Pinsas Oloron",
    "Le Jungle 64",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    siteName: SITE.name,
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    images: [{ url: OG_IMAGE.src, width: OG_IMAGE.width, height: OG_IMAGE.height, alt: OG_IMAGE.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE.src],
  },
  robots: SITE_INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#0b241b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${fredoka.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Active les animations d'apparition uniquement si JS est disponible */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-svh overflow-x-clip">
        <a
          href="#contenu"
          className="fixed top-3 left-3 z-[100] -translate-y-24 rounded-full bg-gold px-5 py-3 font-semibold text-night transition-transform focus:translate-y-0"
        >
          Aller au contenu
        </a>
        <Header />
        <main id="contenu" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <MobileActionBar />
        <RevealObserver />
        <JsonLd data={localBusinessSchema()} />
      </body>
    </html>
  );
}
