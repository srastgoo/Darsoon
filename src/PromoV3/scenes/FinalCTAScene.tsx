import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../Promo/theme";
import { persianFont } from "../../Promo/fonts";
import { BrandMark } from "../../Promo/components/BrandMark";
import { CTAButton } from "../../Promo/components/CTAButton";
import { Person } from "../../Promo/characters/Person";

export const FinalCTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 14 });
  const duoSpring = spring({ frame: frame - 6, fps, config: { damping: 200 }, durationInFrames: 20 });
  const headlineSpring = spring({ frame: frame - 16, fps, config: { damping: 200 }, durationInFrames: 16 });
  const buttonSpring = spring({ frame: frame - 30, fps, config: { damping: 13, mass: 0.6 } });

  const pulse = 1 + Math.sin(Math.max(0, frame - 50) / 9) * 0.035;
  const bob = Math.sin(frame / 18) * 4;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 34%, rgba(237,95,0,0.16) 0%, rgba(252,249,247,0) 60%)`,
        }}
      />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 30 }}>
        <div style={{ transform: `scale(${logoSpring})`, opacity: logoSpring }}>
          <BrandMark size={44} />
        </div>

        <div
          style={{
            opacity: duoSpring,
            transform: `scale(${duoSpring}) translateY(${bob * 0.3}px)`,
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <Person age="adult" size={150} skinIndex={0} clothIndex={0} />
          <div style={{ marginRight: -26 }}>
            <Person age="child" size={120} skinIndex={2} clothIndex={1} />
          </div>
        </div>

        <div
          style={{
            opacity: interpolate(headlineSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(headlineSpring, [0, 1], [22, 0])}px)`,
            direction: "rtl",
            textAlign: "center",
            padding: "0 88px",
          }}
        >
          <div
            style={{
              fontFamily: persianFont,
              fontWeight: 800,
              fontSize: 54,
              lineHeight: 1.4,
              color: COLORS.textMain,
            }}
          >
            همین حالا معلم مناسب
            <br />
            فرزندت رو پیدا کن
          </div>
        </div>

        <div
          style={{
            opacity: interpolate(buttonSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(buttonSpring, [0, 1], [18, 0])}px) scale(${buttonSpring > 0.98 ? pulse : 1})`,
          }}
        >
          <CTAButton label="درخواست جلسه معرفی رایگان" />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
