/* Xoma Investment — script.js */

// Scroll header effect
const header = document.querySelector('.main-header');
window.addEventListener('scroll', () => {
  header && header.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile menu
const toggle = document.querySelector('.menu-toggle');
const nav    = document.querySelector('.main-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    nav.classList.toggle('open');
  });
  // Close on nav link click
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      nav.classList.remove('open');
    });
  });
}

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.anim').forEach(el => observer.observe(el));

// Counter animation for hero stats
function animateCounter(el, target, duration = 1800) {
  let start = null;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target = parseInt(el.dataset.target, 10);
      if (!isNaN(target)) animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

// Contact form intercept (replace with real backend / EmailJS later)
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Message Sent!';
      btn.style.background = '#3B6D11';
      form.reset();
    }, 1400);
  });
}