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

async function compareDocuments() {
  console.log('📊 Comparing About Content Documents...\n');
  
  try {
    const doc1 = await client.fetch(`*[_id == "about-main"][0]`);
    const doc2 = await client.fetch(`*[_id == "aboutContent"][0]`);
    
    console.log('Document 1: about-main');
    console.log('------------------------');
    console.log('Title:', doc1?.title || 'NO TITLE');
    console.log('Hero Title:', doc1?.heroSection?.title || 'NO HERO');
    console.log('Has story:', !!doc1?.story);
    console.log('Has timeline:', !!doc1?.timeline);
    console.log('Has values:', !!doc1?.values);
    console.log('Has founderSection:', !!doc1?.founderSection);
    console.log('Has partnerships:', !!doc1?.partnerships);
    console.log('Has quickFacts:', !!doc1?.quickFacts);
    console.log('Has visitCTA:', !!doc1?.visitCTA);
    console.log('Has teamMembers:', !!doc1?.teamMembers);
    console.log('Last updated:', doc1?._updatedAt);
    
    console.log('\n\nDocument 2: aboutContent');
    console.log('------------------------');
    console.log('Title:', doc2?.title || 'NO TITLE');
    console.log('Hero Title:', doc2?.heroSection?.title || 'NO HERO');
    console.log('Has story:', !!doc2?.story);
    console.log('Has timeline:', !!doc2?.timeline);
    console.log('Has values:', !!doc2?.values);
    console.log('Has founderSection:', !!doc2?.founderSection);
    console.log('Has partnerships:', !!doc2?.partnerships);
    if (doc2?.partnerships) {
      console.log('  Partnerships:');
      doc2.partnerships.forEach((p: any) => {
        console.log(`    - ${p.name}`);
      });
    }
    console.log('Has quickFacts:', !!doc2?.quickFacts);
    console.log('Has visitCTA:', !!doc2?.visitCTA);
    console.log('Has teamMembers:', !!doc2?.teamMembers);
    console.log('Last updated:', doc2?._updatedAt);
    
    console.log('\n\n🎯 RECOMMENDATION:');
    if (doc2?.partnerships && !doc1?.partnerships) {
      console.log('The "aboutContent" document has partnerships while "about-main" does not.');
      console.log('You should either:');
      console.log('1. Update the query to use _id == "aboutContent" instead of [0]');
      console.log('2. Copy the partnerships data from "aboutContent" to "about-main"');
      console.log('3. Delete the duplicate and keep only one document');
    }
    
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

compareDocuments();