import { Suspense } from 'react';
import { generateSanityMetadata } from '@/lib/metadata-sanity';
import HomePage from './HomePage';
import { getHomepageContent } from '@/lib/sanity-content';
import { getTrustBadges } from '@/lib/sanity-social-proof';
import { getSiteSettings } from '@/lib/sanity-settings';
import { getAboutContent } from '@/lib/sanity-about';
import { getTrustBarContent } from '@/lib/sanity-trust-bar';
import { AsyncErrorBoundary } from '@/components/ErrorBoundary';
import { PageLoading } from '@/components/Loading';

export async function generateMetadata() {
  return generateSanityMetadata('home', {
    title: 'How to Fill Empty Pub Tables | Pub Marketing That Works',
    description: 'Struggling with empty pub tables? We use AI-powered marketing strategies that transformed The Anchor from struggling to thriving. From one licensee to another. £62.50 per hour plus VAT.',
    path: '/',
    keywords: ['pub marketing UK', 'fill empty pub tables', 'pub marketing strategies', 'increase pub customers', 'pub social media marketing', 'pub turnaround', 'empty pub solutions'],
  });
}

// Async component that fetches data
async function HomePageData() {
  try {
    // Fetch content from Sanity
    const [
      { hero, faqs, problems, features, metrics, sectionHeadings },
      trustBadges,
      siteSettings,
      aboutContent,
      trustBarItems
    ] = await Promise.all([
      getHomepageContent(),
      getTrustBadges(),
      getSiteSettings(),
      getAboutContent(),
      getTrustBarContent()
    ]);

    return (
      <HomePage 
        hero={hero}
        faqs={faqs}
        problems={problems}
        features={features}
        metrics={metrics}
        sectionHeadings={sectionHeadings}
        trustBadges={trustBadges}
        siteSettings={siteSettings}
        partnerships={aboutContent?.partnerships}
        trustBarItems={trustBarItems}
      />
    );
  } catch (error) {
    console.error('Error fetching home page data:', error);
    throw new Error('Failed to load home page content. Please try again.');
  }
}

export default function Home() {
  return (
    <AsyncErrorBoundary>
      <Suspense fallback={<PageLoading message="Loading your pub marketing solutions..." />}>
        <HomePageData />
      </Suspense>
    </AsyncErrorBoundary>
  );
}