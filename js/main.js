/* ==========================================================================
   SVE Elegant Interiors - Master JavaScript Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initScrollProgress();
  initNavbar();
  initHeroSlider();
  initHeroParticles();
  initTypingEffect();
  initMouseTilt();
  initCounters();
  initBeforeAfterSlider();
  initPortfolioFilter();
  initProjectModal();
  initContactForm();
  initCopyEmail();
  initBackToTop();
  initServicePage();
  initLightboxModal();
  initCategoryGallery();
  initScrollAnimations();
});

/* --- 1. Preloader --- */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('fade-out');
      }, 400);
    });
  }
}

/* --- 2. Scroll Progress Bar --- */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${progress}%`;
  });
}

/* --- 3. Navbar Sticky & Hamburger Mobile Menu --- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });
  }
}

/* --- 4. Hero Background Slider --- */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length === 0) return;

  let currentSlide = 0;
  setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 6000);
}

/* --- 5. Hero Particle Canvas Animation --- */
function initHeroParticles() {
  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = canvas.parentElement.offsetWidth);
  let height = (canvas.height = canvas.parentElement.offsetHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  });

  const particles = Array.from({ length: 45 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 2.5 + 1,
    color: Math.random() > 0.5 ? 'rgba(197, 146, 53, 0.4)' : 'rgba(29, 96, 82, 0.25)',
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4
  }));

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

/* --- 6. Typing Effect --- */
function initTypingEffect() {
  const target = document.querySelector('.typing-text');
  if (!target) return;

  const phrases = [
    "Interior Design",
    "Home Interiors",
    "Modular Kitchens",
    "Professional Painting",
    "Custom Furniture",
    "Luxury Living Spaces"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      target.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      target.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 2200; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
  }
  type();
}

/* --- 7. Mouse Tilt 3D Effect --- */
function initMouseTilt() {
  const frame = document.querySelector('.hero-image-frame');
  if (!frame) return;

  const visual = document.querySelector('.hero-visual');

  visual.addEventListener('mousemove', (e) => {
    const rect = visual.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const tiltX = (y / (rect.height / 2)) * -8;
    const tiltY = (x / (rect.width / 2)) * 8;

    frame.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  });

  visual.addEventListener('mouseleave', () => {
    frame.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
  });
}

/* --- 8. Animated Counters --- */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (counters.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        const suffix = counter.getAttribute('data-suffix') || '';
        let count = 0;
        const speed = target / 60;

        const updateCount = () => {
          count += speed;
          if (count < target) {
            counter.innerText = Math.ceil(count) + suffix;
            setTimeout(updateCount, 25);
          } else {
            counter.innerText = target + suffix;
          }
        };
        updateCount();
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* --- 9. Before & After Slider --- */
function initBeforeAfterSlider() {
  const wrapper = document.querySelector('.ba-wrapper');
  if (!wrapper) return;

  const afterContainer = wrapper.querySelector('.ba-after-container');
  const handle = wrapper.querySelector('.ba-handle');
  let isDragging = false;

  const setPos = (clientX) => {
    const rect = wrapper.getBoundingClientRect();
    let x = clientX - rect.left;
    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;

    const pct = (x / rect.width) * 100;
    afterContainer.style.width = `${pct}%`;
    handle.style.left = `${pct}%`;
  };

  handle.addEventListener('mousedown', () => isDragging = true);
  window.addEventListener('mouseup', () => isDragging = false);
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    setPos(e.clientX);
  });

  // Touch Support
  handle.addEventListener('touchstart', () => isDragging = true);
  window.addEventListener('touchend', () => isDragging = false);
  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    setPos(e.touches[0].clientX);
  });
}

/* --- 10. Portfolio Filter --- */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --- 11. Project Details Popup Modal --- */
function initProjectModal() {
  const cards = document.querySelectorAll('.project-card');
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.modal-close');
  const modalImg = modal.querySelector('.modal-img');
  const modalTitle = modal.querySelector('.modal-title');
  const modalCat = modal.querySelector('.modal-cat');
  const modalDate = modal.querySelector('.modal-date');
  const modalLoc = modal.querySelector('.modal-loc');
  const modalType = modal.querySelector('.modal-type');
  const modalDesc = modal.querySelector('.modal-desc');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img').src;
      const title = card.querySelector('.project-title').textContent;
      const category = card.querySelector('.project-category').textContent;
      const date = card.getAttribute('data-date') || 'Jan 2026';
      const loc = card.getAttribute('data-location') || 'Hyderabad, Telangana';
      const type = card.getAttribute('data-type') || 'Luxury Residential';
      const desc = card.getAttribute('data-desc') || 'A complete turnkey interior design project executed with custom furniture, warm mood lighting, and premium Italian marble finishes.';

      if (modalImg) modalImg.src = img;
      if (modalTitle) modalTitle.textContent = title;
      if (modalCat) modalCat.textContent = category;
      if (modalDate) modalDate.textContent = date;
      if (modalLoc) modalLoc.textContent = loc;
      if (modalType) modalType.textContent = type;
      if (modalDesc) modalDesc.textContent = desc;

      modal.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}

/* --- Toast Notification Utility --- */
function showToast(message, type = 'success') {
  let toast = document.getElementById('sve-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'sve-toast';
    toast.className = 'sve-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i> <span>${message}</span>`;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

/* --- 12. Contact Form & WhatsApp Integration --- */
function initContactForm() {
  const forms = document.querySelectorAll('#whatsapp-contact-form, form');
  if (forms.length === 0) return;

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const getValue = (fieldName, fallback = '') => {
        const el = form.querySelector(`[name="${fieldName}"]`);
        return el ? el.value.trim() : fallback;
      };

      const name = getValue('name');
      const phone = getValue('phone');
      const email = getValue('email', 'N/A');
      const service = getValue('service', 'General Inquiry');
      const propType = getValue('property_type', 'N/A');
      const address = getValue('address', 'N/A');
      const prefDate = getValue('preferred_date', 'Asap');
      const budget = getValue('budget', 'Flexible');
      const message = getValue('message', 'Need consultation');

      if (!name || !phone) {
        showToast('Please fill out your Name and Phone Number.', 'error');
        return;
      }

      const formattedMsg = `*New Interior Design Inquiry - SVE Elegant Interiors*%0A%0A` +
        `*Name:* ${encodeURIComponent(name)}%0A` +
        `*Phone:* ${encodeURIComponent(phone)}%0A` +
        `*Email:* ${encodeURIComponent(email)}%0A` +
        `*Service Required:* ${encodeURIComponent(service)}%0A` +
        `*Property Type:* ${encodeURIComponent(propType)}%0A` +
        `*Address:* ${encodeURIComponent(address)}%0A` +
        `*Preferred Date:* ${encodeURIComponent(prefDate)}%0A` +
        `*Budget Range:* ${encodeURIComponent(budget)}%0A` +
        `*Message:* ${encodeURIComponent(message)}`;

      const whatsappUrl = `https://wa.me/919100097311?text=${formattedMsg}`;

      showToast(`Thank you ${name}! Opening SVE Elegant Interiors WhatsApp chat...`, 'success');
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 1000);
      form.reset();
    });
  });
}

/* --- 13. Copy Email Utility --- */
function initCopyEmail() {
  const btn = document.getElementById('copy-email-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const email = 'info@svelegantinteriors.com';
    navigator.clipboard.writeText(email).then(() => {
      const originalText = btn.innerHTML;
      btn.innerHTML = `<i class="fas fa-check"></i> Copied!`;
      showToast('Email address copied to clipboard!', 'success');
      setTimeout(() => btn.innerHTML = originalText, 2500);
    }).catch(() => {
      showToast('Copied: info@svelegantinteriors.com', 'success');
    });
  });
}

/* --- 14. Back to Top Button --- */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --- 15. Master Image Catalog & Service Mappings (53 Unique Images) --- */
const SERVICE_GALLERY_IMAGES = [
  // Modular Kitchens (8)
  { id: 1, serviceId: 'modular-kitchens', category: 'Modular Kitchens', title: 'Elegant Luxury Kitchen Design', src: 'elegant-kitchen-design.jpg.jpeg' },
  { id: 2, serviceId: 'modular-kitchens', category: 'Modular Kitchens', title: 'Modern Pink Modular Kitchen', src: 'elegant-modern-pink-kitchen-interior-design.jpg.jpeg' },
  { id: 3, serviceId: 'modular-kitchens', category: 'Modular Kitchens', title: 'Contemporary Modular Kitchen', src: 'interior-design-decoration-nice-modern-kitchen.jpg.jpeg' },
  { id: 4, serviceId: 'modular-kitchens', category: 'Modular Kitchens', title: 'Minimalist Kitchen Concept', src: 'minimalist-kitchen-interior-design (1).jpg.jpeg' },
  { id: 5, serviceId: 'modular-kitchens', category: 'Modular Kitchens', title: 'Quartz Finish Modular Layout', src: 'minimalist-kitchen-interior-design (2).jpg.jpeg' },
  { id: 6, serviceId: 'modular-kitchens', category: 'Modular Kitchens', title: 'Modern Dark Grey Kitchen Suite', src: 'modern-dark-grey-small-kitchen-interior.jpg.jpeg' },
  { id: 7, serviceId: 'modular-kitchens', category: 'Modular Kitchens', title: 'White & Wood Modular Kitchen', src: 'modern-kitchen-interior-white-colors.jpg.jpeg' },
  { id: 8, serviceId: 'modular-kitchens', category: 'Modular Kitchens', title: 'Modern Pink Kitchen Accent', src: 'modern-pink-kitchen-interior.jpg.jpeg' },

  // Bedrooms & Wardrobes (9)
  { id: 9, serviceId: 'wardrobes', category: 'Bedrooms & Wardrobes', title: 'Luxury Hotel Suite Bedroom with TV', src: '3d-rendering-beautiful-luxury-bedroom-suite-hotel-with-tv.jpg.jpeg' },
  { id: 10, serviceId: 'wardrobes', category: 'Bedrooms & Wardrobes', title: 'Luxurious Bedroom Interior Renders', src: '3d-rendering-luxurious-bedroom-interior.jpg.jpeg' },
  { id: 11, serviceId: 'wardrobes', category: 'Bedrooms & Wardrobes', title: 'Hotel Suite Bedroom & Wardrobe', src: '3d-rendering-luxury-bedroom-suite-hotel-with-tv-cabinet-wardrobe.jpg.jpeg' },
  { id: 12, serviceId: 'wardrobes', category: 'Bedrooms & Wardrobes', title: 'Modern Bedroom Architectural Render', src: 'illustration-bedroom-interior.jpg.jpeg' },
  { id: 13, serviceId: 'wardrobes', category: 'Bedrooms & Wardrobes', title: 'Minimalist Luxury Bedroom Design', src: 'minimalist-luxury-modern-bed-room-design-morning-light-modern-interior-concept.jpg.jpeg' },
  { id: 14, serviceId: 'wardrobes', category: 'Bedrooms & Wardrobes', title: 'Scandinavian Wooden Bedroom Suite', src: 'modern-light-bedroom-with-wooden-furniture-scandinavian-style-3d-rendering.jpg.jpeg' },
  { id: 15, serviceId: 'wardrobes', category: 'Bedrooms & Wardrobes', title: 'Warm Wood Bedroom & Wardrobes', src: 'modern-wooden-bedroom-design.jpg.jpeg' },
  { id: 16, serviceId: 'wardrobes', category: 'Bedrooms & Wardrobes', title: 'Aesthetic Pink Bedroom Suite', src: 'pink-bedroom-with-aesthetic-decor.jpg.jpeg' },
  { id: 17, serviceId: 'wardrobes', category: 'Bedrooms & Wardrobes', title: 'Luxury Hotel Suite Layout', src: 'room-interior-hotel-bedroom.jpg.jpeg' },

  // Living Rooms & TV Units (14)
  { id: 18, serviceId: 'tv-units', category: 'Living Rooms & TV Units', title: 'Modern TV Wall Decoration Design', src: '3d-render-modern-tv-wall-decoration-interior-design-inspiration.jpg copy.jpeg' },
  { id: 19, serviceId: 'tv-units', category: 'Living Rooms & TV Units', title: 'Modern Living Room Decor Renders', src: '3d-rendering-modern-dining-room-living-room-with-luxury-decor.jpg.jpeg' },
  { id: 20, serviceId: 'tv-units', category: 'Living Rooms & TV Units', title: 'Warm Ambient Light TV Cabinet & Bar', src: 'clear-tv-clean-walls-warm-light-tv-cabinet-wine-bottle-8-pieces-hdar-916-ar-32-style-raw-v-6-job-id.jpg.jpeg' },
  { id: 21, serviceId: 'tv-units', category: 'Living Rooms & TV Units', title: 'Contemporary Living Room Illustration', src: 'illustration-living-room-interior.jpg.jpeg' },
  { id: 22, serviceId: 'tv-units', category: 'Living Rooms & TV Units', title: 'Luxury Loft Living & Dining Suite', src: 'loft-luxury-living-room-with-bookshelf-near-dining-table.jpg.jpeg' },
  { id: 23, serviceId: 'tv-units', category: 'Living Rooms & TV Units', title: 'Luxury Modern Apartment Interior', src: 'luxury-modern-apartment-with-comfortable-pillow-decor-generated-by-ai.jpg.jpeg' },
  { id: 24, serviceId: 'tv-units', category: 'Living Rooms & TV Units', title: 'Modern Living Room Big Screen TV Console', src: 'modern-living-room-with-big-screen-tv.jpg.jpeg' },
  { id: 25, serviceId: 'tv-units', category: 'Living Rooms & TV Units', title: 'Sectional Sofa & Luxury TV Unit', src: 'modern-living-room-with-elegant-tv-unit-sectional-sofa.jpg.jpeg' },
  { id: 26, serviceId: 'tv-units', category: 'Living Rooms & TV Units', title: 'Flat Screen TV Unit & Coffee Table', src: 'modern-living-room-with-large-flat-screen-tv-black-coffee-table.jpg.jpeg' },
  { id: 27, serviceId: 'tv-units', category: 'Living Rooms & TV Units', title: 'Minimalist LCD TV Wall Console', src: 'modern-minimalist-lcd-tv-wall-unit.jpg.jpeg' },
  { id: 28, serviceId: 'tv-units', category: 'Living Rooms & TV Units', title: 'Space-Saving Wall Mounted Entertainment Unit', src: 'modern-stylish-wall-mounted-tv-unit-perfect-space-saving-living-rooms-entertainment-areas.jpg.jpeg' },
  { id: 29, serviceId: 'tv-units', category: 'Living Rooms & TV Units', title: 'Luxury Villa Residential Interior Design', src: 'residential-interior-design.jpg.jpeg' },
  { id: 30, serviceId: 'tv-units', category: 'Living Rooms & TV Units', title: 'Aspirational House Wall-Mounted TV Unit', src: 'room-luxury-house-wallmounted-tv-interior-design-aspirational-house.jpg.jpeg' },
  { id: 31, serviceId: 'tv-units', category: 'Living Rooms & TV Units', title: 'Zen Japanese Style Modern TV Cabinet', src: 'tv-cabinet-modern-empty-room-japanese-zen-styleminimal-designs.jpg.jpeg' },

  // Ceilings & Lighting (3)
  { id: 32, serviceId: 'false-ceiling', category: 'Ceilings & Lighting', title: '3D Ceiling Lighting Render', src: 'ceiling-design-3d-rendering.jpg.jpeg' },
  { id: 33, serviceId: 'false-ceiling', category: 'Ceilings & Lighting', title: 'Ambient False Ceiling Wallpaper', src: 'ceiling-image-background-wallpaper.jpg.jpeg' },
  { id: 34, serviceId: 'false-ceiling', category: 'Ceilings & Lighting', title: 'Ceiling Cove Lights & Large Window', src: 'ceiling-with-lights-large-window.jpg.jpeg' },

  // Office & Commercial (7)
  { id: 35, serviceId: 'office-interiors', category: 'Office & Commercial', title: 'Green Eco Working Room & Office', src: '3d-rendering-business-meeting-green-working-room-office-building.jpg.jpeg' },
  { id: 36, serviceId: 'office-interiors', category: 'Office & Commercial', title: 'Executive Business Meeting Room Renders', src: '3d-rendering-luxury-business-meeting-working-room-executive-office.jpg.jpeg' },
  { id: 37, serviceId: 'office-interiors', category: 'Office & Commercial', title: 'High-Rise Office Meeting Room', src: 'business-meeting-room-high-rise-office-building-with-colorful-decor-furnture.jpg.jpeg' },
  { id: 38, serviceId: 'office-interiors', category: 'Office & Commercial', title: 'Corporate Business Conference Suite', src: 'business-meeting-working-room-office-building.jpg.jpeg' },
  { id: 39, serviceId: 'office-interiors', category: 'Office & Commercial', title: 'Minimalist Corporate Office Design', src: 'minimalist-office-interior-design.jpg.jpeg' },
  { id: 40, serviceId: 'office-interiors', category: 'Office & Commercial', title: 'Modern Workspace & Collaborative Office', src: 'modern-corporate-office-workspace-with-sleek-interiors-collaborative-design.jpg.jpeg' },
  { id: 41, serviceId: 'office-interiors', category: 'Office & Commercial', title: '3D Office Interior Architectural Layout', src: 'office-interior-3d-illustration.jpg.jpeg' },

  // Painting & Execution Work (12)
  { id: 42, serviceId: 'home-painting', category: 'Painting & Execution', title: 'Carpenter & Furniture Assembly Craftsmanship', src: 'furniture-assembly-worker-standing-reading-instruction-using-tape-measure-worker-tools.jpg.jpeg' },
  { id: 43, serviceId: 'home-painting', category: 'Painting & Execution', title: 'Furniture Assembly Specialist Inspection', src: 'male-worker-showing-thumb-sign-after-assambles-shelf-new-furniture-home-owners.jpg.jpeg' },
  { id: 44, serviceId: 'home-painting', category: 'Painting & Execution', title: 'Handyman Painting Interior Accent Wall Yellow', src: 'man-painting-walls-yellow.jpg.jpeg' },
  { id: 45, serviceId: 'home-painting', category: 'Painting & Execution', title: 'Turnkey Renovation Architect Planning', src: 'man-renovating-his-house-with-design-space.jpg.jpeg' },
  { id: 46, serviceId: 'home-painting', category: 'Painting & Execution', title: 'Master Craftsman On-Site Execution', src: 'man-with-hat-that-says-smile-his-face.jpg.jpeg' },
  { id: 47, serviceId: 'home-painting', category: 'Painting & Execution', title: 'Professional Paint Roller & Emulsion Mixing', src: 'masaking-blue-paint-with-roller-brush-dipped-white-paint-handyman-renovating-apartment-redecoration-home-construction-while-renovating-improving-repair-decorating.jpg.jpeg' },
  { id: 48, serviceId: 'home-painting', category: 'Painting & Execution', title: 'Professional Painter Wall Coating', src: 'photography-professional-painter-pain-house.jpg.jpeg' },
  { id: 49, serviceId: 'home-painting', category: 'Painting & Execution', title: 'Certified Plumbing & Mechanical Specialist', src: 'plumber-you-can-count-full-length-shot-cheerful-young-plumber-wearing-tool-belt-smiling.jpg.jpeg' },
  { id: 50, serviceId: 'home-painting', category: 'Painting & Execution', title: 'Dust-Free Interior Wall Painting Execution', src: 'professional-painter-painting-wall-with-paint-roller.jpg.jpeg' },
  { id: 51, serviceId: 'home-painting', category: 'Painting & Execution', title: 'Turnkey Interior Remodeling Team', src: 'room-being-remodeled-with-contractors.jpg.jpeg' },
  { id: 52, serviceId: 'home-painting', category: 'Painting & Execution', title: 'Specialist Engineers & Site Supervisors', src: 'specialists-workers-engineers-photo.jpg.jpeg' },
  { id: 53, serviceId: 'home-painting', category: 'Painting & Execution', title: 'Wall Roller Painting Craftsmanship', src: 'woman-paints-wall-with-roller.jpg.jpeg' }
];

const SERVICES_CATALOG = [
  { id: 'interior-design', name: 'Interior Design', icon: 'fas fa-couch', desc: 'End-to-end luxury interior design solutions tailored for contemporary living.' },
  { id: 'home-interiors', name: 'Home Interiors', icon: 'fas fa-home', desc: 'Complete turn-key home transformations reflecting your unique lifestyle.' },
  { id: 'modular-kitchens', name: 'Modular Kitchens', icon: 'fas fa-utensils', desc: 'Ergonomic, modern modular kitchens with premium fittings and quartz finishes.' },
  { id: 'wardrobes', name: 'Wardrobes', icon: 'fas fa-door-closed', desc: 'Custom built sliding and walk-in wardrobes with smart storage systems.' },
  { id: 'tv-units', name: 'TV Units', icon: 'fas fa-tv', desc: 'Luxury wall entertainment consoles featuring cove lighting and marble backdrops.' },
  { id: 'false-ceiling', name: 'False Ceiling', icon: 'fas fa-border-all', desc: 'Designer gypsum and wooden ceiling layouts with ambient LED lighting.' },
  { id: 'wall-paneling', name: 'Wall Paneling', icon: 'fas fa-th-large', desc: 'Acoustic and decorative louvers, fluted panels, and upholstered accent walls.' },
  { id: 'wooden-flooring', name: 'Wooden Flooring', icon: 'fas fa-square', desc: 'High-grade hardwood and laminate flooring providing warmth and elegance.' },
  { id: 'custom-furniture', name: 'Custom Furniture', icon: 'fas fa-chair', desc: 'Bespoke hand-crafted sofas, dining tables, and plush armchairs.' },
  { id: 'space-planning', name: 'Space Planning', icon: 'fas fa-drafting-compass', desc: 'Architectural space optimization ensuring maximum functionality and aesthetic flow.' },
  { id: 'interior-renovation', name: 'Interior Renovation', icon: 'fas fa-tools', desc: 'Complete makeover services upgrading legacy spaces into contemporary havens.' },
  { id: 'home-painting', name: 'Home Painting', icon: 'fas fa-paint-roller', desc: 'Premium interior and exterior wall painting with smooth dust-free finishes.' },
  { id: 'interior-painting', name: 'Interior Painting', icon: 'fas fa-fill-drip', desc: 'Royal luxury washable emulsions, texture coatings, and metallic accents.' },
  { id: 'exterior-painting', name: 'Exterior Painting', icon: 'fas fa-sun', desc: 'Weather-proof exterior coatings protecting structures against harsh elements.' },
  { id: 'commercial-painting', name: 'Commercial Painting', icon: 'fas fa-building', desc: 'Scalable corporate painting solutions with minimal operational downtime.' },
  { id: 'office-interiors', name: 'Office Interiors', icon: 'fas fa-briefcase', desc: 'Modern ergonomic office layouts boosting productivity and brand prestige.' },
  { id: 'villa-interiors', name: 'Villa Interiors', icon: 'fas fa-hotel', desc: 'Grand scale luxury villa interiors incorporating double-height aesthetics.' },
  { id: 'apartment-interiors', name: 'Apartment Interiors', icon: 'fas fa-city', desc: 'Smart, space-efficient apartment interior designs maximizing comfort.' },
  { id: 'false-ceiling-designs', name: 'False Ceiling Designs', icon: 'fas fa-layer-group', desc: 'Multi-tiered custom ceiling concepts with integrated magnetic tracks.' },
  { id: 'lighting-design', name: 'Lighting Design', icon: 'fas fa-lightbulb', desc: 'Architectural lighting plans creating distinct mood layers and highlights.' },
  { id: '3d-interior-visualization', name: '3D Interior Visualization & Planning', icon: 'fas fa-cube', desc: 'Photorealistic 3D renders and virtual walkthroughs before physical execution.' }
];

/* --- Lightbox Gallery Modal Logic --- */
let activeGalleryImages = [];
let currentLightboxIndex = 0;

function initLightboxModal() {
  let modal = document.getElementById('sve-lightbox-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'sve-lightbox-modal';
    modal.className = 'lightbox-modal';
    modal.innerHTML = `
      <button class="lightbox-close" title="Close (Esc)">&times;</button>
      <button class="lightbox-prev" title="Previous Image"><i class="fas fa-chevron-left"></i></button>
      <button class="lightbox-next" title="Next Image"><i class="fas fa-chevron-right"></i></button>
      <div class="lightbox-content">
        <img src="" alt="Project Photo" class="lightbox-img">
        <div class="lightbox-caption"></div>
        <div class="lightbox-counter"></div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const closeBtn = modal.querySelector('.lightbox-close');
  const prevBtn = modal.querySelector('.lightbox-prev');
  const nextBtn = modal.querySelector('.lightbox-next');

  closeBtn.onclick = closeLightbox;
  prevBtn.onclick = showPrevLightboxImg;
  nextBtn.onclick = showNextLightboxImg;

  modal.onclick = (e) => {
    if (e.target === modal) closeLightbox();
  };

  document.onkeydown = (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrevLightboxImg();
    if (e.key === 'ArrowRight') showNextLightboxImg();
  };
}

function openLightbox(imagesList, index = 0) {
  initLightboxModal();
  activeGalleryImages = imagesList;
  currentLightboxIndex = index;

  updateLightboxContent();
  const modal = document.getElementById('sve-lightbox-modal');
  if (modal) modal.classList.add('active');
}

function closeLightbox() {
  const modal = document.getElementById('sve-lightbox-modal');
  if (modal) modal.classList.remove('active');
}

function showPrevLightboxImg() {
  if (activeGalleryImages.length === 0) return;
  currentLightboxIndex = (currentLightboxIndex - 1 + activeGalleryImages.length) % activeGalleryImages.length;
  updateLightboxContent();
}

function showNextLightboxImg() {
  if (activeGalleryImages.length === 0) return;
  currentLightboxIndex = (currentLightboxIndex + 1) % activeGalleryImages.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const modal = document.getElementById('sve-lightbox-modal');
  if (!modal || activeGalleryImages.length === 0) return;

  const item = activeGalleryImages[currentLightboxIndex];
  const imgEl = modal.querySelector('.lightbox-img');
  const captionEl = modal.querySelector('.lightbox-caption');
  const counterEl = modal.querySelector('.lightbox-counter');

  imgEl.src = item.src;
  imgEl.alt = item.title;
  captionEl.innerHTML = `<strong>${item.title}</strong> &bull; <span style="color: var(--accent-gold-light);">${item.category}</span>`;
  counterEl.textContent = `Image ${currentLightboxIndex + 1} of ${activeGalleryImages.length}`;
}

/* --- Dynamic Category Photo Gallery (gallery.html, projects.html, index.html) --- */
function initCategoryGallery() {
  const targets = [
    { containerId: 'master-category-gallery', filterSelector: '.category-filter-btn' },
    { containerId: 'master-projects-gallery', filterSelector: '.project-filter-btn' },
    { containerId: 'index-projects-gallery', filterSelector: '.index-filter-btn' }
  ];

  targets.forEach(target => {
    const galleryContainer = document.getElementById(target.containerId);
    if (!galleryContainer) return;

    renderGalleryGrid('all', galleryContainer);

    const filterBtns = document.querySelectorAll(target.filterSelector);
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterCategory = btn.getAttribute('data-category-filter');
        renderGalleryGrid(filterCategory, galleryContainer);
      });
    });
  });
}

function renderGalleryGrid(filter, container) {
  let filteredImages = SERVICE_GALLERY_IMAGES;
  if (filter !== 'all') {
    filteredImages = SERVICE_GALLERY_IMAGES.filter(img => 
      img.serviceId === filter || img.category.toLowerCase().includes(filter.toLowerCase())
    );
  }

  container.innerHTML = filteredImages.map((img, index) => `
    <div class="project-card reveal-on-scroll" data-img-index="${index}">
      <img src="${img.src}" alt="${img.title}" loading="lazy">
      <div class="project-zoom-badge"><i class="fas fa-search-plus"></i></div>
      <div class="project-overlay">
        <span class="project-category">${img.category}</span>
        <h3 class="project-title">${img.title}</h3>
      </div>
    </div>
  `).join('');

  const cards = container.querySelectorAll('.project-card');
  cards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      openLightbox(filteredImages, idx);
    });
  });

  initScrollAnimations();
}

/* --- Scroll Animation Observer --- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (elements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

function initServicePage() {
  const container = document.getElementById('dynamic-service-content');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const serviceId = urlParams.get('id') || 'interior-design';

  const service = SERVICES_CATALOG.find(s => s.id === serviceId) || SERVICES_CATALOG[0];

  document.title = `${service.name} - SVE Elegant Interiors`;

  // Get service specific images
  let relatedPhotos = SERVICE_GALLERY_IMAGES.filter(img => img.serviceId === serviceId);
  if (relatedPhotos.length === 0) {
    // Fallback images if specific tag is empty
    relatedPhotos = SERVICE_GALLERY_IMAGES.slice(0, 8);
  }

  container.innerHTML = `
    <div class="service-hero-banner" style="background: linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.85)), url('${relatedPhotos[0].src}') center/cover;">
      <div class="container" style="padding: 60px 24px; text-align: center; color: white;">
        <span class="section-tag" style="color: var(--accent-gold-light);">${service.name}</span>
        <h1 style="font-size: 3rem; color: white; margin-top: 10px;">Mastering ${service.name}</h1>
        <p style="max-width: 650px; margin: 16px auto 0; color: rgba(255,255,255,0.85);">${service.desc}</p>
      </div>
    </div>

    <div class="container" style="padding: 80px 24px;">
      <div class="about-grid">
        <div>
          <span class="section-tag">Premium Solution</span>
          <h2 style="font-size: 2.2rem; margin-bottom: 20px;">Why Choose Our ${service.name} Services?</h2>
          <p style="color: var(--text-muted); margin-bottom: 16px;">At SVE Elegant Interiors, our ${service.name} process blends European aesthetic standards with precision craftsmanship. We use top-tier materials, dust-free installation methods, and strict timeline controls.</p>
          <p style="color: var(--text-muted); margin-bottom: 30px;">Whether you are looking to renovate a single room or complete a multi-story project, our expert interior architects ensure every detail aligns with your lifestyle and budget.</p>
          <button class="btn btn-primary" onclick="openServiceQuoteModal('${service.name}')"><i class="fab fa-whatsapp"></i> Request Quote for ${service.name}</button>
        </div>
        <div>
          <img src="${relatedPhotos[0].src}" alt="${service.name}" style="width:100%; height:360px; object-fit:cover; border-radius: var(--radius-md); box-shadow: var(--shadow-lg); border: 2px solid var(--accent-gold-light);">
        </div>
      </div>

      <!-- Service Photo Gallery Section -->
      <div style="margin-top: 90px;">
        <div style="text-align: center; margin-bottom: 40px;">
          <span class="section-tag">${service.name} Portfolio</span>
          <h2 class="section-title">Executed Projects & 3D Renderings</h2>
          <p style="color: var(--text-muted); margin-top: 10px;">Click any project photo to expand full-screen high resolution lightbox view.</p>
        </div>

        <div class="gallery-grid" id="service-photos-grid">
          ${relatedPhotos.map((img, idx) => `
            <div class="project-card reveal-on-scroll" data-service-img-index="${idx}">
              <img src="${img.src}" alt="${img.title}">
              <div class="project-zoom-badge"><i class="fas fa-search-plus"></i></div>
              <div class="project-overlay">
                <span class="project-category">${img.category}</span>
                <h3 class="project-title">${img.title}</h3>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Before & After Section -->
      <div style="margin-top: 90px; text-align: center;">
        <span class="section-tag">Visual Transformation</span>
        <h2 class="section-title">Before & After Project Execution</h2>
        <div class="ba-wrapper" style="margin-top: 30px;">
          <img src="assets/images/before.png" alt="Before Transformation" class="ba-image">
          <div class="ba-badge before-label">BEFORE</div>
          <div class="ba-after-container">
            <img src="assets/images/after.png" alt="After Transformation">
            <div class="ba-badge after-label">AFTER RENOVATION</div>
          </div>
          <div class="ba-handle"><i class="fas fa-arrows-alt-h"></i></div>
        </div>
      </div>

      <!-- Related Services Grid -->
      <div style="margin-top: 100px;">
        <span class="section-tag">Explore Further</span>
        <h2 class="section-title" style="margin-bottom: 36px;">Related Interior Services</h2>
        <div class="services-grid">
          ${SERVICES_CATALOG.filter(s => s.id !== service.id).slice(0, 3).map(s => `
            <div class="service-card">
              <div class="service-icon"><i class="${s.icon}"></i></div>
              <h3>${s.name}</h3>
              <p>${s.desc}</p>
              <a href="service-detail.html?id=${s.id}" class="service-link">View Details <i class="fas fa-arrow-right"></i></a>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // Attach Lightbox click triggers on service photo cards
  const photoCards = container.querySelectorAll('#service-photos-grid .project-card');
  photoCards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      openLightbox(relatedPhotos, idx);
    });
  });

  initBeforeAfterSlider();
  initScrollAnimations();
}

function openServiceQuoteModal(serviceName) {
  const select = document.querySelector('[name="service"]');
  if (select) {
    for (let opt of select.options) {
      if (opt.text.toLowerCase().includes(serviceName.toLowerCase())) {
        opt.selected = true;
        break;
      }
    }
  }
  window.scrollTo({ top: document.getElementById('contact')?.offsetTop || 2000, behavior: 'smooth' });
}
