import React from "react";

export type Mood = "happy" | "worried" | "neutral" | "excited";
export type Hair = "short" | "pony" | "curly" | "bun" | "hijab";

const SKINS = ["#f1c19a", "#e0a87c", "#c98a5b", "#a86c43"];
const HAIRS = ["#2a201c", "#4a3125", "#1d1716", "#6b4428"];

type Props = {
  size?: number;
  skin?: number;
  hairColor?: number;
  hair?: Hair;
  shirt?: string;
  mood?: Mood;
  /** Arm angles in degrees, measured from hanging straight down; positive raises outward. */
  armL?: number;
  armR?: number;
  /** Elbow bend in degrees. */
  elbowL?: number;
  elbowR?: number;
  headTilt?: number;
  blink?: boolean;
  talk?: number; // 0..1 mouth openness
  glasses?: boolean;
  lookX?: number; // -1..1 pupil offset
  holding?: React.ReactNode; // rendered near right hand
};

const Arm: React.FC<{ x: number; y: number; angle: number; elbow: number; color: string; skin: string; side: 1 | -1 }> = ({
  x,
  y,
  angle,
  elbow,
  color,
  skin,
  side,
}) => {
  const upper = 64;
  const lower = 58;
  const a1 = (angle * Math.PI) / 180;
  const ex = x + side * Math.sin(a1) * upper;
  const ey = y + Math.cos(a1) * upper;
  const a2 = ((angle + elbow) * Math.PI) / 180;
  const hx = ex + side * Math.sin(a2) * lower;
  const hy = ey + Math.cos(a2) * lower;
  return (
    <g>
      <path d={`M${x} ${y} L${ex} ${ey} L${hx} ${hy}`} stroke={color} strokeWidth={30} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx={hx} cy={hy} r={15} fill={skin} />
    </g>
  );
};

/** Flat-vector bust with posable arms, used across the film. viewBox 300x340. */
export const Character: React.FC<Props> = ({
  size = 300,
  skin = 0,
  hairColor = 0,
  hair = "short",
  shirt = "#ed5f00",
  mood = "happy",
  armL = 8,
  armR = 8,
  elbowL = 0,
  elbowR = 0,
  headTilt = 0,
  blink = false,
  talk = 0,
  glasses = false,
  lookX = 0,
  holding,
}) => {
  const sk = SKINS[skin % SKINS.length];
  const hc = HAIRS[hairColor % HAIRS.length];
  const hx = 150;
  const hy = 118;
  const r = 62;
  const eyeY = hy + 6;
  const brow = mood === "worried" ? 1 : mood === "excited" ? -1 : 0;

  return (
    <svg width={size} height={(size * 340) / 300} viewBox="0 0 300 340" style={{ display: "block", overflow: "visible" }}>
      {/* back hair */}
      {hair === "pony" ? <path d={`M${hx + 40} ${hy - 30} Q${hx + 110} ${hy + 10} ${hx + 70} ${hy + 90} Q${hx + 74} ${hy + 30} ${hx + 40} ${hy}`} fill={hc} /> : null}
      {hair === "hijab" ? <path d={`M${hx - r - 14} ${hy} Q${hx - r - 20} ${hy + 120} ${hx - 70} ${hy + 160} L${hx + 70} ${hy + 160} Q${hx + r + 20} ${hy + 120} ${hx + r + 14} ${hy} Z`} fill="#7b7877" /> : null}
      {/* torso */}
      <path d="M58 340 Q58 222 150 214 Q242 222 242 340 Z" fill={shirt} />
      <path d="M128 216 Q150 236 172 216" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth={6} strokeLinecap="round" />
      <rect x={136} y={176} width={28} height={40} rx={12} fill={sk} />
      <Arm x={84} y={248} angle={armR} elbow={elbowR} color={shirt} skin={sk} side={-1} />
      <Arm x={216} y={248} angle={armL} elbow={elbowL} color={shirt} skin={sk} side={1} />
      <g transform={`rotate(${headTilt} ${hx} ${hy + 50})`}>
        {hair === "hijab" ? <circle cx={hx} cy={hy - 4} r={r + 14} fill="#7b7877" /> : null}
        <circle cx={hx} cy={hy} r={r} fill={sk} />
        <circle cx={hx - r + 2} cy={hy + 10} r={12} fill={sk} />
        <circle cx={hx + r - 2} cy={hy + 10} r={12} fill={sk} />
        {hair === "short" ? <path d={`M${hx - r - 4} ${hy + 4} Q${hx - r} ${hy - r - 18} ${hx + 10} ${hy - r - 6} Q${hx + r + 10} ${hy - r + 4} ${hx + r + 4} ${hy + 6} Q${hx + 34} ${hy - 34} ${hx - 10} ${hy - 30} Q${hx - 46} ${hy - 26} ${hx - r - 4} ${hy + 4} Z`} fill={hc} /> : null}
        {hair === "pony" || hair === "bun" ? <path d={`M${hx - r - 2} ${hy + 8} Q${hx - r - 4} ${hy - r - 14} ${hx} ${hy - r - 4} Q${hx + r + 4} ${hy - r - 14} ${hx + r + 2} ${hy + 8} Q${hx + 20} ${hy - 44} ${hx - r - 2} ${hy + 8} Z`} fill={hc} /> : null}
        {hair === "bun" ? <circle cx={hx} cy={hy - r - 14} r={24} fill={hc} /> : null}
        {hair === "curly"
          ? new Array(9).fill(0).map((_, i) => {
              const a = Math.PI + (i / 8) * Math.PI;
              return <circle key={i} cx={hx + Math.cos(a) * (r - 4)} cy={hy - 6 + Math.sin(a) * (r - 4)} r={22} fill={hc} />;
            })
          : null}
        {hair === "hijab" ? <path d={`M${hx - r - 2} ${hy} Q${hx} ${hy - r - 30} ${hx + r + 2} ${hy} Q${hx} ${hy - r + 10} ${hx - r - 2} ${hy} Z`} fill="#6a6766" /> : null}
        {/* brows */}
        <path d={`M${hx - 36} ${eyeY - 22 - brow * 2} q12 ${-6 + brow * 8} 22 ${brow * 4}`} stroke={hc} strokeWidth={5} strokeLinecap="round" fill="none" />
        <path d={`M${hx + 14} ${eyeY - 22 + brow * 2} q10 ${-6 - brow * 4} 22 ${-brow * 8 + 6 - 6}`} stroke={hc} strokeWidth={5} strokeLinecap="round" fill="none" />
        {/* eyes */}
        {blink ? (
          <>
            <path d={`M${hx - 32} ${eyeY} h16`} stroke="#2a201c" strokeWidth={5} strokeLinecap="round" />
            <path d={`M${hx + 16} ${eyeY} h16`} stroke="#2a201c" strokeWidth={5} strokeLinecap="round" />
          </>
        ) : (
          <>
            <ellipse cx={hx - 24 + lookX * 4} cy={eyeY} rx={7} ry={mood === "excited" ? 9 : 8} fill="#2a201c" />
            <ellipse cx={hx + 24 + lookX * 4} cy={eyeY} rx={7} ry={mood === "excited" ? 9 : 8} fill="#2a201c" />
            <circle cx={hx - 22 + lookX * 4} cy={eyeY - 3} r={2.2} fill="#fff" />
            <circle cx={hx + 26 + lookX * 4} cy={eyeY - 3} r={2.2} fill="#fff" />
          </>
        )}
        {glasses ? (
          <g fill="none" stroke="#454242" strokeWidth={4}>
            <circle cx={hx - 24} cy={eyeY} r={17} />
            <circle cx={hx + 24} cy={eyeY} r={17} />
            <path d={`M${hx - 7} ${eyeY} h14`} />
          </g>
        ) : null}
        {/* cheeks */}
        {mood !== "worried" ? (
          <>
            <ellipse cx={hx - 40} cy={eyeY + 22} rx={11} ry={7} fill="#ed5f00" opacity={0.18} />
            <ellipse cx={hx + 40} cy={eyeY + 22} rx={11} ry={7} fill="#ed5f00" opacity={0.18} />
          </>
        ) : null}
        {/* mouth */}
        {mood === "worried" ? (
          <path d={`M${hx - 16} ${eyeY + 36} Q${hx} ${eyeY + 26 - talk * 6} ${hx + 16} ${eyeY + 36}`} stroke="#6b3a28" strokeWidth={5} strokeLinecap="round" fill="none" />
        ) : talk > 0.05 || mood === "excited" ? (
          <path
            d={`M${hx - 18} ${eyeY + 26} Q${hx} ${eyeY + 30 + 18 * Math.max(talk, mood === "excited" ? 0.8 : 0)} ${hx + 18} ${eyeY + 26} Z`}
            fill="#6b3a28"
            stroke="#6b3a28"
            strokeWidth={4}
            strokeLinejoin="round"
          />
        ) : (
          <path d={`M${hx - 16} ${eyeY + 26} Q${hx} ${eyeY + 40} ${hx + 16} ${eyeY + 26}`} stroke="#6b3a28" strokeWidth={5} strokeLinecap="round" fill="none" />
        )}
        {mood === "worried" ? (
          <path d={`M${hx + r - 6} ${hy - 30} q6 10 0 16 q-6 -6 0 -16`} fill="#7fc4ff" opacity={0.9} />
        ) : null}
      </g>
      {holding ? <g>{holding}</g> : null}
    </svg>
  );
};

/** Blink every ~2.5s, deterministic. */
export const isBlinking = (frame: number, offset = 0) => (frame + offset) % 76 < 3;
