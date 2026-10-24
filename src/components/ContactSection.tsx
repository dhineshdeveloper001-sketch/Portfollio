import React, { useState } from "react";
import { Mail, Phone, Code2, Copy, FileText, Check } from "lucide-react";
import { Github } from "./GithubIcon";
import { identity } from "../data/portfolioData";
import { showToast } from "./Toast";
import { sound } from "../utils/soundEngine";
import { ResumeManagerModal } from "./ResumeManagerModal";

export function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  const copyEmail = () => {
    sound.click();
    navigator.clipboard.writeText(identity.email);
    setCopiedEmail(true);
    showToast("Email copied to clipboard!");
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    sound.click();
    navigator.clipboard.writeText(identity.phone);
    setCopiedPhone(true);
    showToast("Phone number copied to clipboard!");
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section
      id="contact"
      className="min-h-screen relative flex flex-col justify-between max-w-6xl mx-auto px-6 md:px-10 py-14 md:py-20"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center my-auto">
        {/* Left Column Header */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-sm font-semibold text-[#FF1E1E]">
              // 08 — SIGNAL
            </span>
            <span className="w-8 h-[1px] bg-[#FF1E1E]/40" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-ui">
            Let's build something.
          </h2>
          <p className="mt-4 text-base md:text-lg text-[#94A3B8] font-ui leading-relaxed">
            Direct channel open for software engineering opportunities, Java Spring Boot backend roles, full stack engineering, and technical collaborations.
          </p>

          {/* Resume Trigger CTA */}
          <div className="mt-6">
            <button
              onClick={() => {
                sound.click();
                setResumeOpen(true);
              }}
              className="px-6 py-3 rounded-full bg-[#FF1E1E] hover:bg-[#DC2626] text-white font-mono text-xs font-semibold tracking-wider flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(255,30,30,0.4)] hover:scale-105"
            >
              <FileText className="w-4 h-4" />
              <span>Preview Resume</span>
            </button>
          </div>
        </div>

        {/* Right Column: Direct Communication Hub */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          {/* Email Copy Card */}
          <div className="glass-panel p-5 rounded-xl border border-white/10 flex items-center justify-between group hover:border-[#FF1E1E]/50 transition-colors">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-lg bg-[#FF1E1E]/10 border border-[#FF1E1E]/30 text-[#FF1E1E]">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider">
                  DIRECT EMAIL
                </span>
                <div className="text-sm md:text-base font-mono font-medium text-white">
                  {identity.email}
                </div>
              </div>
            </div>
            <button
              onClick={copyEmail}
              aria-label="Copy email address"
              className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
              {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Phone Copy Card */}
          <div className="glass-panel p-5 rounded-xl border border-white/10 flex items-center justify-between group hover:border-[#FF1E1E]/50 transition-colors">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-lg bg-[#FF1E1E]/10 border border-[#FF1E1E]/30 text-[#FF1E1E]">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider">
                  VOICE / WHATSAPP
                </span>
                <div className="text-sm md:text-base font-mono font-medium text-white">
                  {identity.phone}
                </div>
              </div>
            </div>
            <button
              onClick={copyPhone}
              aria-label="Copy phone number"
              className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
              {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* External Links Grid (GitHub & LeetCode) */}
          <div className="grid grid-cols-2 gap-4">
            <a
              href={identity.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel p-4 rounded-xl border border-white/10 hover:border-[#FF1E1E]/60 transition-all flex items-center gap-3 group"
            >
              <Github className="w-5 h-5 text-[#FF1E1E] group-hover:scale-110 transition-transform" />
              <div className="flex flex-col truncate">
                <span className="text-xs font-bold text-white">GitHub</span>
                <span className="text-[10px] font-mono text-[#64748B] truncate">
                  {identity.github.handle}
                </span>
              </div>
            </a>

            <a
              href={identity.leetcode.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel p-4 rounded-xl border border-white/10 hover:border-[#FF1E1E]/60 transition-all flex items-center gap-3 group"
            >
              <Code2 className="w-5 h-5 text-[#FF1E1E] group-hover:scale-110 transition-transform" />
              <div className="flex flex-col truncate">
                <span className="text-xs font-bold text-white">LeetCode</span>
                <span className="text-[10px] font-mono text-[#64748B] truncate">
                  {identity.leetcode.handle}
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Credit Roll & Directed By Section */}
      <div className="w-full pt-16 border-t border-white/5 flex flex-col items-center text-center font-mono text-xs gap-3">
        <div className="text-[#94A3B8] tracking-widest uppercase text-[11px]">
          DIRECTOR'S CUT CREDITS
        </div>
        <p className="text-[#CBD5E1]">
          Written, built, and directed by <span className="text-white font-bold">{identity.fullName}</span>
        </p>
        <p className="text-[#64748B] text-[11px]">
          Built with React · Tailwind CSS · Framer Motion · Three.js · Vite · Lucide
        </p>
      </div>

      <ResumeManagerModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </section>
  );
}
