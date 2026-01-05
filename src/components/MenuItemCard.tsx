import { useState } from 'react';
import { MenuItem, SpiceLevel, PortionSize, Addon } from '@/types/menu';
import { VegBadge } from './VegBadge';
import { SpiceIndicator } from './SpiceIndicator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/contexts/CartContext';
import { Plus, Minus, Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface MenuItemCardProps {
  item: MenuItem;
  compact?: boolean;
}

export function MenuItemCard({ item, compact = false }: MenuItemCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [portionSize, setPortionSize] = useState<PortionSize>('full');
  const [spiceLevel, setSpiceLevel] = useState<SpiceLevel>(item.spiceLevel);
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  
  const { addItem } = useCart();
  
  const basePrice = portionSize === 'half' && item.halfPrice ? item.halfPrice : item.price;
  const addonsTotal = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
  const totalPrice = (basePrice + addonsTotal) * quantity;
  
  const handleAddonToggle = (addon: Addon) => {
    setSelectedAddons(prev => 
      prev.some(a => a.id === addon.id)
        ? prev.filter(a => a.id !== addon.id)
        : [...prev, addon]
    );
  };
  
  const handleAddToCart = () => {
    addItem(item, quantity, portionSize, spiceLevel, selectedAddons, specialInstructions);
    toast.success(`${item.name} added to cart`, {
      description: `${quantity}x ${portionSize === 'half' ? 'Half' : 'Full'} portion`,
    });
    setIsDialogOpen(false);
    resetForm();
  };
  
  const handleQuickAdd = () => {
    if (item.customizable || (item.addons && item.addons.length > 0) || item.halfPrice) {
      setIsDialogOpen(true);
    } else {
      addItem(item, 1, 'full', item.spiceLevel, [], undefined);
      toast.success(`${item.name} added to cart`);
    }
  };
  
  const resetForm = () => {
    setQuantity(1);
    setPortionSize('full');
    setSpiceLevel(item.spiceLevel);
    setSelectedAddons([]);
    setSpecialInstructions('');
  };
  
  if (compact) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-card rounded-xl p-4 shadow-sm border border-border hover:shadow-md transition-shadow"
      >
        <div className="flex gap-3">
          <div className="w-20 h-20 rounded-lg bg-secondary overflow-hidden shrink-0">
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl">
              🍽️
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <VegBadge type={item.dietaryType} size="sm" />
                <h3 className="font-medium text-sm truncate">{item.name}</h3>
              </div>
              {item.isBestSeller && (
                <Badge variant="bestseller" className="shrink-0 text-[10px] px-1.5 py-0">
                  <Star size={10} className="mr-0.5" fill="currentColor" />
                  Best
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{item.description}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="font-semibold text-sm">₹{item.price}</span>
              <Button size="sm" variant="soft" className="h-7 text-xs" onClick={handleQuickAdd}>
                <Plus size={14} />
                Add
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-lg transition-all duration-300 group"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] bg-secondary overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-5xl">
            🍽️
          </div>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <VegBadge type={item.dietaryType} size="md" />
            {item.isBestSeller && (
              <Badge variant="bestseller" className="text-xs">
                <Star size={12} className="mr-1" fill="currentColor" />
                Bestseller
              </Badge>
            )}
          </div>
          
          {/* Quick Add Button */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              size="icon" 
              variant="default"
              className="rounded-full shadow-lg"
              onClick={handleQuickAdd}
            >
              <Plus size={20} />
            </Button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display font-semibold text-lg leading-tight">{item.name}</h3>
            <SpiceIndicator level={item.spiceLevel} size="sm" />
          </div>
          
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
          
          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
            <Clock size={12} />
            <span>{item.preparationTime} min</span>
            {item.allergens && item.allergens.length > 0 && (
              <>
                <span>•</span>
                <span className="text-destructive">Contains: {item.allergens.join(', ')}</span>
              </>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-xl">₹{item.price}</span>
              {item.halfPrice && (
                <span className="text-sm text-muted-foreground">Half: ₹{item.halfPrice}</span>
              )}
            </div>
            <Button size="sm" onClick={() => setIsDialogOpen(true)}>
              <Plus size={16} />
              Add
            </Button>
          </div>
        </div>
      </motion.div>
      
      {/* Customization Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <VegBadge type={item.dietaryType} />
              <DialogTitle className="font-display">{item.name}</DialogTitle>
            </div>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Portion Size */}
            {item.halfPrice && (
              <div className="space-y-3">
                <Label className="text-base font-semibold">Portion Size</Label>
                <RadioGroup 
                  value={portionSize} 
                  onValueChange={(v) => setPortionSize(v as PortionSize)}
                  className="grid grid-cols-2 gap-3"
                >
                  <Label 
                    htmlFor="half" 
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-colors",
                      portionSize === 'half' ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="half" id="half" />
                      <span>Half</span>
                    </div>
                    <span className="font-semibold">₹{item.halfPrice}</span>
                  </Label>
                  <Label 
                    htmlFor="full" 
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-colors",
                      portionSize === 'full' ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="full" id="full" />
                      <span>Full</span>
                    </div>
                    <span className="font-semibold">₹{item.price}</span>
                  </Label>
                </RadioGroup>
              </div>
            )}
            
            {/* Spice Level */}
            {item.customizable && (
              <div className="space-y-3">
                <Label className="text-base font-semibold">Spice Level</Label>
                <RadioGroup 
                  value={spiceLevel} 
                  onValueChange={(v) => setSpiceLevel(v as SpiceLevel)}
                  className="grid grid-cols-3 gap-3"
                >
                  {(['mild', 'medium', 'hot'] as SpiceLevel[]).map(level => (
                    <Label 
                      key={level}
                      htmlFor={level} 
                      className={cn(
                        "flex flex-col items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-colors",
                        spiceLevel === level ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      )}
                    >
                      <RadioGroupItem value={level} id={level} className="sr-only" />
                      <SpiceIndicator level={level} size="md" />
                      <span className="text-sm capitalize">{level}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            )}
            
            {/* Add-ons */}
            {item.addons && item.addons.length > 0 && (
              <div className="space-y-3">
                <Label className="text-base font-semibold">Add-ons</Label>
                <div className="space-y-2">
                  {item.addons.map(addon => (
                    <Label 
                      key={addon.id}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-colors",
                        selectedAddons.some(a => a.id === addon.id) 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox 
                          checked={selectedAddons.some(a => a.id === addon.id)}
                          onCheckedChange={() => handleAddonToggle(addon)}
                        />
                        <span>{addon.name}</span>
                      </div>
                      <span className="font-semibold text-primary">+₹{addon.price}</span>
                    </Label>
                  ))}
                </div>
              </div>
            )}
            
            {/* Special Instructions */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Special Instructions (Optional)</Label>
              <Textarea 
                placeholder="Any special requests? E.g., less oil, no onion..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="resize-none"
                rows={2}
              />
            </div>
            
            {/* Quantity */}
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Quantity</Label>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </Button>
                <span className="w-8 text-center font-semibold text-lg">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Add to Cart */}
          <Button 
            size="lg" 
            className="w-full" 
            onClick={handleAddToCart}
          >
            Add to Cart • ₹{totalPrice}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
