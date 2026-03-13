"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import DevCharacter from "@/components/characters/DevCharacter";

const skillCategories = [
  {
    id: "frontend",
    label: "Frontend",
    emoji: "🎨",
    color: "#4f9eff",
    skills: [
      { name: "React", level: 95, icon: "⚛️" },
      { name: "Next.js", level: 92, icon: "▲" },
      { name: "TypeScript", level: 90, icon: "📘" },
      { name: "Tailwind CSS", level: 95, icon: "🌊" },
      { name: "Framer Motion", level: 85, icon: "🎬" },
      { name: "GSAP", level: 78, icon: "💫" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    emoji: "⚡",
    color: "#a855f7",
    skills: [
      { name: "Node.js", level: 88, icon: "🟢" },
      { name: "Express", level: 85, icon: "🚂" },
      { name: "PostgreSQL", level: 82, icon: "🐘" },
      { name: "MongoDB", level: 80, icon: "🍃" },
      { name: "Redis", level: 75, icon: "⚡" },
      { name: "GraphQL", level: 78, icon: "🔷" },
    ],
  },
  {
    id: "tools",
    label: "Tools & DevOps",
    emoji: "🔧",
    color: "#22d3ee",
    skills: [
      { name: "Git", level: 95, icon: "📦" },
      { name: "Docker", level: 80, icon: "🐳" },
      { name: "AWS", level: 72, icon: "☁️" },
      { name: "Vercel", level: 92, icon: "🚀" },
      { name: "CI/CD", level: 78, icon: "🔄" },
      { name: "Figma", level: 85, icon: "🎨" },
    ],
  },
];

const orbitingTech = [
  { name: "React", emoji: "⚛️", color: "#61dafb", radius: 120, speed: 15, size: 44 },
  { name: "Next.js", emoji: "▲", color: "#fff", radius: 120, speed: 18, size: 40, startAngle: 60 },
  { name: "TypeScript", emoji: "TS", color: "#3178c6", radius: 120, speed: 20, size: 42, startAngle: 120 },
  { name: "Node.js", emoji: "🟢", color: "#6cc24a", radius: 120, speed: 14, size: 40, startAngle: 180 },
  { name: "Tailwind", emoji: "🌊", color: "#38bdf8", radius: 120, speed: 16, size: 38, startAngle: 240 },
  { name: "Docker", emoji: "🐳", color: "#2496ed", radius: 120, speed: 22, size: 38, startAngle: 300 },
  { name: "Postgres", emoji: "🐘", color: "#336791", radius: 170, speed: 25, size: 36, startAngle: 30 },
  { name: "GraphQL", emoji: "🔷", color: "#e535ab", radius: 170, speed: 28, size: 36, startAngle: 90 },
  { name: "Redis", emoji: "⚡", color: "#ff4438", radius: 170, speed: 24, size: 34, startAngle: 150 },
  { name: "AWS", emoji: "☁️", color: "#ff9900", radius: 170, speed: 26, size: 36, startAngle: 210 },
  { name: "Figma", emoji: "🎨", color: "#f24e1e", radius: 170, speed: 20, size: 36, startAngle: 270 },
  { name: "Git", emoji: "📦", color: "#f05032", radius: 170, speed: 30, size: 34, startAngle: 330 },
];

function SkillBar({ name, level, icon, color, delay }: { name: string; level: number; icon: string; color: string; delay: number }) {
  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-1.5">
        <div className="flex items-center gap-2 text-sm font-semibold text-white/80">
          <span>{icon}</span>
          <span>{name}</span>
        </div>
        <span className="text-xs font-bold" style={{ color }}>{level}%</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full relative"
          style={{ background: `linear-gradient(90deg, ${color}aa, ${color})` }}
          initial={{ width: "0%" }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.2, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white opacity-80" />
        </motion.div>
      </div>
    </motion.div>
  );
}

function OrbitSystem() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  return (
    <div className="relative flex items-center justify-center" style={{ width: 380, height: 380 }}>
      {/* Orbit rings */}
      {[120, 170].map((r) => (
        <div
          key={r}
          className="absolute rounded-full"
          style={{
            width: r * 2,
            height: r * 2,
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        />
      ))}

      {/* Center */}
      <motion.div
        className="absolute flex flex-col items-center justify-center text-center z-10"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <DevCharacter variant="cyan" size={70} animate={true} />
        <div
          className="mt-1 text-xs font-bold"
          style={{ color: "#22d3ee" }}
        >
          Full Stack
        </div>
      </motion.div>

      {/* Orbiting tech icons */}
      {orbitingTech.map((tech, i) => (
        <motion.div
          key={tech.name}
          className="absolute"
          animate={{
            rotate: [tech.startAngle || 0, (tech.startAngle || 0) + 360],
          }}
          transition={{
            duration: tech.speed,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: tech.radius * 2,
            height: tech.radius * 2,
            transformOrigin: "center center",
          }}
        >
          <motion.div
            className="absolute flex items-center justify-center rounded-full cursor-pointer"
            style={{
              width: tech.size,
              height: tech.size,
              top: 0,
              left: "50%",
              marginLeft: -tech.size / 2,
              marginTop: -tech.size / 2,
              background: `${tech.color}15`,
              border: `1px solid ${tech.color}40`,
            }}
            animate={{ rotate: [-(tech.startAngle || 0), -(tech.startAngle || 0) - 360] }}
            transition={{ duration: tech.speed, repeat: Infinity, ease: "linear" }}
            whileHover={{ scale: 1.4 }}
            onHoverStart={() => setHoveredTech(tech.name)}
            onHoverEnd={() => setHoveredTech(null)}
          >
            <span className="text-sm">{tech.emoji}</span>
          </motion.div>
        </motion.div>
      ))}

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredTech && (
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full mt-4 px-3 py-1.5 rounded-lg text-xs font-bold text-white whitespace-nowrap z-20"
            style={{ background: "rgba(10,10,30,0.9)", border: "1px solid rgba(255,255,255,0.1)" }}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 8 }}
            exit={{ opacity: 0, y: -5 }}
          >
            {hoveredTech}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("frontend");
  const activeCat = skillCategories.find(c => c.id === activeCategory)!;

  return (
    <section id="skills" ref={ref} className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #050510 0%, #0a0a1e 100%)" }}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute left-0 top-1/3 w-[600px] h-[600px] rounded-full opacity-[0.04] blur-3xl"
          style={{ background: "radial-gradient(circle, #22d3ee, transparent)" }}
          animate={{ x: [0, 50, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-xs font-semibold uppercase tracking-widest"
            style={{ background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.3)", color: "#22d3ee" }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.1 }}
          >
            <span>⚡</span> Skills & Technologies
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            My Tech{" "}
            <span style={{
              background: "linear-gradient(135deg, #22d3ee, #4f9eff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Universe</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Tools and technologies I use to turn ideas into reality. Always expanding the arsenal.
          </p>
        </motion.div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Orbit */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <OrbitSystem />
          </motion.div>

          {/* Right: Skill bars */}
          <div>
            {/* Category tabs */}
            <div className="flex gap-2 mb-8 flex-wrap">
              {skillCategories.map(cat => (
                <motion.button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    background: activeCategory === cat.id ? `${cat.color}20` : "rgba(255,255,255,0.04)",
                    border: `1px solid ${activeCategory === cat.id ? cat.color + "50" : "rgba(255,255,255,0.08)"}`,
                    color: activeCategory === cat.id ? cat.color : "rgba(255,255,255,0.5)",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Skill bars */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                className="space-y-5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeCat.skills.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    {...skill}
                    color={activeCat.color}
                    delay={i * 0.08}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Summary badges */}
            <motion.div
              className="mt-8 grid grid-cols-3 gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              {[
                { value: "3+", label: "Years Coding", color: "#4f9eff" },
                { value: "15+", label: "Technologies", color: "#a855f7" },
                { value: "20+", label: "Projects Done", color: "#22d3ee" },
              ].map(stat => (
                <div
                  key={stat.label}
                  className="text-center p-4 rounded-2xl"
                  style={{ background: `${stat.color}10`, border: `1px solid ${stat.color}20` }}
                >
                  <div className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="text-xs text-white/40 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
