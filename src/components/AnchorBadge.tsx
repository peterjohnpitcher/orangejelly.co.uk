import { memo } from 'react';

import OptimizedImage from '@/components/OptimizedImage';
import Text from '@/components/Text';

interface AnchorBadgeProps {
  variant?: 'floating' | 'inline';
  size?: 'small' | 'medium' | 'large';
}

function AnchorBadge({ 
  variant = 'inline', 
  size = 'medium' 
}: AnchorBadgeProps) {
  const sizeClasses = {
    small: 'w-32',
    medium: 'w-40',
    large: 'w-48'
  };

  const floatingClasses = variant === 'floating' 
    ? 'fixed bottom-4 right-4 z-35 animate-pulse' 
    : '';

  return (
    <a
      href="https://the-anchor.pub"
      target="_blank"
      rel="noopener noreferrer"
      className={`group ${floatingClasses}`}
      title="See our results at The Anchor"
    >
      <div className="bg-teal rounded-lg p-3 shadow-lg hover:shadow-xl transition-normal hover:scale-105">
        <Text size="xs" color="white" align="center" className="uppercase tracking-wider mb-2 opacity-90">
          Proven at
        </Text>
        <OptimizedImage
          src="/logo_the-anchor.png"
          alt="The Anchor"
          width={variant === 'floating' ? 120 : 140}
          height={variant === 'floating' ? 48 : 56}
          className={`${sizeClasses[size]} h-auto`}
        />
        <Text size="xs" color="white" align="center" className="mt-2 opacity-0 group-hover:opacity-100 transition-quick">
          See our results →
        </Text>
      </div>
    </a>
  );
}

export default memo(AnchorBadge);