import { client } from './sanity.client';
import { footerContentQuery } from './sanity.queries';

export interface FooterLink {
  title: string;
  href: string;
  external?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  label?: string;
}

export interface FooterContent {
  _id: string;
  companyInfo?: {
    description?: string;
    registrationInfo?: string;
    vatInfo?: string;
  };
  quickLinks?: FooterLink[];
  services?: FooterLink[];
  legalLinks?: FooterLink[];
  contactInfo?: {
    title?: string;
    phone?: string;
    email?: string;
    address?: string;
  };
  socialLinks?: SocialLink[];
  newsletter?: {
    title?: string;
    description?: string;
    buttonText?: string;
    privacyText?: string;
  };
  bottomBar?: {
    copyrightText?: string;
    additionalText?: string;
  };
}

let cachedFooterContent: FooterContent | null = null;

export async function getFooterContent(): Promise<FooterContent | null> {
  if (cachedFooterContent) {
    return cachedFooterContent;
  }

  try {
    const content = await client.fetch<FooterContent>(footerContentQuery);
    if (content) {
      cachedFooterContent = content;
      return content;
    }
  } catch (error) {
    console.error('Error fetching footer content from Sanity:', error);
  }

  return null;
}