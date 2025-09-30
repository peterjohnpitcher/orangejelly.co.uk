import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Helper to generate unique keys
const generateKey = (prefix: string, index: number) => `${prefix}_${index}`;

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// Landing page content data
const landingPages = [
  // 1. Empty Pub Solutions
  {
    _type: 'landingPageContent',
    _id: 'landing-empty-pub-solutions',
    slug: {
      _type: 'slug',
      current: 'empty-pub-solutions'
    },
    title: '30 Days to Fuller Tables - Transform Your Empty Pub',
    metaDescription: 'Empty pub killing your profits? Proven 30-day system fills tables fast. From 25% empty to 85% full - real results from UK pubs. Action plan support.',
    hero: {
      title: 'Your Pub is Empty. We\'ll Fill It in 30 Days.',
      subtitle: 'Proven strategies that transformed The Anchor from empty to thriving',
      bottomText: '💰 Action plan support if we don\'t increase covers by 25%'
    },
    faqs: [
      {
        _key: generateKey('item', Math.random() * 1000 | 0),
        question: "How quickly can I see results for my empty pub?",
        answer: "Most pubs see 25-40% increase in covers within 30 days. Our proven system starts working immediately - you'll notice more bookings in week one, busier nights by week two, and significantly fuller tables by day 30."
      },
      {
        _key: generateKey('item', Math.random() * 1000 | 0),
        question: "What if I've tried everything and nothing works?",
        answer: "We hear this a lot. The difference is we're licensees who've solved this exact problem. Our strategies aren't theories - they're proven methods that transformed The Anchor's quiet nights into profitable evenings."
      },
      {
        _key: generateKey('item', Math.random() * 1000 | 0),
        question: "How much does the empty pub recovery package cost?",
        answer: "£75 per hour plus VAT. I'll work with you to implement the AI strategies that transformed The Anchor. 30-day action plan with weekly support if you're not satisfied."
      },
      {
        _key: generateKey('item', Math.random() * 1000 | 0),
        question: "Do I need to spend money on advertising?",
        answer: "No. Our system focuses on organic growth through better messaging, community engagement, and word-of-mouth. Optional paid ads can accelerate results, but they're not required."
      },
      {
        _key: generateKey('item', Math.random() * 1000 | 0),
        question: "Will this work for my type of pub?",
        answer: "Yes. We've helped gastropubs, community locals, sports bars, and country inns. The principles work because they're based on human psychology and proven hospitality strategies, not gimmicks."
      }
    ],
    howToSteps: [
      {
        _key: generateKey('item', Math.random() * 1000 | 0),
        name: "Audit Your Current Customer Touchpoints",
        text: "Identify and fix all the places customers interact with your pub online and offline. Check Google listing accuracy, review response times, and menu visibility.",
        url: "https://www.orangejelly.co.uk/empty-pub-solutions#week-1",
        image: "https://www.orangejelly.co.uk/images/audit-touchpoints.svg"
      },
      {
        _key: generateKey('item', Math.random() * 1000 | 0),
        name: "Fix Your Google Listing",
        text: "Update business hours, add photos, respond to reviews, and ensure all information is accurate. 80% of pubs have errors that cost them customers.",
        url: "https://www.orangejelly.co.uk/empty-pub-solutions#week-1"
      },
      {
        _key: generateKey('item', Math.random() * 1000 | 0),
        name: "Create Irresistible Midweek Offers",
        text: "Design special offers that give people a reason to visit Monday-Thursday. Focus on value without devaluing your brand.",
        url: "https://www.orangejelly.co.uk/empty-pub-solutions#week-1"
      },
      {
        _key: generateKey('item', Math.random() * 1000 | 0),
        name: "Launch Targeted Social Media Campaigns",
        text: "Create content that showcases your pub's personality and connects with your local community. Post consistently and engage authentically.",
        url: "https://www.orangejelly.co.uk/empty-pub-solutions#week-1"
      },
      {
        _key: generateKey('item', Math.random() * 1000 | 0),
        name: "Implement Email Marketing Sequences",
        text: "Build a customer database and send regular updates about events, offers, and news. Email marketing has the highest ROI for pubs.",
        url: "https://www.orangejelly.co.uk/empty-pub-solutions#week-2"
      },
      {
        _key: generateKey('item', Math.random() * 1000 | 0),
        name: "Create Events That Draw Crowds",
        text: "Plan and promote events that match your customers' interests. Quiz nights, live music, and themed evenings can transform quiet nights.",
        url: "https://www.orangejelly.co.uk/empty-pub-solutions#week-2"
      },
      {
        _key: generateKey('item', Math.random() * 1000 | 0),
        name: "Optimize Your Menu for Profit",
        text: "Analyze your menu performance, highlight high-margin items, and remove poor performers. Design matters as much as content.",
        url: "https://www.orangejelly.co.uk/empty-pub-solutions#week-2"
      },
      {
        _key: generateKey('item', Math.random() * 1000 | 0),
        name: "Build Strategic Local Partnerships",
        text: "Connect with local businesses, sports clubs, and community groups. Cross-promotion multiplies your marketing reach.",
        url: "https://www.orangejelly.co.uk/empty-pub-solutions#week-3"
      },
      {
        _key: generateKey('item', Math.random() * 1000 | 0),
        name: "Implement Referral Systems",
        text: "Turn happy customers into advocates with incentivized referral programs. Word-of-mouth is still the most powerful marketing.",
        url: "https://www.orangejelly.co.uk/empty-pub-solutions#week-3"
      },
      {
        _key: generateKey('item', Math.random() * 1000 | 0),
        name: "Analyze and Double Down on Winners",
        text: "Track what's working, measure results, and invest more in successful strategies. Data-driven decisions lead to sustainable growth.",
        url: "https://www.orangejelly.co.uk/empty-pub-solutions#week-4"
      }
    ],
    additionalContent: {
      solutions: [
        {
          week: "Week 1",
          title: "Immediate Impact",
          actions: [
            "Audit your current customer touchpoints",
            "Fix your Google listing (80% have errors)",
            "Create irresistible midweek offers",
            "Launch targeted social media campaigns"
          ]
        },
        {
          week: "Week 2",
          title: "Building Momentum",
          actions: [
            "Implement proven email sequences",
            "Create events that actually draw crowds",
            "Optimize your menu for profit",
            "Activate dormant customers"
          ]
        },
        {
          week: "Week 3",
          title: "Scaling Success",
          actions: [
            "Leverage customer testimonials",
            "Build strategic local partnerships",
            "Implement referral systems",
            "Create repeatable success systems"
          ]
        },
        {
          week: "Week 4",
          title: "Lock In Growth",
          actions: [
            "Analyze what's working best",
            "Double down on winners",
            "Create long-term marketing calendar",
            "Build sustainable growth systems"
          ]
        }
      ],
      realResults: [
        {
          pub: "The White Horse, Surrey",
          before: "Tuesday nights: 15-20 covers",
          after: "Tuesday nights: 65-80 covers",
          timeframe: "6 weeks"
        },
        {
          pub: "The Crown, Berkshire",
          before: "Midweek: 30% capacity",
          after: "Midweek: 75% capacity",
          timeframe: "30 days"
        },
        {
          pub: "The Anchor, Stanwell Moor",
          before: "Dead Monday-Wednesday",
          after: "Quiz night: 25-35 regulars, Tasting nights: 85% retention",
          timeframe: "8 weeks"
        }
      ]
    }
  },

  // 2. Quiet Midweek Solutions
  {
    _type: 'landingPageContent',
    _id: 'landing-quiet-midweek-solutions',
    slug: {
      _type: 'slug',
      current: 'quiet-midweek-solutions'
    },
    title: 'Pub Dead Monday to Thursday? Here\'s the Fix',
    metaDescription: 'Transform dead weeknights into profitable nights. Proven strategies that took pubs from 20% to 70% capacity Monday-Thursday. Real results in 30 days.',
    hero: {
      title: 'Monday to Thursday: From Ghost Town to Gold Mine',
      subtitle: 'Stop bleeding money on quiet nights. Proven system fills tables midweek.',
      bottomText: '🎯 Most pubs see 200% increase in midweek revenue within 30 days'
    },
    faqs: [
      {
        _key: generateKey('item', Math.random() * 1000 | 0),
        question: "Why is my pub so quiet Monday to Thursday?",
        answer: "Most pubs rely on weekend trade and hope midweek 'sorts itself out'. It won't. Quiet weeknights need specific strategies: targeted offers, the right events, and messaging that gives people a reason to leave the house on a Tuesday."
      },
      {
        _key: generateKey('item', Math.random() * 1000 | 0),
        question: "What events actually work for midweek?",
        answer: "Quiz nights (done right) can pull 60-100 people. Steak nights, curry clubs, and wine tastings work brilliantly. The key is consistency, proper promotion, and making it unmissable. We'll show you exactly how."
      },
      {
        _key: generateKey('item', Math.random() * 1000 | 0),
        question: "How much revenue am I losing on quiet nights?",
        answer: "A pub doing 20 covers on a Tuesday instead of 60 loses £1,200 that night. Over a month, that's £4,800. Over a year? £57,600 in lost revenue just from Tuesday nights alone."
      },
      {
        _key: generateKey('item', Math.random() * 1000 | 0),
        question: "Will discounting hurt my weekend trade?",
        answer: "No, if done correctly. Smart midweek offers bring in different customers at different times. We'll show you how to create compelling offers that fill quiet periods without cannibalizing busy times."
      },
      {
        _key: generateKey('item', Math.random() * 1000 | 0),
        question: "How quickly will I see midweek improvements?",
        answer: "Most pubs see 30-50% increase in midweek covers within 2 weeks. By week 4, you should be at 60-70% capacity on previously dead nights. The Anchor went from 20 to 85 people for Tuesday quiz in 6 weeks."
      }
    ],
    howToSteps: [
      {
        _key: generateKey('item', Math.random() * 1000 | 0),
        name: "Analyze Your Current Midweek Performance",
        text: "Track your Monday-Thursday covers, identify patterns, and understand why customers aren't visiting. Use this data as your baseline for improvement.",
        url: "https://www.orangejelly.co.uk/quiet-midweek-solutions#step-1"
      },
      {
        _key: generateKey('item', Math.random() * 1000 | 0),
        name: "Create Compelling Midweek Offers",
        text: "Design offers that give people a reason to choose your pub over staying home. Focus on value adds like 'Steak & Wine Wednesdays' rather than discounting.",
        url: "https://www.orangejelly.co.uk/quiet-midweek-solutions#step-2"
      },
      {
        _key: generateKey('item', Math.random() * 1000 | 0),
        name: "Launch a Successful Quiz Night",
        text: "Build a quiz night that becomes THE Tuesday event in your area. Include food deals, team registration, and prizes that bring people back week after week.",
        url: "https://www.orangejelly.co.uk/quiet-midweek-solutions#step-3"
      },
      {
        _key: generateKey('item', Math.random() * 1000 | 0),
        name: "Implement Theme Nights",
        text: "Create themed evenings like Curry Club, Wine Wednesday, or Burger Monday. Give each night its own identity that customers can plan around.",
        url: "https://www.orangejelly.co.uk/quiet-midweek-solutions#step-4"
      },
      {
        _key: generateKey('item', Math.random() * 1000 | 0),
        name: "Partner with Local Businesses",
        text: "Connect with nearby offices, gyms, and clubs for after-work gatherings and team nights. Offer exclusive deals for their members and staff.",
        url: "https://www.orangejelly.co.uk/quiet-midweek-solutions#step-5"
      },
      {
        _key: generateKey('item', Math.random() * 1000 | 0),
        name: "Master Midweek Social Media",
        text: "Post at the right times with messages that overcome the 'I'll stay in' mindset. Show the atmosphere, not just the offers.",
        url: "https://www.orangejelly.co.uk/quiet-midweek-solutions#step-6"
      },
      {
        _key: generateKey('item', Math.random() * 1000 | 0),
        name: "Create a Midweek Loyalty Program",
        text: "Reward regular midweek visitors with points, perks, and exclusive benefits. Make Tuesday-Thursday visits more valuable than weekends.",
        url: "https://www.orangejelly.co.uk/quiet-midweek-solutions#step-7"
      },
      {
        _key: generateKey('item', Math.random() * 1000 | 0),
        name: "Build Community Events",
        text: "Host book clubs, craft groups, language exchanges, or business networking. Regular groups guarantee consistent midweek footfall.",
        url: "https://www.orangejelly.co.uk/quiet-midweek-solutions#step-8"
      }
    ],
    additionalContent: {
      midweekStrategies: [
        {
          day: "Monday",
          strategy: "Special Theme Night",
          description: "50% off for hospitality workers",
          result: "Builds loyal following, word spreads fast"
        },
        {
          day: "Tuesday",
          strategy: "Quiz Night Done Right",
          description: "£50 winner, free entry, food deals",
          result: "25-35 regular attendees"
        },
        {
          day: "Wednesday",
          strategy: "Steak & Wine Night",
          description: "2 steaks + bottle for £45",
          result: "Books out 3 weeks in advance"
        },
        {
          day: "Thursday",
          strategy: "Curry Club",
          description: "£12.95 curry + pint special",
          result: "60+ covers, becoming 'the' curry spot"
        }
      ],
      costOfEmpty: [
        {
          metric: "Lost Revenue",
          amount: "£1,200",
          period: "per quiet night"
        },
        {
          metric: "Wasted Staff Costs",
          amount: "£180",
          period: "per quiet night"
        },
        {
          metric: "Fixed Overheads",
          amount: "£150",
          period: "still paid regardless"
        },
        {
          metric: "Total Loss",
          amount: "£57,600",
          period: "per year (just Tuesdays!)"
        }
      ],
      successStories: [
        {
          challenge: "Tuesday Quiz Night",
          before: "25 people, losing money",
          action: "Proper promotion + better prizes",
          after: "25-35 people, strong £25 average spend"
        },
        {
          challenge: "Dead Mondays",
          before: "15-20 covers, staff standing around",
          action: "Theme nights + entertainment",
          after: "55 covers, buzzing atmosphere"
        },
        {
          challenge: "Midweek Lunches",
          before: "5-10 covers, considering closing",
          action: "Business lunch deal + marketing",
          after: "35-40 covers, profitable again"
        }
      ]
    }
  },

  // 3. Compete with Pub Chains
  {
    _type: 'landingPageContent',
    _id: 'landing-compete-with-pub-chains',
    slug: {
      _type: 'slug',
      current: 'compete-with-pub-chains'
    },
    title: 'Pub Chains Killing Your Trade? Fight Back',
    metaDescription: 'Beat pub chains at their own game. Proven strategies help independent pubs compete with chain pubs. Win on service, atmosphere and personality, not just price.',
    hero: {
      title: 'Chain Pubs Stealing Your Trade? Here\'s How to Fight Back',
      subtitle: 'Stop competing on price. Start winning on everything else that matters.',
      bottomText: '🏆 Independent pubs CAN beat the chains - we\'ll show you how'
    },
    faqs: [
      {
        _key: generateKey('item', Math.random() * 1000 | 0),
        question: "How can I compete with chain pubs on price?",
        answer: "You don't compete on price - you compete on value. Chain pub customers aren't always your customers. Focus on quality, atmosphere, personal service, and community connection. We'll show you how to position your pub as the premium local choice."
      },
      {
        _key: generateKey('item', Math.random() * 1000 | 0),
        question: "What advantages do independent pubs have over chains?",
        answer: "Personal service, flexibility, local knowledge, unique atmosphere, better quality, community connection, and the ability to adapt quickly. Chains are slow corporate machines - you can outmaneuver them every time."
      },
      {
        _key: generateKey('item', Math.random() * 1000 | 0),
        question: "How do I stop losing customers to cheaper chain pubs?",
        answer: "Create experiences chains can't match. Regular's benefits, personalized service, quality food, unique events, and genuine community feel. Make your pub irreplaceable, not just another place to drink."
      },
      {
        _key: generateKey('item', Math.random() * 1000 | 0),
        question: "Should I match chain pub prices?",
        answer: "No. Racing to the bottom kills profits. Instead, justify your prices with superior quality, service, and experience. Our strategies help you attract customers who value quality over cheapness."
      },
      {
        _key: generateKey('item', Math.random() * 1000 | 0),
        question: "Can a small pub really compete with big chains?",
        answer: "Absolutely. David beats Goliath when he's smart. At The Anchor, we compete successfully with nearby chains. The key is playing to your strengths, not trying to beat them at their game."
      }
    ],
    additionalContent: {
      chainWeaknesses: [
        {
          weakness: "No Soul",
          description: "Corporate atmosphere, no personality",
          yourAdvantage: "Create a unique vibe that becomes 'your thing'"
        },
        {
          weakness: "Poor Service",
          description: "Understaffed, don't know regulars",
          yourAdvantage: "Remember names, drinks, and make people feel special"
        },
        {
          weakness: "Frozen Food",
          description: "Microwaved meals, no chef",
          yourAdvantage: "Fresh, local, homemade - and shout about it"
        },
        {
          weakness: "No Flexibility",
          description: "Can't adapt, corporate rules",
          yourAdvantage: "Change instantly based on what customers want"
        }
      ],
      winningStrategies: [
        {
          strategy: "The Local Hero",
          tactics: [
            "Partner with local suppliers",
            "Support community causes",
            "Host local groups",
            "Celebrate local success"
          ],
          result: "Becomes THE community pub"
        },
        {
          strategy: "The Experience",
          tactics: [
            "Themed nights chains can't do",
            "Unique food offerings",
            "Personal touches everywhere",
            "Stories and personality"
          ],
          result: "Destination, not just a pub"
        },
        {
          strategy: "The Quality Play",
          tactics: [
            "Premium products done well",
            "Expert knowledge",
            "Craft and specialty focus",
            "Quality over quantity"
          ],
          result: "Attracts discerning customers"
        },
        {
          strategy: "The Service Win",
          tactics: [
            "Know every regular by name",
            "Remember preferences",
            "Go extra mile always",
            "Create 'wow' moments"
          ],
          result: "Unbeatable customer loyalty"
        }
      ],
      successStories: [
        {
          pub: "The Fox & Hounds",
          challenge: "Major chain pub nearby",
          strategy: "Focused on craft beer and quality food",
          result: "Revenue up 15% in 6 months"
        },
        {
          pub: "The Railway Arms",
          challenge: "Lost 40% trade to Greene King",
          strategy: "Became THE live music venue",
          result: "Busier than ever, different crowd"
        },
        {
          pub: "The Village Inn",
          challenge: "Harvester stealing food trade",
          strategy: "Local suppliers, 'real food' message",
          result: "Food sales doubled in 8 weeks"
        }
      ]
    }
  },

  // 4. Pub Marketing No Budget
  {
    _type: 'landingPageContent',
    _id: 'landing-pub-marketing-no-budget',
    slug: {
      _type: 'slug',
      current: 'pub-marketing-no-budget'
    },
    title: '£0 Marketing Budget? These Pub Strategies Cost Nothing',
    metaDescription: 'No money for marketing? These free strategies filled our pub. Social media, community partnerships, email marketing - all free, all proven to work.',
    hero: {
      title: 'No Marketing Budget? No Problem.',
      subtitle: 'Free strategies that filled our pub (and will fill yours too)',
      bottomText: '💪 From empty Tuesday nights to turning people away - all with £0 spend'
    },
    faqs: [
      {
        _key: generateKey('item', Math.random() * 1000 | 0),
        question: "Can I really market my pub without spending money?",
        answer: "Absolutely. The best pub marketing is often free - word of mouth, social media, community partnerships, and email marketing cost nothing but time. We filled The Anchor using mostly free strategies before investing in paid advertising."
      },
      {
        _key: generateKey('item', Math.random() * 1000 | 0),
        question: "What free marketing works best for pubs?",
        answer: "Social media (especially local Facebook groups), Google My Business optimization, email marketing to existing customers, community partnerships, and creating shareable moments. These strategies consistently outperform paid ads for local pubs."
      },
      {
        _key: generateKey('item', Math.random() * 1000 | 0),
        question: "How long until free marketing shows results?",
        answer: "Immediate to 30 days. Fixing your Google listing can bring customers tomorrow. Social media posts work within days. Email campaigns see instant results. Community partnerships take 2-4 weeks to build momentum."
      },
      {
        _key: generateKey('item', Math.random() * 1000 | 0),
        question: "Do I need to be good at social media?",
        answer: "No. Authentic posts outperform polished content for pubs. Phone photos, genuine updates, and community focus work better than professional content. We'll show you simple formulas anyone can follow."
      },
      {
        _key: generateKey('item', Math.random() * 1000 | 0),
        question: "What if I don't have time for marketing?",
        answer: "15 minutes daily is enough with the right systems. Batch content creation, automation tools, and simple templates mean you can market effectively in less time than counting the till. We'll set up systems that run themselves."
      }
    ],
    additionalContent: {
      freeStrategies: [
        {
          strategy: "Google My Business",
          effort: "1 hour setup",
          impact: "50% more calls",
          tactics: [
            "Complete every section",
            "Add photos weekly",
            "Post updates regularly",
            "Respond to all reviews"
          ]
        },
        {
          strategy: "Local Facebook Groups",
          effort: "15 mins daily",
          impact: "20+ new customers/week",
          tactics: [
            "Join all local groups",
            "Share genuinely helpful content",
            "Announce events personally",
            "Build relationships, not spam"
          ]
        },
        {
          strategy: "Email Marketing",
          effort: "1 hour weekly",
          impact: "£500+ per campaign",
          tactics: [
            "Collect emails at point of sale",
            "Weekly 'what's on' emails",
            "VIP offers for subscribers",
            "Birthday club automated"
          ]
        },
        {
          strategy: "Community Partnerships",
          effort: "2 hours monthly",
          impact: "30+ covers per event",
          tactics: [
            "Host local groups free",
            "Cross-promote with shops",
            "Support local causes",
            "Become the community hub"
          ]
        }
      ],
      socialMediaTemplates: [
        {
          type: "The Tuesday Post",
          template: "Quiet night? Not here! [Photo of your busiest corner] Join us for [offer] tonight. See you at 7pm!",
          result: "15-20 extra covers"
        },
        {
          type: "The Friday Hype",
          template: "Weekend starts HERE! 🍻 [Photo of drinks being poured] Kitchen open till 9pm, live music from 8pm. Tag your crew!",
          result: "Fully booked by 6pm"
        },
        {
          type: "The Sunday Roast",
          template: "Only [number] roasts left for today! [Photo of roast] Book now: [phone]. Walk-ins welcome but booking essential.",
          result: "Sells out every week"
        },
        {
          type: "The Local Hero",
          template: "Congrats to [local person/team] on [achievement]! First drink's on us this weekend. Well done! 👏",
          result: "Viral locally, brings whole groups"
        }
      ],
      weeklyPlan: [
        {
          day: "Monday",
          task: "Post week's events on Facebook",
          time: "10 mins",
          result: "Sets tone for busy week"
        },
        {
          day: "Tuesday",
          task: "Email newsletter to database",
          time: "20 mins",
          result: "£300-500 in bookings"
        },
        {
          day: "Wednesday",
          task: "Update Google My Business",
          time: "5 mins",
          result: "Stay top of search"
        },
        {
          day: "Thursday",
          task: "Weekend hype on socials",
          time: "10 mins",
          result: "Build anticipation"
        },
        {
          day: "Friday",
          task: "Share customer photos/stories",
          time: "5 mins",
          result: "Social proof working"
        },
        {
          day: "Saturday",
          task: "Capture content for next week",
          time: "Throughout shift",
          result: "Authentic content bank"
        },
        {
          day: "Sunday",
          task: "Plan next week's content",
          time: "15 mins",
          result: "Stay organized"
        }
      ]
    }
  }
];

// Migration function
async function migrateContent() {
  console.log('Starting migration of all landing pages...');
  
  for (const page of landingPages) {
    try {
      console.log(`Migrating: ${page.slug.current}`);
      
      // Create or update the document
      const result = await client.createOrReplace(page);
      
      console.log(`✅ Successfully migrated: ${page.slug.current}`);
      console.log(`   Document ID: ${result._id}`);
    } catch (error) {
      console.error(`❌ Failed to migrate ${page.slug.current}:`, error);
    }
  }
  
  console.log('\nMigration complete!');
}

// Run the migration
migrateContent().catch(console.error);

// Export for testing
export { landingPages };