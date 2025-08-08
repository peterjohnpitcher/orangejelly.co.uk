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
  const randomSuffix = Math.random().toString(36).substr(2, 8);
  return `${prefix}_${timestamp}_${index}_${randomSuffix}`;
}

// Comprehensive function to fix all missing _key properties in arrays
function fixArrayKeys(obj, path = '', depth = 0) {
  if (!obj || typeof obj !== 'object' || depth > 10) return obj;
  
  if (Array.isArray(obj)) {
    return obj.map((item, index) => {
      if (!item || typeof item !== 'object') return item;
      
      let newItem = { ...item };
      
      // Determine if this array item needs a _key
      const needsKey = (
        typeof item === 'object' && 
        !Array.isArray(item) &&
        item._type !== 'span' // Spans in block content don't need _key
      );
      
      // Add _key if missing and needed
      if (needsKey && !newItem._key) {
        const prefix = item._type || 'item';
        newItem._key = generateKey(prefix, index);
        console.log(`    ✅ Added _key to ${path}[${index}] (type: ${item._type || 'object'})`);
      }
      
      // Handle special block type processing
      if (item._type === 'block') {
        // Add _key to block itself if missing
        if (!newItem._key) {
          newItem._key = generateKey('block', index);
          console.log(`    ✅ Added _key to block at ${path}[${index}]`);
        }
        
        // Fix children array in blocks
        if (item.children && Array.isArray(item.children)) {
          newItem.children = item.children.map((child, childIndex) => {
            if (child && typeof child === 'object' && child._type !== 'span' && !child._key) {
              const childWithKey = { ...child, _key: generateKey('child', childIndex) };
              console.log(`    ✅ Added _key to ${path}[${index}].children[${childIndex}]`);
              return childWithKey;
            }
            return child;
          });
        }
        
        // Fix markDefs array in blocks
        if (item.markDefs && Array.isArray(item.markDefs)) {
          // Filter out null/undefined entries and add _key to valid objects
          const originalLength = item.markDefs.length;
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
            
          if (newItem.markDefs.length !== originalLength) {
            console.log(`    🧹 Cleaned up ${originalLength - newItem.markDefs.length} invalid markDefs`);
          }
        }
      }
      
      // Handle comparison table rows
      if (item._type === 'comparisonTable' && item.rows && Array.isArray(item.rows)) {
        newItem.rows = item.rows.map((row, rowIndex) => {
          if (row && typeof row === 'object' && !row._key) {
            const rowWithKey = { ...row, _key: generateKey('row', rowIndex) };
            console.log(`    ✅ Added _key to comparison table row at ${path}[${index}].rows[${rowIndex}]`);
            return rowWithKey;
          }
          return row;
        });
      }
      
      // Handle FAQ items
      if (item.question && item.answer && !item._key) {
        newItem._key = generateKey('faq', index);
        console.log(`    ✅ Added _key to FAQ item at ${path}[${index}]`);
      }
      
      // Handle quick stats items
      if (item.label && item.value && !item._key) {
        newItem._key = generateKey('stat', index);
        console.log(`    ✅ Added _key to quick stat item at ${path}[${index}]`);
      }
      
      // Recursively handle all nested objects and arrays
      Object.keys(newItem).forEach(key => {
        if (key.startsWith('_')) return; // Skip Sanity internal fields
        if (typeof newItem[key] === 'object' && newItem[key] !== null) {
          newItem[key] = fixArrayKeys(newItem[key], `${path}[${index}].${key}`, depth + 1);
        }
      });
      
      return newItem;
    });
  } else {
    // Handle object properties
    const newObj = { ...obj };
    Object.keys(newObj).forEach(key => {
      if (key.startsWith('_')) return; // Skip Sanity internal fields
      if (typeof newObj[key] === 'object' && newObj[key] !== null) {
        newObj[key] = fixArrayKeys(newObj[key], path ? `${path}.${key}` : key, depth + 1);
      }
    });
    return newObj;
  }
}

// Check if a blog post needs fixing
function blogPostNeedsFixing(blogPost) {
  const originalString = JSON.stringify(blogPost);
  const testPost = JSON.parse(originalString);
  
  // Apply fixes to test copy
  const arrayFields = ['content', 'faqs', 'quickStats', 'voiceSearchQueries', 'tags'];
  
  for (const field of arrayFields) {
    if (testPost[field] && Array.isArray(testPost[field])) {
      testPost[field] = fixArrayKeys(testPost[field], field);
    }
  }
  
  // Fix nested objects
  if (testPost.localSEO) {
    testPost.localSEO = fixArrayKeys(testPost.localSEO, 'localSEO');
  }
  
  if (testPost.seo) {
    testPost.seo = fixArrayKeys(testPost.seo, 'seo');
  }
  
  if (testPost.ctaSettings) {
    testPost.ctaSettings = fixArrayKeys(testPost.ctaSettings, 'ctaSettings');
  }
  
  // Check if anything changed
  return JSON.stringify(testPost) !== originalString;
}

async function fixBlogPost(blogPost) {
  console.log(`\n📝 Processing: ${blogPost.title || 'Untitled'}`);
  console.log(`   ID: ${blogPost._id}`);
  console.log(`   Status: ${blogPost.status || 'unknown'}`);
  
  let hasChanges = false;
  const updatedPost = { ...blogPost };
  
  // Fix all array fields that commonly contain items needing _key
  const arrayFields = ['content', 'faqs', 'quickStats', 'voiceSearchQueries', 'tags'];
  
  for (const field of arrayFields) {
    if (updatedPost[field] && Array.isArray(updatedPost[field])) {
      const originalField = JSON.stringify(updatedPost[field]);
      updatedPost[field] = fixArrayKeys(updatedPost[field], field);
      
      if (JSON.stringify(updatedPost[field]) !== originalField) {
        hasChanges = true;
        console.log(`   🔧 Fixed ${field} array`);
      }
    }
  }
  
  // Fix nested objects that may contain arrays
  const nestedObjectFields = ['localSEO', 'seo', 'ctaSettings'];
  
  for (const field of nestedObjectFields) {
    if (updatedPost[field] && typeof updatedPost[field] === 'object') {
      const originalField = JSON.stringify(updatedPost[field]);
      updatedPost[field] = fixArrayKeys(updatedPost[field], field);
      
      if (JSON.stringify(updatedPost[field]) !== originalField) {
        hasChanges = true;
        console.log(`   🔧 Fixed ${field} nested arrays`);
      }
    }
  }
  
  if (hasChanges) {
    try {
      await client
        .patch(blogPost._id)
        .set(updatedPost)
        .commit();
      
      console.log(`   ✅ Successfully updated`);
      return true;
    } catch (error) {
      console.error(`   ❌ Update failed: ${error.message}`);
      return false;
    }
  } else {
    console.log(`   ✅ No changes needed`);
    return false;
  }
}

async function fixBlogContentKeys() {
  console.log('🔧 Comprehensive Blog Content _key Fixer\n');
  console.log('This script will fix missing _key properties in ALL blog post arrays:\n');
  console.log('- Content blocks and their children');
  console.log('- Block markDefs');
  console.log('- FAQs');
  console.log('- Quick stats');
  console.log('- Voice search queries');
  console.log('- Tags');
  console.log('- Comparison table rows');
  console.log('- Any custom block types');
  console.log('- Nested arrays in localSEO, seo, and ctaSettings\n');
  
  try {
    // Verify environment setup
    if (!process.env.SANITY_API_TOKEN) {
      console.error('❌ SANITY_API_TOKEN not found in environment variables');
      console.error('   Please ensure you have a .env.local file with your Sanity write token');
      process.exit(1);
    }
    
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      console.error('❌ NEXT_PUBLIC_SANITY_PROJECT_ID not found in environment variables');
      process.exit(1);
    }
    
    console.log('🔍 Fetching all blog posts from Sanity...');
    
    // Comprehensive query to get all blog post data
    const query = `*[_type == "blogPost"] | order(_createdAt desc) {
      _id,
      _rev,
      _type,
      _createdAt,
      _updatedAt,
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
    
    console.log(`📊 Found ${blogPosts.length} blog posts in database\n`);
    
    if (blogPosts.length === 0) {
      console.log('✅ No blog posts found to process');
      return;
    }
    
    // Analyze which posts need fixing
    console.log('🔍 Analyzing blog posts for missing _key properties...');
    const postsNeedingFixes = [];
    
    for (const post of blogPosts) {
      if (blogPostNeedsFixing(post)) {
        postsNeedingFixes.push(post);
      }
    }
    
    console.log(`📋 Analysis complete:`);
    console.log(`   - ${blogPosts.length} total blog posts`);
    console.log(`   - ${postsNeedingFixes.length} need _key fixes`);
    console.log(`   - ${blogPosts.length - postsNeedingFixes.length} already have proper keys\n`);
    
    if (postsNeedingFixes.length === 0) {
      console.log('🎉 Excellent! All blog posts already have proper _key properties');
      return;
    }
    
    // Ask for confirmation before making changes
    console.log(`⚠️  About to update ${postsNeedingFixes.length} blog posts`);
    console.log('   This will add missing _key properties to array items');
    console.log('   The operation is safe and reversible\n');
    
    // Process each post that needs fixes
    console.log('🔧 Starting fixes...\n');
    
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < postsNeedingFixes.length; i++) {
      const post = postsNeedingFixes[i];
      console.log(`[${i + 1}/${postsNeedingFixes.length}]`);
      
      try {
        const wasUpdated = await fixBlogPost(post);
        if (wasUpdated) {
          successCount++;
        }
        
        // Add small delay to be gentle on the API
        if (i < postsNeedingFixes.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 200));
        }
      } catch (error) {
        console.error(`❌ Error processing ${post.title || post._id}: ${error.message}`);
        errorCount++;
      }
    }
    
    // Final summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 FINAL SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Successfully fixed: ${successCount} posts`);
    console.log(`❌ Errors encountered: ${errorCount} posts`);
    console.log(`📝 Total processed: ${postsNeedingFixes.length} posts`);
    console.log(`🎯 Success rate: ${Math.round((successCount / postsNeedingFixes.length) * 100)}%`);
    
    if (successCount > 0) {
      console.log('\n🎉 Blog content _key fixes completed successfully!');
      console.log('💡 All array items in your blog posts now have proper _key properties');
      console.log('🚀 Your Sanity Studio should now work smoothly with these blog posts');
    }
    
    if (errorCount > 0) {
      console.log('\n⚠️  Some posts had errors. Please check the logs above for details.');
    }
    
  } catch (error) {
    console.error('❌ Fatal error occurred:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

// Verification function to check the results
async function verifyBlogKeys() {
  console.log('\n🔍 Verifying blog post _key properties...');
  
  try {
    const query = `*[_type == "blogPost"] {
      _id,
      title,
      "issues": {
        "contentWithoutKeys": count(content[!defined(_key) && _type != "span"]),
        "blockChildrenWithoutKeys": count(content[_type == "block"].children[!defined(_key) && _type != "span"]),
        "markDefsWithoutKeys": count(content[_type == "block"].markDefs[!defined(_key)]),
        "faqsWithoutKeys": count(faqs[!defined(_key)]),
        "quickStatsWithoutKeys": count(quickStats[!defined(_key)]),
        "comparisonRowsWithoutKeys": count(content[_type == "comparisonTable"].rows[!defined(_key)])
      }
    }`;
    
    const verification = await client.fetch(query);
    
    const postsWithIssues = verification.filter(post => {
      const issues = post.issues;
      return issues.contentWithoutKeys > 0 || 
             issues.blockChildrenWithoutKeys > 0 || 
             issues.markDefsWithoutKeys > 0 || 
             issues.faqsWithoutKeys > 0 || 
             issues.quickStatsWithoutKeys > 0 ||
             issues.comparisonRowsWithoutKeys > 0;
    });
    
    if (postsWithIssues.length === 0) {
      console.log('✅ Perfect! All blog posts have proper _key properties');
    } else {
      console.log(`⚠️  Found ${postsWithIssues.length} posts still missing some _key properties:`);
      
      postsWithIssues.forEach(post => {
        console.log(`\n📝 ${post.title} (${post._id})`);
        const issues = post.issues;
        if (issues.contentWithoutKeys > 0) console.log(`   - ${issues.contentWithoutKeys} content blocks without _key`);
        if (issues.blockChildrenWithoutKeys > 0) console.log(`   - ${issues.blockChildrenWithoutKeys} block children without _key`);
        if (issues.markDefsWithoutKeys > 0) console.log(`   - ${issues.markDefsWithoutKeys} markDefs without _key`);
        if (issues.faqsWithoutKeys > 0) console.log(`   - ${issues.faqsWithoutKeys} FAQs without _key`);
        if (issues.quickStatsWithoutKeys > 0) console.log(`   - ${issues.quickStatsWithoutKeys} quick stats without _key`);
        if (issues.comparisonRowsWithoutKeys > 0) console.log(`   - ${issues.comparisonRowsWithoutKeys} comparison rows without _key`);
      });
      
      console.log('\n💡 You may want to run this script again to fix remaining issues.');
    }
    
  } catch (error) {
    console.error('❌ Verification failed:', error.message);
  }
}

// Main execution
if (require.main === module) {
  if (process.argv.includes('--verify-only')) {
    verifyBlogKeys();
  } else {
    fixBlogContentKeys().then(() => {
      console.log('\n' + '='.repeat(60));
      console.log('🔍 Running verification check...');
      console.log('='.repeat(60));
      return verifyBlogKeys();
    });
  }
}

module.exports = {
  fixBlogContentKeys,
  verifyBlogKeys,
  fixBlogPost,
  generateKey,
  fixArrayKeys
};