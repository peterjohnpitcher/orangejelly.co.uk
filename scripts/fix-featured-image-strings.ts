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

async function fixFeaturedImages() {
  console.log('🔧 Fixing featured image string paths in Sanity...\n');

  try {
    // Fetch all blog posts with featured images
    // We'll check if it's a string in JavaScript since GROQ doesn't have a type() function
    const posts = await client.fetch(`
      *[_type == "blogPost" && defined(featuredImage)] {
        _id,
        _rev,
        title,
        featuredImage
      }
    `);

    // Filter to only posts with string featured images
    const postsWithStringImages = posts.filter((post) => typeof post.featuredImage === 'string');

    console.log(`Found ${posts.length} posts with featured images`);
    console.log(`${postsWithStringImages.length} have string paths that need fixing\n`);

    if (postsWithStringImages.length === 0) {
      console.log('✅ No posts need fixing! All featured images are properly formatted.');
      return;
    }

    let successCount = 0;
    let errorCount = 0;

    for (const post of postsWithStringImages) {
      console.log(`📝 Processing: ${post.title}`);
      console.log(`   Current value: ${post.featuredImage}`);

      try {
        // Remove the string featuredImage field
        // Users will need to upload proper images through Sanity Studio
        await client.patch(post._id).unset(['featuredImage']).commit();

        console.log(`   ✅ Removed string path - please upload image via Sanity Studio`);
        successCount++;
      } catch (error) {
        console.error(`   ❌ Failed to update: ${error}`);
        errorCount++;
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 FIX COMPLETE');
    console.log('='.repeat(60));
    console.log(`✅ Successfully fixed: ${successCount} posts`);
    console.log(`❌ Failed: ${errorCount} posts`);

    if (successCount > 0) {
      console.log('\n⚠️  IMPORTANT NEXT STEPS:');
      console.log('1. Open Sanity Studio (https://orangejelly.sanity.studio/)');
      console.log('2. For each blog post, go to the SEO Optimization tab');
      console.log('3. Upload a featured image using the image upload field');
      console.log(
        '4. The SVG files are available in public/images/blog/ if you want to convert them to PNG first'
      );
      console.log('\nAlternatively, you can:');
      console.log('- Use an online SVG to PNG converter');
      console.log('- Take screenshots of the SVG files');
      console.log('- Create new images in Canva or similar tools');
    }
  } catch (error) {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }
}

// Run the script
console.log('🚀 Featured Image Fix Script');
console.log('=====================================');
console.log('This script will remove string paths from featuredImage fields');
console.log('that are causing errors in Sanity Studio.');
console.log('=====================================\n');

fixFeaturedImages();
