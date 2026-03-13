"use client";
import { motion } from "framer-motion";

interface HangingCharacterProps {
  side?: "left" | "right";
  color?: string;
  size?: number;
  className?: string;
}

export default function HangingCharacter({ side = "left", color = "#4f9eff", size = 50, className = "" }: HangingCharacterProps) {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{ rotate: side === "left" ? [-8, 8, -8] : [8, -8, 8] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      style={{ transformOrigin: "top center" }}
    >
      <svg width={size} height={size * 1.8} viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Rope/arm */}
        <line x1="25" y1="0" x2="25" y2="20" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="2 3" />
        {/* Hands gripping */}
        <ellipse cx="25" cy="22" rx="5" ry="3.5" fill="#FFDAB9" />
        {/* Head */}
        <circle cx="25" cy="35" r="14" fill="#FFDAB9" />
        {/* Hair */}
        <path d="M11 30 Q15 16 25 18 Q35 16 39 30 Q36 22 25 24 Q14 22 11 30Z" fill="#1a1a2e" />
        {/* Eyes */}
        <circle cx="20" cy="33" r="2.5" fill="white" />
        <circle cx="30" cy="33" r="2.5" fill="white" />
        <circle cx="20.5" cy="33.5" r="1.3" fill="#1a1a2e" />
        <circle cx="30.5" cy="33.5" r="1.3" fill="#1a1a2e" />
        <circle cx="21.2" cy="32.8" r="0.5" fill="white" />
        <circle cx="31.2" cy="32.8" r="0.5" fill="white" />
        {/* Big smile */}
        <path d="M18 40 Q25 47 32 40" stroke="#1a1a2e" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        {/* Body */}
        <rect x="17" y="48" width="16" height="22" rx="6" fill={color} />
        {/* Legs dangling */}
        <motion.g
          animate={{ rotate: [-10, 10, -10] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "25px 70px" }}
        >
          <rect x="18" y="68" width="6" height="14" rx="3" fill={color} opacity="0.8" />
          <ellipse cx="21" cy="83" rx="4" ry="2.5" fill="#1a1a2e" />
        </motion.g>
        <motion.g
          animate={{ rotate: [10, -10, 10] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "29px 70px" }}
        >
          <rect x="26" y="68" width="6" height="14" rx="3" fill={color} opacity="0.8" />
          <ellipse cx="29" cy="83" rx="4" ry="2.5" fill="#1a1a2e" />
        </motion.g>
      </svg>
    </motion.div>
  );
}
