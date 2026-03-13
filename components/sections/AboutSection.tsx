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
              I&apos;m Maryam Nadeem — a UX/UI Designer and Front-End Developer with a passion for creating
              elegant, user-centred digital products. Based in Pakistan, I blend thoughtful design with
              clean, performant code to build experiences that feel both beautiful and effortless.
            </motion.p>

            <motion.p className="font-sans text-sm md:text-[15px] text-[#4A1E30] leading-relaxed opacity-65" {...anim(0.4)}>
              My design philosophy centres on simplicity and intentionality. I believe every element on
              a screen should serve a purpose — that great design is invisible, quietly guiding users
              towards their goals without friction or confusion.
            </motion.p>

            <motion.p className="font-sans text-sm md:text-[15px] text-[#4A1E30] leading-relaxed opacity-65" {...anim(0.46)}>
              When I&apos;m not designing or coding, I&apos;m exploring typography, studying editorial
              layouts, or finding inspiration in the quiet details of everyday life.
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
