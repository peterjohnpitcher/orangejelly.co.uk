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

async function checkBlogImages() {
  console.log('🔍 Checking blog post images (bypassing cache)...\n');

  try {
    // Fetch a few blog posts to check their featured images
    const posts = await client.fetch(`
      *[_type == "blogPost"][0...5] | order(publishedDate desc) {
        _id,
        title,
        "slug": slug.current,
        featuredImage {
          asset->{
            _id,
            url
          },
          alt
        }
      }
    `);

    console.log(`Found ${posts.length} posts to check:\n`);

    for (const post of posts) {
      console.log(`📝 ${post.title}`);
      console.log(`   Slug: ${post.slug}`);

      if (post.featuredImage?.asset?.url) {
        console.log(`   ✅ Has Sanity image: ${post.featuredImage.asset.url}`);
        console.log(`   Alt text: ${post.featuredImage.alt || 'No alt text'}`);
      } else if (post.featuredImage) {
        console.log(`   ⚠️  Has featuredImage but no asset:`, JSON.stringify(post.featuredImage));
      } else {
        console.log(`   ❌ No featured image (will use fallback)`);
      }
      console.log('');
    }

    // Also check if we have any string values lingering
    const stringsCheck = await client.fetch(`
      *[_type == "blogPost" && defined(featuredImage)][0...3] {
        _id,
        title,
        featuredImage
      }
    `);

    console.log('🔍 Raw featuredImage data check:');
    for (const post of stringsCheck) {
      console.log(`\n${post.title}:`);
      console.log('Type:', typeof post.featuredImage);
      console.log('Value:', JSON.stringify(post.featuredImage, null, 2));
    }
  } catch (error) {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }
}

// Run the script
console.log('🚀 Blog Image Check Script');
console.log('=====================================');
console.log('This script checks the current state of featured images');
console.log('bypassing CDN cache to get fresh data.');
console.log('=====================================\n');

checkBlogImages();
