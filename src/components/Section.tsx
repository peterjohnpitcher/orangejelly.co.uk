import { memo } from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'cream' | 'white' | 'orange-light' | 'teal' | 'charcoal';
  padding?: 'small' | 'medium' | 'large';
}

function Section({
  children,
  className = '',
  background = 'cream',
  padding = 'medium'
}: SectionProps) {
  const bgClasses = {
    cream: 'bg-cream',
    white: 'bg-white',
    'orange-light': 'bg-orange/10',
    teal: 'bg-teal text-cream',
    charcoal: 'bg-charcoal text-cream'
  };

  const paddingClasses = {
    small: 'py-8 md:py-12',
    medium: 'py-16 md:py-24',
    large: 'py-24 md:py-32'
  };

  return (
    <section className={`${bgClasses[background]} ${paddingClasses[padding]} overflow-hidden ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {children}
      </div>
    </section>
  );
}

export default memo(Section);