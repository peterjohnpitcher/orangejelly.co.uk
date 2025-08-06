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

const trustBadges = [
  {
    _type: 'trustBadge',
    title: 'No Agency Fees',
    subtitle: 'Just honest pricing',
    icon: 'money',
    color: 'orange',
    order: 1,
    isActive: true,
  },
  {
    _type: 'trustBadge',
    title: 'Results in 14 Days',
    subtitle: 'Or your money back',
    icon: 'clock',
    color: 'teal',
    order: 2,
    isActive: true,
  },
  {
    _type: 'trustBadge',
    title: 'Cost Effective',
    subtitle: 'Less than part-time staff',
    icon: 'shield',
    color: 'orange',
    order: 3,
    isActive: true,
  },
  {
    _type: 'trustBadge',
    title: 'Real Licensee',
    subtitle: 'Not just another agency',
    icon: 'heart',
    color: 'teal',
    order: 4,
    isActive: true,
  },
  {
    _type: 'trustBadge',
    title: '30-Day Guarantee',
    subtitle: 'Risk-free trial',
    icon: 'check',
    color: 'orange',
    order: 5,
    isActive: true,
  },
  {
    _type: 'trustBadge',
    title: 'Save 5+ Hours',
    subtitle: 'Every single week',
    icon: 'star',
    color: 'teal',
    order: 6,
    isActive: true,
  },
]

async function migrateTrustBadges() {
  console.log('Starting trust badges migration...')

  try {
    for (const badge of trustBadges) {
      console.log(`Creating trust badge: ${badge.title}...`)
      await client.create(badge)
    }

    console.log('✅ Trust badges migration complete!')
  } catch (error) {
    console.error('❌ Error migrating trust badges:', error)
    process.exit(1)
  }
}

migrateTrustBadges()