/* BAKKAH - orchestration : loader, scroll (Lenis), timeline GSAP, couches UI, carrousel 3D */
import { createShop } from "./shop.js";
import { createFx } from "./fx.js";
import { createAudio } from "./audio.js";

const START = { camX: 0, camY: -1, camZ: 29, camRX: 0, camRY: 0, camRZ: 0, fov: 20, canScale: 1, canX: 0, canY: 0, canZ: 0, canRX: 0, canRY: 0, canRZ: 0, spin: 0, spacing: 1, wave: 1, swirl: 0, baseOffset: 0, lightIntensity: 50, lightWidth: 1, tintStrength: 1, spotIntensity: 0, spotY: 3, pointerInfluence: .2, swipeSpeed: 1 };
const D = window.SiteData;
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => [...(r || document).querySelectorAll(s)];
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const root = document.documentElement, body = document.body;
const errors = [];
history.scrollRestoration = "manual";

const lang = D.detectLang();
root.lang = lang; root.dir = D.isRtl(lang) ? "rtl" : "ltr";
const isAr = lang === "ar";
const gsap = window.gsap, ScrollTrigger = window.ScrollTrigger, SplitText = window.SplitText;
gsap.registerPlugin(ScrollTrigger); if (SplitText) gsap.registerPlugin(SplitText);

/* ---------- loader ---------- */
const load = { weights: { data: .2, fonts: .12, imgs: .08, scene: .5, frame: .1 }, done: {}, shown: 0, finished: false, t0: performance.now() };
const target = () => Object.keys(load.done).reduce((s, k) => s + (load.done[k] ? load.weights[k] : 0), 0);
const done = k => { load.done[k] = true; };
const ldPct = $("#ldPct"), ldLogo = $(".ld-logo");
let introStarted = false;
function loaderTick() {
  if (introStarted) return;
  const tg = target() * 100, elapsed = (performance.now() - load.t0) / 1000;
  load.shown = Math.min(tg, load.shown + Math.max(.4, (tg - load.shown) * .08), elapsed * 70);
  const v = Math.round(load.shown);
  ldPct.textContent = v + "%"; ldLogo.style.setProperty("--p", v + "%");
  if (v >= 100 && tg >= 100) { introStarted = true; setTimeout(startIntro, 250); return; }
  requestAnimationFrame(loaderTick);
}
requestAnimationFrame(loaderTick);

/* ---------- données ---------- */
let S, cats, prods;
try { [S, cats, prods] = await Promise.all([D.getSettings(), D.getCategories(), D.getProducts()]); }
catch (e) { console.error(e); S = D.DEFAULT_SETTINGS; cats = D.DEFAULT_CATEGORIES; prods = D.DEFAULT_PRODUCTS; errors.push("data"); }
done("data");
const shop = createShop({ S, cats, prods, lang });
window.addEventListener("storage", e => { if (["bk2_settings", "bk2_categories", "bk2_products"].includes(e.key)) location.reload(); });
/* changement de langue : choix mémorisé puis rechargement (la scène 3D, les étiquettes de flacons et l'animation d'entrée sont reconstruites dans la bonne langue) */
$$("[data-lang]").forEach(b => b.addEventListener("click", () => {
  const L = b.dataset.lang; if (L === lang) return;
  try { localStorage.setItem("bk_lang", L); } catch {}
  const u = new URL(location.href); u.searchParams.delete("lang"); location.href = u.toString();
}));
const T = shop.T;

/* couleur d'accent lisible sur fond noir : si la 2e couleur est trop sombre (ex. noir), on éclaircit la 1re (ou on prend l'or) */
const lum = h => { const m = /^#?([0-9a-f]{6})$/i.exec(h || ""); if (!m) return 1; const v = parseInt(m[1], 16); return (.2126 * (v >> 16 & 255) + .7152 * (v >> 8 & 255) + .0722 * (v & 255)) / 255; };
const lift = (h, a) => { const v = parseInt(h.replace("#", ""), 16), c = [v >> 16 & 255, v >> 8 & 255, v & 255].map(x => Math.round(x + (255 - x) * a)); return "#" + c.map(x => x.toString(16).padStart(2, "0")).join(""); };
const accent = p => lum(p.couleur2) >= .22 ? p.couleur2 : (lum(p.couleur1) >= .05 ? lift(p.couleur1, .45) : "#d4af37");
let featured = prods.filter(p => p.vedette && p.dispo !== false).sort((a, b) => (a.vedette_ordre ?? 99) - (b.vedette_ordre ?? 99)).slice(0, 8);
if (!featured.length) featured = prods.filter(p => p.categorie === "parfums").slice(0, 6);
if (!featured.length) featured = prods.slice(0, 3);
featured = featured.map(p => ({ ...p, couleur2: accent(p) }));
const M = featured.length;
const nm = o => D.tr(o, "nom", lang);
const catOf = p => cats.find(c => c.id === p.categorie);

Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), new Promise(r => setTimeout(r, 2500))]).then(() => done("fonts"));
Promise.race([new Promise(r => { const i = new Image(); i.onload = i.onerror = r; i.src = S.images.logo; }), new Promise(r => setTimeout(r, 2000))]).then(() => done("imgs"));

/* ---------- WebGL ---------- */
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const lpParam = new URLSearchParams(location.search).get("lp");
const lowPower = lpParam === "1" ? true : lpParam === "0" ? false : (isIOS || innerWidth < 1024);
let sc = null, fxc = null;
const fx = createFx($("#fx"));
const sfx = createAudio(); window.__sfx = sfx;
try {
  const { createScene } = await import("./scene.js?v=2");
  if (document.fonts && document.fonts.load) await Promise.race([Promise.all([document.fonts.load("700 26px Amiri", "بكة"), document.fonts.load("600 30px 'Cormorant Garamond'", "BAKKAH")]).catch(() => 0), new Promise(r => setTimeout(r, 2500))]);
  await Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), new Promise(r => setTimeout(r, 2500))]);
  sc = createScene({ canvas: $("#gl"), featured: featured.map(p => ({ ...p, nom: nm(p) })), lowPower, lang });
  Object.assign(sc.data, START);
  window.carousel = sc.carousel; window.dispatchEvent(new CustomEvent("carousel:ready", { detail: sc.carousel }));
} catch (e) { console.error("WebGL indisponible :", e); errors.push("webgl"); $("#gl").style.display = "none"; }
done("scene");
const carousel = sc && sc.carousel;

/* ---------- helpers d'animation de texte ---------- */
const splits = new Map();
function revealEl(el, kind, delay) {
  if (!el) return;
  const old = splits.get(el); if (old) { old.revert(); splits.delete(el); }
  if (kind === "chars" && isAr) kind = "lines";
  if (kind === "fade" || !SplitText) { gsap.fromTo(el, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .7, ease: "power3.out", delay: delay || 0, overwrite: true }); return; }
  const sp = SplitText.create(el, { type: kind === "chars" ? "words,chars" : "lines", mask: kind === "chars" ? "chars" : "lines" });
  splits.set(el, sp);
  gsap.fromTo(kind === "chars" ? sp.chars : sp.lines, { yPercent: 110 }, { yPercent: 0, duration: kind === "chars" ? .6 : .7, ease: "power3.out", stagger: kind === "chars" ? .01 : .08, delay: delay || 0, overwrite: true });
}
function setText(el, text) { const old = splits.get(el); if (old) { old.revert(); splits.delete(el); } el.textContent = text; }
const fadeList = (sel, d) => { const els = $$(sel); if (els.length) gsap.fromTo(els, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: .7, ease: "power3.out", stagger: .08, delay: d || 0, overwrite: true }); };

/* ---------- carrousel / hero UI ---------- */
const palette = Array.from({ length: 6 }, (_, i) => featured[i % M].couleur2);
palette.forEach((c, i) => $("#halo").style.setProperty("--c" + i, c));
gsap.set("#halo", { xPercent: -50 });
let haloRot = 0, colorT = null, current = -1;
function pagerBuild() {
  const pos = i => M === 1 ? 500 : 20 + 960 / (M - 1) * i;
  $("#pager").innerHTML = `<svg viewBox="0 0 1000 40" aria-hidden="true"><defs><filter id="goo" x="-5%" y="-100%" width="110%" height="300%"><feGaussianBlur in="SourceGraphic" stdDeviation="4"/><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"/></filter></defs><g filter="url(#goo)">${featured.map((_, i) => `<circle cx="${pos(i)}" cy="20" r="6" fill="rgba(255,255,255,.35)"/>`).join("")}<circle id="blob" cx="${pos(0)}" cy="20" r="12" fill="#f6e27a"/></g></svg><div class="hit">${featured.map((p, i) => `<button aria-label="${esc(nm(p))}" data-pg="${i}"></button>`).join("")}</div>`;
  $("#pager").onclick = e => { const b = e.target.closest("[data-pg]"); if (b && carousel) { carousel.goTo(+b.dataset.pg); } };
  return pos;
}
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const pagerPos = pagerBuild();
function movePager(i, delta, instant) {
  const blob = $("#blob"); if (!blob) return;
  const x = pagerPos(i), cx = +blob.getAttribute("cx"), wrapped = !instant && M > 2 && Math.abs(i - current) > 1;
  gsap.killTweensOf(blob);
  if (instant) { blob.setAttribute("cx", x); return; }
  if (wrapped) { const out = delta > 0 ? 1060 : -60, from = delta > 0 ? -60 : 1060; gsap.to(blob, { attr: { cx: out }, duration: .3, ease: "power2.in", onComplete: () => { blob.setAttribute("cx", from); gsap.to(blob, { attr: { cx: x }, duration: .5, ease: "power3.out" }); } }); }
  else gsap.to(blob, { attr: { cx: x }, duration: .7, ease: "elastic.out(1,.7)" });
}
const GK = { homme: "men", femme: "women", mixte: "unisex" };
const gl = g => GK[g] ? T("filters." + GK[g]) : "";
function titleParts(p) { const w = nm(p).trim().split(/\s+/); if (w.length === 1) return [w[0], gl(p.genre) || (nm(catOf(p) || { nom: "" }))]; return [w[0], w.slice(1).join(" ")]; }
function updateHero(i, delta, instant) {
  const p = featured[i]; if (!p) return;
  const [l1, l2] = titleParts(p);
  [[$(".l1"), l1], [$(".l2"), l2]].forEach(([el, tx]) => { setText(el, tx); if (!instant) revealEl(el, "chars"); });
  const pr = D.priceOf(p), mp = D.minPrice(p), cur = D.currency(S, lang);
  const priceTxt = mp === null ? T("product.priceNull") : ((pr.now === null || mp < pr.now ? T("product.from") + " " : "") + D.fmt(pr.now === null || mp < pr.now ? mp : pr.now, lang, cur));
  $("#heroMeta").textContent = [p.marque, gl(p.genre) || nm(catOf(p) || { nom: "" }), priceTxt].filter(Boolean).join("  ·  ");
  $("#hudNum").textContent = String(i + 1).padStart(2, "0") + " / " + String(M).padStart(2, "0");
  $("#hudCat").textContent = (nm(catOf(p) || { nom: "" })).toUpperCase();
  setText($("#profName"), nm(p));
  setText($("#profDesc"), D.tr(p, "description", lang));
  const nn = (lang === "fr" ? p.notes : p["notes_" + lang]) || {}, nf = p.notes || {}, g = k => (nn[k] && String(nn[k]).trim()) || (nf[k] && String(nf[k]).trim()) || "";
  const tbc = p.notes_a_confirmer ? T("olfactive.toConfirm") : "—";
  $("#nTop").textContent = (!p.notes_a_confirmer && g("tete")) || tbc; $("#nHeart").textContent = (!p.notes_a_confirmer && g("coeur")) || tbc; $("#nBase").textContent = (!p.notes_a_confirmer && g("fond")) || tbc;
  if (!instant && section === 1) { revealEl($("#profName"), "chars"); revealEl($("#profDesc"), "lines"); }
  movePager(i, delta, instant);
  if (!instant) { haloRot -= (delta || 1) * 60; gsap.to("#halo", { rotation: haloRot, duration: 1.2, ease: "power3.out" }); sfx.tick(); }
  clearTimeout(colorT);
  colorT = setTimeout(() => {
    root.style.setProperty("--taste-primary", p.couleur1); root.style.setProperty("--taste-secondary", p.couleur2);
    fx.setColors(p.couleur1, p.couleur2); if (sc) sc.setTint(p.couleur2);
  }, instant ? 0 : 150);
  current = i;
}
if (carousel) carousel.addEventListener("changed", e => updateHero(e.detail.index, e.detail.delta));
updateHero(0, 0, true);
$("#prevBtn").addEventListener("click", () => carousel && carousel.previous());
$("#nextBtn").addEventListener("click", () => carousel && carousel.next());
if (M < 2) { $("#prevBtn").hidden = $("#nextBtn").hidden = true; }

/* ---------- timeline scrollée ---------- */
const kf = a => ({ camX: a[0], camY: a[1], camZ: a[2], camRX: a[3], camRY: a[4], camRZ: a[5], fov: a[6], canX: a[7], canY: a[8], canZ: a[9], canRX: a[10], canRY: a[11], canRZ: a[12], spin: a[13], spacing: a[14], wave: a[15], swirl: a[16], baseOffset: a[17], lightIntensity: a[18], lightWidth: a[19], tintStrength: a[20], spotIntensity: a[21], spotY: a[22], pointerInfluence: a[23], swipeSpeed: a[24] });
const STEPS = [
  [0, 0, 6, 0, 0, 0, 40, .5, -.5, 0, -37.5, 15, 22.5, 0, 3.5, 0, 0, 3, 30, 1, 1, 0, 3, .2, 1],        // 1 profil
  [0, -2, 12, 10, 0, -10, 20, 0, -.8, 0, 0, 0, 0, 120, 2.2, 0, 0, 3, 0, 1, .2, 35, 2.2, 0, 1],        // 2 benefit 1
  [0, -2, 12, 10, 0, 5, 20, 0, -.48, 0, 0, 0, 0, 130, 2.2, 0, 0, 3, 0, 1, .2, 35, 2.2, 0, 1],         // 3 benefit 2
  [0, -2, 12, 10, 0, -10, 20, 0, .02, 0, 0, 0, 0, 120, 2.2, 0, 0, 3, 0, 1, .2, 35, 2.2, 0, 1],        // 4 benefit 3
  [0, -2, 12, 10, 0, 5, 20, 0, .5, 0, 0, 0, 0, 130, 2.2, 0, 0, 3, 0, 1, .2, 35, 2.2, 0, 1],           // 5 benefit 4
  [0, 0, 8, 0, 0, 0, 45, 0, 0, -.5, -20, 0, -5, 0, 5, 0, 0, 3, 45, 1.5, 2, 0, 3, .2, 1],              // 6 argument
  [-3, -3.5, 20, 10, -9, -10, 30, 0, 0, -.4, 0, 0, 0, 0, .47, 0, 1, 20, 10, 3, 2, 0, 3, 0, 2],        // 7 packshot
  [0, -5.5, 10, 0, 0, 0, 30, 0, 0, -.4, 0, 0, 0, 0, .6, 0, 1, 20, 0, 3, 2, 0, 3, 0, 1]                // 8 hors champ -> catalogue
];
let tl = null;
function buildTimeline() {
  if (!sc) return;
  if (tl) tl.kill();
  Object.assign(sc.data, START);
  tl = gsap.timeline({ paused: true, defaults: { duration: 1, ease: "power2.inOut" } });
  STEPS.forEach((k, i) => tl.to(sc.data, kf(k), i));
  tl.seek(clamp(lenis ? lenis.scroll / H : 0, 0, 8));
}

/* ---------- couches / sections ---------- */
let H = $(".spacer").offsetHeight, section = 0, lenis = null;
const layers = [$("#L0"), $("#L1"), $("#layer-ben"), $("#L6"), $("#L7")];
const layerOf = i => i === 0 ? layers[0] : i === 1 ? layers[1] : i >= 2 && i <= 5 ? layers[2] : i === 6 ? layers[3] : i === 7 ? layers[4] : null;
function showLayer(el) { el.dataset.on = "1"; el.classList.add("is-active"); gsap.to(el, { opacity: 1, duration: .5, overwrite: "auto" }); }
function hideLayer(el) { el.dataset.on = ""; gsap.to(el, { opacity: 0, duration: .3, overwrite: "auto", onComplete: () => { if (!el.dataset.on) el.classList.remove("is-active"); } }); }
const FX_INT = [.25, .5, .35, .35, .35, .35, 1, .5, 0];
function setSection(i) {
  if (i === section && introDone) return;
  const prev = section; section = i;
  const L = layerOf(i), Lp = layerOf(prev);
  layers.forEach(l => { if (l !== L && l.dataset.on) hideLayer(l); });
  if (L) { if (!L.dataset.on || L !== Lp) showLayer(L); }
  body.classList.toggle("is-profile-active", i >= 1 && i <= 5);
  $("#hudSec").textContent = String(Math.min(i + 1, 8)).padStart(2, "0") + " / 08";
  fx.setIntensity(FX_INT[i] ?? 0);
  if (sc) sc.swipe.active = (i === 0 || i === 6 || i === 7);
  $("#gl").style.pointerEvents = (i <= 7) ? "auto" : "none";
  body.classList.toggle("cursor-grab", !!(sc && sc.swipe.active));
  if (i !== prev) sfx.whoosh();
  // révélations de texte
  if (i === 0) { revealEl($("#L0 .hero-top .kicker"), "fade"); fadeList("#L0 .hero-actions .btn", .1); }
  if (i === 1) { revealEl($("#L1 .kicker"), "fade"); revealEl($("#profName"), "chars", .1); revealEl($("#profDesc"), "lines", .25); fadeList("#L1 .notes div", .4); }
  if (i >= 2 && i <= 5) {
    $$(".ben-item").forEach((b, k) => { const on = k === i - 2; gsap.to(b, { opacity: on ? 1 : 0, duration: on ? .5 : .25, overwrite: "auto" }); b.style.visibility = on ? "visible" : "hidden"; });
    $$("#benNav button").forEach((b, k) => b.classList.toggle("is-active", k === i - 2));
    const b = $("#B" + (i - 1));
    const tag = $(".tag", b); tag.classList.remove("strike"); void tag.offsetWidth; tag.classList.add("strike");
    fadeList(`#B${i - 1} .chip`, 0); revealEl($("h2", b), "chars", .1); revealEl($("p", b), "lines", .25);
  }
  if (i === 6) {
    const en = $("#wmEn"), old = splits.get(en); if (old) { old.revert(); splits.delete(en); }
    if (SplitText) { const sp = SplitText.create(en, { type: "chars" }); splits.set(en, sp); gsap.fromTo(sp.chars, { scale: .6, opacity: 0 }, { scale: 1, opacity: 1, ease: "back.out(2)", stagger: .04, duration: .8, overwrite: true }); }
    gsap.fromTo("#wmAr", { scale: .6, opacity: 0 }, { scale: 1, opacity: 1, ease: "back.out(2)", duration: .9, overwrite: true });
    fadeList("#L6 .wm-sub", .5);
  }
  if (i === 7) { revealEl($("#L7 .kicker"), "fade"); revealEl($("#L7 h2"), "chars", .1); revealEl($("#L7 p:not(.kicker)"), "lines", .25); fadeList("#L7 .btn", .4); }
}
$$("#benNav button").forEach(b => b.addEventListener("click", () => go(+b.dataset.go)));

/* ---------- navigation ---------- */
function go(t) {
  if (!lenis) return;
  let y;
  if (typeof t === "number") y = t * H;
  else if (t === "shop") y = 8 * H;
  else { const el = document.getElementById(t); if (!el) return; y = el.getBoundingClientRect().top + lenis.scroll - 10; }
  const dist = Math.abs(y - lenis.scroll) / H;
  paging = true;
  lenis.start();
  lenis.scrollTo(y, { duration: clamp(.8 + dist * .35, .8, 2.6), easing: easeOutCubic, force: true, lock: true, onComplete: () => { paging = false; } });
  setTimeout(() => { paging = false; }, 3200);
}
const easeOutCubic = x => 1 - Math.pow(1 - x, 3);
document.addEventListener("click", e => {
  const a = e.target.closest("[data-go]"); if (!a || a.closest("#benNav")) return;
  e.preventDefault(); const v = a.dataset.go; closeMenu(); go(/^\d+$/.test(v) ? +v : v);
});
$("#toTop").addEventListener("click", () => go(0));

/* menu */
const menuBtn = $("#menuBtn"), panel = $("#menuPanel");
let menuOpen = false;
function closeMenu() { if (!menuOpen) return; toggleMenu(); }
function toggleMenu() {
  menuOpen = !menuOpen; menuBtn.setAttribute("aria-expanded", menuOpen);
  if (menuOpen) {
    gsap.set(panel, { visibility: "visible" }); gsap.to(panel, { opacity: 1, duration: .35 });
    gsap.fromTo("#menuPanel .ml > *", { yPercent: 110 }, { yPercent: 0, duration: .7, ease: "power3.out", stagger: .08, delay: .1 });
    gsap.fromTo("#menuPanel .social .soc", { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: .04, delay: .4 });
  } else gsap.to(panel, { opacity: 0, duration: .25, onComplete: () => gsap.set(panel, { visibility: "hidden" }) });
}
menuBtn.addEventListener("click", toggleMenu);
document.addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });
$("#sound").addEventListener("click", () => { const on = sfx.toggle(); $("#sound").setAttribute("aria-pressed", on); $("#soundTxt").textContent = T("sound.label") + " " + T(on ? "sound.on" : "sound.off"); });
/* mot-signe : dans la langue active en grand, l'autre graphie en complément */
$("#wmAr").textContent = isAr ? T("signature.word") : T("signature.arabic");
$("#wmEn").textContent = isAr ? T("signature.arabic") : T("signature.word");

/* ---------- entrée (après le loader) ---------- */
let introDone = false, paging = false;
function startIntro() {
  load.done.frame = true;
  const reveal = { v: 100 };
  const ltl = gsap.timeline({ onComplete: () => { introDone = true; body.classList.remove("is-loading"); if (lenis) lenis.start(); setSection(section === 0 ? 0 : section); } });
  ltl.to("#loader", { opacity: 0, duration: .6, onComplete: () => $("#loader").remove() })
    .to("#gl", { opacity: 1, duration: .8 }, "<")
    .to(reveal, { v: 0, duration: 1.2, ease: "power3.inOut", onUpdate: () => root.style.setProperty("--loader-reveal", reveal.v + "vh") }, "<.1")
    .from(".nav-row", { yPercent: -120, duration: 1, ease: "power3.out" }, "<.2")
    .from(".hud-left", { x: -160, opacity: 0, duration: 1, ease: "power3.out" }, "<.1")
    .from(".hud-right", { x: 160, opacity: 0, duration: 1, ease: "power3.out" }, "<");
  showLayer($("#L0")); section = -1; setSection(0);
  if (sc) gsap.fromTo(sc.intro, { dz: -4, light: 0 }, { dz: 0, light: 1, duration: 2.5, ease: "power4.out" });
  window.__ready = true;
}
root.style.setProperty("--loader-reveal", "100vh");

/* ---------- Lenis + boucle ---------- */
lenis = new window.Lenis({ autoRaf: false, infinite: false, syncTouch: true });
lenis.stop();
lenis.on("scroll", ScrollTrigger.update);
window.scrollTo(0, 0);
$$(".spacer").forEach((sp, i) => ScrollTrigger.create({ trigger: sp, start: "top 50%", end: "bottom 50%", onToggle: s => { if (!introDone) return; if (s.isActive) setSection(i); else if (i === 7 && s.direction === 1) setSection(8); } }));
ScrollTrigger.create({ trigger: "#shop", start: "top top", onToggle: s => { body.classList.toggle("is-shop", s.isActive); if (sc) sc.setPaused(s.isActive); if (s.isActive) { fx.setIntensity(0); } else if (introDone) fx.setIntensity(FX_INT[section] ?? 0); } });
buildTimeline();

const prog = { core: $("#progress .core"), mid: $("#progress .mid"), halo: $("#progress .halo"), hot: $("#progress .hot") };
let last = performance.now(), hidden = false;
document.addEventListener("visibilitychange", () => { hidden = document.hidden; });
function raf(now) {
  requestAnimationFrame(raf);
  const dt = Math.min(.05, (now - last) / 1000); last = now;
  if (hidden) return;
  lenis.raf(now);
  const y = lenis.scroll;
  if (tl) tl.seek(clamp(y / H, 0, 8));
  if (sc) sc.update(dt, now / 1000, H, y);
  fx.frame(dt, now / 1000);
  const max = Math.max(1, document.documentElement.scrollHeight - innerHeight), p = clamp(y / max, 0, 1);
  prog.core.style.transform = prog.mid.style.transform = prog.halo.style.transform = `scaleX(${p})`;
  prog.hot.style.left = `calc(${p * 100}% - 30px)`;
}
requestAnimationFrame(raf);
requestAnimationFrame(() => requestAnimationFrame(() => done("frame")));

/* ---------- entrées : drag, clic, wheel, tactile, clavier ---------- */
const canvas = $("#gl");
let drag = null;
window.addEventListener("pointermove", e => {
  if (sc) { sc.pointer.x = e.clientX - innerWidth / 2; sc.pointer.y = e.clientY - innerHeight / 2; }
  if (!drag || e.pointerId !== drag.id || !sc) return;
  const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
  if (!drag.axis && (Math.abs(dx) > 2 || Math.abs(dy) > 2)) {
    drag.axis = Math.abs(dx) >= Math.abs(dy) ? "x" : "y";
    if (drag.axis === "x") { lenis.stop(); try { canvas.setPointerCapture(e.pointerId); } catch {} body.classList.add("cursor-grabbing"); }
  }
  if (drag.axis === "x") { const d = e.clientX - drag.lx; drag.lx = e.clientX; drag.v = d; drag.moved = true; sc.carousel.target -= d * .02 * sc.data.swipeSpeed; sc.carousel._emit(); }
});
canvas.addEventListener("pointerdown", e => { if (!sc || !sc.swipe.active || !introDone) return; drag = { id: e.pointerId, x: e.clientX, y: e.clientY, lx: e.clientX, v: 0, axis: null, moved: false }; });
const endDrag = e => {
  if (!drag || e.pointerId !== drag.id) return; const d = drag; drag = null; body.classList.remove("cursor-grabbing");
  if (d.axis === "x") { sc.carousel.target -= d.v * .02 * 8 * sc.data.swipeSpeed; sc.carousel.snap(); if (introDone) lenis.start(); }
  else if (!d.moved && section === 0 && e.type === "pointerup") {
    const hit = sc.pick(e.clientX, e.clientY);
    if (hit) { if (hit.x > .8) sc.carousel.next(); else if (hit.x < -.8) sc.carousel.previous(); else go(1); }
  }
};
window.addEventListener("pointerup", endDrag); window.addEventListener("pointercancel", endDrag);

const pageable = () => !document.querySelector("dialog[open]") && !$("#cart").classList.contains("open") && !menuOpen && introDone;
function pageTo(dir) {
  const y = lenis.scroll, idx = dir > 0 ? Math.floor(y / H + .02) : Math.ceil(y / H - .02), t = clamp(idx + dir, 0, 8);
  const big = [0, 1, 5, 6];
  const dur = (big.includes(t) || big.includes(idx)) ? 1.5 : 1;
  paging = true; lenis.start();
  lenis.scrollTo(t * H, { duration: dur, easing: easeOutCubic, force: true, lock: true, onComplete: () => { paging = false; } });
  setTimeout(() => { paging = false; }, dur * 1000 + 300);
}
window.addEventListener("wheel", e => {
  if (e.ctrlKey || e.target.closest("[data-lenis-prevent]") || !pageable()) return;
  const y = lenis.scroll, dir = Math.sign(e.deltaY); if (!dir) return;
  const inZone = (dir > 0 && y < 7 * H - 2) || (dir < 0 && y <= 7 * H + 2 && y > 0);
  if (!inZone || innerWidth < 992) return;           // sections 0-6 : pagination ; au-delà : défilement libre
  e.preventDefault(); e.stopPropagation();
  if (paging || Math.abs(e.deltaY) < 4) return;
  pageTo(dir);
}, { passive: false, capture: true });

let tch = null;
window.addEventListener("touchstart", e => { if (e.touches.length === 1) tch = { x: e.touches[0].clientX, y: e.touches[0].clientY, axis: null }; }, { passive: true, capture: true });
window.addEventListener("touchmove", e => {
  if (!tch || !pageable() || e.target.closest("[data-lenis-prevent]")) return;
  const t = e.touches[0], dx = t.clientX - tch.x, dy = t.clientY - tch.y;
  if (!tch.axis && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) tch.axis = Math.abs(dy) > Math.abs(dx) ? "y" : "x";
  tch.dy = dy;
  const y = lenis.scroll, zone = dy < 0 ? y < 8 * H - 4 : y <= 8 * H + 8;
  if (tch.axis === "y" && zone) { e.preventDefault(); e.stopPropagation(); }
}, { passive: false, capture: true });
window.addEventListener("touchend", () => {
  const t = tch; tch = null; if (!t || t.axis !== "y" || !pageable() || paging) return;
  const y = lenis.scroll, dy = t.dy || 0; if (Math.abs(dy) <= 24) return;
  const dir = dy < 0 ? 1 : -1;
  if (dir > 0 && y >= 8 * H - 4) return;                // dans le catalogue : défilement normal
  if (dir < 0 && y > 8 * H + 8) return;
  pageTo(dir);
}, { capture: true });
document.addEventListener("keydown", e => {
  if (!introDone || e.target.matches("input,textarea,select") || document.querySelector("dialog[open]")) return;
  if (e.key === "ArrowRight" && carousel && section <= 7) isAr ? carousel.previous() : carousel.next();
  if (e.key === "ArrowLeft" && carousel && section <= 7) isAr ? carousel.next() : carousel.previous();
  if ((e.key === "ArrowDown" || e.key === "PageDown") && lenis.scroll < 7 * H - 2 && !paging) { e.preventDefault(); pageTo(1); }
  if ((e.key === "ArrowUp" || e.key === "PageUp") && lenis.scroll <= 7 * H + 2 && lenis.scroll > 0 && !paging) { e.preventDefault(); pageTo(-1); }
});

/* ---------- resize ---------- */
let rt;
window.addEventListener("resize", () => {
  clearTimeout(rt); rt = setTimeout(() => {
    const was = lenis.scroll / H; H = $(".spacer").offsetHeight;
    if (sc) sc.resize(); fx.resize();
    if ((isIOS || innerWidth < 1024) !== lowPower && sc) { location.reload(); return; }
    buildTimeline(); ScrollTrigger.refresh(); lenis.resize && lenis.resize();
    window.scrollTo(0, was * H);
  }, 200);
});
window.__bk = { go, errors, get section() { return section; }, lenis, get H() { return H; } };
