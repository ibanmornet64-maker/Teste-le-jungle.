"use client";

import { useState, useSyncExternalStore } from "react";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink, Button } from "@/components/ui/Button";
import { SITE, directionsUrl, fullAddress } from "@/config/site";
import { onConsentChange, readConsent, writeConsent } from "@/lib/consent";
import { cn } from "@/lib/format";

/**
 * Carte interactive « à la demande » : rien n'est chargé depuis un service
 * tiers tant que l'utilisateur ne clique pas (performance + vie privée).
 * Rendu sombre via filtre CSS pour rester dans l'univers du site.
 */
export function MapEmbed({ className }: { className?: string }) {
  const [forced, setForced] = useState(false);
  const remembered = useSyncExternalStore(
    (cb) => onConsentChange(cb),
    () => readConsent().map,
    () => false,
  );
  const show = forced || remembered;

  const { lat, lng } = SITE.mapCenter;
  const d = 0.0045;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - d * 1.6}%2C${lat - d}%2C${lng + d * 1.6}%2C${lat + d}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-3xl border border-cream/10 bg-night",
        className,
      )}
    >
      {show ? (
        <iframe
          title={`Carte : Le Jungle, ${fullAddress}`}
          src={src}
          className="map-dark absolute inset-0 size-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-6 text-center">
          {/* Plan stylisé (décoratif) */}
          <div aria-hidden className="dot-pattern absolute inset-0 opacity-60" />
          <svg aria-hidden viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full text-jungle-dark">
            <path d="M-20 210C80 180 150 240 240 200S380 120 440 140" stroke="currentColor" strokeWidth="26" fill="none" />
            <path d="M120 -20C140 80 110 160 170 320" stroke="currentColor" strokeWidth="16" fill="none" />
            <path d="M-20 90C100 110 260 60 440 80" stroke="currentColor" strokeWidth="10" fill="none" />
            <path d="M300 -20C280 90 330 200 290 320" stroke="currentColor" strokeWidth="8" fill="none" />
          </svg>
          <div className="relative flex size-16 items-center justify-center rounded-full bg-orange text-night shadow-[0_0_0_10px_color-mix(in_oklab,var(--color-orange)_20%,transparent)]">
            <Icon name="map-pin" size={30} />
          </div>
          <div className="relative">
            <p className="font-display text-xl font-semibold text-cream">{SITE.name}</p>
            <p className="text-sm text-cream/75">{fullAddress}</p>
          </div>
          <div className="relative flex flex-wrap justify-center gap-3">
            <Button variant="secondary" size="sm" icon="expand" iconPosition="left" onClick={() => setForced(true)}>
              Afficher la carte
            </Button>
            <ButtonLink href={directionsUrl} size="sm" icon="route" iconPosition="left" ariaLabel="Voir l’itinéraire">
              Itinéraire
            </ButtonLink>
          </div>
          <button
            type="button"
            className="relative text-xs text-cream/55 underline-offset-2 hover:text-cream hover:underline"
            onClick={() => writeConsent({ map: true })}
          >
            Toujours afficher la carte sur cet appareil
          </button>
        </div>
      )}
    </div>
  );
}
