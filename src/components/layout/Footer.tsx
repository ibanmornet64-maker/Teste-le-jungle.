import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Icon } from "@/components/ui/Icon";
import { MonsteraLeaf, PalmFrond } from "@/components/decor/Foliage";
import { CookieSettingsButton } from "@/components/layout/CookieSettings";
import { FOOTER_NAV, LEGAL_NAV, MAIN_NAV } from "@/config/navigation";
import { CONTACT, SITE, directionsUrl, fullAddress, phoneHref } from "@/config/site";
import { hasTemporaryMedia } from "@/data/images";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-night pt-20 pb-28 md:pb-12">
      {/* Motif végétal très discret */}
      <div aria-hidden className="leaf-pattern absolute inset-0 opacity-60" />
      <PalmFrond className="absolute -top-10 -left-24 h-[520px] -rotate-[30deg] text-jungle-dark/35" />
      <MonsteraLeaf className="absolute -right-20 -bottom-24 size-[420px] rotate-[-20deg] text-jungle-dark/30" />

      <div className="container-jungle relative">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
          <div>
            <Logo size="lg" />
            <p className="mt-6 font-display text-2xl font-medium text-cream">{SITE.tagline}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/65">
              Bowling, billard, fléchettes, pinsas, cocktails et soirées au cœur d’Oloron-Sainte-Marie.
            </p>
            <a
              href={SITE.social.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-cream/15 px-4 py-2.5 text-sm font-medium text-cream transition-colors hover:border-gold hover:text-gold"
            >
              <Icon name="instagram" size={18} />
              Suivre {SITE.social.instagram.handle}
              <span className="sr-only">(nouvel onglet)</span>
            </a>
          </div>

          <nav aria-label="Plan du site">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-gold">Explorer</h2>
            <ul className="space-y-2.5 text-sm">
              {[...MAIN_NAV.slice(1), ...FOOTER_NAV].map((item) => (
                <li key={item.href + item.label}>
                  <Link href={item.href} className="text-cream/75 transition-colors hover:text-cream">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-gold">Nous trouver</h2>
            <address className="space-y-4 text-sm not-italic text-cream/80">
              <p className="flex gap-3">
                <Icon name="map-pin" size={18} className="mt-0.5 shrink-0 text-gold" />
                <span>
                  {SITE.address.street}
                  <br />
                  {SITE.address.postalCode} {SITE.address.city}
                </span>
              </p>
              {CONTACT.hoursVisible && (
                <p className="flex gap-3">
                  <Icon name="clock" size={18} className="mt-0.5 shrink-0 text-gold" />
                  <span>{SITE.hours.summary}</span>
                </p>
              )}
              {CONTACT.phone && (
                <p className="flex gap-3">
                  <Icon name="phone" size={18} className="mt-0.5 shrink-0 text-gold" />
                  <a href={phoneHref(CONTACT.phone)} className="hover:text-cream">
                    {CONTACT.phone}
                  </a>
                </p>
              )}
              {CONTACT.email && (
                <p className="flex gap-3">
                  <Icon name="mail" size={18} className="mt-0.5 shrink-0 text-gold" />
                  <a href={`mailto:${CONTACT.email}`} className="break-all hover:text-cream">
                    {CONTACT.email}
                  </a>
                </p>
              )}
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-gold hover:underline"
                aria-label={`Itinéraire vers ${fullAddress} (nouvel onglet)`}
              >
                Voir l’itinéraire <Icon name="arrow-up-right" size={16} />
              </a>
            </address>
          </div>

          <div>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-gold">Sur place</h2>
            <ul className="space-y-2.5 text-sm text-cream/80">
              <li className="flex items-center gap-3">
                <Icon name="bowling" size={18} className="text-gold" /> {SITE.equipment.bowlingLanes} pistes de bowling
              </li>
              <li className="flex items-center gap-3">
                <Icon name="billiard" size={18} className="text-gold" /> {SITE.equipment.billiards} billards
              </li>
              <li className="flex items-center gap-3">
                <Icon name="darts" size={18} className="text-gold" /> {SITE.equipment.dartboards} postes de fléchettes
              </li>
              <li className="flex items-center gap-3">
                <Icon name="cocktail" size={18} className="text-gold" /> Cocktails, mocktails & smoothies
              </li>
              <li className="flex items-center gap-3">
                <Icon name="pinsa" size={18} className="text-gold" /> Pinsas, tapas & goûters
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-cream/10 pt-8 text-xs text-cream/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {SITE.name} · {SITE.address.city}
            {hasTemporaryMedia && <span className="block md:inline md:before:content-['_·_']">Visuels d’illustration</span>}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-cream">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <CookieSettingsButton />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
