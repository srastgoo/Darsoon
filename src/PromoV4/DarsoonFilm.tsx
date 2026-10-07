import React from "react";
import { AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { COLORS } from "../Promo/theme";
import { formatPersianDecimal, formatPersianIntPlus } from "../Promo/format";
import { ContentScene } from "../PromoV3/scenes/ContentScene";
import { StatsDashboardScene, StatsDashboardStat } from "../PromoV3/scenes/StatsDashboardScene";
import { SubjectsScene } from "../PromoV3/scenes/SubjectsScene";
import { FinalCTAScene } from "../PromoV3/scenes/FinalCTAScene";
import { CanadianClassroomIllustration } from "../PromoV3/graphics/CanadianClassroomIllustration";
import { PersonalizedProgressIllustration } from "../PromoV3/graphics/PersonalizedProgressIllustration";
import { SolutionScene } from "./scenes/SolutionScene";
import { StrugglingStudentIllustration } from "./graphics/StrugglingStudentIllustration";
import { SmartPricingIllustration } from "./graphics/SmartPricingIllustration";
import { SfxLayer } from "./SfxLayer";
import { DURATIONS_V4, STATS_SCENE_FRAMES_V4, TOTAL_DURATION_V4 } from "./durations";

const MusicBed: React.FC = () => {
  const frame = useCurrentFrame();
  const volume = interpolate(
    frame,
    [0, 24, TOTAL_DURATION_V4 - 36, TOTAL_DURATION_V4 - 4],
    [0, 0.8, 0.8, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return <Audio src={staticFile("film-bg-music.mp3")} volume={volume} />;
};

const STATS_V4: StatsDashboardStat[] = [
  { target: 200000, label: "جلسه برگزار شده", formatValue: formatPersianIntPlus },
  { target: 7000, label: "شاگرد", formatValue: formatPersianIntPlus },
  { target: 130, label: "موضوع آموزشی", formatValue: formatPersianIntPlus },
  { target: 250, label: "معلم متخصص", formatValue: formatPersianIntPlus },
  {
    target: 4.9,
    label: "میانگین امتیازها",
    formatValue: (n: number) => formatPersianDecimal(n, 1),
    showStars: true,
  },
];

export const DarsoonFilm: React.FC = () => {
  const cut = linearTiming({ durationInFrames: DURATIONS_V4.transition });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <MusicBed />
      <SfxLayer />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={DURATIONS_V4.problem}>
          <ContentScene
            headline={"برای درس‌های مدرسه،\nمعلم خصوصی مناسب پیدا نکردی؟"}
            renderIllustration={(p, f) => <StrugglingStudentIllustration progress={p} frame={f} />}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Sequence durationInFrames={DURATIONS_V4.solution}>
          <SolutionScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={cut} />

        <TransitionSeries.Sequence durationInFrames={STATS_SCENE_FRAMES_V4}>
          <StatsDashboardScene stats={STATS_V4} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={cut} />

        <TransitionSeries.Sequence durationInFrames={DURATIONS_V4.canada}>
          <ContentScene
            headline={"معلم‌هایی آشنا با برنامه\nدرسی مدارس کانادا"}
            renderIllustration={(p, f) => <CanadianClassroomIllustration progress={p} frame={f} />}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={cut} />

        <TransitionSeries.Sequence durationInFrames={DURATIONS_V4.personalized}>
          <ContentScene
            tint
            headline="یادگیری شخصی‌سازی‌شده"
            renderIllustration={(p, f) => <PersonalizedProgressIllustration progress={p} frame={f} />}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={cut} />

        <TransitionSeries.Sequence durationInFrames={DURATIONS_V4.pricing}>
          <ContentScene
            headline={"قیمت مناسب برای\nیادگیری باکیفیت"}
            renderIllustration={(p, f) => <SmartPricingIllustration progress={p} frame={f} />}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={cut} />

        <TransitionSeries.Sequence durationInFrames={DURATIONS_V4.subjects}>
          <SubjectsScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={cut} />

        <TransitionSeries.Sequence durationInFrames={DURATIONS_V4.cta}>
          <FinalCTAScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
