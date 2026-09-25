import { Category } from '../types';

export const SUPERMARKET_CATEGORIES: Category[] = [
  {
    id: 'cat-fresh-produce',
    name: 'Fresh Produce',
    slug: 'fresh-produce',
    icon: 'Apple',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&auto=format&fit=crop&q=80',
    description: 'Farm-fresh fruits, vegetables, tubers and herbs sourced directly from Musanze, Bugesera, and Kigali fresh agro-markets.',
    subcategories: [
      { id: 'sub-bananas', categoryId: 'cat-fresh-produce', name: 'Bananas', slug: 'bananas', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&auto=format&fit=crop&q=80', itemCount: 14 },
      { id: 'sub-apples', categoryId: 'cat-fresh-produce', name: 'Apples', slug: 'apples', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&auto=format&fit=crop&q=80', itemCount: 10 },
      { id: 'sub-oranges', categoryId: 'cat-fresh-produce', name: 'Oranges', slug: 'oranges', image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=500&auto=format&fit=crop&q=80', itemCount: 8 },
      { id: 'sub-mangoes', categoryId: 'cat-fresh-produce', name: 'Mangoes', slug: 'mangoes', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&auto=format&fit=crop&q=80', itemCount: 12 },
      { id: 'sub-avocados', categoryId: 'cat-fresh-produce', name: 'Avocados', slug: 'avocados', image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=500&auto=format&fit=crop&q=80', itemCount: 18 },
      { id: 'sub-pineapples', categoryId: 'cat-fresh-produce', name: 'Pineapples', slug: 'pineapples', image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=500&auto=format&fit=crop&q=80', itemCount: 9 },
      { id: 'sub-watermelon', categoryId: 'cat-fresh-produce', name: 'Watermelon', slug: 'watermelon', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&auto=format&fit=crop&q=80', itemCount: 7 },
      { id: 'sub-passion-fruits', categoryId: 'cat-fresh-produce', name: 'Passion fruits', slug: 'passion-fruits', image: 'https://images.unsplash.com/photo-1596463059283-da257325bee8?w=500&auto=format&fit=crop&q=80', itemCount: 11 },
      { id: 'sub-tomatoes', categoryId: 'cat-fresh-produce', name: 'Tomatoes', slug: 'tomatoes', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80', itemCount: 16 },
      { id: 'sub-onions', categoryId: 'cat-fresh-produce', name: 'Onions', slug: 'onions', image: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=500&auto=format&fit=crop&q=80', itemCount: 15 },
      { id: 'sub-potatoes', categoryId: 'cat-fresh-produce', name: 'Potatoes', slug: 'potatoes', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=80', itemCount: 20 },
      { id: 'sub-sweet-potatoes', categoryId: 'cat-fresh-produce', name: 'Sweet potatoes', slug: 'sweet-potatoes', image: 'https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?w=500&auto=format&fit=crop&q=80', itemCount: 12 },
      { id: 'sub-cassava', categoryId: 'cat-fresh-produce', name: 'Cassava', slug: 'cassava', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&auto=format&fit=crop&q=80', itemCount: 14 },
      { id: 'sub-carrots', categoryId: 'cat-fresh-produce', name: 'Carrots', slug: 'carrots', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&auto=format&fit=crop&q=80', itemCount: 12 },
      { id: 'sub-cabbage', categoryId: 'cat-fresh-produce', name: 'Cabbage', slug: 'cabbage', image: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=500&auto=format&fit=crop&q=80', itemCount: 8 },
      { id: 'sub-lettuce', categoryId: 'cat-fresh-produce', name: 'Lettuce', slug: 'lettuce', image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=500&auto=format&fit=crop&q=80', itemCount: 10 },
      { id: 'sub-green-pepper', categoryId: 'cat-fresh-produce', name: 'Green pepper', slug: 'green-pepper', image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=500&auto=format&fit=crop&q=80', itemCount: 9 },
      { id: 'sub-garlic', categoryId: 'cat-fresh-produce', name: 'Garlic', slug: 'garlic', image: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=500&auto=format&fit=crop&q=80', itemCount: 11 },
      { id: 'sub-ginger', categoryId: 'cat-fresh-produce', name: 'Ginger', slug: 'ginger', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=80', itemCount: 10 },
      { id: 'sub-spinach', categoryId: 'cat-fresh-produce', name: 'Spinach', slug: 'spinach', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop&q=80', itemCount: 12 },
      { id: 'sub-other-veg-fruits', categoryId: 'cat-fresh-produce', name: 'Other vegetables and fruits', slug: 'other-veg-fruits', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=80', itemCount: 25 }
    ]
  },
  {
    id: 'cat-rice-flour-grains',
    name: 'Rice, Flour & Grains',
    slug: 'rice-flour-grains',
    icon: 'Wheat',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format&fit=crop&q=80',
    description: 'Premium quality Bugarama rice, Kinazi cassava flour, Azam wheat flour, maize meal, sorghum, lentils & pasta.',
    subcategories: [
      { id: 'sub-rice', categoryId: 'cat-rice-flour-grains', name: 'Rice', slug: 'rice', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80', itemCount: 28 },
      { id: 'sub-maize-flour', categoryId: 'cat-rice-flour-grains', name: 'Maize flour', slug: 'maize-flour', image: 'https://images.unsplash.com/photo-1607672632458-9eb56696346b?w=500&auto=format&fit=crop&q=80', itemCount: 16 },
      { id: 'sub-wheat-flour', categoryId: 'cat-rice-flour-grains', name: 'Wheat flour', slug: 'wheat-flour', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80', itemCount: 14 },
      { id: 'sub-cassava-flour', categoryId: 'cat-rice-flour-grains', name: 'Cassava flour', slug: 'cassava-flour', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&auto=format&fit=crop&q=80', itemCount: 12 },
      { id: 'sub-sorghum', categoryId: 'cat-rice-flour-grains', name: 'Sorghum', slug: 'sorghum', image: 'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?w=500&auto=format&fit=crop&q=80', itemCount: 8 },
      { id: 'sub-beans', categoryId: 'cat-rice-flour-grains', name: 'Beans', slug: 'beans', image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=500&auto=format&fit=crop&q=80', itemCount: 18 },
      { id: 'sub-peas', categoryId: 'cat-rice-flour-grains', name: 'Peas', slug: 'peas', image: 'https://images.unsplash.com/photo-1592394533824-9440e5d68530?w=500&auto=format&fit=crop&q=80', itemCount: 9 },
      { id: 'sub-lentils', categoryId: 'cat-rice-flour-grains', name: 'Lentils', slug: 'lentils', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=80', itemCount: 11 },
      { id: 'sub-cereals', categoryId: 'cat-rice-flour-grains', name: 'Cereals', slug: 'cereals', image: 'https://images.unsplash.com/photo-1521483451569-e33803c0330c?w=500&auto=format&fit=crop&q=80', itemCount: 15 },
      { id: 'sub-oats', categoryId: 'cat-rice-flour-grains', name: 'Oats', slug: 'oats', image: 'https://images.unsplash.com/photo-1517471162451-3180f1406859?w=500&auto=format&fit=crop&q=80', itemCount: 10 },
      { id: 'sub-pasta', categoryId: 'cat-rice-flour-grains', name: 'Pasta', slug: 'pasta', image: 'https://images.unsplash.com/photo-1551462147-38012674e2d2?w=500&auto=format&fit=crop&q=80', itemCount: 22 },
      { id: 'sub-spaghetti', categoryId: 'cat-rice-flour-grains', name: 'Spaghetti', slug: 'spaghetti', image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281691?w=500&auto=format&fit=crop&q=80', itemCount: 18 },
      { id: 'sub-noodles', categoryId: 'cat-rice-flour-grains', name: 'Noodles', slug: 'noodles', image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500&auto=format&fit=crop&q=80', itemCount: 19 }
    ]
  },
  {
    id: 'cat-cooking-pantry',
    name: 'Cooking & Pantry',
    slug: 'cooking-pantry',
    icon: 'Soup',
    image: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?w=800&auto=format&fit=crop&q=80',
    description: 'Pantry essentials, cooking oils, Akabanga, Kabuye sugar, seasonings, sauces and preserves.',
    subcategories: [
      { id: 'sub-cooking-oil', categoryId: 'cat-cooking-pantry', name: 'Cooking oil', slug: 'cooking-oil', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80', itemCount: 20 },
      { id: 'sub-sunflower-oil', categoryId: 'cat-cooking-pantry', name: 'Sunflower oil', slug: 'sunflower-oil', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80', itemCount: 12 },
      { id: 'sub-olive-oil', categoryId: 'cat-cooking-pantry', name: 'Olive oil', slug: 'olive-oil', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80', itemCount: 14 },
      { id: 'sub-sugar', categoryId: 'cat-cooking-pantry', name: 'Sugar', slug: 'sugar', image: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=500&auto=format&fit=crop&q=80', itemCount: 10 },
      { id: 'sub-salt', categoryId: 'cat-cooking-pantry', name: 'Salt', slug: 'salt', image: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=500&auto=format&fit=crop&q=80', itemCount: 8 },
      { id: 'sub-spices', categoryId: 'cat-cooking-pantry', name: 'Spices', slug: 'spices', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=80', itemCount: 32 },
      { id: 'sub-tomato-paste', categoryId: 'cat-cooking-pantry', name: 'Tomato paste', slug: 'tomato-paste', image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=500&auto=format&fit=crop&q=80', itemCount: 15 },
      { id: 'sub-sauces', categoryId: 'cat-cooking-pantry', name: 'Sauces', slug: 'sauces', image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=500&auto=format&fit=crop&q=80', itemCount: 25 },
      { id: 'sub-mayonnaise', categoryId: 'cat-cooking-pantry', name: 'Mayonnaise', slug: 'mayonnaise', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=80', itemCount: 9 },
      { id: 'sub-vinegar', categoryId: 'cat-cooking-pantry', name: 'Vinegar', slug: 'vinegar', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=80', itemCount: 7 },
      { id: 'sub-peanut-butter', categoryId: 'cat-cooking-pantry', name: 'Peanut butter', slug: 'peanut-butter', image: 'https://images.unsplash.com/photo-1568471173242-461f0a730452?w=500&auto=format&fit=crop&q=80', itemCount: 12 },
      { id: 'sub-jam', categoryId: 'cat-cooking-pantry', name: 'Jam', slug: 'jam', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=80', itemCount: 10 },
      { id: 'sub-honey', categoryId: 'cat-cooking-pantry', name: 'Honey', slug: 'honey', image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=500&auto=format&fit=crop&q=80', itemCount: 14 },
      { id: 'sub-stock-cubes', categoryId: 'cat-cooking-pantry', name: 'Stock cubes', slug: 'stock-cubes', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=80', itemCount: 11 },
      { id: 'sub-canned-foods', categoryId: 'cat-cooking-pantry', name: 'Canned foods', slug: 'canned-foods', image: 'https://images.unsplash.com/photo-1584473457406-624048518851?w=500&auto=format&fit=crop&q=80', itemCount: 28 }
    ]
  },
  {
    id: 'cat-bakery',
    name: 'Bakery',
    slug: 'bakery',
    icon: 'Croissant',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80',
    description: 'Freshly baked baguettes, sandwich bread, croissants, celebration cakes & artisan pastries.',
    subcategories: [
      { id: 'sub-bread', categoryId: 'cat-bakery', name: 'Bread', slug: 'bread', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80', itemCount: 24 },
      { id: 'sub-sandwich-bread', categoryId: 'cat-bakery', name: 'Sandwich bread', slug: 'sandwich-bread', image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=500&auto=format&fit=crop&q=80', itemCount: 15 },
      { id: 'sub-cakes', categoryId: 'cat-bakery', name: 'Cakes', slug: 'cakes', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=80', itemCount: 20 },
      { id: 'sub-cupcakes', categoryId: 'cat-bakery', name: 'Cupcakes', slug: 'cupcakes', image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=500&auto=format&fit=crop&q=80', itemCount: 12 },
      { id: 'sub-croissants', categoryId: 'cat-bakery', name: 'Croissants', slug: 'croissants', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&auto=format&fit=crop&q=80', itemCount: 10 },
      { id: 'sub-doughnuts', categoryId: 'cat-bakery', name: 'Doughnuts', slug: 'doughnuts', image: 'https://images.unsplash.com/photo-1527515862127-a4fc05baf7a5?w=500&auto=format&fit=crop&q=80', itemCount: 14 },
      { id: 'sub-bakery-biscuits', categoryId: 'cat-bakery', name: 'Biscuits', slug: 'biscuits', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&auto=format&fit=crop&q=80', itemCount: 18 },
      { id: 'sub-bakery-cookies', categoryId: 'cat-bakery', name: 'Cookies', slug: 'cookies', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&auto=format&fit=crop&q=80', itemCount: 16 },
      { id: 'sub-pastries', categoryId: 'cat-bakery', name: 'Pastries', slug: 'pastries', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80', itemCount: 22 }
    ]
  },
  {
    id: 'cat-dairy-chilled',
    name: 'Dairy & Chilled',
    slug: 'dairy-chilled',
    icon: 'Milk',
    image: 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?w=800&auto=format&fit=crop&q=80',
    description: 'Inyange fresh pasteurized milk, Gishwati cheeses, creamy yogurts, butter & chilled dessert creams.',
    subcategories: [
      { id: 'sub-milk', categoryId: 'cat-dairy-chilled', name: 'Milk', slug: 'milk', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=80', itemCount: 30 },
      { id: 'sub-yogurt', categoryId: 'cat-dairy-chilled', name: 'Yogurt', slug: 'yogurt', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format&fit=crop&q=80', itemCount: 24 },
      { id: 'sub-cheese', categoryId: 'cat-dairy-chilled', name: 'Cheese', slug: 'cheese', image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=500&auto=format&fit=crop&q=80', itemCount: 18 },
      { id: 'sub-butter', categoryId: 'cat-dairy-chilled', name: 'Butter', slug: 'butter', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&auto=format&fit=crop&q=80', itemCount: 12 },
      { id: 'sub-margarine', categoryId: 'cat-dairy-chilled', name: 'Margarine', slug: 'margarine', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&auto=format&fit=crop&q=80', itemCount: 10 },
      { id: 'sub-ice-cream', categoryId: 'cat-dairy-chilled', name: 'Ice cream', slug: 'ice-cream', image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=500&auto=format&fit=crop&q=80', itemCount: 16 },
      { id: 'sub-cream', categoryId: 'cat-dairy-chilled', name: 'Cream', slug: 'cream', image: 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?w=500&auto=format&fit=crop&q=80', itemCount: 11 },
      { id: 'sub-chilled-juices', categoryId: 'cat-dairy-chilled', name: 'Chilled juices', slug: 'chilled-juices', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500&auto=format&fit=crop&q=80', itemCount: 20 }
    ]
  },
  {
    id: 'cat-meat-fish-poultry',
    name: 'Meat, Fish & Poultry',
    slug: 'meat-fish-poultry',
    icon: 'Beef',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&auto=format&fit=crop&q=80',
    description: 'Hygienically inspected Nyagatare beef, fresh Lake Kivu tilapia, free-range chicken and fresh farm eggs.',
    subcategories: [
      { id: 'sub-beef', categoryId: 'cat-meat-fish-poultry', name: 'Beef', slug: 'beef', image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=500&auto=format&fit=crop&q=80', itemCount: 22 },
      { id: 'sub-goat-meat', categoryId: 'cat-meat-fish-poultry', name: 'Goat meat', slug: 'goat-meat', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80', itemCount: 15 },
      { id: 'sub-chicken', categoryId: 'cat-meat-fish-poultry', name: 'Chicken', slug: 'chicken', image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=500&auto=format&fit=crop&q=80', itemCount: 25 },
      { id: 'sub-pork', categoryId: 'cat-meat-fish-poultry', name: 'Pork', slug: 'pork', image: 'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=500&auto=format&fit=crop&q=80', itemCount: 14 },
      { id: 'sub-sausages', categoryId: 'cat-meat-fish-poultry', name: 'Sausages', slug: 'sausages', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80', itemCount: 18 },
      { id: 'sub-minced-meat', categoryId: 'cat-meat-fish-poultry', name: 'Minced meat', slug: 'minced-meat', image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=500&auto=format&fit=crop&q=80', itemCount: 12 },
      { id: 'sub-fish', categoryId: 'cat-meat-fish-poultry', name: 'Fish', slug: 'fish', image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=500&auto=format&fit=crop&q=80', itemCount: 16 },
      { id: 'sub-frozen-meat', categoryId: 'cat-meat-fish-poultry', name: 'Frozen meat', slug: 'frozen-meat', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=500&auto=format&fit=crop&q=80', itemCount: 14 },
      { id: 'sub-eggs', categoryId: 'cat-meat-fish-poultry', name: 'Eggs', slug: 'eggs', image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=500&auto=format&fit=crop&q=80', itemCount: 12 }
    ]
  },
  {
    id: 'cat-beverages',
    name: 'Beverages',
    slug: 'beverages',
    icon: 'Coffee',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80',
    description: 'Inyange natural mineral water, soft drinks, Rwandan specialty Arabica coffee, highland teas & juices.',
    subcategories: [
      { id: 'sub-bottled-water', categoryId: 'cat-beverages', name: 'Bottled water', slug: 'bottled-water', image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=500&auto=format&fit=crop&q=80', itemCount: 15 },
      { id: 'sub-mineral-water', categoryId: 'cat-beverages', name: 'Mineral water', slug: 'mineral-water', image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=500&auto=format&fit=crop&q=80', itemCount: 12 },
      { id: 'sub-soft-drinks', categoryId: 'cat-beverages', name: 'Soft drinks', slug: 'soft-drinks', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=80', itemCount: 28 },
      { id: 'sub-juices', categoryId: 'cat-beverages', name: 'Juices', slug: 'juices', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500&auto=format&fit=crop&q=80', itemCount: 22 },
      { id: 'sub-energy-drinks', categoryId: 'cat-beverages', name: 'Energy drinks', slug: 'energy-drinks', image: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=500&auto=format&fit=crop&q=80', itemCount: 14 },
      { id: 'sub-tea', categoryId: 'cat-beverages', name: 'Tea', slug: 'tea', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=80', itemCount: 20 },
      { id: 'sub-coffee', categoryId: 'cat-beverages', name: 'Coffee', slug: 'coffee', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=80', itemCount: 25 },
      { id: 'sub-hot-chocolate', categoryId: 'cat-beverages', name: 'Hot chocolate', slug: 'hot-chocolate', image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=500&auto=format&fit=crop&q=80', itemCount: 9 },
      { id: 'sub-non-alcoholic', categoryId: 'cat-beverages', name: 'Non-alcoholic beverages', slug: 'non-alcoholic', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&auto=format&fit=crop&q=80', itemCount: 16 }
    ]
  },
  {
    id: 'cat-snacks-sweets',
    name: 'Snacks & Sweets',
    slug: 'snacks-sweets',
    icon: 'Candy',
    image: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=800&auto=format&fit=crop&q=80',
    description: 'Crispy plantain chips, roasted Rwandan macadamia & cashew nuts, chocolates & cookies.',
    subcategories: [
      { id: 'sub-potato-chips', categoryId: 'cat-snacks-sweets', name: 'Potato chips', slug: 'potato-chips', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&auto=format&fit=crop&q=80', itemCount: 22 },
      { id: 'sub-chocolate', categoryId: 'cat-snacks-sweets', name: 'Chocolate', slug: 'chocolate', image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=500&auto=format&fit=crop&q=80', itemCount: 26 },
      { id: 'sub-candy', categoryId: 'cat-snacks-sweets', name: 'Candy', slug: 'candy', image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=500&auto=format&fit=crop&q=80', itemCount: 18 },
      { id: 'sub-chewing-gum', categoryId: 'cat-snacks-sweets', name: 'Chewing gum', slug: 'chewing-gum', image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=500&auto=format&fit=crop&q=80', itemCount: 10 },
      { id: 'sub-popcorn', categoryId: 'cat-snacks-sweets', name: 'Popcorn', slug: 'popcorn', image: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=500&auto=format&fit=crop&q=80', itemCount: 12 },
      { id: 'sub-nuts', categoryId: 'cat-snacks-sweets', name: 'Nuts', slug: 'nuts', image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=500&auto=format&fit=crop&q=80', itemCount: 17 },
      { id: 'sub-snack-biscuits', categoryId: 'cat-snacks-sweets', name: 'Biscuits', slug: 'snack-biscuits', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&auto=format&fit=crop&q=80', itemCount: 20 },
      { id: 'sub-snack-cookies', categoryId: 'cat-snacks-sweets', name: 'Cookies', slug: 'snack-cookies', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&auto=format&fit=crop&q=80', itemCount: 15 },
      { id: 'sub-dried-fruits', categoryId: 'cat-snacks-sweets', name: 'Dried fruits', slug: 'dried-fruits', image: 'https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?w=500&auto=format&fit=crop&q=80', itemCount: 14 }
    ]
  },
  {
    id: 'cat-household-cleaning',
    name: 'Household Cleaning',
    slug: 'household-cleaning',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800&auto=format&fit=crop&q=80',
    description: 'Laundry powders, dishwashing liquids, surface cleaners, disinfectants, tissues & trash bags.',
    subcategories: [
      { id: 'sub-laundry-detergent', categoryId: 'cat-household-cleaning', name: 'Laundry detergent', slug: 'laundry-detergent', image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500&auto=format&fit=crop&q=80', itemCount: 25 },
      { id: 'sub-dishwashing-liquid', categoryId: 'cat-household-cleaning', name: 'Dishwashing liquid', slug: 'dishwashing-liquid', image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=500&auto=format&fit=crop&q=80', itemCount: 18 },
      { id: 'sub-toilet-cleaner', categoryId: 'cat-household-cleaning', name: 'Toilet cleaner', slug: 'toilet-cleaner', image: 'https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?w=500&auto=format&fit=crop&q=80', itemCount: 14 },
      { id: 'sub-floor-cleaner', categoryId: 'cat-household-cleaning', name: 'Floor cleaner', slug: 'floor-cleaner', image: 'https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?w=500&auto=format&fit=crop&q=80', itemCount: 16 },
      { id: 'sub-bleach', categoryId: 'cat-household-cleaning', name: 'Bleach', slug: 'bleach', image: 'https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?w=500&auto=format&fit=crop&q=80', itemCount: 10 },
      { id: 'sub-disinfectant', categoryId: 'cat-household-cleaning', name: 'Disinfectant', slug: 'disinfectant', image: 'https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?w=500&auto=format&fit=crop&q=80', itemCount: 15 },
      { id: 'sub-sponges', categoryId: 'cat-household-cleaning', name: 'Sponges', slug: 'sponges', image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=500&auto=format&fit=crop&q=80', itemCount: 12 },
      { id: 'sub-cleaning-brushes', categoryId: 'cat-household-cleaning', name: 'Cleaning brushes', slug: 'cleaning-brushes', image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=500&auto=format&fit=crop&q=80', itemCount: 11 },
      { id: 'sub-garbage-bags', categoryId: 'cat-household-cleaning', name: 'Garbage bags', slug: 'garbage-bags', image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500&auto=format&fit=crop&q=80', itemCount: 14 },
      { id: 'sub-paper-towels', categoryId: 'cat-household-cleaning', name: 'Paper towels', slug: 'paper-towels', image: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=500&auto=format&fit=crop&q=80', itemCount: 16 },
      { id: 'sub-toilet-paper', categoryId: 'cat-household-cleaning', name: 'Toilet paper', slug: 'toilet-paper', image: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=500&auto=format&fit=crop&q=80', itemCount: 20 }
    ]
  },
  {
    id: 'cat-personal-care-beauty',
    name: 'Personal Care & Beauty',
    slug: 'personal-care-beauty',
    icon: 'Heart',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
    description: 'Soaps, dermatologist lotions, toothpastes, deodorants, perfumes and shaving essentials.',
    subcategories: [
      { id: 'sub-shampoo', categoryId: 'cat-personal-care-beauty', name: 'Shampoo', slug: 'shampoo', image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500&auto=format&fit=crop&q=80', itemCount: 22 },
      { id: 'sub-conditioner', categoryId: 'cat-personal-care-beauty', name: 'Conditioner', slug: 'conditioner', image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500&auto=format&fit=crop&q=80', itemCount: 18 },
      { id: 'sub-body-lotion', categoryId: 'cat-personal-care-beauty', name: 'Body lotion', slug: 'body-lotion', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=80', itemCount: 28 },
      { id: 'sub-body-wash', categoryId: 'cat-personal-care-beauty', name: 'Body wash', slug: 'body-wash', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=80', itemCount: 20 },
      { id: 'sub-soap', categoryId: 'cat-personal-care-beauty', name: 'Soap', slug: 'soap', image: 'https://images.unsplash.com/photo-1607006314392-42173167198e?w=500&auto=format&fit=crop&q=80', itemCount: 25 },
      { id: 'sub-toothpaste', categoryId: 'cat-personal-care-beauty', name: 'Toothpaste', slug: 'toothpaste', image: 'https://images.unsplash.com/photo-1559591937-e1032b4b4e1e?w=500&auto=format&fit=crop&q=80', itemCount: 16 },
      { id: 'sub-toothbrushes', categoryId: 'cat-personal-care-beauty', name: 'Toothbrushes', slug: 'toothbrushes', image: 'https://images.unsplash.com/photo-1559591937-e1032b4b4e1e?w=500&auto=format&fit=crop&q=80', itemCount: 14 },
      { id: 'sub-deodorant', categoryId: 'cat-personal-care-beauty', name: 'Deodorant', slug: 'deodorant', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&auto=format&fit=crop&q=80', itemCount: 24 },
      { id: 'sub-perfume', categoryId: 'cat-personal-care-beauty', name: 'Perfume', slug: 'perfume', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&auto=format&fit=crop&q=80', itemCount: 30 },
      { id: 'sub-hair-products', categoryId: 'cat-personal-care-beauty', name: 'Hair products', slug: 'hair-products', image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=500&auto=format&fit=crop&q=80', itemCount: 22 },
      { id: 'sub-skincare', categoryId: 'cat-personal-care-beauty', name: 'Skincare', slug: 'skincare', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=80', itemCount: 35 },
      { id: 'sub-shaving-products', categoryId: 'cat-personal-care-beauty', name: 'Shaving products', slug: 'shaving-products', image: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?w=500&auto=format&fit=crop&q=80', itemCount: 15 }
    ]
  },
  {
    id: 'cat-baby-products',
    name: 'Baby Products',
    slug: 'baby-products',
    icon: 'Smile',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&auto=format&fit=crop&q=80',
    description: 'Gentle diapers, wipes, nutritious baby formula, soothing lotions and infant care supplies.',
    subcategories: [
      { id: 'sub-baby-diapers', categoryId: 'cat-baby-products', name: 'Baby diapers', slug: 'baby-diapers', image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&auto=format&fit=crop&q=80', itemCount: 25 },
      { id: 'sub-baby-wipes', categoryId: 'cat-baby-products', name: 'Baby wipes', slug: 'baby-wipes', image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&auto=format&fit=crop&q=80', itemCount: 18 },
      { id: 'sub-baby-food', categoryId: 'cat-baby-products', name: 'Baby food', slug: 'baby-food', image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&auto=format&fit=crop&q=80', itemCount: 20 },
      { id: 'sub-baby-shampoo', categoryId: 'cat-baby-products', name: 'Baby shampoo', slug: 'baby-shampoo', image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&auto=format&fit=crop&q=80', itemCount: 14 },
      { id: 'sub-baby-lotion', categoryId: 'cat-baby-products', name: 'Baby lotion', slug: 'baby-lotion', image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&auto=format&fit=crop&q=80', itemCount: 16 },
      { id: 'sub-baby-soap', categoryId: 'cat-baby-products', name: 'Baby soap', slug: 'baby-soap', image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&auto=format&fit=crop&q=80', itemCount: 15 },
      { id: 'sub-baby-accessories', categoryId: 'cat-baby-products', name: 'Baby accessories', slug: 'baby-accessories', image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&auto=format&fit=crop&q=80', itemCount: 22 }
    ]
  },
  {
    id: 'cat-pet-supplies',
    name: 'Pet Supplies',
    slug: 'pet-supplies',
    icon: 'Dog',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&auto=format&fit=crop&q=80',
    description: 'Nutritious dog and cat foods, flea treatments, pet shampoos, leashes and grooming gear.',
    subcategories: [
      { id: 'sub-dog-food', categoryId: 'cat-pet-supplies', name: 'Dog food', slug: 'dog-food', image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500&auto=format&fit=crop&q=80', itemCount: 20 },
      { id: 'sub-cat-food', categoryId: 'cat-pet-supplies', name: 'Cat food', slug: 'cat-food', image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500&auto=format&fit=crop&q=80', itemCount: 16 },
      { id: 'sub-pet-treats', categoryId: 'cat-pet-supplies', name: 'Pet treats', slug: 'pet-treats', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&auto=format&fit=crop&q=80', itemCount: 14 },
      { id: 'sub-pet-hygiene', categoryId: 'cat-pet-supplies', name: 'Pet hygiene products', slug: 'pet-hygiene', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&auto=format&fit=crop&q=80', itemCount: 12 },
      { id: 'sub-pet-accessories', categoryId: 'cat-pet-supplies', name: 'Pet accessories', slug: 'pet-accessories', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&auto=format&fit=crop&q=80', itemCount: 18 }
    ]
  },
  {
    id: 'cat-home-kitchen',
    name: 'Home & Kitchen',
    slug: 'home-kitchen',
    icon: 'UtensilsCrossed',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80',
    description: 'Cookware, non-stick frying pans, dining plates, glassware, cutlery & food storage sets.',
    subcategories: [
      { id: 'sub-plates', categoryId: 'cat-home-kitchen', name: 'Plates', slug: 'plates', image: 'https://images.unsplash.com/photo-1584990347449-3a3f0580bfb9?w=500&auto=format&fit=crop&q=80', itemCount: 16 },
      { id: 'sub-cups', categoryId: 'cat-home-kitchen', name: 'Cups', slug: 'cups', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=80', itemCount: 14 },
      { id: 'sub-glasses', categoryId: 'cat-home-kitchen', name: 'Glasses', slug: 'glasses', image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=500&auto=format&fit=crop&q=80', itemCount: 15 },
      { id: 'sub-cooking-utensils', categoryId: 'cat-home-kitchen', name: 'Cooking utensils', slug: 'cooking-utensils', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&auto=format&fit=crop&q=80', itemCount: 22 },
      { id: 'sub-pots', categoryId: 'cat-home-kitchen', name: 'Pots', slug: 'pots', image: 'https://images.unsplash.com/photo-1584990347449-3a3f0580bfb9?w=500&auto=format&fit=crop&q=80', itemCount: 18 },
      { id: 'sub-pans', categoryId: 'cat-home-kitchen', name: 'Pans', slug: 'pans', image: 'https://images.unsplash.com/photo-1584990347449-3a3f0580bfb9?w=500&auto=format&fit=crop&q=80', itemCount: 16 },
      { id: 'sub-cutlery', categoryId: 'cat-home-kitchen', name: 'Cutlery', slug: 'cutlery', image: 'https://images.unsplash.com/photo-1584990347449-3a3f0580bfb9?w=500&auto=format&fit=crop&q=80', itemCount: 14 },
      { id: 'sub-storage-containers', categoryId: 'cat-home-kitchen', name: 'Storage containers', slug: 'storage-containers', image: 'https://images.unsplash.com/photo-1584990347449-3a3f0580bfb9?w=500&auto=format&fit=crop&q=80', itemCount: 20 },
      { id: 'sub-kitchen-accessories', categoryId: 'cat-home-kitchen', name: 'Kitchen accessories', slug: 'kitchen-accessories', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&auto=format&fit=crop&q=80', itemCount: 25 },
      { id: 'sub-home-accessories', categoryId: 'cat-home-kitchen', name: 'Home accessories', slug: 'home-accessories', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&auto=format&fit=crop&q=80', itemCount: 24 }
    ]
  },
  {
    id: 'cat-electronics',
    name: 'Electronics',
    slug: 'electronics',
    icon: 'Smartphone',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&auto=format&fit=crop&q=80',
    description: 'Smartphones, fast chargers, earbuds, power banks, batteries & small household appliances.',
    subcategories: [
      { id: 'sub-phones', categoryId: 'cat-electronics', name: 'Phones', slug: 'phones', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=80', itemCount: 35 },
      { id: 'sub-chargers', categoryId: 'cat-electronics', name: 'Chargers', slug: 'chargers', image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&auto=format&fit=crop&q=80', itemCount: 28 },
      { id: 'sub-earphones', categoryId: 'cat-electronics', name: 'Earphones', slug: 'earphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80', itemCount: 24 },
      { id: 'sub-headphones', categoryId: 'cat-electronics', name: 'Headphones', slug: 'headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80', itemCount: 20 },
      { id: 'sub-power-banks', categoryId: 'cat-electronics', name: 'Power banks', slug: 'power-banks', image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&auto=format&fit=crop&q=80', itemCount: 22 },
      { id: 'sub-batteries', categoryId: 'cat-electronics', name: 'Batteries', slug: 'batteries', image: 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?w=500&auto=format&fit=crop&q=80', itemCount: 16 },
      { id: 'sub-speakers', categoryId: 'cat-electronics', name: 'Speakers', slug: 'speakers', image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&auto=format&fit=crop&q=80', itemCount: 18 },
      { id: 'sub-smart-watches', categoryId: 'cat-electronics', name: 'Smart watches', slug: 'smart-watches', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80', itemCount: 15 },
      { id: 'sub-small-appliances', categoryId: 'cat-electronics', name: 'Small appliances', slug: 'small-appliances', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&auto=format&fit=crop&q=80', itemCount: 20 },
      { id: 'sub-cables', categoryId: 'cat-electronics', name: 'Cables', slug: 'cables', image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&auto=format&fit=crop&q=80', itemCount: 25 }
    ]
  },
  {
    id: 'cat-stationery-school',
    name: 'Stationery & School',
    slug: 'stationery-school',
    icon: 'BookOpen',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=80',
    description: 'School exercise books, pens, backpacks, geometric sets and office supplies for home and work.',
    subcategories: [
      { id: 'sub-pens', categoryId: 'cat-stationery-school', name: 'Pens', slug: 'pens', image: 'https://images.unsplash.com/photo-1585336261026-41804f3db622?w=500&auto=format&fit=crop&q=80', itemCount: 20 },
      { id: 'sub-pencils', categoryId: 'cat-stationery-school', name: 'Pencils', slug: 'pencils', image: 'https://images.unsplash.com/photo-1585336261026-41804f3db622?w=500&auto=format&fit=crop&q=80', itemCount: 14 },
      { id: 'sub-notebooks', categoryId: 'cat-stationery-school', name: 'Notebooks', slug: 'notebooks', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80', itemCount: 25 },
      { id: 'sub-exercise-books', categoryId: 'cat-stationery-school', name: 'Exercise books', slug: 'exercise-books', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80', itemCount: 22 },
      { id: 'sub-school-bags', categoryId: 'cat-stationery-school', name: 'School bags', slug: 'school-bags', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80', itemCount: 18 },
      { id: 'sub-backpacks', categoryId: 'cat-stationery-school', name: 'Backpacks', slug: 'backpacks', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80', itemCount: 20 },
      { id: 'sub-office-supplies', categoryId: 'cat-stationery-school', name: 'Office supplies', slug: 'office-supplies', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&auto=format&fit=crop&q=80', itemCount: 30 }
    ]
  },
  {
    id: 'cat-clothing-fashion',
    name: 'Clothing & Fashion',
    slug: 'clothing-fashion',
    icon: 'Shirt',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop&q=80',
    description: 'Casual shirts, African print dresses, sneakers, sandals, belts, caps & fashion accessories.',
    subcategories: [
      { id: 'sub-tshirts', categoryId: 'cat-clothing-fashion', name: 'T-shirts', slug: 't-shirts', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=80', itemCount: 30 },
      { id: 'sub-shirts', categoryId: 'cat-clothing-fashion', name: 'Shirts', slug: 'shirts', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&auto=format&fit=crop&q=80', itemCount: 25 },
      { id: 'sub-trousers', categoryId: 'cat-clothing-fashion', name: 'Trousers', slug: 'trousers', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&auto=format&fit=crop&q=80', itemCount: 22 },
      { id: 'sub-dresses', categoryId: 'cat-clothing-fashion', name: 'Dresses', slug: 'dresses', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop&q=80', itemCount: 28 },
      { id: 'sub-shoes', categoryId: 'cat-clothing-fashion', name: 'Shoes', slug: 'shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80', itemCount: 32 },
      { id: 'sub-sneakers', categoryId: 'cat-clothing-fashion', name: 'Sneakers', slug: 'sneakers', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80', itemCount: 26 },
      { id: 'sub-sandals', categoryId: 'cat-clothing-fashion', name: 'Sandals', slug: 'sandals', image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=500&auto=format&fit=crop&q=80', itemCount: 18 },
      { id: 'sub-bags', categoryId: 'cat-clothing-fashion', name: 'Bags', slug: 'bags', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&auto=format&fit=crop&q=80', itemCount: 24 },
      { id: 'sub-belts', categoryId: 'cat-clothing-fashion', name: 'Belts', slug: 'belts', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80', itemCount: 12 },
      { id: 'sub-hats', categoryId: 'cat-clothing-fashion', name: 'Hats', slug: 'hats', image: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=500&auto=format&fit=crop&q=80', itemCount: 15 }
    ]
  },
  {
    id: 'cat-baby-kids-toys',
    name: 'Baby, Kids & Toys',
    slug: 'baby-kids-toys',
    icon: 'Gamepad2',
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&auto=format&fit=crop&q=80',
    description: 'Educational puzzles, board games, children’s storybooks, active toys and toddler entertainment.',
    subcategories: [
      { id: 'sub-toys', categoryId: 'cat-baby-kids-toys', name: 'Toys', slug: 'toys', image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=500&auto=format&fit=crop&q=80', itemCount: 25 },
      { id: 'sub-games', categoryId: 'cat-baby-kids-toys', name: 'Games', slug: 'games', image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=500&auto=format&fit=crop&q=80', itemCount: 20 },
      { id: 'sub-educational-toys', categoryId: 'cat-baby-kids-toys', name: 'Educational toys', slug: 'educational-toys', image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500&auto=format&fit=crop&q=80', itemCount: 22 },
      { id: 'sub-childrens-books', categoryId: 'cat-baby-kids-toys', name: "Children's books", slug: 'childrens-books', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&auto=format&fit=crop&q=80', itemCount: 18 },
      { id: 'sub-sports-toys', categoryId: 'cat-baby-kids-toys', name: 'Sports toys', slug: 'sports-toys', image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=500&auto=format&fit=crop&q=80', itemCount: 16 },
      { id: 'sub-kids-accessories', categoryId: 'cat-baby-kids-toys', name: 'Baby accessories', slug: 'baby-accessories-kids', image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&auto=format&fit=crop&q=80', itemCount: 15 }
    ]
  },
  {
    id: 'cat-health-wellness',
    name: 'Health & Wellness',
    slug: 'health-wellness',
    icon: 'Activity',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80',
    description: 'First aid kits, wellness supplements, personal sanitizers, herbal lozenges and fitness bands.',
    subcategories: [
      { id: 'sub-personal-hygiene', categoryId: 'cat-health-wellness', name: 'Personal hygiene products', slug: 'personal-hygiene-health', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80', itemCount: 25 },
      { id: 'sub-vitamins-wellness', categoryId: 'cat-health-wellness', name: 'Vitamins and wellness products', slug: 'vitamins-wellness', image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500&auto=format&fit=crop&q=80', itemCount: 20 },
      { id: 'sub-first-aid', categoryId: 'cat-health-wellness', name: 'First-aid essentials', slug: 'first-aid', image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=500&auto=format&fit=crop&q=80', itemCount: 16 },
      { id: 'sub-fitness-accessories', categoryId: 'cat-health-wellness', name: 'Fitness accessories', slug: 'fitness-accessories', image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=80', itemCount: 18 }
    ]
  },
  {
    id: 'cat-automotive-accessories',
    name: 'Automotive & Accessories',
    slug: 'automotive-accessories',
    icon: 'Car',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80',
    description: 'Car shampoos, luxury air fresheners, microfiber wash cloths, phone mounts & motorbike gear.',
    subcategories: [
      { id: 'sub-car-cleaning', categoryId: 'cat-automotive-accessories', name: 'Car cleaning products', slug: 'car-cleaning', image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=500&auto=format&fit=crop&q=80', itemCount: 18 },
      { id: 'sub-motorbike-accessories', categoryId: 'cat-automotive-accessories', name: 'Motorbike accessories', slug: 'motorbike-accessories', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=500&auto=format&fit=crop&q=80', itemCount: 15 },
      { id: 'sub-car-accessories', categoryId: 'cat-automotive-accessories', name: 'Car accessories', slug: 'car-accessories', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format&fit=crop&q=80', itemCount: 22 },
      { id: 'sub-air-fresheners', categoryId: 'cat-automotive-accessories', name: 'Air fresheners', slug: 'air-fresheners', image: 'https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?w=500&auto=format&fit=crop&q=80', itemCount: 14 },
      { id: 'sub-basic-maintenance', categoryId: 'cat-automotive-accessories', name: 'Basic maintenance products', slug: 'basic-maintenance', image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=500&auto=format&fit=crop&q=80', itemCount: 16 }
    ]
  },
  {
    id: 'cat-gifts-special-occasions',
    name: 'Gifts & Special Occasions',
    slug: 'gifts-special-occasions',
    icon: 'Gift',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80',
    description: 'Fresh flower bouquets, luxury gift hampers, birthday chocolates, personalized keepsakes and secret surprise packages.',
    subcategories: [
      { id: 'sub-flowers', categoryId: 'cat-gifts-special-occasions', name: 'Flowers', slug: 'flowers', image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=500&auto=format&fit=crop&q=80', itemCount: 25 },
      { id: 'sub-gift-boxes', categoryId: 'cat-gifts-special-occasions', name: 'Gift boxes', slug: 'gift-boxes', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop&q=80', itemCount: 28 },
      { id: 'sub-birthday-gifts', categoryId: 'cat-gifts-special-occasions', name: 'Birthday gifts', slug: 'birthday-gifts', image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500&auto=format&fit=crop&q=80', itemCount: 30 },
      { id: 'sub-gift-chocolates', categoryId: 'cat-gifts-special-occasions', name: 'Chocolates', slug: 'gift-chocolates', image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=500&auto=format&fit=crop&q=80', itemCount: 22 },
      { id: 'sub-greeting-cards', categoryId: 'cat-gifts-special-occasions', name: 'Greeting cards', slug: 'greeting-cards', image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500&auto=format&fit=crop&q=80', itemCount: 18 },
      { id: 'sub-gift-perfumes', categoryId: 'cat-gifts-special-occasions', name: 'Perfumes', slug: 'gift-perfumes', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&auto=format&fit=crop&q=80', itemCount: 24 },
      { id: 'sub-personalized-gifts', categoryId: 'cat-gifts-special-occasions', name: 'Personalized gifts', slug: 'personalized-gifts', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&auto=format&fit=crop&q=80', itemCount: 20 },
      { id: 'sub-surprise-packages', categoryId: 'cat-gifts-special-occasions', name: 'Surprise Gift packages', slug: 'surprise-packages', image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500&auto=format&fit=crop&q=80', itemCount: 26 }
    ]
  }
];
