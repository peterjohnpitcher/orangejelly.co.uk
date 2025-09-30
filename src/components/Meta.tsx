import { type Metadata } from 'next';
import { getBaseUrl } from '@/lib/site-config';

interface MetaProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article';
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
  };
  twitter?: {
    card?: 'summary' | 'summary_large_image';
    creator?: string;
  };
  noindex?: boolean;
  alternates?: {
    canonical?: string;
    languages?: Record<string, string>;
  };
}

const baseUrl = getBaseUrl();

export function generateMeta({
  title,
  description,
  canonical,
  keywords = [],
  ogImage = '/logo.png',
  ogType = 'website',
  article,
  twitter = {},
  noindex = false,
  alternates,
}: MetaProps): Metadata {
  const fullTitle = title.includes('Orange Jelly') ? title : `${title} | Orange Jelly`;
  const canonicalUrl = canonical ? `${baseUrl}${canonical}` : undefined;
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title,
      description,
      type: ogType,
      url: canonicalUrl,
      siteName: 'Orange Jelly',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_GB',
    },
    twitter: {
      card: twitter.card || 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
      creator: twitter.creator || '@orangejelly',
    },
    alternates: alternates || {
      canonical: canonicalUrl,
    },
    authors: [{ name: 'Peter Pitcher' }],
    publisher: 'Orange Jelly Limited',
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    },
  };

  // Add article-specific metadata
  if (ogType === 'article' && article) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime: article.publishedTime,
      modifiedTime: article.modifiedTime,
      authors: article.author ? [article.author] : ['Peter Pitcher'],
      tags: article.tags,
    };
  }

  return metadata;
}

// Helper function for common page patterns
export function generatePageMeta(
  page: 'home' | 'services' | 'about' | 'contact' | 'results' | 'blog',
  overrides: Partial<MetaProps> = {}
): Metadata {
  const pageMeta: Record<string, MetaProps> = {
    home: {
      title: 'Orange Jelly - AI-Powered Marketing That Fills Empty Pubs',
      description:
        'Struggling with empty tables? Orange Jelly uses proven AI tools to fill your pub. Real licensee experience, honest pricing at £75/hour. No packages, just results.',
      keywords: [
        'pub marketing',
        'empty pub solutions',
        'AI pub marketing',
        'fill pub tables',
        'pub social media',
      ],
      canonical: '/',
    },
    services: {
      title: 'Pub Marketing Services - Fill Tables & Boost Revenue | Orange Jelly',
      description:
        'Proven pub marketing services from a real licensee. Social media, events, menu design, business analysis. £75/hour plus VAT. No packages, pay for what you need.',
      keywords: [
        'pub marketing services',
        'pub social media management',
        'pub event planning',
        'menu design',
      ],
      canonical: '/services',
    },
    about: {
      title: 'About Orange Jelly - Real Licensee, Real Results',
      description:
        'Meet Peter Pitcher, licensee of The Anchor pub. Learn how we increased quiz attendance to 25-35 regulars and improved food GP from 58% to 71% using AI tools.',
      keywords: ['Peter Pitcher', 'The Anchor pub', 'Orange Jelly story', 'pub success story'],
      canonical: '/about',
    },
    contact: {
      title: 'Contact Orange Jelly - Get Help for Your Pub Today',
      description:
        'Contact Peter Pitcher directly. WhatsApp 07941 266538 or visit The Anchor pub. No call centres, just one licensee helping another. Available 7 days.',
      keywords: ['contact Orange Jelly', 'Peter Pitcher contact', 'pub marketing help'],
      canonical: '/contact',
    },
    results: {
      title: 'Success Stories - How We Saved The Anchor Pub | Orange Jelly',
      description:
        'Real results from The Anchor: 25-35 quiz regulars, 71% food GP, £250/week waste savings. See exactly how we turned around a struggling pub.',
      keywords: [
        'pub success stories',
        'pub turnaround',
        'increase pub revenue',
        'pub marketing results',
      ],
      canonical: '/results',
    },
    blog: {
      title: "Licensee's Guide - Practical Pub Marketing Tips | Orange Jelly",
      description:
        'Free pub marketing guides from a working licensee. Learn how to fill empty tables, compete with chains, and boost revenue. No theory, just what works.',
      keywords: [
        'pub marketing guide',
        'licensee tips',
        'pub business advice',
        'free pub marketing',
      ],
      canonical: '/licensees-guide',
    },
  };

  const baseMeta = pageMeta[page];
  return generateMeta({ ...baseMeta, ...overrides });
}
