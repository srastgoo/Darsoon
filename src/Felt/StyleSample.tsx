import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { Felt, FeltDefs, FELT, Stitch } from "./kit";
import { FeltPerson } from "./characters";
import { FA } from "../PromoV5/fonts";

/** Felt backdrop: wool board with a faint weave and vignette. */
export const FeltBoard: React.FC<{ color?: string }> = ({ color = FELT.board }) => (
  <AbsoluteFill style={{ background: color }}>
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <rect width={1080} height={1920} fill="url(#burlap)" />
      <filter id="boardGrain">
        <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="3" seed="9" />
        <feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.25  0 0 0 0 0.18  0 0 0 0.16 0" />
      </filter>
      <rect width={1080} height={1920} filter="url(#boardGrain)" />
    </svg>
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, rgba(255,255,255,0) 55%, rgba(90,60,30,0.18) 100%)" }} />
  </AbsoluteFill>
);

/** Felt text label: words on a stitched felt ribbon. */
export const FeltLabel: React.FC<{ children: React.ReactNode; color?: string; text?: string; size?: number; rotate?: number }> = ({
  children,
  color = FELT.cream,
  text = "#3b302b",
  size = 64,
  rotate = -2,
}) => (
  <div style={{ position: "relative", display: "inline-block", transform: `rotate(${rotate}deg)` }}>
    <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
      <Felt shadow>
        <rect x={0} y={0} width={100} height={40} rx={6} fill={color} />
      </Felt>
      <rect x={2.5} y={4} width={95} height={32} rx={4} fill="none" stroke="rgba(120,90,70,0.5)" strokeWidth={0.6} strokeDasharray="2 1.5" vectorEffect="non-scaling-stroke" />
    </svg>
    <div style={{ position: "relative", padding: `${size * 0.22}px ${size * 0.6}px`, fontFamily: FA, fontWeight: 900, fontSize: size, color: text, direction: "rtl", whiteSpace: "nowrap" }}>{children}</div>
  </div>
);

const TehranWindow: React.FC = () => (
  <svg width={560} height={560} viewBox="0 0 560 560" style={{ overflow: "visible" }}>
    <Felt shadow>
      <rect x={0} y={0} width={560} height={560} rx={28} fill={FELT.wood} />
      <rect x={30} y={30} width={500} height={500} rx={16} fill="#f7c58f" />
    </Felt>
    <Felt>
      {/* sunset sky bands, Alborz mountains, Milad tower */}
      <rect x={30} y={30} width={500} height={170} rx={16} fill="#f6a96d" />
      <circle cx={400} cy={250} r={70} fill="#fbe3a1" />
      <path d="M30 360 L140 230 L230 320 L330 210 L450 330 L530 260 L530 530 L30 530 Z" fill="#b48a9e" />
      <path d="M150 240 L170 262 L130 262 Z M330 220 L352 246 L308 246 Z" fill="#ffffff" />
      <rect x={30} y={410} width={500} height={120} fill="#8e6f86" />
    </Felt>
    <Felt>
      <rect x={203} y={170} width={14} height={300} fill="#5d5168" />
      <ellipse cx={210} cy={235} rx={44} ry={26} fill="#6c6080" />
      <rect x={207} y={110} width={6} height={70} fill="#5d5168" />
      {[0, 1, 2, 3, 4].map((k) => (
        <rect key={k} x={60 + k * 90} y={420 + (k % 2) * 20} width={60} height={110 - (k % 2) * 20} fill="#6e5a75" />
      ))}
    </Felt>
    <Felt>
      <rect x={272} y={30} width={16} height={500} fill={FELT.wood} />
      <rect x={30} y={272} width={500} height={16} fill={FELT.wood} />
    </Felt>
    <Stitch d="M44 44 H516 V516 H44 Z" color="rgba(255,240,220,0.7)" />
  </svg>
);

const Suitcase: React.FC<{ color: string; w: number; h: number; open?: boolean }> = ({ color, w, h }) => (
  <svg width={w} height={h * 1.25} viewBox={`0 0 ${w} ${h * 1.25}`} style={{ overflow: "visible" }}>
    <Felt shadow>
      <rect x={w * 0.32} y={0} width={w * 0.36} height={h * 0.3} rx={14} fill="none" stroke="#3b302b" strokeWidth={14} />
      <rect x={0} y={h * 0.22} width={w} height={h} rx={28} fill={color} />
      <rect x={w * 0.1} y={h * 0.22} width={w * 0.12} height={h} fill="rgba(0,0,0,0.12)" />
      <rect x={w * 0.78} y={h * 0.22} width={w * 0.12} height={h} fill="rgba(0,0,0,0.12)" />
    </Felt>
    <Stitch d={`M12 ${h * 0.22 + 14} H${w - 12}`} color="rgba(255,255,255,0.6)" />
  </svg>
);

/** Style sample frames shown to the client before the full build. */
export const FeltStyleSample: React.FC<{ variant: "home" | "sparkle" }> = ({ variant }) => (
  <AbsoluteFill>
    <FeltDefs />
    <FeltBoard color={variant === "home" ? FELT.board : "#f3e2d9"} />
    {variant === "home" ? (
      <>
        <div style={{ position: "absolute", left: 260, top: 170 }}>
          <TehranWindow />
        </div>
        {/* Persian rug */}
        <svg width={1080} height={400} style={{ position: "absolute", left: 0, top: 1460 }} viewBox="0 0 1080 400">
          <Felt shadow>
            <path d="M80 60 L1000 60 L1060 360 L20 360 Z" fill="#9c2f2f" />
            <path d="M140 100 L940 100 L985 320 L95 320 Z" fill="#c9733a" />
            <ellipse cx={540} cy={210} rx={200} ry={70} fill="#2c3e63" />
            <ellipse cx={540} cy={210} rx={110} ry={36} fill="#e3a83b" />
          </Felt>
          <Stitch d="M110 80 L970 80 L1025 340 L55 340 Z" color="rgba(255,235,210,0.7)" />
        </svg>
        <div style={{ position: "absolute", left: 60, top: 1060 }}>
          <FeltPerson who="dad" size={300} mood="happy" armR={30} />
        </div>
        <div style={{ position: "absolute", left: 310, top: 1080 }}>
          <FeltPerson who="mom" size={290} mood="worried" armL={20} />
        </div>
        <div style={{ position: "absolute", left: 560, top: 1250 }}>
          <FeltPerson who="girl" size={230} mood="sad" />
        </div>
        <div style={{ position: "absolute", left: 790, top: 1330 }}>
          <FeltPerson who="boy" size={190} mood="laugh" armL={150} armR={150} />
        </div>
        <div style={{ position: "absolute", left: 640, top: 1560 }}>
          <Suitcase color={FELT.mustard} w={300} h={220} />
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 820, display: "flex", justifyContent: "center" }}>
          <FeltLabel>یه تصمیم بزرگ…</FeltLabel>
        </div>
      </>
    ) : (
      <>
        <div style={{ position: "absolute", left: 240, top: 620 }}>
          <FeltPerson who="girl" size={600} mood="amazed" sparkle={1} blush={1} armL={110} />
        </div>
        {/* felt phone with the Darsoon ad */}
        <div style={{ position: "absolute", left: 560, top: 1150, transform: "rotate(-8deg)" }}>
          <svg width={300} height={520} viewBox="0 0 300 520" style={{ overflow: "visible" }}>
            <Felt shadow>
              <rect x={0} y={0} width={300} height={520} rx={46} fill="#2f2b2b" />
              <rect x={18} y={40} width={264} height={440} rx={26} fill="#fff8f1" />
            </Felt>
          </svg>
          <div style={{ position: "absolute", left: 30, top: 70, width: 240, textAlign: "center", direction: "rtl", fontFamily: FA }}>
            <Img src={staticFile("v5/brand/logo-full.png")} style={{ width: 150 }} />
            <div style={{ fontWeight: 900, fontSize: 36, color: "#3b302b", marginTop: 18, lineHeight: 1.3 }}>کلاس آنلاین فرانسه</div>
            <div style={{ fontWeight: 800, fontSize: 30, color: FELT.orange, marginTop: 12 }}>از ۱۰ دلار کانادا</div>
            <div style={{ marginTop: 22, background: FELT.orange, color: "#fff", borderRadius: 30, padding: "10px 0", fontWeight: 900, fontSize: 24 }}>جلسه معرفی رایگان</div>
          </div>
        </div>
        {/* felt sparkles */}
        <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
          <Felt>
            {[
              [250, 640, 40, FELT.mustard],
              [860, 720, 30, FELT.orange],
              [820, 520, 22, "#fff"],
              [190, 900, 26, FELT.orange],
              [930, 1000, 34, FELT.mustard],
            ].map(([x, y, r, c], k) => (
              <path key={k} d={`M${x} ${(y as number) - (r as number)} L${(x as number) + (r as number) * 0.3} ${(y as number) - (r as number) * 0.3} L${(x as number) + (r as number)} ${y} L${(x as number) + (r as number) * 0.3} ${(y as number) + (r as number) * 0.3} L${x} ${(y as number) + (r as number)} L${(x as number) - (r as number) * 0.3} ${(y as number) + (r as number) * 0.3} L${(x as number) - (r as number)} ${y} L${(x as number) - (r as number) * 0.3} ${(y as number) - (r as number) * 0.3} Z`} fill={c as string} />
            ))}
          </Felt>
        </svg>
        <div style={{ position: "absolute", left: 0, right: 0, top: 300, display: "flex", justifyContent: "center" }}>
          <FeltLabel color={FELT.orange} text="#fff">تا اینکه…</FeltLabel>
        </div>
      </>
    )}
  </AbsoluteFill>
);

export const FeltSampleHome: React.FC = () => <FeltStyleSample variant="home" />;
export const FeltSampleSparkle: React.FC = () => <FeltStyleSample variant="sparkle" />;
