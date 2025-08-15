#!/usr/bin/env npx tsx
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Set the env vars as the app would see them
process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = '9brdfanc';
process.env.NEXT_PUBLIC_SANITY_DATASET = 'production';

// Now import the actual content source
import { getContentPostBySlug } from '../src/lib/content-source';
import { getBlogImageSrc } from '../src/lib/blog-images';

async function testFullPipeline() {
  console.log('🔍 TESTING FULL PIPELINE\n');
  console.log('=' .repeat(60));
  
  const slug = 'pub-health-check-essential-fundamentals-licensee-success';
  
  try {
    // 1. Get the post as the app would
    console.log('\n1️⃣  FETCHING POST VIA getContentPostBySlug');
    console.log('-'.repeat(40));
    const post = await getContentPostBySlug(slug);
    
    if (!post) {
      console.log('❌ Post not found!');
      return;
    }
    
    console.log('✅ Post found:');
    console.log('   Title:', post.title);
    console.log('   Featured Image:', post.featuredImage);
    console.log('   Is String?:', typeof post.featuredImage === 'string');
    console.log('   Is Object?:', typeof post.featuredImage === 'object');
    
    // 2. Test getBlogImageSrc with the actual data
    console.log('\n2️⃣  TESTING getBlogImageSrc');
    console.log('-'.repeat(40));
    const imageSrc = getBlogImageSrc(post.featuredImage, post.slug);
    console.log('   Input featuredImage:', post.featuredImage);
    console.log('   Input slug:', post.slug);
    console.log('   Output:', imageSrc);
    console.log('   Is fallback?:', imageSrc.includes('/images/blog/'));
    console.log('   Is Sanity URL?:', imageSrc.includes('cdn.sanity.io'));
    
    // 3. Debug the structure
    console.log('\n3️⃣  DEBUGGING DATA STRUCTURE');
    console.log('-'.repeat(40));
    if (typeof post.featuredImage === 'string') {
      console.log('featuredImage is a STRING:', post.featuredImage);
    } else if (typeof post.featuredImage === 'object') {
      console.log('featuredImage is an OBJECT:');
      console.log(JSON.stringify(post.featuredImage, null, 2));
    } else {
      console.log('featuredImage is:', typeof post.featuredImage, post.featuredImage);
    }
    
    // 4. Manually test the getBlogImageSrc conditions
    console.log('\n4️⃣  TESTING getBlogImageSrc CONDITIONS');
    console.log('-'.repeat(40));
    
    // Simulate what should work
    const testCases = [
      {
        name: 'Direct Sanity URL object',
        input: {
          asset: {
            url: 'https://cdn.sanity.io/images/9brdfanc/production/573831201c6dbda6b8abca0b64370a4935199989-1200x630.svg'
          }
        }
      },
      {
        name: 'String URL',
        input: 'https://cdn.sanity.io/images/9brdfanc/production/573831201c6dbda6b8abca0b64370a4935199989-1200x630.svg'
      },
      {
        name: 'Undefined',
        input: undefined
      },
      {
        name: 'What we actually have',
        input: post.featuredImage
      }
    ];
    
    for (const testCase of testCases) {
      console.log(`\n   Test: ${testCase.name}`);
      const result = getBlogImageSrc(testCase.input as any, slug);
      console.log(`   Result: ${result}`);
      console.log(`   Is fallback?: ${result.includes('/images/blog/')}`);
    }
    
    // 5. Final diagnosis
    console.log('\n' + '='.repeat(60));
    console.log('📊 DIAGNOSIS');
    console.log('='.repeat(60));
    
    if (imageSrc.includes('/images/blog/')) {
      console.log('\n❌ USING FALLBACK IMAGE!');
      console.log('   The pipeline is broken at the content-source level.');
      console.log('   featuredImage is not in the correct format for getBlogImageSrc.');
      
      if (typeof post.featuredImage === 'string') {
        console.log('\n   PROBLEM: featuredImage is a string, but getBlogImageSrc expects an object.');
        console.log('   The normalizeSanityPost function is returning a string URL.');
        console.log('   But getBlogImageSrc expects an object with asset.url.');
      }
    } else {
      console.log('\n✅ Using Sanity image correctly!');
      console.log('   The pipeline is working.');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Run the test
testFullPipeline();