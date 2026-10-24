import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, FileText, CheckCircle2 } from "lucide-react";
import { identity, education, experience, skills } from "../data/portfolioData";
import { sound } from "../utils/soundEngine";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeManagerModal({ isOpen, onClose }: ResumeModalProps) {
  const [pdfExists, setPdfExists] = useState<boolean | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    let active = true;
    fetch("/Dhineshkumar_J_Resume.pdf", { method: "HEAD" })
      .then((res) => {
        if (active) setPdfExists(res.ok);
      })
      .catch(() => {
        if (active) setPdfExists(false);
      });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        sound.click();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      active = false;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.25 }}
          className="glass-panel w-full max-w-3xl max-h-[85vh] rounded-2xl border border-white/15 p-6 md:p-8 shadow-2xl relative flex flex-col gap-6 overflow-hidden"
          role="dialog"
          aria-modal="true"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#FF1E1E]" />
              <h3 className="text-xl font-bold text-white tracking-tight font-ui">
                Resume Manager
              </h3>
            </div>

            <button
              onClick={() => {
                sound.click();
                onClose();
              }}
              aria-label="Close Resume Modal"
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="overflow-y-auto pr-2 space-y-6">
            {pdfExists ? (
              // Inline PDF frame if available
              <div className="w-full h-[500px] rounded-lg overflow-hidden border border-white/10 bg-black">
                <iframe
                  src="/Dhineshkumar_J_Resume.pdf"
                  title="Dhineshkumar J Resume"
                  className="w-full h-full"
                />
              </div>
            ) : (
              // Formatted Print-Ready Executive Resume Summary
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 font-mono text-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <div>
                    <h4 className="text-base font-bold text-white font-ui">
                      {identity.fullName}
                    </h4>
                    <p className="text-[#FF1E1E] mt-0.5">{identity.headline}</p>
                    <p className="text-[#64748B] mt-0.5">{identity.email} · {identity.phone}</p>
                  </div>
                  <div className="px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] w-fit">
                    EXECUTIVE SUMMARY PREVIEW
                  </div>
                </div>

                {/* Summary Statement */}
                <div>
                  <div className="text-[#FF1E1E] font-bold mb-1">// PROFESSIONAL PROFILE</div>
                  <p className="text-[#CBD5E1] font-ui text-xs leading-relaxed">
                    {identity.bio}
                  </p>
                </div>

                {/* Education */}
                <div>
                  <div className="text-[#FF1E1E] font-bold mb-1">// EDUCATION</div>
                  <div className="text-white font-semibold">{education.degree}</div>
                  <div className="text-[#94A3B8]">{education.college}</div>
                  <div className="text-[#64748B]">CGPA: {education.cgpa} / 10.0 · {education.graduation}</div>
                </div>

                {/* Experience */}
                <div>
                  <div className="text-[#FF1E1E] font-bold mb-1">// EXPERIENCE</div>
                  <div className="text-white font-semibold">{experience.role} — {experience.company} ({experience.duration})</div>
                  <ul className="list-disc list-inside text-[#CBD5E1] mt-1 space-y-1">
                    {experience.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>

                {/* Skills Summary */}
                <div>
                  <div className="text-[#FF1E1E] font-bold mb-1">// CORE ARSENAL</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#94A3B8]">
                    {skills.map((s) => (
                      <div key={s.index}>
                        <span className="text-white">{s.category}:</span> {s.items.join(" · ")}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fallback instruction banner */}
                <div className="p-3 rounded bg-white/5 border border-dashed border-white/20 text-[#94A3B8] text-[11px] text-center">
                  Drop <span className="text-white font-semibold">Dhineshkumar_J_Resume.pdf</span> into <span className="text-[#FF1E1E]">/public/</span> for auto-detected PDF preview.
                </div>
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            {pdfExists ? (
              <a
                href="/Dhineshkumar_J_Resume.pdf"
                download="Dhineshkumar_J_Resume.pdf"
                className="px-5 py-2.5 rounded-lg bg-[#FF1E1E] hover:bg-[#DC2626] text-white font-mono text-xs flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(255,30,30,0.4)]"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume PDF</span>
              </a>
            ) : (
              <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-[#64748B] font-mono text-xs">
                Download Resume (Coming Soon)
              </div>
            )}

            <button
              onClick={() => {
                sound.click();
                onClose();
              }}
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white font-mono text-xs transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
