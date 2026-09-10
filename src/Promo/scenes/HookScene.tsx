import React from "react";
import { AbsoluteFill, OffthreadVideo, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../theme";
import { persianFont } from "../fonts";
import { BrandMark } from "../components/BrandMark";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const scrimOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const brandOpacity = interpolate(frame, [8, 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headlineSpring = spring({ frame: frame - 30, fps, config: { damping: 200 } });
  const headlineOpacity = interpolate(headlineSpring, [0, 1], [0, 1]);
  const headlineY = interpolate(headlineSpring, [0, 1], [30, 0]);

  const exitFade = interpolate(
    frame,
    [durationInFrames - 14, durationInFrames],
    [1, 0.86],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const audioVolume = interpolate(
    frame,
    [0, 10, durationInFrames - 26, durationInFrames - 6],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <AbsoluteFill style={{ opacity: exitFade }}>
        <OffthreadVideo
          src={staticFile("hook-video.mp4")}
          startFrom={0}
          volume={audioVolume}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0) 42%, rgba(20,14,10,0.78) 100%)",
          opacity: scrimOpacity,
        }}
      />
      <AbsoluteFill style={{ padding: "72px 64px", justifyContent: "space-between" }}>
        <div style={{ opacity: brandOpacity }}>
          <BrandMark color="#FFFFFF" size={40} />
        </div>
        <div
          style={{
            opacity: headlineOpacity,
            transform: `translateY(${headlineY}px)`,
            direction: "rtl",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: persianFont,
              fontWeight: 800,
              fontSize: 66,
              lineHeight: 1.35,
              color: "#FFFFFF",
              textShadow: "0 6px 30px rgba(0,0,0,0.35)",
            }}
          >
            یادگیری با یک معلم حرفه‌ای،
            <br />
            از هر جای دنیا
          </div>
          <div
            style={{
              marginTop: 22,
              width: 84,
              height: 6,
              borderRadius: 6,
              background: COLORS.orange,
              marginInline: "auto",
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
