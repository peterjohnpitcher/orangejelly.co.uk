#!/usr/bin/env node

const { createClient } = require('@sanity/client');
require('dotenv').config();

// Create write client (same as the TypeScript version)
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9brdfanc',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// More aggressive patterns for pub names and claims
const AGGRESSIVE_PATTERNS = [
  // Specific pub names (exact matches first)
  {
    pattern: /\bThe Bell\b/gi,
    replacement: 'a typical village pub',
    reason: 'Replaced specific pub name with generic description'
  },
  {
    pattern: /\bThe Local\b/gi,
    replacement: 'a typical neighborhood pub',
    reason: 'Replaced specific pub name with generic description'
  },
  {
    pattern: /\bThe Dog & Duck\b/gi,
    replacement: 'a typical traditional pub',
    reason: 'Replaced specific pub name with generic description'
  },
  {
    pattern: /\bThe Rose & Crown\b/gi,
    replacement: 'a typical market town pub',
    reason: 'Replaced specific pub name with generic description'
  },
  {
    pattern: /\bThe Star\b/gi,
    replacement: 'a typical high street pub',
    reason: 'Replaced specific pub name with generic description'
  },
  {
    pattern: /\bThe Feathers\b/gi,
    replacement: 'a typical coaching inn',
    reason: 'Replaced specific pub name with generic description'
  },
  {
    pattern: /\bThe George & Dragon\b/gi,
    replacement: 'a typical country pub',
    reason: 'Replaced specific pub name with generic description'
  },
  
  // More careful pub name patterns - only likely pub names
  {
    pattern: /\bThe (Red|White|Black|Golden|Royal|Old|New) (Lion|Horse|Bull|Swan|Crown|Oak|Inn)\b/gi,
    replacement: 'a typical traditional pub',
    reason: 'Replaced common pub name pattern with generic description'
  },
  {
    pattern: /\bThe (King|Queen|Prince|Duke|Earl)s? (Head|Arms|Crown)\b/gi,
    replacement: 'a typical traditional pub',  
    reason: 'Replaced royal pub name pattern with generic description'
  },
  
  // Additional specific pub names commonly found
  {
    pattern: /\bThe Red Lion\b/gi,
    replacement: 'a typical traditional pub',
    reason: 'Replaced specific pub name with generic description'
  },
  {
    pattern: /\bThe White Horse\b/gi,
    replacement: 'a typical country pub',
    reason: 'Replaced specific pub name with generic description'
  },
  {
    pattern: /\bThe Bull\b/gi,
    replacement: 'a typical market town pub',
    reason: 'Replaced specific pub name with generic description'
  },
  {
    pattern: /\bThe Crown\b/gi,
    replacement: 'a typical town center pub',
    reason: 'Replaced specific pub name with generic description'
  },
  {
    pattern: /\bThe George\b/gi,
    replacement: 'a typical village pub',
    reason: 'Replaced specific pub name with generic description'
  },
  {
    pattern: /\bThe Ship Inn\b/gi,
    replacement: 'a typical riverside pub',
    reason: 'Replaced specific pub name with generic description'
  },
  {
    pattern: /\bThe Kings Head\b/gi,
    replacement: 'a typical traditional pub',
    reason: 'Replaced specific pub name with generic description'
  },
  {
    pattern: /\bThe Royal Oak\b/gi,
    replacement: 'a typical village pub',
    reason: 'Replaced specific pub name with generic description'
  },
  
  // Experience and client claims (very aggressive)
  {
    pattern: /\bwe've seen\b/gi,
    replacement: 'industry data shows',
    reason: 'Changed experience claim to industry research'
  },
  {
    pattern: /\bwe helped\b/gi,
    replacement: 'pubs can',
    reason: 'Changed client claim to general possibility'
  },
  {
    pattern: /\bour clients\b/gi,
    replacement: 'successful pubs',
    reason: 'Changed client reference to industry examples'
  },
  {
    pattern: /\bwe achieved\b/gi,
    replacement: 'typical results include',
    reason: 'Changed achievement claim to industry standard'
  },
  {
    pattern: /\bwe increased\b/gi,
    replacement: 'increases of',
    reason: 'Changed specific claim to general metric'
  },
  {
    pattern: /\bwe grew\b/gi,
    replacement: 'growth of',
    reason: 'Changed specific claim to general metric'
  },
  {
    pattern: /\bwe have seen\b/gi,
    replacement: 'industry research shows',
    reason: 'Changed experience claim to industry research'
  },
  {
    pattern: /\bwe have helped\b/gi,
    replacement: 'pubs have been able to',
    reason: 'Changed client claim to general possibility'
  },
  {
    pattern: /\bour experience shows\b/gi,
    replacement: 'industry data shows',
    reason: 'Changed experience claim to industry data'
  },
  {
    pattern: /\bin our experience\b/gi,
    replacement: 'according to industry research',
    reason: 'Changed experience claim to industry research'
  },
  {
    pattern: /\bfrom our work with\b/gi,
    replacement: 'from industry studies of',
    reason: 'Changed work claim to industry studies'
  },
  {
    pattern: /\bworking with ([0-9]+|many|several|dozens of|hundreds of)\s+pubs?\b/gi,
    replacement: 'studying industry examples of pubs',
    reason: 'Changed client quantity claim to industry study'
  },
  {
    pattern: /\b(many|several|dozens of|hundreds of) of our clients\b/gi,
    replacement: 'many successful pubs in the industry',
    reason: 'Changed client quantity claim to industry reference'
  },
  
  // Case study and success story markers
  {
    pattern: /\bCase Study:\b/gi,
    replacement: 'Industry Example:',
    reason: 'Changed case study marker to industry example'
  },
  {
    pattern: /\bSuccess Story:\b/gi,
    replacement: 'Industry Example:',
    reason: 'Changed success story marker to industry example'
  },
  {
    pattern: /\bClient Case Study:\b/gi,
    replacement: 'Industry Example:',
    reason: 'Changed client case study marker to industry example'
  },
  
  // Metrics without attribution - add context
  {
    pattern: /\b(\d+%|\d+x|\d+\+)\s+(increase|growth|improvement|boost)\b/gi,
    replacement: '$1 $2 at The Anchor',
    reason: 'Added attribution to metric'
  },
  {
    pattern: /\bincreased\s+by\s+(\d+%|\d+x)\b/gi,
    replacement: 'increased by $1 at The Anchor',
    reason: 'Added attribution to metric'
  },
  {
    pattern: /\b(sales|revenue|footfall|customers?)\s+(increased|grew|improved)\s+by\s+(\d+%|\d+x)\b/gi,
    replacement: '$1 $2 by $3 at The Anchor',
    reason: 'Added attribution to metric'
  },
  
  // Generic success claims
  {
    pattern: /\bthis approach has proven successful\b/gi,
    replacement: 'this approach proved successful at The Anchor',
    reason: 'Added specific attribution'
  },
  {
    pattern: /\bthis strategy works\b/gi,
    replacement: 'this strategy worked at The Anchor',
    reason: 'Added specific attribution'
  },
  {
    pattern: /\bthis has been effective\b/gi,
    replacement: 'this was effective at The Anchor',
    reason: 'Added specific attribution'
  },
  
  // "Our" possessive claims
  {
    pattern: /\bour approach\b/gi,
    replacement: 'the approach used at The Anchor',
    reason: 'Changed possessive to specific example'
  },
  {
    pattern: /\bour strategy\b/gi,
    replacement: 'the strategy used at The Anchor',
    reason: 'Changed possessive to specific example'
  },
  {
    pattern: /\bour method\b/gi,
    replacement: 'the method used at The Anchor',
    reason: 'Changed possessive to specific example'
  },
  {
    pattern: /\bour techniques\b/gi,
    replacement: 'the techniques used at The Anchor',
    reason: 'Changed possessive to specific example'
  }
];

// Function to recursively process any object or array
function processAnyContent(obj, path = '') {
  const changes = [];
  
  if (typeof obj === 'string') {
    const result = processText(obj);
    if (result.changes.length > 0) {
      changes.push(...result.changes.map(change => ({
        ...change,
        path: path
      })));
      return result.newText;
    }
    return obj;
  }
  
  if (Array.isArray(obj)) {
    const newArray = [];
    for (let i = 0; i < obj.length; i++) {
      const result = processAnyContent(obj[i], `${path}[${i}]`);
      if (result && typeof result === 'object' && result.hasOwnProperty('changes')) {
        changes.push(...result.changes);
        newArray.push(result.value);
      } else {
        newArray.push(result);
      }
    }
    return { value: newArray, changes };
  }
  
  if (obj && typeof obj === 'object' && obj.constructor === Object) {
    const newObj = { ...obj };
    for (const [key, value] of Object.entries(obj)) {
      const result = processAnyContent(value, path ? `${path}.${key}` : key);
      if (result && typeof result === 'object' && result.hasOwnProperty('changes')) {
        changes.push(...result.changes);
        newObj[key] = result.value;
      } else {
        newObj[key] = result;
      }
    }
    return { value: newObj, changes };
  }
  
  return obj;
}

// Function to process text content and apply replacements
function processText(text) {
  let newText = text;
  const changes = [];
  
  console.log(`    Processing text snippet: "${text.substring(0, 100)}${text.length > 100 ? '...' : ''}"`);
  
  for (const pattern of AGGRESSIVE_PATTERNS) {
    const matches = Array.from(text.matchAll(pattern.pattern));
    
    for (const match of matches) {
      if (match[0]) {
        // For "The Anchor" protection, check more thoroughly
        const contextBefore = text.substring(Math.max(0, match.index - 100), match.index);
        const contextAfter = text.substring(match.index + match[0].length, Math.min(text.length, match.index + match[0].length + 100));
        const fullContext = (contextBefore + match[0] + contextAfter).toLowerCase();
        
        // Skip if it's specifically about The Anchor
        if (fullContext.includes('the anchor') || 
            fullContext.includes('anchor pub') ||
            match[0].toLowerCase().includes('anchor')) {
          console.log(`      Skipping replacement for "${match[0]}" - appears to be about The Anchor`);
          continue;
        }
        
        // Apply replacement
        const replacement = typeof pattern.replacement === 'function' 
          ? pattern.replacement(...match.slice(1))
          : pattern.replacement;
        
        console.log(`      CHANGE: "${match[0]}" → "${replacement}"`);
        
        changes.push({
          oldText: match[0],
          newText: replacement,
          reason: pattern.reason
        });
        
        newText = newText.replace(match[0], replacement);
      }
    }
  }
  
  return { newText, changes };
}

// Function to process a single blog post with maximum thoroughness
async function processBlogPost(post) {
  const report = {
    postId: post._id,
    title: post.title,
    slug: post.slug?.current || 'no-slug',
    changes: [],
    warnings: []
  };
  
  console.log(`\nProcessing: "${post.title}" (${report.slug})`);
  console.log(`  Post ID: ${post._id}`);
  
  let needsUpdate = false;
  const mutations = [];
  
  // Process the entire post object recursively
  const result = processAnyContent(post, 'root');
  
  if (result.changes && result.changes.length > 0) {
    console.log(`  Found ${result.changes.length} changes needed`);
    
    // Build specific mutations for the fields that changed
    const fieldsToUpdate = {};
    
    result.changes.forEach(change => {
      report.changes.push({
        field: change.path,
        oldText: change.oldText,
        newText: change.newText,
        reason: change.reason
      });
    });
    
    // Update the specific fields that need changing
    if (result.value.content !== post.content) {
      fieldsToUpdate.content = result.value.content;
      console.log(`  Will update content field`);
    }
    
    if (result.value.quickAnswer !== post.quickAnswer) {
      fieldsToUpdate.quickAnswer = result.value.quickAnswer;
      console.log(`  Will update quickAnswer field`);
    }
    
    if (result.value.excerpt !== post.excerpt) {
      fieldsToUpdate.excerpt = result.value.excerpt;
      console.log(`  Will update excerpt field`);
    }
    
    if (result.value.faqs !== post.faqs) {
      fieldsToUpdate.faqs = result.value.faqs;
      console.log(`  Will update faqs field`);
    }
    
    if (result.value.title !== post.title) {
      fieldsToUpdate.title = result.value.title;
      console.log(`  Will update title field`);
    }
    
    if (Object.keys(fieldsToUpdate).length > 0) {
      mutations.push({
        patch: {
          id: post._id,
          set: fieldsToUpdate
        }
      });
      needsUpdate = true;
    }
  }
  
  // Apply mutations if needed
  if (needsUpdate && mutations.length > 0) {
    try {
      console.log(`  Making ${mutations.length} update(s) to post...`);
      
      for (const mutation of mutations) {
        console.log(`    Updating fields: ${Object.keys(mutation.patch.set).join(', ')}`);
        await writeClient.patch(mutation.patch.id).set(mutation.patch.set).commit();
      }
      
      console.log(`  ✅ Successfully updated "${post.title}"`);
    } catch (error) {
      console.error(`  ❌ Error updating "${post.title}":`, error);
      report.warnings.push(`Failed to update post: ${error.message}`);
    }
  } else {
    console.log(`  ℹ️  No changes needed for "${post.title}"`);
  }
  
  return report;
}

// Main function to fix all blog posts aggressively
async function fixAllBlogPostsAggressively() {
  console.log('🚀 Starting AGGRESSIVE blog post fix...\n');
  console.log('⚠️  WARNING: This script will make extensive changes to blog content');
  console.log('⚠️  WARNING: All pub names except "The Anchor" will be replaced');
  console.log('⚠️  WARNING: All client experience claims will be changed to industry data\n');
  
  try {
    // Check if we have write access
    if (!process.env.SANITY_API_TOKEN) {
      throw new Error('SANITY_API_TOKEN environment variable is required for write access');
    }
    
    // Fetch all blog posts with all fields
    console.log('📖 Fetching ALL blog posts from Sanity...');
    
    const query = `
      *[_type == "blogPost"] {
        _id,
        title,
        slug,
        content,
        status,
        quickAnswer,
        excerpt,
        faqs,
        description,
        metaDescription,
        // Get all fields to process everything
        ...
      }
    `;
    
    const posts = await writeClient.fetch(query);
    console.log(`Found ${posts.length} blog posts to process\n`);
    
    if (posts.length === 0) {
      console.log('No blog posts found. Exiting.');
      return;
    }
    
    // Process each post
    const allReports = [];
    let totalChanges = 0;
    
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      console.log(`\n[${i + 1}/${posts.length}] Processing post...`);
      
      const report = await processBlogPost(post);
      allReports.push(report);
      totalChanges += report.changes.length;
      
      // Add a delay to avoid overwhelming Sanity
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    // Generate comprehensive final report
    console.log('\n' + '='.repeat(80));
    console.log('📊 AGGRESSIVE FIX COMPLETED - FINAL REPORT');
    console.log('='.repeat(80));
    
    console.log(`\nSUMMARY:`);
    console.log(`  Total posts processed: ${posts.length}`);
    console.log(`  Total changes made: ${totalChanges}`);
    console.log(`  Posts with changes: ${allReports.filter(r => r.changes.length > 0).length}`);
    console.log(`  Posts with warnings: ${allReports.filter(r => r.warnings.length > 0).length}`);
    
    // Detailed report by change type
    console.log('\n📈 CHANGES BY TYPE:');
    console.log('-'.repeat(50));
    
    const changesByReason = {};
    allReports.forEach(report => {
      report.changes.forEach(change => {
        changesByReason[change.reason] = (changesByReason[change.reason] || 0) + 1;
      });
    });
    
    Object.entries(changesByReason)
      .sort(([,a], [,b]) => b - a)
      .forEach(([reason, count]) => {
        console.log(`  ${count.toString().padLeft(3)}x ${reason}`);
      });
    
    // List all posts with changes
    console.log('\n📝 POSTS WITH CHANGES:');
    console.log('-'.repeat(50));
    
    const postsWithChanges = allReports.filter(r => r.changes.length > 0);
    postsWithChanges.forEach((report, index) => {
      console.log(`\n${index + 1}. "${report.title}" (${report.slug})`);
      console.log(`   Post ID: ${report.postId}`);
      console.log(`   Changes: ${report.changes.length}`);
      
      // Show first few changes as examples
      const sampleChanges = report.changes.slice(0, 3);
      sampleChanges.forEach(change => {
        console.log(`     • ${change.field}: "${change.oldText}" → "${change.newText}"`);
      });
      
      if (report.changes.length > 3) {
        console.log(`     ... and ${report.changes.length - 3} more changes`);
      }
    });
    
    // Show any warnings
    const postsWithWarnings = allReports.filter(r => r.warnings.length > 0);
    if (postsWithWarnings.length > 0) {
      console.log('\n⚠️  WARNINGS:');
      console.log('-'.repeat(30));
      
      postsWithWarnings.forEach(report => {
        console.log(`\n"${report.title}"`);
        report.warnings.forEach(warning => {
          console.log(`  • ${warning}`);
        });
      });
    }
    
    console.log('\n✅ AGGRESSIVE blog post fix completed successfully!');
    console.log('\n🔑 WHAT WAS CHANGED:');
    console.log('   ✓ All specific pub names (except The Anchor) → generic descriptions');
    console.log('   ✓ "we\'ve seen" → "industry data shows"');
    console.log('   ✓ "we helped" → "pubs can"');
    console.log('   ✓ "our clients" → "successful pubs"');
    console.log('   ✓ "we achieved/increased/grew" → generic metrics');
    console.log('   ✓ Unattributed metrics → "at The Anchor" or "industry research shows"');
    console.log('   ✓ Case studies → Industry examples');
    console.log('\n⚠️  IMPORTANT: Review the changes above and test your site thoroughly');
    
  } catch (error) {
    console.error('❌ Error in aggressive blog fix:', error);
    process.exit(1);
  }
}

// Utility function for padding
String.prototype.padLeft = function(length, char = ' ') {
  return (char.repeat(length) + this).slice(-length);
};

// Run the script immediately
if (require.main === module) {
  fixAllBlogPostsAggressively().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { fixAllBlogPostsAggressively, processBlogPost };