import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  SPA_CONFIG, 
  SPATIAL_SPACES, 
  SERVICES, 
  REVIEWS, 
  HYGIENE_PILLARS, 
  NEIGHBORHOOD_GUIDES,
  STATS,
  TOP_SERVICES,
  FAQS,
  BLOG_POSTS,
  LOCALITY_TARGETS_50 
} from './spa-data.js';
import { spaAudio } from './audio.js';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// =========================================================
// 1. SMOOTH INERTIAL SCROLLING (LENIS)
// =========================================================
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential decay curve
  smoothWheel: true,
  touchMultiplier: 2,
  infinite: false
});

// Synchronize Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// =========================================================
// 2. ULTRA-SMOOTH VIDEO SCROLL-SCRUBBING TIMELINE ENGINE (300vh HERO)
// =========================================================
const video = document.getElementById('walkthrough-video');

let videoDuration = 15.0; // default 15s virtual camera walkthrough
let targetTime = 0;
let isSeeking = false;
let pendingSeekTime = null;

if (video) {
  video.addEventListener('loadedmetadata', () => {
    if (video.duration && !isNaN(video.duration)) {
      videoDuration = video.duration;
    }
  });

  // Hardware decode seek-lock queue: prevents video decoder pipeline thrashing and stutter
  video.addEventListener('seeked', () => {
    isSeeking = false;
    if (pendingSeekTime !== null) {
      const nextTime = pendingSeekTime;
      pendingSeekTime = null;
      performSeek(nextTime);
    }
  });

  // Ensure initial frame renders cleanly
  if (video.readyState >= 1) {
    video.currentTime = 0.001;
  } else {
    video.addEventListener('loadeddata', () => {
      video.currentTime = 0.001;
    }, { once: true });
  }
}

function performSeek(time) {
  if (!video || isNaN(time)) return;
  const clamped = Math.max(0, Math.min(videoDuration - 0.02, time));

  if (video.seeking || isSeeking) {
    pendingSeekTime = clamped;
    return;
  }

  // Only request seek if time change is greater than ~0.033s (one frame at 30fps)
  if (Math.abs(video.currentTime - clamped) > 0.033) {
    isSeeking = true;
    try {
      if (typeof video.fastSeek === 'function') {
        video.fastSeek(clamped);
      } else {
        video.currentTime = clamped;
      }
    } catch (e) {
      video.currentTime = clamped;
    }
  }
}

// GSAP ScrollTrigger binding scroll depth across 300vh
const heroSection = document.getElementById('hero');
if (heroSection) {
  ScrollTrigger.create({
    trigger: heroSection,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.15, // Butter-smooth damped progress curve
    onUpdate: (self) => {
      const progress = self.progress; // 0.000 to 1.000
      targetTime = progress * videoDuration;
      performSeek(targetTime);
      handlePhaseTransitions(progress);
    }
  });
}

// Phase narrative overlays logic
const phaseCards = [
  { id: 'phase-1', range: [0.00, 0.15] },
  { id: 'phase-2', range: [0.15, 0.30] },
  { id: 'phase-3', range: [0.30, 0.50] },
  { id: 'phase-4', range: [0.50, 0.75] },
  { id: 'phase-5', range: [0.75, 0.90] },
  { id: 'phase-6', range: [0.90, 1.00] }
];

function handlePhaseTransitions(progress) {
  phaseCards.forEach(phase => {
    const el = document.getElementById(phase.id);
    if (!el) return;
    if (progress >= phase.range[0] && progress < phase.range[1]) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}

// =========================================================
// 3. PERSISTENT HEADER CONDENSE ON SCROLL
// =========================================================
const siteHeader = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    siteHeader?.classList.add('scrolled');
  } else {
    siteHeader?.classList.remove('scrolled');
  }
}, { passive: true });

// Mobile navigation drawer toggle
const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = navLinks.classList.toggle('mobile-nav-open');
    mobileMenuBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    mobileMenuBtn.innerHTML = isActive 
      ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
      : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
  });

  // Mobile services dropdown toggle
  const dropdownTrigger = document.getElementById('servicesDropdownTrigger');
  const dropdownWrapper = document.querySelector('.nav-dropdown-wrapper');
  if (dropdownTrigger && dropdownWrapper) {
    dropdownTrigger.addEventListener('click', (e) => {
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        e.stopPropagation();
        dropdownWrapper.classList.toggle('open');
      }
    });
  }

  // Close mobile nav when clicking any nav destination link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (link.classList.contains('nav-dropdown-trigger')) return;
      navLinks.classList.remove('mobile-nav-open');
      if (dropdownWrapper) dropdownWrapper.classList.remove('open');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      mobileMenuBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });
  });

  // Close mobile nav when clicking outside
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      navLinks.classList.remove('mobile-nav-open');
      if (dropdownWrapper) dropdownWrapper.classList.remove('open');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      mobileMenuBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    }
  });
}

// =========================================================
// 4. DAY / NIGHT THEME TOGGLE
// =========================================================
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const rootEl = document.documentElement;

// Check saved theme
const savedTheme = localStorage.getItem('glow-theme') || 'day';
setTheme(savedTheme);

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const current = rootEl.getAttribute('data-theme');
    const next = current === 'night' ? 'day' : 'night';
    setTheme(next);
  });
}

function setTheme(theme) {
  rootEl.setAttribute('data-theme', theme);
  localStorage.setItem('glow-theme', theme);
  const icon = document.getElementById('theme-icon-sun');
  if (icon) {
    if (theme === 'night') {
      // Moon icon
      icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
      themeToggleBtn.title = 'Switch to Day Wellness Theme';
    } else {
      // Sun icon
      icon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
      themeToggleBtn.title = 'Switch to Chromotherapy Night Theme';
    }
  }
}

// =========================================================
// 5. AMBIENT SOUNDSCAPE CONTROLLER (WEB AUDIO API)
// =========================================================
const soundBtn = document.getElementById('sound-toggle-btn');
const soundLabel = document.getElementById('sound-label');

if (soundBtn) {
  soundBtn.addEventListener('click', () => {
    const isPlaying = spaAudio.toggle();
    if (isPlaying) {
      soundBtn.classList.add('playing');
      soundLabel.textContent = 'Playing Serenity';
    } else {
      soundBtn.classList.remove('playing');
      soundLabel.textContent = 'Spa Audio';
    }
  });
}

// =========================================================
// 5B. TOP SERVICES HIGHLIGHT GRID
// =========================================================
const topServicesGrid = document.getElementById('top-services-grid');

function renderTopServices() {
  if (!topServicesGrid) return;
  topServicesGrid.innerHTML = TOP_SERVICES.map(s => `
    <article class="top-service-card">
      <div class="top-service-thumb">
        <img src="${s.image}" alt="${s.name}" loading="lazy" />
      </div>
      <div class="top-service-body">
        <span class="top-service-badge">${s.category} &bull; ${s.tag}</span>
        <h3 class="top-service-title">${s.name}</h3>
        <span class="top-service-meta">${s.duration}</span>
        <p class="top-service-desc">${s.desc}</p>
        <div class="top-service-footer">
          <span class="top-service-price">${s.price}</span>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-secondary top-service-btn top-view-btn" data-service-id="${s.id}">
              Details
            </button>
            <button class="btn btn-primary top-service-btn top-book-btn" data-service-id="${s.id}">
              Book
            </button>
          </div>
        </div>
      </div>
    </article>
  `).join('');

  topServicesGrid.querySelectorAll('.top-view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-service-id');
      openTreatmentModal(id);
    });
  });

  topServicesGrid.querySelectorAll('.top-book-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-service-id');
      selectServiceInForm(id);
      lenis.scrollTo('#booking');
    });
  });
}
renderTopServices();

// =========================================================
// 5C. STATS COUNTER BAR WITH SCROLL ANIMATION
// =========================================================
const statsGrid = document.getElementById('stats-grid-container');

function renderStats() {
  if (!statsGrid) return;
  statsGrid.innerHTML = STATS.map(s => `
    <div class="stat-item">
      <div class="stat-number" data-target="${s.number}">0</div>
      <div class="stat-label">${s.label}</div>
    </div>
  `).join('');

  const statNumbers = statsGrid.querySelectorAll('.stat-number');
  let counted = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        statNumbers.forEach(item => {
          const target = item.getAttribute('data-target') || '100%';
          const isPercent = target.includes('%');
          const isPlus = target.includes('+');
          const isSlash = target.includes('/');

          if (isSlash) {
            item.textContent = target;
          } else {
            const numValue = parseInt(target.replace(/[^0-9]/g, '')) || 100;
            let current = 0;
            const step = Math.max(1, Math.floor(numValue / 28));
            const timer = setInterval(() => {
              current += step;
              if (current >= numValue) {
                current = numValue;
                clearInterval(timer);
              }
              item.textContent = current + (isPercent ? '%' : (isPlus ? '+' : ''));
            }, 35);
          }
        });
      }
    });
  }, { threshold: 0.25 });

  const statsBar = document.querySelector('.stats-counter-bar');
  if (statsBar) observer.observe(statsBar);
}
renderStats();

// =========================================================
// 5D. THERAPEUTIC ACCORDION & DYNAMIC SUITE PREVIEW
// =========================================================
function initTherapeuticAccordion() {
  const items = document.querySelectorAll('.therapeutic-accordion-item');
  const img = document.getElementById('accordion-dynamic-img');
  if (!items.length) return;

  items.forEach(item => {
    const header = item.querySelector('.therapeutic-accordion-header');
    header?.addEventListener('click', () => {
      const wasActive = item.classList.contains('active');

      items.forEach(i => i.classList.remove('active'));

      if (!wasActive) {
        item.classList.add('active');
        const newImg = item.getAttribute('data-img');
        if (img && newImg) {
          img.style.opacity = '0.35';
          setTimeout(() => {
            img.src = newImg;
            img.style.opacity = '1';
          }, 180);
        }
      }
    });
  });
}
initTherapeuticAccordion();

// =========================================================
// 6. SPATIAL ARCHITECTURE & 3D INTERACTIVE CARDS
// =========================================================
const spacesGrid = document.getElementById('spaces-grid-container');

function renderSpaces() {
  if (!spacesGrid) return;
  spacesGrid.innerHTML = SPATIAL_SPACES.map(space => `
    <article class="space-card" data-space-id="${space.id}">
      <div class="space-media-wrapper">
        <img class="space-image" src="${space.image}" alt="${space.title}" loading="lazy" />
        <span class="space-category-badge">${space.category}</span>
      </div>
      <div class="space-body">
        <span class="space-subtitle">${space.subtitle}</span>
        <h3 class="space-title">${space.title}</h3>
        <p class="space-desc">${space.description}</p>
        <ul class="space-features-list">
          ${space.features.map(f => `<li class="space-feature-tag">${f}</li>`).join('')}
        </ul>
      </div>
    </article>
  `).join('');

  // Attach 3D tilt perspective to each card
  document.querySelectorAll('.space-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPct = (x / rect.width - 0.5) * 2; // -1 to 1
      const yPct = (y / rect.height - 0.5) * 2;
      card.style.transform = `perspective(1000px) rotateY(${xPct * 4.5}deg) rotateX(${-yPct * 4.5}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0)';
    });

    card.addEventListener('click', () => {
      const id = card.getAttribute('data-space-id');
      openSpaceModal(id);
    });
  });
}
renderSpaces();


// Space Modal Lightbox
const spaceModal = document.getElementById('space-lightbox-modal');
const spaceModalBody = document.getElementById('space-modal-body');
const modalCloseSpace = document.getElementById('modal-close-space');

function openSpaceModal(spaceId) {
  const space = SPATIAL_SPACES.find(s => s.id === spaceId);
  if (!space || !spaceModal || !spaceModalBody) return;

  spaceModalBody.innerHTML = `
    <div style="position: relative;">
      <img src="${space.image}" alt="${space.title}" style="width: 100%; max-height: 550px; object-fit: cover; display: block;" />
      <div style="padding: 2.2rem;">
        <span class="section-tag">${space.category} &bull; ${space.subtitle}</span>
        <h3 style="font-size: 2rem; margin-bottom: 0.85rem; color: var(--color-walnut);">${space.title}</h3>
        <p style="font-size: 1.05rem; line-height: 1.7; margin-bottom: 1.5rem;">${space.description}</p>
        <div style="margin-bottom: 1.5rem;">
          <h4 style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-champagne-gold); margin-bottom: 0.6rem;">Key Finishes &amp; Amenities</h4>
          <ul class="space-features-list">
            ${space.features.map(f => `<li class="space-feature-tag" style="padding: 0.45rem 0.9rem; font-size: 0.85rem;">${f}</li>`).join('')}
          </ul>
        </div>
        <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
          <a href="#booking" class="btn btn-gold modal-book-trigger">Reserve Experience in This Suite</a>
          <button class="btn btn-outline" id="modal-close-inner">Close Overview</button>
        </div>
      </div>
    </div>
  `;

  spaceModal.classList.add('active');
  spaceModal.setAttribute('aria-hidden', 'false');

  document.getElementById('modal-close-inner')?.addEventListener('click', closeSpaceModal);
  document.querySelector('.modal-book-trigger')?.addEventListener('click', () => {
    closeSpaceModal();
  });
}

function closeSpaceModal() {
  spaceModal?.classList.remove('active');
  spaceModal?.setAttribute('aria-hidden', 'true');
}

modalCloseSpace?.addEventListener('click', closeSpaceModal);
spaceModal?.addEventListener('click', (e) => {
  if (e.target === spaceModal) closeSpaceModal();
});

// =========================================================
// 7. CURATED TREATMENT CATALOG & FILTERING
// =========================================================
const servicesGrid = document.getElementById('services-grid-container');
const filterPills = document.querySelectorAll('.filter-pill');

function renderServices(filter = 'all') {
  if (!servicesGrid) return;
  const filtered = filter === 'all' 
    ? SERVICES 
    : SERVICES.filter(s => s.category.toLowerCase() === filter.toLowerCase());

  servicesGrid.innerHTML = filtered.map(service => `
    <article class="service-card ${service.isPopular ? 'popular-tag' : ''}">
      <div class="service-header">
        <div>
          <span class="service-category-tag">${service.tag}</span>
          <h3 class="service-name">${service.name}</h3>
        </div>
      </div>

      <div class="service-pricing-row">
        <span class="service-price">${service.priceRange}</span>
        <span class="service-duration">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          ${service.duration}
        </span>
      </div>

      <p class="service-desc">${service.shortDesc}</p>

      <div class="service-includes-preview">
        <span class="service-includes-title">Includes:</span>
        <div class="includes-chips">
          ${service.includes.slice(0, 3).map(inc => `<span class="chip">${inc}</span>`).join('')}
          ${service.includes.length > 3 ? `<span class="chip">+${service.includes.length - 3} more</span>` : ''}
        </div>
      </div>

      <div class="service-actions">
        <button class="btn btn-secondary view-service-btn" data-service-id="${service.id}">
          Details
        </button>
        <button class="btn btn-primary book-service-btn" data-service-id="${service.id}">
          Book
        </button>
      </div>
    </article>
  `).join('');

  // Attach button events
  document.querySelectorAll('.view-service-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-service-id');
      openTreatmentModal(id);
    });
  });

  document.querySelectorAll('.book-service-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-service-id');
      selectServiceInForm(id);
      lenis.scrollTo('#booking');
    });
  });
}
renderServices();

filterPills.forEach(pill => {
  pill.addEventListener('click', () => {
    filterPills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    const cat = pill.getAttribute('data-category');
    renderServices(cat);
  });
});

// Treatment Details Modal
const treatmentModal = document.getElementById('treatment-modal');
const treatmentModalBody = document.getElementById('treatment-modal-body');
const modalCloseTreatment = document.getElementById('modal-close-treatment');

function openTreatmentModal(serviceId) {
  const service = SERVICES.find(s => s.id === serviceId);
  if (!service || !treatmentModal || !treatmentModalBody) return;

  treatmentModalBody.innerHTML = `
    <span class="section-tag">${service.category} &bull; ${service.tag}</span>
    <h3 style="font-size: 2.2rem; margin-bottom: 0.5rem; color: var(--color-walnut);">${service.name}</h3>
    
    <div class="service-pricing-row" style="margin: 1.25rem 0;">
      <span class="service-price" style="font-size: 2rem;">${service.priceRange}</span>
      <span class="service-duration" style="font-size: 1rem;">Duration: ${service.duration}</span>
    </div>

    <p style="font-size: 1.05rem; line-height: 1.75; margin-bottom: 1.8rem;">
      ${service.fullDesc}
    </p>

    <div style="margin-bottom: 1.8rem;">
      <h4 style="font-size: 1.1rem; color: var(--color-walnut); margin-bottom: 0.75rem;">Therapeutic &amp; Somatic Benefits</h4>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem;">
        ${service.benefits.map(b => `
          <li style="display: flex; align-items: center; gap: 0.65rem; color: var(--color-smoked-sage);">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-champagne-gold)" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            ${b}
          </li>
        `).join('')}
      </ul>
    </div>

    <div style="margin-bottom: 2rem;">
      <h4 style="font-size: 1.1rem; color: var(--color-walnut); margin-bottom: 0.75rem;">Included Rituals &amp; Amenities</h4>
      <div class="includes-chips">
        ${service.includes.map(inc => `<span class="chip" style="font-size: 0.85rem; padding: 0.4rem 0.8rem;">${inc}</span>`).join('')}
      </div>
    </div>

    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
      <button class="btn btn-gold modal-reserve-btn" data-service-id="${service.id}">
        Reserve This Modality via WhatsApp
      </button>
      <button class="btn btn-outline" id="treatment-close-inner">
        Back to Catalog
      </button>
    </div>
  `;

  treatmentModal.classList.add('active');
  treatmentModal.setAttribute('aria-hidden', 'false');

  document.getElementById('treatment-close-inner')?.addEventListener('click', closeTreatmentModal);
  document.querySelector('.modal-reserve-btn')?.addEventListener('click', () => {
    selectServiceInForm(service.id);
    closeTreatmentModal();
    lenis.scrollTo('#booking');
  });
}

function closeTreatmentModal() {
  treatmentModal?.classList.remove('active');
  treatmentModal?.setAttribute('aria-hidden', 'true');
}

modalCloseTreatment?.addEventListener('click', closeTreatmentModal);
treatmentModal?.addEventListener('click', (e) => {
  if (e.target === treatmentModal) closeTreatmentModal();
});

// =========================================================
// 8. HYGIENE & SANCTUARY STANDARDS
// =========================================================
const hygieneGrid = document.getElementById('hygiene-grid-container');

function renderHygiene() {
  if (!hygieneGrid) return;
  const iconsMap = {
    sparkles: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z"/></svg>',
    droplet: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',
    leaf: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>',
    'shield-check': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>',
    wind: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.7 7.7A2.5 2.5 0 0 1 20 10H3"/><path d="M19.7 12.3A2.5 2.5 0 0 0 18 10H3"/><path d="M14.7 16.3A2.5 2.5 0 0 1 12 19H3"/></svg>',
    lock: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>'
  };

  hygieneGrid.innerHTML = HYGIENE_PILLARS.map(p => `
    <div class="hygiene-card">
      <div class="hygiene-icon-wrap">
        ${iconsMap[p.icon] || ''}
      </div>
      <h3 class="hygiene-card-title">${p.title}</h3>
      <p class="hygiene-card-desc">${p.desc}</p>
    </div>
  `).join('');
}
renderHygiene();

// =========================================================
// 9. VERIFIED REVIEWS MARQUEE
// =========================================================
const marqueeTrack = document.getElementById('reviews-marquee-track');

function renderReviews() {
  if (!marqueeTrack) return;
  // Duplicate array for infinite scroll illusion
  const doubled = [...REVIEWS, ...REVIEWS];
  marqueeTrack.innerHTML = doubled.map(r => `
    <div class="review-bubble">
      <div>
        <div class="review-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <p class="review-text">"${r.text}"</p>
      </div>
      <div class="review-author">
        <div>
          <div class="reviewer-name">${r.name}</div>
          <div class="reviewer-location">${r.location}</div>
        </div>
        <span class="reviewer-badge">&check; Verified Guest</span>
      </div>
    </div>
  `).join('');
}
renderReviews();

// =========================================================
// 10. RESERVATION CONCIERGE & WHATSAPP GENERATOR
// =========================================================
const selectServiceEl = document.getElementById('book-service');
const bookDateEl = document.getElementById('book-date');
const bookGuestsEl = document.getElementById('book-guests');
const bookTherapistEl = document.getElementById('book-therapist');
const bookNameEl = document.getElementById('book-name');
const bookNotesEl = document.getElementById('book-notes');
const previewCodeEl = document.getElementById('whatsapp-preview-text');
const reservationForm = document.getElementById('reservation-form');

// Populate service options
if (selectServiceEl) {
  selectServiceEl.innerHTML = SERVICES.map(s => `
    <option value="${s.name}" data-service-id="${s.id}">
      ${s.name} (${s.duration} - ${s.priceRange})
    </option>
  `).join('');
}

// Set default date to today
if (bookDateEl) {
  const today = new Date().toISOString().split('T')[0];
  bookDateEl.value = today;
  bookDateEl.min = today;
}

// Time slot selection
let selectedSlot = '04:30 PM';
const slotButtons = document.querySelectorAll('.slot-btn');
slotButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    slotButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedSlot = btn.getAttribute('data-time');
    updateWhatsAppPreview();
  });
});

function selectServiceInForm(serviceId) {
  const service = SERVICES.find(s => s.id === serviceId);
  if (service && selectServiceEl) {
    selectServiceEl.value = service.name;
    updateWhatsAppPreview();
  }
}

function updateWhatsAppPreview() {
  const serviceName = selectServiceEl?.value || 'Signature Therapy';
  const dateVal = bookDateEl?.value || 'Selected Date';
  const guestsVal = bookGuestsEl?.value || 'Solo (1 Guest)';
  const therapistVal = bookTherapistEl?.value || 'Female Therapist';
  const nameVal = bookNameEl?.value?.trim() || '[Your Name]';
  const notesVal = bookNotesEl?.value?.trim() || '';

  let text = `Hello Glow Spa, I would like to reserve an appointment:\n\n` +
             `• Service: ${serviceName}\n` +
             `• Date: ${dateVal}\n` +
             `• Time: ${selectedSlot}\n` +
             `• Guests: ${guestsVal}\n` +
             `• Therapist: ${therapistVal}\n` +
             `• Guest Name: ${nameVal}`;

  if (notesVal) {
    text += `\n• Focus: ${notesVal}`;
  }

  if (previewCodeEl) {
    previewCodeEl.textContent = text;
  }
}

// Form listeners for live preview update
[selectServiceEl, bookDateEl, bookGuestsEl, bookTherapistEl, bookNameEl, bookNotesEl].forEach(el => {
  el?.addEventListener('input', updateWhatsAppPreview);
  el?.addEventListener('change', updateWhatsAppPreview);
});
updateWhatsAppPreview();

// Form submit: launch WhatsApp
if (reservationForm) {
  reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    updateWhatsAppPreview();
    const rawText = previewCodeEl?.textContent?.trim() || 'Hello Glow Spa, I would like to reserve an appointment.';
    const encoded = encodeURIComponent(rawText);
    const whatsappUrl = `https://wa.me/${SPA_CONFIG.contact.whatsapp}?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
  });
}

// =========================================================
// 11. INTERACTIVE LEAFLET CARTOGRAPHY
// =========================================================
function initMap() {
  const mapElement = document.getElementById('leaflet-map');
  if (!mapElement) return;

  // Check if Leaflet is loaded
  if (typeof window.L === 'undefined') {
    // Dynamically load leaflet script if needed
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
    script.crossOrigin = '';
    script.onload = () => createLeafletInstance();
    document.head.appendChild(script);
  } else {
    createLeafletInstance();
  }
}

function createLeafletInstance() {
  const L = window.L;
  const lat = SPA_CONFIG.coordinates.lat;
  const lng = SPA_CONFIG.coordinates.lng;

  const map = L.map('leaflet-map', {
    center: [lat, lng],
    zoom: 16,
    scrollWheelZoom: false
  });

  // Warm, pastel map tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Custom Lotus Botanical Pin
  const customIcon = L.divIcon({
    className: 'custom-leaflet-lotus-marker',
    html: `
      <div style="
        width: 44px; 
        height: 44px; 
        background: #1C2618; 
        border-radius: 50%; 
        border: 3px solid #6E844E; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        box-shadow: 0 4px 20px rgba(28,38,24,0.45);">
        <svg width="24" height="24" viewBox="0 0 48 48" fill="#D4AF37">
          <path d="M24 4C22.2 11.2 17.5 17.8 11 21.5C17.5 23.5 22.8 28 24 35.5C25.2 28 30.5 23.5 37 21.5C30.5 17.8 25.8 11.2 24 4Z" />
          <path d="M24 35.5C19.2 40.5 13 43 5 43C11 45.5 17.5 45.5 24 43C30.5 45.5 37 45.5 43 43C35 43 28.8 40.5 24 35.5Z" opacity="0.8" />
        </svg>
      </div>
    `,
    iconSize: [44, 44],
    iconAnchor: [22, 22]
  });

  const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
  marker.bindPopup(`
    <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 4px;">
      <strong style="font-size: 1.15rem; color: #1C2618; font-family: 'Playfair Display', serif;">Glow Spa</strong><br />
      <span style="font-size: 0.85rem; color: #3E5037;">Office No. 2, 1st Floor, Above Onyx Italian Marble Store</span><br />
      <span style="font-size: 0.82rem; color: #556D3B; font-weight: 700;">Ram Mandir Service Road, Kalaburagi</span><br />
      <div style="margin-top: 8px;">
        <a href="https://maps.google.com/?q=${lat},${lng}" target="_blank" style="color: #0E776A; font-weight: bold; font-size: 0.85rem; text-decoration: underline;">
          Navigate in Google Maps &rarr;
        </a>
      </div>
    </div>
  `).openPopup();
}

window.addEventListener('DOMContentLoaded', initMap);

// =========================================================
// 12. KALABURAGI LOCALITIES HUB
// =========================================================
const localitiesGrid = document.getElementById('localities-grid-container');

function renderLocalities() {
  if (!localitiesGrid) return;
  localitiesGrid.innerHTML = NEIGHBORHOOD_GUIDES.map(g => `
    <div class="locality-card">
      <div>
        <div class="locality-header">
          <h4 class="locality-name">${g.zone}</h4>
          <span class="locality-distance">${g.distance}</span>
        </div>
        <p class="locality-desc">${g.directions}</p>
      </div>
      <div>
        <a href="https://maps.google.com/?q=${SPA_CONFIG.coordinates.lat},${SPA_CONFIG.coordinates.lng}" target="_blank" rel="noopener noreferrer" class="locality-link">
          Directions on Google Maps &rarr;
        </a>
      </div>
    </div>
  `).join('');
}
renderLocalities();

// =========================================================
// 13. FREQUENTLY ASKED QUESTIONS ACCORDION
// =========================================================
const faqContainer = document.getElementById('faq-list-container');

function renderFAQs() {
  if (!faqContainer) return;
  faqContainer.innerHTML = FAQS.map((faq, idx) => `
    <div class="faq-item ${idx === 0 ? 'active' : ''}">
      <button class="faq-question">
        <span>${faq.q}</span>
        <span class="faq-icon" style="font-size: 1.3rem; color: var(--color-champagne-gold); transition: transform 0.25s ease; font-weight: 600;">${idx === 0 ? '−' : '+'}</span>
      </button>
      <div class="faq-answer" style="padding: 0 1.8rem 1.4rem 1.8rem; font-size: 0.95rem; line-height: 1.7; color: var(--color-smoked-sage); display: ${idx === 0 ? 'block' : 'none'};">
        ${faq.a}
      </div>
    </div>
  `).join('');

  faqContainer.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const icon = item.querySelector('.faq-icon');
      const isActive = item.classList.contains('active');

      // Close all
      faqContainer.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('active');
        const ans = i.querySelector('.faq-answer');
        const ic = i.querySelector('.faq-icon');
        if (ans) ans.style.display = 'none';
        if (ic) ic.textContent = '+';
      });

      if (!isActive) {
        item.classList.add('active');
        if (answer) answer.style.display = 'block';
        if (icon) icon.textContent = '−';
      }
    });
  });
}
renderFAQs();

// =========================================================
// 13B. AREA-BY-AREA BLOG LIBRARY & WELLNESS GUIDES
// =========================================================
const blogsGrid = document.getElementById('blogs-grid-container');
const blogFilterButtons = document.querySelectorAll('.blog-filter-btn');

function renderBlogs(filter = 'all') {
  if (!blogsGrid) return;
  const filtered = filter === 'all'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(b => b.category.toLowerCase() === filter.toLowerCase());

  blogsGrid.innerHTML = filtered.map(blog => `
    <article class="blog-card" data-blog-id="${blog.id}">
      <div class="blog-card-thumb">
        <img src="${blog.image}" alt="${blog.title}" loading="lazy" />
        <span class="blog-card-badge">${blog.area}</span>
      </div>
      <div class="blog-card-body">
        <div class="blog-meta-row">
          <span>${blog.category}</span>
          <span>${blog.readTime}</span>
        </div>
        <h3 class="blog-title">${blog.title}</h3>
        <p class="blog-excerpt">${blog.summary}</p>
        <div class="blog-footer">
          <button class="blog-read-btn" data-blog-id="${blog.id}">
            Read Guide &rarr;
          </button>
          <a href="https://wa.me/${SPA_CONFIG.contact.whatsapp}?text=${encodeURIComponent(blog.bookingMessage)}" target="_blank" rel="noopener noreferrer" class="blog-whatsapp-btn">
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  `).join('');

  blogsGrid.querySelectorAll('.blog-read-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-blog-id');
      openBlogModal(id);
    });
  });
}
renderBlogs();

blogFilterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    blogFilterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    renderBlogs(filter);
  });
});

// Blog Reader Modal Lightbox
const blogModal = document.getElementById('blog-reader-modal');
const blogModalBody = document.getElementById('blog-modal-body');
const modalCloseBlog = document.getElementById('modal-close-blog');

function openBlogModal(blogId) {
  const blog = BLOG_POSTS.find(b => b.id === blogId);
  if (!blog || !blogModal || !blogModalBody) return;

  const encodedMsg = encodeURIComponent(blog.bookingMessage);

  blogModalBody.innerHTML = `
    <div class="blog-modal-header">
      <div class="blog-modal-meta">
        <span>${blog.area} &bull; ${blog.category}</span>
        <span>&bull;</span>
        <span>${blog.readTime}</span>
      </div>
      <h2 class="blog-modal-title">${blog.title}</h2>
      <p style="font-size: 1.05rem; font-style: italic; color: var(--color-champagne-gold); margin: 0;">${blog.subtitle}</p>
    </div>

    <div class="blog-modal-content">
      <img src="${blog.image}" alt="${blog.title}" style="width: 100%; max-height: 380px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: 1.8rem;" />

      ${blog.paragraphs.map(p => `<p>${p}</p>`).join('')}

      <div class="blog-booking-callout">
        <strong>Suggested Booking Enquiry for ${blog.area} Residents:</strong>
        <code>&ldquo;${blog.bookingMessage}&rdquo;</code>
        <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; margin-top: 0.8rem;">
          <a href="https://wa.me/${SPA_CONFIG.contact.whatsapp}?text=${encodedMsg}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="padding: 0.65rem 1.4rem; font-size: 0.9rem;">
            Send This Message on WhatsApp
          </a>
          <button class="btn btn-outline" id="blog-modal-book-now">
            Reserve Online Form
          </button>
        </div>
      </div>

      <div style="margin-top: 1.8rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
        ${blog.tags.map(t => `<span class="chip">#${t}</span>`).join('')}
      </div>
    </div>
  `;

  blogModal.classList.add('active');
  blogModal.setAttribute('aria-hidden', 'false');

  document.getElementById('blog-modal-book-now')?.addEventListener('click', () => {
    closeBlogModal();
    lenis.scrollTo('#booking');
  });
}

function closeBlogModal() {
  blogModal?.classList.remove('active');
  blogModal?.setAttribute('aria-hidden', 'true');
}

modalCloseBlog?.addEventListener('click', closeBlogModal);
blogModal?.addEventListener('click', (e) => {
  if (e.target === blogModal) closeBlogModal();
});

// =========================================================
// 13C. 50-LOCALITY DIRECTORY WITH INSTANT SEARCH
// =========================================================
const areaDirectoryGrid = document.getElementById('area-directory-grid');
const areaSearchInput = document.getElementById('area-search-input');

function renderAreaDirectory(query = '') {
  if (!areaDirectoryGrid) return;
  const q = query.trim().toLowerCase();
  const filtered = q
    ? LOCALITY_TARGETS_50.filter(item => 
        item.area.toLowerCase().includes(q) || 
        item.title.toLowerCase().includes(q) || 
        item.category.toLowerCase().includes(q)
      )
    : LOCALITY_TARGETS_50;

  if (filtered.length === 0) {
    areaDirectoryGrid.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 2rem; text-align: center; color: var(--color-smoked-sage);">
        No matching locality found for "${query}". You can still book an appointment from anywhere in Kalaburagi directly via WhatsApp!
      </div>
    `;
    return;
  }

  areaDirectoryGrid.innerHTML = filtered.map(item => `
    <div class="area-dir-item" data-area="${item.area}">
      <div class="area-dir-top">
        <span class="area-dir-name">${item.area}</span>
        <span class="area-dir-category">${item.category}</span>
      </div>
      <p class="area-dir-article">${item.title}</p>
    </div>
  `).join('');

  areaDirectoryGrid.querySelectorAll('.area-dir-item').forEach(item => {
    item.addEventListener('click', () => {
      const area = item.getAttribute('data-area');
      // If matches one of 10 blogs, open it
      const matchedBlog = BLOG_POSTS.find(b => b.area.toLowerCase() === area.toLowerCase());
      if (matchedBlog) {
        openBlogModal(matchedBlog.id);
      } else {
        // Pre-fill booking message and scroll to booking
        const msg = `Hello GLOW FAMILY SPA. I am enquiring from ${area}. Please share your treatment menu, total prices, available appointments and verified location pin.`;
        window.open(`https://wa.me/${SPA_CONFIG.contact.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
      }
    });
  });
}
renderAreaDirectory();

if (areaSearchInput) {
  areaSearchInput.addEventListener('input', (e) => {
    renderAreaDirectory(e.target.value);
  });
}

// =========================================================
// 14. SMOOTH SCROLL ANCHORS WITH LENIS & DROPDOWN HANDLING
// =========================================================
const servicesDropdownTrigger = document.getElementById('servicesDropdownTrigger');
const navDropdownWrapper = document.querySelector('.nav-dropdown-wrapper');

if (servicesDropdownTrigger && navDropdownWrapper) {
  servicesDropdownTrigger.addEventListener('click', (e) => {
    if (window.innerWidth <= 1024) {
      e.preventDefault();
      navDropdownWrapper.classList.toggle('active');
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href && href.length > 1) {
      const targetEl = document.querySelector(href);
      if (targetEl) {
        e.preventDefault();
        lenis.scrollTo(targetEl, { offset: -70 });
        if (window.innerWidth <= 1024 && navLinks) {
          navLinks.style.display = 'none';
        }
      }
    }
  });
});

// =========================================================
// 15. LUXURY PARALLAX & MICRO-INTERACTION ENGINE
// =========================================================

// A. Realtime Header Reading & Scroll Depth Progress
const progressBar = document.getElementById('scrollProgress');
function updateScrollProgress() {
  if (!progressBar) return;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });
lenis.on('scroll', updateScrollProgress);

// B. Ambient Botanical Parallax Floating Mesh Orbs
const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isDesktop = window.innerWidth > 768;

if (isDesktop && !isReducedMotion) {
  const orb1 = document.querySelector('.ambient-parallax-orb.orb-1');
  const orb2 = document.querySelector('.ambient-parallax-orb.orb-2');
  const orb3 = document.querySelector('.ambient-parallax-orb.orb-3');

  if (orb1) {
    gsap.to(orb1, {
      y: -140,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2
      }
    });
  }

  if (orb2) {
    gsap.to(orb2, {
      y: -240,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.6
      }
    });
  }

  if (orb3) {
    gsap.to(orb3, {
      y: -180,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.4
      }
    });
  }

  // C. Sanctuary Masonry Gallery Vertical Parallax Depth
  const masonryItems = document.querySelectorAll('.masonry-img-item');
  masonryItems.forEach((item, index) => {
    const offset = (index % 2 === 0 ? 30 : -30);
    gsap.to(item, {
      y: offset,
      ease: 'none',
      scrollTrigger: {
        trigger: '#sanctuary',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2
      }
    });
  });

  const collageBadge = document.querySelector('.collage-badge-card');
  if (collageBadge) {
    gsap.to(collageBadge, {
      y: -40,
      ease: 'none',
      scrollTrigger: {
        trigger: '#sanctuary',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });
  }
}

// D. Reveal-on-Scroll Observer with Graceful Stagger
function initScrollReveals() {
  const targetSelectors = [
    '.section-header',
    '.top-service-card',
    '.service-card',
    '.space-card',
    '.blog-card',
    '.benefit-card',
    '.hygiene-item',
    '.review-bubble',
    '.locality-card',
    '.faq-item',
    '.collage-right-content',
    '.booking-card-wrapper',
    '.about-intro-grid'
  ];

  const targets = document.querySelectorAll(targetSelectors.join(', '));
  targets.forEach(el => el.classList.add('reveal-on-scroll'));

  if ('IntersectionObserver' in window && !isReducedMotion) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    targets.forEach(el => {
      const parentGrid = el.closest(
        '.top-services-grid, .treatment-catalog-grid, .space-grid, .blogs-masonry-grid, .benefits-quad-grid, .hygiene-grid, .localities-grid'
      );
      if (parentGrid) {
        const siblings = Array.from(parentGrid.children);
        const itemIdx = siblings.indexOf(el);
        if (itemIdx > 0) {
          el.classList.add(`reveal-delay-${(itemIdx % 4) + 1}`);
        }
      }
      observer.observe(el);
    });
  } else {
    targets.forEach(el => el.classList.add('is-revealed'));
  }
}

// Initialize reveals
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollReveals);
} else {
  initScrollReveals();
}

// Re-observe dynamic items after data rendering
setTimeout(initScrollReveals, 350);

// E. 3D Card Magnetic Micro-Interactions (Desktop)
if (window.innerWidth > 1024 && !isReducedMotion) {
  const tiltCards = document.querySelectorAll('.top-service-card, .space-card, .blog-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -3.5;
      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 3.5;
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

console.log('Glow Spa Interactive Application initialized with Lotus Botanical Luxury Theme.');

