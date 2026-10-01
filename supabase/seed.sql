-- Seed Data (Development Only)

-- Seed Organization
INSERT INTO organizations (id, org_id, name, type, city, state, sports, contact_email, status)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'ORG-TN-000001',
  'Demo District Sports Association',
  'District Association',
  'Chennai',
  'Tamil Nadu',
  ARRAY['Kabaddi', 'Athletics', 'Badminton'],
  'contact@demodistrictsports.org',
  'verified'
) ON CONFLICT DO NOTHING;

-- Seed Unverified Pending Organization (for testing permission isolation)
INSERT INTO organizations (id, org_id, name, type, city, state, sports, contact_email, status)
VALUES (
  '00000000-0000-0000-0000-000000000002',
  'ORG-TN-000002',
  'Unverified Local Club',
  'Local Club',
  'Madurai',
  'Tamil Nadu',
  ARRAY['Cricket'],
  'info@unverifiedclub.org',
  'pending'
) ON CONFLICT DO NOTHING;
