// ===== Theme toggle =====
const themeToggle = document.getElementById('theme-toggle');
const themeToggleFloat = document.getElementById('theme-toggle-float');
const themeIcons = document.querySelectorAll('.theme-icon');

function setTheme(theme) {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeIcons.forEach((icon) => { icon.textContent = '☀'; });
  } else {
    document.documentElement.removeAttribute('data-theme');
    themeIcons.forEach((icon) => { icon.textContent = '🌙'; });
  }
  localStorage.setItem('theme', theme);
}

setTheme(localStorage.getItem('theme') === 'light' ? 'light' : 'dark');

function toggleTheme() {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  setTheme(isLight ? 'dark' : 'light');
}

themeToggle.addEventListener('click', toggleTheme);
themeToggleFloat?.addEventListener('click', toggleTheme);

// ===== Mobile nav: hidden until scrolled past the cover photo =====
const navEl = document.querySelector('.nav');
const profileCover = document.querySelector('.profile-cover');
const mobileNavQuery = window.matchMedia('(max-width: 600px)');

if (navEl && profileCover) {
  const coverObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (mobileNavQuery.matches) {
          navEl.classList.toggle('nav--hidden', entry.isIntersecting);
        }
      });
    },
    { threshold: 0, rootMargin: '-50px 0px 0px 0px' }
  );

  coverObserver.observe(profileCover);

  mobileNavQuery.addEventListener('change', (e) => {
    if (!e.matches) navEl.classList.remove('nav--hidden');
  });
}

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

document.addEventListener('click', (e) => {
  if (mobileMenu.classList.contains('open') && !mobileMenu.contains(e.target) && !navToggle.contains(e.target)) {
    mobileMenu.classList.remove('open');
    navToggle.textContent = '☰';
  }
});

// ===== Skills render =====
const skillsGrid = document.getElementById('skills-grid');

if (skillsGrid && typeof SKILLS_DATA !== 'undefined') {
  skillsGrid.innerHTML = SKILLS_DATA.map((group) => `
    <div class="skill-card">
      <div class="skill-card-title">${group.title}</div>
      <div class="skill-icons-grid">
        ${group.icons.map((item) => `
          <div class="skill-icon-tile">
            <div class="skill-icon-box"><img src="${item.icon}" alt="${item.label}" loading="lazy"></div>
            <span class="skill-icon-label">${item.label}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// ===== Experience render =====
const timelineItems = document.getElementById('timeline-items');

if (timelineItems && typeof EXPERIENCE_DATA !== 'undefined') {
  timelineItems.innerHTML = EXPERIENCE_DATA.map((item) => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-period">${item.period}</div>
      <div class="timeline-role">${item.role}</div>
      <div class="timeline-company">${item.company}</div>
      <p class="timeline-desc">${item.desc}</p>
    </div>
  `).join('');
}

// ===== Certifications render =====
const certsGrid = document.getElementById('certs-grid');

if (certsGrid && typeof CERTIFICATIONS_DATA !== 'undefined') {
  certsGrid.innerHTML = CERTIFICATIONS_DATA.map((cert) => `
    <div class="cert-card">
      <div class="cert-icon">${cert.icon}</div>
      <div class="cert-name">${cert.name}</div>
      <div class="cert-meta">${cert.meta}</div>
    </div>
  `).join('');
}

// ===== Projects render =====
const projectsGrid = document.getElementById('projects-grid');

if (projectsGrid && typeof PROJECTS_DATA !== 'undefined') {
  projectsGrid.innerHTML = PROJECTS_DATA.map((project) => `
    <div class="project-card">
      <img class="project-image" src="${project.image}" alt="${project.name}" loading="lazy">
      <div class="project-body">
        <div class="project-name">${project.name}</div>
        <p class="project-desc">${project.desc}</p>
        <div class="project-tech">
          ${project.tech.map((tag) => `<span class="tech-tag">${tag}</span>`).join('')}
        </div>
        <a href="${project.link}" class="project-link">Xem chi tiết <span>→</span></a>
      </div>
    </div>
  `).join('');
}

// ===== Activities render =====
const activitiesGrid = document.getElementById('activities-grid');

if (activitiesGrid && typeof ACTIVITIES_DATA !== 'undefined') {
  activitiesGrid.innerHTML = ACTIVITIES_DATA.map((activity) => `
    <div class="activity-card">
      <img class="activity-image" src="${activity.image}" alt="${activity.title}" loading="lazy">
      <div class="activity-body">
        <div class="activity-title">${activity.title}</div>
        <div class="activity-year">${activity.year}</div>
      </div>
    </div>
  `).join('');
}

// ===== Scroll reveal =====
const revealTargets = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      el.classList.add('in-view');
      // Drop will-change once the transition settles so we're not paying
      // for a standing compositor layer on sections that already revealed.
      el.addEventListener('transitionend', () => el.classList.add('reveal-done'), { once: true });
      observer.unobserve(el);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });

revealTargets.forEach((el) => observer.observe(el));

// ===== Scroll to top + scroll-driven perf class =====
// Batched through rAF and marked passive so Safari doesn't block the
// compositor thread on every scroll tick.
const scrollTopBtn = document.getElementById('scroll-top-btn');

function toggleScrollTopBtn() {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 480);
}

let scrollRaf = null;
let scrollEndTimer = null;

function onScroll() {
  if (!document.body.classList.contains('is-scrolling')) {
    document.body.classList.add('is-scrolling');
  }
  clearTimeout(scrollEndTimer);
  scrollEndTimer = setTimeout(() => {
    document.body.classList.remove('is-scrolling');
  }, 160);

  if (scrollRaf) return;
  scrollRaf = requestAnimationFrame(() => {
    toggleScrollTopBtn();
    scrollRaf = null;
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
toggleScrollTopBtn();

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Contact form =====
const contactForm = document.getElementById('contact-form');
const successCard = document.getElementById('success-card');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  contactForm.classList.add('hidden');
  successCard.style.display = 'flex';
});
