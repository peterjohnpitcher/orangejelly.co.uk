import { memo } from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'bordered' | 'shadowed' | 'colored';
  background?: 'white' | 'cream' | 'orange-light' | 'teal-dark';
  padding?: 'small' | 'medium' | 'large';
  className?: string;
}

function Card({
  children,
  variant = 'default',
  background = 'white',
  padding = 'medium',
  className = ''
}: CardProps) {
  const variants = {
    default: '',
    bordered: 'border-2 border-orange/20',
    shadowed: 'shadow-lg',
    colored: 'shadow'
  };

  const backgrounds = {
    white: 'bg-white',
    cream: 'bg-cream',
    'orange-light': 'bg-orange/10',
    'teal-dark': 'bg-teal'
  };

  const paddings = {
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8'
  };

  return (
    <div className={`rounded-lg ${variants[variant]} ${backgrounds[background]} ${paddings[padding]} ${className}`}>
      {children}
    </div>
  );
}

export default memo(Card);