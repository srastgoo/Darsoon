import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, STAT_INTRO, STAT_LEN } from "../timeline";
import { EN, FA } from "../fonts";
import { bounce, clamp01, easeIn, easeInOut, easeOut, lerp, pop, prog, rand, wobble } from "../lib/anim";
import { Burst, Card, Marker, Paper, Shockwave, starPath } from "../lib/visual";
import { Avatar, PhotoFill, type PersonPhoto } from "../art/Photo";

const FACES: PersonPhoto[] = ["face-boy1", "face-girl", "face-boy2", "face-boy5"];
import { CheckBadge, StarIcon, VideoIcon } from "../art/Icons";
import { Classroom } from "../art/Classroom";
import { LogoIcon } from "../art/Brand";

const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
export const toFa = (s: string) => s.replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)]);
const faInt = (n: number) => toFa(Math.round(n).toLocaleString("en-US")).replace(/,/g, "٬");

const STATS = [
  { value: 200000, label: "جلسه برگزار شده", fmt: (n: number) => `+${faInt(n)}` },
  { value: 7000, label: "شاگرد", fmt: (n: number) => `+${faInt(n)}` },
  { value: 130, label: "موضوع آموزشی", fmt: (n: number) => `+${faInt(n)}` },
  { value: 250, label: "معلم متخصص", fmt: (n: number) => `+${faInt(n)}` },
  { value: 4.9, label: "میانگین امتیازها", fmt: (n: number) => toFa(n.toFixed(1)) },
];

const at = (i: number) => STAT_INTRO + i * STAT_LEN - (i === 0 ? 12 : 0);

/** Big counter + label moment. Drops in with squash, leaves upward with smear. */
const StatMoment: React.FC<{ frame: number; i: number }> = ({ frame, i }) => {
  const s = STATS[i];
  const start = at(i);
  const local = frame - start;
  const end = i === 4 ? 999 : STAT_INTRO + (i + 1) * STAT_LEN - 5;
  if (local < 0 || frame > end + 6) return null;
  const count = interpolate(local, [0, 20], [0, s.value], { extrapolateRight: "clamp", easing: easeOut });
  const b = bounce(local, 420, 9000, 0.3);
  const exit = prog(frame, end, 6, easeIn);
  const label = pop(frame, start + 5, 200, 14);
  const pulse = local >= 20 ? wobble(local - 20, 0.06, 3, 7) : 0;
  return (
    <div
      style={{
        position: "absolute",
        top: 700,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transform: `translateY(${-exit * 500}px) scaleY(${1 + exit * 0.6})`,
        opacity: 1 - exit,
        filter: exit > 0.05 ? `blur(${exit * 10}px)` : undefined,
      }}
    >
      <div
        style={{
          direction: "ltr",
          display: "flex",
          alignItems: "center",
          gap: 20,
          fontFamily: FA,
          fontWeight: 900,
          fontSize: 210,
          lineHeight: 1,
          color: COLORS.title,
          transform: `translateY(${-b.y}px) scale(${(1 + b.squash * 0.25) * (1 + pulse)}, ${(1 - b.squash * 0.3) * (1 + pulse)})`,
          transformOrigin: "50% 100%",
          textShadow: "0 8px 0 rgba(237,95,0,0.12)",
        }}
      >
        {i === 4 ? <StarIcon size={170} /> : null}
        <span style={{ color: i === 4 ? COLORS.star : COLORS.title }}>{s.fmt(i === 4 ? Math.min(4.9, count) : count)}</span>
      </div>
      <div
        style={{
          marginTop: 26,
          fontFamily: FA,
          fontWeight: 800,
          fontSize: 72,
          color: COLORS.orange,
          background: COLORS.ctaBg,
          borderRadius: 60,
          padding: "6px 46px",
          transform: `scale(${label}) rotate(${(1 - label) * -8}deg)`,
          direction: "rtl",
        }}
      >
        {s.label}
      </div>
    </div>
  );
};

/** Persistent dashboard header: growth chart drawing upward all scene long. */
const GrowthCard: React.FC<{ frame: number }> = ({ frame }) => {
  const enter = pop(frame, 4, 160, 16);
  const p = prog(frame, 6, 170, easeInOut);
  const pts = [
    [40, 250],
    [150, 232],
    [260, 238],
    [370, 196],
    [480, 172],
    [590, 178],
    [700, 120],
    [810, 70],
    [900, 30],
  ];
  const d = pts.map((q, k) => `${k === 0 ? "M" : "L"}${q[0]} ${q[1]}`).join(" ");
  const headIdx = Math.min(pts.length - 1, Math.floor(p * (pts.length - 1)));
  const frac = p * (pts.length - 1) - headIdx;
  const nxt = pts[Math.min(pts.length - 1, headIdx + 1)];
  const hx = lerp(pts[headIdx][0], nxt[0], frac);
  const hy = lerp(pts[headIdx][1], nxt[1], frac);
  return (
    <div style={{ position: "absolute", left: 60, top: 150, transform: `translateY(${(1 - enter) * -400}px)` }}>
      <Card radius={40} pad={0} style={{ width: 960, height: 400, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: 36, top: 26, fontFamily: FA, fontWeight: 800, fontSize: 36, color: COLORS.title, direction: "rtl" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
            <LogoIcon size={44} />
            رشد
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            left: 36,
            top: 24,
            fontFamily: EN,
            fontWeight: 700,
            fontSize: 30,
            color: COLORS.green,
            background: "#e8f6ea",
            borderRadius: 30,
            padding: "4px 16px",
          }}
        >
          ▲ {Math.round(p * 38)}%
        </div>
        <svg width={960} height={400} style={{ position: "absolute", left: 0, top: 90 }}>
          {new Array(9).fill(0).map((_, k) => {
            const h = 40 + rand(k + 3) * 60 + k * 22;
            const g = prog(frame, 10 + k * 3, 14, easeOut);
            return <rect key={k} x={40 + k * 110 - 22} y={290 - h * g} width={44} height={h * g} rx={12} fill={COLORS.ctaBg} />;
          })}
          <path d={`${d} L900 300 L40 300 Z`} fill="url(#v5area)" opacity={p} style={{ clipPath: `inset(0 ${100 - p * 100}% 0 0)` }} />
          <defs>
            <linearGradient id="v5area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={COLORS.orange} stopOpacity={0.25} />
              <stop offset="1" stopColor={COLORS.orange} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Marker d={d} p={p} width={9} />
          <circle cx={hx} cy={hy} r={14 + Math.sin(frame / 3) * 3} fill={COLORS.orange} />
          <circle cx={hx} cy={hy} r={28} fill={COLORS.orange} opacity={0.18} />
        </svg>
      </Card>
    </div>
  );
};

/** Stat 1 visual: the classroom multiplies into a wall of live sessions. */
const SessionWall: React.FC<{ frame: number }> = ({ frame }) => {
  const zoom = prog(frame, 0, 26, easeInOut);
  const out = prog(frame, at(1) - 5, 8, easeIn);
  if (out >= 1) return null;
  const cols = 9;
  const rows = 11;
  const cell = 110;
  const scale = lerp(3.1, 1, zoom);
  return (
    <div
      style={{
        position: "absolute",
        left: 540,
        top: 1240,
        transform: `translate(-50%, -50%) scale(${scale * (1 - out * 0.4)})`,
        opacity: 1 - out,
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, ${cell}px)`, gap: 12 }}>
        {new Array(cols * rows).fill(0).map((_, k) => {
          const center = k === Math.floor((cols * rows) / 2);
          const r = Math.hypot((k % cols) - 4, Math.floor(k / cols) - 5);
          const appear = center ? 1 : prog(frame, 4 + r * 2.2, 8, easeOut);
          const tone = [COLORS.ctaBg, "#e7f0fb", "#e6f6f3", "#f1eafc"][k % 4];
          return (
            <div
              key={k}
              style={{
                width: cell,
                height: cell * 0.78,
                borderRadius: 16,
                background: center ? COLORS.orange : tone,
                transform: `scale(${appear})`,
                position: "relative",
                opacity: 0.35 + 0.65 * (1 - Math.min(1, r / 7)),
              }}
            >
              <div style={{ position: "absolute", left: "34%", top: "18%", width: "32%", height: "40%", borderRadius: "50%", background: center ? "#fff" : "rgba(69,66,66,0.22)" }} />
              <div style={{ position: "absolute", left: "22%", bottom: 0, width: "56%", height: "26%", borderRadius: "40% 40% 0 0", background: center ? "#fff" : "rgba(69,66,66,0.22)" }} />
            </div>
          );
        })}
      </div>
      {frame < 14 ? (
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: `translate(-50%, -50%) scale(${lerp(0.123, 0.0395, zoom)})`, opacity: 1 - prog(frame, 6, 8) }}>
          <Classroom frame={60} still />
        </div>
      ) : null}
      <div style={{ position: "absolute", right: -40, top: -60, transform: `scale(${pop(frame, at(0) + 6) / scale})`, transformOrigin: "100% 0%" }}>
        <VideoIcon size={150} />
      </div>
    </div>
  );
};

/** Stat 2 visual: student avatars rain down with physics into a pile. */
const StudentRain: React.FC<{ frame: number }> = ({ frame }) => {
  const start = at(1);
  const out = prog(frame, at(2) - 5, 8, easeIn);
  if (frame < start - 4 || out >= 1) return null;
  const items = new Array(26).fill(0).map((_, k) => {
    const col = k % 9;
    const row = Math.floor(k / 9);
    const x = 70 + col * 112 + (row % 2) * 56;
    const ground = 1780 - row * 120;
    const delay = start - 4 + rand(k * 7) * 12 + row * 3;
    return { x, ground, delay, k };
  });
  return (
    <div style={{ position: "absolute", inset: 0, opacity: 1 - out, transform: `translateY(${out * 200}px)` }}>
      {items.map(({ x, ground, delay, k }) => {
        if (frame < delay) return null;
        const b = bounce(frame - delay, 900 + rand(k) * 400, 7800, 0.42);
        const sx = 1 + b.squash * 0.35;
        const sy = 1 - b.squash * 0.35;
        const face = FACES[k % FACES.length];
        const ring = [COLORS.orange, COLORS.blue, COLORS.teal, COLORS.purple, COLORS.yellow][k % 5];
        return (
          <div
            key={k}
            style={{
              position: "absolute",
              left: x - 55,
              top: ground - 110 - b.y,
              transform: `scale(${sx}, ${sy}) rotate(${b.landed ? wobble(frame - delay - 8, 6) : (rand(k) - 0.5) * 30}deg)`,
              transformOrigin: "50% 100%",
            }}
          >
            <Avatar name={face} size={110} ring={ring} />
          </div>
        );
      })}
    </div>
  );
};

const ORBIT = ["π", "∑", "H₂O", "DNA", "E=mc²", "ABC", "√x", "⚛"];

/** Stat 3 visual: subject icons orbit around the counter. */
const SubjectOrbit: React.FC<{ frame: number }> = ({ frame }) => {
  const start = at(2);
  const local = frame - start;
  const out = prog(frame, at(3) - 5, 8, easeIn);
  if (local < -2 || out >= 1) return null;
  const spread = pop(frame, start, 150, 13);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: 1 - out }}>
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        <ellipse cx={540} cy={1060} rx={460 * spread} ry={520 * spread} fill="none" stroke={COLORS.paperLine} strokeWidth={4} strokeDasharray="14 18" />
      </svg>
      {ORBIT.map((t, k) => {
        const a = (k / ORBIT.length) * Math.PI * 2 + local * 0.045;
        const x = 540 + Math.cos(a) * 460 * spread * (1 + out * 0.6);
        const y = 1060 + Math.sin(a) * 520 * spread * (1 + out * 0.6);
        const c = [COLORS.orange, COLORS.blue, COLORS.teal, COLORS.green, COLORS.purple, COLORS.red, COLORS.yellow, COLORS.blue][k];
        return (
          <div
            key={k}
            style={{
              position: "absolute",
              left: x - 70,
              top: y - 70,
              width: 140,
              height: 140,
              borderRadius: 40,
              background: "#fff",
              boxShadow: "0 18px 30px -10px rgba(110,70,40,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: EN,
              fontWeight: 800,
              fontSize: t.length > 3 ? 36 : 60,
              color: c,
              transform: `rotate(${Math.sin(a) * 12}deg) scale(${pop(frame, start + k * 1.5)})`,
              direction: "ltr",
            }}
          >
            {t}
          </div>
        );
      })}
    </div>
  );
};

/** Stat 4 visual: fanned hand of verified tutor cards. */
const TutorFan: React.FC<{ frame: number }> = ({ frame }) => {
  const start = at(3);
  const out = prog(frame, at(4) - 5, 8, easeIn);
  if (frame < start - 2 || out >= 1) return null;
  const fan = pop(frame, start, 150, 14);
  const tutors: { photo: PersonPhoto; pos: string }[] = [
    // Darsoon's own tutors (client-supplied photos)
    { photo: "team-4", pos: "50% 30%" },
    { photo: "team-3", pos: "50% 30%" },
    { photo: "team-1", pos: "50% 30%" },
    { photo: "team-2", pos: "50% 30%" },
  ];
  return (
    <div style={{ position: "absolute", left: 540, top: 1820, opacity: 1 - out, transform: `translateY(${out * 300}px)` }}>
      {tutors.map((t, k) => {
        const ang = (k - (tutors.length - 1) / 2) * 17 * fan;
        return (
          <div
            key={k}
            style={{
              position: "absolute",
              left: -150,
              top: -640,
              transformOrigin: "50% 160%",
              transform: `rotate(${ang}deg) translateY(${(1 - fan) * 300}px)`,
            }}
          >
            <Card radius={30} pad={0} style={{ width: 300, height: 400, overflow: "hidden", position: "relative" }}>
              <div style={{ height: 290, background: [COLORS.ctaBg, "#e7f0fb", "#e6f6f3", "#f1eafc", "#fff4dd"][k], overflow: "hidden" }}>
                <PhotoFill name={t.photo} position={t.pos} />
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 22 }}>
                {new Array(5).fill(0).map((_, z) => (
                  <StarIcon key={z} size={30} />
                ))}
              </div>
              <div style={{ position: "absolute", right: 14, top: 14, transform: `scale(${pop(frame, start + 6 + k * 2)})` }}>
                <CheckBadge size={58} p={prog(frame, start + 8 + k * 2, 6)} />
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

/** Stat 5 visual: stars drop and bounce, rating bars fill. */
const RatingDrop: React.FC<{ frame: number }> = ({ frame }) => {
  const start = at(4);
  if (frame < start - 2) return null;
  const out = prog(frame, 172, 8, easeIn);
  const bars = [92, 6, 1.4, 0.4, 0.2];
  return (
    <div style={{ position: "absolute", inset: 0, opacity: 1 - out }}>
      {new Array(5).fill(0).map((_, k) => {
        const delay = start + 2 + k * 3;
        if (frame < delay) return null;
        const b = bounce(frame - delay, 700, 9000, 0.4);
        const x = 540 + (k - 2) * 170;
        return (
          <div
            key={k}
            style={{
              position: "absolute",
              left: x - 70,
              top: 1300 - 140 - b.y,
              transform: `scale(${1 + b.squash * 0.4}, ${1 - b.squash * 0.4}) rotate(${wobble(frame - delay - 8, 10)}deg)`,
              transformOrigin: "50% 100%",
            }}
          >
            <svg width={140} height={140} viewBox="-50 -50 100 100">
              <path d={starPath(46, 20)} fill={COLORS.star} stroke={COLORS.star} strokeWidth={6} strokeLinejoin="round" />
            </svg>
          </div>
        );
      })}
      <div style={{ position: "absolute", left: 160, top: 1380, width: 760 }}>
        {bars.map((v, k) => {
          const g = prog(frame, start + 6 + k * 2, 14, easeOut);
          return (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 18, direction: "rtl" }}>
              <div style={{ fontFamily: FA, fontWeight: 800, fontSize: 34, color: COLORS.secondary, width: 40 }}>{toFa(String(5 - k))}</div>
              <div style={{ flex: 1, height: 26, borderRadius: 13, background: "#f1ebe6", overflow: "hidden" }}>
                <div style={{ width: `${Math.max(2, v) * g}%`, height: "100%", borderRadius: 13, background: k === 0 ? COLORS.star : "#e6d9cf" }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const S3Stats: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Paper />
      <SessionWall frame={frame} />
      <StudentRain frame={frame} />
      <SubjectOrbit frame={frame} />
      <TutorFan frame={frame} />
      <RatingDrop frame={frame} />
      <GrowthCard frame={frame} />

      {/* soft halo so numbers always read over visuals */}
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 640,
          width: 900,
          height: 420,
          borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(252,249,247,0.96), rgba(252,249,247,0.85) 60%, rgba(252,249,247,0))",
          opacity: prog(frame, at(0) - 4, 8),
        }}
      />
      {STATS.map((_, i) => (
        <StatMoment key={i} frame={frame} i={i} />
      ))}
      {STATS.map((_, i) => (
        <React.Fragment key={`fx${i}`}>
          <Shockwave frame={frame - at(i) - 9} x={540} y={900} max={420} />
          <Burst frame={frame - at(i) - 9} x={540} y={880} seed={i * 5 + 2} count={16} power={26} />
        </React.Fragment>
      ))}

      {/* progress dots */}
      <div style={{ position: "absolute", bottom: 70, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 16, direction: "rtl" }}>
        {STATS.map((_, i) => {
          const active = frame >= at(i) && (i === 4 || frame < at(i + 1));
          return (
            <div
              key={i}
              style={{
                width: active ? 56 : 16,
                height: 16,
                borderRadius: 8,
                background: frame >= at(i) ? COLORS.orange : "#e6ddd5",
                opacity: clamp01(frame / 10),
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
