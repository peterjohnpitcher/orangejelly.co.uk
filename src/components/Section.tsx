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
    small: 'py-6 md:py-8',
    medium: 'py-10 md:py-14',
    large: 'py-14 md:py-20'
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