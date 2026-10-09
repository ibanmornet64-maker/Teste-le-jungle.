# Le Jungle — site officiel (maquette de production)

Site vitrine **100 % statique** de **Le Jungle**, 57 rue Carrerot, 64400 Oloron-Sainte-Marie : aucun formulaire, aucune base de données, aucun serveur à configurer.
*Manger. Jouer. Se retrouver.*

Bowling (4 pistes), billard (3 tables), fléchettes (2 postes), pinsas, tapas, planches, goûters, cocktails, mocktails, soirées et événements.

- **Stack** : Next.js 16 (App Router, React 19, TypeScript), Tailwind CSS 4.
  Aucune librairie lourde : pas de framer-motion, pas de librairie d'icônes, pas de widget Instagram.
- **Polices** : Fredoka (titres) et Inter (texte), auto-hébergées dans `src/fonts/`, donc aucun appel à Google Fonts.
- **Contact** : boutons « Envoyer un message sur Instagram », « Appeler » (dès que le téléphone est renseigné) et email (si renseigné), sans formulaire.
- **Hébergement** : prêt pour **Vercel** (voir « Mettre en ligne sur Vercel » ci-dessous) ; fonctionne aussi sur tout hébergeur Node 20.9+.

---

## 1. Démarrer

```bash
npm install
cp .env.example .env.local   # facultatif
npm run dev                   # http://localhost:3000
npm run build && npm start    # version de production
npm run check                 # vérifications (ESLint + TypeScript)
```

---

## Mettre en ligne sur Vercel

Le projet est prêt pour Vercel : aucune configuration technique à faire, Vercel détecte Next.js automatiquement. Toutes les pages sont générées à l'avance et servies depuis le CDN de Vercel : il n'y a aucune fonction serveur ni aucun service externe à configurer.

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
| `INSTAGRAM_FEED_URL` | Pour afficher automatiquement les 4 dernières publications Instagram sur l'accueil (voir section 6 bis). |
| `SITE_NOINDEX` | `true` pour cacher le site de Google, par exemple tant que les photos temporaires sont en place. À retirer pour le lancement. |

### Brancher un nom de domaine

*Project → Settings → Domains → Add*, puis saisissez votre domaine (ex. `lejungle64.fr`). Vercel indique les enregistrements DNS à créer chez votre registrar (OVH, Gandi, IONOS…). Le certificat HTTPS est automatique. Renseignez ensuite `NEXT_PUBLIC_SITE_URL` (ou `siteUrl` dans `data-to-confirm.ts`) avec cette adresse, puis faites un **Redeploy**.

### Ce qui est déjà adapté à Vercel

- URL du site détectée automatiquement (production, prévisualisation, domaine personnalisé).
- Prévisualisations en `noindex` et `robots.txt` bloquant.
- En-têtes de sécurité complets en ligne : `X-Frame-Options`, `frame-ancestors`, HSTS.
- Optimisation d'images AVIF/WebP par Vercel.
- **Toutes les pages sont statiques** (générées au build), sans API ni fonction serveur. Seule exception, si le flux Instagram est activé : la page d'accueil se régénère d'elle-même au plus une fois par heure (géré par Vercel, rien à configurer).
- Les événements passés sont masqués directement dans le navigateur des visiteurs : ils disparaissent le lendemain, sans redéploiement.
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
| **Boutons de contact** (ordre : réservation en ligne, appel, Instagram, email) | `src/lib/contact-actions.ts` |
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
Il n'est visible **qu'en local** (`npm run dev`, puis http://localhost:3000/admin). En ligne, la page n'existe pas. Il récapitule :
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
16. Logo officiel : le fichier image en bonne résolution (la palette du site est déjà alignée sur ce logo)
17. Photos officielles du lieu
18. Mentions légales : raison sociale, forme juridique, SIRET, RCS, TVA, directeur de publication, hébergeur
19. **Soirée salsa / bachata** : elle a été annoncée localement mais aucune date n'a pu être vérifiée. Elle est enregistrée en **brouillon non publié** dans `src/data/events.ts`. Renseigner la date puis `published: true`.

---

## 4. Logo, couleurs, favicon : fichiers à remplacer

| Élément | Fichier(s) | Comment |
|---|---|---|
| **Couleurs** | `src/styles/theme.css` | Palette **alignée sur le logo « Le Jungle Café »** : vert forêt, feuillage, beige du lettrage, orange du tigre, rouge des quilles. Pour ajuster, remplacez uniquement les valeurs HEX (`--color-jungle-dark`, `--color-leaf`, `--color-deep`, `--color-night`, `--color-sand`, `--color-cream`, `--color-orange`, `--color-gold`, `--color-coral`, `--color-lime`) : tout le site suit. |
| **Logo** | `public/brand/` | **Déposer simplement le fichier** (PNG, JPG, WebP ou SVG, carré, idéalement ≥ 500 px), de préférence nommé `logo.png` ou `logo.jpg`. Il est détecté automatiquement (`next.config.ts`) et remplace le logo texte dans le header, le menu mobile, le footer, le favicon, l'icône d'écran d'accueil et les données Google. Aucune ligne de code à modifier. (Option manuelle : `officialLogo` dans `data-to-confirm.ts`.) |
| Favicon et icône mobile | `src/app/icon.tsx`, `src/app/apple-icon.tsx` | Générés automatiquement à partir du logo de `public/brand/` (PNG/JPG/SVG). Sans logo : feuille orange. |
| Couleur du navigateur mobile | `src/app/manifest.ts`, `src/app/layout.tsx` (`viewport.themeColor`) | Déjà réglée sur le vert du logo (`#0c2714`). |
| Image de partage (réseaux sociaux) | `public/images/temp/og-le-jungle.jpg` et `src/data/images.ts` | 1200×630 px, idéalement avec une vraie photo et le logo. |
| Polices | `src/fonts/` + `src/app/layout.tsx` | Remplacer les fichiers `.woff2` si la charte impose d'autres polices (2 maximum). |

Tant qu'aucun logo n'est présent dans `public/brand/`, un logo texte temporaire (« Le Jungle » + feuille) est affiché. Ce n'est pas un faux logo officiel.

### Ajouter le logo depuis le site GitHub (sans rien installer)
1. Sur la page du dépôt, choisissez la branche utilisée par Vercel (en principe `main`).
2. Ouvrez le dossier `public`, puis `brand`.
3. Cliquez sur **Add file → Upload files** et glissez le fichier du logo.
4. Cliquez sur **Commit changes**.
5. Vercel redéploie tout seul : le logo apparaît en 1 à 2 minutes.

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

## 6. Contact et réservations (sans formulaire)

Le site ne collecte ni n'enregistre aucune donnée. Les boutons ouvrent directement les applications du visiteur :

| Bouton | Quand il apparaît | Lien |
|---|---|---|
| **Réserver en ligne** | si `reservationUrl` est renseignée | plateforme de réservation externe |
| **Appeler** | si `phone` est renseigné | `tel:` (ouvre l'appli téléphone) |
| **Envoyer un message sur Instagram** | toujours | `https://ig.me/m/lejungle64` (ouvre la messagerie Instagram) |
| **Envoyer un email** | si `email` est renseigné | `mailto:` |

- Le **bouton principal** (header, hero, barre mobile, bas de page, activités) prend automatiquement le premier disponible de cette liste. Aujourd'hui, c'est **« Envoyer un message sur Instagram »** ; dès que le téléphone sera renseigné dans `data-to-confirm.ts`, ce sera **« Appeler »**, avec Instagram en second choix.
- Les pages **Contact** et **Groupes** présentent tous les moyens de contact, la liste des infos à préciser (date, nombre de personnes, activités…) et, pour les groupes, un **message type à copier** en un clic.
- Le texte de ces boutons se modifie dans `src/lib/contact-actions.ts`.

## 6 bis. Dernières publications Instagram (automatique)

Dans la section **« La jungle by night »** de l'accueil, un bloc « Les dernières publications » affiche les **4 derniers posts** de @lejungle64 (photo, date, début de la légende, icône Reel ou carrousel). Chaque vignette ouvre le post sur Instagram. Quand Le Jungle publie un nouveau post, il apparaît tout seul, sans toucher au site.

**Mise en place (10 minutes, une seule fois, gratuit) :**

1. Créer un compte gratuit sur **https://behold.so** (bouton *Sign up*).
2. *Sources* → **+ Add source** → **Basic source** → **Connect**, puis se connecter avec le compte Instagram **@lejungle64** et accepter **toutes** les autorisations.
3. *Feeds* → **Add feed** → *User feed* → choisir @lejungle64 → **JSON** → **Create feed**.
4. Dans les réglages du flux : *Number of posts* = 4 (ou 6). Laisser **Domain whitelist vide** : le flux est lu par le serveur, pas par le navigateur.
5. Copier l'URL du flux (du type `https://feeds.behold.so/AbCdEf123456`).
6. Sur Vercel : *Settings → Environment Variables* → ajouter **`INSTAGRAM_FEED_URL`** avec cette URL → **Redeploy**.
   (Variante : la coller dans `instagramFeedUrl` de `src/config/data-to-confirm.ts`.)

**Bon à savoir :**
- **Délai d'affichage** : avec la formule gratuite, Behold met le flux à jour **une fois par jour**, et le site se rafraîchit au plus une fois par heure. Un nouveau post apparaît donc en **24 h maximum**. La formule Starter de Behold (10 $/mois) passe à une mise à jour par heure.
- **Limite gratuite** (1 200 lectures/mois) : le site lit le flux au plus une fois par heure (< 750 lectures/mois), quel que soit le nombre de visiteurs. Aucun risque de dépassement.
- **Respect de la vie privée et rapidité** : les images sont optimisées puis servies par le site lui-même. Aucun script Instagram, aucun cookie, et le navigateur des visiteurs ne contacte ni Instagram ni Behold.
- **Masquer un post** : le retirer depuis le tableau de bord Behold (ou filtrer par mot-clé dans les réglages du flux).
- **Sécurité** : seuls les liens instagram.com et les images du CDN Behold sont acceptés. Si le flux est absent ou en panne, le bloc disparaît simplement : jamais de bloc vide ni de message d'erreur.
- Code : `src/lib/instagram.ts` (lecture du flux) et `src/components/sections/InstagramLatest.tsx` (affichage).

---

## 7. SEO, accessibilité, performance, sécurité

- **SEO** : titres et descriptions par page, Open Graph, `sitemap.xml`, `robots.txt` (`/admin` exclu), fil d'Ariane.
  Données structurées Schema.org : `BarOrPub` + `BowlingAlley`, `PostalAddress`, `OpeningHoursSpecification`, `Event` (événements publiés et à venir uniquement), `FAQPage`. Seules les données confirmées y figurent (ni téléphone ni prix inventés).
- **Accessibilité** : lien d'évitement, navigation clavier complète, focus visibles, menu mobile et lightbox en `dialog` avec piège de focus et fermeture Échap, textes alternatifs, labels, hiérarchie de titres, contrastes (boutons orange ou or avec texte foncé), `prefers-reduced-motion` respecté.
- **Performance** : images AVIF/WebP responsive avec lazy-loading, seule l'image du hero est préchargée. Polices locales, dimensions fixes (pas de CLS), carte OpenStreetMap chargée uniquement à la demande, pas de vidéo, animations CSS légères.
- **Sécurité / RGPD** (aucun outil d'analyse, aucun cookie de suivi) :
  - en-têtes de sécurité dans `next.config.ts` ;
  - aucun cookie de suivi ; la carte n'est chargée qu'après action de l'utilisateur, et le choix est mémorisé localement et modifiable via « Gestion des cookies » ;
  - aucune donnée personnelle collectée par le site (pas de formulaire) ;
  - pages Mentions légales et Politique de confidentialité.

> **Note X-Frame-Options** : sur Vercel, `X-Frame-Options: SAMEORIGIN`, `Content-Security-Policy: frame-ancestors 'self'` et HSTS sont ajoutés automatiquement. En local et dans les aperçus de développement, ils restent désactivés pour permettre l'affichage en iframe. Chez un autre hébergeur, définissez `STRICT_SECURITY_HEADERS=true` au moment du build.

---

## 8. Arborescence

```
src/
  app/                 pages (App Router), sitemap, robots, manifest, icônes
  components/
    brand/             Logo (clair / sombre / compact)
    cards/             ActivityCard, FoodCard, EventCard
    decor/             feuillages SVG, halos lumineux
    contact/           ContactOptions (boutons de contact), CopyMessage (message type)
    layout/            Header, Footer, barre d'actions mobile, gestion des cookies
    sections/          Hero, sections de l'accueil, Gallery, PracticalInfo, MapEmbed…
    seo/               JSON-LD
    ui/                Button, SectionTitle, Lightbox, Modal, OpeningHours, Icon…
  config/              site.ts, navigation.ts, data-to-confirm.ts
  data/                contenus éditables (activités, carte, événements, FAQ…)
  lib/                 boutons de contact, Schema.org, consentement, utilitaires
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
| Mentions légales | `/mentions-legales` |
| Politique de confidentialité | `/confidentialite` |
| Espace d'administration (en local uniquement) | `/admin` |
