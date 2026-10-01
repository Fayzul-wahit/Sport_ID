-- Migration 05: Public Athlete Database View

CREATE OR REPLACE VIEW public_athlete_view AS
SELECT
  ap.id AS athlete_profile_id,
  ap.sports_id,
  p.full_name,
  ap.primary_sport,
  ap.position,
  ap.city,
  ap.state,
  ap.avatar_url,
  ap.is_public,
  ap.created_at AS member_since,
  coalesce(
    jsonb_agg(
      jsonb_build_object(
        'id', a.id,
        'event_name', a.event_name,
        'sport', a.sport,
        'level', a.level,
        'result', a.result,
        'event_date', a.event_date,
        'location', a.location,
        'organizer_name', a.organizer_name,
        'verification_status', a.verification_status,
        'verified_by_org_name', o.name,
        'verified_by_org_id', o.org_id
      )
    ) FILTER (WHERE a.id IS NOT NULL),
    '[]'::jsonb
  ) AS achievements
FROM athlete_profiles ap
JOIN profiles p ON p.id = ap.user_id
LEFT JOIN achievements a ON a.athlete_id = ap.id
LEFT JOIN organizations o ON o.id = a.organization_id
WHERE ap.is_public = TRUE
GROUP BY ap.id, ap.sports_id, p.full_name, ap.primary_sport, ap.position, ap.city, ap.state, ap.avatar_url, ap.is_public, ap.created_at;
