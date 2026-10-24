import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { identity } from "../data/portfolioData";
import { sound } from "../utils/soundEngine";

interface HeroSectionProps {
  mode: "CYBER CORE" | "WIREFRAME" | "OVERCLOCK";
  setMode: (mode: "CYBER CORE" | "WIREFRAME" | "OVERCLOCK") => void;
}

export function HeroSection({ mode, setMode }: HeroSectionProps) {
  const letters = Array.from(identity.fullName);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.1 }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const scrollToProjects = () => {
    sound.click();
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToNext = () => {
    sound.click();
    const el = document.getElementById("profile");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="origin"
      className="min-h-screen relative flex items-center max-w-6xl mx-auto px-6 md:px-10 py-20 pointer-events-none"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-12 md:pt-0">
        {/* Left Column (DOM content) */}
        <div className="lg:col-span-7 flex flex-col pointer-events-auto">
          {/* Section Mono Header */}
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-sm font-semibold text-[#FF1E1E]">
              // 01 — ORIGIN
            </span>
            <span className="w-8 h-[1px] bg-[#FF1E1E]/40" />
          </div>

          {/* Kinetic Headline */}
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-ui uppercase leading-none"
          >
            {letters.map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className={char === " " ? "inline-block w-3 md:w-5" : "inline-block"}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subheadline & Academic Line */}
          <div className="mt-4 flex flex-col gap-1.5">
            <h2 className="text-lg md:text-2xl font-semibold text-[#94A3B8]">
              {identity.headline}
            </h2>
            <p className="font-mono text-xs md:text-sm text-[#64748B]">
              {identity.subheadline}
            </p>
          </div>

          {/* CTA Row */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToProjects}
              className="px-6 py-3 rounded-full bg-[#FF1E1E] hover:bg-[#DC2626] text-white font-medium text-xs md:text-sm tracking-wide shadow-[0_0_20px_rgba(255,30,30,0.4)] transition-all flex items-center gap-2 group hover:scale-[1.02]"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={scrollToNext}
              className="px-5 py-3 rounded-full glass-panel hover:border-[#FF1E1E]/50 text-white font-mono text-xs tracking-wider transition-colors flex items-center gap-2"
            >
              <span>↓ Scroll</span>
            </button>
          </div>
        </div>

        {/* Right Column: 3D Core Mode Switcher HUD */}
        <div className="lg:col-span-5 flex justify-start lg:justify-end pointer-events-auto">
          <div className="glass-panel p-4 rounded-xl border border-white/10 shadow-xl flex flex-col gap-2.5 max-w-xs w-full">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#64748B] border-b border-white/5 pb-2">
              <span>CORE RENDER TELEMETRY</span>
              <span className="w-2 h-2 rounded-full bg-[#FF1E1E]" />
            </div>

            <div className="grid grid-cols-1 gap-1.5 font-mono text-xs">
              {(["CYBER CORE", "WIREFRAME", "OVERCLOCK"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    sound.click();
                    setMode(m);
                  }}
                  className={`px-3 py-2 rounded text-left transition-all flex items-center justify-between ${
                    mode === m
                      ? "bg-[#FF1E1E]/20 text-[#FF1E1E] border border-[#FF1E1E]/60 shadow-[0_0_15px_rgba(255,30,30,0.3)]"
                      : "bg-white/5 hover:bg-white/10 text-white/70 border border-transparent"
                  }`}
                >
                  <span>[ {m} ]</span>
                  {mode === m && <span className="text-[10px] uppercase tracking-wider">ACTIVE</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator chevron */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-1 font-mono text-[10px] tracking-widest animate-bounce">
        <span>SCROLL TIMELINE</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </section>
  );
}
