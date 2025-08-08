import { client } from './sanity.client';
import { homepageFAQsQuery, homepageContentQuery, contentBlockQuery, contentBlocksByPageQuery } from './sanity.queries';
import type { FAQ, ContentBlock } from './sanity.types';

// Homepage FAQs
export async function getHomepageFAQs(): Promise<FAQ[]> {
  try {
    const faqs = await client.fetch<FAQ[]>(homepageFAQsQuery);
    return faqs || [];
  } catch (error) {
    console.error('Error fetching homepage FAQs from Sanity:', error);
    return [];
  }
}

// Content blocks
export async function getContentBlock(identifier: string): Promise<ContentBlock | null> {
  try {
    const block = await client.fetch<ContentBlock>(contentBlockQuery, { identifier });
    return block;
  } catch (error) {
    console.error(`Error fetching content block ${identifier} from Sanity:`, error);
    return null;
  }
}

export async function getContentBlocksByPage(page: string): Promise<ContentBlock[]> {
  try {
    const blocks = await client.fetch<ContentBlock[]>(contentBlocksByPageQuery, { page });
    return blocks || [];
  } catch (error) {
    console.error(`Error fetching content blocks for page ${page} from Sanity:`, error);
    return [];
  }
}

// Homepage specific content helpers
export async function getHomepageContent() {
  try {
    // First try to get the unified homepage content
    const homepageData = await client.fetch(homepageContentQuery);
    
    // Also fetch section headings
    const sectionHeadings = await getContentBlock('homepage-sections');
    
    if (homepageData) {
      // Use the new unified homepage content
      return {
        hero: homepageData.hero,
        faqs: homepageData.faqs || [],
        problems: homepageData.problems || [],
        features: homepageData.features || [],
        metrics: homepageData.metrics || {},
        seo: homepageData.seo,
        sectionHeadings: sectionHeadings?.content || {}
      };
    }
    
    // Check for content blocks if unified homepage content doesn't exist
    const [problems, features, metrics] = await Promise.all([
      getContentBlock('home-problems'),
      getContentBlock('home-features'), 
      getContentBlock('home-metrics')
    ]);

    // Get FAQs
    const faqs = await getHomepageFAQs();

    return {
      hero: null,
      faqs,
      problems: problems?.content?.items || [],
      features: features?.content?.items || [],
      metrics: metrics?.content || {},
      seo: null,
      sectionHeadings: sectionHeadings?.content || {}
    };
  } catch (error) {
    console.error('Error fetching homepage content:', error);
    return {
      hero: null,
      faqs: [],
      problems: [],
      features: [],
      metrics: {},
      seo: null,
      sectionHeadings: {}
    };
  }
}