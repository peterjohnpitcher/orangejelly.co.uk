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

async function migrateHomepageContent() {
  console.log('🚀 Starting homepage content migration...\n');

  const homepageContent = {
    _type: 'homepageContent',
    _id: 'homepage-main', // Fixed ID for singleton
    title: 'Orange Jelly Homepage',
    hero: {
      title: 'Your Pub is Struggling.\nWe Know How to Fix It.',
      subtitle: 'AI-powered marketing strategies from real licensees who turned their pubs around',
      ctaText: 'See What Works',
      bottomText: '📍 We run The Anchor in Stanwell Moor - come see the results yourself!'
    },
    problems: [
      {
        _key: 'problem-1',
        emoji: '😰',
        title: 'Empty Tuesday Nights',
        description: "That sinking feeling when you're fully staffed but only serving 5 tables",
        linkHref: 'empty-pub-recovery'
      },
      {
        _key: 'problem-2',
        emoji: '📱',
        title: 'No Time for Marketing',
        description: "You know you should post on Facebook, but you're pulling pints until midnight",
        linkHref: 'done-for-you-marketing'
      },
      {
        _key: 'problem-3',
        emoji: '💸',
        title: 'Food Waste Killing Profits',
        description: 'Throwing away £200 of prep because the weather changed',
        linkHref: 'boost-food-sales'
      },
      {
        _key: 'problem-4',
        emoji: '🏪',
        title: 'Empty Pub Recovery',
        description: 'Fill quiet nights in 30 days',
        linkHref: 'empty-pub-recovery'
      },
      {
        _key: 'problem-5',
        emoji: '🍽️',
        title: 'Boost Food Sales',
        description: 'Improve GP & reduce waste',
        linkHref: 'boost-food-sales'
      },
      {
        _key: 'problem-6',
        emoji: '🎓',
        title: 'AI Training',
        description: 'Learn to automate yourself',
        linkHref: 'training'
      }
    ],
    features: [
      {
        _key: 'feature-1',
        icon: '🎯',
        title: 'Proven at The Anchor',
        description: 'Every strategy tested in our own pub first'
      },
      {
        _key: 'feature-2',
        icon: '⚡',
        title: 'Quick Results',
        description: 'See improvements within 14 days'
      },
      {
        _key: 'feature-3',
        icon: '💷',
        title: 'Honest Pricing',
        description: '£62.50/hour plus VAT - no hidden fees'
      },
      {
        _key: 'feature-4',
        icon: '🤝',
        title: 'Licensee to Licensee',
        description: 'Real advice from someone who gets it'
      }
    ],
    metrics: {
      quizNight: '25-35 regulars',
      quizNightContext: 'Up from 20 people',
      foodGP: '71%',
      foodGPContext: 'Up from 58%',
      socialViews: '60-70k',
      socialViewsContext: 'Monthly views',
      hoursSaved: '25 hours',
      hoursSavedContext: 'Saved weekly with AI'
    },
    seo: {
      title: 'How to Fill Empty Pub Tables | Pub Marketing That Works | Orange Jelly',
      description: 'Struggling with empty pub tables? AI-powered marketing from a real licensee who turned The Anchor around. Save 5+ hours weekly. £62.50/hour plus VAT.',
      keywords: ['pub marketing UK', 'fill empty pub tables', 'pub marketing strategies', 'increase pub customers', 'pub social media marketing', 'pub turnaround', 'empty pub solutions']
    }
  };

  try {
    // Check if document exists
    const existing = await client.fetch('*[_type == "homepageContent" && _id == $id][0]', { id: 'homepage-main' });
    
    let result;
    if (existing) {
      console.log('📝 Updating existing homepage content...');
      result = await client
        .patch('homepage-main')
        .set(homepageContent)
        .commit();
    } else {
      console.log('✨ Creating new homepage content...');
      result = await client.create(homepageContent);
    }
    
    console.log('✅ Homepage content migrated successfully!');
    console.log(`   Document ID: ${result._id}`);
    console.log(`   Hero title: ${result.hero.title.substring(0, 30)}...`);
    console.log(`   Problems: ${homepageContent.problems.length} items`);
    console.log(`   Features: ${homepageContent.features.length} items`);
    
  } catch (error) {
    console.error('❌ Error migrating homepage content:', error);
    throw error;
  }
}

// Additional content sections to migrate
async function migrateHomepageSections() {
  console.log('\n🎯 Migrating additional homepage sections...\n');

  const sections = [
    {
      _type: 'contentBlock',
      _id: 'homepage-results-section',
      name: 'Real Results from The Anchor',
      identifier: { _type: 'slug', current: 'homepage-results' },
      type: 'testimonial',
      content: {
        title: 'Real Results from The Anchor',
        subtitle: 'Featured in BII\'s Autumn 2025 magazine for AI innovation. From quiz nights to tasting events - see how we turned our pub around.',
        testimonial: "We've added £75,000-£100,000 of value to our business using AI. Our food GP improved from 58% to 71%. Every strategy we share has been proven in our own pub.",
        ctaText: 'See More Pub Turnarounds',
        ctaLink: '/results'
      }
    },
    {
      _type: 'contentBlock',
      _id: 'homepage-about-preview',
      name: 'We\'re licensees, Just Like You',
      identifier: { _type: 'slug', current: 'homepage-about' },
      type: 'about',
      content: {
        title: 'We\'re licensees, Just Like You',
        paragraph1: 'I\'m Peter. My husband Billy and I have run The Anchor in Stanwell Moor since March 2019. We faced the same struggles - empty tables, rising costs, fierce competition.',
        paragraph2: 'Orange Jelly exists because we discovered how AI can add 25 hours of value per week. I\'ve been an early AI adopter since 2021, and now I help other pubs implement the same strategies that transformed our business.',
        ctaText: 'Read Our Full Story',
        ctaLink: '/about'
      }
    },
    {
      _type: 'contentBlock',
      _id: 'homepage-roi-section',
      name: 'ROI Calculator Section',
      identifier: { _type: 'slug', current: 'homepage-roi' },
      type: 'calculator',
      content: {
        title: 'Calculate Your Potential Revenue',
        subtitle: 'Every pub is different. See exactly how much more revenue you could generate with proven strategies.',
        relatedTitle: 'Ready to Increase Your Revenue?',
        relatedSubtitle: 'Choose the solution that fits your budget and timeline'
      }
    },
    {
      _type: 'contentBlock',
      _id: 'homepage-banner',
      name: 'Stop Struggling Banner',
      identifier: { _type: 'slug', current: 'homepage-banner' },
      type: 'banner',
      content: {
        title: 'Stop Struggling. Start Thriving.',
        subtitle: 'Tell me what\'s killing your business. I\'ll share exactly how we fixed the same problems at The Anchor. Real solutions, no fluff.',
        ctaText: 'Get Marketing Help'
      }
    }
  ];

  for (const section of sections) {
    try {
      const existing = await client.fetch('*[_type == "contentBlock" && _id == $id][0]', { id: section._id });
      
      let result;
      if (existing) {
        console.log(`📝 Updating: ${section.name}`);
        result = await client
          .patch(section._id)
          .set(section)
          .commit();
      } else {
        console.log(`✨ Creating: ${section.name}`);
        result = await client.create(section);
      }
      
      console.log(`   ✅ ${section.name} migrated`);
    } catch (error) {
      console.error(`   ❌ Error migrating ${section.name}:`, error);
    }
  }
}

// Main execution
async function main() {
  console.log('========================================');
  console.log('  HOMEPAGE CONTENT MIGRATION TO SANITY');
  console.log('========================================\n');
  
  try {
    await migrateHomepageContent();
    await migrateHomepageSections();
    
    console.log('\n========================================');
    console.log('  ✅ MIGRATION COMPLETED SUCCESSFULLY');
    console.log('========================================');
    console.log('\nNext steps:');
    console.log('1. Check content in Sanity Studio: https://orangejelly.sanity.studio/');
    console.log('2. Update HomePage component to use Sanity data');
    console.log('3. Remove hardcoded content from components');
    console.log('4. Test the homepage displays correctly');
    
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run the migration
main();