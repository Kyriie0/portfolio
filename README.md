# Portfolio Math.dg

Site portfolio statique : HTML, CSS et JavaScript, sans dépendance ni base de données.
Il fonctionne sur n'importe quel hébergeur gratuit et avec n'importe quel nom de domaine.

## Ce qu'il y a dans le dossier

```
index.html              la page (tu n'as pas besoin d'y toucher)
css/style.css           le style (couleurs en haut du fichier)
js/contenu.js           ⭐ TON CONTENU : textes, contact, projets
js/app.js               le fonctionnement du site
admin.html              la page d'administration (ajouter, modifier, supprimer des projets)
images/projets/         tes créas, un dossier par projet
images/partage.jpg      (à ajouter) aperçu quand on partage le lien, 1200 x 630 px
favicon.svg             l'icône d'onglet
404.html, robots.txt    fichiers techniques
```

## Voir le site sur ton ordi

Double-clique sur `index.html`. Il s'ouvre dans ton navigateur, tout fonctionne.

## Modifier le contenu

Tout se passe dans **`js/contenu.js`**. Ouvre-le avec VS Code (gratuit) ou le Bloc-notes.

1. En haut, dans `SITE` : ton nom de graphiste, ta couleur d'accent, ton email, tes réseaux, ton texte « À propos ».
2. `CATEGORIES` : ce sont les filtres de la section Travaux (Affiches, Sport & esport, Identité visuelle, Miniatures, Divers). Tu peux en ajouter, en renommer ou changer l'ordre.
3. `PROJETS` : un bloc par projet. Tes 11 projets sont déjà en place.

Pour chaque projet, deux images principales : `couverture` (1800 px max, affichée en grand sur la page projet) et `vignette` (900 px, utilisée dans la grille et les bandes de l'accueil pour que le site charge vite).

La rangée d'affiches de l'accueil reprend tous tes projets, dans l'ordre de la liste.
Pour chaque projet, choisis le `format` de la vignette : `"portrait"` (affiche), `"carre"` (cover, logo) ou `"paysage"` (site, maquette).

### Ajouter un projet

1. Crée le dossier `images/projets/mon-projet/` et mets-y tes images.
2. Dans `contenu.js`, copie un bloc projet existant (de `{` jusqu'à `},`) et colle-le où tu veux dans la liste.
3. Change le `slug` en `"mon-projet"`, puis remplis les textes et les chemins d'images :

```js
couverture: "images/projets/mon-projet/cover.jpg",
images: [
  { src: "images/projets/mon-projet/01.jpg", alt: "Logo sur fond noir" },
  { src: "images/projets/mon-projet/02.jpg", alt: "Affiche", largeur: "demi" },
  { src: "images/projets/mon-projet/03.jpg", alt: "Flyer", largeur: "demi" },
  { video: "images/projets/mon-projet/motion.mp4", alt: "Animation du logo" },
],
```

4. Enregistre, rafraîchis la page. Si la page devient blanche, il manque presque toujours une virgule ou un guillemet.

L'ordre des projets dans le fichier est l'ordre d'affichage sur le site.

## Mettre le site en ligne (GitHub Pages, gratuit)

1. Sur GitHub, crée un nouveau dépôt **public**, par exemple `portfolio`.
2. *Add file → Upload files* : glisse **le contenu** du dossier (pas le dossier lui-même), puis *Commit changes*.
3. Va dans *Settings → Pages*. Dans « Branch », choisis `main` et `/ (root)`, puis *Save*.
4. Après une minute, ton site est en ligne sur `https://ton-pseudo.github.io/portfolio/`.

Pour chaque mise à jour, tu ré-uploades les fichiers modifiés sur GitHub et le site se met à jour tout seul.

> Alternatives qui marchent pareil : **Netlify** (tu glisses le dossier sur app.netlify.com/drop) ou **Render** (« Static Site », Publish directory : `.`).

## Gérer tes projets sans toucher au code : la page d'administration

Une fois le site en ligne sur GitHub, ouvre `https://ton-site/admin.html`. Tu peux y ajouter, modifier, supprimer et réordonner tes projets, changer tes textes, ton email, tes réseaux et tes catégories, puis cliquer sur **Publier**. Le site se met à jour tout seul en 1 à 2 minutes.

Les images se glissent en pleine qualité : la page crée elle-même la version web (2400 px) et la vignette.

**Toi seul peux modifier le site.** La page ne fonctionne qu'avec un jeton d'accès GitHub, que tu crées une fois :

1. Sur GitHub : *Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token*.
2. *Repository access* : « Only select repositories », puis choisis le dépôt du portfolio.
3. *Permissions → Repository permissions → Contents* : « Read and write ».
4. *Generate token*, copie-le, puis colle-le dans la page d'administration avec le nom du dépôt (`ton-pseudo/portfolio`).

Le jeton reste enregistré dans ton navigateur uniquement. Ne le partage pas et ne l'écris jamais dans un fichier du site. Si tu penses qu'il a fuité, supprime-le sur GitHub et crées-en un autre.

## Brancher ton nom de domaine (mathdg.fr, chez OVHcloud)

Le fichier `CNAME` du dossier indique déjà à GitHub que le site répond sur `mathdg.fr`.

1. Achète un domaine chez OVH, Gandi, Namecheap ou Cloudflare (environ 10 € par an pour un `.fr` ou un `.com`).
2. Sur GitHub : *Settings → Pages → Custom domain*, écris `mathdg.fr`, puis *Save*.
3. Chez ton registrar, dans la zone DNS, ajoute :

| Type  | Nom   | Valeur                    |
|-------|-------|---------------------------|
| CNAME | www   | ton-pseudo.github.io      |
| A     | @     | 185.199.108.153           |
| A     | @     | 185.199.109.153           |
| A     | @     | 185.199.110.153           |
| A     | @     | 185.199.111.153           |

4. Attends que GitHub valide (de quelques minutes à quelques heures), puis coche **Enforce HTTPS**.
5. Pense à mettre ensuite une adresse email à ton domaine dans `contenu.js` (ex. `contact@mathdg.fr`), ça fait plus pro.

## Personnaliser le style

- La couleur d'accent (bleu électrique par défaut) se change dans `js/contenu.js` : `accent: "#4D6BFF"`.
- Les autres couleurs sont en haut de `css/style.css`, dans `:root` (`--fond`, `--texte`…).
- Polices : Big Shoulders Display (titres) et Manrope (texte), chargées depuis Google Fonts.

## Fonctionnalités et animations

- Écran d'ouverture : compteur de chargement et affiches qui défilent, puis le rideau se lève (une seule fois par visite)
- Accueil : une rangée d'affiches alignées qui défile toute seule, s'arrête au survol et se fait glisser à la souris ou au doigt ; Math.dg apparaît lettre par lettre ; un clic sur une affiche ouvre le projet
- Bandeau défilant des catégories, qui accélère et change de sens avec le défilement
- Travaux : filtres par catégorie, affiches qui se dévoilent au défilement, colonnes à vitesses différentes, effet de relief et reflet au survol
- Transition : l'affiche cliquée s'agrandit pour devenir le visuel de la page projet, et revient à sa place au retour (Chrome, Edge, Safari récents ; simple fondu ailleurs)
- Page projet : halo de la couleur du projet (`couleur` dans `contenu.js`), titre animé, galerie, visionneuse plein écran, grand lien vers le projet suivant, flèches du clavier
- À propos : le texte s'allume mot par mot en défilant
- Contact : email en très grand, bouton aimanté pour le copier, liens réseaux
- Bulle « Voir / Zoom » qui suit la souris, barre de progression, en-tête qui se cache en descendant
- Adapté mobile, accessible au clavier ; les animations jouent toujours par défaut, et un bouton « Animations » en bas de page permet au visiteur de les couper
