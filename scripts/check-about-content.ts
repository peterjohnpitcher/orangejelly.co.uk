#!/usr/bin/env ts-node

import { createClient } from '@sanity/client';

// Use the actual project configuration
const client = createClient({
  projectId: '9brdfanc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function checkAboutContent() {
  console.log('🔍 Checking current About content in Sanity...\n');

  try {
    // Check about content document
    const aboutContent = await client.fetch('*[_type == "aboutContent"][0]');
    
    if (aboutContent) {
      console.log('✅ About content document exists');
      console.log(`   - Title: ${aboutContent.title}`);
      console.log(`   - Hero: ${aboutContent.heroSection ? '✅' : '❌'}`);
      console.log(`   - Story: ${aboutContent.story?.length || 0} paragraphs`);
      console.log(`   - Timeline: ${aboutContent.timeline?.length || 0} events`);
      console.log(`   - Values: ${aboutContent.values?.length || 0} values`);
      console.log(`   - Founder Section: ${aboutContent.founderSection ? '✅' : '❌'}`);
      console.log(`   - Quick Facts: ${aboutContent.quickFacts?.facts?.length || 0} facts`);
      console.log(`   - Visit CTA: ${aboutContent.visitCTA ? '✅' : '❌'}`);
      console.log(`   - Why Orange Jelly: ${aboutContent.whyOrangeJelly ? '✅' : '❌'}`);
      console.log(`   - Partnerships: ${aboutContent.partnerships?.length || 0} partnerships`);
    } else {
      console.log('❌ No About content document found');
    }

    // Check About FAQs
    const aboutFAQs = await client.fetch('*[_type == "faq" && page == "about"]');
    console.log(`\n❓ About FAQs: ${aboutFAQs.length} found`);
    
    if (aboutFAQs.length > 0) {
      aboutFAQs.forEach((faq: any, index: number) => {
        console.log(`   ${index + 1}. ${faq.question.substring(0, 60)}...`);
      });
    }

  } catch (error) {
    console.error('❌ Error checking About content:', error);
  }
}

// Run the check if this file is executed directly
if (require.main === module) {
  checkAboutContent()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('💥 Check failed:', error);
      process.exit(1);
    });
}

export { checkAboutContent };