import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import OptimizedImage from "@/components/OptimizedImage";
import "./globals.css";
import FooterWrapper from "@/components/FooterWrapper";
import WhatsAppButton from "@/components/WhatsAppButton";
import NavigationWrapper from "@/components/NavigationWrapper";
import ErrorBoundary from "@/components/ErrorBoundary";
import PerformanceMonitor, { PreloadResources } from "@/components/PerformanceMonitor";
import { GoogleTagManager, GoogleTagManagerNoscript } from "@/components/GoogleTagManager";
import { CONTACT, URLS, MESSAGES } from "@/lib/constants";
import Button from "@/components/Button";
import { ROICalculatorProvider } from "@/contexts/ROICalculatorContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.orangejelly.co.uk';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "How to Fill Empty Pub Tables | Pub Marketing That Works | Orange Jelly",
  description: "How can I fill my empty pub tables? Orange Jelly provides AI-powered marketing tools that help UK licensees attract more customers. Save 5+ hours weekly with proven strategies from The Anchor pub owner. Menu optimization, social media automation, and more.",
  keywords: "pub AI tools, save time running pub, pub marketing help, menu writing service, Orange Jelly, Peter Pitcher, how to fill empty pub tables, pub marketing UK, automate pub social media",
  openGraph: {
    title: "How to Fill Empty Pub Tables | Pub Marketing That Works | Orange Jelly",
    description: "Struggling with empty pub tables? We use AI-powered marketing strategies that transformed The Anchor. First pub chain training September 2025.",
    type: "website",
    url: "https://www.orangejelly.co.uk",
    locale: 'en_GB',
    siteName: 'Orange Jelly',
    images: [
      {
        url: `${baseUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Orange Jelly — Pub marketing that works",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Fill Empty Pub Tables | Pub Marketing That Works | Orange Jelly",
    description: "Struggling with empty pub tables? AI-powered marketing tools for UK pubs. Save 5+ hours weekly.",
    images: [`${baseUrl}/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  alternates: {
    canonical: 'https://www.orangejelly.co.uk',
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
    shortcut: '/icon.png',
  },
  manifest: '/manifest.json',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'format-detection': 'telephone=no',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Simplified, performance-conscious schema.org structured data
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${baseUrl}/#organization`,
    "name": "Orange Jelly Limited",
    "alternateName": "Orange Jelly",
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/logo.png`,
      "width": 800,
      "height": 800
    },
    "image": `${baseUrl}/logo.png`,
    "description": "Struggling with empty pub tables? We use AI-powered marketing strategies that transformed The Anchor from struggling to thriving. From one licensee to another.",
    "founder": {
      "@type": "Person",
      "@id": `${baseUrl}/#peter-pitcher`,
      "name": "Peter Pitcher",
      "jobTitle": "Founder & AI Consultant",
      "description": "Former struggling pub owner who discovered how AI could transform pub marketing. Now helps other licensees save time and fill empty tables."
    },
    "foundingDate": "2019",
    "areaServed": "GB",
    "priceRange": "££",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": `${CONTACT.phoneInternational}`,
      "contactType": "Customer Service",
      "email": CONTACT.email,
      "availableLanguage": "English",
      "contactOption": ["TollFree"],
      "areaServed": "GB"
    },
    "sameAs": ["https://the-anchor.pub"]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "url": baseUrl,
    "name": "Orange Jelly - Pub Marketing That Works",
    "description": "Struggling with empty pub tables? We use AI-powered marketing strategies that transformed The Anchor from struggling to thriving. From one licensee to another.",
    "publisher": {
      "@id": "https://www.orangejelly.co.uk/#organization"
    },
    "inLanguage": "en-GB"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      }
    ]
  };

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [organizationSchema, websiteSchema, breadcrumbSchema]
  };

  return (
    <html lang="en-GB">
      <head>
        <PreloadResources />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
        />
        <GoogleTagManager />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <GoogleTagManagerNoscript />
        {/* Skip to main content link for keyboard navigation */}
        <Link 
          href="#main-content" 
          className="skip-to-main sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-orange focus:text-white focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to main content
        </Link>
        
        {/* Navigation only - SuperHeader removed for cleaner layout */}
        <NavigationWrapper />
        <ROICalculatorProvider>
          <ErrorBoundary>
            <main id="main-content" className="min-h-screen pt-16">
              {children}
            </main>
          </ErrorBoundary>
        </ROICalculatorProvider>
        <FooterWrapper />
        <PerformanceMonitor />
        
        
        
        {/* WhatsApp floating button for mobile with branding */}
        <div className="fixed bottom-4 left-4 z-40 md:hidden">
          <div className="relative group">
            {/* Small Orange Jelly logo above WhatsApp */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <OptimizedImage
                src="/logo.png"
                alt="Orange Jelly - AI tools for licensees"
                width={32}
                height={32}
                className="rounded shadow-lg"
                loading="lazy"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
            
            <Button
              href={URLS.whatsapp(MESSAGES.whatsapp.services)}
              variant="custom"
              className="block bg-green-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 relative overflow-hidden"
              aria-label={`Contact us on WhatsApp at ${CONTACT.phone}`}
              external={true}
            >
              {/* Orange accent */}
              <div className="absolute inset-0 bg-orange/20 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></div>
              
              <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.693.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}