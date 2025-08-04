import OptimizedImage from '@/components/OptimizedImage';
import Card from '@/components/Card';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import Link from '@/components/Link';
import AnimatedItem from '@/components/AnimatedItem';

interface PartnershipsProps {
  variant?: 'full' | 'compact' | 'minimal';
  background?: 'white' | 'cream' | 'orange-light' | 'teal-dark';
  showDescription?: boolean;
  className?: string;
}

export default function Partnerships({ 
  variant = 'full',
  background = 'white',
  showDescription = true,
  className = ''
}: PartnershipsProps) {
  const partners = [
    {
      name: 'Greene King',
      logo: '/logo-greene-king.svg',
      description: 'The Anchor operates as a Greene King tenant, sharing AI innovations',
      link: 'https://www.greeneking.co.uk',
      width: 180,
      height: 80
    },
    {
      name: 'British Institute of Innkeeping',
      logo: '/logo-bii.svg',
      description: 'Featured in BII Autumn 2025 magazine for AI innovation',
      link: 'https://www.bii.org',
      width: 160,
      height: 80
    }
  ];

  if (variant === 'minimal') {
    return (
      <div className={`flex items-center justify-center gap-8 ${className}`}>
        <Text size="sm" color="muted" className="font-semibold">Working with:</Text>
        {partners.map((partner) => (
          <Link
            key={partner.name}
            href={partner.link}
            external
            className="opacity-60 hover:opacity-100 transition-opacity"
          >
            <OptimizedImage
              src={partner.logo}
              alt={partner.name}
              width={Math.round(partner.width * 0.6)}
              height={Math.round(partner.height * 0.6)}
              className="h-8 w-auto"
            />
          </Link>
        ))}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <Card background={background} padding="medium" className={className}>
        <Text size="sm" color="muted" align="center" className="mb-4 font-semibold">
          Working with Industry Leaders
        </Text>
        <div className="flex items-center justify-center gap-8">
          {partners.map((partner) => (
            <Link
              key={partner.name}
              href={partner.link}
              external
              className="opacity-70 hover:opacity-100 transition-opacity"
            >
              <OptimizedImage
                src={partner.logo}
                alt={partner.name}
                width={Math.round(partner.width * 0.8)}
                height={Math.round(partner.height * 0.8)}
                className="h-12 w-auto"
              />
            </Link>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <AnimatedItem animation="fade-in" className={className}>
      <Card background={background} padding="large">
        <Heading level={3} align="center" className="mb-6">
          Working With Industry Leaders
        </Heading>
        
        <div className="grid md:grid-cols-2 gap-8">
          {partners.map((partner) => (
            <div key={partner.name} className="text-center">
              <Link
                href={partner.link}
                external
                className="inline-block mb-4 opacity-80 hover:opacity-100 transition-opacity"
              >
                <OptimizedImage
                  src={partner.logo}
                  alt={partner.name}
                  width={partner.width}
                  height={partner.height}
                  className="mx-auto"
                />
              </Link>
              {showDescription && (
                <Text size="sm" color="muted" align="center">
                  {partner.description}
                </Text>
              )}
            </div>
          ))}
        </div>
        
        <Text size="sm" color="muted" align="center" className="mt-6">
          We operate The Anchor as a Greene King tenant and are members of the British Institute 
          of Innkeeping, sharing our AI innovations with the wider pub industry.
        </Text>
      </Card>
    </AnimatedItem>
  );
}