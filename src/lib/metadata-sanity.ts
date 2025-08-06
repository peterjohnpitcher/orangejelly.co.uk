import { Metadata } from 'next';
import { generateMetadata } from './metadata';
import { getSEOMetadata } from './sanity-seo';

export async function generateSanityMetadata(
  page: string,
  fallbackData?: {
    title?: string;
    description?: string;
    keywords?: string[];
    path?: string;
  }
): Promise<Metadata> {
  // Fetch SEO metadata from Sanity
  const sanityMetadata = await getSEOMetadata(page);
  
  // If we have Sanity metadata, use it
  if (sanityMetadata) {
    // Generate base metadata
    const baseMetadata = generateMetadata({
      title: sanityMetadata.title,
      description: sanityMetadata.description,
      keywords: sanityMetadata.keywords?.join(', '),
      path: fallbackData?.path || '',
      noIndex: sanityMetadata.noIndex,
    });
    
    // Override with Sanity-specific OpenGraph/Twitter if provided
    if (sanityMetadata.openGraph || sanityMetadata.twitter) {
      return {
        ...baseMetadata,
        openGraph: {
          ...baseMetadata.openGraph,
          ...(sanityMetadata.openGraph && {
            title: sanityMetadata.openGraph.title || baseMetadata.openGraph?.title,
            description: sanityMetadata.openGraph.description || baseMetadata.openGraph?.description,
          }),
        },
        twitter: {
          ...baseMetadata.twitter,
          ...(sanityMetadata.twitter && {
            title: sanityMetadata.twitter.title || baseMetadata.twitter?.title,
            description: sanityMetadata.twitter.description || baseMetadata.twitter?.description,
          }),
        },
      };
    }
    
    return baseMetadata;
  }
  
  // Fall back to provided data
  if (fallbackData?.title && fallbackData?.description) {
    return generateMetadata({
      title: fallbackData.title,
      description: fallbackData.description,
      keywords: fallbackData.keywords?.join(', '),
      path: fallbackData.path || '',
    });
  }
  
  // Default fallback
  return generateMetadata({
    title: 'Orange Jelly | AI-Powered Pub Marketing',
    description: 'AI-powered marketing for UK pubs from real licensees. Save 5+ hours weekly, fill empty tables, boost revenue. £62.50/hour plus VAT.',
    path: '',
  });
}