import { client } from './sanity.client';
import { caseStudiesQuery } from './sanity.queries';

export interface CaseStudyResult {
  metric: string;
  value: string;
  improvement?: string;
}

export interface CaseStudyQuote {
  text: string;
  author: string;
  role?: string;
}

export interface CaseStudy {
  _id: string;
  title: string;
  slug: { current: string };
  subtitle: string;
  client?: string;
  problem: any[]; // Portable Text
  failedAttempts?: string[];
  solution: any[]; // Portable Text
  results: CaseStudyResult[];
  timeInvestment: string;
  learnings?: string[];
  quote?: CaseStudyQuote;
  relatedService?: any;
  order: number;
}

let cachedCaseStudies: CaseStudy[] | null = null;

export async function getCaseStudies(): Promise<CaseStudy[]> {
  if (cachedCaseStudies) {
    return cachedCaseStudies;
  }

  try {
    const caseStudies = await client.fetch<CaseStudy[]>(caseStudiesQuery);
    if (caseStudies && caseStudies.length > 0) {
      cachedCaseStudies = caseStudies;
      return caseStudies;
    }
  } catch (error) {
    console.error('Error fetching case studies from Sanity:', error);
  }

  // Return empty array if no case studies found
  return [];
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const caseStudies = await getCaseStudies();
  return caseStudies.find(study => study.slug?.current === slug) || null;
}