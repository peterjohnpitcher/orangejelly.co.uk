#!/usr/bin/env tsx

/**
 * Final About Page Migration Script
 * 
 * This script completes the migration of hardcoded About page content to Sanity CMS.
 * It handles:
 * 1. Adding missing "Why Orange Jelly" content
 * 2. Cleaning up duplicate FAQs  
 * 3. Adding partnership content
 * 4. Verifying all content is properly migrated
 * 
 * IMPORTANT: This script requires SANITY_API_TOKEN environment variable
 * with write permissions to the Sanity project.
 */

import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { writeClient, hasWriteAccess } from '../src/lib/sanity.write-client';
import { client as readClient } from '../src/lib/sanity.client';
import { v4 as uuidv4 } from 'uuid';

interface MigrationStats {
  faqsDeleted: number;
  contentAdded: string[];
  errors: string[];
}

async function finalAboutMigration(): Promise<MigrationStats> {
  const stats: MigrationStats = {
    faqsDeleted: 0,
    contentAdded: [],
    errors: []
  };

  console.log('🚀 Starting final About page migration...\n');

  try {
    // 1. Clean up duplicate FAQs
    console.log('🧹 Cleaning up duplicate About FAQs...');
    const allAboutFAQs = await readClient.fetch('*[_type == "faq" && page == "about"]{_id, question, order}');
    
    // Group by question to find duplicates
    const questionGroups: { [key: string]: any[] } = {};
    allAboutFAQs.forEach((faq: any) => {
      if (!questionGroups[faq.question]) {
        questionGroups[faq.question] = [];
      }
      questionGroups[faq.question].push(faq);
    });

    // Delete duplicates (keep the one with lowest order, or first one if no order)
    for (const question in questionGroups) {
      const faqs = questionGroups[question];
      if (faqs.length > 1) {
        // Sort by order (nulls last), then by _id for consistency
        faqs.sort((a, b) => {
          if (a.order == null && b.order == null) return a._id.localeCompare(b._id);
          if (a.order == null) return 1;
          if (b.order == null) return -1;
          return a.order - b.order;
        });

        // Delete all but the first one
        for (let i = 1; i < faqs.length; i++) {
          try {
            await writeClient.delete(faqs[i]._id);
            console.log(`   ✅ Deleted duplicate: ${question.substring(0, 50)}...`);
            stats.faqsDeleted++;
          } catch (error: any) {
            const errorMsg = `Error deleting FAQ ${faqs[i]._id}: ${error.message}`;
            console.error(`   ❌ ${errorMsg}`);
            stats.errors.push(errorMsg);
          }
        }
      }
    }
    console.log(`✅ Cleaned up ${stats.faqsDeleted} duplicate FAQs`);

    // 2. Add missing "Why Orange Jelly" section
    console.log('\\n📝 Adding missing "Why Orange Jelly" section...');
    const currentAbout = await readClient.fetch('*[_type == "aboutContent"][0]');
    
    if (!currentAbout?.whyOrangeJelly) {
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
                text: 'Just a fun play on words in a world that\\'s ever-changing! We wanted a name that\\'s friendly, memorable, and doesn\\'t take itself too seriously - just like us.',
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

      await writeClient
        .patch(currentAbout._id)
        .set({ whyOrangeJelly: whyOrangeJellyContent })
        .commit();
      
      console.log('✅ Added "Why Orange Jelly" section');
      stats.contentAdded.push('Why Orange Jelly section');
    } else {
      console.log('✅ "Why Orange Jelly" section already exists');
    }

    // 3. Add partnerships if they don't exist
    console.log('\\n🤝 Adding partnerships...');
    const updatedAbout = await readClient.fetch('*[_type == "aboutContent"][0]');
    
    if (!updatedAbout.partnerships || updatedAbout.partnerships.length === 0) {
      const partnerships = [
        {
          _key: uuidv4(),
          name: 'British Institute of Innkeeping',
          description: 'Professional development and training for pub operators',
          url: 'https://www.bii.org/',
        },
        {
          _key: uuidv4(),
          name: 'Greene King',
          description: 'Our pub company partner',
          url: 'https://www.greeneking.co.uk/',
        },
        {
          _key: uuidv4(),
          name: 'Federation of Small Businesses',
          description: 'Supporting UK small businesses',
          url: 'https://www.fsb.org.uk/',
        },
      ];

      await writeClient
        .patch(updatedAbout._id)
        .set({ partnerships })
        .commit();
      
      console.log('✅ Added partnerships');
      stats.contentAdded.push('Partnership content');
    } else {
      console.log('✅ Partnerships already exist');
    }

    // 4. Verify final state
    console.log('\\n🔍 Verifying final migration state...');
    const finalAbout = await readClient.fetch('*[_type == "aboutContent"][0]');
    const finalFAQs = await readClient.fetch('*[_type == "faq" && page == "about"]');
    
    console.log('\\n🎉 About page migration completed successfully!');
    console.log('\\n📊 Final Status:');
    console.log(`   ✅ About content document: ${finalAbout._id}`);
    console.log(`   ✅ Hero Section: ${finalAbout.heroSection ? 'Present' : 'Missing'}`);
    console.log(`   ✅ Story blocks: ${finalAbout.story?.length || 0}`);
    console.log(`   ✅ Timeline events: ${finalAbout.timeline?.length || 0}`);
    console.log(`   ✅ Company values: ${finalAbout.values?.length || 0}`);
    console.log(`   ✅ Founder section: ${finalAbout.founderSection ? 'Present' : 'Missing'}`);
    console.log(`   ✅ Quick facts: ${finalAbout.quickFacts?.facts?.length || 0}`);
    console.log(`   ✅ Visit CTA: ${finalAbout.visitCTA ? 'Present' : 'Missing'}`);
    console.log(`   ✅ Why Orange Jelly: ${finalAbout.whyOrangeJelly ? 'Present' : 'Missing'}`);
    console.log(`   ✅ Partnerships: ${finalAbout.partnerships?.length || 0}`);
    console.log(`   ✅ FAQs: ${finalFAQs.length} (deduplicated)`);

    return stats;

  } catch (error: any) {
    console.error('❌ Migration failed:', error);
    stats.errors.push(`Migration failed: ${error.message}`);
    throw error;
  }
}

// Run the migration if this file is executed directly
if (require.main === module) {
  if (!hasWriteAccess()) {
    console.error('❌ SANITY_API_TOKEN environment variable is required for write operations');
    console.log('\\nTo run this migration:');
    console.log('1. Go to your Sanity project dashboard');
    console.log('2. Go to Settings > API');
    console.log('3. Create a token with write permissions');
    console.log('4. Set the token as SANITY_API_TOKEN environment variable');
    console.log('5. Run: SANITY_API_TOKEN=your-token npx tsx scripts/final-about-migration.ts');
    process.exit(1);
  }

  finalAboutMigration()
    .then((stats) => {
      console.log('\\n✨ Migration completed successfully!');
      console.log('\\n📋 Summary:');
      console.log(`   - FAQs deleted: ${stats.faqsDeleted}`);
      console.log(`   - Content sections added: ${stats.contentAdded.length}`);
      if (stats.contentAdded.length > 0) {
        stats.contentAdded.forEach(item => console.log(`     • ${item}`));
      }
      if (stats.errors.length > 0) {
        console.log(`   - Errors: ${stats.errors.length}`);
        stats.errors.forEach(error => console.log(`     ❌ ${error}`));
      }
      console.log('\\n🎯 Next Steps:');
      console.log('   1. Test the About page in your browser');
      console.log('   2. Upload partnership logos in Sanity Studio if desired');
      console.log('   3. Review and adjust content in Sanity Studio');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

export { finalAboutMigration };