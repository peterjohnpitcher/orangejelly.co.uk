/**
 * Migration script to create CTA message documents in Sanity
 * Extracts all hardcoded CTA messages from the codebase and creates
 * structured documents for centralized management
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!, // Requires write access
  apiVersion: '2024-01-01',
  useCdn: false
})

// Type for CTA message document
interface CTAMessageDocument {
  _type: 'ctaMessage'
  identifier: {
    _type: 'slug'
    current: string
  }
  title: string
  heading: string
  subheading?: string
  buttonText: string
  buttonAction: 'whatsapp' | 'phone' | 'email' | 'internal' | 'external'
  actionValue: string
  bottomText?: string
  variant?: 'orange' | 'teal' | 'white' | 'cream'
  usage?: string[]
}

// All CTA messages found in the codebase, organized by page/section
const ctaMessages: CTAMessageDocument[] = [
  // ==========================================
  // HOMEPAGE CTAs
  // ==========================================
  {
    _type: 'ctaMessage',
    identifier: {
      _type: 'slug',
      current: 'homepage-main-cta'
    },
    title: 'Homepage - Main CTA',
    heading: 'Ready to Turn Your Pub Around?',
    subheading: "Let's talk about what's really hurting your business. I'll share the exact strategies that saved ours.",
    buttonText: 'Fill Your Pub',
    buttonAction: 'whatsapp',
    actionValue: "Hi Peter, got time for a quick chat about my pub?",
    variant: 'orange',
    usage: ['homepage']
  },
  {
    _type: 'ctaMessage',
    identifier: {
      _type: 'slug',
      current: 'homepage-free-chat'
    },
    title: 'Homepage - Free Chat Banner',
    heading: 'Stop Struggling. Start Thriving.',
    subheading: "Tell me what's killing your business. I'll share exactly how we fixed the same problems at The Anchor. Real solutions, no fluff.",
    buttonText: 'Get Marketing Help',
    buttonAction: 'whatsapp',
    actionValue: "Hi Peter, got time for a quick chat about my pub?",
    variant: 'orange',
    usage: ['homepage']
  },
  {
    _type: 'ctaMessage',
    identifier: {
      _type: 'slug',
      current: 'homepage-roi-section'
    },
    title: 'Homepage - ROI Section',
    heading: 'Ready to Increase Your Revenue?',
    subheading: 'Choose the solution that fits your budget and timeline',
    buttonText: 'Get Started',
    buttonAction: 'internal',
    actionValue: '/services',
    variant: 'white',
    usage: ['homepage']
  },

  // ==========================================
  // SERVICES PAGE CTAs
  // ==========================================
  {
    _type: 'ctaMessage',
    identifier: {
      _type: 'slug',
      current: 'services-main-cta'
    },
    title: 'Services - Main CTA',
    heading: 'Stop Watching Money Walk Past Your Pub',
    subheading: "Every empty table is lost revenue. Every quiet night is bills unpaid. Let's change that - starting today.",
    buttonText: 'WhatsApp me now',
    buttonAction: 'whatsapp',
    actionValue: "Hi Peter, I saw your services page and need help with my pub",
    bottomText: 'WhatsApp: 07990 587315 • Available 7 days a week',
    variant: 'orange',
    usage: ['services']
  },
  {
    _type: 'ctaMessage',
    identifier: {
      _type: 'slug',
      current: 'services-money-back'
    },
    title: 'Services - Money Back Guarantee',
    heading: '30-Day Money-Back Guarantee',
    subheading: "If you don't see real improvements within 30 days, I'll refund every penny. That's how confident I am these strategies work - because they saved my pub.",
    buttonText: 'Start Risk-Free',
    buttonAction: 'whatsapp',
    actionValue: "Hi Peter, I'd like to chat about Orange Jelly",
    variant: 'teal',
    usage: ['services']
  },

  // ==========================================
  // ABOUT PAGE CTAs
  // ==========================================
  {
    _type: 'ctaMessage',
    identifier: {
      _type: 'slug',
      current: 'about-main-cta'
    },
    title: 'About - Main CTA',
    heading: 'Ready to Transform Your Pub?',
    subheading: "Let's chat about your challenges. No sales pitch, just one licensee to another.",
    buttonText: 'Fill Your Pub',
    buttonAction: 'whatsapp',
    actionValue: "Hi Peter, got time for a quick chat about my pub?",
    variant: 'orange',
    usage: ['about']
  },
  {
    _type: 'ctaMessage',
    identifier: {
      _type: 'slug',
      current: 'about-visit-anchor'
    },
    title: 'About - Visit The Anchor',
    heading: 'Come See The Results Yourself',
    subheading: "Visit The Anchor and see how we use AI in real pub operations. First pint's on me if you mention Orange Jelly.",
    buttonText: 'Get Directions',
    buttonAction: 'external',
    actionValue: 'https://maps.google.com/?q=The+Anchor+Stanwell+Moor',
    variant: 'teal',
    usage: ['about']
  },

  // ==========================================
  // RESULTS PAGE CTAs
  // ==========================================
  {
    _type: 'ctaMessage',
    identifier: {
      _type: 'slug',
      current: 'results-main-cta'
    },
    title: 'Results - Main CTA',
    heading: "Let's Fix Your Biggest Problem First",
    subheading: "Tell me what's killing your business. I'll show you exactly how we fixed it at The Anchor.",
    buttonText: 'Fill Your Pub',
    buttonAction: 'whatsapp',
    actionValue: "Hi Peter, got time for a quick chat about my pub?",
    variant: 'orange',
    usage: ['results']
  },
  {
    _type: 'ctaMessage',
    identifier: {
      _type: 'slug',
      current: 'results-get-similar'
    },
    title: 'Results - Get Similar Results',
    heading: 'Ready to Get Similar Results?',
    subheading: 'Choose where to start based on your biggest challenge',
    buttonText: 'Get Started',
    buttonAction: 'internal',
    actionValue: '/services',
    variant: 'white',
    usage: ['results']
  },

  // ==========================================
  // LANDING PAGE CTAs
  // ==========================================
  {
    _type: 'ctaMessage',
    identifier: {
      _type: 'slug',
      current: 'empty-pub-solutions-cta'
    },
    title: 'Empty Pub Solutions - Main CTA',
    heading: 'How Many Empty Tables Can You Afford Tonight?',
    subheading: "Every day you wait is money lost. Let's fill your pub starting tomorrow.",
    buttonText: 'Get My 30-Day Plan',
    buttonAction: 'whatsapp',
    actionValue: 'I need help filling my empty pub',
    variant: 'orange',
    usage: ['landing']
  },
  {
    _type: 'ctaMessage',
    identifier: {
      _type: 'slug',
      current: 'quiet-midweek-cta'
    },
    title: 'Quiet Midweek - Main CTA',
    heading: 'How Much Longer Can You Afford Dead Nights?',
    subheading: "Every quiet Monday-Thursday costs you £1,500+. Let's turn those ghost towns into gold mines.",
    buttonText: 'Get My Midweek Plan',
    buttonAction: 'whatsapp',
    actionValue: 'Help me fix my quiet midweek nights',
    variant: 'orange',
    usage: ['landing']
  },
  {
    _type: 'ctaMessage',
    identifier: {
      _type: 'slug',
      current: 'pub-rescue-cta'
    },
    title: 'Pub Rescue - Emergency CTA',
    heading: "Don't Let Your Pub Become Another Statistic",
    subheading: "Every day without help pushes you closer to closing. Let's turn this around - fast.",
    buttonText: 'Get Emergency Pub Help Now',
    buttonAction: 'whatsapp',
    actionValue: "Peter, my pub needs urgent help with [describe your crisis]",
    variant: 'orange',
    usage: ['landing']
  },
  {
    _type: 'ctaMessage',
    identifier: {
      _type: 'slug',
      current: 'no-budget-marketing-cta'
    },
    title: 'No Budget Marketing - Main CTA',
    heading: 'Empty Pub + No Budget = Big Problem',
    subheading: "But with the right free strategies, you'll fill tables fast. Let's get started today.",
    buttonText: 'Show Me How',
    buttonAction: 'whatsapp',
    actionValue: 'Help me market my pub for free',
    variant: 'orange',
    usage: ['landing']
  },
  {
    _type: 'ctaMessage',
    identifier: {
      _type: 'slug',
      current: 'compete-with-chains-cta'
    },
    title: 'Compete with Chains - Main CTA',
    heading: "Ready to Show the Chains How It's Done?",
    subheading: "Stop losing customers to chains. Let's build a pub they can't compete with.",
    buttonText: 'Get My Battle Plan',
    buttonAction: 'whatsapp',
    actionValue: 'Help me compete with chain pubs',
    variant: 'orange',
    usage: ['landing']
  },

  // ==========================================
  // REUSABLE/GENERIC CTAs
  // ==========================================
  {
    _type: 'ctaMessage',
    identifier: {
      _type: 'slug',
      current: 'generic-transform-pub'
    },
    title: 'Generic - Transform Your Pub',
    heading: 'Ready to Transform Your Pub?',
    subheading: "Let's discuss your specific challenges and find the right solution for you.",
    buttonText: 'Get Started',
    buttonAction: 'whatsapp',
    actionValue: "Hi Peter, got time for a quick chat about my pub?",
    variant: 'orange',
    usage: ['homepage', 'services', 'about', 'landing']
  },
  {
    _type: 'ctaMessage',
    identifier: {
      _type: 'slug',
      current: 'generic-fill-tables'
    },
    title: 'Generic - Fill Your Tables',
    heading: 'Ready to Fill Your Tables?',
    subheading: 'Stop watching empty tables. Start seeing results with proven strategies.',
    buttonText: 'Fill Your Pub',
    buttonAction: 'whatsapp',
    actionValue: "Hi Peter, I need help filling my pub",
    variant: 'orange',
    usage: ['homepage', 'services', 'landing']
  },
  {
    _type: 'ctaMessage',
    identifier: {
      _type: 'slug',
      current: 'generic-increase-revenue'
    },
    title: 'Generic - Increase Revenue',
    heading: 'Ready to Increase Your Revenue?',
    subheading: 'Discover how AI and proven strategies can transform your pub income.',
    buttonText: 'Turn Your Pub Around',
    buttonAction: 'whatsapp',
    actionValue: "Hi Peter, I want to increase my pub revenue",
    variant: 'teal',
    usage: ['homepage', 'services', 'results']
  },
  {
    _type: 'ctaMessage',
    identifier: {
      _type: 'slug',
      current: 'generic-get-help'
    },
    title: 'Generic - Get Help Now',
    heading: 'Need Help With Your Pub?',
    subheading: "One licensee helping another. Let's talk about what you need.",
    buttonText: 'Get Help Now',
    buttonAction: 'whatsapp',
    actionValue: "Hi Peter, I need help with my pub",
    variant: 'orange',
    usage: ['homepage', 'services', 'about', 'landing']
  }
]

// Migration function
async function migrateCTAMessages() {
  console.log('🚀 Starting CTA messages migration...')
  console.log(`📦 Found ${ctaMessages.length} CTA messages to migrate`)
  
  try {
    // Create a transaction for batch operations
    const transaction = client.transaction()
    
    for (const cta of ctaMessages) {
      // Check if document already exists
      const existingDoc = await client.fetch(
        `*[_type == "ctaMessage" && identifier.current == $identifier][0]`,
        { identifier: cta.identifier.current }
      )
      
      if (existingDoc) {
        console.log(`⚠️  CTA already exists: ${cta.identifier.current}`)
        // Optionally update existing document
        transaction.patch(existingDoc._id, patch => 
          patch
            .set({ 
              heading: cta.heading,
              subheading: cta.subheading,
              buttonText: cta.buttonText,
              buttonAction: cta.buttonAction,
              actionValue: cta.actionValue,
              bottomText: cta.bottomText,
              variant: cta.variant,
              usage: cta.usage
            })
        )
      } else {
        console.log(`✨ Creating new CTA: ${cta.identifier.current}`)
        // Create new document
        transaction.create(cta)
      }
    }
    
    // Commit the transaction
    const result = await transaction.commit()
    console.log('✅ Migration completed successfully!')
    console.log(`📊 Processed ${result.results?.length || 0} documents`)
    
    // Print summary
    console.log('\n📋 Migration Summary:')
    console.log('='.repeat(50))
    
    const byUsage = ctaMessages.reduce((acc, cta) => {
      cta.usage?.forEach(use => {
        acc[use] = (acc[use] || 0) + 1
      })
      return acc
    }, {} as Record<string, number>)
    
    Object.entries(byUsage).forEach(([usage, count]) => {
      console.log(`  ${usage}: ${count} CTAs`)
    })
    
    console.log('='.repeat(50))
    console.log('\n🎉 All CTA messages have been successfully migrated!')
    console.log('📝 Next steps:')
    console.log('  1. Review the CTAs in Sanity Studio')
    console.log('  2. Update components to fetch from Sanity instead of hardcoded values')
    console.log('  3. Test thoroughly on staging before production')
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

// Run migration if this script is executed directly
if (require.main === module) {
  migrateCTAMessages()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('Fatal error:', error)
      process.exit(1)
    })
}

export { migrateCTAMessages, ctaMessages }