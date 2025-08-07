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

async function checkDrafts() {
  console.log('🔍 Checking for Draft Content...\n');
  
  try {
    // Check published version
    const published = await client.fetch(`*[_id == "about-main"][0]`);
    console.log('Published version exists:', !!published);
    if (published) {
      console.log('Published has partnerships:', !!published.partnerships);
      if (published.partnerships) {
        console.log('Published partnerships count:', published.partnerships.length);
      }
    }
    
    // Check draft version
    const draft = await client.fetch(`*[_id == "drafts.about-main"][0]`);
    console.log('\nDraft version exists:', !!draft);
    if (draft) {
      console.log('Draft has partnerships:', !!draft.partnerships);
      if (draft.partnerships) {
        console.log('Draft partnerships count:', draft.partnerships.length);
        console.log('\nDraft partnerships:');
        draft.partnerships.forEach((p: any) => {
          console.log(`- ${p.name}`);
        });
      }
    }
    
    // Check all aboutContent documents
    console.log('\n📋 All aboutContent documents:');
    const allDocs = await client.fetch(`*[_type == "aboutContent"] { _id, _rev, partnerships }`);
    allDocs.forEach((doc: any) => {
      console.log(`\nDocument: ${doc._id}`);
      console.log(`Revision: ${doc._rev}`);
      console.log(`Has partnerships: ${!!doc.partnerships}`);
      if (doc.partnerships) {
        console.log(`Partnership count: ${doc.partnerships.length}`);
      }
    });
    
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

checkDrafts();