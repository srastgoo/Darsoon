import React from "react";

export type PersonAge = "child" | "young" | "adult" | "senior";

const SKIN_TONES = ["#E3A876", "#D99A66", "#C98A5B", "#B97846"];

const CLOTH_COLORS = ["#ED5F00", "#454242", "#CC7033", "#7B7877"];

export const Person: React.FC<{
  age: PersonAge;
  size?: number;
  skinIndex?: number;
  clothIndex?: number;
  flip?: boolean;
}> = ({ age, size = 160, skinIndex = 0, clothIndex = 0, flip }) => {
  const skin = SKIN_TONES[skinIndex % SKIN_TONES.length];
  const cloth = CLOTH_COLORS[clothIndex % CLOTH_COLORS.length];
  const isChild = age === "child";
  const isSenior = age === "senior";
  const headR = isChild ? 46 : 40;
  const headCy = isChild ? 78 : 72;
  const shoulderW = isChild ? 118 : 150;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      style={{ transform: flip ? "scaleX(-1)" : undefined, display: "block" }}
    >
      <path
        d={`M ${100 - shoulderW / 2} 200 Q ${100 - shoulderW / 2} ${142} 100 ${138} Q ${100 + shoulderW / 2} ${142} ${100 + shoulderW / 2} 200 Z`}
        fill={cloth}
      />
      <circle cx="100" cy={headCy} r={headR} fill={skin} />
      {isSenior ? (
        <>
          <path
            d={`M ${100 - headR - 2} ${headCy - 6} Q 100 ${headCy - headR - 22} ${100 + headR + 2} ${headCy - 6} Q ${100 + headR - 4} ${headCy - headR + 6} 100 ${headCy - headR + 2} Q ${100 - headR + 4} ${headCy - headR + 6} ${100 - headR - 2} ${headCy - 6} Z`}
            fill="#8a8683"
          />
          <path
            d={`M ${100 - headR - 2} ${headCy - 6} Q 100 ${headCy - headR - 20} ${100 + headR + 2} ${headCy - 6} Q ${100 + headR - 6} ${headCy - headR + 8} 100 ${headCy - headR + 4} Q ${100 - headR + 6} ${headCy - headR + 8} ${100 - headR - 2} ${headCy - 6} Z`}
            fill="#4a4441"
          />
        </>
      ) : (
        <path
          d={`M ${100 - headR - 2} ${headCy - 4} Q 100 ${headCy - headR - 24} ${100 + headR + 2} ${headCy - 4} Q ${100 + headR + 4} ${headCy + headR * 0.5} ${100 + headR - 6} ${headCy + headR * 0.6} Q ${100 + headR - 10} ${headCy - headR * 0.2} 100 ${headCy - headR - 2} Q ${100 - headR + 10} ${headCy - headR * 0.2} ${100 - headR + 6} ${headCy + headR * 0.6} Q ${100 - headR - 4} ${headCy + headR * 0.5} ${100 - headR - 2} ${headCy - 4} Z`}
          fill="#241d1a"
        />
      )}
      <circle cx={100 - headR * 0.34} cy={headCy + 2} r={4.2} fill="#2c2320" />
      <circle cx={100 + headR * 0.34} cy={headCy + 2} r={4.2} fill="#2c2320" />
      <path
        d={`M ${100 - headR * 0.28} ${headCy + headR * 0.42} Q 100 ${headCy + headR * 0.62} ${100 + headR * 0.28} ${headCy + headR * 0.42}`}
        stroke="#7a4a34"
        strokeWidth={3}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};
