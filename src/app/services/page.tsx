import { generateStaticMetadata } from '@/lib/metadata';
import ServicesPage from './ServicesPage';

export async function generateMetadata() {
  return generateStaticMetadata({
    title: 'Pub Recovery Services - Turn Your Empty Nights Into Profitable Ones',
    description:
      'How do I fill my empty pub on Tuesday nights? How can I increase pub food sales? Orange Jelly offers proven pub recovery services that deliver results within 30 days. £62.50 per hour plus VAT. AI training and consulting for UK licensees.',
    path: '/services',
    keywords:
      'pub marketing services, pub menu design, pub social media management, pub website design, AI training for pubs, pub consultancy UK',
  });
}

export default function Services() {
  return <ServicesPage />;
}
