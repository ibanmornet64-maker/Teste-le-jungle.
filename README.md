# Le Jungle — site officiel (maquette de production)

Site vitrine de **Le Jungle**, 57 rue Carrerot, 64400 Oloron-Sainte-Marie.
*Manger. Jouer. Se retrouver.*

Bowling (4 pistes), billard (3 tables), fléchettes (2 postes), pinsas, tapas, planches, goûters, cocktails, mocktails, soirées et événements.

- **Stack** : Next.js 16 (App Router, React 19, TypeScript), Tailwind CSS 4.
  Aucune librairie lourde : pas de framer-motion, pas de librairie d'icônes, pas de widget Instagram.
- **Polices** : Fredoka (titres) et Inter (texte), auto-hébergées dans `src/fonts/`, donc aucun appel à Google Fonts.
- **Hébergement** : prêt pour **Vercel** (voir « Mettre en ligne sur Vercel » ci-dessous) ; fonctionne aussi sur tout hébergeur Node 20.9+.

---

## 1. Démarrer

```bash
npm install
cp .env.example .env.local   # puis remplir les variables utiles
npm run dev                   # http://localhost:3000
npm run build && npm start    # version de production
npm run check                 # vérifications (ESLint + TypeScript)
```

---

## Mettre en ligne sur Vercel

Le projet est prêt pour Vercel : aucune configuration technique à faire, Vercel détecte Next.js automatiquement. Le fichier `vercel.json` place les fonctions serveur à Paris (`cdg1`), au plus près des visiteurs.

### Première mise en ligne (≈ 5 minutes)

1. **Mettre le code sur la branche principale.** Sur GitHub, ouvrez la pull request de la branche `arena/…` vers `main`, puis cliquez sur **Merge pull request** → **Confirm merge**. Vercel publie en production la branche `main`.
2. Allez sur **https://vercel.com** → **Sign Up** → **Continue with GitHub** (plan *Hobby*, gratuit).
3. **Add New… → Project**. Dans la liste, cliquez sur **Import** à côté du dépôt `Teste-le-jungle.`. S'il n'apparaît pas : **Adjust GitHub App Permissions** et autorisez ce dépôt.
4. Sur l'écran de configuration, **ne changez rien** : *Framework Preset* = Next.js, *Root Directory* = `./`, les commandes de build restent par défaut.
5. (Facultatif, possible plus tard) Ouvrez **Environment Variables** et ajoutez celles du tableau ci-dessous.
6. Cliquez sur **Deploy**. Environ 2 minutes plus tard, le site est en ligne sur `https://<nom-du-projet>.vercel.app`.

### Ensuite, c'est automatique

- Chaque modification poussée sur `main` → **nouvelle mise en production** automatique.
- Chaque autre branche ou pull request → **adresse de prévisualisation** privée. Ces prévisualisations ne sont **jamais indexées par Google**.
- Après avoir ajouté ou modifié une variable d'environnement : onglet **Deployments** → **⋯** sur le dernier déploiement → **Redeploy**. Les variables ne s'appliquent qu'aux nouveaux déploiements.

### Variables d'environnement sur Vercel

*Project → Settings → Environment Variables*. Aucune n'est obligatoire pour que le site s'affiche.

| Variable | Quand la remplir |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Quand vous aurez un nom de domaine, ex. `https://www.lejungle64.fr`. Si vide, l'adresse `.vercel.app` est utilisée automatiquement pour le SEO et le sitemap. |
| `SITE_NOINDEX` | `true` pour cacher le site de Google, par exemple tant que les photos temporaires sont en place. À retirer pour le lancement. |
| `RESEND_API_KEY` + `CONTACT_TO_EMAIL` (+ `CONTACT_FROM_EMAIL`) | Pour recevoir les formulaires par email. Sans elles, le formulaire affiche un message clair qui renvoie vers Instagram. |
| `CONTACT_WEBHOOK_URL` | Alternative à l'email (Make, Zapier, n8n…). |
| `ADMIN_PREVIEW` | `true` pour consulter temporairement `/admin` en ligne. Cette page n'a pas de mot de passe : pensez à retirer la variable ensuite. |

### Brancher un nom de domaine

*Project → Settings → Domains → Add*, puis saisissez votre domaine (ex. `lejungle64.fr`). Vercel indique les enregistrements DNS à créer chez votre registrar (OVH, Gandi, IONOS…). Le certificat HTTPS est automatique. Renseignez ensuite `NEXT_PUBLIC_SITE_URL` (ou `siteUrl` dans `data-to-confirm.ts`) avec cette adresse, puis faites un **Redeploy**.

### Ce qui est déjà adapté à Vercel

- URL du site détectée automatiquement (production, prévisualisation, domaine personnalisé).
- Prévisualisations en `noindex` et `robots.txt` bloquant.
- En-têtes de sécurité complets en ligne : `X-Frame-Options`, `frame-ancestors`, HSTS.
- Optimisation d'images AVIF/WebP par Vercel.
- Pages statiques servies depuis le CDN ; accueil, événements et sitemap régénérés toutes les heures (ISR), si bien que les événements passés disparaissent sans redéploiement.
- API du formulaire en fonction serveur (Node.js, Paris, 15 s max).
- Version de Node déclarée dans `package.json` (`engines`).

---

## 2. Où modifier quoi ?

Tout le contenu est centralisé : **aucune page n'a besoin d'être modifiée** pour mettre le site à jour.

| Je veux modifier… | Fichier |
|---|---|
| **Les infos à confirmer** (téléphone, email, tarifs, URL de réservation, PMR, parking, baby-foot, photomaton, mentions légales…) | `src/config/data-to-confirm.ts` |
| Nom, slogan, adresse, horaires, Instagram, coordonnées de la carte | `src/config/site.ts` |
| Menu principal et liens du footer | `src/config/navigation.ts` |
| **Couleurs** | `src/styles/theme.css` |
| Activités (bowling, billard, fléchettes, soirées) | `src/data/activities.ts` |
| Carte : catégories, plats, prix, allergènes, badge végétarien | `src/data/menu.ts` |
| **Événements** | `src/data/events.ts` |
| Galerie | `src/data/gallery.ts` |
| Photos (toutes les images du site) | `src/data/images.ts` |
| FAQ | `src/data/faq.ts` |
| Types de groupes / formules | `src/data/groups.ts` |
| Frise « Une journée au Jungle » | `src/data/timeline.ts` |

### Règle d'or : rien n'est inventé
Dans `data-to-confirm.ts`, une valeur à `null` (ou `false`) **masque automatiquement** le bloc correspondant sur le site public : bouton, ligne du footer, réponse de FAQ, donnée structurée Google… Dès que vous remplacez `null` par la vraie valeur, l'information apparaît partout où elle est utile.

Exemples :
- `phone: "+33 5 59 .. .. .."` fait apparaître le bouton « Appeler », le téléphone dans le footer, la page contact et le Schema.org.
- `reservationUrl: "https://…"` transforme tous les boutons « Demander une réservation » en « Réserver en ligne ».
- `hasPhotobooth: true` affiche l'étape photomaton de la frise (20 h).
- `birthdayFormulas: ["…", "…"]` affiche les formules sur la page Groupes.

### Ajouter un événement
Dans `src/data/events.ts`, copiez le modèle en commentaire en haut du fichier, puis :
- `date` au format `AAAA-MM-JJ` ;
- `published: true` pour le mettre en ligne.

Les événements passés disparaissent **automatiquement** (fuseau Europe/Paris) du site, du sitemap et des données structurées. Sans événement à venir, un message neutre invite à suivre Instagram.

### Carte
Seules les catégories avec `confirmed: true` s'affichent. Tant qu'aucun plat n'est saisi, la page présente les grandes familles sans aucun prix, avec les boutons « Demander la carte » et « Découvrir la carte sur place ». Un plat accepte : nom, description, photo, prix, allergènes, badge végétarien.

### Espace d'administration `/admin`
Il est visible en développement, ou en production si `ADMIN_PREVIEW=true` (page non indexée). Il récapitule :
- l'état de chaque information à confirmer (✓ renseigné / ✕ à confirmer) ;
- les visuels temporaires à remplacer ;
- les événements en brouillon ;
- les catégories de carte masquées.

C'est le **seul** endroit où apparaissent les mentions « à confirmer ».

---

## 3. Informations manquantes (à fournir par Le Jungle)

Toutes sont centralisées dans `src/config/data-to-confirm.ts` (objet `DATA_TO_CONFIRM`) :

1. Numéro de téléphone
2. Adresse email publique
3. Nom de domaine définitif
4. URL officielle de réservation en ligne (s'il y en a une)
5. Tarifs : bowling, billard, fléchettes
6. Durées indicatives des parties
7. Horaires détaillés : par activité, par saison, jours fériés. Les horaires généraux affichés sur Instagram (tous les jours, 15 h – 00 h) sont utilisés et peuvent être masqués avec `generalHoursConfirmed: false`.
8. Carte complète : plats, boissons, prix, allergènes
9. Formules anniversaire / groupes / entreprises
10. Conditions d'accès : âge minimum, chaussures, venue sans réservation
11. Options végétariennes
12. Accessibilité PMR
13. Stationnement
14. Présence d'un baby-foot
15. Présence d'un photomaton
16. Logo officiel
17. Couleurs officielles
18. Photos officielles du lieu
19. Mentions légales : raison sociale, forme juridique, SIRET, RCS, TVA, directeur de publication, hébergeur
20. **Soirée salsa / bachata** : elle a été annoncée localement mais aucune date n'a pu être vérifiée. Elle est enregistrée en **brouillon non publié** dans `src/data/events.ts`. Renseigner la date puis `published: true`.

---

## 4. Logo, couleurs, favicon : fichiers à remplacer

| Élément | Fichier(s) | Comment |
|---|---|---|
| **Couleurs** | `src/styles/theme.css` | Remplacer uniquement les valeurs HEX (`--color-jungle-dark`, `--color-leaf`, `--color-deep`, `--color-night`, `--color-sand`, `--color-cream`, `--color-orange`, `--color-gold`, `--color-coral`, `--color-purple`). Tout le site suit. Passer ensuite `officialColors: true`. |
| **Logo** | `public/brand/` + `src/config/data-to-confirm.ts` | Déposer 3 fichiers (clair pour les fonds sombres, sombre pour les fonds clairs, compact), puis renseigner `officialLogo: { light, dark, compact }`. Le logo texte provisoire (`src/components/brand/Logo.tsx`) est alors remplacé automatiquement. |
| Favicon | `src/app/icon.svg` | Remplacer par l'icône officielle (SVG ou `icon.png` 512×512). |
| Couleur du navigateur mobile | `src/app/manifest.ts`, `src/app/layout.tsx` (`viewport.themeColor`) | Mettre la couleur principale officielle. |
| Image de partage (réseaux sociaux) | `public/images/temp/og-le-jungle.jpg` et `src/data/images.ts` | 1200×630 px, idéalement avec une vraie photo et le logo. |
| Polices | `src/fonts/` + `src/app/layout.tsx` | Remplacer les fichiers `.woff2` si la charte impose d'autres polices (2 maximum). |

Le logo actuel est un **logotype typographique temporaire** (« Le Jungle » + feuille). Ce n'est pas un faux logo officiel.

---

## 5. Visuels temporaires ⚠️

Toutes les images de `public/images/temp/` sont des **visuels d'illustration générés pour la maquette**. Elles **ne représentent pas le lieu réel**. Tant qu'elles sont en place :
- le footer affiche « Visuels d'illustration » ;
- la légende de la galerie (lightbox) l'indique ;
- `/admin` les liste.

**À remplacer avant la mise en ligne** par des photos officielles :
1. déposer les fichiers dans `public/images/` ;
2. mettre à jour `src/data/images.ts` et passer `temporary: false`.

Next.js génère automatiquement les versions AVIF/WebP responsive. Aucun contenu Instagram n'a été copié.

---

## 6. Formulaires (contact, réservation, groupes)

- Validation côté navigateur **et** côté serveur (`src/lib/contact-schema.ts`, `src/app/api/contact/route.ts`), avec des messages d'erreur clairs par champ.
- Anti-spam : champ piège invisible, délai minimum de remplissage, limitation par IP, JSON obligatoire, taille maximale.
- Consentement RGPD obligatoire, et échappement HTML de toutes les données envoyées par email.
- **Aucune réservation n'est confirmée automatiquement** : le message de confirmation précise que l'équipe recontactera le client.
- **Aucun envoi silencieux** : sans configuration, le formulaire affiche une erreur explicite et renvoie vers Instagram.

Configurer une des options dans `.env.local` (voir `.env.example`) :

| Variable | Rôle |
|---|---|
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Envoi par email via Resend (recommandé) |
| `CONTACT_WEBHOOK_URL` | Envoi vers un webhook (Make, Zapier, n8n…) |
| `CONTACT_DELIVERY=console` | Développement uniquement : affiche la demande dans le terminal |
| `NEXT_PUBLIC_SITE_URL` | URL publique (SEO, sitemap, Open Graph) ; automatique sur Vercel si vide |
| `SITE_NOINDEX=true` | Empêche l'indexation par Google |
| `ADMIN_PREVIEW=true` | Rend `/admin` accessible en production (temporairement) |

---

## 7. SEO, accessibilité, performance, sécurité

- **SEO** : titres et descriptions par page, Open Graph, `sitemap.xml`, `robots.txt` (`/admin` et `/api` exclus), fil d'Ariane.
  Données structurées Schema.org : `BarOrPub` + `BowlingAlley`, `PostalAddress`, `OpeningHoursSpecification`, `Event` (événements publiés et à venir uniquement), `FAQPage`. Seules les données confirmées y figurent (ni téléphone ni prix inventés).
- **Accessibilité** : lien d'évitement, navigation clavier complète, focus visibles, menu mobile et lightbox en `dialog` avec piège de focus et fermeture Échap, textes alternatifs, labels, hiérarchie de titres, contrastes (boutons orange ou or avec texte foncé), `prefers-reduced-motion` respecté.
- **Performance** : images AVIF/WebP responsive avec lazy-loading, seule l'image du hero est préchargée. Polices locales, dimensions fixes (pas de CLS), carte OpenStreetMap chargée uniquement à la demande, pas de vidéo, animations CSS légères.
- **Sécurité / RGPD** (aucun outil d'analyse, aucun cookie de suivi) :
  - en-têtes de sécurité dans `next.config.ts` ;
  - aucun cookie de suivi ; la carte n'est chargée qu'après action de l'utilisateur, et le choix est mémorisé localement et modifiable via « Gestion des cookies » ;
  - pages Mentions légales et Politique de confidentialité ;
  - secrets uniquement dans les variables d'environnement.

> **Note X-Frame-Options** : sur Vercel, `X-Frame-Options: SAMEORIGIN`, `Content-Security-Policy: frame-ancestors 'self'` et HSTS sont ajoutés automatiquement. En local et dans les aperçus de développement, ils restent désactivés pour permettre l'affichage en iframe. Chez un autre hébergeur, définissez `STRICT_SECURITY_HEADERS=true` au moment du build.

---

## 8. Arborescence

```
src/
  app/                 pages (App Router) + API /api/contact, sitemap, robots, manifest, icon
  components/
    brand/             Logo (clair / sombre / compact)
    cards/             ActivityCard, FoodCard, EventCard
    decor/             feuillages SVG, halos lumineux
    forms/             ContactForm, ReservationForm
    layout/            Header, Footer, barre d'actions mobile, gestion des cookies
    sections/          Hero, sections de l'accueil, Gallery, PracticalInfo, MapEmbed…
    seo/               JSON-LD
    ui/                Button, SectionTitle, Lightbox, Modal, OpeningHours, Icon…
  config/              site.ts, navigation.ts, data-to-confirm.ts
  data/                contenus éditables (activités, carte, événements, FAQ…)
  lib/                 validation, Schema.org, consentement, utilitaires
  styles/theme.css     palette
  fonts/               polices locales
public/images/temp/    visuels temporaires (à remplacer)
```

## Pages

| Page | URL |
|---|---|
| Accueil | `/` |
| Le concept | `/le-concept` |
| Activités | `/activites` |
| Bowling | `/activites/bowling` |
| Billard & fléchettes | `/activites/billard-flechettes` |
| Manger & boire | `/manger-boire` |
| Événements | `/evenements` (+ `/evenements/[slug]`) |
| Anniversaires & groupes | `/groupes` |
| Galerie | `/galerie` |
| FAQ | `/faq` |
| Contact & accès | `/contact` |
| Réserver | `/reserver` |
| Mentions légales | `/mentions-legales` |
| Politique de confidentialité | `/confidentialite` |
| Espace d'administration (non public) | `/admin` |
