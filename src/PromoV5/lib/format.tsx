import React, { createContext, useContext } from "react";
import { AbsoluteFill } from "remotion";

/**
 * Feed (4:5) version of the film. Scenes are authored on the 1080×1920 story
 * canvas; in feed mode each scene is reframed by a camera (scale + vertical
 * offset) into the 1080×1350 frame, and full-canvas backgrounds bleed past the
 * story canvas so the wider frame is filled edge to edge.
 */
export const FeedContext = createContext(false);
export const useFeed = () => useContext(FeedContext);

export const FEED_W = 1080;
export const FEED_H = 1350;
/** How far (story px) backgrounds extend past the story canvas in feed mode. */
export const BLEED = 420;

// AbsoluteFill also sets width/height 100%, which would win over the insets.
/** Style that stretches a background layer past the story canvas in feed mode. */
export const useBleed = (): React.CSSProperties =>
  useFeed() ? { left: -BLEED, right: -BLEED, top: -BLEED, bottom: -BLEED, width: "auto", height: "auto" } : {};

/**
 * Same as useBleed, but keeps the element's children where they were: the extra
 * area is a transparent border the background still paints under.
 */
export const useBleedKeepChildren = (): React.CSSProperties =>
  useFeed()
    ? { left: -BLEED, right: -BLEED, top: -BLEED, bottom: -BLEED, width: "auto", height: "auto", border: `${BLEED}px solid transparent`, boxSizing: "border-box" }
    : {};

/** Camera for one scene: show the story canvas at `s`, with story y `y` at the top of the feed frame. */
export const Cam: React.FC<{ s: number; y: number; children: React.ReactNode }> = ({ s, y, children }) => {
  if (!useFeed()) return <>{children}</>;
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <div style={{ position: "absolute", left: (FEED_W - 1080 * s) / 2, top: -y * s, width: 1080, height: 1920, transform: `scale(${s})`, transformOrigin: "0 0" }}>
        {children}
      </div>
    </AbsoluteFill>
  );
};
