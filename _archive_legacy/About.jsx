import React from 'react';
import { aboutData } from '../data/portfolioData';
import BracketTitle from './BracketTitle';
import { CheckCircle2, Cpu, Layers, Sparkles, Code2, GraduationCap, Briefcase } from 'lucide-react';

const iconMap = {
  cpu: <Cpu className="w-4 h-4 text-[#ff1e42]" />,
  layers: <Layers className="w-4 h-4 text-[#00d4ff]" />,
  sparkles: <Sparkles className="w-4 h-4 text-[#a855f7]" />,
  code2: <Code2 className="w-4 h-4 text-[#10b981]" />
};

const About = () => {
  return (
    <div className="w-full space-y-8 font-body">
      {/* Section Header */}
      <div className="space-y-2">
        <BracketTitle subtitle="Developer Background & Engineering Principles">
          About & Profile
        </BracketTitle>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
          {aboutData.statement}
        </p>
      </div>

      {/* Clean 2-Column Editorial Layout (No Card Overuse) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-2 border-t border-white/[0.08]">
        
        {/* Left Column: Narrative (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {aboutData.bios.map((paragraph, idx) => (
            <p key={idx} className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {paragraph}
            </p>
          ))}

          {/* 4 Architectural Focus Points */}
          <div className="pt-4 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold block">
              Core Engineering Focus
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {aboutData.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 py-1">
                  <div className="mt-0.5 shrink-0">
                    {iconMap[item.icon] || <CheckCircle2 className="w-4 h-4 text-[#00d4ff]" />}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white font-display">
                      {item.title}
                    </h4>
                    <p className="text-[0.75rem] text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Credentials & Experience Timeline (5 Cols) */}
        <div className="lg:col-span-5 space-y-6 lg:border-l lg:border-white/[0.06] lg:pl-8">
          
          {/* Education */}
          <div className="space-y-2 pb-4 border-b border-white/[0.06]">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-[#00d4ff]" />
                <span>Academic Degree</span>
              </span>
              <span className="text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                CGPA 7.76
              </span>
            </div>
            <h4 className="text-sm font-bold text-white font-display">
              {aboutData.education.degree}
            </h4>
            <p className="text-xs text-slate-300">
              {aboutData.education.institution}
            </p>
            <span className="text-[0.68rem] font-mono text-slate-500 block">
              2023 - 2027 (Expected Graduation)
            </span>
          </div>

          {/* Experience */}
          <div className="space-y-2 pb-4 border-b border-white/[0.06]">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-[#ff1e42]" />
                <span>Industry Experience</span>
              </span>
              <span className="text-slate-500">
                {aboutData.experience.duration} (2026)
              </span>
            </div>
            <h4 className="text-sm font-bold text-white font-display">
              {aboutData.experience.role}
            </h4>
            <p className="text-xs text-slate-300">
              {aboutData.experience.company}
            </p>
            <p className="text-[0.75rem] text-slate-400 leading-relaxed">
              {aboutData.experience.summary}
            </p>
          </div>

          {/* Coding Practice */}
          <div className="space-y-1.5">
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-[#10b981]" />
              <span>Algorithmic Problem Solving</span>
            </span>
            <p className="text-xs text-slate-300">
              Active Java problem solver on LeetCode focusing on arrays, two pointers, trees, and dynamic programming.
            </p>
            <a
              href={aboutData.codingProfile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[#00d4ff] hover:underline inline-block pt-1"
            >
              LeetCode Profile: @{aboutData.codingProfile.handle} ➔
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};

export default React.memo(About);
