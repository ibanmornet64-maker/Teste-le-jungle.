/**
 * Politique de confidentialité — à faire relire par le responsable du lieu
 * (et idéalement un conseil juridique) avant publication.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/sections/LegalPage";
import { CONTACT, SITE, fullAddress } from "@/config/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  alternates: { canonical: "/confidentialite" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Politique de confidentialité" href="/confidentialite">
      <div>
        <h2>Responsable du traitement</h2>
        <p>
          {SITE.name}, {fullAddress}, France.
          {CONTACT.email && <> Contact : {CONTACT.email}.</>}
        </p>
      </div>

      <div>
        <h2>Données collectées</h2>
        <p>Nous ne collectons que les données que vous nous transmettez via nos formulaires (contact, réservation, groupes) :</p>
        <ul>
          <li>nom et adresse email ;</li>
          <li>numéro de téléphone (facultatif) ;</li>
          <li>type de demande, date souhaitée, nombre de personnes, activités, budget éventuel ;</li>
          <li>le contenu de votre message.</li>
        </ul>
      </div>

      <div>
        <h2>Finalité et base légale</h2>
        <p>
          Ces données servent uniquement à répondre à votre demande (réservation, organisation d’un événement,
          question). Le traitement repose sur votre consentement, recueilli par la case à cocher du formulaire.
        </p>
      </div>

      <div>
        <h2>Durée de conservation</h2>
        <p>
          Le site ne stocke pas vos demandes dans une base de données : elles sont transmises directement à l’équipe du
          Jungle, qui les conserve le temps nécessaire au traitement de votre demande et au suivi de la relation.
        </p>
      </div>

      <div>
        <h2>Destinataires</h2>
        <p>
          Vos données sont destinées exclusivement à l’équipe du Jungle. Elles peuvent transiter par un prestataire
          technique d’envoi d’emails, agissant pour notre compte. Elles ne sont jamais vendues ni cédées.
        </p>
      </div>

      <div>
        <h2>Cookies et services tiers</h2>
        <p>
          Ce site n’utilise <strong>aucun cookie publicitaire ni de mesure d’audience</strong>. La carte interactive
          (OpenStreetMap) n’est chargée que si vous le demandez. Votre préférence d’affichage de la carte peut être
          mémorisée dans le stockage local de votre navigateur ; vous pouvez la modifier à tout moment via le lien
          « Gestion des cookies » en bas de page.
        </p>
        <p>
          Les liens vers Instagram ou Google Maps ouvrent ces services dans un nouvel onglet ; leurs propres politiques
          de confidentialité s’appliquent alors.
        </p>
      </div>

      <div>
        <h2>Vos droits</h2>
        <p>
          Conformément au RGPD, vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation et
          d’opposition au traitement de vos données. Pour les exercer, contactez-nous via le{" "}
          <Link href="/contact#formulaire">formulaire de contact</Link>
          {CONTACT.email && <> ou à l’adresse {CONTACT.email}</>}. Vous pouvez également introduire une réclamation
          auprès de la CNIL (
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
            cnil.fr
          </a>
          ).
        </p>
      </div>
    </LegalPage>
  );
}
