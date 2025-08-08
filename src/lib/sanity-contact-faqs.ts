import { client } from './sanity.client';

export interface ContactFAQ {
  _id: string;
  question: string;
  answer: any[]; // Portable Text blocks
  category: 'pricing' | 'services' | 'process' | 'results' | 'general';
  order: number;
  active: boolean;
}

export async function getContactFAQs(): Promise<ContactFAQ[]> {
  try {
    const query = `*[_type == "contactFAQ" && active == true] | order(order asc) {
      _id,
      question,
      answer,
      category,
      order,
      active
    }`;
    
    const result = await client.fetch(query);
    return result || [];
  } catch (error) {
    console.error('Error fetching Contact FAQs:', error);
    return [];
  }
}