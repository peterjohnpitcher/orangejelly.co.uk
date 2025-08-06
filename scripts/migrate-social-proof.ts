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

const socialProofItems = [
  {
    _type: 'socialProof',
    title: 'Sunday Roast Sales',
    value: '£400+',
    timeframe: 'per week',
    location: 'The Anchor',
    category: 'revenue',
    displayText: 'Sunday roast sales up £400+ per week',
    order: 1,
    isActive: true,
  },
  {
    _type: 'socialProof',
    title: 'Wednesday Night Covers',
    value: '60+',
    timeframe: 'from 20',
    location: 'The Anchor',
    category: 'attendance',
    displayText: 'Wednesday nights from 20 to 60+ covers',
    order: 2,
    isActive: true,
  },
  {
    _type: 'socialProof',
    title: 'Quiz Night Attendance',
    value: '80%',
    timeframe: 'increase',
    location: 'The Anchor',
    category: 'growth',
    displayText: 'Quiz night attendance up 80%',
    order: 3,
    isActive: true,
  },
  {
    _type: 'socialProof',
    title: 'Overall Revenue',
    value: '22%',
    timeframe: 'growth',
    location: 'The Anchor',
    category: 'growth',
    displayText: '22% overall revenue growth',
    order: 4,
    isActive: true,
  },
  {
    _type: 'socialProof',
    title: 'Food GP',
    value: '71%',
    timeframe: 'current',
    location: 'The Anchor',
    category: 'efficiency',
    displayText: '71% food GP achieved',
    order: 5,
    isActive: true,
  },
  {
    _type: 'socialProof',
    title: 'Sunday Lunch Waste',
    value: '£250',
    timeframe: 'weekly savings',
    location: 'The Anchor',
    category: 'savings',
    displayText: '£250 weekly savings on Sunday lunch waste',
    order: 6,
    isActive: true,
  },
  {
    _type: 'socialProof',
    title: 'Quiz Regulars',
    value: '25-35',
    timeframe: 'weekly',
    location: 'The Anchor',
    category: 'attendance',
    displayText: '25-35 quiz regulars every week',
    order: 7,
    isActive: true,
  },
  {
    _type: 'socialProof',
    title: 'Time Saved',
    value: '25 hours',
    timeframe: 'weekly',
    location: 'The Anchor',
    category: 'efficiency',
    displayText: 'Save 25 hours weekly using AI',
    order: 8,
    isActive: true,
  },
]

async function migrateSocialProof() {
  console.log('Starting social proof migration...')

  try {
    for (const item of socialProofItems) {
      console.log(`Creating social proof: ${item.title}...`)
      await client.create(item)
    }

    console.log('✅ Social proof migration complete!')
  } catch (error) {
    console.error('❌ Error migrating social proof:', error)
    process.exit(1)
  }
}

migrateSocialProof()