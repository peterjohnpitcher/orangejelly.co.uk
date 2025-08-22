import SocialProof from './SocialProof';

// Import social proof data
const socialProofData = require('../../content/data/social-proof.json');

// Define local social proof type interface
interface LocalSocialProofItem {
  title: string;
  displayText: string;
  value: string;
  category: string;
  timeframe: string;
  location: string;
  order: number;
  isActive: boolean;
}

export default function SocialProofWrapper() {
  // Cast the imported data to the correct type
  const socialProofItems = socialProofData as LocalSocialProofItem[];
  
  return <SocialProof socialProofItems={socialProofItems} />;
}