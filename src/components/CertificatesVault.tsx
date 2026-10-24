import React, { useState } from "react";
import { certificates, CertificateItem } from "../data/portfolioData";
import { CredentialInspectionModal } from "./CredentialInspectionModal";
import { sound } from "../utils/soundEngine";
import { ExternalLink } from "lucide-react";

export function CertificatesVault() {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  const handleSelect = (cert: CertificateItem) => {
    sound.click();
    setSelectedCert(cert);
  };

  return (
    <section
      id="credentials"
      className="relative max-w-6xl mx-auto px-6 md:px-10 py-14 md:py-20"
    >
      <div className="w-full flex flex-col">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-sm font-semibold text-[#FF1E1E]">
            // 06 — CREDENTIALS
          </span>
          <span className="w-8 h-[1px] bg-[#FF1E1E]/40" />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
          The Vault &amp; Verified Certifications
        </h2>
        <p className="font-mono text-xs text-[#94A3B8] mb-8">
          Click any credential to inspect verification proof &amp; metadata.
        </p>

        {/* 2-Column Grid Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certificates.map((cert) => (
            <button
              key={cert.index}
              onClick={() => handleSelect(cert)}
              className="glass-panel p-4 md:p-5 rounded-xl border border-white/10 hover:border-[#FF1E1E]/60 text-left transition-all duration-200 group flex items-center justify-between shadow-lg hover:shadow-[0_0_20px_rgba(255,30,30,0.25)] hover:scale-[1.01]"
            >
              <div className="flex items-center gap-3.5 overflow-hidden pr-2">
                <span className="font-mono text-xs text-[#FF1E1E] font-bold">
                  {cert.index}
                </span>
                <div className="flex flex-col truncate">
                  <span className="font-ui font-semibold text-sm text-white group-hover:text-[#FF1E1E] transition-colors truncate">
                    {cert.title}
                  </span>
                  <span className="font-mono text-[11px] text-[#94A3B8] truncate">
                    {cert.category}
                  </span>
                </div>
              </div>

              <div className="p-2 rounded bg-white/5 group-hover:bg-[#FF1E1E]/20 text-[#64748B] group-hover:text-[#FF1E1E] transition-colors shrink-0">
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </button>
          ))}
        </div>
      </div>

      <CredentialInspectionModal
        cert={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
}
