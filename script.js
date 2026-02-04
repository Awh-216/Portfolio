// ========== Performance Optimized Script ==========

// Throttle function for scroll events
function throttle(func, limit) {
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

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// ========== Mobile Navigation ==========
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ========== Optimized Scroll Handler ==========
const header = document.getElementById('header');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const handleScroll = throttle(() => {
    const scrollY = window.scrollY;
    
    // Header shadow
    if (header) {
        header.style.boxShadow = scrollY > 50 
            ? '0 4px 20px rgba(0, 0, 0, 0.1)' 
            : '0 4px 6px -1px rgb(0 0 0 / 0.1)';
    }
    
    // Active nav highlight
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
    
    // Scroll progress bar
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollY / docHeight) * 100;
        progressBar.style.width = `${scrollPercent}%`;
    }
}, 16); // ~60fps

window.addEventListener('scroll', handleScroll, { passive: true });

// ========== Smooth Scroll ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ========== Contact Form ==========
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Cảm ơn bạn đã liên hệ! Tôi sẽ phản hồi sớm nhất có thể.');
        this.reset();
    });
}

// ========== Intersection Observer for Animations ==========
const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            animateObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.skill-card, .blog-card, .stack-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    animateObserver.observe(el);
});

// ========== Flip Calendar Animation for About Section ==========
const flipObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('flip-visible');
            flipObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.flip-item, .about-stats .stat').forEach(el => {
    flipObserver.observe(el);
});

// Add styles
const animStyle = document.createElement('style');
animStyle.textContent = `
    .animate-in { opacity: 1 !important; transform: translateY(0) !important; }
    .scroll-progress { position: fixed; top: 0; left: 0; height: 3px; background: linear-gradient(90deg, var(--primary), var(--secondary)); z-index: 9999; }
`;
document.head.appendChild(animStyle);

// Create progress bar
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

// ========== Typing Effect ==========
function typeWriter(element, text, speed = 100, callback) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            const cursor = document.createElement('span');
            cursor.className = 'typing-cursor';
            cursor.style.cssText = 'display:inline-block;width:3px;height:1em;background:var(--primary);margin-left:2px;animation:blink 1s infinite;';
            element.appendChild(cursor);
            if (callback) callback();
        }
    }
    type();
}

function deleteText(element, speed = 50, callback) {
    function deleteChar() {
        const cursor = element.querySelector('.typing-cursor');
        if (cursor) cursor.remove();
        
        if (element.textContent.length > 0) {
            element.textContent = element.textContent.slice(0, -1);
            setTimeout(deleteChar, speed);
        } else if (callback) callback();
    }
    deleteChar();
}

// Typing loop
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title .title-text');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const verifiedBadge = document.querySelector('.verified-badge');
    
    if (heroTitle && heroSubtitle) {
        const titleText = heroTitle.textContent;
        const subtitleText = heroSubtitle.textContent;
        
        heroTitle.style.minWidth = heroTitle.offsetWidth + 'px';
        heroSubtitle.style.minWidth = heroSubtitle.offsetWidth + 'px';
        
        function cycle() {
            if (verifiedBadge) verifiedBadge.classList.remove('show');
            
            let titleDone = false, subtitleDone = false;
            
            function checkDone() {
                if (titleDone && subtitleDone) {
                    // Thêm hiệu ứng rung 2 lần khi typing hoàn thành
                    heroTitle.classList.add('glitch-shake');
                    setTimeout(() => {
                        heroTitle.classList.remove('glitch-shake');
                    }, 600);
                    
                    if (verifiedBadge) verifiedBadge.classList.add('show');
                    setTimeout(() => {
                        if (verifiedBadge) verifiedBadge.classList.remove('show');
                        let td = false, sd = false;
                        deleteText(heroTitle, 50, () => { td = true; if (td && sd) setTimeout(cycle, 500); });
                        deleteText(heroSubtitle, 50, () => { sd = true; if (td && sd) setTimeout(cycle, 500); });
                    }, 5000);
                }
            }
            
            typeWriter(heroTitle, titleText, 100, () => { titleDone = true; checkDone(); });
            setTimeout(() => {
                typeWriter(heroSubtitle, subtitleText, 100, () => { subtitleDone = true; checkDone(); });
            }, 200);
        }
        
        setTimeout(cycle, 500);
    }
});

// Blink animation
const blinkStyle = document.createElement('style');
blinkStyle.textContent = '@keyframes blink { 0%,50%{opacity:1} 51%,100%{opacity:0} }';
document.head.appendChild(blinkStyle);

// ========== Counter Animation ==========
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target);
            if (!isNaN(target)) {
                let start = 0;
                const duration = 2000;
                const increment = target / (duration / 16);
                
                function update() {
                    start += increment;
                    if (start < target) {
                        entry.target.textContent = Math.floor(start) + '+';
                        requestAnimationFrame(update);
                    } else {
                        entry.target.textContent = target + '+';
                    }
                }
                update();
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => statsObserver.observe(stat));

// ========== Lightweight Card Hover (No 3D tilt for performance) ==========
document.querySelectorAll('.skill-card, .blog-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
        this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '';
    });
});

// ========== Dark Mode Toggle ==========
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
}


// ========== Optimized Background Effects ==========

// Only create particles on desktop (better mobile performance)
const isMobile = window.innerWidth < 768;

// Reduced particle count for performance
function createParticles() {
    const container = document.getElementById('particles');
    if (!container || isMobile) return;
    
    const count = 20; // Reduced from 50
    const colors = ['rgba(99,102,241,0.4)', 'rgba(139,92,246,0.4)', 'rgba(236,72,153,0.4)'];
    
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.cssText = `
            width: ${Math.random() * 8 + 4}px;
            height: ${Math.random() * 8 + 4}px;
            left: ${Math.random() * 100}%;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            animation: floatParticle ${Math.random() * 15 + 20}s linear infinite;
            animation-delay: ${Math.random() * 10}s;
        `;
        container.appendChild(p);
    }
}

// Reduced stars
function createStars() {
    const container = document.getElementById('stars');
    if (!container || isMobile) return;
    
    const count = 40; // Reduced from 100
    
    for (let i = 0; i < count; i++) {
        const s = document.createElement('div');
        s.className = 'star';
        s.style.cssText = `
            width: ${Math.random() * 2 + 1}px;
            height: ${Math.random() * 2 + 1}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: twinkleStar ${Math.random() * 3 + 2}s ease-in-out infinite;
            animation-delay: ${Math.random() * 3}s;
        `;
        container.appendChild(s);
    }
}

// Optimized blob movement with RAF
let blobRAF;
const blobs = document.querySelectorAll('.blob');
let targetX = 0, targetY = 0, currentX = 0, currentY = 0;

function updateBlobs() {
    // Smooth interpolation
    currentX += (targetX - currentX) * 0.05;
    currentY += (targetY - currentY) * 0.05;
    
    blobs.forEach((blob, i) => {
        const speed = (i + 1) * 10;
        blob.style.transform = `translate(${currentX * speed}px, ${currentY * speed}px)`;
    });
    
    blobRAF = requestAnimationFrame(updateBlobs);
}

if (blobs.length > 0 && !isMobile) {
    document.addEventListener('mousemove', (e) => {
        targetX = (e.clientX / window.innerWidth - 0.5);
        targetY = (e.clientY / window.innerHeight - 0.5);
    });
    updateBlobs();
}

// Spotlight with throttle
const spotlight = document.getElementById('spotlight-bg');
if (spotlight && !isMobile) {
    document.addEventListener('mousemove', throttle((e) => {
        spotlight.style.setProperty('--mouse-x', `${(e.clientX / window.innerWidth) * 100}%`);
        spotlight.style.setProperty('--mouse-y', `${(e.clientY / window.innerHeight) * 100}%`);
    }, 50));
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    createStars();
});

// Pause animations when tab hidden
document.addEventListener('visibilitychange', () => {
    const animated = document.querySelectorAll('.blob, .particle, .star');
    animated.forEach(el => {
        el.style.animationPlayState = document.hidden ? 'paused' : 'running';
    });
    
    if (document.hidden && blobRAF) {
        cancelAnimationFrame(blobRAF);
    } else if (!document.hidden && blobs.length > 0 && !isMobile) {
        updateBlobs();
    }
});

// ========== Tech Stack Tooltip ==========
document.addEventListener('DOMContentLoaded', function() {
    const stackItems = document.querySelectorAll('.stack-item');
    console.log('Found stack items:', stackItems.length);
    
    // Create a single tooltip element
    const tooltip = document.createElement('div');
    tooltip.id = 'tooltip-container';
    tooltip.style.cssText = `
        position: fixed;
        background: rgba(212, 175, 55, 0.95);
        color: #0a0a0a;
        padding: 10px 16px;
        border-radius: 8px;
        font-size: 0.85rem;
        font-weight: 700;
        letter-spacing: 0.5px;
        white-space: nowrap;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        box-shadow: 0 8px 20px rgba(212, 175, 55, 0.3);
        z-index: 10000;
        transition: opacity 0.2s ease;
    `;
    document.body.appendChild(tooltip);
    
    stackItems.forEach(item => {
        const tooltipText = item.getAttribute('data-name');
        
        item.addEventListener('mouseenter', function() {
            const rect = this.getBoundingClientRect();
            tooltip.textContent = tooltipText;
            tooltip.style.left = (rect.left + rect.width / 2 - 30) + 'px';
            tooltip.style.top = (rect.bottom + 10) + 'px';
            tooltip.style.opacity = '1';
            tooltip.style.visibility = 'visible';
            console.log('Tooltip shown at:', tooltipText);
        });
        
        item.addEventListener('mouseleave', function() {
            tooltip.style.opacity = '0';
            tooltip.style.visibility = 'hidden';
        });
    });
    
    // Handle scroll
    window.addEventListener('scroll', function() {
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
    });
});

// Disable heavy effects on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.querySelectorAll('.blob, .aurora, .particles, .stars').forEach(el => {
        el.style.display = 'none';
    });
}
