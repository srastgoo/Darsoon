import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { Felt, FELT, Stitch } from "./kit";
import { blinkAt, FeltPerson } from "./characters";
import { FeltBoard, Suitcase, TehranWindow } from "./StyleSample";
import { FeltBurst, LabelAt, sparklePath, starPath, useFeltFrame } from "./common";
import { bounce, clamp01, easeIn, easeInOut, easeOut, lerp, pop, prog, rand, wobble } from "../PromoV5/lib/anim";
import { EN, FA } from "../PromoV5/fonts";

const P = (x: number, y: number, children: React.ReactNode, extra?: React.CSSProperties) => (
  <div style={{ position: "absolute", left: x, top: y, ...extra }}>{children}</div>
);

/* ===================================================================== A · Tehran, packing */

const FlyingItem: React.FC<{ f: number; at: number; kind: number }> = ({ f, at, kind }) => {
  const t = clamp01((f - at) / 14);
  if (f < at || t >= 1) return null;
  const x = lerp(250, 570, t);
  const y = lerp(1250, 1500, t) - Math.sin(Math.PI * t) * 300;
  const rot = t * 360 * (kind % 2 ? 1 : -1);
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <g transform={`rotate(${rot} ${x} ${y})`}>
        <Felt shadow>
          {kind === 0 ? <rect x={x - 50} y={y - 30} width={100} height={60} rx={10} fill={FELT.orange} /> : null}
          {kind === 1 ? <rect x={x - 40} y={y - 50} width={80} height={100} rx={8} fill={FELT.blue} /> : null}
          {kind === 2 ? (
            <>
              <circle cx={x - 26} cy={y - 34} r={18} fill="#9c6b45" />
              <circle cx={x + 26} cy={y - 34} r={18} fill="#9c6b45" />
              <circle cx={x} cy={y} r={42} fill="#a7764e" />
            </>
          ) : null}
          {kind === 3 ? <rect x={x - 60} y={y - 22} width={120} height={44} rx={22} fill={FELT.red} /> : null}
        </Felt>
      </g>
    </svg>
  );
};

export const SceneTehran: React.FC = () => {
  const f = useFeltFrame();
  const boyJump = clamp01((f - 88) / 16);
  const inCase = f >= 104;
  // lid stands open behind the case, flips shut (scaleY → 0), then pops open again
  const lid = f < 124 ? 1 : f < 136 ? 1 - easeIn((f - 124) / 12) : f < 144 ? 0 : easeOut(clamp01((f - 144) / 6)) * 0.8;
  const popOut = f >= 144;
  const caseX = 400;
  const caseY = 1440;
  return (
    <AbsoluteFill>
      <FeltBoard />
      {P(260, 120, <TehranWindow />, { transform: "scale(0.92)", transformOrigin: "50% 0%" })}
      <svg width={1080} height={420} viewBox="0 0 1080 420" style={{ position: "absolute", left: 0, top: 1500 }}>
        <Felt shadow>
          <path d="M60 40 L1020 40 L1070 380 L10 380 Z" fill="#9c2f2f" />
          <path d="M120 80 L960 80 L1000 340 L80 340 Z" fill="#c9733a" />
          <ellipse cx={540} cy={210} rx={210} ry={78} fill="#2c3e63" />
          <ellipse cx={540} cy={210} rx={110} ry={38} fill="#e3a83b" />
        </Felt>
        <Stitch d="M95 60 L990 60 L1040 360 L40 360 Z" color="rgba(255,235,210,0.7)" />
      </svg>

      {/* family */}
      {P(-20, 990, <FeltPerson who="dad" size={270} mood={popOut ? "laugh" : "happy"} armL={f > 14 && f < 84 ? 70 + Math.sin(f / 3) * 10 : 8} blink={blinkAt(f)} />)}
      {P(205, 1020, <FeltPerson who="mom" size={250} mood={popOut ? "laugh" : f < 60 ? "worried" : "happy"} look={0.6} blink={blinkAt(f, 30)} />)}
      {P(860, 1170, <FeltPerson who="girl" size={215} mood={popOut ? "laugh" : "neutral"} look={-1} blink={blinkAt(f, 60)} armR={popOut ? 140 : 6} />)}

      {/* suitcase: lid behind, contents, front */}
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        <g transform={`translate(0 ${caseY + 40}) scale(1 ${lid}) translate(0 ${-(caseY + 40)})`}>
          <Felt shadow>
            <rect x={caseX + 4} y={caseY + 40 - 230} width={332} height={230} rx={26} fill="#d39a2c" />
            <rect x={caseX + 24} y={caseY + 40 - 210} width={292} height={190} rx={18} fill="#f3e6cf" />
          </Felt>
          <Stitch d={`M${caseX + 34} ${caseY - 160} H${caseX + 306} V${caseY + 10} H${caseX + 34} Z`} color="rgba(160,120,60,0.5)" />
        </g>
      </svg>
      {/* the little brother hops into the suitcase... and pops back out */}
      {!inCase
        ? P(lerp(700, 470, boyJump), lerp(1230, 1150, boyJump) - Math.sin(Math.PI * boyJump) * 240, <FeltPerson who="boy" size={200} mood={f > 86 ? "laugh" : "happy"} armL={f > 86 ? 150 : 6} armR={f > 86 ? 150 : 6} blink={blinkAt(f, 12)} />)
        : null}
      {inCase && popOut
        ? P(470, 1150 - bounce(f - 144, 120, 7000, 0.4).y * 0.6, <FeltPerson who="boy" size={200} mood="laugh" armL={160} armR={160} />)
        : null}
      {[0, 1, 2, 3].map((k) => (
        <FlyingItem key={k} f={f} at={18 + k * 17} kind={k} />
      ))}
      {P(caseX - 6, caseY - 20, <Suitcase color={FELT.mustard} w={340} h={250} />, { transform: `scale(${f >= 136 && f < 144 ? 1.04 : 1}, ${f >= 136 && f < 144 ? 0.95 : 1})`, transformOrigin: "50% 100%" })}

      <LabelAt f={f} at={6} until={64} top={720}>
        یه تصمیم بزرگ…
      </LabelAt>
      <LabelAt f={f} at={72} top={720} color={FELT.orange} text="#fff">
        برای آینده‌ی بچه‌ها
      </LabelAt>
      <FeltBurst f={f - 144} x={570} y={1240} seed={4} count={12} hearts />
    </AbsoluteFill>
  );
};

/* ===================================================================== B · takeoff */

export const FeltPlane: React.FC<{ w: number }> = ({ w }) => (
  <svg width={w} height={w * 0.5} viewBox="0 0 400 200" style={{ overflow: "visible", display: "block" }}>
    <Felt shadow>
      <path d="M150 112 L250 112 L170 200 L130 200 Z" fill="#dcd6cc" />
      <path d="M20 70 L60 70 L90 100 L30 100 Z" fill={FELT.orange} />
      <path d="M30 100 Q30 76 70 76 L330 76 Q390 82 392 104 Q390 126 330 130 L70 130 Q30 128 30 100 Z" fill="#fbf8f3" />
      <path d="M190 104 L260 104 L200 20 L170 20 Z" fill="#e7e1d7" />
      <path d="M340 84 Q380 92 384 104 L340 104 Z" fill="#7fb3d6" />
    </Felt>
    {[0, 1, 2, 3, 4, 5].map((k) => (
      <circle key={k} cx={110 + k * 34} cy={100} r={9} fill="#7fb3d6" />
    ))}
    <rect x={60} y={116} width={260} height={6} rx={3} fill={FELT.orange} opacity={0.8} />
  </svg>
);

const Cloud: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={0} r={60} fill="#fff" />
    <circle cx={60} cy={-20} r={70} fill="#fff" />
    <circle cx={130} cy={0} r={55} fill="#fff" />
    <rect x={-40} y={0} width={210} height={55} rx={27} fill="#fff" />
  </g>
);

export const SceneTakeoff: React.FC = () => {
  const f = useFeltFrame();
  const taxi = prog(f, 0, 26, easeIn);
  const lift = prog(f, 22, 56, easeIn);
  const x = lerp(-420, 260, taxi) + lift * 700;
  const y = 1380 - lift * 1100;
  const camY = lift * 700;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(#a9d3ee, #d9eef8)" }} />
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        <Felt>
          <Cloud x={120 + f * 1.2} y={360 + camY * 0.3} s={0.9} />
          <Cloud x={700 - f * 0.8} y={620 + camY * 0.3} s={0.7} />
          <Cloud x={300 + f} y={980 + camY * 0.5} s={1.1} />
        </Felt>
        <g transform={`translate(0 ${camY})`}>
          {/* Tehran on the horizon */}
          <Felt>
            <path d="M0 1400 L160 1250 L300 1360 L460 1220 L640 1380 L820 1260 L1080 1390 L1080 1500 L0 1500 Z" fill="#c7a7bb" />
            <rect x={150} y={1150} width={12} height={300} fill="#7e6c88" />
            <ellipse cx={156} cy={1220} rx={36} ry={20} fill="#8d7b98" />
          </Felt>
          <Felt shadow>
            <rect x={0} y={1480} width={1080} height={440} fill="#9fa39a" />
            <rect x={0} y={1460} width={1080} height={40} fill="#7f9a5e" />
          </Felt>
          <path d="M0 1600 H1080" stroke="#fff" strokeWidth={10} strokeDasharray="60 40" />
        </g>
      </svg>
      {P(x, y, <FeltPlane w={430} />, { transform: `rotate(${-lift * 22}deg) scale(${1 - lift * 0.35})`, transformOrigin: "50% 50%" })}
      <LabelAt f={f} at={6} top={260} rotate={2}>
        خداحافظ تهران…
      </LabelAt>
    </AbsoluteFill>
  );
};

/* ===================================================================== C · knitted globe */

// Rough continents in a simple lon/lat map space: x = (lon + 130) · 12, y = (75 − lat) · 12
const TEHRAN = { x: 2172, y: 471 };
const TORONTO = { x: 612, y: 375 };
const CTRL = { x: 1400, y: -80 };
const routeAt = (t: number) => ({
  x: (1 - t) * (1 - t) * TEHRAN.x + 2 * (1 - t) * t * CTRL.x + t * t * TORONTO.x,
  y: (1 - t) * (1 - t) * TEHRAN.y + 2 * (1 - t) * t * CTRL.y + t * t * TORONTO.y,
});
const LAND = [
  "M40 120 L300 40 L620 60 L840 180 L780 300 L700 330 L640 420 L560 470 L470 600 L380 620 L300 520 L180 470 L80 330 Z",
  "M920 0 L1180 -40 L1300 40 L1220 170 L1060 200 L960 120 Z",
  "M1450 260 L1560 150 L1700 90 L1900 60 L2050 120 L2060 260 L1950 330 L1820 380 L1700 440 L1560 430 L1500 360 Z",
  "M1480 500 L1700 470 L1960 500 L2080 620 L2160 760 L2060 900 L1960 1020 L1860 1050 L1800 900 L1700 760 L1560 700 Z",
  "M2060 120 L2400 40 L2900 80 L3100 200 L3050 420 L2800 560 L2600 600 L2450 560 L2300 530 L2200 520 L2120 470 L2060 260 Z",
  "M2050 480 L2200 500 L2260 610 L2150 690 L2060 570 Z",
];

export const SceneGlobe: React.FC = () => {
  const f = useFeltFrame();
  const t = prog(f, 12, 118, easeInOut);
  const here = routeAt(t);
  const Z = 0.8;
  const cx = 540;
  const cy = 1000;
  const R = 440;
  const camX = lerp(TEHRAN.x, TORONTO.x, easeInOut(t));
  const camY = lerp(TEHRAN.y, TORONTO.y, easeInOut(t)) - Math.sin(Math.PI * t) * 200;
  let trail = "";
  for (let k = 0; k <= 40; k++) {
    const q = routeAt((k / 40) * t);
    trail += `${k === 0 ? "M" : "L"}${q.x.toFixed(1)} ${q.y.toFixed(1)}`;
  }
  const next = routeAt(Math.min(1, t + 0.01));
  const heading = (Math.atan2(next.y - here.y, next.x - here.x) * 180) / Math.PI;
  const zoom = 1 + prog(f, 140, 20, easeIn) * 1.6;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "#2b3557" }} />
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        <Felt>
          {new Array(26).fill(0).map((_, k) => (
            <path key={k} d={sparklePath(rand(k) * 1080, rand(k * 3) * 1920, 8 + rand(k * 5) * 10)} fill="#f5e9c8" opacity={0.6 + 0.4 * Math.sin(f / 6 + k)} />
          ))}
        </Felt>
        <g transform={`translate(${cx} ${cy}) scale(${zoom}) translate(${-cx} ${-cy})`}>
          <defs>
            <clipPath id="globeClip">
              <circle cx={cx} cy={cy} r={R} />
            </clipPath>
            <radialGradient id="globeShade" cx="38%" cy="32%" r="75%">
              <stop offset="0" stopColor="#fff" stopOpacity={0.28} />
              <stop offset="0.6" stopColor="#000" stopOpacity={0} />
              <stop offset="1" stopColor="#000" stopOpacity={0.4} />
            </radialGradient>
          </defs>
          <Felt shadow>
            <circle cx={cx} cy={cy} r={R} fill="#3f86c4" />
          </Felt>
          <g clipPath="url(#globeClip)">
            <rect x={0} y={0} width={1080} height={1920} fill="url(#knit)" />
            <g transform={`translate(${cx - camX * Z} ${cy - camY * Z}) scale(${Z})`}>
              <Felt>
                {LAND.map((d, k) => (
                  <path key={k} d={d} fill={k % 2 ? "#79ad5a" : "#6aa04e"} />
                ))}
              </Felt>
              {LAND.map((d, k) => (
                <path key={`s${k}`} d={d} fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth={4} strokeDasharray="12 10" />
              ))}
              <path d={trail} fill="none" stroke="#fff" strokeWidth={9} strokeDasharray="22 14" strokeLinecap="round" />
              {/* pins */}
              {[
                { p: TEHRAN, at: 2, name: "تهران" },
                { p: TORONTO, at: 120, name: "تورنتو" },
              ].map(({ p, at, name }) => {
                const s = pop(f, at, 240, 10);
                return (
                  <g key={name} transform={`translate(${p.x} ${p.y}) scale(${s / Z})`}>
                    <Felt shadow>
                      <path d="M0 0 L-22 -46 A30 30 0 1 1 22 -46 Z" fill={FELT.orange} />
                      <circle cx={0} cy={-62} r={12} fill="#fff" />
                    </Felt>
                    <text x={0} y={-112} textAnchor="middle" fontFamily={FA} fontWeight={900} fontSize={46} fill="#fff" style={{ paintOrder: "stroke" }} stroke="#2b3557" strokeWidth={10}>
                      {name}
                    </text>
                  </g>
                );
              })}
              <g transform={`translate(${here.x} ${here.y}) rotate(${heading + 180}) scale(${1 / Z})`}>
                <g transform="translate(-90 -45) scale(0.45)">
                  <FeltPlaneSvg />
                </g>
              </g>
            </g>
          </g>
          <circle cx={cx} cy={cy} r={R} fill="url(#globeShade)" />
          <Felt shadow>
            <path d={`M${cx - 120} ${cy + R + 40} L${cx + 120} ${cy + R + 40} L${cx + 80} ${cy + R + 10} L${cx - 80} ${cy + R + 10} Z`} fill={FELT.wood} />
          </Felt>
        </g>
      </svg>
      <LabelAt f={f} at={118} top={240} color={FELT.orange} text="#fff">
        …سلام تورنتو!
      </LabelAt>
    </AbsoluteFill>
  );
};

const FeltPlaneSvg: React.FC = () => (
  <g filter="url(#felt)">
    <path d="M150 112 L250 112 L170 200 L130 200 Z" fill="#dcd6cc" />
    <path d="M20 70 L60 70 L90 100 L30 100 Z" fill={FELT.orange} />
    <path d="M30 100 Q30 76 70 76 L330 76 Q390 82 392 104 Q390 126 330 130 L70 130 Q30 128 30 100 Z" fill="#fbf8f3" />
    <path d="M190 104 L260 104 L200 20 L170 20 Z" fill="#e7e1d7" />
  </g>
);

/* ===================================================================== D · arrival in Toronto */

export const SceneToronto: React.FC = () => {
  const f = useFeltFrame();
  const walk = prog(f, 0, 40, easeOut);
  const step = (k: number) => -Math.abs(Math.sin((f + k * 3) / 3.2)) * (1 - walk) * 26;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(#dfe9f1, #f3f0ea)" }} />
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        <Felt>
          {/* Toronto skyline with the CN Tower */}
          {[0, 1, 2, 3, 4, 5, 6].map((k) => (
            <rect key={k} x={40 + k * 140} y={780 + (k % 3) * 60} width={110} height={500} fill={["#8fa3b8", "#a6b5c6", "#7d93aa"][k % 3]} />
          ))}
          <rect x={612} y={330} width={22} height={900} fill="#6f8198" />
          <ellipse cx={623} cy={560} rx={52} ry={26} fill="#7d8fa6" />
          <rect x={619} y={240} width={8} height={100} fill="#6f8198" />
        </Felt>
        <Felt shadow>
          <rect x={0} y={1240} width={1080} height={700} fill="#f7f8fa" />
          {/* house */}
          <rect x={60} y={980} width={380} height={300} fill="#e8d5bd" />
          <path d="M30 990 L250 820 L470 990 Z" fill={FELT.red} />
          <rect x={220} y={1130} width={70} height={150} rx={10} fill={FELT.wood} />
          <rect x={100} y={1050} width={80} height={70} rx={8} fill="#f6e3a3" />
          <rect x={330} y={1050} width={80} height={70} rx={8} fill="#f6e3a3" />
        </Felt>
        {/* snow and maple leaves */}
        <Felt>
          {new Array(30).fill(0).map((_, k) => {
            const y = ((rand(k) * 1920 + f * (5 + rand(k * 3) * 5)) % 1920) - 40;
            const x = rand(k * 7) * 1080 + Math.sin((f + k * 10) / 9) * 20;
            return k % 5 === 0 ? (
              <path key={k} d={starPath(x, y, 22, 0.55)} fill={FELT.red} transform={`rotate(${f * 4 + k * 30} ${x} ${y})`} />
            ) : (
              <circle key={k} cx={x} cy={y} r={7 + rand(k * 9) * 8} fill="#ffffff" />
            );
          })}
        </Felt>
      </svg>
      {P(lerp(1100, 470, walk), 1040 + step(0), <FeltPerson who="dad" size={240} mood="happy" look={-0.6} armR={30} blink={blinkAt(f)} />)}
      {P(lerp(1300, 640, walk), 1060 + step(1), <FeltPerson who="mom" size={228} mood="amazed" look={-0.4} blink={blinkAt(f, 20)} />)}
      {P(lerp(1500, 800, walk), 1150 + step(2), <FeltPerson who="girl" size={200} mood="happy" look={-0.3} blink={blinkAt(f, 40)} />)}
      {P(lerp(1650, 930, walk), 1220 + step(3), <FeltPerson who="boy" size={170} mood="laugh" armL={f > 40 ? 150 : 10} />)}
      {P(lerp(1400, 300, walk), 1440, <Suitcase color={FELT.mustard} w={200} h={150} />)}
      <LabelAt f={f} at={8} top={200}>
        شروعی تازه
      </LabelAt>
    </AbsoluteFill>
  );
};

/* ===================================================================== E · French-immersion class */

export const Chalkboard: React.FC<{ f: number; lines: string[] }> = ({ f, lines }) => (
  <div style={{ position: "absolute", left: 70, top: 300, width: 940, height: 470 }}>
    <svg width={940} height={470} viewBox="0 0 940 470" style={{ position: "absolute", inset: 0 }}>
      <Felt shadow>
        <rect x={0} y={0} width={940} height={470} rx={20} fill={FELT.wood} />
        <rect x={26} y={26} width={888} height={418} rx={12} fill="#2f5e48" />
      </Felt>
      <Stitch d="M40 40 H900 V430 H40 Z" color="rgba(255,255,255,0.3)" />
    </svg>
    <div style={{ position: "absolute", left: 60, top: 50, right: 60, direction: "ltr", fontFamily: EN, fontWeight: 700, color: "#f4f1e8", lineHeight: 1.45 }}>
      {lines.map((l, k) => (
        <div key={k} style={{ fontSize: k === 0 ? 66 : 52, opacity: prog(f, 4 + k * 8, 6), clipPath: `inset(-20% ${100 - prog(f, 4 + k * 8, 10) * 100}% -20% 0)`, filter: "url(#felt)" }}>
          {l}
        </div>
      ))}
    </div>
  </div>
);

const Desk: React.FC<{ x: number; y: number; w: number }> = ({ x, y, w }) => (
  <svg width={w} height={260} viewBox={`0 0 ${w} 260`} style={{ position: "absolute", left: x, top: y, overflow: "visible" }}>
    <Felt shadow>
      <rect x={0} y={0} width={w} height={60} rx={14} fill="#b9835a" />
      <rect x={20} y={56} width={w - 40} height={200} rx={10} fill="#a5714b" />
    </Felt>
    <Stitch d={`M14 30 H${w - 14}`} color="rgba(255,255,255,0.4)" />
  </svg>
);

const QuestionMarks: React.FC<{ f: number; x: number; y: number }> = ({ f, x, y }) => (
  <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
    {[0, 1, 2].map((k) => {
      const at = 22 + k * 18;
      if (f < at) return null;
      const s = pop(f, at, 260, 9);
      const px = x + (k - 1) * 110;
      const py = y - (k % 2) * 50 + Math.sin((f + k * 8) / 6) * 8;
      return (
        <g key={k} transform={`translate(${px} ${py}) scale(${s}) rotate(${wobble(f - at, 14)})`}>
          <Felt shadow>
            <circle r={44} fill={[FELT.orange, FELT.mustard, FELT.red][k]} />
          </Felt>
          <text y={22} textAnchor="middle" fontFamily={EN} fontWeight={800} fontSize={64} fill="#fff">
            ?
          </text>
        </g>
      );
    })}
  </svg>
);

export const SceneSchool: React.FC = () => {
  const f = useFeltFrame();
  return (
    <AbsoluteFill>
      <FeltBoard color="#efe4d4" />
      <Chalkboard f={f} lines={["Bonjour la classe !", "Les fractions :", "½ + ¼ = ?", "Lisez la page 12…"]} />
      {/* classmates raise their hands; Sara doesn't */}
      {P(30, 880, <FeltPerson who="kid" size={230} mood="happy" top="#4f7fc0" hairColor="#1c1817" armL={f > 50 ? 160 : 6} look={0.4} blink={blinkAt(f, 9)} />)}
      {P(290, 900, <FeltPerson who="kid" size={225} mood="happy" hairStyle="bob" top="#c86a8d" hairColor="#4b2c1d" armR={f > 62 ? 160 : 6} blink={blinkAt(f, 21)} />)}
      {P(600, 880, <FeltPerson who="girl" size={250} mood={f < 60 ? "confused" : "sad"} look={f < 40 ? -1 : f < 80 ? 1 : 0} blink={blinkAt(f, 33)} />)}
      <Desk x={-20} y={1380} w={560} />
      <Desk x={560} y={1380} w={540} />
      <QuestionMarks f={f} x={725} y={830} />
      <LabelAt f={f} at={6} until={72} top={110} size={56}>
        مدرسه‌ی فرنچ ایمرژن…
      </LabelAt>
      <LabelAt f={f} at={80} top={110} size={50} color={FELT.orange} text="#fff">
        درس‌ها به زبانی که هنوز بلدش نیست
      </LabelAt>
      <div style={{ position: "absolute", left: 120, top: 1500, transform: "rotate(-4deg)" }}>
        <svg width={360} height={220} viewBox="0 0 360 220">
          <Felt shadow>
            <rect x={0} y={0} width={360} height={220} rx={10} fill="#fffaf2" />
          </Felt>
          {[0, 1, 2, 3].map((k) => (
            <rect key={k} x={30} y={40 + k * 40} width={240 - (k % 2) * 60} height={10} rx={5} fill="#c9c0b5" />
          ))}
        </svg>
      </div>
    </AbsoluteFill>
  );
};

/* ===================================================================== F · the worried night */

export const SceneNight: React.FC = () => {
  const f = useFeltFrame();
  const push = 1 + f * 0.0004;
  return (
    <AbsoluteFill style={{ transform: `scale(${push})` }}>
      <AbsoluteFill style={{ background: "#2a3352" }} />
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        <Felt shadow>
          <rect x={90} y={260} width={360} height={400} rx={20} fill={FELT.wood} />
          <rect x={114} y={284} width={312} height={352} rx={12} fill="#1d2440" />
        </Felt>
        <Felt>
          <circle cx={330} cy={380} r={56} fill="#f6e7b0" />
          <circle cx={352} cy={366} r={50} fill="#1d2440" />
          {[0, 1, 2, 3].map((k) => (
            <path key={k} d={sparklePath(160 + k * 70, 520 - (k % 2) * 80, 10)} fill="#f6e7b0" />
          ))}
        </Felt>
      </svg>
      {/* warm lamp pool */}
      <AbsoluteFill style={{ background: "radial-gradient(circle at 70% 58%, rgba(255,214,140,0.55), rgba(255,214,140,0) 55%)" }} />
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        <Felt shadow>
          <rect x={800} y={560} width={16} height={420} fill="#5a4a3a" />
          <path d="M700 600 L920 600 L860 470 L760 470 Z" fill={FELT.mustard} />
        </Felt>
      </svg>
      {P(380, 820, <FeltPerson who="dad" size={260} mood="worried" armR={40} look={-0.4} blink={blinkAt(f, 5)} />)}
      {P(600, 900, <FeltPerson who="mom" size={245} mood="worried" look={-1} blink={blinkAt(f, 44)} />)}
      {P(110, 1000, <FeltPerson who="girl" size={240} mood="sad" tears={prog(f, 30, 30)} noBackpack blink={blinkAt(f, 70)} />)}
      <Desk x={0} y={1440} w={1080} />
      {/* French homework nobody at the table can read */}
      <div style={{ position: "absolute", left: 300, top: 1400, transform: "rotate(-5deg)" }}>
        <svg width={420} height={130} viewBox="0 0 420 130" style={{ overflow: "visible" }}>
          <Felt shadow>
            <rect x={0} y={0} width={420} height={130} rx={8} fill="#fffaf2" />
          </Felt>
        </svg>
        <div style={{ position: "absolute", left: 24, top: 14, fontFamily: EN, fontWeight: 700, fontSize: 30, color: "#5a4e46", direction: "ltr", lineHeight: 1.3 }}>
          Exercice 3 : Conjuguez…
          <br />
          <span style={{ color: FELT.red }}>?? ??? ????</span>
        </div>
      </div>
      <LabelAt f={f} at={8} until={78} top={120} size={46}>
        دغدغه‌ی خیلی از پدر و مادرهای مهاجر…
      </LabelAt>
      <LabelAt f={f} at={86} top={120} size={66} color={FELT.cream}>
        «نکنه عقب بمونه؟»
      </LabelAt>
    </AbsoluteFill>
  );
};

/* ===================================================================== G · the phone moment */

export const FeltPhone: React.FC<{ w: number; glow?: number }> = ({ w, glow = 0 }) => (
  <div style={{ position: "relative", width: w, height: w * 1.75 }}>
    <svg width={w} height={w * 1.75} viewBox="0 0 300 525" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
      <Felt shadow>
        <rect x={0} y={0} width={300} height={525} rx={46} fill="#2f2b2b" />
        <rect x={18} y={40} width={264} height={445} rx={26} fill="#fff8f1" />
      </Felt>
      <circle cx={150} cy={262} r={300} fill="#fff4d6" opacity={glow * 0.35} />
    </svg>
    <div style={{ position: "absolute", left: w * 0.1, top: w * 0.26, width: w * 0.8, textAlign: "center", direction: "rtl", fontFamily: FA }}>
      <Img src={staticFile("v5/brand/logo-full.png")} style={{ width: w * 0.5 }} />
      <div style={{ fontWeight: 900, fontSize: w * 0.12, color: "#3b302b", marginTop: w * 0.06, lineHeight: 1.3 }}>کلاس آنلاین فرانسه</div>
      <div style={{ fontWeight: 800, fontSize: w * 0.1, color: FELT.orange, marginTop: w * 0.04 }}>از ۱۰ دلار کانادا</div>
      <div style={{ marginTop: w * 0.07, background: FELT.orange, color: "#fff", borderRadius: 30, padding: `${w * 0.03}px 0`, fontWeight: 900, fontSize: w * 0.08 }}>جلسه معرفی رایگان</div>
    </div>
  </div>
);

export const ScenePhone: React.FC = () => {
  const f = useFeltFrame();
  const buzz = f < 34 ? Math.sin(f * 2.2) * 6 : 0;
  const close = f >= 40;
  const sparkle = prog(f, 46, 10, easeOut);
  return (
    <AbsoluteFill>
      {!close ? (
        <>
          <AbsoluteFill style={{ background: "#2a3352" }} />
          <AbsoluteFill style={{ background: "radial-gradient(circle at 62% 70%, rgba(255,214,140,0.6), rgba(255,214,140,0) 55%)" }} />
          {P(140, 860, <FeltPerson who="girl" size={300} mood={f > 18 ? "amazed" : "sad"} look={1} noBackpack blink={blinkAt(f, 3)} />)}
          <Desk x={0} y={1440} w={1080} />
          {P(600, 1240, <FeltPhone w={200} glow={0.6 + 0.4 * Math.sin(f / 2)} />, { transform: `rotate(${-80 + buzz}deg)` })}
          <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
            {f < 34
              ? [0, 1].map((k) => <path key={k} d={`M${880 + k * 30} ${1240 + k * 10} q14 20 0 40 q-14 20 0 40`} stroke="#fff" strokeWidth={6} fill="none" opacity={(f / 2) % 2 === k ? 1 : 0.3} />)
              : null}
          </svg>
          <LabelAt f={f} at={6} top={230} color={FELT.orange} text="#fff">
            تا اینکه…
          </LabelAt>
        </>
      ) : (
        <>
          <FeltBoard color="#f6e1d6" />
          <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 45%, rgba(255,236,190,${0.8 * sparkle}), rgba(255,236,190,0) 60%)` }} />
          {P(270, 520, <FeltPerson who="girl" size={540} mood={f > 110 ? "laugh" : "amazed"} sparkle={sparkle} blush={sparkle} armL={60} noBackpack blink={false} />, {
            transform: `scale(${1 + wobble(f - 46, 0.04, 2.5, 5)})`,
            transformOrigin: "50% 80%",
          })}
          {P(560, 1170, <FeltPhone w={300} glow={0.3} />, { transform: "rotate(-8deg)" })}
          <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
            <Felt>
              {new Array(9).fill(0).map((_, k) => {
                const a = (k / 9) * Math.PI * 2 + f * 0.03;
                const rr = 380 + Math.sin(f / 5 + k) * 20;
                const s = pop(f, 48 + k * 3, 260, 9);
                return <path key={k} d={sparklePath(540 + Math.cos(a) * rr, 860 + Math.sin(a) * rr * 0.8, 30 * s)} fill={[FELT.orange, FELT.mustard, "#fff"][k % 3]} />;
              })}
            </Felt>
          </svg>
        </>
      )}
      <AbsoluteFill style={{ background: "#fff8e8", opacity: f >= 36 && f < 48 ? 1 - Math.abs(f - 42) / 6 : 0 }} />
      <FeltBurst f={f - 46} x={540} y={760} seed={21} count={20} power={34} />
    </AbsoluteFill>
  );
};

/* ===================================================================== H · the online class */

export const FeltLaptop: React.FC<{ f: number; w: number }> = ({ f, w }) => (
  <div style={{ position: "relative", width: w, height: w * 0.78 }}>
    <svg width={w} height={w * 0.78} viewBox="0 0 500 390" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
      <Felt shadow>
        <rect x={30} y={0} width={440} height={300} rx={22} fill="#3a3535" />
        <path d="M0 312 H500 L470 360 H30 Z" fill="#8d8a88" />
      </Felt>
    </svg>
    <div style={{ position: "absolute", left: w * 0.1, top: w * 0.036, width: w * 0.8, height: w * 0.52, borderRadius: w * 0.025, overflow: "hidden", background: "linear-gradient(160deg, #fde3cf, #fff3e6)" }}>
      <Img src={staticFile("felt/french-teacher.webp")} style={{ position: "absolute", left: "50%", bottom: 0, height: "96%", transform: `translateX(-50%) scale(${1.02 + Math.sin(f / 18) * 0.01})`, transformOrigin: "50% 100%" }} />
      <div style={{ position: "absolute", left: w * 0.03, top: w * 0.03, display: "flex", alignItems: "center", gap: 6, background: "#fff", borderRadius: 14, padding: "2px 10px", fontFamily: FA, fontWeight: 800, fontSize: w * 0.04, color: FELT.red }}>
        <div style={{ width: 9, height: 9, borderRadius: 5, background: FELT.red, opacity: f % 30 < 18 ? 1 : 0.3 }} />
        زنده
      </div>
      <div style={{ position: "absolute", right: w * 0.03, bottom: w * 0.03, background: "rgba(255,255,255,0.94)", borderRadius: 12, padding: "2px 12px", fontFamily: FA, fontWeight: 800, fontSize: w * 0.04, color: "#3b302b", direction: "rtl" }}>
        معلم فرانسه درسون
      </div>
    </div>
  </div>
);

const Flashcard: React.FC<{ f: number; at: number; word: string; x: number; y: number; rot: number }> = ({ f, at, word, x, y, rot }) => {
  if (f < at) return null;
  const s = pop(f, at, 240, 10);
  const tick = prog(f, at + 10, 6);
  return (
    <div style={{ position: "absolute", left: x, top: y + Math.sin((f + at) / 7) * 8, transform: `scale(${s}) rotate(${rot}deg)` }}>
      <svg width={260} height={110} viewBox="0 0 260 110" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        <Felt shadow>
          <rect x={0} y={0} width={260} height={110} rx={18} fill="#fffaf2" />
        </Felt>
        <Stitch d="M10 10 H250 V100 H10 Z" color="rgba(150,120,100,0.4)" />
        <g transform={`translate(226 22) scale(${tick})`}>
          <circle r={22} fill={FELT.green} />
          <path d="M-10 0 L-3 8 L11 -8" stroke="#fff" strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
      <div style={{ position: "relative", width: 260, height: 110, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: EN, fontWeight: 800, fontSize: 40, color: "#3b302b", direction: "ltr" }}>{word}</div>
    </div>
  );
};

export const SceneOnline: React.FC = () => {
  const f = useFeltFrame();
  const stars = [40, 70, 100];
  return (
    <AbsoluteFill>
      <FeltBoard color="#f7e6d6" />
      {/* reward stars collected along the top */}
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        <Felt shadow>
          {stars.map((at, k) => {
            if (f < at) return null;
            const t = prog(f, at, 14, easeInOut);
            const x = lerp(700, 400 + k * 140, t);
            const y = lerp(1000, 420, t) - Math.sin(Math.PI * t) * 200;
            return <path key={k} d={starPath(x, y, 54)} fill={FELT.mustard} transform={`rotate(${(1 - t) * 180} ${x} ${y})`} />;
          })}
        </Felt>
      </svg>
      {P(50, 760, <FeltPerson who="girl" size={290} mood={f > 36 ? "laugh" : "happy"} look={1} armL={f > 56 ? 160 : 20} blush={0.6} noBackpack blink={blinkAt(f, 14)} />)}
      {P(820, 1000, <FeltPerson who="boy" size={200} mood="laugh" armL={f > 60 ? (Math.floor(f / 6) % 2 ? 150 : 110) : 6} armR={f > 60 ? (Math.floor(f / 6) % 2 ? 150 : 110) : 6} look={-1} />)}
      <Desk x={0} y={1440} w={1080} />
      {P(380, 1050, <FeltLaptop f={f} w={480} />)}
      <Flashcard f={f} at={28} word="Bonjour" x={60} y={560} rot={-6} />
      <Flashcard f={f} at={50} word="le chat" x={720} y={600} rot={5} />
      <Flashcard f={f} at={76} word="Merci !" x={400} y={690} rot={-3} />
      {stars.map((at, k) => (
        <FeltBurst key={k} f={f - at - 14} x={400 + k * 140} y={420} seed={30 + k} count={10} power={18} />
      ))}
      <LabelAt f={f} at={6} until={74} top={190} size={50}>
        کلاس آنلاین فرانسه با معلم متخصص
      </LabelAt>
      <LabelAt f={f} at={82} top={190} size={56} color={FELT.orange} text="#fff">
        هم‌پای برنامه‌ی مدرسه
      </LabelAt>
    </AbsoluteFill>
  );
};

/* ===================================================================== I · confident at school */

export const SceneConfident: React.FC = () => {
  const f = useFeltFrame();
  const star = pop(f, 30, 260, 9);
  const grow = prog(f, 64, 16, easeIn);
  return (
    <AbsoluteFill>
      <FeltBoard color="#efe4d4" />
      <Chalkboard f={40} lines={["Bonjour la classe !", "Les fractions :", "½ + ¼ = ¾ ✓"]} />
      {/* parents peeking through the door window */}
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        <Felt shadow>
          <rect x={820} y={830} width={220} height={520} rx={14} fill={FELT.wood} />
          <rect x={850} y={870} width={160} height={150} rx={10} fill="#dfe9f1" />
        </Felt>
      </svg>
      <div style={{ position: "absolute", left: 850, top: 870, width: 160, height: 150, overflow: "hidden", borderRadius: 10 }}>
        {P(-30, 10 + (1 - pop(f, 14)) * 140, <FeltPerson who="dad" size={120} mood="laugh" />)}
        {P(50, 18 + (1 - pop(f, 18)) * 140, <FeltPerson who="mom" size={115} mood="laugh" />)}
      </div>
      {P(40, 900, <FeltPerson who="kid" size={220} mood="amazed" top="#4f7fc0" hairColor="#1c1817" look={1} />)}
      {P(400, 820, <FeltPerson who="girl" size={270} mood="laugh" armL={165} blush={0.8} blink={blinkAt(f, 2)} />)}
      <Desk x={-20} y={1380} w={1120} />
      {/* gold star sticker → grows into the orange iris for the logo */}
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        <Felt shadow>
          <path d={starPath(535, 1180, 46 * star * (1 + grow * 60))} fill={grow > 0.2 ? FELT.logo : FELT.mustard} />
        </Felt>
      </svg>
      <FeltBurst f={f - 30} x={535} y={1180} seed={41} count={14} />
      <LabelAt f={f} at={6} until={60} top={130} size={52}>
        حالا با اعتمادبه‌نفس سر کلاسه
      </LabelAt>
    </AbsoluteFill>
  );
};

