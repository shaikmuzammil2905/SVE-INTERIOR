/* ==========================================================================
   SV Elegant Interior - Master Dynamic JavaScript Engine & Supabase Core
   ========================================================================== */

// 1. Original Master Data Fallbacks (Ensures 100% public site display even if DB is initial)
const FALLBACK_HERO_SLIDES = [
  { headline: 'Transforming Spaces Into Timeless Luxury', subheading: 'Premium Interior Solutions', description: 'We design elegant, functional, and stylish spaces that perfectly match your lifestyle and budget. Turnkey interiors & professional painting services.', primary_btn_text: 'Book Consultation', primary_btn_url: '#contact', secondary_btn_text: 'View Projects', secondary_btn_url: 'projects.html', image_url: 'assets/images/hero1.png' },
  { headline: 'Crafting Bespoke Modular Kitchens & Interiors', subheading: 'Architectural Perfection', description: 'From modern minimalist kitchens to opulent master bedroom suites, our master craftsmen bring your vision to life.', primary_btn_text: 'Book Consultation', primary_btn_url: '#contact', secondary_btn_text: 'Explore Services', secondary_btn_url: 'services.html', image_url: 'assets/images/hero2.png' },
  { headline: 'Professional Home Painting & Renovations', subheading: 'Flawless Finish Guaranteed', description: 'Dust-free interior/exterior painting with royal luxury washable emulsions and long-lasting protective finishes.', primary_btn_text: 'Get Quote', primary_btn_url: '#contact', secondary_btn_text: 'Our Gallery', secondary_btn_url: 'gallery.html', image_url: 'assets/images/hero3.png' }
];

const FALLBACK_SERVICES = [
  { id: 'interior-design', name: 'Interior Design', slug: 'interior-design', category: 'Residential Interiors', icon_class: 'fas fa-couch', short_description: 'End-to-end luxury interior design solutions tailored for contemporary living.', full_description: 'Comprehensive turnkey interior design covering space planning, 3D modeling, material selection, and end-to-end execution.', image_url: 'assets/images/hero1.png' },
  { id: 'home-interiors', name: 'Home Interiors', slug: 'home-interiors', category: 'Residential Interiors', icon_class: 'fas fa-home', short_description: 'Complete turn-key home transformations reflecting your unique lifestyle.', full_description: 'Full-house interior transformations designed around your aesthetics, family needs, and lifestyle demands.', image_url: 'assets/images/hero2.png' },
  { id: 'modular-kitchens', name: 'Modular Kitchens', slug: 'modular-kitchens', category: 'Kitchen & Storage', icon_class: 'fas fa-utensils', short_description: 'Ergonomic, modern modular kitchens with premium fittings and quartz finishes.', full_description: 'Custom acrylic, PU finish, and quartz modular kitchens equipped with Blum soft-close hardware and pull-out organizers.', image_url: 'elegant-kitchen-design.jpg.jpeg' },
  { id: 'wardrobes', name: 'Wardrobes', slug: 'wardrobes', category: 'Kitchen & Storage', icon_class: 'fas fa-door-closed', short_description: 'Custom built sliding and walk-in wardrobes with smart storage systems.', full_description: 'High-gloss glass sliding, walk-in closets, and modular wardrobe systems with sensory lighting.', image_url: '3d-rendering-beautiful-luxury-bedroom-suite-hotel-with-tv.jpg.jpeg' },
  { id: 'tv-units', name: 'TV Units', slug: 'tv-units', category: 'Residential Interiors', icon_class: 'fas fa-tv', short_description: 'Luxury wall entertainment consoles featuring cove lighting and marble backdrops.', full_description: 'Custom entertainment centers with fluted wood paneling, marble backdrops, floating shelves, and cable management.', image_url: 'modern-living-room-with-big-screen-tv.jpg.jpeg' },
  { id: 'false-ceiling', name: 'False Ceiling', slug: 'false-ceiling', category: 'Ceilings & Decor', icon_class: 'fas fa-border-all', short_description: 'Designer gypsum and wooden ceiling layouts with ambient LED lighting.', full_description: 'Gypsum plasterboards, wooden raft ceilings, cove lighting channels, and magnetic track light fixtures.', image_url: 'ceiling-design-3d-rendering.jpg.jpeg' },
  { id: 'wall-paneling', name: 'Wall Paneling', slug: 'wall-paneling', category: 'Ceilings & Decor', icon_class: 'fas fa-th-large', short_description: 'Acoustic and decorative louvers, fluted panels, and upholstered accent walls.', full_description: 'Textured PVC louvers, charcoal acoustic panels, fabric upholstery, and wooden wall cladding.', image_url: '3d-render-modern-tv-wall-decoration-interior-design-inspiration.jpg copy.jpeg' },
  { id: 'wooden-flooring', name: 'Wooden Flooring', slug: 'wooden-flooring', category: 'Residential Interiors', icon_class: 'fas fa-square', short_description: 'High-grade hardwood and laminate flooring providing warmth and elegance.', full_description: 'Scratch-resistant laminate wood planks, engineered oak flooring, and outdoor deck tiling.', image_url: 'modern-light-bedroom-with-wooden-furniture-scandinavian-style-3d-rendering.jpg.jpeg' },
  { id: 'custom-furniture', name: 'Custom Furniture', slug: 'custom-furniture', category: 'Residential Interiors', icon_class: 'fas fa-chair', short_description: 'Bespoke hand-crafted sofas, dining tables, and plush armchairs.', full_description: 'Hand-crafted solid wood dining sets, velvet accent lounge chairs, and custom modular sofas.', image_url: 'furniture-assembly-worker-standing-reading-instruction-using-tape-measure-worker-tools.jpg.jpeg' },
  { id: 'space-planning', name: 'Space Planning', slug: 'space-planning', category: 'Residential Interiors', icon_class: 'fas fa-drafting-compass', short_description: 'Architectural space optimization ensuring maximum functionality and aesthetic flow.', full_description: 'Professional layout drafting, traffic flow optimization, lighting grid mapping, and ergonomic space utility.', image_url: 'man-renovating-his-house-with-design-space.jpg.jpeg' },
  { id: 'interior-renovation', name: 'Interior Renovation', slug: 'interior-renovation', category: 'Residential Interiors', icon_class: 'fas fa-tools', short_description: 'Complete makeover services upgrading legacy spaces into contemporary havens.', full_description: 'Full structural and cosmetic renovation of aging apartments, villas, and bathrooms.', image_url: 'room-being-remodeled-with-contractors.jpg.jpeg' },
  { id: 'home-painting', name: 'Home Painting', slug: 'home-painting', category: 'Painting & Finish', icon_class: 'fas fa-paint-roller', short_description: 'Premium interior and exterior wall painting with smooth dust-free finishes.', full_description: 'Dust-free motorized sanding, primer coat application, and royal luxury emulsion finishes.', image_url: 'assets/images/painting.png' },
  { id: 'interior-painting', name: 'Interior Painting', slug: 'interior-painting', category: 'Painting & Finish', icon_class: 'fas fa-fill-drip', short_description: 'Royal luxury washable emulsions, texture coatings, and metallic accents.', full_description: 'Washable velvet emulsions, Venetian plaster textures, metallic accent walls, and stencil patterns.', image_url: 'masaking-blue-paint-with-roller-brush-dipped-white-paint-handyman-renovating-apartment-redecoration-home-construction-while-renovating-improving-repair-decorating.jpg.jpeg' },
  { id: 'exterior-painting', name: 'Exterior Painting', slug: 'exterior-painting', category: 'Painting & Finish', icon_class: 'fas fa-sun', short_description: 'Weather-proof exterior coatings protecting structures against harsh elements.', full_description: 'All-weather silicone and elastomeric exterior shield coatings guarding against UV and rain damage.', image_url: 'photography-professional-painter-pain-house.jpg.jpeg' },
  { id: 'commercial-painting', name: 'Commercial Painting', slug: 'commercial-painting', category: 'Painting & Finish', icon_class: 'fas fa-building', short_description: 'Scalable corporate painting solutions with minimal operational downtime.', full_description: 'Fast-track anti-microbial paint application for IT parks, retail showrooms, and hospitality setups.', image_url: 'professional-painter-painting-wall-with-paint-roller.jpg.jpeg' },
  { id: 'office-interiors', name: 'Office Interiors', slug: 'office-interiors', category: 'Commercial & Office', icon_class: 'fas fa-briefcase', short_description: 'Modern ergonomic office layouts boosting productivity and brand prestige.', full_description: 'Corporate executive cabins, modular open workstations, acoustic conference rooms, and reception desks.', image_url: 'assets/images/office.png' },
  { id: 'villa-interiors', name: 'Villa Interiors', slug: 'villa-interiors', category: 'Residential Interiors', icon_class: 'fas fa-hotel', short_description: 'Grand scale luxury villa interiors incorporating double-height aesthetics.', full_description: 'Turnkey double-height living spaces, grand chandelier ceilings, custom staircases, and outdoor lounge areas.', image_url: 'residential-interior-design.jpg.jpeg' },
  { id: 'apartment-interiors', name: 'Apartment Interiors', slug: 'apartment-interiors', category: 'Residential Interiors', icon_class: 'fas fa-city', short_description: 'Smart, space-efficient apartment interior designs maximizing comfort.', full_description: 'Compact luxury apartment interiors utilizing multi-functional furniture and concealed storage.', image_url: 'luxury-modern-apartment-with-comfortable-pillow-decor-generated-by-ai.jpg.jpeg' },
  { id: 'false-ceiling-designs', name: 'False Ceiling Designs', slug: 'false-ceiling-designs', category: 'Ceilings & Decor', icon_class: 'fas fa-layer-group', short_description: 'Multi-tiered custom ceiling concepts with integrated magnetic tracks.', full_description: 'Architectural ceiling drop layers, CNC lattice cutouts, and concealed strip lighting setups.', image_url: 'ceiling-with-lights-large-window.jpg.jpeg' },
  { id: 'lighting-design', name: 'Lighting Design', slug: 'lighting-design', category: 'Ceilings & Decor', icon_class: 'fas fa-lightbulb', short_description: 'Architectural lighting plans creating distinct mood layers and highlights.', full_description: 'Warm ambient cove lighting, architectural spotlighting, pendant installations, and smart dimming controls.', image_url: 'clear-tv-clean-walls-warm-light-tv-cabinet-wine-bottle-8-pieces-hdar-916-ar-32-style-raw-v-6-job-id.jpg.jpeg' },
  { id: '3d-interior-visualization', name: '3D Interior Visualization & Planning', slug: '3d-interior-visualization', category: 'Residential Interiors', icon_class: 'fas fa-cube', short_description: 'Photorealistic 3D renders and virtual walkthroughs before physical execution.', full_description: 'High-definition 3D renders and 360-degree virtual walkthroughs letting clients experience their home before construction.', image_url: '3d-rendering-luxurious-bedroom-interior.jpg.jpeg' }
];

const FALLBACK_GALLERY_IMAGES = [
  // Modular Kitchens (8)
  { id: 1, serviceId: 'modular-kitchens', category: 'Modular Kitchens', title: 'Elegant Luxury Kitchen Design', image_url: 'elegant-kitchen-design.jpg.jpeg' },
  { id: 2, serviceId: 'modular-kitchens', category: 'Modular Kitchens', title: 'Modern Pink Modular Kitchen', image_url: 'elegant-modern-pink-kitchen-interior-design.jpg.jpeg' },
  { id: 3, serviceId: 'modular-kitchens', category: 'Modular Kitchens', title: 'Contemporary Modular Kitchen', image_url: 'interior-design-decoration-nice-modern-kitchen.jpg.jpeg' },
  { id: 4, serviceId: 'modular-kitchens', category: 'Modular Kitchens', title: 'Minimalist Kitchen Concept', image_url: 'minimalist-kitchen-interior-design (1).jpg.jpeg' },
  { id: 5, serviceId: 'modular-kitchens', category: 'Modular Kitchens', title: 'Quartz Finish Modular Layout', image_url: 'minimalist-kitchen-interior-design (2).jpg.jpeg' },
  { id: 6, serviceId: 'modular-kitchens', category: 'Modular Kitchens', title: 'Modern Dark Grey Kitchen Suite', image_url: 'modern-dark-grey-small-kitchen-interior.jpg.jpeg' },
  { id: 7, serviceId: 'modular-kitchens', category: 'Modular Kitchens', title: 'White & Wood Modular Kitchen', image_url: 'modern-kitchen-interior-white-colors.jpg.jpeg' },
  { id: 8, serviceId: 'modular-kitchens', category: 'Modular Kitchens', title: 'Modern Pink Kitchen Accent', image_url: 'modern-pink-kitchen-interior.jpg.jpeg' },

  // Bedrooms & Wardrobes (9)
  { id: 9, serviceId: 'wardrobes', category: 'Bedrooms & Wardrobes', title: 'Luxury Hotel Suite Bedroom with TV', image_url: '3d-rendering-beautiful-luxury-bedroom-suite-hotel-with-tv.jpg.jpeg' },
  { id: 10, serviceId: 'wardrobes', category: 'Bedrooms & Wardrobes', title: 'Luxurious Bedroom Interior Renders', image_url: '3d-rendering-luxurious-bedroom-interior.jpg.jpeg' },
  { id: 11, serviceId: 'wardrobes', category: 'Bedrooms & Wardrobes', title: 'Hotel Suite Bedroom & Wardrobe', image_url: '3d-rendering-luxury-bedroom-suite-hotel-with-tv-cabinet-wardrobe.jpg.jpeg' },
  { id: 12, serviceId: 'wardrobes', category: 'Bedrooms & Wardrobes', title: 'Modern Bedroom Architectural Render', image_url: 'illustration-bedroom-interior.jpg.jpeg' },
  { id: 13, serviceId: 'wardrobes', category: 'Bedrooms & Wardrobes', title: 'Minimalist Luxury Bedroom Design', image_url: 'minimalist-luxury-modern-bed-room-design-morning-light-modern-interior-concept.jpg.jpeg' },
  { id: 14, serviceId: 'wardrobes', category: 'Bedrooms & Wardrobes', title: 'Scandinavian Wooden Bedroom Suite', image_url: 'modern-light-bedroom-with-wooden-furniture-scandinavian-style-3d-rendering.jpg.jpeg' },
  { id: 15, serviceId: 'wardrobes', category: 'Bedrooms & Wardrobes', title: 'Warm Wood Bedroom & Wardrobes', image_url: 'modern-wooden-bedroom-design.jpg.jpeg' },
  { id: 16, serviceId: 'wardrobes', category: 'Bedrooms & Wardrobes', title: 'Aesthetic Pink Bedroom Suite', image_url: 'pink-bedroom-with-aesthetic-decor.jpg.jpeg' },
  { id: 17, serviceId: 'wardrobes', category: 'Bedrooms & Wardrobes', title: 'Luxury Hotel Suite Layout', image_url: 'room-interior-hotel-bedroom.jpg.jpeg' },

  // Living Rooms & TV Units (14)
  { id: 18, serviceId: 'tv-units', category: 'Living Rooms & TV Units', title: 'Modern TV Wall Decoration Design', image_url: '3d-render-modern-tv-wall-decoration-interior-design-inspiration.jpg copy.jpeg' },
  { id: 19, serviceId: 'tv-units', category: 'Living Rooms & TV Units', title: 'Modern Living Room Decor Renders', image_url: '3d-rendering-modern-dining-room-living-room-with-luxury-decor.jpg.jpeg' },
  { id: 20, serviceId: 'tv-units', category: 'Living Rooms & TV Units', title: 'Warm Ambient Light TV Cabinet & Bar', image_url: 'clear-tv-clean-walls-warm-light-tv-cabinet-wine-bottle-8-pieces-hdar-916-ar-32-style-raw-v-6-job-id.jpg.jpeg' },
  { id: 21, serviceId: 'tv-units', category: 'Living Rooms & TV Units', title: 'Contemporary Living Room Illustration', image_url: 'illustration-living-room-interior.jpg.jpeg' },
  { id: 22, serviceId: 'tv-units', category: 'Living Rooms & TV Units', title: 'Luxury Loft Living & Dining Suite', image_url: 'loft-luxury-living-room-with-bookshelf-near-dining-table.jpg.jpeg' },
  { id: 23, serviceId: 'tv-units', category: 'Living Rooms & TV Units', title: 'Luxury Modern Apartment Interior', image_url: 'luxury-modern-apartment-with-comfortable-pillow-decor-generated-by-ai.jpg.jpeg' },
  { id: 24, serviceId: 'tv-units', category: 'Living Rooms & TV Units', title: 'Modern Living Room Big Screen TV Console', image_url: 'modern-living-room-with-big-screen-tv.jpg.jpeg' },
  { id: 25, serviceId: 'tv-units', category: 'Living Rooms & TV Units', title: 'Sectional Sofa & Luxury TV Unit', image_url: 'modern-living-room-with-elegant-tv-unit-sectional-sofa.jpg.jpeg' },
  { id: 26, serviceId: 'tv-units', category: 'Living Rooms & TV Units', title: 'Flat Screen TV Unit & Coffee Table', image_url: 'modern-living-room-with-large-flat-screen-tv-black-coffee-table.jpg.jpeg' },
  { id: 27, serviceId: 'tv-units', category: 'Living Rooms & TV Units', title: 'Minimalist LCD TV Wall Console', image_url: 'modern-minimalist-lcd-tv-wall-unit.jpg.jpeg' },
  { id: 28, serviceId: 'tv-units', category: 'Living Rooms & TV Units', title: 'Space-Saving Wall Mounted Entertainment Unit', image_url: 'modern-stylish-wall-mounted-tv-unit-perfect-space-saving-living-rooms-entertainment-areas.jpg.jpeg' },
  { id: 29, serviceId: 'tv-units', category: 'Living Rooms & TV Units', title: 'Luxury Villa Residential Interior Design', image_url: 'residential-interior-design.jpg.jpeg' },
  { id: 30, serviceId: 'tv-units', category: 'Living Rooms & TV Units', title: 'Aspirational House Wall-Mounted TV Unit', image_url: 'room-luxury-house-wallmounted-tv-interior-design-aspirational-house.jpg.jpeg' },
  { id: 31, serviceId: 'tv-units', category: 'Living Rooms & TV Units', title: 'Zen Japanese Style Modern TV Cabinet', image_url: 'tv-cabinet-modern-empty-room-japanese-zen-styleminimal-designs.jpg.jpeg' },

  // Ceilings & Lighting (3)
  { id: 32, serviceId: 'false-ceiling', category: 'Ceilings & Lighting', title: '3D Ceiling Lighting Render', image_url: 'ceiling-design-3d-rendering.jpg.jpeg' },
  { id: 33, serviceId: 'false-ceiling', category: 'Ceilings & Lighting', title: 'Ambient False Ceiling Wallpaper', image_url: 'ceiling-image-background-wallpaper.jpg.jpeg' },
  { id: 34, serviceId: 'false-ceiling', category: 'Ceilings & Lighting', title: 'Ceiling Cove Lights & Large Window', image_url: 'ceiling-with-lights-large-window.jpg.jpeg' },

  // Office & Commercial (7)
  { id: 35, serviceId: 'office-interiors', category: 'Office & Commercial', title: 'Green Eco Working Room & Office', image_url: '3d-rendering-business-meeting-green-working-room-office-building.jpg.jpeg' },
  { id: 36, serviceId: 'office-interiors', category: 'Office & Commercial', title: 'Executive Business Meeting Room Renders', image_url: '3d-rendering-luxury-business-meeting-working-room-executive-office.jpg.jpeg' },
  { id: 37, serviceId: 'office-interiors', category: 'Office & Commercial', title: 'High-Rise Office Meeting Room', image_url: 'business-meeting-room-high-rise-office-building-with-colorful-decor-furnture.jpg.jpeg' },
  { id: 38, serviceId: 'office-interiors', category: 'Office & Commercial', title: 'Corporate Business Conference Suite', image_url: 'business-meeting-working-room-office-building.jpg.jpeg' },
  { id: 39, serviceId: 'office-interiors', category: 'Office & Commercial', title: 'Minimalist Corporate Office Design', image_url: 'minimalist-office-interior-design.jpg.jpeg' },
  { id: 40, serviceId: 'office-interiors', category: 'Office & Commercial', title: 'Modern Workspace & Collaborative Office', image_url: 'modern-corporate-office-workspace-with-sleek-interiors-collaborative-design.jpg.jpeg' },
  { id: 41, serviceId: 'office-interiors', category: 'Office & Commercial', title: '3D Office Interior Architectural Layout', image_url: 'office-interior-3d-illustration.jpg.jpeg' },

  // Painting & Execution Work (12)
  { id: 42, serviceId: 'home-painting', category: 'Painting & Execution', title: 'Carpenter & Furniture Assembly Craftsmanship', image_url: 'furniture-assembly-worker-standing-reading-instruction-using-tape-measure-worker-tools.jpg.jpeg' },
  { id: 43, serviceId: 'home-painting', category: 'Painting & Execution', title: 'Furniture Assembly Specialist Inspection', image_url: 'male-worker-showing-thumb-sign-after-assambles-shelf-new-furniture-home-owners.jpg.jpeg' },
  { id: 44, serviceId: 'home-painting', category: 'Painting & Execution', title: 'Handyman Painting Interior Accent Wall Yellow', image_url: 'man-painting-walls-yellow.jpg.jpeg' },
  { id: 45, serviceId: 'home-painting', category: 'Painting & Execution', title: 'Turnkey Renovation Architect Planning', image_url: 'man-renovating-his-house-with-design-space.jpg.jpeg' },
  { id: 46, serviceId: 'home-painting', category: 'Painting & Execution', title: 'Master Craftsman On-Site Execution', image_url: 'man-with-hat-that-says-smile-his-face.jpg.jpeg' },
  { id: 47, serviceId: 'home-painting', category: 'Painting & Execution', title: 'Professional Paint Roller & Emulsion Mixing', image_url: 'masaking-blue-paint-with-roller-brush-dipped-white-paint-handyman-renovating-apartment-redecoration-home-construction-while-renovating-improving-repair-decorating.jpg.jpeg' },
  { id: 48, serviceId: 'home-painting', category: 'Painting & Execution', title: 'Professional Painter Wall Coating', image_url: 'photography-professional-painter-pain-house.jpg.jpeg' },
  { id: 49, serviceId: 'home-painting', category: 'Painting & Execution', title: 'Certified Plumbing & Mechanical Specialist', image_url: 'plumber-you-can-count-full-length-shot-cheerful-young-plumber-wearing-tool-belt-smiling.jpg.jpeg' },
  { id: 50, serviceId: 'home-painting', category: 'Painting & Execution', title: 'Dust-Free Interior Wall Painting Execution', image_url: 'professional-painter-painting-wall-with-paint-roller.jpg.jpeg' },
  { id: 51, serviceId: 'home-painting', category: 'Painting & Execution', title: 'Turnkey Interior Remodeling Team', image_url: 'room-being-remodeled-with-contractors.jpg.jpeg' },
  { id: 52, serviceId: 'home-painting', category: 'Painting & Execution', title: 'Specialist Engineers & Site Supervisors', image_url: 'specialists-workers-engineers-photo.jpg.jpeg' },
  { id: 53, serviceId: 'home-painting', category: 'Painting & Execution', title: 'Wall Roller Painting Craftsmanship', image_url: 'woman-paints-wall-with-roller.jpg.jpeg' }
];

const FALLBACK_PROJECTS = FALLBACK_GALLERY_IMAGES.map(g => ({
  title: g.title,
  category_name: g.category,
  featured_image: g.image_url,
  slug: g.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  location: 'Hyderabad, Telangana',
  completion_date: '2026',
  project_type: 'Luxury Turnkey'
}));

const FALLBACK_WCU = [
  { title: 'Turnkey Solutions', description: 'From 3D architectural renders to final dusting, we handle design, procurement, carpentry, electricals, and painting under one roof.', icon_class: 'fas fa-drafting-compass' },
  { title: 'Transparent Pricing', description: 'Detailed itemized BOQs with zero hidden charges. You get exactly what was agreed upon within your defined budget range.', icon_class: 'fas fa-calculator' },
  { title: '45-Day Delivery Guarantee', description: 'Sticking to timelines is our core priority. We ensure on-schedule completion backed by penalty-backed milestone controls.', icon_class: 'fas fa-business-time' },
  { title: '10-Year Warranty', description: 'Uncompromising material quality using branded marine-grade plywood, Blum/Hettich hardware, and premium washable emulsions.', icon_class: 'fas fa-shield-alt' },
  { title: 'Dedicated Site Manager', description: 'A single point of contact supervisor oversees site safety, material inspection, and daily progress reporting via WhatsApp.', icon_class: 'fas fa-user-shield' },
  { title: 'Customized Aesthetics', description: 'No generic template designs. Every kitchen, wardrobe, and living space is engineered specifically around your habits.', icon_class: 'fas fa-palette' }
];

const FALLBACK_TESTIMONIALS = [
  { client_name: 'Rajesh Varma', location: 'Jubilee Hills, Hyderabad', testimonial_text: 'SV Elegant Interior transformed our 4BHK villa completely. The modular kitchen and false ceiling work was delivered right on time with flawless finishing. Highly recommended!', rating: 5 },
  { client_name: 'Priya Sharma', location: 'Gachibowli, Hyderabad', testimonial_text: 'The team was incredibly professional. They took care of complete interior painting and wardrobe fitting. The dust-free painting execution was a game changer for our family.', rating: 5 },
  { client_name: 'Kiran Reddy', location: 'Kondapur, Hyderabad', testimonial_text: 'Best interior design company in Hyderabad. Transparent pricing, excellent 3D visualizations, and dedicated site supervision. Very happy with our living room TV unit!', rating: 5 }
];

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

  // Render initial fallback content immediately so site is never empty
  renderHeroSlider(FALLBACK_HERO_SLIDES);
  renderServicesSection(FALLBACK_SERVICES);
  renderProjectsSection(FALLBACK_PROJECTS);
  renderGallerySection(FALLBACK_GALLERY_IMAGES);
  renderWhyChooseUsSection(FALLBACK_WCU);
  renderTestimonialsSection(FALLBACK_TESTIMONIALS);

  // Sync with Supabase Database
  await syncPublicDataFromSupabase();
});

/* --- 1. Master Supabase Synchronization --- */
async function syncPublicDataFromSupabase() {
  const db = getSupabaseClient();
  if (!db) return;

  try {
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

    // Use Supabase data whenever query succeeds without error
    if (!servicesRes.error && Array.isArray(servicesRes.data)) {
      PUBLIC_SERVICES = servicesRes.data;
      renderServicesSection(PUBLIC_SERVICES);
    }

    if (!projectsRes.error && Array.isArray(projectsRes.data)) {
      PUBLIC_PROJECTS = projectsRes.data;
      renderProjectsSection(PUBLIC_PROJECTS);
    }

    if (!galleryRes.error && Array.isArray(galleryRes.data)) {
      PUBLIC_GALLERY = galleryRes.data;
      renderGallerySection(PUBLIC_GALLERY);
    }

    if (!settingsRes.error && settingsRes.data) {
      renderSiteSettings(settingsRes.data);
    }

    if (!heroRes.error && Array.isArray(heroRes.data) && heroRes.data.length > 0) {
      renderHeroSlider(heroRes.data);
    }

    if (!aboutRes.error && aboutRes.data) {
      renderAboutSection(aboutRes.data);
    }

    if (!baRes.error && baRes.data) {
      renderBeforeAfterSection(baRes.data);
    }

    if (!wcuRes.error && Array.isArray(wcuRes.data) && wcuRes.data.length > 0) {
      renderWhyChooseUsSection(wcuRes.data);
    }

    if (!testRes.error && Array.isArray(testRes.data) && testRes.data.length > 0) {
      renderTestimonialsSection(testRes.data);
    }

    initServicePage();

  } catch (err) {
    console.error('Error synchronizing database content:', err);
  }
}

/* --- 2. Site Settings Integration --- */
function renderSiteSettings(s) {
  if (!s) return;

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

  const displayList = (services && services.length > 0) ? services : FALLBACK_SERVICES;

  container.innerHTML = displayList.map(s => `
    <div class="service-card reveal-on-scroll">
      <div class="service-icon"><i class="${s.icon_class || 'fas fa-couch'}"></i></div>
      <h3>${s.name}</h3>
      <p>${s.short_description || ''}</p>
      <a href="service-detail.html?id=${s.slug || s.id}" class="service-link">View Details <i class="fas fa-arrow-right"></i></a>
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

  const displayList = (projects && projects.length > 0) ? projects : FALLBACK_PROJECTS;
  renderProjectGrid('all', target, displayList);

  const filterBtns = document.querySelectorAll('.project-filter-btn, .index-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCat = btn.getAttribute('data-category-filter');
      renderProjectGrid(filterCat, target, displayList);
    });
  });
}

function renderProjectGrid(filter, container, projects) {
  let filtered = projects;
  if (filter && filter !== 'all') {
    filtered = projects.filter(p => 
      (p.category_name || p.category || '').toLowerCase().includes(filter.toLowerCase()) || 
      (p.slug || '').toLowerCase().includes(filter.toLowerCase())
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">No projects found in this category.</div>`;
    return;
  }

  container.innerHTML = filtered.map((p, idx) => `
    <div class="project-card reveal-on-scroll" data-project-idx="${idx}">
      <img src="${p.featured_image || p.image_url}" alt="${p.title}" loading="lazy">
      <div class="project-zoom-badge"><i class="fas fa-search-plus"></i></div>
      <div class="project-overlay">
        <span class="project-category">${p.category_name || p.category || 'Turnkey'}</span>
        <h3 class="project-title">${p.title}</h3>
      </div>
    </div>
  `).join('');

  const cards = container.querySelectorAll('.project-card');
  cards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      openLightbox(filtered.map(item => ({
        src: item.featured_image || item.image_url,
        title: item.title,
        category: item.category_name || item.category || 'Portfolio'
      })), idx);
    });
  });

  initScrollAnimations();
}

/* --- 7. Master Photo Gallery --- */
function renderGallerySection(galleryItems) {
  const container = document.getElementById('master-category-gallery');
  if (!container) return;

  const displayList = (galleryItems && galleryItems.length > 0) ? galleryItems : FALLBACK_GALLERY_IMAGES;
  renderGalleryItems('all', container, displayList);

  const filterBtns = document.querySelectorAll('.category-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCat = btn.getAttribute('data-category-filter');
      renderGalleryItems(filterCat, container, displayList);
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
  if (!container) return;

  const displayList = (items && items.length > 0) ? items : FALLBACK_WCU;

  container.innerHTML = displayList.map(w => `
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
  if (!container) return;

  const displayList = (testimonials && testimonials.length > 0) ? testimonials : FALLBACK_TESTIMONIALS;

  container.innerHTML = displayList.map(t => `
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

  const servicesList = (PUBLIC_SERVICES && PUBLIC_SERVICES.length > 0) ? PUBLIC_SERVICES : FALLBACK_SERVICES;
  const galleryList = (PUBLIC_GALLERY && PUBLIC_GALLERY.length > 0) ? PUBLIC_GALLERY : FALLBACK_GALLERY_IMAGES;

  const service = servicesList.find(s => s.slug === serviceSlug || s.id === serviceSlug) || servicesList[0];
  if (!service) return;

  document.title = `${service.name} - SV Elegant Interior`;

  let relatedPhotos = galleryList.filter(g => g.serviceId === service.id || g.service_id === service.slug || g.category.toLowerCase().includes((service.category || '').toLowerCase()));
  if (relatedPhotos.length === 0) {
    relatedPhotos = galleryList.slice(0, 8);
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
              <img src="${img.image_url || img.src}" alt="${img.title}">
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
          ${servicesList.filter(s => (s.slug || s.id) !== (service.slug || service.id)).slice(0, 3).map(s => `
            <div class="service-card">
              <div class="service-icon"><i class="${s.icon_class || 'fas fa-couch'}"></i></div>
              <h3>${s.name}</h3>
              <p>${s.short_description || ''}</p>
              <a href="service-detail.html?id=${s.slug || s.id}" class="service-link">View Details <i class="fas fa-arrow-right"></i></a>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  const photoCards = container.querySelectorAll('#service-photos-grid .project-card');
  photoCards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      openLightbox(relatedPhotos.map(item => ({ src: item.image_url || item.src, title: item.title, category: item.category })), idx);
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

      const db = getSupabaseClient();
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

function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => preloader.classList.add('fade-out'), 400);
    });
    setTimeout(() => preloader.classList.add('fade-out'), 1200);
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

  imgEl.src = item.src || item.image_url;
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
