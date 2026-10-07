import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { BENEFIT_LEN, COLORS } from "../timeline";
import { EN, FA } from "../fonts";
import { bounce, easeInOut, easeOut, jitter, pendulum, pop, prog, rand, wobble } from "../lib/anim";
import { Burst, Card, Doodles, Marker, Paper, Shockwave } from "../lib/visual";
import { KineticText } from "../lib/KineticText";
import { Avatar, Cutout, PhotoFill } from "../art/Photo";
import { CoinIcon, HeartIcon, MapleLeaf, StarIcon } from "../art/Icons";

const Headline: React.FC<{ frame: number; text: string; accent: string[]; underline?: string[]; highlight?: string[]; size?: number }> = ({
  frame,
  text,
  accent,
  underline,
  highlight,
  size = 88,
}) => (
  <div style={{ position: "absolute", top: 190, left: 0, right: 0 }}>
    <KineticText text={text} frame={frame} start={4} size={size} stagger={3} accent={accent} underline={underline} highlight={highlight} />
  </div>
);

/* ------------------------------------------------------------- Benefit 1: Canada */

const FallingLeaf: React.FC<{ frame: number; seed: number }> = ({ frame, seed }) => {
  const t = frame + rand(seed) * 40;
  const x = rand(seed * 3) * 1000 + Math.sin(t / 9 + seed) * 60;
  const y = -120 + t * (7 + rand(seed * 5) * 4);
  const r = Math.sin(t / 7 + seed) * 40;
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `rotate(${r}deg)`, opacity: 0.85 }}>
      <MapleLeaf size={50 + rand(seed * 7) * 40} />
    </div>
  );
};

const SchoolBuilding: React.FC<{ frame: number }> = ({ frame }) => {
  const rise = pop(frame, 2, 150, 14);
  const flag = (y: number) => Math.sin(frame / 3 + y / 14) * 6;
  return (
    <svg width={760} height={560} viewBox="0 0 760 560" style={{ overflow: "visible", transform: `translateY(${(1 - rise) * 300}px)` }}>
      {/* flag pole + waving Canadian flag */}
      <rect x={366} y={0} width={10} height={170} rx={4} fill={COLORS.title} />
      <g transform="translate(376 14)">
        <path
          d={`M0 ${flag(0)} Q60 ${-8 + flag(40)} 120 ${flag(80)} Q180 ${8 + flag(120)} 240 ${flag(160)} L240 ${120 + flag(160)} Q180 ${128 + flag(120)} 120 ${120 + flag(80)} Q60 ${112 + flag(40)} 0 ${120 + flag(0)} Z`}
          fill="#fff"
          stroke="#eadfd6"
          strokeWidth={3}
        />
        <path d={`M0 ${flag(0)} L60 ${-4 + flag(30)} L60 ${116 + flag(30)} L0 ${120 + flag(0)} Z`} fill={COLORS.red} />
        <path d={`M180 ${4 + flag(130)} L240 ${flag(160)} L240 ${120 + flag(160)} L180 ${124 + flag(130)} Z`} fill={COLORS.red} />
        <g transform={`translate(98 ${30 + flag(80)}) scale(0.62)`}>
          <path d="M50 4 L57 20 L66 15 L63 38 L76 26 L79 34 L94 31 L88 45 L96 50 L72 68 L75 77 L52 73 L53 96 L47 96 L48 73 L25 77 L28 68 L4 50 L12 45 L6 31 L21 34 L24 26 L37 38 L34 15 L43 20 Z" fill={COLORS.red} />
        </g>
      </g>
      {/* building */}
      <path d="M150 260 L380 170 L610 260 Z" fill={COLORS.orange} />
      <rect x={170} y={258} width={420} height={280} fill="#fff" stroke="#eadfd6" strokeWidth={4} />
      <rect x={30} y={330} width={160} height={208} fill="#fff7f0" stroke="#eadfd6" strokeWidth={4} />
      <rect x={570} y={330} width={160} height={208} fill="#fff7f0" stroke="#eadfd6" strokeWidth={4} />
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <rect x={210 + k * 120} y={290} width={70} height={70} rx={10} fill="#d9ecff" />
          <rect x={60 + (k % 2) * 60} y={366} width={44} height={56} rx={8} fill="#d9ecff" />
          <rect x={600 + (k % 2) * 60} y={366} width={44} height={56} rx={8} fill="#d9ecff" />
        </g>
      ))}
      <rect x={330} y={420} width={100} height={118} rx={14} fill={COLORS.title} />
      <circle cx={380} cy={222} r={26} fill="#fff" />
      <path d={`M380 222 L380 206 M380 222 L392 228`} stroke={COLORS.title} strokeWidth={5} strokeLinecap="round" />
      <rect x={0} y={536} width={760} height={14} rx={7} fill="#e6ddd5" />
    </svg>
  );
};

const Curriculum: React.FC<{ frame: number }> = ({ frame }) => {
  const enter = pop(frame, 10, 180, 13);
  const items = ["Grade 9 · Math", "Science · Gr. 10", "IB / AP Ready"];
  return (
    <div style={{ transform: `translateX(${(1 - enter) * -500}px) rotate(${-8 + (1 - enter) * -20}deg)` }}>
      <Card radius={26} pad={30} style={{ width: 420, direction: "ltr" }}>
        <div style={{ fontFamily: EN, fontWeight: 800, fontSize: 30, color: COLORS.red, display: "flex", alignItems: "center", gap: 10 }}>
          <MapleLeaf size={36} /> Canadian Curriculum
        </div>
        <div style={{ height: 4, background: "#f1ebe6", margin: "16px 0" }} />
        {items.map((t, k) => {
          const p = prog(frame, 20 + k * 6, 8);
          return (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 14, margin: "14px 0", fontFamily: EN, fontWeight: 500, fontSize: 30, color: COLORS.title }}>
              <svg width={40} height={40} viewBox="0 0 40 40" style={{ overflow: "visible" }}>
                <rect x={3} y={3} width={34} height={34} rx={8} fill="none" stroke="#d8ccc2" strokeWidth={4} />
                <Marker d="M8 20 L17 30 L36 4" p={p} color={COLORS.green} width={6} />
              </svg>
              {t}
            </div>
          );
        })}
      </Card>
    </div>
  );
};

const BenefitCanada: React.FC = () => {
  const frame = useCurrentFrame();
  const teacherIn = pop(frame, 14, 170, 14);
  return (
    <AbsoluteFill>
      <Paper />
      {new Array(7).fill(0).map((_, k) => (
        <FallingLeaf key={k} frame={frame} seed={k + 1} />
      ))}
      <Headline frame={frame} text={"معلم‌هایی آشنا با\nبرنامه درسی مدارس کانادا"} accent={["کانادا"]} underline={["کانادا"]} size={84} />
      <div style={{ position: "absolute", left: 160, top: 620, transform: "scale(1.18)", transformOrigin: "50% 0%" }}>
        <SchoolBuilding frame={frame} />
      </div>
      <div style={{ position: "absolute", left: 40, top: 1240, transform: "scale(1.15)", transformOrigin: "0% 0%" }}>
        <Curriculum frame={frame} />
      </div>
      {/* real tutor explaining a lesson over video */}
      <div style={{ position: "absolute", left: 540, top: 1290, transform: `translateX(${(1 - teacherIn) * 600}px) rotate(${4 - (1 - teacherIn) * 10}deg)` }}>
        <Card radius={30} pad={12} style={{ width: 500, position: "relative" }}>
          <div style={{ width: 476, height: 308, borderRadius: 22, overflow: "hidden" }}>
            <div style={{ width: "100%", height: "100%", transform: `scale(${1.02 + frame * 0.001})` }}>
              <PhotoFill name="tutor-bio-wide" position="50% 40%" />
            </div>
          </div>
          <div style={{ position: "absolute", left: 28, top: 26, display: "flex", alignItems: "center", gap: 8, background: "#fff", borderRadius: 20, padding: "4px 14px", fontFamily: FA, fontWeight: 800, fontSize: 24, color: COLORS.red }}>
            <div style={{ width: 10, height: 10, borderRadius: 5, background: COLORS.red, opacity: frame % 30 < 18 ? 1 : 0.3 }} />
            زنده
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------- Benefit 2: Personalised */

const ProgressRing: React.FC<{ frame: number }> = ({ frame }) => {
  const p = prog(frame, 8, 30, easeOut);
  const v = Math.round(p * 92);
  const r = 170;
  const c = 2 * Math.PI * r;
  const enter = pop(frame, 2, 170, 12);
  return (
    <div style={{ position: "relative", width: 420, height: 420, transform: `scale(${enter})` }}>
      <svg width={420} height={420} viewBox="0 0 420 420">
        <circle cx={210} cy={210} r={r} fill="#fff" stroke="#f1ebe6" strokeWidth={40} />
        <circle
          cx={210}
          cy={210}
          r={r}
          fill="none"
          stroke={COLORS.orange}
          strokeWidth={40}
          strokeLinecap="round"
          strokeDasharray={`${c * p * 0.92} ${c}`}
          transform="rotate(-90 210 210)"
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: FA, fontWeight: 900, fontSize: 110, color: COLORS.title, lineHeight: 1 }}>
          {`٪${"۰۱۲۳۴۵۶۷۸۹".split("").reduce((acc, d, i) => acc.replace(new RegExp(String(i), "g"), d), String(v))}`}
        </div>
        <div style={{ fontFamily: FA, fontWeight: 700, fontSize: 34, color: COLORS.secondary, direction: "rtl" }}>پیشرفت آرمان</div>
      </div>
    </div>
  );
};

const StudyPlan: React.FC<{ frame: number }> = ({ frame }) => {
  const enter = pop(frame, 6, 180, 14);
  const tasks = ["مرور جبر", "تمرین هندسه", "آزمونک آمار"];
  return (
    <div style={{ transform: `translateX(${(1 - enter) * 500}px) rotate(${5}deg)` }}>
      <Card radius={28} pad={28} style={{ width: 400, direction: "rtl" }}>
        <div style={{ fontFamily: FA, fontWeight: 900, fontSize: 38, color: COLORS.title, marginBottom: 8 }}>برنامه این هفته</div>
        {tasks.map((t, k) => {
          const p = prog(frame, 16 + k * 7, 8);
          return (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 14, margin: "16px 0", fontFamily: FA, fontWeight: 700, fontSize: 34, color: p > 0.9 ? COLORS.secondary : COLORS.title, position: "relative" }}>
              <svg width={44} height={44} viewBox="0 0 40 40" style={{ overflow: "visible", flexShrink: 0 }}>
                <circle cx={20} cy={20} r={17} fill={p > 0.5 ? COLORS.orange : "none"} stroke={p > 0.5 ? COLORS.orange : "#d8ccc2"} strokeWidth={4} />
                <path d="M11 21 L18 28 L30 13" fill="none" stroke="#fff" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - p} />
              </svg>
              <span style={{ position: "relative" }}>
                {t}
                <svg viewBox="0 0 100 10" preserveAspectRatio="none" style={{ position: "absolute", left: -4, right: -4, top: "52%", width: "106%", height: 10, overflow: "visible" }}>
                  <Marker d="M100 5 L0 6" p={p} color={COLORS.orange} width={4} rough={false} />
                </svg>
              </span>
            </div>
          );
        })}
      </Card>
    </div>
  );
};

const Feedback: React.FC<{ frame: number }> = ({ frame }) => {
  const s = pop(frame, 26, 220, 11);
  return (
    <div style={{ transform: `scale(${s}) rotate(${(1 - s) * -10 - 3}deg)`, transformOrigin: "90% 100%" }}>
      <div
        style={{
          background: COLORS.orange,
          color: "#fff",
          borderRadius: "40px 40px 8px 40px",
          padding: "26px 36px",
          fontFamily: FA,
          fontWeight: 800,
          fontSize: 40,
          direction: "rtl",
          boxShadow: "0 20px 40px -12px rgba(237,95,0,0.55)",
          width: 420,
        }}
      >
        آفرین! این هفته عالی پیش رفتی
        <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
          {new Array(5).fill(0).map((_, k) => (
            <div key={k} style={{ transform: `scale(${pop(frame, 32 + k * 2)})` }}>
              <StarIcon size={40} color="#fff" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BenefitPersonal: React.FC = () => {
  const frame = useCurrentFrame();
  const path = prog(frame, 6, 34, easeInOut);
  const kid = bounce(frame - 40, 60, 5000, 0.4);
  return (
    <AbsoluteFill>
      <Paper tint="#fdf6f0" />
      <Doodles frame={frame + 300} seed={5} opacity={0.4} />
      <Headline frame={frame} text={"یادگیری\nشخصی‌سازی‌شده"} accent={["شخصی‌سازی‌شده"]} highlight={["یادگیری"]} size={104} />
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        <Marker d="M220 1720 C 120 1560 360 1500 330 1360 C 300 1220 120 1180 220 1000" p={path} color={COLORS.title} width={6} />
        <circle cx={220} cy={1000} r={18 * prog(frame, 38, 6)} fill={COLORS.orange} />
      </svg>
      <div style={{ position: "absolute", left: 600, top: 600 }}>
        <StudyPlan frame={frame} />
      </div>
      <div style={{ position: "absolute", left: 60, top: 640 }}>
        <ProgressRing frame={frame} />
      </div>
      <div style={{ position: "absolute", left: 560, top: 1180 }}>
        <Feedback frame={frame} />
      </div>
      <div style={{ position: "absolute", left: 40, top: 1450 - kid.y, transform: `scale(${1 + kid.squash * 0.15}, ${1 - kid.squash * 0.15})`, transformOrigin: "50% 100%" }}>
        <Cutout name="kid-girl" height={470} frame={frame} seed={5} />
      </div>
      <div style={{ position: "absolute", left: 880, top: 1450, transform: `scale(${pop(frame, 22)})` }}>
        <Avatar name="face-tutor-math" size={150} ring={COLORS.orange} />
      </div>
      <Burst frame={frame - 40} x={240} y={1500} seed={21} count={16} />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------- Benefit 3: Price */

const BalanceScale: React.FC<{ frame: number }> = ({ frame }) => {
  // beam starts tipped toward "price", released at f=10 and settles balanced (damped pendulum)
  const ang = frame < 10 ? 18 : pendulum(frame - 10, 18, 26, 2.2);
  const rad = (ang * Math.PI) / 180;
  const half = 330;
  const lx = -Math.cos(rad) * half;
  const ly = -Math.sin(rad) * half;
  const rx = Math.cos(rad) * half;
  const ry = Math.sin(rad) * half;
  const coinDrop = (k: number) => bounce(frame - 2 - k * 4, 500, 8000, 0.3);
  const Pan: React.FC<{ x: number; y: number; label: string; children: React.ReactNode }> = ({ x, y, label, children }) => (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 0 L-90 150 M0 0 L90 150" stroke={COLORS.title} strokeWidth={5} />
      <path d="M-120 150 Q0 220 120 150 Z" fill={COLORS.title} />
      <g transform="translate(0 150)">{children}</g>
      <text x={0} y={260} textAnchor="middle" fontFamily={FA} fontWeight={900} fontSize={48} fill={COLORS.title}>
        {label}
      </text>
    </g>
  );
  return (
    <svg width={1000} height={760} viewBox="-500 -120 1000 760" style={{ overflow: "visible" }}>
      <path d="M0 0 L-70 560 L70 560 Z" fill="#e6ddd5" />
      <rect x={-180} y={548} width={360} height={30} rx={15} fill={COLORS.title} />
      <g>
        <line x1={lx} y1={ly} x2={rx} y2={ry} stroke={COLORS.title} strokeWidth={22} strokeLinecap="round" />
        <circle r={30} fill={COLORS.orange} />
      </g>
      <Pan x={rx} y={ry} label="کیفیت">
        <g transform={`translate(0 ${-70}) scale(${pop(frame, 4)})`}>
          <path d="M0 -60 L16 -20 L58 -18 L25 8 L36 50 L0 26 L-36 50 L-25 8 L-58 -18 L-16 -20 Z" fill={COLORS.star} />
        </g>
      </Pan>
      <Pan x={lx} y={ly} label="قیمت">
        {[0, 1, 2].map((k) => {
          const b = coinDrop(k);
          return frame >= 2 + k * 4 ? (
            <g key={k} transform={`translate(${(k - 1) * 8} ${-30 - k * 26 - b.y}) scale(${1 + b.squash * 0.2}, ${1 - b.squash * 0.3})`}>
              <ellipse rx={56} ry={18} fill="#e09a00" />
              <ellipse cy={-8} rx={56} ry={18} fill={COLORS.yellow} />
            </g>
          ) : null;
        })}
      </Pan>
    </svg>
  );
};

const PriceTag: React.FC<{ frame: number }> = ({ frame }) => {
  const ang = pendulum(frame - 4, 28, 30, 1.6);
  const drop = bounce(frame - 2, 300, 7000, 0.25);
  return (
    <div style={{ position: "absolute", left: 30, top: 420 - drop.y, transformOrigin: "50% 0%", transform: `rotate(${ang}deg)` }}>
      <svg width={150} height={350} viewBox="0 0 180 420" style={{ overflow: "visible" }}>
        <path d="M90 0 V200" stroke={COLORS.title} strokeWidth={4} strokeDasharray="10 8" />
        <path d="M40 220 L90 190 L140 220 V380 Q140 400 120 400 H60 Q40 400 40 380 Z" fill={COLORS.ctaBg} stroke={COLORS.ctaText} strokeWidth={6} strokeLinejoin="round" />
        <circle cx={90} cy={222} r={12} fill="#fff" stroke={COLORS.ctaText} strokeWidth={5} />
        <text x={90} y={318} textAnchor="middle" fontFamily={EN} fontWeight={800} fontSize={58} fill={COLORS.ctaText}>
          $
        </text>
        <path d="M58 352 Q90 340 122 352" stroke={COLORS.ctaText} strokeWidth={6} fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
};

const BenefitPrice: React.FC = () => {
  const frame = useCurrentFrame();
  const heart = pop(frame, 34, 260, 9);
  return (
    <AbsoluteFill>
      <Paper />
      <Doodles frame={frame + 600} seed={8} opacity={0.4} />
      <PriceTag frame={frame} />
      <Headline frame={frame} text={"قیمت مناسب برای\nیادگیری باکیفیت"} accent={["مناسب"]} underline={["باکیفیت"]} size={90} />
      <div style={{ position: "absolute", left: 40, top: 760 }}>
        <BalanceScale frame={frame} />
      </div>
      <div style={{ position: "absolute", left: 540, top: 1500, transform: `translateY(${(1 - pop(frame, 6, 160, 14)) * 400}px)` }}>
        <Cutout name="kid-laptop" height={420} frame={frame} seed={6} />
      </div>
      <div style={{ position: "absolute", left: 30, top: 1490, transform: `translateY(${(1 - pop(frame, 10, 160, 14)) * 400}px)` }}>
        <Cutout name="kid-desk" height={430} frame={frame} seed={7} flip />
      </div>
      <div style={{ position: "absolute", left: 830, top: 1360, transform: `scale(${heart}) rotate(${wobble(frame - 34, 14)}deg)` }}>
        <HeartIcon size={120} />
      </div>
      {[0, 1, 2].map((k) => {
        const b = bounce(frame - 18 - k * 5, 700, 8000, 0.4);
        return frame >= 18 + k * 5 ? (
          <div key={k} style={{ position: "absolute", left: 470 + k * 60 + jitter(k, k), top: 1700 - b.y, transform: `rotate(${frame * 14 + k * 40}deg) scaleX(${0.4 + Math.abs(Math.cos(frame / 3 + k))})` }}>
            <CoinIcon size={90} />
          </div>
        ) : null;
      })}
      <Burst frame={frame - 34} x={890} y={1420} seed={31} count={12} colors={[COLORS.orange, COLORS.red, COLORS.star]} />
      <Shockwave frame={frame - 34} x={890} y={1420} max={180} />
    </AbsoluteFill>
  );
};

export const S4Benefits: React.FC = () => (
  <AbsoluteFill>
    <Sequence durationInFrames={BENEFIT_LEN} name="Canada curriculum">
      <BenefitCanada />
    </Sequence>
    <Sequence from={BENEFIT_LEN} durationInFrames={BENEFIT_LEN} name="Personalised">
      <BenefitPersonal />
    </Sequence>
    <Sequence from={BENEFIT_LEN * 2} durationInFrames={BENEFIT_LEN} name="Price">
      <BenefitPrice />
    </Sequence>
  </AbsoluteFill>
);

