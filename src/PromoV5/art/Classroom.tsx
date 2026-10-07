import React from "react";
import { COLORS } from "../timeline";
import { EN, FA } from "../fonts";
import { easeInOut, prog } from "../lib/anim";
import { Marker } from "../lib/visual";
import { Cutout, PhotoFill } from "./Photo";
import { LogoIcon } from "./Brand";
import { CheckBadge } from "./Icons";

/**
 * Live online-classroom window: tutor video tile, student PiP, a shared
 * whiteboard where the problem from scene 1 gets solved, and a call toolbar.
 * Width 900 x height 980. `frame` is local to when the lesson starts.
 */
export const Classroom: React.FC<{ frame: number; still?: boolean }> = ({ frame, still }) => {
  const f = still ? 200 : frame;
  const w1 = prog(f, 8, 14, easeInOut);
  const w2 = prog(f, 22, 12, easeInOut);
  const tick = prog(f, 34, 8);

  return (
    <div
      style={{
        width: 900,
        height: 980,
        background: COLORS.white,
        borderRadius: 44,
        boxShadow: "0 40px 80px -24px rgba(110,70,40,0.35), 0 0 0 2px rgba(69,66,66,0.05)",
        overflow: "hidden",
        position: "relative",
        direction: "rtl",
      }}
    >
      {/* window bar */}
      <div style={{ height: 84, display: "flex", alignItems: "center", padding: "0 32px", gap: 16, borderBottom: "2px solid #f1ebe6" }}>
        <LogoIcon size={46} />
        <div style={{ fontFamily: FA, fontWeight: 800, fontSize: 32, color: COLORS.title }}>کلاس آنلاین</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#ffe9e9",
            color: COLORS.red,
            borderRadius: 30,
            padding: "4px 16px",
            fontFamily: FA,
            fontWeight: 800,
            fontSize: 24,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: 6, background: COLORS.red, opacity: f % 30 < 18 ? 1 : 0.3 }} />
          زنده
        </div>
        <div style={{ flex: 1 }} />
        {[COLORS.red, COLORS.yellow, COLORS.green].map((c) => (
          <div key={c} style={{ width: 18, height: 18, borderRadius: 9, background: c, opacity: 0.8 }} />
        ))}
      </div>

      {/* tutor tile */}
      <div
        style={{
          position: "absolute",
          top: 104,
          left: 24,
          right: 24,
          height: 430,
          borderRadius: 30,
          background: `linear-gradient(160deg, ${COLORS.ctaBg}, #fff4ea)`,
          overflow: "hidden",
        }}
      >
        {/* real tutor webcam, slow push-in so the frame feels live */}
        <div style={{ position: "absolute", inset: 0, transform: `scale(${1.04 + f * 0.0009})`, transformOrigin: "60% 35%" }}>
          <PhotoFill name="tutor-chem" position="40% 30%" />
        </div>
        <div
          style={{
            position: "absolute",
            right: 22,
            bottom: 20,
            background: "rgba(255,255,255,0.92)",
            borderRadius: 18,
            padding: "6px 16px",
            fontFamily: FA,
            fontWeight: 700,
            fontSize: 24,
            color: COLORS.title,
          }}
        >
          علی یوسفی · معلم ریاضی
        </div>
        {/* student PiP */}
        <div
          style={{
            position: "absolute",
            left: 22,
            top: 22,
            width: 220,
            height: 200,
            borderRadius: 24,
            background: "#e7f0fb",
            overflow: "hidden",
            border: "4px solid #fff",
            boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
          }}
        >
          <div style={{ position: "absolute", left: -18, bottom: -4 }}>
            <Cutout name="kid-laptop" height={190} frame={f} seed={4} outline={false} />
          </div>
        </div>
      </div>

      {/* whiteboard */}
      <div
        style={{
          position: "absolute",
          top: 556,
          left: 24,
          right: 24,
          height: 270,
          borderRadius: 30,
          background: "#fbfaf8",
          border: "3px dashed #e6ddd5",
          direction: "ltr",
          fontFamily: EN,
          fontWeight: 700,
          color: COLORS.title,
        }}
      >
        <div style={{ position: "absolute", left: 40, top: 26, fontSize: 52 }}>x² + 5x − 6 = 0</div>
        <div style={{ position: "absolute", left: 40, top: 100, fontSize: 52, color: COLORS.blue, clipPath: `inset(-20% ${100 - w1 * 100}% -20% 0)` }}>
          (x + 6)(x − 1) = 0
        </div>
        <div style={{ position: "absolute", left: 40, top: 176, fontSize: 56, color: COLORS.orange, clipPath: `inset(-20% ${100 - w2 * 100}% -20% 0)` }}>
          x = 1
        </div>
        <svg width={852} height={270} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
          <Marker d="M30 250 C 120 236 190 258 260 244" p={w2} width={6} />
        </svg>
        <div style={{ position: "absolute", left: 250, top: 172, transform: `scale(${tick})` }}>
          <CheckBadge size={70} color={COLORS.green} p={tick} />
        </div>
      </div>

      {/* toolbar */}
      <div style={{ position: "absolute", bottom: 26, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 22 }}>
        {[
          { bg: "#f3eee9", c: COLORS.title, d: "M50 22 a12 12 0 0 1 12 12 v16 a12 12 0 0 1 -24 0 v-16 a12 12 0 0 1 12 -12 M30 50 a20 20 0 0 0 40 0 M50 70 v10" },
          { bg: "#f3eee9", c: COLORS.title, d: "M22 36 h38 v30 h-38 Z M62 46 l16 -10 v30 l-16 -10" },
          { bg: "#f3eee9", c: COLORS.title, d: "M24 28 h52 v36 h-52 Z M40 76 h20 M50 64 v12" },
          { bg: COLORS.red, c: "#fff", d: "M24 56 q26 -22 52 0 l-8 8 l-10 -6 v-8 q-8 -4 -16 0 v8 l-10 6 Z" },
        ].map((b, i) => (
          <div key={i} style={{ width: 84, height: 84, borderRadius: 42, background: b.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width={56} height={56} viewBox="0 0 100 100">
              <path d={b.d} fill="none" stroke={b.c} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};
