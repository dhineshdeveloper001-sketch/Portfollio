import React from 'react';
import { motion } from 'framer-motion';
import { certificationsData } from '../data/portfolioData';
import BracketTitle from './BracketTitle';
import { Award, Briefcase, Cpu, Code2, GraduationCap, Layers, ShieldCheck, CheckCircle2 } from 'lucide-react';

const iconMap = {
  briefcase: <Briefcase className="w-4 h-4 text-[#ff0a2d]" />,
  cpu: <Cpu className="w-4 h-4 text-[#00d4ff]" />,
  code2: <Code2 className="w-4 h-4 text-[#f89820]" />,
  graduationCap: <GraduationCap className="w-4 h-4 text-[#6db33f]" />,
  layers: <Layers className="w-4 h-4 text-[#38bdf8]" />,
  shieldCheck: <ShieldCheck className="w-4 h-4 text-[#a855f7]" />,
  award: <Award className="w-4 h-4 text-[#e60023]" />
};

const Certifications = () => {
  return (
    <div className="w-full space-y-8 font-body">
      {/* Section Header */}
      <div className="space-y-3">
        <BracketTitle subtitle="Verified Credentials & Technical Recognitions" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
          Certifications & Badges
        </BracketTitle>
        <p className="text-sm sm:text-base text-white/70 max-w-2xl font-body leading-relaxed">
          Industry internship credentials, academic milestone, security fundamentals, and competitive technical event achievements.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {certificationsData.map((cert, idx) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45, delay: idx * 0.07 }}
            whileHover={{ y: -4, borderColor: 'rgba(255, 10, 45, 0.45)' }}
            className="electric-card p-5 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 space-y-3 flex flex-col justify-between shadow-lg transition-all duration-300 group hover:shadow-[0_10px_30px_rgba(255,10,45,0.15)]"
          >
            <div className="space-y-3">
              {/* Header Badge & Icon */}
              <div className="flex items-start justify-between gap-2">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:border-white/25 transition-colors">
                  {iconMap[cert.icon] || <Award className="w-4 h-4 text-[#ff0a2d]" />}
                </div>
                <span className="text-[0.65rem] font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/70 font-semibold">
                  {cert.period}
                </span>
              </div>

              {/* Title & Issuer */}
              <div className="space-y-1">
                <h4 className="font-bold text-sm sm:text-base text-white font-display group-hover:text-[#00d4ff] transition-colors leading-snug">
                  {cert.title}
                </h4>
                <p className="text-xs text-[#ff0a2d] font-mono font-medium">
                  {cert.issuer}
                </p>
              </div>

              <p className="text-xs text-white/65 font-body leading-relaxed">
                {cert.desc}
              </p>
            </div>

            {/* Bottom Category Tag */}
            <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-[0.68rem] font-mono text-white/50">
              <span>{cert.category}</span>
              <span className="text-[#00d4ff] font-semibold">{cert.badge}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Certifications);
