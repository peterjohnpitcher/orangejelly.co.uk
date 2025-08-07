import { Suspense } from 'react';
import { generateSanityMetadata } from '@/lib/metadata-sanity';
import AboutPage from './AboutPage';
import { getAboutContent } from '@/lib/sanity-about';
import { getSiteSettings } from '@/lib/sanity-settings';
import { AsyncErrorBoundary } from '@/components/ErrorBoundary';
import { PageLoading } from '@/components/Loading';

export async function generateMetadata() {
  return generateSanityMetadata('about', {
    title: 'About Orange Jelly - From One licensee to Another',
    description: 'Who is Peter Pitcher? How can AI help my pub? Meet the pub owner behind Orange Jelly who helps UK licensees save 5+ hours weekly with practical AI tools. Real experience from running The Anchor pub.',
    path: '/about',
    keywords: ['Peter Pitcher', 'Orange Jelly', 'pub AI tools', 'The Anchor Stanwell Moor', 'pub marketing consultant', 'licensee helping licensees'],
  });
}

// Async component that fetches data
async function AboutPageData() {
  try {
    // Fetch about content from Sanity
    const [aboutContent, siteSettings] = await Promise.all([
      getAboutContent(),
      getSiteSettings()
    ]);
    
    // Fetch FAQs and Author from Sanity
    const { client } = await import('@/lib/sanity.client');
    const { faqsQuery } = await import('@/lib/sanity.queries');
    
    // Fetch Peter Pitcher author data for the image
    const authorQuery = `*[_type == "author" && _id == "author-peter-pitcher"][0] {
      name,
      role,
      bio,
      image {
        asset->{
          _id,
          url
        }
      }
    }`;
    const author = await client.fetch(authorQuery);
    const faqs = await client.fetch(faqsQuery, { page: 'about' });

    // Generate comprehensive schema for About page
    const aboutSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "AboutPage",
          "name": "About Orange Jelly - From One licensee to Another",
          "description": "Learn about Peter Pitcher and Billy Summers, who run The Anchor pub and help other licensees save time with AI tools.",
          "url": "https://www.orangejelly.co.uk/about",
          "mainEntity": {
            "@id": "https://www.orangejelly.co.uk/#organization"
          }
        },
        {
          "@type": "Person",
          "@id": "https://www.orangejelly.co.uk/#peter-pitcher",
          "name": "Peter Pitcher",
          "jobTitle": "Founder & AI Consultant",
          "description": "Pub owner who discovered how AI can Save At Least 5 Hours a Week on boring admin tasks. Co-owner of The Anchor in Stanwell Moor with wife Billy Summers.",
          "spouse": {
            "@type": "Person",
            "name": "Billy Summers",
            "jobTitle": "Operations Manager at The Anchor"
          },
          "worksFor": [
            {
              "@id": "https://www.orangejelly.co.uk/#organization"
            },
            {
              "@type": "Restaurant",
              "name": "The Anchor",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Horton Road",
                "addressLocality": "Stanwell Moor",
                "addressRegion": "Surrey",
                "postalCode": "TW19 6AQ",
                "addressCountry": "GB"
              }
            }
          ],
          "knowsAbout": ["AI Tools", "Pub Management", "Marketing Automation", "Hospitality", "Small Business"],
          "alumniOf": {
            "@type": "EducationalOrganization",
            "name": "School of Life - Running a Pub"
          }
        },
        {
          "@type": "Organization",
          "@id": "https://www.orangejelly.co.uk/#organization",
          "name": "Orange Jelly Limited",
          "alternateName": "Orange Jelly",
          "url": "https://www.orangejelly.co.uk",
          "logo": "https://www.orangejelly.co.uk/logo.png",
          "founder": {
            "@id": "https://www.orangejelly.co.uk/#peter-pitcher"
          },
          "foundingDate": "2019",
          "description": "AI-powered marketing solutions for UK pubs and restaurants from real licensees who understand the challenges.",
          "areaServed": {
            "@type": "Country",
            "name": "United Kingdom"
          },
          "knowsAbout": ["Pub Marketing", "AI Tools", "Social Media Automation", "Menu Design", "Customer Retention"],
          "slogan": "Save At Least 5 Hours a Week with AI",
          "priceRange": "££",
          "award": [
            "Featured in BII Autumn 2025 magazine for AI innovation",
            "Transformed The Anchor from struggling to thriving"
          ]
        }
      ]
    };

    return (
      <>
        <AboutPage aboutContent={aboutContent} faqs={faqs} siteSettings={siteSettings} author={author} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
        />
      </>
    );
  } catch (error) {
    console.error('Error fetching about page data:', error);
    throw new Error('Failed to load about page content. Please try again.');
  }
}

export default function About() {
  return (
    <AsyncErrorBoundary>
      <Suspense fallback={<PageLoading message="Loading our story..." />}>
        <AboutPageData />
      </Suspense>
    </AsyncErrorBoundary>
  );
}