import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, HEIGHT, WIDTH } from "../timeline";
import { clamp01, rand } from "./anim";

/** Paper-light canvas with faint notebook grid, grain and soft vignette. */
export const Paper: React.FC<{ grid?: boolean; tint?: string; drift?: number }> = ({
  grid = true,
  tint = COLORS.canvas,
  drift = 0,
}) => (
  <AbsoluteFill style={{ background: tint }}>
    {grid ? (
      <svg width={WIDTH} height={HEIGHT} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <pattern id="v5grid" width="60" height="60" patternUnits="userSpaceOnUse" x={0} y={-drift % 60}>
            <path d="M60 0H0V60" fill="none" stroke={COLORS.paperLine} strokeWidth="1.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#v5grid)" opacity={0.75} />
      </svg>
    ) : null}
    <svg width={WIDTH} height={HEIGHT} style={{ position: "absolute", inset: 0, mixBlendMode: "multiply" }}>
      <filter id="v5grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="4" />
        <feColorMatrix values="0 0 0 0 0.45  0 0 0 0 0.38  0 0 0 0 0.32  0 0 0 0.08 0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#v5grain)" />
    </svg>
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at 50% 45%, rgba(255,255,255,0) 55%, rgba(120,90,70,0.10) 100%)",
      }}
    />
  </AbsoluteFill>
);

/** Shared SVG filter giving strokes a slightly wobbly, hand-drawn edge. */
export const RoughDefs: React.FC = () => (
  <svg width={0} height={0} style={{ position: "absolute" }}>
    <defs>
      <filter id="v5rough" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="2" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="3.2" />
      </filter>
    </defs>
  </svg>
);

/** Marker stroke drawn on with dash offset. `p` is 0..1 draw progress. */
export const Marker: React.FC<{
  d: string;
  p: number;
  color?: string;
  width?: number;
  opacity?: number;
  rough?: boolean;
}> = ({ d, p, color = COLORS.orange, width = 8, opacity = 1, rough = true }) => (
  <>
    <path
      d={d}
      pathLength={1}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="1 1"
      strokeDashoffset={1 - clamp01(p)}
      opacity={opacity * (p > 0 ? 1 : 0)}
      filter={rough ? "url(#v5rough)" : undefined}
    />
    <path
      d={d}
      pathLength={1}
      fill="none"
      stroke={color}
      strokeWidth={width * 0.45}
      strokeLinecap="round"
      strokeDasharray="1 1"
      strokeDashoffset={1 - clamp01(p)}
      opacity={opacity * 0.35 * (p > 0 ? 1 : 0)}
      transform="translate(1.5 -1.5)"
    />
  </>
);

/** Translucent highlighter swipe behind text. */
export const Highlighter: React.FC<{ p: number; color?: string; width: number; height: number; skew?: number }> = ({
  p,
  color = COLORS.ctaBg,
  width,
  height,
  skew = -2,
}) => (
  <div
    style={{
      position: "absolute",
      right: -10,
      top: "50%",
      width: (width + 20) * clamp01(p),
      height,
      transform: `translateY(-30%) skewX(${skew}deg) rotate(-1.2deg)`,
      background: color,
      borderRadius: height * 0.3,
      zIndex: -1,
    }}
  />
);

type ParticleShape = "dot" | "square" | "star" | "plus" | "ring";

/** Confetti/spark burst with gravity, deterministic per seed. */
export const Burst: React.FC<{
  frame: number;
  x: number;
  y: number;
  count?: number;
  colors?: string[];
  power?: number;
  seed?: number;
  gravity?: number;
  life?: number;
  shapes?: ParticleShape[];
  size?: number;
}> = ({
  frame,
  x,
  y,
  count = 18,
  colors = [COLORS.orange, COLORS.star, COLORS.yellow, COLORS.ctaText],
  power = 22,
  seed = 1,
  gravity = 0.9,
  life = 34,
  shapes = ["dot", "square", "plus", "star"],
  size = 14,
}) => {
  if (frame < 0 || frame > life) return null;
  return (
    <svg
      width={WIDTH}
      height={HEIGHT}
      style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none", overflow: "visible" }}
    >
      {new Array(count).fill(0).map((_, i) => {
        const a = (i / count) * Math.PI * 2 + rand(seed + i) * 0.6;
        const sp = power * (0.55 + rand(seed * 3 + i) * 0.7);
        const drag = Math.pow(0.9, frame);
        const dist = (sp * (1 - drag)) / 0.1;
        const px = x + Math.cos(a) * dist;
        const py = y + Math.sin(a) * dist + 0.5 * gravity * frame * frame * 0.35;
        const fade = 1 - clamp01((frame - life * 0.55) / (life * 0.45));
        const s = size * (0.6 + rand(seed + i * 7) * 0.7) * (1 - frame / (life * 1.6));
        const c = colors[i % colors.length];
        const shape = shapes[i % shapes.length];
        const rot = frame * (rand(i + seed) * 14 - 7);
        return (
          <g key={i} transform={`translate(${px} ${py}) rotate(${rot})`} opacity={fade}>
            {shape === "dot" ? <circle r={s / 2} fill={c} /> : null}
            {shape === "square" ? <rect x={-s / 2} y={-s / 4} width={s} height={s / 2} rx={2} fill={c} /> : null}
            {shape === "plus" ? (
              <path d={`M${-s / 2} 0H${s / 2}M0 ${-s / 2}V${s / 2}`} stroke={c} strokeWidth={s / 4} strokeLinecap="round" />
            ) : null}
            {shape === "star" ? <path d={starPath(s * 0.6, s * 0.26)} fill={c} /> : null}
            {shape === "ring" ? <circle r={s / 2} fill="none" stroke={c} strokeWidth={3} /> : null}
          </g>
        );
      })}
    </svg>
  );
};

export const starPath = (outer: number, inner: number, points = 5) => {
  let d = "";
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI / points) * i - Math.PI / 2;
    d += `${i === 0 ? "M" : "L"}${(Math.cos(a) * r).toFixed(2)} ${(Math.sin(a) * r).toFixed(2)}`;
  }
  return `${d}Z`;
};

/** Expanding ring shockwave on impacts. */
export const Shockwave: React.FC<{ frame: number; x: number; y: number; color?: string; max?: number; life?: number }> = ({
  frame,
  x,
  y,
  color = COLORS.orange,
  max = 260,
  life = 18,
}) => {
  if (frame < 0 || frame > life) return null;
  const t = frame / life;
  const r = max * (1 - Math.pow(1 - t, 3));
  return (
    <svg width={WIDTH} height={HEIGHT} style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}>
      <circle cx={x} cy={y} r={r} fill="none" stroke={color} strokeWidth={14 * (1 - t)} opacity={1 - t} />
    </svg>
  );
};

/** White rounded "sticker" card with soft paper shadow. */
export const Card: React.FC<{
  style?: React.CSSProperties;
  children?: React.ReactNode;
  radius?: number;
  pad?: number;
}> = ({ style, children, radius = 36, pad = 28 }) => (
  <div
    style={{
      background: COLORS.white,
      borderRadius: radius,
      padding: pad,
      boxShadow: "0 2px 0 rgba(69,66,66,0.04), 0 24px 50px -12px rgba(110,70,40,0.22)",
      border: "2px solid rgba(69,66,66,0.06)",
      ...style,
    }}
  >
    {children}
  </div>
);

/** Floating hand-drawn doodles for background life. */
export const Doodles: React.FC<{ frame: number; opacity?: number; seed?: number; color?: string }> = ({
  frame,
  opacity = 0.5,
  seed = 0,
  color = "#d9cfc6",
}) => {
  const items = ["M0 0 L30 0 M15 -15 L15 15", "M0 0 a16 16 0 1 0 0.1 0", "M-14 10 L0 -14 L14 10 Z", "M-16 0 Q-8 -14 0 0 T16 0", "M-12 -12 L12 12 M12 -12 L-12 12"];
  return (
    <svg width={WIDTH} height={HEIGHT} style={{ position: "absolute", inset: 0, opacity }}>
      {new Array(14).fill(0).map((_, i) => {
        const x = rand(i + seed * 13) * WIDTH;
        const y0 = rand(i * 2 + seed * 7) * HEIGHT;
        const y = ((y0 - frame * (0.6 + rand(i) * 1.2)) % HEIGHT + HEIGHT) % HEIGHT;
        const rot = frame * (rand(i * 3) - 0.5) * 1.5;
        return (
          <path
            key={i}
            d={items[i % items.length]}
            transform={`translate(${x} ${y}) rotate(${rot}) scale(${1 + rand(i * 5) * 0.8})`}
            fill="none"
            stroke={color}
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      })}
    </svg>
  );
};
