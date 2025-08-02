import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  variant?: 'default' | 'icon' | 'horizontal' | 'stacked';
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  showTagline?: boolean;
  className?: string;
  href?: string;
}

export default function Logo({
  variant = 'default',
  size = 'medium',
  showTagline = false,
  className = '',
  href
}: LogoProps) {
  const sizes = {
    small: { logo: 32, text: 'text-sm' },
    medium: { logo: 48, text: 'text-lg' },
    large: { logo: 64, text: 'text-xl' },
    xlarge: { logo: 96, text: 'text-2xl' }
  };

  const currentSize = sizes[size];

  const logoContent = () => {
    switch (variant) {
      case 'icon':
        return (
          <div className="relative">
            <Image
              src="/logo.png"
              alt="Orange Jelly"
              width={currentSize.logo}
              height={currentSize.logo}
              className="rounded-lg"
              priority
            />
            <div className="absolute inset-0 bg-orange/20 rounded-lg blur-xl -z-10"></div>
          </div>
        );

      case 'horizontal':
        return (
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Orange Jelly"
              width={currentSize.logo}
              height={currentSize.logo}
              className="rounded-lg"
              priority
            />
            <div>
              <h3 className={`font-bold ${currentSize.text} text-charcoal`}>
                Orange Jelly
              </h3>
              {showTagline && (
                <p className="text-xs text-charcoal/60">Save At Least 5 Hours a Week</p>
              )}
            </div>
          </div>
        );

      case 'stacked':
        return (
          <div className="text-center">
            <Image
              src="/logo.png"
              alt="Orange Jelly"
              width={currentSize.logo}
              height={currentSize.logo}
              className="rounded-lg mx-auto mb-2"
              priority
            />
            <h3 className={`font-bold ${currentSize.text} text-charcoal`}>
              Orange Jelly
            </h3>
            {showTagline && (
              <p className="text-sm text-charcoal/60 mt-1">Save At Least 5 Hours a Week</p>
            )}
          </div>
        );

      default:
        return (
          <Image
            src="/logo.png"
            alt="Orange Jelly"
            width={currentSize.logo}
            height={currentSize.logo}
            className="rounded-lg"
            priority
          />
        );
    }
  };

  const content = (
    <div className={`inline-block ${className}`}>
      {logoContent()}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="hover:opacity-80 transition-quick">
        {content}
      </Link>
    );
  }

  return content;
}