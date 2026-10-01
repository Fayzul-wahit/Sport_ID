-- Migration 06: Row Level Security Policies

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE athlete_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_representatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievement_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current auth user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if user is active rep for org
CREATE OR REPLACE FUNCTION is_active_org_rep(p_org_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM organization_representatives
    WHERE user_id = auth.uid()
      AND organization_id = p_org_id
      AND status = 'active'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- PROFILES Policies
CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT USING (auth.uid() = id OR is_admin());

CREATE POLICY "Users can insert/update own profile" ON profiles
  FOR ALL USING (auth.uid() = id);

-- ATHLETE PROFILES Policies
CREATE POLICY "Athletes manage own profile" ON athlete_profiles
  FOR ALL USING (user_id = auth.uid() OR is_admin());

CREATE POLICY "Public reads public athlete profiles" ON athlete_profiles
  FOR SELECT USING (is_public = TRUE);

-- ORGANIZATIONS Policies
CREATE POLICY "Everyone can read verified organizations" ON organizations
  FOR SELECT USING (status = 'verified' OR is_admin() OR EXISTS (
    SELECT 1 FROM organization_representatives WHERE organization_id = organizations.id AND user_id = auth.uid()
  ));

-- ORGANIZATION REPRESENTATIVES Policies
CREATE POLICY "Reps view own org representation" ON organization_representatives
  FOR SELECT USING (user_id = auth.uid() OR is_admin());

-- ACHIEVEMENTS Policies
CREATE POLICY "Athletes manage own achievements" ON achievements
  FOR ALL USING (
    athlete_id IN (SELECT id FROM athlete_profiles WHERE user_id = auth.uid()) OR is_admin()
  );

CREATE POLICY "Org reps view achievements addressed to their org" ON achievements
  FOR SELECT USING (
    organization_id IN (
      SELECT organization_id FROM organization_representatives
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

-- ACHIEVEMENT DOCUMENTS Policies
CREATE POLICY "Athletes manage own achievement documents" ON achievement_documents
  FOR ALL USING (
    achievement_id IN (
      SELECT a.id FROM achievements a
      JOIN athlete_profiles ap ON ap.id = a.athlete_id
      WHERE ap.user_id = auth.uid()
    ) OR is_admin()
  );

CREATE POLICY "Org reps view documents for their requests" ON achievement_documents
  FOR SELECT USING (
    achievement_id IN (
      SELECT a.id FROM achievements a
      JOIN organization_representatives ogr ON ogr.organization_id = a.organization_id
      WHERE ogr.user_id = auth.uid() AND ogr.status = 'active'
    )
  );

-- VERIFICATION REQUESTS Policies
CREATE POLICY "Athletes view own requests" ON verification_requests
  FOR SELECT USING (
    achievement_id IN (
      SELECT a.id FROM achievements a
      JOIN athlete_profiles ap ON ap.id = a.athlete_id
      WHERE ap.user_id = auth.uid()
    ) OR is_admin()
  );

CREATE POLICY "Athletes create verification requests" ON verification_requests
  FOR INSERT WITH CHECK (
    achievement_id IN (
      SELECT a.id FROM achievements a
      JOIN athlete_profiles ap ON ap.id = a.athlete_id
      WHERE ap.user_id = auth.uid()
    )
  );

CREATE POLICY "Org reps view and process requests addressed to their org" ON verification_requests
  FOR ALL USING (
    organization_id IN (
      SELECT organization_id FROM organization_representatives
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

-- VERIFICATION RECORDS Policies (INSERT and SELECT only)
CREATE POLICY "Verification records visible to involved athlete, org rep, or admin" ON verification_records
  FOR SELECT USING (
    verified_by = auth.uid() OR is_admin() OR
    achievement_id IN (
      SELECT a.id FROM achievements a
      JOIN athlete_profiles ap ON ap.id = a.athlete_id
      WHERE ap.user_id = auth.uid()
    ) OR
    organization_id IN (
      SELECT organization_id FROM organization_representatives
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

CREATE POLICY "Active org reps insert verification records" ON verification_records
  FOR INSERT WITH CHECK (
    is_active_org_rep(organization_id)
  );

-- AUDIT LOGS Policies (INSERT and SELECT only)
CREATE POLICY "Audit logs read by admins or actors" ON audit_logs
  FOR SELECT USING (actor_id = auth.uid() OR is_admin());

CREATE POLICY "Authenticated users insert audit logs" ON audit_logs
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
