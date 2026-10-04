import React from "react";
import { COLORS } from "../../Promo/theme";

export type SubjectKind = "math" | "science" | "biology" | "chemistry" | "physics";

export const SUBJECTS: { kind: SubjectKind; label: string }[] = [
  { kind: "math", label: "ریاضی" },
  { kind: "science", label: "علوم" },
  { kind: "biology", label: "زیست‌شناسی" },
  { kind: "chemistry", label: "شیمی" },
  { kind: "physics", label: "فیزیک" },
];

const MathIcon: React.FC = () => (
  <svg width="54" height="54" viewBox="0 0 100 100">
    <text x="50" y="68" textAnchor="middle" fontSize="60" fontWeight="700" fill="#FFFFFF" fontFamily="Georgia, serif">
      π
    </text>
  </svg>
);

const ScienceIcon: React.FC = () => (
  <svg width="54" height="54" viewBox="0 0 100 100">
    <path
      d="M40 14h20v24l18 38a8 8 0 0 1-7 12H29a8 8 0 0 1-7-12l18-38z"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth={6}
      strokeLinejoin="round"
    />
    <path d="M33 58h34" stroke="#FFFFFF" strokeWidth={5} strokeLinecap="round" />
    <circle cx="44" cy="72" r="4" fill="#FFFFFF" />
    <circle cx="58" cy="78" r="3" fill="#FFFFFF" />
    <circle cx="50" cy="82" r="2.4" fill="#FFFFFF" />
  </svg>
);

const BiologyIcon: React.FC = () => (
  <svg width="54" height="54" viewBox="0 0 100 100">
    <path
      d="M24 82C24 50 50 50 50 18"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth={6}
      strokeLinecap="round"
    />
    <path
      d="M50 18c6 10 22 10 24 26-14 4-26-2-30-14"
      fill="#FFFFFF"
    />
    <path d="M30 60c6 2 12 1 16-3" stroke="#FFFFFF" strokeWidth={4} strokeLinecap="round" fill="none" />
  </svg>
);

const ChemistryIcon: React.FC = () => (
  <svg width="54" height="54" viewBox="0 0 100 100">
    <line x1="30" y1="34" x2="62" y2="24" stroke="#FFFFFF" strokeWidth={5} />
    <line x1="30" y1="34" x2="40" y2="70" stroke="#FFFFFF" strokeWidth={5} />
    <line x1="62" y1="24" x2="72" y2="58" stroke="#FFFFFF" strokeWidth={5} />
    <line x1="40" y1="70" x2="72" y2="58" stroke="#FFFFFF" strokeWidth={5} />
    <circle cx="30" cy="34" r="9" fill="#FFFFFF" />
    <circle cx="62" cy="24" r="7" fill="#FFFFFF" />
    <circle cx="40" cy="70" r="8" fill="#FFFFFF" />
    <circle cx="72" cy="58" r="6" fill="#FFFFFF" />
  </svg>
);

const PhysicsIcon: React.FC = () => (
  <svg width="54" height="54" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="7" fill="#FFFFFF" />
    <ellipse cx="50" cy="50" rx="40" ry="16" fill="none" stroke="#FFFFFF" strokeWidth={4.5} />
    <ellipse cx="50" cy="50" rx="40" ry="16" fill="none" stroke="#FFFFFF" strokeWidth={4.5} transform="rotate(60 50 50)" />
    <ellipse cx="50" cy="50" rx="40" ry="16" fill="none" stroke="#FFFFFF" strokeWidth={4.5} transform="rotate(120 50 50)" />
  </svg>
);

const ICONS: Record<SubjectKind, React.FC> = {
  math: MathIcon,
  science: ScienceIcon,
  biology: BiologyIcon,
  chemistry: ChemistryIcon,
  physics: PhysicsIcon,
};

export const SubjectBadge: React.FC<{ kind: SubjectKind; size?: number }> = ({ kind, size = 118 }) => {
  const Icon = ICONS[kind];
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: COLORS.orange,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 18px 38px rgba(237,95,0,0.28)",
      }}
    >
      <Icon />
    </div>
  );
};
