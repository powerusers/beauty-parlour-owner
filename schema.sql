-- Beauty Parlour Database Schema
-- Shared by both owner-dashboard and client-app services

CREATE TABLE IF NOT EXISTS settings (
  id SERIAL PRIMARY KEY,
  parlour_name VARCHAR(255) NOT NULL DEFAULT 'Crazy Beauty Parlour',
  parlour_open BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS services (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  duration INTEGER NOT NULL,
  price INTEGER NOT NULL,
  category VARCHAR(100) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS hours (
  day VARCHAR(20) PRIMARY KEY,
  is_open BOOLEAN NOT NULL DEFAULT true,
  start_time VARCHAR(10) NOT NULL DEFAULT '10:00',
  end_time VARCHAR(10) NOT NULL DEFAULT '19:00'
);

CREATE TABLE IF NOT EXISTS bookings (
  id VARCHAR(100) PRIMARY KEY,
  client_name VARCHAR(255) NOT NULL,
  client_phone VARCHAR(50) NOT NULL,
  services TEXT[] NOT NULL,
  date DATE NOT NULL,
  start_time VARCHAR(10) NOT NULL,
  total_duration INTEGER NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'confirmed',
  amount_charged NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed default settings
INSERT INTO settings (parlour_name, parlour_open)
VALUES ('Crazy Beauty Parlour', true)
ON CONFLICT DO NOTHING;

-- Seed default hours
INSERT INTO hours (day, is_open, start_time, end_time) VALUES
  ('Sunday', false, '10:00', '17:00'),
  ('Monday', true, '10:00', '19:00'),
  ('Tuesday', true, '10:00', '19:00'),
  ('Wednesday', true, '10:00', '19:00'),
  ('Thursday', true, '10:00', '19:00'),
  ('Friday', true, '10:00', '19:00'),
  ('Saturday', true, '10:00', '20:00')
ON CONFLICT DO NOTHING;

-- Seed default services
INSERT INTO services (id, name, duration, price, category, active) VALUES
  ('s1', 'Haircut & Styling', 45, 500, 'Hair', true),
  ('s2', 'Hair Coloring', 90, 2500, 'Hair', true),
  ('s3', 'Blow Dry', 30, 300, 'Hair', true),
  ('s4', 'Hair Spa', 60, 1200, 'Hair', true),
  ('s5', 'Classic Facial', 45, 800, 'Skin', true),
  ('s6', 'Gold Facial', 60, 1500, 'Skin', true),
  ('s7', 'Cleanup', 30, 500, 'Skin', true),
  ('s8', 'Full Body Wax', 90, 2000, 'Waxing', true),
  ('s9', 'Arms & Legs Wax', 45, 800, 'Waxing', true),
  ('s10', 'Eyebrow Threading', 15, 100, 'Threading', true),
  ('s11', 'Full Face Threading', 30, 250, 'Threading', true),
  ('s12', 'Manicure', 30, 400, 'Nails', true),
  ('s13', 'Pedicure', 45, 500, 'Nails', true),
  ('s14', 'Gel Nails', 60, 1200, 'Nails', true),
  ('s15', 'Bridal Makeup', 120, 8000, 'Makeup', true),
  ('s16', 'Party Makeup', 60, 3000, 'Makeup', true)
ON CONFLICT DO NOTHING;
