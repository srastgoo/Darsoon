import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../Promo/theme";
import { persianFont } from "../../Promo/fonts";
import { BackgroundAccents } from "../../Promo/components/BackgroundAccents";
import { BrandMark } from "../../Promo/components/BrandMark";
import { AppMockup } from "../graphics/AppMockup";

const WORDS = ["درسون؛", "معلم", "خصوصی", "آنلاین"];

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const flash = interpolate(frame, [0, 10], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const brandSpring = spring({ frame: frame - 4, fps, config: { damping: 200 } });
  const mockupProgress = spring({ frame: frame - 18, fps, config: { damping: 200 }, durationInFrames: 46 });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <AbsoluteFill style={{ backgroundColor: COLORS.orange, opacity: flash }} />
      <BackgroundAccents />

      <AbsoluteFill style={{ padding: "64px 56px", alignItems: "center" }}>
        <div style={{ opacity: brandSpring, transform: `scale(${brandSpring})` }}>
          <BrandMark size={36} />
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 36 }}>
          <div
            style={{
              direction: "rtl",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0 22px",
              padding: "0 64px",
            }}
          >
            {WORDS.map((word, i) => {
              const wordSpring = spring({ frame: frame - 8 - i * 4, fps, config: { damping: 200 } });
              return (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    opacity: interpolate(wordSpring, [0, 1], [0, 1]),
                    transform: `translateY(${interpolate(wordSpring, [0, 1], [34, 0])}px)`,
                    fontFamily: persianFont,
                    fontWeight: 800,
                    fontSize: 64,
                    lineHeight: 1.3,
                    color: i === 0 ? COLORS.orange : COLORS.textMain,
                  }}
                >
                  {word}
                </span>
              );
            })}
          </div>

          <AppMockup progress={mockupProgress} frame={frame} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
