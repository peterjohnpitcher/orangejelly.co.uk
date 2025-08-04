import Button from './Button';
import Card from './Card';
import Heading from './Heading';
import FeatureList from './FeatureList';
import OptimizedImage from '@/components/OptimizedImage';
import { URLS } from '@/lib/constants';

interface ServiceCardProps {
  id: string;
  emoji?: string;
  title: string;
  problem: string;
  description: string;
  features?: string[];
  example?: {
    before?: string;
    after?: string;
    result?: string;
  };
  price: string;
  timeline?: string;
  ctaText?: string;
  highlight?: boolean;
}

export default function ServiceCard({
  id,
  emoji,
  title,
  problem,
  description,
  features,
  example,
  price,
  timeline,
  ctaText = "I'm interested in",
  highlight = false
}: ServiceCardProps) {
  return (
    <div id={id}>
      <Card 
        variant={highlight ? 'bordered' : 'shadowed'}
        padding="large"
        className={`hover:shadow-xl transition-normal hover:-translate-y-1 relative overflow-hidden ${highlight ? 'bg-gradient-to-br from-orange/20 to-orange/10 border-2 border-orange' : ''}`}
      >
      {/* Subtle logo watermark */}
      <div className="absolute bottom-2 right-2 opacity-5">
        <OptimizedImage
          src="/logo.png"
          alt="Orange Jelly watermark"
          width={80}
          height={80}
          loading="lazy"
        />
      </div>
      
      {highlight && (
        <>
          <div className="absolute top-0 right-0 bg-orange text-white text-sm font-semibold px-4 py-1 rounded-bl-lg">
            MOST POPULAR
          </div>
          {/* Orange glow effect for highlighted cards */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange/10 via-transparent to-orange/5 pointer-events-none"></div>
        </>
      )}
      
      {emoji && <div className="text-4xl mb-4">{emoji}</div>}
      
      <Heading level={3} className="mb-3">{title}</Heading>
      
      <p className="text-orange font-semibold mb-4">
        Problem: {problem}
      </p>
      
      <p className="text-charcoal/80 mb-6">{description}</p>
      
      {features && features.length > 0 && (
        <div className="mb-6">
          <p className="font-semibold mb-2">What's included:</p>
          <FeatureList
            items={features}
            icon="check"
            iconColor="orange"
            spacing="tight"
            className="text-sm"
          />
        </div>
      )}
      
      {example && (
        <Card background="cream" padding="small" className="mb-6">
          <p className="text-sm font-semibold mb-2">Real example:</p>
          {example.before && (
            <p className="text-sm text-charcoal/70 mb-1">
              <span className="font-medium">Before:</span> {example.before}
            </p>
          )}
          {example.after && (
            <p className="text-sm text-charcoal/70 mb-1">
              <span className="font-medium">After:</span> {example.after}
            </p>
          )}
          {example.result && (
            <p className="text-sm font-semibold text-orange mt-2">
              Result: {example.result}
            </p>
          )}
        </Card>
      )}
      
      <div className="border-t pt-6">
        <div className="flex justify-between items-center mb-4">
          <p className="text-2xl font-bold text-charcoal">{price}</p>
          {timeline && (
            <p className="text-sm text-charcoal/60">{timeline}</p>
          )}
        </div>
        
        <Button
          href={URLS.whatsapp(`${ctaText} ${title}`)}
          variant="primary"
          size="small"
          fullWidth
          external
          ariaLabel={`Contact us on WhatsApp about ${title} service`}
        >
          {ctaText} {title}
        </Button>
      </div>
    </Card>
    </div>
  );
}