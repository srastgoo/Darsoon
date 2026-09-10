import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../theme";
import { persianFont } from "../fonts";
import { BackgroundAccents } from "../components/BackgroundAccents";
import { StatCard } from "../components/StatCard";
import { formatPersianDecimal, formatPersianInt } from "../format";

const HEADER_END = 20;
const SLOT_LENGTH = 50;
const STATS = [
  {
    target: 200000,
    label: "جلسه",
    formatValue: (n: number) => `+${formatPersianInt(n)}`,
  },
  {
    target: 7000,
    label: "شاگرد",
    formatValue: (n: number) => `${formatPersianInt(n)}+`,
  },
  {
    target: 130,
    label: "رشته",
    formatValue: (n: number) => `${formatPersianInt(n)}+`,
  },
  {
    target: 250,
    label: "معلم",
    formatValue: (n: number) => `${formatPersianInt(n)}+`,
  },
  {
    target: 4.9,
    label: "میانگین امتیازها",
    formatValue: (n: number) => formatPersianDecimal(n, 1),
    showStars: true,
    decimals: 1,
  },
];

const RECAP_START = HEADER_END + STATS.length * SLOT_LENGTH;

export const StatsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 14, HEADER_END - 4, HEADER_END + 6], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const recapOpacity = interpolate(frame, [RECAP_START - 6, RECAP_START + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <BackgroundAccents />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 100 }}>
        <div
          style={{
            opacity: headerOpacity,
            fontFamily: persianFont,
            fontWeight: 700,
            fontSize: 40,
            color: COLORS.textSecondary,
            direction: "rtl",
          }}
        >
          درسون در یک نگاه
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        {STATS.map((stat, i) => {
          const start = HEADER_END + i * SLOT_LENGTH;
          const local = frame - start;
          const entrance = interpolate(local, [0, 14, SLOT_LENGTH - 12, SLOT_LENGTH], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          if (entrance <= 0.001) return null;
          const countSpring = spring({ frame: local, fps, config: { damping: 200 }, durationInFrames: 26 });
          return (
            <div key={i} style={{ position: "absolute" }}>
              <StatCard
                entrance={entrance}
                countProgress={countSpring}
                targetValue={stat.target}
                formatValue={stat.formatValue}
                label={stat.label}
                showStars={stat.showStars}
              />
            </div>
          );
        })}
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: "0 64px" }}>
        <div
          style={{
            opacity: recapOpacity,
            transform: `translateY(${interpolate(recapOpacity, [0, 1], [24, 0])}px)`,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            width: "100%",
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={i}
              style={{
                gridColumn: i === STATS.length - 1 ? "1 / span 2" : undefined,
              }}
            >
              <StatCard
                entrance={1}
                countProgress={1}
                targetValue={stat.target}
                formatValue={stat.formatValue}
                label={stat.label}
                showStars={stat.showStars}
                compact
              />
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
