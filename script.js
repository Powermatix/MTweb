// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Create success message
        const button = this.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        
        // Add loading state
        button.textContent = 'Sending...';
        button.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            button.textContent = 'Message Sent!';
            button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            // Reset form
            this.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
                button.disabled = false;
            }, 3000);
        }, 1500);
    });
}

// Consolidated scroll handler with throttling
let scrollTimeout;
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const hero = document.querySelector('.hero');

function handleScroll() {
    const scrolled = window.pageYOffset;
    
    // Parallax effect for hero section
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
    
    // Active navigation state
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrolled >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = '#667eea';
        }
    });
    
    // Scroll progress indicator
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollProgress = (scrolled / windowHeight) * 100;
    const indicator = document.getElementById('scroll-indicator');
    if (indicator) {
        indicator.style.width = scrollProgress + '%';
    }
}

// Throttle scroll events
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(handleScroll);
});

// Add ripple effect to buttons
document.querySelectorAll('.btn-neumorphic').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        const existingRipple = this.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Card tilt effect on mouse move
document.querySelectorAll('.card-neumorphic').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Service cards hover animation
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.service-icon');
        if (icon) {
            icon.style.animation = 'pulse 0.6s ease-in-out';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.service-icon');
        if (icon) {
            icon.style.animation = '';
        }
    });
});

// Team member cards interaction
document.querySelectorAll('.team-member').forEach(member => {
    member.addEventListener('mouseenter', function() {
        const avatar = this.querySelector('.avatar-circle');
        if (avatar) {
            avatar.style.transform = 'scale(1.1) rotate(5deg)';
            avatar.style.transition = 'transform 0.3s ease';
        }
    });
    
    member.addEventListener('mouseleave', function() {
        const avatar = this.querySelector('.avatar-circle');
        if (avatar) {
            avatar.style.transform = '';
        }
    });
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on hero title (optional - can be enabled)
// const heroTitle = document.querySelector('.hero-title');
// if (heroTitle) {
//     const originalText = heroTitle.textContent;
//     window.addEventListener('load', () => {
//         typeWriter(heroTitle, originalText, 50);
//     });
// }

// Add scroll progress indicator
const createScrollIndicator = () => {
    const indicator = document.createElement('div');
    indicator.id = 'scroll-indicator';
    indicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 10000;
        transition: width 0.1s ease;
        border-radius: 0 3px 3px 0;
        width: 0;
    `;
    document.body.appendChild(indicator);
};

createScrollIndicator();

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Input focus animations
document.querySelectorAll('.input-neumorphic').forEach(input => {
    input.addEventListener('focus', function() {
        this.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.style.transform = '';
    });
});

// Social links animation
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) rotate(10deg)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Development console messages
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('%c🚀 MTweb - Built with Neumorphic Design', 'font-size: 20px; color: #667eea; font-weight: bold;');
    console.log('%cInterested in our work? Contact us!', 'font-size: 14px; color: #764ba2;');
}
