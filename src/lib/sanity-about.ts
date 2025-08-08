import { client } from './sanity.client';
import { aboutContentQuery } from './sanity.queries';

export interface TimelineEvent {
  date: string;
  title: string;
  description?: string;
  highlight?: boolean;
}

export interface Value {
  icon?: string;
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  image?: any;
}

export interface Partnership {
  name: string;
  description?: string;
  logo?: any;
  url?: string;
}

export interface AboutContent {
  _id: string;
  title: string;
  heroSection: {
    title: string;
    subtitle?: string;
  };
  story: any[]; // Portable Text
  timeline?: TimelineEvent[];
  values?: Value[];
  founderSection?: {
    name: string;
    role: string;
    bio: any[]; // Portable Text
    image?: any;
    quote?: string;
  };
  teamMembers?: TeamMember[];
  partnerships?: Partnership[];
  quickFacts?: {
    title?: string;
    facts: string[];
  };
  visitCTA?: {
    title?: string;
    subtitle?: string;
    locationName?: string;
    address?: string;
    mapUrl?: string;
    ctaText?: string;
  };
  whyOrangeJelly?: {
    title?: string;
    content: any[]; // Portable Text
  };
}

let cachedAboutContent: AboutContent | null = null;

export async function getAboutContent(): Promise<AboutContent | null> {
  if (cachedAboutContent) {
    return cachedAboutContent;
  }

  try {
    const content = await client.fetch<AboutContent>(aboutContentQuery);
    if (content) {
      cachedAboutContent = content;
      return content;
    }
  } catch (error) {
    console.error('Error fetching about content from Sanity:', error);
  }

  return null;
}