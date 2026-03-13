"use client";
import { motion } from "framer-motion";

interface PeekingCharacterProps {
  side?: "left" | "right" | "bottom";
  color?: string;
  size?: number;
  className?: string;
}

export default function PeekingCharacter({ side = "right", color = "#a855f7", size = 60, className = "" }: PeekingCharacterProps) {
  const isLeft = side === "left";
  const isBottom = side === "bottom";

  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ x: isLeft ? -30 : isBottom ? 0 : 30, y: isBottom ? 30 : 0, opacity: 0 }}
      animate={{ x: isLeft ? -10 : isBottom ? 0 : 10, y: isBottom ? 10 : 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ x: isLeft ? 0 : isBottom ? 0 : 0, y: isBottom ? 0 : 0, scale: 1.1 }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: isLeft ? "scaleX(-1)" : "none" }}
      >
        {/* Head peeking */}
        <circle cx="30" cy="30" r="22" fill="#FFDAB9" />
        {/* Hair */}
        <path d="M8 24 Q13 6 30 8 Q47 6 52 24 Q48 14 30 16 Q12 14 8 24Z" fill={color} />
        {/* Eyes - wide and curious */}
        <circle cx="22" cy="28" r="4" fill="white" />
        <circle cx="38" cy="28" r="4" fill="white" />
        <motion.circle
          cx="23" cy="28" r="2.5" fill="#1a1a2e"
          animate={{ x: [0, 2, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.circle
          cx="39" cy="28" r="2.5" fill="#1a1a2e"
          animate={{ x: [0, 2, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <circle cx="24" cy="27" r="1" fill="white" />
        <circle cx="40" cy="27" r="1" fill="white" />
        {/* Eyebrows raised */}
        <path d="M18 22 Q22 19 26 22" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M34 22 Q38 19 42 22" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* O-mouth surprised */}
        <ellipse cx="30" cy="38" rx="4" ry="3" fill="#1a1a2e" />
        <ellipse cx="30" cy="38" rx="2" ry="1.5" fill="#c0392b" />
        {/* Hand on edge */}
        <ellipse cx={isLeft ? "52" : "8"} cy="42" rx="5" ry="4" fill="#FFDAB9" />
      </svg>
    </motion.div>
  );
}
