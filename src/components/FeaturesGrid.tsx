import { memo } from 'react';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesGridProps {
  features: Feature[];
  className?: string;
}

function FeaturesGrid({ features, className = '' }: FeaturesGridProps) {
  if (!features || features.length === 0) {
    return null;
  }

  return (
    <section className={`bg-white py-12 ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="text-5xl mb-2 transform transition-transform group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="text-sm font-bold text-charcoal mb-1">
                {feature.title}
              </h3>
              <p className="text-xs text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(FeaturesGrid);