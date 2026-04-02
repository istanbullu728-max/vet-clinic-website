/* =========================================
   VETCLINIC - MAIN JAVASCRIPT
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. NAVBAR SCROLL EFFECT ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 2. MOBILE MENU TOGGLE ---
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        // Prevent body scroll when menu is open
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    menuToggle.addEventListener('click', toggleMenu);
    closeMenu.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // --- 3. INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ---
    // This perfectly mimics Framer's "appear on scroll" animations
    
    const fadeUpElements = document.querySelectorAll('.fade-up');

    // Observer Options
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px 0px -100px 0px', // trigger slightly before it hits the bottom
        threshold: 0.1 // triggers when 10% of element is visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'in-view' class to trigger CSS transition
                entry.target.classList.add('in-view');
                // Stop observing once animated to avoid re-animating on scroll up (optional)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Attach observer to all elements
    fadeUpElements.forEach(el => {
        scrollObserver.observe(el);
    });

});
