export type FoodCategory = 'all' | 'snacks' | 'hot-meals' | 'drinks' | 'healthy';

export type DietaryType = 'veg' | 'non-veg';

export interface CustomizationOption {
  id: string;
  name: string;
  price: number;
  type: 'addon' | 'choice';
}

export interface FoodItem {
  id: string;
  name: string;
  urduName?: string;
  description: string;
  ingredients: string[];
  price: number; // In PKR / Rs.
  category: 'snacks' | 'hot-meals' | 'drinks' | 'healthy';
  dietary: DietaryType;
  isPopular?: boolean;
  isSpecial?: boolean;
  image: string;
  prepTime: string;
  calories: number;
  availableCustomizations: CustomizationOption[];
  badgeText?: string;
}

export interface CartItemOption {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  cartId: string;
  item: FoodItem;
  quantity: number;
  selectedOptions: CartItemOption[];
  spiceLevel: 'Mild' | 'Regular' | 'Extra Spicy';
  specialNote: string;
  unitPrice: number; // base + add-ons
  totalPrice: number; // unitPrice * quantity
}

export type BreakTimeSlot = 
  | '10:30 AM First Break (Recess)'
  | '1:00 PM Lunch Break'
  | '3:15 PM After-School Club';

export interface StudentDetails {
  name: string;
  gradeSection: string;
  rollNumber: string;
  paymentMode: 'Pay at Counter' | 'Campus Card Wallet';
}

export interface OrderToken {
  tokenId: string; // e.g. #TOKEN-42
  createdAt: string;
  student: StudentDetails;
  breakSlot: BreakTimeSlot;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  counterNumber: string;
  status: 'Confirmed & Queued' | 'Preparing' | 'Ready for Pickup';
  pickupEstimate: string;
}
