/* ==========================================================================
   Portfolio — interactions (sobres et institutionnelles)
   ========================================================================== */
(function () {
    'use strict';

    // ----- Mobile nav -----
    const navToggle = document.getElementById('navToggle');
    const primaryNav = document.querySelector('.primary-nav');
    if (navToggle && primaryNav) {
        navToggle.addEventListener('click', () => {
            const isOpen = primaryNav.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });
        // Close menu when clicking a link
        primaryNav.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                primaryNav.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ----- Active section in nav (scroll spy) -----
    const navLinks = document.querySelectorAll('.primary-nav a[href^="#"]');
    const sections = Array.from(navLinks)
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    if (sections.length && 'IntersectionObserver' in window) {
        const spy = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                    });
                }
            });
        }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

        sections.forEach(s => spy.observe(s));
    }

    // ----- Back to top -----
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        const toggleBackToTop = () => {
            if (window.scrollY > 600) backToTop.classList.add('visible');
            else backToTop.classList.remove('visible');
        };
        window.addEventListener('scroll', toggleBackToTop, { passive: true });
        toggleBackToTop();
    }

    // ----- Reveal on scroll (subtil, sans clinquant) -----
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion && 'IntersectionObserver' in window) {
        const revealTargets = document.querySelectorAll(
            '.hero-text, .hero-portrait, .about-prose, .about-facts, ' +
            '.domain-card, .skill-cluster, .t-item, .project, .ref-card, ' +
            '.contact-info, .contact-form, .section-head'
        );
        revealTargets.forEach((el, i) => {
            el.classList.add('reveal');
            // léger délai en cascade
            el.style.transitionDelay = ((i % 6) * 60) + 'ms';
        });

        const revealObs = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        revealTargets.forEach(el => revealObs.observe(el));
    }

    // ----- Year stamp (footer auto) -----
    const yearEl = document.querySelector('[data-year]');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

})();
