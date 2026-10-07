import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS } from "../timeline";
import { EN, FA } from "../fonts";
import { bounce, clamp01, easeInOut, lerp, pop, prog, wobble } from "../lib/anim";
import { Burst, Card, Doodles, Marker, Paper, Shockwave } from "../lib/visual";
import { KineticText } from "../lib/KineticText";
import { Character, isBlinking } from "../art/Character";
import { CheckBadge, DarsoonMark, StarIcon } from "../art/Icons";

export const CTA_TAP = 64;
export const CTA_LOGO = 86;

const Phone: React.FC<{ frame: number }> = ({ frame }) => {
  const query = "معلم ریاضی پایه ۹";
  const typed = query.slice(0, Math.floor(clamp01((frame - 10) / 16) * query.length));
  const result = pop(frame, 28, 200, 13);
  const live = pop(frame, 40, 180, 14);
  const talk = Math.max(0, Math.sin(frame / 2.4));
  return (
    <div
      style={{
        width: 520,
        height: 1000,
        borderRadius: 76,
        background: COLORS.title,
        padding: 18,
        boxShadow: "0 50px 90px -30px rgba(80,40,10,0.55)",
      }}
    >
      <div style={{ width: "100%", height: "100%", borderRadius: 60, background: COLORS.canvas, overflow: "hidden", position: "relative", direction: "rtl" }}>
        <div style={{ position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)", width: 150, height: 34, borderRadius: 20, background: COLORS.title }} />
        {/* app bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "70px 30px 0" }}>
          <DarsoonMark size={58} />
          <div style={{ fontFamily: FA, fontWeight: 900, fontSize: 40, color: COLORS.title }}>درسون</div>
        </div>
        {/* search */}
        <div
          style={{
            margin: "22px 26px 0",
            height: 74,
            borderRadius: 37,
            background: "#fff",
            border: `3px solid ${frame > 10 ? COLORS.orange : "#eadfd6"}`,
            display: "flex",
            alignItems: "center",
            padding: "0 24px",
            gap: 12,
            fontFamily: FA,
            fontWeight: 700,
            fontSize: 30,
            color: COLORS.title,
          }}
        >
          <svg width={32} height={32} viewBox="0 0 40 40">
            <circle cx={17} cy={17} r={11} fill="none" stroke={COLORS.orange} strokeWidth={5} />
            <path d="M26 26 L35 35" stroke={COLORS.orange} strokeWidth={5} strokeLinecap="round" />
          </svg>
          {typed}
          {frame < 28 && frame % 14 < 8 ? <span style={{ color: COLORS.orange }}>|</span> : null}
        </div>
        {/* tutor result */}
        <div style={{ margin: "24px 26px 0", transform: `translateY(${(1 - result) * 120}px) scale(${0.8 + result * 0.2})`, opacity: clamp01(result * 2) }}>
          <Card radius={30} pad={18} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 120, height: 120, borderRadius: 26, background: COLORS.ctaBg, overflow: "hidden", flexShrink: 0 }}>
              <div style={{ marginLeft: -6, marginTop: 4 }}>
                <Character size={132} hair="bun" hairColor={3} shirt={COLORS.orange} glasses />
              </div>
            </div>
            <div style={{ fontFamily: FA, flex: 1 }}>
              <div style={{ fontWeight: 900, fontSize: 32, color: COLORS.title }}>خانم رضایی</div>
              <div style={{ fontWeight: 600, fontSize: 24, color: COLORS.secondary }}>ریاضی · برنامه درسی کانادا</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6 }}>
                {new Array(5).fill(0).map((_, k) => (
                  <StarIcon key={k} size={24} />
                ))}
                <span style={{ fontWeight: 800, fontSize: 24, color: COLORS.star, marginRight: 6 }}>۴.۹</span>
              </div>
            </div>
            <div style={{ transform: `scale(${pop(frame, 34)})` }}>
              <CheckBadge size={52} p={prog(frame, 36, 6)} />
            </div>
          </Card>
        </div>
        {/* mini live lesson */}
        <div
          style={{
            margin: "22px 26px 0",
            height: 420,
            borderRadius: 34,
            background: `linear-gradient(160deg, ${COLORS.ctaBg}, #fff4ea)`,
            position: "relative",
            overflow: "hidden",
            transform: `scale(${live})`,
          }}
        >
          <div style={{ position: "absolute", left: 70, top: 46 }}>
            <Character size={330} hair="bun" hairColor={3} shirt={COLORS.orange} glasses talk={talk} armL={70 + Math.sin(frame / 4) * 20} elbowL={-70} blink={isBlinking(frame, 4)} />
          </div>
          <div style={{ position: "absolute", right: 18, top: 18, width: 160, height: 150, borderRadius: 22, background: "#e7f0fb", border: "4px solid #fff", overflow: "hidden" }}>
            <div style={{ marginLeft: -10, marginTop: 4 }}>
              <Character size={180} hair="curly" skin={1} hairColor={1} shirt={COLORS.blue} mood="excited" armL={150 + Math.sin(frame / 3) * 20} elbowL={20} />
            </div>
          </div>
          <div style={{ position: "absolute", left: 18, bottom: 18, display: "flex", alignItems: "center", gap: 8, background: "#fff", borderRadius: 20, padding: "4px 14px", fontFamily: FA, fontWeight: 800, fontSize: 22, color: COLORS.red }}>
            <div style={{ width: 10, height: 10, borderRadius: 5, background: COLORS.red, opacity: frame % 30 < 18 ? 1 : 0.3 }} />
            زنده
          </div>
        </div>
      </div>
    </div>
  );
};

export const S6CTA: React.FC = () => {
  const frame = useCurrentFrame();

  // zoom-through: start inside the phone screen, pull back to reveal it
  const pull = prog(frame, 0, 16, easeInOut);
  const phoneScale = lerp(1.9, 0.86, pull);
  const phoneY = lerp(-120, 0, pull);

  // tap
  const fingerIn = prog(frame, CTA_TAP - 14, 12, easeInOut);
  const press = frame >= CTA_TAP ? wobble(frame - CTA_TAP, 0.12, 3, 7) : 0;
  const pressDown = frame >= CTA_TAP - 2 && frame < CTA_TAP + 3 ? 0.1 : 0;
  const btnIn = pop(frame, 30, 200, 12);
  const ripple = prog(frame, CTA_TAP, 16);

  // final logo
  const logo = bounce(frame - CTA_LOGO, 500, 9000, 0.32);
  const logoOn = frame >= CTA_LOGO;
  const dim = prog(frame, CTA_LOGO - 4, 8);

  return (
    <AbsoluteFill>
      <Paper />
      <Doodles frame={frame + 900} seed={11} opacity={0.4} />

      <div style={{ position: "absolute", top: 150, left: 0, right: 0, opacity: 1 - dim * 0.15 }}>
        <KineticText text={"همین حالا معلم مناسب\nفرزندت رو پیدا کن"} frame={frame} start={14} size={86} stagger={3} accent={["مناسب"]} underline={["مناسب"]} />
      </div>

      {/* flanking happy tutor & student */}
      <div style={{ position: "absolute", left: -40, top: 1000, transform: `translateX(${(1 - pop(frame, 20, 160, 14)) * -400}px) rotate(-4deg)` }}>
        <Character size={360} hair="short" skin={2} shirt={COLORS.teal} glasses mood="happy" armR={150 + Math.sin(frame / 4) * 14} elbowR={20} blink={isBlinking(frame, 7)} />
      </div>
      <div style={{ position: "absolute", left: 760, top: 1010, transform: `translateX(${(1 - pop(frame, 24, 160, 14)) * 400}px) rotate(4deg)` }}>
        <Character size={340} hair="pony" skin={0} hairColor={2} shirt={COLORS.yellow} mood={frame > CTA_TAP ? "excited" : "happy"} armL={frame > CTA_TAP ? 160 : 30} armR={frame > CTA_TAP ? 160 : 30} elbowL={10} elbowR={10} blink={isBlinking(frame, 30)} />
      </div>

      {/* phone */}
      <div style={{ position: "absolute", left: 540 - 260, top: 460, transform: `translateY(${phoneY}px) scale(${phoneScale})`, transformOrigin: "50% 50%" }}>
        <Phone frame={frame} />
      </div>

      {/* CTA button */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 1470,
          display: "flex",
          justifyContent: "center",
          transform: `scale(${btnIn * (1 + press - pressDown)}, ${btnIn * (1 - press * 0.6 - pressDown)})`,
          opacity: 1 - dim,
        }}
      >
        <div
          style={{
            position: "relative",
            background: COLORS.ctaBg,
            color: COLORS.ctaText,
            fontFamily: FA,
            fontWeight: 900,
            fontSize: 56,
            padding: "30px 64px",
            borderRadius: 80,
            direction: "rtl",
            boxShadow: `0 ${pressDown ? 4 : 18}px 0 #f3c9a8, 0 30px 50px -20px rgba(204,112,51,0.5)`,
            border: `4px solid ${COLORS.ctaText}`,
            display: "flex",
            alignItems: "center",
            gap: 18,
            overflow: "hidden",
          }}
        >
          درخواست جلسه معرفی رایگان
          <svg width={50} height={50} viewBox="0 0 50 50">
            <path d="M32 12 L18 25 L32 38" fill="none" stroke={COLORS.ctaText} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div
            style={{
              position: "absolute",
              left: "30%",
              top: "50%",
              width: 900 * ripple,
              height: 900 * ripple,
              borderRadius: "50%",
              background: COLORS.orange,
              opacity: 0.25 * (1 - ripple),
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      </div>

      {/* tapping finger */}
      {frame < CTA_LOGO ? (
        <div
          style={{
            position: "absolute",
            left: lerp(900, 250, fingerIn),
            top: lerp(1900, 1575, fingerIn) + (pressDown ? 10 : 0),
            transform: `rotate(-18deg) scale(${1 - pressDown})`,
            opacity: fingerIn,
          }}
        >
          <svg width={150} height={190} viewBox="0 0 150 190">
            <path d="M48 20 Q48 0 66 0 Q84 0 84 20 V80 Q100 70 112 80 Q128 76 136 92 Q150 92 150 112 V140 Q150 190 100 190 H72 Q40 190 26 160 L4 112 Q-2 96 14 92 Q26 90 34 104 L48 128 Z" fill="#f1c19a" stroke={COLORS.title} strokeWidth={6} strokeLinejoin="round" />
          </svg>
        </div>
      ) : null}
      <Burst frame={frame - CTA_TAP} x={540} y={1540} seed={77} count={30} power={36} life={40} />

      {/* final lockup */}
      <AbsoluteFill style={{ background: `rgba(252,249,247,${0.94 * dim})` }} />
      {logoOn ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: 760, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 34,
              direction: "rtl",
              transform: `translateY(${-logo.y}px) scale(${1 + logo.squash * 0.3}, ${1 - logo.squash * 0.35})`,
              transformOrigin: "50% 100%",
            }}
          >
            <DarsoonMark size={220} />
            <div style={{ fontFamily: FA, fontWeight: 900, fontSize: 190, color: COLORS.title, lineHeight: 1 }}>درسون</div>
          </div>
          <div style={{ marginTop: 40, fontFamily: EN, fontWeight: 700, fontSize: 56, color: COLORS.orange, letterSpacing: 1, transform: `scale(${pop(frame, CTA_LOGO + 8)})` }}>darsoon.com</div>
          <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 10, transform: `scale(${pop(frame, CTA_LOGO + 12)})` }}>
            {new Array(5).fill(0).map((_, k) => (
              <div key={k} style={{ transform: `scale(${pop(frame, CTA_LOGO + 12 + k * 2)})` }}>
                <StarIcon size={56} />
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: 50,
              background: COLORS.ctaBg,
              color: COLORS.ctaText,
              fontFamily: FA,
              fontWeight: 900,
              fontSize: 50,
              padding: "24px 56px",
              borderRadius: 70,
              direction: "rtl",
              border: `4px solid ${COLORS.ctaText}`,
              transform: `scale(${pop(frame, CTA_LOGO + 16)})`,
            }}
          >
            درخواست جلسه معرفی رایگان
          </div>
          <svg width={700} height={60} style={{ marginTop: 6, overflow: "visible" }}>
            <Marker d="M640 20 C 480 44 220 10 60 34" p={prog(frame, CTA_LOGO + 22, 10)} width={9} />
          </svg>
        </div>
      ) : null}
      <Shockwave frame={frame - CTA_LOGO - 6} x={540} y={860} max={700} life={24} />
      <Burst frame={frame - CTA_LOGO - 6} x={540} y={860} seed={91} count={34} power={44} life={34} />
    </AbsoluteFill>
  );
};
