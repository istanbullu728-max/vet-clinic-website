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

    // --- 4. COUNTER STATS ANIMATION ---
    function animateCounter(counter) {
        if (counter.dataset.animated === "true") return;
        counter.dataset.animated = "true";
        
        const target = +counter.getAttribute('data-target');
        const speed = 60; // Lower is faster
        const inc = target / speed;
        
        const updateCount = () => {
            const count = +counter.innerText;
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 30);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    }

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Find all counters inside the animated section
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => animateCounter(counter));
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeUpElements.forEach(el => {
        scrollObserver.observe(el);
    });

});

// --- 5. WHATSAPP FORM SUBMISSION GLOBAL ---
window.sendWhatsApp = function(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.querySelector('[name="wa_name"]')?.value || 'Belirtilmedi';
    const phone = form.querySelector('[name="wa_phone"]')?.value || 'Belirtilmedi';
    const date = form.querySelector('[name="wa_date"]')?.value || '';
    const subject = form.querySelector('[name="wa_subject"]')?.value || '';
    const message = form.querySelector('[name="wa_message"]')?.value || '';
    
    let text = `Merhaba VetClinic, randevu/bilgi talebim var:\n\n`;
    text += `👤 İsim: ${name}\n`;
    text += `📞 Telefon: ${phone}\n`;
    if(date) text += `📅 Tercih Edilen Tarih: ${date}\n`;
    text += `📝 Konu: ${subject}\n`;
    if(message) text += `💬 Detay/Şikayet: ${message}\n`;
    
    const whatsappUrl = `https://wa.me/905551234567?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
};
