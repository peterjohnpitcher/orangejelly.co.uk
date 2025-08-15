#!/usr/bin/env npx tsx
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
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

// Image URL builder
const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

async function testImagePipeline() {
  console.log('🔍 Testing Image Pipeline for Pub Health Check Post\n');
  console.log('=' .repeat(60));
  
  const slug = 'pub-health-check-essential-fundamentals-licensee-success';
  
  try {
    // Step 1: Fetch raw data from Sanity
    console.log('\n1️⃣  FETCHING RAW DATA FROM SANITY');
    console.log('-'.repeat(40));
    const rawPost = await client.fetch(`
      *[_type == "blogPost" && slug.current == "${slug}"][0] {
        title,
        featuredImage
      }
    `);
    console.log('Raw featuredImage:', JSON.stringify(rawPost.featuredImage, null, 2));
    
    // Step 2: Fetch with asset expansion
    console.log('\n2️⃣  FETCHING WITH ASSET EXPANSION');
    console.log('-'.repeat(40));
    const expandedPost = await client.fetch(`
      *[_type == "blogPost" && slug.current == "${slug}"][0] {
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
    console.log('Expanded featuredImage:', JSON.stringify(expandedPost.featuredImage, null, 2));
    
    // Step 3: Test urlFor() with raw data
    console.log('\n3️⃣  TESTING urlFor() WITH RAW DATA');
    console.log('-'.repeat(40));
    if (rawPost.featuredImage) {
      try {
        const urlFromRaw = urlFor(rawPost.featuredImage).url();
        console.log('✅ urlFor() succeeded with raw data:');
        console.log('   URL:', urlFromRaw);
      } catch (error: any) {
        console.log('❌ urlFor() failed with raw data:');
        console.log('   Error:', error.message);
      }
    } else {
      console.log('⚠️  No featuredImage in raw data');
    }
    
    // Step 4: Test urlFor() with expanded data
    console.log('\n4️⃣  TESTING urlFor() WITH EXPANDED DATA');
    console.log('-'.repeat(40));
    if (expandedPost.featuredImage) {
      try {
        const urlFromExpanded = urlFor(expandedPost.featuredImage).url();
        console.log('✅ urlFor() succeeded with expanded data:');
        console.log('   URL:', urlFromExpanded);
      } catch (error: any) {
        console.log('❌ urlFor() failed with expanded data:');
        console.log('   Error:', error.message);
      }
    } else {
      console.log('⚠️  No featuredImage in expanded data');
    }
    
    // Step 5: Check direct URL access
    console.log('\n5️⃣  CHECKING DIRECT URL ACCESS');
    console.log('-'.repeat(40));
    if (expandedPost.featuredImage?.asset?.url) {
      console.log('✅ Direct URL available:');
      console.log('   URL:', expandedPost.featuredImage.asset.url);
    } else {
      console.log('❌ No direct URL in expanded data');
    }
    
    // Step 6: Simulate normalizeSanityPost logic
    console.log('\n6️⃣  SIMULATING normalizeSanityPost LOGIC');
    console.log('-'.repeat(40));
    
    let featuredImageUrl: string | undefined;
    
    // Current logic from content-source.ts:62-72
    if (expandedPost.featuredImage?.asset) {
      console.log('   Condition: post.featuredImage?.asset exists');
      try {
        featuredImageUrl = urlFor(expandedPost.featuredImage).url();
        console.log('   ✅ urlFor() succeeded:', featuredImageUrl);
      } catch (error: any) {
        console.log('   ❌ urlFor() failed:', error.message);
      }
    } else if (expandedPost.featuredImage && typeof expandedPost.featuredImage === 'string') {
      console.log('   Condition: featuredImage is a string');
      featuredImageUrl = expandedPost.featuredImage;
    } else {
      console.log('   Condition: Using fallback SVG');
      const svgPath = `/images/blog/${slug}.svg`;
      featuredImageUrl = svgPath;
    }
    
    console.log('   Final featuredImageUrl:', featuredImageUrl);
    
    // Step 7: Proposed fix
    console.log('\n7️⃣  TESTING PROPOSED FIX');
    console.log('-'.repeat(40));
    
    let fixedImageUrl: string | undefined;
    
    // Proposed fix: Use direct URL when available
    if (expandedPost.featuredImage?.asset?.url) {
      fixedImageUrl = expandedPost.featuredImage.asset.url;
      console.log('   ✅ Using direct URL from asset:', fixedImageUrl);
    } else if (expandedPost.featuredImage?.asset?._ref) {
      try {
        fixedImageUrl = urlFor(expandedPost.featuredImage).url();
        console.log('   ✅ Using urlFor() with reference:', fixedImageUrl);
      } catch (error: any) {
        console.log('   ❌ urlFor() failed, using fallback');
        fixedImageUrl = `/images/blog/${slug}.svg`;
      }
    } else {
      fixedImageUrl = `/images/blog/${slug}.svg`;
      console.log('   ⚠️  No image data, using fallback:', fixedImageUrl);
    }
    
    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 SUMMARY');
    console.log('='.repeat(60));
    console.log('\n🔍 Current Behavior:');
    console.log('   Result:', featuredImageUrl);
    console.log('   Is Fallback?:', featuredImageUrl?.includes('/images/blog/'));
    
    console.log('\n✅ Proposed Fix:');
    console.log('   Result:', fixedImageUrl);
    console.log('   Is Fallback?:', fixedImageUrl?.includes('/images/blog/'));
    
    if (featuredImageUrl !== fixedImageUrl) {
      console.log('\n⚠️  DIFFERENCE DETECTED!');
      console.log('   The proposed fix would change the output.');
      console.log('   This confirms the issue is in the normalizeSanityPost function.');
    } else {
      console.log('\n✅ No difference - the issue might be elsewhere.');
    }
    
  } catch (error) {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }
}

// Run the test
testImagePipeline();