"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col"
      style={{ backgroundColor: "#6B2D45" }}
    >
      {/* Thin rule under navbar */}
      <div className="w-full h-px mt-16" style={{ background: "rgba(255,255,255,0.08)" }} />

      {/* Three-column grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center relative">

        {/* LEFT: intro */}
        <div className="flex flex-col justify-center px-8 md:px-12 lg:px-20 py-14 md:py-0 z-10 order-2 md:order-1">
          <motion.p
            className="font-sans text-white/75 text-sm md:text-[15px] leading-relaxed mb-8 max-w-[260px]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
          >
            Hello, I&apos;m Maryam Nadeem, UX/UI designer
            <br className="hidden md:block" />
            and front-end developer based in Pakistan.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease }}
          >
            <button onClick={() => scrollTo("portfolio")} className="btn-outline-white self-start">
              Check My Portfolio →
            </button>
          </motion.div>
        </div>

        {/* CENTER: portrait */}
        <motion.div
          className="relative flex items-end justify-center order-1 md:order-2"
          style={{ minWidth: "clamp(260px, 36vw, 540px)" }}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
        >
          <div className="relative w-full" style={{ height: "clamp(380px, 78vh, 780px)" }}>
            <Image
              src="/images/portrait.jpg"
              alt="Maryam Nadeem — UX/UI Designer & Front-End Developer"
              fill
              priority
              className="object-cover object-top"
            />
            {/* Bottom fade into decorative text */}
            <div
              className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
              style={{ background: "linear-gradient(to top, #6B2D45 0%, transparent 100%)" }}
            />
          </div>
        </motion.div>

        {/* RIGHT: CTA */}
        <div className="flex flex-col justify-center px-8 md:px-12 lg:px-16 py-14 md:py-0 z-10 order-3">
          <motion.p
            className="font-sans text-white/75 text-sm md:text-[15px] leading-relaxed mb-8 max-w-[260px]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease }}
          >
            Feel free to send me a message if you&apos;d like to collaborate or build a website together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease }}
          >
            <button onClick={() => scrollTo("contact")} className="btn-outline-white self-start">
              Let&apos;s Chat
            </button>
          </motion.div>
        </div>
      </div>

      {/* DEVELOPER / DESIGNER decorative text */}
      <div className="relative z-10 overflow-hidden pointer-events-none select-none -mt-4">
        <motion.div
          className="flex items-baseline whitespace-nowrap px-2 md:px-4 pb-0 leading-none"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease }}
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 900,
            fontSize: "clamp(50px, 11.2vw, 162px)",
            lineHeight: 0.88,
            letterSpacing: "-0.02em",
          }}
        >
          {/* Alternating solid / outline to match the reference image */}
          <span style={{ color: "#fff" }}>DEVEL</span>
          <span style={{ color: "transparent", WebkitTextStroke: "2.5px #fff" }}>O</span>
          <span style={{ color: "#fff" }}>PER</span>
          <span style={{ color: "#fff" }}>/</span>
          <span style={{ color: "transparent", WebkitTextStroke: "2.5px #fff" }}>DE</span>
          <span style={{ color: "#fff" }}>SIGNER</span>
        </motion.div>
      </div>

      <div className="h-2 md:h-4" />
    </section>
  );
}
