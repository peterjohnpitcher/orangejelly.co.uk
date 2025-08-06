import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Note: These will need to be added to your .env.local file
// NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
// NEXT_PUBLIC_SANITY_DATASET=production
// SANITY_API_TOKEN=your-token (for write access)

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'demo-project',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  // Don't include token for public read operations
  // token: process.env.SANITY_API_TOKEN,
});

// Helper for generating image URLs
const builder = imageUrlBuilder(client);

export function urlFor(source: { _ref?: string; _type?: string; asset?: { _ref: string } } | string) {
  return builder.image(source);
}