/* Portfolio Math.dg — logique et animations. Le contenu se modifie dans js/contenu.js */
(() => {
  "use strict";

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const racine = document.documentElement;
  const vueA = $("#vue-accueil");
  const vueP = $("#vue-projet");
  const curseur = $(".curseur");
  // Les animations jouent par défaut. Le visiteur peut les couper avec le bouton du pied de page (choix mémorisé).
  let reduit = false;
  try { reduit = localStorage.getItem("mdg-animations") === "non"; } catch { /* stockage indisponible */ }
  document.documentElement.classList.toggle("calme", reduit);
  const fin = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const etroit = matchMedia("(max-width: 700px)");
  const comportement = reduit ? "instant" : "smooth";

  const etat = { filtre: "Tout", scrollAccueil: 0, route: null, charge: false, colonnes: 0 };

  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const echap = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const projet = (slug) => PROJETS.find((p) => p.slug === slug);
  const categorie = (nom) => CATEGORIES.find((c) => c.nom === nom);
  const nomCat = (nom) => (categorie(nom) ? categorie(nom).titre : nom);
  const estProjet = (r) => /^\/projet\//.test(r || "");
  const pret = () => (document.fonts ? document.fonts.ready : Promise.resolve());
  const stock = {
    lire(k) { try { return sessionStorage.getItem(k); } catch { return null; } },
    ecrire(k, v) { try { sessionStorage.setItem(k, v); } catch { /* indisponible */ } },
  };

  if (SITE.accent) racine.style.setProperty("--accent", SITE.accent);
  $$("[data-signature]").forEach((el) => (el.textContent = SITE.signature));

  /* Découpe un texte en mots et en lettres pour les animer une par une */
  function lettres(txt) {
    let i = 0;
    return String(txt)
      .split(" ")
      .map((mot) => `<span class="mot">${[...mot].map((l) => `<span class="l" style="--i:${i++}">${echap(l)}</span>`).join("")}</span>`)
      .join(" ");
  }

  /* ---------- Médias ---------- */

  function vignette(p, grande = false) {
    const src = grande ? p.couverture : p.vignette || p.couverture;
    if (src) return `<img src="${echap(src)}" alt="${echap(p.titre)}" decoding="async" draggable="false">`;
    return `<div class="substitut" style="--c:${echap(p.couleur || "#2A2A2A")}" role="img" aria-label="${echap(p.titre)}"><span>${echap(p.titre)}</span></div>`;
  }

  function media(item, p) {
    if (item.video) {
      return `<video src="${echap(item.video)}" ${item.poster ? `poster="${echap(item.poster)}"` : ""} autoplay muted loop playsinline aria-label="${echap(item.alt || p.titre)}"></video>`;
    }
    return `<img src="${echap(item.src)}" alt="${echap(item.alt || p.titre)}" decoding="async">`;
  }

  /* ---------- Accueil ---------- */

  // Rangée d'affiches de l'accueil : alignées, elles défilent toutes seules et se font glisser à la souris ou au doigt
  function rendreRail() {
    const piste = $(".rail-piste");
    if (!piste || !PROJETS.length) return;
    let items = [...PROJETS];
    while (items.length < 12) items = items.concat(PROJETS);
    const html = items
      .map((p, i) => `<a class="r-item ${echap(p.format || "portrait")}" href="#/projet/${echap(p.slug)}" data-slug="${echap(p.slug)}" data-curseur="Voir" tabindex="-1" draggable="false" style="--i:${Math.min(i, 12)}"><span class="r-in">${vignette(p)}</span></a>`)
      .join("");
    piste.innerHTML = html + html;
  }

  function carte(p, c) {
    return `<a class="carte ${echap(p.format || "portrait")} revele" href="#/projet/${echap(p.slug)}" data-slug="${echap(p.slug)}" data-curseur="Voir" style="--c:${c}">
      <span class="carte-media"><span class="carte-in">${vignette(p)}</span></span>
      <span class="carte-legende"><span class="c-titre">${echap(p.titre)}</span><span class="c-info">${echap([nomCat(p.categorie), p.annee].filter(Boolean).join(", "))}</span></span>
    </a>`;
  }

  function rendreAccueil() {
    const cats = CATEGORIES.filter((c) => PROJETS.some((p) => p.categorie === c.nom));
    const filtres = [{ nom: "Tout", titre: "Tout" }, ...cats]
      .map((c) => {
        const n = c.nom === "Tout" ? PROJETS.length : PROJETS.filter((p) => p.categorie === c.nom).length;
        return `<button type="button" class="filtre" data-filtre="${echap(c.nom)}" aria-pressed="${etat.filtre === c.nom}">${echap(c.titre)}<sup>${n}</sup></button>`;
      })
      .join("");

    // Bandeau défilant des catégories
    const mots = cats.length ? cats.map((c) => c.titre) : [SITE.metier];
    const unTour = mots
      .map((m) => `<span>${echap(m)}</span><i></i>`)
      .join("");

    vueA.innerHTML = `
      <section class="hero">
        <div class="rail" aria-hidden="true"><div class="rail-piste"></div></div>
        <div class="hero-bas">
          <h1 class="signature" aria-label="${echap(SITE.signature)}, ${echap(SITE.metier.toLowerCase())}"><span class="lettres" aria-hidden="true">${lettres(SITE.signature)}</span></h1>
          <div class="hero-infos">
            <p class="accroche">${echap(SITE.accroche)}</p>
            <p class="dispo ${SITE.disponible ? "" : "non"}"><i aria-hidden="true"></i>${echap(SITE.disponible ? SITE.disponibilite : "Pas disponible pour le moment")}</p>
            <p class="lieu">${echap(SITE.metier)}, ${echap(SITE.ville)}</p>
          </div>
        </div>
      </section>

      <div class="defilant" aria-hidden="true"><div class="def-piste">${unTour.repeat(4)}</div></div>

      <section class="travaux" id="travaux" aria-labelledby="t-travaux">
        <div class="sec-tete">
          <h2 class="sec-titre revele" id="t-travaux"><span>Travaux<sup>${PROJETS.length}</sup></span></h2>
          <div class="filtres" role="group" aria-label="Filtrer par catégorie">${filtres}</div>
        </div>
        <div class="grille" data-grille></div>
      </section>

      <section class="a-propos" id="a-propos" aria-labelledby="t-apropos">
        <h2 class="sec-titre revele" id="t-apropos"><span>À propos</span></h2>
        <p class="manifeste">${(SITE.aPropos[0] || SITE.accroche).split(" ").map((m) => `<span class="m">${echap(m)}</span>`).join(" ")}</p>
        <div class="ap-bas">
          <div class="ap-texte revele">${SITE.aPropos.slice(1).map((t) => `<p>${echap(t)}</p>`).join("")}</div>
          <div class="ap-liste revele"><h3>Ce que je fais</h3><ul>${SITE.competences.map((c) => `<li>${echap(c)}</li>`).join("")}</ul></div>
          <div class="ap-liste revele"><h3>Outils</h3><ul>${SITE.outils.map((c) => `<li>${echap(c)}</li>`).join("")}</ul></div>
        </div>
      </section>

      ${blocContact(true)}`;

    rendreRail();
    rendreGrille(true);
    observer(vueA);
    pret().then(() => { ajusterTout(); mesurer(); });
  }

  function rendreGrille(premier = false) {
    const grille = $("[data-grille]");
    if (!grille) return;
    const n = innerWidth >= 900 ? 3 : 2;
    etat.colonnes = n;
    const items = PROJETS.filter((p) => etat.filtre === "Tout" || p.categorie === etat.filtre);
    const cols = Array.from({ length: n }, () => []);
    items.forEach((p, i) => cols[i % n].push(carte(p, i % n)));
    const poser = () => {
      grille.style.setProperty("--n", n);
      grille.innerHTML = cols.map((c) => `<div class="col">${c.join("")}</div>`).join("");
      grille.classList.remove("sortie");
      observer(grille);
      $$(".filtre").forEach((b) => b.setAttribute("aria-pressed", b.dataset.filtre === etat.filtre));
    };
    if (premier || reduit) return poser();
    grille.classList.add("sortie");
    setTimeout(poser, 200);
  }

  function blocContact(avecId) {
    return `<section class="contact" ${avecId ? 'id="contact" aria-labelledby="t-contact"' : 'aria-label="Contact"'}>
      <h2 class="ct-intro" ${avecId ? 'id="t-contact"' : ""}>Un projet, une collab ? Écris-moi.</h2>
      <a class="ct-email" href="mailto:${echap(SITE.email)}" aria-label="${echap(SITE.email)}"><span data-ajuste aria-hidden="true">${lettres(SITE.email)}</span></a>
      <div class="ct-actions">
        <button type="button" class="bouton aimant" data-copier>Copier l’adresse</button>
        <ul class="reseaux">${SITE.reseaux.map((r) => `<li><a href="${echap(r.url)}" target="_blank" rel="noopener">${echap(r.nom)}</a></li>`).join("")}</ul>
      </div>
      <div class="pied">
        <p>© ${new Date().getFullYear()} ${echap(SITE.signature)}</p>
        <p>${echap(SITE.ville)}</p>
        <button type="button" data-anim aria-pressed="${!reduit}">Animations : ${reduit ? "coupées" : "activées"}</button>
        <button type="button" data-haut>Retour en haut</button>
      </div>
    </section>`;
  }

  /* ---------- Page projet ---------- */

  function rendreProjet(slug) {
    const p = projet(slug);
    if (!p) return rendreIntrouvable();
    const i = PROJETS.indexOf(p);
    const prec = PROJETS[(i - 1 + PROJETS.length) % PROJETS.length];
    const suiv = PROJETS[(i + 1) % PROJETS.length];
    const cat = categorie(p.categorie);

    const galerie = (p.images || [])
      .map(
        (it, k) => `<figure class="g-item revele ${["demi", "tiers", "centre"].includes(it.largeur) ? it.largeur : ""}">
          <button type="button" class="g-ouvrir" data-vis="${p.couverture ? k + 1 : k}" data-curseur="Zoom" aria-label="Agrandir ${echap(it.alt || "l’image")}">${media(it, p)}</button>
          ${it.legende ? `<figcaption>${echap(it.legende)}</figcaption>` : ""}
        </figure>`
      )
      .join("");

    const meta = [
      ["Client", p.client],
      ["Année", p.annee],
      ["Catégorie", cat ? cat.titre : p.categorie],
      ["Rôle", p.role],
    ]
      .filter(([, v]) => v)
      .map(([k, v]) => `<div><dt>${k}</dt><dd>${echap(v)}</dd></div>`)
      .join("");

    vueP.innerHTML = `
      <article class="projet" style="--teinte:${echap(p.couleur || SITE.accent || "#4D6BFF")}" data-slug="${echap(p.slug)}">
        <div class="p-halo" aria-hidden="true"></div>
        <a class="retour" href="#/travaux">Tous les travaux</a>
        <div class="p-haut">
          <div class="p-infos">
            ${cat && cat.sousTitre ? `<p class="p-sur">${echap(cat.sousTitre)}</p>` : ""}
            <h1 class="p-titre" aria-label="${echap(p.titre)}"><span aria-hidden="true">${lettres(p.titre)}</span></h1>
            <dl class="p-meta">${meta}</dl>
            <div class="p-texte">${(p.description || []).map((t) => `<p>${echap(t)}</p>`).join("")}</div>
          </div>
          ${p.couverture
            ? `<button type="button" class="p-visuel" data-vis="0" data-curseur="Zoom" aria-label="Agrandir ${echap(p.titre)}">${vignette(p, true)}</button>`
            : `<div class="p-visuel">${vignette(p)}</div>`}
        </div>
        ${galerie ? `<div class="galerie">${galerie}</div>` : ""}
        <a class="p-suivant" href="#/projet/${echap(suiv.slug)}" data-sens="suiv" data-curseur="Suivant">
          <span class="ps-label">Projet suivant</span>
          <span class="ps-titre">${echap(suiv.titre)}</span>
          <span class="ps-img ${echap(suiv.format || "portrait")}" aria-hidden="true">${vignette(suiv)}</span>
        </a>
        <a class="sr" href="#/projet/${echap(prec.slug)}" data-sens="prec">Projet précédent : ${echap(prec.titre)}</a>
      </article>
      ${blocContact(false)}`;

    document.title = `${p.titre}, ${SITE.signature}`;
    observer(vueP);
    pret().then(ajusterTout);
    const art = $(".projet", vueP);
    requestAnimationFrame(() => requestAnimationFrame(() => art.classList.add("entre")));
  }

  function rendreIntrouvable() {
    vueP.innerHTML = `
      <section class="introuvable">
        <h1>Page introuvable</h1>
        <p>Le projet a peut-être été renommé ou retiré.</p>
        <a class="bouton" href="#/travaux">Voir les travaux</a>
      </section>`;
    document.title = `Page introuvable, ${SITE.signature}`;
  }

  /* ---------- Apparitions au défilement ---------- */

  const io = "IntersectionObserver" in window && !reduit
    ? new IntersectionObserver(
        (entrees) => entrees.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("vu"); io.unobserve(e.target); }
        }),
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      )
    : null;

  function observer(zone) {
    $$(".revele:not(.vu)", zone).forEach((el) => (io ? io.observe(el) : el.classList.add("vu")));
  }

  /* ---------- Textes ajustés à la largeur ---------- */

  function ajuster(el, max = Infinity) {
    const boite = el.parentElement;
    if (!boite.clientWidth) return;
    el.style.fontSize = "100px";
    const w = el.getBoundingClientRect().width;
    const cs = getComputedStyle(boite);
    const dispo = boite.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    if (w > 0) el.style.fontSize = `${Math.min((100 * dispo) / w, max)}px`;
  }

  function ajusterTout() {
    const l = $(".signature .lettres");
    if (l) ajuster(l, etroit.matches ? Infinity : innerHeight * 0.38);
    $$("[data-ajuste]").forEach((el) => ajuster(el));
  }

  /* ---------- Navigation (adresses en #/...) ---------- */

  const sections = { "/travaux": "travaux", "/a-propos": "a-propos", "/contact": "contact" };
  const routeActuelle = () => location.hash.slice(1) || "/";

  function lancerHero() {
    const hero = $(".hero");
    if (hero && etat.charge && !vueA.hidden) hero.classList.add("pret");
  }

  // Met l'écran à jour pour une adresse. Tout est fait d'un coup pour que la transition soit fluide.
  function afficher(route, doux = false) {
    const avant = etat.route;
    const m = route.match(/^\/projet\/([\w-]+)/);

    if (m || !(route === "/" || sections[route])) {
      if (avant !== null && !estProjet(avant) && !vueA.hidden) etat.scrollAccueil = scrollY;
      if (m) rendreProjet(m[1]);
      else rendreIntrouvable();
      vueA.hidden = true;
      vueP.hidden = false;
      scrollTo({ top: 0, behavior: "instant" });
    } else {
      const revient = vueA.hidden;
      vueP.hidden = true;
      vueA.hidden = false;
      document.title = `${SITE.signature}, ${SITE.metier.toLowerCase()}`;
      if (revient) { ajusterTout(); mesurer(); }
      const cible = sections[route] && $("#" + sections[route]);
      if (revient && route === "/travaux" && etat.scrollAccueil) scrollTo({ top: etat.scrollAccueil, behavior: "instant" });
      else if (cible) cible.scrollIntoView({ behavior: revient || !doux ? "instant" : comportement });
      else scrollTo({ top: 0, behavior: revient || !doux ? "instant" : comportement });
      lancerHero();
    }

    etat.route = route;
    $$("[data-nav]").forEach((a) => a.toggleAttribute("aria-current", sections[route] === a.dataset.nav));
    entete.classList.remove("cache");
    curseur.classList.remove("actif");
  }

  // Clic sur un lien interne : l'affiche cliquée se transforme en visuel de la page projet (et inversement)
  function naviguer(href, source) {
    const route = href.slice(1) || "/";
    if (route === etat.route) return afficher(route, true);
    const changer = () => { location.hash = href; afficher(route, true); };
    const vers = estProjet(route);
    const depuis = estProjet(etat.route);
    if (!document.startViewTransition || reduit || (!vers && !depuis)) return changer();

    const nommes = [];
    const nommer = (el) => { if (el) { el.style.viewTransitionName = "affiche"; nommes.push(el); } };
    const liberer = () => nommes.splice(0).forEach((el) => (el.style.viewTransitionName = ""));

    if (vers && !depuis) nommer(source && $("img", source));
    else if (depuis && !vers) nommer($(".p-visuel img", vueP));
    const slugAvant = depuis ? etat.route.split("/")[2] : null;

    const t = document.startViewTransition(() => {
      liberer();
      changer();
      if (vers && !depuis) nommer($(".p-visuel img", vueP));
      else if (depuis && !vers && slugAvant) {
        const img = $(`.carte[data-slug="${slugAvant}"] img`, vueA);
        const r = img && img.getBoundingClientRect();
        if (r && r.bottom > 0 && r.top < innerHeight) {
          img.closest(".carte").classList.add("vu");
          nommer(img);
        }
      }
    });
    t.finished.finally(liberer);
  }

  window.addEventListener("hashchange", () => {
    const r = routeActuelle();
    if (r !== etat.route) afficher(r);
  });

  /* ---------- Visionneuse ---------- */

  const vis = $(".visionneuse");
  const visEtat = { liste: [], i: 0, p: null };

  function afficherVis() {
    const it = visEtat.liste[visEtat.i];
    $(".vis-media", vis).innerHTML = media(it, visEtat.p);
    $(".vis-legende", vis).textContent = it.legende || "";
    $(".vis-compteur", vis).textContent = `${visEtat.i + 1} / ${visEtat.liste.length}`;
    $(".vis-barre", vis).hidden = visEtat.liste.length < 2;
  }
  function ouvrirVis(p, i) {
    const liste = [...(p.couverture ? [{ src: p.couverture, alt: p.titre }] : []), ...(p.images || [])];
    Object.assign(visEtat, { p, liste, i });
    afficherVis();
    if (typeof vis.showModal === "function") vis.showModal();
    else vis.setAttribute("open", "");
    racine.classList.add("verrou");
  }
  const bougerVis = (d) => {
    const n = visEtat.liste.length;
    visEtat.i = (visEtat.i + d + n) % n;
    afficherVis();
  };
  vis.addEventListener("close", () => {
    racine.classList.remove("verrou");
    $(".vis-media", vis).innerHTML = "";
  });
  $(".vis-fermer", vis).addEventListener("click", () => vis.close());
  $(".vis-prec", vis).addEventListener("click", () => bougerVis(-1));
  $(".vis-suiv", vis).addEventListener("click", () => bougerVis(1));
  vis.addEventListener("click", (e) => {
    if (e.target === vis || e.target.classList.contains("vis-figure")) vis.close();
  });
  let toucheX = null;
  vis.addEventListener("touchstart", (e) => { toucheX = e.touches[0].clientX; }, { passive: true });
  vis.addEventListener("touchend", (e) => {
    if (toucheX === null) return;
    const dx = e.changedTouches[0].clientX - toucheX;
    if (Math.abs(dx) > 50) bougerVis(dx < 0 ? 1 : -1);
    toucheX = null;
  });

  /* ---------- Clics et clavier ---------- */

  document.addEventListener("click", async (e) => {
    const lien = e.target.closest('a[href^="#/"]');
    if (lien && rail.bouge && lien.closest(".rail")) {
      e.preventDefault();
      rail.bouge = false;
      return;
    }
    if (lien && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
      e.preventDefault();
      return naviguer(lien.getAttribute("href"), lien);
    }

    const filtre = e.target.closest("[data-filtre]");
    if (filtre && filtre.dataset.filtre !== etat.filtre) {
      etat.filtre = filtre.dataset.filtre;
      return rendreGrille();
    }

    const ouvrir = e.target.closest("[data-vis]");
    if (ouvrir) {
      const art = $(".projet", vueP);
      if (art) return ouvrirVis(projet(art.dataset.slug), Number(ouvrir.dataset.vis));
    }

    const copier = e.target.closest("[data-copier]");
    if (copier) {
      try {
        await navigator.clipboard.writeText(SITE.email);
        copier.textContent = "Adresse copiée";
      } catch {
        copier.textContent = "Sélectionne l’adresse pour la copier";
      }
      setTimeout(() => { copier.textContent = "Copier l’adresse"; }, 2400);
      return;
    }

    if (e.target.closest("[data-anim]")) {
      try { localStorage.setItem("mdg-animations", reduit ? "oui" : "non"); } catch { /* stockage indisponible */ }
      return location.reload();
    }

    if (e.target.closest("[data-haut]")) scrollTo({ top: 0, behavior: comportement });
  });

  document.addEventListener("keydown", (e) => {
    if (vis.open) {
      if (e.key === "ArrowLeft") bougerVis(-1);
      if (e.key === "ArrowRight") bougerVis(1);
      return;
    }
    if (vueP.hidden || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === "ArrowLeft") $('[data-sens="prec"]', vueP)?.click();
    if (e.key === "ArrowRight") $('[data-sens="suiv"]', vueP)?.click();
  });

  /* ---------- Souris : bulle, aimants, relief des cartes ---------- */

  const souris = { x: innerWidth / 2, y: innerHeight / 2, cx: innerWidth / 2, cy: innerHeight / 2, px: 0, py: 0 };
  let aimant = null;
  let relief = null;

  if (fin && !reduit) {
    document.addEventListener("pointermove", (e) => {
      souris.x = e.clientX;
      souris.y = e.clientY;
      const cible = e.target.closest ? e.target : null;
      rail.survol = !!(cible && cible.closest(".rail"));

      // Bulle « Voir », « Zoom »…
      const c = cible && cible.closest("[data-curseur]");
      curseur.classList.toggle("actif", !!c);
      if (c) curseur.firstElementChild.textContent = c.dataset.curseur;

      // Boutons aimantés
      const a = cible && cible.closest(".aimant");
      if (aimant && aimant !== a) { aimant.style.translate = ""; aimant = null; }
      if (a) {
        const r = a.getBoundingClientRect();
        a.style.translate = `${(e.clientX - r.left - r.width / 2) * 0.3}px ${(e.clientY - r.top - r.height / 2) * 0.4}px`;
        aimant = a;
      }

      // Relief des affiches de la grille
      const m = cible && cible.closest(".carte-media");
      if (relief && relief !== m) {
        relief.style.removeProperty("--rx");
        relief.style.removeProperty("--ry");
        relief = null;
      }
      if (m) {
        const r = m.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width;
        const ny = (e.clientY - r.top) / r.height;
        m.style.setProperty("--ry", `${(nx - 0.5) * 7}deg`);
        m.style.setProperty("--rx", `${(0.5 - ny) * 7}deg`);
        m.style.setProperty("--gx", `${nx * 100}%`);
        m.style.setProperty("--gy", `${ny * 100}%`);
        relief = m;
      }
    });
    document.addEventListener("pointerleave", () => curseur.classList.remove("actif"));
  }

  // Glisser la rangée d'affiches (souris ou doigt)
  document.addEventListener("pointerdown", (e) => {
    if (e.button || !e.target.closest || !e.target.closest(".rail")) return;
    Object.assign(rail, { glisse: true, bouge: false, depart: e.clientX, dernier: e.clientX });
  });
  window.addEventListener("pointermove", (e) => {
    if (!rail.glisse) return;
    const d = e.clientX - rail.dernier;
    rail.dernier = e.clientX;
    if (Math.abs(e.clientX - rail.depart) > 6) rail.bouge = true;
    if (rail.bouge) {
      rail.x += d;
      rail.vit = d;
      racine.classList.add("glisse");
    }
  });
  const lacher = () => { rail.glisse = false; racine.classList.remove("glisse"); };
  window.addEventListener("pointerup", lacher);
  window.addEventListener("pointercancel", lacher);

  /* ---------- Boucle d'animation (défilement, parallaxe, bandeau) ---------- */

  const entete = $(".site-header");
  const barre = $(".progression");
  const mes = { demi: 0, rail: 0, mots: [], motsOn: -1 };
  const rail = { x: 0, vit: 0, survol: false, glisse: false, bouge: false, depart: 0, dernier: 0 };
  let dernierY = scrollY;
  let vitesse = 0;
  let defX = 0;
  let sens = -1;

  function mesurer() {
    const piste = $(".def-piste");
    mes.demi = piste ? piste.scrollWidth / 2 : 0;
    const rp = $(".rail-piste");
    mes.rail = rp ? rp.scrollWidth / 2 : 0;
    mes.mots = $$(".manifeste .m");
    mes.motsOn = -1;
    if (reduit) mes.mots.forEach((m) => m.classList.add("on"));
  }

  function boucle() {
    const y = scrollY;
    const dy = y - dernierY;
    dernierY = y;
    vitesse += (dy - vitesse) * 0.12;

    const max = racine.scrollHeight - innerHeight;
    barre.style.transform = `scaleX(${max > 0 ? clamp(y / max, 0, 1) : 0})`;
    entete.classList.toggle("defile", y > 20);
    if (dy > 6 && y > 400) entete.classList.add("cache");
    else if (dy < -6 || y < 400) entete.classList.remove("cache");

    if (fin) {
      souris.cx += (souris.x - souris.cx) * 0.22;
      souris.cy += (souris.y - souris.cy) * 0.22;
      curseur.style.transform = `translate3d(${souris.cx}px, ${souris.cy}px, 0)`;
      // Pendant le défilement, la souris ne bouge pas : on revérifie ce qu'il y a dessous
      if (dy && curseur.classList.contains("actif")) {
        const dessous = document.elementFromPoint(souris.x, souris.y);
        const c = dessous && dessous.closest("[data-curseur]");
        curseur.classList.toggle("actif", !!c);
        if (c) curseur.firstElementChild.textContent = c.dataset.curseur;
      }
    }

    // Rangée d'affiches : avance seule, s'arrête au survol, garde son élan après un glisser
    const rp = !vueA.hidden && y < innerHeight && $(".rail-piste");
    if (rp && mes.rail) {
      if (!rail.glisse) {
        const cible = reduit || rail.survol ? 0 : -(0.55 + Math.abs(vitesse) * 0.6);
        rail.vit += (cible - rail.vit) * 0.05;
        rail.x += rail.vit;
      }
      if (rail.x <= -mes.rail) rail.x += mes.rail;
      if (rail.x > 0) rail.x -= mes.rail;
      rp.style.transform = `translate3d(${rail.x.toFixed(1)}px,0,0)`;
    }

    if (!vueA.hidden && !reduit) {
      // Bandeau : il accélère et change de sens avec le défilement
      const piste = $(".def-piste");
      if (piste && mes.demi) {
        if (dy > 0.5) sens = -1;
        else if (dy < -0.5) sens = 1;
        defX += sens * (0.7 + Math.abs(vitesse) * 0.45);
        if (defX <= -mes.demi) defX += mes.demi;
        if (defX > 0) defX -= mes.demi;
        piste.style.transform = `translate3d(${defX.toFixed(1)}px,0,0) skewX(${clamp(vitesse * -0.25, -8, 8).toFixed(2)}deg)`;
      }

      // Le texte « À propos » s'allume mot par mot
      if (mes.mots.length) {
        const r = mes.mots[0].parentElement.getBoundingClientRect();
        const prog = clamp((innerHeight * 0.82 - r.top) / (r.height + innerHeight * 0.3), 0, 1);
        const n = Math.round(prog * mes.mots.length);
        if (n !== mes.motsOn) {
          mes.mots.forEach((m, i) => m.classList.toggle("on", i < n));
          mes.motsOn = n;
        }
      }
    }
    requestAnimationFrame(boucle);
  }

  /* ---------- Écran d'ouverture ---------- */

  function chargeur() {
    const el = $(".chargeur");
    const sources = PROJETS.map((p) => p.vignette || p.couverture).filter(Boolean);
    if (reduit || stock.lire("mdg-vu") || !sources.length) {
      el.remove();
      return Promise.resolve();
    }
    racine.classList.add("verrou");
    return new Promise((fini) => {
      const cadre = $(".ch-cadre", el);
      const compteur = $(".ch-compteur", el);
      const images = [];
      let charges = 0;
      sources.forEach((src) => {
        const im = new Image();
        im.onload = im.onerror = () => { charges++; if (im.naturalWidth) images.push(im); };
        im.src = src;
      });
      const debut = performance.now();
      let affiche = 0;
      let k = 0;
      let dernierFlash = 0;
      const pas = (t) => {
        const ecoule = t - debut;
        // Le compteur suit le chargement réel, sans jamais dépasser le temps écoulé (1,5 s minimum, 4 s maximum)
        const cibleNb = ecoule > 4000 ? 100 : Math.min((charges / sources.length) * 100, (ecoule / 1500) * 100);
        affiche += (cibleNb - affiche) * 0.12;
        if (cibleNb - affiche < 0.6) affiche = cibleNb;
        compteur.textContent = Math.round(affiche);
        if (images.length && t - dernierFlash > 130) {
          cadre.replaceChildren(images[k++ % images.length]);
          dernierFlash = t;
        }
        if (affiche < 100) return requestAnimationFrame(pas);
        stock.ecrire("mdg-vu", "1");
        el.classList.add("fini");
        racine.classList.remove("verrou");
        setTimeout(fini, 250);
        setTimeout(() => el.remove(), 1300);
      };
      requestAnimationFrame(pas);
    });
  }

  /* ---------- Démarrage ---------- */

  let resizeT;
  window.addEventListener("resize", () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(() => {
      ajusterTout();
      mesurer();
      if ((innerWidth >= 900 ? 3 : 2) !== etat.colonnes) rendreGrille(true);
    }, 100);
  });
  etroit.addEventListener("change", ajusterTout);

  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  rendreAccueil();
  afficher(routeActuelle());
  requestAnimationFrame(boucle);
  Promise.all([chargeur(), pret()]).then(() => {
    etat.charge = true;
    racine.classList.add("charge");
    ajusterTout();
    mesurer();
    lancerHero();
    const cible = sections[etat.route] && $("#" + sections[etat.route]);
    if (cible && !vueA.hidden) cible.scrollIntoView({ behavior: "instant" });
  });
})();
