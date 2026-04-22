-- SimpleSphere Database Schema
-- Run this in your Supabase SQL Editor to set up all tables correctly.

-- 1. COURSES TABLE
CREATE TABLE IF NOT EXISTS courses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  img text,
  inst text NOT NULL,
  rating text DEFAULT '5.0',
  reviews text DEFAULT '0',
  price text NOT NULL,
  category text,
  level text,
  "enrollmentUrl" text DEFAULT '',
  created_at timestamp with time zone DEFAULT now()
);

-- 2. LEADS TABLE (Contact Form)
CREATE TABLE IF NOT EXISTS leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text,
  status text DEFAULT 'pending', -- 'pending' or 'done'
  created_at timestamp with time zone DEFAULT now()
);

-- 3. INSTRUCTORS TABLE (Applications)
CREATE TABLE IF NOT EXISTS instructors (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  "fullName" text NOT NULL,
  email text NOT NULL,
  expertise text,
  status text DEFAULT 'pending', -- 'pending' or 'done'
  created_at timestamp with time zone DEFAULT now()
);

-- MIGRATE DATA (Fixing existing column mismatches if any)
-- This ensures that if you already had data in lowercase columns, it gets moved to the correct camelCase columns.

DO $$ 
BEGIN 
  -- Migrate 'fullname' to 'fullName' in instructors
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='instructors' AND column_name='fullname') THEN
    UPDATE instructors SET "fullName" = fullname WHERE "fullName" IS NULL;
    ALTER TABLE instructors ALTER COLUMN fullname DROP NOT NULL;
    -- Optional: ALTER TABLE instructors DROP COLUMN fullname;
  END IF;

  -- Migrate 'enrollmenturl' to 'enrollmentUrl' in courses
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='courses' AND column_name='enrollmenturl') THEN
    UPDATE courses SET "enrollmentUrl" = enrollmenturl WHERE "enrollmentUrl" IS NULL OR "enrollmentUrl" = '';
    ALTER TABLE courses ALTER COLUMN enrollmenturl DROP NOT NULL;
    -- Optional: ALTER TABLE courses DROP COLUMN enrollmenturl;
  END IF;
END $$;
