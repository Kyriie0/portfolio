/* ==========================================================================
   CONTENU DU SITE — c'est le SEUL fichier à modifier pour mettre à jour
   ton portfolio. Pas besoin de toucher au reste.

   Règles simples :
   - Le texte va entre guillemets "comme ceci".
   - Chaque élément d'une liste se termine par une virgule.
   - Pour mettre une apostrophe dans un texte, utilise ’ (ou \').
   ========================================================================== */

const SITE = {
  signature: "Math.dg",           // ton nom de graphiste, affiché en grand
  metier: "Graphiste",
  ville: "Clermont-Ferrand",
  accent: "#4D6BFF",              // couleur d'accent du site (bleu électrique par défaut)

  accroche:
    "J’accompagne des artistes, des clubs et des créateurs de contenu avec des visuels qui ont du caractère : affiches, identités, covers et contenus réseaux.",

  disponible: true,
  disponibilite: "Disponible pour des projets freelance",

  // ⚠️ Remplace par ton adresse pro
  email: "contact@ton-domaine.fr",

  // Supprime une ligne si tu n'as pas le réseau, colle ton vrai lien sinon
  reseaux: [
    { nom: "TikTok", url: "https://www.tiktok.com/@mathgraphics" },
    { nom: "Instagram", url: "https://www.instagram.com/mathdgraphics" },
    { nom: "Behance", url: "https://www.behance.net/kyriie" },
  ],

  // Section « À propos » : un paragraphe par ligne
  aPropos: [
    "Étudiant en design graphique à l’ESDAC de Clermont-Ferrand, je travaille surtout pour les univers que je connais : le rap, le sport, l’esport et la création de contenu.",
    "Mon objectif : des visuels qui arrêtent le scroll, et des identités assez solides pour être déclinées partout, de l’affiche au post Instagram.",
  ],

  competences: ["Affiches", "Identité visuelle", "Covers", "Matchday & esport", "Contenus réseaux", "UI/UX"],
  outils: ["Photoshop", "Illustrator", "InDesign", "After Effects", "Figma"],
};

/* ==========================================================================
   CATÉGORIES — ce sont les filtres de la section Travaux, dans cet ordre.
   Une catégorie sans projet est masquée.
   - nom       : le mot utilisé dans "categorie" des projets (orthographe identique)
   - titre     : le nom affiché sur le site
   - sousTitre : la petite ligne affichée sur la page projet
   ========================================================================== */

const CATEGORIES = [
  { nom: "Affiches", titre: "Affiches", sousTitre: "Affiche" },
  { nom: "Sport & esport", titre: "Sport & esport", sousTitre: "Sport & esport" },
  { nom: "Identité visuelle", titre: "Identité visuelle", sousTitre: "Identité visuelle" },
  { nom: "Miniatures", titre: "Miniatures", sousTitre: "Miniatures YouTube" },
  { nom: "Divers", titre: "Divers", sousTitre: "Divers" },
];

/* ==========================================================================
   PROJETS — le premier de la liste s'affiche en premier sur le site.

   Pour chaque projet :
   - slug        : identifiant pour l'adresse (minuscules, tirets, sans accent)
   - titre, client, annee, role   (laisse "" pour masquer une info)
   - categorie   : le "nom" d'une des CATEGORIES ci-dessus
   - format      : forme de la vignette : "portrait" (affiche), "carre", "paysage" ou "large" (16:9, miniature YouTube)
   - couverture  : image principale, affichée en grand sur la page projet
   - vignette    : version légère de la couverture (grille + accueil)
   - couleur     : couleur d'ambiance de la page projet (halo lumineux en haut)
   - description : un paragraphe par ligne
   - images      : la galerie sous la couverture :
        { src: "...", alt: "description", legende: "optionnel" }  → pleine largeur
        { src: "...", alt: "...", largeur: "demi" }               → deux par ligne
        { src: "...", alt: "...", largeur: "tiers" }              → trois par ligne
        { src: "...", alt: "...", largeur: "centre" }             → seule, centrée (pour une affiche)
        { video: "....mp4", alt: "..." }                          → vidéo en boucle

   Range tes images dans : images/projets/<slug>/
   (exporte en JPG, 1800 px max sur le grand côté, et une vignette de 900 px)
   ========================================================================== */

const PROJETS = [
  {
    slug: "league-of-legends",
    titre: "League of Legends",
    client: "",
    annee: 2025,
    categorie: "Sport & esport",
    format: "portrait",
    role: "Série de 3 affiches, mockup",
    couverture: "images/projets/league-of-legends/inoxtag.jpg",
    vignette: "images/projets/league-of-legends/vignette.jpg",
    couleur: "#3F8FB5",
    description: [
      "Série de trois affiches autour de la scène League of Legends. La première promeut un événement Twitch d’Inoxtag sur le jeu, « Road to Plat », du 17 au 24 octobre 2025.",
      "La deuxième annonce un match de Hans Sama aux Worlds, et la troisième rend hommage à Faker. Chaque affiche a sa propre ambiance : bleu glacé et titre chromé pour Inoxtag, noir et rouge pour Hans Sama, sépia et couronne pour Faker.",
      "Les trois sont aussi présentées en situation, dans un couloir de métro.",
    ],
    images: [
      { src: "images/projets/league-of-legends/hans-sama.jpg", alt: "Affiche Hans Sama", largeur: "demi", legende: "Hans Sama : promotion d’un match des Worlds." },
      { src: "images/projets/league-of-legends/legend.jpg", alt: "Affiche Legend, hommage à Faker", largeur: "demi", legende: "Legend : hommage à Faker." },
      { src: "images/projets/league-of-legends/mockup.jpg", alt: "Les trois affiches en situation dans le métro", legende: "Les trois affiches en situation." },
    ],
  },
  {
    slug: "soma-aubrilam",
    titre: "SOMA",
    client: "Aubrilam",
    annee: "",
    categorie: "Affiches",
    format: "portrait",
    role: "Série de 5 affiches",
    couverture: "images/projets/soma-aubrilam/cover.jpg",
    vignette: "images/projets/soma-aubrilam/vignette.jpg",
    couleur: "#94D160",
    description: [
      "Série d’affiches pour promouvoir SOMA, la nouvelle gamme de mobilier urbain de l’entreprise Aubrilam. Le style Bauhaus était une demande de l’entreprise.",
      "J’ai construit un motif à partir de formes simples, quarts de cercle et rectangles arrondis, qui rappellent les courbes du mobilier. Le même motif se décline en cinq palettes de couleurs, avec les tabourets ou les chaises de la gamme au premier plan.",
    ],
    images: [
      { src: "images/projets/soma-aubrilam/vert.jpg", alt: "Affiche SOMA verte avec QR code", largeur: "demi" },
      { src: "images/projets/soma-aubrilam/bleu-rose.jpg", alt: "Affiche SOMA bleue et rose", largeur: "demi" },
      { src: "images/projets/soma-aubrilam/orange-jaune.jpg", alt: "Affiche SOMA orange et jaune", largeur: "demi" },
      { src: "images/projets/soma-aubrilam/violet.jpg", alt: "Affiche SOMA violette", largeur: "demi" },
    ],
  },
  {
    slug: "nomis",
    titre: "NOMIS",
    client: "Projet scolaire",
    annee: "",
    categorie: "Identité visuelle",
    format: "carre",
    role: "Cover, verso, affiche de tournée, merch",
    couverture: "images/projets/nomis/cover.jpg",
    vignette: "images/projets/nomis/vignette.jpg",
    couleur: "#3185C3",
    description: [
      "Projet scolaire centré sur la création d’un album et d’une direction artistique complète pour un artiste fictif, NOMIS. L’inspiration imposée était le film Eternal Sunshine of the Spotless Mind.",
      "Toute l’identité repose sur un motif de formes ondulées et granuleuses, dans des dégradés de bleu. Il se retrouve sur la cover, le verso de l’album, l’affiche de la tournée 2026 et le merch.",
    ],
    images: [
      { src: "images/projets/nomis/verso.jpg", alt: "Verso de l’album NOMIS avec la tracklist", largeur: "tiers", legende: "Verso de l’album" },
      { src: "images/projets/nomis/tshirt-face.jpg", alt: "T-shirt NOMIS porté, de face", largeur: "tiers", legende: "Merch, face" },
      { src: "images/projets/nomis/tshirt-dos.jpg", alt: "T-shirt NOMIS, dos", largeur: "tiers", legende: "Merch, dos" },
      { src: "images/projets/nomis/tour.jpg", alt: "Affiche de la tournée 2026 de NOMIS", largeur: "centre", legende: "Affiche de tournée" },
    ],
  },
  {
    slug: "kaatsup",
    titre: "Kaatsup",
    client: "",
    annee: "",
    categorie: "Sport & esport",
    format: "portrait",
    role: "Affiche",
    couverture: "images/projets/kaatsup/cover.jpg",
    vignette: "images/projets/kaatsup/vignette.jpg",
    couleur: "#2F6BB6",
    description: [
      "Affiche pour mettre en avant la performance de Kaatsup lors du GP Explorer de Squeezie, où elle termine à la deuxième place.",
      "Son nom occupe toute la largeur derrière le portrait. Les couleurs reprennent le bleu et le rose de sa combinaison, et des annotations dessinées à la main entourent la pilote.",
    ],
    images: [],
  },
  {
    slug: "nuits-sonores",
    titre: "Nuits Sonores",
    client: "Projet fictif",
    annee: 2026,
    categorie: "Affiches",
    format: "portrait",
    role: "Affiche de festival",
    couverture: "images/projets/nuits-sonores/cover.jpg",
    vignette: "images/projets/nuits-sonores/vignette.jpg",
    couleur: "#EF07C0",
    description: [
      "Affiche fictive pour promouvoir Nuits Sonores, un festival de musique techno à Lyon.",
      "De grandes formes fluides magenta et un tracé noir évoquent les ondes sonores. Le nom du festival, déformé dans un bloc noir au centre, donne l’impression de vibrer avec la musique.",
    ],
    images: [],
  },
  {
    slug: "miniatures-hamzakerda",
    titre: "Miniatures",
    client: "HamzaKerda",
    annee: "",
    categorie: "Miniatures",
    format: "large",
    role: "Miniatures YouTube",
    couverture: "images/projets/miniatures-hamzakerda/cover.jpg",
    vignette: "images/projets/miniatures-hamzakerda/vignette.jpg",
    couleur: "#4EB62F",
    description: [
      "Miniatures YouTube réalisées pour le youtubeur et streameur HamzaKerda, pour sa série Flashback.",
      "L’objectif d’une miniature est de donner envie de cliquer : une expression forte au premier plan, un titre court et très lisible, et un décor qui raconte l’épisode en un coup d’œil.",
    ],
    images: [
      { src: "images/projets/miniatures-hamzakerda/fin.jpg", alt: "Miniature « C’est la fin ! », épisode 11" },
    ],
  },
  {
    slug: "jeremy-jacquet",
    titre: "Jérémy Jacquet",
    client: "",
    annee: "",
    categorie: "Sport & esport",
    format: "portrait",
    role: "Affiche",
    couverture: "images/projets/jeremy-jacquet/cover.jpg",
    vignette: "images/projets/jeremy-jacquet/vignette.jpg",
    couleur: "#0167E3",
    description: [
      "Affiche pour mettre en avant la première sélection de Jérémy Jacquet en équipe de France.",
      "Le joueur se détache sur une silhouette remplie de supporters, entourée de motifs dessinés. Le bleu et l’or reprennent les couleurs de la sélection, avec son nom à la verticale sur le côté.",
    ],
    images: [],
  },
  {
    slug: "auverniaks",
    titre: "Auver’Niaks",
    client: "Projet scolaire",
    annee: "",
    categorie: "Identité visuelle",
    format: "paysage",
    role: "Logo, merch, affiches",
    couverture: "images/projets/auverniaks/logo.jpg",
    vignette: "images/projets/auverniaks/vignette.jpg",
    couleur: "#F0C729",
    description: [
      "Projet scolaire : refonte graphique du club de roller derby Auver’Niaks, avec son nouveau logo, son merch et ses affiches.",
      "Le logo associe un bélier à crête, en bleu marine et jaune, à un lettrage au style cartoon. L’identité se prolonge sur le maillot, traversé par une bande dorée illustrée, avec le numéro et le nom de la joueuse au dos.",
    ],
    images: [
      { src: "images/projets/auverniaks/maillot.jpg", alt: "Maillot Auver’Niaks, face et dos" },
    ],
  },
  {
    slug: "sunset-spritz",
    titre: "Sunset Spritz",
    client: "Hugo Fiard",
    annee: "",
    categorie: "Affiches",
    format: "portrait",
    role: "Affiche d’événement",
    couverture: "images/projets/sunset-spritz/cover.jpg",
    vignette: "images/projets/sunset-spritz/vignette.jpg",
    couleur: "#D86435",
    description: [
      "Affiche promotionnelle pour un DJ set de Hugo Fiard, DJ clermontois, au Grand Mess à Clermont-Ferrand.",
      "Le titre mélange deux typographies, une condensée orange et une manuscrite verte, posées sur une photo du DJ aux platines. Les couleurs rappellent le spritz et l’ambiance d’une fin de journée en terrasse.",
    ],
    images: [],
  },
  {
    slug: "saturn",
    titre: "Saturn",
    client: "Projet scolaire",
    annee: "",
    categorie: "Divers",
    format: "carre",
    role: "Cover, verso, CD",
    couverture: "images/projets/saturn/cover.jpg",
    vignette: "images/projets/saturn/vignette.jpg",
    couleur: "#3833B1",
    description: [
      "Projet scolaire : imaginer un album fictif et tout son packaging. J’ai créé Saturn, un album pour l’artiste Bushi, avec sa cover, son verso, son disque et une mise en situation du CD.",
      "L’univers est spatial : un ciel étoilé, des nébuleuses roses et violettes, et le titre en très grand derrière l’artiste. La planète du disque reprend le logo du label.",
    ],
    images: [
      { src: "images/projets/saturn/cd.jpg", alt: "Mockup du CD Saturn" },
      { src: "images/projets/saturn/verso.jpg", alt: "Verso de l’album avec la tracklist", largeur: "demi" },
      { src: "images/projets/saturn/disque.jpg", alt: "Visuel du disque", largeur: "demi" },
    ],
  },
  {
    slug: "jagermeister",
    titre: "Break the ice",
    client: "Projet scolaire",
    annee: "",
    categorie: "Divers",
    format: "portrait",
    role: "Affiche publicitaire",
    couverture: "images/projets/jagermeister/cover.jpg",
    vignette: "images/projets/jagermeister/vignette.jpg",
    couleur: "#23C156",
    description: [
      "Projet scolaire : créer une affiche promotionnelle pour un produit au choix. J’ai choisi Jägermeister.",
      "Le slogan « Break the ice » joue sur la façon de servir la boisson, glacée. La bouteille sort de la neige au milieu des glaçons, et le texte est découpé dans le vert de la marque et dans la glace.",
    ],
    images: [],
  },
];
