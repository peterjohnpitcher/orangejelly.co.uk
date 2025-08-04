// SEO Meta component for voice search optimization
import Head from 'next/head';

interface SEOMetaProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: object;
  canonicalUrl?: string;
  noindex?: boolean;
}

export default function SEOMeta({
  title,
  description,
  keywords,
  ogImage = '/logo.png',
  ogType = 'website',
  structuredData,
  canonicalUrl,
  noindex = false
}: SEOMetaProps) {
  // Ensure description is voice search friendly (question-answer format when possible)
  const voiceOptimizedDescription = description.length > 160 
    ? description.substring(0, 157) + '...' 
    : description;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={voiceOptimizedDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#FF6B35" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={voiceOptimizedDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:site_name" content="Orange Jelly" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={voiceOptimizedDescription} />
      <meta property="twitter:image" content={ogImage} />
      
      {/* Language */}
      <meta httpEquiv="content-language" content="en-GB" />
      <link rel="alternate" hrefLang="en-GB" href={canonicalUrl || 'https://www.orangejelly.co.uk'} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <>
          <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
          <meta name="googlebot" content="index, follow" />
        </>
      )}
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      
      {/* PWA Tags */}
      <link rel="manifest" href="/manifest.json" />
      <meta name="application-name" content="Orange Jelly" />
      <meta name="apple-mobile-web-app-title" content="Orange Jelly" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
    </Head>
  );
}

// Voice search optimized meta descriptions generator
export function generateVoiceSearchDescription(params: {
  question: string;
  answer: string;
  cta?: string;
}): string {
  const { question, answer, cta } = params;
  const baseDescription = `${question} ${answer}`;
  const fullDescription = cta ? `${baseDescription} ${cta}` : baseDescription;
  
  // Ensure it's within optimal length for search results
  if (fullDescription.length > 160) {
    return fullDescription.substring(0, 157) + '...';
  }
  
  return fullDescription;
}

// Common voice search patterns for pubs
export const voiceSearchPatterns = {
  howTo: (action: string, result: string) => 
    `How to ${action}? ${result}`,
  
  whatIs: (topic: string, explanation: string) => 
    `What is ${topic}? ${explanation}`,
  
  whereCanI: (action: string, solution: string) => 
    `Where can I ${action}? ${solution}`,
  
  howMuch: (service: string, price: string) => 
    `How much does ${service} cost? ${price}`,
  
  whyShould: (action: string, benefit: string) => 
    `Why should I ${action}? ${benefit}`,
};