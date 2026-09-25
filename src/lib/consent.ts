"use client";

/**
 * Consentement minimal : le site n'utilise AUCUN cookie de mesure d'audience
 * ni publicitaire. Seule la carte interactive (service tiers OpenStreetMap)
 * est chargée à la demande, et ce choix peut être mémorisé localement.
 */
const KEY = "lejungle-consent-v1";
const EVENT = "lejungle-consent-change";

export type Consent = { map: boolean };

export function readConsent(): Consent {
  if (typeof window === "undefined") return { map: false };
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? { map: Boolean(JSON.parse(raw).map) } : { map: false };
  } catch {
    return { map: false };
  }
}

export function writeConsent(consent: Consent) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(consent));
  } catch {
    /* stockage indisponible : on ignore */
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: consent }));
}

export function onConsentChange(cb: (c: Consent) => void) {
  const handler = (e: Event) => cb((e as CustomEvent<Consent>).detail);
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}
