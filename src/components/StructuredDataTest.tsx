'use client';

import { useEffect } from 'react';
import { validateStructuredData, logStructuredDataValidation } from '@/lib/structured-data-validator';

interface StructuredDataTestProps {
  data: any;
  name: string;
}

export default function StructuredDataTest({ data, name }: StructuredDataTestProps) {
  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV === 'development') {
      logStructuredDataValidation(data, name);
      
      // Also test with Google's structured data testing tool format
      if (typeof window !== 'undefined' && (window as any).structuredDataTests) {
        (window as any).structuredDataTests.push({
          name,
          data,
          validation: validateStructuredData(data)
        });
      }
    }
  }, [data, name]);

  // Don't render anything in production
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  const result = validateStructuredData(data);

  return (
    <div className="hidden">
      <div data-testid={`structured-data-${name}`}>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    </div>
  );
}