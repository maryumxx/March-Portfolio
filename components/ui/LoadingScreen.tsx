"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RobotCharacter from "@/components/characters/RobotCharacter";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing...");

  const stages = [
    "Initializing...",
    "Loading assets...",
    "Summoning characters...",
    "Polishing animations...",
    "Almost there...",
    "Welcome! 🎉",
  ];

  useEffect(() => {
    let prog = 0;
    const interval = setInterval(() => {
      prog += Math.random() * 20 + 5;
      if (prog > 100) prog = 100;
      setProgress(Math.round(prog));
      setLoadingText(stages[Math.floor((prog / 100) * (stages.length - 1))]);
      if (prog >= 100) {
        clearInterval(interval);
        setTimeout(() => setLoading(false), 500);
      }
    }, 200);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
          style={{ background: "linear-gradient(135deg, #0a0a1a 0%, #0f0a2e 50%, #1a0a2e 100%)" }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Background particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 6 + 2,
                height: Math.random() * 6 + 2,
                background: ["#4f9eff", "#a855f7", "#ec4899", "#22d3ee", "#4ade80"][i % 5],
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}

          {/* Logo / Name */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.h1
              className="text-5xl font-black mb-2"
              style={{
                background: "linear-gradient(135deg, #4f9eff, #a855f7, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Maryam
            </motion.h1>
            <p className="text-white/50 text-sm tracking-widest uppercase">Portfolio Loading</p>
          </motion.div>

          {/* Robot character */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <RobotCharacter size={80} variant="blue" />
          </motion.div>

          {/* Loading bar */}
          <motion.div
            className="mt-8 w-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex justify-between text-xs text-white/40 mb-2">
              <span>{loadingText}</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #4f9eff, #a855f7, #ec4899)",
                  width: `${progress}%`,
                  transition: "width 0.2s ease",
                  boxShadow: "0 0 10px rgba(79, 158, 255, 0.5)",
                }}
              />
            </div>
          </motion.div>

          {/* Decorative dots */}
          <div className="flex gap-2 mt-6">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-white/40"
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
