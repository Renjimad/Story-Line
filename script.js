// Mobile menu logic
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    mobileMenuOverlay.classList.remove('open');
}

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('open');
        mobileMenuOverlay.classList.add('open');
    });
}
if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
}
if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
}
document.querySelectorAll('.mobile-menu-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Add active class to nav links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add intersection observer for fade-in animations
const sections = document.querySelectorAll('section');
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    observer.observe(section);
});

// Add hover effect to CTA button
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('mouseover', () => {
        ctaButton.style.transform = 'translateY(-2px)';
    });
    
    ctaButton.addEventListener('mouseout', () => {
        ctaButton.style.transform = 'translateY(0)';
    });
}

// Simple form validation for the CTA button
ctaButton.addEventListener('click', () => {
    // You can replace this with actual functionality
    alert('Coming Soon! Storyline is in development.');
});

// Add scroll effect to navbar
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add background opacity based on scroll position
    if (scrollTop > 50) {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
    } else {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 1)';
    }
    
    lastScrollTop = scrollTop;
});

// Pricing select functionality
const pricingButtons = document.querySelectorAll('.select-option');
pricingButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        pricingButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        // Here you can add logic to update prices based on monthly/yearly selection
        const isYearly = button.textContent.includes('Yearly');
        updatePrices(isYearly);
    });
});

function updatePrices(isYearly) {
    // Add your price updating logic here
    // This is where you would update the displayed prices based on monthly/yearly selection
}

// Testimonials Slider
const testimonialSlider = {
    track: document.querySelector('.testimonials-track'),
    slides: document.querySelectorAll('.testimonial'),
    dots: document.querySelectorAll('.testimonial-dots .dot'),
    prevBtn: document.querySelector('.testimonial-nav.prev'),
    nextBtn: document.querySelector('.testimonial-nav.next'),
    currentIndex: 0,
    autoplayInterval: null,

    init() {
        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.slide('prev'));
        this.nextBtn.addEventListener('click', () => this.slide('next'));
        
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Start autoplay
        this.startAutoplay();

        // Pause autoplay on hover
        this.track.addEventListener('mouseenter', () => this.pauseAutoplay());
        this.track.addEventListener('mouseleave', () => this.startAutoplay());

        // Touch events for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        this.track.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            this.pauseAutoplay();
        });

        this.track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    this.slide('next');
                } else {
                    this.slide('prev');
                }
            }

            this.startAutoplay();
        });
    },

    slide(direction) {
        if (direction === 'next') {
            this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        } else {
            this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        }
        this.goToSlide(this.currentIndex);
    },

    goToSlide(index) {
        // Remove active class from all slides and dots
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        this.slides[index].classList.add('active');
        this.dots[index].classList.add('active');

        this.currentIndex = index;
    },

    startAutoplay() {
        this.pauseAutoplay();
        this.autoplayInterval = setInterval(() => {
            this.slide('next');
        }, 5000);
    },

    pauseAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
};

// Initialize testimonial slider
document.addEventListener('DOMContentLoaded', () => {
    testimonialSlider.init();
});

// Billing toggle switch logic
const billingOptions = document.querySelectorAll('.billing-option');
const pricingGrid = document.querySelector('.pricing-grid');

function updateBillingUI(isYearly) {
    document.querySelectorAll('.price-monthly').forEach(el => {
        el.style.display = isYearly ? 'none' : 'flex';
    });
    document.querySelectorAll('.price-yearly').forEach(el => {
        el.style.display = isYearly ? 'flex' : 'none';
    });
}

billingOptions.forEach(option => {
    option.addEventListener('click', function() {
        billingOptions.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
        const isYearly = this.dataset.billing === 'yearly';
        updateBillingUI(isYearly);
    });
});
// Set initial state
updateBillingUI(false);

