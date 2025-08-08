#!/usr/bin/env ts-node

import { writeClient } from '../src/lib/sanity.write-client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Interface for blog post content
interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  content: any[];
  status: string;
  quickAnswer?: string;
  excerpt?: string;
  faqs?: Array<{
    question: string;
    answer: string;
    _key?: string;
  }>;
}

// Interface for changes made
interface Change {
  field: string;
  blockIndex?: number;
  oldText: string;
  newText: string;
  reason: string;
}

// Simple, memory-efficient replacement patterns
const SIMPLE_REPLACEMENTS = [
  // Most common pub names found in the review
  { pattern: /The Red Lion/g, replacement: 'a traditional pub', reason: 'Generic pub name' },
  { pattern: /The White Horse/g, replacement: 'a country pub', reason: 'Generic pub name' },
  { pattern: /The Crown/g, replacement: 'a town center pub', reason: 'Generic pub name' },
  { pattern: /The George/g, replacement: 'a village pub', reason: 'Generic pub name' },
  { pattern: /The Bull/g, replacement: 'a market town pub', reason: 'Generic pub name' },
  { pattern: /The Ship/g, replacement: 'a riverside pub', reason: 'Generic pub name' },
  { pattern: /The Coach/g, replacement: 'a coaching inn', reason: 'Generic pub name' },
  { pattern: /The Swan/g, replacement: 'a waterside pub', reason: 'Generic pub name' },
  { pattern: /The Fox/g, replacement: 'a countryside pub', reason: 'Generic pub name' },
  { pattern: /The Bell/g, replacement: 'a village pub', reason: 'Generic pub name' },
  { pattern: /The Eagle/g, replacement: 'a town pub', reason: 'Generic pub name' },
  { pattern: /The Star/g, replacement: 'a community pub', reason: 'Generic pub name' },
  { pattern: /The Local/g, replacement: 'a local pub', reason: 'Generic pub name' },
  { pattern: /The Social/g, replacement: 'a social club pub', reason: 'Generic pub name' },
  { pattern: /The Plough/g, replacement: 'a farming community pub', reason: 'Generic pub name' },
  { pattern: /The Village/g, replacement: 'a village pub', reason: 'Generic pub name' },
  { pattern: /the Local/g, replacement: 'a local pub', reason: 'Generic pub name' },
  { pattern: /the local/g, replacement: 'a local pub', reason: 'Generic pub name' },
  { pattern: /the bar/g, replacement: 'the pub', reason: 'Generic pub reference' },
  { pattern: /the house/g, replacement: 'the pub', reason: 'Generic pub reference' },
  { pattern: /The Queen's Head/g, replacement: 'a village pub', reason: 'Generic pub name' },
  { pattern: /The Botanist/g, replacement: 'a cocktail-focused pub', reason: 'Generic pub name' },
  
  // Simple result claims - basic patterns
  { pattern: /^Increased /gm, replacement: 'Industry data shows increased ', reason: 'Industry data reference' },
  { pattern: /^Improved /gm, replacement: 'Industry research shows improved ', reason: 'Industry research reference' },
  { pattern: /^Grew /gm, replacement: 'Industry examples show growth in ', reason: 'Industry example reference' },
  { pattern: /^Achieved /gm, replacement: 'Industry studies show pubs achieving ', reason: 'Industry study reference' },
  { pattern: /^Delivered /gm, replacement: 'Industry data shows delivery of ', reason: 'Industry data reference' },
  { pattern: /^Boosted /gm, replacement: 'Industry research shows boosted ', reason: 'Industry research reference' },
  
  // Result statements
  { pattern: /Result: Increased /g, replacement: 'Industry Result: Data shows increased ', reason: 'Industry data reference' },
  { pattern: /Result: Improved /g, replacement: 'Industry Result: Research shows improved ', reason: 'Industry research reference' },
  { pattern: /Result: Grew /g, replacement: 'Industry Result: Examples show growth in ', reason: 'Industry example reference' },
  { pattern: /Result: Achieved /g, replacement: 'Industry Result: Studies show achieved ', reason: 'Industry study reference' },
  
  // Case studies
  { pattern: /Case Study:(?! The Anchor|Industry Example)/g, replacement: 'Industry Example:', reason: 'Industry example clarification' },
  { pattern: /Success Story:(?! The Anchor|Industry Example)/g, replacement: 'Industry Example:', reason: 'Industry example clarification' },
  
  // Experience claims
  { pattern: /we've seen/g, replacement: 'industry data shows', reason: 'Industry data reference' },
  { pattern: /in our experience/g, replacement: 'according to industry research', reason: 'Industry research reference' },
  { pattern: /from our work with/g, replacement: 'from industry studies of', reason: 'Industry study reference' },
  { pattern: /our clients have/g, replacement: 'industry research shows pubs', reason: 'Industry research reference' },
];

// Function to check if content is about The Anchor
function isAboutAnchor(context: string): boolean {
  const anchorKeywords = ['the anchor', 'anchor pub', 'billy', 'peter', 'our pub', 'my pub', 'peter and billy'];
  const lowerContext = context.toLowerCase();
  return anchorKeywords.some(keyword => lowerContext.includes(keyword));
}

// Function to get context around a match
function getContext(text: string, matchIndex: number, matchLength: number): string {
  const start = Math.max(0, matchIndex - 100);
  const end = Math.min(text.length, matchIndex + matchLength + 100);
  return text.substring(start, end);
}

// Function to process text content
function processText(text: string): { newText: string; changes: Change[] } {
  let newText = text;
  const changes: Change[] = [];
  
  for (const replacement of SIMPLE_REPLACEMENTS) {
    const matches = Array.from(text.matchAll(replacement.pattern));
    
    for (const match of matches) {
      if (match.index !== undefined) {
        const context = getContext(text, match.index, match[0].length);
        
        // Skip if it's about The Anchor
        if (isAboutAnchor(context)) {
          continue;
        }
        
        // Skip if already industry-focused
        if (context.toLowerCase().includes('industry') || 
            context.toLowerCase().includes('research shows') ||
            context.toLowerCase().includes('data shows')) {
          continue;
        }
        
        changes.push({
          field: 'content',
          oldText: match[0],
          newText: replacement.replacement,
          reason: replacement.reason
        });
        
        newText = newText.replace(match[0], replacement.replacement);
      }
    }
  }
  
  return { newText, changes };
}

// Function to process a single blog post
async function processBlogPost(postId: string) {
  try {
    // Fetch single post
    const query = `*[_type == "blogPost" && _id == "${postId}"][0] {
      _id, title, "slug": slug, content, status, quickAnswer, excerpt, faqs
    }`;
    
    const post: BlogPost = await writeClient.fetch(query);
    
    if (!post) {
      console.log(`❌ Post ${postId} not found`);
      return { success: false, changes: 0 };
    }
    
    console.log(`🔧 Processing: "${post.title}"`);
    
    const mutations: any[] = [];
    let totalChanges = 0;
    
    // Process main content
    if (post.content && Array.isArray(post.content)) {
      const updatedContent = [...post.content];
      let contentChanged = false;
      
      for (let i = 0; i < updatedContent.length; i++) {
        const block = updatedContent[i];
        
        if (block._type === 'block' && block.children) {
          const updatedChildren = [...block.children];
          let blockChanged = false;
          
          for (let j = 0; j < updatedChildren.length; j++) {
            const child = updatedChildren[j];
            
            if (child.text && typeof child.text === 'string') {
              const result = processText(child.text);
              
              if (result.changes.length > 0) {
                updatedChildren[j] = { ...child, text: result.newText };
                blockChanged = true;
                totalChanges += result.changes.length;
                
                console.log(`    Block ${i}: ${result.changes.length} changes`);
                result.changes.forEach(change => {
                  console.log(`      "${change.oldText}" → "${change.newText}"`);
                });
              }
            }
          }
          
          if (blockChanged) {
            updatedContent[i] = { ...block, children: updatedChildren };
            contentChanged = true;
          }
        }
      }
      
      if (contentChanged) {
        mutations.push({
          patch: {
            id: post._id,
            set: { content: updatedContent }
          }
        });
      }
    }
    
    // Process other fields
    const fieldsToProcess = [
      { field: 'quickAnswer', value: post.quickAnswer },
      { field: 'excerpt', value: post.excerpt }
    ];
    
    for (const { field, value } of fieldsToProcess) {
      if (value && typeof value === 'string') {
        const result = processText(value);
        
        if (result.changes.length > 0) {
          mutations.push({
            patch: {
              id: post._id,
              set: { [field]: result.newText }
            }
          });
          
          totalChanges += result.changes.length;
          console.log(`    ${field}: ${result.changes.length} changes`);
        }
      }
    }
    
    // Apply mutations
    if (mutations.length > 0) {
      for (const mutation of mutations) {
        await writeClient.patch(mutation.patch.id).set(mutation.patch.set).commit();
      }
      console.log(`  ✅ Applied ${mutations.length} updates with ${totalChanges} total changes`);
    } else {
      console.log(`  ℹ️  No changes needed`);
    }
    
    return { success: true, changes: totalChanges };
    
  } catch (error) {
    console.error(`❌ Error processing post ${postId}:`, error);
    return { success: false, changes: 0 };
  }
}

// Main function
async function fixBlogIssuesSimple() {
  console.log('🚀 Starting simple blog issue fixes...\n');
  
  try {
    if (!process.env.SANITY_API_TOKEN) {
      throw new Error('SANITY_API_TOKEN required');
    }
    
    // Get all post IDs first
    console.log('📖 Fetching blog post list...');
    const listQuery = `*[_type == "blogPost"] { _id, title, "slug": slug.current }`;
    const posts = await writeClient.fetch(listQuery);
    
    console.log(`Found ${posts.length} blog posts to process\n`);
    
    let totalChanges = 0;
    let postsProcessed = 0;
    let postsWithChanges = 0;
    
    // Process each post individually to manage memory
    for (let i = 0; i < posts.length; i++) {
      console.log(`[${i + 1}/${posts.length}]`);
      
      const result = await processBlogPost(posts[i]._id);
      
      if (result.success) {
        postsProcessed++;
        if (result.changes > 0) {
          postsWithChanges++;
          totalChanges += result.changes;
        }
      }
      
      // Small delay to avoid overwhelming Sanity
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Force garbage collection every few posts
      if (i % 5 === 0 && global.gc) {
        global.gc();
      }
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 SIMPLE FIX RESULTS');
    console.log('='.repeat(60));
    console.log(`Posts processed: ${postsProcessed}/${posts.length}`);
    console.log(`Posts with changes: ${postsWithChanges}`);
    console.log(`Total changes made: ${totalChanges}`);
    console.log('='.repeat(60));
    
    console.log('\n✅ Simple blog fixes completed!');
    
    if (totalChanges > 0) {
      console.log('\n🔄 Run the comprehensive review script to check remaining issues');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Run the script
if (require.main === module) {
  fixBlogIssuesSimple();
}

export { fixBlogIssuesSimple };