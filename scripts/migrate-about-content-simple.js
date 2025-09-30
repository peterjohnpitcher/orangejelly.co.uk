const { createClient } = require('@sanity/client');
const { v4: uuidv4 } = require('uuid');

// Read environment variables
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Hardcoded About page content from AboutPage.tsx that needs to be migrated
const aboutContentData = {
  _type: 'aboutContent',
  _id: 'about-main',
  title: 'About Orange Jelly',
  heroSection: {
    title: 'From One Licensee to Another',
    subtitle: 'We run The Anchor in Stanwell Moor. We discovered how AI saves 25 hours a week. Now we help other licensees do the same.',
  },
  story: [
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: uuidv4(),
          text: 'I\'m Peter. My husband Billy and I have run The Anchor in Stanwell Moor since March 2019. Like you, we\'ve faced empty tables, rising costs, and 70-hour weeks wondering if it\'s all worth it.',
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
          text: 'Everything changed when I discovered how AI could transform pub operations. As an early adopter since 2021, I\'ve tested everything - the failures taught me what to avoid, the successes showed me what to share.',
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
          text: 'Today, our quiz nights attract 25-35 regulars, our food GP improved from 58% to 71%, and we actually have evenings off. Orange Jelly exists to help you achieve the same transformation.',
          marks: [],
        },
      ],
    },
  ],
  timeline: [
    {
      _key: uuidv4(),
      date: 'March 2019',
      title: 'The Beginning',
      description: 'Took over The Anchor. Empty tables, no strategy, pure hope.',
      highlight: false,
    },
    {
      _key: uuidv4(),
      date: '2021',
      title: 'AI Discovery',
      description: 'Discovered AI tools. Started testing, failing, learning.',
      highlight: false,
    },
    {
      _key: uuidv4(),
      date: 'Jan-Feb 2024',
      title: 'The Transformation',
      description: 'Six brutal weeks forced full AI adoption. GP hit 71%.',
      highlight: true,
    },
    {
      _key: uuidv4(),
      date: 'Today',
      title: 'Helping Others',
      description: 'Helping licensees save 5+ hours weekly with proven tools.',
      highlight: false,
    },
  ],
  values: [
    {
      _key: uuidv4(),
      icon: '🎯',
      title: 'Real Experience',
      description: 'We run an actual pub. Every strategy has been tested at The Anchor first.',
    },
    {
      _key: uuidv4(),
      icon: '💰',
      title: 'Honest Pricing',
      description: '£75 per hour plus VAT. No packages, no hidden fees, no surprises.',
    },
    {
      _key: uuidv4(),
      icon: '🛡️',
      title: 'Guaranteed Results',
      description: '30-day action plan with weekly support because we believe in what we do.',
    },
    {
      _key: uuidv4(),
      icon: '🤝',
      title: 'Personal Service',
      description: 'Just me, no sales team. You get direct access to someone who understands.',
    },
  ],
  founderSection: {
    name: 'Meet Peter Pitcher',
    role: 'Founder & Pub Owner',
    bio: [
      {
        _type: 'block',
        _key: uuidv4(),
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: 'I\'m not your typical consultant. By day, I\'m an AI Marketing Capabilities Lead for a global food manufacturer. By night and weekends, I\'m pulling pints at The Anchor.',
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
            text: 'My curiosity for technology made me an early AI adopter in 2021. When I saw how it could save hours on pub admin, I had to share it with other licensees struggling like we were.',
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
            text: 'Now I help pubs across the UK implement the same AI strategies that transformed our business. No theory, no fluff - just practical tools that work in real pub life.',
            marks: [],
          },
        ],
      },
    ],
  },
  quickFacts: {
    title: 'Quick Facts',
    facts: [
      'Pub owners since March 2019',
      'AI early adopter since 2021',
      'Full-time job + pub + Orange Jelly',
      'Featured in BII magazine',
      'Greene King tenants',
      '£75/hour - no packages',
      '30-day action plan with weekly support'
    ],
  },
  visitCTA: {
    title: 'Come See The Results Yourself',
    subtitle: 'Visit The Anchor and see how we use AI in real pub operations. First pint\'s on me if you mention Orange Jelly.',
    locationName: 'The Anchor',
    address: 'Horton Road, Stanwell Moor\nStaines TW19 6AQ',
    mapUrl: 'https://maps.google.com/?q=The+Anchor+Stanwell+Moor',
    ctaText: 'Get Directions →',
  },
};

// About FAQs from the hardcoded defaultAboutFAQs
const aboutFAQs = [
  {
    _type: 'faq',
    _id: `about-faq-${uuidv4()}`,
    question: 'Who is Peter Pitcher and why should I trust Orange Jelly?',
    answer: [
      {
        _type: 'block',
        _key: uuidv4(),
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: 'I\'m Peter Pitcher, and I\'ve run The Anchor pub in Stanwell Moor with my husband Billy since March 2019. I also work full-time as an AI Marketing Capabilities Lead for a global food manufacturer. I\'ve been an early AI adopter since 2021 and discovered how AI can add 25 hours of value per week. Orange Jelly exists to share these proven strategies with fellow licensees.',
            marks: [],
          },
        ],
      },
    ],
    category: 'general',
    page: 'about',
    order: 1,
    isVoiceOptimized: true,
  },
  {
    _type: 'faq',
    _id: `about-faq-${uuidv4()}`,
    question: 'What makes Orange Jelly different from other consultants?',
    answer: [
      {
        _type: 'block',
        _key: uuidv4(),
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: 'We\'re not consultants who\'ve never pulled a pint. We run an actual pub and test every strategy in our own business first. No corporate nonsense, no jargon - just one licensee helping another with tools that actually work. Plus, we guarantee results or your money back.',
            marks: [],
          },
        ],
      },
    ],
    category: 'general',
    page: 'about',
    order: 2,
    isVoiceOptimized: true,
  },
  {
    _type: 'faq',
    _id: `about-faq-${uuidv4()}`,
    question: 'Is Orange Jelly a big company?',
    answer: [
      {
        _type: 'block',
        _key: uuidv4(),
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: 'No, Orange Jelly started in 2016 with Laura Willis as a digital agency, then pivoted in 2019. Now it\'s just me (Peter) working around my full-time job, running The Anchor, and family life. No big office, no sales team. This means you get personal service, honest advice, and someone who genuinely understands your challenges because I face them too.',
            marks: [],
          },
        ],
      },
    ],
    category: 'general',
    page: 'about',
    order: 3,
    isVoiceOptimized: false,
  },
  {
    _type: 'faq',
    _id: `about-faq-${uuidv4()}`,
    question: 'Why is it called Orange Jelly?',
    answer: [
      {
        _type: 'block',
        _key: uuidv4(),
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: 'Just a fun play on words in a world that\'s ever-changing! We wanted a name that\'s friendly, memorable, and doesn\'t take itself too seriously - just like us. It reflects our approach: making complicated things simple and approachable.',
            marks: [],
          },
        ],
      },
    ],
    category: 'general',
    page: 'about',
    order: 4,
    isVoiceOptimized: false,
  },
  {
    _type: 'faq',
    _id: `about-faq-${uuidv4()}`,
    question: 'Can I visit The Anchor to see your strategies in action?',
    answer: [
      {
        _type: 'block',
        _key: uuidv4(),
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: 'Absolutely! We\'d love to show you around. Pop in for a pint and see how we use AI tools in real pub operations. First pint\'s on me if you mention Orange Jelly. We\'re at Horton Road, Stanwell Moor, Staines TW19 6AQ.',
            marks: [],
          },
        ],
      },
    ],
    category: 'general',
    page: 'about',
    order: 5,
    isVoiceOptimized: true,
  },
  {
    _type: 'faq',
    _id: `about-faq-${uuidv4()}`,
    question: 'How did you discover AI could help pubs?',
    answer: [
      {
        _type: 'block',
        _key: uuidv4(),
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: 'Through my curiosity for technology and being an early adopter. I started with ChatGPT in 2021 when it first launched. The early results were terrible, but as the models evolved, they became business-ready. Now AI helps me deliver 120-150 hours worth of equivalent work per week in my spare time.',
            marks: [],
          },
        ],
      },
    ],
    category: 'results',
    page: 'about',
    order: 6,
    isVoiceOptimized: true,
  },
  {
    _type: 'faq',
    _id: `about-faq-${uuidv4()}`,
    question: 'What results have you achieved at The Anchor?',
    answer: [
      {
        _type: 'block',
        _key: uuidv4(),
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: 'We\'ve improved food GP from 58% to 71%, grown quiz nights to 25-35 regulars, achieve 60,000-70,000 social media views monthly, and added £75,000-£100,000 of value to our business using AI. Most importantly - we got our evenings back. Every strategy we share has delivered real results in our own pub.',
            marks: [],
          },
        ],
      },
    ],
    category: 'results',
    page: 'about',
    order: 7,
    isVoiceOptimized: true,
  },
  {
    _type: 'faq',
    _id: `about-faq-${uuidv4()}`,
    question: 'Do you understand the challenges of running a small pub?',
    answer: [
      {
        _type: 'block',
        _key: uuidv4(),
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: 'Completely. We\'ve dealt with empty Monday nights, staff no-shows, supplier price hikes, TripAdvisor nightmares, and competing with Wetherspoons. That\'s why our solutions are practical, affordable, and designed for real pub life.',
            marks: [],
          },
        ],
      },
    ],
    category: 'general',
    page: 'about',
    order: 8,
    isVoiceOptimized: false,
  },
  {
    _type: 'faq',
    _id: `about-faq-${uuidv4()}`,
    question: 'Is Orange Jelly just about AI and technology?',
    answer: [
      {
        _type: 'block',
        _key: uuidv4(),
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: 'No, it\'s about giving you your life back. AI is just the tool - the real goal is helping you work less and earn more. Whether that\'s automating social media so you can have Sunday lunch with family, or creating menus that sell themselves so you\'re not stressing about GP.',
            marks: [],
          },
        ],
      },
    ],
    category: 'general',
    page: 'about',
    order: 9,
    isVoiceOptimized: true,
  },
  {
    _type: 'faq',
    _id: `about-faq-${uuidv4()}`,
    question: 'How can I be sure Orange Jelly will work for my pub?',
    answer: [
      {
        _type: 'block',
        _key: uuidv4(),
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: 'Every pub is different, but the challenges are similar. That\'s why we offer a free consultation to understand your specific situation, and a 30-day action plan with weekly support. We\'re so confident because these aren\'t theories - they\'re proven strategies from our own pub.',
            marks: [],
          },
        ],
      },
    ],
    category: 'service',
    page: 'about',
    order: 10,
    isVoiceOptimized: true,
  },
  {
    _type: 'faq',
    _id: `about-faq-${uuidv4()}`,
    question: 'What areas does Orange Jelly cover?',
    answer: [
      {
        _type: 'block',
        _key: uuidv4(),
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: 'For in-person training and consultations, we cover a 30-mile radius from Stanwell Moor (Surrey, Berkshire, West London). For online services like marketing and menu design, we help pubs across the UK. Technology means distance isn\'t a barrier.',
            marks: [],
          },
        ],
      },
    ],
    category: 'service',
    page: 'about',
    order: 11,
    isVoiceOptimized: false,
  },
  {
    _type: 'faq',
    _id: `about-faq-${uuidv4()}`,
    question: 'What\'s your promise to pub owners?',
    answer: [
      {
        _type: 'block',
        _key: uuidv4(),
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: 'To save you at least 5 hours per week on admin tasks, be honest about what AI can and can\'t do, only recommend tools we use ourselves, keep prices transparent and fair, and provide personal support when you need it. Plus our 30-day action plan with weekly support.',
            marks: [],
          },
        ],
      },
    ],
    category: 'service',
    page: 'about',
    order: 12,
    isVoiceOptimized: true,
  },
];

async function migrateAboutContent() {
  console.log('🚀 Starting About page content migration...');

  try {
    // 1. Create or update the main about content
    console.log('📝 Creating/updating about content document...');
    const aboutResult = await client.createOrReplace(aboutContentData);
    console.log(`✅ About content created/updated: ${aboutResult._id}`);

    // 2. Create all the About FAQs
    console.log('❓ Creating About FAQs...');
    let faqCount = 0;
    for (const faq of aboutFAQs) {
      try {
        const faqResult = await client.create(faq);
        console.log(`✅ FAQ created: ${faq.question.substring(0, 50)}...`);
        faqCount++;
      } catch (error) {
        if (error.statusCode === 409) {
          // Document already exists, skip
          console.log(`⏭️  FAQ already exists: ${faq.question.substring(0, 50)}...`);
        } else {
          console.error(`❌ Error creating FAQ: ${faq.question.substring(0, 50)}...`, error);
        }
      }
    }

    console.log(`\n🎉 Migration completed successfully!`);
    console.log(`📊 Summary:`);
    console.log(`   - About content: ✅ Created/Updated`);
    console.log(`   - FAQs created: ${faqCount} out of ${aboutFAQs.length}`);
    console.log(`\n📋 Next steps:`);
    console.log(`   1. Go to Sanity Studio and review the migrated content`);
    console.log(`   2. Upload the founder image if needed`);
    console.log(`   3. Test the About page to ensure content displays correctly`);
    console.log(`   4. Remove hardcoded fallbacks from AboutPage.tsx once confirmed working`);

  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

// Run the migration
migrateAboutContent()
  .then(() => {
    console.log('✨ Migration script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Migration script failed:', error);
    process.exit(1);
  });