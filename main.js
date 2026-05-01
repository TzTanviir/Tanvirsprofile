// TANVIRR_LABS Portfolio Engine v2.1
// High-Fidelity 3D Architecture Performance

const engine = {
    hero: document.querySelector('.hero-engine'),
    layers: {
        bg: document.querySelector('.layer-bg'),
        mesh: document.querySelector('.layer-mesh'),
        profile: document.querySelector('.profile-man-container'),
        hud: document.querySelectorAll('.hud'),
        terminal: document.getElementById('stream-container')
    },
    mouse: { x: 0, y: 0, targetX: 0, targetY: 0 },
    smoothing: 0.08 // LERP factor
};

// --- Dynamic Terminal Data Stream ---
const dataLines = [
    "FETCHING_API_MANIFEST...", "DECRYPTING_OAUTH2_CREDENTIALS", "INIT_AUTOMATION_PIPELINE",
    "CONNECTING_MIRPUR_NODE_10", "HANDSHAKE_SUCCESSFUL", "ARCHITECTING_V4.2",
    "BYPASSING_MANUAL_OPS...", "AI_BRAIN_SYNC_82%", "DEPLOYING_PROD_V2.1",
    "GEO_SHIFT_PRO_LOADED", "GESTURE_ENGINE_READY", "EARNINGS_STABLE: $4,000+",
    "XP_PROJECTS: 150+", "RETENTION_OPTIMIZED: 98%"
];

function updateTerminal() {
    if (!engine.layers.terminal) return;
    const line = document.createElement('div');
    line.className = 'data-stream-line';
    line.textContent = `> ${dataLines[Math.floor(Math.random() * dataLines.length)]}`;
    engine.layers.terminal.prepend(line);
    if (engine.layers.terminal.children.length > 8) {
        engine.layers.terminal.lastChild.remove();
    }
}
setInterval(updateTerminal, 800);

// --- Number Counter Engine ---
function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let currentFrame = 0;

    const counter = setInterval(() => {
        currentFrame++;
        const progress = currentFrame / totalFrames;
        const currentCount = Math.round(target * progress);
        el.textContent = currentCount.toLocaleString();

        if (currentFrame === totalFrames) {
            el.textContent = target.toLocaleString();
            clearInterval(counter);
        }
    }, frameRate);
}

// --- 3D Motion Engine ---
document.addEventListener('mousemove', (e) => {
    engine.mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    engine.mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
});

function update() {
    engine.mouse.x += (engine.mouse.targetX - engine.mouse.x) * engine.smoothing;
    engine.mouse.y += (engine.mouse.targetY - engine.mouse.y) * engine.smoothing;

    const { x, y } = engine.mouse;
    const time = Date.now() * 0.001;

    // 1. Background Layer
    if (engine.layers.bg) {
        engine.layers.bg.style.transform = `translate(${x * 2}%, ${y * 2}%) scale(1.1)`;
    }

    // 2. Profile & HUD Parallax
    if (engine.layers.profile) {
        const tiltX = y * -12;
        const tiltY = x * 12;
        const float = Math.sin(time) * 10;
        engine.layers.profile.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translate(${x * -30}px, ${y * -30 + float}px)`;
    }

    engine.layers.hud.forEach(panel => {
        const depth = parseFloat(panel.getAttribute('data-depth')) || 0.1;
        const moveX = x * depth * -200;
        const moveY = y * depth * -200;
        const oscillate = Math.cos(time + depth * 10) * 8; // HUD Floating Effect

        panel.style.transform = `translate3d(${moveX}px, ${moveY + oscillate}px, 100px) rotateX(${y * -20}deg) rotateY(${x * 20}deg)`;
    });

    requestAnimationFrame(update);
}

if (engine.hero) update();

// Custom Cursor & Hover Logic
const cursor = document.getElementById('custom-cursor');
const cursorDot = document.getElementById('custom-cursor-dot');

document.addEventListener('mousemove', (e) => {
    if (cursor && cursorDot) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
    }
});

function refreshHoverables() {
    const hoverables = document.querySelectorAll('a, button, .project-card, .btn-architect, .tech-card, .review-card');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
}
refreshHoverables();

function updateTime() {
    const timeDisplay = document.getElementById('time-display');
    if (!timeDisplay) return;
    const now = new Date();
    timeDisplay.textContent = now.toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
    });
}
setInterval(updateTime, 1000);
updateTime();

const revealElements = document.querySelectorAll('.section, .project-card, .tech-card, .impact-item, .main-headline');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Check for counter
            const counter = entry.target.querySelector('.counter');
            if (counter) animateCounter(counter);
            
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0'; el.style.transform = 'translateY(40px)';
    el.style.transition = 'all 1s cubic-bezier(0.2, 0, 0.2, 1)';
    revealObserver.observe(el);
});

// --- Mobile Menu Logic ---
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-link');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}
