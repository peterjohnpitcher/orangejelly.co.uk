#!/usr/bin/env npx tsx
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

if (!process.env.SANITY_API_TOKEN) {
  console.error('❌ SANITY_API_TOKEN is required in .env.local');
  console.log('Get your token from: https://www.sanity.io/manage/project/9brdfanc/api');
  process.exit(1);
}

const client = createClient({
  projectId: '9brdfanc',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function migrateHomepageContent() {
  console.log('🚀 Starting Homepage content migration to Sanity...\n');

  try {
    // Check if homepage content already exists
    const existingContent = await client.fetch(
      `*[_type == "homepageContent" && _id == "homepage-main"][0]`
    );

    if (existingContent) {
      console.log('⚠️ Homepage content already exists. Updating...');
    }

    const homepageData = {
      _id: 'homepage-main',
      _type: 'homepageContent',
      title: 'Homepage',
      
      // Hero Section
      hero: {
        title: 'Fill Your Pub with AI-Powered Marketing',
        subtitle: 'Stop struggling with empty tables. We turned The Anchor from failing to thriving using AI marketing strategies that actually work. From one licensee to another - let me show you how.',
        ctaText: 'See Our Solutions',
        bottomText: '£62.50 per hour plus VAT • No packages • Real results from real licensees'
      },

      // Problems Section
      problems: [
        {
          _key: 'problem_1',
          emoji: '🪑',
          title: 'Empty Tables',
          description: 'Transform quiet nights into busy venues',
          linkHref: 'empty-pub-recovery'
        },
        {
          _key: 'problem_2',
          emoji: '📱',
          title: 'Social Media Struggles',
          description: 'Build a following that actually visits',
          linkHref: 'social-media'
        },
        {
          _key: 'problem_3',
          emoji: '🎯',
          title: 'Marketing Confusion',
          description: 'Focus on what actually works',
          linkHref: 'marketing-strategy'
        },
        {
          _key: 'problem_4',
          emoji: '💷',
          title: 'Tight Budget',
          description: 'Affordable marketing that delivers ROI',
          linkHref: 'budget-marketing'
        },
        {
          _key: 'problem_5',
          emoji: '⏰',
          title: 'No Time',
          description: 'AI saves 25 hours per week',
          linkHref: 'ai-automation'
        },
        {
          _key: 'problem_6',
          emoji: '🎉',
          title: 'Event Planning',
          description: 'Pack your pub with must-attend events',
          linkHref: 'event-planning'
        }
      ],

      // Metrics Section
      metrics: {
        quizNight: '25-35 regulars',
        quizNightContext: 'Tuesday quiz (was 20)',
        foodGP: '71%',
        foodGPContext: 'Food GP (was 58%)',
        socialViews: '60-70k',
        socialViewsContext: 'Monthly social views',
        hoursSaved: '25 hours',
        hoursSavedContext: 'Saved weekly with AI'
      },

      // SEO Metadata
      seo: {
        title: 'How to Fill Empty Pub Tables | Pub Marketing That Works',
        description: 'Struggling with empty pub tables? We use AI-powered marketing strategies that transformed The Anchor from struggling to thriving. From one licensee to another. £62.50 per hour plus VAT.',
        keywords: [
          'pub marketing UK',
          'fill empty pub tables', 
          'pub marketing strategies',
          'increase pub customers',
          'pub social media marketing',
          'pub turnaround',
          'empty pub solutions'
        ]
      }
    };

    // Create or update the document
    const result = await client.createOrReplace(homepageData);
    console.log('✅ Homepage content migrated successfully!');
    console.log(`📄 Document ID: ${result._id}`);

    // Now create section headings as content blocks for the hardcoded headings
    const sectionHeadings = {
      _id: 'homepage-sections',
      _type: 'contentBlock',
      identifier: {
        _type: 'slug',
        current: 'homepage-sections'
      },
      name: 'Homepage Section Headings',
      page: 'home',
      content: {
        problemsHeading: "What's Killing Your Business?",
        solutionsHeading: 'Explore Solutions to Your Biggest Problems',
        resultsHeading: 'Real Results from The Anchor',
        resultsTestimonial: "We've added £75,000-£100,000 of value to our business using AI. Our food GP improved from 58% to 71%. Every strategy we share has been proven in our own pub.",
        resultsSubtext: "Featured in BII's Autumn 2025 magazine for AI innovation. From quiz nights to tasting events - see how we turned our pub around.",
        resultsButtonText: 'See More Pub Turnarounds',
        calculatorHeading: 'Calculate Your Potential Revenue',
        calculatorSubtext: 'Every pub is different. See exactly how much more revenue you could generate with proven strategies.',
        aboutHeading: "We're licensees, Just Like You",
        aboutText1: "I'm Peter. My husband Billy and I have run The Anchor in Stanwell Moor since March 2019. We faced the same struggles - empty tables, rising costs, fierce competition.",
        aboutText2: "Orange Jelly exists because we discovered how AI can add 25 hours of value per week. I've been an early AI adopter since 2021, and now I help other pubs implement the same strategies that transformed our business.",
        aboutButtonText: 'Read Our Full Story →',
        aboutCardText: 'Real pub experience + proven strategies = Orange Jelly',
        aboutCardLabel: 'Proven Daily At',
        ctaBannerHeading: 'Stop Struggling. Start Thriving.',
        ctaBannerText: "Tell me what's killing your business. I'll share exactly how we fixed the same problems at The Anchor. Real solutions, no fluff.",
        ctaBannerButton: 'Get Marketing Help',
        faqHeading: 'Frequently Asked Questions',
        finalCtaTitle: 'Ready to Turn Your Pub Around?',
        finalCtaSubtitle: "Let's talk about what's really hurting your business. I'll share the exact strategies that saved ours."
      }
    };

    const blockResult = await client.createOrReplace(sectionHeadings);
    console.log(`✅ Section headings block created: ${blockResult._id}`);

    console.log('\n🎉 Migration complete!');
    console.log('\n📝 Next steps:');
    console.log('1. Visit https://orangejelly.sanity.studio/');
    console.log('2. Navigate to Homepage Content');
    console.log('3. Review and adjust the content as needed');
    console.log('4. Update HomePage.tsx to use the section headings from Sanity');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run the migration
migrateHomepageContent();