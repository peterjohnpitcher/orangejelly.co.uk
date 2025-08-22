import TrustBadges from './TrustBadges';

// Import trust badges data
const trustBadgesData = require('../../content/data/trust-badges.json');

interface TrustBadgesWrapperProps {
  variant?: 'horizontal' | 'vertical' | 'compact';
  showAll?: boolean;
}

// Define local trust badge type interface
interface LocalTrustBadge {
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  order: number;
  isActive: boolean;
}

export default function TrustBadgesWrapper(props: TrustBadgesWrapperProps) {
  // Cast the imported data to the correct type
  const trustBadges = trustBadgesData as LocalTrustBadge[];
  
  return <TrustBadges {...props} trustBadges={trustBadges} />;
}