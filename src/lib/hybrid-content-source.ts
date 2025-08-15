/**
 * Hybrid Content Source
 *
 * Uses Storyblok for blog posts (repetitive content)
 * Uses Sanity for static pages (homepage, services, etc.)
 *
 * This gives us the best of both worlds:
 * - Visual editing for blogs
 * - Keep existing Sanity setup for static content
 */

import { getBlogPost, getBlogPosts } from './storyblok-client';
import { client } from './sanity.client';

export type ContentSource = 'storyblok' | 'sanity';

/**
 * Determine which CMS to use based on content type
 */
export function getContentSource(contentType: string): ContentSource {
  // Blog posts come from Storyblok
  if (contentType === 'blogPost' || contentType === 'blog') {
    return 'storyblok';
  }

  // Everything else from Sanity
  return 'sanity';
}

/**
 * Fetch content from the appropriate source
 */
export async function getContent(contentType: string, slug?: string) {
  const source = getContentSource(contentType);

  if (source === 'storyblok') {
    // Fetch from Storyblok
    if (slug) {
      return getBlogPost(slug);
    } else {
      return getBlogPosts();
    }
  } else {
    // Fetch from Sanity
    if (slug) {
      return client.fetch(`*[_type == $contentType && slug.current == $slug][0]`, {
        contentType,
        slug,
      });
    } else {
      return client.fetch(`*[_type == $contentType] | order(_createdAt desc)`, { contentType });
    }
  }
}

/**
 * Get all blog posts (from Storyblok)
 */
export async function getAllBlogPosts() {
  return getBlogPosts();
}

/**
 * Get single blog post (from Storyblok)
 */
export async function getSingleBlogPost(slug: string) {
  return getBlogPost(slug);
}

/**
 * Get homepage content (from Sanity)
 */
export async function getHomepageContent() {
  return client.fetch(`*[_type == "homepageContent"][0]`);
}

/**
 * Get services (from Sanity)
 */
export async function getServices() {
  return client.fetch(`*[_type == "service"] | order(order asc)`);
}

/**
 * Get case studies (from Sanity)
 */
export async function getCaseStudies() {
  return client.fetch(`*[_type == "caseStudy"] | order(_createdAt desc)`);
}

/**
 * Migration status helper
 */
export function getMigrationStatus() {
  return {
    blog: {
      source: 'storyblok',
      status: 'migrated',
      count: 34,
      benefits: ['Visual editor', 'No schema errors', 'Clean rich text', 'Built-in scheduling'],
    },
    staticPages: {
      source: 'sanity',
      status: 'unchanged',
      pages: ['homepage', 'services', 'about', 'contact', 'results'],
      reason: 'Working well, no need to migrate',
    },
  };
}
