"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

const ease = [0.25, 0.1, 0.25, 1] as const;

const projects = [
  {
    id: 1,
    num: "01",
    title: "Bloom",
    subtitle: "E-commerce Redesign",
    category: "UX/UI Design",
    year: "2024",
    desc: "End-to-end redesign of a fashion e-commerce platform. Focused on a minimal browsing experience, editorial product pages, and a frictionless checkout that reduced drop-off by 38%.",
    tags: ["Research", "Figma", "Prototyping", "Usability Testing"],
    img: "/images/project-1.jpg",
    size: "featured",   // 2/3 width, tall
  },
  {
    id: 2,
    num: "02",
    title: "Clarity",
    subtitle: "Analytics Dashboard",
    category: "Front-End Development",
    year: "2024",
    desc: "Real-time analytics dashboard built in Next.js and TypeScript. Clean data visualisation with accessible colour contrast and responsive layout across all breakpoints.",
    tags: ["Next.js", "TypeScript", "D3.js", "TailwindCSS"],
    img: "/images/project-2.jpg",
    size: "small",      // 1/3 width, stacks
  },
  {
    id: 3,
    num: "03",
    title: "Serif",
    subtitle: "Type Foundry",
    category: "Brand & Web Design",
    year: "2023",
    desc: "Identity and website for an independent type foundry. Typography drives every layout decision — heavy editorial grids, generous spacing, and a monochrome palette that lets the typefaces speak.",
    tags: ["Branding", "Figma", "HTML/CSS", "Editorial"],
    img: "/images/project-3.jpg",
    size: "small",      // 1/3 width, stacks
  },
  {
    id: 4,
    num: "04",
    title: "Lune",
    subtitle: "Wellness App",
    category: "UX/UI Design",
    year: "2023",
    desc: "Mobile-first wellness app focused on calm, breathable design. Conducted 12 user interviews, synthesised findings into flows, and produced 60+ screens of high-fidelity Figma prototypes.",
    tags: ["User Research", "Figma", "iOS Design", "Accessibility"],
    img: "/images/project-4.jpg",
    size: "medium",     // full width row, landscape
  },
  {
    id: 5,
    num: "05",
    title: "Archive",
    subtitle: "Portfolio Template",
    category: "Front-End Development",
    year: "2023",
    desc: "Open-source Next.js portfolio starter. Editorial rhythm, smooth Framer Motion scroll animations, and a design system built to be customised in minutes.",
    tags: ["Next.js", "Framer Motion", "TailwindCSS", "Open Source"],
    img: "/images/project-5.jpg",
    size: "medium",     // full width row, landscape
  },
  {
    id: 6,
    num: "06",
    title: "Maison",
    subtitle: "Interior Design Studio",
    category: "Web Design",
    year: "2022",
    desc: "Website for a Karachi interior design studio. Full-screen photography hero, subtle entrance animations, and a restrained colour palette that lets the work command full attention.",
    tags: ["Web Design", "Animation", "Photography", "CMS"],
    img: "/images/project-6.jpg",
    size: "featured",   // 2/3 width reversed row
  },
] as const;

/* ── Individual card ─────────────────────────────────────────── */
function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden group cursor-pointer"
      style={{ borderRadius: "4px" }}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Image area ── */}
      <div className="relative overflow-hidden" style={{ aspectRatio: project.size === "medium" ? "16/7" : "4/5" }}>
        {/* Placeholder bg */}
        <div className="absolute inset-0" style={{ background: `hsl(${340 - index * 12}, 38%, ${26 + index * 3}%)` }} />

        {/* Real image */}
        <Image
          src={project.img}
          alt={project.title}
          fill
          className="object-cover object-top transition-transform duration-700 ease-out"
          style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-6 md:p-8"
          style={{ background: "rgba(74,30,48,0)" }}
          animate={{ background: hovered ? "rgba(74,30,48,0.80)" : "rgba(74,30,48,0)" }}
          transition={{ duration: 0.35 }}
        >
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3, ease }}
              >
                <p className="font-sans text-white/60 text-[11px] uppercase tracking-[0.18em] mb-2">
                  {project.category}
                </p>
                <p className="font-sans text-white/80 text-sm leading-relaxed mb-4 max-w-sm">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-sans text-[10px] px-2.5 py-1 rounded-full text-white/70"
                      style={{ border: "1px solid rgba(255,255,255,0.2)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Number badge — always visible */}
        <div
          className="absolute top-4 left-4 font-sans text-[11px] font-semibold text-white/40"
          style={{ letterSpacing: "0.12em" }}
        >
          {project.num}
        </div>
      </div>

      {/* ── Below-image caption ── */}
      <div
        className="flex items-center justify-between pt-4 pb-1"
      >
        <div>
          <h3
            className="font-serif font-semibold text-[#4A1E30] leading-snug"
            style={{ fontSize: "clamp(15px, 1.6vw, 20px)" }}
          >
            {project.title}
            <span className="font-sans font-normal text-[#6B2D45]/50 text-sm ml-2">
              — {project.subtitle}
            </span>
          </h3>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 ml-4">
          <span className="font-sans text-[11px] text-[#6B2D45]/45 tracking-wider">{project.year}</span>
          {/* Arrow */}
          <motion.div
            className="w-7 h-7 rounded-full border border-[#6B2D45]/20 flex items-center justify-center text-[#6B2D45]/40"
            animate={{ x: hovered ? 3 : 0, borderColor: hovered ? "rgba(107,45,69,0.5)" : "rgba(107,45,69,0.2)" }}
            transition={{ duration: 0.2 }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Section ────────────────────────────────────────────────── */
export default function PortfolioSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section id="portfolio" className="section-cream py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">

        {/* ── Header ── */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-20">
          <div>
            <motion.p
              className="section-label text-[#6B2D45] mb-4"
              style={{ opacity: 0.5 }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, ease }}
            >
              — Selected Works
            </motion.p>
            <motion.h2
              className="font-serif font-bold text-[#4A1E30] leading-tight"
              style={{ fontSize: "clamp(32px, 4.5vw, 60px)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              Things I&apos;ve<br />Designed &amp; Built
            </motion.h2>
          </div>

          <motion.p
            className="font-sans text-[#4A1E30]/60 text-sm leading-relaxed max-w-xs"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease }}
          >
            A curated selection of projects spanning product design, brand identity, and front-end development.
          </motion.p>
        </div>

        {/* ── Grid — editorial asymmetric layout ── */}
        <div className="space-y-6 md:space-y-8">

          {/* Row 1: featured (2/3) + two stacked smalls (1/3) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Featured */}
            <div className="md:col-span-2">
              <ProjectCard project={projects[0]} index={0} />
            </div>
            {/* Two smalls stacked */}
            <div className="flex flex-col gap-6 md:gap-8">
              <ProjectCard project={projects[1]} index={1} />
              <ProjectCard project={projects[2]} index={2} />
            </div>
          </div>

          {/* Row 2: full-width landscape */}
          <ProjectCard project={projects[3]} index={3} />

          {/* Row 3: two smalls (1/3) + featured (2/3) — reversed */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div>
              <ProjectCard project={projects[4]} index={4} />
            </div>
            <div className="md:col-span-2">
              <ProjectCard project={projects[5]} index={5} />
            </div>
          </div>
        </div>

        {/* ── Footer CTA ── */}
        <motion.div
          className="mt-16 md:mt-20 flex items-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
        >
          <div className="h-px flex-1" style={{ background: "rgba(107,45,69,0.12)" }} />
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-dark flex-shrink-0"
          >
            View All Work &nbsp;→
          </a>
          <div className="h-px flex-1" style={{ background: "rgba(107,45,69,0.12)" }} />
        </motion.div>
      </div>
    </section>
  );
}
