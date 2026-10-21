import React from "react";
import { ButtonEye, Felt, FELT, Stitch } from "./kit";

export type Who = "dad" | "mom" | "girl" | "boy" | "kid" | "adult";
export type Mood = "neutral" | "happy" | "laugh" | "sad" | "worried" | "confused" | "amazed";
export type HairStyle = "short" | "long" | "pigtails" | "bob";

type Look = {
  hairStyle: HairStyle;
  hair: string;
  top: string; // sweater / shirt colour ("stripes" = the dad's shirt)
  cardigan?: string;
  pants: string;
  shoes: string;
  child: boolean;
  beard?: boolean;
  lashes?: boolean;
  backpack?: string;
  bows?: string;
  watch?: boolean;
};

// Family, after the client's reference photo of the felt dolls.
const FAMILY: Record<"dad" | "mom" | "girl" | "boy", Look> = {
  dad: { hairStyle: "short", hair: "#1c1817", top: "stripes", pants: "#8e8b88", shoes: "#6b4a32", child: false, beard: true, watch: true },
  mom: { hairStyle: "long", hair: "#4b2c1d", top: "#f2ebdf", cardigan: "#c0634a", pants: "#3f6680", shoes: "#7a4f33", child: false, lashes: true },
  girl: { hairStyle: "pigtails", hair: "#4b2c1d", top: "#d1a43c", pants: "#7096bb", shoes: "#f6f2ea", child: true, lashes: true, backpack: "#a98fc6", bows: FELT.orange },
  boy: { hairStyle: "short", hair: "#1c1817", top: "#6f9a5a", pants: "#b89268", shoes: "#5f8a52", child: true },
};

type Props = {
  who: Who;
  size: number; // rendered width in px (height = 2 × width)
  mood?: Mood;
  blink?: boolean;
  look?: number; // -1..1 pupils left/right
  sparkle?: number; // 0..1 starry eyes
  armL?: number; // degrees, 0 = hanging, + raises outward
  armR?: number;
  tilt?: number; // head tilt deg
  tears?: number; // 0..1
  blush?: number; // 0..1 extra cheek glow
  noBackpack?: boolean;
  // overrides for classmates / other people
  hairStyle?: HairStyle;
  hairColor?: string;
  top?: string;
  pants?: string;
  bows?: string;
};

/** Standing needle-felted doll (viewBox 300×600): big head, button eyes, stubby limbs, felt clothes. */
export const FeltPerson: React.FC<Props> = ({
  who,
  size,
  mood = "neutral",
  blink,
  look = 0,
  sparkle = 0,
  armL = 6,
  armR = 6,
  tilt = 0,
  tears = 0,
  blush = 0,
  noBackpack,
  hairStyle,
  hairColor,
  top,
  pants,
  bows,
}) => {
  const base: Look =
    who === "kid"
      ? { hairStyle: "short", hair: FELT.hairBrown, top: FELT.blue, pants: FELT.navy, shoes: "#f6f2ea", child: true }
      : who === "adult"
        ? { hairStyle: "bob", hair: FELT.hairBrown, top: FELT.teal, pants: FELT.navy, shoes: "#6b4a32", child: false }
        : FAMILY[who];
  const L: Look = {
    ...base,
    ...(hairStyle ? { hairStyle } : {}),
    ...(hairColor ? { hair: hairColor } : {}),
    ...(top ? { top } : {}),
    ...(pants ? { pants } : {}),
    ...(bows ? { bows } : {}),
    ...(noBackpack ? { backpack: undefined } : {}),
  };
  if (L.hairStyle === "pigtails" && !L.bows) L.bows = FELT.orange;

  const hx = 150;
  const hy = L.child ? 150 : 140;
  const r = L.child ? 104 : 98;
  const neck = hy + r - 6;
  const torsoTop = neck + 6;
  const torsoH = L.child ? 150 : 175;
  const torsoW = L.child ? 150 : 170;
  const hip = torsoTop + torsoH;
  const legH = 580 - 26 - hip;
  const eyeY = hy + 10;
  const eyeDx = r * 0.36;
  const eyeR = r * 0.11;
  const sad = mood === "sad" || mood === "worried";
  const browLift = mood === "amazed" ? -12 : mood === "happy" || mood === "laugh" ? -5 : 0;
  const topFill = L.top === "stripes" ? "url(#stripes)" : L.top;
  const sleeve = L.cardigan ?? (L.top === "stripes" ? "#f6f4f0" : L.top);

  const arm = (side: 1 | -1, ang: number) => {
    const sx = hx + side * (torsoW / 2 - 12);
    const sy = torsoTop + 22;
    const len = L.child ? 120 : 140;
    return (
      <g transform={`rotate(${-side * ang} ${sx} ${sy})`}>
        <rect x={sx - 22 + side * 10} y={sy - 8} width={44} height={len} rx={22} fill={sleeve} />
        {L.top === "stripes" ? <rect x={sx - 22 + side * 10} y={sy + len - 52} width={44} height={22} rx={8} fill="#e9e5de" /> : null}
        <circle cx={sx + side * 10} cy={sy + len + 6} r={22} fill={FELT.skin} />
        {L.watch && side === 1 ? <rect x={sx - 14 + side * 10} y={sy + len - 22} width={30} height={14} rx={4} fill="#8a7a3a" /> : null}
      </g>
    );
  };

  const mouthY = hy + r * 0.5;
  let mouth: React.ReactNode;
  if (mood === "laugh") {
    mouth = (
      <Felt>
        <path d={`M${hx - 24} ${mouthY - 6} Q${hx} ${mouthY + 32} ${hx + 24} ${mouthY - 6} Z`} fill="#8e2f2f" />
        <ellipse cx={hx} cy={mouthY + 11} rx={11} ry={6} fill="#e97a7a" />
      </Felt>
    );
  } else if (mood === "amazed") {
    mouth = (
      <Felt>
        <ellipse cx={hx} cy={mouthY + 4} rx={10} ry={13} fill="#8e2f2f" />
      </Felt>
    );
  } else if (sad) {
    mouth = <path d={`M${hx - 18} ${mouthY + 10} Q${hx} ${mouthY - 6} ${hx + 18} ${mouthY + 10}`} stroke="#7a3a2e" strokeWidth={5} fill="none" strokeLinecap="round" />;
  } else if (mood === "confused") {
    mouth = <path d={`M${hx - 18} ${mouthY + 4} q9 -8 18 0 t18 0`} stroke="#7a3a2e" strokeWidth={5} fill="none" strokeLinecap="round" />;
  } else {
    const w = mood === "happy" ? 22 : 14;
    const dip = mood === "happy" ? 18 : 9;
    mouth = <path d={`M${hx - w} ${mouthY} Q${hx} ${mouthY + dip} ${hx + w} ${mouthY}`} stroke="#7a3a2e" strokeWidth={5} fill="none" strokeLinecap="round" />;
  }

  const brow = (side: 1 | -1) => {
    const bx = hx + side * eyeDx;
    const by = eyeY - eyeR - 20 + browLift;
    const inner = sad ? -10 : mood === "confused" && side === 1 ? -8 : 0;
    const outer = sad ? 6 : 0;
    return (
      <path
        d={`M${bx - side * 18} ${by + inner} Q${bx} ${by - 8 + (inner + outer) / 2} ${bx + side * 18} ${by + outer}`}
        stroke={L.beard ? "#1c1817" : "#3a2418"}
        strokeWidth={L.beard ? 10 : 6}
        strokeLinecap="round"
        fill="none"
      />
    );
  };

  const legW = L.child ? 54 : 64;
  return (
    <svg width={size} height={size * 2} viewBox="0 0 300 600" style={{ display: "block", overflow: "visible" }}>
      {/* back hair */}
      {L.hairStyle === "long" ? (
        <Felt hair>
          <path d={`M${hx - r - 8} ${hy - 6} Q${hx - r - 34} ${hy + 170} ${hx - r + 4} ${hy + 250} L${hx + r - 4} ${hy + 250} Q${hx + r + 34} ${hy + 170} ${hx + r + 8} ${hy - 6} Z`} fill={L.hair} />
        </Felt>
      ) : null}
      {L.hairStyle === "pigtails" ? (
        <Felt hair>
          <path d={`M${hx - r - 6} ${hy + 6} Q${hx - r - 58} ${hy + 90} ${hx - r - 34} ${hy + 200} Q${hx - r - 6} ${hy + 150} ${hx - r + 12} ${hy + 40} Z`} fill={L.hair} />
          <path d={`M${hx + r + 6} ${hy + 6} Q${hx + r + 58} ${hy + 90} ${hx + r + 34} ${hy + 200} Q${hx + r + 6} ${hy + 150} ${hx + r - 12} ${hy + 40} Z`} fill={L.hair} />
        </Felt>
      ) : null}
      {L.backpack ? (
        <Felt shadow>
          <rect x={hx - torsoW / 2 - 6} y={torsoTop + 10} width={torsoW + 12} height={torsoH - 30} rx={30} fill={L.backpack} />
        </Felt>
      ) : null}

      {/* legs + shoes */}
      <Felt shadow>
        <rect x={hx - legW - 4} y={hip - 20} width={legW} height={legH + 20} rx={18} fill={L.pants} />
        <rect x={hx + 4} y={hip - 20} width={legW} height={legH + 20} rx={18} fill={L.pants} />
        <rect x={hx - legW - 8} y={hip + legH - 22} width={legW + 8} height={20} rx={8} fill={L.pants} />
        <rect x={hx} y={hip + legH - 22} width={legW + 8} height={20} rx={8} fill={L.pants} />
        <ellipse cx={hx - legW / 2 - 8} cy={566} rx={legW / 2 + 12} ry={20} fill={L.shoes} />
        <ellipse cx={hx + legW / 2 + 8} cy={566} rx={legW / 2 + 12} ry={20} fill={L.shoes} />
      </Felt>
      {L.shoes === "#f6f2ea" ? (
        <>
          <path d={`M${hx - legW - 14} 568 h${legW + 12}`} stroke={FELT.red} strokeWidth={4} />
          <path d={`M${hx + 2} 568 h${legW + 12}`} stroke={FELT.red} strokeWidth={4} />
        </>
      ) : null}

      {/* torso + arms */}
      <Felt shadow>
        {arm(-1, armR)}
        {arm(1, armL)}
        <path d={`M${hx - torsoW / 2} ${hip} Q${hx - torsoW / 2 - 4} ${torsoTop + 8} ${hx} ${torsoTop} Q${hx + torsoW / 2 + 4} ${torsoTop + 8} ${hx + torsoW / 2} ${hip} Z`} fill={topFill} />
        {L.cardigan ? (
          <>
            <path d={`M${hx - torsoW / 2} ${hip} Q${hx - torsoW / 2 - 4} ${torsoTop + 8} ${hx - 20} ${torsoTop + 2} L${hx - 26} ${hip} Z`} fill={L.cardigan} />
            <path d={`M${hx + torsoW / 2} ${hip} Q${hx + torsoW / 2 + 4} ${torsoTop + 8} ${hx + 20} ${torsoTop + 2} L${hx + 26} ${hip} Z`} fill={L.cardigan} />
          </>
        ) : null}
      </Felt>
      {L.top !== "stripes" ? (
        <path d={`M${hx - torsoW / 2 + 6} ${hip - 4} Q${hx - torsoW / 2} ${torsoTop + 12} ${hx} ${torsoTop + 4} Q${hx + torsoW / 2} ${torsoTop + 12} ${hx + torsoW / 2 - 6} ${hip - 4} Z`} fill="url(#knit)" opacity={L.cardigan ? 0.4 : 1} />
      ) : null}
      {L.top === "stripes" ? (
        <>
          <Felt>
            <path d={`M${hx - 40} ${torsoTop + 2} L${hx} ${torsoTop + 36} L${hx - 10} ${torsoTop} Z M${hx + 40} ${torsoTop + 2} L${hx} ${torsoTop + 36} L${hx + 10} ${torsoTop} Z`} fill="#fbfaf7" />
          </Felt>
          {[0, 1, 2, 3].map((k) => (
            <circle key={k} cx={hx} cy={torsoTop + 52 + k * 30} r={4.5} fill="#ece7dd" stroke="#bdb6aa" strokeWidth={1} />
          ))}
        </>
      ) : null}
      {L.cardigan ? [0, 1, 2].map((k) => <circle key={k} cx={hx - 30} cy={torsoTop + 60 + k * 36} r={6} fill="#7a4a30" />) : null}
      {L.backpack ? (
        <Felt>
          <rect x={hx - 52} y={torsoTop + 2} width={20} height={torsoH - 30} rx={8} fill={L.backpack} />
          <rect x={hx + 32} y={torsoTop + 2} width={20} height={torsoH - 30} rx={8} fill={L.backpack} />
        </Felt>
      ) : null}
      {L.top !== "stripes" && !L.cardigan ? (
        <Felt>
          <path d={`M${hx - 34} ${torsoTop + 4} Q${hx} ${torsoTop + 26} ${hx + 34} ${torsoTop + 4}`} fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth={10} strokeLinecap="round" />
        </Felt>
      ) : null}

      {/* head */}
      <g transform={`rotate(${tilt} ${hx} ${hy + r})`}>
        <Felt shadow>
          <circle cx={hx - r + 2} cy={hy + 16} r={19} fill={FELT.skin} />
          <circle cx={hx + r - 2} cy={hy + 16} r={19} fill={FELT.skin} />
          <circle cx={hx} cy={hy} r={r} fill={FELT.skin} />
        </Felt>
        <circle cx={hx - eyeDx - 10} cy={eyeY + 32} r={15} fill={FELT.cheek} opacity={0.45 + blush * 0.4} />
        <circle cx={hx + eyeDx + 10} cy={eyeY + 32} r={15} fill={FELT.cheek} opacity={0.45 + blush * 0.4} />
        <Felt>
          <ellipse cx={hx} cy={eyeY + 24} rx={10} ry={8} fill={FELT.skinShade} />
        </Felt>
        <ButtonEye x={hx - eyeDx} y={eyeY} r={eyeR} sparkle={sparkle} blink={blink} look={look} />
        <ButtonEye x={hx + eyeDx} y={eyeY} r={eyeR} sparkle={sparkle} blink={blink} look={look} />
        {L.lashes && !blink ? (
          <>
            <path d={`M${hx - eyeDx - eyeR} ${eyeY - eyeR * 0.6} l-8 -6 M${hx - eyeDx - eyeR * 0.6} ${eyeY - eyeR} l-5 -8`} stroke="#151212" strokeWidth={3} strokeLinecap="round" />
            <path d={`M${hx + eyeDx + eyeR} ${eyeY - eyeR * 0.6} l8 -6 M${hx + eyeDx + eyeR * 0.6} ${eyeY - eyeR} l5 -8`} stroke="#151212" strokeWidth={3} strokeLinecap="round" />
          </>
        ) : null}
        {L.beard ? (
          <Felt hair>
            <path
              d={`M${hx - 38} ${mouthY - 2} Q${hx - 36} ${mouthY - 22} ${hx} ${mouthY - 16} Q${hx + 36} ${mouthY - 22} ${hx + 38} ${mouthY - 2} Q${hx + 32} ${mouthY + 46} ${hx} ${mouthY + 50} Q${hx - 32} ${mouthY + 46} ${hx - 38} ${mouthY - 2} Z M${hx - 20} ${mouthY - 2} Q${hx} ${mouthY - 6} ${hx + 20} ${mouthY - 2} Q${hx + 16} ${mouthY + 22} ${hx} ${mouthY + 24} Q${hx - 16} ${mouthY + 22} ${hx - 20} ${mouthY - 2} Z`}
              fill={L.hair}
              fillRule="evenodd"
            />
          </Felt>
        ) : null}
        {mouth}
        {tears > 0 ? (
          <Felt opacity={tears}>
            <path d={`M${hx - eyeDx + 2} ${eyeY + 16} q-8 16 0 22 q8 -6 0 -22 Z`} fill="#7fc4ef" />
          </Felt>
        ) : null}
        {/* front hair */}
        <Felt hair>
          {L.hairStyle === "short" ? (
            <path d={`M${hx - r - 8} ${hy + 22} Q${hx - r - 18} ${hy - r - 12} ${hx} ${hy - r - 20} Q${hx + r + 18} ${hy - r - 12} ${hx + r + 8} ${hy + 22} Q${hx + r - 8} ${hy - 30} ${hx + 40} ${hy - 56} Q${hx} ${hy - 42} ${hx - 48} ${hy - 56} Q${hx - r + 8} ${hy - 30} ${hx - r - 8} ${hy + 22} Z`} fill={L.hair} />
          ) : null}
          {L.hairStyle === "long" ? (
            <path d={`M${hx - r - 8} ${hy + 40} Q${hx - r - 12} ${hy - r - 14} ${hx + 6} ${hy - r - 10} Q${hx + r + 14} ${hy - r + 6} ${hx + r + 8} ${hy + 50} Q${hx + r - 22} ${hy - 36} ${hx + 18} ${hy - 60} Q${hx - 40} ${hy - 40} ${hx - r + 16} ${hy + 18} Z`} fill={L.hair} />
          ) : null}
          {L.hairStyle === "pigtails" || L.hairStyle === "bob" ? (
            <path d={`M${hx - r - 6} ${hy + (L.hairStyle === "bob" ? 70 : 16)} Q${hx - r - 8} ${hy - r - 10} ${hx} ${hy - r - 10} Q${hx + r + 8} ${hy - r - 10} ${hx + r + 6} ${hy + (L.hairStyle === "bob" ? 70 : 16)} Q${hx + r - 10} ${hy - 40} ${hx + 26} ${hy - 48} Q${hx - 6} ${hy - 66} ${hx - 54} ${hy - 42} Q${hx - r + 10} ${hy - 26} ${hx - r - 6} ${hy + (L.hairStyle === "bob" ? 70 : 16)} Z`} fill={L.hair} />
          ) : null}
        </Felt>
        {L.hairStyle === "pigtails" && L.bows ? (
          <Felt>
            {[-1, 1].map((side) => {
              const bx = hx + side * (r - 2);
              const by = hy - 10;
              return (
                <g key={side}>
                  <path d={`M${bx} ${by} L${bx - 26} ${by - 18} L${bx - 26} ${by + 18} Z M${bx} ${by} L${bx + 26} ${by - 18} L${bx + 26} ${by + 18} Z`} fill={L.bows} />
                  <circle cx={bx} cy={by} r={9} fill={L.bows} />
                </g>
              );
            })}
          </Felt>
        ) : null}
        {brow(-1)}
        {brow(1)}
        <Stitch d={`M${hx - r * 0.7} ${hy + r * 0.72} Q${hx} ${hy + r * 1.02} ${hx + r * 0.7} ${hy + r * 0.72}`} color="rgba(255,255,255,0.45)" width={2} dash="6 6" />
      </g>
    </svg>
  );
};

/** Deterministic blink every ~3 s. */
export const blinkAt = (frame: number, offset = 0) => (Math.floor(frame) + offset) % 96 < 4;
