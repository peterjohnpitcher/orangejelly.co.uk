import { memo } from 'react';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'orange' | 'white' | 'charcoal';
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

function Loading({
  size = 'medium',
  color = 'orange',
  text,
  fullScreen = false,
  className = ''
}: LoadingProps) {
  const sizes = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const colors = {
    orange: 'border-orange',
    white: 'border-white',
    charcoal: 'border-charcoal'
  };

  const spinner = (
    <div className={`inline-flex flex-col items-center justify-center ${className}`}>
      <div className={`${sizes[size]} ${colors[color]} border-2 border-t-transparent rounded-full animate-spin`} />
      {text && (
        <p className={`mt-2 text-sm ${color === 'white' ? 'text-white' : 'text-charcoal'}`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-cream/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
}

// Skeleton loading component for content placeholders
interface SkeletonProps {
  className?: string;
  animate?: boolean;
}

export function Skeleton({ className = '', animate = true }: SkeletonProps) {
  return (
    <div 
      className={`bg-charcoal/10 rounded ${animate ? 'animate-pulse' : ''} ${className}`}
    />
  );
}

// Loading state for cards
export function CardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-soft p-6">
      <Skeleton className="h-6 w-3/4 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  );
}

// Loading state for buttons
export function ButtonLoading({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2">
      <Loading size="small" color="white" />
      {children}
    </span>
  );
}

export default memo(Loading);