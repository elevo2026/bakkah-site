/* Sons synthétisés (Web Audio) : aucun fichier audio. Désactivé par défaut, activable via le bouton « Son ». */
export function createAudio() {
  let ac = null, master = null, on = false, amb = null;
  function ensure() {
    if (ac) return ac;
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
    ac = new AC(); master = ac.createGain(); master.gain.value = 0; master.connect(ac.destination); return ac;
  }
  function ambient() {
    if (amb || !ac) return;
    const lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 520; lp.connect(master);
    const g = ac.createGain(); g.gain.value = .06; g.connect(lp);
    [110, 164.81, 220.5].forEach((f, i) => { const o = ac.createOscillator(); o.type = i ? "sine" : "triangle"; o.frequency.value = f; o.detune.value = (i - 1) * 6; o.connect(g); o.start(); });
    const lfo = ac.createOscillator(), lg = ac.createGain(); lfo.frequency.value = .12; lg.gain.value = .03; lfo.connect(lg); lg.connect(g.gain); lfo.start();
    amb = true;
  }
  function blip(f1, f2, dur, vol, type) {
    if (!on || !ac) return;
    const o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime;
    o.type = type || "sine"; o.frequency.setValueAtTime(f1, t); o.frequency.exponentialRampToValueAtTime(f2, t + dur);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.0001, t + dur); o.connect(g); g.connect(master); o.start(t); o.stop(t + dur + .02);
  }
  function whoosh() {
    if (!on || !ac) return;
    const len = ac.sampleRate * .6, buf = ac.createBuffer(1, len, ac.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const s = ac.createBufferSource(); s.buffer = buf; const bp = ac.createBiquadFilter(); bp.type = "bandpass"; bp.Q.value = 1.2;
    const g = ac.createGain(), t = ac.currentTime; bp.frequency.setValueAtTime(300, t); bp.frequency.exponentialRampToValueAtTime(2200, t + .5);
    g.gain.setValueAtTime(.05, t); g.gain.exponentialRampToValueAtTime(.0001, t + .6); s.connect(bp); bp.connect(g); g.connect(master); s.start(t);
  }
  return {
    get on() { return on; },
    toggle() { const a = ensure(); if (!a) return false; on = !on; if (a.state === "suspended") a.resume(); if (on) ambient(); master.gain.cancelScheduledValues(a.currentTime); master.gain.linearRampToValueAtTime(on ? .5 : 0, a.currentTime + .4); return on; },
    tick() { blip(880, 1320, .18, .05); },
    add() { blip(660, 990, .25, .06, "triangle"); setTimeout(() => blip(990, 1480, .3, .04), 90); },
    whoosh
  };
}
