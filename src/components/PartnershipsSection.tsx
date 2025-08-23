import { memo } from 'react';

interface Partner {
  name: string;
  description: string;
  logoUrl: string;
  url: string;
}

interface PartnershipsSectionProps {
  partners: Partner[];
  title?: string;
  className?: string;
}

function PartnershipsSection({ 
  partners, 
  title = 'Working with Industry Leaders',
  className = '' 
}: PartnershipsSectionProps) {
  if (!partners || partners.length === 0) {
    return null;
  }

  return (
    <section className={`bg-gray-50 py-12 ${className}`}>
      <div className="max-w-4xl mx-auto px-4">
        <h3 className="text-2xl font-bold text-center text-charcoal mb-8">
          {title}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {partners.map((partner, index) => (
            <div key={index} className="text-center">
              <a 
                href={partner.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block group"
              >
                <div className="bg-white rounded-lg p-6 h-32 flex items-center justify-center mb-4 shadow-sm hover:shadow-md transition-all group-hover:scale-105">
                  <img 
                    src={partner.logoUrl} 
                    alt={partner.name}
                    className="max-h-20 max-w-full object-contain"
                  />
                </div>
                <h4 className="font-bold text-charcoal mb-2 group-hover:text-orange transition-colors">
                  {partner.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {partner.description}
                </p>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(PartnershipsSection);