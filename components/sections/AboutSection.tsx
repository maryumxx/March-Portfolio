"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import DevCharacter from "@/components/characters/DevCharacter";
import { fadeUpVariant, staggerChildren } from "@/lib/utils";

const techStack = [
  { name: "React", color: "#61dafb", icon: "⚛️" },
  { name: "Next.js", color: "#ffffff", icon: "▲" },
  { name: "TypeScript", color: "#3178c6", icon: "TS" },
  { name: "Node.js", color: "#6cc24a", icon: "🟢" },
  { name: "Tailwind", color: "#38bdf8", icon: "🌊" },
  { name: "PostgreSQL", color: "#336791", icon: "🐘" },
  { name: "Docker", color: "#2496ed", icon: "🐳" },
  { name: "Framer", color: "#ff0055", icon: "🎬" },
];

const traits = [
  { emoji: "🎨", title: "Creative by Nature", description: "I believe every pixel matters. Great software is also great design." },
  { emoji: "⚡", title: "Performance Obsessed", description: "Fast, smooth, and efficient. I optimize everything from code to UX." },
  { emoji: "🤝", title: "Team Player", description: "Collaboration is my superpower. I thrive in creative, driven teams." },
  { emoji: "🔬", title: "Always Learning", description: "The tech world moves fast — I move faster. Always exploring what's next." },
];

function TechBadge({ name, color, icon, delay }: { name: string; color: string; icon: string; delay: number }) {
  return (
    <motion.div
      className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold cursor-default"
      style={{
        background: `${color}15`,
        border: `1px solid ${color}30`,
        color: color === "#ffffff" ? "rgba(255,255,255,0.9)" : color,
      }}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, type: "spring", stiffness: 300 }}
      whileHover={{ scale: 1.08, y: -3 }}
    >
      <span className="text-base">{icon}</span>
      <span>{name}</span>
    </motion.div>
  );
}

function TraitCard({ emoji, title, description, delay }: { emoji: string; title: string; description: string; delay: number }) {
  return (
    <motion.div
      className="relative p-5 rounded-2xl group"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.03, borderColor: "rgba(79,158,255,0.3)" }}
    >
      <motion.div
        className="text-3xl mb-3"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: delay * 2 }}
      >
        {emoji}
      </motion.div>
      <h3 className="text-white font-bold mb-1.5 text-sm">{title}</h3>
      <p className="text-white/50 text-xs leading-relaxed">{description}</p>
    </motion.div>
  );
}

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #050510 0%, #0a0a1e 50%, #050510 100%)" }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #a855f7, transparent)" }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-0 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #4f9eff, transparent)" }}
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          variants={staggerChildren}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-xs font-semibold uppercase tracking-widest"
            style={{ background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.3)", color: "#a855f7" }}
          >
            <span>👤</span> About Me
          </motion.div>
          <motion.h2 variants={fadeUpVariant} className="text-4xl md:text-5xl font-black text-white mb-4">
            The Story{" "}
            <span style={{
              background: "linear-gradient(135deg, #a855f7, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Behind the Code</span>
          </motion.h2>
          <motion.p variants={fadeUpVariant} className="text-white/50 max-w-2xl mx-auto text-base">
            I&apos;m not just a developer — I&apos;m a creator who happens to write code.
          </motion.p>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-5 text-white/70 text-base leading-relaxed">
              <motion.p
                className="text-lg text-white/90"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Hey there! 👋 I&apos;m <span className="text-white font-semibold">Maryam</span>, a passionate full-stack
                developer with a deep love for building beautiful, high-performance web applications.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                My journey started with curiosity — one HTML file changed everything. What began as a hobby quickly
                became an obsession with{" "}
                <span style={{ color: "#4f9eff" }}>turning complex ideas into elegant digital experiences</span>.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                I specialize in <span style={{ color: "#a855f7" }}>React / Next.js ecosystems</span>, building everything
                from snappy frontends to scalable APIs. I care deeply about accessibility, performance, and the
                small details that make users go "wow."
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                When I&apos;m not coding, you&apos;ll find me exploring{" "}
                <span style={{ color: "#ec4899" }}>design trends</span>, contributing to open source,
                or sketching out the next big idea on a whiteboard.
              </motion.p>
            </div>

            {/* Trait cards */}
            <div className="grid grid-cols-2 gap-3 mt-8">
              {traits.map((t, i) => (
                <TraitCard key={t.title} {...t} delay={0.1 * i} />
              ))}
            </div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Main card */}
            <div
              className="relative w-full max-w-sm rounded-3xl p-8 text-center"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Character */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <motion.div
                    className="absolute -inset-4 rounded-full opacity-30 blur-xl"
                    style={{ background: "radial-gradient(circle, #a855f7, transparent)" }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <DevCharacter variant="purple" size={130} />
                </div>
              </div>

              {/* Name card */}
              <h3 className="text-2xl font-black text-white mb-1">Maryam</h3>
              <p className="text-sm mb-5" style={{ color: "#a855f7" }}>Full Stack Developer</p>

              {/* Fun facts */}
              <div className="space-y-2.5">
                {[
                  { icon: "📍", text: "Based in the digital world" },
                  { icon: "☕", text: "Runs on coffee + curiosity" },
                  { icon: "🎵", text: "Codes to lo-fi beats" },
                  { icon: "🌙", text: "Night owl developer" },
                ].map((fact, i) => (
                  <motion.div
                    key={fact.text}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-white/60"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <span>{fact.icon}</span>
                    <span>{fact.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              className="absolute -top-5 -right-5 px-4 py-2 rounded-2xl text-xs font-bold"
              style={{ background: "linear-gradient(135deg, #4f9eff, #a855f7)", boxShadow: "0 0 20px rgba(79,158,255,0.4)" }}
              animate={{ y: [0, -8, 0], rotate: [-3, 3, -3] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🚀 Open to Work
            </motion.div>
            <motion.div
              className="absolute -bottom-5 -left-5 px-4 py-2 rounded-2xl text-xs font-bold"
              style={{ background: "linear-gradient(135deg, #ec4899, #fb923c)", boxShadow: "0 0 20px rgba(236,72,153,0.4)" }}
              animate={{ y: [0, 8, 0], rotate: [3, -3, 3] }}
              transition={{ duration: 4, repeat: Infinity, delay: 2 }}
            >
              💡 Problem Solver
            </motion.div>
          </motion.div>
        </div>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-white/40 text-sm uppercase tracking-widest mb-6">My Tech Arsenal</p>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, i) => (
              <TechBadge key={tech.name} {...tech} delay={i * 0.05} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
