import React from "react";
import { Img, staticFile } from "remotion";

// Official Darsoon logo files (public/v5/brand), supplied by the client.
// logo-full.png is 1537x625 (Persian + English), logo-icon.png the round ن mark.
export const LOGO_FULL_RATIO = 625 / 1537;

export const LogoFull: React.FC<{ width: number; white?: boolean; style?: React.CSSProperties }> = ({ width, white, style }) => (
  <Img
    src={staticFile(white ? "v5/brand/logo-full-white.png" : "v5/brand/logo-full.png")}
    style={{ width, height: width * LOGO_FULL_RATIO, display: "block", ...style }}
  />
);

export const LogoIcon: React.FC<{ size: number; style?: React.CSSProperties }> = ({ size, style }) => (
  <Img src={staticFile("v5/brand/logo-icon.png")} style={{ width: size, height: size, display: "block", ...style }} />
);
