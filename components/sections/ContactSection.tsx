"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

const socials = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "GitHub",   href: "https://github.com"   },
  { label: "Dribbble", href: "https://dribbble.com" },
  { label: "Twitter",  href: "https://twitter.com"  },
];

type Status = "idle" | "sending" | "sent";

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise(r => setTimeout(r, 1600));
    setStatus("sent");
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setStatus("idle"), 4000);
  };

  const anim = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 0.65, delay, ease },
  });

  return (
    <section id="contact" ref={ref} className="section-off-white py-24 md:py-36">
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">

        <motion.p className="section-label text-[#6B2D45] mb-4" style={{ opacity: 0.5 }} {...anim(0)}>
          — Contact —
        </motion.p>

        <motion.h2 className="font-serif text-4xl md:text-5xl font-bold text-[#4A1E30] mb-4 leading-tight" {...anim(0.1)}>
          Let&apos;s Work Together
        </motion.h2>

        <motion.p
          className="font-sans text-sm md:text-[15px] text-[#4A1E30] opacity-60 max-w-lg mx-auto mb-10 leading-relaxed"
          {...anim(0.18)}
        >
          Have a project in mind, or simply want to say hello? I&apos;m always open to thoughtful
          collaborations and new opportunities.
        </motion.p>

        {/* Email pill */}
        <motion.a
          href="mailto:hello@maryamnadeem.com"
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full border text-sm font-medium transition-colors mb-14"
          style={{ borderColor: "rgba(107,45,69,0.28)", color: "#6B2D45" }}
          {...anim(0.24)}
          whileHover={{ backgroundColor: "#6B2D45", color: "#fff", borderColor: "#6B2D45" }}
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M1 3.5L7.5 9 14 3.5M1 3.5h13v9H1V3.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          hello@maryamnadeem.com
        </motion.a>

        {/* Form */}
        <motion.div {...anim(0.3)}>
          <AnimatePresence mode="wait">
            {status === "sent" ? (
              <motion.div
                key="success"
                className="py-16 flex flex-col items-center gap-3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease }}
              >
                <span className="text-3xl">✉️</span>
                <h3 className="font-serif text-2xl font-bold text-[#4A1E30]">Message Sent</h3>
                <p className="font-sans text-sm text-[#4A1E30] opacity-60">Thank you — I&apos;ll be in touch shortly.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="text-left space-y-8"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ ease }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {(["name", "email"] as const).map((field) => (
                    <div key={field}>
                      <label className="block font-sans text-[10px] uppercase tracking-widest text-[#6B2D45] opacity-60 mb-2">
                        {field === "name" ? "Full Name" : "Email Address"}
                      </label>
                      <input
                        type={field === "email" ? "email" : "text"}
                        required
                        placeholder={field === "name" ? "Maryam Nadeem" : "hello@example.com"}
                        value={form[field]}
                        onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                        className="form-input"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-widest text-[#6B2D45] opacity-60 mb-2">Subject</label>
                  <input
                    type="text" required placeholder="Project enquiry, collaboration…"
                    value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-widest text-[#6B2D45] opacity-60 mb-2">Message</label>
                  <textarea
                    required rows={5} placeholder="Tell me about your project or idea…"
                    value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="form-input resize-none"
                  />
                </div>

                <div className="flex justify-center pt-2">
                  <button type="submit" className="btn-filled px-12" disabled={status === "sending"}>
                    {status === "sending" ? (
                      <span className="flex items-center gap-2">
                        <motion.span
                          className="inline-block w-3 h-3 border border-white/40 border-t-white rounded-full"
                          animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        />
                        Sending…
                      </span>
                    ) : "Send Message"}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Socials */}
        <motion.div
          className="flex items-center justify-center gap-6 mt-16 pt-10 border-t border-[#6B2D45]/15"
          {...anim(0.4)}
        >
          {socials.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank" rel="noopener noreferrer"
              className="font-sans text-[11px] uppercase tracking-widest text-[#6B2D45] transition-opacity"
              style={{ opacity: 0.45 }}
              whileHover={{ opacity: 1 }}
            >
              {s.label}
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20 pt-8 border-t border-[#6B2D45]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-sans text-[11px] text-[#6B2D45] opacity-40 tracking-wider">
          © 2025 Maryam Nadeem. All rights reserved.
        </p>
        <p className="font-sans text-[11px] text-[#6B2D45] opacity-40 tracking-wider">
          Designed &amp; Built with care in Pakistan
        </p>
      </div>
    </section>
  );
}
