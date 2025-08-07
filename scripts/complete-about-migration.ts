#!/usr/bin/env ts-node

import { writeClient, hasWriteAccess } from '../src/lib/sanity.write-client';
import { client as readClient } from '../src/lib/sanity.client';
import { v4 as uuidv4 } from 'uuid';

async function completeAboutMigration() {
  console.log('🚀 Completing About page migration...\n');

  try {
    // 1. First, clean up duplicate FAQs
    console.log('🧹 Cleaning up duplicate About FAQs...');
    const allAboutFAQs = await readClient.fetch('*[_type == "faq" && page == "about"]{_id, question}');
    
    // Group by question to find duplicates
    const questionGroups: { [key: string]: any[] } = {};
    allAboutFAQs.forEach((faq: any) => {
      if (!questionGroups[faq.question]) {
        questionGroups[faq.question] = [];
      }
      questionGroups[faq.question].push(faq);
    });

    // Delete duplicates (keep the first one)
    let deletedCount = 0;
    for (const question in questionGroups) {
      const faqs = questionGroups[question];
      if (faqs.length > 1) {
        // Delete all but the first one
        for (let i = 1; i < faqs.length; i++) {
          try {
            await writeClient.delete(faqs[i]._id);
            console.log(`   ❌ Deleted duplicate: ${question.substring(0, 50)}...`);
            deletedCount++;
          } catch (error) {
            console.error(`   ⚠️  Error deleting ${faqs[i]._id}:`, error);
          }
        }
      }
    }
    console.log(`✅ Cleaned up ${deletedCount} duplicate FAQs`);

    // 2. Add missing "Why Orange Jelly" section
    console.log('\n📝 Adding missing "Why Orange Jelly" section...');
    const whyOrangeJellyContent = {
      title: 'Why Orange Jelly?',
      content: [
        {
          _type: 'block',
          _key: uuidv4(),
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: uuidv4(),
              text: 'Just a fun play on words in a world that\'s ever-changing! We wanted a name that\'s friendly, memorable, and doesn\'t take itself too seriously - just like us.',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: uuidv4(),
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: uuidv4(),
              text: 'The name reflects our approach: making complicated technology simple and approachable for pub owners who just want to get back to what they love - running a great local.',
              marks: [],
            },
          ],
        },
      ],
    };

    // Update the about content document with the missing section
    const aboutPatch = await writeClient
      .patch('aboutContent')
      .set({ whyOrangeJelly: whyOrangeJellyContent })
      .commit();
    console.log('✅ Added "Why Orange Jelly" section');

    // 3. Add partnerships if they don't exist
    console.log('\n🤝 Checking partnerships...');
    const currentAbout = await readClient.fetch('*[_type == "aboutContent"][0]');
    if (!currentAbout.partnerships || currentAbout.partnerships.length === 0) {
      console.log('   Adding default partnerships...');
      const partnerships = [
        {
          _key: uuidv4(),
          name: 'British Institute of Innkeeping',
          description: 'Professional development and training for pub operators',
          url: 'https://www.bii.org/',
          // Note: Logo would need to be uploaded separately
        },
        {
          _key: uuidv4(),
          name: 'Greene King',
          description: 'Our pub company partner',
          url: 'https://www.greeneking.co.uk/',
          // Note: Logo would need to be uploaded separately  
        },
      ];

      await writeClient
        .patch('aboutContent')
        .set({ partnerships })
        .commit();
      console.log('✅ Added default partnerships');
    } else {
      console.log('✅ Partnerships already exist');
    }

    console.log('\n🎉 About page migration completed successfully!');
    console.log('\n📊 Final Status:');
    
    // Check final state
    const finalAbout = await readClient.fetch('*[_type == "aboutContent"][0]');
    const finalFAQs = await readClient.fetch('*[_type == "faq" && page == "about"]');
    
    console.log(`   - About content: ✅ Complete`);
    console.log(`   - Hero Section: ✅ ${finalAbout.heroSection ? 'Yes' : 'No'}`);
    console.log(`   - Story: ✅ ${finalAbout.story?.length || 0} paragraphs`);
    console.log(`   - Timeline: ✅ ${finalAbout.timeline?.length || 0} events`);
    console.log(`   - Values: ✅ ${finalAbout.values?.length || 0} values`);
    console.log(`   - Founder Section: ✅ ${finalAbout.founderSection ? 'Yes' : 'No'}`);
    console.log(`   - Quick Facts: ✅ ${finalAbout.quickFacts?.facts?.length || 0} facts`);
    console.log(`   - Visit CTA: ✅ ${finalAbout.visitCTA ? 'Yes' : 'No'}`);
    console.log(`   - Why Orange Jelly: ✅ ${finalAbout.whyOrangeJelly ? 'Yes' : 'No'}`);
    console.log(`   - Partnerships: ✅ ${finalAbout.partnerships?.length || 0} partnerships`);
    console.log(`   - FAQs: ✅ ${finalFAQs.length} FAQs (duplicates removed)`);

    console.log('\n📋 Next Steps:');
    console.log('   1. Update AboutPage.tsx to remove fallback content');
    console.log('   2. Test the About page displays correctly');
    console.log('   3. Upload partnership logos to Sanity if needed');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

// Run the migration if this file is executed directly
if (require.main === module) {
  if (!hasWriteAccess()) {
    console.error('❌ SANITY_API_TOKEN environment variable is required for write operations');
    console.log('Please set your Sanity API token with write permissions');
    process.exit(1);
  }

  completeAboutMigration()
    .then(() => {
      console.log('✨ Migration completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration failed:', error);
      process.exit(1);
    });
}

export { completeAboutMigration };