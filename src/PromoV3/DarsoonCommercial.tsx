import React from "react";
import { AbsoluteFill, Audio, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { COLORS } from "../Promo/theme";
import { IntroLessonScene } from "./scenes/IntroLessonScene";
import { StatsDashboardScene } from "./scenes/StatsDashboardScene";
import { ContentScene } from "./scenes/ContentScene";
import { SubjectsScene } from "./scenes/SubjectsScene";
import { FinalCTAScene } from "./scenes/FinalCTAScene";
import { TitleCardScene } from "./scenes/TitleCardScene";
import { CanadianClassroomIllustration } from "./graphics/CanadianClassroomIllustration";
import { PersonalizedProgressIllustration } from "./graphics/PersonalizedProgressIllustration";
import { AffordableBookingIllustration } from "./graphics/AffordableBookingIllustration";
import { DURATIONS_V3, STATS_SCENE_FRAMES, CONTINUATION_FRAMES } from "./durations";

const MusicBed: React.FC = () => {
  const frame = useCurrentFrame();
  const volume = interpolate(
    frame,
    [0, 20, CONTINUATION_FRAMES - 40, CONTINUATION_FRAMES - 4],
    [0, 0.85, 0.85, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return <Audio src={staticFile("commercial-bg-music.mp3")} volume={volume} />;
};

export const DarsoonCommercial: React.FC = () => {
  const cut = linearTiming({ durationInFrames: DURATIONS_V3.transition });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Sequence durationInFrames={DURATIONS_V3.hook}>
        <AbsoluteFill>
          <OffthreadVideo
            src={staticFile("tutor-hook-video.mp4")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={DURATIONS_V3.hook} durationInFrames={CONTINUATION_FRAMES}>
        <MusicBed />
      </Sequence>

      <Sequence from={DURATIONS_V3.hook}>
        <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
          <TransitionSeries>
            <TransitionSeries.Sequence durationInFrames={DURATIONS_V3.intro}>
              <IntroLessonScene />
            </TransitionSeries.Sequence>

            <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={cut} />

            <TransitionSeries.Sequence durationInFrames={DURATIONS_V3.titleCard}>
              <TitleCardScene text="همه‌چیز آماده‌ست" variant="orange" />
            </TransitionSeries.Sequence>

            <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={cut} />

            <TransitionSeries.Sequence durationInFrames={STATS_SCENE_FRAMES}>
              <StatsDashboardScene />
            </TransitionSeries.Sequence>

            <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={cut} />

            <TransitionSeries.Sequence durationInFrames={DURATIONS_V3.titleCard}>
              <TitleCardScene text="معلم مناسب شما" />
            </TransitionSeries.Sequence>

            <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={cut} />

            <TransitionSeries.Sequence durationInFrames={DURATIONS_V3.canada}>
              <ContentScene
                headline={"معلم‌های دوزبانه و آشنا با برنامه\nدرسی مدارس کانادا"}
                renderIllustration={(p, f) => <CanadianClassroomIllustration progress={p} frame={f} />}
              />
            </TransitionSeries.Sequence>

            <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={cut} />

            <TransitionSeries.Sequence durationInFrames={DURATIONS_V3.titleCard}>
              <TitleCardScene text="یادگیری متفاوت" variant="orange" />
            </TransitionSeries.Sequence>

            <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={cut} />

            <TransitionSeries.Sequence durationInFrames={DURATIONS_V3.personalized}>
              <ContentScene
                tint
                headline={"یادگیری شخصی‌سازی‌شده\nبرای موفقیت بیشتر"}
                renderIllustration={(p, f) => <PersonalizedProgressIllustration progress={p} frame={f} />}
              />
            </TransitionSeries.Sequence>

            <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={cut} />

            <TransitionSeries.Sequence durationInFrames={DURATIONS_V3.titleCard}>
              <TitleCardScene text="در هر درسی" />
            </TransitionSeries.Sequence>

            <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={cut} />

            <TransitionSeries.Sequence durationInFrames={DURATIONS_V3.subjects}>
              <SubjectsScene />
            </TransitionSeries.Sequence>

            <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={cut} />

            <TransitionSeries.Sequence durationInFrames={DURATIONS_V3.titleCard}>
              <TitleCardScene text="بدون نگرانی هزینه" variant="orange" />
            </TransitionSeries.Sequence>

            <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={cut} />

            <TransitionSeries.Sequence durationInFrames={DURATIONS_V3.affordable}>
              <ContentScene
                headline="قیمت مناسب"
                illustrationScale={1.15}
                renderIllustration={(p, f) => <AffordableBookingIllustration progress={p} frame={f} />}
              />
            </TransitionSeries.Sequence>

            <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={cut} />

            <TransitionSeries.Sequence durationInFrames={DURATIONS_V3.titleCard}>
              <TitleCardScene text="آماده‌ای؟" />
            </TransitionSeries.Sequence>

            <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={cut} />

            <TransitionSeries.Sequence durationInFrames={DURATIONS_V3.cta}>
              <FinalCTAScene />
            </TransitionSeries.Sequence>
          </TransitionSeries>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
