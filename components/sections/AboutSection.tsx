"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const anim = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    transition: { duration: 0.7, delay, ease },
  });

  return (
    <section id="about" ref={ref} className="section-cream py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">

        <motion.p className="section-label mb-12 text-[#4A1E30]" style={{ opacity: 0.5 }} {...anim(0)}>
          — About Me
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Left: image */}
          <motion.div className="relative" {...anim(0.15)}>
            <div className="relative overflow-hidden" style={{ aspectRatio: "4/5", borderRadius: "4px" }}>
              <Image src="/images/about.jpg" alt="Maryam Nadeem" fill className="object-cover object-top" />
              <div className="absolute top-0 left-0 w-16 h-16"
                style={{ borderTop: "3px solid #6B2D45", borderLeft: "3px solid #6B2D45" }} />
              <div className="absolute bottom-0 right-0 w-16 h-16"
                style={{ borderBottom: "3px solid #6B2D45", borderRight: "3px solid #6B2D45" }} />
            </div>

            <motion.div
              className="absolute -bottom-6 -right-4 md:-right-8 text-white px-6 py-4 shadow-xl"
              style={{ background: "#6B2D45", borderRadius: "2px" }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.5, duration: 0.5, ease }}
            >
              <p className="font-serif text-3xl font-bold leading-none">3+</p>
              <p className="font-sans text-xs mt-1 text-white/70 tracking-wider uppercase">Years of Experience</p>
            </motion.div>
          </motion.div>

          {/* Right: text */}
          <div className="flex flex-col gap-6 md:pt-8">
            <motion.h2
              className="font-serif text-4xl md:text-5xl font-bold leading-tight text-[#4A1E30]"
              {...anim(0.2)}
            >
              Crafting Digital Experiences With Purpose
            </motion.h2>

            <motion.div className="w-10 h-px bg-[#6B2D45] opacity-40" {...anim(0.28)} />

            <motion.p className="font-sans text-sm md:text-[15px] text-[#4A1E30] leading-relaxed opacity-75" {...anim(0.34)}>
I'm Maryam Nadeem, a Computer Science student passionate about building AI-powered automation systems, full-stack web applications, and intuitive digital experiences. I work with technologies such as Python, TypeScript, Next.js, Angular, and Ionic, combining development with user-focused design to create practical solutions for real-world problems.
</motion.p>

<motion.p className="font-sans text-sm md:text-[15px] text-[#4A1E30] leading-relaxed opacity-65" {...anim(0.4)}>
My experience spans frontend development, UI/UX design, and AI-integrated projects, with a growing focus on agentic AI and workflow automation. Alongside development, I am actively building my skills in Software Quality Assurance (SQA), including manual testing, test case design, and software testing fundamentals to better understand and improve software quality.
</motion.p>

<motion.p className="font-sans text-sm md:text-[15px] text-[#4A1E30] leading-relaxed opacity-65" {...anim(0.46)}>
I enjoy continuous learning and exploring new technologies that bridge automation, design, and user experience. My goal is to build reliable, scalable, and impactful solutions that make technology more efficient and accessible for businesses and users alike.
</motion.p>


            <motion.div className="flex gap-4 flex-wrap pt-2" {...anim(0.52)}>
              <a href="#portfolio" className="btn-outline-dark">View Portfolio</a>
              <a href="#contact"   className="btn-filled">Get in Touch</a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
