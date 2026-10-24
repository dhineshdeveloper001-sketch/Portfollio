import React, { useState, useEffect, useRef } from "react";
import { education } from "../data/portfolioData";
import { GraduationCap, Award, MapPin } from "lucide-react";

export function EducationSection() {
  const [cgpaWidth, setCgpaWidth] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCgpaWidth(77.6); // 7.76 / 10.0 -> 77.6%
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="education"
      className="min-h-screen relative flex items-center max-w-6xl mx-auto px-6 md:px-10 py-14 md:py-20"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column Header */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-sm font-semibold text-[#FF1E1E]">
              // 07 — FOUNDATION
            </span>
            <span className="w-8 h-[1px] bg-[#FF1E1E]/40" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">
            Academic Foundation
          </h2>
          <p className="text-sm md:text-base text-[#94A3B8] font-ui leading-relaxed">
            Rigorous undergraduate computer science engineering education spanning data structures, algorithms, operating systems, and distributed system architectures.
          </p>
        </div>

        {/* Right Column: Academic Credential Card */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-xl bg-[#FF1E1E]/10 border border-[#FF1E1E]/30 text-[#FF1E1E] shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  {education.degree}
                </h3>
                <div className="flex items-center gap-1.5 font-mono text-xs text-[#94A3B8] mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#FF1E1E]" />
                  <span>{education.college}</span>
                </div>
              </div>
            </div>

            {/* CGPA Animated Progress Meter */}
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 my-4 flex flex-col gap-2">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[#94A3B8] flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#FF1E1E]" />
                  CUMULATIVE GRADE POINT AVERAGE (CGPA)
                </span>
                <span className="text-base font-bold text-white">
                  {education.cgpa} <span className="text-xs text-[#64748B]">/ 10.0</span>
                </span>
              </div>

              <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-[#DC2626] to-[#FF1E1E] rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_#FF1E1E]"
                  style={{ width: `${cgpaWidth}%` }}
                />
              </div>
            </div>

            {/* Status & Graduation Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/5 font-mono text-xs">
              <div className="flex flex-col">
                <span className="text-[#64748B]">GRADUATION</span>
                <span className="text-white font-semibold">{education.graduation}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#64748B]">CURRENT STANDING</span>
                <span className="text-emerald-400 font-semibold">{education.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
