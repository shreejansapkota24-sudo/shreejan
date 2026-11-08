// Synthesized fireworks sounds (Web Audio). Muted by default; only plays after user enables.
let enabled = false;
let ctx: AudioContext | null = null;
const listeners = new Set<(v: boolean) => void>();

export const isSoundOn = () => enabled;
export const onSoundChange = (fn: (v: boolean) => void) => { listeners.add(fn); return () => { listeners.delete(fn); }; };
export const setSound = (v: boolean) => {
  enabled = v;
  if (v) {
    ctx = ctx ?? new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    ctx.resume();
  }
  listeners.forEach((l) => l(v));
};

const noise = (dur: number) => {
  const c = ctx!;
  const buf = c.createBuffer(1, c.sampleRate * dur, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource();
  src.buffer = buf;
  return src;
};

/** Big aerial burst; distance 0 (near) – 1 (far). */
export const playBoom = (distance = Math.random()) => {
  if (!enabled || !ctx) return;
  const c = ctx, t = c.currentTime + distance * 0.25;
  const src = noise(2);
  const lp = c.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 1400 - distance * 900;
  const g = c.createGain();
  const vol = 0.55 - distance * 0.35;
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + 0.01); g.gain.exponentialRampToValueAtTime(0.001, t + 1.6);
  src.connect(lp).connect(g).connect(c.destination); src.start(t); src.stop(t + 2);
  // sparkle crackle tail
  for (let i = 0; i < 14; i++) crack(t + 0.35 + Math.random() * 1.1, 0.06 * (1 - distance));
};

const crack = (t: number, vol: number) => {
  const c = ctx!;
  const src = noise(0.05);
  const hp = c.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 3000;
  const g = c.createGain(); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
  src.connect(hp).connect(g).connect(c.destination); src.start(t); src.stop(t + 0.05);
};

/** Ground firecracker (pataka) pop. */
export const playPop = () => {
  if (!enabled || !ctx) return;
  const c = ctx, t = c.currentTime;
  const src = noise(0.25);
  const bp = c.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 900 + Math.random() * 600;
  const g = c.createGain(); g.gain.setValueAtTime(0.5, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
  src.connect(bp).connect(g).connect(c.destination); src.start(t); src.stop(t + 0.25);
};

/** Rocket whistle on launch. */
export const playWhistle = () => {
  if (!enabled || !ctx) return;
  const c = ctx, t = c.currentTime;
  const o = c.createOscillator(); o.type = "sine";
  o.frequency.setValueAtTime(900, t); o.frequency.exponentialRampToValueAtTime(2400, t + 0.9);
  const g = c.createGain(); g.gain.setValueAtTime(0.03, t); g.gain.exponentialRampToValueAtTime(0.001, t + 1);
  o.connect(g).connect(c.destination); o.start(t); o.stop(t + 1);
};
