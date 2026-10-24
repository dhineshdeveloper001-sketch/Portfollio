import React from "react";
import { experience } from "../data/portfolioData";
import { Briefcase, Calendar } from "lucide-react";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="min-h-screen relative flex items-center max-w-6xl mx-auto px-6 md:px-10 py-14 md:py-20"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column Section Header */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-sm font-semibold text-[#FF1E1E]">
              // 05 — CHRONICLE
            </span>
            <span className="w-8 h-[1px] bg-[#FF1E1E]/40" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">
            Production Experience
          </h2>
          <p className="text-sm md:text-base text-[#94A3B8] font-ui leading-relaxed">
            Hands-on software engineering immersion strengthening enterprise backend architectures, database schemas, and modern web applications.
          </p>
        </div>

        {/* Right Column: Experience Card */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden group">
            {/* Top Border Red Accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF1E1E] to-transparent opacity-60" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-5">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-[#FF1E1E]/10 border border-[#FF1E1E]/30 text-[#FF1E1E]">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white">
                    {experience.role}
                  </h3>
                  <p className="font-mono text-xs text-[#FF1E1E] mt-0.5">
                    {experience.company}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-white/5 border border-white/10 font-mono text-xs text-[#94A3B8] w-fit">
                <Calendar className="w-3.5 h-3.5 text-[#FF1E1E]" />
                <span>{experience.duration}</span>
              </div>
            </div>

            {/* Verbatim Impact Bullets */}
            <ul className="mt-6 space-y-3 font-ui text-sm md:text-base text-[#CBD5E1]">
              {experience.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E1E] mt-2 shrink-0" />
                  <span className="leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
