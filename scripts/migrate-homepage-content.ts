import { createClient } from '@sanity/client';
import { homepageFAQs, homeProblems, homeFeatures, homeMetrics } from '../src/lib/content/home-content';
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

async function migrateHomepageFAQs() {
  console.log('Migrating homepage FAQs...');
  
  for (let i = 0; i < homepageFAQs.length; i++) {
    const faq = homepageFAQs[i];
    const faqDoc = {
      _type: 'faq',
      question: faq.question,
      answer: [
        {
          _type: 'block',
          _key: `block-${i}`,
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: `span-${i}`,
              text: faq.answer,
              marks: [],
            },
          ],
          markDefs: [],
        },
      ],
      page: 'home',
      category: 'general',
      order: i + 1,
      isVoiceOptimized: false,
    };

    try {
      const result = await client.create(faqDoc);
      console.log(`✓ FAQ migrated: ${faq.question.substring(0, 50)}... (${result._id})`);
    } catch (error) {
      console.error(`✗ Error migrating FAQ:`, error);
    }
  }
}

async function migrateHomepageProblems() {
  console.log('\nMigrating homepage problem cards...');
  
  const problemsBlock = {
    _type: 'contentBlock',
    name: 'Homepage Problems',
    identifier: { _type: 'slug', current: 'homepage-problems' },
    type: 'problems',
    content: {
      title: 'Sound Familiar?',
      subtitle: 'Every struggling pub faces the same problems. Here\'s what we fixed at The Anchor:',
      items: homeProblems.map((problem, i) => ({
        _key: `problem-${i}`,
        title: problem.title,
        description: problem.description,
        icon: problem.icon,
        highlight: problem.highlight || false,
      })),
    },
    metadata: {
      page: 'home',
      section: 'problems',
      order: 1,
    },
  };

  try {
    const result = await client.create(problemsBlock);
    console.log(`✓ Problems block migrated: ${result._id}`);
  } catch (error) {
    console.error(`✗ Error migrating problems block:`, error);
  }
}

async function migrateHomepageFeatures() {
  console.log('\nMigrating homepage features...');
  
  const featuresBlock = {
    _type: 'contentBlock',
    name: 'Homepage Features',
    identifier: { _type: 'slug', current: 'homepage-features' },
    type: 'features',
    content: {
      title: 'Fill Your Pub Without The Stress',
      subtitle: 'I\'ve proven these strategies work at The Anchor. Now let me help you implement them.',
      items: homeFeatures.map((feature, i) => ({
        _key: `feature-${i}`,
        title: feature.title,
        description: feature.description,
        icon: feature.icon,
      })),
    },
    metadata: {
      page: 'home',
      section: 'features',
      order: 2,
    },
  };

  try {
    const result = await client.create(featuresBlock);
    console.log(`✓ Features block migrated: ${result._id}`);
  } catch (error) {
    console.error(`✗ Error migrating features block:`, error);
  }
}

async function migrateHomepageMetrics() {
  console.log('\nMigrating homepage metrics...');
  
  const metricsBlock = {
    _type: 'contentBlock',
    name: 'Homepage Metrics',
    identifier: { _type: 'slug', current: 'homepage-metrics' },
    type: 'metrics',
    content: {
      title: 'Real Results at The Anchor',
      subtitle: 'No theory. No fluff. Just proven strategies that work.',
      items: [
        {
          _key: 'metric-1',
          title: homeMetrics.quizNight,
          description: homeMetrics.quizNightContext,
          icon: '🎯',
        },
        {
          _key: 'metric-2',
          title: homeMetrics.foodGP,
          description: homeMetrics.foodGPContext,
          icon: '📈',
        },
        {
          _key: 'metric-3',
          title: homeMetrics.socialViews,
          description: homeMetrics.socialViewsContext,
          icon: '👀',
        },
        {
          _key: 'metric-4',
          title: homeMetrics.hoursSaved,
          description: homeMetrics.hoursSavedContext,
          icon: '⏰',
        },
      ],
    },
    metadata: {
      page: 'home',
      section: 'metrics',
      order: 3,
    },
  };

  try {
    const result = await client.create(metricsBlock);
    console.log(`✓ Metrics block migrated: ${result._id}`);
  } catch (error) {
    console.error(`✗ Error migrating metrics block:`, error);
  }
}

async function main() {
  console.log('Starting homepage content migration...\n');
  
  try {
    await migrateHomepageFAQs();
    await migrateHomepageProblems();
    await migrateHomepageFeatures();
    await migrateHomepageMetrics();
    
    console.log('\n✓ Homepage content migration complete!');
  } catch (error) {
    console.error('\n✗ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
main();