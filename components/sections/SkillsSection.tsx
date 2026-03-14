"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2, FileCode2, Zap, Braces, FileType2,
  Layers, Triangle, Smartphone, PenTool,
  Monitor, MessageSquare, FileText, Lightbulb, RefreshCw,
} from "lucide-react";

const ease = [0.25, 0.1, 0.25, 1] as const;

const skills = [
  { name: "HTML",              Icon: Code2,        category: "Core"       },
  { name: "CSS",               Icon: FileCode2,    category: "Core"       },
  { name: "JavaScript",        Icon: Zap,          category: "Language"   },
  { name: "TypeScript",        Icon: Braces,       category: "Language"   },
  { name: "Python",            Icon: FileType2,    category: "Language"   },
  { name: "SCSS",              Icon: Layers,       category: "Styling"    },
  { name: "Next.js",           Icon: Triangle,     category: "Framework"  },
  { name: "Ionic Angular",     Icon: Smartphone,   category: "Framework"  },
  { name: "Figma",             Icon: PenTool,      category: "Design"     },
  { name: "Responsive Design", Icon: Monitor,      category: "Design"     },
  { name: "Problem-Solving",   Icon: Lightbulb,    category: "Soft Skill" },
  { name: "Spec-Driven Dev",   Icon: FileText,     category: "Soft Skill" },
  { name: "Communication",     Icon: MessageSquare,category: "Soft Skill" },
  { name: "Adaptability",      Icon: RefreshCw,    category: "Soft Skill" },
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
              <skill.Icon
                size={22}
                strokeWidth={1.4}
                className="text-[#6B2D45]"
                style={{ opacity: 0.7 }}
              />
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
