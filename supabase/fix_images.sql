-- Green Deli: Fix Broken Product Images with Verified Unsplash URLs
-- This script updates the image_url for products that are currently broken.

-- 1. Leafy Greens
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=800&auto=format&fit=crop'
WHERE name = 'California Organic Spinach';

UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1524179579427-e8509765438e?q=80&w=800&auto=format&fit=crop'
WHERE name = 'Washington State Kale';

-- 2. Root Vegetables
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=800&auto=format&fit=crop'
WHERE name = 'Heritage Rainbow Carrots';

UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1518977676601-b53f02ac6d31?q=80&w=800&auto=format&fit=crop'
WHERE name = 'Idaho Russet Potatoes';

UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1508747703725-71977713d540?q=80&w=800&auto=format&fit=crop'
WHERE name = 'Sweet Georgia Onions';

UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=800&auto=format&fit=crop'
WHERE name = 'Fresh Garlic Bulbs';

-- 3. Fresh Fruits
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=800&auto=format&fit=crop'
WHERE name = 'Organic Bananas';

UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=800&auto=format&fit=crop'
WHERE name = 'Florida Honeybell Oranges';

UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1596333333311-63cb53e5e43c?q=80&w=800&auto=format&fit=crop'
WHERE name = 'Seedless Watermelon';

UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1497534446932-c946e7306ee3?q=80&w=800&auto=format&fit=crop'
WHERE name = 'Organic Blueberries';

UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?q=80&w=800&auto=format&fit=crop'
WHERE name = 'Fresh Raspberries';

-- 4. Exotic Herbs
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1618375531912-77ac368ff101?q=80&w=800&auto=format&fit=crop'
WHERE name = 'Fresh Genovese Basil';

UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1594313054110-61266858e379?q=80&w=800&auto=format&fit=crop'
WHERE name = 'Rosemary Bunches';

UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1588631454533-3d964f7b2403?q=80&w=800&auto=format&fit=crop'
WHERE name = 'Peppermint Sprigs' OR name = 'Dill Sprigs';

-- 5. Verification
SELECT id, name, category, image_url FROM products ORDER BY category;
