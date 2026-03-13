"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import RobotCharacter from "@/components/characters/RobotCharacter";
import DevCharacter from "@/components/characters/DevCharacter";

const socialLinks = [
  { name: "GitHub", icon: "⚡", url: "https://github.com", color: "#ffffff", description: "Check my code" },
  { name: "LinkedIn", icon: "💼", url: "https://linkedin.com", color: "#0077b5", description: "Connect professionally" },
  { name: "Twitter", icon: "🐦", url: "https://twitter.com", color: "#1da1f2", description: "Follow my thoughts" },
  { name: "Email", icon: "📧", url: "mailto:hello@maryam.dev", color: "#ec4899", description: "Send a message" },
];

function SocialCard({ link, index }: { link: typeof socialLinks[0]; index: number }) {
  return (
    <motion.a
      href={link.url}
      className="flex items-center gap-4 p-4 rounded-2xl group"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{
        scale: 1.03,
        borderColor: `${link.color}40`,
        background: `${link.color}08`,
      }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
        style={{ background: `${link.color}15`, border: `1px solid ${link.color}30` }}
        whileHover={{ scale: 1.2, rotate: 10 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        {link.icon}
      </motion.div>
      <div>
        <div className="text-white font-semibold text-sm">{link.name}</div>
        <div className="text-white/40 text-xs">{link.description}</div>
      </div>
      <motion.div
        className="ml-auto text-white/30 group-hover:text-white/70"
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        →
      </motion.div>
    </motion.a>
  );
}

type FormStatus = "idle" | "sending" | "sent" | "error";

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise(r => setTimeout(r, 2000));
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setStatus("idle"), 3000);
  };

  const inputClass = (field: string) => `
    w-full px-4 py-3.5 rounded-xl text-white text-sm outline-none transition-all duration-300
    placeholder:text-white/25
  `;

  const inputStyle = (field: string) => ({
    background: focused === field ? "rgba(79,158,255,0.08)" : "rgba(255,255,255,0.04)",
    border: `1px solid ${focused === field ? "rgba(79,158,255,0.4)" : "rgba(255,255,255,0.08)"}`,
    boxShadow: focused === field ? "0 0 0 4px rgba(79,158,255,0.08)" : "none",
  });

  return (
    <section id="contact" ref={ref} className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #050510 0%, #0a0a1e 100%)" }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.06] blur-3xl"
          style={{ background: "radial-gradient(circle, #ec4899, transparent)" }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-[0.06] blur-3xl"
          style={{ background: "radial-gradient(circle, #4f9eff, transparent)" }}
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-xs font-semibold uppercase tracking-widest"
            style={{ background: "rgba(236,72,153,0.1)", border: "1px solid rgba(236,72,153,0.3)", color: "#ec4899" }}
          >
            <span>💬</span> Get in Touch
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Let&apos;s Build{" "}
            <span style={{
              background: "linear-gradient(135deg, #ec4899, #fb923c)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Together</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Have a project in mind? Want to collaborate? Or just want to say hi? I&apos;d love to hear from you!
          </p>
        </motion.div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <div
              className="relative p-8 rounded-3xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Gradient top accent */}
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl"
                style={{ background: "linear-gradient(90deg, #ec4899, #fb923c, #4f9eff)" }} />

              <AnimatePresence mode="wait">
                {status === "sent" ? (
                  <motion.div
                    className="flex flex-col items-center justify-center py-12 text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <motion.div
                      className="text-6xl mb-4"
                      animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.3, 1] }}
                      transition={{ duration: 0.6 }}
                    >
                      🎉
                    </motion.div>
                    <h3 className="text-xl font-black text-white mb-2">Message Sent!</h3>
                    <p className="text-white/50 text-sm">I&apos;ll get back to you as soon as possible. Can&apos;t wait to chat!</p>
                    <div className="mt-6">
                      <RobotCharacter size={70} variant="cyan" />
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div>
                      <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                        Your Name ✨
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        className={inputClass("name")}
                        style={inputStyle("name")}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                        Email Address 📧
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="hello@example.com"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        className={inputClass("email")}
                        style={inputStyle("email")}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                        Your Message 💬
                      </label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Tell me about your project, idea, or just say hey..."
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        onFocus={() => setFocused("message")}
                        onBlur={() => setFocused(null)}
                        className={`${inputClass("message")} resize-none`}
                        style={inputStyle("message")}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      className="w-full py-4 rounded-xl text-white font-bold text-base relative overflow-hidden"
                      style={{
                        background: "linear-gradient(135deg, #ec4899 0%, #fb923c 100%)",
                        boxShadow: "0 0 30px rgba(236,72,153,0.3)",
                      }}
                      whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(236,72,153,0.5)" }}
                      whileTap={{ scale: 0.98 }}
                      disabled={status === "sending"}
                    >
                      {status === "sending" ? (
                        <motion.div
                          className="flex items-center justify-center gap-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <motion.div
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                          />
                          <span>Sending...</span>
                        </motion.div>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <span>Send Message</span>
                          <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            🚀
                          </motion.span>
                        </span>
                      )}

                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                          transform: "skewX(-20deg)",
                        }}
                        animate={{ x: ["-200%", "200%"] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                      />
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right: Info + Characters */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            {/* Characters delivering message */}
            <div className="flex items-end gap-4 mb-4">
              <DevCharacter variant="pink" size={80} />
              <motion.div
                className="flex-1 p-4 rounded-2xl"
                style={{
                  background: "rgba(236,72,153,0.1)",
                  border: "1px solid rgba(236,72,153,0.2)",
                }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <p className="text-white/70 text-sm">
                  &ldquo;I&apos;m always open to exciting new projects and collaborations. Don&apos;t be shy — reach out! 💌&rdquo;
                </p>
                <p className="text-ec4899 text-xs mt-1" style={{ color: "#ec4899" }}>— Maryam</p>
              </motion.div>
            </div>

            {/* Social links */}
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Find me on</p>
              <div className="space-y-2.5">
                {socialLinks.map((link, i) => (
                  <SocialCard key={link.name} link={link} index={i} />
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <motion.div
              className="flex items-center gap-3 p-4 rounded-2xl"
              style={{
                background: "rgba(74,222,128,0.08)",
                border: "1px solid rgba(74,222,128,0.2)",
              }}
              animate={{ scale: [1, 1.01, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.div
                className="w-3 h-3 rounded-full bg-green-400 flex-shrink-0"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <div>
                <p className="text-white font-semibold text-sm">Available for Freelance</p>
                <p className="text-white/40 text-xs">Response time: usually within 24 hours</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        className="mt-24 text-center pb-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <div className="w-px h-12 mx-auto mb-6" style={{ background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.1))" }} />
        <p className="text-white/20 text-sm">
          Designed & Built with 💜 by{" "}
          <span style={{ color: "#a855f7" }}>Maryam</span>
          {" "}— 2025
        </p>
        <p className="text-white/10 text-xs mt-1">
          Built with Next.js, TypeScript, Tailwind CSS & Framer Motion
        </p>
      </motion.div>
    </section>
  );
}
