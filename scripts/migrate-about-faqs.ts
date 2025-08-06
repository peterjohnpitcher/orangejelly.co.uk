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

const aboutFAQs = [
  {
    _type: 'faq',
    question: 'Who is Peter Pitcher and why should I trust Orange Jelly?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: "I'm Peter Pitcher, and I've run The Anchor pub in Stanwell Moor with my husband Billy since March 2019. I also work full-time as an AI Marketing Capabilities Lead for a global food manufacturer. I've been an early AI adopter since 2021 and discovered how AI can add 25 hours of value per week. Orange Jelly exists to share these proven strategies with fellow licensees."
          }
        ]
      }
    ],
    page: 'about',
    category: 'about-us',
    order: 1,
    isVoiceOptimized: true,
  },
  {
    _type: 'faq',
    question: 'What makes Orange Jelly different from other consultants?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: "We're not consultants who've never pulled a pint. We run an actual pub and test every strategy in our own business first. No corporate nonsense, no jargon - just one licensee helping another with tools that actually work. Plus, we guarantee results or your money back."
          }
        ]
      }
    ],
    page: 'about',
    category: 'about-us',
    order: 2,
    isVoiceOptimized: false,
  },
  {
    _type: 'faq',
    question: 'Is Orange Jelly a big company?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: "No, Orange Jelly started in 2016 with Laura Willis as a digital agency, then pivoted in 2019. Now it's just me (Peter) working around my full-time job, running The Anchor, and family life. No big office, no sales team. This means you get personal service, honest advice, and someone who genuinely understands your challenges because I face them too."
          }
        ]
      }
    ],
    page: 'about',
    category: 'about-us',
    order: 3,
    isVoiceOptimized: false,
  },
  {
    _type: 'faq',
    question: 'Why is it called Orange Jelly?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: "Just a fun play on words in a world that's ever-changing! We wanted a name that's friendly, memorable, and doesn't take itself too seriously - just like us. It reflects our approach: making complicated things simple and approachable."
          }
        ]
      }
    ],
    page: 'about',
    category: 'about-us',
    order: 4,
    isVoiceOptimized: false,
  },
  {
    _type: 'faq',
    question: 'Can I visit The Anchor to see your strategies in action?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: "Absolutely! We'd love to show you around. Pop in for a pint and see how we use AI tools in real pub operations. First pint's on me if you mention Orange Jelly. We're at Horton Road, Stanwell Moor, Staines TW19 6AQ."
          }
        ]
      }
    ],
    page: 'about',
    category: 'about-us',
    order: 5,
    isVoiceOptimized: false,
  },
  {
    _type: 'faq',
    question: 'How did you discover AI could help pubs?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Through my curiosity for technology and being an early adopter. I started with ChatGPT in 2021 when it first launched. The early results were terrible, but as the models evolved, they became business-ready. Now AI helps me deliver 120-150 hours worth of equivalent work per week in my spare time.'
          }
        ]
      }
    ],
    page: 'about',
    category: 'about-us',
    order: 6,
    isVoiceOptimized: false,
  },
  {
    _type: 'faq',
    question: 'What results have you achieved at The Anchor?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: "We've improved food GP from 58% to 71%, grown quiz nights to 25-35 regulars, achieve 60,000-70,000 social media views monthly, and added £75,000-£100,000 of value to our business using AI. Most importantly - we got our evenings back. Every strategy we share has delivered real results in our own pub."
          }
        ]
      }
    ],
    page: 'about',
    category: 'results',
    order: 7,
    isVoiceOptimized: true,
  },
  {
    _type: 'faq',
    question: 'Do you understand the challenges of running a small pub?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: "Completely. We've dealt with empty Monday nights, staff no-shows, supplier price hikes, TripAdvisor nightmares, and competing with Wetherspoons. That's why our solutions are practical, affordable, and designed for real pub life."
          }
        ]
      }
    ],
    page: 'about',
    category: 'about-us',
    order: 8,
    isVoiceOptimized: false,
  },
  {
    _type: 'faq',
    question: 'Is Orange Jelly just about AI and technology?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: "No, it's about giving you your life back. AI is just the tool - the real goal is helping you work less and earn more. Whether that's automating social media so you can have Sunday lunch with family, or creating menus that sell themselves so you're not stressing about GP."
          }
        ]
      }
    ],
    page: 'about',
    category: 'about-us',
    order: 9,
    isVoiceOptimized: false,
  },
  {
    _type: 'faq',
    question: 'How can I be sure Orange Jelly will work for my pub?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: "Every pub is different, but the challenges are similar. That's why we offer a free consultation to understand your specific situation, and a 30-day money-back guarantee. We're so confident because these aren't theories - they're proven strategies from our own pub."
          }
        ]
      }
    ],
    page: 'about',
    category: 'service',
    order: 10,
    isVoiceOptimized: false,
  },
  {
    _type: 'faq',
    question: 'What areas does Orange Jelly cover?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'For in-person training and consultations, we cover a 30-mile radius from Stanwell Moor (Surrey, Berkshire, West London). For online services like marketing and menu design, we help pubs across the UK. Technology means distance isn\'t a barrier.'
          }
        ]
      }
    ],
    page: 'about',
    category: 'service',
    order: 11,
    isVoiceOptimized: false,
  },
  {
    _type: 'faq',
    question: "What's your promise to pub owners?",
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'To save you at least 5 hours per week on admin tasks, be honest about what AI can and can\'t do, only recommend tools we use ourselves, keep prices transparent and fair, and provide personal support when you need it. Plus our 30-day money-back guarantee.'
          }
        ]
      }
    ],
    page: 'about',
    category: 'service',
    order: 12,
    isVoiceOptimized: true,
  },
]

async function migrateAboutFAQs() {
  console.log('Starting About page FAQs migration...')

  try {
    for (const faq of aboutFAQs) {
      console.log(`Creating FAQ: ${faq.question}...`)
      await client.create(faq)
    }

    console.log('✅ About page FAQs migration complete!')
  } catch (error) {
    console.error('❌ Error migrating About FAQs:', error)
    process.exit(1)
  }
}

migrateAboutFAQs()