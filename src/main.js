import Lenis from 'lenis';
import L from 'leaflet';
import { SPA_CONFIG } from './spa-data.js';

/**
 * GLOW SPA & WELLNESS — KALABURAGI
 * High-Performance, Accessible, and Secure Interactive Core
 */

// ==========================================================================
// 1. INPUT SANITIZATION & SECURITY HELPER
// ==========================================================================
function sanitizeInput(str, maxLength = 120) {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/[<>'"&]/g, '') // Strip HTML/script injection characters
    .trim()
    .slice(0, maxLength);
}

// ==========================================================================
// 2. SMOOTH INERTIAL SCROLLING (LENIS) WITH ACCESSIBILITY CHECK
// ==========================================================================
let lenis = null;

function initSmoothScroll() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  lenis = new Lenis({
    duration: 1.0,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.2,
    infinite: false
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          lenis.scrollTo(targetEl, { offset: -80 });
          history.pushState(null, null, targetId);
        }
      }
    });
  });
}

// ==========================================================================
// 3. ELEGANT SCROLL-REVEAL ANIMATIONS (INTERSECTION OBSERVER)
// ==========================================================================
function initScrollAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const elements = document.querySelectorAll('.reveal-on-scroll');

  if (prefersReducedMotion) {
    elements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target); // Unobserve immediately for 60fps performance
      }
    });
  }, {
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.08
  });

  elements.forEach(el => observer.observe(el));
}

// ==========================================================================
// 4. STICKY HEADER & SCROLL PROGRESS
// ==========================================================================
function initStickyHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  let ticking = false;

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 25) {
          header.classList.add('scrolled', 'shadow-md');
        } else {
          header.classList.remove('scrolled', 'shadow-md');
        }
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ==========================================================================
// 5. ACCESSIBLE MOBILE NAVIGATION DRAWER
// ==========================================================================
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const closeBtn = document.getElementById('mobileNavClose');
  const drawer = document.getElementById('mobileDrawer');

  if (!drawer) return;

  const openDrawer = () => {
    drawer.classList.remove('hidden');
    drawer.setAttribute('aria-hidden', 'false');
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.add('hidden');
    drawer.setAttribute('aria-hidden', 'true');
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) closeDrawer();
  });

  drawer.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !drawer.classList.contains('hidden')) {
      closeDrawer();
    }
  });
}

// ==========================================================================
// 6. INTERACTIVE BOOKING CONCIERGE & SECURE WHATSAPP GENERATOR
// ==========================================================================
function initBookingConcierge() {
  const therapySelect = document.getElementById('booking-therapy');
  const dateInput = document.getElementById('booking-date');
  const partySelect = document.getElementById('booking-party');
  const timeInput = document.getElementById('selected-time');
  const therapistSelect = document.getElementById('booking-therapist');
  const nameInput = document.getElementById('booking-name');
  const notesInput = document.getElementById('booking-notes');
  const previewBox = document.getElementById('whatsapp-preview');
  const slotButtons = document.querySelectorAll('#time-slot-grid .slot-btn');
  const bookingForm = document.getElementById('spa-booking-form');

  // Set default minimum date to today
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    dateInput.min = today;
  }

  // Slot buttons selection
  slotButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      slotButtons.forEach(b => {
        b.className = 'slot-btn py-2 rounded-xl bg-white border border-royal-border hover:bg-royal-light text-royal-text-main text-xs font-semibold transition-all active:scale-95';
      });
      btn.className = 'slot-btn py-2 rounded-xl bg-royal-plum text-white text-xs font-semibold transition-all active:scale-95 shadow-sm';
      if (timeInput) timeInput.value = btn.innerText.trim();
      updatePreview();
    });
  });

  function updatePreview() {
    if (!previewBox) return;
    const therapy = sanitizeInput(therapySelect?.value || 'Classic Swedish Deep Relaxation');
    const party = sanitizeInput(partySelect?.value || 'Solo (1 Guest)');
    const time = sanitizeInput(timeInput?.value || '01:00 PM', 20);
    const name = sanitizeInput(nameInput?.value || 'Guest', 60);

    previewBox.textContent = `Hello Glow Spa, I would like to reserve ${therapy} for ${party} at ${time}. Name: ${name}.`;
  }

  [therapySelect, dateInput, partySelect, nameInput, notesInput].forEach(el => {
    el?.addEventListener('input', updatePreview);
    el?.addEventListener('change', updatePreview);
  });

  updatePreview();

  // Secure WhatsApp submission
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const therapy = sanitizeInput(therapySelect?.value || 'Classic Swedish Deep Relaxation');
      const date = sanitizeInput(dateInput?.value || 'Today', 20);
      const party = sanitizeInput(partySelect?.value || 'Solo (1 Guest)');
      const time = sanitizeInput(timeInput?.value || '01:00 PM', 20);
      const therapist = sanitizeInput(therapistSelect?.value || 'No Preference');
      const name = sanitizeInput(nameInput?.value || 'Guest', 60);
      const notes = sanitizeInput(notesInput?.value || '', 150);

      let msg = `Hello Glow Spa Kalaburagi,%0A%0AI wish to reserve an appointment:%0A• Name: ${encodeURIComponent(name)}%0A• Modality: ${encodeURIComponent(therapy)}%0A• Date: ${encodeURIComponent(date)}%0A• Time Slot: ${encodeURIComponent(time)}%0A• Party Size: ${encodeURIComponent(party)}%0A• Therapist Preference: ${encodeURIComponent(therapist)}`;
      if (notes) {
        msg += `%0A• Notes: ${encodeURIComponent(notes)}`;
      }
      msg += `%0A%0APlease confirm availability. Thank you!`;

      const whatsappUrl = `https://wa.me/${SPA_CONFIG.contact.whatsapp}?text=${msg}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  }
}

// ==========================================================================
// 7. LEAFLET INTERACTIVE MAP WITH ERROR BOUNDARY
// ==========================================================================
function initLeafletMap() {
  const mapContainer = document.getElementById('leafletMap');
  if (!mapContainer) return;

  try {
    const lat = SPA_CONFIG.coordinates.lat;
    const lng = SPA_CONFIG.coordinates.lng;

    const map = L.map('leafletMap', {
      center: [lat, lng],
      zoom: 16,
      scrollWheelZoom: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const customIcon = L.divIcon({
      className: 'custom-map-pin',
      html: `<div style="background: #6E2072; color: #FFF; width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; border: 3px solid #DDA0DD; box-shadow: 0 4px 14px rgba(221,160,221,0.45);"><i class="fas fa-spa" style="color: #DDA0DD;"></i></div>`,
      iconSize: [38, 38],
      iconAnchor: [19, 19]
    });

    L.marker([lat, lng], { icon: customIcon }).addTo(map)
      .bindPopup(`
        <div style="font-family: sans-serif; padding: 6px;">
          <strong style="color: #4E1252; font-size: 1rem;">Glow Spa Kalaburagi</strong><br/>
          <span style="font-size: 0.85rem; color: #555;">Ram Mandir Service Road, Above Onyx Italian Marble</span><br/>
          <a href="https://maps.google.com/?q=${lat},${lng}" target="_blank" rel="noopener noreferrer" style="color: #6E2072; font-weight: 600; font-size: 0.82rem; margin-top: 4px; display: inline-block;">Get Directions &rarr;</a>
        </div>
      `)
      .openPopup();

    // Invalidate map size on window resize for zero distortion
    window.addEventListener('resize', () => {
      map.invalidateSize();
    }, { passive: true });

  } catch (err) {
    console.warn('Map initialization deferred or failed gracefully:', err);
  }
}

// ==========================================================================
// DOM READY INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initScrollAnimations();
  initStickyHeader();
  initMobileNav();
  initBookingConcierge();
  initLeafletMap();
});
