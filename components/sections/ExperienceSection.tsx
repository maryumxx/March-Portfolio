"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

const experiences = [
  {
    year: "2024 — Present",
    title: "Senior UX/UI Designer & Front-End Developer",
    company: "Freelance / Remote",
    desc: "Working directly with clients across Europe and the Middle East to design and build high-quality web products. Responsible for end-to-end delivery — from research and wireframing to final implementation in Next.js.",
  },
  {
    year: "2022 — 2024",
    title: "UI Designer & React Developer",
    company: "Techverse Studio, Karachi",
    desc: "Led the design and front-end development of client projects spanning e-commerce, SaaS dashboards, and brand websites. Established a component library in Figma and React used across the team.",
  },
  {
    year: "2021 — 2022",
    title: "Junior Front-End Developer",
    company: "Digital Spark Agency",
    desc: "Developed responsive web interfaces with HTML, CSS, JavaScript and React. Collaborated closely with senior designers to translate Figma mockups into pixel-perfect, accessible code.",
  },
  {
    year: "2020 — 2021",
    title: "UX/UI Design Internship",
    company: "Pixelcraft Labs",
    desc: "Created user flows, wireframes, and high-fidelity prototypes for mobile and web applications. Conducted usability tests and iterated on designs based on feedback.",
  },
];

export default function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" ref={ref} className="section-cream py-24 md:py-36">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20">

        <motion.p
          className="section-label text-[#6B2D45] mb-12"
          style={{ opacity: 0.5 }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, ease }}
        >
          — Experience
        </motion.p>

        <motion.h2
          className="font-serif text-4xl md:text-5xl font-bold text-[#4A1E30] mb-16 leading-tight"
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1, ease }}
        >
          My Professional Journey
        </motion.h2>

        {/* Timeline */}
        <div className="relative pl-6">
          <div className="absolute left-0 top-2 bottom-2 w-px" style={{ background: "rgba(107,45,69,0.18)" }} />

          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              className="relative pb-10 last:pb-0"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease }}
            >
              {/* Dot */}
              <div
                className="absolute -left-[25px] top-1.5 w-2.5 h-2.5 rounded-full"
                style={{ background: "#6B2D45" }}
              />

              <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-[#6B2D45] mb-2" style={{ opacity: 0.6 }}>
                {exp.year}
              </p>
              <h3 className="font-serif text-xl md:text-2xl font-semibold text-[#4A1E30] leading-snug mb-1">
                {exp.title}
              </h3>
              <p className="font-sans text-xs text-[#6B2D45] mb-3 font-medium" style={{ opacity: 0.7 }}>
                {exp.company}
              </p>
              <p className="font-sans text-sm text-[#4A1E30] leading-relaxed" style={{ opacity: 0.65 }}>
                {exp.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
