import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, CheckCircle2, Users } from "lucide-react";
import { experience, leadership } from "../data/portfolioData";
import { sound } from "../utils/sound";

export function Experience() {
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
      id="experience"
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
          <span>04 // CAREER TIMELINE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
          Work Experience
        </h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        {/* Main Internship Timeline Card */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 25 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
          }}
          onMouseEnter={() => sound.hover()}
          className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-white/80 dark:bg-[#0A0A0E]/90 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-lg dark:shadow-2xl hover:border-[#E11D48]/40 dark:hover:border-[#FF1E1E]/40 transition-all duration-300 relative group overflow-hidden"
        >
          {/* Glowing Accent Bar */}
          <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-[#E11D48] dark:from-[#FF1E1E] to-transparent" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <span className="inline-flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded bg-[#E11D48]/10 dark:bg-[#FF1E1E]/10 border border-[#E11D48]/30 dark:border-[#FF1E1E]/30 text-[#E11D48] dark:text-[#FF1E1E] font-semibold mb-2">
                <Briefcase className="w-3 h-3" />
                INTERNSHIP
              </span>
              <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white tracking-tight">
                {experience.role}
              </h3>
              <p className="text-sm font-semibold text-[#475569] dark:text-[#CBD5E1] mt-0.5">
                {experience.company}
              </p>
            </div>

            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#475569] dark:text-[#94A3B8] bg-black/[0.03] dark:bg-white/[0.04] px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10 self-start sm:self-auto font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#E11D48] dark:text-[#FF1E1E]" />
              <span>{experience.duration}</span>
            </div>
          </div>

          {/* Bullets */}
          <div className="space-y-3.5 pt-2 border-t border-black/5 dark:border-white/[0.06]">
            {experience.bullets.map((bullet, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#E11D48] dark:text-[#FF1E1E] shrink-0 mt-0.5" />
                <p className="text-sm text-[#334155] dark:text-[#CBD5E1] leading-relaxed">
                  {bullet}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Leadership & Co-curricular Card */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 25 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
          }}
          onMouseEnter={() => sound.hover()}
          className="lg:col-span-4 p-6 sm:p-7 rounded-2xl bg-white/80 dark:bg-[#0A0A0E]/90 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-lg dark:shadow-2xl hover:border-black/15 dark:hover:border-white/20 transition-all duration-300"
        >
          <div className="flex items-center gap-2 font-mono text-xs text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider mb-4 font-semibold">
            <Users className="w-4 h-4 text-[#E11D48] dark:text-[#FF1E1E]" />
            <span>COORDINATION & LEADERSHIP</span>
          </div>

          {leadership.map((item, i) => (
            <div key={i} className="space-y-2">
              <h4 className="text-base font-bold text-[#0F172A] dark:text-white">
                {item.role}
              </h4>
              <div className="text-xs font-mono text-[#E11D48] dark:text-[#FF1E1E] font-medium">
                {item.event}
              </div>
              <p className="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed pt-2 border-t border-black/5 dark:border-white/[0.06]">
                {item.description}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
