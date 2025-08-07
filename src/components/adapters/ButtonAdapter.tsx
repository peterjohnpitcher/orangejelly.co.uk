import * as React from "react";
import { Button as ShadcnButton, ButtonProps as ShadcnButtonProps } from "@/components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Map old props to new shadcn props
interface LegacyButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'custom';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  href?: string;
  external?: boolean;
  whatsapp?: boolean;
  onClick?: () => void | Promise<void>;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
}

// Map old variants to shadcn variants
const variantMap = {
  primary: 'default',
  secondary: 'secondary',
  outline: 'outline',
  ghost: 'ghost',
  custom: 'default'
} as const;

// Map old sizes to shadcn sizes
const sizeMap = {
  small: 'sm',
  medium: 'default',
  large: 'lg'
} as const;

export default function ButtonAdapter({
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  fullWidth = false,
  href,
  external = false,
  whatsapp = false,
  onClick,
  children,
  className,
  type = 'button',
  'aria-label': ariaLabel,
  ...props
}: LegacyButtonProps) {
  const shadcnVariant = loading ? 'loading' : (variantMap[variant] || 'default');
  const shadcnSize = sizeMap[size] || 'default';
  
  const buttonClasses = cn(
    fullWidth && "w-full",
    whatsapp && "!bg-[var(--color-whatsapp)] hover:!bg-[var(--color-whatsapp-hover)] text-white",
    className
  );

  const buttonContent = (
    <>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </>
  );

  // Handle WhatsApp button
  if (whatsapp && href) {
    return (
      <ShadcnButton
        variant={shadcnVariant}
        size={shadcnSize}
        className={buttonClasses}
        disabled={disabled || loading}
        asChild
      >
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
        >
          {buttonContent}
        </a>
      </ShadcnButton>
    );
  }

  // Handle external links
  if (href && external) {
    return (
      <ShadcnButton
        variant={shadcnVariant}
        size={shadcnSize}
        className={buttonClasses}
        disabled={disabled || loading}
        asChild
      >
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
        >
          {buttonContent}
        </a>
      </ShadcnButton>
    );
  }

  // Handle internal links
  if (href) {
    return (
      <ShadcnButton
        variant={shadcnVariant}
        size={shadcnSize}
        className={buttonClasses}
        disabled={disabled || loading}
        asChild
      >
        <Link href={href} aria-label={ariaLabel}>
          {buttonContent}
        </Link>
      </ShadcnButton>
    );
  }

  // Handle regular buttons
  return (
    <ShadcnButton
      variant={shadcnVariant}
      size={shadcnSize}
      className={buttonClasses}
      disabled={disabled || loading}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      {...props}
    >
      {buttonContent}
    </ShadcnButton>
  );
}