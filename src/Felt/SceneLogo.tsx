import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { Felt, FELT, Stitch } from "./kit";
import { FeltPerson } from "./characters";
import { FeltBoard, FeltLabel } from "./StyleSample";
import { FeltBurst, useFeltFrame } from "./common";
import { easeIn, easeInOut, easeOut, lerp, pendulum, pop, prog, wobble } from "../PromoV5/lib/anim";
import { EN, FA } from "../PromoV5/fonts";

export const TAP_AT = 92;

/** Same logo motion as the Darsoon launch film, then the French-class offer and CTA in felt. */
export const SceneLogo: React.FC = () => {
  const f = useFeltFrame();
  // iris (continuing the gold star) collapses into the round ن icon
  const collapse = prog(f, 0, 14, easeInOut);
  const squash = f >= 14 ? wobble(f - 14, 0.18, 3.2, 6) : 0;
  const glyph = prog(f, 10, 6);
  // icon flies onto the ن of the full logo while the wordmark wipes in
  const toNun = prog(f, 22, 12, easeInOut);
  const reveal = prog(f, 28, 12, easeOut);
  const iconFade = prog(f, 36, 6);
  const LOGO_W = 720;
  const k = LOGO_W / 1537;
  const logoTop0 = 760 - (625 * k) / 2;
  const iconD = lerp(lerp(2800, 380, collapse), 530 * k, toNun);
  const iconX = lerp(540, 540 - LOGO_W / 2 + 143 * k, toNun);
  const iconY = lerp(760, logoTop0 + 172 * k, toNun);
  const up = prog(f, 42, 12, easeInOut);
  const lockY = lerp(760, 420, up);
  const lockScale = lerp(1, 0.78, up);

  const tag = pendulum(f - 60, 22, 30, 1.7);
  const press = f >= TAP_AT - 2 && f < TAP_AT + 3;
  const finger = prog(f, TAP_AT - 12, 10, easeInOut);
  const fingerOut = prog(f, TAP_AT + 6, 8, easeIn);
  const btn = pop(f, 68, 220, 11);
  const family = (k2: number) => (1 - pop(f, 56 + k2 * 4, 170, 14)) * 500;

  return (
    <AbsoluteFill>
      <FeltBoard />
      {/* family waves goodbye at the bottom */}
      {f >= 50 ? (
        <>
          <div style={{ position: "absolute", left: 30, top: 1330 + family(0) }}>
            <FeltPerson who="dad" size={210} mood="laugh" armL={Math.floor(f / 6) % 2 ? 140 : 110} />
          </div>
          <div style={{ position: "absolute", left: 270, top: 1350 + family(1) }}>
            <FeltPerson who="mom" size={200} mood="happy" />
          </div>
          <div style={{ position: "absolute", left: 590, top: 1430 + family(2) - Math.abs(Math.sin(f / 4)) * 16 }}>
            <FeltPerson who="girl" size={180} mood="laugh" armL={150} armR={150} />
          </div>
          <div style={{ position: "absolute", left: 830, top: 1500 + family(3) }}>
            <FeltPerson who="boy" size={160} mood="laugh" armR={Math.floor(f / 6) % 2 ? 150 : 110} />
          </div>
        </>
      ) : null}

      {/* full logo */}
      {f >= 22 ? (
        <div style={{ position: "absolute", left: 540, top: lockY, transform: `translate(-50%, -50%) scale(${lockScale})`, width: LOGO_W }}>
          <Img
            src={staticFile("v5/brand/logo-full.png")}
            style={{ width: LOGO_W, display: "block", WebkitMaskImage: `linear-gradient(to right, #000 ${reveal * 110 - 10}%, transparent ${reveal * 110}%)`, maskImage: `linear-gradient(to right, #000 ${reveal * 110 - 10}%, transparent ${reveal * 110}%)` }}
          />
        </div>
      ) : null}
      {iconFade < 1 ? (
        <div style={{ position: "absolute", left: iconX - iconD / 2, top: iconY - iconD / 2, width: iconD, height: iconD, transform: `scale(${1 + squash}, ${1 - squash})`, opacity: 1 - iconFade }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: FELT.logo, opacity: 1 - glyph }} />
          <Img src={staticFile("v5/brand/logo-icon.png")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
        </div>
      ) : null}
      <FeltBurst f={f - 14} x={540} y={760} seed={61} count={22} power={34} />

      {/* offer */}
      {f >= 52 ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: 590, display: "flex", justifyContent: "center", transform: `scale(${pop(f, 52)})` }}>
          <FeltLabel size={62}>کلاس آنلاین فرانسه</FeltLabel>
        </div>
      ) : null}
      {f >= 60 ? (
        <div style={{ position: "absolute", left: 540 - 190, top: 690, width: 380, transformOrigin: "50% 0%", transform: `rotate(${tag}deg) scale(${pop(f, 60)})` }}>
          <svg width={380} height={190} viewBox="0 0 380 190" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
            <path d="M190 -30 V20" stroke="#5a4a3a" strokeWidth={4} strokeDasharray="8 6" />
            <Felt shadow>
              <path d="M30 40 L190 14 L350 40 V170 Q350 186 334 186 H46 Q30 186 30 170 Z" fill="#fce3d0" />
            </Felt>
            <circle cx={190} cy={42} r={10} fill="#fff" stroke="#cc7033" strokeWidth={4} />
            <Stitch d="M46 56 L190 32 L334 56 V160 H46 Z" color="rgba(204,112,51,0.6)" />
          </svg>
          <div style={{ position: "relative", top: 70, textAlign: "center", fontFamily: FA, fontWeight: 900, fontSize: 52, color: "#cc7033", direction: "rtl" }}>از ۱۰ دلار کانادا</div>
        </div>
      ) : null}
      {f >= 68 ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: 940, display: "flex", justifyContent: "center", transform: `scale(${btn * (press ? 0.92 : 1 + wobble(f - TAP_AT, 0.08, 3, 7))})` }}>
          <div style={{ position: "relative" }}>
            <svg width="100%" height="100%" viewBox="0 0 100 30" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
              <Felt shadow>
                <rect x={0} y={0} width={100} height={30} rx={15} fill={FELT.orange} />
              </Felt>
              <rect x={2} y={2.5} width={96} height={25} rx={12.5} fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth={0.5} strokeDasharray="1.6 1.2" vectorEffect="non-scaling-stroke" />
            </svg>
            <div style={{ position: "relative", padding: "30px 56px", fontFamily: FA, fontWeight: 900, fontSize: 50, color: "#fff", direction: "rtl", whiteSpace: "nowrap" }}>شروع با یک جلسه معرفی رایگان</div>
          </div>
        </div>
      ) : null}
      {f >= 76 ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: 1110, textAlign: "center", fontFamily: EN, fontWeight: 700, fontSize: 56, color: FELT.logo, transform: `scale(${pop(f, 76)})` }}>darsoon.com</div>
      ) : null}
      {finger > 0 && fingerOut < 1 ? (
        <div style={{ position: "absolute", left: lerp(900, 600, finger), top: lerp(1900, 1010, finger) + (press ? 10 : 0) + fingerOut * 700, transform: "rotate(-18deg)" }}>
          <svg width={140} height={180} viewBox="0 0 150 190">
            <g filter="url(#felt)">
              <path d="M48 20 Q48 0 66 0 Q84 0 84 20 V80 Q100 70 112 80 Q128 76 136 92 Q150 92 150 112 V140 Q150 190 100 190 H72 Q40 190 26 160 L4 112 Q-2 96 14 92 Q26 90 34 104 L48 128 Z" fill={FELT.skin} />
            </g>
          </svg>
        </div>
      ) : null}
      <FeltBurst f={f - TAP_AT} x={540} y={1000} seed={71} count={24} power={36} life={36} hearts />
    </AbsoluteFill>
  );
};
