import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { COLORS, DURATIONS } from "./theme";
import { HookScene } from "./scenes/HookScene";
import { StatsScene } from "./scenes/StatsScene";
import { BenefitScene } from "./scenes/BenefitScene";
import { CTAScene } from "./scenes/CTAScene";
import { FreeSessionIllustration } from "./characters/FreeSessionIllustration";
import { GlobalTeachersIllustration } from "./characters/GlobalTeachersIllustration";
import { AffordablePriceIllustration } from "./characters/AffordablePriceIllustration";
import { WorldwideClassIllustration } from "./characters/WorldwideClassIllustration";

const BENEFITS = [
  {
    headline: "یک جلسه معرفی رایگان",
    render: (p: number, f: number) => <FreeSessionIllustration progress={p} frame={f} />,
  },
  {
    headline: "معلم‌های حرفه‌ای که از سراسر دنیا دعوت شده‌اند",
    render: (p: number, f: number) => <GlobalTeachersIllustration progress={p} frame={f} />,
  },
  {
    headline: "قیمت مناسب",
    render: (p: number, f: number) => <AffordablePriceIllustration progress={p} frame={f} />,
  },
  {
    headline: "امکان برگزاری کلاس از سراسر دنیا",
    render: (p: number, f: number) => <WorldwideClassIllustration progress={p} frame={f} />,
  },
];

export const DarsoonPromo: React.FC = () => {
  const cut = linearTiming({ durationInFrames: DURATIONS.transition });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={DURATIONS.hook}>
          <HookScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={cut} />

        <TransitionSeries.Sequence durationInFrames={DURATIONS.stats}>
          <StatsScene />
        </TransitionSeries.Sequence>

        {BENEFITS.map((benefit, i) => (
          <React.Fragment key={i}>
            <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={cut} />
            <TransitionSeries.Sequence durationInFrames={DURATIONS.benefit}>
              <BenefitScene
                headline={benefit.headline}
                index={i}
                total={BENEFITS.length}
                renderIllustration={benefit.render}
              />
            </TransitionSeries.Sequence>
          </React.Fragment>
        ))}

        <TransitionSeries.Transition presentation={fade()} timing={cut} />

        <TransitionSeries.Sequence durationInFrames={DURATIONS.cta}>
          <CTAScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
