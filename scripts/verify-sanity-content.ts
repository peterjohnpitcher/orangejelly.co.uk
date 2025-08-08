import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function verifyContent() {
  console.log('🔍 Verifying Sanity Content Migration Status\n');
  console.log('========================================\n');

  const results = {
    homepage: { found: false, items: 0 },
    services: { found: false, items: 0 },
    landingPages: { found: false, items: 0 },
    navigation: { found: false, items: 0 },
    footer: { found: false, items: 0 },
    cta: { found: false, items: 0 },
    relatedLinks: { found: false, items: 0 },
    faqs: { found: false, items: 0 },
    contentBlocks: { found: false, items: 0 }
  };

  try {
    // Check Homepage Content
    const homepage = await client.fetch('*[_type == "homepageContent"][0]');
    if (homepage) {
      results.homepage.found = true;
      results.homepage.items = 1;
      console.log('✅ Homepage Content:');
      console.log(`   - Hero: ${homepage.hero ? '✓' : '✗'}`);
      console.log(`   - Problems: ${homepage.problems?.length || 0} items`);
      console.log(`   - Features: ${homepage.features?.length || 0} items`);
      console.log(`   - Metrics: ${homepage.metrics ? '✓' : '✗'}`);
    } else {
      console.log('❌ Homepage Content: Not found');
    }

    // Check Services
    const services = await client.fetch('*[_type == "serviceDetail"]');
    results.services.found = services.length > 0;
    results.services.items = services.length;
    console.log(`\n✅ Services: ${services.length} services found`);
    
    // Check Landing Pages
    const landingPages = await client.fetch('*[_type == "landingPage"]');
    results.landingPages.found = landingPages.length > 0;
    results.landingPages.items = landingPages.length;
    console.log(`✅ Landing Pages: ${landingPages.length} pages found`);

    // Check Navigation
    const navigation = await client.fetch('*[_type == "navigation"][0]');
    results.navigation.found = !!navigation;
    results.navigation.items = navigation?.mainMenu?.length || 0;
    console.log(`✅ Navigation: ${navigation ? 'Found' : 'Not found'} with ${results.navigation.items} menu items`);

    // Check Footer
    const footer = await client.fetch('*[_type == "footerContent"][0]');
    results.footer.found = !!footer;
    results.footer.items = footer?.linkSections?.length || 0;
    console.log(`✅ Footer: ${footer ? 'Found' : 'Not found'} with ${results.footer.items} link sections`);

    // Check CTAs
    const ctas = await client.fetch('*[_type == "ctaMessage"]');
    results.cta.found = ctas.length > 0;
    results.cta.items = ctas.length;
    console.log(`✅ CTA Messages: ${ctas.length} CTAs found`);

    // Check Related Links
    const relatedLinks = await client.fetch('*[_type == "relatedLinks"]');
    results.relatedLinks.found = relatedLinks.length > 0;
    results.relatedLinks.items = relatedLinks.length;
    console.log(`✅ Related Links: ${relatedLinks.length} link clusters found`);

    // Check FAQs
    const faqs = await client.fetch('*[_type == "faq"]');
    results.faqs.found = faqs.length > 0;
    results.faqs.items = faqs.length;
    console.log(`✅ FAQs: ${faqs.length} FAQs found`);

    // Check Content Blocks
    const contentBlocks = await client.fetch('*[_type == "contentBlock"]');
    results.contentBlocks.found = contentBlocks.length > 0;
    results.contentBlocks.items = contentBlocks.length;
    console.log(`✅ Content Blocks: ${contentBlocks.length} blocks found`);

    // Summary
    console.log('\n========================================');
    console.log('📊 MIGRATION SUMMARY\n');

    const totalTypes = Object.keys(results).length;
    const migratedTypes = Object.values(results).filter(r => r.found).length;
    const totalDocuments = Object.values(results).reduce((sum, r) => sum + r.items, 0);

    console.log(`Content Types Migrated: ${migratedTypes}/${totalTypes}`);
    console.log(`Total Documents: ${totalDocuments}`);
    
    console.log('\n📈 Migration Progress:');
    const progressBar = '█'.repeat(Math.floor((migratedTypes / totalTypes) * 20));
    const emptyBar = '░'.repeat(20 - progressBar.length);
    console.log(`[${progressBar}${emptyBar}] ${Math.round((migratedTypes / totalTypes) * 100)}%`);

    console.log('\n✅ Successfully Migrated:');
    Object.entries(results).forEach(([key, value]) => {
      if (value.found) {
        console.log(`   - ${key}: ${value.items} items`);
      }
    });

    if (migratedTypes < totalTypes) {
      console.log('\n❌ Still Need Migration:');
      Object.entries(results).forEach(([key, value]) => {
        if (!value.found) {
          console.log(`   - ${key}`);
        }
      });
    }

    console.log('\n========================================');
    console.log('🎯 NEXT STEPS:\n');
    console.log('1. Remove fallback patterns from components');
    console.log('2. Update components to fetch from Sanity');
    console.log('3. Delete hardcoded content files');
    console.log('4. Test all pages thoroughly');

  } catch (error) {
    console.error('Error verifying content:', error);
  }
}

// Run verification
verifyContent();