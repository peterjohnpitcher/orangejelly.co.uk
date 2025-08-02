import WhatsAppButton from './WhatsAppButton';
import Button from './Button';
import Image from 'next/image';

interface HeroProps {
  title: string | React.ReactNode;
  subtitle?: string;
  showCTA?: boolean;
  ctaText?: string;
  secondaryAction?: {
    text: string;
    href: string;
  };
  bottomText?: string;
}

export default function Hero({
  title,
  subtitle,
  showCTA = true,
  ctaText = "Hi Peter, I'd like to learn about the 30-day quick wins package",
  secondaryAction,
  bottomText
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream to-cream-light">
      {/* Watermark Logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Image
          src="/logo.png"
          alt=""
          width={400}
          height={400}
          className="opacity-5 blur-sm"
          aria-hidden="true"
        />
      </div>
      
      {/* Decorative orange circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange/5 rounded-full -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange/5 rounded-full translate-y-48 -translate-x-48"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-charcoal mb-6 animate-fade-in">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-xl md:text-2xl text-charcoal/80 mb-8 max-w-3xl mx-auto animate-fade-in-delay">
              {subtitle}
            </p>
          )}
          
          {showCTA && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 animate-fade-in-delay-2">
              <WhatsAppButton text={ctaText} size="large" />
              
              {secondaryAction && (
                <Button
                  href={secondaryAction.href}
                  variant="outline"
                  size="large"
                >
                  {secondaryAction.text}
                </Button>
              )}
            </div>
          )}
          
          {bottomText && (
            <p className="text-sm text-charcoal/60 animate-fade-in-delay-3">
              {bottomText}
            </p>
          )}
        </div>
      </div>
      
      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/20 to-transparent"></div>
    </section>
  );
}