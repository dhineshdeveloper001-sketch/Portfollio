import React from 'react';
import { aboutData } from '../data/portfolioData';
import BracketTitle from './BracketTitle';
import { Briefcase, GraduationCap, Calendar, CheckCircle2 } from 'lucide-react';

const ExperienceEducation = () => {
  return (
    <div className="w-full space-y-8 font-body">
      {/* Section Header */}
      <div className="space-y-2">
        <BracketTitle subtitle="Industry Track Record & Academic Foundation">
          Experience & Education
        </BracketTitle>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
          Production engineering experience delivering Java REST services paired with strong Computer Science fundamentals.
        </p>
      </div>

      {/* Clean 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-2 border-t border-white/[0.08]">
        
        {/* Experience Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono border-b border-white/[0.04] pb-2">
            <span className="text-[#ff1e42] font-semibold flex items-center gap-1.5 uppercase tracking-wider">
              <Briefcase className="w-4 h-4" />
              <span>Production Internship</span>
            </span>
            <span className="text-slate-500">
              {aboutData.experience.duration} ({aboutData.experience.period})
            </span>
          </div>

          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-white font-display">
              {aboutData.experience.role}
            </h3>
            <p className="text-xs sm:text-sm text-[#00d4ff] font-mono">
              {aboutData.experience.company}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {aboutData.experience.summary}
          </p>

          {/* Clean Bulleted Deliverables */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold block">
              Key Deliverables
            </span>
            <div className="space-y-1.5">
              {aboutData.experience.impactPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="text-[#ff1e42] mt-0.5">•</span>
                  <span className="leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 text-xs font-mono text-slate-400">
            <span className="text-slate-500 mr-2">Environment:</span>
            <span className="text-slate-300">Java 21 · Spring Boot · REST APIs · MySQL · JPA · React · Git</span>
          </div>
        </div>

        {/* Education Column (5 Cols) */}
        <div className="lg:col-span-5 space-y-4 lg:border-l lg:border-white/[0.06] lg:pl-8">
          <div className="flex items-center justify-between text-xs font-mono border-b border-white/[0.04] pb-2">
            <span className="text-[#00d4ff] font-semibold flex items-center gap-1.5 uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>Academic Degree</span>
            </span>
            <span className="text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
              CGPA 7.76
            </span>
          </div>

          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-white font-display">
              {aboutData.education.degree}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              {aboutData.education.institution}
            </p>
            <span className="text-xs font-mono text-slate-500 block">
              {aboutData.education.year} ({aboutData.education.status})
            </span>
          </div>

          {/* Coursework */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold block">
              Key Coursework
            </span>
            <div className="space-y-1 text-xs text-slate-300">
              {aboutData.education.coursework.map((course, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-slate-600">•</span>
                  <span>{course}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default React.memo(ExperienceEducation);
