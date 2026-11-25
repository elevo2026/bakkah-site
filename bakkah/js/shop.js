/* BAKKAH - catalogue (niches en arche), panier, WhatsApp, FAQ, newsletter, footer */
const D = window.SiteData;
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => [...(r || document).querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const ICONS = {
  instagram: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM17.200 5.800a1.100 1.100 0 1 1 0 2.200 1.100 1.100 0 0 1 0-2.200z",
  tiktok: "M16.500 2h-3.200v13.200a2.900 2.900 0 1 1-2.900-2.900c.3 0 .6 0 .9.1V9.100a6.100 6.100 0 1 0 5.200 6V8.600a7.600 7.600 0 0 0 4.400 1.400V6.800a4.400 4.400 0 0 1-4.400-4.800z",
  snapchat: "M12 2c3 0 5 2.200 5 5v2.200c.4.2 1 .3 1.600.3.5 0 .9.3.9.7 0 .8-1.400 1.200-2 1.400.4 1.200 1.400 2.200 2.800 2.800.4.2.3.8-.1 1-.7.3-1.500.4-2 .5-.2.5-.3 1.200-.8 1.200-.6 0-1.200-.3-2.100-.1-.9.2-1.600 1.800-3.300 1.800s-2.400-1.600-3.300-1.800c-.9-.2-1.500.1-2.100.1-.5 0-.6-.7-.8-1.200-.5-.1-1.300-.2-2-.5-.4-.2-.5-.8-.1-1 1.400-.6 2.400-1.600 2.800-2.800-.6-.2-2-.6-2-1.400 0-.4.4-.7.9-.7.6 0 1.200-.1 1.600-.3V7c0-2.800 2-5 5-5z",
  facebook: "M13.500 22v-8.200h2.800l.5-3.300h-3.300V8.400c0-.9.4-1.700 1.800-1.700h1.600V3.800S15.600 3.500 14.300 3.500c-2.700 0-4.400 1.600-4.400 4.500v2.500H7v3.300h2.900V22z",
  whatsapp: "M12 2a10 10 0 0 0-8.600 15L2 22l5.200-1.400A10 10 0 1 0 12 2zm5.100 13.800c-.2.600-1.300 1.200-1.800 1.200-.5.100-1 .2-3.400-.8-2.900-1.200-4.700-4.200-4.900-4.400-.1-.2-1.100-1.500-1.100-2.900 0-1.400.7-2 1-2.300.2-.3.600-.3.800-.3h.6c.2 0 .4 0 .6.500.2.600.8 2 .8 2.100.1.100.1.300 0 .5-.1.200-.1.300-.3.500l-.4.500c-.1.100-.3.300-.1.600.2.300.8 1.300 1.700 2.100 1.200 1 2.100 1.300 2.400 1.500.3.100.5.100.6-.1l.9-1.100c.2-.3.400-.2.600-.1l1.900.9c.3.100.5.200.5.300.1.200.1.800-.1 1.400z",
  avis: "M12 2l2.900 6.100 6.600.8-4.900 4.600 1.300 6.600L12 16.800 6.100 20.100l1.300-6.600L2.500 8.900l6.600-.8z",
  itineraire: "M12 2a7 7 0 0 0-7 7c0 5.200 7 13 7 13s7-7.800 7-13a7 7 0 0 0-7-7zm0 9.500a2.500 2.500 0 1 1 0-5 2.500 2.500 0 0 1 0 5z",
  telephone: "M6.600 10.800a15 15 0 0 0 6.600 6.600l2.200-2.200c.3-.3.700-.4 1-.2 1.100.4 2.300.6 3.600.6.600 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.400-1 1-1h3.500c.6 0 1 .4 1 1 0 1.300.2 2.500.6 3.600.1.300 0 .7-.2 1z"
};
const SOC_KEYS = ["instagram", "tiktok", "snapchat", "facebook", "whatsapp", "avis", "itineraire", "telephone"];
const GENRE_KEY = { homme: "men", femme: "women", mixte: "unisex" };

export function createShop({ S, cats, prods, lang }) {
  const T = k => D.text(S, k, lang);
  const nm = o => D.tr(o, "nom", lang);
  const cur = D.currency(S, lang);
  const money = n => D.fmt(n, lang, cur);
  const state = { cat: "all", sub: "", cart: [] };
  const CART_KEY = "bk_cart";
  try { state.cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]"); } catch { state.cart = []; }
  const byId = id => prods.find(p => p.id === id);
  const catById = id => cats.find(c => c.id === id);
  const visibleCats = cats.filter(c => c.visible !== false);
  const vlab = (p, v) => { const x = (p.variantes || []).find(y => y.label === v); return x ? D.tr(x, "label", lang) : v; };
  const vtype = p => D.tr(p, "variante_label", lang);
  const genreLabel = g => GENRE_KEY[g] ? T("filters." + GENRE_KEY[g]) : "";
  const onRequest = () => T("product.priceNull");
  let toastT;
  function toast(msg) { const el = $("#toast"); el.textContent = msg; el.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove("show"), 2200); }

  /* ----- textes ----- */
  function setMeta(sel, attr, val) { const el = $(sel); if (el) el.setAttribute(attr, val); }
  function abs(path) { const base = (window.SITE_CONFIG && window.SITE_CONFIG.siteUrl) || ""; return base && !/^(https?:|data:)/.test(path) ? base.replace(/\/?$/, "/") + path.replace(/^\.?\//, "") : path; }
  function applyTexts() {
    $$("[data-i18n]").forEach(el => { el.textContent = T(el.dataset.i18n); });
    $$("[data-ph]").forEach(el => { el.placeholder = T(el.dataset.ph); });
    $$("[data-i18n-aria]").forEach(el => { el.setAttribute("aria-label", T(el.dataset.i18nAria)); });
    $$("[data-lang]").forEach(el => el.setAttribute("aria-pressed", el.dataset.lang === lang));
    const on = $("#sound").getAttribute("aria-pressed") === "true";
    $("#soundTxt").textContent = T("sound.label") + " " + T(on ? "sound.on" : "sound.off");
    document.title = T("meta.title");
    setMeta('meta[name="description"]', "content", T("meta.description"));
    setMeta('meta[property="og:title"]', "content", T("meta.title"));
    setMeta('meta[property="og:description"]', "content", T("meta.description"));
    const og = (window.SITE_CONFIG && window.SITE_CONFIG.ogImage) || S.images.og;
    setMeta('meta[property="og:image"]', "content", abs(og));
    const base = window.SITE_CONFIG && window.SITE_CONFIG.siteUrl;
    if (base) { let u = $('meta[property="og:url"]'); if (!u) { u = document.createElement("meta"); u.setAttribute("property", "og:url"); document.head.appendChild(u); } u.setAttribute("content", base); }
    setMeta('meta[property="og:locale"]', "content", { fr: "fr_MA", en: "en_US", ar: "ar_MA" }[lang]);
  }

  /* ----- liens ----- */
  function waLink(text) {
    const num = D.waNumber(S);
    return num ? `https://wa.me/${num}${text ? "?text=" + encodeURIComponent(text) : ""}` : "";
  }
  function socials() {
    const L = S.liens || {};
    const items = [
      ["instagram", L.instagram], ["tiktok", L.tiktok], ["snapchat", L.snapchat], ["facebook", L.facebook],
      ["whatsapp", L.whatsapp || waLink("")], ["avis", L.avis], ["itineraire", L.itineraire],
      ["telephone", S.telephone ? "tel:" + String(S.telephone).replace(/[^\d+]/g, "") : ""]
    ].map(([k, u]) => [k, D.safeLink(u)]).filter(([, u]) => u);
    const label = k => k === "avis" ? T("buttons.leaveReview") : k === "itineraire" ? T("buttons.viewOnMap") : k === "telephone" ? S.telephone : ({ instagram: "Instagram", tiktok: "TikTok", snapchat: "Snapchat", facebook: "Facebook", whatsapp: "WhatsApp" }[k]);
    const html = items.map(([k, u]) => {
      const lb = label(k), ext = k === "telephone" ? "" : ' target="_blank" rel="noopener"';
      return `<a class="soc" href="${esc(u)}"${ext} aria-label="${esc(lb)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${ICONS[k]}"/></svg><span${k === "telephone" ? ' dir="ltr"' : ""}>${esc(lb)}</span></a>`;
    }).join("");
    $$("[data-socials]").forEach(el => { el.innerHTML = html; });
    const wa = D.safeLink(L.whatsapp) || waLink(T("whatsapp.generalMessage"));
    const nb = $("#navWa"); nb.href = wa || "#"; nb.hidden = !wa;
    const adr = S.adresse || T("defaults.address"), hor = S.horaires || T("defaults.hours");
    $("#footInfo").innerHTML = [adr, hor].filter(Boolean).map(esc).join("<br>");
    $("#footInfo").hidden = !(adr || hor);
    $("#addr").innerHTML = [adr, hor].filter(Boolean).map(esc).map(x => `<span>${x}</span>`).join("");
    const g = $("#gallery"); g.innerHTML = (S.images.boutique || []).filter(Boolean).slice(0, 5).map((u, i) => `<figure><img src="${esc(u)}" alt="${esc(T("boutique.title"))} ${i + 1}" loading="lazy" decoding="async"></figure>`).join("");
    const logo = S.images.logo; ["navLogo", "footLogo"].forEach(id => { $("#" + id).src = logo; }); $$(".emblem").forEach(i => { i.src = logo; });
    $("#nlForm").closest(".band").hidden = !S.newsletter;
  }

  /* ----- catalogue ----- */
  const isOut = p => !p.dispo || (p.stock !== null && p.stock !== undefined && p.stock <= 0);
  function priceHTML(p) {
    const mp = D.minPrice(p);
    if (mp === null) return `<span class="po">${esc(onRequest())}</span>`;
    const pr = D.priceOf(p), many = (p.variantes || []).length > 1 && (pr.now === null || mp < pr.now);
    const shown = many || pr.now === null ? mp : pr.now;
    return `${many || pr.now === null ? esc(T("product.from")) + " " : ""}${money(shown)}${pr.old && !many ? `<s>${money(pr.old)}</s>` : ""}${D.pct(p) ? `<span class="pct">-${D.pct(p)}%</span>` : ""}`;
  }
  function badgeText(p) {
    const b = D.tr(p, "badge", lang); if (b) return b;
    if (D.pct(p) > 0) return T("product.promoBadge");
    return "";
  }
  function nicheHTML(p) {
    const ph = p.photos && p.photos[0];
    const img = ph ? `<img class="photo" src="${esc(ph)}" alt="${esc(nm(p))}" loading="lazy" decoding="async">` : `<img src="${esc(D.placeholder(p, cats))}" alt="${esc(nm(p))}" loading="lazy" decoding="async">`;
    const bt = badgeText(p), badge = bt ? `<span class="badge">${esc(bt)}</span>` : "";
    return `<div class="niche-in">${badge}${img}<span class="shelf"></span></div>`;
  }
  function renderTabs() {
    const tabs = [["all", T("buttons.all")], ...visibleCats.map(c => [c.id, nm(c)])];
    $("#catTabs").innerHTML = tabs.map(([id, l]) => `<button class="tabb" role="tab" data-cat="${esc(id)}" aria-selected="${id === state.cat}">${esc(l)}</button>`).join("");
  }
  /* sous-filtres : genre pour les parfums, sous-catégorie (abayas/voiles, tasbih…) pour les autres */
  function subFilters(c, list) {
    if (!c) return [];
    if (c.sous_filtres) return [["", T("buttons.all")], ...["homme", "femme", "mixte"].map(g => [g, genreLabel(g)])];
    const subs = [...new Set(list.map(p => p.souscat).filter(Boolean))];
    return subs.length > 1 ? [["", T("buttons.all")], ...subs.map(s => [s, T("filters." + s)])] : [];
  }
  const subOf = (c, p) => c && c.sous_filtres ? p.genre : p.souscat;
  function renderWall() {
    const c = catById(state.cat);
    const vis = new Set(visibleCats.map(x => x.id));
    let list = state.cat === "all" ? prods.filter(p => vis.has(p.categorie)) : D.inCategory(prods, state.cat);
    const sf = subFilters(c, list);
    $("#subf").hidden = !sf.length;
    if (!sf.some(([k]) => k === state.sub)) state.sub = "";
    $("#subf").innerHTML = sf.map(([g, l]) => `<button data-sub="${esc(g)}" aria-pressed="${g === state.sub}">${esc(l)}</button>`).join("");
    if (sf.length && state.sub) list = list.filter(p => subOf(c, p) === state.sub);
    $("#wall").innerHTML = list.map(p => {
      const out = isOut(p), hasV = (p.variantes || []).length;
      return `<article class="cell ${out ? "soldout" : ""}" data-id="${esc(p.id)}">
        <button class="niche" data-open="${esc(p.id)}" aria-label="${esc(nm(p))}">${nicheHTML(p)}</button>
        <div class="plaque"><h3>${esc(nm(p))}</h3>${p.marque ? `<div class="brand">${esc(p.marque)}</div>` : ""}<div class="price">${priceHTML(p)}</div>
        <button class="addb" data-add="${esc(p.id)}" ${out ? "disabled" : ""}>${out ? esc(T("product.outOfStock")) : esc(hasV ? T("product.choose") : T("buttons.addToCart"))}</button></div></article>`;
    }).join("") || `<p class="empty-cat" style="grid-column:1/-1">${esc(T(prods.length ? "product.noitem" : "product.soon"))}</p>`;
  }
  /* v5 : contenance / concentration traduites (donnees produit stockees en francais) */
  const locSize = s => String(s).replace(/\bml\b/i, T("units.ml"));
  const CONC_KEY = { "edp": "concentration.edp", "extrait de parfum": "concentration.extrait" };
  const locConc = s => CONC_KEY[String(s).trim().toLowerCase()] ? T(CONC_KEY[String(s).trim().toLowerCase()]) : s;
  /* v5 : notes propres a la variante choisie (sinon notes du produit) */
  function notesHTML(p, v) {
    const suf = lang === "fr" ? "" : "_" + lang;
    const vv = (p.variantes || []).find(y => y.label === v) || {};
    const n = vv["notes" + suf] || vv.notes || p["notes" + suf] || p.notes || {}, fr = vv.notes || p.notes || {};
    const g = k => (n[k] && String(n[k]).trim()) || (fr[k] && String(fr[k]).trim()) || "";
    if (p.notes_a_confirmer || !(g("tete") || g("coeur") || g("fond"))) return p.categorie === "parfums" ? `<p class="d"><span class="vl">${esc(T("olfactive.toConfirm"))}</span></p>` : "";
    return `<p class="d notes-list"><span class="vl">${esc(T("olfactive.top"))}</span> ${esc(g("tete"))}<br><span class="vl">${esc(T("olfactive.heart"))}</span> ${esc(g("coeur"))}<br><span class="vl">${esc(T("olfactive.base"))}</span> ${esc(g("fond"))}</p>`;
  }
  function openProduct(id) {
    const p = byId(id); if (!p) return;
    let vsel = (p.variantes && p.variantes[0] && p.variantes[0].label) || "", qty = 1, ph = 0;
    const out = isOut(p);
    const body = $("#pBody");
    const draw = () => {
      const pr = D.priceOf(p, vsel);
      const photos = p.photos || [];
      const main = photos[ph] ? `<img class="photo" src="${esc(photos[ph])}" alt="${esc(nm(p))}">` : `<img src="${esc(D.placeholder(p, cats))}" alt="${esc(nm(p))}">`;
      const bt = badgeText(p);
      const facts = [p.marque && `${T("olfactive.brand")} : ${p.marque}`, p.contenance && `${T("olfactive.size")} : ${locSize(p.contenance)}`, p.concentration && locConc(p.concentration), genreLabel(p.genre) && `${T("olfactive.gender")} : ${genreLabel(p.genre)}`].filter(Boolean);
      const priceBlock = pr.now === null ? `<span class="po">${esc(onRequest())}</span>` : `${money(pr.now)}${pr.old ? `<s>${money(pr.old)}</s>` : ""}${D.pct(p) ? `<span class="pct">-${D.pct(p)}%</span>` : ""}`;
      body.innerHTML = `<button class="x xx" data-close aria-label="${esc(T("buttons.close"))}">×</button>
        <div><div class="niche"><div class="niche-in">${bt ? `<span class="badge">${esc(bt)}</span>` : ""}${main}<span class="shelf"></span></div></div>
        ${photos.length > 1 ? `<div class="pm-thumbs">${photos.map((u, i) => `<button data-pi="${i}"><img src="${esc(u)}" alt=""></button>`).join("")}</div>` : ""}</div>
        <div><p class="kicker">${esc(nm(catById(p.categorie) || { nom: "" }))}</p><h3>${esc(nm(p))}</h3>
        ${facts.length ? `<p class="facts">${facts.map(esc).join(" · ")}</p>` : ""}
        <div class="price" style="margin:.6rem 0">${priceBlock}</div>
        <p class="d">${esc(D.tr(p, "description", lang))}</p>${notesHTML(p, vsel)}
        ${(p.variantes || []).length ? `<div class="vl">${esc(vtype(p))}</div><div class="vars">${p.variantes.map(v => `<button data-v="${esc(v.label)}" aria-pressed="${v.label === vsel}">${esc(D.tr(v, "label", lang))}</button>`).join("")}</div>` : ""}
        <div class="row"><div class="qty"><button data-q="-1" aria-label="-">−</button><span>${qty}</span><button data-q="1" aria-label="+">+</button></div>
        <button class="btn" data-addm ${out ? "disabled" : ""}>${esc(out ? T("product.outOfStock") : T("buttons.addToCart"))}</button></div></div>`;
    };
    body.onclick = e => {
      const b = e.target.closest("button"); if (!b) return;
      if (b.hasAttribute("data-close")) $("#pDlg").close();
      if (b.dataset.pi !== undefined) { ph = +b.dataset.pi; draw(); }
      if (b.dataset.v) { vsel = b.dataset.v; draw(); }
      if (b.dataset.q) { qty = Math.max(1, Math.min(20, qty + +b.dataset.q)); draw(); }
      if (b.hasAttribute("data-addm")) { addToCart(p.id, vsel, qty); $("#pDlg").close(); }
    };
    draw(); $("#pDlg").showModal();
  }

  /* ----- panier ----- */
  const save = () => { try { localStorage.setItem(CART_KEY, JSON.stringify(state.cart)); } catch {} };
  function addToCart(id, v, q) {
    const p = byId(id); if (!p) return;
    const line = state.cart.find(l => l.id === id && l.v === v);
    const max = (p.stock !== null && p.stock !== undefined) ? p.stock : 99;
    if (line) line.q = Math.min(max, line.q + q); else state.cart.push({ id, v: v || "", q: Math.min(max, q) });
    save(); renderCart(); toast(T("buttons.added")); if (window.__sfx) window.__sfx.add();
  }
  function lines() { return state.cart.map(l => ({ ...l, p: byId(l.id) })).filter(l => l.p && l.p.dispo); }
  /* total : somme des prix connus ; "unknown" = au moins un article sans prix */
  function totals(ls) {
    let sum = 0, unknown = false;
    ls.forEach(l => { const n = D.priceOf(l.p, l.v).now; if (n === null) unknown = true; else sum += n * l.q; });
    return { sum, unknown, text: unknown ? (sum > 0 ? `${money(sum)} + ${T("cart.totalToConfirm")}` : T("cart.totalToConfirm")) : money(sum) };
  }
  const fill = (tpl, o) => tpl.replace(/\{(\w+)\}/g, (m, k) => (k in o ? o[k] : m));
  function orderText() {
    const ls = lines(), tot = totals(ls);
    const articles = ls.map(l => {
      const n = D.priceOf(l.p, l.v).now;
      return fill(T("whatsapp.lineTemplate"), { nom: nm(l.p) + (l.v ? " (" + vlab(l.p, l.v) + ")" : ""), quantite: l.q, prix: n === null ? T("cart.priceOnRequest") : money(n * l.q) });
    }).join("\n");
    const np = T("whatsapp.notProvided");
    const addr = [$("#cAddr").value.trim(), $("#cCity").value.trim()].filter(Boolean).join(", ");
    const text = fill(T("whatsapp.orderTemplate"), { articles, total: tot.text, nom: $("#cName").value.trim() || np, adresse: addr || np });
    return { text: text.replace(/ /g, " "), tot };
  }
  function renderCart() {
    const ls = lines(), body = $("#cartBody");
    { const kept = state.cart.filter(l => byId(l.id)); if (kept.length !== state.cart.length) { state.cart = kept; save(); } }
    const count = ls.reduce((s, l) => s + l.q, 0);
    const cc = $("#cartCount"); cc.textContent = count || ""; cc.dataset.n = count;
    const priceLine = (l, n) => n === null ? `<small class="po">${esc(T("cart.priceOnRequest"))}</small>` : `<small>${money(n)}</small>`;
    body.innerHTML = ls.length ? ls.map((l, i) => { const n = D.priceOf(l.p, l.v).now; return `<div class="ci"><img src="${esc(D.photoOf(l.p, cats))}" alt=""><div><h4>${esc(nm(l.p))}</h4>${l.v ? `<small>${esc(vtype(l.p))} ${esc(vlab(l.p, l.v))}</small>` : ""}${priceLine(l, n)}
      <div class="qty"><button data-cq="-1" data-i="${i}" aria-label="-">−</button><span>${l.q}</span><button data-cq="1" data-i="${i}" aria-label="+">+</button></div></div>
      <div class="ci-end">${n === null ? "" : `<b>${money(n * l.q)}</b><br>`}<button class="rm" data-rm="${i}">${esc(T("buttons.remove"))}</button></div></div>`; }).join("") : `<div class="cart-empty"><p>${esc(T("cart.empty"))}</p><p class="hint">${esc(T("cart.emptyHint"))}</p></div>`;
    const o = orderText(); $("#cartTotal").textContent = o.tot.text;
    const a = $("#orderBtn"); a.href = ls.length ? (waLink(o.text) || "#") : "#";
    a.classList.toggle("disabled", !ls.length);
  }
  function openCart(open) {
    $("#cart").classList.toggle("open", open); $("#scrim").classList.toggle("show", open); $("#cart").setAttribute("aria-hidden", !open);
    if (open) renderCart();
  }

  /* ----- FAQ ----- */
  function renderFaq() {
    $("#acc").innerHTML = D.faq(S, lang).map((f, i) => `<div class="acc-i"><button class="acc-q" aria-expanded="false" aria-controls="fa${i}"><span>${esc(f.q)}</span><svg viewBox="0 0 24 24"><path d="M5 9l7 7 7-7"/></svg></button><div class="acc-a" id="fa${i}" role="region"><p>${esc(f.a)}</p></div></div>`).join("");
  }

  /* ----- événements ----- */
  function bind() {
    $("#catTabs").addEventListener("click", e => { const b = e.target.closest("[data-cat]"); if (!b) return; state.cat = b.dataset.cat; state.sub = ""; renderTabs(); renderWall(); });
    $("#subf").addEventListener("click", e => { const b = e.target.closest("[data-sub]"); if (!b) return; state.sub = b.dataset.sub; renderWall(); });
    $("#wall").addEventListener("click", e => {
      const a = e.target.closest("[data-add]"), o = e.target.closest("[data-open]");
      if (a) { const p = byId(a.dataset.add); if (!p) return; if ((p.variantes || []).length) openProduct(p.id); else addToCart(p.id, "", 1); }
      else if (o) openProduct(o.dataset.open);
    });
    $("#cartBtn").addEventListener("click", () => openCart(true));
    $("#cartClose").addEventListener("click", () => openCart(false));
    $("#scrim").addEventListener("click", () => openCart(false));
    document.addEventListener("keydown", e => { if (e.key === "Escape") openCart(false); });
    $("#cartBody").addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return; const ls = lines();
      if (b.dataset.cq) { const l = ls[+b.dataset.i], max = l.p.stock ?? 99; const real = state.cart.find(x => x.id === l.id && x.v === l.v); real.q = Math.max(1, Math.min(max, real.q + +b.dataset.cq)); }
      if (b.dataset.rm) { const l = ls[+b.dataset.rm]; state.cart = state.cart.filter(x => !(x.id === l.id && x.v === l.v)); }
      save(); renderCart();
    });
    ["cName", "cAddr", "cCity"].forEach(id => $("#" + id).addEventListener("input", renderCart));
    $("#orderBtn").addEventListener("click", e => {
      if (!lines().length) { e.preventDefault(); toast(T("cart.empty")); return; }
      if (!D.waNumber(S)) { e.preventDefault(); toast(T("cart.waUnset")); }
    });
    $("#acc").addEventListener("click", e => {
      const b = e.target.closest(".acc-q"); if (!b) return;
      const open = b.getAttribute("aria-expanded") === "true", panel = document.getElementById(b.getAttribute("aria-controls"));
      b.setAttribute("aria-expanded", !open);
      if (window.gsap) window.gsap.to(panel, { height: open ? 0 : "auto", duration: .4, ease: "power2.inOut", onComplete: () => { window.ScrollTrigger && window.ScrollTrigger.refresh(); } });
      else panel.style.height = open ? "0" : "auto";
    });
    const nlT0 = Date.now();
    $("#nlForm").addEventListener("submit", async e => {
      e.preventDefault(); const m = $("#nlMail").value.trim(), msg = $("#nlMsg");
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(m)) { msg.textContent = T("newsletter.error"); return; }
      if ($("#nlWeb") && $("#nlWeb").value) { msg.textContent = T("newsletter.success"); return; }   /* honeypot : robot -> faux succès, rien d'envoyé */
      const wait = 3000 - (Date.now() - nlT0); if (wait > 0) await new Promise(r => setTimeout(r, wait));   /* délai minimal 3 s */
      try { await D.addSubscriber(m); msg.textContent = T("newsletter.success"); $("#nlMail").value = ""; } catch (err) { msg.textContent = err.message; }
    });
    const LEGAL = { mentions: "footer.legal", cgu: "footer.terms", privacy: "footer.privacy" };
    $$("[data-legal]").forEach(b => b.addEventListener("click", () => { $("#lgT").textContent = T(LEGAL[b.dataset.legal]); $("#lgP").textContent = T("legal." + b.dataset.legal); $("#legalDlg").showModal(); }));
    $("#lgX").addEventListener("click", () => $("#legalDlg").close());
    ["pDlg", "legalDlg"].forEach(id => { const d = $("#" + id); d.setAttribute("data-lenis-prevent", ""); d.addEventListener("click", e => { if (e.target === d) d.close(); }); });
    $("#cart").setAttribute("data-lenis-prevent", "");
  }

  function render() { applyTexts(); socials(); renderTabs(); renderWall(); renderFaq(); renderCart(); }
  bind(); render();
  return { render, openCart, toast, addToCart, T };
}
