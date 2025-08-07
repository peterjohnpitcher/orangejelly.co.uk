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
  token: process.env.SANITY_API_TOKEN,
});

async function fixPartnerships() {
  console.log('🔧 Fixing Partnerships Data...\n');
  
  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ SANITY_API_TOKEN not found in environment variables');
    console.log('Please add SANITY_API_TOKEN to your .env.local file');
    return;
  }
  
  try {
    // Get partnerships from the old document
    const oldDoc = await client.fetch(`*[_id == "aboutContent"][0]`);
    
    if (!oldDoc?.partnerships) {
      console.log('❌ No partnerships found in aboutContent document');
      return;
    }
    
    console.log('✅ Found partnerships in aboutContent:');
    oldDoc.partnerships.forEach((p: any) => {
      console.log(`  - ${p.name}`);
    });
    
    // Update the main document with partnerships
    console.log('\n📝 Updating about-main document...');
    
    const result = await client
      .patch('about-main')
      .set({ partnerships: oldDoc.partnerships })
      .commit();
    
    console.log('✅ Successfully updated about-main with partnerships!');
    console.log('Document revision:', result._rev);
    
    // Verify the update
    console.log('\n🔍 Verifying update...');
    const updated = await client.fetch(`*[_id == "about-main"][0]`);
    
    if (updated?.partnerships) {
      console.log('✅ Partnerships successfully added to about-main:');
      updated.partnerships.forEach((p: any) => {
        console.log(`  - ${p.name}`);
      });
    } else {
      console.log('❌ Update verification failed');
    }
    
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    if (error.message.includes('Unauthorized')) {
      console.log('\n💡 Make sure your SANITY_API_TOKEN has write permissions');
    }
  }
}

// Add confirmation prompt
console.log('This script will copy partnerships from "aboutContent" to "about-main".');
console.log('Press Ctrl+C to cancel, or wait 3 seconds to continue...\n');

setTimeout(fixPartnerships, 3000);