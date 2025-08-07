import { Suspense } from 'react';
import { getSocialProof } from '@/lib/sanity-social-proof';
import SocialProof from './SocialProof';
import { AsyncErrorBoundary } from './ErrorBoundary';
import { CardLoading } from './Loading';

// Async component that fetches social proof data
async function SocialProofData() {
  try {
    const socialProofItems = await getSocialProof();
    return <SocialProof socialProofItems={socialProofItems} />;
  } catch (error) {
    console.error('Error fetching social proof:', error);
    // Return component with empty array - gracefully hide if no data
    return <SocialProof socialProofItems={[]} />;
  }
}

export default function SocialProofWrapper() {
  return (
    <AsyncErrorBoundary
      fallback={<SocialProof socialProofItems={[]} />} // Show empty state if error
    >
      <Suspense fallback={<CardLoading />}>
        <SocialProofData />
      </Suspense>
    </AsyncErrorBoundary>
  );
}