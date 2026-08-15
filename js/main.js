/* ==========================================================================
   SV Elegant Interior - Master Dynamic JavaScript Engine & Supabase Core
   ========================================================================== */

let PUBLIC_SERVICES = [];
let PUBLIC_PROJECTS = [];
let PUBLIC_GALLERY = [];

document.addEventListener('DOMContentLoaded', async () => {
  initPreloader();
  initScrollProgress();
  initNavbar();
  initHeroParticles();
  initTypingEffect();
  initMouseTilt();
  initCounters();
  initContactForm();
  initCopyEmail();
  initBackToTop();
  initLightboxModal();

  // Load Dynamic Data from Supabase Database
  await syncPublicDataFromSupabase();
});

/* --- 1. Master Supabase Synchronization --- */
async function syncPublicDataFromSupabase() {
  const db = window.supabaseClient;
  if (!db) {
    console.warn('Supabase client unavailable. Retrying initialization...');
    setTimeout(syncPublicDataFromSupabase, 500);
    return;
  }

  try {
    // Run parallel queries to fetch all published site content
    const [settingsRes, heroRes, aboutRes, servicesRes, projectsRes, galleryRes, baRes, wcuRes, testRes] = await Promise.all([
      db.from('site_settings').select('*').limit(1).single(),
      db.from('hero_slides').select('*').eq('is_published', true).order('display_order', { ascending: true }),
      db.from('about_section').select('*').limit(1).single(),
      db.from('services').select('*').eq('is_published', true).order('display_order', { ascending: true }),
      db.from('projects').select('*').eq('is_published', true).order('display_order', { ascending: true }),
      db.from('gallery').select('*').eq('is_published', true).order('display_order', { ascending: true }),
      db.from('before_after').select('*').eq('is_published', true).order('display_order', { ascending: true }).limit(1).single(),
      db.from('why_choose_us').select('*').eq('is_published', true).order('display_order', { ascending: true }),
      db.from('testimonials').select('*').eq('is_published', true).order('display_order', { ascending: true })
    ]);

    // Store global references
    PUBLIC_SERVICES = servicesRes.data || [];
    PUBLIC_PROJECTS = projectsRes.data || [];
    PUBLIC_GALLERY = galleryRes.data || [];

    // Render Website Components dynamically
    renderSiteSettings(settingsRes.data);
    renderHeroSlider(heroRes.data);
    renderAboutSection(aboutRes.data);
    renderServicesSection(PUBLIC_SERVICES);
    renderProjectsSection(PUBLIC_PROJECTS);
    renderGallerySection(PUBLIC_GALLERY);
    renderBeforeAfterSection(baRes.data);
    renderWhyChooseUsSection(wcuRes.data);
    renderTestimonialsSection(testRes.data);

    // Initialize Service Detail page if on service-detail.html
    initServicePage();

  } catch (err) {
    console.error('Error synchronizing database content:', err);
  }
}

/* --- 2. Site Settings Integration --- */
function renderSiteSettings(s) {
  if (!s) return;

  // Update contact details in headers, footers & contact info cards
  const phoneEls = document.querySelectorAll('.dynamic-phone');
  phoneEls.forEach(el => {
    el.textContent = s.phone;
    if (el.tagName === 'A') el.href = `tel:${s.phone}`;
  });

  const emailEls = document.querySelectorAll('.dynamic-email');
  emailEls.forEach(el => {
    el.textContent = s.email;
    if (el.tagName === 'A') el.href = `mailto:${s.email}`;
  });

  const addressEls = document.querySelectorAll('.dynamic-address');
  addressEls.forEach(el => el.textContent = s.address);

  const copyrightEls = document.querySelectorAll('.dynamic-copyright');
  copyrightEls.forEach(el => el.textContent = s.copyright_text);

  // Update WhatsApp links
  const waBtns = document.querySelectorAll('.dynamic-whatsapp-link');
  waBtns.forEach(btn => {
    btn.href = `https://wa.me/${s.whatsapp}?text=Hello%20SV%20Elegant%20Interior`;
  });
}

/* --- 3. Hero Section Slider --- */
function renderHeroSlider(slides) {
  if (!slides || slides.length === 0) return;

  const sliderBg = document.querySelector('.hero-slider-bg');
  const headlineEl = document.querySelector('.hero-headline');
  const descEl = document.querySelector('.hero-desc');
  const primaryBtn = document.querySelector('.hero-actions .btn-primary');
  const secondaryBtn = document.querySelector('.hero-actions .btn-outline');

  if (sliderBg) {
    sliderBg.innerHTML = slides.map((s, idx) => `
      <div class="hero-slide ${idx === 0 ? 'active' : ''}" style="background-image: url('${s.image_url.startsWith('http') || s.image_url.startsWith('assets') ? s.image_url : s.image_url}');"></div>
    `).join('');

    initHeroSliderLogic();
  }

  if (headlineEl && slides[0]) {
    headlineEl.innerHTML = slides[0].headline.replace(/(Timeless Luxury|Luxury|Interior)/i, '<span class="highlight">$1</span>');
  }

  if (descEl && slides[0].description) {
    descEl.textContent = slides[0].description;
  }

  if (primaryBtn && slides[0].primary_btn_text) {
    primaryBtn.innerHTML = `<i class="far fa-calendar-alt"></i> ${slides[0].primary_btn_text}`;
    primaryBtn.href = slides[0].primary_btn_url || '#contact';
  }

  if (secondaryBtn && slides[0].secondary_btn_text) {
    secondaryBtn.innerHTML = `${slides[0].secondary_btn_text} <i class="fas fa-arrow-right"></i>`;
    secondaryBtn.href = slides[0].secondary_btn_url || 'projects.html';
  }
}

function initHeroSliderLogic() {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length <= 1) return;

  let currentSlide = 0;
  setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 6000);
}

/* --- 4. About Section --- */
function renderAboutSection(about) {
  if (!about) return;

  const headingEl = document.querySelector('.about-content .section-title, #dynamic-about-heading');
  const mainDescEl = document.querySelector('.about-content p, #dynamic-about-desc');
  const aboutImg = document.querySelector('.about-image img, #dynamic-about-img');

  if (headingEl) headingEl.textContent = about.heading;
  if (mainDescEl) mainDescEl.textContent = about.main_description;
  if (aboutImg && about.image_url) aboutImg.src = about.image_url;
}

/* --- 5. Services Section --- */
function renderServicesSection(services) {
  const container = document.querySelector('.services-grid, #dynamic-services-grid');
  if (!container) return;

  if (!services || services.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">No services available.</div>`;
    return;
  }

  container.innerHTML = services.map(s => `
    <div class="service-card reveal-on-scroll">
      <div class="service-icon"><i class="${s.icon_class || 'fas fa-couch'}"></i></div>
      <h3>${s.name}</h3>
      <p>${s.short_description || ''}</p>
      <a href="service-detail.html?id=${s.slug}" class="service-link">View Details <i class="fas fa-arrow-right"></i></a>
    </div>
  `).join('');

  initScrollAnimations();
}

/* --- 6. Projects Showcase Section --- */
function renderProjectsSection(projects) {
  const indexContainer = document.getElementById('index-projects-gallery');
  const projectsContainer = document.getElementById('master-projects-gallery');

  const target = indexContainer || projectsContainer;
  if (!target) return;

  if (!projects || projects.length === 0) {
    target.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">No projects created yet.</div>`;
    return;
  }

  renderProjectGrid('all', target, projects);

  // Bind filter button triggers
  const filterBtns = document.querySelectorAll('.project-filter-btn, .index-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCat = btn.getAttribute('data-category-filter');
      renderProjectGrid(filterCat, target, projects);
    });
  });
}

function renderProjectGrid(filter, container, projects) {
  let filtered = projects;
  if (filter && filter !== 'all') {
    filtered = projects.filter(p => 
      (p.category_name || '').toLowerCase().includes(filter.toLowerCase()) || 
      (p.slug || '').toLowerCase().includes(filter.toLowerCase())
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">No projects found in this category.</div>`;
    return;
  }

  container.innerHTML = filtered.map((p, idx) => `
    <div class="project-card reveal-on-scroll" data-project-idx="${idx}">
      <img src="${p.featured_image}" alt="${p.title}" loading="lazy">
      <div class="project-zoom-badge"><i class="fas fa-search-plus"></i></div>
      <div class="project-overlay">
        <span class="project-category">${p.category_name || 'Turnkey'}</span>
        <h3 class="project-title">${p.title}</h3>
      </div>
    </div>
  `).join('');

  // Attach Lightbox click triggers
  const cards = container.querySelectorAll('.project-card');
  cards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      openLightbox(filtered.map(item => ({
        src: item.featured_image,
        title: item.title,
        category: item.category_name || 'Portfolio'
      })), idx);
    });
  });

  initScrollAnimations();
}

/* --- 7. Master Photo Gallery --- */
function renderGallerySection(galleryItems) {
  const container = document.getElementById('master-category-gallery');
  if (!container) return;

  if (!galleryItems || galleryItems.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">No gallery media available.</div>`;
    return;
  }

  renderGalleryItems('all', container, galleryItems);

  const filterBtns = document.querySelectorAll('.category-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCat = btn.getAttribute('data-category-filter');
      renderGalleryItems(filterCat, container, galleryItems);
    });
  });
}

function renderGalleryItems(filter, container, galleryItems) {
  let filtered = galleryItems;
  if (filter && filter !== 'all') {
    filtered = galleryItems.filter(g => 
      (g.category || '').toLowerCase().includes(filter.toLowerCase()) || 
      (g.service_id || '').toLowerCase().includes(filter.toLowerCase())
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">No photos found in selected category.</div>`;
    return;
  }

  container.innerHTML = filtered.map((g, idx) => `
    <div class="project-card reveal-on-scroll" data-gal-idx="${idx}">
      <img src="${g.image_url}" alt="${g.title}" loading="lazy">
      <div class="project-zoom-badge"><i class="fas fa-search-plus"></i></div>
      <div class="project-overlay">
        <span class="project-category">${g.category}</span>
        <h3 class="project-title">${g.title}</h3>
      </div>
    </div>
  `).join('');

  const cards = container.querySelectorAll('.project-card');
  cards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      openLightbox(filtered.map(item => ({
        src: item.image_url,
        title: item.title,
        category: item.category
      })), idx);
    });
  });

  initScrollAnimations();
}

/* --- 8. Before & After Section --- */
function renderBeforeAfterSection(ba) {
  if (!ba) return;

  const wrapper = document.querySelector('.ba-wrapper');
  if (!wrapper) return;

  const beforeImg = wrapper.querySelector('.ba-image');
  const afterImg = wrapper.querySelector('.ba-after-container img');

  if (beforeImg && ba.before_image) beforeImg.src = ba.before_image;
  if (afterImg && ba.after_image) afterImg.src = ba.after_image;

  initBeforeAfterSlider();
}

/* --- 9. Why Choose Us Section --- */
function renderWhyChooseUsSection(items) {
  const container = document.querySelector('.why-choose-us-grid, #dynamic-wcu-grid');
  if (!container || !items || items.length === 0) return;

  container.innerHTML = items.map(w => `
    <div class="wcu-card reveal-on-scroll">
      <div class="wcu-icon"><i class="${w.icon_class || 'fas fa-check-circle'}"></i></div>
      <h3>${w.title}</h3>
      <p>${w.description}</p>
    </div>
  `).join('');

  initScrollAnimations();
}

/* --- 10. Testimonials Slider Section --- */
function renderTestimonialsSection(testimonials) {
  const container = document.querySelector('.testimonials-slider, #dynamic-testimonials-grid');
  if (!container || !testimonials || testimonials.length === 0) return;

  container.innerHTML = testimonials.map(t => `
    <div class="testimonial-card reveal-on-scroll">
      <div class="stars">${'★'.repeat(t.rating || 5)}</div>
      <p class="testimonial-text">"${t.testimonial_text}"</p>
      <div class="client-info">
        <h4>${t.client_name}</h4>
        <span>${t.location || 'Hyderabad'}</span>
      </div>
    </div>
  `).join('');

  initScrollAnimations();
}

/* --- 11. Service Detail Page Renderer --- */
function initServicePage() {
  const container = document.getElementById('dynamic-service-content');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const serviceSlug = urlParams.get('id') || 'interior-design';

  // Find matching service from Supabase dataset
  const service = PUBLIC_SERVICES.find(s => s.slug === serviceSlug) || PUBLIC_SERVICES[0];
  if (!service) return;

  document.title = `${service.name} - SV Elegant Interior`;

  // Get service specific images from PUBLIC_GALLERY
  let relatedPhotos = PUBLIC_GALLERY.filter(g => g.service_id === service.slug || g.category.toLowerCase().includes((service.category || '').toLowerCase()));
  if (relatedPhotos.length === 0) {
    relatedPhotos = PUBLIC_GALLERY.slice(0, 8);
  }

  container.innerHTML = `
    <div class="service-hero-banner" style="background: linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.85)), url('${service.image_url || relatedPhotos[0]?.image_url || 'assets/images/hero1.png'}') center/cover;">
      <div class="container" style="padding: 60px 24px; text-align: center; color: white;">
        <span class="section-tag" style="color: var(--accent-gold-light);">${service.category || 'Luxury Interiors'}</span>
        <h1 style="font-size: 3rem; color: white; margin-top: 10px;">Mastering ${service.name}</h1>
        <p style="max-width: 650px; margin: 16px auto 0; color: rgba(255,255,255,0.85);">${service.short_description || ''}</p>
      </div>
    </div>

    <div class="container" style="padding: 80px 24px;">
      <div class="about-grid">
        <div>
          <span class="section-tag">Premium Solution</span>
          <h2 style="font-size: 2.2rem; margin-bottom: 20px;">Why Choose Our ${service.name} Services?</h2>
          <p style="color: var(--text-muted); margin-bottom: 16px;">${service.full_description || 'At SV Elegant Interior, our execution process blends European aesthetic standards with precision craftsmanship.'}</p>
          <button class="btn btn-primary" onclick="openServiceQuoteModal('${service.name}')"><i class="fab fa-whatsapp"></i> Request Quote for ${service.name}</button>
        </div>
        <div>
          <img src="${service.image_url || relatedPhotos[0]?.image_url || 'assets/images/hero1.png'}" alt="${service.name}" style="width:100%; height:360px; object-fit:cover; border-radius: var(--radius-md); box-shadow: var(--shadow-lg); border: 2px solid var(--accent-gold-light);">
        </div>
      </div>

      <!-- Service Photo Gallery -->
      <div style="margin-top: 90px;">
        <div style="text-align: center; margin-bottom: 40px;">
          <span class="section-tag">${service.name} Portfolio</span>
          <h2 class="section-title">Executed Projects & 3D Renderings</h2>
        </div>

        <div class="gallery-grid" id="service-photos-grid">
          ${relatedPhotos.map((img, idx) => `
            <div class="project-card reveal-on-scroll" data-service-img-index="${idx}">
              <img src="${img.image_url}" alt="${img.title}">
              <div class="project-zoom-badge"><i class="fas fa-search-plus"></i></div>
              <div class="project-overlay">
                <span class="project-category">${img.category}</span>
                <h3 class="project-title">${img.title}</h3>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Related Services Grid -->
      <div style="margin-top: 100px;">
        <span class="section-tag">Explore Further</span>
        <h2 class="section-title" style="margin-bottom: 36px;">Related Interior Services</h2>
        <div class="services-grid">
          ${PUBLIC_SERVICES.filter(s => s.id !== service.id).slice(0, 3).map(s => `
            <div class="service-card">
              <div class="service-icon"><i class="${s.icon_class || 'fas fa-couch'}"></i></div>
              <h3>${s.name}</h3>
              <p>${s.short_description || ''}</p>
              <a href="service-detail.html?id=${s.slug}" class="service-link">View Details <i class="fas fa-arrow-right"></i></a>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // Attach Lightbox click triggers
  const photoCards = container.querySelectorAll('#service-photos-grid .project-card');
  photoCards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      openLightbox(relatedPhotos.map(item => ({ src: item.image_url, title: item.title, category: item.category })), idx);
    });
  });

  initBeforeAfterSlider();
  initScrollAnimations();
}

/* --- 12. Contact Form Submission (Supabase + WhatsApp Integration) --- */
function initContactForm() {
  const forms = document.querySelectorAll('#whatsapp-contact-form, form');
  if (forms.length === 0) return;

  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const getValue = (fieldName, fallback = '') => {
        const el = form.querySelector(`[name="${fieldName}"]`);
        return el ? el.value.trim() : fallback;
      };

      const full_name = getValue('name');
      const phone = getValue('phone');
      const email = getValue('email', '');
      const service_required = getValue('service', 'General Inquiry');
      const property_type = getValue('property_type', 'N/A');
      const address = getValue('address', 'N/A');
      const preferred_date = getValue('preferred_date', 'Asap');
      const budget = getValue('budget', 'Flexible');
      const message = getValue('message', 'Need consultation');

      if (!full_name || !phone) {
        showToast('Please fill out your Name and Phone Number.', 'error');
        return;
      }

      // Save inquiry to Supabase contact_requests table
      const db = window.supabaseClient;
      if (db) {
        try {
          await db.from('contact_requests').insert([{
            full_name, phone, email, service_required, property_type,
            address, preferred_date, budget, message, status: 'New', is_read: false
          }]);
        } catch (err) {
          console.error('Failed to log lead in Supabase database:', err);
        }
      }

      // Launch WhatsApp Chat with pre-formatted inquiry text
      const formattedMsg = `*New Interior Design Inquiry - SV Elegant Interior*%0A%0A` +
        `*Name:* ${encodeURIComponent(full_name)}%0A` +
        `*Phone:* ${encodeURIComponent(phone)}%0A` +
        `*Email:* ${encodeURIComponent(email || 'N/A')}%0A` +
        `*Service Required:* ${encodeURIComponent(service_required)}%0A` +
        `*Property Type:* ${encodeURIComponent(property_type)}%0A` +
        `*Address:* ${encodeURIComponent(address)}%0A` +
        `*Preferred Date:* ${encodeURIComponent(preferred_date)}%0A` +
        `*Budget Range:* ${encodeURIComponent(budget)}%0A` +
        `*Message:* ${encodeURIComponent(message)}`;

      const whatsappUrl = `https://wa.me/919100097311?text=${formattedMsg}`;

      showToast(`Thank you ${full_name}! Inquiry submitted. Opening WhatsApp chat...`, 'success');
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 800);

      form.reset();
    });
  });
}

/* --- Interactive Components UI Helpers --- */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => preloader.classList.add('fade-out'), 400);
    });
    setTimeout(() => preloader.classList.add('fade-out'), 1500);
  }
}

function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${progress}%`;
  });
}

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    });
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }
}

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

  const particles = Array.from({ length: 40 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 2 + 1,
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

function initTypingEffect() {
  const target = document.querySelector('.typing-text');
  if (!target) return;

  const phrases = [
    "Interior Design", "Home Interiors", "Modular Kitchens",
    "Professional Painting", "Custom Furniture", "Luxury Living Spaces"
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
      typeSpeed = 2200;
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

function initMouseTilt() {
  const frame = document.querySelector('.hero-image-frame');
  const visual = document.querySelector('.hero-visual');
  if (!frame || !visual) return;

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

function initBeforeAfterSlider() {
  const wrapper = document.querySelector('.ba-wrapper');
  if (!wrapper) return;

  const afterContainer = wrapper.querySelector('.ba-after-container');
  const handle = wrapper.querySelector('.ba-handle');
  if (!afterContainer || !handle) return;

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

  handle.addEventListener('touchstart', () => isDragging = true);
  window.addEventListener('touchend', () => isDragging = false);
  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    setPos(e.touches[0].clientX);
  });
}

/* --- Lightbox Gallery Modal --- */
let activeLightboxImages = [];
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
        <img src="" alt="Photo" class="lightbox-img">
        <div class="lightbox-caption"></div>
        <div class="lightbox-counter"></div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const closeBtn = modal.querySelector('.lightbox-close');
  const prevBtn = modal.querySelector('.lightbox-prev');
  const nextBtn = modal.querySelector('.lightbox-next');

  if (closeBtn) closeBtn.onclick = closeLightbox;
  if (prevBtn) prevBtn.onclick = showPrevLightboxImg;
  if (nextBtn) nextBtn.onclick = showNextLightboxImg;

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
  activeLightboxImages = imagesList;
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
  if (activeLightboxImages.length === 0) return;
  currentLightboxIndex = (currentLightboxIndex - 1 + activeLightboxImages.length) % activeLightboxImages.length;
  updateLightboxContent();
}

function showNextLightboxImg() {
  if (activeLightboxImages.length === 0) return;
  currentLightboxIndex = (currentLightboxIndex + 1) % activeLightboxImages.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const modal = document.getElementById('sve-lightbox-modal');
  if (!modal || activeLightboxImages.length === 0) return;

  const item = activeLightboxImages[currentLightboxIndex];
  const imgEl = modal.querySelector('.lightbox-img');
  const captionEl = modal.querySelector('.lightbox-caption');
  const counterEl = modal.querySelector('.lightbox-counter');

  imgEl.src = item.src;
  imgEl.alt = item.title || 'Portfolio Image';
  captionEl.innerHTML = `<strong>${item.title}</strong> &bull; <span style="color: var(--accent-gold-light);">${item.category || 'Gallery'}</span>`;
  counterEl.textContent = `Image ${currentLightboxIndex + 1} of ${activeLightboxImages.length}`;
}

function initCopyEmail() {
  const btn = document.getElementById('copy-email-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const email = 'info@svelegantinteriors.com';
    navigator.clipboard.writeText(email).then(() => {
      showToast('Email address copied to clipboard!', 'success');
    }).catch(() => {
      showToast('Copied: info@svelegantinteriors.com', 'success');
    });
  });
}

function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) btn.classList.add('show');
    else btn.classList.remove('show');
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

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
  setTimeout(() => toast.classList.remove('show'), 4500);
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
