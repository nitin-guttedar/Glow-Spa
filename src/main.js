/**
 * GLOW SPA & WELLNESS — KALABURAGI
 * Luxury Interactive Architecture & Animation Engine
 * Exact Template Implementation
 */

import Lenis from 'lenis';
import L from 'leaflet';
import { 
  SPA_CONFIG, 
  SPATIAL_SPACES, 
  SERVICES, 
  REVIEWS, 
  BLOG_POSTS,
  LOCALITY_TARGETS_50 
} from './spa-data.js';
import { spaAudio } from './audio.js';

// ==========================================================================
// 1. SMOOTH INERTIAL SCROLLING (LENIS)
// ==========================================================================
const lenis = new Lenis({
  duration: 1.1,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  touchMultiplier: 1.5,
  infinite: false
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Anchor link smooth scroll via Lenis
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId && targetId !== '#') {
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        lenis.scrollTo(targetEl, { offset: -70 });
        // Update URL hash without jump
        history.pushState(null, null, targetId);
      }
    }
  });
});

// ==========================================================================
// 2. STICKY HEADER & SCROLL PROGRESS BAR
// ==========================================================================
function initStickyHeader() {
  const header = document.getElementById('site-header');
  const progressBar = document.getElementById('scrollProgress');

  const onScroll = () => {
    const scrollY = window.scrollY;
    if (header) {
      if (scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    if (progressBar) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      progressBar.style.width = `${progress}%`;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ==========================================================================
// 3. MOBILE NAVIGATION DRAWER
// ==========================================================================
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const closeBtn = document.getElementById('mobileNavClose');
  const drawer = document.getElementById('mobileNavDrawer');

  if (!drawer) return;

  const openDrawer = () => drawer.classList.add('open');
  const closeDrawer = () => drawer.classList.remove('open');

  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('click', (e) => {
    if (drawer.classList.contains('open') && !drawer.contains(e.target) && !toggleBtn?.contains(e.target)) {
      closeDrawer();
    }
  });
}

// ==========================================================================
// 4. DAY / NIGHT CHROMOTHERAPY SPA TOGGLE
// ==========================================================================
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem('glow_spa_theme') || 'day';
  if (savedTheme === 'night') {
    document.documentElement.setAttribute('data-theme', 'night');
  }

  toggleBtn.addEventListener('click', () => {
    const isNight = document.documentElement.getAttribute('data-theme') === 'night';
    if (isNight) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('glow_spa_theme', 'day');
    } else {
      document.documentElement.setAttribute('data-theme', 'night');
      localStorage.setItem('glow_spa_theme', 'night');
    }
  });
}

// ==========================================================================
// 5. MEDITATIVE SPA AUDIO SOUNDSCAPE (WEB AUDIO API)
// ==========================================================================
function initAudio() {
  const audioBtn = document.getElementById('sound-toggle-btn');
  const audioLabel = document.getElementById('sound-label');

  if (!audioBtn) return;

  audioBtn.addEventListener('click', () => {
    const isPlaying = spaAudio.toggle();
    if (isPlaying) {
      audioBtn.classList.add('playing');
      if (audioLabel) audioLabel.textContent = 'Playing';
    } else {
      audioBtn.classList.remove('playing');
      if (audioLabel) audioLabel.textContent = 'Spa Audio';
    }
  });
}

// ==========================================================================
// 6. 3D VIRTUAL WALKTHROUGH VIDEO MODAL
// ==========================================================================
function initVideoModal() {
  const openBtn1 = document.getElementById('openHeroVideoBtn');
  const openBtn2 = document.getElementById('heroPlayTrigger');
  const modal = document.getElementById('video-walkthrough-modal');
  const closeBtn = document.getElementById('closeVideoModal');
  const video = document.getElementById('modalWalkthroughVideo');
  const modalBookBtn = document.getElementById('modalBookNowBtn');

  if (!modal || !video) return;

  const openModal = () => {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    video.currentTime = 0;
    video.play().catch(() => {});
  };

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    video.pause();
  };

  if (openBtn1) openBtn1.addEventListener('click', openModal);
  if (openBtn2) openBtn2.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  if (modalBookBtn) {
    modalBookBtn.addEventListener('click', () => {
      closeModal();
      lenis.scrollTo('#booking');
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

// ==========================================================================
// 7. INTERACTIVE BOOKING CONCIERGE & LIVE WHATSAPP CALCULATOR
// ==========================================================================
function initBookingForm() {
  const form = document.getElementById('spaBookingForm');
  const serviceSelect = document.getElementById('bookingService');
  const dateInput = document.getElementById('bookingDate');
  const durationSelect = document.getElementById('bookingDuration');
  const nameInput = document.getElementById('bookingName');
  const phoneInput = document.getElementById('bookingPhone');
  const notesInput = document.getElementById('bookingNotes');
  const previewBox = document.getElementById('bookingWhatsappPreview');
  const slotButtons = document.querySelectorAll('#timeSlotPills .slot-pill-btn');

  let selectedTime = '01:00 PM';

  // Set default date to today or tomorrow in local format
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.value = `${yyyy}-${mm}-${dd}`;
    dateInput.min = `${yyyy}-${mm}-${dd}`;
  }

  // Slot buttons selection
  slotButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      slotButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedTime = btn.getAttribute('data-time') || '01:00 PM';
      updatePreview();
    });
  });

  function updatePreview() {
    if (!previewBox) return;
    const service = serviceSelect?.value || 'Couple VIP Sanctuary Suite';
    const date = dateInput?.value || 'Today';
    const duration = durationSelect?.value || '90 Minutes';
    const name = nameInput?.value.trim() || '[Your Name]';
    const phone = phoneInput?.value.trim() || '[Your Contact]';
    const notes = notesInput?.value.trim() ? `\n• Special Notes: ${notesInput.value.trim()}` : '';

    const previewMsg = `Hello Glow Spa Kalaburagi, I would like to reserve a session:
• Therapy: ${service}
• Date: ${date}
• Time Slot: ${selectedTime} (${duration})
• Guest Name: ${name}
• Contact: ${phone}${notes}
• Location: Ram Mandir Service Road, Kalaburagi`;

    previewBox.textContent = previewMsg;
  }

  // Attach live update listeners
  [serviceSelect, dateInput, durationSelect, nameInput, phoneInput, notesInput].forEach(el => {
    el?.addEventListener('input', updatePreview);
    el?.addEventListener('change', updatePreview);
  });

  updatePreview();

  // Form submit handler -> Open WhatsApp with formatted reservation
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const service = serviceSelect?.value || 'Couple VIP Sanctuary Suite';
      const date = dateInput?.value || 'Today';
      const duration = durationSelect?.value || '90 Minutes';
      const name = nameInput?.value.trim() || 'Guest';
      const phone = phoneInput?.value.trim() || '';
      const notes = notesInput?.value.trim() ? `\n• Special Notes: ${notesInput.value.trim()}` : '';

      const message = `Hello Glow Spa Kalaburagi, I would like to reserve a session:
• Therapy: ${service}
• Date: ${date}
• Time Slot: ${selectedTime} (${duration})
• Guest Name: ${name}
• Contact: ${phone}${notes}
• Location: Ram Mandir Service Road, Above Onyx Italian Marble, Kalaburagi`;

      const encoded = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${SPA_CONFIG.contact.whatsapp}?text=${encoded}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // Allow therapy card book buttons to auto-populate and scroll to booking
  document.querySelectorAll('.book-trigger-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const serviceName = btn.getAttribute('data-service');
      if (serviceSelect && serviceName) {
        for (let i = 0; i < serviceSelect.options.length; i++) {
          if (serviceSelect.options[i].text.toLowerCase().includes(serviceName.toLowerCase())) {
            serviceSelect.selectedIndex = i;
            break;
          }
        }
        updatePreview();
      }
      lenis.scrollTo('#booking', { offset: -40 });
    });
  });
}

// ==========================================================================
// 8. EXPANDABLE ALL 12 SIGNATURE THERAPIES
// ==========================================================================
function initExtendedServices() {
  const toggleBtn = document.getElementById('toggleAllServicesBtn');
  const container = document.getElementById('allServicesExpanded');
  const grid = document.getElementById('extendedServicesGrid');

  if (!toggleBtn || !container || !grid) return;

  // Modalities 7 through 12
  const remainingServices = SERVICES.slice(6);

  grid.innerHTML = remainingServices.map(service => `
    <div class="therapy-card">
      <div class="therapy-card-img-wrap">
        <img src="${service.image}" alt="${service.name}" loading="lazy" />
        <span class="therapy-cat-badge">${service.category.toUpperCase()}</span>
      </div>
      <div class="therapy-card-body">
        <div class="therapy-title-row">
          <h3 class="therapy-title">${service.name}</h3>
          <span class="therapy-price">${service.priceRange}</span>
        </div>
        <div class="therapy-subtitle">${service.duration} &bull; ${service.tag}</div>
        <p class="therapy-desc">${service.shortDesc}</p>
        <div class="therapy-footer-row">
          <span class="therapy-duration-badge"><i class="far fa-clock"></i> ${service.duration}</span>
          <button class="btn btn-dark book-trigger-btn" data-service="${service.name}" style="padding: 8px 18px; font-size: 0.82rem;">
            Book Now &rarr;
          </button>
        </div>
      </div>
    </div>
  `).join('');

  // Re-bind book trigger buttons in extended grid
  grid.querySelectorAll('.book-trigger-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const serviceName = btn.getAttribute('data-service');
      const serviceSelect = document.getElementById('bookingService');
      if (serviceSelect && serviceName) {
        for (let i = 0; i < serviceSelect.options.length; i++) {
          if (serviceSelect.options[i].text.toLowerCase().includes(serviceName.toLowerCase())) {
            serviceSelect.selectedIndex = i;
            break;
          }
        }
      }
      lenis.scrollTo('#booking', { offset: -40 });
    });
  });

  toggleBtn.addEventListener('click', () => {
    const isHidden = container.style.display === 'none';
    if (isHidden) {
      container.style.display = 'block';
      toggleBtn.innerHTML = 'Collapse Additional Modalities &uarr;';
    } else {
      container.style.display = 'none';
      toggleBtn.innerHTML = 'View All 12 Signature Therapies & Full Packages Menu &darr;';
    }
  });
}

// ==========================================================================
// 9. 50-AREA DIRECTORY & 10 BLOG LIBRARY MODAL
// ==========================================================================
function initAreaAndBlogModal() {
  const openBtn = document.getElementById('openAreaDirectoryBtn');
  const modal = document.getElementById('area-directory-modal');
  const closeBtn = document.getElementById('closeAreaModal');
  const searchInput = document.getElementById('areaModalSearch');
  const tabLocalities = document.getElementById('modalTabLocalities');
  const tabBlogs = document.getElementById('modalTabBlogs');
  const localitiesList = document.getElementById('modalLocalitiesList');
  const blogsList = document.getElementById('modalBlogsList');

  if (!modal || !localitiesList || !blogsList) return;

  let activeTab = 'localities';

  const openModal = () => {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    render();
  };

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  };

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Locality pill clicks on the home page open the modal and search for that area
  document.querySelectorAll('.locality-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const area = pill.getAttribute('data-area') || '';
      if (searchInput) searchInput.value = area;
      openModal();
    });
  });

  // Tab switching
  tabLocalities?.addEventListener('click', () => {
    activeTab = 'localities';
    tabLocalities.className = 'btn btn-dark';
    tabBlogs.className = 'btn btn-light';
    localitiesList.style.display = 'grid';
    blogsList.style.display = 'none';
    render();
  });

  tabBlogs?.addEventListener('click', () => {
    activeTab = 'blogs';
    tabBlogs.className = 'btn btn-dark';
    tabLocalities.className = 'btn btn-light';
    blogsList.style.display = 'grid';
    localitiesList.style.display = 'none';
    render();
  });

  searchInput?.addEventListener('input', () => {
    render();
  });

  function render() {
    const q = (searchInput?.value || '').trim().toLowerCase();

    if (activeTab === 'localities') {
      const filtered = q
        ? LOCALITY_TARGETS_50.filter(item => 
            item.area.toLowerCase().includes(q) || 
            item.title.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q)
          )
        : LOCALITY_TARGETS_50;

      if (!filtered.length) {
        localitiesList.innerHTML = `<div style="grid-column: 1/-1; padding: 24px; text-align: center; color: var(--text-muted);">No matching locality found for "${searchInput.value}". Please contact our reception directly!</div>`;
        return;
      }

      localitiesList.innerHTML = filtered.map(item => `
        <div style="background: var(--bg-primary); border: 1px solid var(--border-subtle); border-radius: 14px; padding: 14px; transition: transform 0.2s ease;">
          <div style="font-weight: 600; font-size: 0.92rem; color: var(--text-main); margin-bottom: 2px;">
            ${item.area}
          </div>
          <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 8px;">
            ${item.category} &bull; ${item.commute}
          </div>
          <a href="https://wa.me/${SPA_CONFIG.contact.whatsapp}?text=Hello%20Glow%20Spa,%20I%20am%20inquiring%20from%20${encodeURIComponent(item.area)}%20about%20booking%20a%20private%20suite" target="_blank" rel="noopener noreferrer" style="font-size: 0.8rem; color: var(--text-accent); font-weight: 600;">
            Book from ${item.area} &rarr;
          </a>
        </div>
      `).join('');
    } else {
      const filteredBlogs = q
        ? BLOG_POSTS.filter(b => 
            b.title.toLowerCase().includes(q) || 
            b.area.toLowerCase().includes(q) ||
            b.summary.toLowerCase().includes(q)
          )
        : BLOG_POSTS;

      if (!filteredBlogs.length) {
        blogsList.innerHTML = `<div style="padding: 24px; text-align: center; color: var(--text-muted);">No matching blogs found for "${searchInput.value}".</div>`;
        return;
      }

      blogsList.innerHTML = filteredBlogs.map(blog => `
        <article style="background: var(--bg-primary); border: 1px solid var(--border-subtle); border-radius: 16px; padding: 20px;">
          <div style="font-size: 0.78rem; color: var(--text-accent); text-transform: uppercase; font-weight: 700; margin-bottom: 4px;">
            ${blog.area} &bull; ${blog.category}
          </div>
          <h4 style="font-family: var(--font-serif); font-size: 1.35rem; margin-bottom: 8px; color: var(--text-main);">
            ${blog.title}
          </h4>
          <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 14px;">
            ${blog.summary}
          </p>
          <a href="https://wa.me/${SPA_CONFIG.contact.whatsapp}?text=${encodeURIComponent(blog.bookingMessage)}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="padding: 6px 16px; font-size: 0.8rem;">
            <i class="fab fa-whatsapp"></i> Book for ${blog.area}
          </a>
        </article>
      `).join('');
    }
  }
}

// ==========================================================================
// 10. SPATIAL GALLERY 20-PHOTO LIGHTBOX
// ==========================================================================
function initFullGalleryModal() {
  const openBtn = document.getElementById('openFullGalleryBtn');
  const modal = document.getElementById('gallery-lightbox-modal');
  const closeBtn = document.getElementById('closeGalleryModal');
  const grid = document.getElementById('fullGalleryGrid');

  if (!modal || !grid) return;

  const openModal = () => {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  };

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  };

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Populate 20 real photos of Glow Spa
  const allPhotos = [
    { src: '/assets/reception-desk.jpg', title: 'Reception Desk & Fluted Walnut' },
    { src: '/assets/reception-lounge.jpg', title: 'Lounge & Chandelier' },
    { src: '/assets/therapy-suite-purple.jpg', title: 'Chromotherapy Master Suite' },
    { src: '/assets/therapy-suite-shower.jpg', title: 'Attached En-Suite Glass Shower' },
    { src: '/assets/master-suite.jpg', title: 'Master VIP Suite (Twin Tables)' },
    { src: '/assets/tatami-thai-suite.jpg', title: 'Traditional Tatami Thai Mat Suite' },
    { src: '/assets/spa-gallery-1.jpg', title: 'Mediterranean Hammam Suite' },
    { src: '/assets/spa-gallery-2.jpg', title: 'Ayurvedic Wooden Droni Bed' },
    { src: '/assets/spa-gallery-3.jpg', title: 'Swedish Massage Suite' },
    { src: '/assets/spa-gallery-4.jpg', title: 'Herbal Infused Organic Oils' },
    { src: '/assets/spa-gallery-5.jpg', title: 'Deep Tissue Recovery Table' },
    { src: '/assets/spa-gallery-6.jpg', title: 'Aromatic Eucalyptus Steam Bath' },
    { src: '/assets/spa-gallery-7.jpg', title: 'Foot Reflexology Lounge' },
    { src: '/assets/spa-gallery-8.jpg', title: 'Aromatherapy Diffusers' },
    { src: '/assets/spa-gallery-9.jpg', title: 'Single-Use Fresh Linens' },
    { src: '/assets/spa-gallery-10.jpg', title: 'Private Changing Suite' },
    { src: '/assets/spa-gallery-11.jpg', title: 'Warm Herbal Tea Station' },
    { src: '/assets/spa-gallery-12.jpg', title: 'Carrara Marble Corridor' },
    { src: '/assets/spa-gallery-13.jpg', title: 'Sanitized Glass Shower Stall' },
    { src: '/assets/spa-gallery-14.jpg', title: 'Sanctuary Ambient Lighting' }
  ];

  grid.innerHTML = allPhotos.map(p => `
    <div style="border-radius: 16px; overflow: hidden; height: 180px; position: relative; border: 1px solid var(--border-subtle);">
      <img src="${p.src}" alt="${p.title}" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy" />
      <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(180deg, transparent, rgba(0,0,0,0.8)); color: #FFF; padding: 12px; font-size: 0.78rem;">
        ${p.title}
      </div>
    </div>
  `).join('');
}

// ==========================================================================
// 11. LEAFLET MAP INITIALIZATION
// ==========================================================================
function initMap() {
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
      html: `<div style="background: #142C1E; color: #FFF; width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; border: 3px solid #C59A63; box-shadow: 0 4px 14px rgba(0,0,0,0.4);"><i class="fas fa-spa"></i></div>`,
      iconSize: [38, 38],
      iconAnchor: [19, 19]
    });

    L.marker([lat, lng], { icon: customIcon }).addTo(map)
      .bindPopup(`
        <div style="font-family: sans-serif; padding: 6px;">
          <strong style="color: #142C1E; font-size: 1rem;">Glow Spa Kalaburagi</strong><br/>
          <span style="font-size: 0.85rem; color: #555;">Ram Mandir Service Road, Above Onyx Italian Marble</span><br/>
          <a href="https://maps.google.com/?q=${lat},${lng}" target="_blank" style="color: #C59A63; font-weight: 600; font-size: 0.82rem; margin-top: 4px; display: inline-block;">Get Directions &rarr;</a>
        </div>
      `)
      .openPopup();
  } catch (err) {
    console.error('Error loading Leaflet map:', err);
  }
}

// ==========================================================================
// DOM READY INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initThemeToggle();
  initAudio();
  initVideoModal();
  initBookingForm();
  initExtendedServices();
  initAreaAndBlogModal();
  initFullGalleryModal();
  initMap();
});
