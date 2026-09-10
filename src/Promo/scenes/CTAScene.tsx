import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../theme";
import { persianFont } from "../fonts";
import { BrandMark } from "../components/BrandMark";
import { CTAButton } from "../components/CTAButton";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = spring({ frame, fps, config: { damping: 200 } });
  const headlineSpring = spring({ frame: frame - 10, fps, config: { damping: 200 } });
  const buttonSpring = spring({ frame: frame - 26, fps, config: { damping: 14, mass: 0.6 } });

  const pulse = 1 + Math.sin(Math.max(0, frame - 50) / 9) * 0.035;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 38%, rgba(237,95,0,0.16) 0%, rgba(252,249,247,0) 60%)`,
        }}
      />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 48 }}>
        <div style={{ transform: `scale(${logoSpring})`, opacity: logoSpring }}>
          <BrandMark size={54} />
        </div>
        <div
          style={{
            opacity: interpolate(headlineSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(headlineSpring, [0, 1], [26, 0])}px)`,
            direction: "rtl",
            textAlign: "center",
            padding: "0 88px",
          }}
        >
          <div
            style={{
              fontFamily: persianFont,
              fontWeight: 800,
              fontSize: 60,
              lineHeight: 1.4,
              color: COLORS.textMain,
            }}
          >
            دروسنت رو با یک جلسه معرفی
            <br />
            رایگان شروع کن
          </div>
        </div>
        <div
          style={{
            opacity: interpolate(buttonSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(buttonSpring, [0, 1], [20, 0])}px) scale(${buttonSpring > 0.98 ? pulse : 1})`,
          }}
        >
          <CTAButton label="رزرو جلسه رایگان" />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
