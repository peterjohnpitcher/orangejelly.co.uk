import { client } from './sanity.client';
import { seoMetadataQuery } from './sanity.queries';

export interface SEOMetadata {
  _id: string;
  page: string;
  title: string;
  description: string;
  keywords?: string[];
  openGraph?: {
    title?: string;
    description?: string;
    image?: any;
  };
  twitter?: {
    title?: string;
    description?: string;
    image?: any;
  };
  canonicalUrl?: string;
  noIndex?: boolean;
  structuredData?: string;
}

const seoCache = new Map<string, SEOMetadata>();

export async function getSEOMetadata(page: string): Promise<SEOMetadata | null> {
  // Check cache first
  if (seoCache.has(page)) {
    return seoCache.get(page)!;
  }

  try {
    const metadata = await client.fetch<SEOMetadata>(seoMetadataQuery, { page });
    if (metadata) {
      seoCache.set(page, metadata);
      return metadata;
    }
    
    // Try default if page-specific not found
    if (page !== 'default') {
      const defaultMetadata = await client.fetch<SEOMetadata>(seoMetadataQuery, { page: 'default' });
      if (defaultMetadata) {
        seoCache.set('default', defaultMetadata);
        return defaultMetadata;
      }
    }
  } catch (error) {
    console.error(`Error fetching SEO metadata for ${page}:`, error);
  }

  return null;
}