-- SV Elegant Interior - Supabase Database Schema
-- Run this in Supabase SQL Editor to initialize all tables, indexes, triggers, and Row Level Security policies.

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Site Settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name TEXT DEFAULT 'SV Elegant Interior',
    phone TEXT DEFAULT '+919100097311',
    whatsapp TEXT DEFAULT '919100097311',
    email TEXT DEFAULT 'info@svelegantinteriors.com',
    address TEXT DEFAULT 'Near Venkateswara Temple, Mahadevpuram, Raavinarayana Reddy Nagar, Devender Nagar, Quthubullapur, Medchal, Telangana 500055',
    google_maps_url TEXT DEFAULT 'https://maps.google.com/?q=17.524771,78.413324',
    instagram_url TEXT DEFAULT 'https://instagram.com/svelegantinterior',
    facebook_url TEXT DEFAULT 'https://facebook.com/svelegantinterior',
    youtube_url TEXT DEFAULT 'https://youtube.com',
    linkedin_url TEXT DEFAULT 'https://linkedin.com',
    footer_description TEXT DEFAULT 'SV Elegant Interior provides complete luxury home interior design, custom modular kitchens, wardrobes, false ceiling, and professional painting services in Hyderabad.',
    copyright_text TEXT DEFAULT '© 2026 SV Elegant Interior. All Rights Reserved.',
    seo_title TEXT DEFAULT 'SV Elegant Interior | Luxury Home Interiors & Painting Services Hyderabad',
    meta_description TEXT DEFAULT 'SV Elegant Interior delivers luxury home interior design, modular kitchens, custom furniture, false ceilings, and professional interior/exterior painting services in Hyderabad & Medchal.',
    keywords TEXT DEFAULT 'SV Elegant Interior, Interior Design Hyderabad, Modular Kitchens, Wardrobes, Custom Furniture, Home Painting, Quthubullapur Interior Designers',
    og_image TEXT DEFAULT 'assets/images/hero1.png',
    favicon TEXT DEFAULT 'assets/images/logo.png',
    consultation_btn_text TEXT DEFAULT 'Book Consultation',
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Hero Section / Slides Table
CREATE TABLE IF NOT EXISTS public.hero_slides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    headline TEXT NOT NULL,
    subheading TEXT,
    description TEXT,
    primary_btn_text TEXT DEFAULT 'Book Consultation',
    primary_btn_url TEXT DEFAULT '#contact',
    secondary_btn_text TEXT DEFAULT 'View Projects',
    secondary_btn_url TEXT DEFAULT 'projects.html',
    image_url TEXT NOT NULL,
    cloudinary_public_id TEXT,
    display_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. About Section Table
CREATE TABLE IF NOT EXISTS public.about_section (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    heading TEXT DEFAULT 'Transforming Visions into Luxurious Realities',
    main_description TEXT DEFAULT 'SV Elegant Interior is a premier turnkey interior design and architectural execution firm based in Hyderabad. We specialize in bespoke residential and commercial spaces.',
    mission TEXT DEFAULT 'To deliver exceptional, high-end interior solutions that balance luxury, function, and enduring quality.',
    vision TEXT DEFAULT 'To be Hyderabad’s most trusted interior design and space planning brand.',
    company_description TEXT DEFAULT 'With over a decade of experience, our team of passionate designers, craftsman, and site engineers bring elegance to every corner.',
    image_url TEXT DEFAULT 'assets/images/office.png',
    cloudinary_public_id TEXT,
    button_text TEXT DEFAULT 'Explore Our Services',
    button_url TEXT DEFAULT 'services.html',
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Service Categories
CREATE TABLE IF NOT EXISTS public.service_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Services Table
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT DEFAULT 'Residential',
    category_id UUID REFERENCES public.service_categories(id) ON DELETE SET NULL,
    short_description TEXT,
    full_description TEXT,
    image_url TEXT,
    icon_class TEXT DEFAULT 'fas fa-couch',
    cloudinary_public_id TEXT,
    display_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Project Categories Table
CREATE TABLE IF NOT EXISTS public.project_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Projects / Portfolio Table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category_name TEXT DEFAULT 'Residential',
    category_id UUID REFERENCES public.project_categories(id) ON DELETE SET NULL,
    description TEXT,
    location TEXT DEFAULT 'Hyderabad, Telangana',
    completion_date TEXT DEFAULT '2026',
    project_type TEXT DEFAULT 'Luxury Turnkey',
    client_name TEXT,
    featured_image TEXT NOT NULL,
    cloudinary_public_id TEXT,
    before_image TEXT,
    after_image TEXT,
    display_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 8. Project Images (Gallery per Project)
CREATE TABLE IF NOT EXISTS public.project_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    cloudinary_public_id TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 9. Before & After Showcase Table
CREATE TABLE IF NOT EXISTS public.before_after (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT DEFAULT 'Full Home Transformation',
    description TEXT DEFAULT 'Compare the raw site condition with our finalized turnkey luxury execution.',
    before_image TEXT NOT NULL DEFAULT 'assets/images/before.png',
    after_image TEXT NOT NULL DEFAULT 'assets/images/after.png',
    before_public_id TEXT,
    after_public_id TEXT,
    is_published BOOLEAN DEFAULT true,
    display_order INT DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 10. Why Choose Us Items Table
CREATE TABLE IF NOT EXISTS public.why_choose_us (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon_class TEXT DEFAULT 'fas fa-check-circle',
    image_url TEXT,
    cloudinary_public_id TEXT,
    display_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 11. Gallery Table (53+ Media Master Items)
CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    cloudinary_public_id TEXT,
    resource_type TEXT DEFAULT 'image',
    width INT,
    height INT,
    category TEXT NOT NULL,
    service_id TEXT,
    display_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 12. Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name TEXT NOT NULL,
    location TEXT DEFAULT 'Hyderabad',
    testimonial_text TEXT NOT NULL,
    client_image TEXT,
    cloudinary_public_id TEXT,
    rating INT DEFAULT 5,
    display_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 13. Contact / Quote Requests Table
CREATE TABLE IF NOT EXISTS public.contact_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    service_required TEXT DEFAULT 'General Inquiry',
    property_type TEXT,
    address TEXT,
    preferred_date TEXT,
    budget TEXT,
    message TEXT,
    status TEXT DEFAULT 'New', -- New, Contacted, In Progress, Completed, Cancelled
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 14. Media Library Assets Table
CREATE TABLE IF NOT EXISTS public.media_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_name TEXT,
    secure_url TEXT NOT NULL,
    cloudinary_public_id TEXT NOT NULL UNIQUE,
    resource_type TEXT DEFAULT 'image',
    format TEXT,
    width INT,
    height INT,
    bytes INT,
    folder TEXT DEFAULT 'sve-interior',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 15. Activity / Audit Logs Table
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_email TEXT NOT NULL,
    action TEXT NOT NULL,
    module TEXT NOT NULL,
    record_id TEXT,
    details TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 16. Admin Authorization Registry Table
CREATE TABLE IF NOT EXISTS public.admins (
    id UUID PRIMARY KEY, -- References auth.users(id)
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for Fast Querying & Filtering
CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);
CREATE INDEX IF NOT EXISTS idx_services_published ON public.services(is_published);
CREATE INDEX IF NOT EXISTS idx_services_order ON public.services(display_order);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category_name);
CREATE INDEX IF NOT EXISTS idx_projects_published ON public.projects(is_published);
CREATE INDEX IF NOT EXISTS idx_projects_order ON public.projects(display_order);

CREATE INDEX IF NOT EXISTS idx_gallery_category ON public.gallery(category);
CREATE INDEX IF NOT EXISTS idx_gallery_published ON public.gallery(is_published);
CREATE INDEX IF NOT EXISTS idx_gallery_order ON public.gallery(display_order);

CREATE INDEX IF NOT EXISTS idx_requests_status ON public.contact_requests(status);
CREATE INDEX IF NOT EXISTS idx_requests_created ON public.contact_requests(created_at DESC);

-- Automated updated_at Trigger Function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply Triggers
CREATE OR REPLACE TRIGGER trg_site_settings_updated BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE OR REPLACE TRIGGER trg_hero_slides_updated BEFORE UPDATE ON public.hero_slides FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE OR REPLACE TRIGGER trg_about_section_updated BEFORE UPDATE ON public.about_section FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE OR REPLACE TRIGGER trg_services_updated BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE OR REPLACE TRIGGER trg_projects_updated BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE OR REPLACE TRIGGER trg_gallery_updated BEFORE UPDATE ON public.gallery FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE OR REPLACE TRIGGER trg_testimonials_updated BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE OR REPLACE TRIGGER trg_contact_requests_updated BEFORE UPDATE ON public.contact_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.before_after ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.why_choose_us ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- 1. Public Read Policies (Allow reading all content rows)
CREATE POLICY "Public Read Site Settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public Read Hero Slides" ON public.hero_slides FOR SELECT USING (true);
CREATE POLICY "Public Read About Section" ON public.about_section FOR SELECT USING (true);
CREATE POLICY "Public Read Service Categories" ON public.service_categories FOR SELECT USING (true);
CREATE POLICY "Public Read Services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public Read Project Categories" ON public.project_categories FOR SELECT USING (true);
CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public Read Project Images" ON public.project_images FOR SELECT USING (true);
CREATE POLICY "Public Read Before After" ON public.before_after FOR SELECT USING (true);
CREATE POLICY "Public Read Why Choose Us" ON public.why_choose_us FOR SELECT USING (true);
CREATE POLICY "Public Read Gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Public Read Testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Public Read Media Assets" ON public.media_assets FOR SELECT USING (true);

-- 2. Public Write Policy (Allow visitors to submit quote inquiries)
CREATE POLICY "Public Create Contact Request" ON public.contact_requests FOR INSERT WITH CHECK (true);

-- 3. Authenticated Admin Policies (Full access for logged in admins)
CREATE POLICY "Admin Full Access Site Settings" ON public.site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Hero Slides" ON public.hero_slides FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access About Section" ON public.about_section FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Service Categories" ON public.service_categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Services" ON public.services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Project Categories" ON public.project_categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Project Images" ON public.project_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Before After" ON public.before_after FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Why Choose Us" ON public.why_choose_us FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Gallery" ON public.gallery FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Testimonials" ON public.testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Contact Requests" ON public.contact_requests FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Media Assets" ON public.media_assets FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Activity Logs" ON public.activity_logs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Admins Table" ON public.admins FOR ALL USING (auth.role() = 'authenticated');
