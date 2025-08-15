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

// Map of blog post slugs to their corresponding image files
const imageMap: Record<string, string> = {
  'beat-chain-pubs': '/images/blog/beat-chain-pubs.svg',
  'christmas-pub-promotion-ideas': '/images/blog/christmas-pub-promotion-ideas.svg',
  'compete-with-wetherspoons': '/images/blog/compete-with-wetherspoons.svg',
  'content-marketing-ideas-pubs': '/images/blog/content-marketing-ideas-pubs.svg',
  'email-marketing-pub-retention': '/images/blog/email-marketing-pub-retention.svg',
  'facebook-marketing-local-pubs': '/images/blog/facebook-marketing-local-pubs.svg',
  'fill-empty-pub-tables': '/images/blog/fill-empty-pub-tables.svg',
  'how-to-run-successful-pub-events': '/images/blog/how-to-run-successful-pub-events.svg',
  'instagram-marketing-for-pubs': '/images/blog/instagram-marketing-for-pubs.svg',
  'live-music-events-for-pubs': '/images/blog/live-music-events-for-pubs.svg',
  'local-pub-marketing': '/images/blog/local-pub-marketing.svg',
  'low-budget-pub-marketing-ideas': '/images/blog/low-budget-pub-marketing-ideas.svg',
  'midweek-pub-offers-that-work': '/images/blog/midweek-pub-offers-that-work.svg',
  'premium-pub-positioning': '/images/blog/premium-pub-positioning.svg',
  'profitable-pub-food-menu-ideas': '/images/blog/profitable-pub-food-menu-ideas.svg',
  'pub-differentiation-strategies': '/images/blog/pub-differentiation-strategies.svg',
  'pub-empty-tuesday-nights': '/images/blog/pub-empty-tuesday-nights.svg',
  'pub-refurbishment-on-budget': '/images/blog/pub-refurbishment-on-budget.svg',
  'quiet-monday-night-promotions': '/images/blog/quiet-monday-night-promotions.svg',
  'quiz-night-ideas': '/images/blog/quiz-night-ideas.svg',
  'recession-proof-pub-strategies': '/images/blog/recession-proof-pub-strategies.svg',
  'seasonal-pub-events-calendar': '/images/blog/seasonal-pub-events-calendar.svg',
  'social-media-strategy-for-pubs': '/images/blog/social-media-strategy-for-pubs.svg',
  'summer-pub-event-ideas': '/images/blog/summer-pub-event-ideas.svg',
  'why-is-my-pub-empty': '/images/blog/why-is-my-pub-empty.svg',
  'pub-health-check-essential-fundamentals-licensee-success': '/images/blog/pub-health-check.svg',
};

async function restoreFeaturedImages() {
  console.log('🔧 Restoring featured image paths in Sanity...\n');
  
  try {
    // Fetch all blog posts
    const posts = await client.fetch(`
      *[_type == "blogPost"] {
        _id,
        _rev,
        title,
        "slug": slug.current,
        featuredImage
      }
    `);
    
    console.log(`Found ${posts.length} blog posts\n`);
    
    let successCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    
    for (const post of posts) {
      // Skip if already has a proper Sanity image (with asset)
      if (post.featuredImage && typeof post.featuredImage === 'object' && post.featuredImage.asset) {
        console.log(`⏭️  Skipping: ${post.title}`);
        console.log(`   Already has Sanity image asset`);
        skippedCount++;
        continue;
      }
      
      // Skip if already has a string path
      if (post.featuredImage && typeof post.featuredImage === 'string') {
        console.log(`⏭️  Skipping: ${post.title}`);
        console.log(`   Already has image path: ${post.featuredImage}`);
        skippedCount++;
        continue;
      }
      
      // Find the corresponding image path
      const imagePath = imageMap[post.slug];
      
      if (!imagePath) {
        console.log(`⚠️  Warning: ${post.title}`);
        console.log(`   No image mapping found for slug: ${post.slug}`);
        console.log(`   Using default image`);
        
        try {
          await client
            .patch(post._id)
            .set({ featuredImage: '/images/blog/default.svg' })
            .commit();
          
          console.log(`   ✅ Set default image`);
          successCount++;
        } catch (error) {
          console.error(`   ❌ Failed to update: ${error}`);
          errorCount++;
        }
        continue;
      }
      
      console.log(`📝 Processing: ${post.title}`);
      console.log(`   Setting image: ${imagePath}`);
      
      try {
        await client
          .patch(post._id)
          .set({ featuredImage: imagePath })
          .commit();
        
        console.log(`   ✅ Restored featured image path`);
        successCount++;
      } catch (error) {
        console.error(`   ❌ Failed to update: ${error}`);
        errorCount++;
      }
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 RESTORE COMPLETE');
    console.log('='.repeat(60));
    console.log(`✅ Successfully restored: ${successCount} posts`);
    console.log(`⏭️  Skipped (already have images): ${skippedCount} posts`);
    console.log(`❌ Failed: ${errorCount} posts`);
    
    console.log('\n💡 NEXT STEPS:');
    console.log('1. The SVG images should now display on the website');
    console.log('2. You can optionally convert SVGs to PNGs and upload to Sanity');
    console.log('3. This provides a consistent experience while allowing gradual migration');
    
  } catch (error) {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }
}

// Run the script
console.log('🚀 Featured Image Restoration Script');
console.log('=====================================');
console.log('This script will restore the featured image paths');
console.log('for all blog posts that are missing them.');
console.log('=====================================\n');

restoreFeaturedImages();