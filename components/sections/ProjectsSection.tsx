"use client";
import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useInView } from "framer-motion";
import RobotCharacter from "@/components/characters/RobotCharacter";
import PeekingCharacter from "@/components/characters/PeekingCharacter";

const projects = [
  {
    id: 1,
    name: "NebulaChat",
    description: "A real-time messaging platform with AI-powered responses, end-to-end encryption, and beautiful animations that make chatting feel magical.",
    longDesc: "Built with WebSockets for real-time communication, AI integration for smart replies, and a stunning UI that redefines messaging apps.",
    tech: ["Next.js", "Socket.io", "OpenAI", "PostgreSQL", "Redis"],
    gradient: "linear-gradient(135deg, #4f9eff 0%, #a855f7 100%)",
    accent: "#4f9eff",
    emoji: "💬",
    github: "#",
    live: "#",
    featured: true,
  },
  {
    id: 2,
    name: "CodeCanvas",
    description: "A collaborative code editor with live sharing, syntax highlighting for 50+ languages, and real-time cursor tracking across teams.",
    longDesc: "Like Figma but for code — live collaboration, version history, and AI-assisted code review baked right in.",
    tech: ["React", "Monaco Editor", "WebRTC", "Node.js", "MongoDB"],
    gradient: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
    accent: "#a855f7",
    emoji: "🎨",
    github: "#",
    live: "#",
    featured: true,
  },
  {
    id: 3,
    name: "AuraDash",
    description: "A gorgeous analytics dashboard with animated charts, real-time data streaming, and customizable widgets — making data beautiful.",
    longDesc: "Data visualization reimagined. Smooth animations, drag-and-drop widgets, and real-time updates create an analytics experience people actually enjoy.",
    tech: ["Next.js", "D3.js", "Recharts", "Prisma", "TailwindCSS"],
    gradient: "linear-gradient(135deg, #22d3ee 0%, #4f9eff 100%)",
    accent: "#22d3ee",
    emoji: "📊",
    github: "#",
    live: "#",
    featured: false,
  },
  {
    id: 4,
    name: "EcoMarket",
    description: "A sustainable e-commerce platform with carbon footprint tracking, eco-score ratings, and a gamified sustainability system.",
    longDesc: "Shopping with conscience. Every purchase shows its environmental impact, and users earn rewards for making eco-friendly choices.",
    tech: ["Next.js", "Stripe", "Sanity CMS", "Framer Motion", "TypeScript"],
    gradient: "linear-gradient(135deg, #4ade80 0%, #22d3ee 100%)",
    accent: "#4ade80",
    emoji: "🌿",
    github: "#",
    live: "#",
    featured: false,
  },
  {
    id: 5,
    name: "PixelForge",
    description: "An AI-powered design tool that generates UI components, color palettes, and layout suggestions from simple text descriptions.",
    longDesc: "Describe your vision, get production-ready React components. AI meets design — instantly.",
    tech: ["React", "OpenAI GPT-4", "Stable Diffusion", "FastAPI", "Docker"],
    gradient: "linear-gradient(135deg, #fb923c 0%, #ec4899 100%)",
    accent: "#fb923c",
    emoji: "🤖",
    github: "#",
    live: "#",
    featured: true,
  },
  {
    id: 6,
    name: "PulseHealth",
    description: "A health tracking web app with wearable device integration, personalized AI insights, and beautiful data visualizations.",
    longDesc: "Your health data, beautifully presented. AI-powered recommendations, trend analysis, and goals that actually motivate.",
    tech: ["React Native Web", "GraphQL", "Node.js", "ML Kit", "Firebase"],
    gradient: "linear-gradient(135deg, #ec4899 0%, #fb923c 100%)",
    accent: "#ec4899",
    emoji: "❤️",
    github: "#",
    live: "#",
    featured: false,
  },
];

function TiltCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-100, 100], [8, -8]);
  const rotateY = useTransform(mouseX, [-100, 100], [-8, 8]);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6, type: "spring", stiffness: 200 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative rounded-3xl overflow-hidden h-full"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
        animate={{
          borderColor: isHovered ? `${project.accent}50` : "rgba(255,255,255,0.08)",
          boxShadow: isHovered
            ? `0 20px 60px ${project.accent}30, 0 0 0 1px ${project.accent}20`
            : "0 4px 20px rgba(0,0,0,0.3)",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Gradient top bar */}
        <div
          className="h-1.5 w-full"
          style={{ background: project.gradient }}
        />

        {/* Card content */}
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <motion.div
                className="text-3xl mb-3"
                animate={isHovered ? { scale: 1.2, rotate: [0, -10, 10, 0] } : { scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                {project.emoji}
              </motion.div>
              <h3 className="text-lg font-black text-white mb-1">{project.name}</h3>
              {project.featured && (
                <span
                  className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest"
                  style={{ background: `${project.accent}20`, color: project.accent }}
                >
                  Featured
                </span>
              )}
            </div>

            {/* Peeking character on hover */}
            <motion.div
              animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <RobotCharacter size={45} variant={index % 3 === 0 ? "blue" : index % 3 === 1 ? "purple" : "cyan"} />
            </motion.div>
          </div>

          {/* Description */}
          <p className="text-white/55 text-sm leading-relaxed mb-4">
            {isHovered ? project.longDesc : project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-lg text-[11px] font-medium"
                style={{ background: `${project.accent}15`, color: project.accent, border: `1px solid ${project.accent}25` }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <motion.a
              href={project.github}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white/70"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              whileHover={{ scale: 1.03, background: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.97 }}
            >
              <span>⚡</span> Code
            </motion.a>
            <motion.a
              href={project.live}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white"
              style={{ background: project.gradient }}
              whileHover={{ scale: 1.03, opacity: 0.9 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>🚀</span> Live
            </motion.a>
          </div>
        </div>

        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-3xl"
          style={{ background: `radial-gradient(circle at center, ${project.accent}08 0%, transparent 70%)` }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" ref={ref} className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0a0a1e 0%, #050510 50%, #0a0a1e 100%)" }}
    >
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-5 blur-3xl"
          style={{ background: "radial-gradient(circle, #4f9eff, transparent)" }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-5 blur-3xl"
          style={{ background: "radial-gradient(circle, #ec4899, transparent)" }}
          animate={{ scale: [1.3, 1, 1.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-xs font-semibold uppercase tracking-widest"
            style={{ background: "rgba(79,158,255,0.1)", border: "1px solid rgba(79,158,255,0.3)", color: "#4f9eff" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
          >
            <span>🚀</span> My Projects
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Things I&apos;ve{" "}
            <span style={{
              background: "linear-gradient(135deg, #4f9eff, #22d3ee)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Built</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            A collection of projects where ideas meet execution. Each one taught me something new.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {/* Peeking character */}
          <div className="absolute -right-4 top-1/2 hidden xl:block">
            <PeekingCharacter side="right" color="#a855f7" size={55} />
          </div>

          {projects.map((project, i) => (
            <TiltCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* View all button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.a
            href="https://github.com"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-bold"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
            whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.95 }}
          >
            <span>⚡</span>
            <span>View All on GitHub</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >→</motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
