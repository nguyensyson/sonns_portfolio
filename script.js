// ===== Mobile nav toggle =====
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');

navToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  navToggle.textContent = isOpen ? '✕' : '☰';
});

mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    navToggle.textContent = '☰';
  });
});

// ===== Scroll reveal =====
const revealTargets = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });

revealTargets.forEach((el) => observer.observe(el));

// ===== Contact form =====
const contactForm = document.getElementById('contact-form');
const successCard = document.getElementById('success-card');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  contactForm.classList.add('hidden');
  successCard.style.display = 'flex';
});
