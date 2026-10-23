import "./index.css";
import { Composition, Still } from "remotion";
import { DarsoonPromo } from "./Promo/DarsoonPromo";
import { TOTAL_DURATION_IN_FRAMES, FPS } from "./Promo/theme";
import { DarsoonTutorAd } from "./PromoV2/DarsoonTutorAd";
import { TOTAL_DURATION_V2 } from "./PromoV2/durations";
import { DarsoonCommercial } from "./PromoV3/DarsoonCommercial";
import { TOTAL_DURATION_V3 } from "./PromoV3/durations";
import { DarsoonFilm } from "./PromoV4/DarsoonFilm";
import { TOTAL_DURATION_V4 } from "./PromoV4/durations";
import { DarsoonLaunch, DarsoonLaunchFeed, DarsoonMotion } from "./PromoV5/DarsoonLaunch";
import { CHEM_FRAMES, ChemistryIntro } from "./PromoV5/chem/ChemistryIntro";
import { MetaPosterFeed, MetaPosterStory } from "./PromoV5/poster/MetaPoster";
import { FELT_FPS, FELT_FRAMES, FeltFilm } from "./Felt/FeltFilm";
import { FPS as FPS_V5, HEIGHT as HEIGHT_V5, FILM_FRAMES as FILM_FRAMES_V5, MOTION_FRAMES as MOTION_FRAMES_V5, WIDTH as WIDTH_V5 } from "./PromoV5/timeline";

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
        durationInFrames={FILM_FRAMES_V5}
        fps={FPS_V5}
        width={WIDTH_V5}
        height={HEIGHT_V5}
      />
      <Composition
        id="DarsoonLaunchFeed"
        component={DarsoonLaunchFeed}
        durationInFrames={FILM_FRAMES_V5}
        fps={FPS_V5}
        width={WIDTH_V5}
        height={1350}
      />
      <Composition
        id="DarsoonMotion"
        component={DarsoonMotion}
        durationInFrames={MOTION_FRAMES_V5}
        fps={FPS_V5}
        width={WIDTH_V5}
        height={HEIGHT_V5}
      />
      <Composition
        id="DarsoonChemistry"
        component={ChemistryIntro}
        durationInFrames={CHEM_FRAMES}
        fps={FPS_V5}
        width={WIDTH_V5}
        height={HEIGHT_V5}
      />
      {/* Meta Ads posters: 4:5 feed and 9:16 stories/reels */}
      <Still id="DarsoonPosterFeed" component={MetaPosterFeed} width={1080} height={1350} />
      <Still id="DarsoonPosterStory" component={MetaPosterStory} width={1080} height={1920} />
      {/* 44 s felt stop-motion story: immigrant family → French immersion → Darsoon French class */}
      <Composition id="DarsoonFeltFrench" component={FeltFilm} durationInFrames={FELT_FRAMES} fps={FELT_FPS} width={1080} height={1920} />
    </>
  );
};
