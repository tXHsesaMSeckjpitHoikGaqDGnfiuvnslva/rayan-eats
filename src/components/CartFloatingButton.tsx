import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export function CartFloatingButton() {
  const { cart, itemCount } = useCart();
  const location = useLocation();
  
  // Don't show on cart or checkout pages
  if (location.pathname === '/cart' || location.pathname === '/checkout') {
    return null;
  }
  
  return (
    <AnimatePresence>
      {itemCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 z-50"
        >
          <Link to="/cart">
            <Button 
              variant="cart" 
              size="lg" 
              className={cn(
                "w-full md:w-auto shadow-lg",
                "bg-gradient-to-r from-primary to-accent"
              )}
            >
              <ShoppingBag size={20} />
              <span className="flex-1 md:flex-none text-left md:text-center">
                {itemCount} {itemCount === 1 ? 'item' : 'items'} • ₹{cart.total}
              </span>
              <span className="text-primary-foreground/80">View Cart</span>
            </Button>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
