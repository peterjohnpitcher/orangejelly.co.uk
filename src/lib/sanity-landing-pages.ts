import { client } from './sanity.client';
import type { PortableTextBlock } from '@portabletext/types';

export interface LandingPageContent {
  _id: string;
  _type: 'landingPageContent';
  slug: {
    current: string;
  };
  title: string;
  heroSection?: {
    title: string;
    subtitle: string;
    ctaText?: string;
    bottomText?: string;
  };
  emergencyCategories?: Array<{
    _key: string;
    icon: string;
    title: string;
    items: string[];
  }>;
  timeline?: Array<{
    _key: string;
    week: string;
    title: string;
    description?: string;
    actions?: string[];
  }>;
  strategies?: Array<{
    _key: string;
    title: string;
    description?: string;
    points?: string[];
  }>;
  howToSteps?: Array<{
    _key: string;
    step: string;
    title: string;
    description?: string;
  }>;
  faqs?: Array<{
    _key: string;
    question: string;
    answer: string;
  }>;
  successMetrics?: {
    title?: string;
    metrics?: Array<{
      _key: string;
      value: string;
      label: string;
      description?: string;
    }>;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: any;
  };
}

export interface ContactFAQ {
  _id: string;
  _type: 'contactFAQ';
  question: string;
  answer: string;
  category?: string;
  order?: number;
  active?: boolean;
}

export interface Testimonial {
  _id: string;
  _type: 'testimonial';
  name: string;
  role?: string;
  pubName?: string;
  location?: string;
  testimonialType: 'text' | 'video';
  quote: string;
  videoUrl?: string;
  thumbnailImage?: any;
  highlight?: string;
  featured?: boolean;
  order?: number;
  publishedAt?: string;
}

export interface ErrorPage {
  _id: string;
  _type: 'errorPage';
  pageType: '404' | '500' | 'maintenance';
  title: string;
  subtitle?: string;
  message?: string;
  ctaText?: string;
  suggestedLinks?: Array<{
    _key: string;
    icon?: string;
    title: string;
    description?: string;
    link: string;
    buttonText?: string;
  }>;
  contactSection?: {
    title?: string;
    message?: string;
    showWhatsApp?: boolean;
  };
  active?: boolean;
}

export interface ResultsMetrics {
  _id: string;
  _type: 'resultsMetrics';
  title: string;
  metricsSection?: {
    sectionTitle?: string;
    metrics?: Array<{
      _key: string;
      value: string;
      label: string;
      highlight?: boolean;
    }>;
  };
  heroContent?: {
    title?: string;
    subtitle?: string;
  };
  trustSection?: {
    title?: string;
    content?: PortableTextBlock[];
  };
  ctaSection?: {
    title?: string;
    subtitle?: string;
  };
  active?: boolean;
}

// Queries
const landingPageContentQuery = `*[_type == "landingPageContent" && slug.current == $slug][0]`;
const contactFAQsQuery = `*[_type == "contactFAQ" && active == true] | order(order asc)`;
const testimonialsQuery = `*[_type == "testimonial" && featured == true] | order(order asc)`;
const errorPageQuery = `*[_type == "errorPage" && pageType == $pageType && active == true][0]`;
const resultsMetricsQuery = `*[_type == "resultsMetrics" && active == true][0]`;

// Fetch functions
export async function getLandingPageContent(slug: string): Promise<LandingPageContent | null> {
  try {
    const content = await client.fetch<LandingPageContent>(landingPageContentQuery, { slug });
    return content;
  } catch (error) {
    console.error(`Error fetching landing page content for ${slug}:`, error);
    return null;
  }
}

export async function getContactFAQs(): Promise<ContactFAQ[]> {
  try {
    const faqs = await client.fetch<ContactFAQ[]>(contactFAQsQuery);
    return faqs || [];
  } catch (error) {
    console.error('Error fetching contact FAQs:', error);
    return [];
  }
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  try {
    const testimonials = await client.fetch<Testimonial[]>(testimonialsQuery);
    return testimonials || [];
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

export async function getErrorPageContent(pageType: '404' | '500' | 'maintenance'): Promise<ErrorPage | null> {
  try {
    const content = await client.fetch<ErrorPage>(errorPageQuery, { pageType });
    return content;
  } catch (error) {
    console.error(`Error fetching error page content for ${pageType}:`, error);
    return null;
  }
}

export async function getResultsMetrics(): Promise<ResultsMetrics | null> {
  try {
    const metrics = await client.fetch<ResultsMetrics>(resultsMetricsQuery);
    return metrics;
  } catch (error) {
    console.error('Error fetching results metrics:', error);
    return null;
  }
}