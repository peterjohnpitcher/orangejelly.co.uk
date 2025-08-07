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

async function checkFAQs() {
  console.log('🔍 Checking FAQ Data in Sanity...\n');
  
  try {
    // Check homepage FAQs
    console.log('📋 Homepage FAQs:');
    const homeFAQs = await client.fetch(`*[_type == "faq" && page == "home"] | order(order asc) { question, answer, _id }`);
    console.log(`Found ${homeFAQs.length} FAQs`);
    const homeQuestions = new Set();
    homeFAQs.forEach((faq: any, i: number) => {
      console.log(`  ${i + 1}. ${faq.question.substring(0, 50)}...`);
      if (homeQuestions.has(faq.question)) {
        console.log(`     ⚠️ DUPLICATE QUESTION FOUND!`);
      }
      homeQuestions.add(faq.question);
    });
    
    // Check about FAQs
    console.log('\n📋 About Page FAQs:');
    const aboutFAQs = await client.fetch(`*[_type == "faq" && page == "about"] | order(order asc) { question, answer, _id }`);
    console.log(`Found ${aboutFAQs.length} FAQs`);
    const aboutQuestions = new Set();
    aboutFAQs.forEach((faq: any, i: number) => {
      console.log(`  ${i + 1}. ${faq.question.substring(0, 50)}...`);
      if (aboutQuestions.has(faq.question)) {
        console.log(`     ⚠️ DUPLICATE QUESTION FOUND!`);
      }
      aboutQuestions.add(faq.question);
    });
    
    // Check contact FAQs
    console.log('\n📋 Contact Page FAQs:');
    const contactFAQs = await client.fetch(`*[_type == "faq" && page == "contact"] | order(order asc) { question, answer, _id }`);
    console.log(`Found ${contactFAQs.length} FAQs`);
    const contactQuestions = new Set();
    contactFAQs.forEach((faq: any, i: number) => {
      console.log(`  ${i + 1}. ${faq.question.substring(0, 50)}...`);
      if (contactQuestions.has(faq.question)) {
        console.log(`     ⚠️ DUPLICATE QUESTION FOUND!`);
      }
      contactQuestions.add(faq.question);
    });
    
    // Check services FAQs
    console.log('\n📋 Services FAQs:');
    const servicesFAQs = await client.fetch(`*[_type == "servicesFAQ"] { question, answer, _id }`);
    console.log(`Found ${servicesFAQs.length} FAQs`);
    const servicesQuestions = new Set();
    servicesFAQs.forEach((faq: any, i: number) => {
      console.log(`  ${i + 1}. ${faq.question.substring(0, 50)}...`);
      if (servicesQuestions.has(faq.question)) {
        console.log(`     ⚠️ DUPLICATE QUESTION FOUND!`);
      }
      servicesQuestions.add(faq.question);
    });
    
    // Check for duplicates by ID
    console.log('\n🔍 Checking for exact duplicates:');
    const allFAQs = await client.fetch(`*[_type in ["faq", "servicesFAQ"]] { _id, question, page }`);
    const idMap = new Map();
    allFAQs.forEach((faq: any) => {
      const key = `${faq.question}-${faq.page || 'services'}`;
      if (idMap.has(key)) {
        console.log(`⚠️ DUPLICATE: "${faq.question.substring(0, 50)}..." on ${faq.page || 'services'} page`);
        console.log(`   IDs: ${idMap.get(key)} and ${faq._id}`);
      } else {
        idMap.set(key, faq._id);
      }
    });
    
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

checkFAQs();