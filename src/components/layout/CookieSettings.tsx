"use client";

import Link from "next/link";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { readConsent, writeConsent } from "@/lib/consent";

/** Lien « Gestion des cookies » du footer + panneau de réglages. */
export function CookieSettingsButton() {
  const [open, setOpen] = useState(false);
  const [map, setMap] = useState(false);

  return (
    <>
      <button type="button" onClick={() => {
          setMap(readConsent().map);
          setOpen(true);
        }} className="hover:text-cream underline-offset-2">
        Gestion des cookies
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Cookies & services tiers">
        <div className="space-y-4 text-sm leading-relaxed text-cream/80">
          <p>
            Ce site n’utilise <strong className="text-cream">aucun cookie publicitaire ni de mesure d’audience</strong>.
          </p>
          <p>
            La carte interactive est fournie par OpenStreetMap, un service tiers. Elle n’est chargée que si vous
            cliquez sur « Afficher la carte ». Vous pouvez mémoriser ce choix sur cet appareil.
          </p>
          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-cream/12 bg-night/40 p-4">
            <input
              type="checkbox"
              checked={map}
              onChange={(e) => setMap(e.target.checked)}
              className="mt-0.5 size-5 accent-[var(--color-orange)]"
            />
            <span>
              <span className="block font-semibold text-cream">Carte interactive</span>
              Charger automatiquement la carte OpenStreetMap sur la page contact.
            </span>
          </label>
          <p>
            Plus d’informations dans notre{" "}
            <Link href="/confidentialite" className="text-gold underline" onClick={() => setOpen(false)}>
              politique de confidentialité
            </Link>
            .
          </p>
        </div>
        <div className="mt-6 flex justify-end">
          <Button
            onClick={() => {
              writeConsent({ map });
              setOpen(false);
            }}
          >
            Enregistrer
          </Button>
        </div>
      </Modal>
    </>
  );
}
