const { createClient } = require('@sanity/client');
require('dotenv').config({ path: require('path').resolve(process.cwd(), '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// Helper function to generate unique keys
function generateKey(prefix = 'item', index = 0) {
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substr(2, 6);
  return `${prefix}_${timestamp}_${index}_${randomSuffix}`;
}

// Recursively check and fix arrays that need _key properties
function fixArrayKeys(obj, path = '') {
  if (!obj || typeof obj !== 'object') return obj;
  
  if (Array.isArray(obj)) {
    return obj.map((item, index) => {
      if (!item || typeof item !== 'object') return item;
      
      // Check if this item should have a _key
      const needsKey = (
        typeof item === 'object' && 
        !Array.isArray(item) &&
        item._type !== 'span' && // Spans don't need _key
        item._type !== 'block'   // Blocks have special handling
      );
      
      let newItem = { ...item };
      
      // Add _key if missing and needed
      if (needsKey && !newItem._key) {
        const prefix = item._type || 'item';
        newItem._key = generateKey(prefix, index);
        console.log(`    ✅ Added _key to ${path}[${index}] (type: ${item._type || 'object'})`);
      }
      
      // Handle block content specially
      if (item._type === 'block' && item.children && Array.isArray(item.children)) {
        newItem.children = item.children.map((child, childIndex) => {
          if (child && typeof child === 'object' && !child._key && child._type !== 'span') {
            const childWithKey = { ...child, _key: generateKey('child', childIndex) };
            console.log(`    ✅ Added _key to ${path}[${index}].children[${childIndex}]`);
            return childWithKey;
          }
          return child;
        });
      }
      
      // Handle markDefs in blocks
      if (item._type === 'block' && item.markDefs && Array.isArray(item.markDefs)) {
        const originalLength = item.markDefs.length;
        // Filter out null/undefined entries and add _key to valid objects
        newItem.markDefs = item.markDefs
          .filter(markDef => {
            if (markDef == null) {
              console.log(`    🧹 Removed null/undefined markDef from ${path}[${index}].markDefs`);
              return false;
            }
            return true;
          })
          .map((markDef, markIndex) => {
            if (typeof markDef === 'object' && !markDef._key) {
              const markDefWithKey = { ...markDef, _key: generateKey('mark', markIndex) };
              console.log(`    ✅ Added _key to ${path}[${index}].markDefs[${markIndex}]`);
              return markDefWithKey;
            }
            return markDef;
          });
      }
      
      // Recursively handle nested objects and arrays
      Object.keys(newItem).forEach(key => {
        if (key.startsWith('_')) return; // Skip internal fields
        newItem[key] = fixArrayKeys(newItem[key], `${path}[${index}].${key}`);
      });
      
      return newItem;
    });
  } else {
    // Handle object properties
    const newObj = { ...obj };
    Object.keys(newObj).forEach(key => {
      if (key.startsWith('_')) return; // Skip internal fields
      newObj[key] = fixArrayKeys(newObj[key], path ? `${path}.${key}` : key);
    });
    return newObj;
  }
}

// Check if a blog post needs fixing
function blogPostNeedsFixing(blogPost) {
  // Use a more thorough check by actually running the fix and seeing if it changes anything
  const originalString = JSON.stringify(blogPost);
  const testFixed = JSON.parse(originalString);
  
  // Apply the same fixes we would in fixBlogPost
  const fieldsToCheck = ['content', 'faqs', 'quickStats', 'voiceSearchQueries', 'tags'];
  
  for (const field of fieldsToCheck) {
    if (testFixed[field] && Array.isArray(testFixed[field])) {
      testFixed[field] = fixArrayKeys(testFixed[field], field);
    }
  }
  
  if (testFixed.localSEO) {
    testFixed.localSEO = fixArrayKeys(testFixed.localSEO, 'localSEO');
  }
  
  // If the JSON changed, then it needed fixing
  return JSON.stringify(testFixed) !== originalString;
}

async function fixBlogPost(blogPost) {
  console.log(`\n📝 Fixing blog post: ${blogPost.title}`);
  console.log(`   ID: ${blogPost._id}`);
  
  let hasChanges = false;
  const updatedPost = { ...blogPost };
  
  // Fix all array fields
  const fieldsToCheck = ['content', 'faqs', 'quickStats', 'voiceSearchQueries', 'tags'];
  
  for (const field of fieldsToCheck) {
    if (updatedPost[field] && Array.isArray(updatedPost[field])) {
      const originalField = JSON.stringify(updatedPost[field]);
      updatedPost[field] = fixArrayKeys(updatedPost[field], field);
      
      if (JSON.stringify(updatedPost[field]) !== originalField) {
        hasChanges = true;
        console.log(`   🔧 Fixed ${field} array`);
      }
    }
  }
  
  // Fix nested objects like localSEO
  if (updatedPost.localSEO) {
    const originalLocalSEO = JSON.stringify(updatedPost.localSEO);
    updatedPost.localSEO = fixArrayKeys(updatedPost.localSEO, 'localSEO');
    
    if (JSON.stringify(updatedPost.localSEO) !== originalLocalSEO) {
      hasChanges = true;
      console.log(`   🔧 Fixed localSEO nested arrays`);
    }
  }
  
  if (hasChanges) {
    try {
      // Use patch instead of createOrReplace to be safer
      await client
        .patch(blogPost._id)
        .set(updatedPost)
        .commit();
      
      console.log(`   ✅ Successfully updated blog post`);
      return true;
    } catch (error) {
      console.error(`   ❌ Failed to update blog post: ${error.message}`);
      return false;
    }
  } else {
    console.log(`   ✅ No changes needed`);
    return false;
  }
}

async function fixMissingKeysBlog() {
  console.log('🔧 Fixing missing _key properties in blog posts...\n');
  
  try {
    // Check write access
    if (!process.env.SANITY_API_TOKEN) {
      console.error('❌ SANITY_API_TOKEN is not set in environment variables');
      console.error('   Make sure you have a .env.local file with the token');
      process.exit(1);
    }
    
    console.log('🔍 Fetching all blog posts...');
    
    // Fetch all blog posts
    const query = `*[_type == "blogPost"] | order(_createdAt desc) {
      _id,
      _rev,
      _type,
      title,
      slug,
      status,
      excerpt,
      quickAnswer,
      voiceSearchQueries,
      quickStats,
      content,
      faqs,
      localSEO,
      featuredImage,
      category,
      tags,
      seo,
      author,
      publishedDate,
      updatedDate,
      ctaSettings
    }`;
    
    const blogPosts = await client.fetch(query);
    
    console.log(`📊 Found ${blogPosts.length} blog posts to check\n`);
    
    if (blogPosts.length === 0) {
      console.log('✅ No blog posts found to process');
      return;
    }
    
    // Check which posts need fixing
    const postsNeedingFixes = blogPosts.filter(post => blogPostNeedsFixing(post));
    
    // Also check specifically for posts with null markDefs (data cleanup needed)
    const postsWithNullMarkDefs = blogPosts.filter(post => {
      if (!post.content || !Array.isArray(post.content)) return false;
      
      return post.content.some(block => {
        if (block._type !== 'block' || !block.markDefs || !Array.isArray(block.markDefs)) return false;
        return block.markDefs.some(markDef => markDef === null || markDef === undefined);
      });
    });
    
    console.log(`📋 ${postsNeedingFixes.length} blog posts need _key fixes`);
    console.log(`🧹 ${postsWithNullMarkDefs.length} blog posts need null markDefs cleanup\n`);
    
    // Combine both types of posts that need fixing
    const allPostsToFix = [...new Set([...postsNeedingFixes, ...postsWithNullMarkDefs])];
    
    if (allPostsToFix.length === 0) {
      console.log('✅ All blog posts already have proper _key properties and clean data!');
      return;
    }
    
    console.log('🔧 Starting fixes...\n');
    
    let successCount = 0;
    let errorCount = 0;
    
    for (const post of allPostsToFix) {
      try {
        const success = await fixBlogPost(post);
        if (success) {
          successCount++;
        }
      } catch (error) {
        console.error(`❌ Error processing ${post.title}: ${error.message}`);
        errorCount++;
      }
    }
    
    console.log('\n📊 Summary:');
    console.log(`   ✅ Successfully fixed: ${successCount} posts`);
    console.log(`   ❌ Errors: ${errorCount} posts`);
    console.log(`   📝 Total processed: ${allPostsToFix.length} posts`);
    
    if (successCount > 0) {
      console.log('\n🎉 Blog post _key fixes completed successfully!');
      console.log('💡 You should now run a verification to ensure all keys are properly set');
    }
    
  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

// Add verification function
async function verifyBlogKeys() {
  console.log('\n🔍 Verifying blog post _key properties...\n');
  
  try {
    // Use a more accurate verification approach
    const query = `*[_type == "blogPost"] {
      _id,
      title,
      "contentItemsWithoutKeys": content[!defined(_key) && _type != "block" && _type != "span"],
      "faqItemsWithoutKeys": faqs[!defined(_key)],
      "quickStatsWithoutKeys": quickStats[!defined(_key)],
      "blockChildrenWithoutKeys": content[_type == "block"].children[!defined(_key) && _type != "span"],
      "problematicBlocks": content[_type == "block" && count(markDefs[!defined(_key)]) > 0] {
        'markDefsWithoutKeys': markDefs[!defined(_key)]
      }
    }`;
    
    const verification = await client.fetch(query);
    
    const postsWithIssues = verification.filter(post => 
      (post.contentItemsWithoutKeys && post.contentItemsWithoutKeys.length > 0) ||
      (post.faqItemsWithoutKeys && post.faqItemsWithoutKeys.length > 0) ||
      (post.quickStatsWithoutKeys && post.quickStatsWithoutKeys.length > 0) ||
      (post.blockChildrenWithoutKeys && post.blockChildrenWithoutKeys.length > 0) ||
      (post.problematicBlocks && post.problematicBlocks.length > 0)
    );
    
    if (postsWithIssues.length === 0) {
      console.log('✅ All blog posts have proper _key properties!');
    } else {
      console.log(`⚠️  Found ${postsWithIssues.length} posts with missing _key properties:`);
      postsWithIssues.forEach(post => {
        console.log(`\n📝 ${post.title} (${post._id})`);
        if (post.contentItemsWithoutKeys && post.contentItemsWithoutKeys.length > 0) {
          console.log(`   - ${post.contentItemsWithoutKeys.length} content items missing _key`);
        }
        if (post.faqItemsWithoutKeys && post.faqItemsWithoutKeys.length > 0) {
          console.log(`   - ${post.faqItemsWithoutKeys.length} FAQ items missing _key`);
        }
        if (post.quickStatsWithoutKeys && post.quickStatsWithoutKeys.length > 0) {
          console.log(`   - ${post.quickStatsWithoutKeys.length} quick stats missing _key`);
        }
        if (post.blockChildrenWithoutKeys && post.blockChildrenWithoutKeys.length > 0) {
          console.log(`   - ${post.blockChildrenWithoutKeys.length} block children missing _key`);
        }
        if (post.problematicBlocks && post.problematicBlocks.length > 0) {
          console.log(`   - ${post.problematicBlocks.length} blocks with markDefs missing _key`);
          post.problematicBlocks.forEach((block, index) => {
            console.log(`     Block ${index}: ${block.markDefsWithoutKeys.length} markDefs without keys`);
          });
        }
      });
    }
    
  } catch (error) {
    console.error('❌ Verification failed:', error.message);
  }
}

// Check if verification was requested
if (process.argv.includes('--verify')) {
  verifyBlogKeys();
} else {
  // Run the main fix function
  fixMissingKeysBlog().then(() => {
    // Auto-verify after fixing
    return verifyBlogKeys();
  });
}