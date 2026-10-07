import "./index.css";
import { Composition } from "remotion";
import { DarsoonPromo } from "./Promo/DarsoonPromo";
import { TOTAL_DURATION_IN_FRAMES, FPS } from "./Promo/theme";
import { DarsoonTutorAd } from "./PromoV2/DarsoonTutorAd";
import { TOTAL_DURATION_V2 } from "./PromoV2/durations";
import { DarsoonCommercial } from "./PromoV3/DarsoonCommercial";
import { TOTAL_DURATION_V3 } from "./PromoV3/durations";
import { DarsoonFilm } from "./PromoV4/DarsoonFilm";
import { TOTAL_DURATION_V4 } from "./PromoV4/durations";
import { DarsoonLaunch } from "./PromoV5/DarsoonLaunch";
import { FPS as FPS_V5, HEIGHT as HEIGHT_V5, TOTAL_FRAMES as TOTAL_FRAMES_V5, WIDTH as WIDTH_V5 } from "./PromoV5/timeline";

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
      <Composition
        id="DarsoonFilm"
        component={DarsoonFilm}
        durationInFrames={TOTAL_DURATION_V4}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="DarsoonLaunch"
        component={DarsoonLaunch}
        durationInFrames={TOTAL_FRAMES_V5}
        fps={FPS_V5}
        width={WIDTH_V5}
        height={HEIGHT_V5}
      />
    </>
  );
};
