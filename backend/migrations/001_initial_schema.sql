-- ============================================================================
-- VedicPanditji Database Migration: 001_initial_schema.sql
-- Compatible with Supabase PostgreSQL (pgcrypto / uuid-ossp enabled)
-- ============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------------------------
-- 1. Table: admins
-- Tracks verified administrative users, roles, and access controls.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID UNIQUE, -- Foreign key to Supabase auth.users if Supabase Auth is enabled
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(150) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'coordinator' CHECK (role IN ('super_admin', 'coordinator', 'acharya', 'finance')),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 2. Table: customers (Devotees)
-- Devotees identified primarily by normalized Indian mobile phone number.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone VARCHAR(20) NOT NULL UNIQUE,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255),
    city VARCHAR(100),
    locality VARCHAR(100),
    gotra VARCHAR(100),
    address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);
CREATE INDEX IF NOT EXISTS idx_customers_city ON customers(city);

-- ----------------------------------------------------------------------------
-- 3. Table: puja_services
-- Comprehensive canonical puja catalog.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS puja_services (
    id VARCHAR(100) PRIMARY KEY, -- Slug ID, e.g. 'griha-pravesh', 'satyanarayan-puja'
    name VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL DEFAULT 'pujas',
    tradition VARCHAR(100) NOT NULL DEFAULT 'North Indian / Vedic',
    duration VARCHAR(50) NOT NULL DEFAULT '2 to 3 Hours',
    short_description TEXT NOT NULL,
    long_description TEXT,
    indicative_starting_price NUMERIC(10, 2),
    is_price_verified BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    available_cities TEXT[] DEFAULT ARRAY['Pune', 'Mumbai', 'Bangalore', 'Delhi-NCR', 'Hyderabad'],
    seo_title VARCHAR(255),
    seo_meta_description TEXT,
    seo_slug VARCHAR(150),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_puja_services_category ON puja_services(category);
CREATE INDEX IF NOT EXISTS idx_puja_services_active ON puja_services(is_active);

-- ----------------------------------------------------------------------------
-- 4. Table: puja_packages
-- Structured two-tier & custom packages (Package A: Ritual only, Package B: Ritual + Samagri).
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS puja_packages (
    id VARCHAR(100) PRIMARY KEY, -- e.g. 'gp-dakshina', 'gp-samagri'
    service_id VARCHAR(100) NOT NULL REFERENCES puja_services(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    tier VARCHAR(50) NOT NULL DEFAULT 'standard' CHECK (tier IN ('standard', 'popular', 'premium', 'custom')),
    badge VARCHAR(100),
    indicative_price NUMERIC(10, 2), -- Nullable when custom quote
    price_display VARCHAR(50) NOT NULL DEFAULT 'Custom Quote',
    price_note VARCHAR(150) DEFAULT 'Indicative starting dakshina',
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    inclusions JSONB NOT NULL DEFAULT '[]'::jsonb,
    included_samagri_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_puja_packages_service ON puja_packages(service_id);

-- ----------------------------------------------------------------------------
-- 5. Table: optional_samagri
-- Add-on samagri items and pricing verification status.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS optional_samagri (
    id VARCHAR(100) PRIMARY KEY, -- e.g. 'opt-flowers', 'opt-havan-samagri'
    name VARCHAR(150) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL DEFAULT 'general',
    price NUMERIC(10, 2), -- Nullable for market-fluctuating items (e.g. flowers, fruits)
    price_display VARCHAR(50) NOT NULL DEFAULT 'Price to be confirmed',
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 6. Table: enquiries
-- Ritual enquiries received from the public website or phone helpline.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS enquiries (
    id VARCHAR(50) PRIMARY KEY, -- e.g. 'VP-2026-1042'
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    customer_name VARCHAR(150) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    service_id VARCHAR(100) REFERENCES puja_services(id) ON DELETE SET NULL,
    service_name VARCHAR(200) NOT NULL,
    city VARCHAR(100) NOT NULL,
    locality VARCHAR(100),
    package_id VARCHAR(100) REFERENCES puja_packages(id) ON DELETE SET NULL,
    package_name VARCHAR(150) NOT NULL,
    package_price_display VARCHAR(50) NOT NULL,
    selected_samagri_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
    requested_date VARCHAR(50),
    time_slot VARCHAR(100),
    need_muhurat_consult BOOLEAN NOT NULL DEFAULT FALSE,
    address TEXT,
    preferred_language VARCHAR(50) DEFAULT 'Hindi & Sanskrit',
    gotra VARCHAR(100),
    customer_notes TEXT,
    admin_internal_notes TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'New' CHECK (status IN (
        'New',
        'Under Review',
        'Awaiting Customer Response',
        'Awaiting Panditji Confirmation',
        'Confirmed',
        'Completed',
        'Cancelled'
    )),
    assigned_pandit VARCHAR(150) DEFAULT 'Pending Review by Senior Vedic Acharyas',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_phone ON enquiries(customer_phone);
CREATE INDEX IF NOT EXISTS idx_enquiries_city ON enquiries(city);
CREATE INDEX IF NOT EXISTS idx_enquiries_created ON enquiries(created_at DESC);

-- ----------------------------------------------------------------------------
-- 7. Table: bookings
-- Formal booking commitments. ONLY created/promoted via explicit admin action.
-- Never auto-confirmed from public form.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS bookings (
    id VARCHAR(50) PRIMARY KEY, -- e.g. 'BKG-2026-3021'
    enquiry_id VARCHAR(50) REFERENCES enquiries(id) ON DELETE SET NULL,
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    service_name VARCHAR(200) NOT NULL,
    package_name VARCHAR(150) NOT NULL,
    city VARCHAR(100) NOT NULL,
    ceremony_date VARCHAR(50) NOT NULL,
    ceremony_time VARCHAR(100) NOT NULL,
    venue_address TEXT NOT NULL,
    gotra VARCHAR(100),
    status VARCHAR(50) NOT NULL DEFAULT 'Under Review' CHECK (status IN (
        'New',
        'Under Review',
        'Awaiting Customer Response',
        'Awaiting Panditji Confirmation',
        'Confirmed',
        'Completed',
        'Cancelled'
    )),
    -- Quotation Details
    verified_dakshina NUMERIC(10, 2),
    verified_samagri_cost NUMERIC(10, 2),
    total_quoted_amount NUMERIC(10, 2),
    is_price_verified BOOLEAN NOT NULL DEFAULT FALSE,
    quotation_notes TEXT,
    -- Pandit Allocation & Confirmation
    assigned_pandit_name VARCHAR(150),
    assigned_pandit_phone VARCHAR(20),
    confirmation_notes TEXT,
    confirmed_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_ceremony_date ON bookings(ceremony_date);
CREATE INDEX IF NOT EXISTS idx_bookings_city ON bookings(city);

-- ----------------------------------------------------------------------------
-- 8. Table: admin_audit_logs
-- Immutable log of administrative actions, pricing edits, and status changes.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admin_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id VARCHAR(100) NOT NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id VARCHAR(100) NOT NULL,
    details JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_entity ON admin_audit_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_created ON admin_audit_logs(created_at DESC);

-- ----------------------------------------------------------------------------
-- Row Level Security (RLS) Setup
-- ----------------------------------------------------------------------------
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE puja_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE puja_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE optional_samagri ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- Public (anon) access policies:
-- 1. Public can view active puja services, packages, and samagri
CREATE POLICY "Public read active services" ON puja_services
    FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Public read active packages" ON puja_packages
    FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Public read active samagri" ON optional_samagri
    FOR SELECT USING (is_active = TRUE);

-- 2. Public can create an enquiry from the booking modal (anon insert only)
CREATE POLICY "Public create enquiry" ON enquiries
    FOR INSERT WITH CHECK (TRUE);

-- 3. Authenticated Admins have full access to manage records
CREATE POLICY "Admins full access to admins" ON admins
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins full access to customers" ON customers
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins full access to puja_services" ON puja_services
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins full access to puja_packages" ON puja_packages
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins full access to optional_samagri" ON optional_samagri
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins full access to enquiries" ON enquiries
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins full access to bookings" ON bookings
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins full access to audit logs" ON admin_audit_logs
    FOR ALL USING (auth.role() = 'authenticated');

