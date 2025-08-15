#!/usr/bin/env npx tsx
import dotenv from 'dotenv';
import { getContentPostBySlug, getContentPosts } from '../src/lib/content-source';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function testContentSource() {
  console.log('🔍 Testing Content Source Functions\n');
  console.log('='.repeat(60));

  const slug = 'pub-health-check-essential-fundamentals-licensee-success';

  try {
    // Test 1: Get the specific post
    console.log('\n1️⃣  FETCHING PUB HEALTH CHECK POST');
    console.log('-'.repeat(40));
    const post = await getContentPostBySlug(slug);

    if (post) {
      console.log('✅ Post found:');
      console.log('   Title:', post.title);
      console.log('   Featured Image:', post.featuredImage);
      console.log('   Is Fallback?:', post.featuredImage?.includes('/images/blog/'));
      console.log('   Is CDN URL?:', post.featuredImage?.includes('cdn.sanity.io'));
    } else {
      console.log('❌ Post not found');
    }

    // Test 2: Get all posts and check featured images
    console.log('\n2️⃣  CHECKING ALL POSTS FOR FEATURED IMAGES');
    console.log('-'.repeat(40));
    const allPosts = await getContentPosts();

    let sanityImages = 0;
    let fallbackImages = 0;
    let noImages = 0;

    for (const p of allPosts) {
      if (!p.featuredImage) {
        noImages++;
      } else if (p.featuredImage.includes('/images/blog/')) {
        fallbackImages++;
        if (p.slug === slug) {
          console.log(`⚠️  Pub Health Check using fallback: ${p.featuredImage}`);
        }
      } else if (p.featuredImage.includes('cdn.sanity.io')) {
        sanityImages++;
        if (p.slug === slug) {
          console.log(`✅ Pub Health Check using Sanity: ${p.featuredImage}`);
        }
      }
    }

    console.log('\nImage Statistics:');
    console.log(`   Total posts: ${allPosts.length}`);
    console.log(`   Sanity images: ${sanityImages}`);
    console.log(`   Fallback images: ${fallbackImages}`);
    console.log(`   No images: ${noImages}`);

    // Test 3: Check if it's a caching issue
    console.log('\n3️⃣  TESTING FOR CACHING ISSUES');
    console.log('-'.repeat(40));

    // Fetch the same post twice
    const post1 = await getContentPostBySlug(slug);
    const post2 = await getContentPostBySlug(slug);

    if (post1 && post2) {
      const sameImage = post1.featuredImage === post2.featuredImage;
      console.log('   First fetch:', post1.featuredImage);
      console.log('   Second fetch:', post2.featuredImage);
      console.log('   Same result?:', sameImage ? '✅ Yes' : '❌ No');
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 DIAGNOSIS');
    console.log('='.repeat(60));

    if (post?.featuredImage?.includes('/images/blog/')) {
      console.log('\n❌ PROBLEM CONFIRMED:');
      console.log('   The content-source is returning the fallback image.');
      console.log('   This means the issue is in normalizeSanityPost function.');
      console.log('\n   Next steps:');
      console.log('   1. Check if post.featuredImage.asset exists in the raw data');
      console.log('   2. Debug why urlFor() might be failing silently');
      console.log('   3. Check for type mismatches in the data');
    } else if (post?.featuredImage?.includes('cdn.sanity.io')) {
      console.log('\n✅ Content source is working correctly!');
      console.log('   The issue must be in the component or caching layer.');
      console.log('\n   Next steps:');
      console.log('   1. Check BlogPostCard component');
      console.log('   2. Check getBlogImageSrc function');
      console.log('   3. Check for build/deployment issues');
    } else {
      console.log('\n⚠️  Unexpected state - needs further investigation');
    }
  } catch (error) {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }
}

// Run the test
testContentSource();
