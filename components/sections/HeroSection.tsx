"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const ease = [0.25, 0.1, 0.25, 1] as const;

/* Staggered entrance helper */
const entry = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
});

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: "#6B2D45" }}
    >
      {/* ── Grain texture overlay ─────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      {/* ── Thin rule below navbar ───────────────────────────── */}
      <div className="w-full mt-16" style={{ height: "1px", background: "rgba(255,255,255,0.10)" }} />

      {/* ── Main three-column grid ────────────────────────────── */}
      <div className="relative flex-1 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] z-20">

        {/* ────── LEFT COLUMN ────── */}
        <div className="flex flex-col justify-between px-8 md:px-10 lg:px-16 py-10 md:py-12 order-2 md:order-1">

          {/* Top: role pill */}
          <motion.div {...entry(0.2)}>
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-medium tracking-widest uppercase"
              style={{
                border: "1px solid rgba(255,255,255,0.18)",
                color: "rgba(255,255,255,0.65)",
                letterSpacing: "0.16em",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#C4899A" }}
              />
              Available for Work
            </span>
          </motion.div>

          {/* Middle: large name */}
          <div className="my-auto py-10 md:py-0">
            <motion.p
              className="font-sans text-white/50 text-[13px] tracking-widest uppercase mb-3"
              style={{ letterSpacing: "0.2em" }}
              {...entry(0.3)}
            >
              Hello, I&apos;m
            </motion.p>

            <div className="overflow-hidden">
              <motion.h1
                className="font-serif font-black leading-none text-white"
                style={{
                  fontSize: "clamp(52px, 7.5vw, 112px)",
                  letterSpacing: "-0.02em",
                  lineHeight: 0.92,
                }}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.35, ease }}
              >
                Maryam
                <br />
                Nadeem
              </motion.h1>
            </div>

            <motion.p
              className="font-sans text-white/55 text-[13px] md:text-sm mt-5 leading-relaxed max-w-[230px]"
              {...entry(0.55)}
            >
              UX/UI Designer &amp; Front-End Developer<br />
              based in Pakistan.
            </motion.p>
          </div>

          {/* Bottom: CTA + stats */}
          <div>
            <motion.div className="mb-8" {...entry(0.65)}>
              <button onClick={() => scrollTo("portfolio")} className="btn-outline-white">
                Check My Portfolio &nbsp;→
              </button>
            </motion.div>

            <motion.div
              className="flex items-center gap-6"
              {...entry(0.75)}
            >
              {[["3+", "Years Exp."], ["20+", "Projects"], ["15+", "Happy Clients"]].map(([num, label]) => (
                <div key={label}>
                  <p className="font-serif text-white text-xl font-bold leading-none">{num}</p>
                  <p className="font-sans text-white/35 text-[10px] mt-1 tracking-wide uppercase">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ────── CENTER: PORTRAIT ────── */}
        <motion.div
          className="relative flex items-end justify-center order-1 md:order-2 overflow-hidden"
          style={{ minWidth: "clamp(240px, 34vw, 520px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.05, ease }}
        >
          {/* Decorative arch / oval behind portrait */}
          <div
            className="absolute inset-x-4 top-8 bottom-0 pointer-events-none"
            style={{
              borderRadius: "50% 50% 0 0 / 30% 30% 0 0",
              background: "rgba(0,0,0,0.12)",
            }}
          />

          {/* Portrait with subtle parallax */}
          <motion.div
            className="relative w-full"
            style={{
              height: "clamp(400px, 84vh, 840px)",
              y: portraitY,
            }}
          >
            <Image
              src="/images/portrait.jpg"
              alt="Maryam Nadeem"
              fill
              priority
              className="object-cover object-top"
            />
            {/* Bottom gradient fade into DEVELOPER/DESIGNER text */}
            <div
              className="absolute inset-x-0 bottom-0 h-36 pointer-events-none"
              style={{
                background: "linear-gradient(to top, #6B2D45 0%, rgba(107,45,69,0.4) 60%, transparent 100%)",
              }}
            />
          </motion.div>

          {/* Thin vertical lines framing portrait — decorative */}
          <div
            className="absolute top-8 left-0 bottom-0 w-px pointer-events-none hidden md:block"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />
          <div
            className="absolute top-8 right-0 bottom-0 w-px pointer-events-none hidden md:block"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />
        </motion.div>

        {/* ────── RIGHT COLUMN ────── */}
        <div className="flex flex-col justify-between px-8 md:px-10 lg:px-16 py-10 md:py-12 order-3">

          {/* Top: year + index */}
          <motion.div
            className="flex items-center gap-3 text-white/30 text-[11px] tracking-widest uppercase"
            style={{ letterSpacing: "0.18em" }}
            {...entry(0.25)}
          >
            <span>© 2025</span>
            <span className="w-6 h-px bg-white/20" />
            <span>Portfolio</span>
          </motion.div>

          {/* Middle: message + CTA */}
          <div className="my-auto py-10 md:py-0">
            <motion.p
              className="font-sans text-white/60 text-[13px] md:text-sm leading-[1.85] mb-8 max-w-[240px]"
              {...entry(0.4)}
            >
              Feel free to send me a message if you&apos;d like to collaborate or build a website together.
            </motion.p>

            <motion.div {...entry(0.55)}>
              <button onClick={() => scrollTo("contact")} className="btn-outline-white">
                Let&apos;s Chat
              </button>
            </motion.div>
          </div>

          {/* Bottom: vertical social links */}
          <motion.div className="flex flex-col gap-4" {...entry(0.7)}>
            {[
              { label: "LinkedIn",  href: "https://linkedin.com" },
              { label: "GitHub",    href: "https://github.com"   },
              { label: "Dribbble",  href: "https://dribbble.com" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/30 hover:text-white/70 transition-colors"
              >
                {s.label}
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── DEVELOPER / DESIGNER — massive decorative type ─── */}
      <div
        className="relative z-20 overflow-hidden pointer-events-none select-none"
        style={{ marginTop: "-4px" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease }}
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 900,
            fontSize: "clamp(48px, 10.8vw, 158px)",
            lineHeight: 0.87,
            letterSpacing: "-0.025em",
            paddingLeft: "clamp(8px, 1.5vw, 20px)",
            paddingBottom: "clamp(6px, 1vw, 14px)",
          }}
        >
          {/* Mixed solid / outline treatment matching the reference */}
          <span style={{ color: "#fff" }}>DEVEL</span>
          <span style={{ color: "transparent", WebkitTextStroke: "2px #fff" }}>O</span>
          <span style={{ color: "#fff" }}>PER</span>
          <span style={{ color: "#fff", margin: "0 0.02em" }}>/</span>
          <span style={{ color: "transparent", WebkitTextStroke: "2px #fff" }}>DE</span>
          <span style={{ color: "#fff" }}>SIGNER</span>
        </motion.div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────── */}
      <motion.button
        onClick={() => scrollTo("about")}
        className="absolute bottom-6 right-8 md:right-12 z-30 flex flex-col items-center gap-2 group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        aria-label="Scroll down"
      >
        <span
          className="font-sans text-[9px] tracking-[0.22em] uppercase text-white/30 group-hover:text-white/60 transition-colors"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
        <motion.div
          className="w-px bg-white/20 group-hover:bg-white/40 transition-colors"
          style={{ height: 40 }}
          animate={{ scaleY: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.button>
    </section>
  );
}
