import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const caseStudies = [
  {
    _type: 'caseStudy',
    title: 'How Six Weeks Changed Everything',
    slug: { _type: 'slug', current: 'quiet-weeks' },
    subtitle: 'The moment our GP hit 71% using AI-powered menu rewrites.',
    problem: [
      {
        _type: 'block',
        _key: 'p1',
        children: [{ _type: 'span', text: 'Jan-Feb 2024 was brutal. Snow killed business, energy bills through the roof, hardly covering costs.', _key: 's1' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'p2',
        children: [{ _type: 'span', text: 'Food GP stuck at 58% despite constant tweaking. Every plate felt like we were working for free.', _key: 's2' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'p3',
        children: [{ _type: 'span', text: 'Marketing was just Facebook posts when remembered - maybe reaching 200 people.', _key: 's3' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'p4',
        children: [{ _type: 'span', text: 'No customer data, no email list, no strategy. Just hoping tomorrow would be better.', _key: 's4' }],
        markDefs: [],
      },
    ],
    failedAttempts: [
      'Cutting prices - just reduced margins further',
      'Random Facebook boosts - money down drain',
      'Leaflet drops - expensive and got zero response',
      'Generic offers - attracted wrong customers',
    ],
    solution: [
      {
        _type: 'block',
        _key: 's1',
        children: [{ _type: 'span', text: 'Complete menu rewrite using AI analysis - highlighting profitable items.', _key: 'sp1' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 's2',
        children: [{ _type: 'span', text: 'Started collecting customer emails properly - built list of 300 in weeks.', _key: 'sp2' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 's3',
        children: [{ _type: 'span', text: 'Daily social media using AI - reached 60,000 people monthly.', _key: 'sp3' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 's4',
        children: [{ _type: 'span', text: 'Launched targeted events - gin tastings, wine nights, themed quizzes.', _key: 'sp4' }],
        markDefs: [],
      },
    ],
    results: [
      { metric: 'Food GP', value: '71%', improvement: 'up from 58%' },
      { metric: 'Email database', value: '300 opted-in', improvement: 'from zero' },
      { metric: 'Social reach', value: '60,000/month', improvement: 'up from 200' },
      { metric: 'Event attendance', value: '85% retention', improvement: 'new revenue stream' },
    ],
    timeInvestment: '10 hours total over 6 weeks',
    learnings: [
      'Menu descriptions drive purchasing behavior',
      'Email lists are gold for quiet periods',
      'Consistency beats perfection in marketing',
      'Small changes compound into big results',
    ],
    quote: {
      text: 'Six weeks. That\'s all it took to go from wondering if we\'d survive to having our best March ever. The difference? We stopped guessing and started using AI to understand what actually works.',
      author: 'Peter Pitcher',
      role: 'Owner, The Anchor',
    },
    order: 1,
  },
  {
    _type: 'caseStudy',
    title: 'The £250 Weekly Wake-Up Call',
    slug: { _type: 'slug', current: 'sunday-lunches' },
    subtitle: 'How watching perfectly good food hit the bin led to our pre-order system.',
    problem: [
      {
        _type: 'block',
        _key: 'p1',
        children: [{ _type: 'span', text: 'Throwing away £250 worth of food weekly', _key: 's1' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'p2',
        children: [{ _type: 'span', text: 'Prepping for 70 but only serving 45-50', _key: 's2' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'p3',
        children: [{ _type: 'span', text: 'Last-minute cancellations killed us', _key: 's3' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'p4',
        children: [{ _type: 'span', text: 'Never knew numbers until Sunday morning', _key: 's4' }],
        markDefs: [],
      },
    ],
    failedAttempts: [
      'Deposits scared regular customers away',
      'Complicated booking systems confused everyone',
      'Full payment upfront - nobody trusted it',
      'Paper forms got lost constantly',
    ],
    solution: [
      {
        _type: 'block',
        _key: 's1',
        children: [{ _type: 'span', text: 'Simple online pre-order form (Google Forms)', _key: 'sp1' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 's2',
        children: [{ _type: 'span', text: '£5 per person deposit - reasonable', _key: 'sp2' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 's3',
        children: [{ _type: 'span', text: 'Confirmation texts automated', _key: 'sp3' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 's4',
        children: [{ _type: 'span', text: 'Menu choices locked in = no waste', _key: 'sp4' }],
        markDefs: [],
      },
    ],
    results: [
      { metric: 'Weekly savings', value: '£250 in reduced waste' },
      { metric: 'Food waste', value: 'Down 90%' },
      { metric: 'No-shows', value: 'Almost eliminated' },
      { metric: 'Predictability', value: 'Know numbers by Friday' },
    ],
    timeInvestment: 'Setting up: 4 hours, Training: 1 hour, Weekly: 20 minutes',
    learnings: [
      '£5 deposit is the sweet spot',
      'Text reminders prevent no-shows',
      'Regulars now book weeks ahead',
      'Predictability changes everything',
    ],
    quote: {
      text: 'Every Sunday we\'d prep for 70 covers hoping for the best. When only 45 showed up, I\'d watch £250 worth of beautiful food go in the bin. Now with pre-orders and a £5 deposit, we prep exactly what we need. The waste is gone, the stress is gone, and regulars actually book weeks ahead.',
      author: 'Peter Pitcher',
      role: 'Owner, The Anchor',
    },
    order: 2,
  },
  {
    _type: 'caseStudy',
    title: 'From Social Media Nightmare to 70,000 Views Monthly',
    slug: { _type: 'slug', current: 'social-media' },
    subtitle: 'How AI turned our biggest weakness into our strongest marketing tool.',
    problem: [
      {
        _type: 'block',
        _key: 'p1',
        children: [{ _type: 'span', text: 'Posting maybe once a week if remembered', _key: 's1' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'p2',
        children: [{ _type: 'span', text: 'No consistency across platforms', _key: 's2' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'p3',
        children: [{ _type: 'span', text: 'Spending hours for mediocre results', _key: 's3' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'p4',
        children: [{ _type: 'span', text: 'Missing opportunities to promote events', _key: 's4' }],
        markDefs: [],
      },
    ],
    failedAttempts: [
      'Hiring social media manager - too expensive',
      'Staff posting randomly - no consistency',
      'Generic template posts - no personality',
      'Posting at wrong times - no engagement',
    ],
    solution: [
      {
        _type: 'block',
        _key: 's1',
        children: [{ _type: 'span', text: 'AI creates month of content in 30 minutes', _key: 'sp1' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 's2',
        children: [{ _type: 'span', text: 'Maintains our voice - casual, friendly, local', _key: 'sp2' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 's3',
        children: [{ _type: 'span', text: 'Auto-schedules for peak engagement times', _key: 'sp3' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 's4',
        children: [{ _type: 'span', text: 'Different versions for each platform', _key: 'sp4' }],
        markDefs: [],
      },
    ],
    results: [
      { metric: 'Posting frequency', value: 'Daily across 3 platforms' },
      { metric: 'Engagement rate', value: 'Up 240%' },
      { metric: 'Event attendance', value: '30% increase' },
      { metric: 'Time saved', value: '6 hours per week' },
    ],
    timeInvestment: 'Initial AI training: 2 hours, Monthly content: 30 minutes, Daily: 5 minutes',
    learnings: [
      'Consistency beats perfection',
      'Local groups drive real customers',
      'Behind-scenes content performs best',
      'Schedule everything in advance',
    ],
    quote: {
      text: 'I used to spend Sunday nights stressed about what to post on Monday. Now AI creates a month\'s worth of content in 30 minutes that sounds exactly like us - casual, friendly, local. We\'re getting 60,000-70,000 views monthly and people actually come in saying they saw our posts.',
      author: 'Peter Pitcher',
      role: 'Owner, The Anchor',
    },
    order: 3,
  },
  {
    _type: 'caseStudy',
    title: 'Why Heathrow Tourists Now Find Us First',
    slug: { _type: 'slug', current: 'search-visibility' },
    subtitle: 'Building a web presence that captures customers we never knew existed.',
    problem: [
      {
        _type: 'block',
        _key: 'p1',
        children: [{ _type: 'span', text: 'Didn\'t show up for "pubs near me"', _key: 's1' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'p2',
        children: [{ _type: 'span', text: 'Old website looked amateur', _key: 's2' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'p3',
        children: [{ _type: 'span', text: 'No online booking system', _key: 's3' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'p4',
        children: [{ _type: 'span', text: 'Lost customers to pubs with better web presence', _key: 's4' }],
        markDefs: [],
      },
    ],
    failedAttempts: [
      'Cheap website builder - looked terrible',
      'Paying for Google ads - too expensive',
      'Complicated SEO that we didn\'t understand',
      'Facebook page as main website - unprofessional',
    ],
    solution: [
      {
        _type: 'block',
        _key: 's1',
        children: [{ _type: 'span', text: 'Built proper website focused on local SEO', _key: 'sp1' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 's2',
        children: [{ _type: 'span', text: 'Online booking for events and Sundays', _key: 'sp2' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 's3',
        children: [{ _type: 'span', text: 'Google Business profile optimization', _key: 'sp3' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 's4',
        children: [{ _type: 'span', text: 'Mobile-first design (everyone searches on phones)', _key: 'sp4' }],
        markDefs: [],
      },
    ],
    results: [
      { metric: 'Google ranking', value: '#1 for "pub Stanwell Moor"' },
      { metric: 'Website visits', value: 'Up 450%' },
      { metric: 'Online bookings', value: '40% of all bookings' },
      { metric: 'New customers', value: '25% say "found you online"' },
    ],
    timeInvestment: 'Website build: 2 days with AI, Weekly updates: 15 minutes, Reviews: 10 minutes daily',
    learnings: [
      'Mobile experience is everything',
      'Local SEO beats paid ads',
      'Fast loading speeds matter',
      'Update Google Business weekly',
    ],
    quote: {
      text: 'Tourists staying at Heathrow hotels now find us easily. That\'s an extra 15-20 covers we never had before.',
      author: 'Peter Pitcher',
      role: 'Owner, The Anchor',
    },
    order: 4,
  },
  {
    _type: 'caseStudy',
    title: 'From Zero Teams to 35 Quiz Regulars',
    slug: { _type: 'slug', current: 'quiz-night' },
    subtitle: 'The night QuestionOne failed us was the night everything changed.',
    problem: [
      {
        _type: 'block',
        _key: 'p1',
        children: [{ _type: 'span', text: 'QuestionOne quiz was stale and predictable', _key: 's1' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'p2',
        children: [{ _type: 'span', text: 'Same 20-25 people every week', _key: 's2' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'p3',
        children: [{ _type: 'span', text: 'No local flavor or personality', _key: 's3' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'p4',
        children: [{ _type: 'span', text: 'Expensive monthly subscription', _key: 's4' }],
        markDefs: [],
      },
    ],
    failedAttempts: [
      'Writing quizzes took 3+ hours weekly',
      'Downloaded quiz packs were boring',
      'Too hard or too easy - never right',
      'No connection to local area or events',
    ],
    solution: [
      {
        _type: 'block',
        _key: 's1',
        children: [{ _type: 'span', text: 'AI creates custom quizzes in 20 minutes', _key: 'sp1' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 's2',
        children: [{ _type: 'span', text: 'Mix of local knowledge and general trivia', _key: 'sp2' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 's3',
        children: [{ _type: 'span', text: 'Difficulty adjusted based on feedback', _key: 'sp3' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 's4',
        children: [{ _type: 'span', text: '£2 entry keeps it accessible', _key: 'sp4' }],
        markDefs: [],
      },
    ],
    results: [
      { metric: 'Weekly attendance', value: '25-35 regulars', improvement: 'up from 20' },
      { metric: 'New teams', value: '3-4 monthly' },
      { metric: 'Quiz creation time', value: '20 minutes', improvement: 'down from 3 hours' },
      { metric: 'Monthly savings', value: '£60', improvement: 'no subscription' },
    ],
    timeInvestment: 'Quiz creation: 20 minutes weekly, One-time AI setup: 1 hour',
    learnings: [
      'Local questions create buzz',
      'Keep it fun, not too serious',
      'Build WhatsApp group for updates',
      'Tuesday is our perfect quiz night',
    ],
    quote: {
      text: 'QuestionOne was killing our quiz night - same questions, no personality. Now AI helps create quizzes that mention local events, our regulars, even pub jokes. Takes 20 minutes instead of 3 hours, and we\'ve gone from 20 to 35 regular teams.',
      author: 'Peter Pitcher',
      role: 'Owner, The Anchor',
    },
    order: 5,
  },
]

async function migrateCaseStudies() {
  console.log('Starting case studies migration...')

  try {
    for (const caseStudy of caseStudies) {
      console.log(`Creating case study: ${caseStudy.title}`)
      await client.create(caseStudy)
    }

    console.log('✅ Case studies migration complete!')
  } catch (error) {
    console.error('❌ Error migrating case studies:', error)
    process.exit(1)
  }
}

migrateCaseStudies()