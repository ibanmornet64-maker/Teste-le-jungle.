"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PalmFrond, SimpleLeaf } from "@/components/decor/Foliage";
import { MAIN_NAV } from "@/config/navigation";
import { CONTACT, SITE, directionsUrl } from "@/config/site";
import { cn } from "@/lib/format";
import { getPrimaryAction, getSecondaryAction } from "@/lib/contact-actions";
import { usePastFold } from "@/lib/use-past-fold";
import { useFocusTrap } from "@/lib/use-focus-trap";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const cta = getPrimaryAction();
  // Sur mobile, au-delà du premier écran (ou menu ouvert, qui a son propre bouton),
  // le bouton de contact du header s'efface : jamais de doublon.
  const pastFold = usePastFold();
  const secondary = getSecondaryAction();
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le menu à chaque changement de page
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useFocusTrap(panelRef, open, close);

  return (
    <div ref={panelRef}>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding,border-color] duration-500",
          scrolled || open
            ? "border-b border-cream/10 bg-deep/88 py-2.5 shadow-[0_10px_40px_-20px_rgb(0_0_0/0.8)] backdrop-blur-xl"
            : "border-b border-transparent bg-gradient-to-b from-night/70 to-transparent py-4 md:py-5",
        )}
      >
        <div className="container-jungle flex items-center justify-between gap-4">
          <Link href="/" className="relative z-10 shrink-0 rounded-lg" aria-label="Le Jungle — retour à l’accueil">
            <span className="hidden sm:block">
              <Logo />
            </span>
            <span className="sm:hidden">
              <Logo compact />
            </span>
          </Link>

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-1 xl:gap-2">
              {MAIN_NAV.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative rounded-full px-3 py-2 text-[0.92rem] font-medium transition-colors xl:px-3.5",
                        active ? "text-gold" : "text-cream/85 hover:text-cream",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-0 -bottom-0.5 mx-auto h-1 w-1 rounded-full bg-gold transition-opacity",
                          active ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            {cta.id !== "instagram" && (
              <a
                href={SITE.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden size-11 items-center justify-center rounded-full text-cream/85 transition-colors hover:bg-cream/10 hover:text-gold md:inline-flex"
                aria-label="Instagram @lejungle64 (nouvel onglet)"
              >
                <Icon name="instagram" size={22} />
              </a>
            )}
            <ButtonLink
              href={cta.href}
              external={cta.external}
              size="sm"
              icon={cta.icon}
              iconPosition="left"
              className={cn(
                "px-4 transition-[opacity,visibility,transform,box-shadow,background-color] sm:px-5 md:min-h-11 md:px-6 md:text-[0.95rem]",
                (pastFold || open) && "max-md:invisible max-md:scale-95 max-md:opacity-0",
              )}
              ariaLabel={cta.label}
            >
              {cta.shortLabel}
            </ButtonLink>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:bg-cream/10 lg:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setOpen((o) => !o)}
            >
              <Icon name={open ? "close" : "menu"} size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* ---------- Menu mobile plein écran ---------- */}
      <div
        id="menu-mobile"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
        className="fixed inset-0 z-40 overflow-y-auto bg-deep lg:hidden"
      >
        <div className="grain absolute inset-0 overflow-hidden" aria-hidden>
          <PalmFrond className="absolute -right-16 -bottom-10 h-[70vh] rotate-[200deg] text-jungle-dark" />
          <SimpleLeaf className="absolute top-28 -left-6 size-28 rotate-45 text-jungle-dark" />
          <div className="absolute -top-20 right-0 size-72 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-orange)_28%,transparent),transparent)]" />
        </div>

        <div className="relative flex min-h-full flex-col px-6 pt-24 pb-10">
          <nav aria-label="Navigation mobile">
            <ul className="space-y-1">
              {MAIN_NAV.map((item, i) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href} className={open ? "animate-rise" : ""} style={{ ["--delay" as string]: `${60 + i * 45}ms` }}>
                    <Link
                      href={item.href}
                      onClick={close}
                      data-autofocus={i === 0 ? true : undefined}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between rounded-2xl py-3 font-display text-[2rem] leading-tight font-semibold",
                        active ? "text-gold" : "text-cream",
                      )}
                    >
                      {item.label}
                      <Icon name="arrow-right" size={22} className="text-cream/40" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-auto space-y-3 pt-10">
            <ButtonLink href={cta.href} external={cta.external} size="lg" className="w-full" icon={cta.icon} iconPosition="left">
              {cta.label}
            </ButtonLink>
            <div className="grid grid-cols-2 gap-3">
              <ButtonLink href={directionsUrl} variant="secondary" size="md" icon="route" iconPosition="left" ariaLabel="Itinéraire vers Le Jungle">
                Itinéraire
              </ButtonLink>
              {secondary ? (
                <ButtonLink href={secondary.href} external={secondary.external} variant="secondary" size="md" icon={secondary.icon} iconPosition="left" ariaLabel={secondary.label}>
                  {secondary.shortLabel}
                </ButtonLink>
              ) : (
                <ButtonLink href="/contact" variant="secondary" size="md" icon="map-pin" iconPosition="left">
                  Accès
                </ButtonLink>
              )}
            </div>
            {CONTACT.hoursVisible && (
              <p className="flex items-center justify-center gap-2 pt-2 text-sm text-cream/70">
                <Icon name="clock" size={16} className="text-gold" />
                {SITE.hours.short}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
