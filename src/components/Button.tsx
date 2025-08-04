'use client';

import Link from 'next/link';
import { useState } from 'react';
import Loading from './Loading';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'custom';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  href?: string;
  onClick?: () => void | Promise<void>;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
  loading?: boolean;
  disabled?: boolean;
}

// All buttons have minimum 44px height for mobile thumb-friendly interaction
export default function Button({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  href,
  onClick,
  className = '',
  external = false,
  ariaLabel,
  loading = false,
  disabled = false
}: ButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleClick = async () => {
    if (onClick && !disabled && !isLoading) {
      setIsLoading(true);
      try {
        await onClick();
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  const isDisabled = disabled || loading || isLoading;
  const baseClasses = 'font-semibold rounded-lg transition-all duration-300 inline-block text-center';
  
  const variants = {
    primary: 'bg-orange text-white hover:bg-orange-dark',
    secondary: 'bg-teal text-white hover:bg-teal-dark',
    outline: 'border-2 border-orange text-orange hover:bg-orange hover:text-white',
    ghost: 'text-orange hover:bg-orange/10',
    custom: '' // Allow full customization via className
  };

  const sizes = {
    small: 'px-4 py-2.5 text-sm min-h-[44px]',
    medium: 'px-6 py-3 min-h-[48px]',
    large: 'px-8 py-4 text-lg min-h-[56px]'
  };

  const widthClass = fullWidth ? 'w-full block' : '';
  const disabledClass = isDisabled ? 'opacity-50 cursor-not-allowed' : '';
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClass} ${disabledClass} ${className}`;
  
  const buttonContent = (loading || isLoading) ? (
    <span className="inline-flex items-center gap-2">
      <Loading size="small" color={variant === 'primary' || variant === 'secondary' ? 'white' : 'orange'} />
      {children}
    </span>
  ) : children;

  if (href && !isDisabled) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes} aria-label={ariaLabel}>
          {buttonContent}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button 
      onClick={handleClick} 
      className={classes} 
      aria-label={ariaLabel}
      disabled={isDisabled}
      aria-busy={loading || isLoading}
    >
      {buttonContent}
    </button>
  );
}