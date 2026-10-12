import { createContext, useContext } from "react";
import { useCurrentFrame } from "remotion";
import { SPEED } from "../timeline";

/** Playback speed for the scene below it (story frames per output frame). */
export const SpeedContext = createContext(SPEED);

/**
 * Current frame in story time. Every motion-film scene animates against this
 * instead of useCurrentFrame(), so a scene's pace is set in one place (SPEED, or
 * a SpeedContext around it) without retiming any animation. Fractional values are
 * fine for our easing, spring and physics helpers and give smooth in-between frames.
 */
export const useStoryFrame = () => useCurrentFrame() * useContext(SpeedContext);
