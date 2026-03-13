"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

const skills = [
  { name: "HTML5",        icon: "🌐", category: "Core"      },
  { name: "CSS3",         icon: "🎨", category: "Core"      },
  { name: "JavaScript",   icon: "⚡", category: "Language"  },
  { name: "TypeScript",   icon: "📘", category: "Language"  },
  { name: "React",        icon: "⚛️", category: "Framework" },
  { name: "Next.js",      icon: "▲",  category: "Framework" },
  { name: "Tailwind CSS", icon: "🌊", category: "Styling"   },
  { name: "Figma",        icon: "🖌️", category: "Design"    },
  { name: "UX Research",  icon: "🔍", category: "Design"    },
  { name: "Node.js",      icon: "🟢", category: "Back-End"  },
  { name: "Git",          icon: "📦", category: "Tools"     },
  { name: "Framer",       icon: "🎬", category: "Motion"    },
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

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-5">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="skill-card"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.045, ease }}
            >
              <span className="text-2xl leading-none" role="img" aria-hidden="true">{skill.icon}</span>
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
