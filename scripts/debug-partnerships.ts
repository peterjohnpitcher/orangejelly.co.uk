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

async function debugPartnerships() {
  console.log('🔍 Debugging Partnerships Data...\n');
  
  try {
    // First, check if aboutContent exists
    const aboutContent = await client.fetch(`*[_type == "aboutContent"][0]`);
    console.log('About Content exists:', !!aboutContent);
    
    if (aboutContent) {
      console.log('About Content ID:', aboutContent._id);
      console.log('Has partnerships field:', 'partnerships' in aboutContent);
      console.log('Partnerships value:', aboutContent.partnerships);
      console.log('Partnerships type:', typeof aboutContent.partnerships);
      console.log('Is array:', Array.isArray(aboutContent.partnerships));
      
      if (aboutContent.partnerships) {
        console.log('Number of partnerships:', aboutContent.partnerships.length);
        console.log('\nPartnership details:');
        aboutContent.partnerships.forEach((p: any, i: number) => {
          console.log(`\n${i + 1}. ${p.name || 'NO NAME'}`);
          console.log('   Full object:', JSON.stringify(p, null, 2));
        });
      }
    }
    
    // Try the exact query used in the app
    console.log('\n\n📋 Using App Query:');
    const appQuery = `
      *[_type == "aboutContent"][0] {
        partnerships[] {
          name,
          description,
          logo {
            asset->{
              _id,
              url
            }
          },
          url
        }
      }
    `;
    
    const result = await client.fetch(appQuery);
    console.log('Query result:', JSON.stringify(result, null, 2));
    
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

debugPartnerships();