import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, Award, BookOpen } from "lucide-react";
import { education } from "../data/portfolioData";
import { sound } from "../utils/sound";

export function Education() {
  const cgpaNumeric = parseFloat(education.cgpa);
  const percentage = (cgpaNumeric / 10.0) * 100;

  return (
    <motion.section
      id="education"
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
          <span>06 // ACADEMIC FOUNDATION</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
          Education
        </h2>
      </div>

      {/* Education Clean Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => sound.hover()}
        className="p-6 sm:p-8 md:p-10 rounded-2xl bg-white/80 dark:bg-[#0A0A0E]/90 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-lg dark:shadow-2xl hover:border-black/15 dark:hover:border-white/20 transition-all duration-300 relative overflow-hidden"
      >
        {/* Subtle Ambient Red Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#E11D48]/5 dark:bg-[#FF1E1E]/5 blur-3xl rounded-full pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Degree & Institution Info */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-xs px-3 py-1 rounded-full bg-[#E11D48]/10 dark:bg-[#FF1E1E]/10 border border-[#E11D48]/30 dark:border-[#FF1E1E]/30 text-[#E11D48] dark:text-[#FF1E1E] font-semibold">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{education.status}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
              {education.degree}
            </h3>

            <div className="space-y-1.5 text-sm text-[#334155] dark:text-[#CBD5E1]">
              <div className="flex items-center gap-2 font-semibold">
                <BookOpen className="w-4 h-4 text-[#E11D48] dark:text-[#FF1E1E]" />
                <span>{education.college}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">
                <Calendar className="w-3.5 h-3.5 text-[#64748B]" />
                <span>Graduation: {education.graduation}</span>
              </div>
            </div>

            <p className="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed pt-2">
              Focused coursework in Data Structures & Algorithms, Object-Oriented Software
              Engineering in Java, Database Management Systems, Computer Networks, and Cloud
              Fundamentals.
            </p>
          </div>

          {/* Right: CGPA Meter with Animated Width */}
          <div className="lg:col-span-5 p-6 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider font-semibold">
                Cumulative GPA Index
              </span>
              <span className="font-mono text-xs text-[#E11D48] dark:text-[#FF1E1E] font-bold">
                SCALE / 10.0
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-[#0F172A] dark:text-white font-mono tracking-tight">
                {education.cgpa}
              </span>
              <span className="text-sm font-mono text-[#64748B]">/ 10.00</span>
            </div>

            {/* Animated Progress Bar */}
            <div className="space-y-2">
              <div className="w-full h-3 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden p-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full bg-gradient-to-r from-rose-600 via-[#E11D48] dark:via-[#FF1E1E] to-rose-400 rounded-full shadow-[0_0_12px_rgba(225,29,72,0.6)] dark:shadow-[0_0_12px_rgba(255,30,30,0.6)]"
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-[#64748B]">
                <span>0.00</span>
                <span>5.00</span>
                <span className="text-[#E11D48] dark:text-[#FF1E1E] font-bold">
                  {education.cgpa} (CURRENT)
                </span>
                <span>10.00</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
              <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Strong Academic Standing</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
