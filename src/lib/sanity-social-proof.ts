import { client } from './sanity.client';
import { socialProofQuery, trustBadgesQuery } from './sanity.queries';

export interface SocialProofItem {
  _id: string;
  title: string;
  value: string;
  timeframe?: string;
  location?: string;
  category: 'revenue' | 'attendance' | 'efficiency' | 'growth' | 'savings';
  displayText: string;
}

export interface TrustBadge {
  _id: string;
  title: string;
  subtitle: string;
  icon: 'money' | 'clock' | 'shield' | 'star' | 'check' | 'heart';
  color: 'orange' | 'teal' | 'default';
}

let cachedSocialProof: SocialProofItem[] | null = null;
let cachedTrustBadges: TrustBadge[] | null = null;

export async function getSocialProof(): Promise<SocialProofItem[]> {
  if (cachedSocialProof) {
    return cachedSocialProof;
  }

  try {
    const items = await client.fetch<SocialProofItem[]>(socialProofQuery);
    if (items && items.length > 0) {
      cachedSocialProof = items;
      return items;
    }
  } catch (error) {
    console.error('Error fetching social proof from Sanity:', error);
  }

  // Fallback data
  return [
    {
      _id: '1',
      title: 'Sunday Roast Sales',
      value: '£400+',
      timeframe: 'per week',
      location: 'The Anchor',
      category: 'revenue',
      displayText: 'Sunday roast sales up £400+ per week',
    },
    {
      _id: '2',
      title: 'Quiz Night Attendance',
      value: '80%',
      timeframe: 'increase',
      location: 'The Anchor',
      category: 'growth',
      displayText: 'Quiz night attendance up 80%',
    },
    {
      _id: '3',
      title: 'Overall Revenue',
      value: '22%',
      timeframe: 'growth',
      location: 'The Anchor',
      category: 'growth',
      displayText: '22% overall revenue growth',
    },
  ];
}

export async function getTrustBadges(): Promise<TrustBadge[]> {
  if (cachedTrustBadges) {
    return cachedTrustBadges;
  }

  try {
    const badges = await client.fetch<TrustBadge[]>(trustBadgesQuery);
    if (badges && badges.length > 0) {
      cachedTrustBadges = badges;
      return badges;
    }
  } catch (error) {
    console.error('Error fetching trust badges from Sanity:', error);
  }

  // Fallback data
  return [
    {
      _id: '1',
      title: 'No Agency Fees',
      subtitle: 'Just honest pricing',
      icon: 'money',
      color: 'orange',
    },
    {
      _id: '2',
      title: 'Results in 14 Days',
      subtitle: 'Or your money back',
      icon: 'clock',
      color: 'teal',
    },
    {
      _id: '3',
      title: 'Cost Effective',
      subtitle: 'Less than part-time staff',
      icon: 'shield',
      color: 'orange',
    },
  ];
}