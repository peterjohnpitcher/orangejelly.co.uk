import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog-md';
import { blogCategories } from '@/lib/blog';
import { client } from '@/lib/sanity.client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.orangejelly.co.uk';
  const currentDate = new Date().toISOString();

  // Fetch all landing pages
  const landingPages = await client.fetch(`*[_type == "landingPage" && isActive == true]{
    "slug": slug.current,
    _updatedAt
  }`);

  const dynamicLandingPages = landingPages.map((page: any) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: page._updatedAt || currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Services are represented on a single page; avoid fragment URLs in sitemap

  // Define static pages
  const staticPages = [
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
    {
      url: `${baseUrl}/licensees-guide`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
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

  return [...staticPages, ...dynamicLandingPages, ...blogPages, ...categoryPages];
}