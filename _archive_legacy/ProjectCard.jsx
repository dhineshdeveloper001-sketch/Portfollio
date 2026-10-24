import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code2, ArrowUpRight, Cpu, Zap, ShieldCheck, CheckCircle2, Calculator, Users, Lock, GitCommit } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/soundEffects';

/**
 * Interactive Project Card with Project-Specific Visual Personalities & Micro-Widgets
 */
const ProjectCard = React.memo(({ project, onExpand }) => {
  // 3D tilt coordinates
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Micro-widget local states for project personality
  const [billingItem, setBillingItem] = useState(4500); // Billing widget
  const [messOptedOut, setMessOptedOut] = useState(true); // Mess reduction toggle
  const [rbacRole, setRbacRole] = useState('faculty'); // Scholarlink toggle
  const [gateA, setGateA] = useState(1); // Binary logic input A
  const [gateB, setGateB] = useState(0); // Binary logic input B

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -5;
    const rY = ((x - centerX) / centerX) * 5;
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseEnter = () => {
    playHoverSound();
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const handleCardClick = useCallback(() => {
    playClickSound();
    onExpand(project.id);
  }, [onExpand, project.id]);

  // Project-Specific Mini-Widgets
  const renderProjectMicroWidget = () => {
    switch (project.id) {
      case 'project-billing':
        const gst = Math.round(billingItem * 0.18);
        const total = billingItem + gst;
        return (
          <div
            onClick={(e) => e.stopPropagation()}
            className="p-2.5 rounded-xl bg-black/50 border border-white/[0.08] text-[0.68rem] font-mono space-y-1.5"
          >
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1 text-[#ff1e42] font-bold">
                <Calculator className="w-3 h-3 text-[#ff1e42]" />
                <span>GST ENGINE SIMULATOR</span>
              </span>
              <span className="text-[0.62rem] text-emerald-400">0% TAX ERROR</span>
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={() => setBillingItem(billingItem === 4500 ? 2200 : 4500)}
                className="px-2 py-0.5 rounded bg-white/[0.06] text-white hover:bg-white/[0.12] transition-colors cursor-pointer"
              >
                {billingItem === 4500 ? 'Item: Retail POS (₹4,500)' : 'Item: Scanner (₹2,200)'} ⇄
              </button>
              <span className="text-white font-bold">Total: ₹{total} (GST: ₹{gst})</span>
            </div>
          </div>
        );

      case 'project-messreduction':
        return (
          <div
            onClick={(e) => e.stopPropagation()}
            className="p-2.5 rounded-xl bg-black/50 border border-white/[0.08] text-[0.68rem] font-mono space-y-1.5"
          >
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1 text-[#6db33f] font-bold">
                <Users className="w-3 h-3 text-[#6db33f]" />
                <span>MEAL CUTOFF WORKFLOW</span>
              </span>
              <span className="text-emerald-400">~30% LESS FOOD WASTE</span>
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={() => setMessOptedOut(!messOptedOut)}
                className={`px-2 py-0.5 rounded font-semibold transition-colors cursor-pointer ${
                  messOptedOut ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}
              >
                Status: {messOptedOut ? 'Opt-Out Logged' : 'Dining Opt-In'} ⇄
              </button>
              <span className="text-slate-300">
                {messOptedOut ? 'Headcount: -1 (Rebate: +₹45)' : 'Procurement: Normal'}
              </span>
            </div>
          </div>
        );

      case 'project-scholarlink':
        return (
          <div
            onClick={(e) => e.stopPropagation()}
            className="p-2.5 rounded-xl bg-black/50 border border-white/[0.08] text-[0.68rem] font-mono space-y-1.5"
          >
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1 text-[#00d4ff] font-bold">
                <ShieldCheck className="w-3 h-3 text-[#00d4ff]" />
                <span>RBAC ACCESS SIMULATOR</span>
              </span>
              <span className="text-slate-400">500+ STUDENTS</span>
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={() => setRbacRole(rbacRole === 'faculty' ? 'student' : 'faculty')}
                className="px-2 py-0.5 rounded bg-white/[0.06] text-[#00d4ff] hover:bg-white/[0.12] transition-colors cursor-pointer"
              >
                Role: {rbacRole.toUpperCase()} ⇄
              </button>
              <span className="text-slate-300">
                {rbacRole === 'faculty' ? 'Grades: [EDIT / PUBLISH]' : 'Grades: [VIEW-ONLY]'}
              </span>
            </div>
          </div>
        );

      case 'project-ledgerflow':
        return (
          <div
            onClick={(e) => e.stopPropagation()}
            className="p-2.5 rounded-xl bg-black/50 border border-white/[0.08] text-[0.68rem] font-mono space-y-1"
          >
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[#a855f7] font-bold">DOUBLE-ENTRY INVARIANT</span>
              <span className="text-emerald-400 font-bold">BALANCED</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span>Debit: ₹12,500.00</span>
              <span className="text-slate-500">=</span>
              <span>Credit: ₹12,500.00</span>
              <span className="text-emerald-400">Δ = 0.00</span>
            </div>
          </div>
        );

      case 'project-gatekeeper':
        return (
          <div
            onClick={(e) => e.stopPropagation()}
            className="p-2.5 rounded-xl bg-black/50 border border-white/[0.08] text-[0.68rem] font-mono space-y-1"
          >
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1 text-[#f89820] font-bold">
                <Lock className="w-3 h-3 text-[#f89820]" />
                <span>STATELESS JWT & BCRYPT</span>
              </span>
              <span className="text-emerald-400">HS256 VERIFIED</span>
            </div>
            <div className="text-[0.62rem] text-slate-400 truncate">
              Payload: <span className="text-slate-200">&#123;sub: "dhinesh", role: "ADMIN", exp: 3600&#125;</span>
            </div>
          </div>
        );

      case 'project-binarylogic':
        const xorResult = gateA ^ gateB;
        return (
          <div
            onClick={(e) => e.stopPropagation()}
            className="p-2.5 rounded-xl bg-black/50 border border-white/[0.08] text-[0.68rem] font-mono space-y-1.5"
          >
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[#38bdf8] font-bold">INTERACTIVE XOR GATE SIM</span>
              <span className="text-emerald-400">60 FPS AST</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setGateA(gateA === 1 ? 0 : 1)}
                  className="px-2 py-0.5 rounded bg-white/[0.08] hover:bg-white/[0.15] text-white cursor-pointer"
                >
                  A: {gateA}
                </button>
                <span className="text-slate-500">⊕</span>
                <button
                  onClick={() => setGateB(gateB === 1 ? 0 : 1)}
                  className="px-2 py-0.5 rounded bg-white/[0.08] hover:bg-white/[0.15] text-white cursor-pointer"
                >
                  B: {gateB}
                </button>
              </div>
              <span className="text-white font-bold bg-[#38bdf8]/10 px-2 py-0.5 rounded border border-[#38bdf8]/30">
                OUTPUT: {xorResult}
              </span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      onClick={handleCardClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="explore"
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.15s ease-out, border-color 0.2s ease, box-shadow 0.2s ease'
      }}
      className="glass-card p-5 sm:p-6 flex flex-col justify-between group hover:border-[#00d4ff]/50 hover:shadow-2xl hover:shadow-[#00d4ff]/10 cursor-pointer overflow-hidden relative select-none"
    >
      {/* Light Sweep Highlight */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
          transition: 'transform 0.8s ease-in-out'
        }}
      />

      <div>
        {/* Top Header: Category & Index */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[0.68rem] font-mono px-2.5 py-1 rounded-full bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20 font-semibold uppercase tracking-wider">
            {project.category}
          </span>
          <span className="text-xs font-mono text-slate-500 font-semibold">
            #{project.number}
          </span>
        </div>

        {/* Visual Thumbnail */}
        <div className="w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/[0.08] bg-black/60 relative mb-4">
          {project.webpImage || project.pngImage || project.screenshot ? (
            <picture>
              <source srcSet={project.webpImage || project.screenshot} type="image/webp" />
              <img
                src={project.pngImage || project.webpImage || project.screenshot}
                alt={project.alt || project.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
              />
            </picture>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#111] p-4 text-center">
              <Cpu className="w-8 h-8 text-[#00d4ff] mb-1" />
              <span className="font-mono text-xs text-slate-400 font-bold">{project.title}</span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

          {/* Quick Hover Badge */}
          <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-white text-[0.7rem] font-mono opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            <span>Explore Architecture</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#00d4ff]" />
          </div>
        </div>

        {/* Title & Featured Tag */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <h3 className="text-base sm:text-lg font-bold font-display text-white group-hover:text-[#00d4ff] transition-colors truncate">
            {project.title}
          </h3>
          {project.featured && (
            <span className="text-[0.62rem] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 shrink-0">
              Featured
            </span>
          )}
        </div>

        {/* Impact Badge */}
        {project.impact && (
          <div className="mb-3 text-[0.7rem] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">{project.impact}</span>
          </div>
        )}

        {/* Description */}
        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-3">
          {project.description}
        </p>

        {/* Embedded Interactive Micro-Widget */}
        <div className="mb-4">
          {renderProjectMicroWidget()}
        </div>
      </div>

      {/* Bottom: Tech Stack & Actions */}
      <div className="pt-3 border-t border-white/[0.08] space-y-3">
        {/* Tech Chips */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag, idx) => (
            <span
              key={idx}
              className="text-[0.65rem] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-slate-300 border border-white/[0.08]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Links */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            className="text-xs font-mono text-[#00d4ff] hover:underline flex items-center gap-1 cursor-pointer font-semibold"
          >
            <span>Inspect Spec</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2">
            {(project.codeUrl || project.githubUrl) && (
              <a
                href={project.codeUrl || project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/[0.08] transition-colors cursor-pointer"
                title="View GitHub Repository"
              >
                <Code2 className="w-3.5 h-3.5" />
              </a>
            )}

            {(project.liveUrl || project.liveDemoUrl) && (
              <a
                href={project.liveDemoUrl || project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded-lg bg-[#00d4ff]/10 hover:bg-[#00d4ff]/20 text-[#00d4ff] border border-[#00d4ff]/20 transition-colors cursor-pointer"
                title="Open Live Web Application"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default ProjectCard;
