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

const servicesFAQs = [
  // Empty Pub Recovery FAQs
  {
    _type: 'faq',
    question: 'How does the Empty Pub Recovery Package work?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'We work with you to implement AI-powered marketing strategies that have been proven at The Anchor. This includes training on social media automation, event promotion, and customer engagement. We charge £62.50 per hour plus VAT, and offer a 30-day money-back guarantee.'
          }
        ]
      }
    ],
    page: 'services',
    category: 'empty-pub-recovery',
    order: 1,
    isVoiceOptimized: false,
  },
  {
    _type: 'faq',
    question: 'How does your hourly consulting work?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'We charge £62.50 per hour plus VAT as a flat rate. I\'ll work with you to implement the AI strategies that have transformed The Anchor - from social media automation to event planning. First training session with a pub chain scheduled September 2025.'
          }
        ]
      }
    ],
    page: 'services',
    category: 'empty-pub-recovery',
    order: 2,
    isVoiceOptimized: false,
  },
  {
    _type: 'faq',
    question: 'How quickly will I see more customers from the recovery package?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Results vary by pub, but at The Anchor we\'ve seen quiz nights grow from 20 to 25-35 regulars, tasting nights with 85% retention, and 60,000-70,000 social media views monthly. Most improvements show within 30 days.'
          }
        ]
      }
    ],
    page: 'services',
    category: 'empty-pub-recovery',
    order: 3,
    isVoiceOptimized: true,
  },
  // Menu Makeover FAQs
  {
    _type: 'faq',
    question: 'How can menu descriptions increase my food sales?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Psychology-based menu descriptions guide customers to order more profitable dishes and increase average spend by £7 per table. We use proven techniques like sensory language, storytelling, and strategic positioning that have increased food GP by up to 15% for our clients.'
          }
        ]
      }
    ],
    page: 'services',
    category: 'menu-makeover',
    order: 4,
    isVoiceOptimized: false,
  },
  {
    _type: 'faq',
    question: 'What\'s the ROI on menu optimization?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'At The Anchor, we improved food GP from 58% to 71%. Menu psychology can increase average spend significantly. We charge £62.50 per hour for consultation, and most menu reviews take 2-3 hours.'
          }
        ]
      }
    ],
    page: 'services',
    category: 'menu-makeover',
    order: 5,
    isVoiceOptimized: true,
  },
  {
    _type: 'faq',
    question: 'How long does a menu makeover take?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'We deliver your new menu within 3-5 business days. You\'ll get both digital versions for online/social media and print-ready files. Implementation is immediate - you can start using the new descriptions right away.'
          }
        ]
      }
    ],
    page: 'services',
    category: 'menu-makeover',
    order: 6,
    isVoiceOptimized: false,
  },
  // Marketing Service FAQs
  {
    _type: 'faq',
    question: 'What\'s included in the Done-For-You marketing service?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'We create all your social media content, post to all channels, design and promote events, run email campaigns, and provide monthly ROI reports. You don\'t touch anything - we handle it all while you serve the extra customers.'
          }
        ]
      }
    ],
    page: 'services',
    category: 'marketing',
    order: 7,
    isVoiceOptimized: false,
  },
  {
    _type: 'faq',
    question: 'How much value can AI marketing add?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'We\'ve added £75,000-£100,000 of value to The Anchor using AI. It delivers 120-150 hours worth of equivalent work per week. We charge £62.50 per hour to teach you the same strategies.'
          }
        ]
      }
    ],
    page: 'services',
    category: 'marketing',
    order: 8,
    isVoiceOptimized: true,
  },
  // Website FAQs
  {
    _type: 'faq',
    question: 'Why do I need a website when I have social media?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: '80% of people check a pub\'s website before visiting. Without one, you\'re invisible on Google and losing £1000s in bookings to competitors. Our websites get you on Google\'s first page and convert browsers into bookings - one pub saw £4,000 extra bookings in 3 months.'
          }
        ]
      }
    ],
    page: 'services',
    category: 'website',
    order: 9,
    isVoiceOptimized: false,
  },
  {
    _type: 'faq',
    question: 'What makes your pub websites different?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Built specifically for pubs with integrated booking systems, mobile-first design (80% browse on phones), and local SEO that gets you found. Plus, we handle all updates for you. Live in 2 weeks, typically see ROI within 8 weeks.'
          }
        ]
      }
    ],
    page: 'services',
    category: 'website',
    order: 10,
    isVoiceOptimized: false,
  },
  // Business Analysis FAQs
  {
    _type: 'faq',
    question: 'What\'s included in your pub business analysis?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'We analyze 9 key areas including GP optimization, quiet period solutions, event profitability, social media effectiveness, competitor gaps, quick wins for cash flow, staff efficiency, customer data opportunities, and local market positioning. Delivered as a practical action plan with projected ROI for each recommendation.'
          }
        ]
      }
    ],
    page: 'services',
    category: 'business-analysis',
    order: 11,
    isVoiceOptimized: false,
  },
  {
    _type: 'faq',
    question: 'How can you improve my GP to 71%?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Through menu engineering, waste reduction systems, portion control, and strategic pricing. At The Anchor, we improved from 58% to 71% using these exact methods. Most pubs see 5-10% improvement within 60 days.'
          }
        ]
      }
    ],
    page: 'services',
    category: 'business-analysis',
    order: 12,
    isVoiceOptimized: true,
  },
  // Training FAQs
  {
    _type: 'faq',
    question: 'What will I learn in the AI training for licensees?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'How to add 25 hours of value weekly using AI: create rotas in minutes, write menus that sell, automate social media (60,000+ views monthly at The Anchor), handle bookings while you sleep, and use AI for all the boring bits so you can focus on customers. No tech knowledge needed.'
          }
        ]
      }
    ],
    page: 'services',
    category: 'training',
    order: 13,
    isVoiceOptimized: false,
  },
  {
    _type: 'faq',
    question: 'Is AI training suitable for someone who\'s not tech-savvy?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Absolutely! We\'re licensees, not tech experts. Our training is designed for busy pub owners who want practical solutions, not complicated technology. We focus on simple tools that save time immediately.'
          }
        ]
      }
    ],
    page: 'services',
    category: 'training',
    order: 14,
    isVoiceOptimized: false,
  },
  // General FAQs
  {
    _type: 'faq',
    question: 'Do you offer payment plans?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Yes, we offer flexible payment plans to spread the cost. We understand cash flow challenges in hospitality. Let\'s discuss what works for your budget - most packages can be split into 2-3 monthly payments.'
          }
        ]
      }
    ],
    page: 'services',
    category: 'general',
    order: 15,
    isVoiceOptimized: false,
  },
  {
    _type: 'faq',
    question: 'What if I\'m not happy with the results?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'We offer a 30-day money-back guarantee on most services. If we don\'t deliver the promised results, you get a full refund. We\'re confident because these strategies work - we use them in our own pub.'
          }
        ]
      }
    ],
    page: 'services',
    category: 'general',
    order: 16,
    isVoiceOptimized: true,
  },
  {
    _type: 'faq',
    question: 'Can I pick and mix services?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Of course! Every pub has different needs. Start with your biggest pain point, see the results, then add more services as needed. Many pubs start with a menu makeover then add marketing once they see the impact.'
          }
        ]
      }
    ],
    page: 'services',
    category: 'general',
    order: 17,
    isVoiceOptimized: false,
  },
  {
    _type: 'faq',
    question: 'How is Orange Jelly different from other marketing agencies?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'We actually run a pub - The Anchor in Stanwell Moor. We\'re not marketers who\'ve never pulled a pint. Every strategy we recommend has been tested in our own business first. Plus, we guarantee results or your money back.'
          }
        ]
      }
    ],
    page: 'services',
    category: 'general',
    order: 18,
    isVoiceOptimized: false,
  },
]

async function migrateServicesFAQs() {
  console.log('Starting Services page FAQs migration...')

  try {
    for (const faq of servicesFAQs) {
      console.log(`Creating FAQ: ${faq.question}...`)
      await client.create(faq)
    }

    console.log('✅ Services page FAQs migration complete!')
  } catch (error) {
    console.error('❌ Error migrating Services FAQs:', error)
    process.exit(1)
  }
}

migrateServicesFAQs()