#!/usr/bin/env npx tsx
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Create client exactly as production would
const client = createClient({
  projectId: '9brdfanc', // Hardcoded as in the fix
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // Use CDN as production does
});

async function debugProduction() {
  console.log('🔍 DEBUGGING PRODUCTION ISSUE\n');
  console.log('='.repeat(60));

  const slug = 'pub-health-check-essential-fundamentals-licensee-success';

  try {
    // 1. Check raw post data
    console.log('\n1️⃣  RAW POST DATA');
    console.log('-'.repeat(40));
    const rawQuery = `*[_type == "blogPost" && slug.current == "${slug}"][0] {
      title,
      featuredImage,
      "hasAsset": defined(featuredImage.asset),
      "assetType": featuredImage.asset._type,
      "assetRef": featuredImage.asset._ref
    }`;
    const rawPost = await client.fetch(rawQuery);
    console.log(JSON.stringify(rawPost, null, 2));

    // 2. Check with expanded asset (as used in queries)
    console.log('\n2️⃣  WITH EXPANDED ASSET (as in blogPostBySlugQuery)');
    console.log('-'.repeat(40));
    const expandedQuery = `*[_type == "blogPost" && slug.current == "${slug}"][0] {
      title,
      featuredImage {
        asset->{
          _id,
          url
        },
        alt
      }
    }`;
    const expandedPost = await client.fetch(expandedQuery);
    console.log(JSON.stringify(expandedPost, null, 2));

    // 3. Check ALL blog posts to see if ANY have working images
    console.log('\n3️⃣  CHECKING ALL POSTS FOR FEATURED IMAGES');
    console.log('-'.repeat(40));
    const allPostsQuery = `*[_type == "blogPost"] {
      title,
      "slug": slug.current,
      "hasImage": defined(featuredImage),
      "hasAsset": defined(featuredImage.asset),
      "hasUrl": defined(featuredImage.asset->url),
      featuredImage {
        asset->{
          url
        }
      }
    }`;
    const allPosts = await client.fetch(allPostsQuery);

    let withImages = 0;
    let withUrls = 0;
    let withoutImages = 0;

    for (const post of allPosts) {
      if (post.hasImage) withImages++;
      if (post.featuredImage?.asset?.url) withUrls++;
      if (!post.hasImage) withoutImages++;

      if (post.slug === slug) {
        console.log(`\n🎯 PUB HEALTH CHECK POST:`);
        console.log(`   Has Image Field: ${post.hasImage}`);
        console.log(`   Has Asset: ${post.hasAsset}`);
        console.log(`   Has URL: ${post.hasUrl}`);
        console.log(`   URL: ${post.featuredImage?.asset?.url || 'NONE'}`);
      }
    }

    console.log(`\nSummary:`);
    console.log(`   Total posts: ${allPosts.length}`);
    console.log(`   With image field: ${withImages}`);
    console.log(`   With actual URLs: ${withUrls}`);
    console.log(`   Without images: ${withoutImages}`);

    // 4. Test the exact query used in production
    console.log('\n4️⃣  EXACT PRODUCTION QUERY (blogPostBySlugQuery)');
    console.log('-'.repeat(40));
    const productionQuery = `
      *[_type == "blogPost" && slug.current == $slug && (
        status == "published" || 
        (status == "scheduled" && dateTime(publishedDate) <= dateTime(now()))
      )][0] {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        content,
        publishedDate,
        updatedDate,
        category->{
          _id,
          name,
          "slug": slug.current
        },
        tags,
        featuredImage {
          asset->{
            _id,
            url
          },
          alt
        },
        seo,
        "author": author->{
          name,
          bio,
          image {
            asset->{
              _id,
              url
            }
          }
        },
        quickAnswer,
        voiceSearchQueries,
        quickStats,
        faqs,
        localSEO,
        ctaSettings
      }
    `;

    const productionPost = await client.fetch(productionQuery, { slug });
    console.log('Featured Image from production query:');
    console.log(JSON.stringify(productionPost?.featuredImage, null, 2));

    // 5. Check if it's a permission issue
    console.log('\n5️⃣  CHECKING ASSET DIRECTLY');
    console.log('-'.repeat(40));
    if (rawPost?.assetRef) {
      const assetQuery = `*[_id == "${rawPost.assetRef}"][0]`;
      const asset = await client.fetch(assetQuery);
      console.log('Direct asset fetch:');
      console.log(JSON.stringify(asset, null, 2));
    }

    // 6. Final diagnosis
    console.log('\n' + '='.repeat(60));
    console.log('📊 DIAGNOSIS');
    console.log('='.repeat(60));

    if (!expandedPost?.featuredImage?.asset?.url) {
      console.log('\n❌ PROBLEM CONFIRMED:');
      console.log('   The Sanity query is NOT returning a URL for the featured image.');
      console.log('\n   Possible causes:');
      console.log('   1. The asset reference is broken');
      console.log('   2. The image was deleted from Sanity');
      console.log('   3. Permission issue with the asset');
      console.log('   4. The GROQ expansion is failing');
    } else {
      console.log('\n✅ Sanity IS returning the image URL:');
      console.log(`   ${expandedPost.featuredImage.asset.url}`);
      console.log('\n   The problem must be in:');
      console.log('   1. The normalizeSanityPost function');
      console.log('   2. The getBlogImageSrc function');
      console.log('   3. Build/deployment not updated');
      console.log('   4. CDN caching old content');
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Run the debug
debugProduction();
