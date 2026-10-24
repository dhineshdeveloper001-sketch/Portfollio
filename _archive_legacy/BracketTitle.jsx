import React from 'react';

/**
 * Clean Section Header
 * Minimalist typography hierarchy:
 * - Small uppercase section label
 * - Controlled, bold section title
 */
const BracketTitle = ({
  children,
  className = '',
  as: Component = 'h2',
  subtitle = null,
  center = false
}) => {
  return (
    <div className={`flex flex-col ${center ? 'items-center text-center' : 'items-start'} space-y-1.5`}>
      {subtitle && (
        <span className="text-[0.7rem] font-mono font-semibold tracking-widest text-[#ff1e42] uppercase select-none">
          {subtitle}
        </span>
      )}

      <Component className={`font-display text-2xl sm:text-3xl font-bold tracking-tight text-white ${className}`}>
        {children}
      </Component>
    </div>
  );
};

export default React.memo(BracketTitle);
