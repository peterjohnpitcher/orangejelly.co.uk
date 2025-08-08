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
});

async function checkAuthor() {
  console.log('🔍 Checking Author Data...\n');
  
  try {
    // Check for Peter Pitcher author
    const peter = await client.fetch(`*[_type == "author" && _id == "author-peter-pitcher"][0]`);
    
    if (peter) {
      console.log('✅ Found Peter Pitcher author document');
      console.log('Name:', peter.name);
      console.log('Role:', peter.role);
      console.log('Has bio:', !!peter.bio);
      console.log('Has image:', !!peter.image);
      if (peter.image) {
        console.log('Image asset:', peter.image.asset);
      }
    } else {
      console.log('❌ No author document found for Peter Pitcher');
    }
    
    // Check all authors
    console.log('\n📋 All authors:');
    const allAuthors = await client.fetch(`*[_type == "author"] { _id, name, role, image }`);
    allAuthors.forEach((author: any) => {
      console.log(`- ${author.name} (${author._id})`);
      console.log(`  Role: ${author.role}`);
      console.log(`  Has image: ${!!author.image}`);
    });
    
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

checkAuthor();