#!/usr/bin/env node

const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

// Write client with authentication token
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9brdfanc',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Always bypass CDN for writes
  token: process.env.SANITY_API_TOKEN,
});

// Problematic patterns to search for
const PROBLEMATIC_PATTERNS = [
  // Direct false claims about client numbers
  {
    pattern: /hundreds of pubs?/gi,
    replacement: 'our experience at The Anchor and industry research',
    reason: 'Orange Jelly has only worked with The Anchor'
  },
  {
    pattern: /dozens of pubs?/gi,
    replacement: 'our experience at The Anchor and industry research',
    reason: 'Orange Jelly has only worked with The Anchor'
  },
  {
    pattern: /many pubs?/gi,
    replacement: 'our experience at The Anchor and industry research',
    reason: 'Orange Jelly has only worked with The Anchor'
  },
  
  // Specific pub names (except The Anchor)
  {
    pattern: /The Red Lion/gi,
    replacement: 'a typical traditional pub',
    reason: 'Replaced specific pub name with generic example'
  },
  {
    pattern: /The Ship Inn/gi,
    replacement: 'a typical riverside pub',
    reason: 'Replaced specific pub name with generic example'
  },
  {
    pattern: /The Crown/gi,
    replacement: 'a typical town center pub',
    reason: 'Replaced specific pub name with generic example'
  },
  {
    pattern: /The George/gi,
    replacement: 'a typical village pub',
    reason: 'Replaced specific pub name with generic example'
  },
  {
    pattern: /The White Horse/gi,
    replacement: 'a typical country pub',
    reason: 'Replaced specific pub name with generic example'
  },
  {
    pattern: /The Bull/gi,
    replacement: 'a typical market town pub',
    reason: 'Replaced specific pub name with generic example'
  },
  
  // Claims about direct experience with multiple clients
  {
    pattern: /we've seen at [\w\s]+ pubs?/gi,
    replacement: 'industry data shows',
    reason: 'Changed client claim to industry research'
  },
  {
    pattern: /we helped [\w\s]+ achieve/gi,
    replacement: 'industry examples show pubs achieving',
    reason: 'Changed client claim to industry example'
  },
  {
    pattern: /our clients have/gi,
    replacement: 'industry research shows pubs',
    reason: 'Changed client claim to industry research'
  },
  {
    pattern: /we've helped [\w\s]+ increase/gi,
    replacement: 'industry data shows pubs increasing',
    reason: 'Changed client claim to industry data'
  },
  {
    pattern: /working with [\w\s]+ pubs?/gi,
    replacement: 'studying industry examples',
    reason: 'Changed client claim to industry study'
  },
  
  // General "we've seen" patterns
  {
    pattern: /we've seen/gi,
    replacement: 'industry data shows',
    reason: 'Changed experience claim to industry data'
  },
  {
    pattern: /in our experience/gi,
    replacement: 'according to industry research',
    reason: 'Changed experience claim to industry research'
  },
  {
    pattern: /from our work with/gi,
    replacement: 'from industry studies of',
    reason: 'Changed work claim to industry studies'
  },
  
  // Case study markers that need clarification
  {
    pattern: /Case Study:/gi,
    replacement: 'Industry Example:',
    reason: 'Clarified as industry example, not Orange Jelly case study'
  },
  {
    pattern: /Success Story:/gi,
    replacement: 'Industry Example:',
    reason: 'Clarified as industry example, not Orange Jelly success story'
  },
];

// Function to process text content and apply replacements
function processText(text) {
  let newText = text;
  const changes = [];
  
  for (const pattern of PROBLEMATIC_PATTERNS) {
    const matches = Array.from(text.matchAll(pattern.pattern));
    
    for (const match of matches) {
      if (match[0]) {
        // Skip if it's about The Anchor (our actual client)
        const contextBefore = text.substring(Math.max(0, match.index - 50), match.index);
        const contextAfter = text.substring(match.index + match[0].length, Math.min(text.length, match.index + match[0].length + 50));
        const fullContext = contextBefore + match[0] + contextAfter;
        
        if (fullContext.toLowerCase().includes('the anchor') || fullContext.toLowerCase().includes('anchor pub')) {
          console.log(`Skipping replacement for "${match[0]}" - appears to be about The Anchor`);
          continue;
        }
        
        changes.push({
          oldText: match[0],
          newText: pattern.replacement,
          reason: pattern.reason
        });
        
        newText = newText.replace(match[0], pattern.replacement);
      }
    }
  }
  
  return { newText, changes };
}

// Function to process a single blog post
async function processBlogPost(post) {
  const report = {
    postId: post._id,
    title: post.title,
    slug: post.slug.current,
    changes: [],
    warnings: []
  };
  
  console.log(`\nProcessing: "${post.title}" (${post.slug.current})`);
  
  // Track if we need to update the document
  let needsUpdate = false;
  const mutations = [];
  
  // Process main content blocks
  if (post.content && Array.isArray(post.content)) {
    const updatedContent = [...post.content];
    
    for (let i = 0; i < updatedContent.length; i++) {
      const block = updatedContent[i];
      
      if (block._type === 'block' && block.children) {
        let blockChanged = false;
        const updatedChildren = [...block.children];
        
        for (let j = 0; j < updatedChildren.length; j++) {
          const child = updatedChildren[j];
          
          if (child.text && typeof child.text === 'string') {
            const result = processText(child.text);
            
            if (result.changes.length > 0) {
              updatedChildren[j] = { ...child, text: result.newText };
              blockChanged = true;
              needsUpdate = true;
              
              result.changes.forEach(change => {
                report.changes.push({
                  field: 'content',
                  blockIndex: i,
                  oldText: change.oldText,
                  newText: change.newText,
                  reason: change.reason
                });
              });
            }
          }
        }
        
        if (blockChanged) {
          updatedContent[i] = { ...block, children: updatedChildren };
        }
      }
    }
    
    if (needsUpdate) {
      mutations.push({
        patch: {
          id: post._id,
          set: {
            content: updatedContent
          }
        }
      });
    }
  }
  
  // Process quick answer
  if (post.quickAnswer && typeof post.quickAnswer === 'string') {
    const result = processText(post.quickAnswer);
    
    if (result.changes.length > 0) {
      mutations.push({
        patch: {
          id: post._id,
          set: {
            quickAnswer: result.newText
          }
        }
      });
      
      result.changes.forEach(change => {
        report.changes.push({
          field: 'quickAnswer',
          oldText: change.oldText,
          newText: change.newText,
          reason: change.reason
        });
      });
      
      needsUpdate = true;
    }
  }
  
  // Process excerpt
  if (post.excerpt && typeof post.excerpt === 'string') {
    const result = processText(post.excerpt);
    
    if (result.changes.length > 0) {
      mutations.push({
        patch: {
          id: post._id,
          set: {
            excerpt: result.newText
          }
        }
      });
      
      result.changes.forEach(change => {
        report.changes.push({
          field: 'excerpt',
          oldText: change.oldText,
          newText: change.newText,
          reason: change.reason
        });
      });
      
      needsUpdate = true;
    }
  }
  
  // Process FAQs
  if (post.faqs && Array.isArray(post.faqs)) {
    const updatedFaqs = [...post.faqs];
    let faqsChanged = false;
    
    for (let i = 0; i < updatedFaqs.length; i++) {
      const faq = updatedFaqs[i];
      
      // Process question
      if (faq.question && typeof faq.question === 'string') {
        const result = processText(faq.question);
        
        if (result.changes.length > 0) {
          updatedFaqs[i] = { ...faq, question: result.newText };
          faqsChanged = true;
          
          result.changes.forEach(change => {
            report.changes.push({
              field: `faqs[${i}].question`,
              oldText: change.oldText,
              newText: change.newText,
              reason: change.reason
            });
          });
        }
      }
      
      // Process answer
      if (faq.answer && typeof faq.answer === 'string') {
        const result = processText(faq.answer);
        
        if (result.changes.length > 0) {
          updatedFaqs[i] = { ...updatedFaqs[i], answer: result.newText };
          faqsChanged = true;
          
          result.changes.forEach(change => {
            report.changes.push({
              field: `faqs[${i}].answer`,
              oldText: change.oldText,
              newText: change.newText,
              reason: change.reason
            });
          });
        }
      }
    }
    
    if (faqsChanged) {
      mutations.push({
        patch: {
          id: post._id,
          set: {
            faqs: updatedFaqs
          }
        }
      });
      
      needsUpdate = true;
    }
  }
  
  // Apply all mutations if needed
  if (needsUpdate && mutations.length > 0) {
    try {
      console.log(`  Making ${mutations.length} update(s) to post...`);
      
      for (const mutation of mutations) {
        await writeClient.patch(mutation.patch.id).set(mutation.patch.set).commit();
      }
      
      console.log(`  ✅ Successfully updated "${post.title}"`);
    } catch (error) {
      console.error(`  ❌ Error updating "${post.title}":`, error);
      report.warnings.push(`Failed to update post: ${error}`);
    }
  } else {
    console.log(`  ℹ️  No changes needed for "${post.title}"`);
  }
  
  return report;
}

// Main function to fix all blog posts
async function fixAllBlogPosts() {
  console.log('🚀 Starting blog post false claims fix...\n');
  
  try {
    // Check if we have write access
    if (!process.env.SANITY_API_TOKEN) {
      throw new Error('SANITY_API_TOKEN environment variable is required for write access');
    }
    
    // Fetch all blog posts
    console.log('📖 Fetching all blog posts from Sanity...');
    
    const query = `
      *[_type == "blogPost"] {
        _id,
        title,
        "slug": slug,
        content,
        status,
        quickAnswer,
        excerpt,
        faqs
      }
    `;
    
    const posts = await writeClient.fetch(query);
    console.log(`Found ${posts.length} blog posts\n`);
    
    // Process each post
    const allReports = [];
    let totalChanges = 0;
    
    for (const post of posts) {
      const report = await processBlogPost(post);
      allReports.push(report);
      totalChanges += report.changes.length;
      
      // Add a small delay to avoid overwhelming Sanity
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Generate final report
    console.log('\n' + '='.repeat(60));
    console.log('📊 FINAL REPORT');
    console.log('='.repeat(60));
    
    console.log(`\nTotal posts processed: ${posts.length}`);
    console.log(`Total changes made: ${totalChanges}`);
    console.log(`Posts with changes: ${allReports.filter(r => r.changes.length > 0).length}`);
    console.log(`Posts with warnings: ${allReports.filter(r => r.warnings.length > 0).length}`);
    
    // Detailed report by post
    console.log('\n📝 DETAILED CHANGES BY POST:');
    console.log('-'.repeat(40));
    
    for (const report of allReports) {
      if (report.changes.length > 0 || report.warnings.length > 0) {
        console.log(`\n"${report.title}" (${report.slug})`);
        console.log(`  Post ID: ${report.postId}`);
        console.log(`  Changes: ${report.changes.length}`);
        
        if (report.changes.length > 0) {
          console.log('  Details:');
          report.changes.forEach((change, index) => {
            console.log(`    ${index + 1}. Field: ${change.field}${change.blockIndex !== undefined ? ` (block ${change.blockIndex})` : ''}`);
            console.log(`       Old: "${change.oldText}"`);
            console.log(`       New: "${change.newText}"`);
            console.log(`       Reason: ${change.reason}`);
          });
        }
        
        if (report.warnings.length > 0) {
          console.log('  Warnings:');
          report.warnings.forEach((warning, index) => {
            console.log(`    ${index + 1}. ${warning}`);
          });
        }
      }
    }
    
    // Summary of change types
    console.log('\n📈 SUMMARY OF CHANGE TYPES:');
    console.log('-'.repeat(30));
    
    const changesByReason = {};
    allReports.forEach(report => {
      report.changes.forEach(change => {
        changesByReason[change.reason] = (changesByReason[change.reason] || 0) + 1;
      });
    });
    
    Object.entries(changesByReason)
      .sort(([,a], [,b]) => b - a)
      .forEach(([reason, count]) => {
        console.log(`  ${count}x ${reason}`);
      });
    
    console.log('\n✅ Blog post false claims fix completed successfully!');
    
    // Key reminders
    console.log('\n🔑 KEY REMINDERS:');
    console.log('   • Orange Jelly has ONLY worked with The Anchor');
    console.log('   • First external client starts September 2025');
    console.log('   • All success stories should reference The Anchor or be marked as industry research');
    console.log('   • Claims should be based on The Anchor experience + industry data');
    
  } catch (error) {
    console.error('❌ Error fixing blog posts:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  fixAllBlogPosts();
}

module.exports = { fixAllBlogPosts, processBlogPost };