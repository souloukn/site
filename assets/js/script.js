/**
 * ====================================================================
 *  MODERN PORTFOLIO JAVASCRIPT
 *  Author: Mounkang Souloukna
 *  Version: 3.0 - Enhanced with Modern Features
 *  
 *  Features:
 *  - Smooth animations and transitions
 *  - Modern cursor effects
 *  - Theme switching
 *  - Advanced scroll effects
 *  - Typing animation
 *  - Intersection Observer API
 *  - Performance optimizations
 * ====================================================================
 */

class ModernPortfolio {
    constructor() {
        this.init();
    }

    async init() {
        // Initialize core functionality
        this.setupEventListeners();
        this.initLoading();
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
        } else {
            this.onDOMReady();
        }
    }

    onDOMReady() {
        // Initialize all components
        this.initTheme();
        this.initNavigation();
        this.initCursor();
        this.initTypingAnimation();
        this.initScrollAnimations();
        this.initCounters();
        this.initSkillBars();
        this.initFilters();
        this.initContactForm();
        this.initSmoothScrolling();
        this.initBackToTop();
        this.initParallax();
        this.initNewsletterForm();
        
        // Initialize AOS (Animate On Scroll)
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-out-cubic',
                once: true,
                offset: 100,
                delay: 0,
            });
        }

        console.log('🚀 Modern Portfolio initialized successfully!');
    }

    setupEventListeners() {
        // Throttled scroll handler
        this.handleScroll = this.throttle(this.onScroll.bind(this), 16);
        window.addEventListener('scroll', this.handleScroll, { passive: true });
        
        // Resize handler
        this.handleResize = this.debounce(this.onResize.bind(this), 250);
        window.addEventListener('resize', this.handleResize, { passive: true });
        
        // Mouse move for cursor
        document.addEventListener('mousemove', this.onMouseMove.bind(this), { passive: true });
        
        // Keyboard navigation
        document.addEventListener('keydown', this.onKeyDown.bind(this));
    }

    // ====================================================================
    // LOADING SCREEN
    // ====================================================================
    initLoading() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (!loadingScreen) return;

        // Simulate loading progress
        const progressBar = loadingScreen.querySelector('.loading-progress');
        let progress = 0;
        
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setTimeout(() => this.hideLoading(), 500);
            }
            if (progressBar) {
                progressBar.style.width = `${progress}%`;
            }
        }, 100);
    }

    hideLoading() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }

    // ====================================================================
    // THEME SYSTEM
    // ====================================================================
    initTheme() {
        this.themeToggle = document.getElementById('themeToggle');
        if (!this.themeToggle) return;

        // Load saved theme
        const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
        this.setTheme(savedTheme);

        // Theme toggle event
        this.themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            this.setTheme(newTheme);
        });
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
        
        if (this.themeToggle) {
            const icon = this.themeToggle.querySelector('i');
            if (icon) {
                icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            }
        }

        // Update theme color meta tag
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) {
            metaTheme.content = theme === 'light' ? '#ffffff' : '#111827';
        }
    }

    // ====================================================================
    // NAVIGATION
    // ====================================================================
    initNavigation() {
        this.navbar = document.querySelector('.navbar');
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');

        if (!this.navbar) return;

        // Mobile menu toggle
        if (this.navToggle && this.navMenu) {
            this.navToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // Close mobile menu when clicking on links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.navMenu && this.navMenu.classList.contains('active')) {
                if (!this.navMenu.contains(e.target) && !this.navToggle.contains(e.target)) {
                    this.closeMobileMenu();
                }
            }
        });

        // Active section detection
        this.initActiveNavigation();
    }

    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
        
        const isOpen = this.navMenu.classList.contains('active');
        this.navToggle.setAttribute('aria-expanded', isOpen.toString());
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    closeMobileMenu() {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
        this.navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    initActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        if (sections.length === 0) return;

        const observerOptions = {
            rootMargin: '-20% 0px -80% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    this.updateActiveNavLink(id);
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    updateActiveNavLink(activeId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    }

    // ====================================================================
    // CUSTOM CURSOR
    // ====================================================================
    initCursor() {
        this.cursorDot = document.getElementById('cursorDot');
        this.cursorOutline = document.getElementById('cursorOutline');
        
        if (!this.cursorDot || !this.cursorOutline) return;
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

        this.cursorPos = { x: 0, y: 0 };
        this.cursorOutlinePos = { x: 0, y: 0 };

        // Interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .filter-btn, .project-card, .product-card, .skill-category');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => this.setCursorHover(true));
            el.addEventListener('mouseleave', () => this.setCursorHover(false));
        });

        // Start cursor animation
        this.animateCursor();
    }

    onMouseMove(e) {
        if (!this.cursorDot) return;
        
        this.cursorPos.x = e.clientX;
        this.cursorPos.y = e.clientY;
        
        this.cursorDot.style.transform = `translate(-50%, -50%) translate(${e.clientX}px, ${e.clientY}px)`;
    }

    setCursorHover(isHover) {
        if (!this.cursorOutline) return;
        
        if (isHover) {
            this.cursorOutline.style.transform += ' scale(1.5)';
            this.cursorOutline.style.borderColor = 'var(--primary-500)';
        } else {
            this.cursorOutline.style.transform = this.cursorOutline.style.transform.replace(' scale(1.5)', '');
            this.cursorOutline.style.borderColor = 'var(--primary-500)';
        }
    }

    animateCursor() {
        if (!this.cursorOutline) return;
        
        // Smooth follow animation for outline
        this.cursorOutlinePos.x += (this.cursorPos.x - this.cursorOutlinePos.x) * 0.1;
        this.cursorOutlinePos.y += (this.cursorPos.y - this.cursorOutlinePos.y) * 0.1;
        
        this.cursorOutline.style.transform = `translate(-50%, -50%) translate(${this.cursorOutlinePos.x}px, ${this.cursorOutlinePos.y}px)`;
        
        requestAnimationFrame(() => this.animateCursor());
    }

    // ====================================================================
    // TYPING ANIMATION
    // ====================================================================
    initTypingAnimation() {
        const typingElement = document.getElementById('typingText');
        if (!typingElement) return;

        const roles = [
            'Géomaticien',
            'Développeur SIG',
            'Formateur Expert',
            'Consultant Freelance',
            'Spécialiste Télédétection'
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let delay = 2000;

        const typeRole = () => {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentRole.length) {
                typeSpeed = delay;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500;
            }

            setTimeout(typeRole, typeSpeed);
        };

        // Start typing animation
        setTimeout(typeRole, 1000);
    }

    // ====================================================================
    // SCROLL ANIMATIONS
    // ====================================================================
    initScrollAnimations() {
        // Parallax effect for hero background
        this.parallaxElements = document.querySelectorAll('.floating-shapes .shape');
        
        // Scroll-triggered animations
        this.animatedElements = document.querySelectorAll('.timeline-item, .project-card, .product-card, .skill-category');
        
        if (this.animatedElements.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

            this.animatedElements.forEach(el => observer.observe(el));
        }
    }

    onScroll() {
        const scrollY = window.pageYOffset;
        
        // Update navbar background
        if (this.navbar) {
            if (scrollY > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        }

        // Parallax effects
        this.updateParallax(scrollY);
        
        // Update back to top button
        this.updateBackToTop(scrollY);
    }

    updateParallax(scrollY) {
        if (this.parallaxElements.length === 0) return;
        
        this.parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    // ====================================================================
    // COUNTERS ANIMATION
    // ====================================================================
    initCounters() {
        const counters = document.querySelectorAll('.stat-number[data-target]');
        if (counters.length === 0) return;

        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    }

    // ====================================================================
    // SKILL BARS ANIMATION
    // ====================================================================
    initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress[data-width]');
        if (skillBars.length === 0) return;

        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const width = skillBar.dataset.width;
                    
                    setTimeout(() => {
                        skillBar.style.width = width;
                    }, 200);
                    
                    observer.unobserve(skillBar);
                }
            });
        }, observerOptions);

        skillBars.forEach(bar => observer.observe(bar));
    }

    // ====================================================================
    // FILTERS
    // ====================================================================
    initFilters() {
        const filterContainers = [
            { container: '.projects-filter', items: '.project-card' },
            { container: '.products-filter', items: '.product-card' }
        ];

        filterContainers.forEach(({ container, items }) => {
            this.setupFilter(container, items);
        });
    }

    setupFilter(containerSelector, itemSelector) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        container.addEventListener('click', (e) => {
            const filterBtn = e.target.closest('.filter-btn');
            if (!filterBtn) return;

            const filterValue = filterBtn.dataset.filter;
            
            // Update active filter button
            container.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            filterBtn.classList.add('active');
            
            // Filter items
            this.filterItems(itemSelector, filterValue);
        });
    }

    filterItems(itemSelector, filterValue) {
        const items = document.querySelectorAll(itemSelector);
        
        items.forEach(item => {
            const categories = item.dataset.category || '';
            const shouldShow = filterValue === 'all' || categories.includes(filterValue);
            
            if (shouldShow) {
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.6s ease forwards';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // ====================================================================
    // CONTACT FORM
    // ====================================================================
    initContactForm() {
        const form = document.querySelector('.contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('.submit-btn');
        const statusElement = form.querySelector('.form-status');
        
        // Validate form
        if (!this.validateForm(form)) {
            this.showFormStatus('Veuillez corriger les erreurs dans le formulaire.', 'error', statusElement);
            return;
        }

        // Prepare form data
        const formData = new FormData(form);
        
        // Update button state
        this.setSubmitButtonState(submitBtn, true);
        
        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                this.showFormStatus('Message envoyé avec succès ! Je vous recontacterai bientôt.', 'success', statusElement);
                form.reset();
                
                // Analytics event
                this.trackEvent('contact_form_submit', { method: 'contact_form' });
            } else {
                const data = await response.json();
                const errorMessage = data.errors?.map(err => err.message).join(', ') || 'Une erreur est survenue.';
                this.showFormStatus(errorMessage, 'error', statusElement);
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showFormStatus('Erreur de connexion. Veuillez réessayer.', 'error', statusElement);
        } finally {
            this.setSubmitButtonState(submitBtn, false);
        }
    }

    validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            errorMessage = 'Ce champ est requis.';
            isValid = false;
        }
        
        // Email validation
        else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Veuillez entrer une adresse email valide.';
                isValid = false;
            }
        }
        
        // Phone validation
        else if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(value)) {
                errorMessage = 'Veuillez entrer un numéro de téléphone valide.';
                isValid = false;
            }
        }

        // Update field state
        this.setFieldState(field, isValid, errorMessage);
        return isValid;
    }

    setFieldState(field, isValid, errorMessage) {
        const errorElement = field.parentNode.querySelector('.field-error') || this.createErrorElement();
        
        if (isValid) {
            field.classList.remove('error');
            field.classList.add('valid');
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        } else {
            field.classList.remove('valid');
            field.classList.add('error');
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
            if (!field.parentNode.contains(errorElement)) {
                field.parentNode.appendChild(errorElement);
            }
        }
    }

    createErrorElement() {
        const errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        errorElement.style.cssText = 'color: var(--error-500); font-size: var(--text-sm); margin-top: var(--space-1); display: none;';
        return errorElement;
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    setSubmitButtonState(button, isLoading) {
        const icon = button.querySelector('i');
        const text = button.querySelector('span') || button;
        
        if (isLoading) {
            button.disabled = true;
            icon.className = 'fas fa-spinner fa-spin';
            text.textContent = 'Envoi en cours...';
        } else {
            button.disabled = false;
            icon.className = 'fas fa-paper-plane';
            text.textContent = 'Envoyer le message';
        }
    }

    showFormStatus(message, type, statusElement) {
        if (!statusElement) return;
        
        statusElement.textContent = message;
        statusElement.className = `form-status show ${type}`;
        statusElement.style.color = type === 'success' ? 'var(--success-500)' : 'var(--error-500)';
        
        // Auto-hide success messages
        if (type === 'success') {
            setTimeout(() => {
                statusElement.classList.remove('show');
            }, 5000);
        }
    }

    // ====================================================================
    // NEWSLETTER FORM
    // ====================================================================
    initNewsletterForm() {
        const form = document.querySelector('.newsletter-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const input = form.querySelector('input[type="email"]');
            const button = form.querySelector('button');
            const email = input.value.trim();
            
            if (!email) return;
            
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                this.showToast('Veuillez entrer une adresse email valide.', 'error');
                return;
            }
            
            // Update button state
            const originalHTML = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            button.disabled = true;
            
            try {
                // Simulate API call (replace with your newsletter service)
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                this.showToast('Inscription réussie ! Merci de votre intérêt.', 'success');
                input.value = '';
                
                // Analytics event
                this.trackEvent('newsletter_signup', { email: email });
            } catch (error) {
                this.showToast('Erreur lors de l\'inscription. Veuillez réessayer.', 'error');
            } finally {
                button.innerHTML = originalHTML;
                button.disabled = false;
            }
        });
    }

    // ====================================================================
    // SMOOTH SCROLLING
    // ====================================================================
    initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = anchor.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = this.navbar?.offsetHeight || 0;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    this.closeMobileMenu();
                }
            });
        });
    }

    // ====================================================================
    // BACK TO TOP
    // ====================================================================
    initBackToTop() {
        this.backToTopBtn = document.getElementById('backToTop');
        if (!this.backToTopBtn) return;

        this.backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    updateBackToTop(scrollY) {
        if (!this.backToTopBtn) return;
        
        if (scrollY > 300) {
            this.backToTopBtn.classList.add('visible');
        } else {
            this.backToTopBtn.classList.remove('visible');
        }
    }

    // ====================================================================
    // PARALLAX EFFECTS
    // ====================================================================
    initParallax() {
        this.parallaxEnabled = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!this.parallaxEnabled) return;

        this.parallaxElements = document.querySelectorAll('[data-parallax]');
        this.ticking = false;
    }

    // ====================================================================
    // UTILITY FUNCTIONS
    // ====================================================================
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // ====================================================================
    // TOAST NOTIFICATIONS
    // ====================================================================
    showToast(message, type = 'info', duration = 4000) {
        // Create toast container if it doesn't exist
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                pointer-events: none;
            `;
            document.body.appendChild(container);
        }

        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.style.cssText = `
            background: var(--white);
            color: var(--text-primary);
            padding: 1rem 1.5rem;
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-lg);
            margin-bottom: 10px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            pointer-events: auto;
            border-left: 4px solid ${type === 'success' ? 'var(--success-500)' : 'var(--error-500)'};
            max-width: 300px;
            word-wrap: break-word;
        `;
        toast.textContent = message;

        container.appendChild(toast);

        // Animate in
        requestAnimationFrame(() => {
            toast.style.transform = 'translateX(0)';
        });

        // Auto remove
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (container.contains(toast)) {
                    container.removeChild(toast);
                }
            }, 300);
        }, duration);

        // Click to dismiss
        toast.addEventListener('click', () => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (container.contains(toast)) {
                    container.removeChild(toast);
                }
            }, 300);
        });
    }

    // ====================================================================
    // ANALYTICS & TRACKING
    // ====================================================================
    trackEvent(eventName, parameters = {}) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, parameters);
        }
        
        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', eventName, parameters);
        }
        
        console.log('📊 Event tracked:', eventName, parameters);
    }

    // ====================================================================
    // KEYBOARD NAVIGATION
    // ====================================================================
    onKeyDown(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            this.closeMobileMenu();
        }
        
        // Enter/Space on buttons
        if (e.key === 'Enter' || e.key === ' ') {
            const activeElement = document.activeElement;
            if (activeElement && activeElement.classList.contains('btn')) {
                e.preventDefault();
                activeElement.click();
            }
        }
    }

    // ====================================================================
    // RESIZE HANDLER
    // ====================================================================
    onResize() {
        // Close mobile menu on resize
        this.closeMobileMenu();
        
        // Recalculate any position-dependent elements
        if (this.parallaxElements) {
            this.parallaxElements.forEach(el => {
                el.style.transform = '';
            });
        }
    }

    // ====================================================================
    // PUBLIC API
    // ====================================================================
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const headerHeight = this.navbar?.offsetHeight || 0;
            const targetPosition = section.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    updateTheme(theme) {
        this.setTheme(theme);
    }

    showNotification(message, type) {
        this.showToast(message, type);
    }
}

// ====================================================================
// INITIALIZATION
// ====================================================================

// Initialize the portfolio when the script loads
const portfolio = new ModernPortfolio();

// Expose to global scope for external access
window.ModernPortfolio = portfolio;

// ====================================================================
// ADDITIONAL UTILITIES
// ====================================================================

// Lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src], img.lazy').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Performance monitoring
if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
            if (entry.entryType === 'largest-contentful-paint') {
                console.log('LCP:', entry.startTime);
            }
        });
    });
    
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
}

console.log('🎨 Modern Portfolio loaded successfully!');