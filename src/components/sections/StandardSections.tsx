import Section from '@/components/Section';
import Partnerships from '@/components/Partnerships';
import RelatedLinks from '@/components/RelatedLinks';
import CTASection from '@/components/CTASection';
import TrustBadges from '@/components/TrustBadges';
import type { RelatedLink } from '@/components/RelatedLinks';

// Import related links data
const relatedLinksData = require('../../../content/data/related-links.json');

interface SectionWrapperProps {
  background?: 'white' | 'cream' | 'teal' | 'orange-light' | 'charcoal';
  padding?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
}

// Wrapper to ensure consistent section styling
function SectionWrapper({ 
  background = 'white', 
  padding = 'medium', 
  children 
}: SectionWrapperProps) {
  return (
    <Section background={background} padding={padding}>
      {children}
    </Section>
  );
}

// Working With Industry Leaders Section
interface IndustryLeadersSectionProps {
  variant?: 'full' | 'compact' | 'minimal';
  background?: 'white' | 'cream';
}

export function IndustryLeadersSection({ 
  variant = 'compact',
  background = 'white' 
}: IndustryLeadersSectionProps) {
  return (
    <SectionWrapper background={background} padding="medium">
      <div className="text-center mb-8">
        <p className="text-sm text-charcoal/60 font-medium uppercase tracking-wider">
          Working with Industry Leaders
        </p>
      </div>
      <Partnerships variant={variant} />
    </SectionWrapper>
  );
}

// See How We Can Help Section
interface HelpSectionProps {
  title?: string;
  subtitle?: string;
  links?: RelatedLink[];
  linkCluster?: string; // Changed to string for Sanity cluster ID
  background?: 'white' | 'cream';
  columns?: {
    default?: 1 | 2 | 3 | 4;
    sm?: 1 | 2 | 3 | 4;
    md?: 1 | 2 | 3 | 4;
    lg?: 1 | 2 | 3 | 4;
  };
}

export function HelpSection({ 
  title = "See How We Can Help",
  subtitle = "Choose where to start based on your biggest challenge",
  links,
  linkCluster,
  background = 'cream',
  columns = { default: 1, md: 2, lg: 3 }
}: HelpSectionProps) {
  // If links are provided directly, use them
  if (links && links.length > 0) {
    return (
      <SectionWrapper background={background}>
        <RelatedLinks
          title={title}
          subtitle={subtitle}
          links={links}
          variant="card"
          columns={columns}
        />
      </SectionWrapper>
    );
  }
  
  // Otherwise, use local data by cluster ID
  const clusterId = linkCluster || 'quickStart';
  const clusterData = (relatedLinksData as any)[clusterId];
  
  if (!clusterData) {
    return null; // Don't render anything if cluster not found
  }
  
  return (
    <SectionWrapper background={background}>
      <RelatedLinks
        title={title}
        subtitle={subtitle}
        links={clusterData.links}
        variant="card"
        columns={columns}
      />
    </SectionWrapper>
  );
}

// Standard CTA Section with common defaults
interface StandardCTASectionProps {
  title: string;
  subtitle?: string;
  buttonText?: string;
  whatsappMessage?: string;
  bottomText?: string;
  variant?: 'orange' | 'teal' | 'charcoal';
  background?: 'orange' | 'teal' | 'white';
}

export function StandardCTASection({
  title,
  subtitle,
  buttonText = "WhatsApp me now",
  whatsappMessage,
  bottomText,
  variant,
  background
}: StandardCTASectionProps) {
  return (
    <CTASection
      title={title}
      subtitle={subtitle}
      buttonText={buttonText}
      whatsappMessage={whatsappMessage}
      bottomText={bottomText}
      variant={variant}
    />
  );
}

// Trust & Credibility Section combining multiple trust elements
interface TrustCredibilitySectionProps {
  showBadges?: boolean;
  showPartnerships?: boolean;
  partnershipsVariant?: 'full' | 'compact' | 'minimal';
  background?: 'white' | 'cream';
}

export function TrustCredibilitySection({
  showBadges = true,
  showPartnerships = true,
  partnershipsVariant = 'compact',
  background = 'cream'
}: TrustCredibilitySectionProps) {
  return (
    <SectionWrapper background={background} padding="large">
      {showBadges && (
        <div className="mb-12">
          <TrustBadges />
        </div>
      )}
      
      {showPartnerships && (
        <div>
          <div className="text-center mb-8">
            <p className="text-sm text-charcoal/60 font-medium uppercase tracking-wider">
              Proud to Work With
            </p>
          </div>
          <Partnerships variant={partnershipsVariant} />
        </div>
      )}
    </SectionWrapper>
  );
}

// Success Metrics Bar
interface MetricsBarProps {
  metrics?: Array<{
    value: string;
    label: string;
    highlight?: boolean;
  }>;
  background?: 'orange' | 'teal' | 'charcoal';
  textColor?: 'white' | 'charcoal';
}

export function MetricsBar({ 
  metrics = [
    { value: '£400+', label: 'Extra Weekly Revenue', highlight: true },
    { value: '25-35', label: 'Quiz Night Regulars' },
    { value: '14 Days', label: 'To See Results' }
  ],
  background = 'orange',
  textColor = 'white'
}: MetricsBarProps) {
  const bgClass = {
    orange: 'bg-orange',
    teal: 'bg-teal',
    charcoal: 'bg-charcoal'
  }[background];
  
  const textClass = textColor === 'white' ? 'text-white' : 'text-charcoal';
  
  return (
    <div className={`${bgClass} ${textClass} py-4`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className={`text-2xl md:text-3xl font-bold ${metric.highlight ? 'text-yellow-300' : ''}`}>
                {metric.value}
              </div>
              <div className="text-sm md:text-base opacity-90">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}