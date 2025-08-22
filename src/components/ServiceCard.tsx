import { memo } from 'react';

import Button from './Button';
import Card from './Card';
import Heading from './Heading';
import Text from './Text';
import FeatureList from './FeatureList';
import OptimizedImage from '@/components/OptimizedImage';
import { URLS } from '@/lib/constants';

interface ServiceCardProps {
  id: string;
  emoji?: string;
  title: string;
  problem: string;
  deliverable?: string;
  description: string;
  features?: string[];
  example?:
    | {
        before?: string;
        after?: string;
        result?: string;
      }
    | string;
  timeEstimate?: string;
  priceBreakdown?: string;
  timeline?: string;
  ctaText?: string;
  highlight?: boolean;
}

function ServiceCard({
  id,
  emoji,
  title,
  problem,
  deliverable,
  description,
  features,
  example,
  timeEstimate,
  priceBreakdown,
  timeline,
  ctaText = "I'm interested in",
  highlight = false,
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

        <Heading level={3} className="mb-3">
          {title}
        </Heading>

        <Text className="text-orange font-semibold mb-3">Problem: {problem}</Text>

        {deliverable && (
          <Text className="text-teal font-semibold mb-4">Deliverable: {deliverable}</Text>
        )}

        <Text className="text-charcoal/80 mb-6">{description}</Text>

        {features && features.length > 0 && (
          <div className="mb-6">
            <Text className="font-semibold mb-2">What's included:</Text>
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
            <Text className="text-sm font-semibold mb-2">Real example:</Text>
            {typeof example === 'string' ? (
              <Text className="text-sm font-semibold text-orange">{example}</Text>
            ) : (
              <>
                {example.before && (
                  <Text className="text-sm text-charcoal/70 mb-1">
                    <span className="font-medium">Before:</span> {example.before}
                  </Text>
                )}
                {example.after && (
                  <Text className="text-sm text-charcoal/70 mb-1">
                    <span className="font-medium">After:</span> {example.after}
                  </Text>
                )}
                {example.result && (
                  <Text className="text-sm font-semibold text-orange mt-2">
                    Result: {example.result}
                  </Text>
                )}
              </>
            )}
          </Card>
        )}

        <div className="border-t pt-6">
          {(timeEstimate || priceBreakdown) && (
            <div className="bg-cream rounded-lg p-3 mb-4">
              {timeEstimate && (
                <Text className="text-sm text-charcoal/70 mb-1">
                  <span className="font-semibold">Time required:</span> {timeEstimate}
                </Text>
              )}
              {priceBreakdown && (
                <Text className="text-sm text-charcoal/70">
                  <span className="font-semibold">Calculation:</span> {priceBreakdown}
                </Text>
              )}
            </div>
          )}

          {timeline && (
            <div className="mb-4">
              <Text className="text-sm text-charcoal/60">{timeline}</Text>
            </div>
          )}

          <Button
            href={URLS.whatsapp(`${ctaText} ${title}`)}
            variant="primary"
            size="small"
            fullWidth
            external
            aria-label={`Contact us on WhatsApp about ${title} service`}
          >
            {ctaText} {title}
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default memo(ServiceCard);
