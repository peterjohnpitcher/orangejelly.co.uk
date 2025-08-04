import { MetadataRoute } from 'next';

// Hardcoded list of blog posts
// This ensures they're always included in the sitemap
const blogPosts = [
  'beat-chain-pubs',
  'christmas-pub-promotion-ideas',
  'compete-with-wetherspoons',
  'content-marketing-ideas-pubs',
  'email-marketing-pub-retention',
  'facebook-marketing-local-pubs',
  'fill-empty-pub-tables',
  'how-to-run-successful-pub-events',
  'instagram-marketing-for-pubs',
  'live-music-events-for-pubs',
  'local-pub-marketing',
  'low-budget-pub-marketing-ideas',
  'midweek-pub-offers-that-work',
  'premium-pub-positioning',
  'profitable-pub-food-menu-ideas',
  'pub-differentiation-strategies',
  'pub-empty-tuesday-nights',
  'pub-refurbishment-on-budget',
  'quiet-monday-night-promotions',
  'quiz-night-ideas',
  'recession-proof-pub-strategies',
  'seasonal-pub-events-calendar',
  'social-media-strategy-for-pubs',
  'summer-pub-event-ideas',
  'why-is-my-pub-empty'
];

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

  // Add blog posts
  const blogPages = blogPosts.map(slug => ({
    url: `${baseUrl}/licensees-guide/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Add category pages
  const categories = [
    'empty-pub-solutions',
    'social-media',
    'competition',
    'events',
    'menu-pricing'
  ];

  const categoryPages = categories.map(category => ({
    url: `${baseUrl}/licensees-guide/category/${category}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  return [...pages, ...servicePages, ...licenseeGuidePages, ...blogPages, ...categoryPages];
}