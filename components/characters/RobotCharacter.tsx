"use client";
import { motion } from "framer-motion";

interface RobotCharacterProps {
  size?: number;
  className?: string;
  variant?: "blue" | "purple" | "cyan";
}

export default function RobotCharacter({ size = 70, className = "", variant = "blue" }: RobotCharacterProps) {
  const colors = {
    blue:   { body: "#4f9eff", dark: "#1d4ed8", eye: "#22d3ee", accent: "#bfdbfe" },
    purple: { body: "#a855f7", dark: "#7c3aed", eye: "#f0abfc", accent: "#e9d5ff" },
    cyan:   { body: "#22d3ee", dark: "#0891b2", eye: "#a5f3fc", accent: "#cffafe" },
  };
  const c = colors[variant];

  return (
    <motion.div
      className={className}
      animate={{ y: [0, -8, 0], rotate: [0, 2, -2, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width={size} height={size * 1.4} viewBox="0 0 70 98" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Antenna */}
        <line x1="35" y1="4" x2="35" y2="14" stroke={c.dark} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="35" cy="4" r="3.5" fill={c.eye} />
        <circle cx="35" cy="4" r="1.5" fill="white" />
        {/* Head */}
        <rect x="14" y="14" width="42" height="30" rx="8" fill={c.body} />
        {/* Head detail */}
        <rect x="16" y="16" width="38" height="26" rx="6" fill={c.dark} opacity="0.2" />
        {/* Eyes */}
        <rect x="19" y="22" width="12" height="10" rx="3" fill={c.dark} />
        <rect x="39" y="22" width="12" height="10" rx="3" fill={c.dark} />
        <motion.ellipse
          cx="25" cy="27" rx="4" ry="4"
          fill={c.eye}
          animate={{ scaleX: [1, 0.1, 1], scaleY: [1, 0.8, 1] }}
          transition={{ duration: 3, repeat: Infinity, times: [0, 0.1, 0.3] }}
        />
        <motion.ellipse
          cx="45" cy="27" rx="4" ry="4"
          fill={c.eye}
          animate={{ scaleX: [1, 0.1, 1], scaleY: [1, 0.8, 1] }}
          transition={{ duration: 3, repeat: Infinity, times: [0, 0.1, 0.3] }}
        />
        {/* Eye shine */}
        <circle cx="27" cy="25" r="1.5" fill="white" opacity="0.8" />
        <circle cx="47" cy="25" r="1.5" fill="white" opacity="0.8" />
        {/* Mouth */}
        <rect x="23" y="36" width="24" height="5" rx="2.5" fill={c.dark} />
        <rect x="25" y="37" width="4" height="3" rx="1" fill={c.accent} opacity="0.6" />
        <rect x="31" y="37" width="4" height="3" rx="1" fill={c.accent} opacity="0.6" />
        <rect x="37" y="37" width="4" height="3" rx="1" fill={c.accent} opacity="0.6" />
        {/* Neck */}
        <rect x="30" y="44" width="10" height="6" rx="2" fill={c.dark} />
        {/* Body */}
        <rect x="12" y="50" width="46" height="32" rx="10" fill={c.body} />
        {/* Chest panel */}
        <rect x="20" y="56" width="30" height="20" rx="5" fill={c.dark} opacity="0.3" />
        {/* Chest lights */}
        <motion.circle cx="27" cy="63" r="3" fill={c.eye} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} />
        <motion.circle cx="35" cy="63" r="3" fill="#4ade80" animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }} />
        <motion.circle cx="43" cy="63" r="3" fill="#fb923c" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity, delay: 1 }} />
        {/* Arms */}
        <rect x="2" y="52" width="10" height="22" rx="5" fill={c.body} />
        <rect x="58" y="52" width="10" height="22" rx="5" fill={c.body} />
        {/* Hands */}
        <rect x="2" y="72" width="10" height="8" rx="4" fill={c.dark} />
        <rect x="58" y="72" width="10" height="8" rx="4" fill={c.dark} />
        {/* Legs */}
        <rect x="18" y="82" width="12" height="14" rx="5" fill={c.dark} />
        <rect x="40" y="82" width="12" height="14" rx="5" fill={c.dark} />
        {/* Feet */}
        <rect x="15" y="93" width="18" height="5" rx="2.5" fill={c.body} />
        <rect x="37" y="93" width="18" height="5" rx="2.5" fill={c.body} />
      </svg>
    </motion.div>
  );
}
