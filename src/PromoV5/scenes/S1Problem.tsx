import React from "react";
import { useFrameEdges } from "../lib/format";
import { AbsoluteFill } from "remotion";
import { useStoryFrame } from "../lib/time";
import { COLORS } from "../timeline";
import { EN, FA } from "../fonts";
import { bounce, clamp01, easeIn, easeInOut, jitter, pop, prog, wobble } from "../lib/anim";
import { Burst, Card, Doodles, Marker, Paper, Shockwave } from "../lib/visual";
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

const QUERY = "معلم خصوصی آنلاین در تورنتو";
export const TYPE_START = 8;
export const TYPE_END = 44;
export const ENTER_AT = 47;

/** One placeholder search result (no real sites): favicon, domain, title, snippet. */
const ResultRow: React.FC<{ k: number }> = ({ k }) => {
  const w = (a: number) => `${55 + ((k * 37 + a * 23) % 40)}%`;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "18px 0", borderBottom: "2px solid #f3eee9" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 30, height: 30, borderRadius: 15, background: ["#ffd8c2", "#d6e6fb", "#d9f1ec", "#e8ddfa"][k % 4] }} />
        <div style={{ width: 160, height: 12, borderRadius: 6, background: "#e9e3de" }} />
      </div>
      <div style={{ width: w(1), height: 22, borderRadius: 8, background: "#9fb6ec" }} />
      <div style={{ width: w(2), height: 12, borderRadius: 6, background: "#ece6e1" }} />
      <div style={{ width: w(3), height: 12, borderRadius: 6, background: "#ece6e1" }} />
    </div>
  );
};

/**
 * Search page the parent types into: the query is typed letter by letter, Enter
 * is pressed, then an endless list of look-alike results pours in and scrolls.
 * Deliberately generic (no search-engine logo or name).
 */
const SearchPanel: React.FC<{ frame: number }> = ({ frame }) => {
  const enter = pop(frame, 0, 170, 15);
  const chars = Math.floor(clamp01((frame - TYPE_START) / (TYPE_END - TYPE_START)) * QUERY.length);
  const typed = QUERY.slice(0, chars);
  const pressed = frame >= ENTER_AT - 1 && frame < ENTER_AT + 3;
  const open = prog(frame, ENTER_AT + 2, 10, easeInOut);
  const scroll = Math.max(0, frame - ENTER_AT - 8);
  const scrollV = frame > ENTER_AT + 8 ? 13 : 0;
  const exit = prog(frame, 98, 10, easeIn);
  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        right: 60,
        top: 190,
        transform: `translateY(${(1 - enter) * -300 - exit * 900}px)`,
        opacity: 1 - exit,
        direction: "rtl",
        fontFamily: FA,
      }}
    >
      <Card radius={40} pad={0} style={{ overflow: "hidden" }}>
        {/* search box */}
        <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "24px 30px" }}>
          <svg width={46} height={46} viewBox="0 0 40 40" style={{ flexShrink: 0 }}>
            <circle cx={17} cy={17} r={11} fill="none" stroke={COLORS.secondary} strokeWidth={4} />
            <path d="M26 26 L35 35" stroke={COLORS.secondary} strokeWidth={4} strokeLinecap="round" />
          </svg>
          <div style={{ flex: 1, fontWeight: 700, fontSize: 46, color: COLORS.title, whiteSpace: "nowrap", overflow: "hidden", minHeight: 64, display: "flex", alignItems: "center" }}>
            {typed}
            <span style={{ display: "inline-block", width: 4, height: 54, marginRight: 4, background: COLORS.orange, opacity: frame < ENTER_AT && Math.floor(frame / 7) % 2 === 0 ? 1 : 0 }} />
          </div>
          <div
            style={{
              flexShrink: 0,
              width: 96,
              height: 96,
              borderRadius: 48,
              background: COLORS.orange,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${pressed ? 0.86 : 1 + wobble(frame - ENTER_AT - 3, 0.08, 3, 7)})`,
              boxShadow: pressed ? "none" : "0 10px 20px -8px rgba(237,95,0,0.7)",
            }}
          >
            <svg width={48} height={48} viewBox="0 0 40 40">
              <circle cx={17} cy={17} r={10} fill="none" stroke="#fff" strokeWidth={4.5} />
              <path d="M25 25 L34 34" stroke="#fff" strokeWidth={4.5} strokeLinecap="round" />
            </svg>
          </div>
        </div>
        {/* results pour in and keep scrolling: too many options, nothing clear */}
        <div style={{ height: 470 * open, overflow: "hidden", borderTop: open > 0 ? "2px solid #f3eee9" : undefined, position: "relative" }}>
          <div
            style={{
              padding: "0 34px",
              transform: `translateY(${-scroll * scrollV}px)`,
              filter: scrollV ? "blur(1.2px)" : undefined,
            }}
          >
            {new Array(14).fill(0).map((_, k) => (
              <ResultRow key={k} k={k} />
            ))}
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 120, background: "linear-gradient(rgba(255,255,255,0), #fff)" }} />
        </div>
      </Card>
    </div>
  );
};

export const S1Problem: React.FC = () => {
  const frame = useStoryFrame();

  // camera: gentle push-in, then a quick zoom towards the question mark dot at the end
  const push = 1 + frame * 0.0008;
  const outro = prog(frame, 100, 17, easeIn);

  // the same search mirrored on the student's laptop; a little jolt when results flood in
  const typedLen = clamp01((frame - TYPE_START) / (TYPE_END - TYPE_START));
  const shake = frame > ENTER_AT + 4 && frame < ENTER_AT + 18 ? Math.sin(frame * 2.4) * 8 * (1 - (frame - ENTER_AT - 4) / 14) : 0;

  // student
  const studentIn = pop(frame, 2, 160, 14);

  // big question mark drops with real bounce
  const q = bounce(frame - 62, 700, 7200, 0.42);
  const qSquash = q.squash;
  const qVisible = frame >= 62;

  // dot of the question mark becomes the orange iris for the next scene
  const qx = 900;
  const edges = useFrameEdges();
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
          left: -70 + edges.left, // keep the photo's cropped left edge off-frame in the wider feed frame
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
              <rect x="36" y="20" width="88" height="12" rx="6" fill="#f2ece7" />
              <rect x={120 - 78 * typedLen} y="24.5" width={78 * typedLen} height="3" rx="1.5" fill={COLORS.title} opacity={0.5} />
              {new Array(4).fill(0).map((_, k) => (
                <g key={k} opacity={clamp01((frame - ENTER_AT - 2 - k * 2) / 4)}>
                  <rect x={60 - (k % 2) * 10} y={38 + k * 9} width={64 + (k % 2) * 10} height="3" rx="1.5" fill="#9fb6ec" />
                  <rect x={76} y={42 + k * 9} width={48} height="2" rx="1" fill="#e2dbd5" />
                </g>
              ))}
            </g>
          }
        />
      </div>

      {/* falling textbooks with physics */}
      <Book frame={frame} at={8} x={900} ground={1700} w={170} h={56} color={COLORS.orange} rot={-14} h0={900} />
      <Book frame={frame} at={14} x={912} ground={1644} w={150} h={50} color={COLORS.teal} rot={10} h0={950} />
      <Book frame={frame} at={20} x={905} ground={1594} w={160} h={48} color={COLORS.purple} rot={-8} h0={1000} />
      <Shockwave frame={frame - 15} x={985} y={1700} color={COLORS.title} max={180} />

      <SearchPanel frame={frame} />

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
