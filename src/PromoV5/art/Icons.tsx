import React from "react";
import { COLORS } from "../timeline";
import { starPath } from "../lib/visual";

type P = { size?: number; color?: string; style?: React.CSSProperties };

const S: React.FC<P & { children: React.ReactNode; vb?: string }> = ({ size = 80, style, children, vb = "0 0 100 100" }) => (
  <svg width={size} height={size} viewBox={vb} style={{ display: "block", overflow: "visible", ...style }}>
    {children}
  </svg>
);

export const BookIcon: React.FC<P & { open?: number }> = ({ size, color = COLORS.orange, style }) => (
  <S size={size} style={style}>
    <rect x="14" y="16" width="70" height="72" rx="8" fill={color} />
    <rect x="22" y="16" width="62" height="64" rx="6" fill="#fff" opacity={0.18} />
    <rect x="14" y="74" width="70" height="14" rx="4" fill="#fff" />
    <path d="M14 76 h70" stroke="rgba(0,0,0,0.1)" strokeWidth="3" />
    <rect x="34" y="30" width="34" height="8" rx="4" fill="#fff" opacity={0.85} />
  </S>
);

export const LaptopIcon: React.FC<P & { screen?: React.ReactNode }> = ({ size, color = COLORS.title, style, screen }) => (
  <S size={size} vb="0 0 160 110" style={style}>
    <rect x="22" y="6" width="116" height="78" rx="8" fill={color} />
    <rect x="28" y="12" width="104" height="66" rx="4" fill="#fff" />
    {screen}
    <path d="M6 88 h148 l-10 14 H16 Z" fill={color} />
  </S>
);

export const StarIcon: React.FC<P & { fill?: number }> = ({ size = 60, color = COLORS.star, style }) => (
  <S size={size} style={style} vb="-50 -50 100 100">
    <path d={starPath(46, 20)} fill={color} stroke={color} strokeWidth={6} strokeLinejoin="round" />
  </S>
);

export const CheckBadge: React.FC<P & { p?: number }> = ({ size = 60, color = COLORS.orange, style, p = 1 }) => (
  <S size={size} style={style}>
    <circle cx="50" cy="50" r="46" fill={color} />
    <path d="M28 52 L44 67 L73 36" fill="none" stroke="#fff" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - p} />
  </S>
);

export const VideoIcon: React.FC<P> = ({ size, color = COLORS.orange, style }) => (
  <S size={size} style={style}>
    <rect x="8" y="26" width="58" height="48" rx="12" fill={color} />
    <path d="M70 44 L92 30 V70 L70 56 Z" fill={color} />
  </S>
);

export const CalendarIcon: React.FC<P> = ({ size, color = COLORS.orange, style }) => (
  <S size={size} style={style}>
    <rect x="10" y="18" width="80" height="72" rx="14" fill="#fff" stroke={color} strokeWidth="6" />
    <rect x="10" y="18" width="80" height="22" rx="10" fill={color} />
    <rect x="28" y="8" width="8" height="20" rx="4" fill={COLORS.title} />
    <rect x="64" y="8" width="8" height="20" rx="4" fill={COLORS.title} />
  </S>
);

export const CapIcon: React.FC<P> = ({ size, color = COLORS.title, style }) => (
  <S size={size} style={style}>
    <path d="M50 18 L96 38 L50 58 L4 38 Z" fill={color} />
    <path d="M24 48 V68 Q50 84 76 68 V48 L50 60 Z" fill={color} opacity={0.85} />
    <path d="M90 40 V66" stroke={COLORS.orange} strokeWidth="5" strokeLinecap="round" />
    <circle cx="90" cy="70" r="6" fill={COLORS.orange} />
  </S>
);

export const MapleLeaf: React.FC<P> = ({ size, color = COLORS.red, style }) => (
  <S size={size} style={style}>
    <path
      d="M50 4 L57 20 L66 15 L63 38 L76 26 L79 34 L94 31 L88 45 L96 50 L72 68 L75 77 L52 73 L53 96 L47 96 L48 73 L25 77 L28 68 L4 50 L12 45 L6 31 L21 34 L24 26 L37 38 L34 15 L43 20 Z"
      fill={color}
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </S>
);

export const CoinIcon: React.FC<P> = ({ size, style }) => (
  <S size={size} style={style}>
    <circle cx="50" cy="50" r="44" fill={COLORS.yellow} />
    <circle cx="50" cy="50" r="34" fill="none" stroke="#e09a00" strokeWidth="5" />
    <path d="M58 36 Q50 30 42 36 Q36 44 44 49 L56 53 Q64 58 56 66 Q48 70 40 64 M50 26 V74" fill="none" stroke="#c07a00" strokeWidth="6" strokeLinecap="round" />
  </S>
);

export const HeartIcon: React.FC<P> = ({ size, color = COLORS.orange, style }) => (
  <S size={size} style={style}>
    <path d="M50 88 C20 66 6 50 6 32 C6 18 18 8 30 8 C40 8 46 14 50 22 C54 14 60 8 70 8 C82 8 94 18 94 32 C94 50 80 66 50 88 Z" fill={color} />
  </S>
);

export const ClockIcon: React.FC<P & { frame?: number }> = ({ size, color = COLORS.title, style, frame = 0 }) => (
  <S size={size} style={style}>
    <circle cx="50" cy="50" r="42" fill="#fff" stroke={color} strokeWidth="7" />
    <path d={`M50 50 L${50 + Math.cos(frame / 6) * 26} ${50 + Math.sin(frame / 6) * 26}`} stroke={COLORS.orange} strokeWidth="6" strokeLinecap="round" />
    <path d={`M50 50 L${50 + Math.cos(frame / 60) * 18} ${50 + Math.sin(frame / 60) * 18}`} stroke={color} strokeWidth="7" strokeLinecap="round" />
  </S>
);
