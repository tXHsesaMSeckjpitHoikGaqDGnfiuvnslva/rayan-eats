import { cn } from '@/lib/utils';
import { DietaryType } from '@/types/menu';

interface VegBadgeProps {
  type: DietaryType;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export function VegBadge({ type, size = 'md', showLabel = false, className }: VegBadgeProps) {
  const isVeg = type === 'veg';
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };
  
  const dotSizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
  };
  
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <div
        className={cn(
          'inline-flex items-center justify-center rounded border-2',
          sizeClasses[size],
          isVeg ? 'border-success' : 'border-destructive'
        )}
        aria-label={isVeg ? 'Vegetarian' : 'Non-vegetarian'}
      >
        {isVeg ? (
          <div className={cn('rounded-full bg-success', dotSizeClasses[size])} />
        ) : (
          <div 
            className={cn(
              'w-0 h-0',
              size === 'sm' && 'border-l-[4px] border-r-[4px] border-b-[6px]',
              size === 'md' && 'border-l-[5px] border-r-[5px] border-b-[8px]',
              size === 'lg' && 'border-l-[6px] border-r-[6px] border-b-[10px]',
              'border-l-transparent border-r-transparent border-b-destructive'
            )} 
          />
        )}
      </div>
      {showLabel && (
        <span className={cn(
          'text-xs font-medium',
          isVeg ? 'text-success' : 'text-destructive'
        )}>
          {isVeg ? 'Veg' : 'Non-Veg'}
        </span>
      )}
    </div>
  );
}
