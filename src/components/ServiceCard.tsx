import { memo } from 'react';
import Button from './Button';
import Card from './Card';
import Heading from './Heading';
import Text from './Text';
import { URLS } from '@/lib/constants';

interface ServiceCardExample {
  before?: string;
  after?: string;
  result?: string;
}

interface ServiceCardProps {
  id: string;
  emoji?: string;
  title: string;
  problem?: string;
  deliverable?: string;
  description: string;
  features?: string[];
  example?: ServiceCardExample;
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
  ctaText = 'Get Started',
  highlight = false,
}: ServiceCardProps) {
  return (
    <div id={id} className="service-card h-full">
      <Card
        variant="shadowed"
        padding="medium"
        className={`h-full flex flex-col relative overflow-hidden hover:shadow-xl transition-all ${
          highlight ? 'ring-2 ring-orange' : ''
        }`}
      >
        {/* Most Popular Badge */}
        {highlight && (
          <div className="absolute top-0 right-0 bg-orange text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
            MOST POPULAR
          </div>
        )}

        {/* Orange Jelly watermark - subtle in corner */}
        <div className="absolute bottom-2 right-2 opacity-5">
          <img src="/logo.png" alt="" className="w-12 h-12" />
        </div>

        {/* Content */}
        {emoji && <div className="text-3xl mb-3">{emoji}</div>}

        <Heading level={4} className="mb-3 text-lg">
          {title}
        </Heading>

        {problem && (
          <Text size="sm" className="text-orange font-semibold mb-2">
            {problem}
          </Text>
        )}

        {deliverable && (
          <Text size="sm" className="text-teal font-semibold mb-3">
            {deliverable}
          </Text>
        )}

        <Text size="sm" className="mb-4">
          {description}
        </Text>

        {features && features.length > 0 && (
          <>
            <Text size="xs" weight="semibold" className="mb-2">
              What's included:
            </Text>
            <ul className="mb-4 space-y-1">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-orange text-sm">✓</span>
                  <Text size="xs" className="leading-tight">
                    {feature}
                  </Text>
                </li>
              ))}
            </ul>
          </>
        )}

        {example && (
          <Card background="cream" padding="small" className="mb-4">
            <Text size="xs" weight="semibold" className="mb-2">
              Real example:
            </Text>
            {example.before && (
              <Text size="xs" className="mb-1">
                <span className="font-semibold">Before:</span> {example.before}
              </Text>
            )}
            {example.after && (
              <Text size="xs" className="mb-1">
                <span className="font-semibold">After:</span> {example.after}
              </Text>
            )}
            {example.result && (
              <Text size="xs" className="font-semibold text-orange mt-2">
                Result: {example.result}
              </Text>
            )}
          </Card>
        )}

        {/* Button at bottom */}
        <div className="mt-auto pt-4">
          <Button
            href={URLS.whatsapp(`I'm interested in ${title}`)}
            variant={highlight ? 'primary' : 'secondary'}
            size="small"
            fullWidth
            external
            aria-label={`Contact about ${title}`}
          >
            {ctaText} <span className="hidden sm:inline">{title}</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default memo(ServiceCard);
