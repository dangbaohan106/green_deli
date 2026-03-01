-- Green Deli: SNAKE_CASE Database Schema & US Test Data
-- This script ensures the products table uses snake_case naming convention 
-- and populates it with US-localized organic product data.

-- 1. Create/Adjust Table Schema
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    base_price DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    unit TEXT NOT NULL DEFAULT 'piece',
    stock INTEGER DEFAULT 0,
    image_url TEXT,
    category TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Defensive: Add columns if table exists but they are missing (snake_case)
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='base_price') THEN
        ALTER TABLE products ADD COLUMN base_price DECIMAL(12, 2) NOT NULL DEFAULT 0.00;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='image_url') THEN
        ALTER TABLE products ADD COLUMN image_url TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='created_at') THEN
        ALTER TABLE products ADD COLUMN created_at TIMESTAMPTZ DEFAULT now();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='updated_at') THEN
        ALTER TABLE products ADD COLUMN updated_at TIMESTAMPTZ DEFAULT now();
    END IF;
END $$;

-- 2. Clear previous test data
-- DELETE FROM products;

-- 3. Insert US-localized Test Data (snake_case)
INSERT INTO products (id, name, description, base_price, unit, stock, image_url, category, metadata, created_at, updated_at)
VALUES 
  -- Leafy Greens
  (gen_random_uuid(), 'California Organic Spinach', 'Crisp, triple-washed baby spinach from Central Valley farms.', 5.99, '1lb bag', 120, 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=500', 'Leafy Greens', '{"organic_standard": "USDA", "origin": "California, USA"}', now(), now()),
  (gen_random_uuid(), 'Washington State Kale', 'Vibrant green curly kale, nutrient-rich and freshly harvested.', 3.49, 'bunch', 85, 'https://images.unsplash.com/photo-1524179579427-e8509765438e?auto=format&fit=crop&q=80&w=500', 'Leafy Greens', '{"organic_standard": "USDA Organic", "origin": "Yakima Valley, WA"}', now(), now()),
  (gen_random_uuid(), 'Oregon Romaine Hearts', 'Crunchy heart of romaine lettuce, perfect for Caesar salads.', 4.99, '3pk', 150, 'https://images.unsplash.com/photo-1622206141540-5844544d3fbd?auto=format&fit=crop&q=80&w=500', 'Leafy Greens', '{"organic_standard": "Oregon Tilth Certified", "origin": "Willamette Valley, OR"}', now(), now()),

  -- Root Vegetables
  (gen_random_uuid(), 'Heritage Rainbow Carrots', 'Sweet, multi-colored carrots from artisanal Oregon growers.', 4.25, '2lb bag', 90, 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=500', 'Root Vegetables', '{"organic_standard": "Non-GMO Project Verified", "origin": "Bend, OR"}', now(), now()),
  (gen_random_uuid(), 'Idaho Russet Potatoes', 'The gold standard for mashing and baking, sourced from eastern Idaho.', 6.50, '5lb bag', 300, 'https://images.unsplash.com/photo-1518977676601-b53f02ac6d31?auto=format&fit=crop&q=80&w=500', 'Root Vegetables', '{"organic_standard": "Standard", "origin": "Idaho, USA"}', now(), now()),
  (gen_random_uuid(), 'Sweet Georgia Onions', 'World-famous Vidalia-style sweet onions from Georgia farms.', 2.99, 'lb', 180, 'https://images.unsplash.com/photo-1508747703725-71977713d540?auto=format&fit=crop&q=80&w=500', 'Root Vegetables', '{"organic_standard": "Pesticide-Free", "origin": "Georgia, USA"}', now(), now()),

  -- Fresh Fruits
  (gen_random_uuid(), 'Florida Honeybell Oranges', 'Extra sweet and juicy seasonal oranges from sunny Florida.', 12.99, 'doz', 40, 'https://images.unsplash.com/photo-1582234373408-16e6d11f92e4?auto=format&fit=crop&q=80&w=500', 'Fresh Fruits', '{"organic_standard": "Florida Certified Organic", "origin": "Indian River, FL"}', now(), now()),
  (gen_random_uuid(), 'Honeycrisp Apples', 'The crispest, juiciest apples grown in the cold climate of Minnesota.', 3.99, 'lb', 200, 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&q=80&w=500', 'Fresh Fruits', '{"organic_standard": "Standard", "origin": "Minnesota, USA"}', now(), now()),
  (gen_random_uuid(), 'Premium Hass Avocados', 'Buttery and smooth avocados from Escondido valley.', 2.50, 'ea', 75, 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=500', 'Fresh Fruits', '{"organic_standard": "California Organic", "origin": "San Diego, CA"}', now(), now()),

  -- Exotic Herbs
  (gen_random_uuid(), 'Fresh Genovese Basil', 'Highly aromatic basil grown in greenhouse conditions in Arizona.', 3.99, '4oz container', 45, 'https://images.unsplash.com/photo-1618375531912-77ac368ff101?auto=format&fit=crop&q=80&w=500', 'Exotic Herbs', '{"organic_standard": "Greenhouse Grown", "origin": "Tucson, AZ"}', now(), now()),
  (gen_random_uuid(), 'Dill Sprigs', 'Fresh, feathery dill sprigs from local hydroponic farms.', 2.49, 'bunch', 60, 'https://images.unsplash.com/photo-1588631454533-3d964f7b2403?auto=format&fit=crop&q=80&w=500', 'Exotic Herbs', '{"organic_standard": "Hydroponic", "origin": "Local Farms"}', now(), now()),
  (gen_random_uuid(), 'Rosemary Bunches', 'Woody and intensely fragrant rosemary from Texas Hill Country.', 3.50, 'bunch', 35, 'https://images.unsplash.com/photo-1594313054110-61266858e379?auto=format&fit=crop&q=80&w=500', 'Exotic Herbs', '{"organic_standard": "Texas Certified Organic", "origin": "Austin, TX"}', now(), now());
