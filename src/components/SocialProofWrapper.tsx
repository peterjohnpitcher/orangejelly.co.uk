import { getSocialProof } from '@/lib/sanity-social-proof';
import SocialProof from './SocialProof';

export default async function SocialProofWrapper() {
  const socialProofItems = await getSocialProof();
  
  return <SocialProof socialProofItems={socialProofItems} />;
}