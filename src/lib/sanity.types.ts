// TypeScript types for Sanity data

// Portable Text types
export interface PortableTextBlock {
  _type: string;
  _key?: string;
  style?: string;
  children?: Array<{
    _type: string;
    text?: string;
    marks?: string[];
  }>;
  level?: number;
  listItem?: string;
  markDefs?: Array<any>;
}

export interface SiteSettings {
  businessName: string;
  tagline: string;
  company: {
    registrationNumber?: string;
    vatNumber?: string;
    vatRegistered: boolean;
    owner: string;
    coOwner?: string;
  };
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    whatsappNumber: string;
    address: string;
  };
  pricing: {
    hourlyRate: number;
    currency: string;
    vatRate: number;
    includesVAT: boolean;
  };
  metrics: Array<{
    label: string;
    value: string;
    description?: string;
  }>;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface Navigation {
  mainMenu: NavigationItem[];
  mobileMenu?: NavigationItem[];
}

export interface Service {
  _id: string;
  title: string;
  slug: string;
  emoji?: string;
  problem: string;
  deliverable: string;
  description: string;
  features: string[];
  example?: {
    before?: string;
    after?: string;
    result?: string;
  };
  timeEstimate?: string;
  priceBreakdown?: string;
  price: string;
  timeline?: string;
  highlight?: boolean;
}

export interface FAQ {
  _id: string;
  question: string;
  answer: PortableTextBlock[]; // Portable Text blocks
  category?: string;
  isVoiceOptimized?: boolean;
}

export interface ContentBlock {
  name: string;
  identifier: string;
  type: 'hero' | 'cta' | 'features' | 'problems' | 'metrics' | 'steps' | 'generic';
  content: {
    title?: string;
    subtitle?: string;
    description?: PortableTextBlock[]; // Portable Text
    items?: Array<{
      title: string;
      description?: string;
      icon?: string;
      highlight?: boolean;
    }>;
    cta?: {
      text?: string;
      href?: string;
      whatsappMessage?: string;
    };
  };
  metadata?: {
    page?: string;
    section?: string;
    order?: number;
  };
}