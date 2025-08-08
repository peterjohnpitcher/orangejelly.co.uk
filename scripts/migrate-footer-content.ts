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

const footerContent = {
  _type: 'footerContent',
  _id: 'footerContent',
  title: 'Footer Content',
  
  // Brand section
  brandSection: {
    tagline: 'Save At Least 5 Hours a Week',
    showLogo: true,
  },
  
  // The Anchor section
  anchorSection: {
    enabled: true,
    preText: 'Proven Daily At',
    url: 'https://the-anchor.pub',
    ctaText: 'Visit our pub →',
  },
  
  // Partnerships display
  partnershipsSection: {
    enabled: true,
    variant: 'minimal',
  },
  
  // Main link sections (4 columns)
  linkSections: [
    {
      _key: 'common-problems',
      title: 'Common Problems',
      links: [
        {
          _key: 'empty-nights',
          title: 'Empty Tuesday Nights',
          href: '/services#empty-pub-recovery',
          external: false,
          isText: false,
        },
        {
          _key: 'low-food',
          title: 'Low Food Sales',
          href: '/services#boost-food-sales',
          external: false,
          isText: false,
        },
        {
          _key: 'no-time',
          title: 'No Time for Marketing',
          href: '/services#done-for-you-marketing',
          external: false,
          isText: false,
        },
        {
          _key: 'not-found',
          title: "Can't Be Found Online",
          href: '/services#website',
          external: false,
          isText: false,
        },
      ],
    },
    {
      _key: 'quick-start',
      title: 'Quick Start',
      links: [
        {
          _key: 'home',
          title: 'Home',
          href: '/',
          external: false,
          isText: false,
        },
        {
          _key: 'services',
          title: 'Services & Pricing',
          href: '/services',
          external: false,
          isText: false,
        },
        {
          _key: 'results',
          title: 'Success Stories',
          href: '/results',
          external: false,
          isText: false,
        },
        {
          _key: 'roi-calc',
          title: 'ROI Calculator',
          href: '/#roi-calculator',
          external: false,
          isText: false,
        },
      ],
    },
    {
      _key: 'about-us',
      title: 'About Us',
      links: [
        {
          _key: 'our-story',
          title: 'Our Story',
          href: '/about',
          external: false,
          isText: false,
        },
        {
          _key: 'visit-anchor',
          title: 'Visit The Anchor',
          href: 'https://the-anchor.pub',
          external: true,
          isText: false,
        },
        {
          _key: 'contact-peter',
          title: 'Contact Peter',
          href: '/contact',
          external: false,
          isText: false,
        },
        {
          _key: 'ai-training',
          title: 'AI Training',
          href: '/services#training',
          external: false,
          isText: false,
        },
      ],
    },
    {
      _key: 'get-help',
      title: 'Get Help Now',
      links: [
        {
          _key: 'whatsapp',
          title: 'WhatsApp: 07990 587315',
          href: 'https://wa.me/447990587315',
          external: true,
          isText: false,
        },
        {
          _key: 'call',
          title: 'Call: 07990 587315',
          href: 'tel:07990587315',
          external: true,
          isText: false,
        },
        {
          _key: 'email',
          title: 'Email Us',
          href: 'mailto:peter@orangejelly.co.uk',
          external: true,
          isText: false,
        },
        {
          _key: 'response-time',
          title: 'Reply within 4 hours',
          href: '#',
          external: false,
          isText: true, // This is displayed as text, not a link
        },
      ],
    },
  ],
  
  // Bottom bar section
  bottomBar: {
    copyrightText: '© {year} Orange Jelly Limited',
    tagline: 'Run by licensees, for licensees',
  },
  
  // Bottom contact links
  bottomLinks: [
    {
      _key: 'bottom-whatsapp',
      title: '07990 587315',
      href: 'https://wa.me/447990587315',
      external: true,
    },
    {
      _key: 'bottom-email',
      title: 'Email: peter@orangejelly.co.uk',
      href: 'mailto:peter@orangejelly.co.uk',
      external: true,
    },
    {
      _key: 'bottom-anchor',
      title: 'Visit The Anchor',
      href: 'https://the-anchor.pub',
      external: true,
    },
  ],
  
  // Disclaimer text
  disclaimerText: "Orange Jelly is a small startup. I personally reply to every message. During service? I'll get back to you after. Otherwise, expect a reply within a few hours.",
}

async function migrateFooterContent() {
  console.log('Starting footer content migration...')
  console.log('Extracting all hardcoded content from Footer.tsx component')

  try {
    // First delete existing document if it exists
    try {
      await client.delete('footerContent')
      console.log('✓ Deleted existing footer content document')
    } catch (error) {
      console.log('→ No existing document to delete')
    }

    // Create new document with all extracted content
    console.log('\nCreating footer content document with:')
    console.log('  - Brand section with tagline')
    console.log('  - The Anchor pub section')
    console.log('  - Partnerships display settings')
    console.log('  - 4 link sections (Common Problems, Quick Start, About Us, Get Help Now)')
    console.log('  - Bottom bar with copyright and tagline')
    console.log('  - Bottom contact links')
    console.log('  - Disclaimer text')
    
    const result = await client.create(footerContent)
    
    console.log('\n✓ Footer content migration complete!')
    console.log(`✓ Document created with ID: ${result._id}`)
    console.log('\nExtracted content summary:')
    console.log(`  - ${footerContent.linkSections.length} link sections`)
    console.log(`  - ${footerContent.linkSections.reduce((acc, section) => acc + section.links.length, 0)} total links`)
    console.log(`  - ${footerContent.bottomLinks.length} bottom contact links`)
    console.log('\nThe footer is now a singleton document in Sanity.')
    console.log('All hardcoded content has been successfully extracted.')
  } catch (error) {
    console.error('✗ Error migrating footer content:', error)
    process.exit(1)
  }
}

// Run migration
migrateFooterContent()