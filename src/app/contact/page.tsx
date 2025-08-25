import { generateStaticMetadata } from '@/lib/metadata';
import ContactPage from './ContactPage';

export async function generateMetadata() {
  return generateStaticMetadata({
    title: 'Contact Orange Jelly | Get in Touch with Peter',
    description:
      'How do I contact Orange Jelly? Speak directly with Peter Pitcher about AI tools for your pub. WhatsApp preferred, or call 07990 587315. Visit us at The Anchor pub in Stanwell. No contact forms, just real conversation.',
    path: '/contact',
    keywords:
      'contact Orange Jelly, pub marketing help, Peter Pitcher contact, pub consultation, WhatsApp pub help',
    ogImage: '/images/og-default.jpg',
    ogType: 'website',
  });
}

export default function Contact() {
  return <ContactPage />;
}
