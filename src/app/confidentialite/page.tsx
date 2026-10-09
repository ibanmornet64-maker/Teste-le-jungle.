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
        <p>
          Ce site est un <strong>site vitrine</strong> : il ne contient aucun formulaire, aucun compte utilisateur et
          aucune base de données. <strong>Aucune donnée personnelle n’est collectée ni enregistrée</strong> par le site.
        </p>
      </div>

      <div>
        <h2>Lorsque vous nous contactez</h2>
        <p>
          Les boutons de contact ouvrent directement Instagram, votre application téléphone ou votre messagerie email.
          Les informations que vous choisissez de nous transmettre par ces moyens servent uniquement à vous répondre
          (réservation, organisation d’un événement, question). Elles ne sont jamais vendues ni cédées.
        </p>
        <p>
          Les messages envoyés via Instagram sont également soumis à la politique de confidentialité de Meta.
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
          Les dernières publications de notre compte Instagram affichées sur la page d’accueil sont récupérées par le
          site lui-même, puis servies depuis notre hébergeur : leur affichage ne transmet aucune information à Instagram
          et ne dépose aucun cookie.
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
          d’opposition au traitement de vos données. Pour les exercer, <Link href="/contact#nous-ecrire">contactez-nous</Link>
          {CONTACT.email && <> ou écrivez à {CONTACT.email}</>}. Vous pouvez également introduire une réclamation
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
