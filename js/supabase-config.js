/* ==========================================================================
   SV Elegant Interior - Supabase & Cloudinary Configuration Engine
   ========================================================================== */

const SUPABASE_URL = 'https://evvxxxpjqtceqhisgckx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2dnh4eHBqcXRjZXFoaXNnY2t4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3MzQwNDEsImV4cCI6MjEwMjMxMDA0MX0.-4fBkFXZW4ioADG5Aw84HJYShxTmhCgCMKfPla-DpMQ';

const CLOUDINARY_CONFIG = {
  cloudName: 'dn2l3pe4',
  uploadPreset: 'ml_default',
  uploadUrl: 'https://api.cloudinary.com/v1_1/dn2l3pe4/auto/upload'
};

// Initialize Supabase JS Client
let db = null;

if (window.supabase) {
  db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  window.supabaseClient = db;
} else {
  console.warn('Supabase SDK script not loaded yet. Waiting for script initialization...');
}

// Utility: Cloudinary Direct Upload with Progress Tracking
async function uploadToCloudinary(file, folder = 'sve-interior', onProgress = null) {
  if (!file) throw new Error('No file provided for upload.');

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
  formData.append('folder', folder);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', CLOUDINARY_CONFIG.uploadUrl, true);

    if (onProgress && xhr.upload) {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percentComplete = Math.round((e.loaded / e.total) * 100);
          onProgress(percentComplete);
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const response = JSON.parse(xhr.responseText);
        saveMediaAssetRecord(response, folder);
        resolve({
          url: response.secure_url,
          public_id: response.public_id,
          format: response.format,
          resource_type: response.resource_type,
          width: response.width,
          height: response.height,
          bytes: response.bytes
        });
      } else {
        let errMessage = 'Cloudinary upload failed.';
        try {
          const errRes = JSON.parse(xhr.responseText);
          if (errRes.error && errRes.error.message) errMessage = errRes.error.message;
        } catch (e) {}
        reject(new Error(errMessage));
      }
    };

    xhr.onerror = () => reject(new Error('Network error occurred during media upload.'));
    xhr.send(formData);
  });
}

// Save uploaded media metadata to Supabase media_assets table
async function saveMediaAssetRecord(res, folder) {
  if (!db) return;
  try {
    await db.from('media_assets').upsert({
      file_name: res.original_filename || 'asset',
      secure_url: res.secure_url,
      cloudinary_public_id: res.public_id,
      resource_type: res.resource_type,
      format: res.format,
      width: res.width,
      height: res.height,
      bytes: res.bytes,
      folder: folder
    }, { onConflict: 'cloudinary_public_id' });
  } catch (e) {
    console.error('Failed to log media asset in database:', e);
  }
}

// Log admin action to activity_logs table
async function logAdminActivity(action, module, recordId = null, details = '') {
  if (!db) return;
  try {
    const user = (await db.auth.getUser())?.data?.user;
    const adminEmail = user?.email || 'admin@svelegantinteriors.com';

    await db.from('activity_logs').insert([{
      admin_email: adminEmail,
      action: action,
      module: module,
      record_id: recordId ? String(recordId) : null,
      details: details
    }]);
  } catch (err) {
    console.error('Error logging activity:', err);
  }
}

// Master Fallback Datasets for Automatic Seeding
const AUTO_SEED_PROJECTS = [
  { title: 'Elegant Luxury Kitchen Design', slug: 'elegant-luxury-kitchen-design', category_name: 'Modular Kitchens', description: 'Turnkey modular kitchen with quartz countertop and soft-close cabinetry.', location: 'Gachibowli, Hyderabad', completion_date: '2026', project_type: 'Luxury Residential', featured_image: 'elegant-kitchen-design.jpg.jpeg', display_order: 1, is_published: true, is_featured: true },
  { title: 'Modern Pink Modular Kitchen', slug: 'modern-pink-modular-kitchen', category_name: 'Modular Kitchens', description: 'Contemporary pink and gold accent modular kitchen suite.', location: 'Jubilee Hills, Hyderabad', completion_date: '2026', project_type: 'Luxury Residential', featured_image: 'elegant-modern-pink-kitchen-interior-design.jpg.jpeg', display_order: 2, is_published: true, is_featured: true },
  { title: 'Contemporary Modular Kitchen', slug: 'contemporary-modular-kitchen', category_name: 'Modular Kitchens', description: 'L-shaped modern layout with built-in microwave and oven tower.', location: 'Kondapur, Hyderabad', completion_date: '2026', project_type: 'Residential', featured_image: 'interior-design-decoration-nice-modern-kitchen.jpg.jpeg', display_order: 3, is_published: true, is_featured: false },
  { title: 'Minimalist Kitchen Concept', slug: 'minimalist-kitchen-concept', category_name: 'Modular Kitchens', description: 'Handleless matte finish kitchen with hidden storage features.', location: 'Banjara Hills, Hyderabad', completion_date: '2026', project_type: 'Luxury Villa', featured_image: 'minimalist-kitchen-interior-design (1).jpg.jpeg', display_order: 4, is_published: true, is_featured: false },
  { title: 'Quartz Finish Modular Layout', slug: 'quartz-finish-modular-layout', category_name: 'Modular Kitchens', description: 'Island kitchen layout with waterfall quartz countertop.', location: 'Madhapur, Hyderabad', completion_date: '2026', project_type: 'Luxury Villa', featured_image: 'minimalist-kitchen-interior-design (2).jpg.jpeg', display_order: 5, is_published: true, is_featured: false },
  { title: 'Modern Dark Grey Kitchen Suite', slug: 'modern-dark-grey-small-kitchen-interior', category_name: 'Modular Kitchens', description: 'Sleek dark grey acrylic finish modular kitchen layout.', location: 'Miyapur, Hyderabad', completion_date: '2026', project_type: 'Residential', featured_image: 'modern-dark-grey-small-kitchen-interior.jpg.jpeg', display_order: 6, is_published: true, is_featured: false },
  { title: 'White & Wood Modular Kitchen', slug: 'white-and-wood-modular-kitchen', category_name: 'Modular Kitchens', description: 'Warm oak wood laminate combined with pristine white cabinets.', location: 'Hitec City, Hyderabad', completion_date: '2026', project_type: 'Residential', featured_image: 'modern-kitchen-interior-white-colors.jpg.jpeg', display_order: 7, is_published: true, is_featured: false },
  { title: 'Modern Pink Kitchen Accent', slug: 'modern-pink-kitchen-accent', category_name: 'Modular Kitchens', description: 'Chic millennial pink modular kitchen with brass handle pulls.', location: 'Tellapur, Hyderabad', completion_date: '2026', project_type: 'Apartment Suite', featured_image: 'modern-pink-kitchen-interior.jpg.jpeg', display_order: 8, is_published: true, is_featured: false },
  { title: 'Luxury Hotel Suite Bedroom with TV', slug: 'luxury-hotel-suite-bedroom-with-tv', category_name: 'Bedrooms & Wardrobes', description: 'Five-star hotel style master bedroom with integrated TV unit.', location: 'Jubilee Hills, Hyderabad', completion_date: '2026', project_type: 'Luxury Villa', featured_image: '3d-rendering-beautiful-luxury-bedroom-suite-hotel-with-tv.jpg.jpeg', display_order: 9, is_published: true, is_featured: true },
  { title: 'Luxurious Bedroom Interior Renders', slug: 'luxurious-bedroom-interior-renders', category_name: 'Bedrooms & Wardrobes', description: 'Master suite featuring velvet headboard wall and walk-in wardrobe.', location: 'Banjara Hills, Hyderabad', completion_date: '2026', project_type: 'Luxury Villa', featured_image: '3d-rendering-luxurious-bedroom-interior.jpg.jpeg', display_order: 10, is_published: true, is_featured: false },
  { title: 'Hotel Suite Bedroom & Wardrobe', slug: 'hotel-suite-bedroom-wardrobe', category_name: 'Bedrooms & Wardrobes', description: 'Floor-to-ceiling tinted glass sliding wardrobe with sensor lights.', location: 'Gachibowli, Hyderabad', completion_date: '2026', project_type: 'Luxury Residential', featured_image: '3d-rendering-luxury-bedroom-suite-hotel-with-tv-cabinet-wardrobe.jpg.jpeg', display_order: 11, is_published: true, is_featured: false },
  { title: 'Modern Bedroom Architectural Render', slug: 'modern-bedroom-architectural-render', category_name: 'Bedrooms & Wardrobes', description: 'Soft warm wood bedroom wall paneling and customized dresser.', location: 'Kondapur, Hyderabad', completion_date: '2026', project_type: 'Residential', featured_image: 'illustration-bedroom-interior.jpg.jpeg', display_order: 12, is_published: true, is_featured: false },
  { title: 'Minimalist Luxury Bedroom Design', slug: 'minimalist-luxury-bedroom-design', category_name: 'Bedrooms & Wardrobes', description: 'Japanese inspired minimalist low-bed framework and wooden wardrobe.', location: 'Kokapet, Hyderabad', completion_date: '2026', project_type: 'Luxury Apartment', featured_image: 'minimalist-luxury-modern-bed-room-design-morning-light-modern-interior-concept.jpg.jpeg', display_order: 13, is_published: true, is_featured: false },
  { title: 'Scandinavian Wooden Bedroom Suite', slug: 'scandinavian-wooden-bedroom-suite', category_name: 'Bedrooms & Wardrobes', description: 'Light oak wood bedroom setup with floating side tables.', location: 'Nallagandla, Hyderabad', completion_date: '2026', project_type: 'Residential', featured_image: 'modern-light-bedroom-with-wooden-furniture-scandinavian-style-3d-rendering.jpg.jpeg', display_order: 14, is_published: true, is_featured: false },
  { title: 'Warm Wood Bedroom & Wardrobes', slug: 'warm-wood-bedroom-wardrobes', category_name: 'Bedrooms & Wardrobes', description: 'Sliding veneer wardrobe with full length mirror and warm cove lights.', location: 'Financial District, Hyderabad', completion_date: '2026', project_type: 'Apartment', featured_image: 'modern-wooden-bedroom-design.jpg.jpeg', display_order: 15, is_published: true, is_featured: false },
  { title: 'Aesthetic Pink Bedroom Suite', slug: 'aesthetic-pink-bedroom-suite', category_name: 'Bedrooms & Wardrobes', description: 'Custom girl suite bedroom with plush upholstery and study corner.', location: 'Manikonda, Hyderabad', completion_date: '2026', project_type: 'Residential', featured_image: 'pink-bedroom-with-aesthetic-decor.jpg.jpeg', display_order: 16, is_published: true, is_featured: false },
  { title: 'Luxury Hotel Suite Layout', slug: 'luxury-hotel-suite-layout', category_name: 'Bedrooms & Wardrobes', description: 'Double height bedroom space with louvers and ambient lighting.', location: 'Puppalguda, Hyderabad', completion_date: '2026', project_type: 'Villa Project', featured_image: 'room-interior-hotel-bedroom.jpg.jpeg', display_order: 17, is_published: true, is_featured: false },
  { title: 'Modern TV Wall Decoration Design', slug: 'modern-tv-wall-decoration-design', category_name: 'Living & TV Units', description: 'Marble slab backdrop with charcoal fluted paneling and LED strips.', location: 'Jubilee Hills, Hyderabad', completion_date: '2026', project_type: 'Luxury Living', featured_image: '3d-render-modern-tv-wall-decoration-interior-design-inspiration.jpg copy.jpeg', display_order: 18, is_published: true, is_featured: true },
  { title: 'Modern Living Room Decor Renders', slug: 'modern-living-room-decor-renders', category_name: 'Living & TV Units', description: 'Open layout dining and living room decor with gold metal accents.', location: 'Gachibowli, Hyderabad', completion_date: '2026', project_type: 'Luxury Villa', featured_image: '3d-rendering-modern-dining-room-living-room-with-luxury-decor.jpg.jpeg', display_order: 19, is_published: true, is_featured: false },
  { title: 'Warm Ambient Light TV Cabinet & Bar', slug: 'warm-ambient-light-tv-cabinet-bar', category_name: 'Living & TV Units', description: 'Built-in wine bottle rack and warm backlit TV console.', location: 'Banjara Hills, Hyderabad', completion_date: '2026', project_type: 'Penthouse', featured_image: 'clear-tv-clean-walls-warm-light-tv-cabinet-wine-bottle-8-pieces-hdar-916-ar-32-style-raw-v-6-job-id.jpg.jpeg', display_order: 20, is_published: true, is_featured: false },
  { title: 'Contemporary Living Room Illustration', slug: 'contemporary-living-room-illustration', category_name: 'Living & TV Units', description: 'Modern sectional couch setup with floating coffee table.', location: 'Kondapur, Hyderabad', completion_date: '2026', project_type: 'Residential', featured_image: 'illustration-living-room-interior.jpg.jpeg', display_order: 21, is_published: true, is_featured: false },
  { title: 'Luxury Loft Living & Dining Suite', slug: 'luxury-loft-living-dining-suite', category_name: 'Living & TV Units', description: 'Loft style living area with floor-to-ceiling bookshelf and dining table.', location: 'Hitec City, Hyderabad', completion_date: '2026', project_type: 'Loft Suite', featured_image: 'loft-luxury-living-room-with-bookshelf-near-dining-table.jpg.jpeg', display_order: 22, is_published: true, is_featured: false },
  { title: 'Luxury Modern Apartment Interior', slug: 'luxury-modern-apartment-interior', category_name: 'Living & TV Units', description: 'Cozy modern apartment living room with plush cushions and soft tones.', location: 'Madhapur, Hyderabad', completion_date: '2026', project_type: 'Apartment', featured_image: 'luxury-modern-apartment-with-comfortable-pillow-decor-generated-by-ai.jpg.jpeg', display_order: 23, is_published: true, is_featured: false },
  { title: 'Modern Living Room Big Screen TV Console', slug: 'modern-living-room-big-screen-tv-console', category_name: 'Living & TV Units', description: 'Designed for 75-inch TV with concealed wire channels and storage drawers.', location: 'Kukatpally, Hyderabad', completion_date: '2026', project_type: 'Residential', featured_image: 'modern-living-room-with-big-screen-tv.jpg.jpeg', display_order: 24, is_published: true, is_featured: false },
  { title: 'Sectional Sofa & Luxury TV Unit', slug: 'sectional-sofa-luxury-tv-unit', category_name: 'Living & TV Units', description: 'L-shape leather sectional sofa with matching wooden TV backdrop.', location: 'Nizampet, Hyderabad', completion_date: '2026', project_type: 'Residential', featured_image: 'modern-living-room-with-elegant-tv-unit-sectional-sofa.jpg.jpeg', display_order: 25, is_published: true, is_featured: false },
  { title: 'Flat Screen TV Unit & Coffee Table', slug: 'flat-screen-tv-unit-coffee-table', category_name: 'Living & TV Units', description: 'Minimalist black matte coffee table and wall-mounted storage unit.', location: 'Bachupally, Hyderabad', completion_date: '2026', project_type: 'Residential', featured_image: 'modern-living-room-with-large-flat-screen-tv-black-coffee-table.jpg.jpeg', display_order: 26, is_published: true, is_featured: false },
  { title: 'Minimalist LCD TV Wall Console', slug: 'minimalist-lcd-tv-wall-console', category_name: 'Living & TV Units', description: 'Ultra-clean wall mounted LCD TV panel with floating drawer console.', location: 'Quthubullapur, Hyderabad', completion_date: '2026', project_type: 'Residential', featured_image: 'modern-minimalist-lcd-tv-wall-unit.jpg.jpeg', display_order: 27, is_published: true, is_featured: false },
  { title: 'Space-Saving Wall Mounted Entertainment Unit', slug: 'space-saving-wall-mounted-entertainment-unit', category_name: 'Living & TV Units', description: 'Space-efficient entertainment wall designed for compact apartments.', location: 'Komally, Hyderabad', completion_date: '2026', project_type: 'Apartment', featured_image: 'modern-stylish-wall-mounted-tv-unit-perfect-space-saving-living-rooms-entertainment-areas.jpg.jpeg', display_order: 28, is_published: true, is_featured: false },
  { title: 'Luxury Villa Residential Interior Design', slug: 'luxury-villa-residential-interior-design', category_name: 'Living & TV Units', description: 'Spacious duplex villa living room with double height glass windows.', location: 'Gandipet, Hyderabad', completion_date: '2026', project_type: 'Villa', featured_image: 'residential-interior-design.jpg.jpeg', display_order: 29, is_published: true, is_featured: false },
  { title: 'Aspirational House Wall-Mounted TV Unit', slug: 'aspirational-house-wall-mounted-tv-unit', category_name: 'Living & TV Units', description: 'Warm wooden slatted accent wall framing the TV setup.', location: 'Tellapur, Hyderabad', completion_date: '2026', project_type: 'Residential', featured_image: 'room-luxury-house-wallmounted-tv-interior-design-aspirational-house.jpg.jpeg', display_order: 30, is_published: true, is_featured: false },
  { title: 'Zen Japanese Style Modern TV Cabinet', slug: 'zen-japanese-style-modern-tv-cabinet', category_name: 'Living & TV Units', description: 'Clean oak lines, natural bamboo accents, and low floating cabinet.', location: 'Financial District, Hyderabad', completion_date: '2026', project_type: 'Luxury Flat', featured_image: 'tv-cabinet-modern-empty-room-japanese-zen-styleminimal-designs.jpg.jpeg', display_order: 31, is_published: true, is_featured: false },
  { title: '3D Ceiling Lighting Render', slug: '3d-ceiling-lighting-render', category_name: 'Ceilings & Lighting', description: 'Gypsum cove ceiling layout with warm indirect LED strip lighting.', location: 'Madhapur, Hyderabad', completion_date: '2026', project_type: 'Residential', featured_image: 'ceiling-design-3d-rendering.jpg.jpeg', display_order: 32, is_published: true, is_featured: true },
  { title: 'Ambient False Ceiling Wallpaper', slug: 'ambient-false-ceiling-wallpaper', category_name: 'Ceilings & Lighting', description: 'Wooden rafter ceiling grid with spotlight placements.', location: 'Kondapur, Hyderabad', completion_date: '2026', project_type: 'Villa', featured_image: 'ceiling-image-background-wallpaper.jpg.jpeg', display_order: 33, is_published: true, is_featured: false },
  { title: 'Ceiling Cove Lights & Large Window', slug: 'ceiling-cove-lights-large-window', category_name: 'Ceilings & Lighting', description: 'Recessed architectural spotlights with dimmable control modules.', location: 'Jubilee Hills, Hyderabad', completion_date: '2026', project_type: 'Luxury Living', featured_image: 'ceiling-with-lights-large-window.jpg.jpeg', display_order: 34, is_published: true, is_featured: false },
  { title: 'Green Eco Working Room & Office', slug: 'green-eco-working-room-office', category_name: 'Office & Commercial', description: 'Eco-friendly corporate meeting room with indoor biophilic plant wall.', location: 'Hitec City, Hyderabad', completion_date: '2026', project_type: 'Commercial Office', featured_image: '3d-rendering-business-meeting-green-working-room-office-building.jpg.jpeg', display_order: 35, is_published: true, is_featured: true },
  { title: 'Executive Business Meeting Room Renders', slug: 'executive-business-meeting-room-renders', category_name: 'Office & Commercial', description: '16-seater conference table with integrated AV wiring and acoustic walling.', location: 'Financial District, Hyderabad', completion_date: '2026', project_type: 'Corporate Office', featured_image: '3d-rendering-luxury-business-meeting-working-room-executive-office.jpg.jpeg', display_order: 36, is_published: true, is_featured: false },
  { title: 'High-Rise Office Meeting Room', slug: 'high-rise-office-meeting-room', category_name: 'Office & Commercial', description: 'High-rise glass facade office with colorful modern ergonomic chairs.', location: 'Gachibowli, Hyderabad', completion_date: '2026', project_type: 'IT Workspace', featured_image: 'business-meeting-room-high-rise-office-building-with-colorful-decor-furnture.jpg.jpeg', display_order: 37, is_published: true, is_featured: false },
  { title: 'Corporate Business Conference Suite', slug: 'corporate-business-conference-suite', category_name: 'Office & Commercial', description: 'Executive board room layout with custom veneer conference table.', location: 'Kondapur, Hyderabad', completion_date: '2026', project_type: 'Corporate Office', featured_image: 'business-meeting-working-room-office-building.jpg.jpeg', display_order: 38, is_published: true, is_featured: false },
  { title: 'Minimalist Corporate Office Design', slug: 'minimalist-corporate-office-design', category_name: 'Office & Commercial', description: 'Sleek open office floor plan boosting collaborative teamwork.', location: 'Madhapur, Hyderabad', completion_date: '2026', project_type: 'Tech Startup', featured_image: 'minimalist-office-interior-design.jpg.jpeg', display_order: 39, is_published: true, is_featured: false },
  { title: 'Modern Workspace & Collaborative Office', slug: 'modern-workspace-collaborative-office', category_name: 'Office & Commercial', description: 'Modular workstation cubicles with cable management trays.', location: 'Banjara Hills, Hyderabad', completion_date: '2026', project_type: 'Corporate Office', featured_image: 'modern-corporate-office-workspace-with-sleek-interiors-collaborative-design.jpg.jpeg', display_order: 40, is_published: true, is_featured: false },
  { title: '3D Office Interior Architectural Layout', slug: '3d-office-interior-architectural-layout', category_name: 'Office & Commercial', description: 'Comprehensive 3D space plan for 5000 sq.ft IT office branch.', location: 'Kokapet, Hyderabad', completion_date: '2026', project_type: 'Commercial Space', featured_image: 'office-interior-3d-illustration.jpg.jpeg', display_order: 41, is_published: true, is_featured: false },
  { title: 'Carpenter & Furniture Assembly Craftsmanship', slug: 'carpenter-furniture-assembly-craftsmanship', category_name: 'Painting & Execution', description: 'On-site precision woodworking and custom carpentry execution.', location: 'Quthubullapur, Hyderabad', completion_date: '2026', project_type: 'Site Execution', featured_image: 'furniture-assembly-worker-standing-reading-instruction-using-tape-measure-worker-tools.jpg.jpeg', display_order: 42, is_published: true, is_featured: true },
  { title: 'Furniture Assembly Specialist Inspection', slug: 'furniture-assembly-specialist-inspection', category_name: 'Painting & Execution', description: 'Quality check and hardware alignment by senior site engineers.', location: 'Medchal, Hyderabad', completion_date: '2026', project_type: 'Site Execution', featured_image: 'male-worker-showing-thumb-sign-after-assambles-shelf-new-furniture-home-owners.jpg.jpeg', display_order: 43, is_published: true, is_featured: false },
  { title: 'Handyman Painting Interior Accent Wall Yellow', slug: 'handyman-painting-interior-accent-wall-yellow', category_name: 'Painting & Execution', description: 'Vibrant yellow accent wall texture application.', location: 'Suchitra, Hyderabad', completion_date: '2026', project_type: 'Painting Project', featured_image: 'man-painting-walls-yellow.jpg.jpeg', display_order: 44, is_published: true, is_featured: false },
  { title: 'Turnkey Renovation Architect Planning', slug: 'turnkey-renovation-architect-planning', category_name: 'Painting & Execution', description: 'Architect blueprint review and structural site evaluation.', location: 'Kompally, Hyderabad', completion_date: '2026', project_type: 'Renovation', featured_image: 'man-renovating-his-house-with-design-space.jpg.jpeg', display_order: 45, is_published: true, is_featured: false },
  { title: 'Master Craftsman On-Site Execution', slug: 'master-craftsman-on-site-execution', category_name: 'Painting & Execution', description: 'Detailed hand-carved wood molding and panel installation.', location: 'Alwal, Hyderabad', completion_date: '2026', project_type: 'Site Execution', featured_image: 'man-with-hat-that-says-smile-his-face.jpg.jpeg', display_order: 46, is_published: true, is_featured: false },
  { title: 'Professional Paint Roller & Emulsion Mixing', slug: 'professional-paint-roller-emulsion-mixing', category_name: 'Painting & Execution', description: 'Computerized shade mixing and smooth primer roller application.', location: 'Malkajgiri, Hyderabad', completion_date: '2026', project_type: 'Painting Project', featured_image: 'masaking-blue-paint-with-roller-brush-dipped-white-paint-handyman-renovating-apartment-redecoration-home-construction-while-renovating-improving-repair-decorating.jpg.jpeg', display_order: 47, is_published: true, is_featured: false },
  { title: 'Professional Painter Wall Coating', slug: 'professional-painter-wall-coating', category_name: 'Painting & Execution', description: 'Multi-coat washable velvet emulsion application.', location: 'Secunderabad, Hyderabad', completion_date: '2026', project_type: 'Painting Project', featured_image: 'photography-professional-painter-pain-house.jpg.jpeg', display_order: 48, is_published: true, is_featured: false },
  { title: 'Certified Plumbing & Mechanical Specialist', slug: 'certified-plumbing-mechanical-specialist', category_name: 'Painting & Execution', description: 'Concealed plumbing and luxury bath fixture fitting.', location: 'Bowenpally, Hyderabad', completion_date: '2026', project_type: 'Turnkey Work', featured_image: 'plumber-you-can-count-full-length-shot-cheerful-young-plumber-wearing-tool-belt-smiling.jpg.jpeg', display_order: 49, is_published: true, is_featured: false },
  { title: 'Dust-Free Interior Wall Painting Execution', slug: 'dust-free-interior-wall-painting-execution', category_name: 'Painting & Execution', description: 'Motorized vacuum sanding for silky dust-free paint finish.', location: 'Miyapur, Hyderabad', completion_date: '2026', project_type: 'Painting Project', featured_image: 'professional-painter-painting-wall-with-paint-roller.jpg.jpeg', display_order: 50, is_published: true, is_featured: false },
  { title: 'Turnkey Interior Remodeling Team', slug: 'turnkey-interior-remodeling-team', category_name: 'Painting & Execution', description: 'Civil team completing flooring tile replacement and plastering.', location: 'Chanda Nagar, Hyderabad', completion_date: '2026', project_type: 'Renovation', featured_image: 'room-being-remodeled-with-contractors.jpg.jpeg', display_order: 51, is_published: true, is_featured: false },
  { title: 'Specialist Engineers & Site Supervisors', slug: 'specialist-engineers-site-supervisors', category_name: 'Painting & Execution', description: 'Daily site progress inspection and quality assurance.', location: 'Begumpet, Hyderabad', completion_date: '2026', project_type: 'Turnkey Site', featured_image: 'specialists-workers-engineers-photo.jpg.jpeg', display_order: 52, is_published: true, is_featured: false },
  { title: 'Wall Roller Painting Craftsmanship', slug: 'wall-roller-painting-craftsmanship', category_name: 'Painting & Execution', description: 'Flawless corner edging and smooth roller wall finish.', location: 'Bachupally, Hyderabad', completion_date: '2026', project_type: 'Painting Project', featured_image: 'woman-paints-wall-with-roller.jpg.jpeg', display_order: 53, is_published: true, is_featured: false }
];

// Automatic Seeding Function
async function autoSeedDatabaseIfEmpty(tableName) {
  if (!db) return [];

  try {
    if (tableName === 'projects') {
      console.log('Seeding 53 default website projects into Supabase...');
      const { data, error } = await db.from('projects').insert(AUTO_SEED_PROJECTS).select();
      if (!error) return data || [];
    }
  } catch (err) {
    console.error('Auto seed error for ' + tableName + ':', err);
  }
  return [];
}
