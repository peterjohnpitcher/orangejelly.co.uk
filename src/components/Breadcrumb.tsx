import Link from 'next/link';
import { getBaseUrl } from '@/lib/site-config';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  // Generate breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      ...(item.href && { "item": `${getBaseUrl()}${item.href}` })
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav 
        aria-label="Breadcrumb" 
        className={`text-sm ${className}`}
      >
        <ol className="flex items-baseline flex-wrap">
          {items.map((item, index) => (
            <li key={index} className="inline-flex items-baseline">
              {index > 0 && (
                <span className="mx-2 text-charcoal/40" aria-hidden="true">
                  /
                </span>
              )}
              {item.href && index < items.length - 1 ? (
                <Link 
                  href={item.href} 
                  className="text-charcoal/70 hover:text-orange transition-colors inline-block"
                >
                  {item.label}
                </Link>
              ) : (
                <span 
                  className={index === items.length - 1 ? 'text-charcoal font-medium' : 'text-charcoal/70'}
                  aria-current={index === items.length - 1 ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

// Pre-defined breadcrumb paths for common pages
export const breadcrumbPaths = {
  services: [
    { label: 'Home', href: '/' },
    { label: 'Services' }
  ],
  about: [
    { label: 'Home', href: '/' },
    { label: 'About' }
  ],
  results: [
    { label: 'Home', href: '/' },
    { label: 'Success Stories' }
  ],
  contact: [
    { label: 'Home', href: '/' },
    { label: 'Contact' }
  ],
  licenseesGuide: [
    { label: 'Home', href: '/' },
    { label: "The Licensee's Guide", href: '/licensees-guide' }
  ],
  // Service-specific breadcrumbs
  emptyPubRecovery: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Empty Pub Recovery' }
  ],
  boostFoodSales: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Boost Food Sales' }
  ],
  marketing: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Marketing' }
  ],
  website: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Get Found Online' }
  ],
  training: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'AI Training' }
  ]
};
