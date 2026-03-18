// ============================================
// NOIR ÉTOILE — Sonia Rossi Chocolatier
// JavaScript: Starfield, Animations, Interactions
// ============================================

// ---- Starfield Canvas ----
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];
let W, H;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

function createStars(count) {
  stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.2,
      alpha: Math.random(),
      speed: Math.random() * 0.3 + 0.05,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleDir: Math.random() > 0.5 ? 1 : -1
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, W, H);
  stars.forEach(s => {
    s.alpha += s.twinkleSpeed * s.twinkleDir;
    if (s.alpha >= 1 || s.alpha <= 0.1) s.twinkleDir *= -1;
    s.y -= s.speed;
    if (s.y < 0) { s.y = H; s.x = Math.random() * W; }

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(201, 168, 76, ${s.alpha * 0.6})`;
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}

window.addEventListener('resize', () => { resize(); createStars(200); });
resize();
createStars(200);
drawStars();

// ---- Navbar Scroll Effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- Hamburger Menu ----
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => {
  const navLinks = document.querySelector('.nav-links');
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.position = 'absolute';
  navLinks.style.top = '100%';
  navLinks.style.left = '0';
  navLinks.style.right = '0';
  navLinks.style.background = 'rgba(5,5,8,0.98)';
  navLinks.style.padding = '2rem';
  navLinks.style.gap = '1.5rem';
});

// ---- Scroll Reveal ----
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ---- Masonry Items Stagger ----
const masonryItems = document.querySelectorAll('.masonry-item');
const masonryObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, (i % 6) * 80);
      masonryObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05 });

masonryItems.forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(30px)';
  item.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  masonryObserver.observe(item);
});

// ---- Parallax on Hero Image ----
const heroImg = document.querySelector('.hero-img-frame');
window.addEventListener('scroll', () => {
  if (heroImg) {
    const scrollY = window.scrollY;
    heroImg.style.transform = `translateY(${scrollY * 0.15}px)`;
  }
});

// ---- Contact Form ----
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-submit');
    btn.textContent = 'Inquiry Received ✦';
    btn.style.background = 'var(--gold)';
    btn.style.color = 'var(--black)';
    setTimeout(() => {
      btn.textContent = 'Send Inquiry ✦';
      btn.style.background = 'transparent';
      btn.style.color = 'var(--gold)';
      contactForm.reset();
    }, 3000);
  });
}

// ---- Cursor Glow Effect ----
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
  position: fixed;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%, -50%);
  transition: left 0.3s ease, top 0.3s ease;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});

// ---- Smooth anchor scrolling ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- Hero title letter animation ----
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  heroTitle.style.opacity = '0';
  heroTitle.style.transform = 'translateY(30px)';
  heroTitle.style.transition = 'opacity 1.2s ease 0.3s, transform 1.2s ease 0.3s';
  setTimeout(() => {
    heroTitle.style.opacity = '1';
    heroTitle.style.transform = 'translateY(0)';
  }, 100);
}

const heroPre = document.querySelector('.hero-pre');
if (heroPre) {
  heroPre.style.opacity = '0';
  heroPre.style.transition = 'opacity 1s ease 0.1s';
  setTimeout(() => { heroPre.style.opacity = '1'; }, 100);
}

const heroSub = document.querySelector('.hero-sub');
if (heroSub) {
  heroSub.style.opacity = '0';
  heroSub.style.transform = 'translateY(20px)';
  heroSub.style.transition = 'opacity 1s ease 0.6s, transform 1s ease 0.6s';
  setTimeout(() => {
    heroSub.style.opacity = '1';
    heroSub.style.transform = 'translateY(0)';
  }, 100);
}

const heroBadges = document.querySelector('.hero-badges');
if (heroBadges) {
  heroBadges.style.opacity = '0';
  heroBadges.style.transition = 'opacity 1s ease 0.9s';
  setTimeout(() => { heroBadges.style.opacity = '1'; }, 100);
}

const btnHero = document.querySelector('.btn-hero');
if (btnHero) {
  btnHero.style.opacity = '0';
  btnHero.style.transition = 'opacity 1s ease 1.1s';
  setTimeout(() => { btnHero.style.opacity = '1'; }, 100);
}

const heroImgFrame = document.querySelector('.hero-img-frame');
if (heroImgFrame) {
  heroImgFrame.style.opacity = '0';
  heroImgFrame.style.transform = 'translateX(40px)';
  heroImgFrame.style.transition = 'opacity 1.2s ease 0.4s, transform 1.2s ease 0.4s';
  setTimeout(() => {
    heroImgFrame.style.opacity = '1';
    heroImgFrame.style.transform = 'translateX(0)';
  }, 100);
}
