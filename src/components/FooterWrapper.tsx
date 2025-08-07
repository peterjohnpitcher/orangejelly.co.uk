import { Suspense } from 'react';
import { getFooterContent } from '@/lib/sanity-footer';
import FooterSimple from './FooterSimple';
import { AsyncErrorBoundary } from './ErrorBoundary';
import { CardLoading } from './Loading';

// Async component that fetches footer data
async function FooterData() {
  try {
    const footerContent = await getFooterContent();
    return <FooterSimple footerContent={footerContent} />;
  } catch (error) {
    console.error('Error fetching footer content:', error);
    // Return basic footer fallback
    return <FooterSimple footerContent={null} />;
  }
}

export default function FooterWrapper() {
  return (
    <AsyncErrorBoundary
      fallback={<FooterSimple footerContent={null} />} // Always show footer, even if data fails
    >
      <Suspense fallback={<CardLoading />}>
        <FooterData />
      </Suspense>
    </AsyncErrorBoundary>
  );
}