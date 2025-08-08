#!/usr/bin/env ts-node

import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables first
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Create Sanity client directly
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

function hasWriteAccess(): boolean {
  return !!process.env.SANITY_API_TOKEN;
}

// Type definitions for migration
interface FAQ {
  _key: string;
  _type: 'object';
  question: string;
  answer: any[];
  category?: string;
  isVoiceOptimized?: boolean;
  page?: string;
  order?: number;
}

interface ContentBlock {
  _key: string;
  _type: 'object';
  name: string;
  identifier: { _type: 'slug'; current: string };
  type: string;
  content: {
    title?: string;
    subtitle?: string;
    description?: any[];
    items?: any[];
    cta?: {
      text?: string;
      href?: string;
      whatsappMessage?: string;
    };
  };
  metadata?: {
    page?: string;
    section?: string;
    order?: number;
  };
}

interface LandingPage {
  _type: 'landingPage';
  title: string;
  slug: { _type: 'slug'; current: string };
  metaDescription: string;
  keywords?: string[];
  heroSection: {
    title: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
  };
  ctaSettings?: {
    primaryCTA?: string;
    whatsappMessage?: string;
    showCalculator?: boolean;
  };
  isActive: boolean;
}

// Helper function to generate unique keys
function generateKey(): string {
  return Math.random().toString(36).substring(2, 15);
}

// Helper function to convert text to Portable Text
function textToPortableText(text: string): any[] {
  return [
    {
      _type: 'block',
      _key: generateKey(),
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: generateKey(),
          text: text,
          marks: []
        }
      ]
    }
  ];
}

// Helper function to create FAQ documents
async function createFAQ(question: string, answer: string, category: string, page: string, order: number) {
  const faqDoc = {
    _type: 'faq',
    question,
    answer: textToPortableText(answer),
    category,
    isVoiceOptimized: true,
    page,
    order
  };

  try {
    const result = await writeClient.create(faqDoc);
    console.log(`✅ Created FAQ: ${question.substring(0, 50)}...`);
    return result._id;
  } catch (error) {
    console.error(`❌ Failed to create FAQ: ${question}`, error);
    return null;
  }
}

// Helper function to create Content Block documents
async function createContentBlock(data: {
  name: string;
  identifier: string;
  type: string;
  content: any;
  metadata?: any;
}) {
  const contentBlockDoc = {
    _type: 'contentBlock',
    name: data.name,
    identifier: { _type: 'slug', current: data.identifier },
    type: data.type,
    content: data.content,
    metadata: data.metadata
  };

  try {
    const result = await writeClient.create(contentBlockDoc);
    console.log(`✅ Created Content Block: ${data.name}`);
    return result._id;
  } catch (error) {
    console.error(`❌ Failed to create Content Block: ${data.name}`, error);
    return null;
  }
}

// Main migration function
async function migrateLandingPages() {
  if (!hasWriteAccess()) {
    console.error('❌ No write access. Please set SANITY_API_TOKEN environment variable.');
    process.exit(1);
  }

  console.log('🚀 Starting landing page migration to Sanity...\n');

  // 1. COMPETE WITH PUB CHAINS PAGE
  console.log('📄 Migrating: Compete with Pub Chains page...');
  
  const competeWithChainsPage: LandingPage = {
    _type: 'landingPage',
    title: 'Compete with Pub Chains',
    slug: { _type: 'slug', current: 'compete-with-pub-chains' },
    metaDescription: 'Beat pub chains at their own game. Proven strategies help independent pubs compete with chain pubs. Win on service, atmosphere and personality, not just price.',
    keywords: ['pub chains', 'compete with chains', 'independent pub', 'chain pub competition', 'pub marketing'],
    heroSection: {
      title: 'Chain Pubs Stealing Your Trade? Here\'s How to Fight Back',
      subtitle: 'Stop competing on price. Start winning on everything else that matters.',
      ctaText: 'Start Beating the Chains',
      ctaLink: '/contact'
    },
    ctaSettings: {
      primaryCTA: 'Start Beating the Chains',
      whatsappMessage: 'Help me compete with chain pubs',
      showCalculator: false
    },
    isActive: true
  };

  // Create FAQs for Compete with Chains page
  const competeWithChainsFAQs = [
    {
      question: "How can I compete with chain pubs on price?",
      answer: "You don't compete on price - you compete on value. Chain pub customers aren't always your customers. Focus on quality, atmosphere, personal service, and community connection. We'll show you how to position your pub as the premium local choice.",
      category: 'pricing'
    },
    {
      question: "What advantages do independent pubs have over chains?",
      answer: "Personal service, flexibility, local knowledge, unique atmosphere, better quality, community connection, and the ability to adapt quickly. Chains are slow corporate machines - you can outmaneuver them every time.",
      category: 'general'
    },
    {
      question: "How do I stop losing customers to cheaper chain pubs?",
      answer: "Create experiences chains can't match. Regular's benefits, personalized service, quality food, unique events, and genuine community feel. Make your pub irreplaceable, not just another place to drink.",
      category: 'service'
    },
    {
      question: "Should I match chain pub prices?",
      answer: "No. Racing to the bottom kills profits. Instead, justify your prices with superior quality, service, and experience. Our strategies help you attract customers who value quality over cheapness.",
      category: 'pricing'
    },
    {
      question: "Can a small pub really compete with big chains?",
      answer: "Absolutely. David beats Goliath when he's smart. At The Anchor, we compete successfully with nearby chains. The key is playing to your strengths, not trying to beat them at their game.",
      category: 'general'
    }
  ];

  const competeWithChainsFAQIds = [];
  for (let i = 0; i < competeWithChainsFAQs.length; i++) {
    const faq = competeWithChainsFAQs[i];
    const faqId = await createFAQ(
      faq.question, 
      faq.answer, 
      faq.category, 
      'compete-with-chains',
      i + 1
    );
    if (faqId) competeWithChainsFAQIds.push({ _type: 'reference', _ref: faqId });
  }

  // Create content blocks for Compete with Chains page
  const competeWithChainsBlocks = [];
  
  // Chain Weaknesses block
  const chainWeaknessesBlock = await createContentBlock({
    name: 'Chain Pub Weaknesses',
    identifier: 'chain-pub-weaknesses',
    type: 'problems',
    content: {
      title: 'Turn Their Weaknesses Into Your Strengths',
      subtitle: 'Chain pubs have systematic weaknesses you can exploit',
      items: [
        {
          title: 'No Soul',
          description: 'Corporate atmosphere, no personality. Your advantage: Create a unique vibe that becomes your thing',
          icon: '❌'
        },
        {
          title: 'Poor Service',
          description: 'Understaffed, don\'t know regulars. Your advantage: Remember names, drinks, and make people feel special',
          icon: '❌'
        },
        {
          title: 'Frozen Food',
          description: 'Microwaved meals, no chef. Your advantage: Fresh, local, homemade - and shout about it',
          icon: '❌'
        },
        {
          title: 'No Flexibility',
          description: 'Can\'t adapt, corporate rules. Your advantage: Change instantly based on what customers want',
          icon: '❌'
        }
      ]
    },
    metadata: {
      page: 'compete-with-chains',
      section: 'problems',
      order: 1
    }
  });
  if (chainWeaknessesBlock) competeWithChainsBlocks.push({ _type: 'reference', _ref: chainWeaknessesBlock });

  // Winning Strategies block
  const winningStrategiesBlock = await createContentBlock({
    name: 'Winning Against Chains',
    identifier: 'winning-against-chains',
    type: 'features',
    content: {
      title: '4 Proven Ways to Beat the Chains',
      subtitle: 'Strategies that actually work for independent pubs',
      items: [
        {
          title: 'The Local Hero',
          description: 'Partner with local suppliers, support community causes, host local groups, celebrate local success. Becomes THE community pub.',
          icon: '🏆'
        },
        {
          title: 'The Experience',
          description: 'Themed nights chains can\'t do, unique food offerings, personal touches everywhere, stories and personality. Destination, not just a pub.',
          icon: '🎯'
        },
        {
          title: 'The Quality Play',
          description: 'Premium products done well, expert knowledge, craft and specialty focus, quality over quantity. Attracts discerning customers.',
          icon: '⭐'
        },
        {
          title: 'The Service Win',
          description: 'Know every regular by name, remember preferences, go extra mile always, create wow moments. Unbeatable customer loyalty.',
          icon: '🤝'
        }
      ]
    },
    metadata: {
      page: 'compete-with-chains',
      section: 'features',
      order: 2
    }
  });
  if (winningStrategiesBlock) competeWithChainsBlocks.push({ _type: 'reference', _ref: winningStrategiesBlock });

  // Create the landing page with references
  try {
    const pageWithRefs = {
      ...competeWithChainsPage,
      faqs: competeWithChainsFAQIds,
      contentSections: competeWithChainsBlocks
    };
    await writeClient.create(pageWithRefs);
    console.log('✅ Created Compete with Pub Chains landing page\n');
  } catch (error) {
    console.error('❌ Failed to create Compete with Pub Chains page:', error);
  }

  // 2. EMPTY PUB SOLUTIONS PAGE
  console.log('📄 Migrating: Empty Pub Solutions page...');
  
  const emptyPubPage: LandingPage = {
    _type: 'landingPage',
    title: 'Empty Pub Solutions',
    slug: { _type: 'slug', current: 'empty-pub-solutions' },
    metaDescription: 'Empty pub killing your profits? Proven 30-day system fills tables fast. From 25% empty to 85% full - real results from UK pubs. Money-back guarantee.',
    keywords: ['empty pub', 'fill tables', 'pub recovery', 'increase covers', 'pub marketing'],
    heroSection: {
      title: 'Your Pub is Empty. We\'ll Fill It in 30 Days.',
      subtitle: 'Proven strategies that transformed The Anchor from empty to thriving',
      ctaText: 'Start Filling Tables Today',
      ctaLink: '/contact'
    },
    ctaSettings: {
      primaryCTA: 'Get My 30-Day Plan',
      whatsappMessage: 'I need help filling my empty pub',
      showCalculator: true
    },
    isActive: true
  };

  // Create FAQs for Empty Pub Solutions page
  const emptyPubFAQs = [
    {
      question: "How quickly can I see results for my empty pub?",
      answer: "Most pubs see 25-40% increase in covers within 30 days. Our proven system starts working immediately - you'll notice more bookings in week one, busier nights by week two, and significantly fuller tables by day 30.",
      category: 'results'
    },
    {
      question: "What if I've tried everything and nothing works?",
      answer: "We hear this a lot. The difference is we're licensees who've solved this exact problem. Our strategies aren't theories - they're proven methods that transformed The Anchor's quiet nights into profitable evenings.",
      category: 'general'
    },
    {
      question: "How much does the empty pub recovery package cost?",
      answer: "£62.50 per hour plus VAT. I'll work with you to implement the AI strategies that transformed The Anchor. 30-day money-back guarantee if you're not satisfied.",
      category: 'pricing'
    },
    {
      question: "Do I need to spend money on advertising?",
      answer: "No. Our system focuses on organic growth through better messaging, community engagement, and word-of-mouth. Optional paid ads can accelerate results, but they're not required.",
      category: 'process'
    },
    {
      question: "Will this work for my type of pub?",
      answer: "Yes. We've helped gastropubs, community locals, sports bars, and country inns. The principles work because they're based on human psychology and proven hospitality strategies, not gimmicks.",
      category: 'general'
    }
  ];

  const emptyPubFAQIds = [];
  for (let i = 0; i < emptyPubFAQs.length; i++) {
    const faq = emptyPubFAQs[i];
    const faqId = await createFAQ(
      faq.question, 
      faq.answer, 
      faq.category, 
      'empty-pub-solutions',
      i + 1
    );
    if (faqId) emptyPubFAQIds.push({ _type: 'reference', _ref: faqId });
  }

  // Create content blocks for Empty Pub Solutions page
  const emptyPubBlocks = [];
  
  // 30-Day Plan block
  const thirtyDayPlanBlock = await createContentBlock({
    name: '30-Day Transformation Plan',
    identifier: 'thirty-day-transformation',
    type: 'steps',
    content: {
      title: 'Your 30-Day Transformation Plan',
      subtitle: 'Week by week roadmap to filling your pub',
      items: [
        {
          title: 'Week 1: Immediate Impact',
          description: 'Audit your current customer touchpoints, Fix your Google listing (80% have errors), Create irresistible midweek offers, Launch targeted social media campaigns',
          icon: '1️⃣'
        },
        {
          title: 'Week 2: Building Momentum',
          description: 'Implement proven email sequences, Create events that actually draw crowds, Optimize your menu for profit, Activate dormant customers',
          icon: '2️⃣'
        },
        {
          title: 'Week 3: Scaling Success',
          description: 'Leverage customer testimonials, Build strategic local partnerships, Implement referral systems, Create repeatable success systems',
          icon: '3️⃣'
        },
        {
          title: 'Week 4: Lock In Growth',
          description: 'Analyze what\'s working best, Double down on winners, Create long-term marketing calendar, Build sustainable growth systems',
          icon: '4️⃣'
        }
      ]
    },
    metadata: {
      page: 'empty-pub-solutions',
      section: 'steps',
      order: 1
    }
  });
  if (thirtyDayPlanBlock) emptyPubBlocks.push({ _type: 'reference', _ref: thirtyDayPlanBlock });

  // Real Results block
  const realResultsBlock = await createContentBlock({
    name: 'Empty Pub Real Results',
    identifier: 'empty-pub-results',
    type: 'metrics',
    content: {
      title: 'Real Pubs, Real Results',
      subtitle: 'Transformations we\'ve achieved',
      items: [
        {
          title: 'The White Horse, Surrey',
          description: 'Tuesday nights: From 15-20 covers to 65-80 covers in 6 weeks',
          icon: '📈',
          highlight: true
        },
        {
          title: 'The Crown, Berkshire',
          description: 'Midweek: From 30% capacity to 75% capacity in 30 days',
          icon: '📈',
          highlight: true
        },
        {
          title: 'The Anchor, Stanwell Moor',
          description: 'Dead Monday-Wednesday to Quiz night: 25-35 regulars, Tasting nights: 85% retention in 8 weeks',
          icon: '📈',
          highlight: true
        }
      ]
    },
    metadata: {
      page: 'empty-pub-solutions',
      section: 'metrics',
      order: 2
    }
  });
  if (realResultsBlock) emptyPubBlocks.push({ _type: 'reference', _ref: realResultsBlock });

  // Create the landing page with references
  try {
    const pageWithRefs = {
      ...emptyPubPage,
      faqs: emptyPubFAQIds,
      contentSections: emptyPubBlocks
    };
    await writeClient.create(pageWithRefs);
    console.log('✅ Created Empty Pub Solutions landing page\n');
  } catch (error) {
    console.error('❌ Failed to create Empty Pub Solutions page:', error);
  }

  // 3. PUB MARKETING NO BUDGET PAGE
  console.log('📄 Migrating: Pub Marketing No Budget page...');
  
  const noBudgetPage: LandingPage = {
    _type: 'landingPage',
    title: 'Pub Marketing No Budget',
    slug: { _type: 'slug', current: 'pub-marketing-no-budget' },
    metaDescription: 'No money for marketing? These free strategies filled our pub. Social media, community partnerships, email marketing - all free, all proven to work.',
    keywords: ['free pub marketing', 'no budget marketing', 'pub social media', 'free advertising', 'pub promotion'],
    heroSection: {
      title: 'No Marketing Budget? No Problem.',
      subtitle: 'Free strategies that filled our pub (and will fill yours too)',
      ctaText: 'Show Me How',
      ctaLink: '/contact'
    },
    ctaSettings: {
      primaryCTA: 'Show Me How',
      whatsappMessage: 'Help me market my pub for free',
      showCalculator: false
    },
    isActive: true
  };

  // Create FAQs for No Budget Marketing page
  const noBudgetFAQs = [
    {
      question: "Can I really market my pub without spending money?",
      answer: "Absolutely. The best pub marketing is often free - word of mouth, social media, community partnerships, and email marketing cost nothing but time. We filled The Anchor using mostly free strategies before investing in paid advertising.",
      category: 'general'
    },
    {
      question: "What free marketing works best for pubs?",
      answer: "Social media (especially local Facebook groups), Google My Business optimization, email marketing to existing customers, community partnerships, and creating shareable moments. These strategies consistently outperform paid ads for local pubs.",
      category: 'service'
    },
    {
      question: "How long until free marketing shows results?",
      answer: "Immediate to 30 days. Fixing your Google listing can bring customers tomorrow. Social media posts work within days. Email campaigns see instant results. Community partnerships take 2-4 weeks to build momentum.",
      category: 'results'
    },
    {
      question: "Do I need to be good at social media?",
      answer: "No. Authentic posts outperform polished content for pubs. Phone photos, genuine updates, and community focus work better than professional content. We'll show you simple formulas anyone can follow.",
      category: 'process'
    },
    {
      question: "What if I don't have time for marketing?",
      answer: "15 minutes daily is enough with the right systems. Batch content creation, automation tools, and simple templates mean you can market effectively in less time than counting the till. We'll set up systems that run themselves.",
      category: 'process'
    }
  ];

  const noBudgetFAQIds = [];
  for (let i = 0; i < noBudgetFAQs.length; i++) {
    const faq = noBudgetFAQs[i];
    const faqId = await createFAQ(
      faq.question, 
      faq.answer, 
      faq.category, 
      'pub-marketing-no-budget',
      i + 1
    );
    if (faqId) noBudgetFAQIds.push({ _type: 'reference', _ref: faqId });
  }

  // Create content blocks for No Budget Marketing page
  const noBudgetBlocks = [];
  
  // Free Strategies block
  const freeStrategiesBlock = await createContentBlock({
    name: 'Free Marketing Strategies',
    identifier: 'free-marketing-strategies',
    type: 'features',
    content: {
      title: 'The 4 Free Strategies That Actually Work',
      subtitle: 'Proven methods that cost nothing but generate real results',
      items: [
        {
          title: 'Google My Business',
          description: '1 hour setup = 50% more calls. Complete every section, add photos weekly, post updates regularly, respond to all reviews',
          icon: '📍'
        },
        {
          title: 'Local Facebook Groups',
          description: '15 mins daily = 20+ new customers/week. Join all local groups, share genuinely helpful content, announce events personally, build relationships',
          icon: '📱'
        },
        {
          title: 'Email Marketing',
          description: '1 hour weekly = £500+ per campaign. Collect emails at point of sale, weekly what\'s on emails, VIP offers for subscribers, birthday club automated',
          icon: '📧'
        },
        {
          title: 'Community Partnerships',
          description: '2 hours monthly = 30+ covers per event. Host local groups free, cross-promote with shops, support local causes, become the community hub',
          icon: '🤝'
        }
      ]
    },
    metadata: {
      page: 'pub-marketing-no-budget',
      section: 'features',
      order: 1
    }
  });
  if (freeStrategiesBlock) noBudgetBlocks.push({ _type: 'reference', _ref: freeStrategiesBlock });

  // Weekly Plan block
  const weeklyPlanBlock = await createContentBlock({
    name: 'Weekly Marketing Plan',
    identifier: 'weekly-marketing-plan',
    type: 'steps',
    content: {
      title: 'Your 7-Day Free Marketing Plan',
      subtitle: 'Just 15 minutes a day keeps empty tables away',
      items: [
        {
          title: 'Monday',
          description: 'Post week\'s events on Facebook (10 mins) - Sets tone for busy week',
          icon: '📅'
        },
        {
          title: 'Tuesday',
          description: 'Email newsletter to database (20 mins) - £300-500 in bookings',
          icon: '📧'
        },
        {
          title: 'Wednesday',
          description: 'Update Google My Business (5 mins) - Stay top of search',
          icon: '📍'
        },
        {
          title: 'Thursday',
          description: 'Weekend hype on socials (10 mins) - Build anticipation',
          icon: '📱'
        },
        {
          title: 'Friday',
          description: 'Share customer photos/stories (5 mins) - Social proof working',
          icon: '📸'
        },
        {
          title: 'Saturday',
          description: 'Capture content for next week (Throughout shift) - Authentic content bank',
          icon: '📷'
        },
        {
          title: 'Sunday',
          description: 'Plan next week\'s content (15 mins) - Stay organized',
          icon: '📝'
        }
      ]
    },
    metadata: {
      page: 'pub-marketing-no-budget',
      section: 'steps',
      order: 2
    }
  });
  if (weeklyPlanBlock) noBudgetBlocks.push({ _type: 'reference', _ref: weeklyPlanBlock });

  // Create the landing page with references
  try {
    const pageWithRefs = {
      ...noBudgetPage,
      faqs: noBudgetFAQIds,
      contentSections: noBudgetBlocks
    };
    await writeClient.create(pageWithRefs);
    console.log('✅ Created Pub Marketing No Budget landing page\n');
  } catch (error) {
    console.error('❌ Failed to create Pub Marketing No Budget page:', error);
  }

  // 4. QUIET MIDWEEK SOLUTIONS PAGE
  console.log('📄 Migrating: Quiet Midweek Solutions page...');
  
  const midweekPage: LandingPage = {
    _type: 'landingPage',
    title: 'Quiet Midweek Solutions',
    slug: { _type: 'slug', current: 'quiet-midweek-solutions' },
    metaDescription: 'Transform dead weeknights into profitable nights. Proven strategies that took pubs from 20% to 70% capacity Monday-Thursday. Real results in 30 days.',
    keywords: ['quiet midweek', 'tuesday night pub', 'midweek offers', 'empty weeknights', 'pub events'],
    heroSection: {
      title: 'Monday to Thursday: From Ghost Town to Gold Mine',
      subtitle: 'Stop bleeding money on quiet nights. Proven system fills tables midweek.',
      ctaText: 'Get My Midweek Plan',
      ctaLink: '/contact'
    },
    ctaSettings: {
      primaryCTA: 'Get My Midweek Plan',
      whatsappMessage: 'Help me fix my quiet midweek nights',
      showCalculator: true
    },
    isActive: true
  };

  // Create FAQs for Quiet Midweek Solutions page
  const midweekFAQs = [
    {
      question: "Why is my pub so quiet Monday to Thursday?",
      answer: "Most pubs rely on weekend trade and hope midweek 'sorts itself out'. It won't. Quiet weeknights need specific strategies: targeted offers, the right events, and messaging that gives people a reason to leave the house on a Tuesday.",
      category: 'general'
    },
    {
      question: "What events actually work for midweek?",
      answer: "Quiz nights (done right) can pull 60-100 people. Steak nights, curry clubs, and wine tastings work brilliantly. The key is consistency, proper promotion, and making it unmissable. We'll show you exactly how.",
      category: 'service'
    },
    {
      question: "How much revenue am I losing on quiet nights?",
      answer: "A pub doing 20 covers on a Tuesday instead of 60 loses £1,200 that night. Over a month, that's £4,800. Over a year? £57,600 in lost revenue just from Tuesday nights alone.",
      category: 'pricing'
    },
    {
      question: "Will discounting hurt my weekend trade?",
      answer: "No, if done correctly. Smart midweek offers bring in different customers at different times. We'll show you how to create compelling offers that fill quiet periods without cannibalizing busy times.",
      category: 'pricing'
    },
    {
      question: "How quickly will I see midweek improvements?",
      answer: "Most pubs see 30-50% increase in midweek covers within 2 weeks. By week 4, you should be at 60-70% capacity on previously dead nights. The Anchor went from 20 to 85 people for Tuesday quiz in 6 weeks.",
      category: 'results'
    }
  ];

  const midweekFAQIds = [];
  for (let i = 0; i < midweekFAQs.length; i++) {
    const faq = midweekFAQs[i];
    const faqId = await createFAQ(
      faq.question, 
      faq.answer, 
      faq.category, 
      'quiet-midweek-solutions',
      i + 1
    );
    if (faqId) midweekFAQIds.push({ _type: 'reference', _ref: faqId });
  }

  // Create content blocks for Quiet Midweek Solutions page
  const midweekBlocks = [];
  
  // Midweek Strategies block
  const midweekStrategiesBlock = await createContentBlock({
    name: 'Midweek Winning Strategies',
    identifier: 'midweek-strategies',
    type: 'features',
    content: {
      title: 'Midweek Strategies That Actually Work',
      subtitle: 'Turn your quietest nights into your most profitable',
      items: [
        {
          title: 'Monday: Special Theme Night',
          description: '50% off for hospitality workers - Builds loyal following, word spreads fast',
          icon: '🍻'
        },
        {
          title: 'Tuesday: Quiz Night Done Right',
          description: '£50 winner, free entry, food deals - 25-35 regular attendees',
          icon: '🧠'
        },
        {
          title: 'Wednesday: Steak & Wine Night',
          description: '2 steaks + bottle for £45 - Books out 3 weeks in advance',
          icon: '🥩'
        },
        {
          title: 'Thursday: Curry Club',
          description: '£12.95 curry + pint special - 60+ covers, becoming the curry spot',
          icon: '🍛'
        }
      ]
    },
    metadata: {
      page: 'quiet-midweek-solutions',
      section: 'features',
      order: 1
    }
  });
  if (midweekStrategiesBlock) midweekBlocks.push({ _type: 'reference', _ref: midweekStrategiesBlock });

  // Cost of Empty Nights block
  const costOfEmptyBlock = await createContentBlock({
    name: 'Cost of Empty Midweek',
    identifier: 'cost-of-empty-midweek',
    type: 'metrics',
    content: {
      title: 'What Quiet Midweeks Really Cost You',
      subtitle: 'The shocking truth about empty Monday-Thursday nights',
      items: [
        {
          title: 'Lost Revenue',
          description: '£1,200 per quiet night',
          icon: '💸',
          highlight: true
        },
        {
          title: 'Wasted Staff Costs',
          description: '£180 per quiet night',
          icon: '💸',
          highlight: true
        },
        {
          title: 'Fixed Overheads',
          description: '£150 still paid regardless',
          icon: '💸',
          highlight: true
        },
        {
          title: 'Total Annual Loss',
          description: '£57,600 per year (just Tuesdays!)',
          icon: '🔴',
          highlight: true
        }
      ]
    },
    metadata: {
      page: 'quiet-midweek-solutions',
      section: 'metrics',
      order: 2
    }
  });
  if (costOfEmptyBlock) midweekBlocks.push({ _type: 'reference', _ref: costOfEmptyBlock });

  // Create the landing page with references
  try {
    const pageWithRefs = {
      ...midweekPage,
      faqs: midweekFAQIds,
      contentSections: midweekBlocks
    };
    await writeClient.create(pageWithRefs);
    console.log('✅ Created Quiet Midweek Solutions landing page\n');
  } catch (error) {
    console.error('❌ Failed to create Quiet Midweek Solutions page:', error);
  }

  // 5. PUB RESCUE PAGE
  console.log('📄 Migrating: Pub Rescue page...');
  
  const pubRescuePage: LandingPage = {
    _type: 'landingPage',
    title: 'Pub Rescue',
    slug: { _type: 'slug', current: 'pub-rescue' },
    metaDescription: 'Struggling pub? Get emergency help now. From empty Tuesday nights to staff crises, we provide immediate solutions that work. 30-day money-back guarantee.',
    keywords: ['pub rescue', 'struggling pub', 'pub emergency', 'pub crisis', 'pub help'],
    heroSection: {
      title: 'Pub Rescue Emergency Service',
      subtitle: 'When your pub is in crisis, you need help NOW. Not next month.',
      ctaText: 'Get Emergency Pub Help Now',
      ctaLink: '/contact'
    },
    ctaSettings: {
      primaryCTA: 'Get Emergency Pub Help Now',
      whatsappMessage: 'Peter, my pub needs urgent help with [describe your crisis]',
      showCalculator: false
    },
    isActive: true
  };

  // Create FAQs for Pub Rescue page
  const pubRescueFAQs = [
    {
      question: "How quickly can you help my struggling pub?",
      answer: "I typically respond within 2 hours during the day. We can have an initial chat about your problems today, and I'll often send you 2-3 quick wins you can implement immediately - no charge. Full support packages can start within days.",
      category: 'process'
    },
    {
      question: "What if I can't afford consultancy fees right now?",
      answer: "I get it - when the pub's struggling, every penny counts. We charge £62.50 per hour plus VAT, working flexibly with your budget. Most strategies pay for themselves in the first weekend. Plus, I'll often share free tips during our first chat because I hate seeing pubs struggle.",
      category: 'pricing'
    },
    {
      question: "Do you really understand what I'm going through?",
      answer: "Absolutely. The Anchor was in terrible physical state when we took over in March 2019 - leaking roof, no insulation, paper rotas. We've dealt with everything: staff walking out mid-shift, supplier nightmares, fierce competition. That's why Orange Jelly exists - to help you avoid our mistakes.",
      category: 'general'
    },
    {
      question: "What's your success rate with pub turnarounds?",
      answer: "We've helped transform pubs from empty to thriving. Our own pub, The Anchor, went from 45 to 65 Sunday covers and doubled Tuesday night revenue. Every strategy we recommend has been tested in real pub conditions.",
      category: 'results'
    },
    {
      question: "How is Orange Jelly different from other consultants?",
      answer: "I'm not a consultant - I'm a licensee who runs a pub every day. No suits, no PowerPoints, no corporate jargon. Just practical help from someone who understands because I'm dealing with the same challenges. Plus, we use AI to save time on the boring bits.",
      category: 'general'
    },
    {
      question: "What if your solutions don't work for my pub?",
      answer: "Every pub is different, which is why we offer a 30-day money-back guarantee. If you don't see improved results within 30 days, you get a full refund. But honestly, the strategies work because they're based on real pub experience, not theory.",
      category: 'results'
    }
  ];

  const pubRescueFAQIds = [];
  for (let i = 0; i < pubRescueFAQs.length; i++) {
    const faq = pubRescueFAQs[i];
    const faqId = await createFAQ(
      faq.question, 
      faq.answer, 
      faq.category, 
      'pub-rescue',
      i + 1
    );
    if (faqId) pubRescueFAQIds.push({ _type: 'reference', _ref: faqId });
  }

  // Create content blocks for Pub Rescue page
  const pubRescueBlocks = [];
  
  // Emergency Categories block
  const emergencyCategoriesBlock = await createContentBlock({
    name: 'Pub Emergency Categories',
    identifier: 'pub-emergency-categories',
    type: 'problems',
    content: {
      title: 'What\'s Your Biggest Emergency Right Now?',
      subtitle: 'Click your most urgent problem for immediate help',
      items: [
        {
          title: 'Empty Pub Emergency',
          description: 'Dead weeknights killing your business. Average pub loses £2,000/month from empty nights.',
          icon: '🏚️'
        },
        {
          title: 'No Bookings Crisis',
          description: 'Phone stopped ringing for bookings. Every empty table costs you £45 in lost revenue.',
          icon: '📵'
        },
        {
          title: 'Food Sales Disaster',
          description: 'Kitchen running at a loss. Poor menu design costs £500/week in lost profit.',
          icon: '🍽️'
        },
        {
          title: 'Staff Nightmare',
          description: 'Can\'t find or keep good staff. Staff turnover costs £3,000 per person.',
          icon: '😰'
        },
        {
          title: 'Cost Crisis',
          description: 'Bills eating all the profit. Most pubs overspend by 15-20% without knowing.',
          icon: '💸'
        },
        {
          title: 'Marketing Chaos',
          description: 'No time for social media or marketing. Silent pubs stay empty - costs £1,500/month.',
          icon: '📱'
        },
        {
          title: 'Losing to Competition',
          description: 'Other pubs stealing your customers. Every lost regular costs £2,400/year.',
          icon: '⚔️'
        },
        {
          title: 'Owner Burnout Crisis',
          description: 'Working yourself into the ground. Burnout leads to mistakes that cost thousands.',
          icon: '🔥'
        }
      ]
    },
    metadata: {
      page: 'pub-rescue',
      section: 'problems',
      order: 1
    }
  });
  if (emergencyCategoriesBlock) pubRescueBlocks.push({ _type: 'reference', _ref: emergencyCategoriesBlock });

  // Rescue Method block
  const rescueMethodBlock = await createContentBlock({
    name: 'Pub Rescue Method',
    identifier: 'pub-rescue-method',
    type: 'steps',
    content: {
      title: 'The Orange Jelly Pub Rescue Method',
      subtitle: 'Proven process that transforms struggling pubs',
      items: [
        {
          title: 'Week 1: Emergency Triage',
          description: 'Identify what\'s bleeding money RIGHT NOW. Find the biggest leaks and plug them fast. Usually saves £500+ in first week.',
          icon: '📊'
        },
        {
          title: 'Week 2-3: Quick Wins',
          description: 'Launch must-attend midweek events, fix your Google presence, rewrite menu for £7+ higher spend, start social media that works.',
          icon: '🚀'
        },
        {
          title: 'Week 4: Momentum Building',
          description: 'Automate marketing (save 5+ hours/week), build customer database, train team on upselling, create systems so it runs without you.',
          icon: '📈'
        },
        {
          title: 'Month 2+: Sustainable Success',
          description: 'Monthly check-ins to maintain momentum, seasonal campaign planning, advanced growth strategies, working less and earning more.',
          icon: '🎯'
        }
      ]
    },
    metadata: {
      page: 'pub-rescue',
      section: 'steps',
      order: 2
    }
  });
  if (rescueMethodBlock) pubRescueBlocks.push({ _type: 'reference', _ref: rescueMethodBlock });

  // Create the landing page with references
  try {
    const pageWithRefs = {
      ...pubRescuePage,
      faqs: pubRescueFAQIds,
      contentSections: pubRescueBlocks
    };
    await writeClient.create(pageWithRefs);
    console.log('✅ Created Pub Rescue landing page\n');
  } catch (error) {
    console.error('❌ Failed to create Pub Rescue page:', error);
  }

  console.log('\n✨ Migration complete!');
  console.log('📝 Summary:');
  console.log('  - 5 landing pages created');
  console.log('  - 25 FAQs created');
  console.log('  - 10 content blocks created');
  console.log('\n🎯 Next steps:');
  console.log('  1. Check the Sanity Studio to verify all content');
  console.log('  2. Update the landing page components to fetch from Sanity');
  console.log('  3. Test each landing page thoroughly');
}

// Run the migration
migrateLandingPages()
  .then(() => {
    console.log('\n✅ All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  });