"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const ease = [0.25, 0.1, 0.25, 1] as const;

const projects = [
  {
    id: 1, title: "Bloom — E-commerce Redesign",     category: "UX/UI Design",          year: "2024",
    desc: "End-to-end redesign of a fashion e-commerce platform, focusing on a minimal product browsing experience and frictionless checkout flow.",
    img: "/images/project-1.jpg", tall: true,
  },
  {
    id: 2, title: "Clarity Dashboard",                category: "Front-End Development",  year: "2024",
    desc: "A data analytics dashboard built with Next.js and TypeScript, featuring real-time charts and a clean, accessible interface.",
    img: "/images/project-2.jpg", tall: false,
  },
  {
    id: 3, title: "Serif — Type Foundry",             category: "Brand & Web Design",     year: "2023",
    desc: "Identity and website design for an independent type foundry. Heavy editorial layout with typography as the visual hero.",
    img: "/images/project-3.jpg", tall: false,
  },
  {
    id: 4, title: "Lune — Wellness App",              category: "UX/UI Design",          year: "2023",
    desc: "Mobile-first wellness app UI focused on calm, breathable design. Research-led user flows and high-fidelity Figma prototypes.",
    img: "/images/project-4.jpg", tall: true,
  },
  {
    id: 5, title: "Archive — Portfolio Template",     category: "Front-End Development",  year: "2023",
    desc: "Open-source Next.js portfolio template with a focus on editorial rhythm, generous spacing, and smooth scroll animations.",
    img: "/images/project-5.jpg", tall: false,
  },
  {
    id: 6, title: "Maison — Interior Studio",         category: "Web Design",             year: "2022",
    desc: "Website for a Karachi-based interior design studio. Full-screen photography, elegant transitions, and subtle animations.",
    img: "/images/project-6.jpg", tall: false,
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="portfolio-card"
      style={{ aspectRatio: project.tall ? "3/4" : "4/3" }}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.65, delay: (index % 3) * 0.1, ease }}
    >
      <div className="w-full h-full relative" style={{ background: "#5C2539" }}>
        <Image
          src={project.img}
          alt={project.title}
          fill
          className="card-img"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-serif italic text-white/20 text-sm">{project.category}</span>
        </div>
      </div>

      <div className="card-overlay">
        <p className="section-label text-white/55 mb-3">{project.category} · {project.year}</p>
        <h3 className="font-serif text-white text-xl md:text-2xl font-semibold leading-snug mb-3">
          {project.title}
        </h3>
        <p className="font-sans text-white/65 text-xs md:text-sm leading-relaxed">{project.desc}</p>
      </div>
    </motion.div>
  );
}

export default function PortfolioSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section id="portfolio" className="py-24 md:py-36" style={{ backgroundColor: "#6B2D45" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">

        <div ref={headerRef} className="text-center mb-14 md:mb-20">
          <motion.p
            className="section-label text-white/55 mb-4"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, ease }}
          >
            — Portfolio —
          </motion.p>
          <motion.h2
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            Let&apos;s Take a Look at<br className="hidden md:block" /> My Portfolio!
          </motion.h2>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6">
          {projects.map((project, i) => (
            <div key={project.id} className="break-inside-avoid mb-4 md:mb-6">
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
