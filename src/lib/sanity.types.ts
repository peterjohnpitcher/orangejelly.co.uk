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

// Services Page Content types
export interface ServicesPageContent {
  _id: string;
  title: string;
  hero: {
    title: string;
    subtitle: string;
    ctaText?: string;
    bottomText?: string;
  };
  introSection: {
    heading: string;
    description: string;
  };
  processSection: {
    heading: string;
    steps: Array<{
      stepNumber: number;
      title: string;
      description: string;
    }>;
    ctaText?: string;
    ctaSubtext?: string;
  };
  guaranteeSection: {
    heading: string;
    description: string;
    checkmarkText?: string;
    checkmarkSubtext?: string;
  };
  faqSection: {
    heading: string;
  };
  ctaSection: {
    title: string;
    subtitle: string;
    buttonText?: string;
    whatsappMessage?: string;
    bottomText?: string;
  };
  relatedLinksSection?: {
    title?: string;
    clusterId?: string;
  };
  speakableContent?: Array<{
    question: string;
    answer: string;
  }>;
}

export interface ServicePackage {
  _id: string;
  id: string;
  title: string;
  emoji: string;
  problem: string;
  deliverable: string;
  description: string;
  features: string[];
  example?: {
    before: string;
    after: string;
    result: string;
  };
  timeEstimate: string;
  priceBreakdown?: string;
  price: string;
  ctaText: string;
  highlight?: boolean;
  order: number;
}

export interface ServicesFAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}