import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Felt, FELT, Stitch } from "./kit";
import { FeltLabel } from "./StyleSample";
import { clamp01, easeIn, easeInOut, pop, prog, rand, wobble } from "../PromoV5/lib/anim";

/** Stop-motion feel: the whole film animates "on twos" (15 poses per second). */
export const useFeltFrame = () => Math.floor(useCurrentFrame() / 2) * 2;

/** Felt label that pops in at `at` and squishes out at `until`. */
export const LabelAt: React.FC<{
  f: number;
  at: number;
  until?: number;
  top: number;
  children: React.ReactNode;
  color?: string;
  text?: string;
  size?: number;
  rotate?: number;
}> = ({ f, at, until = 9999, top, children, color, text, size = 60, rotate = -2 }) => {
  if (f < at || f > until + 8) return null;
  const s = pop(f, at, 230, 11);
  const out = prog(f, until, 8, easeIn);
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top, display: "flex", justifyContent: "center", transform: `scale(${s * (1 - out)}, ${s * (1 - out * 0.6)}) rotate(${(1 - s) * -10}deg)`, opacity: 1 - out }}>
      <FeltLabel color={color} text={text} size={size} rotate={rotate}>
        {children}
      </FeltLabel>
    </div>
  );
};

export const starPath = (cx: number, cy: number, r: number, inner = 0.45) => {
  let d = "";
  for (let i = 0; i < 10; i++) {
    const rr = i % 2 === 0 ? r : r * inner;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    d += `${i === 0 ? "M" : "L"}${(cx + Math.cos(a) * rr).toFixed(1)} ${(cy + Math.sin(a) * rr).toFixed(1)}`;
  }
  return `${d}Z`;
};

export const sparklePath = (x: number, y: number, r: number) =>
  `M${x} ${y - r} L${x + r * 0.3} ${y - r * 0.3} L${x + r} ${y} L${x + r * 0.3} ${y + r * 0.3} L${x} ${y + r} L${x - r * 0.3} ${y + r * 0.3} L${x - r} ${y} L${x - r * 0.3} ${y - r * 0.3} Z`;

/** Burst of felt stars, hearts and dots with gravity. */
export const FeltBurst: React.FC<{ f: number; x: number; y: number; seed?: number; count?: number; power?: number; colors?: string[]; life?: number; hearts?: boolean }> = ({
  f,
  x,
  y,
  seed = 1,
  count = 14,
  power = 24,
  colors = [FELT.orange, FELT.mustard, "#ffffff", FELT.red],
  life = 30,
  hearts,
}) => {
  if (f < 0 || f > life) return null;
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "visible" }}>
      <Felt>
        {new Array(count).fill(0).map((_, i) => {
          const a = (i / count) * Math.PI * 2 + rand(seed + i) * 0.5;
          const sp = power * (0.6 + rand(seed * 3 + i) * 0.6);
          const dist = (sp * (1 - Math.pow(0.88, f))) / 0.12;
          const px = x + Math.cos(a) * dist;
          const py = y + Math.sin(a) * dist + 0.35 * f * f * 0.4;
          const s = 18 + rand(seed + i * 5) * 16;
          const fade = 1 - clamp01((f - life * 0.6) / (life * 0.4));
          const c = colors[i % colors.length];
          const kind = hearts && i % 3 === 0 ? "heart" : i % 2 === 0 ? "star" : "dot";
          return (
            <g key={i} opacity={fade} transform={`rotate(${f * (rand(i) * 10 - 5)} ${px} ${py})`}>
              {kind === "star" ? <path d={starPath(px, py, s)} fill={c} /> : null}
              {kind === "dot" ? <circle cx={px} cy={py} r={s * 0.45} fill={c} /> : null}
              {kind === "heart" ? <path d={`M${px} ${py + s * 0.8} C${px - s * 1.4} ${py - s * 0.2} ${px - s * 0.5} ${py - s * 1.1} ${px} ${py - s * 0.3} C${px + s * 0.5} ${py - s * 1.1} ${px + s * 1.4} ${py - s * 0.2} ${px} ${py + s * 0.8} Z`} fill={FELT.red} /> : null}
            </g>
          );
        })}
      </Felt>
    </svg>
  );
};

/** Felt curtain sweeping across with a stitched edge: covers by `dur/2`, uncovers by `dur`. */
export const ClothWipe: React.FC<{ f: number; color: string; dur?: number; dir?: 1 | -1 }> = ({ f, color, dur = 18, dir = 1 }) => {
  if (f < 0 || f > dur) return null;
  const inP = easeInOut(clamp01(f / (dur / 2)));
  const outP = easeInOut(clamp01((f - dur / 2) / (dur / 2)));
  const left = dir === 1 ? -1200 + inP * 1200 + outP * 1300 : 1200 - inP * 1200 - outP * 1300;
  const wave = (k: number) => Math.sin(k / 120 + f * 0.6) * 24;
  let edge = `M${dir === 1 ? 1180 : -100} -40`;
  for (let y = -40; y <= 1960; y += 80) edge += ` L${(dir === 1 ? 1180 : -100) + wave(y)} ${y}`;
  return (
    <AbsoluteFill style={{ transform: `translateX(${left}px)`, pointerEvents: "none" }}>
      <svg width={1400} height={1920} style={{ position: "absolute", left: dir === 1 ? -100 : -200, top: 0, overflow: "visible" }}>
        <Felt shadow>
          <path d={`M-200 -40 H${dir === 1 ? 1180 : 1500} V1960 H-200 Z`} fill={color} />
          <path d={`${edge} L${dir === 1 ? 1180 : -100} 1960`} stroke={color} strokeWidth={60} fill="none" />
        </Felt>
        <Stitch d={`M${dir === 1 ? 1150 : -70} 0 V1920`} color="rgba(255,255,255,0.6)" width={5} dash="18 12" />
      </svg>
    </AbsoluteFill>
  );
};

/** Zipper transition: a zip runs down the middle, the next scene opens behind it. */
export const zipperOpen = (f: number, dur = 22) => {
  const p = easeInOut(clamp01(f / dur));
  const pullY = -80 + p * 2100;
  const spread = Math.max(0, p - 0.35) * 1400;
  return { pullY, clip: `polygon(${540 - 60 - spread}px -10px, ${540 + 60 + spread}px -10px, 540px ${pullY}px)`, done: p >= 1 };
};

export const ZipperPull: React.FC<{ f: number; dur?: number }> = ({ f, dur = 22 }) => {
  if (f < 0 || f > dur) return null;
  const { pullY } = zipperOpen(f, dur);
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }}>
      {new Array(40).fill(0).map((_, i) => {
        const y = pullY + 20 + i * 26;
        return y < 1960 ? <rect key={i} x={i % 2 ? 532 : 520} y={y} width={28} height={14} rx={4} fill="#c9a24a" /> : null;
      })}
      <Felt shadow>
        <rect x={510} y={pullY - 40} width={60} height={70} rx={14} fill="#c9a24a" />
        <rect x={522} y={pullY + 20} width={36} height={80} rx={14} fill="#b08938" />
      </Felt>
      <circle cx={540} cy={pullY + 80} r={9} fill={FELT.board} />
    </svg>
  );
};

/** Gentle swaying for idle characters. */
export const sway = (f: number, seed = 0, amp = 2) => Math.sin((f + seed * 17) / 14) * amp;

export const hop = (f: number, seed = 0) => -Math.abs(Math.sin((f + seed * 5) / 4)) * 18;

export { wobble };
