import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, MenuItem, SpiceLevel, PortionSize, Addon, Cart } from '@/types/menu';

interface CartState extends Cart {}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { menuItem: MenuItem; quantity: number; portionSize: PortionSize; spiceLevel: SpiceLevel; selectedAddons: Addon[]; specialInstructions?: string } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'APPLY_COUPON'; payload: { code: string; discount: number } }
  | { type: 'REMOVE_COUPON' };

const DELIVERY_FEE = 40;
const TAX_RATE = 0.05; // 5% GST already included in prices, this is for display

const calculateItemTotal = (
  menuItem: MenuItem,
  quantity: number,
  portionSize: PortionSize,
  selectedAddons: Addon[]
): number => {
  const basePrice = portionSize === 'half' && menuItem.halfPrice ? menuItem.halfPrice : menuItem.price;
  const addonsTotal = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
  return (basePrice + addonsTotal) * quantity;
};

const recalculateTotals = (items: CartItem[], discount: number = 0): Omit<CartState, 'items' | 'couponCode'> => {
  const subtotal = items.reduce((sum, item) => sum + item.itemTotal, 0);
  const taxes = Math.round(subtotal * TAX_RATE);
  const deliveryFee = items.length > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee - discount;
  
  return { subtotal, taxes, deliveryFee, discount, total };
};

const initialState: CartState = {
  items: [],
  subtotal: 0,
  taxes: 0,
  deliveryFee: 0,
  discount: 0,
  total: 0,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { menuItem, quantity, portionSize, spiceLevel, selectedAddons, specialInstructions } = action.payload;
      const itemTotal = calculateItemTotal(menuItem, quantity, portionSize, selectedAddons);
      
      const newItem: CartItem = {
        id: `${menuItem.id}-${Date.now()}`,
        menuItem,
        quantity,
        portionSize,
        spiceLevel,
        selectedAddons,
        specialInstructions,
        itemTotal,
      };
      
      const newItems = [...state.items, newItem];
      const totals = recalculateTotals(newItems, state.discount);
      
      return { ...state, items: newItems, ...totals };
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const totals = recalculateTotals(newItems, state.discount);
      
      return { ...state, items: newItems, ...totals };
    }
    
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      
      if (quantity <= 0) {
        const newItems = state.items.filter(item => item.id !== id);
        const totals = recalculateTotals(newItems, state.discount);
        return { ...state, items: newItems, ...totals };
      }
      
      const newItems = state.items.map(item => {
        if (item.id === id) {
          const itemTotal = calculateItemTotal(item.menuItem, quantity, item.portionSize, item.selectedAddons);
          return { ...item, quantity, itemTotal };
        }
        return item;
      });
      
      const totals = recalculateTotals(newItems, state.discount);
      return { ...state, items: newItems, ...totals };
    }
    
    case 'CLEAR_CART': {
      return initialState;
    }
    
    case 'APPLY_COUPON': {
      const { code, discount } = action.payload;
      const totals = recalculateTotals(state.items, discount);
      return { ...state, ...totals, couponCode: code };
    }
    
    case 'REMOVE_COUPON': {
      const totals = recalculateTotals(state.items, 0);
      return { ...state, ...totals, couponCode: undefined };
    }
    
    default:
      return state;
  }
}

interface CartContextType {
  cart: CartState;
  addItem: (menuItem: MenuItem, quantity: number, portionSize: PortionSize, spiceLevel: SpiceLevel, selectedAddons: Addon[], specialInstructions?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  
  const addItem = (
    menuItem: MenuItem,
    quantity: number,
    portionSize: PortionSize,
    spiceLevel: SpiceLevel,
    selectedAddons: Addon[],
    specialInstructions?: string
  ) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { menuItem, quantity, portionSize, spiceLevel, selectedAddons, specialInstructions },
    });
  };
  
  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };
  
  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  const applyCoupon = (code: string, discount: number) => {
    dispatch({ type: 'APPLY_COUPON', payload: { code, discount } });
  };
  
  const removeCoupon = () => {
    dispatch({ type: 'REMOVE_COUPON' });
  };
  
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <CartContext.Provider value={{
      cart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      applyCoupon,
      removeCoupon,
      itemCount,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
