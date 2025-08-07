import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

// Pub Rescue Page Content
const pubRescueContent = {
  _type: 'landingPageContent',
  _id: 'landing-pub-rescue',
  slug: { current: 'pub-rescue' },
  title: 'Pub Rescue',
  heroSection: {
    title: 'Pub Rescue Emergency Service',
    subtitle: 'When your pub is in crisis, you need help NOW. Not next month.',
    ctaText: 'URGENT: I need help with my pub NOW',
    bottomText: 'I\'ll do my best to respond quickly',
  },
  emergencyCategories: [
    {
      _key: 'empty-nights',
      icon: '🏚️',
      title: 'Empty Pub Emergency',
      items: [
        'Dead weeknights killing your business',
        'Tuesday/Wednesday nights are graveyards',
        'Dining room sits half empty at peak times',
        'Events not pulling crowds anymore',
        'Locals stopped coming in',
      ],
    },
    {
      _key: 'no-bookings',
      icon: '📵',
      title: 'No Bookings Crisis',
      items: [
        'Phone stopped ringing for bookings',
        'Christmas bookings down on last year',
        'Sunday roasts not selling out',
        'Functions going to competitors',
        'Walk-ins only, no advance bookings',
      ],
    },
    {
      _key: 'food-sales',
      icon: '🍽️',
      title: 'Food Sales Disaster',
      items: [
        'Kitchen running at a loss',
        'Food GP below 65%',
        'Customers only ordering chips',
        'Specials not selling',
        'Kitchen costs out of control',
      ],
    },
    {
      _key: 'staff-chaos',
      icon: '😰',
      title: 'Staff Nightmare',
      items: [
        'Can\'t find or keep good staff',
        'Doing 70+ hour weeks yourself',
        'Staff leaving after 3 months',
        'No applicants for job ads',
        'Training eating all your time',
      ],
    },
    {
      _key: 'costs-rising',
      icon: '💸',
      title: 'Cost Crisis',
      items: [
        'Bills eating all the profit',
        'Energy bills through the roof',
        'Supplier prices keep rising',
        'Wage costs unsustainable',
        'Breaking even at best',
      ],
    },
    {
      _key: 'marketing-overwhelm',
      icon: '📱',
      title: 'Marketing Chaos',
      items: [
        'No time for social media or marketing',
        'Haven\'t posted in weeks',
        'No email list or it\'s dead',
        'Don\'t know what to post',
        'Marketing feels pointless',
      ],
    },
    {
      _key: 'competition',
      icon: '⚔️',
      title: 'Losing to Competition',
      items: [
        'Other pubs stealing your customers',
        'New pub opened and took regulars',
        'Chain pubs undercutting prices',
        'Lost quiz team to rival',
        'Can\'t compete with their offers',
      ],
    },
    {
      _key: 'no-events',
      icon: '🎭',
      title: 'Event Flops',
      items: [
        'Events not bringing in crowds',
        'Quiz night down to 20 people',
        'Live music playing to empty room',
        'Themed nights flopping',
        'Same faces, no new customers',
      ],
    },
    {
      _key: 'online-invisible',
      icon: '🔍',
      title: 'Can\'t Be Found Online',
      items: [
        'Invisible on Google and social media',
        'Not showing on Google Maps',
        'Bad reviews killing business',
        'Website looks amateur (or none)',
        'Facebook page is dead',
      ],
    },
    {
      _key: 'burnout',
      icon: '🔥',
      title: 'Owner Burnout Crisis',
      items: [
        'Working yourself into the ground',
        'Haven\'t had a day off in months',
        'Family never sees you',
        'Everything is on your shoulders',
        'Starting to hate the business',
      ],
    },
  ],
  timeline: [
    {
      _key: 'week1',
      week: 'Week 1',
      title: 'Emergency Triage',
      description: 'Stop the bleeding',
      actions: [
        'Identify biggest revenue leaks',
        'Quick wins to implement today',
        'Emergency marketing push',
        'Staff schedule optimization',
      ],
    },
    {
      _key: 'week2',
      week: 'Week 2',
      title: 'Stabilization',
      description: 'Get systems working',
      actions: [
        'Menu engineering for profit',
        'Social media revival',
        'Customer database building',
        'Cost reduction audit',
      ],
    },
    {
      _key: 'week3',
      week: 'Weeks 3-4',
      title: 'Recovery',
      description: 'Build momentum',
      actions: [
        'Events that actually work',
        'Staff training systems',
        'Automated marketing',
        'Regular customer program',
      ],
    },
    {
      _key: 'week4',
      week: 'Month 2+',
      title: 'Growth',
      description: 'Sustainable success',
      actions: [
        'Expansion strategies',
        'New revenue streams',
        'Team building',
        'Long-term planning',
      ],
    },
  ],
  faqs: [
    {
      _key: 'faq1',
      question: 'How quickly can you help my struggling pub?',
      answer: 'I typically respond within 2 hours during the day. We can have an initial chat about your problems today, and I\'ll often send you 2-3 quick wins you can implement immediately - no charge. Full support packages can start within days.',
    },
    {
      _key: 'faq2',
      question: 'What if I can\'t afford consultancy fees right now?',
      answer: 'I get it - when the pub\'s struggling, every penny counts. We charge £62.50 per hour plus VAT, working flexibly with your budget. Most strategies pay for themselves in the first weekend. Plus, I\'ll often share free tips during our first chat because I hate seeing pubs struggle.',
    },
    {
      _key: 'faq3',
      question: 'Do you really understand what I\'m going through?',
      answer: 'Absolutely. The Anchor was in terrible physical state when we took over in March 2019 - leaking roof, no insulation, paper rotas. We\'ve dealt with everything: staff walking out mid-shift, supplier nightmares, fierce competition. That\'s why Orange Jelly exists - to help you avoid our mistakes.',
    },
    {
      _key: 'faq4',
      question: 'What\'s your success rate with pub turnarounds?',
      answer: 'We\'ve helped transform pubs from empty to thriving. Our own pub, The Anchor, went from 45 to 65 Sunday covers and doubled Tuesday night revenue. Every strategy we recommend has been tested in real pub conditions.',
    },
    {
      _key: 'faq5',
      question: 'How is Orange Jelly different from other consultants?',
      answer: 'I\'m not a consultant - I\'m a licensee who runs a pub every day. No suits, no PowerPoints, no corporate jargon. Just practical help from someone who understands because I\'m dealing with the same challenges. Plus, we use AI to save time on the boring bits.',
    },
    {
      _key: 'faq6',
      question: 'What if your solutions don\'t work for my pub?',
      answer: 'Every pub is different, which is why we offer a 30-day money-back guarantee. If you don\'t see improved results within 30 days, you get a full refund. But honestly, the strategies work because they\'re based on real pub experience, not theory.',
    },
  ],
  successMetrics: {
    title: 'Recovery Metrics',
    metrics: [
      {
        _key: 'metric1',
        value: '7-14 days',
        label: 'To see first results',
        description: 'Quick wins implemented immediately',
      },
      {
        _key: 'metric2',
        value: '£2,000+',
        label: 'Average monthly savings',
        description: 'From cost optimization and waste reduction',
      },
      {
        _key: 'metric3',
        value: '25-35%',
        label: 'Revenue increase',
        description: 'Within 90 days of implementation',
      },
      {
        _key: 'metric4',
        value: '25 hours',
        label: 'Saved per week',
        description: 'Through automation and systems',
      },
    ],
  },
  seo: {
    metaTitle: 'Pub Rescue - Emergency Help for Struggling UK Pubs',
    metaDescription: 'Struggling pub? Get emergency help now. From empty Tuesday nights to staff crises, we provide immediate solutions that work. 30-day money-back guarantee.',
  },
};

// Contact Page FAQs
const contactFAQs = [
  {
    _type: 'contactFAQ',
    _id: 'contact-faq-1',
    question: "I'm losing money every day - how quickly can you help?",
    answer: "I understand the urgency - every day matters when you're bleeding money. WhatsApp me right now and I'll respond within hours (or after service if I'm behind the bar). We can often implement quick wins within days that start stemming losses immediately. Our Empty Pub Recovery Package shows results within 7-14 days.",
    category: 'urgent',
    order: 1,
    active: true,
  },
  {
    _type: 'contactFAQ',
    _id: 'contact-faq-2',
    question: "My pub is in crisis - can we talk today?",
    answer: "Absolutely. WhatsApp me at 07941 266538 - I check messages constantly. If you need immediate help, mark your message as URGENT and I'll prioritise it. I've been where you are, and I know that feeling of desperation. Let's talk solutions today.",
    category: 'urgent',
    order: 2,
    active: true,
  },
  {
    _type: 'contactFAQ',
    _id: 'contact-faq-3',
    question: "I messaged but haven't heard back - did you get it?",
    answer: "I personally read every message! If I haven't replied within 4 hours, I'm likely in service. I always respond by end of day. If it's been longer, please message again - technology sometimes fails. Never worry about 'bothering' me - helping pubs is what I do.",
    category: 'contact',
    order: 3,
    active: true,
  },
  {
    _type: 'contactFAQ',
    _id: 'contact-faq-4',
    question: "What's the best way to contact Orange Jelly for urgent help?",
    answer: "WhatsApp is fastest - 07941 266538. I see messages immediately even during service. For urgent situations, start your message with URGENT. Phone calls work too, but if I'm serving, WhatsApp ensures I see your message and can respond as soon as I'm free.",
    category: 'contact',
    order: 4,
    active: true,
  },
  {
    _type: 'contactFAQ',
    _id: 'contact-faq-5',
    question: "Can I speak to someone who actually understands pub problems?",
    answer: "That's exactly what you get! I'm Peter, I run The Anchor pub. When you message, you're talking to someone who's dealt with staff walking out mid-shift, empty Tuesday nights, and supplier nightmares. No call centre, no junior staff - just one licensee helping another.",
    category: 'about',
    order: 5,
    active: true,
  },
  {
    _type: 'contactFAQ',
    _id: 'contact-faq-6',
    question: "I work crazy hours - when can I actually reach you?",
    answer: "That's pub life! Message me anytime - 3am stocktake, 6am delivery, Sunday afternoon crisis. I get it. WhatsApp me whenever suits you. I might be serving too, but I always respond within hours. We'll find a time to talk properly that works for both of us.",
    category: 'contact',
    order: 6,
    active: true,
  },
  {
    _type: 'contactFAQ',
    _id: 'contact-faq-7',
    question: "I hate pushy sales calls - will you pressure me?",
    answer: "Never. I'm a licensee, not a salesperson. When we chat, I'll listen to your problems and share what worked for us. If I can help, great. If not, I might know someone who can. No scripts, no pressure - just honest conversation about saving your pub.",
    category: 'about',
    order: 7,
    active: true,
  },
  {
    _type: 'contactFAQ',
    _id: 'contact-faq-8',
    question: "Can I visit before committing to anything?",
    answer: "Please do! Come to The Anchor and see everything in action. Watch how we use the tools, chat with Billy, see our results firsthand. First pint's on me. Seeing is believing - I'd rather show you than tell you. We're in Stanwell Moor, TW19 6AQ.",
    category: 'location',
    order: 8,
    active: true,
  },
  {
    _type: 'contactFAQ',
    _id: 'contact-faq-9',
    question: "What if I need help outside normal hours?",
    answer: "'Normal hours' don't exist in hospitality! Message me whenever you need help. Having a 3am panic about tomorrow's event? Send that message. Sunday staff crisis? I'm here. I run a pub too - I know problems don't wait for business hours.",
    category: 'contact',
    order: 9,
    active: true,
  },
  {
    _type: 'contactFAQ',
    _id: 'contact-faq-10',
    question: "I'm not in your area - can you still help?",
    answer: "Absolutely! We help pubs across the UK. Marketing, menu design, business analysis, and AI training all work remotely. We use video calls, screen sharing, and good old phone calls. Distance isn't a barrier - I'm helping pubs from Cornwall to Scotland.",
    category: 'services',
    order: 10,
    active: true,
  },
  {
    _type: 'contactFAQ',
    _id: 'contact-faq-11',
    question: "What if I just need 10 minutes of advice?",
    answer: "That's fine! Quick questions are welcome. Sometimes 10 minutes of good advice can save hours of stress. Message me your question - if it's genuinely quick, I'll help right away. If it needs more time, we'll arrange a proper chat.",
    category: 'services',
    order: 11,
    active: true,
  },
  {
    _type: 'contactFAQ',
    _id: 'contact-faq-12',
    question: "How do I know you'll actually respond?",
    answer: "Because I'm not a big company - I'm one person who genuinely cares about helping pubs survive. Every message comes directly to my phone. I've been ghosted by suppliers and consultants too - I won't do that to you. You'll always get a response, even if it's just to say I'm in service and will call back later.",
    category: 'about',
    order: 12,
    active: true,
  },
];

// Testimonials
const testimonials = [
  {
    _type: 'testimonial',
    _id: 'testimonial-1',
    name: 'Sarah Mitchell',
    role: 'Landlady',
    pubName: 'The Red Lion',
    location: 'Surrey',
    testimonialType: 'video',
    quote: 'Peter\'s Empty Pub Recovery Package saved us. We went from 20% capacity on weeknights to nearly full. The AI tools handle our marketing while we focus on service.',
    highlight: 'From 20% to 90% capacity',
    featured: true,
    order: 1,
    publishedAt: new Date('2024-10-15').toISOString(),
  },
  {
    _type: 'testimonial',
    _id: 'testimonial-2',
    name: 'Tom Bradley',
    role: 'Owner',
    pubName: 'The Kings Arms',
    location: 'Berkshire',
    testimonialType: 'video',
    quote: 'We were ready to give up. Orange Jelly showed us how to add £15k monthly revenue without working harder. The menu psychology alone paid for everything.',
    highlight: '£15k monthly revenue increase',
    featured: true,
    order: 2,
    publishedAt: new Date('2024-11-01').toISOString(),
  },
  {
    _type: 'testimonial',
    _id: 'testimonial-3',
    name: 'Emma Thompson',
    role: 'Licensee',
    pubName: 'The White Horse',
    location: 'West London',
    testimonialType: 'video',
    quote: 'Finally, someone who gets it! Not corporate nonsense, just real advice from someone behind a bar. Quiz night went from 25 to 50+ people.',
    highlight: 'Quiz night doubled',
    featured: true,
    order: 3,
    publishedAt: new Date('2024-09-20').toISOString(),
  },
];

// Results Page Metrics
const resultsMetrics = {
  _type: 'resultsMetrics',
  _id: 'results-metrics-main',
  title: 'Results Page Metrics',
  metricsSection: {
    sectionTitle: 'The Numbers Don\'t Lie',
    metrics: [
      {
        _key: 'foodgp',
        value: '71%',
        label: 'Food GP',
        highlight: true,
      },
      {
        _key: 'quiz',
        value: '25-35',
        label: 'Quiz Regulars',
        highlight: true,
      },
      {
        _key: 'savings',
        value: '£250',
        label: 'Weekly Savings',
        highlight: false,
      },
      {
        _key: 'views',
        value: '70k',
        label: 'Monthly Views',
        highlight: false,
      },
    ],
  },
  heroContent: {
    title: 'Pubs That Were Empty. Now They\'re Not.',
    subtitle: 'Real results from The Anchor. No fluff, just numbers and strategies that actually work.',
  },
  trustSection: {
    title: 'These Aren\'t Just Case Studies',
    content: [
      {
        _type: 'block',
        _key: 'trust1',
        style: 'normal',
        children: [{
          _type: 'span',
          _key: 'span1',
          text: 'Every strategy, every number, every result comes from our own pub. We\'ve tested it all at The Anchor first. The failures taught us what to avoid. The successes showed us what to share.',
        }],
      },
      {
        _type: 'block',
        _key: 'trust2',
        style: 'normal',
        children: [{
          _type: 'span',
          _key: 'span2',
          text: 'When you work with Orange Jelly, you\'re getting proven strategies from someone who\'s been in your shoes and found a way out.',
        }],
      },
    ],
  },
  ctaSection: {
    title: 'Let\'s Fix Your Biggest Problem First',
    subtitle: 'Tell me what\'s killing your business. I\'ll share exactly how we solved it at The Anchor.',
  },
  active: true,
};

// 404 Error Page
const errorPage404 = {
  _type: 'errorPage',
  _id: 'error-404',
  pageType: '404',
  title: 'Oops! That Page Went to the Cellar',
  subtitle: 'Like a rogue barrel, this page has rolled away.',
  message: 'Don\'t worry - we\'ve all been lost in a pub before. Let\'s get you back on track. The page you\'re looking for might have moved, been renamed, or is taking a well-deserved break. Unlike your pub problems, this one\'s easy to fix!',
  ctaText: 'Back to the Bar',
  suggestedLinks: [
    {
      _key: 'link1',
      icon: '🏚️',
      title: 'Empty Pub Solutions',
      description: 'Turn those quiet nights into profit.',
      link: '/empty-pub-solutions',
      buttonText: 'Fill My Pub',
    },
    {
      _key: 'link2',
      icon: '📱',
      title: 'Marketing That Works',
      description: 'Get customers through the door without the hassle.',
      link: '/services',
      buttonText: 'Start Marketing',
    },
    {
      _key: 'link3',
      icon: '💰',
      title: 'Save Your Pub',
      description: 'Emergency help for struggling venues.',
      link: '/pub-rescue',
      buttonText: 'Get Help Now',
    },
  ],
  contactSection: {
    title: 'Still Lost? Let\'s Chat',
    message: 'Tell me what you were looking for and I\'ll point you in the right direction. Or better yet, tell me about your pub challenges and I\'ll share how we solved them at The Anchor.',
    showWhatsApp: true,
  },
  active: true,
};

async function migrateContent() {
  console.log('🚀 Starting landing page content migration...\n');

  try {
    // Migrate Pub Rescue Content
    console.log('📄 Migrating Pub Rescue landing page...');
    await client.createOrReplace(pubRescueContent);
    console.log('✅ Pub Rescue content migrated');

    // Migrate Contact FAQs
    console.log('\n💬 Migrating Contact FAQs...');
    for (const faq of contactFAQs) {
      await client.createOrReplace(faq);
    }
    console.log(`✅ ${contactFAQs.length} Contact FAQs migrated`);

    // Migrate Testimonials
    console.log('\n⭐ Migrating Testimonials...');
    for (const testimonial of testimonials) {
      await client.createOrReplace(testimonial);
    }
    console.log(`✅ ${testimonials.length} Testimonials migrated`);

    // Migrate Results Metrics
    console.log('\n📊 Migrating Results Page Metrics...');
    await client.createOrReplace(resultsMetrics);
    console.log('✅ Results metrics migrated');

    // Migrate 404 Page
    console.log('\n⚠️ Migrating 404 Error Page...');
    await client.createOrReplace(errorPage404);
    console.log('✅ 404 page content migrated');

    console.log('\n✨ All landing page content migrated successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrateContent();