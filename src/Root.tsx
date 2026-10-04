import "./index.css";
import { Composition } from "remotion";
import { DarsoonPromo } from "./Promo/DarsoonPromo";
import { TOTAL_DURATION_IN_FRAMES, FPS } from "./Promo/theme";
import { DarsoonTutorAd } from "./PromoV2/DarsoonTutorAd";
import { TOTAL_DURATION_V2 } from "./PromoV2/durations";
import { DarsoonCommercial } from "./PromoV3/DarsoonCommercial";
import { TOTAL_DURATION_V3 } from "./PromoV3/durations";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DarsoonPromo"
        component={DarsoonPromo}
        durationInFrames={TOTAL_DURATION_IN_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="DarsoonTutorAd"
        component={DarsoonTutorAd}
        durationInFrames={TOTAL_DURATION_V2}
        fps={FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="DarsoonCommercial"
        component={DarsoonCommercial}
        durationInFrames={TOTAL_DURATION_V3}
        fps={FPS}
        width={1080}
        height={1920}
      />
    </>
  );
};
