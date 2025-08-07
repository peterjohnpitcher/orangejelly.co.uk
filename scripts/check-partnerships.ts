import dotenv from 'dotenv';
import path from 'path';
import { createClient } from '@sanity/client';

// Load environment variables first
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Create client directly here
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'demo-project',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function checkPartnerships() {
  console.log('Checking partnerships data in Sanity...');
  console.log('Project:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
  console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET);
  console.log('');
  
  try {
    // Query for partnerships
    const partnerships = await client.fetch(`
      *[_type == "aboutContent"][0].partnerships[] {
        name,
        description,
        logo,
        url
      }
    `);
    
    if (!partnerships || partnerships.length === 0) {
      console.log('❌ No partnerships found in Sanity\n');
      console.log('The "Working with Industry Leaders" section is using hardcoded fallback data:');
      console.log('- Greene King');
      console.log('- British Institute of Innkeeping');
      console.log('- Federation of Small Businesses');
      console.log('\n✅ Solution: Add partnerships data in Sanity Studio:');
      console.log('1. Go to https://orangejelly.sanity.studio/');
      console.log('2. Navigate to "About Content"');
      console.log('3. Add partnerships with names, descriptions, logos, and URLs');
    } else {
      console.log('✅ Found', partnerships.length, 'partnerships in Sanity:');
      partnerships.forEach((p: any) => {
        console.log(`\n- ${p.name}`);
        if (p.description) console.log(`  Description: ${p.description}`);
        if (p.url) console.log(`  URL: ${p.url}`);
        if (p.logo) console.log(`  Has logo: Yes`);
      });
    }
  } catch (error: any) {
    console.error('Error querying Sanity:', error.message);
  }
}

checkPartnerships();