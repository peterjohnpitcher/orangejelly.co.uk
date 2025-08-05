// Content source abstraction layer
// This allows switching between markdown files and Sanity CMS

import { client, urlFor } from './sanity.client';
import { blogPostsQuery, blogPostBySlugQuery } from './sanity.queries';
import { getAllPosts, getPostBySlug } from './blog-md';
import type { BlogPost as MarkdownPost } from './blog-md';

// Check if Sanity is configured
const SANITY_ENABLED = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && 
                       process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'demo-project';

export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string | any[]; // String for markdown, array for Portable Text
  publishedDate: string;
  updatedDate?: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  author?: {
    name: string;
    bio?: string;
    image?: string;
  };
  readingTime?: number; // Reading time in minutes
  isPortableText?: boolean; // Flag to indicate content type
  // New SEO fields from Sanity
  quickAnswer?: string;
  voiceSearchQueries?: string[];
  quickStats?: Array<{
    label: string;
    value: string;
    highlight?: boolean;
  }>;
  faqs?: Array<{
    question: string;
    answer: string;
    isVoiceOptimized?: boolean;
  }>;
  localSEO?: {
    targetLocation?: string;
    nearbyLandmarks?: string[];
    localModifiers?: string[];
  };
  ctaSettings?: {
    primaryCTA?: string;
    whatsappMessage?: string;
    urgency?: 'high' | 'medium' | 'low';
  };
}

// Convert Sanity post to common format
function normalizeSanityPost(post: any): BlogPost {
  // Convert featuredImage asset to URL if it exists
  let featuredImageUrl: string | undefined;
  if (post.featuredImage?.asset) {
    featuredImageUrl = urlFor(post.featuredImage).url();
  } else if (post.featuredImage && typeof post.featuredImage === 'string') {
    featuredImageUrl = post.featuredImage;
  } else {
    // Fallback to local SVG images based on slug
    const svgPath = `/images/blog/${post.slug}.svg`;
    const defaultPath = '/images/blog/default.svg';
    // Check if specific SVG exists (we'll use it optimistically)
    featuredImageUrl = svgPath;
  }

  // Default author if none is set
  const defaultAuthor = {
    name: 'Peter Pitcher',
    bio: 'Licensee of The Anchor and founder of Orange Jelly. Helping pubs thrive with proven strategies.',
    image: '/images/peter-pitcher.jpg'
  };

  return {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content, // Keep as Portable Text blocks
    publishedDate: post.publishedDate,
    updatedDate: post.updatedDate,
    category: post.category?.slug || post.category?.name || '',
    tags: post.tags || [],
    featuredImage: featuredImageUrl,
    metaTitle: post.seo?.metaTitle || post.title,
    metaDescription: post.seo?.metaDescription || post.excerpt,
    keywords: post.seo?.keywords || post.tags || [],
    author: post.author || defaultAuthor,
    readingTime: Math.ceil((post.content?.length || 0) / 1500) * 5, // Estimate reading time
    isPortableText: true,
    // Include new SEO fields from Sanity
    quickAnswer: post.quickAnswer,
    voiceSearchQueries: post.voiceSearchQueries,
    quickStats: post.quickStats,
    faqs: post.faqs,
    localSEO: post.localSEO,
    ctaSettings: post.ctaSettings,
  };
}

// Convert markdown post to common format
function normalizeMarkdownPost(post: MarkdownPost): BlogPost {
  return {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content, // Keep as HTML string
    publishedDate: post.publishedDate,
    updatedDate: post.updatedDate,
    category: post.category,
    tags: post.tags,
    featuredImage: post.featuredImage,
    metaTitle: post.metaTitle,
    metaDescription: post.metaDescription,
    keywords: post.keywords,
    author: {
      name: 'Peter Pitcher',
      bio: 'Founder of Orange Jelly Limited and licensee of The Anchor pub',
    },
    readingTime: post.readingTime,
    isPortableText: false,
  };
}

// Get all blog posts from the configured source
export async function getContentPosts(): Promise<BlogPost[]> {
  if (SANITY_ENABLED) {
    try {
      console.log('Fetching posts from Sanity...');
      const posts = await client.fetch(blogPostsQuery);
      return posts.map(normalizeSanityPost);
    } catch (error) {
      console.error('Error fetching from Sanity, falling back to markdown:', error);
    }
  }
  
  // Fallback to markdown files
  console.log('Using markdown files for blog content');
  const posts = await getAllPosts();
  return posts.map(normalizeMarkdownPost);
}

// Get a single blog post by slug
export async function getContentPostBySlug(slug: string): Promise<BlogPost | null> {
  if (SANITY_ENABLED) {
    try {
      console.log(`Fetching post ${slug} from Sanity...`);
      const post = await client.fetch(blogPostBySlugQuery, { slug });
      if (post) {
        return normalizeSanityPost(post);
      }
    } catch (error) {
      console.error('Error fetching from Sanity, falling back to markdown:', error);
    }
  }
  
  // Fallback to markdown files
  console.log(`Using markdown file for ${slug}`);
  const post = await getPostBySlug(slug);
  return post ? normalizeMarkdownPost(post) : null;
}

// Get posts by category
export async function getContentPostsByCategory(category: string): Promise<BlogPost[]> {
  const allPosts = await getContentPosts();
  return allPosts.filter(post => post.category === category);
}

// Check content source
export function getContentSource(): 'sanity' | 'markdown' {
  return SANITY_ENABLED ? 'sanity' : 'markdown';
}

// Preview functionality for Sanity
export async function getPreviewPost(slug: string, token?: string): Promise<BlogPost | null> {
  if (!SANITY_ENABLED || !token) {
    return getContentPostBySlug(slug);
  }
  
  try {
    // Create a preview client with the token
    const previewClient = client.withConfig({
      token,
      useCdn: false,
      perspective: 'previewDrafts',
    });
    
    const post = await previewClient.fetch(blogPostBySlugQuery, { slug });
    return post ? normalizeSanityPost(post) : null;
  } catch (error) {
    console.error('Error fetching preview:', error);
    return null;
  }
}