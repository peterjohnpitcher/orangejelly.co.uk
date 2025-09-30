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

const trustBarContent = {
  _type: 'trustBarContent',
  _id: 'trustBarContent',
  title: 'TrustBar Content',
  
  // Default trust items that rotate
  items: [
    {
      _key: 'item1',
      value: '25-35 Quiz Regulars',
      label: 'Up from 20 people',
      order: 1,
      isActive: true,
    },
    {
      _key: 'item2',
      value: 'Costs less than a part-time employee',
      label: 'AI-powered marketing solutions',
      order: 2,
      isActive: true,
    },
    {
      _key: 'item3',
      value: 'Results in 14 Days',
      label: 'Guaranteed quick results',
      order: 3,
      isActive: true,
    },
  ],
  
  // Alternative trust items for different contexts
  alternativeItems: [
    {
      _key: 'alt1',
      value: '+8% Food GP',
      label: 'Improved profit margins',
      order: 4,
      isActive: false,
    },
    {
      _key: 'alt2',
      value: '£400+ Weekly',
      label: 'Extra Sunday roast revenue',
      order: 5,
      isActive: false,
    },
    {
      _key: 'alt3',
      value: 'Action plan support',
      label: 'No risk to try',
      order: 6,
      isActive: false,
    },
    {
      _key: 'alt4',
      value: 'No Agency Fees',
      label: 'Direct pricing',
      order: 7,
      isActive: false,
    },
    {
      _key: 'alt5',
      value: 'At Least 5 Hours',
      label: 'Time saved weekly',
      order: 8,
      isActive: false,
    },
    {
      _key: 'alt6',
      value: '30 Days',
      label: 'Trial period',
      order: 9,
      isActive: false,
    },
  ],
  
  // Display settings
  settings: {
    rotationEnabled: true,
    rotationInterval: 5000, // milliseconds
    showOnMobile: true,
    showOnDesktop: true,
    backgroundColor: 'orange-light', // corresponds to bg-orange/10
    textColor: 'orange',
    labelColor: 'charcoal',
  },
}

async function migrateTrustBarContent() {
  console.log('Starting TrustBar content migration...')

  try {
    // First check if document exists
    const existingDoc = await client.fetch('*[_type == "trustBarContent" && _id == "trustBarContent"][0]')
    
    if (existingDoc) {
      console.log('Found existing TrustBar content document')
      
      // Delete existing document
      try {
        await client.delete('trustBarContent')
        console.log('Deleted existing TrustBar content document')
      } catch (error) {
        console.log('Error deleting existing document:', error)
      }
    } else {
      console.log('No existing TrustBar content document found')
    }

    // Create new document
    console.log('Creating TrustBar content document...')
    const result = await client.create(trustBarContent)
    console.log('Created TrustBar content document with ID:', result._id)

    // Verify the document was created
    const verifyDoc = await client.fetch('*[_type == "trustBarContent" && _id == "trustBarContent"][0]')
    if (verifyDoc) {
      console.log('✅ TrustBar content migration complete!')
      console.log('Content migrated:')
      console.log('- Active trust items:', verifyDoc.items?.length || 0)
      console.log('- Alternative items:', verifyDoc.alternativeItems?.length || 0)
      console.log('- Display settings configured')
      console.log('- Rotation enabled:', verifyDoc.settings?.rotationEnabled || false)
      
      // Show active items
      if (verifyDoc.items && verifyDoc.items.length > 0) {
        console.log('\nActive trust statements:')
        verifyDoc.items.forEach((item: any, index: number) => {
          console.log(`  ${index + 1}. ${item.value} - ${item.label}`)
        })
      }
    } else {
      console.error('❌ Failed to verify TrustBar content document creation')
      process.exit(1)
    }
  } catch (error) {
    console.error('❌ Error migrating TrustBar content:', error)
    process.exit(1)
  }
}

// Run the migration
migrateTrustBarContent()