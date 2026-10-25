/**
 * GLOW SPA & WELLNESS SANCTUARY — RAM MANDIR SERVICE ROAD, KALABURAGI
 * Luxury Interactive Engine: Parallax Depth, Scroll-Reveal, 3D Tilt, Draggable Slider & Concierge Modals
 * Matching Walnut Spa Senior Architectural Design System
 */

// Image Fallback Resilience
window.addEventListener('error', (event) => {
  if (event.target && event.target.tagName === 'IMG') {
    const img = event.target;
    if (!img.dataset.fallbackApplied) {
      img.dataset.fallbackApplied = 'true';
      img.src = '/assets/glow-sanctuary-reception-4k.jpg';
    }
  }
}, true);

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initScrollReveal();
  initParallaxEffects();
  init3DTiltEngine();
  initServicesCarousel();
  initCatalogFilters();
  initAccordions();
  initStatsCounter();
  initServiceModal();
  initGalleryLightbox();
  initBookingEngine();
  initMobileNav();
  initSmoothScrollLinks();
});

/* ==========================================================================
   1. STICKY HEADER & SCROLL STATE
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. SCROLL REVEAL OBSERVER (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.reveal, .reveal-fade, .reveal-left, .reveal-right, .reveal-scale'
  );

  if (!revealElements.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    revealElements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px 50px 0px',
    threshold: 0.04
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));
}

/* ==========================================================================
   3. GPU-ACCELERATED PARALLAX ENGINE
   ========================================================================== */
function initParallaxEffects() {
  const isMobile = window.innerWidth <= 768;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isMobile || prefersReduced) return;

  const heroBanner = document.querySelector('.hero-banner');
  const heroFloating = document.querySelector('.hero-floating-card');
  const ambientOrbs = document.querySelectorAll('.glow-ambient-orb');
  const parallaxNodes = document.querySelectorAll('[data-parallax-speed]');

  let ticking = false;

  const updateParallax = () => {
    const scrollY = window.scrollY;

    // Hero background slow translation
    if (heroBanner && scrollY < window.innerHeight * 1.5) {
      const bannerOffset = scrollY * 0.18;
      heroBanner.style.backgroundPositionY = `calc(50% + ${bannerOffset}px)`;
    }

    // Hero floating badge counter-parallax
    if (heroFloating && scrollY < window.innerHeight) {
      const floatOffset = -(scrollY * 0.12);
      heroFloating.style.transform = `translate3d(0, ${floatOffset}px, 0)`;
    }

    // Ambient orbs subtle drift
    if (ambientOrbs.length && scrollY < window.innerHeight * 1.5) {
      ambientOrbs.forEach((orb, idx) => {
        const factor = (idx % 2 === 0 ? 0.08 : -0.06);
        orb.style.transform = `translate3d(0, ${scrollY * factor}px, 0)`;
      });
    }

    // Custom speed elements
    parallaxNodes.forEach(node => {
      const speed = parseFloat(node.getAttribute('data-parallax-speed')) || 0.1;
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const yOffset = (window.innerHeight - rect.top) * speed * 0.2;
        node.style.transform = `translate3d(0, ${yOffset}px, 0)`;
      }
    });

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}

/* ==========================================================================
   4. 3D CARD TILT MICRO-INTERACTION (DESKTOP)
   ========================================================================== */
function init3DTiltEngine() {
  const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!hasHover) return;

  const tiltCards = document.querySelectorAll('.tilt-3d');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(0, -4px, 10px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)';
    });
  });
}

/* ==========================================================================
   5. TOP SERVICES PILL CAROUSEL (DRAGGABLE & CONTROLS)
   ========================================================================== */
function initServicesCarousel() {
  const container = document.getElementById('servicesTrackContainer');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');

  if (!container) return;

  const scrollAmount = 320;

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  // Mouse Drag to Scroll with Velocity
  let isDown = false;
  let startX;
  let scrollLeft;

  container.addEventListener('mousedown', (e) => {
    isDown = true;
    container.style.cursor = 'grabbing';
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  container.addEventListener('mouseleave', () => {
    isDown = false;
    container.style.cursor = 'grab';
  });

  container.addEventListener('mouseup', () => {
    isDown = false;
    container.style.cursor = 'grab';
  });

  container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeft - walk;
  });
}

/* ==========================================================================
   6. TREATMENT CATALOG TABS FILTER
   ========================================================================== */
function initCatalogFilters() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const cards = document.querySelectorAll('.catalog-card');

  if (!tabBtns.length || !cards.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translate3d(0, 16px, 0)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translate3d(0, 0, 0)';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   7. THERAPEUTIC ACCORDION
   ========================================================================== */
function initAccordions() {
  const headers = document.querySelectorAll('.accordion-header');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.parentElement;
      const wasActive = parent.classList.contains('active');

      // Close all
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
      });

      // Toggle current
      if (!wasActive) {
        parent.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   8. STATS ANIMATED COUNTER
   ========================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  let counted = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        statNumbers.forEach(item => {
          const target = item.getAttribute('data-target') || item.textContent;
          const isPercent = target.includes('%');
          const isPlus = target.includes('+');
          const isRating = target.includes('.');
          
          if (isRating) {
            const finalVal = parseFloat(target);
            let cur = 0;
            const timer = setInterval(() => {
              cur += 0.1;
              if (cur >= finalVal) {
                cur = finalVal;
                clearInterval(timer);
              }
              item.textContent = cur.toFixed(1);
            }, 30);
          } else {
            const numValue = parseInt(target.replace(/[^0-9]/g, ''));
            let current = 0;
            const step = Math.max(1, Math.floor(numValue / 35));
            const timer = setInterval(() => {
              current += step;
              if (current >= numValue) {
                current = numValue;
                clearInterval(timer);
              }
              item.textContent = current + (isPercent ? '%' : (isPlus ? '+' : ''));
            }, 30);
          }
        });
      }
    });
  }, { threshold: 0.35 });

  const counterBar = document.querySelector('.stats-counter-bar');
  if (counterBar) observer.observe(counterBar);
}

/* ==========================================================================
   9. COMPLETE TREATMENT DETAILS MODAL DATA & CONTROLLER (GLOW SPA KALABURAGI)
   ========================================================================== */
const treatmentsData = {
  aroma: {
    title: "Aroma Therapy Massage",
    tagline: "Emotional serenity & botanical essential healing",
    image: "/assets/spa-aroma-girl.jpg",
    duration: "60 / 90 Minutes • ₹2,299",
    focus: "Full Body Stress Relief, Nervous System Calming",
    description: "Experience a soothing and relaxing Aroma Massage at Glow Spa, Ram Mandir Service Road, Kalaburagi. This wellness-focused massage combines gentle rhythmic massage techniques with warm organic aromatic essential oils (lavender, eucalyptus, lemongrass, sandalwood). A peaceful escape designed to melt daily fatigue and restore inner balance.",
    benefits: [
      "Deep emotional relaxation and anxiety relief",
      "Skin nourishment with warm cold-pressed botanical oils",
      "Release of mental fog and daily fatigue",
      "Promotes deep, sound REM sleep cycles"
    ]
  },
  body: {
    title: "Full Body Spa & Massage",
    tagline: "Complete head-to-toe relaxation & vital renewal",
    image: "/assets/spa-female-massage.jpg",
    duration: "60 / 90 / 120 Minutes • ₹2,399",
    focus: "Holistic Total Body Rejuvenation",
    description: "Give yourself a well-deserved break with a relaxing Full Body Spa & Massage at Glow Spa Kalaburagi. Our skilled certified therapists work systematically across all major muscle groups—neck, shoulders, back, arms, legs, and feet—to dissolve fatigue, enhance lymph flow, and restore harmonic balance.",
    benefits: [
      "Relieves persistent full-body heaviness and fatigue",
      "Stimulates lymphatic circulation and metabolic detox",
      "Eases stiff joints and muscular tension",
      "Includes attached personal glass hot shower & herbal tea"
    ]
  },
  thai: {
    title: "Traditional Thai Spa & Massage",
    tagline: "Ancient acupressure & passive yogic flexibility",
    image: "/assets/spa-thai-girl.jpg",
    duration: "60 / 90 Minutes • ₹2,399",
    focus: "Energy Meridians & Muscular Flexibility",
    description: "Experience the calming and restorative benefits of Thai Spa & Massage at Glow Spa Kalaburagi. Combining assisted yoga stretches, gentle rocking, and focused rhythmic palm pressure along the body's energy channels ('Sen lines'), this therapy unblocks stagnant energy pathways and unlocks freedom of movement.",
    benefits: [
      "Significantly boosts flexibility and joint mobility",
      "Unblocks stagnant energy channels throughout the body",
      "Corrects posture alignment and relieves lower back tightness",
      "Conducted in dedicated tatami-inspired private AC suite"
    ]
  },
  deep: {
    title: "Deep Tissue Muscle Therapy",
    tagline: "Intense myofascial tension release & knot therapy",
    image: "/assets/spa-deep-tissue-girl.jpg",
    duration: "60 / 90 Minutes • ₹2,599",
    focus: "Chronic Muscle Knots & Postural Tension",
    description: "A therapeutic, slow-pressure treatment designed to target inner layers of muscle fibers and connective tissues. Ideal for active individuals, gym-goers, or those experiencing chronic upper back, shoulder, and neck stiffness from long hours of work.",
    benefits: [
      "Breaks down chronic myofascial adhesions and muscle knots",
      "Improves athletic recovery time and range of motion",
      "Relieves chronic tension in cervical spine and trapezius",
      "Customized pressure level to your exact comfort preference"
    ]
  },
  swedish: {
    title: "Classic Swedish Deep Relaxation",
    tagline: "Effleurage gliding strokes & physical decompression",
    image: "/assets/stitch_swedish_massage_4k.jpg",
    duration: "60 / 90 Minutes • ₹2,199",
    focus: "Circulation & Systemic Nervous System Calming",
    description: "The gold standard of therapeutic touch. Our classic Swedish relaxation treatment uses continuous effleurage gliding strokes, petrissage kneading, and gentle percussion with warm almond oil to calm sensory overload and promote venous blood return.",
    benefits: [
      "Promotes healthy oxygenation and blood circulation",
      "Dissolves stress hormone cortisol build-up",
      "Induces peaceful mental clarity and light bodily feel",
      "Includes private attached hot-water shower"
    ]
  },
  couple: {
    title: "Couple VIP Sanctuary Suite",
    tagline: "Romantic twin retreat with attached luxury bath",
    image: "/assets/spa-couple-luxury.jpg",
    duration: "90 / 120 Minutes • ₹4,999",
    focus: "Private Twin Sanctuary Experience",
    description: "Step into our master VIP Couples Suite at Glow Spa Kalaburagi. Featuring dual bespoke massage tables, soft ambient cove lighting, soothing aromatherapy mist, and two certified synchronized therapists. Designed for couples celebrating anniversaries, birthdays, or shared peaceful relaxation.",
    benefits: [
      "Exclusive private VIP suite with acoustic soundproofing",
      "Two synchronized professional therapists",
      "Complimentary warm botanical foot bath & herbal tea",
      "Attached luxury shower with premium bath amenities"
    ]
  },
  jacuzzi: {
    title: "Jacuzzi Spa & Hydrotherapy Bath",
    tagline: "Warm hydro jet soak for joint & spinal decompression",
    image: "/assets/spa-jacuzzi.jpg",
    duration: "45 / 60 Minutes • ₹2,499",
    focus: "Spinal Decompression & Deep Thermal Soak",
    description: "Submerge yourself in aerated thermal hydro jets that massage the spinal column, glutes, and thighs. The combination of heat and buoyancy decompresses joint pressure and stimulates systemic endorphin release.",
    benefits: [
      "Relieves spinal compression and lumbar tension",
      "Opens pores and softens skin for subsequent massage",
      "Invigorating water aeration melts joint stiffness",
      "Private sanitized hydrotherapy suite"
    ]
  },
  steam: {
    title: "Turkish Hammam & Eucalyptus Steam",
    tagline: "Detoxifying thermal vapor bath & body exfoliation",
    image: "/assets/stitch_hammam_steam_4k.jpg",
    duration: "45 / 60 Minutes • ₹2,499",
    focus: "Respiratory Cleansing & Thermal Detox",
    description: "Step into dense, warm eucalyptus-infused steam. Turkish Hammam hydrotherapy opens pores, flushes deep subcutaneous toxins, eases sinus congestion, and leaves the body thoroughly cleansed and energized.",
    benefits: [
      "Opens respiratory airways and clears sinus passages",
      "Accelerates metabolic clearance through natural perspiration",
      "Softens skin texture and dissolves muscular stiffness",
      "Followed by a cool refreshing en-suite rain shower"
    ]
  },
  kerala: {
    title: "Authentic Kerala Ayurvedic Abhyanga",
    tagline: "Traditional medicated herb oils & Shirodhara stream",
    image: "/assets/stitch_kerala_abhyanga_4k.jpg",
    duration: "75 / 90 Minutes • ₹2,799",
    focus: "Vedic Dosha Balance & Nervous System Equilibrium",
    description: "Authentic Kerala Vedic treatment utilizing warmed Ayurvedic herbal decoctions tailored to restore your biological equilibrium. Rhythmic synchronized strokes calm the Vata dosha and rejuvenate tired neuromuscular pathways.",
    benefits: [
      "Classical Ayurvedic herbal formulations from Kerala",
      "Nourishes deep body tissues (Dhatus) and joints",
      "Calms nervous system agitation and insomnia",
      "Leaves skin supple, deeply nourished, and glowing"
    ]
  },
  signature: {
    title: "Signature Glow Spa Fusion Therapy",
    tagline: "Master fusion of Swedish, Thai & Hot herbal compresses",
    image: "/assets/spa-amenities.jpg",
    duration: "90 / 120 Minutes • ₹3,499",
    focus: "Exclusive Master Therapist Bespoke Blend",
    description: "Our signature multi-disciplinary masterpiece. Blends Swedish gliding strokes, targeted Thai acupressure, steamed Ayurvedic herbal poultices (Kizhi), and customized essential oil elixirs for complete physical and mental renewal.",
    benefits: [
      "Combines 4 ancient and modern therapeutic traditions",
      "Warm herbal compress balls target stubborn spinal knots",
      "Tailored precisely to your body's stress profile",
      "Our most celebrated full-spectrum sanctuary therapy"
    ]
  },
  balinese: {
    title: "Traditional Balinese Massage",
    tagline: "Exotic Indonesian acupressure & warm oil rolling",
    image: "/assets/spa-balinese-girl.jpg",
    duration: "60 / 90 Minutes • ₹2,399",
    focus: "Deep Muscle Acupressure & Skin Rolling",
    description: "Originating from Bali, Indonesia, this therapeutic ritual combines palm acupressure, gentle skin rolling, kneading, and warm fragrant floral coconut oils to stimulate blood and chi flow throughout the entire body.",
    benefits: [
      "Deep tissue penetration without excessive soreness",
      "Awakens energetic meridians and eases nervous exhaustion",
      "Warm floral and herbal oils awaken the senses",
      "Brings deep emotional tranquility and physical ease"
    ]
  },
  reflexology: {
    title: "Foot & Hand Reflexology",
    tagline: "Reflex point stimulation for whole-body vitality",
    image: "/assets/spa-reflexology.jpg",
    duration: "45 / 60 Minutes • ₹1,699",
    focus: "Targeted Pressure Points on Soles & Palms",
    description: "Based on the ancient principle that specific reflex zones on feet and hands correspond directly to internal organs. Precise thumb pressure stimulates neurological pathways, reduces swelling, and revives energy.",
    benefits: [
      "Relieves heavy, aching feet and swollen ankles",
      "Improves circulation and nerve response",
      "Stimulates internal organ vitality through reflex meridians",
      "Deeply relaxing session with no need to undress"
    ]
  }
};

function initServiceModal() {
  const modalOverlay = document.getElementById('serviceModalOverlay');
  const modalBody = document.getElementById('serviceModalBody');
  const closeBtn = document.getElementById('serviceModalClose');

  if (!modalOverlay || !modalBody) return;

  document.querySelectorAll('[data-service-key]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const key = trigger.getAttribute('data-service-key');
      const data = treatmentsData[key];

      if (data) {
        renderModalContent(data);
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  function renderModalContent(data) {
    modalBody.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr; gap: 24px;">
        <div style="height: 280px; border-radius: 20px; overflow: hidden; position: relative;">
          <img src="${data.image}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover;">
          <div style="position: absolute; bottom: 16px; left: 16px; background: rgba(20, 28, 22, 0.88); backdrop-filter: blur(8px); padding: 6px 16px; border-radius: 999px; color: #FFF; font-size: 0.85rem; font-weight: 600;">
            ${data.duration}
          </div>
        </div>

        <div>
          <span class="section-tag">${data.focus}</span>
          <h2 style="font-family: var(--font-serif); font-size: 2.2rem; margin-bottom: 6px; color: var(--text-main);">${data.title}</h2>
          <p style="font-style: italic; color: var(--accent-gold); margin-bottom: 18px; font-size: 1.05rem;">${data.tagline}</p>
          <p style="color: var(--text-muted); line-height: 1.7; margin-bottom: 24px; font-size: 0.98rem;">${data.description}</p>

          <h4 style="font-family: var(--font-sans); font-size: 1rem; font-weight: 600; margin-bottom: 12px; color: var(--text-main);">Key Therapy Benefits:</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; margin-bottom: 28px;">
            ${data.benefits.map(b => `
              <li style="display: flex; align-items: center; gap: 10px; font-size: 0.92rem; color: var(--text-muted);">
                <i class="fas fa-check-circle" style="color: var(--accent-gold);"></i> ${b}
              </li>
            `).join('')}
          </ul>

          <div style="display: flex; flex-wrap: wrap; gap: 14px; border-top: 1px solid var(--border-subtle); padding-top: 24px;">
            <a href="https://wa.me/919480182920?text=Hello%20Glow%20Spa%20Kalaburagi,%20I%20would%20like%20to%20reserve%20the%20${encodeURIComponent(data.title)}" 
               target="_blank" 
               class="btn btn-whatsapp" 
               style="flex: 1;">
              <i class="fab fa-whatsapp"></i> Book via WhatsApp
            </a>
            <a href="tel:+919480182920" class="btn btn-dark" style="flex: 1;">
              <i class="fas fa-phone"></i> Call +91 94801 82920
            </a>
          </div>
        </div>
      </div>
    `;
  }
}

/* ==========================================================================
   10. GALLERY LIGHTBOX
   ========================================================================== */
function initGalleryLightbox() {
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  if (!lightbox || !lightboxImg) return;

  document.querySelectorAll('.gallery-card img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLb = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (lightboxClose) lightboxClose.addEventListener('click', closeLb);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLb();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLb();
    }
  });
}

/* ==========================================================================
   11. SMART BOOKING ENGINE -> WHATSAPP CONCIERGE (+91 94801 82920)
   ========================================================================== */
function initBookingEngine() {
  const form = document.getElementById('spaBookingForm');
  if (!form) return;

  // Set minimum date to today
  const dateInput = document.getElementById('bookDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    dateInput.min = today;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('bookName')?.value.trim() || 'Guest';
    const phone = document.getElementById('bookPhone')?.value.trim() || 'Not specified';
    const service = document.getElementById('bookService')?.value || 'General Spa Therapy';
    const date = document.getElementById('bookDate')?.value || 'As soon as possible';
    const time = document.getElementById('bookTime')?.value || 'Anytime';
    const therapist = document.getElementById('bookTherapist')?.value || 'No preference';
    const notes = document.getElementById('bookNotes')?.value.trim() || 'None';

    const message = `Hello Glow Spa Kalaburagi! 🌿%0A%0AI would like to book a therapy session:%0A%0A• *Client Name:* ${encodeURIComponent(name)}%0A• *Contact Phone:* ${encodeURIComponent(phone)}%0A• *Service Selected:* ${encodeURIComponent(service)}%0A• *Preferred Date:* ${encodeURIComponent(date)}%0A• *Preferred Time:* ${encodeURIComponent(time)}%0A• *Therapist Preference:* ${encodeURIComponent(therapist)}%0A• *Notes/Focus:* ${encodeURIComponent(notes)}%0A%0APlease confirm availability for me. Thank you!`;

    const whatsappUrl = `https://wa.me/919480182920?text=${message}`;
    window.open(whatsappUrl, '_blank');
  });
}

/* ==========================================================================
   12. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const drawer = document.getElementById('mobileNavDrawer');
  const closeBtn = document.getElementById('mobileNavClose');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  const closeDrawer = () => {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  drawer.querySelectorAll('.mobile-nav-list a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   13. SMOOTH SCROLL ANCHOR LINKS (85px HEADER OFFSET)
   ========================================================================== */
function initSmoothScrollLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        history.pushState(null, null, targetId);
      }
    });
  });
}
