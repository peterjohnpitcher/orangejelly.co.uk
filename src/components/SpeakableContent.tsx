import { logStructuredDataValidation } from '@/lib/structured-data-validator';

interface SpeakableContentProps {
  cssSelectors: string[];
  url?: string;
}

export function SpeakableContent({ cssSelectors, url }: SpeakableContentProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    ...(url && { "@id": `https://www.orangejelly.co.uk${url}` }),
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": cssSelectors
    }
  };

  // Validate in development
  if (process.env.NODE_ENV === 'development') {
    logStructuredDataValidation(schema, 'SpeakableContent');
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}