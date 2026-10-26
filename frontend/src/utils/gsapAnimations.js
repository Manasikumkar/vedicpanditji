import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Check if user prefers reduced motion
 */
export const isReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Standard subtle easing and timings
 */
export const ANIM_CONFIG = {
  duration: 0.5,
  fastDuration: 0.3,
  stagger: 0.08,
  subtleY: 18,
  smallY: 12,
  ease: 'power2.out',
  smoothEase: 'power3.out'
};

/**
 * Animate page entrance transition
 */
export const animatePageEntrance = (target) => {
  if (!target || isReducedMotion()) return null;

  return gsap.fromTo(
    target,
    { opacity: 0, y: ANIM_CONFIG.smallY },
    {
      opacity: 1,
      y: 0,
      duration: 0.45,
      ease: ANIM_CONFIG.ease,
      clearProps: 'transform'
    }
  );
};

/**
 * Animate Navbar on initial page load
 */
export const animateNavbarEntrance = (navbarElement) => {
  if (!navbarElement || isReducedMotion()) return null;

  return gsap.fromTo(
    navbarElement,
    { opacity: 0, y: -12 },
    {
      opacity: 1,
      y: 0,
      duration: 0.55,
      ease: ANIM_CONFIG.ease,
      clearProps: 'transform'
    }
  );
};

/**
 * Animate Hero section elements in a coordinated timeline
 */
export const animateHeroSection = (container) => {
  if (!container || isReducedMotion()) return null;

  const tl = gsap.timeline({ defaults: { ease: ANIM_CONFIG.ease } });

  // 1. Hero background subtle fade & soft depth
  const bg = container.querySelector('.hero-image-overlay');
  if (bg) {
    tl.fromTo(
      bg,
      { opacity: 0, scale: 1.03 },
      { opacity: 0.72, scale: 1, duration: 1.1, ease: 'power2.out' },
      0
    );
  }

  // 2. Trust badge
  const badge = container.querySelector('.hero-trust-badge');
  if (badge) {
    tl.fromTo(
      badge,
      { opacity: 0, y: ANIM_CONFIG.smallY },
      { opacity: 1, y: 0, duration: 0.45 },
      0.1
    );
  }

  // 3. Main title
  const title = container.querySelector('.hero-main-title');
  if (title) {
    tl.fromTo(
      title,
      { opacity: 0, y: ANIM_CONFIG.subtleY },
      { opacity: 1, y: 0, duration: 0.55 },
      0.2
    );
  }

  // 4. Subtitle / paragraph
  const desc = container.querySelector('.hero-desc');
  if (desc) {
    tl.fromTo(
      desc,
      { opacity: 0, y: ANIM_CONFIG.smallY },
      { opacity: 1, y: 0, duration: 0.5 },
      0.3
    );
  }

  // 5. CTA Buttons
  const ctas = container.querySelectorAll('.hero-cta-btn');
  if (ctas && ctas.length > 0) {
    tl.fromTo(
      ctas,
      { opacity: 0, y: ANIM_CONFIG.smallY },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, clearProps: 'transform' },
      0.4
    );
  }

  // 6. Trust Checklist items
  const trustItems = container.querySelectorAll('.hero-trust-item');
  if (trustItems && trustItems.length > 0) {
    tl.fromTo(
      trustItems,
      { opacity: 0, y: ANIM_CONFIG.smallY },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, clearProps: 'transform' },
      0.5
    );
  }

  // 7. Discovery Search Panel
  const panel = container.querySelector('.hero-search-panel');
  if (panel) {
    tl.fromTo(
      panel,
      { opacity: 0, y: ANIM_CONFIG.subtleY },
      { opacity: 1, y: 0, duration: 0.55, clearProps: 'transform' },
      0.55
    );
  }

  return tl;
};

/**
 * Attach ScrollTrigger reveals to cards and sections within a container
 */
export const initScrollReveals = (scopeRef) => {
  if (!scopeRef || isReducedMotion()) return () => {};

  const ctx = gsap.context(() => {
    // Reveal section headers
    const headers = scopeRef.querySelectorAll('.section-header');
    headers.forEach(header => {
      gsap.fromTo(
        header,
        { opacity: 0, y: ANIM_CONFIG.subtleY },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: ANIM_CONFIG.ease,
          scrollTrigger: {
            trigger: header,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Reveal card grids in staggered batches
    const cardGrids = scopeRef.querySelectorAll(
      '.grid-2, .grid-3, .grid-4, .counter-grid, .how-it-works-grid, .media-grid, .service-packages-grid, .materials-features-grid, .samagri-grid, .highlights-grid, .sitemap-grid'
    );
    cardGrids.forEach(grid => {
      const cards = Array.from(grid.children);
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: ANIM_CONFIG.subtleY },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: ANIM_CONFIG.stagger,
            ease: ANIM_CONFIG.ease,
            clearProps: 'transform',
            scrollTrigger: {
              trigger: grid,
              start: 'top 86%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    });

    // Standalone cards not already part of a recognized grid
    const standaloneCards = scopeRef.querySelectorAll(
      '.card-premium:not(.grid-2 > *):not(.grid-3 > *):not(.grid-4 > *):not(.counter-grid > *):not(.how-it-works-grid > *):not(.media-grid > *):not(.service-packages-grid > *)'
    );
    standaloneCards.forEach(card => {
      gsap.fromTo(
        card,
        { opacity: 0, y: ANIM_CONFIG.subtleY },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: ANIM_CONFIG.ease,
          clearProps: 'transform',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Gentle reveal for content images (excluding navbar logo)
    const contentImages = scopeRef.querySelectorAll('img:not(.vp-brand-logo-img)');
    contentImages.forEach(img => {
      // If image is inside an already-animated card, skip duplicate trigger
      if (img.closest('.card-premium')) return;
      gsap.fromTo(
        img,
        { opacity: 0.2 },
        {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: img,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }, scopeRef);

  return () => ctx.revert();
};

/**
 * Animate Booking Modal opening
 */
export const animateModalOpen = (backdropEl, modalEl) => {
  if (isReducedMotion()) return null;
  if (!backdropEl || !modalEl) return null;

  const tl = gsap.timeline();

  tl.fromTo(
    backdropEl,
    { opacity: 0 },
    { opacity: 1, duration: 0.28, ease: 'power2.out' }
  );

  tl.fromTo(
    modalEl,
    { opacity: 0, scale: 0.96, y: 16 },
    { opacity: 1, scale: 1, y: 0, duration: 0.32, ease: 'power2.out', clearProps: 'transform' },
    0.05
  );

  return tl;
};
