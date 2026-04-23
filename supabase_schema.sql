-- SimpleSphere Database Schema (Simplified & Complete)
-- Run this in your Supabase SQL Editor to set up all tables correctly.

-- 1. COURSES TABLE
DROP TABLE IF EXISTS courses CASCADE; 
CREATE TABLE courses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  img text,
  inst text NOT NULL,
  rating text DEFAULT '5.0',
  reviews text DEFAULT '0',
  price text NOT NULL,
  original_price text,
  category text,
  level text,
  description text,
  about_course text,
  duration text,
  last_updated text,
  enrolled_count text,
  instructor_title text,
  instructor_bio text,
  instructor_image text,
  -- These store JSON data for the frontend
  curriculum jsonb DEFAULT '[]',
  materials_included jsonb DEFAULT '[]',
  learning_objectives jsonb DEFAULT '[]',
  feature_cards jsonb DEFAULT '[]',
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
