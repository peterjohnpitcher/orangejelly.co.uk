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

// Critical patterns to fix
const CRITICAL_PATTERNS = [
  // Specific pub names (exact matches only)
  { pattern: /\bThe Bell\b/gi, replacement: 'a typical village pub', reason: 'Replaced specific pub name' },
  { pattern: /\bThe Local\b/gi, replacement: 'a typical neighborhood pub', reason: 'Replaced specific pub name' },
  { pattern: /\bThe Dog & Duck\b/gi, replacement: 'a typical traditional pub', reason: 'Replaced specific pub name' },
  { pattern: /\bThe Rose & Crown\b/gi, replacement: 'a typical market town pub', reason: 'Replaced specific pub name' },
  { pattern: /\bThe Star\b(?!\s*Wars)/gi, replacement: 'a typical high street pub', reason: 'Replaced specific pub name' },
  { pattern: /\bThe Feathers\b/gi, replacement: 'a typical coaching inn', reason: 'Replaced specific pub name' },
  { pattern: /\bThe George & Dragon\b/gi, replacement: 'a typical country pub', reason: 'Replaced specific pub name' },
  { pattern: /\bThe Red Lion\b/gi, replacement: 'a typical traditional pub', reason: 'Replaced specific pub name' },
  { pattern: /\bThe White Horse\b/gi, replacement: 'a typical country pub', reason: 'Replaced specific pub name' },
  { pattern: /\bThe Bull\b/gi, replacement: 'a typical market town pub', reason: 'Replaced specific pub name' },
  { pattern: /\bThe Crown\b/gi, replacement: 'a typical town center pub', reason: 'Replaced specific pub name' },
  { pattern: /\bThe George\b/gi, replacement: 'a typical village pub', reason: 'Replaced specific pub name' },
  { pattern: /\bThe Ship Inn\b/gi, replacement: 'a typical riverside pub', reason: 'Replaced specific pub name' },
  { pattern: /\bThe Kings Head\b/gi, replacement: 'a typical traditional pub', reason: 'Replaced specific pub name' },
  { pattern: /\bThe Royal Oak\b/gi, replacement: 'a typical village pub', reason: 'Replaced specific pub name' },

  // Experience claims
  { pattern: /\bwe've seen\b/gi, replacement: 'industry data shows', reason: 'Changed experience claim to industry data' },
  { pattern: /\bwe helped\b/gi, replacement: 'pubs can', reason: 'Changed client claim to general possibility' },
  { pattern: /\bour clients\b/gi, replacement: 'successful pubs', reason: 'Changed client reference to industry examples' },
  { pattern: /\bwe achieved\b/gi, replacement: 'typical results include', reason: 'Changed achievement claim to industry standard' },
  { pattern: /\bwe increased\b/gi, replacement: 'increases of', reason: 'Changed specific claim to general metric' },
  { pattern: /\bwe grew\b/gi, replacement: 'growth of', reason: 'Changed specific claim to general metric' },
  { pattern: /\bwe have seen\b/gi, replacement: 'industry research shows', reason: 'Changed experience claim to industry research' },
  { pattern: /\bwe have helped\b/gi, replacement: 'pubs have been able to', reason: 'Changed client claim to general possibility' },
  { pattern: /\bin our experience\b/gi, replacement: 'according to industry research', reason: 'Changed experience claim to industry research' },
  { pattern: /\bfrom our work with\b/gi, replacement: 'from industry studies of', reason: 'Changed work claim to industry studies' },

  // Case study markers
  { pattern: /\bCase Study:\b/gi, replacement: 'Industry Example:', reason: 'Changed case study marker' },
  { pattern: /\bSuccess Story:\b/gi, replacement: 'Industry Example:', reason: 'Changed success story marker' },
  { pattern: /\bClient Case Study:\b/gi, replacement: 'Industry Example:', reason: 'Changed client case study marker' }
];

function processText(text) {
  let newText = text;
  const changes = [];
  
  for (const pattern of CRITICAL_PATTERNS) {
    const matches = Array.from(text.matchAll(pattern.pattern));
    
    for (const match of matches) {
      if (match[0]) {
        // Skip if it's about The Anchor
        const contextBefore = text.substring(Math.max(0, match.index - 100), match.index);
        const contextAfter = text.substring(match.index + match[0].length, Math.min(text.length, match.index + match[0].length + 100));
        const fullContext = (contextBefore + match[0] + contextAfter).toLowerCase();
        
        if (fullContext.includes('the anchor') || match[0].toLowerCase().includes('anchor')) {
          console.log(`      Skipping "${match[0]}" - about The Anchor`);
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

async function quickFixPost(post) {
  const report = {
    postId: post._id,
    title: post.title,
    slug: post.slug?.current || 'no-slug',
    changes: [],
    warnings: []
  };
  
  console.log(`Processing: "${post.title}"`);
  
  const mutations = [];
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

async function quickFixAllPosts() {
  console.log('🚀 Quick Blog Fix - Critical Issues Only\n');
  
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
      const report = await quickFixPost(posts[i]);
      reports.push(report);
      totalChanges += report.changes.length;
      
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 QUICK FIX COMPLETE');
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
    
    console.log('\nChanges by type:');
    Object.entries(changesByReason)
      .sort(([,a], [,b]) => b - a)
      .forEach(([reason, count]) => {
        console.log(`  ${count}x ${reason}`);
      });
    
    console.log('\n✅ Quick fix completed!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  quickFixAllPosts();
}

module.exports = { quickFixAllPosts };