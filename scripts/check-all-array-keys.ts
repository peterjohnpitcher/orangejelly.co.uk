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

// Check if an object is an array with items that should have _key
function checkArrayForMissingKeys(obj: any, path: string, issues: string[]): void {
  if (!obj || typeof obj !== 'object') return

  // Check if this is an array
  if (Array.isArray(obj)) {
    // Check if items need _key (objects that aren't blocks or spans)
    const itemsNeedingKeys = obj.filter(item => 
      item && 
      typeof item === 'object' && 
      !Array.isArray(item) &&
      item._type !== 'block' && // Blocks are handled differently
      item._type !== 'span'     // Spans are handled differently
    )

    const itemsWithoutKeys = itemsNeedingKeys.filter(item => !item._key)
    
    if (itemsWithoutKeys.length > 0) {
      issues.push(`${path}: ${itemsWithoutKeys.length} items missing _key`)
    }

    // Recurse into array items
    obj.forEach((item, index) => {
      checkArrayForMissingKeys(item, `${path}[${index}]`, issues)
    })
  } else {
    // Recurse into object properties
    Object.keys(obj).forEach(key => {
      // Skip internal fields
      if (key.startsWith('_')) return
      checkArrayForMissingKeys(obj[key], `${path}.${key}`, issues)
    })
  }
}

async function checkAllDocuments() {
  console.log('🔍 Checking all Sanity documents for missing array keys...\n')

  try {
    // Fetch all documents
    const query = '*[!(_type match "system.*")]'
    const documents = await client.fetch(query)
    
    console.log(`Found ${documents.length} documents to check\n`)

    const documentIssues: { [key: string]: string[] } = {}
    
    for (const doc of documents) {
      const issues: string[] = []
      checkArrayForMissingKeys(doc, '', issues)
      
      if (issues.length > 0) {
        documentIssues[`${doc._type}:${doc._id}`] = issues
      }
    }

    // Report findings
    const totalIssues = Object.keys(documentIssues).length
    
    if (totalIssues === 0) {
      console.log('✅ No missing _key properties found in any documents!')
    } else {
      console.log(`⚠️  Found issues in ${totalIssues} document(s):\n`)
      
      for (const [docId, issues] of Object.entries(documentIssues)) {
        console.log(`\n📄 ${docId}`)
        issues.forEach(issue => {
          // Clean up the path for better readability
          const cleanPath = issue.replace(/^\./, '').replace(/\.\[/g, '[')
          console.log(`   - ${cleanPath}`)
        })
      }

      console.log('\n💡 To fix these issues:')
      console.log('   1. Run: npm run fix:sanity-keys')
      console.log('   2. Update migration scripts to include _key properties')
      console.log('   3. See CLAUDE.md for detailed guidance')
    }

  } catch (error) {
    console.error('❌ Error checking documents:', error)
    process.exit(1)
  }
}

// Run the check
checkAllDocuments()