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

const roiCalculatorContent = {
  _type: 'roiCalculatorContent',
  _id: 'roiCalculatorContent',
  title: 'ROI Calculator Content',
  
  // Main heading and description
  heading: {
    title: 'Calculate Your Time & Money Savings',
    subtitle: 'See how much time and money you could save with Orange Jelly',
  },
  
  // Input field labels and settings
  inputs: [
    {
      _key: 'adminHours',
      id: 'adminHours',
      label: 'Hours per week on admin tasks (rotas, ordering, emails):',
      type: 'range',
      min: 0,
      max: 20,
      defaultValue: 10,
      unit: 'h',
      savingsMultiplier: 0.5,
      helpText: 'Time spent on administrative tasks each week',
    },
    {
      _key: 'socialMediaHours',
      id: 'socialMediaHours',
      label: 'Hours per week on social media & marketing:',
      type: 'range',
      min: 0,
      max: 15,
      defaultValue: 5,
      unit: 'h',
      savingsMultiplier: 0.8,
      helpText: 'Time spent creating and posting content',
    },
    {
      _key: 'menuUpdates',
      id: 'menuUpdates',
      label: 'Hours per month updating menus & descriptions:',
      type: 'range',
      min: 0,
      max: 10,
      defaultValue: 2,
      unit: 'h',
      savingsMultiplier: 0.75,
      helpText: 'Time spent updating and reprinting menus',
    },
    {
      _key: 'averageSpend',
      id: 'averageSpend',
      label: 'Current average customer spend (£):',
      type: 'range',
      min: 10,
      max: 30,
      defaultValue: 15,
      unit: '£',
      prefix: '£',
      helpText: 'Average amount each customer spends per visit',
    },
  ],
  
  // Calculation settings
  calculations: {
    hourlyValue: 25, // Conservative estimate of licensee's hourly value
    menuRevenueIncrease: 0.15, // 15% increase from menu optimization
    averageCovers: 50, // Average covers for calculation
    weeksPerYear: 52,
  },
  
  // Results section labels
  results: {
    heading: 'Your Potential Savings:',
    metrics: [
      {
        _key: 'timeSaved',
        id: 'timeSaved',
        label: 'Saved per week',
        unit: 'h',
        format: '{value}h',
        description: 'Hours saved through automation',
      },
      {
        _key: 'timeValue',
        id: 'timeValue',
        label: 'Time value per week',
        unit: '£',
        format: '£{value}',
        description: 'Value of time saved',
      },
      {
        _key: 'extraRevenue',
        id: 'extraRevenue',
        label: 'Extra revenue per week',
        unit: '£',
        format: '£{value}',
        description: 'Additional revenue from optimization',
      },
    ],
    summary: {
      weeklyLabel: 'Total weekly benefit:',
      yearlyLabel: "That's £{value}k per year!",
      yearlyFormat: 'Calculate as weekly × 52 / 1000',
    },
  },
  
  // CTA section
  cta: {
    buttonText: 'I want to save {hours} hours a week - let\'s chat!',
    defaultMessage: 'I want to save time and make more money - let\'s chat!',
    whatsappEnabled: true,
  },
  
  // Footer disclaimer
  disclaimer: '* Based on real results from The Anchor and similar pubs',
  
  // Styling settings
  styles: {
    cardBackground: 'orange-light',
    gradientFrom: 'orange/10',
    gradientTo: 'orange/5',
    accentColor: 'orange',
    textColor: 'charcoal',
    shadowStyle: 'xl',
  },
}

async function migrateROICalculator() {
  console.log('Starting ROI Calculator content migration...')

  try {
    // First check if document exists
    const existingDoc = await client.fetch('*[_type == "roiCalculatorContent" && _id == "roiCalculatorContent"][0]')
    
    if (existingDoc) {
      console.log('Found existing ROI Calculator content document')
      
      // Delete existing document
      try {
        await client.delete('roiCalculatorContent')
        console.log('Deleted existing ROI Calculator content document')
      } catch (error) {
        console.log('Error deleting existing document:', error)
      }
    } else {
      console.log('No existing ROI Calculator content document found')
    }

    // Create new document
    console.log('Creating ROI Calculator content document...')
    const result = await client.create(roiCalculatorContent)
    console.log('Created ROI Calculator content document with ID:', result._id)

    // Verify the document was created
    const verifyDoc = await client.fetch('*[_type == "roiCalculatorContent" && _id == "roiCalculatorContent"][0]')
    if (verifyDoc) {
      console.log('✅ ROI Calculator content migration complete!')
      console.log('Content migrated:')
      console.log('- Input fields:', verifyDoc.inputs?.length || 0)
      console.log('- Result metrics:', verifyDoc.results?.metrics?.length || 0)
      console.log('- Calculation settings configured')
      console.log('- CTA and disclaimer added')
      console.log('- Styling settings configured')
      
      // Show input fields
      if (verifyDoc.inputs && verifyDoc.inputs.length > 0) {
        console.log('\nInput fields configured:')
        verifyDoc.inputs.forEach((input: any, index: number) => {
          console.log(`  ${index + 1}. ${input.id}: ${input.label}`)
        })
      }
      
      // Show calculation settings
      if (verifyDoc.calculations) {
        console.log('\nCalculation settings:')
        console.log(`  - Hourly value: £${verifyDoc.calculations.hourlyValue}`)
        console.log(`  - Menu revenue increase: ${(verifyDoc.calculations.menuRevenueIncrease * 100)}%`)
        console.log(`  - Average covers: ${verifyDoc.calculations.averageCovers}`)
      }
    } else {
      console.error('❌ Failed to verify ROI Calculator content document creation')
      process.exit(1)
    }
  } catch (error) {
    console.error('❌ Error migrating ROI Calculator content:', error)
    process.exit(1)
  }
}

// Run the migration
migrateROICalculator()