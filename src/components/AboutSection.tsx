import { memo } from 'react';
import Link from 'next/link';
import OptimizedImage from './OptimizedImage';

interface AboutSectionProps {
  title?: string;
  content?: string[];
  buttonText?: string;
  buttonHref?: string;
  imageUrl?: string;
  imageAlt?: string;
  className?: string;
}

function AboutSection({ 
  title = "We're licensees, Just Like You",
  content = [
    "I'm Peter. My husband Billy and I have run The Anchor in Stanwell Moor since March 2019. We faced the same struggles - empty tables, rising costs, fierce competition.",
    "Orange Jelly exists because we discovered how AI can add 25 hours of value per week. I've been an early AI adopter since 2021, and now I help other pubs implement the same strategies that transformed our business."
  ],
  buttonText = 'Read Our Full Story',
  buttonHref = '/about',
  imageUrl = '/logo_the-anchor.png',
  imageAlt = 'The Anchor Pub',
  className = '' 
}: AboutSectionProps) {
  return (
    <section className={`bg-white py-16 ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-charcoal mb-6">
              {title}
            </h2>
            {content.map((paragraph, index) => (
              <p key={index} className="text-gray-600 mb-4">
                {paragraph}
              </p>
            ))}
            <Link 
              href={buttonHref}
              className="inline-flex items-center justify-center px-6 py-3 bg-orange text-white font-medium rounded-md hover:bg-orange-dark transition-colors mt-4"
            >
              {buttonText} →
            </Link>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-orange/10 to-teal/10 rounded-2xl p-8">
              <OptimizedImage
                src={imageUrl}
                alt={imageAlt}
                width={400}
                height={300}
                className="rounded-lg shadow-lg mx-auto"
              />
              <div className="text-center mt-4">
                <p className="text-sm font-semibold text-charcoal">Proven Daily At</p>
                <p className="text-2xl font-bold text-orange">The Anchor</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12 pt-12 border-t border-gray-200">
          <p className="text-lg text-gray-600 mb-2">
            Real pub experience + proven strategies = 
          </p>
          <p className="text-3xl font-bold text-orange">
            Orange Jelly
          </p>
        </div>
      </div>
    </section>
  );
}

export default memo(AboutSection);