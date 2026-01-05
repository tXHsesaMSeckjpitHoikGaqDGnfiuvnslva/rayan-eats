import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { VegBadge } from '@/components/VegBadge';
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const { cart, updateQuantity, removeItem, itemCount } = useCart();

  if (itemCount === 0) {
    return (
      <Layout>
        <div className="container-app py-16 md:py-24 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={40} className="text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-display font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added anything yet. Explore our menu!
            </p>
            <Link to="/menu">
              <Button size="lg">
                Browse Menu <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-app py-8 md:py-12">
        <h1 className="text-3xl font-display font-bold mb-8">Your Cart</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cart.items.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  exit={{ opacity: 0, x: -100 }}
                  className="bg-card rounded-xl p-4 border border-border"
                >
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg bg-secondary flex items-center justify-center text-3xl shrink-0">
                      🍽️
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <VegBadge type={item.menuItem.dietaryType} size="sm" />
                          <h3 className="font-semibold">{item.menuItem.name}</h3>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="iconSm"
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.portionSize === 'half' ? 'Half' : 'Full'} • {item.spiceLevel}
                        {item.selectedAddons.length > 0 && ` • +${item.selectedAddons.map(a => a.name).join(', ')}`}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="iconSm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus size={14} />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="iconSm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus size={14} />
                          </Button>
                        </div>
                        <span className="font-bold text-lg">₹{item.itemTotal}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl p-6 border border-border sticky top-24">
              <h2 className="font-display font-semibold text-lg mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{cart.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxes (incl.)</span>
                  <span>₹{cart.taxes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span>₹{cart.deliveryFee}</span>
                </div>
                {cart.discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Discount</span>
                    <span>-₹{cart.discount}</span>
                  </div>
                )}
                <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{cart.total}</span>
                </div>
              </div>
              <Button className="w-full mt-6" size="lg">
                Proceed to Checkout <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
