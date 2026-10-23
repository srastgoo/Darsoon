import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { COLORS } from "../timeline";
import { EN, FA } from "../fonts";
import { bounce, clamp01, easeIn, easeInOut, easeOut, lerp, pop, prog, rand, wobble } from "../lib/anim";
import { Burst, Card, Doodles, Marker, Paper, RoughDefs, Shockwave } from "../lib/visual";
import { KineticText } from "../lib/KineticText";
import { Cutout, PhotoFill } from "../art/Photo";
import { LogoFull } from "../art/Brand";
import { MapleLeaf, StarIcon } from "../art/Icons";

// 10 s chemistry spot: five 2-second beats, each exactly one bar of the 120 BPM track.
export const CHEM_FRAMES = 300;
const BEAT = 60;
const PURPLE = COLORS.purple;

/* ---------------------------------------------------------------- shared art */

/** Erlenmeyer flask with sloshing liquid and buoyant bubbles. */
const Flask: React.FC<{ frame: number; size: number; color?: string; level?: number }> = ({ frame, size, color = PURPLE, level = 0.55 }) => {
  const slosh = wobble(frame, 18, 1.4, 1.6);
  const surface = 300 - 600 * level;
  return (
    <svg width={size} height={size * 1.15} viewBox="-300 -360 600 690" style={{ overflow: "visible", display: "block" }}>
      <defs>
        <clipPath id="chemFlask">
          <path d="M-70 -330 V-150 L-280 260 Q-300 300 -260 300 H260 Q300 300 280 260 L70 -150 V-330 Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#chemFlask)">
        <rect x={-300} y={-360} width={600} height={690} fill="#fff" opacity={0.7} />
        <path d={`M-320 ${surface + slosh} Q-160 ${surface - 26 - slosh} 0 ${surface + slosh * 0.3} T320 ${surface - slosh} V320 H-320 Z`} fill={color} opacity={0.9} />
        {new Array(16).fill(0).map((_, k) => {
          const t = (frame * 1.2 + rand(k) * 40) % 40;
          const y = 280 - 0.5 * 0.9 * t * t - t * 2;
          const x = (rand(k * 3) - 0.5) * 380 + Math.sin(t / 3 + k) * 12;
          return <circle key={k} cx={x} cy={y} r={8 + rand(k * 5) * 16} fill="#fff" opacity={y < surface ? 0 : 0.65} />;
        })}
      </g>
      <path d="M-70 -330 V-150 L-280 260 Q-300 300 -260 300 H260 Q300 300 280 260 L70 -150 V-330" fill="none" stroke={COLORS.title} strokeWidth={16} strokeLinejoin="round" />
      <rect x={-100} y={-362} width={200} height={42} rx={14} fill={COLORS.title} />
      <path d="M-200 200 L-150 110" stroke="#fff" strokeWidth={14} strokeLinecap="round" opacity={0.6} />
    </svg>
  );
};

const ElementTile: React.FC<{ sym: string; num: number; color: string; size?: number }> = ({ sym, num, color, size = 170 }) => (
  <div
    style={{
      width: size,
      height: size * 1.12,
      borderRadius: size * 0.16,
      background: "#fff",
      border: `${size * 0.035}px solid ${color}`,
      boxShadow: "0 16px 30px -12px rgba(0,0,0,0.25)",
      fontFamily: EN,
      color,
      position: "relative",
      direction: "ltr",
    }}
  >
    <div style={{ position: "absolute", left: size * 0.1, top: size * 0.06, fontSize: size * 0.18, fontWeight: 700 }}>{num}</div>
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.52, fontWeight: 800, paddingTop: size * 0.1 }}>{sym}</div>
  </div>
);

/** Ball-and-stick molecule turning around its vertical axis (fake 3D). */
const Molecule: React.FC<{ frame: number; size: number; assemble?: number }> = ({ frame, size, assemble = 1 }) => {
  const a = frame * 0.06;
  const atoms = [
    { x: 0, y: 0, z: 0, r: 70, c: COLORS.red, label: "O" },
    { x: -120, y: 85, z: 40, r: 44, c: "#f4f1ee", label: "H" },
    { x: 120, y: 85, z: -40, r: 44, c: "#f4f1ee", label: "H" },
  ];
  const proj = atoms.map((p, i) => {
    const fly = i === 0 ? 1 : clamp01(assemble * 2 - (i - 1) * 0.5);
    const x = p.x * Math.cos(a) - p.z * Math.sin(a);
    const z = p.x * Math.sin(a) + p.z * Math.cos(a);
    const away = (1 - fly) * (i === 1 ? -380 : 380);
    return { ...p, px: x + away, py: p.y - (1 - fly) * 200, z, s: 1 + z / 600, fly };
  });
  return (
    <svg width={size} height={size} viewBox="-260 -200 520 400" style={{ overflow: "visible" }}>
      {proj.slice(1).map((p, i) => (
        <line key={i} x1={proj[0].px} y1={proj[0].py} x2={p.px} y2={p.py} stroke={COLORS.title} strokeWidth={18} strokeLinecap="round" opacity={p.fly > 0.95 ? 1 : 0} />
      ))}
      {[...proj]
        .sort((m, n) => m.z - n.z)
        .map((p, i) => (
          <g key={i} transform={`translate(${p.px} ${p.py}) scale(${p.s})`}>
            <circle r={p.r} fill={p.c} stroke={COLORS.title} strokeWidth={6} />
            <circle cx={-p.r * 0.35} cy={-p.r * 0.35} r={p.r * 0.28} fill="#fff" opacity={0.55} />
            <text y={p.r * 0.32} textAnchor="middle" fontFamily={EN} fontWeight={800} fontSize={p.r * 0.85} fill={p.label === "O" ? "#fff" : COLORS.title}>
              {p.label}
            </text>
          </g>
        ))}
    </svg>
  );
};

/** Liquid band that rises through the frame: covers it, then uncovers the next beat. */
const LiquidWipe: React.FC<{ frame: number; color: string; dur?: number }> = ({ frame, color, dur = 20 }) => {
  if (frame < 0 || frame > dur) return null;
  const p = easeInOut(frame / dur);
  const H = 2400;
  const top = lerp(1960, -H - 60, p);
  const wave = (y: number, ph: number) => {
    let d = `M-40 ${y}`;
    for (let x = 0; x <= 1120; x += 70) d += ` L${x} ${y + Math.sin(x / 90 + frame * 0.6 + ph) * 28}`;
    return d;
  };
  const topPath = wave(top, 0);
  const bottom = top + H;
  let back = "";
  for (let x = 1120; x >= -40; x -= 70) back += ` L${x} ${bottom + Math.sin(x / 80 + frame * 0.5 + 2) * 34}`;
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
      <path d={`${topPath}${back} Z`} fill={color} />
      {new Array(18).fill(0).map((_, k) => (
        <circle key={k} cx={rand(k) * 1080} cy={top + 80 + rand(k * 7) * (H - 160) - frame * (6 + rand(k * 3) * 10)} r={10 + rand(k * 5) * 26} fill="#fff" opacity={0.25} />
      ))}
    </svg>
  );
};

const Headline: React.FC<{ frame: number; text: string; accent: string[]; underline?: string[]; size?: number; top?: number }> = ({
  frame,
  text,
  accent,
  underline,
  size = 92,
  top = 190,
}) => (
  <div style={{ position: "absolute", top, left: 0, right: 0 }}>
    <KineticText text={text} frame={frame} start={4} size={size} stagger={3} accent={accent} underline={underline} />
  </div>
);

/* ---------------------------------------------------------------- beats */

/** Beat 1: title slam, flask drops in, element tiles pop. */
const BeatTitle: React.FC = () => {
  const f = useCurrentFrame();
  const pill = pop(f, 0, 240, 11);
  const slam = bounce(f - 3, 520, 9000, 0.3);
  const flask = bounce(f - 12, 900, 8200, 0.35);
  const tiles = [
    { sym: "H", num: 1, c: COLORS.blue, x: 70, y: 1010, r: -10 },
    { sym: "O", num: 8, c: COLORS.red, x: 840, y: 960, r: 9 },
    { sym: "C", num: 6, c: COLORS.title, x: 60, y: 1490, r: 8 },
    { sym: "Na", num: 11, c: PURPLE, x: 850, y: 1460, r: -8 },
  ];
  return (
    <AbsoluteFill>
      <Paper />
      <Doodles frame={f} seed={21} opacity={0.4} />
      <div style={{ position: "absolute", top: 210, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <div
          style={{
            background: COLORS.orange,
            color: "#fff",
            fontFamily: FA,
            fontWeight: 900,
            fontSize: 62,
            padding: "10px 44px",
            borderRadius: 26,
            direction: "rtl",
            transform: `scale(${pill}) rotate(${-4 + (1 - pill) * -10}deg)`,
            boxShadow: "0 18px 30px -12px rgba(237,95,0,0.6)",
          }}
        >
          کلاس آنلاین
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 330,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: FA,
          fontWeight: 900,
          fontSize: 300,
          lineHeight: 1.1,
          color: COLORS.title,
          opacity: f >= 3 ? 1 : 0,
          transform: `translateY(${-slam.y}px) scale(${1 + slam.squash * 0.3}, ${1 - slam.squash * 0.35})`,
          transformOrigin: "50% 100%",
        }}
      >
        شیمی
      </div>
      <div style={{ position: "absolute", top: 690, left: 0, right: 0, display: "flex", justifyContent: "center", transform: `scale(${pop(f, 10)})` }}>
        <div style={{ fontFamily: EN, fontWeight: 800, fontSize: 84, color: COLORS.orange, position: "relative" }}>
          (Chemistry)
          <svg viewBox="0 0 200 30" preserveAspectRatio="none" style={{ position: "absolute", left: "-3%", bottom: -22, width: "106%", height: 28, overflow: "visible" }}>
            <Marker d="M4 18 C60 6 140 26 196 10" p={prog(f, 14, 10)} width={6} />
          </svg>
        </div>
      </div>
      {f >= 12 ? (
        <div
          style={{
            position: "absolute",
            left: 540 - 230,
            top: 1820 - 529 - flask.y,
            transform: `scale(${1 + flask.squash * 0.18}, ${1 - flask.squash * 0.2}) rotate(${wobble(f - 20, 5)}deg)`,
            transformOrigin: "50% 100%",
          }}
        >
          <Flask frame={f} size={460} color={PURPLE} />
        </div>
      ) : null}
      {tiles.map((t, k) => {
        const s = pop(f, 18 + k * 4, 230, 10);
        return (
          <div key={t.sym} style={{ position: "absolute", left: t.x, top: t.y + Math.sin((f + k * 9) / 7) * 10, transform: `scale(${s}) rotate(${t.r * s}deg)` }}>
            <ElementTile sym={t.sym} num={t.num} color={t.c} />
          </div>
        );
      })}
      <Shockwave frame={f - 9} x={540} y={560} color={COLORS.orange} max={560} life={20} />
      <Burst frame={f - 9} x={540} y={540} seed={3} count={24} power={34} />
      <Burst frame={f - 24} x={540} y={1800} seed={8} count={14} colors={[PURPLE, COLORS.orange, "#fff"]} shapes={["ring", "dot"]} />
    </AbsoluteFill>
  );
};

/** Beat 2: balancing an equation in marker, molecule assembles. */
const BeatEquation: React.FC = () => {
  const f = useCurrentFrame();
  const write = prog(f, 6, 18, easeInOut);
  const coef = (at: number) => pop(f, at, 260, 9);
  const c1 = coef(28);
  const c2 = coef(33);
  const tick = prog(f, 38, 8);
  return (
    <AbsoluteFill>
      <Paper tint="#f7f2fc" />
      <Doodles frame={f + 60} seed={22} opacity={0.35} color="#d8cbec" />
      <Headline frame={f} text={"فرمول‌ها رو\nقدم‌به‌قدم یاد بگیر"} accent={["قدم‌به‌قدم"]} underline={["قدم‌به‌قدم"]} size={96} />
      <div style={{ position: "absolute", left: 60, right: 60, top: 640, transform: `translateY(${(1 - pop(f, 2, 170, 15)) * 400}px)` }}>
        <Card radius={36} pad={36} style={{ position: "relative" }}>
          <div
            style={{
              fontFamily: EN,
              fontWeight: 700,
              fontSize: 76,
              color: COLORS.title,
              direction: "ltr",
              textAlign: "center",
              whiteSpace: "nowrap",
              clipPath: `inset(-30% ${100 - write * 100}% -30% 0)`,
            }}
          >
            CH₄ +{" "}
            <span style={{ display: "inline-block", color: COLORS.orange, transform: `scale(${c1})`, width: c1 * 46 }}>2</span>O₂ → CO₂ +{" "}
            <span style={{ display: "inline-block", color: COLORS.orange, transform: `scale(${c2})`, width: c2 * 46 }}>2</span>H₂O
          </div>
          <div style={{ position: "absolute", right: -20, top: -34, transform: `scale(${pop(f, 38, 240, 10)})` }}>
            <svg width={96} height={96} viewBox="0 0 100 100">
              <circle cx={50} cy={50} r={46} fill={COLORS.green} />
              <path d="M28 52 L44 67 L73 36" fill="none" stroke="#fff" strokeWidth={11} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - tick} />
            </svg>
          </div>
        </Card>
      </div>
      <div style={{ position: "absolute", left: 540 - 480, top: 1000 }}>
        <Molecule frame={f} size={960} assemble={prog(f, 22, 18, easeOut)} />
      </div>
      <div style={{ position: "absolute", top: 1760, left: 0, right: 0, textAlign: "center", fontFamily: EN, fontWeight: 800, fontSize: 72, color: PURPLE, opacity: prog(f, 40, 8), direction: "ltr" }}>
        H₂O
      </div>
      <Burst frame={f - 30} x={360} y={760} seed={31} count={10} />
      <Burst frame={f - 35} x={760} y={760} seed={32} count={10} />
    </AbsoluteFill>
  );
};

/** Beat 3: the real student with his flask, a bubbling reaction pours out. */
const BeatExperiment: React.FC = () => {
  const f = useCurrentFrame();
  const rise = pop(f, 0, 150, 15);
  const fx = 374; // his flask in the cutout at height 1000
  const fy = 1500;
  return (
    <AbsoluteFill>
      <Paper />
      <Doodles frame={f + 120} seed={23} opacity={0.35} />
      <Headline frame={f} text={"شیمی رو با آزمایش\nبهتر می‌فهمی"} accent={["آزمایش"]} underline={["آزمایش"]} size={92} />
      {/* bubbles and sparks rising from his flask */}
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        {new Array(26).fill(0).map((_, k) => {
          const born = 10 + rand(k) * 40;
          const t = f - born;
          if (t < 0) return null;
          const x = fx + (rand(k * 3) - 0.5) * 120 + Math.sin(t / 4 + k) * (20 + t * 1.5);
          const y = fy - t * (10 + rand(k * 5) * 10) - 0.08 * t * t;
          const r = (10 + rand(k * 7) * 30) * Math.min(1, t / 6);
          const c = [PURPLE, COLORS.orange, COLORS.yellow, COLORS.teal][k % 4];
          return <circle key={k} cx={x} cy={y} r={r} fill={k % 3 === 0 ? "none" : c} stroke={c} strokeWidth={5} opacity={clamp01(1 - t / 45) * 0.85} />;
        })}
      </svg>
      <div style={{ position: "absolute", left: 0, top: 920 + (1 - rise) * 800 }}>
        <Cutout name="kid-chem" height={1000} frame={f} seed={12} />
      </div>
      {[
        { sym: "O", num: 8, c: COLORS.red, x: 840, y: 620 },
        { sym: "C", num: 6, c: COLORS.title, x: 90, y: 700 },
      ].map((t, k) => (
        <div key={t.sym} style={{ position: "absolute", left: t.x, top: t.y + Math.sin((f + k * 13) / 8) * 12, transform: `scale(${pop(f, 14 + k * 5)}) rotate(${k ? 8 : -8}deg)` }}>
          <ElementTile sym={t.sym} num={t.num} color={t.c} size={140} />
        </div>
      ))}
      <Burst frame={f - 18} x={fx} y={fy - 60} seed={41} count={20} power={30} colors={[PURPLE, COLORS.orange, COLORS.yellow]} />
    </AbsoluteFill>
  );
};

/** Beat 4: live class with the chemistry tutor, Canadian curriculum. */
const BeatTutor: React.FC = () => {
  const f = useCurrentFrame();
  const card = pop(f, 2, 170, 14);
  return (
    <AbsoluteFill>
      <Paper />
      <Doodles frame={f + 180} seed={24} opacity={0.35} />
      <div style={{ position: "absolute", top: 170, left: 0, right: 0 }}>
        <KineticText text={"معلم متخصص شیمی"} frame={f} start={2} size={92} accent={["شیمی"]} />
      </div>
      <div style={{ position: "absolute", top: 320, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 14, direction: "rtl", transform: `scale(${pop(f, 12)})` }}>
        <MapleLeaf size={58} />
        <div style={{ fontFamily: FA, fontWeight: 800, fontSize: 52, color: COLORS.title }}>مطابق برنامه درسی مدارس کانادا</div>
      </div>
      <div style={{ position: "absolute", left: 70, top: 480, transform: `translateY(${(1 - card) * 500}px) rotate(${-2 + (1 - card) * 8}deg)` }}>
        <Card radius={40} pad={16} style={{ width: 940, position: "relative" }}>
          <div style={{ width: 908, height: 690, borderRadius: 28, overflow: "hidden" }}>
            <div style={{ width: "100%", height: "100%", transform: `scale(${1.04 + f * 0.0012})`, transformOrigin: "40% 35%" }}>
              <PhotoFill name="tutor-chem" position="42% 35%" />
            </div>
          </div>
          <div style={{ position: "absolute", right: 40, top: 40, display: "flex", alignItems: "center", gap: 10, background: "#fff", borderRadius: 24, padding: "6px 18px", fontFamily: FA, fontWeight: 800, fontSize: 30, color: COLORS.red, direction: "rtl" }}>
            <div style={{ width: 14, height: 14, borderRadius: 7, background: COLORS.red, opacity: f % 30 < 18 ? 1 : 0.3 }} />
            زنده
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 18px 8px", direction: "rtl" }}>
            <div style={{ fontFamily: FA, fontWeight: 900, fontSize: 46, color: COLORS.title }}>علی یوسفی · معلم شیمی</div>
            <div style={{ display: "flex", gap: 4, direction: "ltr" }}>
              {new Array(5).fill(0).map((_, k) => (
                <div key={k} style={{ transform: `scale(${pop(f, 16 + k * 2)})` }}>
                  <StarIcon size={38} />
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
      <div style={{ position: "absolute", left: 600, top: 1330, transform: `scale(${pop(f, 10, 170, 12)})` }}>
        <Molecule frame={f + 40} size={460} />
      </div>
      <div style={{ position: "absolute", left: 80, top: 1440, transform: `scale(${pop(f, 18)}) rotate(-6deg)` }}>
        <Card radius={28} pad={22} style={{ fontFamily: EN, fontWeight: 700, fontSize: 52, color: COLORS.title, direction: "ltr" }}>
          2H₂ + O₂ → 2H₂O
        </Card>
      </div>
    </AbsoluteFill>
  );
};

/** Beat 5: logo + free intro session CTA. */
const BeatCTA: React.FC = () => {
  const f = useCurrentFrame();
  const logo = bounce(f - 2, 600, 9000, 0.32);
  const btn = pop(f, 12, 220, 11);
  const tapAt = 34;
  const press = f >= tapAt - 2 && f < tapAt + 3 ? 0.08 : 0;
  const after = f >= tapAt ? wobble(f - tapAt, 0.1, 3, 7) : 0;
  const pulse = f > tapAt + 12 ? Math.sin((f - tapAt) / 4) * 0.015 : 0;
  const finger = prog(f, tapAt - 12, 10, easeInOut);
  const fingerOut = prog(f, tapAt + 6, 8, easeIn);
  return (
    <AbsoluteFill>
      <Paper />
      <Doodles frame={f + 240} seed={25} opacity={0.35} />
      <div style={{ position: "absolute", left: 540 - 330, top: 520 - logo.y, transform: `scale(${1 + logo.squash * 0.25}, ${1 - logo.squash * 0.3})`, transformOrigin: "50% 100%", opacity: f >= 2 ? 1 : 0 }}>
        <LogoFull width={660} />
      </div>
      <div style={{ position: "absolute", top: 860, left: 0, right: 0, textAlign: "center", fontFamily: FA, fontWeight: 800, fontSize: 56, color: COLORS.title, direction: "rtl", transform: `scale(${pop(f, 8)})` }}>
        کلاس آنلاین <span style={{ color: PURPLE }}>شیمی</span>
      </div>
      <div style={{ position: "absolute", top: 990, left: 0, right: 0, display: "flex", justifyContent: "center", transform: `scale(${btn * (1 - press + after + pulse)}, ${btn * (1 - press * 1.5 - after * 0.6 + pulse)})` }}>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            background: COLORS.orange,
            color: "#fff",
            fontFamily: FA,
            fontWeight: 900,
            fontSize: 56,
            padding: "34px 60px",
            borderRadius: 70,
            direction: "rtl",
            display: "flex",
            alignItems: "center",
            gap: 20,
            boxShadow: press ? "0 4px 0 #c94f12" : "0 18px 0 #c94f12, 0 40px 60px -20px rgba(237,95,0,0.6)",
          }}
        >
          شروع با یک جلسه معرفی رایگان
          <svg width={52} height={52} viewBox="0 0 50 50">
            <path d="M32 12 L18 25 L32 38" fill="none" stroke="#fff" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div
            style={{
              position: "absolute",
              left: "40%",
              top: "50%",
              width: 1000 * prog(f, tapAt, 16),
              height: 1000 * prog(f, tapAt, 16),
              borderRadius: "50%",
              background: "#fff",
              opacity: 0.3 * (1 - prog(f, tapAt, 16)),
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      </div>
      {fingerOut < 1 ? (
        <div style={{ position: "absolute", left: lerp(900, 470, finger), top: lerp(1900, 1100, finger) + (press ? 10 : 0) + fingerOut * 600, transform: "rotate(-18deg)", opacity: finger * (1 - fingerOut) }}>
          <svg width={150} height={190} viewBox="0 0 150 190">
            <path d="M48 20 Q48 0 66 0 Q84 0 84 20 V80 Q100 70 112 80 Q128 76 136 92 Q150 92 150 112 V140 Q150 190 100 190 H72 Q40 190 26 160 L4 112 Q-2 96 14 92 Q26 90 34 104 L48 128 Z" fill="#f1c19a" stroke={COLORS.title} strokeWidth={6} strokeLinejoin="round" />
          </svg>
        </div>
      ) : null}
      <div style={{ position: "absolute", top: 1240, left: 0, right: 0, textAlign: "center", fontFamily: EN, fontWeight: 700, fontSize: 62, color: COLORS.logo, transform: `scale(${pop(f, 18)})` }}>www.darsoon.com</div>
      <div style={{ position: "absolute", left: 120, top: 1420, transform: `scale(${pop(f, 20)})` }}>
        <Flask frame={f} size={200} color={PURPLE} level={0.5} />
      </div>
      <div style={{ position: "absolute", left: 760, top: 1440, transform: `scale(${pop(f, 24)}) rotate(8deg)` }}>
        <ElementTile sym="O" num={8} color={COLORS.red} size={150} />
      </div>
      <Shockwave frame={f - 8} x={540} y={640} color={COLORS.logo} max={600} life={22} />
      <Burst frame={f - 8} x={540} y={640} seed={51} count={26} power={38} />
      <Burst frame={f - tapAt} x={540} y={1060} seed={52} count={30} power={36} life={40} />
    </AbsoluteFill>
  );
};

/* ---------------------------------------------------------------- composition */

type Cue = { at: number; sfx: string; vol: number };
const CUES: Cue[] = [
  { at: 2, sfx: "pop", vol: 0.6 },
  { at: 9, sfx: "impact", vol: 0.9 },
  { at: 14, sfx: "marker", vol: 0.45 },
  { at: 22, sfx: "thud", vol: 0.7 },
  { at: 18, sfx: "pop", vol: 0.45 },
  { at: 22, sfx: "pop", vol: 0.45 },
  { at: 26, sfx: "pop", vol: 0.45 },
  { at: 30, sfx: "pop", vol: 0.45 },
  { at: 32, sfx: "bubbles", vol: 0.7 },
  { at: 50, sfx: "whoosh", vol: 0.6 },
  { at: 52, sfx: "bubbles", vol: 0.6 },
  { at: BEAT + 6, sfx: "marker", vol: 0.7 },
  { at: BEAT + 28, sfx: "ding", vol: 0.5 },
  { at: BEAT + 33, sfx: "ding", vol: 0.5 },
  { at: BEAT + 26, sfx: "pop", vol: 0.5 },
  { at: BEAT + 34, sfx: "pop", vol: 0.5 },
  { at: BEAT + 38, sfx: "success", vol: 0.6 },
  { at: 2 * BEAT - 6, sfx: "swipe", vol: 0.6 },
  { at: 2 * BEAT, sfx: "whoosh", vol: 0.5 },
  { at: 2 * BEAT + 12, sfx: "bubbles", vol: 0.8 },
  { at: 2 * BEAT + 18, sfx: "pop", vol: 0.6 },
  { at: 2 * BEAT + 30, sfx: "bubbles", vol: 0.6 },
  { at: 3 * BEAT - 2, sfx: "impact", vol: 0.6 },
  { at: 3 * BEAT + 2, sfx: "pop", vol: 0.6 },
  { at: 3 * BEAT + 12, sfx: "click", vol: 0.6 },
  { at: 3 * BEAT + 16, sfx: "ding", vol: 0.45 },
  { at: 3 * BEAT + 18, sfx: "pop", vol: 0.45 },
  { at: 4 * BEAT - 10, sfx: "whoosh", vol: 0.6 },
  { at: 4 * BEAT - 8, sfx: "bubbles", vol: 0.6 },
  { at: 4 * BEAT + 8, sfx: "impact", vol: 1 },
  { at: 4 * BEAT + 12, sfx: "pop", vol: 0.6 },
  { at: 4 * BEAT + 33, sfx: "click", vol: 1 },
  { at: 4 * BEAT + 34, sfx: "success", vol: 0.8 },
];

/** Reaction flash between beat 3 and 4. */
const Flash: React.FC = () => {
  const f = useCurrentFrame();
  const a = f < 4 ? f / 4 : 1 - (f - 4) / 8;
  return <AbsoluteFill style={{ background: "#fff", opacity: clamp01(a) }} />;
};

export const ChemistryIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const beats = [BeatTitle, BeatEquation, BeatExperiment, BeatTutor, BeatCTA];
  return (
    <AbsoluteFill style={{ background: COLORS.canvas, overflow: "hidden" }}>
      <RoughDefs />
      {beats.map((B, i) => (
        <Sequence key={i} from={i * BEAT} durationInFrames={BEAT} name={`Beat ${i + 1}`}>
          <B />
        </Sequence>
      ))}
      {/* purple liquid rises through beat 1 → 2, orange through 4 → 5 (cut under full cover) */}
      <LiquidWipe frame={frame - (BEAT - 11)} color={PURPLE} dur={22} />
      <Sequence from={3 * BEAT - 4} durationInFrames={14} name="Reaction flash">
        <Flash />
      </Sequence>
      <LiquidWipe frame={frame - (4 * BEAT - 11)} color={COLORS.orange} dur={22} />
      {/* beat 2 → 3: bubbles burst outwards */}
      <Burst frame={frame - (2 * BEAT - 2)} x={540} y={960} seed={61} count={30} power={60} size={40} life={22} colors={[PURPLE, "#d8cbec", COLORS.orange]} shapes={["ring", "dot"]} />

      <Audio src={staticFile("v5/chem-music.mp3")} volume={(f) => (f < CHEM_FRAMES - 12 ? 0.5 : 0.5 * Math.max(0, (CHEM_FRAMES - f) / 12))} />
      {CUES.map((c, i) => (
        <Sequence key={i} from={c.at} durationInFrames={50} name={`sfx ${c.sfx}`}>
          <Audio src={staticFile(`v5/sfx-${c.sfx}.mp3`)} volume={() => c.vol * 0.6} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
