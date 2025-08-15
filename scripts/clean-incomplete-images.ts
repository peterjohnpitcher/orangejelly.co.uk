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

async function cleanIncompleteImages() {
  console.log('🧹 Cleaning incomplete featured images...\n');

  try {
    // Find posts with incomplete featuredImage objects (has _type but no asset)
    const posts = await client.fetch(`
      *[_type == "blogPost" && defined(featuredImage)] {
        _id,
        _rev,
        title,
        featuredImage
      }
    `);

    const incompleteImages = posts.filter(
      (post) =>
        post.featuredImage && typeof post.featuredImage === 'object' && !post.featuredImage.asset
    );

    console.log(`Found ${posts.length} posts with featured images`);
    console.log(`${incompleteImages.length} have incomplete image objects\n`);

    if (incompleteImages.length === 0) {
      console.log('✅ No incomplete images to clean!');
      return;
    }

    let successCount = 0;
    let errorCount = 0;

    for (const post of incompleteImages) {
      console.log(`📝 Processing: ${post.title}`);
      console.log(`   Current value:`, JSON.stringify(post.featuredImage));

      try {
        // Remove the incomplete featuredImage object
        await client.patch(post._id).unset(['featuredImage']).commit();

        console.log(`   ✅ Removed incomplete image object`);
        successCount++;
      } catch (error) {
        console.error(`   ❌ Failed to update: ${error}`);
        errorCount++;
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 CLEANUP COMPLETE');
    console.log('='.repeat(60));
    console.log(`✅ Successfully cleaned: ${successCount} posts`);
    console.log(`❌ Failed: ${errorCount} posts`);

    console.log('\n💡 The fallback images should now work correctly!');
  } catch (error) {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }
}

// Run the script
console.log('🚀 Incomplete Image Cleanup Script');
console.log('=====================================');
console.log('This script removes incomplete featuredImage objects');
console.log('that have _type but no asset reference.');
console.log('=====================================\n');

cleanIncompleteImages();
