import React from 'react';
import BracketTitle from './BracketTitle';

const SKILL_GROUPS = [
  {
    category: 'Languages',
    skills: ['Java 21 LTS', 'Python', 'JavaScript (ES6+)', 'C']
  },
  {
    category: 'Backend',
    skills: ['Spring Boot 3.2', 'RESTful APIs', 'Spring Data JPA', 'Hibernate ORM']
  },
  {
    category: 'Frontend',
    skills: ['React 19', 'HTML5', 'Modern CSS3', 'Tailwind CSS']
  },
  {
    category: 'Databases',
    skills: ['MySQL 8.0', 'PostgreSQL 16']
  },
  {
    category: 'AI & Developer Tools',
    skills: ['GenAI Workflows', 'Git & GitHub', 'Docker (Basics)', 'Vite']
  }
];

const Skills = () => {
  return (
    <div className="w-full space-y-8 font-body">
      {/* Section Header */}
      <div className="space-y-2">
        <BracketTitle subtitle="Technical Competencies & Tools">
          Skills & Technologies
        </BracketTitle>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
          A focused stack centered on robust Java Spring Boot backends, modern React user interfaces, and relational databases.
        </p>
      </div>

      {/* Clean Typographic Presentation (Zero Cards) */}
      <div className="space-y-6 pt-2 border-t border-white/[0.08]">
        {SKILL_GROUPS.map((group, idx) => (
          <div
            key={group.category}
            className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-6 py-3 border-b border-white/[0.04] transition-colors hover:border-white/[0.12]"
          >
            {/* Category Name */}
            <h3 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-400 w-44 shrink-0 font-semibold">
              {group.category}
            </h3>

            {/* Separator-delimited Typography */}
            <div className="flex-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm sm:text-base text-slate-200">
              {group.skills.map((skill, sIdx) => (
                <React.Fragment key={skill}>
                  <span className="hover:text-white transition-colors cursor-default">
                    {skill}
                  </span>
                  {sIdx < group.skills.length - 1 && (
                    <span className="text-slate-600 select-none">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Skills);
