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
  companyInfo: {
    description: 'AI-powered marketing solutions for UK pubs from real licensees who understand the challenges.',
    registrationInfo: 'Company Registration No: [To be added]',
    vatInfo: 'VAT Registration No: [To be added]',
  },
  quickLinks: [
    { title: 'Home', href: '/', external: false },
    { title: 'Services', href: '/services', external: false },
    { title: 'Results', href: '/results', external: false },
    { title: 'About', href: '/about', external: false },
    { title: 'Contact', href: '/contact', external: false },
    { title: 'The Anchor', href: 'https://the-anchor.pub', external: true },
  ],
  services: [
    { title: 'Empty Pub Recovery', href: '/services#empty-pub-recovery' },
    { title: 'Menu Makeover', href: '/services#boost-food-sales' },
    { title: 'Marketing Package', href: '/services#done-for-you-marketing' },
    { title: 'AI Training', href: '/services#ai-training' },
    { title: 'Website Development', href: '/services#website' },
    { title: 'View All Services', href: '/services' },
  ],
  legalLinks: [
    { title: 'Privacy Policy', href: '/privacy' },
    { title: 'Terms of Service', href: '/terms' },
    { title: 'Cookie Policy', href: '/cookies' },
  ],
  contactInfo: {
    title: 'Get in Touch',
    phone: '07990 587315',
    email: 'peter@orangejelly.co.uk',
    address: 'The Anchor, Horton Road, Stanwell Moor, Staines TW19 6AQ',
  },
  socialLinks: [
    {
      platform: 'facebook',
      url: 'https://www.facebook.com/orangejelly',
      label: 'Follow Orange Jelly on Facebook',
    },
  ],
  newsletter: {
    title: 'Pub Marketing Tips',
    description: 'Weekly tips to fill your pub, straight from The Anchor.',
    buttonText: 'Get Tips',
    privacyText: 'We respect your privacy. Unsubscribe anytime.',
  },
  bottomBar: {
    copyrightText: '© {year} Orange Jelly Limited. All rights reserved.',
    additionalText: 'Run by licensees, for licensees | Made with ❤️ in Stanwell Moor',
  },
}

async function migrateFooterContent() {
  console.log('Starting footer content migration...')

  try {
    // First delete existing document if it exists
    try {
      await client.delete('footerContent')
      console.log('Deleted existing footer content document')
    } catch (error) {
      console.log('No existing document to delete')
    }

    // Create new document
    console.log('Creating footer content document...')
    await client.create(footerContent)

    console.log('✅ Footer content migration complete!')
  } catch (error) {
    console.error('❌ Error migrating footer content:', error)
    process.exit(1)
  }
}

migrateFooterContent()