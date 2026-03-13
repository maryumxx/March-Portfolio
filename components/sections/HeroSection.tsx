"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import DevCharacter from "@/components/characters/DevCharacter";
import RobotCharacter from "@/components/characters/RobotCharacter";
import HangingCharacter from "@/components/characters/HangingCharacter";

const TYPING_STRINGS = [
  "Full Stack Developer",
  "Frontend Engineer",
  "UI/UX Enthusiast",
  "React Specialist",
  "Creative Coder",
];

function TypingText() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = TYPING_STRINGS[index];
    let timeout: NodeJS.Timeout;

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % TYPING_STRINGS.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, index]);

  return (
    <span>
      <span
        style={{
          background: "linear-gradient(135deg, #22d3ee, #4f9eff, #a855f7)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {displayed}
      </span>
      <motion.span
        className="inline-block w-0.5 h-8 ml-1 align-middle"
        style={{ background: "#4f9eff" }}
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </span>
  );
}

function FloatingShape({ x, y, size, color, delay }: { x: string; y: string; size: number; color: string; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}40 0%, ${color}10 60%, transparent 100%)`,
        border: `1px solid ${color}30`,
        filter: "blur(0.5px)",
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 10, 0],
        scale: [1, 1.1, 1],
        opacity: [0.5, 0.9, 0.5],
      }}
      transition={{
        duration: 6 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

function GlowingOrb({ x, y, color }: { x: string; y: string; color: string }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: x,
        top: y,
        width: 300,
        height: 300,
        background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
        borderRadius: "50%",
        filter: "blur(40px)",
      }}
      animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function CharacterButton({
  children,
  onClick,
  variant,
  characterSide,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant: "primary" | "secondary" | "ghost";
  characterSide?: "left" | "right";
}) {
  const [hovered, setHovered] = useState(false);

  const styles = {
    primary: {
      background: "linear-gradient(135deg, #4f9eff 0%, #a855f7 100%)",
      boxShadow: "0 0 30px rgba(79,158,255,0.4), 0 4px 20px rgba(0,0,0,0.3)",
    },
    secondary: {
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.2)",
      backdropFilter: "blur(10px)",
    },
    ghost: {
      background: "transparent",
      border: "1px solid rgba(168,85,247,0.4)",
    },
  };

  return (
    <motion.div className="relative" onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}>
      {/* Hanging character */}
      {characterSide && (
        <HangingCharacter
          side={characterSide}
          color={variant === "primary" ? "#4f9eff" : "#a855f7"}
          size={42}
          className={characterSide === "left" ? "-top-12 left-2" : "-top-12 right-2"}
        />
      )}

      <motion.button
        className="relative px-8 py-4 rounded-2xl text-white font-bold text-base overflow-visible"
        style={styles[variant]}
        onClick={onClick}
        whileHover={{ scale: 1.06, y: -3 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        {/* Button inner glow on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            opacity: hovered ? 1 : 0,
            background: variant === "primary"
              ? "linear-gradient(135deg, #22d3ee20 0%, #ec489920 100%)"
              : "rgba(79,158,255,0.1)",
          }}
          transition={{ duration: 0.2 }}
        />
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </motion.button>
    </motion.div>
  );
}

function FloatingCodeBlock({ code, x, y, delay }: { code: string; x: string; y: string; delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none hidden lg:block"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <motion.div
        className="px-4 py-3 rounded-xl text-xs font-mono text-white/60"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(10px)",
          maxWidth: 200,
        }}
        animate={{ y: [0, -10, 0], rotate: [0, 1, 0] }}
        transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut" }}
      >
        <pre style={{ color: "#4f9eff" }}>{code}</pre>
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{
        background: "linear-gradient(135deg, #050510 0%, #0a0520 30%, #100525 60%, #050510 100%)",
      }}
    >
      {/* Animated gradient mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <GlowingOrb x="-5%" y="10%" color="#4f9eff" />
        <GlowingOrb x="60%" y="-10%" color="#a855f7" />
        <GlowingOrb x="80%" y="60%" color="#ec4899" />
        <GlowingOrb x="20%" y="70%" color="#22d3ee" />
      </div>

      {/* Floating shapes */}
      <FloatingShape x="5%" y="20%" size={120} color="#4f9eff" delay={0} />
      <FloatingShape x="85%" y="15%" size={80} color="#a855f7" delay={1} />
      <FloatingShape x="90%" y="70%" size={140} color="#ec4899" delay={2} />
      <FloatingShape x="2%" y="65%" size={100} color="#22d3ee" delay={0.5} />
      <FloatingShape x="50%" y="5%" size={60} color="#4ade80" delay={1.5} />
      <FloatingShape x="40%" y="85%" size={90} color="#fb923c" delay={3} />

      {/* Floating code snippets */}
      <FloatingCodeBlock code={`const dev = {\n  name: "Maryam",\n  passion: "∞"\n}`} x="3%" y="30%" delay={1.2} />
      <FloatingCodeBlock code={`<Portfolio\n  creative={true}\n  awesome={true}\n/>`} x="75%" y="25%" delay={1.8} />
      <FloatingCodeBlock code={`git commit -m\n"✨ build magic"`} x="78%" y="65%" delay={2.2} />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(79,158,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79,158,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Characters floating around */}
      <motion.div
        className="absolute bottom-20 left-[8%] hidden lg:block"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <DevCharacter variant="blue" size={100} />
      </motion.div>

      <motion.div
        className="absolute top-24 right-[6%] hidden lg:block"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
      >
        <RobotCharacter size={80} variant="purple" />
      </motion.div>

      <motion.div
        className="absolute bottom-32 right-[12%] hidden xl:block"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.1 }}
      >
        <DevCharacter variant="pink" size={75} />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-sm font-medium"
          style={{
            background: "rgba(79,158,255,0.1)",
            border: "1px solid rgba(79,158,255,0.3)",
            color: "#4f9eff",
          }}
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
        >
          <motion.span
            className="w-2 h-2 rounded-full bg-green-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span>Available for opportunities ✨</span>
        </motion.div>

        {/* Main heading */}
        <motion.div
          style={{ rotateX: springRotateX, rotateY: springRotateY, transformPerspective: 1200 }}
        >
          <motion.h1
            className="text-6xl sm:text-7xl md:text-8xl font-black leading-none mb-4 tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="block text-white">Hi, I&apos;m</span>
            <motion.span
              className="block"
              style={{
                background: "linear-gradient(135deg, #4f9eff 0%, #a855f7 40%, #ec4899 70%, #22d3ee 100%)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              Maryam
            </motion.span>
          </motion.h1>
        </motion.div>

        {/* Typing subtitle */}
        <motion.div
          className="text-xl sm:text-2xl md:text-3xl font-semibold text-white/80 mb-6 h-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <TypingText />
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          I craft digital experiences that blend creativity with clean code.
          From pixel-perfect UIs to full-stack applications — I build things that
          <span style={{ color: "#4f9eff" }}> actually delight people</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
        >
          <CharacterButton variant="primary" onClick={() => scrollTo("projects")} characterSide="left">
            <span>🚀</span>
            <span>View My Work</span>
          </CharacterButton>

          <CharacterButton variant="secondary" onClick={() => scrollTo("about")} characterSide="right">
            <span>👋</span>
            <span>About Me</span>
          </CharacterButton>

          <CharacterButton variant="ghost" onClick={() => scrollTo("contact")}>
            <span>💬</span>
            <span>Let&apos;s Connect</span>
          </CharacterButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          {[
            { num: "15+", label: "Projects Built" },
            { num: "3+", label: "Years Experience" },
            { num: "10+", label: "Happy Clients" },
            { num: "∞", label: "Passion" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 + i * 0.1 }}
            >
              <div
                className="text-3xl font-black mb-1"
                style={{
                  background: "linear-gradient(135deg, #4f9eff, #a855f7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {stat.num}
              </div>
              <div className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <span className="uppercase tracking-widest text-[10px]">Scroll to explore</span>
        <motion.div
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1"
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-white/50"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
