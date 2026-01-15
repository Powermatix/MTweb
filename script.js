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

// Hide scroll arrow on scroll
const scrollArrow = document.querySelector('.scroll-down-arrow');
if (scrollArrow) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled > 100) {
            scrollArrow.style.opacity = '0';
            scrollArrow.style.pointerEvents = 'none';
        } else {
            scrollArrow.style.opacity = '1';
            scrollArrow.style.pointerEvents = 'auto';
        }
    });
}

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

// Hero image center click effect with particle burst
const heroImageCenter = document.querySelector('.hero-image-center');
if (heroImageCenter) {
    heroImageCenter.addEventListener('click', function(e) {
        // Pulse animation
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'float-center 7s ease-in-out infinite, hero-image-click 0.4s ease-out';
        }, 10);
        
        // Create particle burst effect
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            const angle = (i / 12) * Math.PI * 2;
            const velocity = 150 + Math.random() * 100;
            const x = Math.cos(angle) * velocity;
            const y = Math.sin(angle) * velocity;
            
            particle.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: linear-gradient(135deg, #667eea, #764ba2);
                pointer-events: none;
                left: 50%;
                top: 50%;
                box-shadow: 0 0 20px rgba(102, 126, 234, 0.8);
                z-index: 100;
            `;
            
            this.appendChild(particle);
            
            particle.animate([
                { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
                { transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(0)`, opacity: 0 }
            ], {
                duration: 800 + Math.random() * 400,
                easing: 'cubic-bezier(0, 0.5, 0.5, 1)'
            }).onfinish = () => particle.remove();
        }
        
        // Create expanding ring
        const ring = document.createElement('div');
        ring.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100%;
            border: 3px solid rgba(102, 126, 234, 0.6);
            border-radius: 30px;
            pointer-events: none;
            left: 0;
            top: 0;
            z-index: 99;
        `;
        this.appendChild(ring);
        
        ring.animate([
            { transform: 'scale(1)', opacity: 0.8 },
            { transform: 'scale(1.5)', opacity: 0 }
        ], {
            duration: 600,
            easing: 'ease-out'
        }).onfinish = () => ring.remove();
    });
}

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
const heroBackground = document.querySelector('.hero-background');

function handleScroll() {
    const scrolled = window.pageYOffset;
    
    // Parallax effect for hero background image - floats slower than content
    if (heroBackground && scrolled < window.innerHeight * 1.5) {
        heroBackground.style.transform = `translateY(${scrolled * 0.3}px) scale(1.05)`;
    }
    
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

// Sticky Timeline Scroll Interaction
const initStickyTimeline = () => {
    const timelineSteps = document.querySelectorAll('.timeline-step');
    const timelineSlides = document.querySelectorAll('.timeline-slide');
    const progressBar = document.querySelector('.progress-bar');
    const servicesSection = document.querySelector('.services-sticky');

    if (!timelineSteps.length || !timelineSlides.length || !servicesSection) return;

    let currentStep = 0;

    // Update active step based on scroll position
    const updateTimeline = () => {
        const sectionTop = servicesSection.offsetTop;
        const sectionHeight = servicesSection.offsetHeight;
        const scrolled = window.pageYOffset;

        // Calculate progress within the section
        const sectionProgress = (scrolled - sectionTop) / sectionHeight;

        if (sectionProgress >= 0 && sectionProgress <= 1) {
            // Determine which step should be active
            const stepIndex = Math.floor(sectionProgress * timelineSlides.length);
            const clampedStep = Math.max(0, Math.min(stepIndex, timelineSlides.length - 1));

            if (clampedStep !== currentStep) {
                currentStep = clampedStep;
                activateStep(currentStep);
            }

            // Update progress bar
            if (progressBar) {
                const progress = (sectionProgress * 100);
                progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
            }
        }
    };

    // Activate a specific step
    const activateStep = (stepIndex) => {
        // Remove active class from all steps
        timelineSteps.forEach(step => step.classList.remove('active'));

        // Add active class to current step
        if (timelineSteps[stepIndex]) {
            timelineSteps[stepIndex].classList.add('active');
        }
    };

    // Click handler for timeline steps
    timelineSteps.forEach((step, index) => {
        step.addEventListener('click', () => {
            const targetSlide = timelineSlides[index];
            if (targetSlide) {
                const slideTop = targetSlide.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: slideTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Throttled scroll handler for timeline
    let timelineScrollTimeout;
    window.addEventListener('scroll', () => {
        if (timelineScrollTimeout) {
            window.cancelAnimationFrame(timelineScrollTimeout);
        }
        timelineScrollTimeout = window.requestAnimationFrame(updateTimeline);
    });

    // Initial update
    updateTimeline();
};

// Initialize timeline after DOM loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStickyTimeline);
} else {
    initStickyTimeline();
}