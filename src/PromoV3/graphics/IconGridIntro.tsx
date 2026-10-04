import React from "react";
import { COLORS } from "../../Promo/theme";
import { SUBJECTS, SubjectBadge } from "./SubjectIcons";

const BookIcon: React.FC = () => (
  <svg width="30" height="30" viewBox="0 0 24 24">
    <path d="M4 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z" fill="#FFFFFF" />
    <path d="M20 4h-7a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h8z" fill="#FFFFFF" opacity={0.75} />
  </svg>
);

const StarIcon: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 24 24">
    <path
      d="M12 2.5l2.9 6.16 6.6.72-4.94 4.6 1.32 6.52L12 17.3l-5.88 3.2 1.32-6.52-4.94-4.6 6.6-.72L12 2.5z"
      fill="#FFFFFF"
    />
  </svg>
);

const ChatIcon: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 24 24">
    <path
      d="M4 4h16v12H9l-5 4z"
      fill="#FFFFFF"
    />
  </svg>
);

const PencilIcon: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 24 24">
    <path d="M3 21l1.5-5L16 4.5 19.5 8 8 19.5z" fill="none" stroke="#FFFFFF" strokeWidth={2} strokeLinejoin="round" />
    <path d="M13.5 7L17 10.5" stroke="#FFFFFF" strokeWidth={2} />
  </svg>
);

const GlobeIcon: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" fill="none" stroke="#FFFFFF" strokeWidth={2} />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18" fill="none" stroke="#FFFFFF" strokeWidth={2} />
  </svg>
);

const CapIcon: React.FC = () => (
  <svg width="30" height="30" viewBox="0 0 24 24">
    <path d="M12 3L1 8l11 5 9-4.1V15h1.5V8z" fill="#FFFFFF" />
    <path d="M5 10.5V15c0 1.7 3.1 3 7 3s7-1.3 7-3v-4.5l-7 3.2z" fill="#FFFFFF" opacity={0.85} />
  </svg>
);

type GridItem = {
  icon: React.FC;
  x: number;
  y: number;
  size: number;
  bg: string;
  delay: number;
};

const GENERIC_ICONS = [BookIcon, StarIcon, ChatIcon, PencilIcon, GlobeIcon, CapIcon];

const LAYOUT: { x: number; y: number; size: number }[] = [
  { x: 0.1, y: 0.1, size: 74 },
  { x: 0.32, y: 0.06, size: 60 },
  { x: 0.56, y: 0.1, size: 80 },
  { x: 0.82, y: 0.07, size: 62 },
  { x: 0.06, y: 0.28, size: 58 },
  { x: 0.3, y: 0.26, size: 84 },
  { x: 0.58, y: 0.3, size: 60 },
  { x: 0.86, y: 0.26, size: 76 },
  { x: 0.14, y: 0.46, size: 68 },
  { x: 0.42, y: 0.48, size: 58 },
  { x: 0.68, y: 0.47, size: 72 },
  { x: 0.9, y: 0.48, size: 58 },
  { x: 0.08, y: 0.65, size: 60 },
  { x: 0.34, y: 0.67, size: 76 },
  { x: 0.6, y: 0.65, size: 58 },
  { x: 0.84, y: 0.67, size: 68 },
];

const buildItems = (): GridItem[] =>
  LAYOUT.map((pos, i) => {
    const subject = SUBJECTS[i % SUBJECTS.length];
    const useSubject = i % 3 !== 2;
    const Icon = useSubject
      ? () => <SubjectBadge kind={subject.kind} size={pos.size} />
      : GENERIC_ICONS[i % GENERIC_ICONS.length];
    return {
      icon: Icon,
      x: pos.x,
      y: pos.y,
      size: pos.size,
      bg: useSubject ? "transparent" : i % 2 === 0 ? COLORS.textMain : COLORS.orange,
      delay: i * 2,
    };
  });

const ITEMS = buildItems();

export const IconGridIntro: React.FC<{ frame: number; exitProgress: number }> = ({ frame, exitProgress }) => {
  const groupScale = 1 - exitProgress * 0.15;
  const groupOpacity = 1 - exitProgress;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: groupOpacity,
        transform: `scale(${groupScale})`,
        pointerEvents: "none",
      }}
    >
      {ITEMS.map((item, i) => {
        const local = frame - item.delay;
        const pop = Math.max(0, Math.min(1, local / 10));
        const scale = pop < 1 ? pop * 1.08 : 1;
        if (pop <= 0) return null;
        const Icon = item.icon;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${item.x * 100}%`,
              top: `${item.y * 100}%`,
              transform: `scale(${scale})`,
              opacity: pop,
            }}
          >
            {item.bg === "transparent" ? (
              <Icon />
            ) : (
              <div
                style={{
                  width: item.size,
                  height: item.size,
                  borderRadius: "50%",
                  background: item.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 14px 30px rgba(69,66,66,0.18)",
                }}
              >
                <Icon />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
