import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, X, ShieldCheck, CheckCircle } from "lucide-react";
import { certificates, CertificateItem } from "../data/portfolioData";
import { sound } from "../utils/sound";

export function Certificates() {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  const handleOpenModal = (cert: CertificateItem) => {
    sound.click();
    setSelectedCert(cert);
  };

  const handleCloseModal = () => {
    sound.click();
    setSelectedCert(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.section
      id="certificates"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="py-20 px-6 max-w-6xl mx-auto relative w-full"
    >
      {/* Section Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 font-mono text-xs text-[#E11D48] dark:text-[#FF1E1E] uppercase tracking-widest mb-2">
          <span className="h-px w-6 bg-[#E11D48] dark:bg-[#FF1E1E]" />
          <span>05 // CREDENTIALS & HONORS</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
            Certifications & Awards
          </h2>
          <p className="text-sm font-mono text-[#64748B]">
            Click any certificate to inspect credentials
          </p>
        </div>
      </div>

      {/* 2-Column List with Dual Theme Glass and Hover Red Glow */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {certificates.map((cert) => (
          <motion.div
            key={cert.index}
            variants={cardVariants}
            onClick={() => handleOpenModal(cert)}
            onMouseEnter={() => sound.hover()}
            className="p-5 rounded-2xl bg-white/80 dark:bg-[#0A0A0E]/90 backdrop-blur-xl border border-black/5 dark:border-white/10 hover:border-[#E11D48]/50 dark:hover:border-[#FF1E1E]/60 shadow-md dark:shadow-xl hover:shadow-[0_0_20px_rgba(225,29,72,0.2)] dark:hover:shadow-[0_0_20px_rgba(255,30,30,0.25)] transition-all duration-300 cursor-pointer group flex items-start justify-between gap-4"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 group-hover:bg-[#E11D48]/10 dark:group-hover:bg-[#FF1E1E]/10 group-hover:border-[#E11D48]/40 dark:group-hover:border-[#FF1E1E]/40 flex items-center justify-center shrink-0 transition-colors">
                <Award className="w-5 h-5 text-[#64748B] dark:text-[#94A3B8] group-hover:text-[#E11D48] dark:group-hover:text-[#FF1E1E] transition-colors" />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[11px] text-[#64748B] font-bold">
                    #{cert.index}
                  </span>
                  <span className="font-mono text-[10px] uppercase text-[#E11D48] dark:text-[#FF1E1E] font-semibold">
                    {cert.category}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0F172A] dark:text-white group-hover:text-[#E11D48] dark:group-hover:text-white transition-colors">
                  {cert.title}
                </h3>
                <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-0.5">
                  {cert.issuer}
                </p>
              </div>
            </div>

            <div className="text-xs font-mono text-[#64748B] group-hover:text-[#E11D48] dark:group-hover:text-[#FF1E1E] transition-colors self-center shrink-0 font-medium">
              Inspect →
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Credential Inspection Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0A0A0E] border border-black/10 dark:border-white/15 shadow-2xl z-10 space-y-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48] dark:bg-[#FF1E1E] shadow-[0_0_8px_#FF1E1E]" />
                  <span className="font-mono text-xs text-[#64748B] dark:text-[#94A3B8] font-semibold">
                    CREDENTIAL INSPECTION // {selectedCert.index}
                  </span>
                </div>

                <button
                  onClick={handleCloseModal}
                  className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#E11D48]/10 dark:bg-[#FF1E1E]/10 border border-[#E11D48]/40 dark:border-[#FF1E1E]/40 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6 text-[#E11D48] dark:text-[#FF1E1E]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0F172A] dark:text-white">
                      {selectedCert.title}
                    </h3>
                    <p className="text-xs font-mono text-[#E11D48] dark:text-[#FF1E1E] font-medium">
                      {selectedCert.category}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/[0.08] space-y-2.5 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">ISSUER AUTHORITY:</span>
                    <span className="text-[#0F172A] dark:text-white font-medium">{selectedCert.issuer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">CREDENTIAL SLUG:</span>
                    <span className="text-[#334155] dark:text-white/80">{selectedCert.slug}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#64748B]">STATUS:</span>
                    <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                      <CheckCircle className="w-3.5 h-3.5" />
                      ACADEMIC RECORD VERIFIED
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                  Certificate earned during undergraduate curriculum at Government College of
                  Engineering, Srirangam, representing verified subject proficiency and technical
                  competency.
                </p>
              </div>

              {/* Footer */}
              <div className="pt-2">
                <button
                  onClick={handleCloseModal}
                  className="w-full py-2.5 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-[#0F172A] dark:text-white font-mono text-xs transition-colors cursor-pointer border border-black/10 dark:border-white/10 font-medium"
                >
                  Close Inspection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
