"use client";
import { motion } from "framer-motion";

interface DevCharacterProps {
  variant?: "blue" | "purple" | "pink" | "cyan";
  size?: number;
  className?: string;
  animate?: boolean;
}

export default function DevCharacter({ variant = "blue", size = 80, className = "", animate = true }: DevCharacterProps) {
  const colors = {
    blue:   { skin: "#FFDAB9", hair: "#1a1a2e", shirt: "#4f9eff", accent: "#2563eb" },
    purple: { skin: "#FFDAB9", hair: "#4a1d96", shirt: "#a855f7", accent: "#7c3aed" },
    pink:   { skin: "#FFE4C4", hair: "#831843", shirt: "#ec4899", accent: "#be185d" },
    cyan:   { skin: "#FFDAB9", hair: "#164e63", shirt: "#22d3ee", accent: "#0891b2" },
  };
  const c = colors[variant];

  return (
    <motion.div
      className={className}
      animate={animate ? { y: [0, -6, 0] } : {}}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width={size} height={size * 1.3} viewBox="0 0 80 104" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Body */}
        <ellipse cx="40" cy="75" rx="18" ry="20" fill={c.shirt} />
        {/* Shirt detail */}
        <ellipse cx="40" cy="70" rx="10" ry="6" fill={c.accent} opacity="0.4" />
        {/* Laptop */}
        <rect x="26" y="80" width="28" height="18" rx="3" fill="#1e1e2e" />
        <rect x="28" y="82" width="24" height="14" rx="2" fill="#2d2d44" />
        {/* Screen glow */}
        <rect x="29" y="83" width="22" height="12" rx="1" fill={c.shirt} opacity="0.3" />
        {/* Code lines on screen */}
        <rect x="30" y="85" width="10" height="1.5" rx="0.5" fill={c.shirt} />
        <rect x="30" y="88" width="16" height="1.5" rx="0.5" fill="#4ade80" opacity="0.8" />
        <rect x="30" y="91" width="12" height="1.5" rx="0.5" fill="#fb923c" opacity="0.8" />
        {/* Neck */}
        <rect x="36" y="56" width="8" height="8" fill={c.skin} />
        {/* Head */}
        <ellipse cx="40" cy="46" rx="17" ry="18" fill={c.skin} />
        {/* Hair */}
        <path d="M23 38 Q28 20 40 22 Q52 20 57 38 Q54 30 40 28 Q26 30 23 38Z" fill={c.hair} />
        {/* Eyes */}
        <ellipse cx="33" cy="44" rx="3.5" ry="4" fill="white" />
        <ellipse cx="47" cy="44" rx="3.5" ry="4" fill="white" />
        <circle cx="34" cy="45" r="2" fill="#1a1a2e" />
        <circle cx="48" cy="45" r="2" fill="#1a1a2e" />
        {/* Eye shine */}
        <circle cx="35" cy="44" r="0.8" fill="white" />
        <circle cx="49" cy="44" r="0.8" fill="white" />
        {/* Smile */}
        <path d="M35 52 Q40 57 45 52" stroke="#1a1a2e" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        {/* Glasses */}
        <rect x="29" y="41" width="10" height="7" rx="3" fill="none" stroke={c.shirt} strokeWidth="1.5" />
        <rect x="41" y="41" width="10" height="7" rx="3" fill="none" stroke={c.shirt} strokeWidth="1.5" />
        <line x1="39" y1="44.5" x2="41" y2="44.5" stroke={c.shirt} strokeWidth="1.5" />
        {/* Arms */}
        <path d="M22 70 Q18 80 22 90" stroke={c.shirt} strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M58 70 Q62 80 58 90" stroke={c.shirt} strokeWidth="7" strokeLinecap="round" fill="none" />
        {/* Hands */}
        <ellipse cx="21" cy="91" rx="4" ry="3.5" fill={c.skin} />
        <ellipse cx="59" cy="91" rx="4" ry="3.5" fill={c.skin} />
      </svg>
    </motion.div>
  );
}
