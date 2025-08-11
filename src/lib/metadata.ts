import { type Metadata } from 'next';

interface GenerateMetadataProps {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  ogImage?: string;
  noIndex?: boolean;
  ogType?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

export function generateMetadata({
  title,
  description,
  path,
  keywords,
  ogImage = '/logo.png',
  noIndex = false,
  ogType = 'website',
  publishedTime,
  modifiedTime,
  author,
}: GenerateMetadataProps): Metadata {
  const baseUrl = 'https://www.orangejelly.co.uk';

  // Normalize path
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const cleanPath = normalizedPath === '/' ? normalizedPath : normalizedPath.replace(/\/$/, '');

  const canonicalUrl = `${baseUrl}${cleanPath}`;
  const fullTitle = `${title} | Orange Jelly`;

  return {
    title: fullTitle,
    description,
    keywords,
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: 'Orange Jelly',
      type: ogType,
      locale: 'en_GB',
      images: [
        {
          url: ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && {
        authors: [author],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-GB': canonicalUrl,
        'x-default': canonicalUrl,
      },
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      nocache: noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'format-detection': 'telephone=no',
    },
  };
}

// Helper for page-specific metadata
export const pageMetadata = {
  home: {
    title: 'How to Fill Empty Pub Tables | Pub Marketing That Works',
    description:
      'Struggling with empty pub tables? We use AI-powered marketing strategies that transformed The Anchor from struggling to thriving. From one licensee to another.',
    keywords:
      'pub marketing UK, fill empty pub tables, pub marketing strategies, increase pub customers, pub social media marketing, pub turnaround',
  },
  services: {
    title: 'Pub Marketing Services | Fill Tables & Boost Revenue',
    description:
      'Proven pub marketing services that fill empty tables. Menu optimization, social media automation, website design. All from real licensees who understand your challenges.',
    keywords:
      'pub marketing services, pub social media management, pub menu design, pub website design, pub marketing packages',
  },
  results: {
    title: 'Pub Marketing Success Stories | Real Results from Real Pubs',
    description:
      'See how we helped UK pubs increase covers by 40%+ with proven marketing strategies. Real results, real testimonials, real revenue growth.',
    keywords:
      'pub marketing results, pub success stories, pub turnaround stories, pub marketing case studies',
  },
  about: {
    title: 'About Orange Jelly | From licensees, For licensees',
    description:
      'Meet Peter Pitcher, owner of The Anchor pub and founder of Orange Jelly. Learn how we use AI-powered marketing to help UK pubs thrive.',
    keywords:
      'Orange Jelly pub marketing, Peter Pitcher, The Anchor Stanwell Moor, pub marketing agency UK',
  },
  contact: {
    title: 'Contact Orange Jelly | Get Help Filling Your Pub',
    description:
      'Ready to fill your empty pub tables? Contact Orange Jelly for a free chat about your challenges. Real advice from real licensees.',
    keywords: 'contact pub marketing, pub marketing consultation, pub marketing help UK',
  },
};
