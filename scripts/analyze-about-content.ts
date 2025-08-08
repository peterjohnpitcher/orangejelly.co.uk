#!/usr/bin/env ts-node

import { createClient } from '@sanity/client';

// Use the actual project configuration
const client = createClient({
  projectId: '9brdfanc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function analyzeAboutContent() {
  console.log('🔍 Analyzing About content for migration completion...\n');

  try {
    // Get the current About content
    const aboutContent = await client.fetch('*[_type == "aboutContent"][0]');
    const aboutFAQs = await client.fetch('*[_type == "faq" && page == "about"] | order(order asc)');
    
    console.log('📊 Current About Content Status:');
    console.log('================================');
    
    if (aboutContent) {
      console.log(`✅ About Document ID: ${aboutContent._id}`);
      console.log(`   - Title: "${aboutContent.title}"`);
      console.log(`   - Hero Title: "${aboutContent.heroSection?.title}"`);
      console.log(`   - Hero Subtitle: "${aboutContent.heroSection?.subtitle?.substring(0, 50)}..."`);
      console.log(`   - Story Blocks: ${aboutContent.story?.length || 0}`);
      console.log(`   - Timeline Events: ${aboutContent.timeline?.length || 0}`);
      console.log(`   - Values: ${aboutContent.values?.length || 0}`);
      console.log(`   - Founder Name: "${aboutContent.founderSection?.name}"`);
      console.log(`   - Quick Facts: ${aboutContent.quickFacts?.facts?.length || 0}`);
      console.log(`   - Visit CTA: ${aboutContent.visitCTA ? '✅ Present' : '❌ Missing'}`);
      console.log(`   - Why Orange Jelly: ${aboutContent.whyOrangeJelly ? '✅ Present' : '❌ Missing'}`);
      console.log(`   - Partnerships: ${aboutContent.partnerships?.length || 0}`);
      
      // Show what content we have
      if (aboutContent.whyOrangeJelly) {
        console.log(`\n📝 "Why Orange Jelly" Content:`);
        console.log(`   Title: "${aboutContent.whyOrangeJelly.title}"`);
        if (aboutContent.whyOrangeJelly.content) {
          console.log(`   Content blocks: ${aboutContent.whyOrangeJelly.content.length}`);
        }
      }
    } else {
      console.log('❌ No About content document found');
    }

    console.log(`\n❓ About FAQs: ${aboutFAQs.length} found`);
    
    // Group FAQs by question to find duplicates
    const questionCounts: { [key: string]: number } = {};
    aboutFAQs.forEach((faq: any) => {
      questionCounts[faq.question] = (questionCounts[faq.question] || 0) + 1;
    });

    const duplicates = Object.entries(questionCounts).filter(([_, count]) => count > 1);
    if (duplicates.length > 0) {
      console.log(`\n⚠️  Found ${duplicates.length} duplicate questions:`);
      duplicates.forEach(([question, count]) => {
        console.log(`   - "${question.substring(0, 60)}..." (${count} times)`);
      });
    } else {
      console.log('✅ No duplicate FAQs found');
    }

    console.log('\n📋 What needs to be done:');
    console.log('=========================');
    
    const tasks = [];
    
    if (!aboutContent?.whyOrangeJelly) {
      tasks.push('❌ Add "Why Orange Jelly" section to Sanity');
    } else {
      tasks.push('✅ "Why Orange Jelly" section exists');
    }
    
    if (duplicates.length > 0) {
      tasks.push(`❌ Clean up ${duplicates.length} duplicate FAQ questions`);
    } else {
      tasks.push('✅ No FAQ duplicates to clean');
    }
    
    if (!aboutContent?.partnerships || aboutContent.partnerships.length === 0) {
      tasks.push('❌ Add partnership content (BII, Greene King, etc.)');
    } else {
      tasks.push(`✅ ${aboutContent.partnerships.length} partnerships exist`);
    }
    
    tasks.push('❌ Remove hardcoded fallbacks from AboutPage.tsx');
    tasks.push('❌ Test About page functionality');
    
    tasks.forEach(task => console.log(`   ${task}`));

  } catch (error) {
    console.error('❌ Error analyzing About content:', error);
  }
}

// Run the analysis if this file is executed directly
if (require.main === module) {
  analyzeAboutContent()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('💥 Analysis failed:', error);
      process.exit(1);
    });
}

export { analyzeAboutContent };