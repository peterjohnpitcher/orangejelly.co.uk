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

const aboutContent = {
  _type: 'aboutContent',
  _id: 'aboutContent',
  title: 'About Orange Jelly',
  heroSection: {
    title: 'From One Licensee to Another',
    subtitle: 'We run The Anchor in Stanwell Moor. We discovered how AI saves 25 hours a week. Now we help other licensees do the same.',
  },
  story: [
    {
      _type: 'block',
      _key: 's1',
      children: [
        { _type: 'span', text: 'I\'m Peter. My husband Billy and I have run ', _key: 'sp1' },
        { _type: 'span', text: 'The Anchor in Stanwell Moor', marks: ['strong'], _key: 'sp2' },
        { _type: 'span', text: ' since March 2019. Like you, we\'ve faced empty tables, rising costs, and 70-hour weeks wondering if it\'s all worth it.', _key: 'sp3' },
      ],
      markDefs: [],
    },
    {
      _type: 'block',
      _key: 's2',
      children: [
        { _type: 'span', text: 'Everything changed when I discovered how ', _key: 'sp4' },
        { _type: 'span', text: 'AI could transform pub operations', marks: ['strong'], _key: 'sp5' },
        { _type: 'span', text: '. As an early adopter since 2021, I\'ve tested everything - the failures taught me what to avoid, the successes showed me what to share.', _key: 'sp6' },
      ],
      markDefs: [],
    },
    {
      _type: 'block',
      _key: 's3',
      children: [
        { _type: 'span', text: 'Today, our quiz nights attract ', _key: 'sp7' },
        { _type: 'span', text: '25-35 regulars', marks: ['strong'], _key: 'sp8' },
        { _type: 'span', text: ', our food GP improved from ', _key: 'sp9' },
        { _type: 'span', text: '58% to 71%', marks: ['strong'], _key: 'sp10' },
        { _type: 'span', text: ', and we actually have evenings off. Orange Jelly exists to help you achieve the same transformation.', _key: 'sp11' },
      ],
      markDefs: [],
    },
  ],
  timeline: [
    {
      _key: 'timeline_0',
      date: 'March 2019',
      title: 'Took Over The Anchor',
      description: 'Faced with a struggling pub, empty tables, and no idea what we were doing.',
      highlight: true,
    },
    {
      _key: 'timeline_1',
      date: '2021',
      title: 'Discovered AI Tools',
      description: 'Started experimenting with early AI models for pub operations.',
      highlight: false,
    },
    {
      _key: 'timeline_2',
      date: 'Jan-Feb 2024',
      title: 'The Turning Point',
      description: 'Six brutal weeks that forced us to embrace AI fully. GP hit 71%.',
      highlight: true,
    },
    {
      _key: 'timeline_3',
      date: '2024',
      title: 'Orange Jelly Reborn',
      description: 'Started helping other licensees with proven AI strategies.',
      highlight: false,
    },
    {
      _key: 'timeline_4',
      date: 'September 2025',
      title: 'First Pub Chain Training',
      description: 'Scheduled to train our first multi-site pub company.',
      highlight: true,
    },
  ],
  values: [
    {
      _key: 'value_0',
      icon: '🎯',
      title: 'Real Experience',
      description: 'We run an actual pub. Every strategy has been tested at The Anchor first.',
    },
    {
      _key: 'value_1',
      icon: '💰',
      title: 'Honest Pricing',
      description: '£62.50 per hour plus VAT. No packages, no hidden fees, no surprises.',
    },
    {
      _key: 'value_2',
      icon: '🛡️',
      title: 'Guaranteed Results',
      description: '30-day money-back guarantee because we believe in what we do.',
    },
    {
      _key: 'value_3',
      icon: '🤝',
      title: 'Personal Service',
      description: 'Just me, no sales team. You get direct access to someone who understands.',
    },
  ],
  founderSection: {
    name: 'Peter Pitcher',
    role: 'Founder & Pub Owner',
    bio: [
      {
        _type: 'block',
        _key: 'b1',
        children: [
          { _type: 'span', text: 'I\'m not your typical consultant. By day, I\'m an AI Marketing Capabilities Lead for a global food manufacturer. By night and weekends, I\'m pulling pints at The Anchor.', _key: 'bs1' },
        ],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'b2',
        children: [
          { _type: 'span', text: 'My curiosity for technology made me an early AI adopter in 2021. When I saw how it could save hours on pub admin, I had to share it with other licensees struggling like we were.', _key: 'bs2' },
        ],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'b3',
        children: [
          { _type: 'span', text: 'Now I help pubs across the UK implement the same AI strategies that transformed our business. No theory, no fluff - just practical tools that work in real pub life.', _key: 'bs3' },
        ],
        markDefs: [],
      },
    ],
    quote: 'I\'ve been where you are - staring at empty tables, wondering how to compete. AI gave us our life back. Let me show you how.',
  },
  teamMembers: [
    {
      _key: 'team_0',
      name: 'Billy Summers',
      role: 'Co-Owner, The Anchor',
      bio: 'My husband Billy handles day-to-day operations at The Anchor. His operational expertise combined with our AI tools has transformed how we run the pub.',
    },
  ],
  partnerships: [
    {
      _key: 'partner_0',
      name: 'Greene King',
      description: 'We operate The Anchor as a Greene King tenant, sharing our AI innovations with one of the UK\'s leading pub companies.',
      url: 'https://www.greeneking.co.uk',
      logoUrl: '/partners/greene-king-logo.svg',
    },
    {
      _key: 'partner_1',
      name: 'British Institute of Innkeeping',
      description: 'Proud BII members, featured in their Autumn 2025 magazine for our AI innovation in hospitality.',
      url: 'https://www.bii.org',
      logoUrl: '/partners/bii-logo.svg',
    },
    {
      _key: 'partner_2',
      name: 'Federation of Small Businesses',
      description: 'FSB members supporting the UK\'s small business community.',
      url: 'https://www.fsb.org.uk',
      logoUrl: '/partners/fsb-logo.svg',
    },
  ],
  whyOrangeJelly: {
    title: 'Why Orange Jelly?',
    content: [
      {
        _type: 'block',
        _key: 'w1',
        children: [
          { _type: 'span', text: 'Orange Jelly started as a digital agency in 2016 with Laura Willis. When I took over The Anchor in 2019, it pivoted to focus on what I know best - helping pubs thrive.', _key: 'ws1' },
        ],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'w2',
        children: [
          { _type: 'span', text: 'The name? Just a fun play on words! We wanted something friendly and memorable that doesn\'t take itself too seriously - just like us. It reflects our approach: making complicated things simple and approachable.', _key: 'ws2' },
        ],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'w3',
        children: [
          { _type: 'span', text: 'Today, Orange Jelly is just me working around my full-time job and pub duties. No big office, no sales team - which means you get personal service from someone who genuinely understands your challenges.', _key: 'ws3' },
        ],
        markDefs: [],
      },
    ],
  },
}

async function migrateAboutContent() {
  console.log('Starting about content migration...')

  try {
    // First delete existing document if it exists
    try {
      await client.delete('aboutContent')
      console.log('Deleted existing about content document')
    } catch (error) {
      console.log('No existing document to delete')
    }

    // Create new document
    console.log('Creating about content document...')
    await client.create(aboutContent)

    console.log('✅ About content migration complete!')
  } catch (error) {
    console.error('❌ Error migrating about content:', error)
    process.exit(1)
  }
}

migrateAboutContent()