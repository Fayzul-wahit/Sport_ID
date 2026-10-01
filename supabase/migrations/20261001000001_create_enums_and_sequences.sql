-- Migration 01: Enums and Sequences

CREATE TYPE user_role AS ENUM ('athlete', 'org_rep', 'admin');
CREATE TYPE org_status AS ENUM ('pending', 'verified', 'rejected', 'suspended');
CREATE TYPE org_rep_status AS ENUM ('active', 'revoked');
CREATE TYPE achievement_level AS ENUM ('school', 'district', 'state', 'national', 'international');
CREATE TYPE achievement_result AS ENUM ('first', 'second', 'third', 'finalist', 'participation', 'mvp', 'best_player', 'special');
CREATE TYPE verification_status AS ENUM ('self_reported', 'under_review', 'org_verified', 'not_confirmed', 'withdrawn');
CREATE TYPE verification_action AS ENUM ('confirmed', 'withdrawn');

CREATE SEQUENCE sports_id_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE org_id_seq START WITH 1 INCREMENT BY 1;
