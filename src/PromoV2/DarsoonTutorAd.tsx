import React from "react";
import { AbsoluteFill, OffthreadVideo, Sequence, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { COLORS } from "../Promo/theme";
import { StatsScene, StatDef } from "../Promo/scenes/StatsScene";
import { BenefitScene } from "../Promo/scenes/BenefitScene";
import { CTAScene } from "../Promo/scenes/CTAScene";
import { formatPersianDecimal, formatPersianIntPlus } from "../Promo/format";
import { IntroScene } from "./scenes/IntroScene";
import { BilingualCanadaIllustration } from "./graphics/BilingualCanadaIllustration";
import { PersonalizedLearningIllustration } from "./graphics/PersonalizedLearningIllustration";
import { PriceTagCadIllustration } from "./graphics/PriceTagCadIllustration";
import { DURATIONS_V2 } from "./durations";

const STATS_V2: StatDef[] = [
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

const ADVANTAGES = [
  {
    headline: "معلم‌های دو زبانه و آشنا با برنامه\nدرسی مدارس کانادا",
    render: (p: number, f: number) => <BilingualCanadaIllustration progress={p} frame={f} />,
  },
  {
    headline: "یادگیری شخصی‌سازی‌شده",
    render: (p: number, f: number) => <PersonalizedLearningIllustration progress={p} frame={f} />,
  },
  {
    headline: "قیمت مناسب از ۱۰ دلار کانادا",
    render: (p: number, f: number) => <PriceTagCadIllustration progress={p} frame={f} />,
  },
];

export const DarsoonTutorAd: React.FC = () => {
  const cut = linearTiming({ durationInFrames: DURATIONS_V2.transition });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Sequence durationInFrames={DURATIONS_V2.hook}>
        <AbsoluteFill>
          <OffthreadVideo
            src={staticFile("tutor-hook-video.mp4")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={DURATIONS_V2.hook}>
        <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
          <TransitionSeries>
            <TransitionSeries.Sequence durationInFrames={DURATIONS_V2.intro}>
              <IntroScene />
            </TransitionSeries.Sequence>

            <TransitionSeries.Transition presentation={fade()} timing={cut} />

            <TransitionSeries.Sequence durationInFrames={DURATIONS_V2.stats}>
              <StatsScene heading="درسون در یک نگاه" stats={STATS_V2} />
            </TransitionSeries.Sequence>

            {ADVANTAGES.map((advantage, i) => (
              <React.Fragment key={i}>
                <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={cut} />
                <TransitionSeries.Sequence durationInFrames={DURATIONS_V2.advantage}>
                  <BenefitScene
                    headline={advantage.headline}
                    index={i}
                    total={ADVANTAGES.length}
                    renderIllustration={advantage.render}
                  />
                </TransitionSeries.Sequence>
              </React.Fragment>
            ))}

            <TransitionSeries.Transition presentation={fade()} timing={cut} />

            <TransitionSeries.Sequence durationInFrames={DURATIONS_V2.cta}>
              <CTAScene
                headline="همین حالا معلم مناسب فرزندت رو پیدا کن"
                buttonLabel="درخواست جلسه معرفی رایگان"
              />
            </TransitionSeries.Sequence>
          </TransitionSeries>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
