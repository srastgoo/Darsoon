import { useCurrentFrame } from "remotion";
import { SPEED } from "../timeline";

/**
 * Current frame in story time. Every motion-film scene animates against this
 * instead of useCurrentFrame(), so the whole film can be slowed down (SPEED)
 * without retiming any animation. Fractional values are fine for our easing,
 * spring and physics helpers and give smooth in-between frames.
 */
export const useStoryFrame = () => useCurrentFrame() * SPEED;
