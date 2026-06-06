/* ================================================
   RAPHAEL BARUCK — PORTFOLIO SCRIPT
   ================================================ */

'use strict';

/* ── Custom cursor ── */
const cursor = document.getElementById('cursor');
if (cursor && window.matchMedia('(hover:hover)').matches) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });
  document.querySelectorAll('a, button, .project-card, .about-card, .event-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
  });
}

/* ── Header scroll state ── */
const header = document.getElementById('header');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ── Mobile nav ── */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
let navOpen = false;

function toggleMobileNav() {
  navOpen = !navOpen;
  hamburger.classList.toggle('open', navOpen);
  mobileNav.classList.toggle('open', navOpen);
  document.body.style.overflow = navOpen ? 'hidden' : '';
}

function closeMobileNav() {
  navOpen = false;
  hamburger.classList.remove('open');
  mobileNav.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger && hamburger.addEventListener('click', toggleMobileNav);

/* Close on ESC */
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMobileNav(); });

/* ── Smooth scroll (offset for fixed header) ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    closeMobileNav();
    const offset = header.offsetHeight + 16;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});

/* ── Reveal on scroll ── */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

/* ── Skill bars ── */
const skillFills = document.querySelectorAll('.skill-fill');
skillFills.forEach(bar => { bar.style.width = '0%'; });

const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.level + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-cat').forEach(cat => skillObserver.observe(cat));

/* ── Active nav link ── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const activeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        const active = a.getAttribute('href') === '#' + entry.target.id;
        a.style.color = active ? 'var(--lime)' : '';
      });
    }
  });
}, { threshold: 0.45 });

sections.forEach(s => activeObserver.observe(s));

/* ── Animated counter (hero stats) ── */
function animateCount(el, target, duration = 1200) {
  const suffix = el.dataset.suffix || '';
  let start = null;
  const step = ts => {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const val = Math.floor(ease * target);
    el.textContent = val + (progress < 1 ? '' : suffix);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.hero-stat-num').forEach(num => {
        const raw = num.textContent.replace(/\D/g,'');
        const plus = num.textContent.includes('+');
        if (raw) {
          animateCount(num, parseInt(raw), 1000);
          if (plus) setTimeout(() => { num.textContent = raw + '+'; }, 1050);
        }
      });
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statObserver.observe(heroStats);

/* ── Project cards — subtle tilt on hover (desktop only) ── */
if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x*4}deg) rotateX(${-y*4}deg) translateZ(4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ── Form UX: loading state ── */
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', () => {
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      btn.textContent = 'Enviando…';
      btn.disabled = true;
    }
  });
}

/* ── Console easter egg ── */
console.log(
  '%c ✦ RAPHAEL BARUCK ',
  'background:#D4AF37;color:#0c0c0c;font-weight:800;font-size:16px;padding:8px 16px;border-radius:2px;'
);
console.log('%c Dev Full-Stack & Founder · Magnorum', 'color:#7a7a7a;font-size:12px;');
console.log('%c raphabaruck@gmail.com', 'color:#D4AF37;font-size:11px;');