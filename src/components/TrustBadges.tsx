import Image from 'next/image';
import Card from './Card';

interface TrustBadgesProps {
  variant?: 'horizontal' | 'vertical' | 'compact';
  showAll?: boolean;
}

export default function TrustBadges({ 
  variant = 'horizontal',
  showAll = true 
}: TrustBadgesProps) {
  const badges = [
    {
      icon: '👨‍👩‍👦',
      title: 'Family-Run',
      subtitle: 'Real pub owners'
    },
    {
      icon: '✅',
      title: '30-Day Guarantee',
      subtitle: 'Money back promise'
    },
    {
      icon: '🏆',
      title: 'Run by Pub Owners',
      subtitle: 'We get it'
    },
    {
      icon: '🔒',
      title: '100% Secure',
      subtitle: 'Your data is safe'
    }
  ];

  const displayBadges = showAll ? badges : badges.slice(0, 3);

  if (variant === 'compact') {
    return (
      <div className="flex flex-wrap justify-center gap-4">
        {displayBadges.map((badge, index) => (
          <Card
            key={index}
            variant="bordered"
            padding="small"
            className="flex items-center gap-2 backdrop-blur-sm !rounded-full"
          >
            <span className="text-2xl">{badge.icon}</span>
            <span className="font-semibold text-sm">{badge.title}</span>
          </Card>
        ))}
      </div>
    );
  }

  const gridClass = variant === 'horizontal' 
    ? 'grid grid-cols-2 md:grid-cols-4 gap-4' 
    : 'grid grid-cols-1 gap-4';

  return (
    <div className={gridClass}>
      {displayBadges.map((badge, index) => (
        <Card
          key={index}
          variant="shadowed"
          padding="small"
          className="text-center bg-gradient-to-br from-white to-cream hover:shadow-lg transition-normal hover:-translate-y-1"
        >
          <div className="text-4xl mb-2">{badge.icon}</div>
          <h4 className="font-bold text-charcoal">{badge.title}</h4>
          <p className="text-xs text-charcoal/60 mt-1">{badge.subtitle}</p>
        </Card>
      ))}
    </div>
  );
}

export function FloatingTrustBadge() {
  return (
    <div className="fixed bottom-4 left-4 z-30 hidden lg:block">
      <Card variant="bordered" padding="small" className="shadow-lg max-w-xs animate-fade-in border-2">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🛡️</div>
          <div>
            <p className="font-bold text-sm">30-Day Money Back</p>
            <p className="text-xs text-charcoal/60">No questions asked</p>
          </div>
        </div>
        
        {/* Verified by Orange Jelly */}
        <div className="mt-3 pt-3 border-t flex items-center justify-between">
          <Image
            src="/logo.png"
            alt="Orange Jelly"
            width={24}
            height={24}
            className="rounded"
          />
          <span className="text-xs text-charcoal/60">Verified Promise</span>
        </div>
      </Card>
    </div>
  );
}