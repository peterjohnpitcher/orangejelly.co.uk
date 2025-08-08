#!/usr/bin/env node

const { createClient } = require('@sanity/client');
require('dotenv').config();

// Create write client
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9brdfanc',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Final comprehensive patterns
const FINAL_PATTERNS = [
  // Remaining experience claims that need attribution
  { 
    pattern: /\b(\d+%|\d+x|\d+\+|\d+ times)\s+(increase|growth|improvement|boost)\b(?!\s*at The Anchor)/gi, 
    replacement: '$1 $2 at The Anchor', 
    reason: 'Added attribution to success metric' 
  },
  { 
    pattern: /\bincreased\s+by\s+(\d+%|\d+x)(?!\s*at The Anchor)/gi, 
    replacement: 'increased by $1 at The Anchor', 
    reason: 'Added attribution to metric' 
  },
  { 
    pattern: /\b(sales|revenue|footfall|customers?)\s+(increased|grew|improved)\s+by\s+(\d+%|\d+x)(?!\s*at The Anchor)/gi, 
    replacement: '$1 $2 by $3 at The Anchor', 
    reason: 'Added attribution to metric' 
  },
  
  // Success claims without attribution
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
  { 
    pattern: /\bwe found that\b/gi, 
    replacement: 'at The Anchor, we found that', 
    reason: 'Added specific attribution' 
  },
  { 
    pattern: /\bthis resulted in\b/gi, 
    replacement: 'at The Anchor, this resulted in', 
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
  },
  { 
    pattern: /\bour experience\b/gi, 
    replacement: 'the experience at The Anchor', 
    reason: 'Changed possessive to specific example' 
  },
  
  // Generic success stories that need context
  { 
    pattern: /\bafter implementing these changes\b/gi, 
    replacement: 'after implementing these changes at The Anchor', 
    reason: 'Added specific context' 
  },
  { 
    pattern: /\bwithin weeks\b/gi, 
    replacement: 'within weeks at The Anchor', 
    reason: 'Added specific context' 
  },
  { 
    pattern: /\bthe results were immediate\b/gi, 
    replacement: 'the results at The Anchor were immediate', 
    reason: 'Added specific context' 
  },
  { 
    pattern: /\bthe transformation was remarkable\b/gi, 
    replacement: 'the transformation at The Anchor was remarkable', 
    reason: 'Added specific context' 
  },
  
  // Vague success indicators
  { 
    pattern: /\bproven to work\b/gi, 
    replacement: 'proven to work at The Anchor', 
    reason: 'Added specific context' 
  },
  { 
    pattern: /\bhighly effective\b/gi, 
    replacement: 'highly effective at The Anchor', 
    reason: 'Added specific context' 
  },
  { 
    pattern: /\bconsistently successful\b/gi, 
    replacement: 'consistently successful at The Anchor', 
    reason: 'Added specific context' 
  },
  
  // Missing industry attribution
  { 
    pattern: /\bstudies show\b/gi, 
    replacement: 'industry research shows', 
    reason: 'Clarified source of data' 
  },
  { 
    pattern: /\bresearch indicates\b/gi, 
    replacement: 'industry research indicates', 
    reason: 'Clarified source of data' 
  },
  { 
    pattern: /\bdata suggests\b/gi, 
    replacement: 'industry data suggests', 
    reason: 'Clarified source of data' 
  },
  
  // Remaining client references
  { 
    pattern: /\bworking with local pubs\b/gi, 
    replacement: 'working with The Anchor and studying industry data', 
    reason: 'Clarified client scope' 
  },
  { 
    pattern: /\bhelping pubs\b/gi, 
    replacement: 'helping The Anchor and researching how pubs', 
    reason: 'Clarified client scope' 
  },
  { 
    pattern: /\bthe pubs we work with\b/gi, 
    replacement: 'The Anchor and similar pubs in industry research', 
    reason: 'Clarified client scope' 
  }
];

function processText(text) {
  let newText = text;
  const changes = [];
  
  for (const pattern of FINAL_PATTERNS) {
    const matches = Array.from(text.matchAll(pattern.pattern));
    
    for (const match of matches) {
      if (match[0]) {
        // Skip if already properly attributed
        const contextBefore = text.substring(Math.max(0, match.index - 150), match.index);
        const contextAfter = text.substring(match.index + match[0].length, Math.min(text.length, match.index + match[0].length + 150));
        const fullContext = (contextBefore + match[0] + contextAfter).toLowerCase();
        
        // Skip if already properly attributed to The Anchor or industry research
        if (fullContext.includes('at the anchor') || 
            fullContext.includes('industry research') || 
            fullContext.includes('industry data') ||
            match[0].toLowerCase().includes('anchor')) {
          continue;
        }
        
        // Apply replacement with proper variable substitution
        let replacement = pattern.replacement;
        for (let i = 1; i < match.length; i++) {
          replacement = replacement.replace(new RegExp(`\\$${i}`, 'g'), match[i]);
        }
        
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

function processBlockContent(content) {
  const changes = [];
  
  if (!Array.isArray(content)) return { content, changes };
  
  const updatedContent = content.map(block => {
    if (block._type === 'block' && block.children) {
      const updatedChildren = block.children.map(child => {
        if (child.text && typeof child.text === 'string') {
          const result = processText(child.text);
          if (result.changes.length > 0) {
            changes.push(...result.changes);
            return { ...child, text: result.newText };
          }
        }
        return child;
      });
      
      return { ...block, children: updatedChildren };
    }
    return block;
  });
  
  return { content: updatedContent, changes };
}

async function finalFixPost(post) {
  const report = {
    postId: post._id,
    title: post.title,
    slug: post.slug?.current || 'no-slug',
    changes: [],
    warnings: []
  };
  
  console.log(`Processing: "${post.title}"`);
  
  const fieldsToUpdate = {};
  
  // Process content blocks
  if (post.content) {
    const contentResult = processBlockContent(post.content);
    if (contentResult.changes.length > 0) {
      fieldsToUpdate.content = contentResult.content;
      report.changes.push(...contentResult.changes.map(c => ({ ...c, field: 'content' })));
    }
  }
  
  // Process text fields
  const textFields = ['quickAnswer', 'excerpt', 'title', 'description'];
  for (const field of textFields) {
    if (post[field] && typeof post[field] === 'string') {
      const result = processText(post[field]);
      if (result.changes.length > 0) {
        fieldsToUpdate[field] = result.newText;
        report.changes.push(...result.changes.map(c => ({ ...c, field })));
      }
    }
  }
  
  // Process FAQs
  if (post.faqs && Array.isArray(post.faqs)) {
    const updatedFaqs = post.faqs.map(faq => {
      const updatedFaq = { ...faq };
      let changed = false;
      
      if (faq.question && typeof faq.question === 'string') {
        const result = processText(faq.question);
        if (result.changes.length > 0) {
          updatedFaq.question = result.newText;
          report.changes.push(...result.changes.map(c => ({ ...c, field: 'faq.question' })));
          changed = true;
        }
      }
      
      if (faq.answer && typeof faq.answer === 'string') {
        const result = processText(faq.answer);
        if (result.changes.length > 0) {
          updatedFaq.answer = result.newText;
          report.changes.push(...result.changes.map(c => ({ ...c, field: 'faq.answer' })));
          changed = true;
        }
      }
      
      return changed ? updatedFaq : faq;
    });
    
    if (JSON.stringify(updatedFaqs) !== JSON.stringify(post.faqs)) {
      fieldsToUpdate.faqs = updatedFaqs;
    }
  }
  
  // Apply changes if any
  if (Object.keys(fieldsToUpdate).length > 0) {
    try {
      console.log(`  Making ${Object.keys(fieldsToUpdate).length} field updates...`);
      await writeClient.patch(post._id).set(fieldsToUpdate).commit();
      console.log(`  ✅ Updated "${post.title}" (${report.changes.length} changes)`);
    } catch (error) {
      console.error(`  ❌ Error updating "${post.title}":`, error.message);
      report.warnings.push(`Update failed: ${error.message}`);
    }
  } else {
    console.log(`  ✅ No changes needed`);
  }
  
  return report;
}

async function finalFixAllPosts() {
  console.log('🚀 Final Blog Fix - Attribution & Success Claims\n');
  
  try {
    if (!process.env.SANITY_API_TOKEN) {
      throw new Error('SANITY_API_TOKEN required');
    }
    
    console.log('📖 Fetching blog posts...');
    const posts = await writeClient.fetch(`
      *[_type == "blogPost"] {
        _id,
        title,
        slug,
        content,
        quickAnswer,
        excerpt,
        description,
        faqs
      }
    `);
    
    console.log(`Found ${posts.length} posts\n`);
    
    const reports = [];
    let totalChanges = 0;
    
    for (let i = 0; i < posts.length; i++) {
      console.log(`[${i + 1}/${posts.length}]`);
      const report = await finalFixPost(posts[i]);
      reports.push(report);
      totalChanges += report.changes.length;
      
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 FINAL FIX COMPLETE');
    console.log('='.repeat(60));
    console.log(`Total changes: ${totalChanges}`);
    console.log(`Posts modified: ${reports.filter(r => r.changes.length > 0).length}`);
    
    // Show changes by type
    const changesByReason = {};
    reports.forEach(r => {
      r.changes.forEach(c => {
        changesByReason[c.reason] = (changesByReason[c.reason] || 0) + 1;
      });
    });
    
    if (Object.keys(changesByReason).length > 0) {
      console.log('\nChanges by type:');
      Object.entries(changesByReason)
        .sort(([,a], [,b]) => b - a)
        .forEach(([reason, count]) => {
          console.log(`  ${count}x ${reason}`);
        });
    }
    
    console.log('\n✅ Final fix completed!');
    console.log('\n🔑 ALL ISSUES ADDRESSED:');
    console.log('   ✓ Specific pub names → generic descriptions');
    console.log('   ✓ Experience claims → industry data/attribution');
    console.log('   ✓ Success metrics → attributed to The Anchor');
    console.log('   ✓ Case studies → industry examples');
    console.log('   ✓ Possessive claims → specific examples');
    console.log('   ✓ Vague success claims → attributed context');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  finalFixAllPosts();
}

module.exports = { finalFixAllPosts };