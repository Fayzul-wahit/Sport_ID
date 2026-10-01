-- Migration 03: Achievements and Achievement Documents

CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  athlete_id UUID NOT NULL REFERENCES athlete_profiles(id) ON DELETE CASCADE,
  event_name TEXT NOT NULL,
  sport TEXT NOT NULL,
  level achievement_level NOT NULL,
  result achievement_result NOT NULL,
  event_date DATE,
  location TEXT,
  organizer_name TEXT,
  organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
  certificate_number TEXT,
  verification_status verification_status NOT NULL DEFAULT 'self_reported',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE achievement_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  achievement_id UUID NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  mime_type TEXT,
  size_bytes BIGINT,
  ocr_raw JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_achievements_athlete ON achievements(athlete_id);
CREATE INDEX idx_achievements_org ON achievements(organization_id);
CREATE INDEX idx_achievements_status ON achievements(verification_status);
