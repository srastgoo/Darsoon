import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../Promo/theme";
import { persianFont } from "../../Promo/fonts";
import { BackgroundAccents } from "../../Promo/components/BackgroundAccents";
import { StatCard } from "../../Promo/components/StatCard";
import { Person } from "../../Promo/characters/Person";
import { formatPersianDecimal, formatPersianIntPlus } from "../../Promo/format";
import { GrowthBars } from "../graphics/GrowthBars";
import { STATS_HEADER_FRAMES, STATS_SLOT_FRAMES } from "../durations";

const DEFAULT_STATS = [
  { target: 200000, label: "جلسه برگزار شده", formatValue: formatPersianIntPlus },
  { target: 7000, label: "شاگرد", formatValue: formatPersianIntPlus },
  { target: 130, label: "رشته", formatValue: formatPersianIntPlus },
  { target: 250, label: "معلم متخصص", formatValue: formatPersianIntPlus },
  {
    target: 4.9,
    label: "میانگین امتیازها",
    formatValue: (n: number) => formatPersianDecimal(n, 1),
    showStars: true,
  },
];

export type StatsDashboardStat = (typeof DEFAULT_STATS)[number];

export const StatsDashboardScene: React.FC<{ stats?: StatsDashboardStat[] }> = ({
  stats = DEFAULT_STATS,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const RECAP_START = STATS_HEADER_FRAMES + STATS_SLOT_FRAMES * stats.length;

  const headerOpacity = interpolate(
    frame,
    [0, 10, STATS_HEADER_FRAMES - 4, STATS_HEADER_FRAMES + 4],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const chartProgress = Math.max(0, Math.min(1, frame / 30));

  const recapOpacity = interpolate(frame, [RECAP_START - 4, RECAP_START + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <BackgroundAccents />

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 70 }}>
        <div
          style={{
            opacity: headerOpacity,
            fontFamily: persianFont,
            fontWeight: 700,
            fontSize: 36,
            color: COLORS.textSecondary,
            direction: "rtl",
          }}
        >
          درسون در یک نگاه
        </div>
        <div style={{ opacity: Math.min(headerOpacity, chartProgress), marginTop: 18 }}>
          <GrowthBars progress={chartProgress} width={260} height={70} />
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        {stats.map((stat, i) => {
          const start = STATS_HEADER_FRAMES + i * STATS_SLOT_FRAMES;
          const local = frame - start;
          const entrance = interpolate(
            local,
            [0, 10, STATS_SLOT_FRAMES - 10, STATS_SLOT_FRAMES],
            [0, 1, 1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          if (entrance <= 0.001) return null;
          const countSpring = spring({ frame: local, fps, config: { damping: 200 }, durationInFrames: 20 });
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

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: "0 60px" }}>
        <div
          style={{
            opacity: recapOpacity,
            transform: `translateY(${interpolate(recapOpacity, [0, 1], [20, 0])}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 18,
            width: "100%",
          }}
        >
          <div style={{ display: "flex" }}>
            {[
              { age: "adult" as const, skinIndex: 0 },
              { age: "young" as const, skinIndex: 1 },
              { age: "senior" as const, skinIndex: 2 },
            ].map((p, i) => (
              <div
                key={i}
                style={{
                  marginRight: i === 0 ? 0 : -14,
                  borderRadius: "50%",
                  border: "3px solid #FFFFFF",
                  overflow: "hidden",
                  boxShadow: "0 8px 18px rgba(69,66,66,0.14)",
                }}
              >
                <Person age={p.age} size={54} skinIndex={p.skinIndex} />
              </div>
            ))}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 18,
              width: "100%",
            }}
          >
            {stats.map((stat, i) => (
              <div key={i} style={{ gridColumn: i === stats.length - 1 ? "1 / span 2" : undefined }}>
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
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
