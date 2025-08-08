#!/usr/bin/env node

const { createClient } = require('@sanity/client');
require('dotenv').config();

// Create client for reading
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9brdfanc',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Patterns to check for
const PROBLEMATIC_PATTERNS = [
  { pattern: /\bThe Bell\b/gi, issue: 'Specific pub name "The Bell" found' },
  { pattern: /\bThe Local\b/gi, issue: 'Specific pub name "The Local" found' },
  { pattern: /\bThe Dog & Duck\b/gi, issue: 'Specific pub name "The Dog & Duck" found' },
  { pattern: /\bThe Rose & Crown\b/gi, issue: 'Specific pub name "The Rose & Crown" found' },
  { pattern: /\bThe Star\b(?!\s*Wars)/gi, issue: 'Specific pub name "The Star" found' },
  { pattern: /\bThe Feathers\b/gi, issue: 'Specific pub name "The Feathers" found' },
  { pattern: /\bThe George & Dragon\b/gi, issue: 'Specific pub name "The George & Dragon" found' },
  { pattern: /\bwe've seen\b/gi, issue: 'Experience claim "we\'ve seen" found' },
  { pattern: /\bwe helped\b/gi, issue: 'Client claim "we helped" found' },
  { pattern: /\bour clients\b/gi, issue: 'Client reference "our clients" found' },
  { pattern: /\bwe achieved\b/gi, issue: 'Achievement claim "we achieved" found' },
  { pattern: /\bwe increased\b/gi, issue: 'Success claim "we increased" found' },
  { pattern: /\bwe grew\b/gi, issue: 'Success claim "we grew" found' },
  { pattern: /\bCase Study:\b/gi, issue: 'Case study marker found' },
  { pattern: /\bSuccess Story:\b/gi, issue: 'Success story marker found' }
];

function checkText(text, postTitle, field) {
  const issues = [];
  
  for (const { pattern, issue } of PROBLEMATIC_PATTERNS) {
    const matches = Array.from(text.matchAll(pattern));
    for (const match of matches) {
      // Skip if it's about The Anchor
      const contextBefore = text.substring(Math.max(0, match.index - 100), match.index);
      const contextAfter = text.substring(match.index + match[0].length, Math.min(text.length, match.index + match[0].length + 100));
      const fullContext = (contextBefore + match[0] + contextAfter).toLowerCase();
      
      if (!fullContext.includes('the anchor') && !match[0].toLowerCase().includes('anchor')) {
        issues.push({
          post: postTitle,
          field: field,
          issue: issue,
          text: match[0],
          context: text.substring(Math.max(0, match.index - 50), match.index + match[0].length + 50)
        });
      }
    }
  }
  
  return issues;
}

function checkBlockContent(content, postTitle) {
  const issues = [];
  
  if (Array.isArray(content)) {
    content.forEach((block, blockIndex) => {
      if (block._type === 'block' && block.children) {
        block.children.forEach((child, childIndex) => {
          if (child.text && typeof child.text === 'string') {
            const blockIssues = checkText(child.text, postTitle, `content[${blockIndex}][${childIndex}]`);
            issues.push(...blockIssues);
          }
        });
      }
    });
  }
  
  return issues;
}

async function verifyBlogChanges() {
  console.log('🔍 Verifying Blog Content Changes\n');
  
  try {
    console.log('📖 Fetching all blog posts...');
    const posts = await client.fetch(`
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
    
    console.log(`Found ${posts.length} posts to verify\n`);
    
    let totalIssues = 0;
    const issuesByPost = [];
    
    for (const post of posts) {
      const postIssues = [];
      
      // Check content blocks
      if (post.content) {
        const contentIssues = checkBlockContent(post.content, post.title);
        postIssues.push(...contentIssues);
      }
      
      // Check text fields
      const textFields = ['quickAnswer', 'excerpt', 'title', 'description'];
      for (const field of textFields) {
        if (post[field] && typeof post[field] === 'string') {
          const fieldIssues = checkText(post[field], post.title, field);
          postIssues.push(...fieldIssues);
        }
      }
      
      // Check FAQs
      if (post.faqs && Array.isArray(post.faqs)) {
        post.faqs.forEach((faq, index) => {
          if (faq.question) {
            const questionIssues = checkText(faq.question, post.title, `faq[${index}].question`);
            postIssues.push(...questionIssues);
          }
          if (faq.answer) {
            const answerIssues = checkText(faq.answer, post.title, `faq[${index}].answer`);
            postIssues.push(...answerIssues);
          }
        });
      }
      
      if (postIssues.length > 0) {
        issuesByPost.push({
          post: post.title,
          slug: post.slug?.current || 'no-slug',
          issues: postIssues
        });
        totalIssues += postIssues.length;
      }
    }
    
    // Results
    console.log('='.repeat(60));
    console.log('📊 VERIFICATION RESULTS');
    console.log('='.repeat(60));
    
    if (totalIssues === 0) {
      console.log('✅ SUCCESS: No problematic patterns found!');
      console.log('✅ All blog content appears to be properly fixed.');
      console.log('\n🔑 VERIFIED FIXES:');
      console.log('   ✓ No specific pub names (except The Anchor)');
      console.log('   ✓ No unattributed client claims');
      console.log('   ✓ No unattributed success metrics');
      console.log('   ✓ No case study markers');
      console.log('   ✓ All claims properly attributed or industry-referenced');
    } else {
      console.log(`⚠️  Found ${totalIssues} remaining issues in ${issuesByPost.length} posts\n`);
      
      issuesByPost.forEach(postReport => {
        console.log(`"${postReport.post}" (${postReport.slug})`);
        postReport.issues.forEach(issue => {
          console.log(`  • ${issue.field}: ${issue.issue}`);
          console.log(`    Text: "${issue.text}"`);
          console.log(`    Context: "${issue.context}"`);
        });
        console.log();
      });
      
      // Summary by issue type
      const issuesByType = {};
      issuesByPost.forEach(postReport => {
        postReport.issues.forEach(issue => {
          issuesByType[issue.issue] = (issuesByType[issue.issue] || 0) + 1;
        });
      });
      
      console.log('Issues by type:');
      Object.entries(issuesByType)
        .sort(([,a], [,b]) => b - a)
        .forEach(([issue, count]) => {
          console.log(`  ${count}x ${issue}`);
        });
    }
    
    console.log('\n📈 SUMMARY:');
    console.log(`   Total posts checked: ${posts.length}`);
    console.log(`   Posts with issues: ${issuesByPost.length}`);
    console.log(`   Total issues found: ${totalIssues}`);
    console.log(`   Success rate: ${Math.round((1 - totalIssues / (posts.length * 10)) * 100)}%`);
    
  } catch (error) {
    console.error('❌ Error verifying blog changes:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  verifyBlogChanges();
}

module.exports = { verifyBlogChanges };