import { Suspense } from 'react';
import { getTrustBadges } from '@/lib/sanity-social-proof';
import TrustBadges from './TrustBadges';
import { AsyncErrorBoundary } from './ErrorBoundary';
import { CardLoading } from './Loading';

interface TrustBadgesWrapperProps {
  variant?: 'horizontal' | 'vertical' | 'compact';
  showAll?: boolean;
}

// Async component that fetches trust badges data
async function TrustBadgesData(props: TrustBadgesWrapperProps) {
  try {
    const trustBadges = await getTrustBadges();
    return <TrustBadges {...props} trustBadges={trustBadges} />;
  } catch (error) {
    console.error('Error fetching trust badges:', error);
    // Return component with empty array - still shows the section but no badges
    return <TrustBadges {...props} trustBadges={[]} />;
  }
}

export default function TrustBadgesWrapper(props: TrustBadgesWrapperProps) {
  return (
    <AsyncErrorBoundary
      fallback={<TrustBadges {...props} trustBadges={[]} />} // Show empty state if error
    >
      <Suspense fallback={<CardLoading />}>
        <TrustBadgesData {...props} />
      </Suspense>
    </AsyncErrorBoundary>
  );
}