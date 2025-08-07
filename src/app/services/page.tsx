import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Loading from '@/components/Loading';
import { generateSanityMetadata } from '@/lib/metadata-sanity';
import { AsyncErrorBoundary } from '@/components/ErrorBoundary';
import { PageLoading } from '@/components/Loading';

const ServicesPage = dynamic(
  () => import('./ServicesPage'),
  {
    loading: () => <Loading fullScreen />,
    ssr: true // Keep SSR for SEO
  }
);

export async function generateMetadata() {
  return generateSanityMetadata('services', {
    title: 'Pub Recovery Services - Turn Your Empty Nights Into Profitable Ones',
    description: 'How do I fill my empty pub on Tuesday nights? How can I increase pub food sales? Orange Jelly offers proven pub recovery services that deliver results within 30 days. £62.50 per hour plus VAT. AI training and consulting for UK licensees.',
    path: '/services',
    keywords: ['pub marketing services', 'pub menu design', 'pub social media management', 'pub website design', 'AI training for pubs', 'pub consultancy UK']
  });
}

// Async component that fetches data
async function ServicesPageData() {
  try {
    // Import our new services content functions
    const {
      getServicesPageContent,
      getServicePackages,
      getServicesFAQs
    } = await import('@/lib/sanity-services-page');
    
    // Fetch all services content from Sanity
    const [servicesPageContent, servicePackages, servicesFAQs] = await Promise.all([
      getServicesPageContent(),
      getServicePackages(),
      getServicesFAQs()
    ]);
    
    // Fetch partnerships from About content
    const { getAboutContent } = await import('@/lib/sanity-about');
    const aboutContent = await getAboutContent();
    
    return (
      <ServicesPage 
        servicesPageContent={servicesPageContent}
        servicePackages={servicePackages}
        servicesFAQs={servicesFAQs}
        partnerships={aboutContent?.partnerships} 
      />
    );
  } catch (error) {
    console.error('Error fetching services page data:', error);
    throw new Error('Failed to load services page content. Please try again.');
  }
}

export default function Services() {
  return (
    <AsyncErrorBoundary>
      <Suspense fallback={<PageLoading message="Loading our services..." />}>
        <ServicesPageData />
      </Suspense>
    </AsyncErrorBoundary>
  );
}