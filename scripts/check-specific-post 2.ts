#!/usr/bin/env npx tsx
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Sanity client configuration - with NO CDN to bypass cache
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false, // Bypass CDN cache
});

async function checkSpecificPost() {
  console.log('🔍 Checking Pub Health Check post specifically...\n');

  try {
    // Try different ways to fetch the post
    console.log('1. Fetching with basic query:');
    const basic = await client.fetch(`
      *[_type == "blogPost" && slug.current == "pub-health-check-essential-fundamentals-licensee-success"][0] {
        title,
        featuredImage
      }
    `);
    console.log('Result:', JSON.stringify(basic, null, 2));

    console.log('\n2. Fetching with asset expansion:');
    const expanded = await client.fetch(`
      *[_type == "blogPost" && slug.current == "pub-health-check-essential-fundamentals-licensee-success"][0] {
        title,
        featuredImage {
          asset->{
            _id,
            url
          },
          alt
        }
      }
    `);
    console.log('Result:', JSON.stringify(expanded, null, 2));

    console.log('\n3. Checking if asset exists:');
    if (basic?.featuredImage?.asset?._ref) {
      const asset = await client.fetch(`
        *[_id == "${basic.featuredImage.asset._ref}"][0] {
          _id,
          url,
          extension,
          metadata
        }
      `);
      console.log('Asset details:', JSON.stringify(asset, null, 2));
    }
  } catch (error) {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }
}

// Run the script
checkSpecificPost();
