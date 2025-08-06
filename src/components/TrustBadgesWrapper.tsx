import { getTrustBadges } from '@/lib/sanity-social-proof';
import TrustBadges from './TrustBadges';

interface TrustBadgesWrapperProps {
  variant?: 'horizontal' | 'vertical' | 'compact';
  showAll?: boolean;
}

export default async function TrustBadgesWrapper(props: TrustBadgesWrapperProps) {
  const trustBadges = await getTrustBadges();
  
  return <TrustBadges {...props} trustBadges={trustBadges} />;
}