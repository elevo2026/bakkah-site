/* BAKKAH - scène three.js : flacons de parfum procéduraux entre deux podiums or */
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { SMAAPass } from "three/addons/postprocessing/SMAAPass.js";

const DEG = Math.PI / 180;
const LIGHT_K = .3;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const wrap = (v, min, max) => { const r = max - min; return ((((v - min) % r) + r) % r) + min; };

export const START = {
  camX: 0, camY: -1, camZ: 29, camRX: 0, camRY: 0, camRZ: 0, fov: 20,
  canScale: 1, canX: 0, canY: 0, canZ: 0, canRX: 0, canRY: 0, canRZ: 0, spin: 0,
  spacing: 1, wave: 1, swirl: 0, baseOffset: 0, lightIntensity: 50, lightWidth: 1, tintStrength: 1,
  spotIntensity: 0, spotY: 3, pointerInfluence: .2, swipeSpeed: 1
};

class Carousel extends EventTarget {
  constructor(count) { super(); this.count = count; this.spacing = 3.5; this.position = 0; this.target = 0; this.offset = 0; this._idx = 0; }
  getIndex() { return wrap(Math.round((this.target + this.offset) / this.spacing), 0, this.count); }
  goTo(i) { const cur = Math.round(this.target / this.spacing); const d = wrap(i - cur, -this.count / 2, this.count / 2); this.target = (cur + Math.round(d)) * this.spacing; this._emit(); }
  next() { this.target = (Math.round(this.target / this.spacing) + 1) * this.spacing; this._emit(); }
  previous() { this.target = (Math.round(this.target / this.spacing) - 1) * this.spacing; this._emit(); }
  snap() { this.target = Math.round(this.target / this.spacing) * this.spacing; this._emit(); }
  _emit() { const i = this.getIndex(); if (i !== this._idx) { const d = i - this._idx; this._idx = i; this.dispatchEvent(new CustomEvent("changed", { detail: { index: i, delta: Math.abs(d) > this.count / 2 ? -Math.sign(d) : Math.sign(d) } })); } }
  step(dt) { this.position = lerp(this.position, this.target, Math.min(1, dt * 10)); }
}

function labelTexture(prod, THREE_) {
  const c = document.createElement("canvas"); c.width = 320; c.height = 420;
  const g = c.getContext("2d");
  const bg = g.createLinearGradient(0, 0, 0, 420); bg.addColorStop(0, "#15110a"); bg.addColorStop(1, "#050403");
  g.fillStyle = bg; g.fillRect(0, 0, 320, 420);
  const gold = g.createLinearGradient(0, 0, 320, 420); gold.addColorStop(0, "#8a6a1f"); gold.addColorStop(.3, "#f6e27a"); gold.addColorStop(.6, "#c9a227"); gold.addColorStop(1, "#fff1b0");
  g.strokeStyle = gold; g.lineWidth = 5; g.strokeRect(14, 14, 292, 392); g.lineWidth = 1.5; g.strokeRect(26, 26, 268, 368);
  g.fillStyle = gold; g.textAlign = "center";
  g.font = "600 30px 'Cormorant Garamond', Georgia, serif"; g.fillText("B A K K A H", 160, 78);
  g.fillRect(120, 96, 80, 2);
  const name = String(prod.nom || "").toUpperCase(); const words = name.split(/\s+/);
  const lines = []; let cur = "";
  words.forEach(w => { if ((cur + " " + w).trim().length > 11 && cur) { lines.push(cur); cur = w; } else cur = (cur + " " + w).trim(); });
  if (cur) lines.push(cur);
  const arab = /[\u0600-\u06FF]/.test(name); const size = (lines.length > 2 ? 50 : 62) * (arab ? .9 : 1); g.font = arab ? `700 ${size}px 'Amiri', 'Tajawal', serif` : `600 ${size}px 'Cormorant Garamond', Georgia, serif`;
  const y0 = 215 - ((lines.length - 1) * size * .55);
  lines.slice(0, 3).forEach((l, i) => { g.fillText(l, 160, y0 + i * size * 1.05, 270); });
  g.font = "500 20px 'Geist Mono', ui-monospace, monospace"; g.fillText("EAU DE PARFUM", 160, 350);
  g.font = "700 26px 'Amiri', serif"; g.fillText("بكة", 160, 385);
  const tex = new THREE_.CanvasTexture(c); tex.colorSpace = THREE_.SRGBColorSpace; tex.anisotropy = 4; return tex;
}

export function createScene({ canvas, featured, lowPower }) {
  /* robuste à une liste vide : flacon neutre aux couleurs Bakkah */
  if (!Array.isArray(featured) || !featured.length) featured = [{ nom: "BAKKAH", couleur1: "#4a3a1a", couleur2: "#d4af37" }];
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
  renderer.setClearColor(0x000000, 0);
  const dprMax = lowPower ? 2 : 1.5;
  const dpr = () => Math.min(window.devicePixelRatio || 1, dprMax);
  renderer.setPixelRatio(dpr());

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(20, 1, .1, 100);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), .04).texture;
  scene.environment = env;

  /* ----- teinte de l'environnement (indirectDiffuse / indirectSpecular) ----- */
  const tintU = { color: { value: new THREE.Color(1, 1, 1) }, strength: { value: 1 } };
  function patchTint(mat, amt) {
    mat.onBeforeCompile = sh => {
      sh.uniforms.tintColor = tintU.color; sh.uniforms.tintStrength = tintU.strength; sh.uniforms.tintAmt = { value: amt };
      sh.fragmentShader = "uniform vec3 tintColor;uniform float tintStrength;uniform float tintAmt;\n" + sh.fragmentShader.replace("#include <lights_fragment_maps>",
        `#include <lights_fragment_maps>
        vec3 tintMul = mix(vec3(1.0), tintColor * tintStrength, tintAmt);
        #if defined( RE_IndirectDiffuse )
          iblIrradiance *= tintMul;
        #endif
        #if defined( RE_IndirectSpecular )
          radiance *= tintMul;
        #endif`);
    };
    mat.customProgramCacheKey = () => "bk-tint-" + amt;
    return mat;
  }

  /* ----- matériaux partagés ----- */
  const goldMat = patchTint(new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 1, roughness: .22, envMapIntensity: 1.5 }), .35);
  const podMat = new THREE.MeshStandardMaterial({ color: 0xcaa233, metalness: 1, roughness: .18, envMapIntensity: 1.6 });
  const blackMat = new THREE.MeshStandardMaterial({ color: 0x0a0907, metalness: .6, roughness: .35 });
  const glassMat = lowPower
    ? patchTint(new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: .18, roughness: .05, metalness: 0, envMapIntensity: 1.6, depthWrite: false }), .7)
    : patchTint(new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 1, thickness: .8, ior: 1.5, roughness: .04, metalness: 0, envMapIntensity: 1.6, clearcoat: 1, clearcoatRoughness: .05, specularIntensity: 1 }), .7);

  /* ----- flacons ----- */
  const m = featured.length;
  const protos = featured.map((prod, idx) => {
    const c1 = new THREE.Color(prod.couleur1 || "#6b4a1a"), c2 = new THREE.Color(prod.couleur2 || "#f2c261");
    const liquid = patchTint(new THREE.MeshPhysicalMaterial({ color: c1.clone().lerp(c2, .35), emissive: c1.clone().multiplyScalar(.5), emissiveIntensity: .45, roughness: .12, metalness: 0, clearcoat: 1, clearcoatRoughness: .1, envMapIntensity: 1.2 }), .5);
    const label = new THREE.MeshStandardMaterial({ map: null, roughness: .45, metalness: .35, envMapIntensity: .6 });
    const type = idx % 3; const g = new THREE.Group(); const body = new THREE.Group(); g.add(body);
    const add = (geo, mat, x, y, z) => { const me = new THREE.Mesh(geo, mat); me.position.set(x || 0, y || 0, z || 0); body.add(me); return me; };
    let yshift = 0, sc = 1, labelMesh;
    if (type === 0) {
      const W = 1.5, H = 1.9, Dp = .85;
      add(new RoundedBoxGeometry(W, H, Dp, 5, .13), glassMat);
      add(new RoundedBoxGeometry(W - .22, H - .6, Dp - .22, 4, .08), liquid, 0, -.12);
      add(new THREE.CylinderGeometry(.27, .32, .22, 32), goldMat, 0, H / 2 + .08);
      add(new RoundedBoxGeometry(.92, .78, .62, 4, .1), goldMat, 0, H / 2 + .08 + .11 + .39);
      add(new THREE.CylinderGeometry(.3, .3, .05, 32), blackMat, 0, H / 2 + .08 + .11 + .02);
      labelMesh = new THREE.Mesh(new THREE.PlaneGeometry(W * .62, H * .42), label); labelMesh.position.set(0, -.12, Dp / 2 + .003); body.add(labelMesh);
      yshift = -.5; sc = 1;
    } else if (type === 1) {
      const pr = (r, h, k) => { const p = []; p.push(new THREE.Vector2(0, -h)); p.push(new THREE.Vector2(r - k, -h)); for (let i = 0; i <= 6; i++) { const a = -Math.PI / 2 + (i / 6) * Math.PI / 2; p.push(new THREE.Vector2(r - k + Math.cos(a) * k, -h + k + Math.sin(a) * k)); } for (let i = 0; i <= 6; i++) { const a = (i / 6) * Math.PI / 2; p.push(new THREE.Vector2(r - k + Math.cos(a) * k, h - k + Math.sin(a) * k)); } p.push(new THREE.Vector2(r - k, h)); p.push(new THREE.Vector2(0, h)); return p; };
      add(new THREE.LatheGeometry(pr(.74, .92, .16), 56), glassMat);
      add(new THREE.LatheGeometry(pr(.62, .7, .14), 48), liquid, 0, -.1);
      add(new THREE.CylinderGeometry(.24, .3, .24, 32), goldMat, 0, .92 + .1);
      add(new THREE.CylinderGeometry(.42, .42, .85, 40), goldMat, 0, .92 + .22 + .425);
      add(new THREE.TorusGeometry(.42, .03, 12, 48), blackMat, 0, .92 + .24).rotation.x = Math.PI / 2;
      labelMesh = new THREE.Mesh(new THREE.CylinderGeometry(.752, .752, .78, 40, 1, true, -.62, 1.24), label);
      labelMesh.position.set(0, -.1, 0); body.add(labelMesh);
      yshift = -.58; sc = 1;
    } else {
      const W = 1.1, H = 2.3, Dp = .72;
      add(new RoundedBoxGeometry(W, H, Dp, 5, .1), glassMat);
      add(new RoundedBoxGeometry(W - .18, H - .62, Dp - .18, 4, .07), liquid, 0, -.14);
      add(new THREE.CylinderGeometry(.2, .26, .2, 32), goldMat, 0, H / 2 + .07);
      add(new THREE.SphereGeometry(.42, 40, 28), goldMat, 0, H / 2 + .07 + .1 + .36);
      labelMesh = new THREE.Mesh(new THREE.PlaneGeometry(W * .66, H * .38), label); labelMesh.position.set(0, -.14, Dp / 2 + .003); body.add(labelMesh);
      yshift = -.56; sc = .88;
    }
    body.position.y = yshift; g.scale.setScalar(sc);
    g.userData = { index: idx, label, c1, c2 };
    return g;
  });
  const setLabels = () => protos.forEach((g, i) => { if (g.userData.label.map) g.userData.label.map.dispose(); g.userData.label.map = labelTexture(featured[i], THREE); g.userData.label.needsUpdate = true; });
  setLabels();

  const baseN = lowPower ? 12 : 24;
  const N = Math.max(m, Math.floor(baseN / m) * m);
  const objs = [];
  const world = new THREE.Group(); scene.add(world);
  for (let i = 0; i < N; i++) {
    const holder = new THREE.Group(); holder.rotation.order = "YXZ";
    const clone = protos[i % m].clone(); // partage géométries et matériaux
    const spinG = new THREE.Group(); spinG.add(clone); holder.add(spinG);
    holder.userData = { i, prod: i % m };
    world.add(holder); objs.push({ holder, spinG, i });
  }

  /* ----- podiums or ----- */
  const podGeo = new RoundedBoxGeometry(90, .5, 3.4, 3, .12);
  const podTop = new THREE.Mesh(podGeo, podMat), podBot = new THREE.Mesh(podGeo, podMat);
  scene.add(podTop, podBot);

  /* ----- lumières ----- */
  const spot1 = new THREE.SpotLight(0xfff0d0, 0, 8, Math.PI / 4, 1, .1); spot1.position.set(0, 3.5, 0); spot1.target.position.set(0, 0, 1);
  const spot2 = new THREE.SpotLight(0xffe2b0, 0, 8, Math.PI / 4, 1, .1); spot2.position.set(0, -3, 2); spot2.target.position.set(0, 0, 1.8);
  const spot3 = new THREE.SpotLight(0xffffff, 0, 15, Math.PI / 8, 1, .1); spot3.position.set(0, 3, 2); spot3.target.position.set(0, 0.5, 0);
  scene.add(spot1, spot1.target, spot2, spot2.target, spot3, spot3.target);

  /* ----- post-traitement (bureau) ----- */
  let composer = null;
  const size = () => ({ w: Math.max(1, canvas.clientWidth), h: Math.max(1, canvas.clientHeight) });
  if (!lowPower) {
    const { w, h } = size();
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new UnrealBloomPass(new THREE.Vector2(w, h), .1, .1, 1));
    composer.addPass(new OutputPass());
    composer.addPass(new SMAAPass(w * dpr(), h * dpr()));
  }
  function resize() {
    const { w, h } = size(); renderer.setPixelRatio(dpr()); renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    if (composer) { composer.setPixelRatio(dpr()); composer.setSize(w, h); }
  }
  resize();

  const carousel = new Carousel(m);
  const data = { ...START };
  const intro = { dz: 0, light: 1 };
  const pointer = { x: 0, y: 0, sx: 0, sy: 0 };
  const swipe = { active: true };
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  let paused = false, lost = false;
  const tmpC = new THREE.Color();
  const tintTarget = { r: 1, g: 1, b: 1 };
  canvas.addEventListener("webglcontextlost", e => { e.preventDefault(); lost = true; });
  canvas.addEventListener("webglcontextrestored", () => { lost = false; });

  function setTint(hex) { tmpC.set(hex); tintTarget.r = tmpC.r; tintTarget.g = tmpC.g; tintTarget.b = tmpC.b; }
  setTint(featured[0].couleur2 || "#f2c261");

  function pick(clientX, clientY) {
    const r = canvas.getBoundingClientRect();
    ndc.set(((clientX - r.left) / r.width) * 2 - 1, -((clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hits = ray.intersectObjects(world.children, true);
    if (!hits.length) return null;
    let o = hits[0].object; while (o && !o.userData.hasOwnProperty("prod")) o = o.parent;
    return o ? { x: o.position.x, prod: o.userData.prod } : null;
  }

  function update(dt, t, H0, scrollY) {
    if (paused || lost) return;
    carousel.step(dt);
    pointer.sx = lerp(pointer.sx, pointer.x, Math.min(1, dt * 4)); pointer.sy = lerp(pointer.sy, pointer.y, Math.min(1, dt * 4));
    tintU.color.value.r = lerp(tintU.color.value.r, tintTarget.r, Math.min(1, dt * 4)); tintU.color.value.g = lerp(tintU.color.value.g, tintTarget.g, Math.min(1, dt * 4)); tintU.color.value.b = lerp(tintU.color.value.b, tintTarget.b, Math.min(1, dt * 4));
    tintU.strength.value = data.tintStrength;

    const asp = camera.aspect, f = clamp((1.78 / asp) * .6, 1, 3);
    camera.position.set(data.camX * f, data.camY * f, (data.camZ + intro.dz) * f);
    camera.rotation.set(data.camRX * DEG, data.camRY * DEG, data.camRZ * DEG);
    if (camera.fov !== data.fov) { camera.fov = data.fov; camera.updateProjectionMatrix(); }

    const sp = carousel.spacing, minX = N * -.5 * sp, maxX = N * .5 * sp;
    const p0 = clamp(scrollY / H0, 0, 1);
    const windowRatio = clamp(1440 / window.innerWidth, 1, 2.4);
    const wave = windowRatio * .25 * (1 - p0) * data.wave;
    for (const o of objs) {
      const x = wrap(o.i * sp - carousel.position, minX, maxX);
      const p = clamp(1 - Math.abs(x) / sp, 0, 1), p1 = Math.min(p, p0);
      let s = 1.2, px = x * data.spacing, py = Math.sin(px * wave), pz = (-Math.abs(x) - .2) * data.wave;
      let rx = -20 * DEG * data.wave, ry = (px * .5 - 20 * DEG) * data.wave, rz = 11.25 * DEG * data.wave;
      rx = lerp(rx, x * .06 * windowRatio + .2, data.swirl);
      s = lerp(s, data.canScale, p0); py = lerp(py, data.canY, p0); pz = lerp(pz, data.canZ, p0);
      px += data.canX * p0 * p;
      rx += data.canRX * DEG; ry = lerp(ry, data.canRY * DEG, p1); rz = lerp(rz, data.canRZ * DEG, p1);
      rx += pointer.sy / 1280 * data.pointerInfluence * p; ry += pointer.sx / 1280 * data.pointerInfluence * p;
      o.holder.position.set(px, py, pz); o.holder.rotation.set(rx, ry, rz); o.holder.scale.setScalar(s);
      o.spinG.rotation.y = data.spin * DEG * p + Math.sin(t * .7 + o.i) * .1 * p;
      o.holder.visible = Math.abs(px) < 40;
    }
    const po = 2.1 + data.baseOffset * Math.max(1, clamp((1.78 / camera.aspect) * .6, 1, 3));
    podTop.position.set(0, po + .25, 0); podBot.position.set(0, -po - .25, 0);

    const k = intro.light * LIGHT_K, lw = data.lightWidth;
    spot1.intensity = data.lightIntensity * k; spot2.intensity = data.lightIntensity * k * .7;
    spot1.angle = spot2.angle = Math.PI / 4 * lw;
    spot3.intensity = data.spotIntensity * k; spot3.position.set(0, data.spotY, 2); spot3.target.position.set(0, data.spotY - 2.5, 0);
    renderer.toneMappingExposure = 1.05;
    (composer || { render: () => renderer.render(scene, camera) }).render();
  }

  return { renderer, scene, camera, carousel, data, intro, pointer, swipe, update, resize, pick, setTint, setPaused: v => { paused = v; }, N, m };
}
