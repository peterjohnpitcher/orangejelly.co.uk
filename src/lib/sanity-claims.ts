import { groq } from 'next-sanity';
import { client } from './sanity.client';

export interface Claim {
  _id: string;
  category: 'timeSaving' | 'timeline' | 'performance' | 'financial' | 'guarantee' | 'customerNumbers' | 'partnership';
  key: string;
  claim: string;
  value?: number;
  unit?: string;
  context?: string;
  timeframe?: string;
  isActive: boolean;
  priority: number;
}

// Get all active claims
export async function getAllClaims(): Promise<Claim[]> {
  try {
    return await client.fetch(
      groq`*[_type == "claims" && isActive == true] | order(priority asc, claim asc)`
    );
  } catch (error) {
    console.error('Error fetching claims from Sanity:', error);
    return [];
  }
}

// Get claims by category
export async function getClaimsByCategory(category: string): Promise<Claim[]> {
  try {
    return await client.fetch(
      groq`*[_type == "claims" && category == $category && isActive == true] | order(priority asc)`,
      { category }
    );
  } catch (error) {
    console.error(`Error fetching ${category} claims from Sanity:`, error);
    return [];
  }
}

// Get a specific claim by key
export async function getClaimByKey(key: string): Promise<Claim | null> {
  try {
    const result = await client.fetch(
      groq`*[_type == "claims" && key == $key && isActive == true][0]`,
      { key }
    );
    return result || null;
  } catch (error) {
    console.error(`Error fetching claim ${key} from Sanity:`, error);
    return null;
  }
}

// Get multiple claims by keys
export async function getClaimsByKeys(keys: string[]): Promise<Record<string, Claim>> {
  try {
    const claims = await client.fetch(
      groq`*[_type == "claims" && key in $keys && isActive == true]`,
      { keys }
    );
    
    // Convert array to object keyed by claim key
    return claims.reduce((acc: Record<string, Claim>, claim: Claim) => {
      acc[claim.key] = claim;
      return acc;
    }, {});
  } catch (error) {
    console.error('Error fetching claims by keys from Sanity:', error);
    return {};
  }
}

// Utility function to format claim with value
export function formatClaim(claim: Claim): string {
  if (!claim) return '';
  
  // If it's just text, return it
  if (!claim.value) return claim.claim;
  
  // If it has a value, you might want to format it
  return claim.claim;
}

// Get frequently used claims for components
export async function getCommonClaims() {
  const keys = [
    'hoursSavedWeekly',
    'resultsTimeline',
    'moneyBack',
    'hourlyRate',
    'quizNightRegulars',
    'foodWasteReduction',
    'socialMediaViews',
    'billyPeterPartnership'
  ];
  
  return getClaimsByKeys(keys);
}