import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, Code2, CheckCircle2, AlertCircle, Cpu, Zap, Target } from 'lucide-react';
import { useKeyPress } from '../hooks/useKeyPress';
import { playOpenSound, playClickSound } from '../utils/soundEffects';

/**
 * Detailed Architectural Case Study Modal Component
 */
const ProjectDetail = ({ project, onClose }) => {
  const closeBtnRef = useRef(null);

  // Close on Escape keypress
  useKeyPress('Escape', () => {
    playClickSound();
    onClose();
  });

  // Prevent background scroll and play open sound
  useEffect(() => {
    playOpenSound();
    closeBtnRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[999999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-detail-title"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="glass-card w-full max-w-3xl bg-[#0c0e15] border-white/[0.15] p-6 sm:p-8 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto custom-scrollbar font-body"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/25 font-semibold uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-xs font-mono text-slate-500">Case Study #{project.number}</span>
          </div>

          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close project details"
            className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-[#ff1e42] text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Screenshot Banner */}
        <div className="relative rounded-xl overflow-hidden border border-white/[0.08] aspect-video bg-black/60">
          <picture>
            <source srcSet={project.webpImage || project.screenshot} type="image/webp" />
            <img
              src={project.pngImage || project.webpImage || project.screenshot}
              alt={project.alt || project.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          <h2 id="project-detail-title" className="absolute bottom-4 left-4 right-4 text-2xl sm:text-3xl font-extrabold font-display text-white">
            {project.title}
          </h2>
        </div>

        {/* Business Value & Impact */}
        {project.businessValue && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
              <Target className="w-4 h-4 text-emerald-400" />
              <span>BUSINESS VALUE & USER IMPACT</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200">
              {project.businessValue}
            </p>
          </div>
        )}

        {/* Description */}
        <div className="space-y-1.5">
          <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">System Overview</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Architectural Challenge Section */}
        {project.challenge && (
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-[#ff1e42] font-semibold">
              <AlertCircle className="w-4 h-4 text-[#ff1e42]" />
              <span>ENGINEERING CHALLENGE SOLVED</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-mono">
              {project.challenge}
            </p>
          </div>
        )}

        {/* System Architecture Flow */}
        {project.architecture && (
          <div className="p-4 rounded-xl bg-white/[0.02] border border-[#00d4ff]/25 space-y-2 font-mono">
            <div className="flex items-center gap-2 text-xs text-[#00d4ff] font-semibold">
              <Cpu className="w-4 h-4 text-[#00d4ff]" />
              <span>SYSTEM DATA & MODULE FLOW</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed bg-black/40 p-3 rounded-lg border border-white/[0.06]">
              {project.architecture}
            </p>
          </div>
        )}

        {/* Key Technical Features */}
        {project.features && project.features.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">Key Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#ff1e42] shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack Tags */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">Technologies</h3>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs font-mono px-3 py-1 rounded-md bg-white/[0.03] text-slate-300 border border-white/[0.08]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/[0.08]">
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex-1 py-2.5 px-4 text-xs sm:text-sm font-semibold rounded-xl"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Launch Live App</span>
            </a>
          )}

          <a
            href={project.githubUrl || project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex-1 py-2.5 px-4 text-xs sm:text-sm font-semibold rounded-xl"
          >
            <Code2 className="w-4 h-4 text-[#ff1e42]" />
            <span>View Source Code</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetail;
