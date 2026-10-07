import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS } from "../timeline";
import { EN, FA } from "../fonts";
import { bounce, clamp01, easeIn, easeInOut, jitter, pop, prog, wobble } from "../lib/anim";
import { Burst, Card, Doodles, Marker, Paper, Shockwave } from "../lib/visual";
import { KineticText } from "../lib/KineticText";
import { Cutout } from "../art/Photo";
import { LaptopIcon } from "../art/Icons";

/** Handwritten formula revealed left-to-right like a marker writing it. */
const Scribble: React.FC<{ text: string; x: number; y: number; at: number; rot: number; size?: number; color?: string; frame: number; strike?: boolean }> = ({
  text,
  x,
  y,
  at,
  rot,
  size = 46,
  color = COLORS.title,
  frame,
  strike,
}) => {
  const p = prog(frame, at, 14, easeInOut);
  const sp = prog(frame, at + 22, 8);
  const float = Math.sin((frame + x) / 18) * 6;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + float,
        transform: `rotate(${rot + jitter(frame, x, 0.4, 4)}deg)`,
        fontFamily: EN,
        fontWeight: 700,
        fontSize: size,
        color,
        direction: "ltr",
        whiteSpace: "nowrap",
        clipPath: `inset(-20% ${100 - p * 100}% -20% -5%)`,
      }}
    >
      {text}
      {strike ? (
        <svg viewBox="0 0 200 40" preserveAspectRatio="none" style={{ position: "absolute", left: -8, top: "10%", width: "110%", height: "80%", overflow: "visible" }}>
          <Marker d="M2 30 C60 10 120 36 198 8" p={sp} color={COLORS.red} width={6} />
        </svg>
      ) : null}
    </div>
  );
};

const Book: React.FC<{ frame: number; at: number; x: number; ground: number; w: number; h: number; color: string; rot: number; h0: number }> = ({
  frame,
  at,
  x,
  ground,
  w,
  h,
  color,
  rot,
  h0,
}) => {
  const b = bounce(frame - at, h0, 6400, 0.32);
  if (frame < at) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: ground - h - b.y,
        width: w,
        height: h,
        transform: `rotate(${rot * (b.landed ? 0.2 : 1) + wobble(frame - at - 6, 3)}deg) scale(${1 + b.squash * 0.12}, ${1 - b.squash * 0.18})`,
        transformOrigin: "50% 100%",
        background: color,
        borderRadius: 10,
        boxShadow: "inset 0 -10px 0 rgba(255,255,255,0.9), 0 10px 20px rgba(80,50,30,0.18)",
      }}
    >
      <div style={{ position: "absolute", left: 18, top: 12, width: w * 0.35, height: 8, borderRadius: 4, background: "rgba(255,255,255,0.7)" }} />
    </div>
  );
};

export const S1Problem: React.FC = () => {
  const frame = useCurrentFrame();

  // camera: gentle push-in, then a quick zoom towards the question mark dot at the end
  const push = 1 + frame * 0.0008;
  const outro = prog(frame, 100, 17, easeIn);

  // laptop search -> "no results"
  const typed = "Math tutor near me".slice(0, Math.floor(clamp01((frame - 18) / 22) * 18));
  const noResult = pop(frame, 46);
  const shake = frame > 46 && frame < 60 ? Math.sin(frame * 2.4) * 10 * (1 - (frame - 46) / 14) : 0;

  // student
  const studentIn = pop(frame, 2, 160, 14);

  // big question mark drops with real bounce
  const q = bounce(frame - 62, 700, 7200, 0.42);
  const qSquash = q.squash;
  const qVisible = frame >= 62;

  // dot of the question mark becomes the orange iris for the next scene
  const qx = 900;
  const qGround = 1290;
  const dotScale = 1 + outro * 120;

  return (
    <AbsoluteFill style={{ transform: `scale(${push})` }}>
      <Paper />
      <Doodles frame={frame} seed={1} opacity={0.45} />

      {/* formulas written around */}
      <Scribble frame={frame} text="x² + 5x − 6 = ?" x={70} y={720} at={4} rot={-6} size={62} strike />
      <Scribble frame={frame} text="F = m · a" x={700} y={650} at={10} rot={7} size={60} color={COLORS.blue} />
      <Scribble frame={frame} text="H₂O + CO₂ → ?" x={420} y={1110} at={16} rot={-4} color={COLORS.teal} size={50} strike />
      <Scribble frame={frame} text="a² + b² = c²" x={560} y={860} at={22} rot={5} color={COLORS.purple} size={50} />
      <Scribble frame={frame} text="∫ ?" x={380} y={740} at={30} rot={-10} color={COLORS.red} size={72} />

      {/* desk line */}
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        <Marker d="M50 1700 C360 1688 720 1710 1030 1696" p={prog(frame, 0, 16)} color={COLORS.title} width={7} />
      </svg>

      {/* real student, seen from behind, stuck in front of the laptop */}
      <div
        style={{
          position: "absolute",
          left: -70,
          top: 900 + (1 - studentIn) * 400,
          transform: `rotate(${shake * 0.12}deg)`,
          transformOrigin: "50% 100%",
        }}
      >
        <Cutout name="kid-back" height={1040} frame={frame} seed={1} />
      </div>

      {/* laptop */}
      <div style={{ position: "absolute", left: 500 + shake, top: 1420, transform: `scale(${pop(frame, 6)})`, transformOrigin: "50% 100%" }}>
        <LaptopIcon
          size={410}
          screen={
            <g>
              <rect x="36" y="22" width="88" height="14" rx="7" fill="#f2ece7" />
              <text x="42" y="32.5" fontFamily={EN} fontSize="7.5" fill={COLORS.title} fontWeight={500}>
                {typed}
                {frame % 16 < 8 && frame < 46 ? "|" : ""}
              </text>
              <g transform={`translate(80 56) scale(${noResult})`}>
                <circle r="11" fill={COLORS.red} opacity={0.12} />
                <path d="M-5 -5 L5 5 M5 -5 L-5 5" stroke={COLORS.red} strokeWidth="3" strokeLinecap="round" />
              </g>
            </g>
          }
        />
      </div>

      {/* falling textbooks with physics */}
      <Book frame={frame} at={8} x={900} ground={1700} w={170} h={56} color={COLORS.orange} rot={-14} h0={900} />
      <Book frame={frame} at={14} x={912} ground={1644} w={150} h={50} color={COLORS.teal} rot={10} h0={950} />
      <Book frame={frame} at={20} x={905} ground={1594} w={160} h={48} color={COLORS.purple} rot={-8} h0={1000} />
      <Shockwave frame={frame - 15} x={985} y={1700} color={COLORS.title} max={180} />

      {/* "no results" sticker */}
      <div
        style={{
          position: "absolute",
          left: 430,
          top: 1270,
          transform: `rotate(-6deg) scale(${noResult})`,
          transformOrigin: "0% 100%",
        }}
      >
        <Card radius={24} pad={18} style={{ fontFamily: FA, fontWeight: 800, fontSize: 34, color: COLORS.red, whiteSpace: "nowrap" }}>
          نتیجه‌ای پیدا نشد
        </Card>
      </div>

      {/* headline */}
      <div style={{ position: "absolute", top: 210, left: 0, right: 0 }}>
        <KineticText text={"برای درس‌های مدرسه،"} frame={frame} start={10} size={76} weight={800} color={COLORS.secondary} exitAt={100} />
        <div style={{ height: 12 }} />
        <KineticText
          text={"معلم خصوصی مناسب\nپیدا نکردی؟"}
          frame={frame}
          start={22}
          size={108}
          stagger={4}
          accent={["مناسب"]}
          circle={["مناسب"]}
          exitAt={100}
        />
      </div>

      {/* big physics question mark */}
      {qVisible ? (
        <div
          style={{
            position: "absolute",
            left: qx - 90,
            top: qGround - 300 - q.y,
            width: 180,
            height: 300,
            transformOrigin: "50% 100%",
            transform: `scale(${1 + qSquash * 0.35}, ${1 - qSquash * 0.4}) rotate(${wobble(frame - 70, 8)}deg)`,
          }}
        >
          <svg viewBox="0 0 180 300" width={180} height={300} style={{ overflow: "visible" }}>
            <path d="M40 80 C40 20 140 20 140 80 C140 130 90 130 90 180 V196" fill="none" stroke={COLORS.title} strokeWidth={34} strokeLinecap="round" />
            <circle cx={90} cy={262} r={22 * dotScale} fill={COLORS.logo} />
          </svg>
        </div>
      ) : null}
      <Burst frame={frame - 72} x={qx} y={qGround} count={14} power={20} seed={3} />
      <Shockwave frame={frame - 72} x={qx} y={qGround} />
    </AbsoluteFill>
  );
};
