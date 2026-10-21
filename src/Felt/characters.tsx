import React from "react";
import { ButtonEye, Felt, FELT, Stitch } from "./kit";

export type Who = "dad" | "mom" | "girl" | "boy";
export type Mood = "neutral" | "happy" | "laugh" | "sad" | "worried" | "confused" | "amazed";

type Props = {
  who: Who;
  size: number; // rendered width in px
  mood?: Mood;
  blink?: boolean;
  look?: number; // -1..1 pupils left/right
  sparkle?: number; // 0..1 starry eyes
  armL?: number; // degrees, 0 = hanging, + raises outward
  armR?: number;
  tilt?: number; // head tilt deg
  tears?: number; // 0..1
  blush?: number; // 0..1 extra cheek glow
};

const SPEC: Record<Who, { headR: number; bodyTop: number; bodyW: number; bodyH: number; shirt: string; pants: string; hair: string }> = {
  dad: { headR: 112, bodyTop: 250, bodyW: 150, bodyH: 120, shirt: "url(#stripes)", pants: "#9a9693", hair: FELT.hairBlack },
  mom: { headR: 108, bodyTop: 248, bodyW: 140, bodyH: 122, shirt: FELT.plum, pants: FELT.navy, hair: FELT.hairBrown },
  girl: { headR: 112, bodyTop: 252, bodyW: 124, bodyH: 100, shirt: FELT.orange, pants: FELT.navy, hair: FELT.hairBlack },
  boy: { headR: 116, bodyTop: 256, bodyW: 116, bodyH: 88, shirt: FELT.teal, pants: "#c9a36b", hair: FELT.hairBrown },
};

/** Needle-felted doll in the style of the client's reference: big head, button eyes, stubby limbs. viewBox 300x420. */
export const FeltPerson: React.FC<Props> = ({
  who,
  size,
  mood = "neutral",
  blink,
  look = 0,
  sparkle = 0,
  armL = 12,
  armR = 12,
  tilt = 0,
  tears = 0,
  blush = 0,
}) => {
  const s = SPEC[who];
  const hx = 150;
  const hy = 140;
  const r = s.headR;
  const eyeY = hy + 8;
  const eyeDx = r * 0.36;
  const eyeR = r * 0.1;
  const bodyBottom = s.bodyTop + s.bodyH;
  const sad = mood === "sad" || mood === "worried";
  const browLift = mood === "amazed" ? -14 : mood === "happy" || mood === "laugh" ? -6 : 0;

  const arm = (side: 1 | -1, ang: number) => {
    const sx = hx + side * (s.bodyW / 2 - 8);
    const sy = s.bodyTop + 26;
    return (
      <g transform={`rotate(${side * ang} ${sx} ${sy})`}>
        <ellipse cx={sx + side * 14} cy={sy + 40} rx={22} ry={46} fill={s.shirt === "url(#stripes)" ? "#f6f4f0" : s.shirt} />
        <circle cx={sx + side * 16} cy={sy + 86} r={20} fill={FELT.skin} />
      </g>
    );
  };

  const mouthY = hy + r * 0.48;
  let mouth: React.ReactNode;
  if (mood === "laugh" || mood === "amazed") {
    mouth =
      mood === "laugh" ? (
        <Felt>
          <path d={`M${hx - 26} ${mouthY - 6} Q${hx} ${mouthY + 34} ${hx + 26} ${mouthY - 6} Z`} fill="#8e2f2f" />
          <ellipse cx={hx} cy={mouthY + 12} rx={12} ry={6} fill="#e97a7a" />
        </Felt>
      ) : (
        <Felt>
          <ellipse cx={hx} cy={mouthY + 4} rx={11} ry={14} fill="#8e2f2f" />
        </Felt>
      );
  } else if (sad) {
    mouth = <path d={`M${hx - 20} ${mouthY + 10} Q${hx} ${mouthY - 6} ${hx + 20} ${mouthY + 10}`} stroke="#7a3a2e" strokeWidth={5} fill="none" strokeLinecap="round" />;
  } else if (mood === "confused") {
    mouth = <path d={`M${hx - 18} ${mouthY + 4} q9 -8 18 0 t18 0`} stroke="#7a3a2e" strokeWidth={5} fill="none" strokeLinecap="round" />;
  } else {
    const w = mood === "happy" ? 26 : 16;
    const dip = mood === "happy" ? 20 : 10;
    mouth = <path d={`M${hx - w} ${mouthY} Q${hx} ${mouthY + dip} ${hx + w} ${mouthY}`} stroke="#7a3a2e" strokeWidth={5} fill="none" strokeLinecap="round" />;
  }

  const brow = (side: 1 | -1) => {
    const bx = hx + side * eyeDx;
    const by = eyeY - eyeR - 22 + browLift;
    // sad/worried: inner ends lifted; confused: one brow up
    const inner = sad ? -10 : mood === "confused" && side === 1 ? -8 : 0;
    const outer = sad ? 6 : 0;
    return (
      <path
        d={`M${bx - side * 20} ${by + inner} Q${bx} ${by - 9 + (inner + outer) / 2} ${bx + side * 20} ${by + outer}`}
        stroke={s.hair}
        strokeWidth={who === "dad" ? 10 : 7}
        strokeLinecap="round"
        fill="none"
      />
    );
  };

  return (
    <svg width={size} height={(size * 420) / 300} viewBox="0 0 300 420" style={{ display: "block", overflow: "visible" }}>
      {/* back hair (long hair / pigtails) */}
      {who === "mom" ? (
        <Felt hair>
          <path d={`M${hx - r - 6} ${hy - 10} Q${hx - r - 30} ${hy + 150} ${hx - r + 10} ${hy + 175} L${hx + r - 10} ${hy + 175} Q${hx + r + 30} ${hy + 150} ${hx + r + 6} ${hy - 10} Z`} fill={s.hair} />
        </Felt>
      ) : null}
      {who === "girl" ? (
        <>
          <Felt hair>
            <ellipse cx={hx - r - 14} cy={hy + 50} rx={30} ry={52} fill={s.hair} transform={`rotate(14 ${hx - r - 14} ${hy + 50})`} />
            <ellipse cx={hx + r + 14} cy={hy + 50} rx={30} ry={52} fill={s.hair} transform={`rotate(-14 ${hx + r + 14} ${hy + 50})`} />
          </Felt>
          <Felt>
            <circle cx={hx - r + 4} cy={hy + 2} r={14} fill={FELT.orange} />
            <circle cx={hx + r - 4} cy={hy + 2} r={14} fill={FELT.orange} />
          </Felt>
        </>
      ) : null}

      {/* body */}
      <Felt shadow>
        {arm(-1, armR)}
        {arm(1, armL)}
        <path d={`M${hx - s.bodyW / 2} ${bodyBottom} Q${hx - s.bodyW / 2 - 6} ${s.bodyTop + 10} ${hx} ${s.bodyTop} Q${hx + s.bodyW / 2 + 6} ${s.bodyTop + 10} ${hx + s.bodyW / 2} ${bodyBottom} Z`} fill={s.shirt} />
        <ellipse cx={hx - s.bodyW * 0.24} cy={bodyBottom + 16} rx={s.bodyW * 0.24} ry={24} fill={s.pants} />
        <ellipse cx={hx + s.bodyW * 0.24} cy={bodyBottom + 16} rx={s.bodyW * 0.24} ry={24} fill={s.pants} />
      </Felt>
      {s.shirt !== "url(#stripes)" ? (
        <path d={`M${hx - s.bodyW / 2 + 6} ${bodyBottom - 4} Q${hx - s.bodyW / 2} ${s.bodyTop + 14} ${hx} ${s.bodyTop + 4} Q${hx + s.bodyW / 2} ${s.bodyTop + 14} ${hx + s.bodyW / 2 - 6} ${bodyBottom - 4} Z`} fill="url(#knit)" />
      ) : null}
      {who === "dad" ? (
        <>
          <Felt>
            <path d={`M${hx - 34} ${s.bodyTop + 4} L${hx} ${s.bodyTop + 34} L${hx - 8} ${s.bodyTop + 2} Z M${hx + 34} ${s.bodyTop + 4} L${hx} ${s.bodyTop + 34} L${hx + 8} ${s.bodyTop + 2} Z`} fill="#fbfaf7" />
          </Felt>
          {[0, 1, 2].map((k) => (
            <circle key={k} cx={hx} cy={s.bodyTop + 50 + k * 26} r={4} fill="#e9e3d8" stroke="#bdb6aa" strokeWidth={1} />
          ))}
        </>
      ) : null}
      {who === "boy" ? (
        <Felt>
          <path d={`M${hx - 40} ${s.bodyTop + 6} Q${hx} ${s.bodyTop + 40} ${hx + 40} ${s.bodyTop + 6}`} fill="none" stroke="#257a72" strokeWidth={10} />
        </Felt>
      ) : null}

      {/* head */}
      <g transform={`rotate(${tilt} ${hx} ${hy + r})`}>
        <Felt shadow>
          <circle cx={hx - r + 4} cy={hy + 14} r={20} fill={FELT.skin} />
          <circle cx={hx + r - 4} cy={hy + 14} r={20} fill={FELT.skin} />
          <circle cx={hx} cy={hy} r={r} fill={FELT.skin} />
        </Felt>
        {/* cheeks + nose */}
        <circle cx={hx - eyeDx - 12} cy={eyeY + 36} r={16} fill={FELT.cheek} opacity={0.45 + blush * 0.4} />
        <circle cx={hx + eyeDx + 12} cy={eyeY + 36} r={16} fill={FELT.cheek} opacity={0.45 + blush * 0.4} />
        <Felt>
          <ellipse cx={hx} cy={eyeY + 26} rx={11} ry={9} fill={FELT.skinShade} />
        </Felt>
        <ButtonEye x={hx - eyeDx} y={eyeY} r={eyeR} sparkle={sparkle} blink={blink} look={look} />
        <ButtonEye x={hx + eyeDx} y={eyeY} r={eyeR} sparkle={sparkle} blink={blink} look={look} />
        {who === "dad" ? (
          <Felt hair>
            {/* mustache wrapping into a goatee, as in the reference */}
            <path
              d={`M${hx - 40} ${mouthY - 2} Q${hx - 38} ${mouthY - 22} ${hx} ${mouthY - 16} Q${hx + 38} ${mouthY - 22} ${hx + 40} ${mouthY - 2} Q${hx + 34} ${mouthY + 48} ${hx} ${mouthY + 52} Q${hx - 34} ${mouthY + 48} ${hx - 40} ${mouthY - 2} Z M${hx - 22} ${mouthY - 2} Q${hx} ${mouthY - 6} ${hx + 22} ${mouthY - 2} Q${hx + 18} ${mouthY + 24} ${hx} ${mouthY + 26} Q${hx - 18} ${mouthY + 24} ${hx - 22} ${mouthY - 2} Z`}
              fill={s.hair}
              fillRule="evenodd"
            />
          </Felt>
        ) : null}
        {mouth}
        {tears > 0 ? (
          <Felt opacity={tears}>
            <path d={`M${hx - eyeDx + 4} ${eyeY + 18} q-8 16 0 22 q8 -6 0 -22 Z`} fill="#7fc4ef" />
          </Felt>
        ) : null}
        {/* front hair */}
        <Felt hair>
          {who === "dad" ? (
            <path d={`M${hx - r - 8} ${hy + 20} Q${hx - r - 20} ${hy - r - 10} ${hx} ${hy - r - 22} Q${hx + r + 20} ${hy - r - 10} ${hx + r + 8} ${hy + 20} Q${hx + r - 6} ${hy - 30} ${hx + 40} ${hy - 58} Q${hx} ${hy - 44} ${hx - 50} ${hy - 58} Q${hx - r + 6} ${hy - 30} ${hx - r - 8} ${hy + 20} Z`} fill={s.hair} />
          ) : null}
          {who === "mom" ? (
            <path d={`M${hx - r - 6} ${hy + 30} Q${hx - r - 10} ${hy - r - 12} ${hx + 10} ${hy - r - 8} Q${hx + r + 14} ${hy - r + 10} ${hx + r + 6} ${hy + 40} Q${hx + r - 20} ${hy - 40} ${hx + 20} ${hy - 62} Q${hx - 40} ${hy - 40} ${hx - r + 18} ${hy + 10} Z`} fill={s.hair} />
          ) : null}
          {who === "girl" ? (
            <path d={`M${hx - r - 4} ${hy + 14} Q${hx - r - 6} ${hy - r - 10} ${hx} ${hy - r - 10} Q${hx + r + 6} ${hy - r - 10} ${hx + r + 4} ${hy + 14} Q${hx + r - 10} ${hy - 44} ${hx + 30} ${hy - 50} Q${hx - 10} ${hy - 70} ${hx - 60} ${hy - 44} Q${hx - r + 10} ${hy - 30} ${hx - r - 4} ${hy + 14} Z`} fill={s.hair} />
          ) : null}
          {who === "boy" ? (
            <path d={`M${hx - r} ${hy - 10} Q${hx - r + 4} ${hy - r - 16} ${hx} ${hy - r - 14} Q${hx + r - 4} ${hy - r - 16} ${hx + r} ${hy - 10} Q${hx + 50} ${hy - 60} ${hx + 10} ${hy - 70} L${hx + 20} ${hy - r - 40} L${hx - 10} ${hy - r - 10} Q${hx - 60} ${hy - 60} ${hx - r} ${hy - 10} Z`} fill={s.hair} />
          ) : null}
        </Felt>
        {/* brows sit on top of the fringe so expressions always read */}
        {brow(-1)}
        {brow(1)}
        {/* a stitched seam on the head, as on real felt dolls */}
        <Stitch d={`M${hx - r * 0.7} ${hy + r * 0.72} Q${hx} ${hy + r * 1.02} ${hx + r * 0.7} ${hy + r * 0.72}`} color="rgba(255,255,255,0.45)" width={2} dash="6 6" />
      </g>
    </svg>
  );
};

/** Deterministic blink every ~3 s. */
export const blinkAt = (frame: number, offset = 0) => (Math.floor(frame) + offset) % 96 < 4;
