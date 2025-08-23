import { memo } from 'react';
import Link from 'next/link';

interface ResultsSectionProps {
  title?: string;
  testimonial?: string;
  subtext?: string;
  buttonText?: string;
  buttonHref?: string;
  className?: string;
}

function ResultsSection({ 
  title = 'Real Results from The Anchor',
  testimonial = "We've added £75,000-£100,000 of value to our business using AI. Our food GP improved from 58% to 71%. Every strategy we share has been proven in our own pub.",
  subtext = "Featured in BII's Autumn 2025 magazine for AI innovation. From quiz nights to tasting events - see how we turned our pub around.",
  buttonText = 'See More Pub Turnarounds',
  buttonHref = '/results',
  className = '' 
}: ResultsSectionProps) {
  return (
    <section className={`bg-teal py-16 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-8">
          {title}
        </h2>
        
        <div className="bg-teal-dark/30 rounded-lg p-8 mb-8">
          <p className="text-lg text-white mb-4">
            {testimonial}
          </p>
          <p className="text-lg text-cream/90">
            {subtext}
          </p>
        </div>
        
        <Link 
          href={buttonHref}
          className="inline-flex items-center justify-center px-6 py-3 bg-cream text-teal font-medium rounded-md hover:bg-cream-light transition-colors"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}

export default memo(ResultsSection);