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

// Helper function to generate unique keys
function generateKey(prefix: string, index: number): string {
  return `${prefix}_${Date.now()}_${index}`
}

async function fixAboutContent() {
  console.log('📄 Checking aboutContent document...')
  const doc = await client.getDocument('aboutContent')
  
  if (!doc) {
    console.log('  - No aboutContent document found')
    return false
  }

  let hasChanges = false
  const patches: any = {}

  // Check and fix timeline array
  if (doc.timeline && Array.isArray(doc.timeline)) {
    const timelineNeedsKeys = doc.timeline.some((item: any) => !item._key)
    if (timelineNeedsKeys) {
      console.log('  📍 Found timeline items without _key properties')
      const fixedTimeline = doc.timeline.map((item: any, index: number) => {
        if (!item._key) {
          hasChanges = true
          return { ...item, _key: generateKey('timeline', index) }
        }
        return item
      })
      patches.timeline = fixedTimeline
      console.log(`    ✅ Added _key to ${doc.timeline.filter((item: any) => !item._key).length} timeline items`)
    }
  }

  // Check and fix values array
  if (doc.values && Array.isArray(doc.values)) {
    const valuesNeedKeys = doc.values.some((item: any) => !item._key)
    if (valuesNeedKeys) {
      console.log('  📍 Found values items without _key properties')
      const fixedValues = doc.values.map((item: any, index: number) => {
        if (!item._key) {
          hasChanges = true
          return { ...item, _key: generateKey('value', index) }
        }
        return item
      })
      patches.values = fixedValues
      console.log(`    ✅ Added _key to ${doc.values.filter((item: any) => !item._key).length} values items`)
    }
  }

  // Check and fix teamMembers array
  if (doc.teamMembers && Array.isArray(doc.teamMembers)) {
    const teamNeedsKeys = doc.teamMembers.some((item: any) => !item._key)
    if (teamNeedsKeys) {
      console.log('  📍 Found teamMembers items without _key properties')
      const fixedTeamMembers = doc.teamMembers.map((item: any, index: number) => {
        if (!item._key) {
          hasChanges = true
          return { ...item, _key: generateKey('team', index) }
        }
        return item
      })
      patches.teamMembers = fixedTeamMembers
      console.log(`    ✅ Added _key to ${doc.teamMembers.filter((item: any) => !item._key).length} team member items`)
    }
  }

  // Check and fix partnerships array
  if (doc.partnerships && Array.isArray(doc.partnerships)) {
    const partnershipsNeedKeys = doc.partnerships.some((item: any) => !item._key)
    if (partnershipsNeedKeys) {
      console.log('  📍 Found partnerships items without _key properties')
      const fixedPartnerships = doc.partnerships.map((item: any, index: number) => {
        if (!item._key) {
          hasChanges = true
          return { ...item, _key: generateKey('partner', index) }
        }
        return item
      })
      patches.partnerships = fixedPartnerships
      console.log(`    ✅ Added _key to ${doc.partnerships.filter((item: any) => !item._key).length} partnership items`)
    }
  }

  // Apply patches if there are changes
  if (hasChanges && Object.keys(patches).length > 0) {
    await client.patch('aboutContent').set(patches).commit()
    return true
  }
  
  return false
}

async function fixNavigation() {
  console.log('📄 Checking navigation document...')
  const doc = await client.getDocument('mainNavigation')
  
  if (!doc) {
    console.log('  - No navigation document found')
    return false
  }

  let hasChanges = false
  const patches: any = {}

  // Check and fix mainMenu array
  if (doc.mainMenu && Array.isArray(doc.mainMenu)) {
    const menuNeedsKeys = doc.mainMenu.some((item: any) => !item._key)
    if (menuNeedsKeys) {
      console.log('  📍 Found mainMenu items without _key properties')
      const fixedMenu = doc.mainMenu.map((item: any, index: number) => {
        if (!item._key) {
          hasChanges = true
          return { ...item, _key: generateKey('menu', index) }
        }
        return item
      })
      patches.mainMenu = fixedMenu
      console.log(`    ✅ Added _key to ${doc.mainMenu.filter((item: any) => !item._key).length} menu items`)
    }
  }

  // Apply patches if there are changes
  if (hasChanges && Object.keys(patches).length > 0) {
    await client.patch('mainNavigation').set(patches).commit()
    return true
  }
  
  return false
}

async function fixMissingKeys() {
  console.log('🔧 Fixing missing _key properties in Sanity documents...\n')

  try {
    let fixedAny = false

    // Fix aboutContent document
    const fixedAbout = await fixAboutContent()
    if (fixedAbout) fixedAny = true

    // Fix navigation document
    const fixedNav = await fixNavigation()
    if (fixedNav) fixedAny = true

    if (fixedAny) {
      console.log('\n✅ Successfully fixed all missing _key properties!')
    } else {
      console.log('\n✅ No missing _key properties found - all documents are valid!')
    }

  } catch (error) {
    console.error('❌ Error fixing missing keys:', error)
    process.exit(1)
  }
}

// Run the fix
fixMissingKeys()