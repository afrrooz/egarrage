-- Initialize Schema for egarrage Automotive Startup

CREATE TABLE IF NOT EXISTS imported_cars (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'JDM', 'Supercar', 'European Luxury', 'Electric Tech'
    year INT NOT NULL,
    price NUMERIC(12, 2) NOT NULL,
    horsepower INT NOT NULL,
    engine VARCHAR(100) NOT NULL,
    transmission VARCHAR(50) NOT NULL,
    acceleration VARCHAR(20) NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    availability VARCHAR(50) DEFAULT 'In Showroom',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS auto_parts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL, -- 'Performance', 'Exhaust & Intake', 'Brakes & Suspension', 'OEM Spares'
    part_number VARCHAR(100) UNIQUE NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 10,
    compatibility TEXT NOT NULL,
    image TEXT NOT NULL,
    rating NUMERIC(2, 1) DEFAULT 4.9,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS service_bookings (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    car_model VARCHAR(255) NOT NULL,
    service_type VARCHAR(100) NOT NULL, -- 'Full Tuning', 'Diagnostic Audit', 'Custom Exhaust', 'Battery Health & ECU Sync', 'General Maintenance'
    preferred_date DATE NOT NULL,
    notes TEXT,
    status VARCHAR(50) DEFAULT 'Confirmed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tech_innovations (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL, -- 'EV Powertrain', 'Autonomous Tech', 'ECU Flash & Remap', 'Carbon Aero'
    description TEXT NOT NULL,
    badge VARCHAR(50) NOT NULL,
    image TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Initial Data if tables are empty

INSERT INTO imported_cars (name, brand, category, year, price, horsepower, engine, transmission, acceleration, image, description, availability)
SELECT 'Nissan GT-R Nismo Spec', 'Nissan', 'JDM', 2024, 220000.00, 600, '3.8L Twin-Turbo V6', '6-Speed Dual Clutch', '0-60 mph in 2.5s', 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=80', 'Japanese engineering masterclass imported directly with custom Nismo aerodynamic carbon package.', 'In Showroom'
WHERE NOT EXISTS (SELECT 1 FROM imported_cars WHERE name = 'Nissan GT-R Nismo Spec');

INSERT INTO imported_cars (name, brand, category, year, price, horsepower, engine, transmission, acceleration, image, description, availability)
SELECT 'Porsche 911 GT3 RS', 'Porsche', 'European Luxury', 2024, 340000.00, 518, '4.0L Naturally Aspirated Flat-6', '7-Speed PDK', '0-60 mph in 3.0s', 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1000&q=80', 'Direct European import tuned for high-downforce circuit precision and track-day dominance.', 'In Showroom'
WHERE NOT EXISTS (SELECT 1 FROM imported_cars WHERE name = 'Porsche 911 GT3 RS');

INSERT INTO imported_cars (name, brand, category, year, price, horsepower, engine, transmission, acceleration, image, description, availability)
SELECT 'Rimac Nevera Hyper EV', 'Rimac', 'Electric Tech', 2025, 240000.00, 1914, 'Quad-Motor All-Electric', 'Single-Speed Direct Drive', '0-60 mph in 1.74s', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80', 'Next-gen electric hypercar featuring 120kWh liquid-cooled battery and torque vectoring system.', 'Reserved'
WHERE NOT EXISTS (SELECT 1 FROM imported_cars WHERE name = 'Rimac Nevera Hyper EV');

INSERT INTO imported_cars (name, brand, category, year, price, horsepower, engine, transmission, acceleration, image, description, availability)
SELECT 'BMW M4 CSL Limited', 'BMW', 'European Luxury', 2023, 165000.00, 543, '3.0L BMW M TwinPower Turbo', '8-Speed M Steptronic', '0-60 mph in 3.6s', 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80', 'Ultra-lightweight track special with carbon fiber hood and bucket seats imported from Munich.', 'In Showroom'
WHERE NOT EXISTS (SELECT 1 FROM imported_cars WHERE name = 'BMW M4 CSL Limited');

-- Seed Auto Parts
INSERT INTO auto_parts (name, category, part_number, price, stock, compatibility, image, rating)
SELECT 'Brembo Carbon Ceramic Brake Kit', 'Brakes & Suspension', 'BRM-CC-992GT', 8450.00, 6, 'Porsche 911 / GT3 RS / Turbo S', 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80', 5.0
WHERE NOT EXISTS (SELECT 1 FROM auto_parts WHERE part_number = 'BRM-CC-992GT');

INSERT INTO auto_parts (name, category, part_number, price, stock, compatibility, image, rating)
SELECT 'HKS Titanium Racing Exhaust System', 'Exhaust & Intake', 'HKS-TITAN-GTR35', 3890.00, 12, 'Nissan GT-R R35 (2012-2024)', 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80', 4.9
WHERE NOT EXISTS (SELECT 1 FROM auto_parts WHERE part_number = 'HKS-TITAN-GTR35');

INSERT INTO auto_parts (name, category, part_number, price, stock, compatibility, image, rating)
SELECT 'Garrett GTX3584RS Twin Turbocharger', 'Performance', 'GAR-GTX3584-PR', 4200.00, 8, 'Custom Twin Turbo Builds / Supra MK5 / M3', 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80', 4.8
WHERE NOT EXISTS (SELECT 1 FROM auto_parts WHERE part_number = 'GAR-GTX3584-PR');

INSERT INTO auto_parts (name, category, part_number, price, stock, compatibility, image, rating)
SELECT 'KW V4 Clubsport Adjustable Coilovers', 'Brakes & Suspension', 'KW-V4-BMW-M4', 5100.00, 5, 'BMW M3 G80 / M4 G82', 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80', 4.9
WHERE NOT EXISTS (SELECT 1 FROM auto_parts WHERE part_number = 'KW-V4-BMW-M4');

-- Seed Tech Innovations
INSERT INTO tech_innovations (title, subtitle, category, description, badge, image)
SELECT 'Solid-State Battery Conversions', '1,000+ HP & 600 Mile Range', 'EV Powertrain', 'Custom high-voltage solid-state modular battery packs engineered for ultra-fast charging and lightweight sports car integration.', 'Next-Gen Tech', 'https://images.unsplash.com/photo-1558441719-aa34be548164?auto=format&fit=crop&w=1000&q=80'
WHERE NOT EXISTS (SELECT 1 FROM tech_innovations WHERE title = 'Solid-State Battery Conversions');

INSERT INTO tech_innovations (title, subtitle, category, description, badge, image)
SELECT 'Stage 3 ECU Telemetry & OTA Remapping', 'Real-Time Dyno Tuning via Cloud', 'ECU Flash & Remap', 'Cloud-connected engine management system that dynamically adjusts fuel-map and boost pressure based on ambient humidity & fuel octane.', 'Smart Tuning', 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1000&q=80'
WHERE NOT EXISTS (SELECT 1 FROM tech_innovations WHERE title = 'Stage 3 ECU Telemetry & OTA Remapping');

-- Seed Initial Booking
INSERT INTO service_bookings (customer_name, email, phone, car_model, service_type, preferred_date, notes, status)
SELECT 'Alex Vance', 'alex.vance@example.com', '+1 (555) 234-5678', 'Nissan GT-R R35', 'Full Tuning', CURRENT_DATE + INTERVAL '2 days', 'Requesting Stage 2 ECU remapping and Titanium Exhaust install', 'Confirmed'
WHERE NOT EXISTS (SELECT 1 FROM service_bookings WHERE email = 'alex.vance@example.com');
