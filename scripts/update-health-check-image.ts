#!/usr/bin/env npx tsx
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function updateArticleImage() {
  console.log('Updating health check article with featured image...');

  // Fetch the article
  const article = await client.fetch(
    `*[_type == "blogPost" && title match "*Pub Health Check*"][0]`
  );

  if (!article) {
    console.error('Article not found!');
    return;
  }

  console.log('Found article:', article._id);

  // For markdown/local content, we'll just store the path as a string
  // The frontend code already handles string featuredImage values
  try {
    await client
      .patch(article._id)
      .set({
        featuredImage: '/images/blog/pub-health-check.svg',
      })
      .commit();

    console.log('✅ Featured image path added successfully!');
    console.log('Image path: /images/blog/pub-health-check.svg');
    console.log('Article should now display with the health check image');
  } catch (error) {
    console.error('❌ Error updating image:', error);
  }
}

// Run the script
updateArticleImage();
