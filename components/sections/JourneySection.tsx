"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const milestones = [
  {
    year: "2020",
    title: "The Spark 🌟",
    description: "Opened a text editor, typed my first HTML. That single `<h1>Hello World</h1>` changed everything. I was hooked immediately.",
    tech: ["HTML", "CSS", "JavaScript"],
    color: "#4ade80",
    icon: "🌱",
    achievement: "First Website",
  },
  {
    year: "2021",
    title: "Going Deeper 🔥",
    description: "Discovered React and felt the magic of components. Built my first real-world project — a todo app that somehow became a full productivity suite.",
    tech: ["React", "Node.js", "MongoDB"],
    color: "#4f9eff",
    icon: "🚀",
    achievement: "First React App",
  },
  {
    year: "2022",
    title: "Full Stack Mode 💪",
    description: "Embraced full-stack development. APIs, databases, auth flows — I was building complete applications end-to-end, solving real problems for real people.",
    tech: ["Next.js", "PostgreSQL", "TypeScript", "Docker"],
    color: "#a855f7",
    icon: "⚡",
    achievement: "First Production App",
  },
  {
    year: "2023",
    title: "Professional Growth 🏆",
    description: "Landed my first developer role. Worked on high-impact projects, learned team collaboration at scale, and shipped features used by thousands of users.",
    tech: ["Next.js", "AWS", "GraphQL", "Redis"],
    color: "#ec4899",
    icon: "💼",
    achievement: "First Dev Role",
  },
  {
    year: "2024",
    title: "Leveling Up 🎯",
    description: "Mastered performance optimization, advanced animation systems, and AI integration. Started building projects that made people say 'wow, how did you do that?'",
    tech: ["AI/ML", "GSAP", "Framer Motion", "WebGL"],
    color: "#22d3ee",
    icon: "🎨",
    achievement: "Senior Developer",
  },
  {
    year: "Now",
    title: "What's Next? 🌌",
    description: "Exploring the frontiers of web development — 3D experiences, AI-first applications, and building tools that empower other developers to create amazing things.",
    tech: ["Three.js", "AI APIs", "WebAssembly"],
    color: "#fb923c",
    icon: "🔮",
    achievement: "The Future",
  },
];

function TimelineItem({ milestone, index }: { milestone: typeof milestones[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex items-center justify-center">
      {/* Timeline center dot */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 z-20 flex items-center justify-center rounded-full"
        style={{
          width: 48,
          height: 48,
          background: `linear-gradient(135deg, ${milestone.color}40, ${milestone.color}20)`,
          border: `2px solid ${milestone.color}`,
          boxShadow: `0 0 20px ${milestone.color}40`,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
      >
        <span className="text-xl">{milestone.icon}</span>
      </motion.div>

      {/* Year badge */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 -top-5 z-30 px-3 py-0.5 rounded-full text-xs font-black"
        style={{ background: milestone.color, color: "#000" }}
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1 }}
      >
        {milestone.year}
      </motion.div>

      {/* Card */}
      <motion.div
        className={`w-5/12 ${isLeft ? "mr-auto pr-12" : "ml-auto pl-12"}`}
        initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.div
          className="relative p-5 rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${milestone.color}25`,
          }}
          whileHover={{ scale: 1.02, borderColor: `${milestone.color}50` }}
          transition={{ duration: 0.2 }}
        >
          {/* Gradient top accent */}
          <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${milestone.color}, transparent)` }} />

          {/* Achievement badge */}
          <div
            className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-3 uppercase tracking-wider"
            style={{ background: `${milestone.color}15`, color: milestone.color }}
          >
            🏅 {milestone.achievement}
          </div>

          <h3 className="text-lg font-black text-white mb-2">{milestone.title}</h3>
          <p className="text-white/55 text-sm leading-relaxed mb-4">{milestone.description}</p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5">
            {milestone.tech.map(t => (
              <span
                key={t}
                className="px-2 py-0.5 rounded-lg text-[10px] font-medium"
                style={{ background: `${milestone.color}10`, color: milestone.color, border: `1px solid ${milestone.color}20` }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Glow on hover */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100"
            style={{ background: `radial-gradient(circle at center, ${milestone.color}08, transparent)` }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function JourneySection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="journey" ref={ref} className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0a0a1e 0%, #050510 50%, #0a0a1e 100%)" }}
    >
      {/* Background orb */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.03] blur-3xl"
          style={{ background: "radial-gradient(circle, #a855f7, transparent)" }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-xs font-semibold uppercase tracking-widest"
            style={{ background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.3)", color: "#a855f7" }}
          >
            <span>🗺️</span> My Journey
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            The Developer{" "}
            <span style={{
              background: "linear-gradient(135deg, #a855f7, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Origin Story</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Every milestone, every challenge, every breakthrough — this is how I became the developer I am today.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/5" />

          {/* Animated fill line */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-0 w-px"
            style={{
              height: lineHeight,
              background: "linear-gradient(180deg, #4ade80, #4f9eff, #a855f7, #ec4899, #22d3ee, #fb923c)",
              boxShadow: "0 0 8px rgba(79,158,255,0.5)",
            }}
          />

          {/* Milestone items */}
          <div className="space-y-16">
            {milestones.map((milestone, i) => (
              <TimelineItem key={milestone.year} milestone={milestone} index={i} />
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="inline-block px-8 py-6 rounded-3xl text-center max-w-lg"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <motion.div
              className="text-4xl mb-3"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🚀
            </motion.div>
            <p className="text-white/70 italic text-base">
              &ldquo;The best code I&apos;ve written is the code I haven&apos;t written yet.&rdquo;
            </p>
            <p className="text-white/30 text-sm mt-2">— My daily motivation</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
