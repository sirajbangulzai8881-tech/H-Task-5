import { FoodItem } from '../types';

export const CANTEEN_MENU: FoodItem[] = [
  {
    id: 'food-1',
    name: 'Crispy Zinger Chicken Burger',
    urduName: 'کرسپی زنگر برگر',
    description: 'Golden crispy chicken fillet with fresh iceberg lettuce, creamy garlic mayo in a toasted sesame bun.',
    ingredients: ['Crispy Chicken Fillet', 'Iceberg Lettuce', 'Garlic Mayo', 'Sesame Bun', 'Secret Canteen Herb Blend'],
    price: 240,
    category: 'snacks',
    dietary: 'non-veg',
    isPopular: true,
    isSpecial: true,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    prepTime: '4-6 mins',
    calories: 420,
    badgeText: 'Student Favorite',
    availableCustomizations: [
      { id: 'opt-cheese', name: 'Extra Cheddar Cheese Slice', price: 30, type: 'addon' },
      { id: 'opt-patty', name: 'Double Chicken Patty', price: 90, type: 'addon' },
      { id: 'opt-dip', name: 'Signature Spicy Dip', price: 20, type: 'addon' },
      { id: 'opt-onion', name: 'Add Caramelized Onions', price: 15, type: 'addon' }
    ]
  },
  {
    id: 'food-2',
    name: 'Crispy Punjabi Samosa Chaat (2 Pcs)',
    urduName: 'سموسہ چاٹ',
    description: 'Warm crispy potato samosas crushed over spiced chickpeas, tangy tamarind chutney, and fresh mint yogurt.',
    ingredients: ['Spiced Potato Samosas', 'Chole Curry', 'Imli Chutney', 'Mint Raita', 'Sev Crisp', 'Diced Onions'],
    price: 130,
    category: 'snacks',
    dietary: 'veg',
    isPopular: true,
    isSpecial: false,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    prepTime: '2-3 mins',
    calories: 310,
    availableCustomizations: [
      { id: 'opt-extra-chutney', name: 'Extra Tamarind Chutney', price: 15, type: 'addon' },
      { id: 'opt-extra-dahi', name: 'Extra Whisked Sweet Yogurt', price: 20, type: 'addon' },
      { id: 'opt-sev', name: 'Extra Crunchy Sev topping', price: 10, type: 'addon' }
    ]
  },
  {
    id: 'food-3',
    name: 'Grilled Chicken & Cheese Club Sandwich',
    urduName: 'چکن کلب سینڈوچ',
    description: 'Triple decker toasted sandwich packed with shredded herb chicken, fried egg, cheese slice, and tomato cucumber.',
    ingredients: ['Toasted White Bread', 'Tender Shredded Chicken', 'Farm Egg', 'Cheddar Slice', 'Cucumber & Tomato', 'Butter Mayo'],
    price: 210,
    category: 'snacks',
    dietary: 'non-veg',
    isPopular: false,
    isSpecial: true,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    prepTime: '5-7 mins',
    calories: 380,
    availableCustomizations: [
      { id: 'opt-brown-bread', name: 'Whole Wheat Brown Bread', price: 20, type: 'addon' },
      { id: 'opt-cheese', name: 'Extra Cheese Slice', price: 30, type: 'addon' },
      { id: 'opt-fries-side', name: 'Mini French Fries on side', price: 45, type: 'addon' }
    ]
  },
  {
    id: 'food-4',
    name: 'Chicken Dum Biryani Pot (Student Box)',
    urduName: 'چکن دم بریانی',
    description: 'Aromatic long-grain basmati rice slow-cooked with succulent marinated chicken, saffron, mint, served with fresh raita.',
    ingredients: ['Aged Basmati Rice', 'Chicken Drumstick & Thigh', 'Fried Onions', 'Coriander Mint', 'Cucumber Raita', 'Boiled Egg'],
    price: 260,
    category: 'hot-meals',
    dietary: 'non-veg',
    isPopular: true,
    isSpecial: true,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    prepTime: '3-4 mins',
    calories: 540,
    badgeText: 'Chef’s Special',
    availableCustomizations: [
      { id: 'opt-egg', name: 'Extra Boiled Egg', price: 25, type: 'addon' },
      { id: 'opt-extra-raita', name: 'Large Raita & Salad Cup', price: 25, type: 'addon' },
      { id: 'opt-extra-gravy', name: 'Spicy Biryani Shorba Cup', price: 20, type: 'addon' }
    ]
  },
  {
    id: 'food-5',
    name: 'Creamy Cheesy White Sauce Pasta Bowl',
    urduName: 'چیزی وائٹ ساس پاستا',
    description: 'Penne pasta tossed in rich velvety Alfredo sauce with bell peppers, sweet corn, Italian oregano, and melted mozzarella.',
    ingredients: ['Durum Penne Pasta', 'Butter Garlic Roux', 'Full Cream Milk', 'Sweet Corn', 'Bell Peppers', 'Melted Mozzarella'],
    price: 220,
    category: 'hot-meals',
    dietary: 'veg',
    isPopular: false,
    isSpecial: false,
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281290?auto=format&fit=crop&w=800&q=80',
    prepTime: '5-6 mins',
    calories: 460,
    availableCustomizations: [
      { id: 'opt-garlic-bread', name: 'Toasted Garlic Bread (2 Pcs)', price: 40, type: 'addon' },
      { id: 'opt-extra-mozzarella', name: 'Double Baked Mozzarella', price: 35, type: 'addon' },
      { id: 'opt-olives', name: 'Black Olives & Jalapenos', price: 25, type: 'addon' }
    ]
  },
  {
    id: 'food-6',
    name: 'Crispy Veg Patty Roll (Kathi Wrap)',
    urduName: 'ویجیٹیبل کاٹھی رول',
    description: 'Crispy spiced vegetable fingers rolled in a flaky griddled paratha with pickled onion rings and mint coriander chutney.',
    ingredients: ['Crisp Veg Cutlet', 'Griddled Paratha', 'Pickled Red Onions', 'Green Chutney', 'Chat Masala Spritz'],
    price: 150,
    category: 'hot-meals',
    dietary: 'veg',
    isPopular: false,
    isSpecial: false,
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    prepTime: '4-5 mins',
    calories: 340,
    availableCustomizations: [
      { id: 'opt-cheese', name: 'Add Melted Cheese', price: 30, type: 'addon' },
      { id: 'opt-extra-dip', name: 'Spicy Garlic Mayo', price: 20, type: 'addon' }
    ]
  },
  {
    id: 'food-7',
    name: 'Peri-Peri Loaded French Fries',
    urduName: 'پیری پیری فرائز',
    description: 'Freshly fried golden potato fries dusted in tangy African peri-peri seasoning and drizzled with warm cheddar cheese sauce.',
    ingredients: ['Fresh Cut Potatoes', 'Peri-Peri Spice Rub', 'Warm Cheddar Sauce', 'Spring Onion Garnish'],
    price: 140,
    category: 'snacks',
    dietary: 'veg',
    isPopular: true,
    isSpecial: false,
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80',
    prepTime: '3-4 mins',
    calories: 320,
    availableCustomizations: [
      { id: 'opt-extra-cheese-drizzle', name: 'Double Cheese Drizzle', price: 25, type: 'addon' },
      { id: 'opt-jalapeno-bits', name: 'Spicy Jalapeno Slices', price: 15, type: 'addon' }
    ]
  },
  {
    id: 'food-8',
    name: 'Fresh Mango Blossom Smoothie Cup',
    urduName: 'مینگو سموتھی',
    description: 'Chilled thick smoothie blended with ripe mango pulp, probiotic yogurt, honey, and crushed ice, topped with chia seeds.',
    ingredients: ['Fresh Mango Pulp', 'Greek Sweet Yogurt', 'Organic Honey', 'Crushed Ice', 'Chia Seed Sprinkles'],
    price: 160,
    category: 'drinks',
    dietary: 'veg',
    isPopular: true,
    isSpecial: true,
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80',
    prepTime: '2 mins',
    calories: 190,
    badgeText: 'Summer Cool',
    availableCustomizations: [
      { id: 'opt-less-sugar', name: 'Low Sugar / No Added Sugar', price: 0, type: 'addon' },
      { id: 'opt-boba-pearls', name: 'Honey Tapioca Boba Pearls', price: 30, type: 'addon' },
      { id: 'opt-extra-scoop', name: 'Vanilla Ice Cream Scoop', price: 35, type: 'addon' }
    ]
  },
  {
    id: 'food-9',
    name: 'Chilled Chocolate Milo Monster Shake',
    urduName: 'کولڈ مائلو شیک',
    description: 'Classic schoolyard favorite iced malt chocolate drink with chocolate syrup drizzle and crunchy malt wafer dust on top.',
    ingredients: ['Nestle Milo Malt', 'Chilled Fresh Milk', 'Chocolate Drizzle', 'Crunchy Milo Nuggets', 'Ice'],
    price: 140,
    category: 'drinks',
    dietary: 'veg',
    isPopular: true,
    isSpecial: false,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    prepTime: '2 mins',
    calories: 230,
    availableCustomizations: [
      { id: 'opt-extra-milo-powder', name: 'Extra Heaped Milo Mountain Top', price: 20, type: 'addon' },
      { id: 'opt-whipped-cream', name: 'Fluffy Whipped Cream Swirl', price: 25, type: 'addon' }
    ]
  },
  {
    id: 'food-10',
    name: 'Fresh Mint Lemonade Cooler',
    urduName: 'پودینہ لیمونیڈ',
    description: 'Zesty freshly squeezed lemon juice infused with garden mint leaves, black salt, and sparkling cold soda.',
    ingredients: ['Fresh Lemon Juice', 'Crushed Mint Sprigs', 'Kala Namak', 'Chilled Sparkling Soda', 'Cane Syrup'],
    price: 90,
    category: 'drinks',
    dietary: 'veg',
    isPopular: false,
    isSpecial: false,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    prepTime: '2 mins',
    calories: 75,
    availableCustomizations: [
      { id: 'opt-extra-lemon', name: 'Extra Tangy Lemon Shot', price: 10, type: 'addon' },
      { id: 'opt-sugar-free', name: 'Sugar Free (Stevia)', price: 0, type: 'addon' }
    ]
  },
  {
    id: 'food-11',
    name: 'Rainbow Fresh Fruit & Nut Salad Bowl',
    urduName: 'فروٹ چاٹ باؤل',
    description: 'Seasonal diced apples, bananas, pomegranate pearls, sweet melon, tossed in fresh orange reduction with crushed almonds.',
    ingredients: ['Crisp Red Apple', 'Cavendish Banana', 'Ruby Pomegranate', 'Honeydew Melon', 'Roasted Almond Slices', 'Citrus Glaze'],
    price: 150,
    category: 'healthy',
    dietary: 'veg',
    isPopular: false,
    isSpecial: true,
    image: 'https://images.unsplash.com/photo-1568827999250-3f9b2d861633?auto=format&fit=crop&w=800&q=80',
    prepTime: '3 mins',
    calories: 140,
    badgeText: '100% Fresh',
    availableCustomizations: [
      { id: 'opt-honey', name: 'Pure Honey Drizzle', price: 15, type: 'addon' },
      { id: 'opt-nuts', name: 'Extra Cashews & Walnuts', price: 30, type: 'addon' },
      { id: 'opt-chaat-masala', name: 'Zesty Chaat Masala Sprinkle', price: 0, type: 'addon' }
    ]
  },
  {
    id: 'food-12',
    name: 'Grilled Herb Chicken & Quinoa Salad',
    urduName: 'گرلڈ چکن پروٹین سلاد',
    description: 'Juicy sliced grilled chicken breast with organic quinoa, cherry tomatoes, crisp lettuce, and light honey-dijon vinaigrette.',
    ingredients: ['Herb-Grilled Chicken Breast', 'Tri-Color Quinoa', 'Cherry Tomatoes', 'English Cucumber', 'Dijon Vinaigrette'],
    price: 250,
    category: 'healthy',
    dietary: 'non-veg',
    isPopular: true,
    isSpecial: false,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    prepTime: '4 mins',
    calories: 280,
    badgeText: 'High Protein',
    availableCustomizations: [
      { id: 'opt-extra-chicken', name: 'Extra Grilled Chicken (50g)', price: 70, type: 'addon' },
      { id: 'opt-dressing-side', name: 'Dressing on the side', price: 0, type: 'addon' },
      { id: 'opt-feta', name: 'Crumbled Greek Feta Cheese', price: 35, type: 'addon' }
    ]
  }
];

export const BREAK_SLOTS = [
  {
    id: '10:30 AM First Break (Recess)',
    label: '10:30 AM First Break (Recess)',
    timeRemaining: 'Starts in 45 mins',
    subtext: 'Express counter pickup #1 & #2',
    iconName: 'Coffee'
  },
  {
    id: '1:00 PM Lunch Break',
    label: '1:00 PM Lunch Break (Main)',
    timeRemaining: 'Starts in 3 hrs 15 mins',
    subtext: 'Hot meals & main buffet ready',
    iconName: 'Utensils'
  },
  {
    id: '3:15 PM After-School Club',
    label: '3:15 PM After-School Club / Sports',
    timeRemaining: 'Starts at 3:15 PM',
    subtext: 'Snacks & coolers pickup',
    iconName: 'Clock'
  }
];
