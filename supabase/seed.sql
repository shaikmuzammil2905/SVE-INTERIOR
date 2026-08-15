-- SV Elegant Interior - Initial Database Seed Data
-- Populate database with existing site content (21 services, 53 gallery items, hero slides, about, why choose us, testimonials, and settings)

-- 1. Site Settings Initial Record
INSERT INTO public.site_settings (
    company_name, phone, whatsapp, email, address, google_maps_url,
    instagram_url, facebook_url, youtube_url, linkedin_url,
    footer_description, copyright_text, seo_title, meta_description, keywords, og_image, favicon, consultation_btn_text
) VALUES (
    'SV Elegant Interior',
    '+919100097311',
    '919100097311',
    'info@svelegantinteriors.com',
    'Near Venkateswara Temple, Mahadevpuram, Raavinarayana Reddy Nagar, Devender Nagar, Quthubullapur, Medchal, Telangana 500055',
    'https://maps.google.com/?q=17.524771,78.413324',
    'https://instagram.com/svelegantinterior',
    'https://facebook.com/svelegantinterior',
    'https://youtube.com',
    'https://linkedin.com',
    'SV Elegant Interior delivers luxury home interior design, custom modular kitchens, wardrobes, false ceiling, and professional painting services in Hyderabad.',
    '© 2026 SV Elegant Interior. All Rights Reserved.',
    'SV Elegant Interior | Luxury Home Interiors & Painting Services Hyderabad',
    'SV Elegant Interior delivers luxury home interior design, modular kitchens, custom furniture, false ceilings, and professional interior/exterior painting services in Hyderabad & Medchal.',
    'SV Elegant Interior, Interior Design Hyderabad, Modular Kitchens, Wardrobes, Custom Furniture, Home Painting, Quthubullapur Interior Designers',
    'assets/images/hero1.png',
    'assets/images/logo.png',
    'Book Consultation'
);

-- 2. Hero Slides Initial Data
INSERT INTO public.hero_slides (headline, subheading, description, primary_btn_text, primary_btn_url, secondary_btn_text, secondary_btn_url, image_url, display_order, is_published)
VALUES
('Transforming Spaces Into Timeless Luxury', 'Premium Interior Solutions', 'We design elegant, functional, and stylish spaces that perfectly match your lifestyle and budget. Turnkey interiors & professional painting services.', 'Book Consultation', '#contact', 'View Projects', 'projects.html', 'assets/images/hero1.png', 1, true),
('Crafting Bespoke Modular Kitchens & Interiors', 'Architectural Perfection', 'From modern minimalist kitchens to opulent master bedroom suites, our master craftsmen bring your vision to life.', 'Book Consultation', '#contact', 'Explore Services', 'services.html', 'assets/images/hero2.png', 2, true),
('Professional Home Painting & Renovations', 'Flawless Finish Guaranteed', 'Dust-free interior/exterior painting with royal luxury washable emulsions and long-lasting protective finishes.', 'Get Quote', '#contact', 'Our Gallery', 'gallery.html', 'assets/images/hero3.png', 3, true);

-- 3. About Section Initial Data
INSERT INTO public.about_section (heading, main_description, mission, vision, company_description, image_url, button_text, button_url)
VALUES (
    'Transforming Visions into Luxurious Realities',
    'At SV Elegant Interior, we believe every space should reflect elegance, comfort, and functional beauty. Based in Hyderabad, we provide comprehensive turnkey interior design and precision painting services.',
    'To deliver tailored, world-class interior craftsmanship with transparent pricing, premium materials, and on-time completion.',
    'To become Telangana’s benchmark for residential and commercial interior luxury.',
    'Our team of seasoned designers, civil engineers, and master painters collaborate seamlessly to deliver turnkey residential villas, apartments, corporate offices, and commercial spaces.',
    'assets/images/office.png',
    'Explore Our Services',
    'services.html'
);

-- 4. Service Categories
INSERT INTO public.service_categories (name, slug, display_order) VALUES
('Residential Interiors', 'residential-interiors', 1),
('Kitchen & Storage', 'kitchen-storage', 2),
('Ceilings & Decor', 'ceilings-decor', 3),
('Painting & Finish', 'painting-finish', 4),
('Commercial & Office', 'commercial-office', 5);

-- 5. Services Catalog (21 Unique Services)
INSERT INTO public.services (name, slug, category, short_description, full_description, image_url, icon_class, display_order, is_published, is_featured) VALUES
('Interior Design', 'interior-design', 'Residential Interiors', 'End-to-end luxury interior design solutions tailored for contemporary living.', 'Comprehensive turnkey interior design covering space planning, 3D modeling, material selection, and end-to-end execution.', 'assets/images/hero1.png', 'fas fa-couch', 1, true, true),
('Home Interiors', 'home-interiors', 'Residential Interiors', 'Complete turn-key home transformations reflecting your unique lifestyle.', 'Full-house interior transformations designed around your aesthetics, family needs, and lifestyle demands.', 'assets/images/hero2.png', 'fas fa-home', 2, true, true),
('Modular Kitchens', 'modular-kitchens', 'Kitchen & Storage', 'Ergonomic, modern modular kitchens with premium fittings and quartz finishes.', 'Custom acrylic, PU finish, and quartz modular kitchens equipped with Blum soft-close hardware and pull-out organizers.', 'elegant-kitchen-design.jpg.jpeg', 'fas fa-utensils', 3, true, true),
('Wardrobes', 'wardrobes', 'Kitchen & Storage', 'Custom built sliding and walk-in wardrobes with smart storage systems.', 'High-gloss glass sliding, walk-in closets, and modular wardrobe systems with sensory lighting.', '3d-rendering-beautiful-luxury-bedroom-suite-hotel-with-tv.jpg.jpeg', 'fas fa-door-closed', 4, true, true),
('TV Units', 'tv-units', 'Residential Interiors', 'Luxury wall entertainment consoles featuring cove lighting and marble backdrops.', 'Custom entertainment centers with fluted wood paneling, marble backdrops, floating shelves, and cable management.', 'modern-living-room-with-big-screen-tv.jpg.jpeg', 'fas fa-tv', 5, true, true),
('False Ceiling', 'false-ceiling', 'Ceilings & Decor', 'Designer gypsum and wooden ceiling layouts with ambient LED lighting.', 'Gypsum plasterboards, wooden raft ceilings, cove lighting channels, and magnetic track light fixtures.', 'ceiling-design-3d-rendering.jpg.jpeg', 'fas fa-border-all', 6, true, false),
('Wall Paneling', 'wall-paneling', 'Ceilings & Decor', 'Acoustic and decorative louvers, fluted panels, and upholstered accent walls.', 'Textured PVC louvers, charcoal acoustic panels, fabric upholstery, and wooden wall cladding.', '3d-render-modern-tv-wall-decoration-interior-design-inspiration.jpg copy.jpeg', 'fas fa-th-large', 7, true, false),
('Wooden Flooring', 'wooden-flooring', 'Residential Interiors', 'High-grade hardwood and laminate flooring providing warmth and elegance.', 'Scratch-resistant laminate wood planks, engineered oak flooring, and outdoor deck tiling.', 'modern-light-bedroom-with-wooden-furniture-scandinavian-style-3d-rendering.jpg.jpeg', 'fas fa-square', 8, true, false),
('Custom Furniture', 'custom-furniture', 'Residential Interiors', 'Bespoke hand-crafted sofas, dining tables, and plush armchairs.', 'Hand-crafted solid wood dining sets, velvet accent lounge chairs, and custom modular sofas.', 'furniture-assembly-worker-standing-reading-instruction-using-tape-measure-worker-tools.jpg.jpeg', 'fas fa-chair', 9, true, false),
('Space Planning', 'space-planning', 'Residential Interiors', 'Architectural space optimization ensuring maximum functionality and aesthetic flow.', 'Professional layout drafting, traffic flow optimization, lighting grid mapping, and ergonomic space utility.', 'man-renovating-his-house-with-design-space.jpg.jpeg', 'fas fa-drafting-compass', 10, true, false),
('Interior Renovation', 'interior-renovation', 'Residential Interiors', 'Complete makeover services upgrading legacy spaces into contemporary havens.', 'Full structural and cosmetic renovation of aging apartments, villas, and bathrooms.', 'room-being-remodeled-with-contractors.jpg.jpeg', 'fas fa-tools', 11, true, false),
('Home Painting', 'home-painting', 'Painting & Finish', 'Premium interior and exterior wall painting with smooth dust-free finishes.', 'Dust-free motorized sanding, primer coat application, and royal luxury emulsion finishes.', 'assets/images/painting.png', 'fas fa-paint-roller', 12, true, true),
('Interior Painting', 'interior-painting', 'Painting & Finish', 'Royal luxury washable emulsions, texture coatings, and metallic accents.', 'Washable velvet emulsions, Venetian plaster textures, metallic accent walls, and stencil patterns.', 'masaking-blue-paint-with-roller-brush-dipped-white-paint-handyman-renovating-apartment-redecoration-home-construction-while-renovating-improving-repair-decorating.jpg.jpeg', 'fas fa-fill-drip', 13, true, false),
('Exterior Painting', 'exterior-painting', 'Painting & Finish', 'Weather-proof exterior coatings protecting structures against harsh elements.', 'All-weather silicone and elastomeric exterior shield coatings guarding against UV and rain damage.', 'photography-professional-painter-pain-house.jpg.jpeg', 'fas fa-sun', 14, true, false),
('Commercial Painting', 'commercial-painting', 'Painting & Finish', 'Scalable corporate painting solutions with minimal operational downtime.', 'Fast-track anti-microbial paint application for IT parks, retail showrooms, and hospitality setups.', 'professional-painter-painting-wall-with-paint-roller.jpg.jpeg', 'fas fa-building', 15, true, false),
('Office Interiors', 'office-interiors', 'Commercial & Office', 'Modern ergonomic office layouts boosting productivity and brand prestige.', 'Corporate executive cabins, modular open workstations, acoustic conference rooms, and reception desks.', 'assets/images/office.png', 'fas fa-briefcase', 16, true, true),
('Villa Interiors', 'villa-interiors', 'Residential Interiors', 'Grand scale luxury villa interiors incorporating double-height aesthetics.', 'Turnkey double-height living spaces, grand chandelier ceilings, custom staircases, and outdoor lounge areas.', 'residential-interior-design.jpg.jpeg', 'fas fa-hotel', 17, true, false),
('Apartment Interiors', 'apartment-interiors', 'Residential Interiors', 'Smart, space-efficient apartment interior designs maximizing comfort.', 'Compact luxury apartment interiors utilizing multi-functional furniture and concealed storage.', 'luxury-modern-apartment-with-comfortable-pillow-decor-generated-by-ai.jpg.jpeg', 'fas fa-city', 18, true, false),
('False Ceiling Designs', 'false-ceiling-designs', 'Ceilings & Decor', 'Multi-tiered custom ceiling concepts with integrated magnetic tracks.', 'Architectural ceiling drop layers, CNC lattice cutouts, and concealed strip lighting setups.', 'ceiling-with-lights-large-window.jpg.jpeg', 'fas fa-layer-group', 19, true, false),
('Lighting Design', 'lighting-design', 'Ceilings & Decor', 'Architectural lighting plans creating distinct mood layers and highlights.', 'Warm ambient cove lighting, architectural spotlighting, pendant installations, and smart dimming controls.', 'clear-tv-clean-walls-warm-light-tv-cabinet-wine-bottle-8-pieces-hdar-916-ar-32-style-raw-v-6-job-id.jpg.jpeg', 'fas fa-lightbulb', 20, true, false),
('3D Interior Visualization', '3d-interior-visualization', 'Residential Interiors', 'Photorealistic 3D renders and virtual walkthroughs before physical execution.', 'High-definition 3D renders and 360-degree virtual walkthroughs letting clients experience their home before construction.', '3d-rendering-luxurious-bedroom-interior.jpg.jpeg', 'fas fa-cube', 21, true, false);

-- 6. Project Categories
INSERT INTO public.project_categories (name, slug, display_order) VALUES
('Modular Kitchens', 'modular-kitchens', 1),
('Bedrooms & Wardrobes', 'bedrooms-wardrobes', 2),
('Living & TV Units', 'living-tv-units', 3),
('Ceilings & Lighting', 'ceilings-lighting', 4),
('Office & Commercial', 'office-commercial', 5),
('Painting & Execution', 'painting-execution', 6);

-- 7. Projects & Portfolio Catalog (53 Master Items Seeded)
INSERT INTO public.projects (title, slug, category_name, description, location, completion_date, project_type, featured_image, display_order, is_published, is_featured) VALUES
('Elegant Luxury Kitchen Design', 'elegant-luxury-kitchen-design', 'Modular Kitchens', 'Turnkey modular kitchen with quartz countertop and soft-close cabinetry.', 'Gachibowli, Hyderabad', '2026', 'Luxury Residential', 'elegant-kitchen-design.jpg.jpeg', 1, true, true),
('Modern Pink Modular Kitchen', 'modern-pink-modular-kitchen', 'Modular Kitchens', 'Contemporary pink and gold accent modular kitchen suite.', 'Jubilee Hills, Hyderabad', '2026', 'Luxury Residential', 'elegant-modern-pink-kitchen-interior-design.jpg.jpeg', 2, true, true),
('Contemporary Modular Kitchen', 'contemporary-modular-kitchen', 'Modular Kitchens', 'L-shaped modern layout with built-in microwave and oven tower.', 'Kondapur, Hyderabad', '2026', 'Residential', 'interior-design-decoration-nice-modern-kitchen.jpg.jpeg', 3, true, false),
('Minimalist Kitchen Concept', 'minimalist-kitchen-concept', 'Modular Kitchens', 'Handleless matte finish kitchen with hidden storage features.', 'Banjara Hills, Hyderabad', '2026', 'Luxury Villa', 'minimalist-kitchen-interior-design (1).jpg.jpeg', 4, true, false),
('Quartz Finish Modular Layout', 'quartz-finish-modular-layout', 'Modular Kitchens', 'Island kitchen layout with waterfall quartz countertop.', 'Madhapur, Hyderabad', '2026', 'Luxury Villa', 'minimalist-kitchen-interior-design (2).jpg.jpeg', 5, true, false),
('Modern Dark Grey Kitchen Suite', 'modern-dark-grey-small-kitchen-interior', 'Modular Kitchens', 'Sleek dark grey acrylic finish modular kitchen layout.', 'Miyapur, Hyderabad', '2026', 'Residential', 'modern-dark-grey-small-kitchen-interior.jpg.jpeg', 6, true, false),
('White & Wood Modular Kitchen', 'white-and-wood-modular-kitchen', 'Modular Kitchens', 'Warm oak wood laminate combined with pristine white cabinets.', 'Hitec City, Hyderabad', '2026', 'Residential', 'modern-kitchen-interior-white-colors.jpg.jpeg', 7, true, false),
('Modern Pink Kitchen Accent', 'modern-pink-kitchen-accent', 'Modular Kitchens', 'Chic millennial pink modular kitchen with brass handle pulls.', 'Tellapur, Hyderabad', '2026', 'Apartment Suite', 'modern-pink-kitchen-interior.jpg.jpeg', 8, true, false),
('Luxury Hotel Suite Bedroom with TV', 'luxury-hotel-suite-bedroom-with-tv', 'Bedrooms & Wardrobes', 'Five-star hotel style master bedroom with integrated TV unit.', 'Jubilee Hills, Hyderabad', '2026', 'Luxury Villa', '3d-rendering-beautiful-luxury-bedroom-suite-hotel-with-tv.jpg.jpeg', 9, true, true),
('Luxurious Bedroom Interior Renders', 'luxurious-bedroom-interior-renders', 'Bedrooms & Wardrobes', 'Master suite featuring velvet headboard wall and walk-in wardrobe.', 'Banjara Hills, Hyderabad', '2026', 'Luxury Villa', '3d-rendering-luxurious-bedroom-interior.jpg.jpeg', 10, true, false),
('Hotel Suite Bedroom & Wardrobe', 'hotel-suite-bedroom-wardrobe', 'Bedrooms & Wardrobes', 'Floor-to-ceiling tinted glass sliding wardrobe with sensor lights.', 'Gachibowli, Hyderabad', '2026', 'Luxury Residential', '3d-rendering-luxury-bedroom-suite-hotel-with-tv-cabinet-wardrobe.jpg.jpeg', 11, true, false),
('Modern Bedroom Architectural Render', 'modern-bedroom-architectural-render', 'Bedrooms & Wardrobes', 'Soft warm wood bedroom wall paneling and customized dresser.', 'Kondapur, Hyderabad', '2026', 'Residential', 'illustration-bedroom-interior.jpg.jpeg', 12, true, false),
('Minimalist Luxury Bedroom Design', 'minimalist-luxury-bedroom-design', 'Bedrooms & Wardrobes', 'Japanese inspired minimalist low-bed framework and wooden wardrobe.', 'Kokapet, Hyderabad', '2026', 'Luxury Apartment', 'minimalist-luxury-modern-bed-room-design-morning-light-modern-interior-concept.jpg.jpeg', 13, true, false),
('Scandinavian Wooden Bedroom Suite', 'scandinavian-wooden-bedroom-suite', 'Bedrooms & Wardrobes', 'Light oak wood bedroom setup with floating side tables.', 'Nallagandla, Hyderabad', '2026', 'Residential', 'modern-light-bedroom-with-wooden-furniture-scandinavian-style-3d-rendering.jpg.jpeg', 14, true, false),
('Warm Wood Bedroom & Wardrobes', 'warm-wood-bedroom-wardrobes', 'Bedrooms & Wardrobes', 'Sliding veneer wardrobe with full length mirror and warm cove lights.', 'Financial District, Hyderabad', '2026', 'Apartment', 'modern-wooden-bedroom-design.jpg.jpeg', 15, true, false),
('Aesthetic Pink Bedroom Suite', 'aesthetic-pink-bedroom-suite', 'Bedrooms & Wardrobes', 'Custom girl suite bedroom with plush upholstery and study corner.', 'Manikonda, Hyderabad', '2026', 'Residential', 'pink-bedroom-with-aesthetic-decor.jpg.jpeg', 16, true, false),
('Luxury Hotel Suite Layout', 'luxury-hotel-suite-layout', 'Bedrooms & Wardrobes', 'Double height bedroom space with louvers and ambient lighting.', 'Puppalguda, Hyderabad', '2026', 'Villa Project', 'room-interior-hotel-bedroom.jpg.jpeg', 17, true, false),
('Modern TV Wall Decoration Design', 'modern-tv-wall-decoration-design', 'Living & TV Units', 'Marble slab backdrop with charcoal fluted paneling and LED strips.', 'Jubilee Hills, Hyderabad', '2026', 'Luxury Living', '3d-render-modern-tv-wall-decoration-interior-design-inspiration.jpg copy.jpeg', 18, true, true),
('Modern Living Room Decor Renders', 'modern-living-room-decor-renders', 'Living & TV Units', 'Open layout dining and living room decor with gold metal accents.', 'Gachibowli, Hyderabad', '2026', 'Luxury Villa', '3d-rendering-modern-dining-room-living-room-with-luxury-decor.jpg.jpeg', 19, true, false),
('Warm Ambient Light TV Cabinet & Bar', 'warm-ambient-light-tv-cabinet-bar', 'Living & TV Units', 'Built-in wine bottle rack and warm backlit TV console.', 'Banjara Hills, Hyderabad', '2026', 'Penthouse', 'clear-tv-clean-walls-warm-light-tv-cabinet-wine-bottle-8-pieces-hdar-916-ar-32-style-raw-v-6-job-id.jpg.jpeg', 20, true, false),
('Contemporary Living Room Illustration', 'contemporary-living-room-illustration', 'Living & TV Units', 'Modern sectional couch setup with floating coffee table.', 'Kondapur, Hyderabad', '2026', 'Residential', 'illustration-living-room-interior.jpg.jpeg', 21, true, false),
('Luxury Loft Living & Dining Suite', 'luxury-loft-living-dining-suite', 'Living & TV Units', 'Loft style living area with floor-to-ceiling bookshelf and dining table.', 'Hitec City, Hyderabad', '2026', 'Loft Suite', 'loft-luxury-living-room-with-bookshelf-near-dining-table.jpg.jpeg', 22, true, false),
('Luxury Modern Apartment Interior', 'luxury-modern-apartment-interior', 'Living & TV Units', 'Cozy modern apartment living room with plush cushions and soft tones.', 'Madhapur, Hyderabad', '2026', 'Apartment', 'luxury-modern-apartment-with-comfortable-pillow-decor-generated-by-ai.jpg.jpeg', 23, true, false),
('Modern Living Room Big Screen TV Console', 'modern-living-room-big-screen-tv-console', 'Living & TV Units', 'Designed for 75-inch TV with concealed wire channels and storage drawers.', 'Kukatpally, Hyderabad', '2026', 'Residential', 'modern-living-room-with-big-screen-tv.jpg.jpeg', 24, true, false),
('Sectional Sofa & Luxury TV Unit', 'sectional-sofa-luxury-tv-unit', 'Living & TV Units', 'L-shape leather sectional sofa with matching wooden TV backdrop.', 'Nizampet, Hyderabad', '2026', 'Residential', 'modern-living-room-with-elegant-tv-unit-sectional-sofa.jpg.jpeg', 25, true, false),
('Flat Screen TV Unit & Coffee Table', 'flat-screen-tv-unit-coffee-table', 'Living & TV Units', 'Minimalist black matte coffee table and wall-mounted storage unit.', 'Bachupally, Hyderabad', '2026', 'Residential', 'modern-living-room-with-large-flat-screen-tv-black-coffee-table.jpg.jpeg', 26, true, false),
('Minimalist LCD TV Wall Console', 'minimalist-lcd-tv-wall-console', 'Living & TV Units', 'Ultra-clean wall mounted LCD TV panel with floating drawer console.', 'Quthubullapur, Hyderabad', '2026', 'Residential', 'modern-minimalist-lcd-tv-wall-unit.jpg.jpeg', 27, true, false),
('Space-Saving Wall Mounted Entertainment Unit', 'space-saving-wall-mounted-entertainment-unit', 'Living & TV Units', 'Space-efficient entertainment wall designed for compact apartments.', 'Komally, Hyderabad', '2026', 'Apartment', 'modern-stylish-wall-mounted-tv-unit-perfect-space-saving-living-rooms-entertainment-areas.jpg.jpeg', 28, true, false),
('Luxury Villa Residential Interior Design', 'luxury-villa-residential-interior-design', 'Living & TV Units', 'Spacious duplex villa living room with double height glass windows.', 'Gandipet, Hyderabad', '2026', 'Villa', 'residential-interior-design.jpg.jpeg', 29, true, false),
('Aspirational House Wall-Mounted TV Unit', 'aspirational-house-wall-mounted-tv-unit', 'Living & TV Units', 'Warm wooden slatted accent wall framing the TV setup.', 'Tellapur, Hyderabad', '2026', 'Residential', 'room-luxury-house-wallmounted-tv-interior-design-aspirational-house.jpg.jpeg', 30, true, false),
('Zen Japanese Style Modern TV Cabinet', 'zen-japanese-style-modern-tv-cabinet', 'Living & TV Units', 'Clean oak lines, natural bamboo accents, and low floating cabinet.', 'Financial District, Hyderabad', '2026', 'Luxury Flat', 'tv-cabinet-modern-empty-room-japanese-zen-styleminimal-designs.jpg.jpeg', 31, true, false),
('3D Ceiling Lighting Render', '3d-ceiling-lighting-render', 'Ceilings & Lighting', 'Gypsum cove ceiling layout with warm indirect LED strip lighting.', 'Madhapur, Hyderabad', '2026', 'Residential', 'ceiling-design-3d-rendering.jpg.jpeg', 32, true, true),
('Ambient False Ceiling Wallpaper', 'ambient-false-ceiling-wallpaper', 'Ceilings & Lighting', 'Wooden rafter ceiling grid with spotlight placements.', 'Kondapur, Hyderabad', '2026', 'Villa', 'ceiling-image-background-wallpaper.jpg.jpeg', 33, true, false),
('Ceiling Cove Lights & Large Window', 'ceiling-cove-lights-large-window', 'Ceilings & Lighting', 'Recessed architectural spotlights with dimmable control modules.', 'Jubilee Hills, Hyderabad', '2026', 'Luxury Living', 'ceiling-with-lights-large-window.jpg.jpeg', 34, true, false),
('Green Eco Working Room & Office', 'green-eco-working-room-office', 'Office & Commercial', 'Eco-friendly corporate meeting room with indoor biophilic plant wall.', 'Hitec City, Hyderabad', '2026', 'Commercial Office', '3d-rendering-business-meeting-green-working-room-office-building.jpg.jpeg', 35, true, true),
('Executive Business Meeting Room Renders', 'executive-business-meeting-room-renders', 'Office & Commercial', '16-seater conference table with integrated AV wiring and acoustic walling.', 'Financial District, Hyderabad', '2026', 'Corporate Office', '3d-rendering-luxury-business-meeting-working-room-executive-office.jpg.jpeg', 36, true, false),
('High-Rise Office Meeting Room', 'high-rise-office-meeting-room', 'Office & Commercial', 'High-rise glass facade office with colorful modern ergonomic chairs.', 'Gachibowli, Hyderabad', '2026', 'IT Workspace', 'business-meeting-room-high-rise-office-building-with-colorful-decor-furnture.jpg.jpeg', 37, true, false),
('Corporate Business Conference Suite', 'corporate-business-conference-suite', 'Office & Commercial', 'Executive board room layout with custom veneer conference table.', 'Kondapur, Hyderabad', '2026', 'Corporate Office', 'business-meeting-working-room-office-building.jpg.jpeg', 38, true, false),
('Minimalist Corporate Office Design', 'minimalist-corporate-office-design', 'Office & Commercial', 'Sleek open office floor plan boosting collaborative teamwork.', 'Madhapur, Hyderabad', '2026', 'Tech Startup', 'minimalist-office-interior-design.jpg.jpeg', 39, true, false),
('Modern Workspace & Collaborative Office', 'modern-workspace-collaborative-office', 'Office & Commercial', 'Modular workstation cubicles with cable management trays.', 'Banjara Hills, Hyderabad', '2026', 'Corporate Office', 'modern-corporate-office-workspace-with-sleek-interiors-collaborative-design.jpg.jpeg', 40, true, false),
('3D Office Interior Architectural Layout', '3d-office-interior-architectural-layout', 'Office & Commercial', 'Comprehensive 3D space plan for 5000 sq.ft IT office branch.', 'Kokapet, Hyderabad', '2026', 'Commercial Space', 'office-interior-3d-illustration.jpg.jpeg', 41, true, false),
('Carpenter & Furniture Assembly Craftsmanship', 'carpenter-furniture-assembly-craftsmanship', 'Painting & Execution', 'On-site precision woodworking and custom carpentry execution.', 'Quthubullapur, Hyderabad', '2026', 'Site Execution', 'furniture-assembly-worker-standing-reading-instruction-using-tape-measure-worker-tools.jpg.jpeg', 42, true, true),
('Furniture Assembly Specialist Inspection', 'furniture-assembly-specialist-inspection', 'Painting & Execution', 'Quality check and hardware alignment by senior site engineers.', 'Medchal, Hyderabad', '2026', 'Site Execution', 'male-worker-showing-thumb-sign-after-assambles-shelf-new-furniture-home-owners.jpg.jpeg', 43, true, false),
('Handyman Painting Interior Accent Wall Yellow', 'handyman-painting-interior-accent-wall-yellow', 'Painting & Execution', 'Vibrant yellow accent wall texture application.', 'Suchitra, Hyderabad', '2026', 'Painting Project', 'man-painting-walls-yellow.jpg.jpeg', 44, true, false),
('Turnkey Renovation Architect Planning', 'turnkey-renovation-architect-planning', 'Painting & Execution', 'Architect blueprint review and structural site evaluation.', 'Kompally, Hyderabad', '2026', 'Renovation', 'man-renovating-his-house-with-design-space.jpg.jpeg', 45, true, false),
('Master Craftsman On-Site Execution', 'master-craftsman-on-site-execution', 'Painting & Execution', 'Detailed hand-carved wood molding and panel installation.', 'Alwal, Hyderabad', '2026', 'Site Execution', 'man-with-hat-that-says-smile-his-face.jpg.jpeg', 46, true, false),
('Professional Paint Roller & Emulsion Mixing', 'professional-paint-roller-emulsion-mixing', 'Painting & Execution', 'Computerized shade mixing and smooth primer roller application.', 'Malkajgiri, Hyderabad', '2026', 'Painting Project', 'masaking-blue-paint-with-roller-brush-dipped-white-paint-handyman-renovating-apartment-redecoration-home-construction-while-renovating-improving-repair-decorating.jpg.jpeg', 47, true, false),
('Professional Painter Wall Coating', 'professional-painter-wall-coating', 'Painting & Execution', 'Multi-coat washable velvet emulsion application.', 'Secunderabad, Hyderabad', '2026', 'Painting Project', 'photography-professional-painter-pain-house.jpg.jpeg', 48, true, false),
('Certified Plumbing & Mechanical Specialist', 'certified-plumbing-mechanical-specialist', 'Painting & Execution', 'Concealed plumbing and luxury bath fixture fitting.', 'Bowenpally, Hyderabad', '2026', 'Turnkey Work', 'plumber-you-can-count-full-length-shot-cheerful-young-plumber-wearing-tool-belt-smiling.jpg.jpeg', 49, true, false),
('Dust-Free Interior Wall Painting Execution', 'dust-free-interior-wall-painting-execution', 'Painting & Execution', 'Motorized vacuum sanding for silky dust-free paint finish.', 'Miyapur, Hyderabad', '2026', 'Painting Project', 'professional-painter-painting-wall-with-paint-roller.jpg.jpeg', 50, true, false),
('Turnkey Interior Remodeling Team', 'turnkey-interior-remodeling-team', 'Painting & Execution', 'Civil team completing flooring tile replacement and plastering.', 'Chanda Nagar, Hyderabad', '2026', 'Renovation', 'room-being-remodeled-with-contractors.jpg.jpeg', 51, true, false),
('Specialist Engineers & Site Supervisors', 'specialist-engineers-site-supervisors', 'Painting & Execution', 'Daily site progress inspection and quality assurance.', 'Begumpet, Hyderabad', '2026', 'Turnkey Site', 'specialists-workers-engineers-photo.jpg.jpeg', 52, true, false),
('Wall Roller Painting Craftsmanship', 'wall-roller-painting-craftsmanship', 'Painting & Execution', 'Flawless corner edging and smooth roller wall finish.', 'Bachupally, Hyderabad', '2026', 'Painting Project', 'woman-paints-wall-with-roller.jpg.jpeg', 53, true, false);

-- 8. Master Gallery Media Seed (53 Items)
INSERT INTO public.gallery (title, category, service_id, image_url, display_order, is_published) VALUES
('Elegant Luxury Kitchen Design', 'Modular Kitchens', 'modular-kitchens', 'elegant-kitchen-design.jpg.jpeg', 1, true),
('Modern Pink Modular Kitchen', 'Modular Kitchens', 'modular-kitchens', 'elegant-modern-pink-kitchen-interior-design.jpg.jpeg', 2, true),
('Contemporary Modular Kitchen', 'Modular Kitchens', 'modular-kitchens', 'interior-design-decoration-nice-modern-kitchen.jpg.jpeg', 3, true),
('Minimalist Kitchen Concept', 'Modular Kitchens', 'modular-kitchens', 'minimalist-kitchen-interior-design (1).jpg.jpeg', 4, true),
('Quartz Finish Modular Layout', 'Modular Kitchens', 'modular-kitchens', 'minimalist-kitchen-interior-design (2).jpg.jpeg', 5, true),
('Modern Dark Grey Kitchen Suite', 'Modular Kitchens', 'modular-kitchens', 'modern-dark-grey-small-kitchen-interior.jpg.jpeg', 6, true),
('White & Wood Modular Kitchen', 'Modular Kitchens', 'modular-kitchens', 'modern-kitchen-interior-white-colors.jpg.jpeg', 7, true),
('Modern Pink Kitchen Accent', 'Modular Kitchens', 'modular-kitchens', 'modern-pink-kitchen-interior.jpg.jpeg', 8, true),
('Luxury Hotel Suite Bedroom with TV', 'Bedrooms & Wardrobes', 'wardrobes', '3d-rendering-beautiful-luxury-bedroom-suite-hotel-with-tv.jpg.jpeg', 9, true),
('Luxurious Bedroom Interior Renders', 'Bedrooms & Wardrobes', 'wardrobes', '3d-rendering-luxurious-bedroom-interior.jpg.jpeg', 10, true),
('Hotel Suite Bedroom & Wardrobe', 'Bedrooms & Wardrobes', 'wardrobes', '3d-rendering-luxury-bedroom-suite-hotel-with-tv-cabinet-wardrobe.jpg.jpeg', 11, true),
('Modern Bedroom Architectural Render', 'Bedrooms & Wardrobes', 'wardrobes', 'illustration-bedroom-interior.jpg.jpeg', 12, true),
('Minimalist Luxury Bedroom Design', 'Bedrooms & Wardrobes', 'wardrobes', 'minimalist-luxury-modern-bed-room-design-morning-light-modern-interior-concept.jpg.jpeg', 13, true),
('Scandinavian Wooden Bedroom Suite', 'Bedrooms & Wardrobes', 'wardrobes', 'modern-light-bedroom-with-wooden-furniture-scandinavian-style-3d-rendering.jpg.jpeg', 14, true),
('Warm Wood Bedroom & Wardrobes', 'Bedrooms & Wardrobes', 'wardrobes', 'modern-wooden-bedroom-design.jpg.jpeg', 15, true),
('Aesthetic Pink Bedroom Suite', 'Bedrooms & Wardrobes', 'wardrobes', 'pink-bedroom-with-aesthetic-decor.jpg.jpeg', 16, true),
('Luxury Hotel Suite Layout', 'Bedrooms & Wardrobes', 'wardrobes', 'room-interior-hotel-bedroom.jpg.jpeg', 17, true),
('Modern TV Wall Decoration Design', 'Living Rooms & TV Units', 'tv-units', '3d-render-modern-tv-wall-decoration-interior-design-inspiration.jpg copy.jpeg', 18, true),
('Modern Living Room Decor Renders', 'Living Rooms & TV Units', 'tv-units', '3d-rendering-modern-dining-room-living-room-with-luxury-decor.jpg.jpeg', 19, true),
('Warm Ambient Light TV Cabinet & Bar', 'Living Rooms & TV Units', 'tv-units', 'clear-tv-clean-walls-warm-light-tv-cabinet-wine-bottle-8-pieces-hdar-916-ar-32-style-raw-v-6-job-id.jpg.jpeg', 20, true),
('Contemporary Living Room Illustration', 'Living Rooms & TV Units', 'tv-units', 'illustration-living-room-interior.jpg.jpeg', 21, true),
('Luxury Loft Living & Dining Suite', 'Living Rooms & TV Units', 'tv-units', 'loft-luxury-living-room-with-bookshelf-near-dining-table.jpg.jpeg', 22, true),
('Luxury Modern Apartment Interior', 'Living Rooms & TV Units', 'tv-units', 'luxury-modern-apartment-with-comfortable-pillow-decor-generated-by-ai.jpg.jpeg', 23, true),
('Modern Living Room Big Screen TV Console', 'Living Rooms & TV Units', 'tv-units', 'modern-living-room-with-big-screen-tv.jpg.jpeg', 24, true),
('Sectional Sofa & Luxury TV Unit', 'Living Rooms & TV Units', 'tv-units', 'modern-living-room-with-elegant-tv-unit-sectional-sofa.jpg.jpeg', 25, true),
('Flat Screen TV Unit & Coffee Table', 'Living Rooms & TV Units', 'tv-units', 'modern-living-room-with-large-flat-screen-tv-black-coffee-table.jpg.jpeg', 26, true),
('Minimalist LCD TV Wall Console', 'Living Rooms & TV Units', 'tv-units', 'modern-minimalist-lcd-tv-wall-unit.jpg.jpeg', 27, true),
('Space-Saving Wall Mounted Entertainment Unit', 'Living Rooms & TV Units', 'tv-units', 'modern-stylish-wall-mounted-tv-unit-perfect-space-saving-living-rooms-entertainment-areas.jpg.jpeg', 28, true),
('Luxury Villa Residential Interior Design', 'Living Rooms & TV Units', 'tv-units', 'residential-interior-design.jpg.jpeg', 29, true),
('Aspirational House Wall-Mounted TV Unit', 'Living Rooms & TV Units', 'tv-units', 'room-luxury-house-wallmounted-tv-interior-design-aspirational-house.jpg.jpeg', 30, true),
('Zen Japanese Style Modern TV Cabinet', 'Living Rooms & TV Units', 'tv-units', 'tv-cabinet-modern-empty-room-japanese-zen-styleminimal-designs.jpg.jpeg', 31, true),
('3D Ceiling Lighting Render', 'Ceilings & Lighting', 'false-ceiling', 'ceiling-design-3d-rendering.jpg.jpeg', 32, true),
('Ambient False Ceiling Wallpaper', 'Ceilings & Lighting', 'false-ceiling', 'ceiling-image-background-wallpaper.jpg.jpeg', 33, true),
('Ceiling Cove Lights & Large Window', 'Ceilings & Lighting', 'false-ceiling', 'ceiling-with-lights-large-window.jpg.jpeg', 34, true),
('Green Eco Working Room & Office', 'Office & Commercial', 'office-interiors', '3d-rendering-business-meeting-green-working-room-office-building.jpg.jpeg', 35, true),
('Executive Business Meeting Room Renders', 'Office & Commercial', 'office-interiors', '3d-rendering-luxury-business-meeting-working-room-executive-office.jpg.jpeg', 36, true),
('High-Rise Office Meeting Room', 'Office & Commercial', 'office-interiors', 'business-meeting-room-high-rise-office-building-with-colorful-decor-furnture.jpg.jpeg', 37, true),
('Corporate Business Conference Suite', 'Office & Commercial', 'office-interiors', 'business-meeting-working-room-office-building.jpg.jpeg', 38, true),
('Minimalist Corporate Office Design', 'Office & Commercial', 'office-interiors', 'minimalist-office-interior-design.jpg.jpeg', 39, true),
('Modern Workspace & Collaborative Office', 'Office & Commercial', 'office-interiors', 'modern-corporate-office-workspace-with-sleek-interiors-collaborative-design.jpg.jpeg', 40, true),
('3D Office Interior Architectural Layout', 'Office & Commercial', 'office-interiors', 'office-interior-3d-illustration.jpg.jpeg', 41, true),
('Carpenter & Furniture Assembly Craftsmanship', 'Painting & Execution', 'home-painting', 'furniture-assembly-worker-standing-reading-instruction-using-tape-measure-worker-tools.jpg.jpeg', 42, true),
('Furniture Assembly Specialist Inspection', 'Painting & Execution', 'home-painting', 'male-worker-showing-thumb-sign-after-assambles-shelf-new-furniture-home-owners.jpg.jpeg', 43, true),
('Handyman Painting Interior Accent Wall Yellow', 'Painting & Execution', 'home-painting', 'man-painting-walls-yellow.jpg.jpeg', 44, true),
('Turnkey Renovation Architect Planning', 'Painting & Execution', 'home-painting', 'man-renovating-his-house-with-design-space.jpg.jpeg', 45, true),
('Master Craftsman On-Site Execution', 'Painting & Execution', 'home-painting', 'man-with-hat-that-says-smile-his-face.jpg.jpeg', 46, true),
('Professional Paint Roller & Emulsion Mixing', 'Painting & Execution', 'home-painting', 'masaking-blue-paint-with-roller-brush-dipped-white-paint-handyman-renovating-apartment-redecoration-home-construction-while-renovating-improving-repair-decorating.jpg.jpeg', 47, true),
('Professional Painter Wall Coating', 'Painting & Execution', 'home-painting', 'photography-professional-painter-pain-house.jpg.jpeg', 48, true),
('Certified Plumbing & Mechanical Specialist', 'Painting & Execution', 'home-painting', 'plumber-you-can-count-full-length-shot-cheerful-young-plumber-wearing-tool-belt-smiling.jpg.jpeg', 49, true),
('Dust-Free Interior Wall Painting Execution', 'Painting & Execution', 'home-painting', 'professional-painter-painting-wall-with-paint-roller.jpg.jpeg', 50, true),
('Turnkey Interior Remodeling Team', 'Painting & Execution', 'home-painting', 'room-being-remodeled-with-contractors.jpg.jpeg', 51, true),
('Specialist Engineers & Site Supervisors', 'Painting & Execution', 'home-painting', 'specialists-workers-engineers-photo.jpg.jpeg', 52, true),
('Wall Roller Painting Craftsmanship', 'Painting & Execution', 'home-painting', 'woman-paints-wall-with-roller.jpg.jpeg', 53, true);

-- 9. Before & After Initial Record
INSERT INTO public.before_after (title, description, before_image, after_image, is_published, display_order)
VALUES (
    'Complete Villa Living Room Transformation',
    'Witness how our interior designers converted an empty unfinished grey structure into a warm, luxury living suite featuring custom marble TV wall, cove lighting, and plush furnishings.',
    'assets/images/before.png',
    'assets/images/after.png',
    true,
    1
);

-- 10. Why Choose Us Initial Items
INSERT INTO public.why_choose_us (title, description, icon_class, display_order, is_published) VALUES
('Turnkey Solutions', 'From 3D architectural renders to final dusting, we handle design, procurement, carpentry, electricals, and painting under one roof.', 'fas fa-drafting-compass', 1, true),
('Transparent Pricing', 'Detailed itemized BOQs with zero hidden charges. You get exactly what was agreed upon within your defined budget range.', 'fas fa-calculator', 2, true),
('45-Day Delivery Guarantee', 'Sticking to timelines is our core priority. We ensure on-schedule completion backed by penalty-backed milestone controls.', 'fas fa-business-time', 3, true),
('10-Year Warranty', 'Uncompromising material quality using branded marine-grade plywood, Blum/Hettich hardware, and premium washable emulsions.', 'fas fa-shield-alt', 4, true),
('Dedicated Site Manager', 'A single point of contact supervisor oversees site safety, material inspection, and daily progress reporting via WhatsApp.', 'fas fa-user-shield', 5, true),
('Customized Aesthetics', 'No generic template designs. Every kitchen, wardrobe, and living space is engineered specifically around your habits.', 'fas fa-palette', 6, true);

-- 11. Testimonials Initial Seed Data
INSERT INTO public.testimonials (client_name, location, testimonial_text, rating, display_order, is_published) VALUES
('Rajesh Varma', 'Jubilee Hills, Hyderabad', 'SV Elegant Interior transformed our 4BHK villa completely. The modular kitchen and false ceiling work was delivered right on time with flawless finishing. Highly recommended!', 5, 1, true),
('Priya Sharma', 'Gachibowli, Hyderabad', 'The team was incredibly professional. They took care of complete interior painting and wardrobe fitting. The dust-free painting execution was a game changer for our family.', 5, 2, true),
('Kiran Reddy', 'Kondapur, Hyderabad', 'Best interior design company in Hyderabad. Transparent pricing, excellent 3D visualizations, and dedicated site supervision. Very happy with our living room TV unit!', 5, 3, true);
