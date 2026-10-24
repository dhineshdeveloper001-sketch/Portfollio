import React, { useState } from 'react';
import BracketTitle from './BracketTitle';
import { playClickSound, playHoverSound } from '../utils/soundEffects';

const BUILD_STAGES = [
  {
    step: '01',
    title: 'Domain & Constraint Analysis',
    principle: 'Isolate user requirements, operational cutoffs, and data invariants before writing code.',
    appliedProject: 'Hostel meal cutoff rules in Mess Reduction System'
  },
  {
    step: '02',
    title: 'System & Architecture Blueprint',
    principle: 'Decouple 3-tier layering (Controller ➔ Service ➔ Repository ➔ DTO) with standard REST contracts.',
    appliedProject: 'Stateless REST Gateway in Billing Software'
  },
  {
    step: '03',
    title: 'Normalized Schema & ACID Invariants',
    principle: 'Design normalized tables in MySQL/PostgreSQL ensuring transactional integrity under concurrent requests.',
    appliedProject: 'Double-entry debit/credit tables in LedgerFlow Pro'
  },
  {
    step: '04',
    title: 'Backend & Security Implementation',
    principle: 'Construct Spring Boot microservices with Spring Data JPA and stateless JWT authentication filters.',
    appliedProject: 'Role-based endpoint protection in Gatekeeper Auth'
  },
  {
    step: '05',
    title: 'Reactive Frontend Engineering',
    principle: 'Develop responsive React single-page interfaces with custom hooks and resilient API state.',
    appliedProject: 'Real-time billing calculator & ScholarLink Hub portal'
  },
  {
    step: '06',
    title: 'Build Optimization & Cloud Release',
    principle: 'Optimize production bundles (Brotli compression, WebP assets) with verified automated releases.',
    appliedProject: 'Production deployments on Vercel'
  }
];

const HowIBuild = () => {
  const [activeStep, setActiveStep] = useState(0);
  const currentStage = BUILD_STAGES[activeStep];

  return (
    <div className="w-full space-y-8 font-body">
      {/* Section Header */}
      <div className="space-y-2">
        <BracketTitle subtitle="Engineering Methodology & Architecture Flow">
          How I Build Software
        </BracketTitle>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
          A disciplined, end-to-end development approach taking systems from business constraints to reliable production release.
        </p>
      </div>

      {/* Clean Stepper Strip (Minimal Tabs) */}
      <div className="pt-2 border-t border-white/[0.08]">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {BUILD_STAGES.map((st, idx) => {
            const isSelected = activeStep === idx;
            return (
              <button
                key={st.step}
                onClick={() => {
                  playClickSound();
                  setActiveStep(idx);
                }}
                onMouseEnter={playHoverSound}
                className={`py-2 px-3 rounded-lg text-left transition-all duration-150 cursor-pointer border ${
                  isSelected
                    ? 'border-[#ff1e42] bg-white/[0.06] text-white'
                    : 'border-white/[0.06] bg-transparent text-slate-400 hover:text-white hover:border-white/[0.12]'
                }`}
              >
                <span className={`text-[0.68rem] font-mono block font-bold ${
                  isSelected ? 'text-[#ff1e42]' : 'text-slate-500'
                }`}>
                  {st.step}
                </span>
                <span className="text-xs font-medium block truncate">
                  {st.title.split(' ')[0]} {st.title.split(' ')[1] || ''}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detail (Clean, uncluttered) */}
        <div className="mt-6 p-6 rounded-2xl border border-white/[0.08] bg-[#0c0e14]/60 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
            <h3 className="text-base sm:text-lg font-bold text-white font-display">
              Stage {currentStage.step}: {currentStage.title}
            </h3>
            <span className="text-xs font-mono text-slate-400">
              Applied in: <span className="text-slate-200">{currentStage.appliedProject}</span>
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-body">
            {currentStage.principle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(HowIBuild);
