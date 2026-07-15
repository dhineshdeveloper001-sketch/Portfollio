document.addEventListener('DOMContentLoaded', async () => {
  // Hardware & Battery detection
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isLowEnd = (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
                   (navigator.connection && (navigator.connection.saveData || navigator.connection.effectiveType.includes('2g')));

  // 1. Dynamic Imports for Code Splitting
  const [
    { gsap },
    { ScrollTrigger }
  ] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger')
  ]);

  gsap.registerPlugin(ScrollTrigger);

  // Make gsap globally available for the functions below
  window.gsap = gsap;
  window.ScrollTrigger = ScrollTrigger;

  // 2. Initialize critical features
  if (!prefersReducedMotion) {
    initHeroEntrance();
  } else {
    // Fallback if reduced motion is enabled
    document.querySelectorAll('.hero-eyebrow, .name-line, .hero-descriptor, .hero-actions, .hero-stats, .scroll-indicator').forEach(el => {
      el.style.opacity = 1;
      el.style.transform = 'none';
    });
  }

  // 3. Idle Loading for non-critical features
  const requestIdle = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));
  
  requestIdle(() => {
    initScrollAnimations(isLowEnd);
    initStatCounters();
    initContactForm();
    initMagneticButtons(isLowEnd);
  });
});


/* ==========================================================================
   HERO ENTRANCE
   ========================================================================== */
function initHeroEntrance() {
  const tl = window.gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.fromTo('.hero-eyebrow', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.8 }, 0.2)
    .fromTo('.name-line', { opacity: 0, y: 100, rotateX: -45 }, { opacity: 1, y: 0, rotateX: 0, duration: 1.2, stagger: 0.15 }, 0.4)
    .fromTo('.hero-descriptor', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, 0.9)
    .fromTo('.hero-actions', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 1.1)
    .fromTo('.hero-stats', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 1.3)
    .fromTo('.scroll-indicator', { opacity: 0 }, { opacity: 1, duration: 1 }, 1.8);
}

/* ==========================================================================
   SCROLL ANIMATIONS
   ========================================================================== */
function initScrollAnimations(isLowEnd) {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  const navLinks = document.querySelectorAll('.nav-link');
  const indicator = document.querySelector('.nav-indicator');

  function updateNavIndicator(activeLink) {
    if (!activeLink || !indicator) return;
    const linkRect = activeLink.getBoundingClientRect();
    const pillRect = activeLink.closest('.nav-pill').getBoundingClientRect();
    indicator.style.width  = linkRect.width  + 'px';
    indicator.style.left   = (linkRect.left - pillRect.left) + 'px';
  }

  // Observe sections
  const sections = document.querySelectorAll('section[data-nav]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('data-nav');
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[data-section="${id}"]`);
        if (active) {
          active.classList.add('active');
          updateNavIndicator(active);
        }
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));

  // Nav link clicks
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const href = link.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        const st = ScrollTrigger.getAll().find(t => t.vars.trigger === target || t.vars.trigger === href.substring(1));
        if (st) {
          window.scrollTo({ top: st.start, behavior: 'smooth' });
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  setTimeout(() => {
    const activeLink = document.querySelector('.nav-link.active');
    updateNavIndicator(activeLink);
  }, 200);

  // About section reveal
  gsap.fromTo('.about-statement', { opacity: 0, y: 40 }, {
    opacity: 1, y: 0, duration: 1,
    scrollTrigger: { trigger: '.about-section', start: 'top 70%' }
  });
  gsap.fromTo('.about-bio', { opacity: 0, y: 30 }, {
    opacity: 1, y: 0, duration: 0.8, stagger: 0.2,
    scrollTrigger: { trigger: '.about-section', start: 'top 60%' }
  });
  gsap.fromTo('.quality-item', { opacity: 0, x: -20 }, {
    opacity: 1, x: 0, duration: 0.7, stagger: 0.15,
    scrollTrigger: { trigger: '.about-section', start: 'top 55%' }
  });

  // Projects horizontal scroll
  gsap.matchMedia().add('(min-width: 769px)', () => {
    const track = document.getElementById('projects-track');
    if (!track) return;

    const progressFill = document.getElementById('projects-progress-fill');
    const counterEl    = document.getElementById('projects-current');

    const projectsTween = gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: '.projects-section',
        pin: true,
        scrub: 0.6,
        start: 'top top',
        end: () => `+=${(track.scrollWidth - window.innerWidth) * 0.8}`,
        invalidateOnRefresh: true,
        onUpdate: self => {
          if (progressFill) progressFill.style.width = (self.progress * 100) + '%';
          if (counterEl) {
            const idx = Math.min(7, Math.ceil(self.progress * 7) || 1);
            counterEl.textContent = String(idx).padStart(2, '0');
          }
        }
      }
    });

    // Slide content entrance animations
    const slides = document.querySelectorAll('.project-slide');
    slides.forEach((slide, i) => {
      const info   = slide.querySelector('.project-info');
      const visual = slide.querySelector('.project-visual');
      gsap.fromTo(info,   { opacity: 0, x: -40 }, {
        opacity: 1, x: 0, duration: 0.7,
        scrollTrigger: { containerAnimation: projectsTween, trigger: slide, start: 'left 80%' }
      });
      gsap.fromTo(visual, { opacity: 0, x: 40 }, {
        opacity: 1, x: 0, duration: 0.7,
        scrollTrigger: { containerAnimation: projectsTween, trigger: slide, start: 'left 80%' }
      });
    });
  });

  // Stack section
  gsap.fromTo('.stack-header', { opacity: 0, y: 30 }, {
    opacity: 1, y: 0, duration: 0.9,
    scrollTrigger: { trigger: '.stack-section', start: 'top 70%' }
  });

  // Contact section
  gsap.fromTo('.contact-title', { opacity: 0, y: 40 }, {
    opacity: 1, y: 0, duration: 1,
    scrollTrigger: { trigger: '.contact-section', start: 'top 70%' }
  });
  gsap.fromTo('.form-group', { opacity: 0, y: 20 }, {
    opacity: 1, y: 0, duration: 0.6, stagger: 0.1,
    scrollTrigger: { trigger: '.contact-form', start: 'top 80%' }
  });
}

/* ==========================================================================
   STAT COUNTERS
   ========================================================================== */
function initStatCounters() {
  const gsap = window.gsap;
  const stats = document.querySelectorAll('.stat-number');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el  = entry.target;
        const end = parseInt(el.dataset.count, 10);
        gsap.fromTo(el, { textContent: 0 }, {
          textContent: end,
          duration: 1.5,
          ease: 'power2.out',
          snap: { textContent: 1 }
        });
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(s => observer.observe(s));
}

/* ==========================================================================
   CONTACT FORM
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = document.getElementById('btn-submit');
    const text = btn.querySelector('.btn-text');
    const icon = btn.querySelector('.btn-icon');

    // Loading state
    text.textContent = 'Sending...';
    icon.textContent = '⏳';
    btn.style.opacity = '0.8';
    btn.style.pointerEvents = 'none';

    // Prepare data for Web3Forms
    const formData = new FormData(form);
    
    // Web3Forms Access Key
    formData.append("access_key", "98cd4dcd-30b0-49b9-b0ff-f65fa23ec55e");
    // Send email to the email specified in the HTML (dhineshdeveloper001@gmail.com)
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        gsap.to(btn, { scale: 0.96, duration: 0.1, yoyo: true, repeat: 1 });
        text.textContent = 'Sent Successfully!';
        icon.textContent = '✓';
        btn.style.background = 'linear-gradient(135deg, #16a34a, #15803d)';
        btn.style.opacity = '1';

        // Ripple pulse
        const ripple = document.createElement('div');
        ripple.className = 'lm-ripple';
        ripple.style.cssText = `left:${btn.getBoundingClientRect().left + btn.offsetWidth/2}px;top:${btn.getBoundingClientRect().top + btn.offsetHeight/2}px;width:80px;height:80px;`;
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 700);

        setTimeout(() => {
          text.textContent = 'Send Message';
          icon.textContent = '→';
          btn.style.background = '';
          btn.style.pointerEvents = 'auto';
          form.reset();
        }, 3000);
      } else {
        throw new Error(data.message || 'Failed to send');
      }
    } catch (error) {
      console.error("Mail Error:", error);
      text.textContent = 'Error Sending';
      icon.textContent = '✖';
      btn.style.background = 'linear-gradient(135deg, #dc2626, #b91c1c)';
      btn.style.opacity = '1';
      
      setTimeout(() => {
        text.textContent = 'Send Message';
        icon.textContent = '→';
        btn.style.background = '';
        btn.style.pointerEvents = 'auto';
      }, 3000);
    }
  });
}

/* ==========================================================================
   MAGNETIC BUTTONS
   ========================================================================== */
function initMagneticButtons(isLowEnd) {
  if (isLowEnd || window.matchMedia('(pointer: coarse)').matches) return;
  
  const gsap = window.gsap;
  
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width  / 2);
      const dy = e.clientY - (rect.top  + rect.height / 2);
      gsap.to(el, { x: dx * 0.28, y: dy * 0.28, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
    }, { passive: true });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)', overwrite: 'auto' });
    }, { passive: true });
  });
}
