#!/usr/bin/env node
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const claims = [
  // Time Saving Claims
  {
    category: 'timeSaving',
    key: 'hoursSavedWeekly',
    claim: 'Save at least 15 hours a week',
    value: 15,
    unit: 'hours',
    context: 'Using AI to get great work done faster',
    isActive: true,
    priority: 1
  },
  {
    category: 'timeSaving',
    key: 'equivalentWorkHours',
    claim: '120-150 hours equivalent work per week by using AI',
    value: 135,
    unit: 'hours',
    context: 'AI helps you get great work done faster, not replace human creativity',
    isActive: true,
    priority: 2
  },
  {
    category: 'timeSaving',
    key: 'socialMediaTime',
    claim: '10 hours per week on social media management',
    value: 10,
    unit: 'hours',
    context: 'Using AI tools to manage social media effectively',
    isActive: true,
    priority: 3
  },

  // Timeline Claims
  {
    category: 'timeline',
    key: 'resultsTimeline',
    claim: 'Results within 30 days',
    timeframe: 'within 30 days',
    context: 'Depends on what we\'re working on and how quickly you can turn around changes',
    isActive: true,
    priority: 1
  },
  {
    category: 'timeline',
    key: 'trustProcessTimeline',
    claim: '28 days with trust in the process',
    timeframe: '28 days',
    context: 'Results require trusting the process and implementing recommendations',
    isActive: true,
    priority: 2
  },
  {
    category: 'timeline',
    key: 'weekOneResults',
    claim: 'More traffic to your website and more phone calls',
    timeframe: 'Week 1',
    context: 'Initial indicators of marketing effectiveness',
    isActive: true,
    priority: 3
  },
  {
    category: 'timeline',
    key: 'weekFourResults',
    claim: 'Start seeing busier nights and noticeable impact',
    timeframe: 'Week 4-6',
    context: 'Physical results in your pub',
    isActive: true,
    priority: 4
  },
  {
    category: 'timeline',
    key: 'sixMonthTransformation',
    claim: 'Full transformation possible',
    timeframe: '6 months',
    context: 'With consistent implementation and trust in the process',
    isActive: true,
    priority: 5
  },

  // Performance Claims
  {
    category: 'performance',
    key: 'basicAIImpact',
    claim: 'Up to 5% impact for basic AI implementation',
    value: 5,
    unit: 'percent',
    timeframe: 'within 30 days',
    context: 'More possible with broader business review and fundamental changes',
    isActive: true,
    priority: 1
  },
  {
    category: 'performance',
    key: 'midweekTrafficIncrease',
    claim: '10% increase in midweek traffic',
    value: 10,
    unit: 'percent',
    timeframe: 'within 30 days',
    context: 'Realistic promise for midweek improvements',
    isActive: true,
    priority: 2
  },
  {
    category: 'performance',
    key: 'weekdayPerformance',
    claim: '20% increase in weekday performance',
    value: 20,
    unit: 'percent',
    context: 'The Anchor\'s actual result - wet-led pub focusing on revenue not covers',
    isActive: true,
    priority: 3
  },
  {
    category: 'performance',
    key: 'coversIncrease',
    claim: '25-40% increase in covers',
    value: 32.5,
    unit: 'percent',
    timeframe: 'within 90 days',
    context: 'For food-led pubs, not applicable to wet-led establishments',
    isActive: true,
    priority: 4
  },
  {
    category: 'performance',
    key: 'advanceBookings',
    claim: '10% increase in advance bookings',
    value: 10,
    unit: 'percent',
    timeframe: 'within 6 weeks',
    context: 'Maximum promise for booking improvements',
    isActive: true,
    priority: 5
  },
  {
    category: 'performance',
    key: 'regularIncrease',
    claim: '20% increase in regulars',
    value: 20,
    unit: 'percent',
    timeframe: 'within 8 weeks',
    context: 'Maximum promise for building regular customer base',
    isActive: true,
    priority: 6
  },
  {
    category: 'performance',
    key: 'foodWasteReduction',
    claim: '90% reduction in food waste',
    value: 90,
    unit: 'percent',
    context: 'Through better planning and AI-driven predictions',
    isActive: true,
    priority: 7
  },
  {
    category: 'performance',
    key: 'overallWasteReduction',
    claim: '20-30% reduction in overall waste',
    value: 25,
    unit: 'percent',
    context: 'Comprehensive waste management improvements',
    isActive: true,
    priority: 8
  },
  {
    category: 'performance',
    key: 'foodGPIncrease',
    claim: '20% increase in food GP',
    value: 20,
    unit: 'percent',
    context: 'Percentage increase only - never mention absolute GP figures',
    isActive: true,
    priority: 9
  },
  {
    category: 'performance',
    key: 'socialMediaViews',
    claim: '60,000-70,000 social media views monthly',
    value: 65000,
    unit: 'views',
    context: 'Taken us a long time and consistency to achieve',
    isActive: true,
    priority: 10
  },
  {
    category: 'performance',
    key: 'locationTagEngagement',
    claim: '79% more engagement from location-tagged posts',
    value: 79,
    unit: 'percent',
    context: 'Proven social media strategy',
    isActive: true,
    priority: 11
  },
  {
    category: 'performance',
    key: 'liveVideoEngagement',
    claim: '300% more engagement from live videos',
    value: 300,
    unit: 'percent',
    context: 'Live content drives significant engagement',
    isActive: true,
    priority: 12
  },
  {
    category: 'performance',
    key: 'socialMediaFootTraffic',
    claim: '20% more foot traffic for pubs with active social media',
    value: 20,
    unit: 'percent',
    context: 'Industry standard improvement',
    isActive: true,
    priority: 13
  },

  // Financial Claims
  {
    category: 'financial',
    key: 'hourlyRate',
    claim: '£62.50 per hour plus VAT',
    value: 62.50,
    unit: 'pounds',
    context: 'All services charged at this rate',
    isActive: true,
    priority: 1
  },
  {
    category: 'financial',
    key: 'businessValueAdded',
    claim: '£75,000-£100,000 value added to business',
    value: 87500,
    unit: 'pounds',
    context: 'Estimate for the value AI has added to The Anchor since starting',
    isActive: true,
    priority: 2
  },
  {
    category: 'financial',
    key: 'sundayWasteSavings',
    claim: '£250/week waste savings',
    value: 250,
    unit: 'pounds',
    context: 'Sunday lunch waste reduction through better planning',
    isActive: true,
    priority: 3
  },
  {
    category: 'financial',
    key: 'monthlyCostSavings',
    claim: '£4,000+/month cost savings identified',
    value: 4000,
    unit: 'pounds',
    context: 'Vendor reviews, energy reduction, rota optimization',
    isActive: true,
    priority: 4
  },
  {
    category: 'financial',
    key: 'annualLostRevenue',
    claim: 'Around £100k potential annual lost revenue',
    value: 100000,
    unit: 'pounds',
    context: 'From empty seats and missed opportunities',
    isActive: true,
    priority: 5
  },

  // Customer Numbers
  {
    category: 'customerNumbers',
    key: 'smsContacts',
    claim: '250 opted-in SMS contacts',
    value: 250,
    unit: 'contacts',
    context: 'SMS marketing list, not email',
    isActive: true,
    priority: 1
  },
  {
    category: 'customerNumbers',
    key: 'quizNightRegulars',
    claim: '25-30 quiz night regulars month-over-month',
    value: 27.5,
    unit: 'people',
    context: 'Previously had nights with zero attendance using QuestionOne',
    isActive: true,
    priority: 2
  },

  // Guarantees
  {
    category: 'guarantee',
    key: 'moneyBack',
    claim: '30-day money-back guarantee',
    context: 'Risk-free trial for all services',
    isActive: true,
    priority: 1
  },
  {
    category: 'guarantee',
    key: 'resultsGuarantee',
    claim: 'Save time or make more money within 30 days',
    context: 'Our core promise',
    isActive: true,
    priority: 2
  },
  {
    category: 'guarantee',
    key: 'noAgencyFees',
    claim: 'No agency fees',
    context: 'We aren\'t an agency - just honest hourly pricing',
    isActive: true,
    priority: 3
  },
  {
    category: 'guarantee',
    key: 'freeConsultation',
    claim: 'Free phone consultations',
    context: 'Always happy to talk, no charges, no restrictions',
    isActive: true,
    priority: 4
  },

  // Partnership
  {
    category: 'partnership',
    key: 'billyPeterPartnership',
    claim: 'Billy runs The Anchor day-to-day, Peter handles marketing',
    context: 'Strong partnership - Billy is the hero of day-to-day operations',
    isActive: true,
    priority: 1
  },
  {
    category: 'partnership',
    key: 'licenseeToLicensee',
    claim: 'From one licensee to another',
    context: 'Real experience, not just theory',
    isActive: true,
    priority: 2
  },
  {
    category: 'partnership',
    key: 'responseTime',
    claim: 'I\'ll always respond as quickly as I can, but bear with me',
    context: 'Peter manages marketing in spare time around full-time job',
    isActive: true,
    priority: 3
  }
]

async function migrateClaims() {
  console.log('Starting claims migration to Sanity...')
  
  try {
    // Delete existing claims
    console.log('Deleting existing claims...')
    const existingClaims = await client.fetch('*[_type == "claims"]')
    for (const claim of existingClaims) {
      await client.delete(claim._id)
    }
    
    // Create new claims
    console.log('Creating new claims...')
    for (const claim of claims) {
      const doc: any = {
        _type: 'claims',
        ...claim,
        lastVerified: new Date().toISOString().split('T')[0]
      }
      
      const result = await client.create(doc)
      console.log(`Created claim: ${claim.claim} (${result._id})`)
    }
    
    console.log(`Successfully migrated ${claims.length} claims to Sanity!`)
  } catch (error) {
    console.error('Error migrating claims:', error)
    process.exit(1)
  }
}

// Run the migration
migrateClaims()