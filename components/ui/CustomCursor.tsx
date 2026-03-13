"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [trailPos, setTrailPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    let trail = { x: 0, y: 0 };

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      // Lag the trail
      setTimeout(() => {
        trail = { x: e.clientX, y: e.clientY };
        setTrailPos({ ...trail });
      }, 80);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor-hover]")) {
        setIsHovering(true);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor-hover]")) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <>
      {/* Cursor glow trail */}
      <motion.div
        className="pointer-events-none fixed z-[9998]"
        animate={{ x: trailPos.x - 20, y: trailPos.y - 20 }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      >
        <div
          className="w-10 h-10 rounded-full"
          style={{
            background: isHovering
              ? "radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(79,158,255,0.3) 0%, transparent 70%)",
            transform: `scale(${isClicking ? 0.6 : isHovering ? 2 : 1})`,
            transition: "transform 0.2s ease, background 0.3s ease",
          }}
        />
      </motion.div>

      {/* Main cursor dot */}
      <motion.div
        className="pointer-events-none fixed z-[9999]"
        animate={{ x: pos.x - 6, y: pos.y - 6 }}
        transition={{ type: "spring", damping: 50, stiffness: 500 }}
      >
        <div
          style={{
            width: isHovering ? "16px" : "12px",
            height: isHovering ? "16px" : "12px",
            marginLeft: isHovering ? "-2px" : "0",
            marginTop: isHovering ? "-2px" : "0",
            borderRadius: "50%",
            background: isHovering
              ? "linear-gradient(135deg, #a855f7, #ec4899)"
              : "linear-gradient(135deg, #4f9eff, #22d3ee)",
            transform: `scale(${isClicking ? 0.7 : 1})`,
            transition: "all 0.15s ease",
            boxShadow: isHovering
              ? "0 0 10px rgba(168,85,247,0.8)"
              : "0 0 10px rgba(79,158,255,0.8)",
          }}
        />
      </motion.div>
    </>
  );
}
