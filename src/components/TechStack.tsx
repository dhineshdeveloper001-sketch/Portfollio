import React from "react";
import { motion } from "framer-motion";
import { skills } from "../data/portfolioData";
import { sound } from "../utils/sound";
import { Code, Layers, Server, Database, BrainCircuit } from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  "PROGRAMMING LANGUAGES": <Code className="w-4 h-4 text-[#E11D48] dark:text-[#FF1E1E]" />,
  "FRONTEND DEVELOPMENT": <Layers className="w-4 h-4 text-[#E11D48] dark:text-[#FF1E1E]" />,
  "BACKEND DEVELOPMENT": <Server className="w-4 h-4 text-[#E11D48] dark:text-[#FF1E1E]" />,
  "DATABASES": <Database className="w-4 h-4 text-[#E11D48] dark:text-[#FF1E1E]" />,
  "CORE STRENGTHS": <BrainCircuit className="w-4 h-4 text-[#E11D48] dark:text-[#FF1E1E]" />,
};

export function TechStack() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="py-20 px-6 max-w-6xl mx-auto relative w-full"
    >
      {/* Section Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 font-mono text-xs text-[#E11D48] dark:text-[#FF1E1E] uppercase tracking-widest mb-2">
          <span className="h-px w-6 bg-[#E11D48] dark:bg-[#FF1E1E]" />
          <span>02 // CAPABILITIES & ARSENAL</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
            Tech Stack
          </h2>
          <p className="text-sm font-mono text-[#64748B]">
            Hover any row to inspect tools & strengths
          </p>
        </div>
      </div>

      {/* 5 Neat Horizontal Rows */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-3"
      >
        {skills.map((skillGroup) => {
          const icon = categoryIcons[skillGroup.category] || (
            <Code className="w-4 h-4 text-[#E11D48] dark:text-[#FF1E1E]" />
          );

          return (
            <motion.div
              key={skillGroup.category}
              variants={rowVariants}
              onMouseEnter={() => sound.hover()}
              className="group p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-[#0A0A0E]/90 backdrop-blur-xl border border-black/5 dark:border-white/10 hover:border-[#E11D48]/40 dark:hover:border-white/20 shadow-md dark:shadow-xl hover:shadow-[0_0_25px_rgba(225,29,72,0.15)] dark:hover:shadow-[0_0_25px_rgba(255,30,30,0.2)] transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Left: Index & Category Name */}
              <div className="flex items-center gap-3.5 md:w-1/3">
                <span className="font-mono text-xs text-[#64748B] group-hover:text-[#E11D48] dark:group-hover:text-[#FF1E1E] transition-colors font-bold">
                  [{skillGroup.index}]
                </span>
                <div className="flex items-center gap-2">
                  {icon}
                  <h3 className="font-mono text-xs sm:text-sm font-bold text-[#0F172A] dark:text-white tracking-wide">
                    {skillGroup.category}
                  </h3>
                </div>
              </div>

              {/* Right: Skills as Pill Badges (Slides slightly on row hover) */}
              <div className="flex flex-wrap items-center gap-2 md:justify-end md:w-2/3 transition-transform duration-300 group-hover:translate-x-1.5">
                {skillGroup.items.map((item) => (
                  <span
                    key={item}
                    className="px-3.5 py-1 rounded-full text-xs font-mono bg-black/[0.04] dark:bg-white/[0.04] text-[#334155] dark:text-[#CBD5E1] border border-black/10 dark:border-white/[0.08] hover:bg-[#E11D48]/10 dark:hover:bg-[#FF1E1E]/10 hover:border-[#E11D48]/50 dark:hover:border-[#FF1E1E]/50 hover:text-[#E11D48] dark:hover:text-[#FF1E1E] hover:scale-105 transition-all duration-200 cursor-default font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
