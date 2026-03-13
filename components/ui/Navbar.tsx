"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      // Determine active section
      const sections = navLinks.map(l => l.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.getElementById(href.replace("#", ""));
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[100] px-6 py-4 transition-all duration-300"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <div
        className="max-w-6xl mx-auto flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(10, 10, 26, 0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          border: scrolled ? "1px solid rgba(255,255,255,0.1)" : "none",
          boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.3)" : "none",
        }}
      >
        {/* Logo */}
        <motion.button
          className="text-xl font-black"
          onClick={() => scrollTo("#hero")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: "linear-gradient(135deg, #4f9eff, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {"<Maryam />"}
        </motion.button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <motion.button
                onClick={() => scrollTo(link.href)}
                className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors rounded-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeSection === link.href.replace("#", "") && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: "linear-gradient(135deg, rgba(79,158,255,0.2), rgba(168,85,247,0.2))",
                      border: "1px solid rgba(79,158,255,0.3)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </motion.button>
            </li>
          ))}
        </ul>

        {/* CTA button */}
        <motion.button
          className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
          style={{
            background: "linear-gradient(135deg, #4f9eff, #a855f7)",
            boxShadow: "0 0 20px rgba(79,158,255,0.3)",
          }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(79,158,255,0.5)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollTo("#contact")}
        >
          <span>Let&apos;s Talk</span>
          <span>✨</span>
        </motion.button>

        {/* Mobile hamburger */}
        <motion.button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="h-0.5 bg-white rounded-full"
              animate={{
                width: mobileOpen && i === 1 ? "0px" : "24px",
                rotate: mobileOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                y: mobileOpen ? (i === 0 ? 6 : i === 2 ? -6 : 0) : 0,
              }}
            />
          ))}
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden mt-2 mx-0 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(10, 10, 26, 0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="p-4 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-left px-4 py-3 rounded-xl text-white/70 hover:text-white transition-colors"
                  style={{
                    background: activeSection === link.href.replace("#", "") ? "rgba(79,158,255,0.1)" : "transparent",
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ x: 5 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
