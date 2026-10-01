-- Migration 07: Atomic Verification State Machine RPC

CREATE OR REPLACE FUNCTION process_verification_transition(
  p_achievement_id UUID,
  p_action TEXT, -- 'confirm', 'cannot_confirm', 'withdraw'
  p_reason TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
  v_achievement achievements%ROWTYPE;
  v_req verification_requests%ROWTYPE;
  v_org organizations%ROWTYPE;
  v_rep organization_representatives%ROWTYPE;
  v_actor_id UUID;
  v_old_status verification_status;
  v_new_status verification_status;
  v_record_action verification_action;
BEGIN
  v_actor_id := auth.uid();
  IF v_actor_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required.';
  END IF;

  -- Load achievement
  SELECT * INTO v_achievement FROM achievements WHERE id = p_achievement_id;
  IF v_achievement.id IS NULL THEN
    RAISE EXCEPTION 'Achievement not found.';
  END IF;

  v_old_status := v_achievement.verification_status;

  -- Verify caller is active rep of addressed organization
  SELECT * INTO v_rep FROM organization_representatives
  WHERE user_id = v_actor_id AND organization_id = v_achievement.organization_id AND status = 'active';

  IF v_rep.id IS NULL THEN
    RAISE EXCEPTION 'Forbidden: User is not an active representative of the addressed organization.';
  END IF;

  -- Verify organization itself is verified
  SELECT * INTO v_org FROM organizations WHERE id = v_achievement.organization_id;
  IF v_org.status != 'verified' THEN
    RAISE EXCEPTION 'Forbidden: Organization must be verified before performing verification actions.';
  END IF;

  -- State machine transition logic
  IF p_action = 'confirm' THEN
    IF v_old_status != 'under_review' THEN
      RAISE EXCEPTION 'Invalid transition: Only achievements under review can be confirmed.';
    END IF;
    v_new_status := 'org_verified';
    v_record_action := 'confirmed';

  ELSIF p_action = 'cannot_confirm' THEN
    IF v_old_status != 'under_review' THEN
      RAISE EXCEPTION 'Invalid transition: Only achievements under review can be marked as cannot confirm.';
    END IF;
    v_new_status := 'not_confirmed';

  ELSIF p_action = 'withdraw' THEN
    IF v_old_status != 'org_verified' THEN
      RAISE EXCEPTION 'Invalid transition: Only organization verified achievements can be withdrawn.';
    END IF;
    v_new_status := 'withdrawn';
    v_record_action := 'withdrawn';

  ELSE
    RAISE EXCEPTION 'Invalid action: %', p_action;
  END IF;

  -- Update achievement status
  UPDATE achievements
  SET verification_status = v_new_status
  WHERE id = p_achievement_id;

  -- Update verification request status if pending
  UPDATE verification_requests
  SET status = CASE
        WHEN p_action = 'confirm' THEN 'confirmed'
        WHEN p_action = 'cannot_confirm' THEN 'not_confirmed'
        ELSE status
      END,
      decided_at = NOW(),
      decided_by = v_actor_id,
      reason = coalesce(p_reason, reason)
  WHERE achievement_id = p_achievement_id AND organization_id = v_achievement.organization_id;

  -- Insert verification record for confirmed / withdrawn
  IF v_record_action IS NOT NULL THEN
    INSERT INTO verification_records (achievement_id, organization_id, verified_by, action, reason)
    VALUES (p_achievement_id, v_achievement.organization_id, v_actor_id, v_record_action, p_reason);
  END IF;

  -- Insert audit log entry
  INSERT INTO audit_logs (actor_id, action, entity_type, entity_id, previous_state, new_state)
  VALUES (
    v_actor_id,
    'VERIFICATION_' || upper(p_action),
    'achievement',
    p_achievement_id,
    jsonb_build_object('status', v_old_status),
    jsonb_build_object('status', v_new_status, 'reason', p_reason)
  );

  RETURN jsonb_build_object(
    'success', true,
    'achievement_id', p_achievement_id,
    'previous_status', v_old_status,
    'new_status', v_new_status
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
