import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../Promo/theme";
import { persianFont } from "../../Promo/fonts";
import { BackgroundAccents } from "../../Promo/components/BackgroundAccents";
import { BrandMark } from "../../Promo/components/BrandMark";
import { LiveLessonMockup } from "../graphics/LiveLessonMockup";

const LINES = ["درسون؛ راه ساده‌تر برای", "پیدا کردن معلم خصوصی مناسب"];

export const IntroLessonScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const flash = interpolate(frame, [0, 8], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const brandSpring = spring({ frame: frame - 2, fps, config: { damping: 200 }, durationInFrames: 16 });
  const mockupProgress = spring({ frame: frame - 14, fps, config: { damping: 200 }, durationInFrames: 36 });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <AbsoluteFill style={{ backgroundColor: COLORS.orange, opacity: flash }} />
      <BackgroundAccents />

      <AbsoluteFill style={{ padding: "50px 56px", alignItems: "center" }}>
        <div style={{ opacity: brandSpring, transform: `scale(${brandSpring})` }}>
          <BrandMark size={32} />
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
          <div style={{ direction: "rtl", textAlign: "center", padding: "0 56px" }}>
            {LINES.map((line, li) => (
              <div key={li} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0 16px" }}>
                {line.split(" ").map((word, wi) => {
                  const idx = li * 10 + wi;
                  const wordSpring = spring({ frame: frame - 4 - idx * 2, fps, config: { damping: 200 }, durationInFrames: 14 });
                  return (
                    <span
                      key={wi}
                      style={{
                        display: "inline-block",
                        opacity: interpolate(wordSpring, [0, 1], [0, 1]),
                        transform: `translateY(${interpolate(wordSpring, [0, 1], [26, 0])}px)`,
                        fontFamily: persianFont,
                        fontWeight: 800,
                        fontSize: 52,
                        lineHeight: 1.35,
                        color: li === 0 && wi === 0 ? COLORS.orange : COLORS.textMain,
                      }}
                    >
                      {word}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>

          <LiveLessonMockup progress={mockupProgress} frame={frame} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
