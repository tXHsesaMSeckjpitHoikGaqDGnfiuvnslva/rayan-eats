import { cn } from '@/lib/utils';
import { SpiceLevel } from '@/types/menu';
import { Flame } from 'lucide-react';

interface SpiceIndicatorProps {
  level: SpiceLevel;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const spiceConfig = {
  mild: { label: 'Mild', count: 1, color: 'text-yellow-500' },
  medium: { label: 'Medium', count: 2, color: 'text-orange-500' },
  hot: { label: 'Hot', count: 3, color: 'text-red-500' },
};

export function SpiceIndicator({ level, size = 'md', showLabel = false, className }: SpiceIndicatorProps) {
  const config = spiceConfig[level];
  
  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16,
  };
  
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center">
        {Array.from({ length: 3 }).map((_, i) => (
          <Flame
            key={i}
            size={iconSizes[size]}
            className={cn(
              'transition-colors',
              i < config.count ? config.color : 'text-muted-foreground/30'
            )}
            fill={i < config.count ? 'currentColor' : 'none'}
          />
        ))}
      </div>
      {showLabel && (
        <span className={cn('text-xs font-medium', config.color)}>
          {config.label}
        </span>
      )}
    </div>
  );
}
