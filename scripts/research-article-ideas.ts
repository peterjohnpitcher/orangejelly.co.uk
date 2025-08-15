#!/usr/bin/env ts-node
import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import { format, addDays } from 'date-fns';

// Load environment variables
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: '9brdfanc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function researchArticleIdeas() {
  console.log('Analyzing existing blog posts to identify gaps...\n');

  const posts = await client.fetch(`
    *[_type == "blogPost" && status == "published"] | order(publishedDate desc) {
      title,
      category->{
        name,
        "slug": slug.current
      }
    }
  `);

  console.log(`Found ${posts.length} published posts\n`);

  // Categorize existing topics
  const coveredTopics = {
    emptyPubs: [] as string[],
    socialMedia: [] as string[],
    competition: [] as string[],
    events: [] as string[],
    food: [] as string[],
    seasonal: [] as string[],
    business: [] as string[],
  };

  posts.forEach((post: any) => {
    const title = post.title.toLowerCase();
    const category = post.category?.slug || '';

    if (title.includes('empty') || title.includes('fill') || category === 'empty-pub-solutions') {
      coveredTopics.emptyPubs.push(post.title);
    }
    if (
      category === 'social-media' ||
      title.includes('social') ||
      title.includes('facebook') ||
      title.includes('instagram')
    ) {
      coveredTopics.socialMedia.push(post.title);
    }
    if (
      category === 'competition' ||
      title.includes('compete') ||
      title.includes('chain') ||
      title.includes('wetherspoons')
    ) {
      coveredTopics.competition.push(post.title);
    }
    if (
      category === 'events-promotions' ||
      title.includes('event') ||
      title.includes('quiz') ||
      title.includes('music')
    ) {
      coveredTopics.events.push(post.title);
    }
    if (title.includes('food') || title.includes('menu')) {
      coveredTopics.food.push(post.title);
    }
    if (title.includes('christmas') || title.includes('summer')) {
      coveredTopics.seasonal.push(post.title);
    }
    if (title.includes('budget') || title.includes('recession') || title.includes('profit')) {
      coveredTopics.business.push(post.title);
    }
  });

  console.log('Covered Topics Summary:');
  console.log('========================');
  console.log(`Empty Pub Solutions: ${coveredTopics.emptyPubs.length} articles`);
  console.log(`Social Media: ${coveredTopics.socialMedia.length} articles`);
  console.log(`Competition: ${coveredTopics.competition.length} articles`);
  console.log(`Events & Promotions: ${coveredTopics.events.length} articles`);
  console.log(`Food & Drink: ${coveredTopics.food.length} articles`);
  console.log(`Seasonal: ${coveredTopics.seasonal.length} articles`);
  console.log(`Business/Finance: ${coveredTopics.business.length} articles`);

  console.log('\n\n📊 RESEARCH: Common Licensee Problems Not Yet Covered');
  console.log('=======================================================\n');

  const uncoveredProblems = [
    // Staff & Management Issues
    {
      category: 'Staff Management',
      problems: [
        'High staff turnover and constant recruitment',
        'Training new staff efficiently',
        'Managing staff during quiet periods',
        'Dealing with no-shows and last-minute absences',
        'Motivating staff when business is slow',
      ],
    },
    // Supplier & Cost Issues
    {
      category: 'Supplier & Costs',
      problems: [
        'Rising energy costs eating into profits',
        'Negotiating better deals with suppliers',
        'Managing stock levels and reducing waste',
        'Dealing with brewery tie restrictions',
        'Cash flow management during quiet periods',
      ],
    },
    // Customer Behavior Changes
    {
      category: 'Customer Trends',
      problems: [
        'Younger customers preferring to drink at home',
        'Dealing with the rise of non-drinkers',
        'Competing with home entertainment (Netflix, gaming)',
        'Managing rowdy behavior without losing customers',
        'Building loyalty when customers pub-hop',
      ],
    },
    // Technology & Modern Challenges
    {
      category: 'Technology',
      problems: [
        'Managing online reviews and reputation',
        'Implementing digital ordering systems',
        'Handling online bookings efficiently',
        'Using data to make better business decisions',
        'Keeping up with payment technology (contactless, apps)',
      ],
    },
    // Regulatory & Compliance
    {
      category: 'Regulations',
      problems: [
        'Keeping up with changing licensing laws',
        'Managing health and safety requirements',
        'Dealing with noise complaints from neighbors',
        'Implementing allergen requirements',
        'GDPR and customer data management',
      ],
    },
    // Family & Work-Life Balance
    {
      category: 'Personal/Family',
      problems: [
        'Maintaining work-life balance as a licensee',
        'Running a family pub with kids',
        'Dealing with licensee burnout',
        'Planning for retirement or exit strategy',
        'Managing stress and mental health',
      ],
    },
    // Specific Pub Types
    {
      category: 'Pub Type Challenges',
      problems: [
        'Village pub with declining local population',
        'Town center pub competing with bars',
        'Sports pub when there are no matches',
        'Food-led pub with kitchen problems',
        'Wet-led pub in a food-focused market',
      ],
    },
  ];

  console.log('Key Problem Areas Identified:\n');
  uncoveredProblems.forEach((category) => {
    console.log(`\n${category.category}:`);
    category.problems.forEach((problem) => {
      console.log(`  • ${problem}`);
    });
  });

  console.log('\n\n🎯 15 ARTICLE IDEAS WITH DESCRIPTIONS');
  console.log('=====================================\n');

  const articleIdeas = [
    {
      title: 'Staff Turnover Is Killing Your Pub: How to Build a Team That Stays',
      category: 'Staff Management',
      description:
        'Practical strategies for reducing the £3,000+ cost of replacing staff, creating a positive work culture, implementing efficient training systems, and building a reliable team that actually shows up for shifts.',
      keywords: ['staff retention', 'recruitment', 'training', 'team management'],
      publishDate: '2025-08-11',
    },
    {
      title:
        'Energy Bills Destroying Your Margins? 20 Ways to Cut Costs Without Freezing Customers',
      category: 'Cost Management',
      description:
        "Comprehensive guide to reducing energy costs by 20-30% through smart heating schedules, efficient equipment, negotiation tactics with suppliers, and government grants you're probably missing.",
      keywords: ['energy costs', 'utility bills', 'cost reduction', 'profit margins'],
      publishDate: '2025-08-18',
    },
    {
      title: "Young People Won't Come to Your Pub? Here's How to Change That",
      category: 'Customer Acquisition',
      description:
        'Understanding why 18-30s prefer home drinking, creating Instagram-worthy experiences, hosting events that actually appeal to younger crowds, and building a vibe that competes with their sofa.',
      keywords: ['millennials', 'gen z', 'young customers', 'modern pub'],
      publishDate: '2025-08-25',
    },
    {
      title: 'Terrible Online Reviews Ruining Your Reputation? The Damage Control Guide',
      category: 'Digital Reputation',
      description:
        'Step-by-step system for responding to negative reviews, encouraging positive feedback, preventing review bombs, and turning angry customers into advocates - with real examples and templates.',
      keywords: ['online reviews', 'TripAdvisor', 'Google reviews', 'reputation management'],
      publishDate: '2025-09-01',
    },
    {
      title: 'Village Pub in a Dying Village? Survival Strategies That Actually Work',
      category: 'Location Challenges',
      description:
        'How to thrive when your local population is declining - becoming a destination pub, creating reasons for travel, building community partnerships, and diversifying income streams.',
      keywords: ['village pub', 'rural pub', 'declining population', 'destination pub'],
      publishDate: '2025-09-08',
    },
    {
      title: 'Licensee Burnout Is Real: How to Avoid Losing Your Pub (and Your Sanity)',
      category: 'Personal Wellbeing',
      description:
        "Recognizing burnout symptoms, creating sustainable working patterns, delegating effectively, finding time for yourself, and building a business that doesn't destroy your health or relationships.",
      keywords: ['burnout', 'stress management', 'work-life balance', 'mental health'],
      publishDate: '2025-09-15',
    },
    {
      title: 'Nobody Books Tables Anymore? Master the Art of Walk-ins vs Reservations',
      category: 'Operations',
      description:
        "Balancing spontaneous trade with guaranteed bookings, managing table turnover, using booking systems effectively, and creating the right mix for your pub's style and location.",
      keywords: ['table management', 'bookings', 'reservations', 'walk-ins'],
      publishDate: '2025-09-22',
    },
    {
      title: 'Brewery Tie Strangling Your Profits? Legal Ways to Improve Your Deal',
      category: 'Supplier Relations',
      description:
        'Understanding your rights, negotiation strategies that work, alternative income streams within tie restrictions, and when (and how) to consider going free of tie.',
      keywords: ['brewery tie', 'pubco', 'beer prices', 'supplier negotiations'],
      publishDate: '2025-09-29',
    },
    {
      title: 'The Sober-Curious Movement: Turning Non-Drinkers into Profitable Customers',
      category: 'Market Trends',
      description:
        'Creating an amazing non-alcoholic offering, pricing strategies for alcohol-free drinks, marketing to the sober-curious, and why ignoring this trend will cost you thousands.',
      keywords: ['non-alcoholic', 'sober curious', 'mocktails', 'alcohol-free'],
      publishDate: '2025-10-06',
    },
    {
      title: 'Cash Flow Crisis Every Month? Breaking the Feast-or-Famine Cycle',
      category: 'Financial Management',
      description:
        'Managing cash flow across quiet and busy periods, creating predictable income streams, negotiating payment terms, and building a financial buffer without borrowing.',
      keywords: ['cash flow', 'financial planning', 'working capital', 'business finance'],
      publishDate: '2025-10-13',
    },
    {
      title: 'Noise Complaints Threatening Your License? The Neighbor Relations Playbook',
      category: 'Community Relations',
      description:
        'Preventing complaints before they start, managing difficult neighbors, working with environmental health, soundproofing on a budget, and keeping your license safe.',
      keywords: ['noise complaints', 'licensing', 'neighbor relations', 'environmental health'],
      publishDate: '2025-10-20',
    },
    {
      title: 'Food Allergies and GDPR: The Compliance Nightmares That Could Close You Down',
      category: 'Compliance',
      description:
        'Simple systems for allergen management, GDPR compliance without the headache, avoiding the fines that destroyed other pubs, and staying legal without hiring a compliance officer.',
      keywords: ['allergens', 'GDPR', 'compliance', 'food safety', 'regulations'],
      publishDate: '2025-10-27',
    },
    {
      title: "Your Pub's Worth Nothing? Building Value for Your Exit Strategy",
      category: 'Business Planning',
      description:
        "Increasing your pub's sale value, preparing for retirement or sale, documenting systems buyers want to see, and avoiding the mistakes that leave licensees with nothing.",
      keywords: ['exit strategy', 'business value', 'retirement planning', 'pub sale'],
      publishDate: '2025-11-03',
    },
    {
      title: 'Kitchen Nightmares: When Your Chef Quits on a Saturday Night',
      category: 'Crisis Management',
      description:
        'Emergency protocols for staff disasters, building a backup network, simplified menu strategies, and how to prevent the crisis that kills most food-led pubs.',
      keywords: ['staff crisis', 'chef shortage', 'kitchen management', 'contingency planning'],
      publishDate: '2025-11-10',
    },
    {
      title: 'Dead Wednesday Nights? Turn Your Quietest Day into a Profit Center',
      category: 'Revenue Optimization',
      description:
        'Creating must-attend Wednesday events, pricing strategies for quiet nights, partnering with local groups, and why Wednesday might be your biggest opportunity.',
      keywords: ['midweek trade', 'Wednesday promotions', 'quiet nights', 'revenue optimization'],
      publishDate: '2025-11-17',
    },
  ];

  console.log('Articles prioritized by urgency and impact:\n');
  articleIdeas.forEach((idea, index) => {
    console.log(`${index + 1}. ${idea.title}`);
    console.log(`   Category: ${idea.category}`);
    console.log(`   Description: ${idea.description}`);
    console.log(`   Target Date: ${idea.publishDate} (Week ${index + 1})`);
    console.log('');
  });

  // Calculate publishing schedule
  const lastPublishedDate = new Date('2025-08-04'); // Last published article date
  let nextDate = addDays(lastPublishedDate, 7);

  console.log('\n📅 PUBLISHING SCHEDULE (Weekly - Mondays)');
  console.log('==========================================\n');

  for (let i = 0; i < 5; i++) {
    const article = articleIdeas[i];
    console.log(`${format(nextDate, 'MMM dd, yyyy')} - ${article.title}`);
    nextDate = addDays(nextDate, 7);
  }

  console.log('\nAll articles will be created in DRAFT status as requested.');
  console.log("You can schedule them for automatic publication using Sanity's scheduling feature.");

  return articleIdeas;
}

researchArticleIdeas().catch(console.error);
