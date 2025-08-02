import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnchorBadge from "@/components/AnchorBadge";
import { FloatingTrustBadge } from "@/components/TrustBadges";
import StickyCTA from "@/components/StickyCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CONTACT, URLS, MESSAGES } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://orangejelly.co.uk'),
  title: "Orange Jelly - Save At Least 5 Hours a Week Running Your Pub",
  description: "AI tools that actually work for publicans. From one pub owner to another. Simple, fair pricing, real results from The Anchor.",
  keywords: "pub AI tools, save time running pub, pub marketing help, menu writing service, Orange Jelly, Peter Pitcher",
  openGraph: {
    title: "Orange Jelly - Save At Least 5 Hours a Week Running Your Pub",
    description: "AI tools that actually work for publicans. From one pub owner to another.",
    type: "website",
    url: "https://orangejelly.co.uk",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Orange Jelly",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Orange Jelly - Save At Least 5 Hours a Week Running Your Pub",
    description: "AI tools that actually work for publicans.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://orangejelly.co.uk',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Comprehensive schema.org structured data
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://orangejelly.co.uk/#organization",
    "name": "Orange Jelly Limited",
    "alternateName": "Orange Jelly",
    "url": "https://orangejelly.co.uk",
    "logo": {
      "@type": "ImageObject",
      "url": "https://orangejelly.co.uk/logo.png",
      "width": 800,
      "height": 800
    },
    "image": "https://orangejelly.co.uk/logo.png",
    "description": "AI tools that actually work for publicans. From one pub owner to another. Save At Least 5 Hours a Week running your pub with simple, proven AI solutions.",
    "slogan": "Save At Least 5 Hours a Week Running Your Pub",
    "founder": {
      "@type": "Person",
      "@id": "https://orangejelly.co.uk/#peter-pitcher",
      "name": "Peter Pitcher",
      "jobTitle": "Founder & AI Consultant",
      "spouse": {
        "@type": "Person",
        "name": "Billy Summers"
      },
      "worksFor": [
        {
          "@id": "https://orangejelly.co.uk/#organization"
        },
        {
          "@type": "Restaurant",
          "name": "The Anchor",
          "url": "https://the-anchor.pub"
        }
      ]
    },
    "areaServed": {
      "@type": "Country",
      "name": "United Kingdom"
    },
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
    "sameAs": [
      "https://the-anchor.pub"
    ],
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Consulting for Pubs",
          "description": "Personalized AI tool implementation for hospitality businesses"
        }
      }
    ],
    "knowsAbout": [
      "Artificial Intelligence",
      "Hospitality Management",
      "Pub Operations",
      "Restaurant Marketing",
      "Menu Design",
      "Social Media Marketing",
      "Business Automation"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://orangejelly.co.uk/#website",
    "url": "https://orangejelly.co.uk",
    "name": "Orange Jelly - AI Tools for Publicans",
    "description": "Save At Least 5 Hours a Week running your pub with AI tools that actually work. From one pub owner to another.",
    "publisher": {
      "@id": "https://orangejelly.co.uk/#organization"
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
        "item": "https://orangejelly.co.uk"
      }
    ]
  };

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [organizationSchema, websiteSchema, breadcrumbSchema]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* Skip to main content link for keyboard navigation */}
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        
        <Navigation />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
        
        {/* Floating Anchor Badge - appears after scroll */}
        <AnchorBadge variant="floating" size="small" />
        
        {/* Floating Trust Badge - desktop only */}
        <FloatingTrustBadge />
        
        {/* Sticky CTA Bar */}
        <StickyCTA />
        
        {/* WhatsApp floating button for mobile with branding */}
        <div className="fixed bottom-4 left-4 z-40 md:hidden">
          <div className="relative group">
            {/* Small Orange Jelly logo above WhatsApp */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Image
                src="/logo.png"
                alt="Orange Jelly - AI tools for publicans"
                width={32}
                height={32}
                className="rounded shadow-lg"
              />
            </div>
            
            <a
              href={URLS.whatsapp(MESSAGES.whatsapp.services)}
              className="block bg-green-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 relative overflow-hidden"
              aria-label={`Contact us on WhatsApp at ${CONTACT.phone}`}
              rel="noopener noreferrer"
            >
              {/* Orange accent */}
              <div className="absolute inset-0 bg-orange/20 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></div>
              
              <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.693.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}