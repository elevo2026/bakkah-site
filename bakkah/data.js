/* BAKKAH v2 - couche de données partagée par index.html et admin.html.
   Trois langues (fr / en / ar). Deux modes : Supabase (partagé, si config.js rempli) ou LOCAL (localStorage + catalogue par défaut).
   Dépend de i18n-data.js (window.BK_I18N) et catalog-data.js (window.BK_CATALOG), générés depuis contenu/*.json. */
(function () {
  "use strict";
  const LANGS = ["fr", "en", "ar"];
  const I18N = window.BK_I18N || { fr: {}, en: {}, ar: {} };
  const CAT = window.BK_CATALOG || { categories: [], products: [] };

  /* ---------- Textes : aplatissement des clés ("nav.home") ---------- */
  const flat = {};
  (function walk(o, p, L) {
    Object.keys(o).forEach(k => {
      const path = p ? p + "." + k : k, v = o[k];
      if (v && typeof v === "object" && !Array.isArray(v)) walk(v, path, L);
      else if (!Array.isArray(v)) { (flat[path] = flat[path] || {})[L] = v; }
    });
  })(I18N.fr, "", "fr");
  LANGS.slice(1).forEach(L => (function walk(o, p) {
    Object.keys(o).forEach(k => {
      const path = p ? p + "." + k : k, v = o[k];
      if (v && typeof v === "object" && !Array.isArray(v)) walk(v, path);
      else if (!Array.isArray(v)) { (flat[path] = flat[path] || {})[L] = v; }
    });
  })(I18N[L] || {}, ""));
  const GROUP_LABEL = { meta: "Titre et description (SEO)", nav: "Navigation", buttons: "Boutons", cart: "Panier", loader: "Écran de chargement", hero: "Accueil", sections: "Titres de sections", olfactive: "Profil olfactif", commitments: "Engagements", signature: "Mot-signe", product: "Fiche produit", signatureScents: "Senteurs", newsletter: "Newsletter", footer: "Pied de page", whatsapp: "Message WhatsApp", filters: "Filtres du catalogue", profile: "Profil olfactif (mots de fond)", sound: "Son", boutique: "Section boutique", legal: "Textes légaux", a11y: "Accessibilité" };
  const EXCLUDE = /^(admin\.|categories\.|meta\.dir$|meta\.langName$)/;
  const TEXT_KEYS = Object.keys(flat).filter(k => !EXCLUDE.test(k)).map(k => ({
    key: k, group: GROUP_LABEL[k.split(".")[0]] || k.split(".")[0], fr: flat[k].fr || "", en: flat[k].en || "", ar: flat[k].ar || "",
    multi: /\n/.test(flat[k].fr || "") || (flat[k].fr || "").length > 70
  }));

  const DEFAULT_FAQ = (I18N.fr.faq && I18N.fr.faq.items || []).map((f, i) => ({
    q: { fr: f.q, en: I18N.en.faq.items[i].q, ar: I18N.ar.faq.items[i].q },
    a: { fr: f.a, en: I18N.en.faq.items[i].a, ar: I18N.ar.faq.items[i].a }
  }));

  const DEFAULT_SETTINGS = {
    nom: "BAKKAH",
    devise: "",                  /* vide = devise des textes (DH / درهم). Texte modifiable : meta.currency */
    whatsapp: "212671501152",
    telephone: "+212 6 71 50 11 52",
    adresse: "",
    horaires: "",
    liens: {
      instagram: "https://www.instagram.com/b.bakka1/",
      tiktok: "https://www.tiktok.com/@b.bakka1",
      snapchat: "",
      facebook: "https://www.facebook.com/search/top?q=BAKKAH",   /* provisoire : recherche Facebook "BAKKAH" en attendant l'URL exacte de la page */
      whatsapp: "",            /* vide = lien construit depuis le numéro WhatsApp */
      avis: "https://www.google.com/search?q=BAKKAH+parfums+avis",   /* provisoire */
      itineraire: "https://www.google.com/maps/search/?api=1&query=BAKKAH+parfums+Maroc"   /* provisoire */
    },
    images: {
      logo: "assets/img/logo.jpg",
      og: "assets/img/boutique-1.jpg",
      boutique: ["assets/img/boutique-1.jpg","assets/img/boutique-niches.jpg","assets/img/boutique-3.jpg","assets/img/boutique-4.jpg","assets/img/boutique-5.jpg"]
    },
    newsletter: true,
    textes: {},                /* surcharges : { "nav.home": {fr:"", en:"", ar:""} } */
    faq: DEFAULT_FAQ
  };
  const DEFAULT_CATEGORIES = CAT.categories;
  const P = CAT.products;

  /* ---------- Placeholders élégants (SVG or / noir) ---------- */
  function iconSVG(kind, c1, c2, withBg) {
    c1 = c1 || "#5a4a2a"; c2 = c2 || "#e6c066";
    const g = `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8a6a1f"/><stop offset=".35" stop-color="#f6e27a"/><stop offset=".6" stop-color="#c9a227"/><stop offset="1" stop-color="#7a5a14"/></linearGradient><linearGradient id="l" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient><radialGradient id="h" cx=".5" cy=".12" r=".8"><stop offset="0" stop-color="#ffe9b0" stop-opacity=".55"/><stop offset="1" stop-color="#ffe9b0" stop-opacity="0"/></radialGradient></defs>`;
    const F = 'fill="url(#g)"', L = 'fill="url(#l)"', ST = 'fill="none" stroke="url(#g)" stroke-linecap="round"';
    const shapes = {
      bottle: `<rect x="62" y="130" width="76" height="130" rx="12" ${L} stroke="url(#g)" stroke-width="3"/><rect x="90" y="106" width="20" height="26" ${F}/><rect x="80" y="62" width="40" height="46" rx="6" ${F}/><rect x="74" y="170" width="52" height="40" rx="3" fill="#0b0b0b" stroke="url(#g)" stroke-width="1.5"/><path d="M82 190h36" ${ST} stroke-width="2"/>`,
      box: `<rect x="48" y="130" width="104" height="110" rx="6" ${L} stroke="url(#g)" stroke-width="3"/><rect x="40" y="108" width="120" height="30" rx="5" ${F}/><rect x="92" y="108" width="16" height="132" ${F}/><path d="M100 108c-30-40-58-10-30 0zM100 108c30-40 58-10 30 0z" ${ST}/>`,
      abaya: `<path d="M100 54c-14 0-22 12-28 30L40 170l-14 80c-2 14 8 20 24 22h100c16-2 26-8 24-22l-14-80-32-86c-6-18-14-30-28-30z" ${L} stroke="url(#g)" stroke-width="3"/><path d="M82 62c4 14 12 22 18 22s14-8 18-22" ${ST}/><path d="M100 84v186" ${ST} stroke-width="2"/><path d="M62 132l-20 70M138 132l20 70" ${ST} stroke-width="2"/>`,
      qamis: `<path d="M100 50c-12 0-20 8-26 22l-34 20-6 110c0 8 6 10 12 10l10-84v128h88V128l10 84c6 0 12-2 12-10l-6-110-34-20c-6-14-14-22-26-22z" ${L} stroke="url(#g)" stroke-width="3"/><path d="M88 54l12 28 12-28M100 82v70" ${ST} stroke-width="3"/><circle cx="100" cy="106" r="2.5" ${F}/><circle cx="100" cy="126" r="2.5" ${F}/>`,
      watch: `<rect x="82" y="34" width="36" height="50" rx="8" ${L}/><rect x="82" y="216" width="36" height="50" rx="8" ${L}/><circle cx="100" cy="150" r="56" ${F}/><circle cx="100" cy="150" r="46" fill="#0b0b0b"/><path d="M100 150V118M100 150l22 12" ${ST} stroke-width="3"/><circle cx="100" cy="150" r="4" ${F}/><path d="M100 112v6M100 188v6M62 150h6M132 150h6" ${ST} stroke-width="2"/>`,
      rug: `<rect x="42" y="50" width="116" height="200" rx="8" ${L} stroke="url(#g)" stroke-width="3"/><rect x="54" y="62" width="92" height="176" rx="4" fill="none" stroke="url(#g)" stroke-width="2"/><path d="M70 220V140c0-34 60-34 60 0v80z" fill="#0b0b0b" stroke="url(#g)" stroke-width="2.5"/><path d="M100 120l5 12h-10z" ${F}/><path d="M42 50v-12M58 50v-12M74 50v-12M90 50v-12M106 50v-12M122 50v-12M138 50v-12M154 50v-12" ${ST} stroke-width="2"/>`,
      tasbih: `<g ${F}>${Array.from({ length: 22 }, (_, i) => { const a = (i / 22) * Math.PI * 2; return `<circle cx="${(100 + 52 * Math.cos(a)).toFixed(1)}" cy="${(140 + 66 * Math.sin(a)).toFixed(1)}" r="8"/>`; }).join("")}</g><rect x="94" y="204" width="12" height="12" rx="3" ${L}/><path d="M100 216v32M92 248h16" ${ST}/><path d="M94 216l-6 32M106 216l6 32" ${ST} stroke-width="3"/>`,
      incense: `<path d="M52 140h96c0 40-22 70-48 70s-48-30-48-70z" ${L} stroke="url(#g)" stroke-width="3"/><rect x="40" y="132" width="120" height="12" rx="6" ${F}/><path d="M100 210v34M70 248h60" ${ST} stroke-width="6"/><path d="M88 122c-14-18 14-28 0-48M112 122c-14-18 14-28 0-48M100 118c-10-14 10-24 0-40" ${ST} stroke-width="3" opacity=".8"/>`
    };
    shapes.hijab = shapes.abaya;
    const body = shapes[kind] || shapes.box;
    const bg = withBg ? `<rect width="200" height="300" fill="#16120a"/>` : "";
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300">${g}${bg}<ellipse cx="100" cy="70" rx="90" ry="120" fill="url(#h)"/><g stroke-width="4">${body}</g></svg>`;
  }
  const svgURI = s => "data:image/svg+xml;charset=utf-8," + encodeURIComponent(s);

  /* ---------- Stockage (clés v2 : les données locales de la v1 sont ignorées, pas effacées) ---------- */
  const cfg = window.SITE_CONFIG || {};
  const live = !!(cfg.supabaseUrl && cfg.supabaseAnonKey && window.supabase);
  const sb = live ? window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey) : null;
  const K = { settings: "bk2_settings", cats: "bk2_categories", prods: "bk2_products", news: "bk_newsletter", pw: "bk_admin_pw", sess: "bk_admin_session" };
  const ls = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } },
    del(k) { try { localStorage.removeItem(k); } catch {} }
  };
  const uid = () => (crypto.randomUUID ? crypto.randomUUID() : Date.now() + "-" + Math.random().toString(16).slice(2));
  const clone = o => JSON.parse(JSON.stringify(o));
  const check = ({ data, error }) => { if (error) throw new Error(error.message); return data; };
  const byOrdre = a => a.slice().sort((x, y) => (x.ordre ?? 0) - (y.ordre ?? 0));
  function merge(base, over) {
    const out = clone(base);
    (function rec(o, s) { Object.keys(s || {}).forEach(k => { if (s[k] && typeof s[k] === "object" && !Array.isArray(s[k]) && o[k] && typeof o[k] === "object" && !Array.isArray(o[k])) rec(o[k], s[k]); else o[k] = s[k]; }); })(out, over);
    return out;
  }
  function resizeImage(file, max, quality) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file), img = new Image();
      img.onload = () => {
        const r = Math.min(1, max / Math.max(img.width, img.height));
        const c = document.createElement("canvas");
        c.width = Math.round(img.width * r); c.height = Math.round(img.height * r);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        c.toBlob(b => b ? resolve(b) : reject(new Error("Photo illisible")), "image/jpeg", quality);
      };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Ce fichier n'est pas une photo lisible.")); };
      img.src = url;
    });
  }
  const blobToDataURL = b => new Promise(r => { const f = new FileReader(); f.onload = () => r(f.result); f.readAsDataURL(b); });
  function hash(str) { /* hachage léger (démo locale) ; SHA-256 si disponible */
    if (window.crypto && crypto.subtle) return crypto.subtle.digest("SHA-256", new TextEncoder().encode("bakkah:" + str)).then(b => Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2, "0")).join(""));
    let h = 5381; for (const c of "bakkah:" + str) h = ((h << 5) + h + c.charCodeAt(0)) >>> 0;
    return Promise.resolve("w" + h.toString(16));
  }

  /* ---------- Langue ---------- */
  function detectLang() {
    try {
      const q = new URLSearchParams(location.search).get("lang");
      if (LANGS.includes(q)) { localStorage.setItem("bk_lang", q); return q; }
      const s = localStorage.getItem("bk_lang"); if (LANGS.includes(s)) return s;
    } catch {}
    const prefs = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "fr"]);
    for (const l of prefs) { const c = String(l).slice(0, 2).toLowerCase(); if (LANGS.includes(c)) return c; }
    return "fr";
  }
  const isRtl = lang => lang === "ar";
  /* champ trilingue d'un objet : nom, nom_en, nom_ar (repli sur FR) */
  const tr = (o, base, lang) => { const v = lang === "fr" ? o[base] : o[base + "_" + lang]; return (v !== undefined && v !== null && String(v).trim() !== "") ? v : (o[base] || ""); };

  /* liens : seuls https:, http:, tel:, mailto: sont acceptés (sinon chaîne vide) */
  function safeLink(u) { u = String(u == null ? "" : u).trim(); return /^(https?:\/\/|tel:|mailto:)[^\s<>"']+$/i.test(u) ? u : ""; }

  /* ---------- Prix (null = sur demande) ---------- */
  const hasPrice = v => v !== null && v !== undefined && v !== "" && !isNaN(Number(v));
  function priceOf(p, variantLabel) {
    const v = (p.variantes || []).find(x => x.label === variantLabel);
    const base = v && hasPrice(v.prix) ? Number(v.prix) : (hasPrice(p.prix) ? Number(p.prix) : null);
    if (base === null) return { now: null, old: null };
    const ratio = hasPrice(p.prix_promo) && hasPrice(p.prix) && Number(p.prix) > 0 ? Number(p.prix_promo) / Number(p.prix) : 1;
    const now = Math.round(base * ratio * 100) / 100;
    return { now, old: ratio < 1 ? base : null };
  }
  /* plus petit prix connu (null si aucun) */
  function minPrice(p) {
    const all = [priceOf(p).now, ...(p.variantes || []).map(v => priceOf(p, v.label).now)].filter(x => x !== null);
    return all.length ? Math.min(...all) : null;
  }
  const pct = p => (hasPrice(p.prix_promo) && hasPrice(p.prix) && p.prix > p.prix_promo) ? Math.round((1 - p.prix_promo / p.prix) * 100) : 0;
  /* format marocain : 1 250 DH (fr/ar, espace insécable, virgule) ; 1,250 DH (en) */
  function fmt(n, lang, cur) {
    if (!hasPrice(n)) return "";
    const neg = n < 0 ? "-" : "", a = Math.abs(n), whole = Math.floor(Math.round(a * 100) / 100), dec = Math.round((a - whole) * 100);
    const sep = lang === "en" ? "," : " ", dsep = lang === "en" ? "." : ",";
    const g = String(whole).replace(/\B(?=(\d{3})+(?!\d))/g, sep);
    return neg + g + (dec ? dsep + String(dec).padStart(2, "0") : "") + " " + cur;
  }

  const api = {
    mode: live ? "live" : "local",
    LANGS, I18N, TEXT_KEYS, DEFAULT_SETTINGS, DEFAULT_CATEGORIES, DEFAULT_PRODUCTS: P, DEFAULT_FAQ,
    safeLink, iconSVG, priceOf, minPrice, pct, fmt, hasPrice, uid, resizeImage, detectLang, isRtl, tr, clone,
    placeholder(p, cats, withBg) { const c = (cats || DEFAULT_CATEGORIES).find(x => x.id === p.categorie); return svgURI(iconSVG((c && c.icone) || "box", p.couleur1, p.couleur2, withBg)); },
    photoOf(p, cats, i) { return (p.photos && p.photos[i || 0]) || api.placeholder(p, cats, false); },
    /* texte modifiable : surcharge vendeur (dans la langue) > texte d'origine de la langue > français */
    text(settings, key, lang) {
      const o = settings.textes && settings.textes[key], d = flat[key];
      const v = o && o[lang];
      if (v !== undefined && v !== null && v !== "") return v;
      if (d && d[lang] !== undefined && d[lang] !== "") return d[lang];
      const f = o && o.fr; if (f) return f;
      return d ? (d.fr || "") : "";
    },
    /* devise : réglage vendeur éventuel, sinon texte meta.currency de la langue */
    currency(settings, lang) { return (settings.devise && String(settings.devise).trim()) || api.text(settings, "meta.currency", lang) || "DH"; },
    faq(settings, lang) { return (settings.faq || DEFAULT_FAQ).map(f => ({ q: (f.q && (f.q[lang] || f.q.fr)) || (typeof f.q === "string" ? f.q : ""), a: (f.a && (f.a[lang] || f.a.fr)) || (typeof f.a === "string" ? f.a : "") })).filter(f => f.q && f.a); },
    waNumber(s) { return String(s.whatsapp || "").replace(/\D/g, ""); },
    /* produits d'une catégorie ("promos" = articles de la catégorie Promos + tout article en promotion) */
    inCategory(prods, catId) { return catId === "promos" ? prods.filter(p => p.categorie === "promos" || pct(p) > 0) : prods.filter(p => p.categorie === catId); },

    async getSettings() {
      if (!live) return merge(DEFAULT_SETTINGS, ls.get(K.settings, {}));
      const d = check(await sb.from("reglages").select("data").eq("id", 1).maybeSingle());
      return merge(DEFAULT_SETTINGS, (d && d.data) || {});
    },
    async saveSettings(s) {
      if (!live) { if (!ls.set(K.settings, s)) throw new Error("Mémoire du navigateur pleine : utilisez des photos plus petites."); return; }
      check(await sb.from("reglages").upsert({ id: 1, data: s }));
    },
    async getCategories() {
      if (!live) return byOrdre(ls.get(K.cats, null) || clone(DEFAULT_CATEGORIES));
      const rows = check(await sb.from("categories").select("*").order("ordre"));
      return rows.length ? rows.map(r => ({ ...r.data, id: r.id, ordre: r.ordre })) : clone(DEFAULT_CATEGORIES);
    },
    async saveCategories(list) { /* liste complète, dans l'ordre */
      list = list.map((c, i) => ({ ...c, ordre: i }));
      if (!live) { if (!ls.set(K.cats, list)) throw new Error("Mémoire du navigateur pleine."); return; }
      check(await sb.from("categories").upsert(list.map(c => ({ id: c.id, ordre: c.ordre, data: c }))));
      const ids = list.map(c => c.id);
      const all = check(await sb.from("categories").select("id"));
      const gone = all.map(r => r.id).filter(id => !ids.includes(id));
      if (gone.length) check(await sb.from("categories").delete().in("id", gone));
    },
    async getProducts() {
      if (!live) return byOrdre(ls.get(K.prods, null) || clone(P));
      const rows = check(await sb.from("produits").select("*").order("ordre"));
      return rows.length ? rows.map(r => ({ ...r.data, id: r.id, ordre: r.ordre })) : clone(P);
    },
    async saveProduct(p) {
      if (!live) {
        const all = await api.getProducts();
        const i = all.findIndex(x => x.id === p.id);
        if (i >= 0) all[i] = p; else { p.id = p.id || uid(); p.ordre = all.length; all.push(p); }
        if (!ls.set(K.prods, all)) throw new Error("Mémoire du navigateur pleine : utilisez des photos plus petites ou passez en mode Supabase.");
        return p;
      }
      if (!p.id) p.id = uid();
      check(await sb.from("produits").upsert({ id: p.id, ordre: p.ordre ?? 0, data: p }));
      return p;
    },
    async deleteProduct(id) {
      if (!live) { ls.set(K.prods, (await api.getProducts()).filter(x => x.id !== id)); return; }
      check(await sb.from("produits").delete().eq("id", id));
    },
    async saveProducts(list) { /* sauvegarde complète (ordre, import) */
      list = list.map((p, i) => ({ ...p, ordre: i }));
      if (!live) { if (!ls.set(K.prods, list)) throw new Error("Mémoire du navigateur pleine."); return; }
      check(await sb.from("produits").upsert(list.map(p => ({ id: p.id, ordre: p.ordre, data: p }))));
    },
    async uploadImage(file, max) {
      if (!live) return blobToDataURL(await resizeImage(file, max || 800, 0.74));
      const blob = await resizeImage(file, Math.max(max || 800, 1400), 0.82);
      const path = `${uid()}.jpg`;
      check(await sb.storage.from("photos").upload(path, blob, { contentType: "image/jpeg", cacheControl: "31536000" }));
      return sb.storage.from("photos").getPublicUrl(path).data.publicUrl;
    },
    async addSubscriber(email) {
      if (!live) { const l = ls.get(K.news, []); if (!l.find(x => x.email === email)) l.push({ email, date: new Date().toISOString() }); ls.set(K.news, l); return; }
      check(await sb.from("newsletter").insert({ email }));
    },
    async getSubscribers() {
      if (!live) return ls.get(K.news, []);
      return check(await sb.from("newsletter").select("*").order("created_at"));
    },
    resetDemo() { [K.settings, K.cats, K.prods].forEach(ls.del); },
    exportAll: async () => ({ settings: await api.getSettings(), categories: await api.getCategories(), products: await api.getProducts() }),
    async importAll(d) { if (d.settings) await api.saveSettings(d.settings); if (d.categories) await api.saveCategories(d.categories); if (d.products) await api.saveProducts(d.products); },
    onChange(cb) { window.addEventListener("storage", e => { if (e.key === K.settings || e.key === K.cats || e.key === K.prods) cb(e.key); }); },

    /* ---- Protection de l'espace vendeur ---- */
    hasPassword() { return !!ls.get(K.pw, null); },
    async setPassword(pw) { ls.set(K.pw, await hash(pw)); ls.set(K.sess, true); },
    async checkPassword(pw) { const ok = (await hash(pw)) === ls.get(K.pw, null); if (ok) ls.set(K.sess, true); return ok; },
    async session() { if (live) return (await sb.auth.getSession()).data.session; return ls.get(K.sess, false) ? { local: true } : null; },
    async login(email, pw) {
      if (!live) { if (!(await api.checkPassword(pw))) throw new Error("Mot de passe incorrect."); return; }
      const { error } = await sb.auth.signInWithPassword({ email, password: pw });
      if (error) throw new Error("E-mail ou mot de passe incorrect.");
    },
    async logout() { ls.del(K.sess); if (live) await sb.auth.signOut(); }
  };
  window.SiteData = api;
})();
