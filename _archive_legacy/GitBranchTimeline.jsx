import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Code2, Award, GitCommit, GitBranch } from 'lucide-react';
import { useMouseParallax } from '../hooks/useMouseParallax';

const GitBranchTimeline = ({ aboutData }) => {
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = useMouseParallax({
    maxRotateX: 4,
    maxRotateY: 6
  });

  const timelineItems = [
    {
      id: 'experience',
      type: 'WORK',
      branch: 'main',
      hash: 'c7a4e92',
      commitMsg: 'feat(experience): Java Full Stack Intern',
      title: aboutData.experience.role,
      subtitle: `${aboutData.experience.company} | ${aboutData.experience.duration}`,
      description: aboutData.experience.description,
      icon: <Briefcase className="w-4 h-4 text-[#ff0a2d]" />
    },
    {
      id: 'education',
      type: 'EDU',
      branch: 'feature/degree',
      hash: '8f3b1a4',
      commitMsg: 'docs(education): B.E. Computer Science',
      title: aboutData.education.institution,
      subtitle: `${aboutData.education.degree} | ${aboutData.education.year}`,
      description: `CGPA: ${aboutData.education.cgpa}`,
      icon: <GraduationCap className="w-4 h-4 text-[#ff0a2d]" />
    },
    {
      id: 'leetcode',
      type: 'DSA',
      branch: 'feature/dsa',
      hash: 'a1e90f2',
      commitMsg: 'feat(dsa): LeetCode Problem Solver',
      title: 'LeetCode DSA Engineer',
      subtitle: 'Active Problem Solving in Java',
      description: aboutData?.codingProfile?.description || 'Practicing Java programming and data structures.',
      icon: <Code2 className="w-4 h-4 text-[#ff0a2d]" />
    },
    {
      id: 'certs',
      type: 'CERT',
      branch: 'feature/certifications',
      hash: 'd4c18b7',
      commitMsg: 'docs(certs): Full Stack Credentials',
      title: 'Java Full Stack & Credentials',
      subtitle: 'Verified Learning Badges',
      description: aboutData?.certifications?.text || 'Java Full Stack Development & Academic Credentials.',
      icon: <Award className="w-4 h-4 text-[#ff0a2d]" />
    }
  ];

  return (
    <div className="w-full relative pl-6 sm:pl-10 space-y-8 font-body">
      
      {/* SVG Timeline Path Animation */}
      <div className="absolute left-2 sm:left-4 top-4 bottom-6 w-8 pointer-events-none z-0">
        <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
          {/* Background Track Line */}
          <line
            x1="12"
            y1="0"
            x2="12"
            y2="100%"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* Animated SVG Path Line */}
          <motion.path
            d="M 12 0 L 12 1000"
            stroke="#ff0a2d"
            strokeWidth="2.5"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* Timeline Commit Items */}
      {timelineItems.map((item, idx) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ margin: "-40px" }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="relative z-10 space-y-2.5 group"
        >
          {/* Active Commit Node Bullet with Glow Pulse */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <div className="absolute -left-[27px] sm:-left-[35px] top-1 flex items-center justify-center">
              <motion.span
                whileInView={{ scale: [0.8, 1.3, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 3 }}
                className="w-3.5 h-3.5 rounded-full bg-[#ff0a2d] shadow-[0_0_15px_#ff0a2d] ring-4 ring-[#030303] inline-block"
              />
            </div>

            <span className="px-2.5 py-0.5 rounded bg-[#ff0a2d]/15 border border-[#ff0a2d]/30 text-[#ff0a2d] font-bold flex items-center gap-1">
              <GitBranch className="w-3 h-3 text-[#ff0a2d]" />
              <span>{item.branch}</span>
            </span>

            <span className="text-white/40 font-mono text-[0.68rem] flex items-center gap-1">
              <GitCommit className="w-3 h-3 text-white/40" />
              <span>{item.hash}</span>
            </span>

            <span className="text-white/60 text-[0.7rem] hidden sm:inline-block">
              {item.commitMsg}
            </span>
          </div>

          {/* Timeline Card */}
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY }}
            className="dev-card space-y-3 shadow-xl border border-white/10 group-hover:border-[#ff0a2d]/50 transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {item.icon}
                  <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-tight">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#ff0a2d] font-mono font-medium">
                  {item.subtitle}
                </p>
              </div>

              <span className="text-[0.65rem] font-mono px-2 py-1 rounded bg-white/5 border border-white/10 text-white/60 shrink-0">
                {item.type}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-body">
              {item.description}
            </p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default GitBranchTimeline;
