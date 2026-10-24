import React from "react";
import { motion } from "framer-motion";
import { Terminal, Cpu, Database, CheckCircle2, User, Globe } from "lucide-react";
import { identity, education } from "../data/portfolioData";
import { sound } from "../utils/sound";

export function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.section
      id="about"
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
          <span>01 // PROFILE & BACKGROUND</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
          About Me
        </h2>
      </div>

      {/* Split Layout: Bio Card & Telemetry Card */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
      >
        {/* Left Column: Bio & Engineering Focus */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -30 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
          }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="p-6 sm:p-8 rounded-2xl bg-white/80 dark:bg-[#0A0A0E]/90 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-lg dark:shadow-2xl relative overflow-hidden group hover:border-[#E11D48]/30 dark:hover:border-white/20 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E11D48]/5 dark:bg-[#FF1E1E]/5 rounded-bl-full pointer-events-none" />

            <h3 className="text-xl font-bold text-[#0F172A] dark:text-white mb-4 flex items-center gap-2.5">
              <User className="w-5 h-5 text-[#E11D48] dark:text-[#FF1E1E]" />
              <span>Engineering Scalable & Responsive Experiences</span>
            </h3>

            <p className="text-[#334155] dark:text-[#CBD5E1] leading-relaxed text-sm sm:text-base mb-4 font-normal">
              {identity.bio}
            </p>

            <p className="text-[#475569] dark:text-[#94A3B8] leading-relaxed text-sm mb-6">
              Currently pursuing my Bachelor of Engineering in Computer Science and Engineering at{" "}
              <span className="text-[#0F172A] dark:text-white font-medium">{education.college}</span>, maintaining a{" "}
              <span className="text-[#E11D48] dark:text-[#FF1E1E] font-mono font-semibold">{education.cgpa} CGPA</span>.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-black/5 dark:border-white/[0.08]">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#E11D48] dark:text-[#FF1E1E] shrink-0 mt-0.5" />
                <span className="text-xs text-[#334155] dark:text-[#CBD5E1] font-medium">
                  Full-Stack architecture with Java Spring Boot & React
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#E11D48] dark:text-[#FF1E1E] shrink-0 mt-0.5" />
                <span className="text-xs text-[#334155] dark:text-[#CBD5E1] font-medium">
                  Relational database engineering (MySQL, PostgreSQL)
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#E11D48] dark:text-[#FF1E1E] shrink-0 mt-0.5" />
                <span className="text-xs text-[#334155] dark:text-[#CBD5E1] font-medium">
                  Algorithm design & LeetCode problem solving
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#E11D48] dark:text-[#FF1E1E] shrink-0 mt-0.5" />
                <span className="text-xs text-[#334155] dark:text-[#CBD5E1] font-medium">
                  Modern UI motion, micro-interactions & GenAI tools
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Telemetry Card with Blinking Cursor */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 30 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
          }}
          className="lg:col-span-5"
        >
          <div
            onMouseEnter={() => sound.hover()}
            className="p-5 sm:p-6 rounded-2xl bg-white/80 dark:bg-[#0A0A0E]/90 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-lg dark:shadow-2xl relative overflow-hidden font-mono text-xs group hover:border-[#E11D48]/40 dark:hover:border-[#FF1E1E]/50 transition-all duration-300"
          >
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between pb-4 border-b border-black/5 dark:border-white/[0.08] mb-5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48] dark:bg-[#FF1E1E] shadow-[0_0_6px_#FF1E1E]" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                <span className="ml-2 text-[11px] text-[#64748B]">sys_telemetry.log</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-800/40 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                ONLINE
              </div>
            </div>

            {/* Telemetry Metrics */}
            <div className="space-y-4 text-[#334155] dark:text-[#CBD5E1]">
              <div>
                <div className="text-[10px] text-[#64748B] uppercase tracking-wider mb-1 font-semibold">
                  [HOST_ID]
                </div>
                <div className="text-[#0F172A] dark:text-white font-bold flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-[#E11D48] dark:text-[#FF1E1E]" />
                  <span>DK // DHINESHKUMAR J</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-black/5 dark:border-white/[0.06]">
                <div>
                  <div className="text-[10px] text-[#64748B] uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Cpu className="w-3 h-3 text-[#E11D48] dark:text-[#FF1E1E]" />
                    <span>RUNTIME</span>
                  </div>
                  <div className="text-[#0F172A] dark:text-white font-semibold">Java 21 / Spring</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#64748B] uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Database className="w-3 h-3 text-[#E11D48] dark:text-[#FF1E1E]" />
                    <span>FRONTEND</span>
                  </div>
                  <div className="text-[#0F172A] dark:text-white font-semibold">React 19 / Vite</div>
                </div>
              </div>

              <div className="pt-2 border-t border-black/5 dark:border-white/[0.06]">
                <div className="flex justify-between text-[11px] mb-1.5">
                  <span className="text-[#475569] dark:text-[#94A3B8]">DSA & PROBLEM SOLVING</span>
                  <span className="text-[#E11D48] dark:text-[#FF1E1E] font-bold">ACTIVE ROUTINE</span>
                </div>
                <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "88%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[#E11D48] dark:from-[#FF1E1E] to-rose-400 rounded-full"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-black/5 dark:border-white/[0.06]">
                <div className="flex justify-between text-[11px] mb-1.5">
                  <span className="text-[#475569] dark:text-[#94A3B8]">ACADEMIC CGPA INDEX</span>
                  <span className="text-[#0F172A] dark:text-white font-bold">{education.cgpa} / 10.0</span>
                </div>
                <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "77.6%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-[#E11D48] dark:bg-[#FF1E1E] rounded-full shadow-[0_0_8px_#FF1E1E]"
                  />
                </div>
              </div>

              {/* Console Log with Blinking Cursor */}
              <div className="mt-4 p-3 bg-black/5 dark:bg-black/60 rounded-lg border border-black/10 dark:border-white/[0.08] text-[11px] leading-relaxed">
                <div className="text-[#64748B] flex items-center gap-1 mb-1">
                  <Terminal className="w-3 h-3 text-[#E11D48] dark:text-[#FF1E1E]" />
                  <span>root@dhinesh-station:~$</span>
                </div>
                <p className="text-[#0F172A] dark:text-white font-mono">
                  status: ready to deploy full-stack solutions
                  <span
                    aria-hidden="true"
                    className="inline-block w-2 h-3.5 bg-[#E11D48] dark:bg-[#FF1E1E] shadow-[0_0_8px_#FF1E1E] animate-pulse ml-1 align-middle"
                  />
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
