// DOM Elements
const header = document.getElementById('header');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelectorAll('.nav-link');

// Create mobile nav element
const mobileNav = document.createElement('div');
mobileNav.className = 'mobile-nav';
mobileNav.innerHTML = `<ul>${document.querySelector('nav ul').innerHTML}</ul>`;
document.body.appendChild(mobileNav);

// Scroll event for sticky header with gradient animation
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'linear-gradient(to right, rgba(247, 174, 192, 0.9), rgba(255, 255, 255, 0.9), rgba(166, 124, 110, 0.9))';
        header.style.backgroundSize = '200% 100%';
        header.style.animation = 'gradientSlide 5s ease infinite';
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.2)';
        header.style.animation = 'none';
        header.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
    }
});

// Add the keyframe animation for the header gradient
const style = document.createElement('style');
style.innerHTML = `
@keyframes gradientSlide {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}`;
document.head.appendChild(style);

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileNav.classList.toggle('active');
    
    if (mobileMenuBtn.classList.contains('active')) {
        mobileMenuBtn.querySelectorAll('span')[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        mobileMenuBtn.querySelectorAll('span')[1].style.opacity = '0';
        mobileMenuBtn.querySelectorAll('span')[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        mobileMenuBtn.querySelectorAll('span')[0].style.transform = 'none';
        mobileMenuBtn.querySelectorAll('span')[1].style.opacity = '1';
        mobileMenuBtn.querySelectorAll('span')[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.querySelectorAll('span')[0].style.transform = 'none';
        mobileMenuBtn.querySelectorAll('span')[1].style.opacity = '1';
        mobileMenuBtn.querySelectorAll('span')[2].style.transform = 'none';
    });
});

// Highlight active nav link based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        
        if (scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Animation for service cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Check if it's a mobile device
const isMobile = () => window.innerWidth <= 768;

// Apply animations to elements when they become visible
window.addEventListener('DOMContentLoaded', () => {
    // Animate service cards
    const serviceCards = document.querySelectorAll('.service-card');
    const animationDelay = isMobile() ? 0.05 : 0.1;
    
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transitionDelay = `${index * animationDelay}s`;
        observer.observe(card);
    });
    
    // Animate gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transitionDelay = `${index * animationDelay}s`;
        observer.observe(item);
    });
});

// Handle resize events for responsive behavior
window.addEventListener('resize', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    const animationDelay = isMobile() ? 0.05 : 0.1;
    
    // Reset transitions on resize to prevent issues
    serviceCards.forEach((card, index) => {
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.transitionDelay = `${index * animationDelay}s`;
    });
}); 