import { Suspense } from 'react';
import { getRelatedLinksCluster, transformClusterToLegacyFormat } from '@/lib/sanity-related-links';
import RelatedLinks from './RelatedLinks';
import { AsyncErrorBoundary } from './ErrorBoundary';
import { SectionLoading } from './Loading';

interface RelatedLinksFromSanityProps {
  clusterId: string;
  title?: string;
  subtitle?: string;
  variant?: 'card' | 'inline' | 'compact';
  columns?: {
    default?: 1 | 2 | 3 | 4;
    sm?: 1 | 2 | 3 | 4;
    md?: 1 | 2 | 3 | 4;
    lg?: 1 | 2 | 3 | 4;
  };
  centered?: boolean;
}

// Async component that fetches related links
async function RelatedLinksData({
  clusterId,
  title,
  subtitle,
  variant = 'card',
  columns = { default: 1, md: 2, lg: 3 },
  centered = false
}: RelatedLinksFromSanityProps) {
  try {
    const cluster = await getRelatedLinksCluster(clusterId);
    
    if (!cluster || !cluster.links || cluster.links.length === 0) {
      // Return nothing if no content is available
      return null;
    }

    const links = transformClusterToLegacyFormat(cluster);

    return (
      <RelatedLinks
        title={title || cluster.title}
        subtitle={subtitle}
        links={links}
        variant={variant}
        columns={columns}
        centered={centered}
      />
    );
  } catch (error) {
    console.error(`Error fetching related links for cluster "${clusterId}":`, error);
    // Gracefully fail - return nothing instead of breaking the page
    return null;
  }
}

export default function RelatedLinksFromSanity(props: RelatedLinksFromSanityProps) {
  return (
    <AsyncErrorBoundary
      fallback={null} // Gracefully fail without showing error UI for related links
    >
      <Suspense fallback={<SectionLoading />}>
        <RelatedLinksData {...props} />
      </Suspense>
    </AsyncErrorBoundary>
  );
}