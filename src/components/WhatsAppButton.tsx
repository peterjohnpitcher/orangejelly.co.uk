import { CONTACT, URLS } from '@/lib/constants';

interface WhatsAppButtonProps {
  text: string;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  className?: string;
}

// WhatsApp button with mobile-first touch target sizing (min 44px)
export default function WhatsAppButton({
  text,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  className = ''
}: WhatsAppButtonProps) {
  const whatsappUrl = URLS.whatsapp(text);

  const baseClasses = 'font-medium rounded-lg whatsapp-button inline-block text-center';
  
  const variantClasses = {
    primary: 'bg-orange text-white hover:bg-orange-dark',
    secondary: 'bg-white text-orange border-2 border-orange hover:bg-orange hover:text-white'
  };

  const sizeClasses = {
    small: 'px-4 py-2.5 text-sm min-h-[44px]',
    medium: 'px-6 py-3 text-base min-h-[48px]',
    large: 'px-8 py-4 text-lg min-h-[56px]'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <a
      href={whatsappUrl}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Contact us on WhatsApp at ${CONTACT.phone}`}
    >
      <span className="hidden sm:inline">WhatsApp: </span>{CONTACT.phone}
    </a>
  );
}