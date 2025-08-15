import { storyblokInit, apiPlugin } from '@storyblok/js';
import type { ISbStoriesParams, ISbStoryData } from '@storyblok/js';

/**
 * Initialize Storyblok client with your access token
 * This will be used to fetch blog content from Storyblok
 */
const { storyblokApi } = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN || 'GkqeSgICQTy1lamlvxO0mgtt',
  use: [apiPlugin],
  apiOptions: {
    region: 'eu', // EU region for better performance
    cache: {
      type: 'memory',
      clear: 'auto',
    },
  },
});

/**
 * Fetch all blog posts from Storyblok
 */
export async function getBlogPosts(options?: {
  page?: number;
  perPage?: number;
  category?: string;
  excludeSlug?: string;
}) {
  const params: ISbStoriesParams = {
    starts_with: 'blog/',
    version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
    sort_by: 'published_at:desc',
    per_page: options?.perPage || 100,
    page: options?.page || 1,
  };

  // Filter by category if provided
  if (options?.category) {
    params.filter_query = {
      category: {
        in: options.category,
      },
    };
  }

  // Exclude specific slug if provided (for related posts)
  if (options?.excludeSlug) {
    params.filter_query = {
      ...params.filter_query,
      slug: {
        not_in: options.excludeSlug,
      },
    };
  }

  try {
    const { data } = await storyblokApi!.get('cdn/stories', params);
    return data.stories as ISbStoryData[];
  } catch (error) {
    console.error('Error fetching blog posts from Storyblok:', error);
    return [];
  }
}

/**
 * Fetch a single blog post by slug
 */
export async function getBlogPost(slug: string): Promise<ISbStoryData | null> {
  try {
    const { data } = await storyblokApi!.get(`cdn/stories/blog/${slug}`, {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
    });

    return data.story as ISbStoryData;
  } catch (error) {
    console.error(`Error fetching blog post ${slug} from Storyblok:`, error);
    return null;
  }
}

/**
 * Get related blog posts based on category
 */
export async function getRelatedPosts(
  category: string,
  currentSlug: string,
  limit: number = 3
): Promise<ISbStoryData[]> {
  const posts = await getBlogPosts({
    category,
    excludeSlug: currentSlug,
    perPage: limit,
  });

  return posts.slice(0, limit);
}

/**
 * Search blog posts by query
 */
export async function searchBlogPosts(query: string): Promise<ISbStoryData[]> {
  try {
    const { data } = await storyblokApi!.get('cdn/stories', {
      starts_with: 'blog/',
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
      search_term: query,
      per_page: 20,
    });

    return data.stories as ISbStoryData[];
  } catch (error) {
    console.error('Error searching blog posts:', error);
    return [];
  }
}

/**
 * Get blog categories (if using datasource)
 */
export async function getBlogCategories() {
  try {
    const { data } = await storyblokApi!.get('cdn/datasource_entries', {
      datasource: 'blog-categories',
    });

    return data.datasource_entries;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Preview mode helper
 */
export function enableStoryblokPreview() {
  if (typeof window !== 'undefined') {
    const script = document.createElement('script');
    script.src = '//app.storyblok.com/f/storyblok-v2-latest.js';
    script.id = 'storyblokBridge';
    document.body.appendChild(script);
  }
}

export default storyblokApi;
