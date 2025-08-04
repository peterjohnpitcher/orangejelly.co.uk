import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog-md';
import { blogCategories } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.orangejelly.co.uk';
  const currentDate = new Date().toISOString();

  // Define pages with their priorities and change frequencies
  const pages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/results`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    // Problem-specific landing pages
    {
      url: `${baseUrl}/empty-pub-solutions`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/quiet-midweek-solutions`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compete-with-pub-chains`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pub-marketing-no-budget`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // Pub Rescue section
    {
      url: `${baseUrl}/pub-rescue`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ];

  // Add individual service anchor links as separate entries
  const serviceAnchors = [
    'empty-pub-recovery',
    'boost-food-sales',
    'done-for-you-marketing',
    'website',
    'training',
    'business'
  ];

  const servicePages = serviceAnchors.map(anchor => ({
    url: `${baseUrl}/services#${anchor}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Add licensees-guide main page
  const licenseeGuidePages = [
    {
      url: `${baseUrl}/licensees-guide`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }
  ];

  // Dynamically get all blog posts
  const allPosts = getAllPosts();
  const blogPages = allPosts.map(post => ({
    url: `${baseUrl}/licensees-guide/${post.slug}`,
    lastModified: post.updatedDate || post.publishedDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Dynamically get all categories
  const categoryPages = blogCategories.map(category => ({
    url: `${baseUrl}/licensees-guide/category/${category.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  return [...pages, ...servicePages, ...licenseeGuidePages, ...blogPages, ...categoryPages];
}