#!/usr/bin/env ts-node

import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// Helper to create a unique key
function createKey() {
  return uuidv4().replace(/-/g, '').substring(0, 12);
}

// Clean special characters that cause issues in Sanity
function cleanText(text: string): string {
  if (!text) return text;
  
  return text
    // Replace smart quotes with regular quotes
    .replace(/[\u2018\u2019]/g, "'") // Smart single quotes
    .replace(/[\u201C\u201D]/g, '"') // Smart double quotes
    // Replace em dashes and en dashes with regular dashes
    .replace(/[\u2013\u2014]/g, '-')
    // Replace ellipsis with three dots
    .replace(/\u2026/g, '...')
    // Remove zero-width spaces and other invisible characters
    .replace(/[\u200B\u200C\u200D\uFEFF]/g, '')
    // Replace non-breaking spaces with regular spaces
    .replace(/\u00A0/g, ' ')
    // Remove any other non-ASCII characters that might cause issues
    .replace(/[^\x00-\x7F£€]/g, '')
    // Clean up multiple spaces
    .replace(/\s+/g, ' ')
    .trim();
}

async function cleanFaqContent() {
  try {
    console.log('🚀 Starting FAQ content cleanup...\n');

    // Get all blog posts with FAQs
    const posts = await client.fetch(`
      *[_type == "blogPost" && defined(faqs)]{ 
        _id, 
        slug,
        faqs
      }
    `);
    
    console.log(`Found ${posts.length} blog posts with FAQs\n`);

    for (const post of posts) {
      const slug = post.slug?.current || 'unknown';
      console.log(`\n📝 Processing ${slug}...`);
      
      if (!post.faqs || !Array.isArray(post.faqs)) {
        console.log(`  ⏭️  No FAQs to clean`);
        continue;
      }

      let needsUpdate = false;
      const cleanedFaqs = post.faqs.map((faq: any) => {
        const originalQuestion = faq.question || '';
        const originalAnswer = faq.answer || '';
        
        const cleanedQuestion = cleanText(originalQuestion);
        const cleanedAnswer = cleanText(originalAnswer);
        
        // Check if anything changed
        if (originalQuestion !== cleanedQuestion || originalAnswer !== cleanedAnswer) {
          needsUpdate = true;
          console.log(`  ✓ Cleaned FAQ: "${cleanedQuestion.substring(0, 40)}..."`);
        }
        
        return {
          _key: faq._key || createKey(),
          question: cleanedQuestion,
          answer: cleanedAnswer,
          isVoiceOptimized: faq.isVoiceOptimized || false
        };
      });

      if (needsUpdate) {
        try {
          await client
            .patch(post._id)
            .set({ faqs: cleanedFaqs })
            .commit();
          
          console.log(`✅ Successfully updated ${slug} with ${cleanedFaqs.length} cleaned FAQs`);
        } catch (error) {
          console.error(`❌ Failed to update ${slug}:`, error);
        }
      } else {
        console.log(`  ✨ FAQs already clean`);
      }
    }

    console.log('\n✨ FAQ cleanup complete!');
    console.log('\nThe FAQs should now be editable in Sanity Studio without errors.');
    
  } catch (error) {
    console.error('Error cleaning FAQ content:', error);
    process.exit(1);
  }
}

// Run the script
cleanFaqContent();