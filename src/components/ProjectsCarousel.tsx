import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  CheckCircle,
  Clock,
  Sparkles,
  Layers,
  ArrowRight,
} from "lucide-react";
import { Github } from "./GithubIcon";
import { projects, ProjectItem } from "../data/portfolioData";
import { sound } from "../utils/sound";
import { ProjectPreviewVisuals } from "./ProjectPreviewVisuals";

// Project Tilt Card with Hardware Accelerated 3D Tilt (Max 5 degrees)
function ProjectCard({
  project,
  isActive,
}: {
  project: ProjectItem;
  isActive: boolean;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 3D Tilt bounded strictly to 5 degrees
  const rotateX = useTransform(y, [-150, 150], [5, -5]);
  const rotateY = useTransform(x, [-150, 150], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / rect.width - 0.5) * 300;
    const yPct = (mouseY / rect.height - 0.5) * 300;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      style={{ perspective: 1200 }}
      className="w-[88vw] sm:w-[680px] lg:w-[860px] shrink-0 snap-center transform-gpu"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        transition={{ type: "spring", damping: 25, stiffness: 220 }}
        className={`h-full p-6 sm:p-8 md:p-9 rounded-2xl bg-white/85 dark:bg-[#0A0A0E]/90 backdrop-blur-xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between shadow-lg dark:shadow-2xl ${
          isActive
            ? "border-[#E11D48]/40 dark:border-[#FF1E1E]/40 shadow-[0_0_35px_rgba(225,29,72,0.15)] dark:shadow-[0_0_35px_rgba(255,30,30,0.25)]"
            : "border-black/5 dark:border-white/10 hover:border-black/15 dark:hover:border-white/20"
        }`}
      >
        {/* Subtle Ambient Sheen */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#E11D48]/5 dark:bg-[#FF1E1E]/5 blur-3xl rounded-full pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Column: Project Information */}
          <div className="lg:col-span-6 space-y-5">
            {/* Status & ID Badge */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-xs px-2.5 py-1 rounded bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[#475569] dark:text-[#94A3B8] font-bold">
                PROJECT {project.id}
              </span>

              {project.status === "VERIFIED BUILD" ? (
                <span className="inline-flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400 font-semibold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  VERIFIED BUILD
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/50 text-amber-800 dark:text-amber-300 font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  CONCEPT · SPEC PENDING
                </span>
              )}
            </div>

            {/* Title & Subtitle */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white tracking-tight mb-1.5">
                {project.title}
              </h3>
              <p className="font-mono text-xs sm:text-sm text-[#E11D48] dark:text-[#FF1E1E] font-medium">
                {project.subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-[#334155] dark:text-[#CBD5E1] text-sm leading-relaxed">
              {project.desc}
            </p>

            {/* Core Technologies Pills */}
            <div>
              <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider mb-2 font-medium">
                Core Technologies
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-full text-xs font-mono bg-black/[0.04] dark:bg-white/[0.04] text-[#334155] dark:text-[#CBD5E1] border border-black/5 dark:border-white/10 font-medium hover:border-[#E11D48]/40 dark:hover:border-[#FF1E1E]/40 hover:text-[#E11D48] dark:hover:text-[#FF1E1E] transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Links & Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.click()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-[#0F172A] dark:text-white text-xs sm:text-sm font-semibold border border-black/10 dark:border-white/10 hover:border-[#E11D48]/50 dark:hover:border-[#FF1E1E]/50 transition-all cursor-pointer shadow-sm"
                >
                  <Github className="w-4 h-4 text-[#E11D48] dark:text-[#FF1E1E]" />
                  <span>View Code</span>
                </a>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/[0.06] text-[#64748B] text-xs font-mono">
                  <Github className="w-3.5 h-3.5 opacity-50" />
                  Repo Pending Release
                </span>
              )}

              {project.liveUrl && project.liveUrl !== "#" ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.click()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E11D48] dark:bg-[#FF1E1E] hover:bg-[#E11D48]/90 dark:hover:bg-[#FF1E1E]/90 text-white text-xs sm:text-sm font-semibold shadow-[0_0_20px_rgba(225,29,72,0.3)] dark:shadow-[0_0_20px_rgba(255,30,30,0.4)] transition-all cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{project.liveLabel || "Launch Live"}</span>
                </a>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/[0.06] text-[#64748B] text-xs font-mono">
                  {project.liveLabel || "Live Demo Not Configured"}
                </span>
              )}
            </div>
          </div>

          {/* Right Column: Mini Interactive Simulation with "Live Preview" Badge */}
          <div className="lg:col-span-6">
            <div className="flex items-center justify-between mb-2.5 px-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-[#E11D48]/10 dark:bg-[#FF1E1E]/10 border border-[#E11D48]/30 dark:border-[#FF1E1E]/30 text-[#E11D48] dark:text-[#FF1E1E]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] dark:bg-[#FF1E1E] animate-pulse" />
                Live Preview
              </span>
              <span className="text-[10px] font-mono text-[#64748B]">INTERACTIVE LAB</span>
            </div>
            <ProjectPreviewVisuals project={project} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ProjectsCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Throttled scroll listener with requestAnimationFrame for 60fps performance
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;

    const approxStep = maxScroll / (projects.length - 1);
    const newIdx = Math.round(scrollLeft / approxStep);
    if (newIdx >= 0 && newIdx < projects.length && newIdx !== activeIndex) {
      setActiveIndex(newIdx);
    }
  }, [activeIndex]);

  const scrollToCard = (index: number) => {
    sound.click();
    if (!scrollContainerRef.current) return;
    const cards = scrollContainerRef.current.children;
    if (cards[index]) {
      (cards[index] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
      setActiveIndex(index);
    }
  };

  const scroll = (direction: "left" | "right") => {
    sound.whoosh();
    const nextIdx =
      direction === "left"
        ? Math.max(0, activeIndex - 1)
        : Math.min(projects.length - 1, activeIndex + 1);
    scrollToCard(nextIdx);
  };

  // Keyboard navigation when user is focused
  useEffect(() => {
    const handleKeyNav = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") {
        return;
      }
      if (e.key === "ArrowRight") {
        scroll("right");
      } else if (e.key === "ArrowLeft") {
        scroll("left");
      }
    };

    window.addEventListener("keydown", handleKeyNav);
    return () => window.removeEventListener("keydown", handleKeyNav);
  }, [activeIndex]);

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="py-20 px-6 max-w-6xl mx-auto relative w-full"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#E11D48] dark:text-[#FF1E1E] uppercase tracking-widest mb-2">
            <span className="h-px w-6 bg-[#E11D48] dark:bg-[#FF1E1E]" />
            <span>03 // FEATURED WORK & LABS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
            Featured Projects
          </h2>
        </div>

        {/* Counter and Navigation Controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8]">
              <span className="text-[#0F172A] dark:text-white font-bold">
                0{activeIndex + 1}
              </span>
              <span className="text-[#64748B]"> / 0{projects.length}</span>
            </span>

            {/* Glowing Mini Progress Track */}
            <div className="w-16 h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#E11D48] dark:bg-[#FF1E1E] transition-all duration-300 rounded-full"
                style={{ width: `${((activeIndex + 1) / projects.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={activeIndex === 0}
              onMouseEnter={() => sound.hover()}
              aria-label="Previous project"
              className="p-3 rounded-full bg-white/80 dark:bg-white/[0.04] hover:bg-[#E11D48]/15 dark:hover:bg-[#FF1E1E]/20 border border-black/10 dark:border-white/10 hover:border-[#E11D48]/60 dark:hover:border-[#FF1E1E]/60 text-[#0F172A] dark:text-white transition-all duration-200 cursor-pointer shadow-md active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => scroll("right")}
              disabled={activeIndex === projects.length - 1}
              onMouseEnter={() => sound.hover()}
              aria-label="Next project"
              className="p-3 rounded-full bg-white/80 dark:bg-white/[0.04] hover:bg-[#E11D48]/15 dark:hover:bg-[#FF1E1E]/20 border border-black/10 dark:border-white/10 hover:border-[#E11D48]/60 dark:hover:border-[#FF1E1E]/60 text-[#0F172A] dark:text-white transition-all duration-200 cursor-pointer shadow-md active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Project Selector Quick-Jump Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scrollbar-none pb-4 pt-1">
        {projects.map((proj, idx) => (
          <button
            key={proj.id}
            onClick={() => scrollToCard(idx)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
              idx === activeIndex
                ? "bg-[#E11D48] dark:bg-[#FF1E1E] text-white shadow-[0_0_15px_rgba(225,29,72,0.35)] dark:shadow-[0_0_15px_rgba(255,30,30,0.45)] font-bold"
                : "bg-white/80 dark:bg-white/[0.04] text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white border border-black/5 dark:border-white/10 hover:border-[#E11D48]/40 dark:hover:border-[#FF1E1E]/40"
            }`}
          >
            <span>{proj.id}</span>
            <span className="hidden sm:inline">•</span>
            <span className="truncate max-w-[120px] sm:max-w-[160px]">{proj.title}</span>
          </button>
        ))}
      </div>

      {/* Sleek Horizontal Scrolling Area with Snap & Hidden Scrollbar */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 scrollbar-none no-scrollbar scroll-smooth w-full"
      >
        {projects.map((project, idx) => (
          <ProjectCard
            key={project.id}
            project={project}
            isActive={idx === activeIndex}
          />
        ))}
      </div>

      {/* Interactive Navigation Dots with Tooltips */}
      <div className="flex items-center justify-center gap-2.5 mt-4">
        {projects.map((proj, idx) => (
          <button
            key={proj.id}
            onClick={() => scrollToCard(idx)}
            aria-label={`Jump to project ${proj.id}`}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              idx === activeIndex
                ? "w-8 bg-[#E11D48] dark:bg-[#FF1E1E] shadow-[0_0_10px_#FF1E1E]"
                : "w-2 bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </motion.section>
  );
}
