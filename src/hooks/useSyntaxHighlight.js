import { useEffect } from 'react';

export const useSyntaxHighlight = (containerRef) => {
  useEffect(() => {
    if (!containerRef.current) return;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const el = containerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targets = el.querySelectorAll('.electric-card, .font-display, button');
            targets.forEach((target, index) => {
              setTimeout(() => {
                target.classList.add('syntax-flash-active');
                setTimeout(() => {
                  target.classList.remove('syntax-flash-active');
                }, 850);
              }, index * 70);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [containerRef]);
};

export default useSyntaxHighlight;
