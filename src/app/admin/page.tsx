/**
 * Espace d'administration — « Informations à confirmer ».
 * Outil de travail visible uniquement en local (npm run dev).
 * En ligne, la page n'existe pas (404) : le site reste 100 % statique.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DATA_TO_CONFIRM, DATA_TO_CONFIRM_LABELS } from "@/config/data-to-confirm";
import { EVENTS } from "@/data/events";
import { IMAGES } from "@/data/images";
import { MENU } from "@/data/menu";
import { getBrandLogo } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Administration — informations à confirmer",
  robots: { index: false, follow: false },
};

function isFilled(value: unknown): boolean {
  if (value === null || value === undefined || value === false || value === "") return false;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "object") return Object.values(value as object).every(isFilled);
  return true;
}

function partial(value: unknown): boolean {
  return typeof value === "object" && value !== null && !Array.isArray(value) && Object.values(value).some(isFilled);
}

export default function AdminPage() {
  if (process.env.NODE_ENV === "production") notFound();

  const entries = Object.entries(DATA_TO_CONFIRM);
  // Le logo peut aussi être détecté automatiquement dans /public/brand/.
  const filled = (key: string, v: unknown) => (key === "officialLogo" ? getBrandLogo() !== null : isFilled(v));
  const missing = entries.filter(([k, v]) => !filled(k, v)).length;
  const tempImages = Object.entries(IMAGES).filter(([, img]) => img?.temporary);
  const emptySlots = Object.entries(IMAGES).filter(([, img]) => img === null);
  const drafts = EVENTS.filter((e) => !e.published || !e.date);
  const hiddenMenu = MENU.filter((c) => !c.confirmed);

  return (
    <div className="bg-night pt-28 pb-20">
      <div className="container-jungle max-w-5xl">
        <p className="inline-flex items-center gap-2 rounded-full bg-coral px-3 py-1 text-xs font-bold tracking-wider text-night uppercase">
          Espace d’administration — non public
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-cream md:text-5xl">Informations à confirmer</h1>
        <p className="mt-3 max-w-2xl text-cream/75">
          Tout ce qui est marqué <strong className="text-coral">À CONFIRMER</strong> est actuellement masqué sur le site
          public. Complétez <code className="rounded bg-deep px-1.5 py-0.5 text-gold">src/config/data-to-confirm.ts</code>{" "}
          pour le publier.
        </p>
        <p className="mt-6 text-lg text-cream">
          <span className="font-display text-3xl text-gold">{missing}</span> / {entries.length} éléments à confirmer
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-cream/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-jungle-dark text-cream">
              <tr>
                <th className="px-4 py-3">Élément</th>
                <th className="px-4 py-3">Clé</th>
                <th className="px-4 py-3">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream/10">
              {entries.map(([key, value]) => {
                const ok = filled(key, value);
                const half = !ok && partial(value);
                return (
                  <tr key={key} className="bg-deep/60">
                    <td className="px-4 py-3 text-cream">{DATA_TO_CONFIRM_LABELS[key] ?? key}</td>
                    <td className="px-4 py-3 font-mono text-xs text-cream/60">{key}</td>
                    <td className="px-4 py-3">
                      {ok ? (
                        <span className="font-semibold text-gold">✓ Renseigné</span>
                      ) : half ? (
                        <span className="font-semibold text-orange">◐ Partiel — À CONFIRMER</span>
                      ) : (
                        <span className="font-semibold text-coral">✕ À CONFIRMER</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <h2 className="mt-14 text-2xl font-semibold text-cream">Visuels temporaires à remplacer ({tempImages.length})</h2>
        <p className="mt-2 text-sm text-cream/70">
          Visuels d’illustration générés pour la maquette. À remplacer par des photos officielles dans{" "}
          <code className="text-gold">src/data/images.ts</code>.
        </p>
        <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
          {tempImages.map(([key, img]) => (
            <li key={key} className="rounded-xl border border-cream/10 bg-deep/60 px-4 py-3">
              <span className="font-semibold text-cream">{key}</span>{" "}
              <span className="font-mono text-xs text-cream/55">{img!.src}</span>
            </li>
          ))}
          {emptySlots.map(([key]) => (
            <li key={key} className="rounded-xl border border-coral/40 bg-deep/60 px-4 py-3">
              <span className="font-semibold text-cream">{key}</span>{" "}
              <span className="text-xs text-coral">emplacement vide (non affiché)</span>
            </li>
          ))}
        </ul>

        <h2 className="mt-14 text-2xl font-semibold text-cream">Événements en brouillon ({drafts.length})</h2>
        <ul className="mt-4 space-y-2 text-sm">
          {drafts.map((e) => (
            <li key={e.slug} className="rounded-xl border border-cream/10 bg-deep/60 px-4 py-3 text-cream">
              {e.title} — <span className="text-coral">non publié{!e.date && " (date à confirmer)"}</span>
            </li>
          ))}
        </ul>

        <h2 className="mt-14 text-2xl font-semibold text-cream">Catégories de carte masquées ({hiddenMenu.length})</h2>
        <ul className="mt-4 flex flex-wrap gap-2 text-sm">
          {hiddenMenu.map((c) => (
            <li key={c.id} className="rounded-full border border-cream/15 px-3 py-1 text-cream/80">
              {c.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
