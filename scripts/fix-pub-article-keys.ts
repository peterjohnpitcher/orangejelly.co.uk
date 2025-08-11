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

// Helper to generate unique keys
function generateKey(prefix: string, index: number): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}_${timestamp}_${index}_${random}`;
}

async function fixArticleKeys() {
  console.log('Fetching article to fix keys...');

  // Fetch the article
  const article = await client.fetch(
    `*[_type == "blogPost" && title match "*Pub Health Check*"][0]`
  );

  if (!article) {
    console.error('Article not found!');
    return;
  }

  console.log('Found article:', article._id);
  console.log('Fixing keys...');

  // Fix quickStats keys
  const fixedQuickStats = article.quickStats?.map((stat: any, index: number) => ({
    ...stat,
    _key: generateKey('stat', index),
  }));

  // Fix content block keys
  const fixedContent = article.content?.map((block: any, index: number) => {
    const newBlock = {
      ...block,
      _key: generateKey('block', index),
    };

    // Fix children keys if they exist
    if (newBlock.children && Array.isArray(newBlock.children)) {
      newBlock.children = newBlock.children.map((child: any, childIndex: number) => ({
        ...child,
        _key: generateKey(`child_${index}`, childIndex),
      }));
    }

    // Fix markDefs keys if they exist
    if (newBlock.markDefs && Array.isArray(newBlock.markDefs)) {
      newBlock.markDefs = newBlock.markDefs.map((mark: any, markIndex: number) => ({
        ...mark,
        _key: generateKey(`mark_${index}`, markIndex),
      }));
    }

    return newBlock;
  });

  // Fix FAQ keys
  const fixedFaqs = article.faqs?.map((faq: any, index: number) => ({
    ...faq,
    _key: generateKey('faq', index),
  }));

  // Patch the document
  try {
    await client
      .patch(article._id)
      .set({
        quickStats: fixedQuickStats,
        content: fixedContent,
        faqs: fixedFaqs,
      })
      .commit();

    console.log('✅ Keys fixed successfully!');
    console.log('Article ID:', article._id);
    console.log('View in Sanity Studio: https://orangejelly.sanity.studio/');
  } catch (error) {
    console.error('❌ Error fixing keys:', error);
  }
}

// Run the script
fixArticleKeys();
