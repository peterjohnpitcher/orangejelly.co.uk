import WhatsAppButton from './WhatsAppButton';
import Button from './Button';
import OptimizedImage from '@/components/OptimizedImage';
import Text from './Text';
import Heading from './Heading';
import Breadcrumb, { type BreadcrumbItem } from './Breadcrumb';

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
  headingLevel?: 1 | 2; // Prevent multiple h1s on a page
  breadcrumbs?: BreadcrumbItem[]; // Optional breadcrumbs
}

export default function Hero({
  title,
  subtitle,
  showCTA = true,
  ctaText = 'Hi Peter, I need help filling my pub',
  secondaryAction,
  bottomText,
  headingLevel = 1,
  breadcrumbs,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream to-cream-light">
      {/* Watermark Logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <OptimizedImage
          src="/logo.png"
          alt=""
          width={400}
          height={400}
          className="opacity-5 blur-sm"
          style={{ width: 'auto', height: 'auto' }}
          priority
        />
      </div>

      {/* Decorative orange circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange/5 rounded-full -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange/5 rounded-full translate-y-48 -translate-x-48"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumbs at top of hero */}
        {breadcrumbs && (
          <div className="pt-4 pb-2">
            <Breadcrumb items={breadcrumbs} />
          </div>
        )}

        <div className="text-center py-12 md:py-20">
          <Heading
            level={headingLevel}
            align="center"
            className="text-4xl md:text-6xl mb-6 animate-fade-in"
          >
            {title}
          </Heading>

          {subtitle && (
            <Text
              size="lg"
              color="muted"
              align="center"
              className="md:text-2xl mb-8 max-w-3xl mx-auto animate-fade-in-delay"
            >
              {subtitle}
            </Text>
          )}

          {showCTA && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 animate-fade-in-delay-2">
              <WhatsAppButton text={ctaText} size="large" />

              {secondaryAction && (
                <Button href={secondaryAction.href} variant="outline" size="large">
                  {secondaryAction.text}
                </Button>
              )}
            </div>
          )}

          {bottomText && (
            <Text size="sm" className="text-charcoal/60 animate-fade-in-delay-3 text-center">
              {bottomText}
            </Text>
          )}
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/20 to-transparent"></div>
    </section>
  );
}
