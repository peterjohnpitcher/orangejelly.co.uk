import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

// Note: This script requires a valid write token
// The token should be created in sanity.io/manage with appropriate permissions
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Case studies based on REAL data from interview questions
const caseStudies = [
  {
    _type: 'caseStudy',
    title: 'Tuesday Quiz Night Transformation',
    slug: {
      _type: 'slug',
      current: 'tuesday-quiz-night-transformation'
    },
    subtitle: 'From empty chairs to 25-35 regulars using AI-powered promotion',
    client: 'The Anchor', // Our own pub
    problem: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Our Tuesday nights were deadly quiet. When QuestionOne was running our quizzes, they ran into the ground - sometimes we wouldn\'t even get one team turn up, yet we were stuck paying their bill. The quiz format was stale, promotion was minimal, and Tuesday had become our worst night of the week.'
          }
        ]
      }
    ],
    failedAttempts: [
      'Partnering with QuestionOne quiz company',
      'Basic Facebook posts the day before',
      'Offering bigger prizes without changing the format',
      'Asking QuestionOne to innovate (they refused)'
    ],
    solution: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'We took over the quiz ourselves and completely renovated the concept using AI. Created engaging weekly themes, automated social media campaigns that started a week in advance, built WhatsApp groups for regulars, and used AI to generate fresh, locally-relevant questions. Moved to 7pm Wednesday (once monthly) to avoid clashing with other venues.'
          }
        ]
      }
    ],
    results: [
      {
        metric: 'Regular Attendance',
        value: '25-35 people',
        improvement: 'up from 0-5'
      },
      {
        metric: 'Average Spend',
        value: '£25 per person',
        improvement: '+67%'
      },
      {
        metric: 'Entry Fee Revenue',
        value: '£75-105 per night',
        improvement: 'from £0'
      },
      {
        metric: 'Tuesday Performance',
        value: '3rd busiest night',
        improvement: 'was quietest'
      }
    ],
    timeInvestment: '2 hours weekly for promotion + quiz prep',
    learnings: [
      'AI helps create engaging, topical questions that keep it fresh',
      'Start promotion a week early, not the day before',
      'WhatsApp groups create a community feel',
      'Consistency matters - same time, same format builds habits',
      'Small entry fee (£3) creates commitment'
    ],
    quote: {
      text: 'Taking control of our quiz night was the best decision we made. Using AI for promotion and content means we spend 2 hours total instead of scrambling last minute. Tuesday went from our worst night to our third best.',
      author: 'Peter Pitcher',
      role: 'Owner, The Anchor'
    },
    order: 1
  },
  {
    _type: 'caseStudy',
    title: 'Sunday Lunch Waste Elimination',
    slug: {
      _type: 'slug',
      current: 'sunday-lunch-waste-elimination'
    },
    subtitle: 'Saving £250/week through pre-order system and AI demand forecasting',
    client: 'The Anchor',
    problem: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'We were losing approximately £250 per week on Sunday lunch waste - thrown away protein, vegetables, plus wasted labour and energy costs preparing food that didn\'t sell. The previous tenants had set prices so low they weren\'t profitable, creating unrealistic customer expectations. We needed to eliminate waste while managing the value perception.'
          }
        ]
      }
    ],
    failedAttempts: [
      'Guessing numbers based on previous weeks',
      'Cooking less (resulted in running out)',
      'Keeping prices artificially low to drive volume',
      'Traditional booking system without deposits'
    ],
    solution: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Implemented a custom-built pre-order system requiring £5 per person deposits through PayPal. Everything is now prepared fresh to order. Used AI to analyze booking patterns and optimize purchasing. Built a back-office management system for bookings, customer details, and invoicing. Clear communication about why pre-orders ensure freshness and reduce waste.'
          }
        ]
      }
    ],
    results: [
      {
        metric: 'Weekly Waste',
        value: '£0',
        improvement: 'down from £250'
      },
      {
        metric: 'Food Quality',
        value: 'Everything fresh',
        improvement: 'vs batch cooked'
      },
      {
        metric: 'Profit Margin',
        value: 'Now profitable',
        improvement: 'was loss-making'
      },
      {
        metric: 'No-show Rate',
        value: 'Near zero',
        improvement: 'deposits ensure commitment'
      }
    ],
    timeInvestment: '10 hours initial setup + 1 hour weekly management',
    learnings: [
      '£5 deposits dramatically reduce no-shows',
      'Customers appreciate fresh-cooked food over batch',
      'Clear communication about waste reduction resonates',
      'AI helps predict seasonal demand variations',
      'Custom systems beat generic booking platforms'
    ],
    quote: {
      text: 'Zero waste on Sundays now. Yes, our numbers are lower than before we took over, but every single roast is profitable. The pre-order system means everything is fresh, customers get exactly what they want, and we\'re not throwing money in the bin.',
      author: 'Peter Pitcher',
      role: 'Owner, The Anchor'
    },
    order: 2
  },
  {
    _type: 'caseStudy',
    title: 'Social Media Reach Explosion',
    slug: {
      _type: 'slug',
      current: 'social-media-reach-explosion'
    },
    subtitle: 'Reaching 60,000-70,000 views monthly with just 2 hours per week',
    client: 'The Anchor',
    problem: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Social media was eating up hours each week with minimal results. Posts were sporadic, inconsistent, and reached hardly anyone. We\'d spend ages crafting a single post, only to get a handful of likes. Meanwhile, competitors seemed to be everywhere online while we were invisible.'
          }
        ]
      }
    ],
    failedAttempts: [
      'Posting randomly when we remembered',
      'Spending hours on individual posts',
      'Copying what other pubs were doing',
      'Using generic stock photos and content'
    ],
    solution: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Developed custom AI prompts to generate social media content in bulk - creating a month\'s worth of posts in one session. Posts across Facebook, Instagram, and Google My Business daily. AI ensures posts don\'t clash and maintains consistent voice. Focus on local engagement, event promotion, and community building rather than sales.'
          }
        ]
      }
    ],
    results: [
      {
        metric: 'Monthly Views',
        value: '60,000-70,000',
        improvement: 'from under 1,000'
      },
      {
        metric: 'Time Investment',
        value: '2 hours/week',
        improvement: 'down from 10+'
      },
      {
        metric: 'Posting Frequency',
        value: 'Daily',
        improvement: 'from sporadic'
      },
      {
        metric: 'Event Attendance',
        value: 'Consistently full',
        improvement: 'social drives bookings'
      }
    ],
    timeInvestment: '2 hours weekly for all platforms',
    learnings: [
      'Bulk content creation prevents decision fatigue',
      'AI maintains consistency while keeping personality',
      'Daily posting builds algorithmic preference',
      'Local content outperforms generic posts',
      'One prompt seeing all content prevents repetition'
    ],
    quote: {
      text: 'I used to dread social media - now it runs itself. Two hours on a Sunday creates our entire week\'s content. The AI understands our voice and community, creating posts that actually engage people. 70,000 views from 2 hours work? That\'s the power of working smarter.',
      author: 'Peter Pitcher',
      role: 'Owner, The Anchor'
    },
    order: 3
  },
  {
    _type: 'caseStudy',
    title: 'Food GP Transformation',
    slug: {
      _type: 'slug',
      current: 'food-gp-transformation'
    },
    subtitle: 'Improved gross profit from 58% to 71% using AI menu optimization',
    client: 'The Anchor',
    problem: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'When we took over, the previous tenants were buying food from supermarkets, resulting in incredibly low GP. The menu was outdated, descriptions were boring, and pricing made no sense. Customers weren\'t ordering high-margin items, and food was more of a loss-leader than profit center.'
          }
        ]
      }
    ],
    failedAttempts: [
      'Simply raising prices (customers complained)',
      'Cutting portion sizes (damaged reputation)',
      'Buying cheaper ingredients (quality suffered)',
      'Traditional menu rewrites without strategy'
    ],
    solution: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Partnered with commercial suppliers (Barrel And Stone, Brakes, Bidfood) for consistency and better margins. Used AI to analyze menu psychology and rewrite descriptions using sensory language. Implemented strategic pricing and menu positioning. Introduced stone-baked pizzas as a high-margin hero product. Regular AI-powered menu updates based on seasonal ingredients and costs.'
          }
        ]
      }
    ],
    results: [
      {
        metric: 'Food GP',
        value: '71%',
        improvement: 'up from 58%'
      },
      {
        metric: 'Average Spend',
        value: 'Increased £4.50',
        improvement: '+31%'
      },
      {
        metric: 'Pizza Sales',
        value: 'Top seller',
        improvement: 'highest margin item'
      },
      {
        metric: 'Customer Satisfaction',
        value: 'Higher',
        improvement: 'better quality, consistency'
      }
    ],
    timeInvestment: '8 hours initial setup + 2 hours monthly updates',
    learnings: [
      'Professional suppliers beat supermarket shopping every time',
      'Menu descriptions directly impact what people order',
      'AI helps identify psychological triggers that sell',
      'Regular updates keep menus fresh and costs optimized',
      'Hero products drive overall profitability'
    ],
    quote: {
      text: 'Moving from 58% to 71% GP transformed our food from necessary evil to profit center. AI showed us how to write descriptions that make mouths water and guide choices to profitable items. Best part? Updates take 2 hours instead of days.',
      author: 'Peter Pitcher',
      role: 'Owner, The Anchor'
    },
    order: 4
  },
  {
    _type: 'caseStudy',
    title: 'Tasting Nights Success Formula',
    slug: {
      _type: 'slug',
      current: 'tasting-nights-success'
    },
    subtitle: '85% retention rate with quarterly gin, rum and tequila events',
    client: 'The Anchor',
    problem: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'We needed events that would bring in new customers and create regulars. Generic events weren\'t working, and we didn\'t have the expertise to run sophisticated tasting evenings. How could we create premium events that justified £35 tickets while ensuring people would come back?'
          }
        ]
      }
    ],
    failedAttempts: [
      'Generic "drinks offers" nights',
      'Trying to run tastings without structure',
      'Pricing too low and attracting wrong crowd',
      'Not following up with attendees'
    ],
    solution: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Created a quarterly series: gin, rum, tequila, and winter warmers tastings. Partnered with Greene King to connect with premium brands. £35 includes all spirits, mixers, and themed meal. Limited to 25 tickets (private room capacity). Added educational elements and mini-quiz with prizes. Used AI for sophisticated marketing and follow-up campaigns.'
          }
        ]
      }
    ],
    results: [
      {
        metric: 'Retention Rate',
        value: '85%',
        improvement: 'become regulars'
      },
      {
        metric: 'Ticket Sales',
        value: 'Near sellout',
        improvement: 'every event'
      },
      {
        metric: 'Revenue per Event',
        value: '£875',
        improvement: 'plus bar sales'
      },
      {
        metric: 'New Customer %',
        value: '40%',
        improvement: 'expanding reach'
      }
    ],
    timeInvestment: '6 hours per event including promotion',
    learnings: [
      'Premium pricing attracts quality customers',
      'Limited capacity creates urgency and exclusivity',
      'Education + entertainment = memorable experience',
      'Themed food pairing elevates the experience',
      '85% retention shows the power of done right'
    ],
    quote: {
      text: 'Tasting nights bring in people who\'ve never visited before, and 85% become regulars. The £35 price point ensures we get customers who value the experience. They book future events, bring friends, and talk about us. That\'s marketing gold.',
      author: 'Peter Pitcher',
      role: 'Owner, The Anchor'
    },
    order: 5
  }
]

async function deleteExistingCaseStudies() {
  console.log('Deleting existing case studies...')
  
  try {
    const existingCaseStudies = await writeClient.fetch('*[_type == "caseStudy"]')
    
    for (const caseStudy of existingCaseStudies) {
      await writeClient.delete(caseStudy._id)
      console.log(`Deleted case study: ${caseStudy.title}`)
    }
    
    console.log(`Deleted ${existingCaseStudies.length} existing case studies`)
  } catch (error) {
    console.error('Error deleting case studies:', error)
  }
}

async function createCaseStudies() {
  console.log('Creating accurate case studies based on interview data...')
  
  // First delete existing case studies
  await deleteExistingCaseStudies()
  
  // Create new case studies
  for (const caseStudy of caseStudies) {
    try {
      const result = await writeClient.create(caseStudy)
      console.log(`Created case study: ${caseStudy.title}`)
      console.log(`  - ID: ${result._id}`)
    } catch (error) {
      console.error(`Error creating case study "${caseStudy.title}":`, error)
    }
  }
  
  console.log('\nCase study creation complete!')
  console.log('Note: These case studies use REAL data from The Anchor')
  console.log('Remember: We haven\'t helped other pubs yet (first client Sept 2025)')
}

// Run the script
createCaseStudies().catch(console.error)