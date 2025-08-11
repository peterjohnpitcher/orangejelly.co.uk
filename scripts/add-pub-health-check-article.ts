#!/usr/bin/env npx tsx
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
});

// Helper to convert text to Portable Text blocks
function textToBlock(text: string, style: string = 'normal'): any {
  return {
    _type: 'block',
    _key: `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    style,
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: `span_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        text,
        marks: [],
      },
    ],
  };
}

// Helper to create a list block
function createListBlock(items: string[], listType: 'bullet' | 'number'): any[] {
  return items.map((item, index) => ({
    _type: 'block',
    _key: `list_${Date.now()}_${index}`,
    style: 'normal',
    listItem: listType,
    level: 1,
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: `span_${Date.now()}_${index}`,
        text: item,
        marks: [],
      },
    ],
  }));
}

async function createPubHealthCheckArticle() {
  console.log('Creating Pub Health Check article...');

  // First, get the reference to the author (Peter Pitcher)
  const authorQuery = `*[_type == "author" && name match "Peter*"][0]._id`;
  const authorId = await client.fetch(authorQuery);

  // Get the reference to a relevant category
  const categoryQuery = `*[_type == "category" && title match "*Management*"][0]._id`;
  const categoryId = await client.fetch(categoryQuery);

  const article = {
    _type: 'blogPost',
    title: 'The Pub Health Check: Essential Fundamentals for Licensee Success',
    slug: {
      current: 'pub-health-check-essential-fundamentals-licensee-success',
    },
    status: 'published',
    excerpt:
      "A comprehensive guide to assessing your pub's business health, covering the 7 P's of marketing, financial metrics, cellar management, and community engagement strategies that every licensee needs to know.",

    // Quick Answer for Featured Snippets
    quickAnswer:
      'A pub health check assesses key business fundamentals including gross profit margins (target 45-55%), wet/dry sales mix, wastage control (keep below 5%), cellar management, and community engagement. Regular monitoring of these metrics helps identify opportunities to save thousands annually and build a sustainable business.',

    // Voice Search Queries
    voiceSearchQueries: [
      'How do I check if my pub is healthy?',
      'What metrics should I track for my pub?',
      'How can I reduce wastage in my pub?',
      'What is a good GP percentage for a pub?',
      'How often should I clean beer lines?',
    ],

    // Quick Stats
    quickStats: [
      { label: 'Target GP%', value: '45-55%', highlight: true },
      { label: 'Wastage Target', value: 'Below 5%', highlight: false },
      { label: 'Annual Savings', value: '£14,000-£27,000', highlight: true },
      { label: 'Line Cleaning', value: 'Weekly', highlight: false },
    ],

    // Main Content
    content: [
      textToBlock(
        'Running a successful pub in 2024 requires more than just pulling pints and hoping for the best. With rising costs, changing customer habits, and increased competition, understanding your business fundamentals has never been more critical. This comprehensive health check framework will help you assess where you stand and identify opportunities for improvement.',
        'normal'
      ),

      textToBlock('', 'normal'), // Empty line for spacing

      textToBlock(
        "Whether you're a seasoned licensee or new to the trade, regularly reviewing these essential metrics and strategies can mean the difference between struggling to survive and building a thriving community hub. Let's dive into the key areas that determine your pub's health.",
        'normal'
      ),

      textToBlock('', 'normal'),

      textToBlock("Part 1: The 7 P's Framework - Your Marketing Foundation", 'h2'),

      textToBlock(
        "The 7 P's of marketing provide a structured approach to evaluating and improving your pub's market position. Originally developed for service industries, this framework is perfectly suited to the hospitality sector.",
        'normal'
      ),

      textToBlock('', 'normal'),

      textToBlock("Product - What You're Really Selling", 'h3'),

      textToBlock(
        'Your product extends far beyond the drinks you serve. Consider your entire offering:',
        'normal'
      ),

      ...createListBlock(
        [
          'Wet sales: Your beer range, wine selection, spirits, and soft drinks',
          'Dry sales: Food menu, snacks, and retail items',
          'Entertainment: Quiz nights, live music, sports screenings',
          'Atmosphere: The experience and environment you create',
          'Community role: Your pub as a social hub and meeting place',
        ],
        'bullet'
      ),

      textToBlock('', 'normal'),

      textToBlock(
        'Regularly audit your product mix. Are you offering what your customers actually want, or what you think they want? Survey your regulars, monitor what sells, and be prepared to adapt.',
        'normal'
      ),

      textToBlock('', 'normal'),

      textToBlock('Price - Finding Your Sweet Spot', 'h3'),

      textToBlock(
        "Pricing isn't just about being competitive; it's about positioning. Consider:",
        'normal'
      ),

      ...createListBlock(
        [
          "Local competition analysis: Know your competitors' pricing",
          'Value perception: Price communicates quality',
          'Happy hour strategies: Drive footfall during quiet periods',
          'Premium offerings: Create higher-margin options',
          'Bundle deals: Increase average transaction value',
        ],
        'bullet'
      ),

      textToBlock('', 'normal'),

      textToBlock(
        'Remember: competing on price alone is a race to the bottom. Focus on value instead.',
        'normal'
      ),

      textToBlock('', 'normal'),

      textToBlock('Place - Location and Accessibility', 'h3'),

      textToBlock(
        "While you can't move your pub, you can optimise how customers find and access you:",
        'normal'
      ),

      ...createListBlock(
        [
          'Physical visibility: Signage, lighting, kerb appeal',
          'Digital presence: Google My Business, social media, website',
          'Accessibility: Parking, public transport links, disabled access',
          'Distribution channels: Direct visits, bookings, deliveries',
          'Online ordering: Apps and platforms for food orders',
        ],
        'bullet'
      ),

      textToBlock('', 'normal'),

      textToBlock('Promotion - Getting Your Message Out', 'h3'),

      textToBlock("Effective promotion doesn't require a massive budget:", 'normal'),

      ...createListBlock(
        [
          'Social media: Free platforms for daily engagement',
          'Local partnerships: Collaborate with nearby businesses',
          'Event calendars: Regular activities create anticipation',
          'Email marketing: Build and nurture your database',
          'Word of mouth: Your most powerful marketing tool',
        ],
        'bullet'
      ),

      textToBlock('', 'normal'),

      textToBlock('People - Your Greatest Asset', 'h3'),

      textToBlock('Your team can make or break your pub:', 'normal'),

      ...createListBlock(
        [
          'Staff training: Product knowledge and service standards',
          'Customer relationships: Remember names and preferences',
          'Team morale: Happy staff create happy customers',
          'Cellar management skills: Technical expertise matters',
          'Conflict resolution: Handle difficult situations professionally',
        ],
        'bullet'
      ),

      textToBlock('', 'normal'),

      textToBlock('Physical Evidence - What Customers See and Feel', 'h3'),

      textToBlock('Every touchpoint shapes perception:', 'normal'),

      ...createListBlock(
        [
          'Cleanliness: Non-negotiable basics',
          'Atmosphere: Lighting, music, temperature',
          'Décor: Consistent with your brand positioning',
          'Maintenance: Fix issues promptly',
          'Toilets: Often cited in reviews - keep them spotless',
        ],
        'bullet'
      ),

      textToBlock('', 'normal'),

      textToBlock('Process - Smooth Operations', 'h3'),

      textToBlock('Efficient processes improve customer experience and profitability:', 'normal'),

      ...createListBlock(
        [
          'Service speed: Balance efficiency with friendliness',
          'Order taking: Clear systems for food and drinks',
          'Payment options: Offer convenience',
          'Complaint handling: Turn negatives into positives',
          'Closing time: Manage last orders professionally',
        ],
        'bullet'
      ),

      textToBlock('', 'normal'),

      textToBlock('Part 2: Financial Health - The Numbers That Matter', 'h2'),

      textToBlock(
        'Understanding your financial metrics is crucial for survival and growth. These are the key performance indicators every licensee should monitor weekly.',
        'normal'
      ),

      textToBlock('', 'normal'),

      textToBlock('Gross Profit Margins - Your Lifeline', 'h3'),

      textToBlock(
        'Your gross profit percentage (GP%) is the most critical metric to track:',
        'normal'
      ),

      ...createListBlock(
        [
          'Overall target: 45-55% GP across all sales',
          'Wet margins: Aim for 55-60% on drinks',
          'Food margins: Target 56-60% on food sales',
          'Monitor weekly: Spot issues before they become crises',
          'Benchmark regularly: Compare with industry standards',
        ],
        'bullet'
      ),

      textToBlock('', 'normal'),

      textToBlock(
        "If your GP% drops below 45%, you're heading for trouble. Common causes include theft, wastage, incorrect pricing, or poor portion control.",
        'normal'
      ),

      textToBlock('', 'normal'),

      textToBlock('Wet/Dry Sales Mix - Finding Balance', 'h3'),

      textToBlock('Your sales mix significantly impacts profitability:', 'normal'),

      ...createListBlock(
        [
          'Community wet-led pubs: Typically 90:10 wet to dry',
          'Food-focused pubs: Often 70:30 or 60:40',
          'Hybrid model: 80:20 provides resilience',
          'Track trends: Monitor shifts in customer preferences',
          'Seasonal variations: Plan for fluctuations',
        ],
        'bullet'
      ),

      textToBlock('', 'normal'),

      textToBlock(
        "There's no perfect mix - it depends on your location, customer base, and capabilities. The key is understanding your current position and optimising accordingly.",
        'normal'
      ),

      textToBlock('', 'normal'),

      textToBlock('Labour Costs - Balancing Service and Efficiency', 'h3'),

      textToBlock('Staff costs typically should be:', 'normal'),

      ...createListBlock(
        [
          '18-25% of turnover for wet-led pubs',
          '25-35% for food-led establishments',
          'Include all employment costs: wages, NI, pensions',
          'Review rotas weekly: Match staffing to demand',
          'Cross-train team members: Increase flexibility',
        ],
        'bullet'
      ),

      textToBlock('', 'normal'),

      textToBlock('Part 3: Cellar & Stock Management - Your Profit Foundation', 'h2'),

      textToBlock(
        "Poor cellar management is literally pouring money down the drain. The average pub loses 12% of its beer through poor practices - that's potentially £27,000 annually for a 10-tap establishment.",
        'normal'
      ),

      textToBlock('', 'normal'),

      textToBlock('Yield Management - Stop the Waste', 'h3'),

      textToBlock('Target wastage below 5% by implementing:', 'normal'),

      ...createListBlock(
        [
          "Daily dip tests: Monitor exactly what you're losing",
          'Proper pouring techniques: Train all staff thoroughly',
          'Temperature control: Maintain 11-13°C consistently',
          'Gas pressure: Set correctly for each product',
          'First in, first out: Rigorous stock rotation',
        ],
        'bullet'
      ),

      textToBlock('', 'normal'),

      textToBlock(
        'A 10-tap pub losing 1.5 pints per tap daily wastes £27,000 annually at £4.94 per pint. Reducing this to 5% wastage saves over £14,000 per year.',
        'normal'
      ),

      textToBlock('', 'normal'),

      textToBlock('Line Cleaning - Non-Negotiable', 'h3'),

      textToBlock(
        "Beer lines must be cleaned weekly - it's not just best practice, it's a legal requirement:",
        'normal'
      ),

      ...createListBlock(
        [
          'Every 7 days: No exceptions',
          "Use proper chemicals: Don't cut corners",
          'Document cleaning: Keep records for due diligence',
          'Check python cleanliness: Often overlooked',
          'FOB detectors: Clean and maintain regularly',
        ],
        'bullet'
      ),

      textToBlock('', 'normal'),

      textToBlock(
        "Dirty lines don't just affect quality - they increase wastage through excess fobbing and can lead to serious health issues.",
        'normal'
      ),

      textToBlock('', 'normal'),

      textToBlock('Stock Control Systems', 'h3'),

      textToBlock('Implement robust stock management:', 'normal'),

      ...createListBlock(
        [
          'Weekly stocktakes: Know exactly what you have',
          'Par stock levels: Avoid over-ordering',
          'Supplier management: Negotiate better terms',
          'Security measures: Prevent theft',
          'Waste recording: Identify patterns and problems',
        ],
        'bullet'
      ),

      textToBlock('', 'normal'),

      textToBlock('Part 4: Customer Experience & Community Engagement', 'h2'),

      textToBlock(
        "Your pub's role in the community determines long-term success. Building strong local connections creates a loyal customer base that weathers economic storms.",
        'normal'
      ),

      textToBlock('', 'normal'),

      textToBlock('Regular Events Programme', 'h3'),

      textToBlock('Consistency builds anticipation and habit:', 'normal'),

      ...createListBlock(
        [
          'Quiz nights: Weekly fixture for 25-35 regulars',
          'Live music: Monthly or fortnightly depending on your market',
          "Sports screenings: Know your customers' teams",
          'Charity events: Build goodwill and PR',
          'Seasonal celebrations: Mark key dates in the calendar',
        ],
        'bullet'
      ),

      textToBlock('', 'normal'),

      textToBlock(
        'The key is reliability - customers should know what happens when. "Quiz Tuesday" becomes part of their routine.',
        'normal'
      ),

      textToBlock('', 'normal'),

      textToBlock('Local Partnerships', 'h3'),

      textToBlock('Work with your community:', 'normal'),

      ...createListBlock(
        [
          'Sports clubs: Post-match venue',
          'Local businesses: Networking events',
          'Schools and colleges: Appropriate family events',
          'Charities: Fundraising partnerships',
          'Suppliers: Showcase local products',
        ],
        'bullet'
      ),

      textToBlock('', 'normal'),

      textToBlock('Customer Feedback Systems', 'h3'),

      textToBlock("You can't improve what you don't measure:", 'normal'),

      ...createListBlock(
        [
          'Google reviews: Respond to all feedback',
          'TripAdvisor: Monitor and engage',
          'Social media: Daily interaction',
          'Customer surveys: Annual deep dive',
          'Mystery visits: Objective assessment',
        ],
        'bullet'
      ),

      textToBlock('', 'normal'),

      textToBlock(
        'Aim for 4.0+ stars across all platforms. Address negative feedback within 24-48 hours.',
        'normal'
      ),

      textToBlock('', 'normal'),

      textToBlock('Part 5: Operational Excellence Checklist', 'h2'),

      textToBlock('Compliance & Standards', 'h3'),

      textToBlock('Stay legal and safe:', 'normal'),

      ...createListBlock(
        [
          'Food Safety Act: Full compliance required',
          'Weights & Measures: Accurate serving sizes',
          'Health & Safety: Risk assessments and training',
          'Licensing conditions: Know and follow them',
          'Insurance: Adequate cover for all risks',
        ],
        'bullet'
      ),

      textToBlock('', 'normal'),

      textToBlock('Staff Training Programme', 'h3'),

      textToBlock('Invest in your team:', 'normal'),

      ...createListBlock(
        [
          'Cellar management: Technical skills',
          'Customer service: Soft skills matter',
          'Upselling techniques: Increase spend per head',
          'Conflict resolution: Handle difficult situations',
          'Product knowledge: Become the expert',
        ],
        'bullet'
      ),

      textToBlock('', 'normal'),

      textToBlock('Technology Integration', 'h3'),

      textToBlock('Use technology to improve efficiency:', 'normal'),

      ...createListBlock(
        [
          'EPOS systems: Track everything',
          'Stock management software: Automate ordering',
          'Social media scheduling: Plan ahead',
          'Online booking systems: Capture food sales',
          'Customer WiFi: Data capture opportunity',
        ],
        'bullet'
      ),

      textToBlock('', 'normal'),

      textToBlock('Part 6: Adapting to 2024 Trends', 'h2'),

      textToBlock(
        'The pub industry continues to evolve. Stay relevant by embracing change while maintaining traditional values.',
        'normal'
      ),

      textToBlock('', 'normal'),

      textToBlock('Health-Conscious Offerings', 'h3'),

      textToBlock('Growing at 5-10% annually:', 'normal'),

      ...createListBlock(
        [
          'Low/no alcohol options: Stock quality alternatives',
          'Lighter menu options: Not everyone wants chips',
          'Allergen awareness: Clear labelling essential',
          'Vegan/vegetarian: Cater for all diets',
          'Calorie information: Required for larger operators',
        ],
        'bullet'
      ),

      textToBlock('', 'normal'),

      textToBlock('Experience Over Consumption', 'h3'),

      textToBlock('Customers seek more than just drinks:', 'normal'),

      ...createListBlock(
        [
          'Instagram-worthy moments: Create photo opportunities',
          'Unique experiences: What makes you special?',
          'Community connection: Foster belonging',
          'Quality over quantity: Premium experiences',
          "Storytelling: Share your pub's history",
        ],
        'bullet'
      ),

      textToBlock('', 'normal'),

      textToBlock('Sustainability Initiatives', 'h3'),

      textToBlock('Increasingly important to customers:', 'normal'),

      ...createListBlock(
        [
          'Local sourcing: Reduce food miles',
          'Waste reduction: Compost and recycle',
          'Energy efficiency: LED lighting, smart heating',
          'Plastic reduction: Alternatives to single-use',
          'Community gardens: Grow your own produce',
        ],
        'bullet'
      ),

      textToBlock('', 'normal'),

      textToBlock('Taking Action - Your Next Steps', 'h2'),

      textToBlock(
        "Knowledge without action is worthless. Here's how to implement your health check findings:",
        'normal'
      ),

      textToBlock('', 'normal'),

      textToBlock('Week 1: Measure Your Baseline', 'h3'),

      ...createListBlock(
        [
          'Calculate your current GP%',
          'Document your wet/dry split',
          'Measure current wastage levels',
          'Review your events calendar',
          'Check online review scores',
        ],
        'bullet'
      ),

      textToBlock('', 'normal'),

      textToBlock('Week 2: Identify Quick Wins', 'h3'),

      ...createListBlock(
        [
          'Fix any line cleaning issues',
          'Adjust obvious pricing errors',
          'Update Google My Business',
          "Plan next month's events",
          'Train staff on wastage reduction',
        ],
        'bullet'
      ),

      textToBlock('', 'normal'),

      textToBlock('Week 3: Develop Your Plan', 'h3'),

      ...createListBlock(
        [
          'Set specific improvement targets',
          'Create training schedules',
          'Design marketing calendar',
          'Plan cellar improvements',
          'Schedule regular review dates',
        ],
        'bullet'
      ),

      textToBlock('', 'normal'),

      textToBlock('Week 4: Begin Implementation', 'h3'),

      ...createListBlock(
        [
          'Start daily monitoring',
          'Launch one new initiative',
          'Communicate changes to team',
          'Engage with customers',
          'Track early results',
        ],
        'bullet'
      ),

      textToBlock('', 'normal'),

      textToBlock('The Bottom Line', 'h2'),

      textToBlock(
        'Running a successful pub in 2024 requires attention to multiple moving parts. By regularly conducting this health check and acting on the findings, you can:',
        'normal'
      ),

      ...createListBlock(
        [
          'Save £14,000-£27,000 annually through wastage reduction',
          'Increase GP% by 5-10 percentage points',
          'Build a loyal customer base of 200-300 regulars',
          'Create sustainable competitive advantages',
          'Build a business that thrives, not just survives',
        ],
        'bullet'
      ),

      textToBlock('', 'normal'),

      textToBlock(
        "Remember, you don't have to tackle everything at once. Start with the areas that will have the biggest impact on your specific situation. Focus on progress, not perfection.",
        'normal'
      ),

      textToBlock('', 'normal'),

      textToBlock(
        "Most importantly, remember why you're in this business. Pubs are about people, community, and creating moments that matter. Get the fundamentals right, and you'll have the foundation to deliver on that promise every single day.",
        'normal'
      ),

      textToBlock('', 'normal'),

      textToBlock(
        "Need help implementing these strategies? Sometimes an outside perspective can identify opportunities you're too close to see. That's where targeted support can make all the difference.",
        'normal'
      ),
    ],

    // FAQs
    faqs: [
      {
        _key: 'faq_1',
        question: 'How often should I conduct a pub health check?',
        answer:
          "Conduct a full health check quarterly, with monthly reviews of key metrics like GP%, wastage, and sales mix. Weekly monitoring of critical areas like cellar temperature and line cleaning is essential. Set aside time each Monday to review the previous week's performance.",
        isVoiceOptimized: true,
      },
      {
        _key: 'faq_2',
        question: "What's the single most important metric to track?",
        answer:
          "Gross Profit Percentage (GP%) is your most critical metric. If GP% falls below 45%, you're in danger. This single number tells you whether you're making money on what you sell. Track it weekly and investigate any drops immediately.",
        isVoiceOptimized: true,
      },
      {
        _key: 'faq_3',
        question: 'How much can poor cellar management really cost?',
        answer:
          "Poor cellar management can cost £14,000-£27,000 annually for a typical 10-tap pub. Most pubs lose 12% of beer through poor practices, but reducing this to 5% saves thousands. That's pure profit going straight to your bottom line.",
        isVoiceOptimized: true,
      },
      {
        _key: 'faq_4',
        question: "What's the best wet/dry sales ratio?",
        answer:
          'There\'s no universal "best" ratio - it depends on your location and customer base. Community wet-led pubs typically run 90:10, while food-focused venues might be 60:40. The key is knowing your ratio and optimising your offer accordingly.',
        isVoiceOptimized: false,
      },
      {
        _key: 'faq_5',
        question: 'How do I know if my prices are right?',
        answer:
          "Right pricing balances competitiveness with profitability. Survey local competition, calculate your costs accurately, and ensure you're achieving target GP%. If customers complain about price but still buy, you're probably about right. If they stop coming, you've gone too far.",
        isVoiceOptimized: false,
      },
    ],

    // Local SEO
    localSEO: {
      targetLocation: 'United Kingdom',
      nearbyLandmarks: ['Local high street', 'Town centre', 'Village pub'],
      localModifiers: ['near me', 'local pub', 'in my area', 'nearby'],
    },

    // SEO Metadata
    seo: {
      metaTitle: 'Pub Health Check: Essential Business Fundamentals Guide 2024',
      metaDescription:
        'Complete guide to pub business health checks. Learn to track GP%, reduce wastage, manage your cellar, and build community engagement. Save £14,000+ annually.',
      keywords: [
        'pub health check',
        'pub business metrics',
        'GP percentage',
        'cellar management',
        'beer wastage',
        'pub marketing',
        '7 Ps marketing',
      ],
    },

    // Author and metadata
    author: authorId ? { _type: 'reference', _ref: authorId } : undefined,
    category: categoryId ? { _type: 'reference', _ref: categoryId } : undefined,
    publishedDate: new Date().toISOString(),

    // Tags
    tags: [
      'business health',
      'financial management',
      'cellar management',
      'marketing',
      'operations',
      'community engagement',
    ],

    // CTA Settings
    ctaSettings: {
      primaryCTA: 'Get Your Pub Health Check',
      whatsappMessage:
        "Hi Peter, I've read your pub health check article and would like help assessing my pub's performance.",
      urgency: 'medium',
    },
  };

  try {
    const result = await client.create(article);
    console.log('✅ Article created successfully!');
    console.log('Article ID:', result._id);
    console.log('View in Sanity Studio: https://orangejelly.sanity.studio/');
  } catch (error) {
    console.error('❌ Error creating article:', error);
  }
}

// Run the script
createPubHealthCheckArticle();
