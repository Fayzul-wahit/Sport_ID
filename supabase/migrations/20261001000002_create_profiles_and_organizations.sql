-- Migration 02: Profiles, Athlete Profiles, Organizations, and Representatives

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'athlete',
  full_name TEXT,
  language TEXT NOT NULL DEFAULT 'en' CHECK (language IN ('en', 'ta', 'ml')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE athlete_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  sports_id TEXT UNIQUE NOT NULL,
  primary_sport TEXT,
  position TEXT,
  city TEXT,
  state TEXT,
  date_of_birth DATE,
  gender TEXT,
  avatar_url TEXT,
  is_public BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  type TEXT,
  city TEXT,
  state TEXT,
  sports TEXT[],
  contact_email TEXT,
  status org_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE organization_representatives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status org_rep_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (organization_id, user_id)
);

-- Function to generate unique Sports ID: ATH-YYYY-NNNNNN
CREATE OR REPLACE FUNCTION generate_sports_id()
RETURNS TEXT AS $$
DECLARE
  seq_val BIGINT;
  current_year TEXT;
BEGIN
  seq_val := nextval('sports_id_seq');
  current_year := to_char(CURRENT_DATE, 'YYYY');
  RETURN 'ATH-' || current_year || '-' || lpad(seq_val::text, 6, '0');
END;
$$ LANGUAGE plpgsql;

-- Function to generate unique Org ID: ORG-[STATE]-NNNNNN
CREATE OR REPLACE FUNCTION generate_org_id(state_code TEXT DEFAULT 'TN')
RETURNS TEXT AS $$
DECLARE
  seq_val BIGINT;
  clean_state TEXT;
BEGIN
  seq_val := nextval('org_id_seq');
  clean_state := upper(coalesce(nullif(trim(state_code), ''), 'TN'));
  RETURN 'ORG-' || clean_state || '-' || lpad(seq_val::text, 6, '0');
END;
$$ LANGUAGE plpgsql;
