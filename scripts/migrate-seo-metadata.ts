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

const seoMetadata = [
  {
    _type: 'seoMetadata',
    page: 'home',
    title: 'How to Fill Empty Pub Tables | Pub Marketing That Works',
    description: 'Struggling with empty pub tables? AI-powered marketing from a real licensee who turned The Anchor around. Save 5+ hours weekly. £75/hour plus VAT.',
    keywords: [
      'pub marketing UK',
      'fill empty pub tables',
      'pub marketing strategies',
      'increase pub customers',
      'pub social media marketing',
      'pub turnaround',
      'empty pub solutions'
    ],
    openGraph: {
      title: 'How to Fill Empty Pub Tables | Pub Marketing That Works',
      description: 'Struggling with empty pub tables? We use AI-powered marketing strategies that transformed The Anchor. First pub chain training September 2025.',
    },
  },
  {
    _type: 'seoMetadata',
    page: 'about',
    title: 'About Orange Jelly - From One Licensee to Another',
    description: 'Meet Peter Pitcher, pub owner who helps UK licensees save 5+ hours weekly with AI tools. Real experience from running The Anchor pub since 2019.',
    keywords: [
      'Peter Pitcher',
      'Orange Jelly',
      'pub AI tools',
      'The Anchor Stanwell Moor',
      'pub marketing consultant',
      'licensee helping licensees'
    ],
  },
  {
    _type: 'seoMetadata',
    page: 'services',
    title: 'Pub Marketing Services | AI Tools for Licensees',
    description: 'Pub marketing that actually works. Menu optimization, social media, websites, AI training. From £75/hour. 30-day guarantee from real licensees.',
    keywords: [
      'pub marketing services',
      'pub menu design',
      'pub social media management',
      'pub website design',
      'AI training for pubs',
      'pub consultancy UK'
    ],
  },
  {
    _type: 'seoMetadata',
    page: 'results',
    title: 'Pubs That Were Empty. Now They\'re Not',
    description: 'How The Anchor transformed: 25-35 quiz regulars, 71% food GP, £250/week savings. Real success stories using AI tools. See proven strategies.',
    keywords: [
      'pub success stories',
      'pub turnaround case studies',
      'increase pub revenue',
      'pub marketing results',
      'The Anchor success',
      'pub transformation'
    ],
  },
  {
    _type: 'seoMetadata',
    page: 'contact',
    title: 'Contact Orange Jelly | Get Pub Marketing Help',
    description: 'Chat with Peter Pitcher about your pub challenges. WhatsApp preferred, personal replies guaranteed. £75/hour plus VAT. 30-day guarantee.',
    keywords: [
      'contact Orange Jelly',
      'pub marketing help',
      'Peter Pitcher contact',
      'pub consultation',
      'WhatsApp pub help'
    ],
  },
  {
    _type: 'seoMetadata',
    page: 'licensees-guide',
    title: 'The Licensee\'s Guide | Practical Pub Marketing Tips',
    description: 'Free pub marketing guides from a working licensee. Fill empty tables, boost food sales, beat competition. Real strategies from The Anchor.',
    keywords: [
      'pub marketing guide',
      'licensee tips',
      'pub business advice',
      'free pub marketing',
      'pub owner guide',
      'hospitality marketing'
    ],
  },
  {
    _type: 'seoMetadata',
    page: 'default',
    title: 'Orange Jelly | AI-Powered Pub Marketing',
    description: 'AI-powered marketing for UK pubs from real licensees. Save 5+ hours weekly, fill empty tables, boost revenue. £75/hour plus VAT.',
    keywords: [
      'Orange Jelly',
      'pub marketing',
      'AI tools for pubs',
      'UK pub consultancy',
      'licensee support'
    ],
  },
]

async function migrateSEOMetadata() {
  console.log('Starting SEO metadata migration...')

  try {
    for (const metadata of seoMetadata) {
      console.log(`Creating SEO metadata for ${metadata.page} page...`)
      await client.create(metadata)
    }

    console.log('✅ SEO metadata migration complete!')
  } catch (error) {
    console.error('❌ Error migrating SEO metadata:', error)
    process.exit(1)
  }
}

migrateSEOMetadata()