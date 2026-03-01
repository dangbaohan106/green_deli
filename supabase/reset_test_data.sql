-- Green Deli: RESET DATA with LOCAL IMAGES
-- This script wipes existing product data and re-populates it with local verified images.

-- 1. Clear ALL existing data
TRUNCATE TABLE products RESTART IDENTITY CASCADE;

-- 2. Insert FRESH Test Data with LOCAL image paths
INSERT INTO products (name, description, base_price, unit, stock, image_url, category, metadata)
VALUES 
  -- Leafy Greens
  ('California Organic Spinach', 'Triple-washed baby spinach from Central Valley farms.', 5.99, '1lb bag', 120, '/images/products/spinach.png', 'Leafy Greens', '{"organic_standard": "USDA"}'),
  ('Washington State Kale', 'Vibrant green curly kale, nutrient-rich and freshly harvested.', 3.49, 'bunch', 85, '/images/products/kale.png', 'Leafy Greens', '{"organic_standard": "USDA Organic"}'),
  ('Oregon Romaine Hearts', 'Crunchy heart of romaine lettuce, perfect for Caesar salads.', 4.99, '3pk', 150, '/images/products/romaine.png', 'Leafy Greens', '{"origin": "Oregon"}'),

  -- Root Vegetables
  ('Heritage Rainbow Carrots', 'Sweet, multi-colored carrots from artisanal growers.', 4.25, '2lb bag', 90, '/images/products/carrots.png', 'Root Vegetables', '{"origin": "Bend, OR"}'),
  ('Idaho Russet Potatoes', 'The gold standard for mashing and baking.', 6.50, '5lb bag', 300, '/images/products/potatoes.png', 'Root Vegetables', '{"origin": "Idaho"}'),
  ('Sweet Georgia Onions', 'World-famous Vidalia-style sweet onions.', 2.99, 'lb', 180, '/images/products/onions.png', 'Root Vegetables', '{"origin": "Georgia"}'),
  ('Fresh Garlic Bulbs', 'Robust, spicy flavor, essential kitchen staple.', 5.99, '7oz bunch', 200, '/images/products/garlic.png', 'Root Vegetables', '{"origin": "Gilroy, CA"}'),

  -- Fresh Fruits
  ('Organic Bananas', 'Sweet, creamy, and ethically sourced from Central America.', 1.99, 'bunch', 150, '/images/products/bananas.png', 'Fresh Fruits', '{"organic_standard": "Fair Trade"}'),
  ('Florida Honeybell Oranges', 'Extra sweet and juicy seasonal oranges.', 12.99, 'doz', 40, '/images/products/oranges.png', 'Fresh Fruits', '{"origin": "Florida"}'),
  ('Seedless Watermelon', 'Crisp, refreshing, and incredibly juicy fruit.', 7.99, 'ea', 30, '/images/products/watermelon.png', 'Fresh Fruits', '{"organic_standard": "Pesticide-Free"}'),
  ('Organic Blueberries', 'Plump, sweet, bursting with antioxidants.', 6.99, 'pint', 120, '/images/products/blueberries.png', 'Fresh Fruits', '{"organic_standard": "USDA"}'),
  ('Fresh Raspberries', 'Delicate, sweet-tart, and vibrant ruby red.', 5.99, '6oz clam', 80, '/images/products/raspberries.png', 'Fresh Fruits', '{"organic_standard": "Standard"}'),

  -- Exotic Herbs
  ('Fresh Genovese Basil', 'Highly aromatic, essential for pesto.', 3.99, '4oz container', 45, '/images/products/basil.png', 'Exotic Herbs', '{"origin": "Arizona"}'),
  ('Rosemary Bunches', 'Woody and intensely fragrant.', 3.50, 'bunch', 35, '/images/products/rosemary.png', 'Exotic Herbs', '{"origin": "Austin, TX"}'),
  ('Peppermint Sprigs', 'Cool and refreshing, great for teas.', 2.49, 'bunch', 60, '/images/products/peppermint.png', 'Exotic Herbs', '{"organic_standard": "Hydroponic"}');

-- 3. Verification
SELECT COUNT(*) FROM products;
