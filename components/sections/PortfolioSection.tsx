"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

const ease = [0.25, 0.1, 0.25, 1] as const;

type Category = "All" | "UI/UX Design" | "Development";

type Project = {
  id: number;
  num: string;
  title: string;
  subtitle: string;
  category: "UI/UX Design" | "Development";
  projectType: string;
  year: string;
  desc: string;
  tags: string[];
  img: string;
  link: string | null;
  size: "featured" | "small" | "medium" | "grid";
};

/* ── All 16 real projects ─────────────────────────────────── */
const allProjects: Project[] = [
  /* ── Featured 6 — editorial layout ── */
  {
    id: 1,  num: "01",
    title: "Comforty",       subtitle: "e-Commerce Website",
    category: "UI/UX Design", projectType: "Homework Project",  year: "2024",
    desc: "End-to-end UI/UX design and development of a modern furniture e-commerce platform. Focused on clean browsing, editorial product pages, and a frictionless checkout flow.",
    tags: ["UI/UX Design", "Figma", "e-Commerce", "Next.js"],
    img: "/images/project-1.jpg",
    link: "https://mxryxms-capstone-project.vercel.app/",
    size: "featured",
  },
  {
    id: 15, num: "15",
    title: "Farmware",        subtitle: "Health Checker for Cows",
    category: "UI/UX Design", projectType: "Final Year Project", year: "2024",
    desc: "Mobile app designed to help farmers monitor livestock health in real time — intuitive dashboards, alert flows, and a visual system built for low-literacy users.",
    tags: ["UI/UX Design", "Figma", "Health Tech", "Mobile"],
    img: "/images/project-2.jpg",
    link: null,
    size: "small",
  },
  {
    id: 13, num: "13",
    title: "Software Agency",  subtitle: "Service Provider Website",
    category: "UI/UX Design", projectType: "Freelance Project",  year: "2024",
    desc: "Full Figma design for a software agency — professional hero, service sections, and a conversion-focused layout that communicates technical credibility.",
    tags: ["UI/UX Design", "Figma", "Agency", "B2B"],
    img: "/images/project-3.jpg",
    link: "https://www.figma.com/design/kDwlCYeR6LZREyCwoyIRqG/Software-Agency",
    size: "small",
  },
  {
    id: 5,  num: "05",
    title: "Exclusive",        subtitle: "e-Commerce Website",
    category: "Development",   projectType: "Homework Project",  year: "2024",
    desc: "Next.js e-commerce site with Tailwind CSS — product listings, cart logic, and a polished checkout. Fully responsive across all breakpoints.",
    tags: ["Next.js", "Tailwind CSS", "e-Commerce", "TypeScript"],
    img: "/images/project-4.jpg",
    link: "https://mxryxms-nextjs-ecommerce.vercel.app/",
    size: "medium",
  },
  {
    id: 6,  num: "06",
    title: "Travio",            subtitle: "Travel Website",
    category: "Development",   projectType: "Internship Project", year: "2023",
    desc: "Vibrant travel discovery website built during an internship — destination showcases, engaging hero sections, and a fully responsive mobile layout.",
    tags: ["HTML", "CSS", "Next.js", "Responsive"],
    img: "/images/project-5.jpg",
    link: "https://first-next-app-ten-theta.vercel.app/",
    size: "medium",
  },
  {
    id: 11, num: "11",
    title: "Tax Lodge Online",  subtitle: "e-Commerce Website Design",
    category: "UI/UX Design", projectType: "Freelance Project",  year: "2024",
    desc: "Figma design for a UK-based tax services platform — making complex financial processes feel simple, approachable, and trustworthy for everyday users.",
    tags: ["UI/UX Design", "Figma", "Finance", "Freelance"],
    img: "/images/project-6.jpg",
    link: "https://www.figma.com/design/cncW1woUEVgtBqhe3SZ19I/Tax-Lodge-Online",
    size: "featured",
  },

  /* ── Remaining 10 — 3-col grid ── */
  {
    id: 2,  num: "02",
    title: "Landscape",         subtitle: "Dynamic Blog Website",
    category: "Development",   projectType: "Practice Project",  year: "2024",
    desc: "A dynamic blog website with full article rendering, tag filtering, and a clean editorial layout.",
    tags: ["Next.js", "TypeScript", "Blog", "Dynamic"],
    img: "/images/project-1.jpg",
    link: "https://dynamic-blog-green.vercel.app/",
    size: "grid",
  },
  {
    id: 3,  num: "03",
    title: "Readie",             subtitle: "Educational Website",
    category: "Development",   projectType: "Homework Project",  year: "2023",
    desc: "An educational platform website built with clean HTML and CSS — structured content hierarchy and a calm reading-focused aesthetic.",
    tags: ["HTML", "CSS", "Education"],
    img: "/images/project-2.jpg",
    link: "https://readie-iota.vercel.app/",
    size: "grid",
  },
  {
    id: 4,  num: "04",
    title: "Paws n Play",        subtitle: "e-Commerce Website",
    category: "Development",   projectType: "Freelance Project", year: "2023",
    desc: "Pet e-commerce store built with HTML and Tailwind CSS — product cards, cart UI, and a warm, playful visual identity.",
    tags: ["HTML", "Tailwind CSS", "e-Commerce", "Freelance"],
    img: "/images/project-3.jpg",
    link: "https://furry-website.vercel.app/",
    size: "grid",
  },
  {
    id: 7,  num: "07",
    title: "Photowall",          subtitle: "Digital Photo Exhibition",
    category: "Development",   projectType: "Internship Project", year: "2023",
    desc: "A digital art wall for displaying photo collections — masonry grid, lightbox previews, and subtle entrance animations.",
    tags: ["HTML", "CSS", "Exhibition", "Internship"],
    img: "/images/project-4.jpg",
    link: "https://artwall-topaz.vercel.app/",
    size: "grid",
  },
  {
    id: 8,  num: "08",
    title: "Personal Portfolio 2", subtitle: "Portfolio Website",
    category: "Development",   projectType: "Practice Project",  year: "2023",
    desc: "Second iteration of a personal portfolio — refined typography, project showcase grid, and smooth scroll interactions.",
    tags: ["HTML", "CSS", "Portfolio"],
    img: "/images/project-5.jpg",
    link: "https://mxryxms-personal-portfolio.vercel.app/",
    size: "grid",
  },
  {
    id: 9,  num: "09",
    title: "Wrap n Snap",        subtitle: "e-Commerce Design",
    category: "UI/UX Design", projectType: "Practice Project",  year: "2023",
    desc: "UI/UX design for a gifting and packaging e-commerce brand — warm colour palette, product-first layouts, and a joyful checkout experience.",
    tags: ["UI/UX Design", "Figma", "e-Commerce"],
    img: "/images/project-6.jpg",
    link: "https://www.figma.com/design/CNhhiIo7PSMXXguN4lqIxz/Portfolio-Template--Community-?node-id=101-412",
    size: "grid",
  },
  {
    id: 10, num: "10",
    title: "Portfolio v1",       subtitle: "First Portfolio Website",
    category: "Development",   projectType: "Practice Project",  year: "2022",
    desc: "My very first personal portfolio website — the starting point of my front-end journey, built from scratch with HTML and CSS.",
    tags: ["HTML", "CSS", "Portfolio"],
    img: "/images/project-1.jpg",
    link: "https://portfolio-maryam-nadeem.vercel.app/",
    size: "grid",
  },
  {
    id: 12, num: "12",
    title: "Mathex",             subtitle: "Math Tool",
    category: "Development",   projectType: "Internship Project", year: "2023",
    desc: "An interactive math tool web app — calculation modules, clean UI, and accessible controls built with vanilla HTML, CSS, and JavaScript.",
    tags: ["HTML", "CSS", "JavaScript", "Internship"],
    img: "/images/project-2.jpg",
    link: "https://mathex-gilt.vercel.app/",
    size: "grid",
  },
  {
    id: 14, num: "14",
    title: "Prosume",            subtitle: "Resume Builder",
    category: "Development",   projectType: "Homework Project",  year: "2023",
    desc: "A browser-based resume builder — live preview, structured form inputs, and a print-ready PDF output, all in plain HTML, CSS, and JavaScript.",
    tags: ["HTML", "CSS", "JavaScript", "Tool"],
    img: "/images/project-3.jpg",
    link: "https://resumebuilder-sepia.vercel.app/",
    size: "grid",
  },
  {
    id: 16, num: "16",
    title: "Azeeza Hussaini",    subtitle: "Hospital Website Design",
    category: "UI/UX Design", projectType: "Demo Project",      year: "2024",
    desc: "Figma design for a hospital website — clear wayfinding, appointment booking flows, and a calm, trustworthy visual language for healthcare.",
    tags: ["UI/UX Design", "Figma", "Healthcare", "Demo"],
    img: "/images/project-4.jpg",
    link: "https://www.figma.com/design/4EfbCDqZt9RJjZnXeup81u/Aziza-Hussaini-Hospital",
    size: "grid",
  },
];

const editorialProjects = allProjects.filter((p) => p.size !== "grid");  // first 6
const gridProjects       = allProjects.filter((p) => p.size === "grid"); // remaining 10

/* ── Card ─────────────────────────────────────────────────── */
function ProjectCard({
  project,
  index,
  compact = false,
}: {
  project: Project;
  index: number;
  compact?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const aspectRatio =
    project.size === "medium" ? "16/7"
    : compact               ? "4/3"
    : "4/5";

  const Tag = project.link ? "a" : "div";
  const linkProps = project.link
    ? { href: project.link, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <motion.div
      ref={ref}
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.07, ease }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Tag {...linkProps} className="block">
        {/* Image area */}
        <div className="relative overflow-hidden" style={{ aspectRatio, borderRadius: "4px" }}>
          <div
            className="absolute inset-0"
            style={{ background: `hsl(${340 - (project.id % 8) * 10}, 38%, ${24 + (project.id % 5) * 4}%)` }}
          />
          <Image
            src={project.img}
            alt={project.title}
            fill
            className="object-cover object-top transition-transform duration-700 ease-out"
            style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-end p-5 md:p-7"
            animate={{ background: hovered ? "rgba(74,30,48,0.82)" : "rgba(74,30,48,0)" }}
            transition={{ duration: 0.32 }}
          >
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.28, ease }}
                >
                  <p className="font-sans text-white/55 text-[10px] uppercase tracking-[0.18em] mb-1.5">
                    {project.category} · {project.projectType}
                  </p>
                  <p className="font-sans text-white/80 text-[13px] leading-relaxed mb-4 max-w-sm">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-sans text-[10px] px-2.5 py-1 rounded-full text-white/70"
                        style={{ border: "1px solid rgba(255,255,255,0.2)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-white/45 mt-4">
                      View Project →
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Number badge */}
          <div className="absolute top-4 left-4 font-sans text-[11px] font-semibold text-white/40" style={{ letterSpacing: "0.12em" }}>
            {project.num}
          </div>

          {/* No-link badge */}
          {!project.link && (
            <div
              className="absolute top-4 right-4 font-sans text-[9px] uppercase tracking-widest text-white/35 px-2 py-1 rounded-full"
              style={{ border: "1px solid rgba(255,255,255,0.12)" }}
            >
              Coming Soon
            </div>
          )}
        </div>

        {/* Caption */}
        <div className="flex items-center justify-between pt-3.5 pb-1">
          <div>
            <h3
              className="font-serif font-semibold text-[#4A1E30] leading-snug"
              style={{ fontSize: compact ? "14px" : "clamp(14px, 1.5vw, 19px)" }}
            >
              {project.title}
              <span className="font-sans font-normal text-[#6B2D45]/50 text-[12px] ml-2">
                — {project.subtitle}
              </span>
            </h3>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0 ml-4">
            <span className="font-sans text-[10px] text-[#6B2D45]/40 tracking-wider">{project.year}</span>
            <motion.div
              className="w-6 h-6 rounded-full border border-[#6B2D45]/20 flex items-center justify-center text-[#6B2D45]/40"
              animate={{
                x: hovered ? 2 : 0,
                borderColor: hovered ? "rgba(107,45,69,0.55)" : "rgba(107,45,69,0.2)",
              }}
              transition={{ duration: 0.2 }}
            >
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </div>
        </div>
      </Tag>
    </motion.div>
  );
}

/* ── Section ─────────────────────────────────────────────── */
export default function PortfolioSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView    = useInView(headerRef, { once: true, margin: "-60px" });
  const [filter, setFilter] = useState<Category>("All");

  const filteredGrid =
    filter === "All"
      ? gridProjects
      : filter === "UI/UX Design"
      ? allProjects.filter((p) => p.category === "UI/UX Design")
      : allProjects.filter((p) => p.category === "Development");

  const showEditorial = filter === "All";

  const tabs: Category[] = ["All", "UI/UX Design", "Development"];

  return (
    <section id="portfolio" className="section-cream py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">

        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14">
          <div>
            <motion.p
              className="section-label text-[#6B2D45] mb-4"
              style={{ opacity: 0.5 }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.5 } : {}}
              transition={{ duration: 0.5, ease }}
            >
              — Selected Works
            </motion.p>
            <motion.h2
              className="font-serif font-bold text-[#4A1E30] leading-tight"
              style={{ fontSize: "clamp(32px, 4.5vw, 60px)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              Things I&apos;ve<br />Designed &amp; Built
            </motion.h2>
          </div>

          <motion.p
            className="font-sans text-[#4A1E30]/60 text-sm leading-relaxed max-w-xs"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease }}
          >
            16 projects spanning UI/UX design, front-end development, and freelance work.
          </motion.p>
        </div>

        {/* Filter tabs */}
        <motion.div
          className="flex items-center gap-2 mb-12 md:mb-16 flex-wrap"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3, ease }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className="font-sans text-[12px] font-medium px-5 py-2 rounded-full transition-all duration-200"
              style={{
                border: "1px solid",
                borderColor: filter === tab ? "#6B2D45" : "rgba(107,45,69,0.2)",
                background: filter === tab ? "#6B2D45" : "transparent",
                color: filter === tab ? "#fff" : "rgba(74,30,48,0.55)",
                letterSpacing: "0.04em",
              }}
            >
              {tab}
              <span
                className="ml-2 text-[10px]"
                style={{ opacity: 0.6 }}
              >
                {tab === "All" ? "16" : tab === "UI/UX Design" ? "6" : "10"}
              </span>
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease }}
          >
            {showEditorial ? (
              <>
                {/* Editorial asymmetric layout — top 6 */}
                <div className="space-y-6 md:space-y-8">
                  {/* Row 1: featured (2/3) + two stacked smalls (1/3) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    <div className="md:col-span-2">
                      <ProjectCard project={editorialProjects[0]} index={0} />
                    </div>
                    <div className="flex flex-col gap-6 md:gap-8">
                      <ProjectCard project={editorialProjects[1]} index={1} />
                      <ProjectCard project={editorialProjects[2]} index={2} />
                    </div>
                  </div>

                  {/* Row 2: full-width landscape */}
                  <ProjectCard project={editorialProjects[3]} index={3} />

                  {/* Row 3: small (1/3) + featured (2/3) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    <div>
                      <ProjectCard project={editorialProjects[4]} index={4} />
                    </div>
                    <div className="md:col-span-2">
                      <ProjectCard project={editorialProjects[5]} index={5} />
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-12 md:my-16 flex items-center gap-5">
                  <div className="h-px flex-1" style={{ background: "rgba(107,45,69,0.10)" }} />
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#6B2D45]/35">
                    More Projects
                  </span>
                  <div className="h-px flex-1" style={{ background: "rgba(107,45,69,0.10)" }} />
                </div>

                {/* 3-col grid — remaining 10 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {gridProjects.map((p, i) => (
                    <ProjectCard key={p.id} project={p} index={i} compact />
                  ))}
                </div>
              </>
            ) : (
              /* Filtered view — uniform 3-col grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredGrid.map((p, i) => (
                  <ProjectCard key={p.id} project={p} index={i} compact />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer CTA */}
        <motion.div
          className="mt-16 md:mt-20 flex items-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
        >
          <div className="h-px flex-1" style={{ background: "rgba(107,45,69,0.12)" }} />
          <a
            href="https://github.com/khaliqhussainn"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-dark flex-shrink-0"
          >
            View All on GitHub &nbsp;→
          </a>
          <div className="h-px flex-1" style={{ background: "rgba(107,45,69,0.12)" }} />
        </motion.div>
      </div>
    </section>
  );
}
