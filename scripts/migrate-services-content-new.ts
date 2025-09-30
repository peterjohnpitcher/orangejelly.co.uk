#!/usr/bin/env tsx

/**
 * Migration script to transfer hardcoded services content to new Sanity schemas
 * 
 * This script:
 * 1. Creates the main services page content document
 * 2. Creates all 8 service package documents
 * 3. Creates all 27 FAQ documents
 * 
 * Run with: npx tsx scripts/migrate-services-content-new.ts
 */

import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { writeClient } from '../src/lib/sanity.write-client';

// Services page content data
const servicesPageContent = {
  _id: 'servicesPage',
  _type: 'servicesPage',
  title: 'Services Page Content',
  hero: {
    title: 'From Empty Tables to Full Tills',
    subtitle: 'Every service below has been tested at The Anchor. If it didn\'t work for us, it\'s not here.',
    ctaText: 'Help me fill my pub',
    bottomText: 'All services £75/hour • No packages • Pay for what you need'
  },
  introSection: {
    heading: 'Real Solutions, Not Theory',
    description: 'I\'m not selling you strategies I read in a book. Every service below is something I use daily at The Anchor. You\'re learning from real experience, not corporate theory.'
  },
  processSection: {
    heading: 'Simple, Honest Process',
    steps: [
      {
        stepNumber: 1,
        title: 'Tell Me What\'s Wrong',
        description: 'WhatsApp or call me. Explain what\'s keeping you up at night. Empty Tuesday? Weak food sales? No online presence? I\'ve been there.'
      },
      {
        stepNumber: 2,
        title: 'We Create a Plan',
        description: 'No cookie-cutter solutions. We\'ll discuss what\'s worked at The Anchor and adapt it to your pub. You\'ll know exactly what we\'re doing and why.'
      },
      {
        stepNumber: 3,
        title: 'I Show You How',
        description: 'Screen sharing, videos, or in-person - whatever works. I\'ll train you to use the exact AI tools and strategies that saved our pub.'
      },
      {
        stepNumber: 4,
        title: 'You See Results',
        description: 'Most pubs see improvements within 30 days. Quiz nights filling up, social media buzzing, food flying out the kitchen. Real results, not promises.'
      }
    ],
    ctaText: 'Let\'s fix my pub',
    ctaSubtext: '07511 114 500 • No obligation chat • I understand pub life'
  },
  guaranteeSection: {
    heading: '30-Day Action Plan Support',
    description: 'If you don\'t see real improvements within 30 days, I\'ll refund every penny. That\'s how confident I am these strategies work - because they saved my pub.',
    checkmarkText: 'No risk, all reward',
    checkmarkSubtext: 'The only thing you risk is staying stuck where you are'
  },
  faqSection: {
    heading: 'Everything You Need to Know'
  },
  ctaSection: {
    title: 'Stop Watching Money Walk Past Your Pub',
    subtitle: 'Every empty table is lost revenue. Every quiet night is bills unpaid. Let\'s change that - starting today.',
    buttonText: 'WhatsApp me now',
    whatsappMessage: 'Hi Peter, I saw your services page and need help with my pub',
    bottomText: '07511 114 500 • Available 7 days a week'
  },
  relatedLinksSection: {
    title: 'See How We Can Help',
    clusterId: 'services'
  },
  speakableContent: [
    {
      question: 'What services does Orange Jelly offer for struggling pubs?',
      answer: 'Orange Jelly offers practical help for pub licensees including social media management, menu optimization, event planning, and business analysis using AI tools. All services are £75 per hour plus VAT.'
    },
    {
      question: 'How much does Orange Jelly charge?',
      answer: 'We charge £75 per hour plus VAT as a flat rate. I\'m always happy to have a free chat first to understand your challenges. All pricing is transparent with no hidden fees.'
    },
    {
      question: 'Can Orange Jelly help my empty pub?',
      answer: 'Yes, our Empty Pub Recovery Package has transformed quiet nights into profitable ones. We\'ve grown quiz nights from 20 to 35 regulars and reach 70,000 people monthly on social media.'
    }
  ]
};

// Service packages data (all 8 services)
const servicePackages = [
  {
    _type: 'servicePackage',
    id: { _type: 'slug', current: 'empty-pub-recovery' },
    title: 'Empty Pub Recovery Package',
    emoji: '🚨',
    problem: 'Staring at empty tables on quiet nights?',
    deliverable: 'Effective marketing strategies delivered quickly',
    description: 'Turn those soul-crushing empty nights into profitable ones. This is our emergency response for pubs bleeding money on quiet nights. I\'ve been there - watching the clock, calculating losses, wondering if tomorrow will be better. It doesn\'t have to be this way.',
    features: [
      'AI-powered social media campaigns that actually bring people in',
      'Event ideas proven to work (not theory - real results)',
      'Local community engagement strategies',
      'Staff motivation techniques for quiet periods',
      'Quick-win promotions you can start tomorrow',
      '30-day action plan with weekly check-ins'
    ],
    example: {
      before: 'Deadly Tuesday nights with empty tables',
      after: 'Quiz nights with 25-35 regulars every week',
      result: 'Tuesday now one of our busiest nights'
    },
    timeEstimate: '15-25 hours over 30 days',
    priceBreakdown: 'Costs vary based on your needs. Most pubs invest £1,000-1,500 for complete transformation',
    price: '£75/hour + VAT',
    ctaText: 'Save my pub',
    highlight: true,
    order: 1,
    isActive: true
  },
  {
    _type: 'servicePackage',
    id: { _type: 'slug', current: 'menu-makeover' },
    title: 'Menu Makeover & Profit Maximization',
    emoji: '🍴',
    problem: 'Food sitting in the kitchen while bills pile up?',
    deliverable: 'AI-crafted menu descriptions that sell',
    description: 'Your menu is a sales tool, not just a list. Wrong descriptions = lost money. I\'ll show you how AI transforms boring food lists into profit machines that make mouths water and tills ring.',
    features: [
      'Psychology-based descriptions that increase average spend',
      'Strategic pricing for maximum profit',
      'Dietary labels and allergen management',
      'Seasonal menu planning with AI',
      'Waste reduction strategies (we save £250/week)',
      'Supplier negotiation tactics'
    ],
    example: {
      before: 'Food GP at 58%, struggling to make profit',
      after: 'Food GP at 71% with same suppliers',
      result: '£250/week extra profit from food alone'
    },
    timeEstimate: '8-12 hours initially, then 2 hours monthly',
    price: '£75/hour + VAT',
    ctaText: 'Boost food profits',
    order: 2,
    isActive: true
  },
  {
    _type: 'servicePackage',
    id: { _type: 'slug', current: 'social-media-mastery' },
    title: 'Social Media That Actually Works',
    emoji: '📱',
    problem: 'Posting into the void while competitors steal your customers?',
    deliverable: 'Reach thousands weekly in just 2 hours',
    description: 'Stop wasting hours on posts nobody sees. I reach 60,000-70,000 people monthly spending just 2 hours per week. I\'ll teach you the exact AI tools and strategies that transformed our empty pub into a community hub.',
    features: [
      'AI content creation that sounds human',
      'Scheduling tools that save hours',
      'Local engagement strategies that work',
      'Event promotion templates',
      'Crisis management protocols',
      'Monthly analytics that matter'
    ],
    example: {
      before: 'No social media presence, relying on walk-ins',
      after: '70,000 monthly views across platforms',
      result: 'Quiz night sells out, Sunday lunch bookings up 40%'
    },
    timeEstimate: '10 hours training, then 2 hours weekly ongoing',
    price: '£75/hour + VAT',
    ctaText: 'Get noticed online',
    order: 3,
    isActive: true
  },
  {
    _type: 'servicePackage',
    id: { _type: 'slug', current: 'quiz-night-success' },
    title: 'Quiz Night Success System',
    emoji: '🎯',
    problem: 'Running quizzes for empty chairs and family members?',
    deliverable: '25-35 weekly regulars within 2 months',
    description: 'Transform your quiet Tuesday into your busiest weeknight. Our quiz went from 20 people to 35 regulars who book tables, buy food, and bring friends. I\'ll share every trick, template, and AI tool that made it happen.',
    features: [
      'Question sources and AI generation tools',
      'Promotional templates that fill tables',
      'Prize structures that maximize profit',
      'Team booking systems',
      'Food deals that increase spend',
      'Building quiz night community'
    ],
    example: {
      before: 'Tuesday was our quietest night',
      after: 'Regular quiz with 25-35 attendees',
      result: 'Tuesday now our 3rd busiest night'
    },
    timeEstimate: '8-10 hours setup, 1 hour weekly support',
    price: '£75/hour + VAT',
    ctaText: 'Pack my quiz nights',
    order: 4,
    isActive: true
  },
  {
    _type: 'servicePackage',
    id: { _type: 'slug', current: 'business-analysis' },
    title: 'AI Business Analysis & Insights',
    emoji: '📊',
    problem: 'Making decisions on gut feel while money disappears?',
    deliverable: 'Know exactly where to focus for maximum profit',
    description: 'Stop guessing, start knowing. AI reveals hidden profit opportunities in your data. I found £75,000 of annual value in ours - imagine what\'s hiding in yours.',
    features: [
      'Sales pattern analysis and predictions',
      'Customer behavior insights',
      'Profitable vs problem areas identified',
      'Staff optimization recommendations',
      'Supplier cost comparisons',
      'Seasonal planning with data'
    ],
    example: {
      before: 'Sunday lunches losing £250/week',
      after: 'Streamlined menu, AI-optimized portions',
      result: 'Now profitable with less waste'
    },
    timeEstimate: '15-20 hours initial analysis',
    price: '£75/hour + VAT',
    ctaText: 'Find hidden profits',
    order: 5,
    isActive: true
  },
  {
    _type: 'servicePackage',
    id: { _type: 'slug', current: 'event-planning' },
    title: 'Events That Fill Your Pub',
    emoji: '🎉',
    problem: 'Organizing events that nobody attends?',
    deliverable: 'Events people mark in their diary',
    description: 'Stop throwing parties for empty rooms. Our events consistently draw crowds because we use AI to understand what people actually want, then promote effectively. 85% of our tasting night attendees become regulars.',
    features: [
      'Event ideas matched to your community',
      'AI-powered promotional campaigns',
      'Booking and ticketing systems',
      'Partnership opportunities',
      'Post-event analysis for improvement',
      'Seasonal event calendar planning'
    ],
    example: {
      before: 'Same old events, declining attendance',
      after: 'Gin tasting nights, food pairings, themed events',
      result: '40 tickets sold in 48 hours, 85% became regulars'
    },
    timeEstimate: '6-8 hours per event',
    price: '£75/hour + VAT',
    ctaText: 'Create buzzing events',
    order: 6,
    isActive: true
  },
  {
    _type: 'servicePackage',
    id: { _type: 'slug', current: 'consultation' },
    title: 'Pub Recovery Consultation',
    emoji: '💬',
    problem: 'Need specific help with your unique challenges?',
    deliverable: 'Practical solutions from someone who gets it',
    description: 'Sometimes you just need to talk to someone who\'s been there. Book time with me to discuss your specific challenges. No corporate nonsense - just honest advice from one licensee to another.',
    features: [
      'One-to-one video or phone consultations',
      'Review your current situation',
      'Identify quick wins and long-term strategies',
      'Access to my AI tools and templates',
      'Follow-up support via WhatsApp',
      'Connection to helpful suppliers'
    ],
    example: {
      before: 'Using Word docs and manual calculations',
      after: 'AI-powered tools for everything',
      result: 'Save 25 hours/week on admin tasks'
    },
    timeEstimate: 'Minimum 2 hours, typically 4-6 hours initially',
    price: '£75/hour + VAT',
    ctaText: 'Book consultation',
    order: 7,
    isActive: true
  },
  {
    _type: 'servicePackage',
    id: { _type: 'slug', current: 'website-presence' },
    title: 'Website & Online Presence',
    emoji: '🌐',
    problem: 'Invisible online while chains dominate Google?',
    deliverable: 'Found by locals searching for pubs',
    description: 'If you\'re not online, you don\'t exist to most customers. But you don\'t need an expensive website - you need to be found. I\'ll show you free and low-cost ways to dominate local search results.',
    features: [
      'Google My Business optimization',
      'Simple website solutions that work',
      'Online booking integration',
      'Menu and events always up-to-date',
      'Mobile-friendly design',
      'Local SEO strategies'
    ],
    example: {
      before: 'Invisible on Google, no website',
      after: 'Professional website, optimized Google listing',
      result: 'Top 3 for "pubs near Heathrow" - free customers daily'
    },
    timeEstimate: '10-15 hours setup',
    price: '£75/hour + VAT',
    ctaText: 'Get found online',
    order: 8,
    isActive: true
  }
];

// Services FAQs data (all 21 FAQs)
const servicesFAQs = [
  // Empty Pub Recovery FAQs
  {
    _type: 'servicesFAQ',
    question: 'How does the Empty Pub Recovery Package work?',
    answer: 'We work with you to implement AI-powered marketing strategies that have been proven at The Anchor. This includes training on social media automation, event promotion, and customer engagement. We charge £75 per hour plus VAT, and offer a 30-day action plan with weekly support.',
    category: 'recovery',
    order: 1,
    isActive: true
  },
  {
    _type: 'servicesFAQ',
    question: 'How does your hourly consulting work?',
    answer: 'We charge £75 per hour plus VAT as a flat rate. I\'ll work with you to implement the AI strategies that have transformed The Anchor - from social media automation to event planning. First training session with a pub chain scheduled September 2025.',
    category: 'recovery',
    order: 2,
    isActive: true
  },
  {
    _type: 'servicesFAQ',
    question: 'How quickly will I see more customers from the recovery package?',
    answer: 'Results vary by pub, but at The Anchor we\'ve seen quiz nights grow from 20 to 25-35 regulars, tasting nights with 85% retention, and 60,000-70,000 social media views monthly. Most improvements show within 30 days.',
    category: 'recovery',
    order: 3,
    isActive: true
  },
  // Menu Makeover FAQs
  {
    _type: 'servicesFAQ',
    question: 'How can menu descriptions increase my food sales?',
    answer: 'Psychology-based menu descriptions guide customers to order more profitable dishes and increase average spend by £7 per table. We use proven techniques like sensory language, storytelling, and strategic positioning that have increased food GP by up to 15% for our clients.',
    category: 'menu',
    order: 1,
    isActive: true
  },
  {
    _type: 'servicesFAQ',
    question: 'What exactly do you do with menu AI?',
    answer: 'I\'ll teach you to use AI for menu analysis, pricing optimization, and seasonal updates. I\'ve helped improve food GP from 58% to 71%, saving £250/week on waste.',
    category: 'menu',
    order: 2,
    isActive: true
  },
  {
    _type: 'servicesFAQ',
    question: 'Will AI-written menus sound fake or robotic?',
    answer: 'Not at all! I guide the AI to write in your pub\'s authentic voice. The descriptions feel personal and appetizing - customers often comment on how good our food sounds before they\'ve even tasted it.',
    category: 'menu',
    order: 3,
    isActive: true
  },
  // Quiz Night FAQs
  {
    _type: 'servicesFAQ',
    question: 'How do you promote a pub quiz effectively?',
    answer: 'Through AI-powered social media campaigns, automated reminders, and community engagement. Our quiz attendance has grown from 20 to 25-35 regulars using these exact methods - I\'ll show you how to replicate this success.',
    category: 'quiz',
    order: 1,
    isActive: true
  },
  {
    _type: 'servicesFAQ',
    question: 'What\'s the secret to quiz night success?',
    answer: 'AI automation for consistent promotion, WhatsApp groups for regular attendees, and prize structures that encourage teams. We\'ve grown from 20 to 25-35 regulars with these methods.',
    category: 'quiz',
    order: 2,
    isActive: true
  },
  {
    _type: 'servicesFAQ',
    question: 'Can AI really help with quiz nights?',
    answer: 'Absolutely! AI helps create engaging promotional content, manage bookings, send reminders, and even generate fresh quiz questions. It\'s transformed our Tuesday nights from empty to buzzing.',
    category: 'quiz',
    order: 3,
    isActive: true
  },
  // Social Media FAQs
  {
    _type: 'servicesFAQ',
    question: 'Can AI really manage my pub\'s social media?',
    answer: 'Yes - I post 5 times weekly reaching 60,000-70,000 views monthly, spending just 2 hours per week. I\'ll train you on the exact AI tools and prompts I use, so you can achieve similar results without the time drain.',
    category: 'social',
    order: 1,
    isActive: true
  },
  {
    _type: 'servicesFAQ',
    question: 'Will my social media posts look automated?',
    answer: 'Not at all! I\'ll teach you to guide AI to create posts that sound like you, showcase your pub\'s personality, and engage your local community. Our posts get more engagement now than when we spent hours writing them manually.',
    category: 'social',
    order: 2,
    isActive: true
  },
  {
    _type: 'servicesFAQ',
    question: 'What if I\'m not tech-savvy?',
    answer: 'Perfect - neither was I! If you can send a WhatsApp message, you can use these AI tools. I provide step-by-step training designed for busy licensees, not tech experts. Most clients are posting confidently within days.',
    category: 'social',
    order: 3,
    isActive: true
  },
  // Business Analysis FAQs
  {
    _type: 'servicesFAQ',
    question: 'What kind of business insights can AI provide?',
    answer: 'AI helps analyze your sales patterns, identify your most profitable customers, optimize staff scheduling, and predict busy periods. I\'ve discovered profit opportunities worth £75,000-£100,000 annually using these tools.',
    category: 'analysis',
    order: 1,
    isActive: true
  },
  {
    _type: 'servicesFAQ',
    question: 'How detailed are your AI business reports?',
    answer: 'Very detailed but easy to understand. You\'ll get insights on customer behavior, menu performance, event ROI, and seasonal trends - all presented in plain English with clear action steps.',
    category: 'analysis',
    order: 2,
    isActive: true
  },
  {
    _type: 'servicesFAQ',
    question: 'Can AI help with supplier negotiations?',
    answer: 'Yes! AI analyzes your purchasing patterns, compares supplier prices, and identifies savings opportunities. I\'ve saved £250/week on food waste alone by optimizing our ordering based on AI predictions.',
    category: 'analysis',
    order: 3,
    isActive: true
  },
  // Event Planning FAQs
  {
    _type: 'servicesFAQ',
    question: 'How do you create pub events that actually work?',
    answer: 'By using AI to analyze what your community wants, automate promotion, and track results. Our tasting nights achieve 85% customer retention because we use data to plan events people actually want to attend.',
    category: 'events',
    order: 1,
    isActive: true
  },
  {
    _type: 'servicesFAQ',
    question: 'What makes your event planning different?',
    answer: 'Real experience combined with AI efficiency. I\'ve run successful quiz nights, tasting events, and seasonal promotions. I\'ll share what works and train you to use AI for promotion and management.',
    category: 'events',
    order: 2,
    isActive: true
  },
  {
    _type: 'servicesFAQ',
    question: 'Can AI predict which events will be successful?',
    answer: 'Yes! By analyzing local demographics, past event performance, and social media engagement, AI helps predict which events will draw crowds. It\'s helped us avoid costly flops and double down on winners.',
    category: 'events',
    order: 3,
    isActive: true
  },
  // General FAQs
  {
    _type: 'servicesFAQ',
    question: 'Why don\'t you offer fixed-price packages?',
    answer: 'Every pub is unique. Fixed packages force you to pay for things you don\'t need. At £75 per hour plus VAT, you only pay for the help you actually use. Most pubs see significant improvements within 20-30 hours of consulting.',
    category: 'general',
    order: 1,
    isActive: true
  },
  {
    _type: 'servicesFAQ',
    question: 'Can I see examples of your work?',
    answer: 'Visit The Anchor! See our menus, watch our social media in action, attend a quiz night. Everything I teach, we use daily. First pint\'s on me - seeing is believing.',
    category: 'general',
    order: 2,
    isActive: true
  },
  {
    _type: 'servicesFAQ',
    question: 'Do you offer remote support?',
    answer: 'Yes! Most AI training works perfectly over video calls. I support pubs across the UK with screen sharing, recorded tutorials, and WhatsApp support. Distance is no barrier to getting help.',
    category: 'general',
    order: 3,
    isActive: true
  }
];

async function migrateServicesContent() {
  try {
    console.log('🚀 Starting services content migration...');
    console.log(`📊 Migration summary:`);
    console.log(`   - Services page content: 1 document`);
    console.log(`   - Service packages: ${servicePackages.length} documents`);
    console.log(`   - Services FAQs: ${servicesFAQs.length} documents`);
    console.log('');

    // 1. Create/update services page content
    console.log('📄 Creating services page content...');
    const pageResult = await writeClient.createOrReplace(servicesPageContent);
    console.log('✅ Services page content created:', pageResult._id);
    console.log('');

    // 2. Create service packages
    console.log('📦 Creating service packages...');
    for (const servicePackage of servicePackages) {
      const result = await writeClient.create(servicePackage);
      console.log(`✅ Service package created: ${result.title} (${result._id})`);
    }
    console.log('');

    // 3. Create services FAQs
    console.log('❓ Creating services FAQs...');
    for (const faq of servicesFAQs) {
      const result = await writeClient.create(faq);
      console.log(`✅ FAQ created: ${result.question.substring(0, 50)}... (${result._id})`);
    }
    console.log('');

    console.log('🎉 Migration completed successfully!');
    console.log('');
    console.log('Summary:');
    console.log(`- Created 1 services page content document`);
    console.log(`- Created ${servicePackages.length} service packages`);
    console.log(`- Created ${servicesFAQs.length} FAQ documents`);
    console.log('');
    console.log('Next steps:');
    console.log('1. Go to your Sanity Studio to review the migrated content');
    console.log('2. Update the ServicesPage.tsx component to use the new Sanity data');
    console.log('3. Test the page to ensure everything renders correctly');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Check if we have write access
if (!process.env.SANITY_API_TOKEN) {
  console.error('❌ SANITY_API_TOKEN environment variable is required for migration');
  console.error('Please set your Sanity API token in your environment variables');
  process.exit(1);
}

// Run the migration
migrateServicesContent();