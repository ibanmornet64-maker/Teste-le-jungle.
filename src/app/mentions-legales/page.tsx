/**
 * Mentions légales.
 * Les informations de la société (raison sociale, SIRET, hébergeur…) se
 * renseignent dans src/config/data-to-confirm.ts → legal. Chaque ligne ne
 * s'affiche que lorsqu'elle est complétée.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/sections/LegalPage";
import { DATA_TO_CONFIRM } from "@/config/data-to-confirm";
import { CONTACT, SITE, fullAddress } from "@/config/site";
import { hasTemporaryMedia } from "@/data/images";

export const metadata: Metadata = {
  title: "Mentions légales",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: true, follow: true },
};

export default function LegalNoticePage() {
  const l = DATA_TO_CONFIRM.legal;
  const rows: [string, string | null][] = [
    ["Raison sociale", l.companyName],
    ["Forme juridique", l.legalForm],
    ["SIRET", l.siret],
    ["RCS", l.rcs],
    ["N° TVA intracommunautaire", l.vatNumber],
    ["Directeur·rice de la publication", l.publicationDirector],
  ];
  const filled = rows.filter(([, v]) => v);

  return (
    <LegalPage title="Mentions légales" href="/mentions-legales">
      <div>
        <h2>Éditeur du site</h2>
        <p>
          <strong>{SITE.name}</strong>
          <br />
          {fullAddress}, France
        </p>
        {filled.length > 0 && (
          <ul>
            {filled.map(([k, v]) => (
              <li key={k}>
                {k} : {v}
              </li>
            ))}
          </ul>
        )}
        {(CONTACT.phone || CONTACT.email) && (
          <p>
            Contact : {[CONTACT.phone, CONTACT.email].filter(Boolean).join(" · ")}
          </p>
        )}
        {!CONTACT.phone && !CONTACT.email && (
          <p>
            Pour toute demande, utilisez notre <Link href="/contact#formulaire">formulaire de contact</Link>.
          </p>
        )}
      </div>

      {l.host && (
        <div>
          <h2>Hébergement</h2>
          <p className="whitespace-pre-line">{l.host}</p>
        </div>
      )}

      <div>
        <h2>Propriété intellectuelle</h2>
        <p>
          L’ensemble des contenus de ce site (textes, visuels, éléments graphiques, logo) est protégé par le droit
          d’auteur. Toute reproduction ou représentation, totale ou partielle, sans autorisation préalable est
          interdite.
        </p>
        {hasTemporaryMedia && (
          <p>Certains visuels présents sur le site sont des visuels d’illustration et ne représentent pas nécessairement l’établissement.</p>
        )}
      </div>

      <div>
        <h2>Données personnelles</h2>
        <p>
          Les informations relatives au traitement de vos données sont détaillées dans notre{" "}
          <Link href="/confidentialite">politique de confidentialité</Link>.
        </p>
      </div>

      <div>
        <h2>Responsabilité</h2>
        <p>
          Les informations publiées (horaires, activités, événements) sont données à titre indicatif et peuvent évoluer.
          Nous vous invitons à consulter notre compte Instagram{" "}
          <a href={SITE.social.instagram.url} target="_blank" rel="noopener noreferrer">
            {SITE.social.instagram.handle}
          </a>{" "}
          pour les dernières actualités.
        </p>
      </div>
    </LegalPage>
  );
}
