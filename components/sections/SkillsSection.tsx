"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

/* Inline outline SVG icons — no external dependency */
const icons: Record<string, JSX.Element> = {
  html: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  css: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 2l1.5 16.5L12 21l6.5-2.5L20 2H4z"/><path d="M8 8h8l-.5 5-3.5 1-3.5-1-.25-3H16"/>
    </svg>
  ),
  javascript: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  typescript: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="8 3 4 7 8 11"/><line x1="4" y1="7" x2="20" y2="7"/>
      <path d="M16 3v4a2 2 0 0 0 2 2h4"/><path d="M14 3h7v7"/><path d="M14 21l-4-4 4-4"/>
    </svg>
  ),
  python: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.48 2 6 4.48 6 6v2h6v1H4.5C3.12 9 2 10.12 2 11.5v3C2 15.88 3.12 17 4.5 17H6v2c0 1.52.48 3 6 3s6-1.48 6-3v-2h1.5c1.38 0 2.5-1.12 2.5-2.5v-3C22 10.12 20.88 9 19.5 9H18V6c0-1.52-.48-4-6-4z"/>
      <circle cx="9.5" cy="6.5" r="1"/><circle cx="14.5" cy="17.5" r="1"/>
    </svg>
  ),
  scss: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3c-4.97 0-9 2.24-9 5 0 2.5 2.5 4.68 6 5.5-.28.5-.5 1-.5 1.5 0 1 .5 1.93 1.29 2.5C7.14 18.7 5 20.21 5 22h14c0-1.79-2.14-3.3-4.79-4.5.79-.57 1.29-1.5 1.29-2.5 0-.5-.22-1-.5-1.5 3.5-.82 6-3 6-5.5C21 5.24 16.97 3 12 3z"/>
    </svg>
  ),
  nextjs: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 19.8 22 19.8"/><line x1="12" y1="2" x2="12" y2="15"/>
    </svg>
  ),
  ionic: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
      <circle cx="12" cy="18" r="1"/><line x1="9" y1="6" x2="15" y2="6"/>
    </svg>
  ),
  figma: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/>
      <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/>
      <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
      <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/>
      <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/>
    </svg>
  ),
  responsive: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  problem: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6"/><path d="M10 22h4"/>
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>
    </svg>
  ),
  specdriven: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/>
      <line x1="9" y1="17" x2="12" y2="17"/>
    </svg>
  ),
  communication: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  adaptability: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
    </svg>
  ),
};

const skills = [
  { name: "HTML",              icon: "html",          category: "Core"       },
  { name: "CSS",               icon: "css",           category: "Core"       },
  { name: "JavaScript",        icon: "javascript",    category: "Language"   },
  { name: "TypeScript",        icon: "typescript",    category: "Language"   },
  { name: "Python",            icon: "python",        category: "Language"   },
  { name: "SCSS",              icon: "scss",          category: "Styling"    },
  { name: "Next.js",           icon: "nextjs",        category: "Framework"  },
  { name: "Ionic Angular",     icon: "ionic",         category: "Framework"  },
  { name: "Figma",             icon: "figma",         category: "Design"     },
  { name: "Responsive Design", icon: "responsive",    category: "Design"     },
  { name: "Problem-Solving",   icon: "problem",       category: "Soft Skill" },
  { name: "Spec-Driven Dev",   icon: "specdriven",    category: "Soft Skill" },
  { name: "Communication",     icon: "communication", category: "Soft Skill" },
  { name: "Adaptability",      icon: "adaptability",  category: "Soft Skill" },
];

export default function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" ref={ref} className="section-off-white py-24 md:py-36">
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">

        <motion.p
          className="section-label text-[#6B2D45] mb-4"
          style={{ opacity: 0.5 }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, ease }}
        >
          — Skills &amp; Tools —
        </motion.p>

        <motion.h2
          className="font-serif text-4xl md:text-5xl font-bold text-[#4A1E30] mb-4 leading-tight"
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1, ease }}
        >
          What I Work With
        </motion.h2>

        <motion.p
          className="font-sans text-sm md:text-[15px] text-[#4A1E30] opacity-60 max-w-xl mx-auto mb-14 md:mb-20 leading-relaxed"
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.18, ease }}
        >
          A curated toolkit I rely on to design and build elegant digital products — from initial
          wireframes to production-ready code.
        </motion.p>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4 md:gap-5">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="skill-card"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.045, ease }}
            >
              <span className="w-[22px] h-[22px] text-[#6B2D45]" style={{ opacity: 0.7 }}>
                {icons[skill.icon]}
              </span>
              <span className="font-sans text-[9px] uppercase tracking-[0.16em] text-[#6B2D45] opacity-50">
                {skill.category}
              </span>
              <span className="font-sans text-[12px] font-medium text-[#4A1E30] leading-snug">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
