"use client";
import { motion } from "framer-motion";
import { useRef } from "react";

const ease = [0.25, 0.1, 0.25, 1] as const;

const entry = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
});

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: "#6B2D45" }}
    >
      {/* Grain texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Thin rule below navbar */}
      <div className="w-full mt-16" style={{ height: "1px", background: "rgba(255,255,255,0.10)" }} />

      {/* Main three-column grid */}
      <div className="relative flex-1 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] z-20">

        {/* ── LEFT COLUMN ── */}
        <div className="flex flex-col justify-between px-8 md:px-10 lg:px-16 py-10 md:py-12 order-2 md:order-1">

          {/* Top: availability pill */}
          <motion.div {...entry(0.2)}>
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-medium tracking-widest uppercase"
              style={{
                border: "1px solid rgba(255,255,255,0.18)",
                color: "rgba(255,255,255,0.65)",
                letterSpacing: "0.16em",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#C4899A" }} />
              Available for Work
            </span>
          </motion.div>

          {/* Middle: name */}
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

            <motion.div className="flex items-center gap-6" {...entry(0.75)}>
              {[["3+", "Years Exp."], ["20+", "Projects"], ["15+", "Happy Clients"]].map(([num, label]) => (
                <div key={label}>
                  <p className="font-serif text-white text-xl font-bold leading-none">{num}</p>
                  <p className="font-sans text-white/35 text-[10px] mt-1 tracking-wide uppercase">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── CENTER: Decorative Monogram ── */}
        <motion.div
          className="relative flex items-center justify-center order-1 md:order-2 overflow-hidden"
          style={{ minWidth: "clamp(240px, 34vw, 520px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.05, ease }}
        >
          {/* Vertical border lines */}
          <div
            className="absolute top-8 left-0 bottom-0 w-px pointer-events-none hidden md:block"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />
          <div
            className="absolute top-8 right-0 bottom-0 w-px pointer-events-none hidden md:block"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />

          {/* Monogram centrepiece */}
          <div
            className="relative flex items-center justify-center"
            style={{ width: "clamp(220px, 26vw, 380px)", height: "clamp(220px, 26vw, 380px)" }}
          >
            {/* Outer slowly-rotating ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: "1px solid rgba(255,255,255,0.10)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            >
              {/* Compass tick marks */}
              {[
                { top: "0", left: "50%", w: "1px", h: "14px", tx: "-50%", ty: "0" },
                { top: "50%", right: "0", w: "14px", h: "1px", tx: "0", ty: "-50%" },
                { bottom: "0", left: "50%", w: "1px", h: "14px", tx: "-50%", ty: "0" },
                { top: "50%", left: "0", w: "14px", h: "1px", tx: "0", ty: "-50%" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    ...s,
                    background: "rgba(255,255,255,0.28)",
                    transform: `translate(${s.tx}, ${s.ty})`,
                  }}
                />
              ))}
            </motion.div>

            {/* Middle ring */}
            <div
              className="absolute rounded-full"
              style={{ inset: "13%", border: "1px solid rgba(255,255,255,0.13)" }}
            />

            {/* Inner circle */}
            <div
              className="absolute rounded-full"
              style={{
                inset: "26%",
                background: "rgba(0,0,0,0.20)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            />

            {/* Cardinal dots on outer ring */}
            {[
              { top: "-4px", left: "50%", transform: "translateX(-50%)" },
              { top: "50%", right: "-4px", transform: "translateY(-50%)" },
              { bottom: "-4px", left: "50%", transform: "translateX(-50%)" },
              { top: "50%", left: "-4px", transform: "translateY(-50%)" },
            ].map((s, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full z-10"
                style={{ ...s, background: "#C4899A", opacity: 0.75 }}
              />
            ))}

            {/* MN monogram */}
            <motion.div
              className="relative z-10 text-center select-none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.45, ease }}
            >
              <p
                className="font-serif font-black text-white leading-none"
                style={{
                  fontSize: "clamp(42px, 5.5vw, 80px)",
                  letterSpacing: "-0.02em",
                  textShadow: "0 0 60px rgba(196,137,154,0.25)",
                }}
              >
                MN
              </p>
              <div
                className="mx-auto mt-3 mb-2.5"
                style={{ width: "32px", height: "1px", background: "#C4899A" }}
              />
              <p
                className="font-sans text-white/40 uppercase"
                style={{ fontSize: "clamp(7px, 0.75vw, 10px)", letterSpacing: "0.26em" }}
              >
                Portfolio
              </p>
            </motion.div>
          </div>

          {/* Faint horizontal line through centre — decorative */}
          <div
            className="absolute left-0 right-0 h-px pointer-events-none hidden md:block"
            style={{ background: "rgba(255,255,255,0.04)", top: "50%" }}
          />
        </motion.div>

        {/* ── RIGHT COLUMN ── */}
        <div className="flex flex-col justify-between px-8 md:px-10 lg:px-16 py-10 md:py-12 order-3">

          {/* Top: year + label */}
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

          {/* Bottom: social links */}
          <motion.div className="flex flex-col gap-4" {...entry(0.7)}>
            {[
              { label: "LinkedIn", href: "https://www.linkedin.com/in/maryam-nadeem-86534b247/" },
              { label: "GitHub",   href: "https://github.com/maryumxx"                         },
              { label: "Twitter",  href: "https://x.com/MaryamNadeem01"                        },
              { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61578826023769" },
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

      {/* DEVELOPER / DESIGNER — massive decorative type */}
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
          <span style={{ color: "#fff" }}>DEVEL</span>
          <span style={{ color: "transparent", WebkitTextStroke: "2px #fff" }}>O</span>
          <span style={{ color: "#fff" }}>PER</span>
          <span style={{ color: "#fff", margin: "0 0.02em" }}>/</span>
          <span style={{ color: "transparent", WebkitTextStroke: "2px #fff" }}>DE</span>
          <span style={{ color: "#fff" }}>SIGNER</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
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
