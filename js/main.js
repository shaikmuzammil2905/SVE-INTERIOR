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

/* --- 12. Contact Form & WhatsApp Integration --- */
function initContactForm() {
  const form = document.getElementById('whatsapp-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]').value.trim();
    const phone = form.querySelector('[name="phone"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim() || 'N/A';
    const service = form.querySelector('[name="service"]').value;
    const propType = form.querySelector('[name="property_type"]').value;
    const address = form.querySelector('[name="address"]').value.trim() || 'N/A';
    const prefDate = form.querySelector('[name="preferred_date"]').value || 'Asap';
    const budget = form.querySelector('[name="budget"]').value || 'Flexible';
    const message = form.querySelector('[name="message"]').value.trim() || 'Need consultation';

    if (!name || !phone) {
      alert('Please fill out your Name and Phone Number.');
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

    // Open success alert and redirect to WhatsApp
    alert(`Thank you ${name}! Redirecting you directly to SVE Elegant Interiors WhatsApp chat...`);
    window.open(whatsappUrl, '_blank');
    form.reset();
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
      setTimeout(() => btn.innerHTML = originalText, 2500);
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

/* --- 15. Dynamic Service Page Data & Catalog (21 Services) --- */
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

function initServicePage() {
  const container = document.getElementById('dynamic-service-content');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const serviceId = urlParams.get('id') || 'interior-design';

  const service = SERVICES_CATALOG.find(s => s.id === serviceId) || SERVICES_CATALOG[0];

  document.title = `${service.name} - SVE Elegant Interiors`;

  container.innerHTML = `
    <div class="service-hero-banner" style="background: linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.85)), url('assets/images/hero1.png') center/cover;">
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
          <img src="assets/images/hero2.png" alt="${service.name}" style="width:100%; border-radius: var(--radius-md); box-shadow: var(--shadow-lg); border: 2px solid var(--accent-gold-light);">
        </div>
      </div>

      <!-- Before & After Section -->
      <div style="margin-top: 80px; text-align: center;">
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

  initBeforeAfterSlider();
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
