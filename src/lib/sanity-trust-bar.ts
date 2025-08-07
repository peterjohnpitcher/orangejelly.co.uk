import { client } from './sanity.client';

export interface TrustItem {
  value: string;
  label: string;
  order: number;
}

export interface TrustBarContent {
  title: string;
  items: TrustItem[];
  active: boolean;
}

export async function getTrustBarContent(): Promise<TrustItem[] | null> {
  try {
    const query = `*[_type == "trustBar" && _id == "trustBar" && active == true][0] {
      items[] {
        value,
        label,
        order
      } | order(order asc)
    }`;
    
    const result = await client.fetch(query);
    return result?.items || null;
  } catch (error) {
    console.error('Error fetching Trust Bar content:', error);
    return null;
  }
}