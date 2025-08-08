import dotenv from 'dotenv';
import path from 'path';
import { createClient } from '@sanity/client';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'demo-project',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // Need write access
});

async function removeDuplicateFAQs() {
  console.log('🔍 Removing Duplicate FAQs from Sanity...\n');
  
  try {
    // Get all FAQs
    const allFAQs = await client.fetch(`*[_type in ["faq", "servicesFAQ"]] { _id, question, page, order, answer }`);
    
    // Group by question and page to find duplicates
    const faqMap = new Map();
    const duplicatesToDelete = [];
    
    allFAQs.forEach((faq: any) => {
      const key = `${faq.question}-${faq.page || 'services'}`;
      
      if (faqMap.has(key)) {
        // This is a duplicate - mark for deletion
        // Keep the one with the shorter ID (typically the older one)
        const existing = faqMap.get(key);
        if (faq._id.length > existing._id.length) {
          duplicatesToDelete.push(faq._id);
          console.log(`Will delete duplicate: ${faq.question.substring(0, 50)}...`);
          console.log(`  Keeping ID: ${existing._id}`);
          console.log(`  Deleting ID: ${faq._id}`);
        } else {
          duplicatesToDelete.push(existing._id);
          faqMap.set(key, faq);
          console.log(`Will delete duplicate: ${faq.question.substring(0, 50)}...`);
          console.log(`  Keeping ID: ${faq._id}`);
          console.log(`  Deleting ID: ${existing._id}`);
        }
      } else {
        faqMap.set(key, faq);
      }
    });
    
    console.log(`\n📊 Found ${duplicatesToDelete.length} duplicates to remove\n`);
    
    if (duplicatesToDelete.length === 0) {
      console.log('✅ No duplicates found!');
      return;
    }
    
    // Confirm before deletion
    console.log('⚠️  This will permanently delete the duplicate FAQs from Sanity.');
    console.log('Press Ctrl+C to cancel, or wait 5 seconds to proceed...\n');
    
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Delete duplicates
    for (const id of duplicatesToDelete) {
      console.log(`Deleting ${id}...`);
      await client.delete(id);
    }
    
    console.log(`\n✅ Successfully removed ${duplicatesToDelete.length} duplicate FAQs!`);
    
    // Verify results
    console.log('\n📋 Verification - FAQs remaining:');
    const homeFAQs = await client.fetch(`*[_type == "faq" && page == "home"] | order(order asc)`);
    const aboutFAQs = await client.fetch(`*[_type == "faq" && page == "about"] | order(order asc)`);
    console.log(`  Homepage: ${homeFAQs.length} FAQs`);
    console.log(`  About page: ${aboutFAQs.length} FAQs`);
    
  } catch (error: any) {
    console.error('Error:', error.message);
    if (error.message.includes('token')) {
      console.error('\n⚠️  You need to set SANITY_API_TOKEN in .env.local with write permissions');
    }
  }
}

removeDuplicateFAQs();