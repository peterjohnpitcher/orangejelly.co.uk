#!/usr/bin/env tsx

/**
 * Updated migration script to use new services schemas
 * 
 * This script migrates hardcoded services content to the new Sanity schemas:
 * - servicesPage: Main page content
 * - servicePackage: Individual service packages  
 * - servicesFAQ: Services-specific FAQs
 */

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
    bottomText: 'All services £62.50/hour • No packages • Pay for what you need'
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
    heading: '30-Day Money-Back Guarantee',
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
      answer: 'Orange Jelly offers practical help for pub licensees including social media management, menu optimization, event planning, and business analysis using AI tools. All services are £62.50 per hour plus VAT.'
    },
    {
      question: 'How much does Orange Jelly charge?',
      answer: 'We charge £62.50 per hour plus VAT as a flat rate. I\'m always happy to have a free chat first to understand your challenges. All pricing is transparent with no hidden fees.'
    },
    {
      question: 'Can Orange Jelly help my empty pub?',
      answer: 'Yes, our Empty Pub Recovery Package has transformed quiet nights into profitable ones. We\'ve grown quiz nights from 20 to 35 regulars and reach 70,000 people monthly on social media.'
    }
  ]
};

// Service packages data
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
    price: '£62.50/hour + VAT',
    ctaText: 'Save my pub',
    highlight: true,
    order: 1,
    isActive: true
  },

// Service FAQs data
const servicesFAQs = [
  // Empty Pub Recovery FAQs
  {
    _type: 'servicesFAQ',
    question: 'How does the Empty Pub Recovery Package work?',
    answer: 'We work with you to implement AI-powered marketing strategies that have been proven at The Anchor. This includes training on social media automation, event promotion, and customer engagement. We charge £62.50 per hour plus VAT, and offer a 30-day money-back guarantee.',
    category: 'recovery',
    order: 1,
    isActive: true
  },
  {
    question: "How does your hourly consulting work?",
    answer: "We charge £62.50 per hour plus VAT as a flat rate. I'll work with you to implement the AI strategies that have transformed The Anchor - from social media automation to event planning. First training session with a pub chain scheduled September 2025.",
    category: 'pricing',
    serviceCategory: 'recovery'
  },
  {
    question: "How quickly will I see more customers from the recovery package?",
    answer: "Results vary by pub, but at The Anchor we've seen quiz nights grow from 20 to 25-35 regulars, tasting nights with 85% retention, and 60,000-70,000 social media views monthly. Most improvements show within 30 days.",
    category: 'results',
    serviceCategory: 'recovery'
  },
  // Menu Makeover FAQs
  {
    question: "How can menu descriptions increase my food sales?",
    answer: "Psychology-based menu descriptions guide customers to order more profitable dishes and increase average spend by £7 per table. We use proven techniques like sensory language, storytelling, and strategic positioning that have increased food GP by up to 15% for our clients.",
    category: 'results',
    serviceCategory: 'menu'
  },
  {
    question: "What exactly do you do with menu AI?",
    answer: "I'll teach you to use AI for menu analysis, pricing optimization, and seasonal updates. I've helped improve food GP from 58% to 71%, saving £250/week on waste.",
    category: 'service',
    serviceCategory: 'menu'
  },
  {
    question: "Will AI-written menus sound fake or robotic?",
    answer: "Not at all! I guide the AI to write in your pub's authentic voice. The descriptions feel personal and appetizing - customers often comment on how good our food sounds before they've even tasted it.",
    category: 'service',
    serviceCategory: 'menu'
  },
  // Quiz Night FAQs
  {
    question: "How do you promote a pub quiz effectively?",
    answer: "Through AI-powered social media campaigns, automated reminders, and community engagement. Our quiz attendance has grown from 20 to 25-35 regulars using these exact methods - I'll show you how to replicate this success.",
    category: 'service',
    serviceCategory: 'quiz'
  },
  {
    question: "What's the secret to quiz night success?",
    answer: "AI automation for consistent promotion, WhatsApp groups for regular attendees, and prize structures that encourage teams. We've grown from 20 to 25-35 regulars with these methods.",
    category: 'service',
    serviceCategory: 'quiz'
  },
  {
    question: "Can AI really help with quiz nights?",
    answer: "Absolutely! AI helps create engaging promotional content, manage bookings, send reminders, and even generate fresh quiz questions. It's transformed our Tuesday nights from empty to buzzing.",
    category: 'service',
    serviceCategory: 'quiz'
  },
  // Social Media FAQs
  {
    question: "Can AI really manage my pub's social media?",
    answer: "Yes - I post 5 times weekly reaching 60,000-70,000 views monthly, spending just 2 hours per week. I'll train you on the exact AI tools and prompts I use, so you can achieve similar results without the time drain.",
    category: 'service',
    serviceCategory: 'social'
  },
  {
    question: "Will my social media posts look automated?",
    answer: "Not at all! I'll teach you to guide AI to create posts that sound like you, showcase your pub's personality, and engage your local community. Our posts get more engagement now than when we spent hours writing them manually.",
    category: 'service',
    serviceCategory: 'social'
  },
  {
    question: "What if I'm not tech-savvy?",
    answer: "Perfect - neither was I! If you can send a WhatsApp message, you can use these AI tools. I provide step-by-step training designed for busy licensees, not tech experts. Most clients are posting confidently within days.",
    category: 'process',
    serviceCategory: 'social'
  },
  // Business Analysis FAQs
  {
    question: "What kind of business insights can AI provide?",
    answer: "AI helps analyze your sales patterns, identify your most profitable customers, optimize staff scheduling, and predict busy periods. I've discovered profit opportunities worth £75,000-£100,000 annually using these tools.",
    category: 'service',
    serviceCategory: 'analysis'
  },
  {
    question: "How detailed are your AI business reports?",
    answer: "Very detailed but easy to understand. You'll get insights on customer behavior, menu performance, event ROI, and seasonal trends - all presented in plain English with clear action steps.",
    category: 'service',
    serviceCategory: 'analysis'
  },
  {
    question: "Can AI help with supplier negotiations?",
    answer: "Yes! AI analyzes your purchasing patterns, compares supplier prices, and identifies savings opportunities. I've saved £250/week on food waste alone by optimizing our ordering based on AI predictions.",
    category: 'results',
    serviceCategory: 'analysis'
  },
  // Event Planning FAQs
  {
    question: "How do you create pub events that actually work?",
    answer: "By using AI to analyze what your community wants, automate promotion, and track results. Our tasting nights achieve 85% customer retention because we use data to plan events people actually want to attend.",
    category: 'service',
    serviceCategory: 'events'
  },
  {
    question: "What makes your event planning different?",
    answer: "Real experience combined with AI efficiency. I've run successful quiz nights, tasting events, and seasonal promotions. I'll share what works and train you to use AI for promotion and management.",
    category: 'service',
    serviceCategory: 'events'
  },
  {
    question: "Can AI predict which events will be successful?",
    answer: "Yes! By analyzing local demographics, past event performance, and social media engagement, AI helps predict which events will draw crowds. It's helped us avoid costly flops and double down on winners.",
    category: 'results',
    serviceCategory: 'events'
  },
  // General FAQs
  {
    question: "Why don't you offer fixed-price packages?",
    answer: "Every pub is unique. Fixed packages force you to pay for things you don't need. At £62.50 per hour plus VAT, you only pay for the help you actually use. Most pubs see significant improvements within 20-30 hours of consulting.",
    category: 'pricing',
    serviceCategory: 'general'
  },
  {
    question: "Can I see examples of your work?",
    answer: "Visit The Anchor! See our menus, watch our social media in action, attend a quiz night. Everything I teach, we use daily. First pint's on me - seeing is believing.",
    category: 'general',
    serviceCategory: 'general'
  },
  {
    question: "Do you offer remote support?",
    answer: "Yes! Most AI training works perfectly over video calls. I support pubs across the UK with screen sharing, recorded tutorials, and WhatsApp support. Distance is no barrier to getting help.",
    category: 'process',
    serviceCategory: 'general'
  }
];

// Service details data
const servicesData = {
  recovery: {
    id: 'empty-pub-recovery',
    emoji: '🚨',
    title: 'Empty Pub Recovery Package',
    problem: 'Staring at empty tables on quiet nights?',
    deliverable: 'Effective marketing strategies delivered quickly',
    description: `Turn those soul-crushing empty nights into profitable ones. This is our emergency response for pubs bleeding money on quiet nights. I've been there - watching the clock, calculating losses, wondering if tomorrow will be better. It doesn't have to be this way.`,
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
    price: '£62.50 per hour + VAT',
    ctaText: 'Save my pub',
    highlight: true,
    order: 1
  },
  menu: {
    id: 'menu-makeover',
    emoji: '🍴',
    title: 'Menu Makeover & Profit Maximization',
    problem: 'Food sitting in the kitchen while bills pile up?',
    deliverable: 'AI-crafted menu descriptions that sell',
    description: `Your menu is a sales tool, not just a list. Wrong descriptions = lost money. I'll show you how AI transforms boring food lists into profit machines that make mouths water and tills ring.`,
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
    priceBreakdown: '',
    price: '£62.50 per hour + VAT',
    ctaText: 'Boost food profits',
    highlight: false,
    order: 2
  },
  social: {
    id: 'social-media-mastery',
    emoji: '📱',
    title: 'Social Media That Actually Works',
    problem: 'Posting into the void while competitors steal your customers?',
    deliverable: 'Reach thousands weekly in just 2 hours',
    description: `Stop wasting hours on posts nobody sees. I reach 60,000-70,000 people monthly spending just 2 hours per week. I'll teach you the exact AI tools and strategies that transformed our empty pub into a community hub.`,
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
    priceBreakdown: '',
    price: '£62.50 per hour + VAT',
    ctaText: 'Get noticed online',
    highlight: false,
    order: 3
  },
  quiz: {
    id: 'quiz-night-success',
    emoji: '🎯',
    title: 'Quiz Night Success System',
    problem: 'Running quizzes for empty chairs and family members?',
    deliverable: '25-35 weekly regulars within 2 months',
    description: `Transform your quiet Tuesday into your busiest weeknight. Our quiz went from 20 people to 35 regulars who book tables, buy food, and bring friends. I'll share every trick, template, and AI tool that made it happen.`,
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
    priceBreakdown: '',
    price: '£62.50 per hour + VAT',
    ctaText: 'Pack my quiz nights',
    highlight: false,
    order: 4
  },
  analysis: {
    id: 'business-analysis',
    emoji: '📊',
    title: 'AI Business Analysis & Insights',
    problem: 'Making decisions on gut feel while money disappears?',
    deliverable: 'Know exactly where to focus for maximum profit',
    description: `Stop guessing, start knowing. AI reveals hidden profit opportunities in your data. I found £75,000 of annual value in ours - imagine what's hiding in yours.`,
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
    priceBreakdown: '',
    price: '£62.50 per hour + VAT',
    ctaText: 'Find hidden profits',
    highlight: false,
    order: 5
  },
  events: {
    id: 'event-planning',
    emoji: '🎉',
    title: 'Events That Fill Your Pub',
    problem: 'Organizing events that nobody attends?',
    deliverable: 'Events people mark in their diary',
    description: `Stop throwing parties for empty rooms. Our events consistently draw crowds because we use AI to understand what people actually want, then promote effectively. 85% of our tasting night attendees become regulars.`,
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
    priceBreakdown: '',
    price: '£62.50 per hour + VAT',
    ctaText: 'Create buzzing events',
    highlight: false,
    order: 6
  },
  consultation: {
    id: 'consultation',
    emoji: '💬',
    title: 'Pub Recovery Consultation',
    problem: 'Need specific help with your unique challenges?',
    deliverable: 'Practical solutions from someone who gets it',
    description: `Sometimes you just need to talk to someone who's been there. Book time with me to discuss your specific challenges. No corporate nonsense - just honest advice from one licensee to another.`,
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
    priceBreakdown: '',
    price: '£62.50 per hour + VAT',
    ctaText: 'Book consultation',
    highlight: false,
    order: 7
  },
  website: {
    id: 'website-presence',
    emoji: '🌐',
    title: 'Website & Online Presence',
    problem: 'Invisible online while chains dominate Google?',
    deliverable: 'Found by locals searching for pubs',
    description: `If you're not online, you don't exist to most customers. But you don't need an expensive website - you need to be found. I'll show you free and low-cost ways to dominate local search results.`,
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
    priceBreakdown: '',
    price: '£62.50 per hour + VAT',
    ctaText: 'Get found online',
    highlight: false,
    order: 8
  }
};

// Process steps data
const processSteps = [
  {
    number: 1,
    title: "Tell Me What's Wrong",
    description: "WhatsApp or call me. Explain what's keeping you up at night. Empty Tuesday? Weak food sales? No online presence? I've been there."
  },
  {
    number: 2,
    title: "We Create a Plan",
    description: "No cookie-cutter solutions. We'll discuss what's worked at The Anchor and adapt it to your pub. You'll know exactly what we're doing and why."
  },
  {
    number: 3,
    title: "I Show You How",
    description: "Screen sharing, videos, or in-person - whatever works. I'll train you to use the exact AI tools and strategies that saved our pub."
  },
  {
    number: 4,
    title: "You See Results",
    description: "Most pubs see improvements within 30 days. Quiz nights filling up, social media buzzing, food flying out the kitchen. Real results, not promises."
  }
];

// Helper function to create block content from text
function createBlockContent(text: string, key: string) {
  return [
    {
      _type: 'block',
      _key: key,
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: `${key}-span`,
          text: text,
          marks: [],
        },
      ],
      markDefs: [],
    },
  ];
}

// Migrate Service FAQs
async function migrateServiceFAQs() {
  console.log('🔄 Starting migration of Service FAQs...\n');
  
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < servicesFAQs.length; i++) {
    const faq = servicesFAQs[i];
    const faqDoc = {
      _type: 'faq',
      question: faq.question,
      answer: createBlockContent(faq.answer, `faq-${i}`),
      page: 'services',
      category: faq.category,
      order: i + 1,
      isVoiceOptimized: false,
    };

    try {
      const result = await client.create(faqDoc);
      console.log(`✅ FAQ ${i + 1}/${servicesFAQs.length}: "${faq.question.substring(0, 50)}..." (${result._id})`);
      successCount++;
    } catch (error: any) {
      console.error(`❌ FAQ ${i + 1}/${servicesFAQs.length}: Failed to migrate - ${error.message}`);
      errorCount++;
    }
  }
  
  console.log(`\n📊 FAQs Migration Summary: ${successCount} successful, ${errorCount} failed\n`);
  return { successCount, errorCount };
}

// Migrate Service Details
async function migrateServiceDetails() {
  console.log('🔄 Starting migration of Service Details...\n');
  
  let successCount = 0;
  let errorCount = 0;
  
  const serviceKeys = Object.keys(servicesData) as Array<keyof typeof servicesData>;
  
  for (const key of serviceKeys) {
    const service = servicesData[key];
    
    const serviceDoc = {
      _type: 'serviceDetail',
      id: { _type: 'slug', current: service.id },
      emoji: service.emoji,
      title: service.title,
      problem: service.problem,
      deliverable: service.deliverable,
      description: service.description,
      features: service.features,
      example: `${service.example.before} → ${service.example.after} = ${service.example.result}`,
      timeEstimate: service.timeEstimate,
      priceBreakdown: service.priceBreakdown || `Based on ${service.timeEstimate} at £62.50 per hour + VAT`,
      price: service.price,
      ctaText: service.ctaText,
      highlight: service.highlight,
      order: service.order
    };

    try {
      const result = await client.create(serviceDoc);
      console.log(`✅ Service: "${service.title}" migrated (${result._id})`);
      successCount++;
    } catch (error: any) {
      console.error(`❌ Service: "${service.title}" failed - ${error.message}`);
      errorCount++;
    }
  }
  
  console.log(`\n📊 Services Migration Summary: ${successCount} successful, ${errorCount} failed\n`);
  return { successCount, errorCount };
}

// Migrate Process Steps
async function migrateProcessSteps() {
  console.log('🔄 Starting migration of Process Steps...\n');
  
  const processBlock = {
    _type: 'contentBlock',
    name: 'Services Process Steps',
    identifier: { _type: 'slug', current: 'services-process-steps' },
    type: 'process',
    content: {
      title: 'Simple, Honest Process',
      subtitle: 'How we work together to transform your pub',
      steps: processSteps.map((step, i) => ({
        _key: `step-${i}`,
        number: step.number,
        title: step.title,
        description: step.description,
      })),
    },
    metadata: {
      page: 'services',
      section: 'process',
      order: 1,
    },
  };

  try {
    const result = await client.create(processBlock);
    console.log(`✅ Process steps block migrated (${result._id})\n`);
    return { successCount: 1, errorCount: 0 };
  } catch (error: any) {
    console.error(`❌ Process steps block failed - ${error.message}\n`);
    return { successCount: 0, errorCount: 1 };
  }
}

// Migrate page metadata
async function migratePageMetadata() {
  console.log('🔄 Starting migration of Services Page Metadata...\n');
  
  const pageMetadata = {
    _type: 'contentBlock',
    name: 'Services Page Metadata',
    identifier: { _type: 'slug', current: 'services-page-metadata' },
    type: 'pageMetadata',
    content: {
      heroTitle: 'From Empty Tables to Full Tills',
      heroSubtitle: 'Every service below has been tested at The Anchor. If it didn\'t work for us, it\'s not here.',
      heroCtaText: 'Help me fill my pub',
      heroBottomText: 'All services £62.50/hour • No packages • Pay for what you need',
      sectionTitle: 'Real Solutions, Not Theory',
      sectionSubtitle: 'I\'m not selling you strategies I read in a book. Every service below is something I use daily at The Anchor. You\'re learning from real experience, not corporate theory.',
      guaranteeTitle: '30-Day Money-Back Guarantee',
      guaranteeText: 'If you don\'t see real improvements within 30 days, I\'ll refund every penny. That\'s how confident I am these strategies work - because they saved my pub.',
      guaranteeHighlight: 'No risk, all reward',
      guaranteeSubtext: 'The only thing you risk is staying stuck where you are',
      ctaTitle: 'Stop Watching Money Walk Past Your Pub',
      ctaSubtitle: 'Every empty table is lost revenue. Every quiet night is bills unpaid. Let\'s change that - starting today.',
      ctaButtonText: 'WhatsApp me now',
      ctaWhatsappMessage: 'Hi Peter, I saw your services page and need help with my pub'
    },
    metadata: {
      page: 'services',
      section: 'metadata',
      order: 0,
    },
  };

  try {
    const result = await client.create(pageMetadata);
    console.log(`✅ Page metadata migrated (${result._id})\n`);
    return { successCount: 1, errorCount: 0 };
  } catch (error: any) {
    console.error(`❌ Page metadata failed - ${error.message}\n`);
    return { successCount: 0, errorCount: 1 };
  }
}

// Main migration function
async function main() {
  console.log('========================================');
  console.log('   SERVICES CONTENT MIGRATION SCRIPT');
  console.log('========================================\n');
  
  console.log('📋 Migration Plan:');
  console.log('   1. Service FAQs (21 items)');
  console.log('   2. Service Details (8 services)');
  console.log('   3. Process Steps (4 steps)');
  console.log('   4. Page Metadata\n');
  
  console.log('🔗 Sanity Configuration:');
  console.log(`   Project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
  console.log(`   Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}\n`);
  
  console.log('⚠️  This will create new documents in Sanity');
  console.log('   Press Ctrl+C to cancel if needed\n');
  
  console.log('========================================\n');
  
  try {
    // Track overall statistics
    let totalSuccess = 0;
    let totalError = 0;
    
    // Run migrations
    const faqResults = await migrateServiceFAQs();
    totalSuccess += faqResults.successCount;
    totalError += faqResults.errorCount;
    
    const serviceResults = await migrateServiceDetails();
    totalSuccess += serviceResults.successCount;
    totalError += serviceResults.errorCount;
    
    const processResults = await migrateProcessSteps();
    totalSuccess += processResults.successCount;
    totalError += processResults.errorCount;
    
    const metadataResults = await migratePageMetadata();
    totalSuccess += metadataResults.successCount;
    totalError += metadataResults.errorCount;
    
    // Final summary
    console.log('========================================');
    console.log('         MIGRATION COMPLETE');
    console.log('========================================\n');
    console.log(`✅ Total Successful: ${totalSuccess}`);
    console.log(`❌ Total Failed: ${totalError}`);
    console.log(`📊 Success Rate: ${((totalSuccess / (totalSuccess + totalError)) * 100).toFixed(1)}%\n`);
    
    if (totalError > 0) {
      console.log('⚠️  Some items failed to migrate. Please check the errors above.\n');
      process.exit(1);
    } else {
      console.log('🎉 All items migrated successfully!\n');
      process.exit(0);
    }
    
  } catch (error) {
    console.error('\n💥 Critical error during migration:', error);
    process.exit(1);
  }
}

// Run the migration
if (require.main === module) {
  main();
}

export { migrateServiceFAQs, migrateServiceDetails, migrateProcessSteps, migratePageMetadata };