export type DietaryType = 'veg' | 'nonveg';
export type SpiceLevel = 'mild' | 'medium' | 'hot';
export type PortionSize = 'half' | 'full';

export interface Addon {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  nameHi?: string;
  nameMl?: string;
  description: string;
  descriptionHi?: string;
  descriptionMl?: string;
  price: number;
  halfPrice?: number;
  image: string;
  category: string;
  dietaryType: DietaryType;
  spiceLevel: SpiceLevel;
  allergens?: string[];
  isAvailable: boolean;
  isBestSeller?: boolean;
  addons?: Addon[];
  customizable?: boolean;
  preparationTime: number; // in minutes
}

export interface Category {
  id: string;
  name: string;
  nameHi?: string;
  nameMl?: string;
  icon: string;
  itemCount: number;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  portionSize: PortionSize;
  spiceLevel: SpiceLevel;
  selectedAddons: Addon[];
  specialInstructions?: string;
  itemTotal: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  taxes: number;
  deliveryFee: number;
  discount: number;
  total: number;
  couponCode?: string;
}

export type OrderType = 'delivery' | 'takeaway' | 'dinein';
export type OrderStatus = 'placed' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface DeliveryAddress {
  id: string;
  label: string;
  fullAddress: string;
  landmark?: string;
  pincode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Order {
  id: string;
  items: CartItem[];
  orderType: OrderType;
  status: OrderStatus;
  subtotal: number;
  taxes: number;
  deliveryFee: number;
  discount: number;
  total: number;
  couponCode?: string;
  deliveryAddress?: DeliveryAddress;
  scheduledFor?: Date;
  placedAt: Date;
  estimatedDelivery?: Date;
  paymentMethod: 'upi' | 'cod';
  isPaid: boolean;
}
