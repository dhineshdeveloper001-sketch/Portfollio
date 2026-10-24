import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { Code2, Mail, Phone, Download, Check, ArrowRight, Terminal, Copy } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/soundEffects';

const Hero = () => {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleDownloadResume = (e) => {
    e.preventDefault();
    playClickSound();
    setDownloading(true);

    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '/resume.pdf';
      link.download = 'Dhineshkumar_J_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloading(false);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2500);
    }, 400);
  };

  const handleCopyEmail = () => {
    playClickSound();
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    playClickSound();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full relative py-6 sm:py-10 font-body">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Primary Identity & CTAs (7 Cols) */}
        <div className="lg:col-span-7 space-y-5 text-left">
          
          {/* Subtle Status Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 text-emerald-400 text-xs font-mono font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available for Full Stack & GenAI Roles</span>
          </div>

          {/* Name & Headline */}
          <div className="space-y-1.5">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-display">
              Dhineshkumar <span className="text-[#ff1e42]">J</span>
            </h1>
            <p className="text-base sm:text-lg font-medium text-slate-300 font-display">
              Full Stack Developer & GenAI Engineer
            </p>
          </div>

          {/* Brief Bio */}
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg leading-relaxed">
            Specialized in building high-throughput <span className="text-slate-200 font-medium">Java Spring Boot</span> backends, responsive <span className="text-slate-200 font-medium">React</span> frontends, and intelligent <span className="text-slate-200 font-medium">GenAI workflows</span> with production reliability.
          </p>

          {/* Clean Tech Stack Line (Simple text with dot separators) */}
          <div className="text-xs font-mono text-slate-400 pt-1">
            <span className="text-slate-500 mr-2">Core Stack:</span>
            <span className="text-slate-300">Java 21 · Spring Boot 3.2 · React 19 · MySQL · PostgreSQL · GenAI</span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleDownloadResume}
              onMouseEnter={playHoverSound}
              aria-label="Download Resume"
              className="btn-primary px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl"
            >
              {downloading ? (
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-t-transparent border-white rounded-full animate-spin" />
                  <span>Downloading...</span>
                </span>
              ) : downloaded ? (
                <span className="flex items-center gap-2 text-white">
                  <Check className="w-4 h-4 text-white" />
                  <span>Downloaded!</span>
                </span>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Resume</span>
                </>
              )}
            </button>

            <a
              href="#projects"
              onClick={(e) => handleScrollTo(e, '#projects')}
              onMouseEnter={playHoverSound}
              className="btn-secondary px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4 text-[#00d4ff]" />
            </a>

            <button
              onClick={handleCopyEmail}
              onMouseEnter={playHoverSound}
              className="btn-secondary px-3.5 py-2.5 text-xs font-mono text-slate-300 hover:text-white rounded-xl"
              title="Copy Email"
            >
              {copiedEmail ? (
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Email</span>
                </span>
              )}
            </button>
          </div>

          {/* Clean Social Handles */}
          <div className="flex items-center gap-2 pt-1">
            {[
              { id: 'github', url: personalInfo.github, icon: <Code2 className="w-4 h-4" />, label: 'GitHub' },
              { id: 'leetcode', url: personalInfo.leetcode, icon: <Terminal className="w-4 h-4" />, label: 'LeetCode' },
              { id: 'email', url: `mailto:${personalInfo.email}`, icon: <Mail className="w-4 h-4" />, label: 'Email' },
              { id: 'phone', url: `tel:${personalInfo.phone.replace(/\s+/g, '')}`, icon: <Phone className="w-4 h-4" />, label: 'Call' }
            ].map((social) => (
              <a
                key={social.id}
                href={social.url}
                target={social.url.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                aria-label={social.label}
                onMouseEnter={playHoverSound}
                className="p-2 rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-300 hover:text-[#00d4ff] hover:border-[#00d4ff]/40 hover:bg-[#00d4ff]/10 transition-all flex items-center justify-center cursor-pointer"
                title={social.label}
              >
                {social.icon}
              </a>
            ))}
            <span className="text-xs font-mono text-slate-500 pl-2">
              Srirangam, Tamil Nadu
            </span>
          </div>

        </div>

        {/* Right Column: Clean Telemetry Panel (5 Cols) */}
        <div className="lg:col-span-5">
          <div className="glass-card p-5 sm:p-6 bg-[#0c0f17]/90 border-white/[0.1] rounded-2xl shadow-xl space-y-4">
            
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <span className="text-xs font-mono text-slate-400">Engineering Profile</span>
              <span className="text-[0.65rem] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
                PROD READY
              </span>
            </div>

            {/* Spec List */}
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                <span className="text-slate-400">Primary Core</span>
                <span className="text-white font-medium">Java 21 LTS</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                <span className="text-slate-400">Backend</span>
                <span className="text-slate-200">Spring Boot 3.2 REST</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                <span className="text-slate-400">Frontend</span>
                <span className="text-slate-200">React 19 & Tailwind</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                <span className="text-slate-400">Databases</span>
                <span className="text-slate-200">MySQL 8.0 · PostgreSQL</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Specialization</span>
                <span className="text-[#00d4ff] font-semibold">GenAI & Architecture</span>
              </div>
            </div>

            {/* Stat Counters */}
            <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-white/[0.06]">
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
                <span className="text-base sm:text-lg font-bold font-mono text-white block">8+</span>
                <span className="text-[0.62rem] font-mono text-slate-400 uppercase tracking-wider block">Projects</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
                <span className="text-base sm:text-lg font-bold font-mono text-white block">1 Mo</span>
                <span className="text-[0.62rem] font-mono text-slate-400 uppercase tracking-wider block">Internship</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
                <span className="text-base sm:text-lg font-bold font-mono text-[#00d4ff] block">7.76</span>
                <span className="text-[0.62rem] font-mono text-slate-400 uppercase tracking-wider block">CGPA</span>
              </div>
            </div>

            {/* University Tag */}
            <div className="pt-2 text-[0.7rem] font-mono text-slate-400 flex items-center justify-between border-t border-white/[0.06]">
              <span>Govt. College of Eng., Srirangam</span>
              <span className="text-slate-500">2023 - 2027</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default React.memo(Hero);
