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

const companyConstantsContent = {
  _type: 'companyConstants',
  _id: 'companyConstants',
  title: 'Company Constants',
  
  // Contact Information
  contact: {
    phone: '07990 587315',
    phoneInternational: '+447990587315',
    whatsappNumber: '447990587315',
    email: 'peter@orangejelly.co.uk',
    location: 'Stanwell Moor',
    owner: 'Peter Pitcher',
    responseTime: 'as soon as I can',
  },
  
  // Company Information
  company: {
    name: 'Orange Jelly',
    tagline: 'Marketing that actually works for busy licensees',
    website: 'https://www.orangejelly.co.uk',
    vatStatus: 'All prices exclude VAT',
  },
  
  // Pricing Configuration
  pricing: {
    hourlyRate: {
      amount: 75,
      display: '£75/hour',
      description: 'Simple, honest pricing',
    },
    services: {
      quickWins: {
        amount: 499,
        display: '£499 + VAT',
        description: '30-day trial at one location',
        setupFee: 499,
        monthlyFee: 149,
        firstMonthsSetup: '£499/month',
        ongoingDisplay: 'First 3 months, then £149/month',
      },
      menuMakeover: {
        amount: 99,
        display: '£99 + VAT',
        description: 'AI-powered menu optimization',
      },
      googleMyBusiness: {
        amount: 399,
        display: '£399 + VAT per location',
        description: 'Complete GMB setup and optimization',
      },
      website: {
        setup: {
          amount: 1499,
          display: '£1499 + VAT setup',
          description: 'Professional pub website',
        },
        hosting: {
          hostingOnly: {
            amount: 50,
            display: '£50/month',
            description: 'Hosting only',
          },
          fullSupport: {
            amount: 199,
            display: '£199/month',
            description: 'Full support with all updates',
          },
        },
      },
      emailSocial: {
        amount: 499,
        display: 'From £499 + VAT',
        description: 'Email and social media automation setup',
      },
      training: {
        quickStart: {
          duration: '2 hours',
          amount: 125,
          display: '£125 + VAT',
          description: 'Email & social media basics',
          calculation: '2 hours × £75',
        },
        halfDay: {
          duration: '4 hours',
          amount: 250,
          display: '£250 + VAT',
          description: 'Core AI tools for daily ops',
          calculation: '4 hours × £75',
        },
        fullDay: {
          duration: '8 hours',
          amount: 500,
          display: '£500 + VAT',
          description: 'Everything including rotas & stock',
          calculation: '8 hours × £75',
        },
      },
      teamTraining: {
        halfDay: {
          amount: 375,
          display: '£375 + VAT',
          description: 'Half Day Workshop',
          calculation: '6 hours × £75',
        },
        fullDay: {
          amount: 750,
          display: '£750 + VAT',
          description: 'Full Day Intensive',
          calculation: '12 hours × £75',
        },
      },
    },
  },
  
  // Messages
  messages: {
    whatsapp: {
      default: "Hi Peter, got time for a quick chat about my pub?",
      services: "Hi Peter, I'd like to chat about Orange Jelly",
      training: "Hi Peter, I'm interested in AI training for my pub",
      quickWins: "Hi Peter, I'd like to try the 30-day package",
      blog: "Hi Peter, I just read your blog post and need help with my pub",
      notListed: "Hi Peter, I need help with something not on your services list...",
      caseStudies: "Hi Peter, just read your case studies. Can we chat?",
      lostPage: "Hi Peter, I got lost on your site. Can you help me find what I'm looking for?",
    },
    response: {
      whatsapp: "I personally reply to every message. During service? I'll get back to you after. Otherwise, expect a reply within a few hours",
      email: "I personally reply to every message. During service? I'll get back to you after. Otherwise, expect a reply within a few hours",
    },
    trust: {
      moneyBack: 'Action plan support',
      timeSaved: 'Time saved promise',
      atLeastFiveHours: 'At Least 5 Hours',
      thirtyDays: '30 Days',
      noContracts: 'No hidden fees, no long contracts, no surprises',
      noAgencyFees: 'No Agency Fees',
      fromlicensees: 'From Real licensees',
      resultsIn14Days: 'Results in 14 Days',
      costEffective: 'Costs less than a part-time employee',
      coversIncrease: '25-35 Quiz Regulars',
      coversIncreaseLabel: 'Up from 20 people',
      foodGPIncrease: '+8% Food GP',
      foodGPIncreaseLabel: 'Improved profit margins',
      sundayRoastRevenue: '£400+ Weekly',
      sundayRoastRevenueLabel: 'Extra Sunday roast revenue',
    },
    cta: {
      primary: 'Fill Your Pub',
      secondary: 'Get More Customers',
      bookCall: 'Get Help Now',
      tryRiskFree: 'Turn Your Pub Around',
      getQuickWins: 'Start Filling Tables',
      seeHow: 'See What Works',
      getHelp: 'Stop Struggling',
    },
  },
  
  // Success Metrics
  successMetrics: {
    theAnchor: {
      revenueIncrease: '£400+',
      averageSpendBefore: '£14.50',
      averageSpendAfter: '£18.50',
      percentageIncrease: '28%',
      description: 'Sunday roast sales up £400+ per week',
    },
    costSavings: {
      identified: '£2,000/month',
      description: 'Identified cost savings through efficiency',
    },
    menuOptimization: {
      spendIncrease: '£4.50',
      description: 'Menu rewrite increased spend per head by £4.50',
    },
  },
  
  // Service Features
  features: {
    quickWins: [
      'Menu review & profit margin analysis',
      '30 days of content creation',
      'Email templates that work',
      'Staff notices & table talkers',
      'WhatsApp support',
      'Action plan support',
    ],
    support: [
      'WhatsApp preferred for quick responses',
      'Based in Stanwell Moor, serving pubs across the UK',
      'Run by actual licensees who understand your challenges',
    ],
  },
  
  // Quiz Example
  quizExample: {
    entry: '£2',
    message: 'QUIZ NIGHT! 8pm start. I\'ve written easier questions this week (I promise 😂). £2 entry, winning team gets a round + the glory. Book a table - kitchen\'s open til 9!',
  },
}

async function migrateCompanyConstants() {
  console.log('Starting company constants migration...')

  try {
    // First check if document exists
    const existingDoc = await client.fetch('*[_type == "companyConstants" && _id == "companyConstants"][0]')
    
    if (existingDoc) {
      console.log('Found existing company constants document')
      
      // Delete existing document
      try {
        await client.delete('companyConstants')
        console.log('Deleted existing company constants document')
      } catch (error) {
        console.log('Error deleting existing document:', error)
      }
    } else {
      console.log('No existing company constants document found')
    }

    // Create new document
    console.log('Creating company constants document...')
    const result = await client.create(companyConstantsContent)
    console.log('Created company constants document with ID:', result._id)

    // Verify the document was created
    const verifyDoc = await client.fetch('*[_type == "companyConstants" && _id == "companyConstants"][0]')
    if (verifyDoc) {
      console.log('✅ Company constants migration complete!')
      console.log('Content migrated:')
      console.log('- Contact information')
      console.log('- Company details')
      console.log('- Pricing configuration')
      console.log('- Messages (WhatsApp, Trust, CTA)')
      console.log('- Success metrics')
      console.log('- Service features')
      console.log('- Quiz example')
    } else {
      console.error('❌ Failed to verify company constants document creation')
      process.exit(1)
    }
  } catch (error) {
    console.error('❌ Error migrating company constants:', error)
    process.exit(1)
  }
}

// Run the migration
migrateCompanyConstants()
