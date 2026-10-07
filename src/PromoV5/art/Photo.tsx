import React from "react";
import { Img, staticFile } from "remotion";

export type PersonPhoto =
  | "kid-laptop"
  | "kid-desk"
  | "kid-girl"
  | "kid-back"
  | "kid-chem"
  | "tutor-bio-wide"
  | "tutor-bio"
  | "tutor-chem"
  | "tutor-math"
  | "face-boy1"
  | "face-boy2"
  | "face-girl"
  | "face-boy5"
  | "face-tutor-bio"
  | "face-tutor-chem"
  | "face-tutor-math"
  | "team-1"
  | "team-2"
  | "team-3"
  | "team-4";

export const photoSrc = (name: PersonPhoto) => staticFile(`v5/people/${name}.webp`);

/**
 * Real student cut out from the supplied photos (public/v5/people), with a thin
 * white sticker edge, soft contact shadow and a subtle breathing motion so a
 * still photo never sits dead on screen.
 */
export const Cutout: React.FC<{
  name: PersonPhoto;
  height: number;
  frame: number;
  seed?: number;
  flip?: boolean;
  outline?: boolean;
  style?: React.CSSProperties;
}> = ({ name, height, frame, seed = 0, flip, outline = true, style }) => {
  const breathe = 1 + Math.sin((frame + seed * 13) / 22) * 0.008;
  const sway = Math.sin((frame + seed * 7) / 31) * 0.6;
  const edge = outline
    ? "drop-shadow(0 0 0 #fff) drop-shadow(3px 0 0 #fff) drop-shadow(-3px 0 0 #fff) drop-shadow(0 3px 0 #fff) drop-shadow(0 -3px 0 #fff) "
    : "";
  return (
    <Img
      src={photoSrc(name)}
      style={{
        height,
        display: "block",
        transformOrigin: "50% 100%",
        transform: `${flip ? "scaleX(-1) " : ""}scale(${breathe}) rotate(${sway}deg)`,
        filter: `${edge}drop-shadow(0 24px 30px rgba(90,50,20,0.28))`,
        ...style,
      }}
    />
  );
};

/** Rectangular photo (e.g. a tutor's webcam frame) that fills its box. */
export const PhotoFill: React.FC<{ name: PersonPhoto; position?: string; zoom?: number; style?: React.CSSProperties }> = ({
  name,
  position = "50% 30%",
  zoom = 1,
  style,
}) => (
  <Img
    src={photoSrc(name)}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: position,
      transform: zoom !== 1 ? `scale(${zoom})` : undefined,
      display: "block",
      ...style,
    }}
  />
);

/** Round face avatar with a coloured ring. */
export const Avatar: React.FC<{ name: PersonPhoto; size: number; ring?: string; style?: React.CSSProperties }> = ({ name, size, ring = "#fff", style }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      border: `${Math.max(4, size * 0.05)}px solid ${ring}`,
      boxShadow: "0 12px 24px -8px rgba(90,50,20,0.35)",
      overflow: "hidden",
      background: "#fff",
      ...style,
    }}
  >
    <Img src={photoSrc(name)} style={{ width: "100%", height: "100%", display: "block" }} />
  </div>
);
