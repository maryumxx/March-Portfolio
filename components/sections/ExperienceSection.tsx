"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

const experiences = [
  {
    year: "Oct 2025 – Present",
    title: "Freelance Web Designer & Developer",
    company: "Eagle's Eye Security",
    desc: "Currently working on a full-stack website design and development project. Started with logo and branding, which impressed the client enough to expand into a complete web solution. Focused on creating a clean, bold, and secure digital experience that reflects the brand's core values — trust, precision, and vigilance.",
  },
  {
    year: "Feb 2025 & Mar 2025",
    title: "UI/UX Designer",
    company: "Freelance Web Design Projects",
    desc: "Designed two complete website UIs using Figma for freelance clients. Delivered clean and responsive layouts as per client requirements, adapting quickly to real-project demands without prior tool training.",
  },
  {
    year: "Jul 2024 – Jul 2025",
    title: "Frontend Developer — Final Year Project",
    company: "Hamdard University · Farmware App",
    desc: "Contributed to the frontend design and UX/UI development of a mobile application built with Ionic Angular and TypeScript. The app helps farmers track cow health through daily questionnaires and symptom-based disease predictions. Focused on a clean, intuitive, and accessible interface that simplifies data entry for rural users.",
    stack: "Ionic Angular · TypeScript · SQL · SCSS · Python",
  },
  {
    year: "Jun 2024 – Jul 2024",
    title: "Web Developer (Frontend)",
    company: "Encryptix",
    desc: "Completed internship projects using HTML and CSS, focusing on structure, responsiveness, and clean user interfaces. Gained hands-on experience in real-world frontend implementation across multiple projects.",
  },
  {
    year: "Mar 2024 – Ongoing",
    title: "Student — Gen AI & Metaverse 3.0",
    company: "Governor's IT Initiative",
    desc: "Enrolled in the Governor of Sindh's IT initiative, focusing on Generative AI and Metaverse technologies. Building practical skills in modern development practices including spec-driven development, AI integration, and full-stack engineering.",
  },
];

const education = {
  year: "2021 – 2025",
  degree: "Bachelor of Science in Computer Science (BSCS)",
  institution: "Hamdard University",
  cgpa: "CGPA — 3.41",
};

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
              {"stack" in exp && exp.stack && (
                <p className="font-sans text-[11px] text-[#6B2D45] mt-3 tracking-wide" style={{ opacity: 0.55 }}>
                  {exp.stack}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.div
          className="mt-20 pt-12 border-t"
          style={{ borderColor: "rgba(107,45,69,0.12)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.8, ease }}
        >
          <p className="section-label text-[#6B2D45] mb-8" style={{ opacity: 0.5 }}>
            — Education
          </p>
          <div className="relative pl-6">
            <div className="absolute left-0 top-2 w-px h-full" style={{ background: "rgba(107,45,69,0.18)" }} />
            <div
              className="absolute -left-[25px] top-1.5 w-2.5 h-2.5 rounded-full"
              style={{ background: "#6B2D45" }}
            />
            <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-[#6B2D45] mb-2" style={{ opacity: 0.6 }}>
              {education.year}
            </p>
            <h3 className="font-serif text-xl md:text-2xl font-semibold text-[#4A1E30] leading-snug mb-1">
              {education.degree}
            </h3>
            <p className="font-sans text-xs text-[#6B2D45] mb-1 font-medium" style={{ opacity: 0.7 }}>
              {education.institution}
            </p>
            <p className="font-sans text-[11px] text-[#6B2D45]" style={{ opacity: 0.5 }}>
              {education.cgpa}
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
