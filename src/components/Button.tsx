import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'custom';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  href,
  onClick,
  className = '',
  external = false,
  ariaLabel
}: ButtonProps) {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-300 inline-block text-center';
  
  const variants = {
    primary: 'bg-orange text-white hover:bg-orange-dark',
    secondary: 'bg-teal text-white hover:bg-teal-dark',
    outline: 'border-2 border-orange text-orange hover:bg-orange hover:text-white',
    ghost: 'text-orange hover:bg-orange/10',
    custom: '' // Allow full customization via className
  };

  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3',
    large: 'px-8 py-4 text-lg'
  };

  const widthClass = fullWidth ? 'w-full block' : '';
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes} aria-label={ariaLabel}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes} aria-label={ariaLabel}>
      {children}
    </button>
  );
}