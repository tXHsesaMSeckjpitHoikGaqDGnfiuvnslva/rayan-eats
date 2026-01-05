import { useState } from 'react';
import { categories, menuItems, getBestSellers } from '@/data/menu';
import { MenuItemCard } from './MenuItemCard';
import { VegBadge } from './VegBadge';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { DietaryType } from '@/types/menu';

interface MenuSectionProps {
  showFilters?: boolean;
  showCategories?: boolean;
  compact?: boolean;
  maxItems?: number;
}

type FilterType = 'all' | 'veg' | 'nonveg';

export function MenuSection({ 
  showFilters = true, 
  showCategories = true,
  compact = false,
  maxItems
}: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [dietaryFilter, setDietaryFilter] = useState<FilterType>('all');
  
  const filteredItems = menuItems.filter(item => {
    if (selectedCategory && item.category !== selectedCategory) return false;
    if (dietaryFilter === 'veg' && item.dietaryType !== 'veg') return false;
    if (dietaryFilter === 'nonveg' && item.dietaryType !== 'nonveg') return false;
    return true;
  });
  
  const displayedItems = maxItems ? filteredItems.slice(0, maxItems) : filteredItems;
  
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };
  
  return (
    <div className="space-y-6">
      {/* Filters */}
      {showFilters && (
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">Filter:</span>
          <div className="flex items-center gap-2">
            <Button
              variant={dietaryFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDietaryFilter('all')}
            >
              All
            </Button>
            <Button
              variant={dietaryFilter === 'veg' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDietaryFilter('veg')}
              className={cn(
                dietaryFilter === 'veg' && "bg-success hover:bg-success/90"
              )}
            >
              <VegBadge type="veg" size="sm" />
              <span className="ml-1">Veg</span>
            </Button>
            <Button
              variant={dietaryFilter === 'nonveg' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDietaryFilter('nonveg')}
              className={cn(
                dietaryFilter === 'nonveg' && "bg-destructive hover:bg-destructive/90"
              )}
            >
              <VegBadge type="nonveg" size="sm" />
              <span className="ml-1">Non-Veg</span>
            </Button>
          </div>
        </div>
      )}
      
      {/* Categories */}
      {showCategories && (
        <ScrollArea className="w-full">
          <div className="flex gap-2 pb-2">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className="shrink-0"
            >
              All Items
            </Button>
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleCategoryClick(category.id)}
                className="shrink-0"
              >
                <span className="mr-1">{category.icon}</span>
                {category.name}
                <span className="ml-1 text-xs opacity-70">({category.itemCount})</span>
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}
      
      {/* Menu Grid */}
      <div className={cn(
        "grid gap-4",
        compact 
          ? "grid-cols-1 sm:grid-cols-2" 
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      )}>
        {displayedItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <MenuItemCard item={item} compact={compact} />
          </motion.div>
        ))}
      </div>
      
      {displayedItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No items found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}

export function BestSellersSection() {
  const bestSellers = getBestSellers();
  
  return (
    <div className="space-y-4">
      <ScrollArea className="w-full">
        <div className="flex gap-4 pb-4">
          {bestSellers.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="w-[280px] shrink-0"
            >
              <MenuItemCard item={item} />
            </motion.div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
