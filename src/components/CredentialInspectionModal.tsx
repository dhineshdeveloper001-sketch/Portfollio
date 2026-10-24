import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Award, FileCode } from "lucide-react";
import { CertificateItem } from "../data/portfolioData";
import { sound } from "../utils/soundEngine";

interface CredentialModalProps {
  cert: CertificateItem | null;
  onClose: () => void;
}

export function CredentialInspectionModal({ cert, onClose }: CredentialModalProps) {
  const [hasImage, setHasImage] = useState<boolean | null>(null);

  useEffect(() => {
    if (!cert) return;

    const imgPath = `/certificates/${cert.slug}.jpg`;
    let active = true;

    fetch(imgPath, { method: "HEAD" })
      .then((res) => {
        if (active) setHasImage(res.ok);
      })
      .catch(() => {
        if (active) setHasImage(false);
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
  }, [cert, onClose]);

  if (!cert) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ duration: 0.25 }}
          className="glass-panel w-full max-w-2xl rounded-2xl border border-white/15 p-6 md:p-8 shadow-2xl relative flex flex-col gap-6"
          role="dialog"
          aria-modal="true"
        >
          {/* Close Button */}
          <button
            onClick={() => {
              sound.click();
              onClose();
            }}
            aria-label="Close Inspection Modal"
            className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Metadata */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs text-[#FF1E1E] font-semibold">
                CERTIFICATE #{cert.index}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
                <CheckCircle2 className="w-3 h-3" />
                VERIFIED CREDENTIAL
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              {cert.title}
            </h3>
            <p className="font-mono text-xs text-[#94A3B8] mt-1">
              Category: <span className="text-[#F8FAFC]">{cert.category}</span>
            </p>
            <p className="font-mono text-xs text-[#64748B]">
              Issuing Authority: <span className="text-[#94A3B8]">{cert.issuer}</span>
            </p>
          </div>

          {/* Certificate Preview Frame */}
          <div className="w-full min-h-[220px] rounded-xl bg-black/60 border border-white/10 flex flex-col items-center justify-center p-6 text-center">
            {hasImage ? (
              <img
                src={`/certificates/${cert.slug}.jpg`}
                alt={cert.title}
                className="max-h-72 w-auto object-contain rounded border border-white/10"
              />
            ) : (
              // High-fidelity vector credential placeholder
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#FF1E1E]/10 border border-[#FF1E1E]/40 flex items-center justify-center text-[#FF1E1E]">
                  <Award className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                    {cert.title}
                  </h4>
                  <p className="font-mono text-xs text-[#64748B] mt-1">
                    Verified Competency Document
                  </p>
                </div>
                <div className="mt-2 px-3 py-1.5 rounded bg-white/5 border border-dashed border-white/20 font-mono text-[11px] text-[#94A3B8] flex items-center gap-2">
                  <FileCode className="w-3.5 h-3.5 text-[#FF1E1E]" />
                  <span>Drop: public/certificates/{cert.slug}.jpg</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end pt-2 border-t border-white/5 font-mono text-xs text-[#64748B]">
            Press ESC or click close
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
