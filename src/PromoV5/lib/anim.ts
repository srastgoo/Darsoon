import { Easing, interpolate, spring } from "remotion";
import { FPS } from "../timeline";

export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);
export const easeIn = Easing.bezier(0.7, 0, 0.84, 0);

/** 0..1 progress of a window starting at `start` lasting `dur` frames. */
export const prog = (frame: number, start: number, dur: number, easing: (t: number) => number = easeOut) =>
  interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Overshooting spring, starting at `delay`. */
export const pop = (frame: number, delay = 0, stiffness = 220, damping = 12, mass = 0.8) =>
  spring({ frame: frame - delay, fps: FPS, config: { stiffness, damping, mass } });

export const soft = (frame: number, delay = 0) =>
  spring({ frame: frame - delay, fps: FPS, config: { stiffness: 120, damping: 20 } });

/**
 * Ball dropped from height `h` (px) under gravity `g` (px/s²) with restitution `e`.
 * Returns the height above the ground (>= 0), the vertical speed and a squash
 * amount that peaks at each impact (0..1).
 */
export const bounce = (frame: number, h: number, g = 5200, e = 0.45) => {
  let t = Math.max(0, frame) / FPS;
  const fall = Math.sqrt((2 * h) / g);
  if (t < fall) {
    return { y: h - 0.5 * g * t * t, v: -g * t, squash: 0, landed: false };
  }
  t -= fall;
  let v = Math.sqrt(2 * g * h) * e;
  let impactSpeed = Math.sqrt(2 * g * h);
  for (let i = 0; i < 8 && v > 40; i++) {
    const hop = (2 * v) / g;
    if (t < hop) {
      const sinceImpact = t;
      const squash = Math.exp(-sinceImpact * 40) * Math.min(1, impactSpeed / 2400);
      return { y: v * t - 0.5 * g * t * t, v: v - g * t, squash, landed: true };
    }
    t -= hop;
    impactSpeed = v;
    v *= e;
  }
  return { y: 0, v: 0, squash: Math.exp(-t * 40) * Math.min(1, impactSpeed / 2400), landed: true };
};

/** Damped pendulum angle (deg) released at `amp` degrees. */
export const pendulum = (frame: number, amp = 24, periodFrames = 34, damping = 1.4) => {
  const t = Math.max(0, frame) / FPS;
  return amp * Math.exp(-damping * t) * Math.cos((2 * Math.PI * Math.max(0, frame)) / periodFrames);
};

/** Damped oscillation used for wobble / jelly after an impact. */
export const wobble = (frame: number, amp = 1, freq = 2.6, decay = 5) => {
  const t = Math.max(0, frame) / FPS;
  if (frame < 0) return 0;
  return amp * Math.exp(-decay * t) * Math.sin(2 * Math.PI * freq * t);
};

/** Squash & stretch scale pair keeping volume. */
export const squashStretch = (amount: number) => {
  const sy = 1 - amount;
  const sx = 1 / Math.max(0.2, sy);
  return { sx, sy };
};

/**
 * Smear: stretches along the motion direction and blurs proportionally to speed (px/frame).
 */
export const smear = (speed: number, axis: "x" | "y" = "x", k = 0.012) => {
  const s = Math.min(Math.abs(speed) * k, 0.6);
  const blur = Math.min(Math.abs(speed) * 0.08, 10);
  return {
    transform: axis === "x" ? `scaleX(${1 + s}) scaleY(${1 - s * 0.35})` : `scaleY(${1 + s}) scaleX(${1 - s * 0.35})`,
    filter: blur > 0.4 ? `blur(${blur.toFixed(2)}px)` : undefined,
  };
};

/** Deterministic pseudo-random in [0,1). */
export const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/** Small hand-held jitter for "marker" feel. */
export const jitter = (frame: number, seed: number, amp = 1.2, rate = 3) =>
  (rand(Math.floor(frame / rate) + seed * 31) - 0.5) * 2 * amp;
