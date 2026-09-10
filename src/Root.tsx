import "./index.css";
import { Composition } from "remotion";
import { DarsoonPromo } from "./Promo/DarsoonPromo";
import { TOTAL_DURATION_IN_FRAMES, FPS } from "./Promo/theme";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="DarsoonPromo"
      component={DarsoonPromo}
      durationInFrames={TOTAL_DURATION_IN_FRAMES}
      fps={FPS}
      width={1080}
      height={1920}
    />
  );
};
