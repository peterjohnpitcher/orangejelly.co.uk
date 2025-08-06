import { generateSanityMetadata } from '@/lib/metadata-sanity';
import HomePage from './HomePage';
import { getHomepageContent } from '@/lib/sanity-content';
import { getTrustBadges } from '@/lib/sanity-social-proof';
import { getSiteSettings } from '@/lib/sanity-settings';

export async function generateMetadata() {
  return generateSanityMetadata('home', {
    title: 'How to Fill Empty Pub Tables | Pub Marketing That Works',
    description: 'Struggling with empty pub tables? We use AI-powered marketing strategies that transformed The Anchor from struggling to thriving. From one licensee to another. £62.50 per hour plus VAT.',
    path: '/',
    keywords: ['pub marketing UK', 'fill empty pub tables', 'pub marketing strategies', 'increase pub customers', 'pub social media marketing', 'pub turnaround', 'empty pub solutions'],
  });
}

export default async function Home() {
  // Fetch content from Sanity
  const { faqs, problems, features, metrics } = await getHomepageContent();
  const trustBadges = await getTrustBadges();
  const siteSettings = await getSiteSettings();

  return (
    <HomePage 
      faqs={faqs}
      problems={problems}
      features={features}
      metrics={metrics}
      trustBadges={trustBadges}
      siteSettings={siteSettings}
    />
  );
}