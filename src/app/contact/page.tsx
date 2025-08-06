import dynamic from 'next/dynamic';
import Loading from '@/components/Loading';
import { generateSanityMetadata } from '@/lib/metadata-sanity';

const ContactPage = dynamic(
  () => import('./ContactPage'),
  {
    loading: () => <Loading fullScreen />,
    ssr: true // Keep SSR for SEO
  }
);

export async function generateMetadata() {
  return generateSanityMetadata('contact', {
    title: 'Contact Orange Jelly | Get in Touch with Peter',
    description: 'How do I contact Orange Jelly? Speak directly with Peter Pitcher about AI tools for your pub. WhatsApp preferred, or call 07941 266538. Visit us at The Anchor pub in Stanwell. No contact forms, just real conversation.',
    keywords: ['contact Orange Jelly', 'pub marketing help', 'Peter Pitcher contact', 'pub consultation', 'WhatsApp pub help'],
  });
}

export default function Contact() {
  return <ContactPage />;
}