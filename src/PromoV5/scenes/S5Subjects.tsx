import React from "react";
import { AbsoluteFill } from "remotion";
import { useStoryFrame } from "../lib/time";
import { COLORS, SUBJECT_INTRO, SUBJECT_LAST_LEN, SUBJECT_LEN } from "../timeline";
import { EN, FA } from "../fonts";
import { bounce, clamp01, easeInOut, easeOut, lerp, pop, prog, rand, wobble } from "../lib/anim";
import { Burst, Marker } from "../lib/visual";
import { KineticText } from "../lib/KineticText";
import { Cutout, PhotoFill } from "../art/Photo";
import { SaraStudying } from "../art/Studying";

type Subject = { name: string; color: string; bg: string; Visual: React.FC<{ f: number }>; origin: [number, number] };

/* ---------------------------------------------------------------- Math */
const MathVisual: React.FC<{ f: number }> = ({ f }) => {
  const draw = prog(f, 2, 14, easeInOut);
  // ball rolls along y = x² (in graph units), released from the left rim
  const u = Math.cos((Math.max(0, f - 8) / 30) * Math.PI * 2.2) * Math.exp(-Math.max(0, f - 8) / 40) * -0.9;
  const px = 540 + u * 340;
  const py = 1300 - 420 * u * u; // point on the drawn parabola (quadratic bezier)
  const sym = ["π", "√", "∑", "÷", "∞", "x²"];
  const compass = prog(f, 6, 20, easeInOut);
  return (
    <>
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <pattern id="v5gp" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="rgba(237,95,0,0.12)" strokeWidth="2" />
          </pattern>
        </defs>
        <rect width={1080} height={1920} fill="url(#v5gp)" />
        <Marker d="M100 1300 H980 M540 1420 V700" p={prog(f, 0, 8)} color={COLORS.title} width={6} rough={false} />
        <Marker d="M200 880 Q540 1720 880 880" p={draw} color={COLORS.orange} width={12} />
        <circle cx={540} cy={1060} r={250} fill="none" stroke={COLORS.blue} strokeWidth={6} strokeDasharray={`${compass * 1571} 1571`} transform="rotate(-90 540 1060)" opacity={0.5} />
      </svg>
      <div style={{ position: "absolute", left: px - 40, top: py - 78, width: 80, height: 80, borderRadius: 40, background: COLORS.title, opacity: draw > 0.9 ? 1 : 0 }} />
      {sym.map((s, k) => {
        const p = pop(f, 3 + k * 2, 200, 10);
        const a = (k / sym.length) * Math.PI * 2 + f * 0.03;
        return (
          <div key={s} style={{ position: "absolute", left: 540 + Math.cos(a) * 400 - 60, top: 1060 + Math.sin(a) * 520 - 60, width: 120, height: 120, fontFamily: EN, fontWeight: 800, fontSize: 90, color: k % 2 ? COLORS.orange : COLORS.title, textAlign: "center", transform: `scale(${p}) rotate(${(1 - p) * 90}deg)` }}>
            {s}
          </div>
        );
      })}
      <div style={{ position: "absolute", left: 30, top: 1290 + (1 - pop(f, 4, 170, 14)) * 500 }}>
        <SaraStudying height={400} frame={f} seed={8} />
      </div>
    </>
  );
};

/* ---------------------------------------------------------------- Science */
const Gear: React.FC<{ x: number; y: number; r: number; rot: number; color: string }> = ({ x, y, r, rot, color }) => {
  const teeth = 10;
  let d = "";
  for (let i = 0; i < teeth * 2; i++) {
    const a = (i / (teeth * 2)) * Math.PI * 2;
    const rr = i % 2 === 0 ? r : r * 0.8;
    d += `${i === 0 ? "M" : "L"}${(Math.cos(a) * rr).toFixed(1)} ${(Math.sin(a) * rr).toFixed(1)}`;
  }
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <path d={`${d}Z`} fill={color} strokeLinejoin="round" stroke={color} strokeWidth={10} />
      <circle r={r * 0.32} fill="#e6f6f3" />
    </g>
  );
};
const ScienceVisual: React.FC<{ f: number }> = ({ f }) => {
  const on = prog(f, 8, 4);
  const grow = prog(f, 4, 22, easeOut);
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <Gear x={250} y={1450} r={130} rot={f * 6} color={COLORS.teal} />
      <Gear x={430} y={1600} r={90} rot={-f * 8.6 + 9} color={COLORS.title} />
      {/* bulb */}
      <g transform={`translate(560 980) scale(${pop(f, 0, 200, 11)})`}>
        {new Array(10).fill(0).map((_, k) => {
          const a = (k / 10) * Math.PI * 2;
          return <line key={k} x1={Math.cos(a) * 230} y1={Math.sin(a) * 230 - 40} x2={Math.cos(a) * (230 + 90 * on)} y2={Math.sin(a) * (230 + 90 * on) - 40} stroke={COLORS.yellow} strokeWidth={16} strokeLinecap="round" opacity={on} />;
        })}
        <circle cy={-40} r={200} fill={COLORS.yellow} opacity={0.25 * on} />
        <path d="M-150 -40 A150 150 0 1 1 150 -40 C150 40 80 80 80 150 H-80 C-80 80 -150 40 -150 -40 Z" fill={on > 0.5 ? COLORS.yellow : "#fff"} stroke={COLORS.title} strokeWidth={12} />
        <path d="M-40 60 L0 0 L40 60" stroke={COLORS.title} strokeWidth={10} fill="none" />
        <rect x={-80} y={150} width={160} height={70} rx={20} fill={COLORS.title} />
      </g>
      {/* sprouting plant */}
      <g transform="translate(820 1590)">
        <path d="M-100 0 H100 L80 120 H-80 Z" fill={COLORS.orange} />
        <path d={`M0 0 C 0 ${-150 * grow} ${-20 * grow} ${-220 * grow} 0 ${-320 * grow}`} stroke={COLORS.green} strokeWidth={14} fill="none" strokeLinecap="round" />
        <ellipse cx={-50 * grow} cy={-180 * grow} rx={60 * grow} ry={26 * grow} fill={COLORS.green} transform={`rotate(-30 ${-50 * grow} ${-180 * grow})`} />
        <ellipse cx={50 * grow} cy={-260 * grow} rx={60 * grow} ry={26 * grow} fill={COLORS.green} transform={`rotate(30 ${50 * grow} ${-260 * grow})`} />
      </g>
    </svg>
  );
};

/* ---------------------------------------------------------------- Biology */
const BiologyVisual: React.FC<{ f: number }> = ({ f }) => {
  const enter = pop(f, 0, 160, 14);
  const split = prog(f, 10, 16, easeInOut);
  const n = 16;
  return (
    <>
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <g transform={`translate(340 1120) scale(${enter})`}>
        {new Array(n).fill(0).map((_, k) => {
          const y = (k - n / 2) * 52;
          const ph = k * 0.55 + f * 0.22;
          const x1 = Math.sin(ph) * 150;
          const x2 = -x1;
          const front = Math.cos(ph) > 0;
          return (
            <g key={k}>
              <line x1={x1} y1={y} x2={x2} y2={y} stroke={k % 2 ? COLORS.orange : COLORS.yellow} strokeWidth={12} strokeLinecap="round" opacity={0.85} />
              <circle cx={x1} cy={y} r={front ? 22 : 15} fill={COLORS.green} />
              <circle cx={x2} cy={y} r={front ? 15 : 22} fill={COLORS.teal} />
            </g>
          );
        })}
      </g>
      {/* dividing cell */}
      <g transform="translate(790 960)">
        {[-1, 1].map((s) => (
          <g key={s} transform={`translate(0 ${s * split * 150}) scale(${1 - split * 0.25 + wobble(f - 26, 0.06)}, ${1 - split * 0.25 - wobble(f - 26, 0.06)})`}>
            <circle r={150} fill="#cdeec8" stroke={COLORS.green} strokeWidth={10} opacity={0.85} />
            <circle r={52} fill={COLORS.green} opacity={0.75} cx={s * 10} />
          </g>
        ))}
      </g>
    </svg>
    <div
      style={{
        position: "absolute",
        left: 470,
        top: 1340,
        width: 540,
        height: 349,
        borderRadius: 30,
        overflow: "hidden",
        border: "8px solid #fff",
        boxShadow: "0 30px 50px -18px rgba(40,90,40,0.45)",
        transform: `translateY(${(1 - pop(f, 6, 170, 14)) * 500}px) rotate(-3deg)`,
      }}
    >
      <PhotoFill name="faryal-bagheri" position="50% 30%" />
      <div style={{ position: "absolute", right: 16, bottom: 14, background: "rgba(255,255,255,0.94)", borderRadius: 16, padding: "4px 16px", fontFamily: FA, fontWeight: 800, fontSize: 28, color: COLORS.title, direction: "rtl" }}>
        فریال باقری · بیولوژی
      </div>
    </div>
    </>
  );
};

/* ---------------------------------------------------------------- Chemistry */
const ChemVisual: React.FC<{ f: number }> = ({ f }) => {
  const slosh = wobble(f, 22, 1.6, 2);
  const els = [
    { s: "H", n: 1, c: COLORS.blue },
    { s: "O", n: 8, c: COLORS.red },
    { s: "C", n: 6, c: COLORS.title },
    { s: "Na", n: 11, c: COLORS.purple },
  ];
  return (
    <>
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        <g transform={`translate(560 1000) scale(0.72) rotate(${slosh * 0.2})`}>
          <clipPath id="v5flask">
            <path d="M-70 -330 V-150 L-280 260 Q-300 300 -260 300 H260 Q300 300 280 260 L70 -150 V-330 Z" />
          </clipPath>
          <g clipPath="url(#v5flask)">
            <path d={`M-320 ${-10 + slosh} Q-160 ${-40 - slosh} 0 ${-10 + slosh * 0.3} T320 ${-10 - slosh} V320 H-320 Z`} fill={COLORS.purple} opacity={0.85} />
            {new Array(14).fill(0).map((_, k) => {
              // buoyant bubbles: accelerate upward, wobble sideways
              const t = (f + rand(k) * 30) % 30;
              const y = 280 - 0.5 * 1.1 * t * t - t * 2;
              const x = (rand(k * 3) - 0.5) * 380 + Math.sin(t / 3 + k) * 10;
              return <circle key={k} cx={x} cy={y} r={8 + rand(k * 5) * 16} fill="#fff" opacity={y < -20 ? 0 : 0.6} />;
            })}
          </g>
          <path d="M-70 -330 V-150 L-280 260 Q-300 300 -260 300 H260 Q300 300 280 260 L70 -150 V-330" fill="none" stroke={COLORS.title} strokeWidth={14} strokeLinejoin="round" />
          <rect x={-100} y={-360} width={200} height={40} rx={14} fill={COLORS.title} />
        </g>
      </svg>
      {els.map((e, k) => {
        const p = pop(f, 4 + k * 3, 220, 10);
        const pos = [
          [120, 760],
          [800, 720],
          [110, 1500],
          [810, 1480],
        ][k];
        return (
          <div
            key={e.s}
            style={{
              position: "absolute",
              left: pos[0],
              top: pos[1] + Math.sin((f + k * 10) / 6) * 14,
              width: 170,
              height: 190,
              borderRadius: 26,
              background: "#fff",
              border: `6px solid ${e.c}`,
              transform: `scale(${p}) rotate(${(k % 2 ? 8 : -8) * p}deg)`,
              boxShadow: "0 16px 30px -12px rgba(0,0,0,0.25)",
              fontFamily: EN,
              color: e.c,
              direction: "ltr",
            }}
          >
            <div style={{ position: "absolute", left: 16, top: 10, fontSize: 30, fontWeight: 700 }}>{e.n}</div>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 90, fontWeight: 800, paddingTop: 16 }}>{e.s}</div>
          </div>
        );
      })}
      <div style={{ position: "absolute", left: 210, top: 1110 + (1 - pop(f, 3, 170, 14)) * 600 }}>
        <Cutout name="kid-chem" height={600} frame={f} seed={9} />
      </div>
    </>
  );
};

/* ---------------------------------------------------------------- Physics */
/** Newton's cradle: energy passes end-to-end; s(t) = A·cos(ωt) with light damping. */
export const cradleSwing = (f: number) => Math.cos((Math.max(0, f) / 12) * Math.PI) * 34 * Math.exp(-Math.max(0, f) / 90);
const PhysicsVisual: React.FC<{ f: number }> = ({ f }) => {
  const s = cradleSwing(f);
  const L = 520;
  const r = 62;
  const topY = 760;
  const atom = f * 0.2;
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <rect x={180} y={topY - 30} width={720} height={30} rx={15} fill={COLORS.title} />
      <rect x={180} y={topY + L + 140} width={720} height={36} rx={18} fill={COLORS.title} />
      {[-2, -1, 0, 1, 2].map((k) => {
        let ang = 0;
        if (k === -2 && s > 0) ang = s;
        if (k === 2 && s < 0) ang = s;
        const rad = (ang * Math.PI) / 180;
        const ax = 540 + k * r * 2;
        const bx = ax - Math.sin(rad) * L;
        const by = topY + Math.cos(rad) * L;
        return (
          <g key={k}>
            <line x1={ax} y1={topY} x2={bx} y2={by} stroke={COLORS.secondary} strokeWidth={5} />
            <circle cx={bx} cy={by} r={r} fill={COLORS.blue} />
            <circle cx={bx - 20} cy={by - 22} r={16} fill="#fff" opacity={0.6} />
          </g>
        );
      })}
      <g transform="translate(540 1590) scale(0.72)" opacity={0.9}>
        {[0, 60, 120].map((a) => (
          <ellipse key={a} rx={190} ry={60} fill="none" stroke={COLORS.blue} strokeWidth={6} transform={`rotate(${a})`} />
        ))}
        {[0, 60, 120].map((a, k) => {
          const t = atom * (1 + k * 0.3) + k * 2;
          const ex = Math.cos(t) * 190;
          const ey = Math.sin(t) * 60;
          const ra = (a * Math.PI) / 180;
          return <circle key={k} cx={ex * Math.cos(ra) - ey * Math.sin(ra)} cy={ex * Math.sin(ra) + ey * Math.cos(ra)} r={14} fill={COLORS.orange} />;
        })}
        <circle r={30} fill={COLORS.orange} />
      </g>
    </svg>
  );
};

/* ---------------------------------------------------------------- Languages */
/** Speech bubble that pops in at `at`, tail pointing down-left or down-right. */
const Bubble: React.FC<{ f: number; at: number; x: number; y: number; text: string; color: string; size?: number; tail?: "left" | "right"; tilt?: number }> = ({
  f,
  at,
  x,
  y,
  text,
  color,
  size = 110,
  tail = "left",
  tilt = -4,
}) => {
  const p = pop(f, at, 220, 11);
  return (
    <div style={{ position: "absolute", left: x, top: y + Math.sin((f + at * 7) / 9) * 8, transform: `scale(${p}) rotate(${tilt * p}deg)`, transformOrigin: tail === "left" ? "10% 100%" : "90% 100%" }}>
      <div style={{ background: "#fff", border: `8px solid ${color}`, borderRadius: 60, padding: `${size * 0.16}px ${size * 0.42}px`, fontFamily: EN, fontWeight: 800, fontSize: size, color, whiteSpace: "nowrap", direction: "ltr", boxShadow: "0 22px 40px -18px rgba(0,0,0,0.3)" }}>
        {text}
      </div>
      <svg width={90} height={70} viewBox="0 0 90 70" style={{ position: "absolute", top: "100%", marginTop: -8, [tail === "left" ? "left" : "right"]: 60 }}>
        <path d={tail === "left" ? "M4 0 L70 0 L10 64 Z" : "M86 0 L20 0 L80 64 Z"} fill="#fff" stroke={color} strokeWidth={8} strokeLinejoin="round" />
        <rect x={0} y={-8} width={90} height={10} fill="#fff" />
      </svg>
    </div>
  );
};

const EnglishVisual: React.FC<{ f: number }> = ({ f }) => {
  const blocks = [
    { l: "A", c: COLORS.red },
    { l: "B", c: COLORS.blue },
    { l: "C", c: COLORS.yellow },
  ];
  const book = pop(f, 2, 170, 13);
  return (
    <>
      {/* open book */}
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        <g transform={`translate(560 1180) scale(${book})`}>
          <path d="M0 -150 C-110 -200 -250 -190 -340 -150 V190 C-250 150 -110 150 0 200 Z" fill="#fff" stroke={COLORS.title} strokeWidth={12} strokeLinejoin="round" />
          <path d="M0 -150 C110 -200 250 -190 340 -150 V190 C250 150 110 150 0 200 Z" fill="#fff" stroke={COLORS.title} strokeWidth={12} strokeLinejoin="round" />
          {[0, 1, 2, 3, 4].map((k) => (
            <g key={k} opacity={prog(f, 8 + k * 2, 6)}>
              <line x1={-290} y1={-100 + k * 55} x2={-60} y2={-90 + k * 55} stroke={k === 0 ? COLORS.red : "#d9d2cc"} strokeWidth={14} strokeLinecap="round" />
              <line x1={60} y1={-90 + k * 55} x2={290 - (k % 2) * 60} y2={-100 + k * 55} stroke="#d9d2cc" strokeWidth={14} strokeLinecap="round" />
            </g>
          ))}
        </g>
      </svg>
      <Bubble f={f} at={4} x={130} y={640} text="Hello!" color={COLORS.red} size={120} />
      <Bubble f={f} at={9} x={560} y={830} text="How are you?" color={COLORS.blue} size={56} tail="right" tilt={4} />
      {blocks.map((b, k) => {
        const p = pop(f, 6 + k * 3, 200, 12);
        return (
          <div
            key={b.l}
            style={{
              position: "absolute",
              left: 300 + k * 170,
              top: 1480 - (k === 1 ? 20 : 0) + (1 - p) * 300,
              width: 150,
              height: 150,
              borderRadius: 22,
              background: b.c,
              boxShadow: "inset 0 -14px 0 rgba(0,0,0,0.18), 0 18px 30px -12px rgba(0,0,0,0.3)",
              fontFamily: EN,
              fontWeight: 800,
              fontSize: 100,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `rotate(${(k - 1) * 6 + wobble(f - 6 - k * 3, 4)}deg)`,
              opacity: clamp01(p * 2),
            }}
          >
            {b.l}
          </div>
        );
      })}
    </>
  );
};

const FRENCH = "#4a56c9";
const FrenchVisual: React.FC<{ f: number }> = ({ f }) => {
  const draw = prog(f, 1, 16, easeInOut);
  return (
    <>
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        {/* Eiffel tower, drawn on like a marker sketch */}
        <g transform="translate(330 0)">
          <Marker d="M0 640 V700 M-30 700 H30 M-24 700 L-70 1000 M24 700 L70 1000 M-100 1000 H100 M-70 1000 L-150 1300 M70 1000 L150 1300 M-185 1300 H185 M-150 1300 L-240 1640 M150 1300 L240 1640 M-100 1640 Q0 1460 100 1640" p={draw} color={COLORS.title} width={14} rough={false} />
          <Marker d="M-50 860 L50 860 M-60 920 L60 920 M-115 1150 L115 1150 M-200 1480 L200 1480" p={prog(f, 10, 10)} color={FRENCH} width={10} rough={false} />
        </g>
        {/* tricolour pennants */}
        {[0, 1, 2, 3, 4, 5].map((k) => {
          const x = 600 + k * 75;
          const y = 1360 + Math.sin(k * 0.9) * 18;
          const c = [FRENCH, "#ffffff", COLORS.red][k % 3];
          return <path key={k} d={`M${x} ${y} L${x + 70} ${y + 4} L${x + 35} ${y + 90 + wobble(f - 8 - k, 6)} Z`} fill={c} stroke="#d8d4e8" strokeWidth={3} opacity={prog(f, 8 + k, 5)} />;
        })}
        <path d="M590 1356 Q790 1400 1060 1366" fill="none" stroke={COLORS.secondary} strokeWidth={4} opacity={prog(f, 7, 5)} />
        {/* croissant */}
        <g transform={`translate(800 1600) scale(${pop(f, 12, 200, 12) * 1.5}) rotate(-12)`}>
          {[-2, -1, 0, 1, 2].map((k) => (
            <ellipse key={k} cx={k * 62} cy={Math.abs(k) * -22} rx={k === 0 ? 70 : 54 - Math.abs(k) * 8} ry={k === 0 ? 62 : 48 - Math.abs(k) * 8} fill={k === 0 ? "#e1a04a" : "#d58b34"} stroke="#9c5d1c" strokeWidth={6} />
          ))}
        </g>
      </svg>
      <Bubble f={f} at={4} x={480} y={640} text="Bonjour!" color={FRENCH} size={96} tail="left" tilt={4} />
      <Bubble f={f} at={10} x={600} y={940} text="Merci ♥" color={COLORS.red} size={60} tail="left" tilt={-5} />
    </>
  );
};

/* ---------------------------------------------------------------- Programming */
const CODE = "#3d4a6b";
const CODE_LINES: { t: string; c: string; indent?: number }[] = [
  { t: "def hello(name):", c: "#c792ea" },
  { t: 'print("Hi " + name)', c: "#c3e88d", indent: 1 },
  { t: "", c: "#fff" },
  { t: "for kid in class_:", c: "#82aaff" },
  { t: "hello(kid)", c: "#ffcb6b", indent: 1 },
];
const CodingVisual: React.FC<{ f: number }> = ({ f }) => {
  const win = pop(f, 0, 170, 14);
  // type the program out character by character
  const typed = Math.max(0, (f - 6) * 2.4);
  let budget = typed;
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 640,
          width: 840,
          height: 560,
          borderRadius: 36,
          background: "#1f2433",
          boxShadow: "0 40px 70px -26px rgba(30,40,70,0.55)",
          transform: `scale(${win}) rotate(${(1 - win) * -4}deg)`,
          overflow: "hidden",
          direction: "ltr",
        }}
      >
        <div style={{ height: 70, background: "#2b3145", display: "flex", alignItems: "center", gap: 14, paddingLeft: 30 }}>
          {[COLORS.red, COLORS.yellow, COLORS.green].map((c) => (
            <div key={c} style={{ width: 24, height: 24, borderRadius: 12, background: c }} />
          ))}
          <div style={{ marginLeft: 20, fontFamily: EN, fontSize: 26, color: "#8a93ad" }}>darsoon.py</div>
        </div>
        <div style={{ padding: "34px 40px", fontFamily: '"DejaVu Sans Mono", monospace', fontSize: 40, lineHeight: 1.7 }}>
          {CODE_LINES.map((l, k) => {
            const shown = l.t.slice(0, Math.max(0, Math.min(l.t.length, Math.floor(budget))));
            const typing = budget > 0 && budget < l.t.length + 1;
            budget -= l.t.length + 2;
            return (
              <div key={k} style={{ color: l.c, paddingLeft: (l.indent ?? 0) * 60, height: 68, whiteSpace: "pre" }}>
                <span style={{ color: "#5c6680", marginRight: 26, display: "inline-block", width: 30 }}>{k + 1}</span>
                {shown}
                {typing && f % 12 < 7 ? <span style={{ color: "#fff" }}>▍</span> : null}
              </div>
            );
          })}
        </div>
      </div>
      {/* </> badge */}
      <div style={{ position: "absolute", left: 760, top: 520, width: 220, height: 220, borderRadius: 110, background: CODE, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${pop(f, 5, 220, 10)}) rotate(${wobble(f - 5, 8)}deg)`, boxShadow: "0 20px 40px -14px rgba(30,40,70,0.5)" }}>
        <svg width={130} height={100} viewBox="0 0 130 100">
          <path d="M38 18 L8 50 L38 82 M92 18 L122 50 L92 82 M74 10 L56 90" fill="none" stroke="#fff" strokeWidth={13} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {/* gears of logic */}
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        <g opacity={prog(f, 8, 6)}>
          <Gear x={900} y={1330} r={70} rot={f * 7} color={COLORS.orange} />
          <Gear x={985} y={1430} r={46} rot={-f * 10.6 + 8} color={CODE} />
        </g>
      </svg>
      <div style={{ position: "absolute", left: 80, top: 1260 + (1 - pop(f, 4, 170, 14)) * 600 }}>
        <Cutout name="kid-laptop" height={430} frame={f} seed={12} />
      </div>
    </>
  );
};

export const SUBJECTS: Subject[] = [
  { name: "ریاضی", color: COLORS.orange, bg: "#fff1e6", Visual: MathVisual, origin: [890, 1420] },
  { name: "علوم", color: COLORS.teal, bg: "#e6f6f3", Visual: ScienceVisual, origin: [540, 1180] },
  { name: "بیولوژی", color: COLORS.green, bg: "#eaf6e8", Visual: BiologyVisual, origin: [560, 980] },
  { name: "شیمی", color: COLORS.purple, bg: "#f1eafc", Visual: ChemVisual, origin: [780, 1180] },
  { name: "فیزیک", color: COLORS.blue, bg: "#e7f0fb", Visual: PhysicsVisual, origin: [540, 1200] },
  { name: "انگلیسی", color: COLORS.red, bg: "#fdeeee", Visual: EnglishVisual, origin: [540, 1620] },
  { name: "فرانسه", color: FRENCH, bg: "#eceefb", Visual: FrenchVisual, origin: [300, 760] },
  { name: "برنامه‌نویسی", color: CODE, bg: "#edf0f7", Visual: CodingVisual, origin: [700, 1050] },
];
/** The last subject holds an extra beat so the section lands on the bar line before the CTA. */
const lenOf = (i: number) => (i === SUBJECTS.length - 1 ? SUBJECT_LAST_LEN : SUBJECT_LEN);

export const S5Subjects: React.FC = () => {
  const frame = useStoryFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.canvas }}>
      {SUBJECTS.map((sub, i) => {
        const start = SUBJECT_INTRO + i * SUBJECT_LEN;
        const f = frame - start;
        if (f < 0 || f > lenOf(i) + 10) return null;
        // ink-blot iris opening from the previous subject's focal object
        const iris = prog(f, 0, 9, easeInOut);
        const r = lerp(0, 2300, iris);
        const [ox, oy] = sub.origin;
        const { Visual } = sub;
        const nameIn = pop(f, 2, 230, 11);
        return (
          <AbsoluteFill key={sub.name} style={{ clipPath: `circle(${r}px at ${ox}px ${oy}px)`, background: sub.bg }}>
            <Visual f={f} />
            <div style={{ position: "absolute", top: 210, left: 0, right: 0, transform: `scale(${nameIn}) rotate(${(1 - nameIn) * -6}deg)` }}>
              <KineticText text={sub.name} frame={f} start={2} size={sub.name.length > 8 ? 130 : sub.name.length > 6 ? 150 : 190} color={sub.color} />
            </div>
          </AbsoluteFill>
        );
      })}

      {/* subject chips: progress bar for the sequence */}
      <div style={{ position: "absolute", bottom: 56, left: 0, right: 0, display: "grid", gridTemplateColumns: "repeat(4, auto)", justifyContent: "center", gap: "14px 14px", direction: "rtl" }}>
        {SUBJECTS.map((sub, i) => {
          const active = Math.min(SUBJECTS.length - 1, Math.floor((frame - SUBJECT_INTRO) / SUBJECT_LEN)) === i;
          const seen = frame >= SUBJECT_INTRO + i * SUBJECT_LEN;
          const b = bounce(frame - i * 2, 200, 7000, 0.35);
          return (
            <div
              key={sub.name}
              style={{
                fontFamily: FA,
                fontWeight: 800,
                fontSize: 30,
                padding: "8px 20px",
                textAlign: "center",
                borderRadius: 40,
                background: active ? sub.color : seen ? "#fff" : "rgba(255,255,255,0.7)",
                color: active ? "#fff" : sub.color,
                border: `3px solid ${sub.color}`,
                transform: `translateY(${-b.y}px) scale(${active ? 1.12 : 1})`,
                opacity: clamp01(frame / 4 + 0.2),
              }}
            >
              {sub.name}
            </div>
          );
        })}
      </div>
      {SUBJECTS.map((sub, i) => (
        <Burst key={i} frame={frame - SUBJECT_INTRO - i * SUBJECT_LEN - 6} x={540} y={330} seed={50 + i} count={14} colors={[sub.color, COLORS.yellow, COLORS.orange]} />
      ))}
    </AbsoluteFill>
  );
};
