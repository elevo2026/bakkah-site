/* Fonds animés : fumée d'oud + particules dorées (canvas 2D), teintés à la couleur du parfum */
export function createFx(canvas) {
  const ctx = canvas.getContext("2d");
  let w = 0, h = 0, intensity = 0, running = true;
  const col = { a: [138, 75, 18], b: [242, 194, 97] }, tgt = { a: [138, 75, 18], b: [242, 194, 97] };
  const hex = s => { const n = parseInt(s.replace("#", ""), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
  const smoke = Array.from({ length: 12 }, (_, i) => ({ x: Math.random(), y: Math.random(), r: .25 + Math.random() * .35, vx: (Math.random() - .5) * .012, vy: -.01 - Math.random() * .02, ph: Math.random() * 6.28, k: i % 2 }));
  const dust = Array.from({ length: 70 }, () => ({ x: Math.random(), y: Math.random(), s: .6 + Math.random() * 1.8, v: .01 + Math.random() * .04, ph: Math.random() * 6.28 }));
  function resize() { const d = Math.min(window.devicePixelRatio || 1, 1) * .5; w = canvas.width = Math.max(2, Math.round(innerWidth * d)); h = canvas.height = Math.max(2, Math.round(innerHeight * d)); }
  resize();
  function frame(dt, t) {
    if (!running || intensity < .01) { if (intensity < .01) ctx.clearRect(0, 0, w, h); return; }
    for (let i = 0; i < 3; i++) { col.a[i] += (tgt.a[i] - col.a[i]) * Math.min(1, dt * 3); col.b[i] += (tgt.b[i] - col.b[i]) * Math.min(1, dt * 3); }
    ctx.globalCompositeOperation = "source-over"; ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = "lighter";
    for (const s of smoke) {
      s.x += s.vx * dt * 3; s.y += s.vy * dt * 3; if (s.y < -.4) { s.y = 1.4; s.x = Math.random(); } if (s.x < -.4 || s.x > 1.4) s.vx *= -1;
      const c = s.k ? col.b : col.a, rr = s.r * Math.max(w, h) * (1 + .15 * Math.sin(t * .4 + s.ph));
      const g = ctx.createRadialGradient(s.x * w, s.y * h, 0, s.x * w, s.y * h, rr);
      g.addColorStop(0, `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${.2 * intensity})`); g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g; ctx.fillRect(s.x * w - rr, s.y * h - rr, rr * 2, rr * 2);
    }
    for (const p of dust) {
      p.y -= p.v * dt; p.x += Math.sin(t * .5 + p.ph) * .0004; if (p.y < -.02) { p.y = 1.02; p.x = Math.random(); }
      const a = (.35 + .65 * Math.abs(Math.sin(t * 1.3 + p.ph))) * intensity;
      ctx.fillStyle = `rgba(246,226,122,${a * .8})`; ctx.beginPath(); ctx.arc(p.x * w, p.y * h, p.s * (w / 1000 + .6), 0, 6.283); ctx.fill();
    }
  }
  return {
    frame, resize,
    setColors(c1, c2) { tgt.a = hex(c1); tgt.b = hex(c2); },
    setIntensity(v) { intensity = v; canvas.style.opacity = v > 0 ? 1 : 0; },
    setRunning(v) { running = v; }
  };
}
