import { createClient } from '@sanity/client';

// Write client with authentication token
// Only use this for mutations (create, update, delete)
export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'demo-project',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Always bypass CDN for writes
  token: process.env.SANITY_API_TOKEN,
});

// Helper to check if we have write access
export function hasWriteAccess(): boolean {
  return !!process.env.SANITY_API_TOKEN;
}