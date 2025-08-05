#!/usr/bin/env npx tsx
import fs from 'fs'
import path from 'path'

// Create a complete dataset with fixed author (no image field)
const documents: any[] = []

// Add fixed author document
documents.push({
  _type: 'author',
  _id: 'author-peter-pitcher',
  name: 'Peter Pitcher',
  bio: 'Licensee of The Anchor in Stanwell Moor and founder of Orange Jelly. Helping struggling pubs thrive with proven strategies from real experience.',
  role: 'Founder & Licensee'
  // No image field - add manually in Sanity Studio later
})

// Add category documents
const categories = [
  'empty-pub-solutions',
  'social-media', 
  'competition',
  'events-promotions',
  'menu-pricing'
]

categories.forEach(cat => {
  documents.push({
    _type: 'category',
    _id: `category-${cat}`,
    name: cat.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    slug: {
      _type: 'slug',
      current: cat
    }
  })
})

// Write to NDJSON
const outputPath = path.join(process.cwd(), 'sanity-emergency-fix.ndjson')
const ndjsonContent = documents.map(doc => JSON.stringify(doc)).join('\n')
fs.writeFileSync(outputPath, ndjsonContent, 'utf-8')

console.log('Emergency fix data created.')
console.log('\nSTEPS TO FIX:')
console.log('1. First, try to delete the bad author:')
console.log('   cd sanity-studio')
console.log('   npx sanity documents delete author-peter-pitcher --dataset production')
console.log('\n2. If that fails, you may need to:')
console.log('   - Export current data: npx sanity dataset export production')
console.log('   - Create new dataset: npx sanity dataset create production-backup')
console.log('   - Import to new dataset: npx sanity dataset import production.tar.gz production-backup')
console.log('\n3. Import the fixed author:')
console.log('   npx sanity dataset import ../sanity-emergency-fix.ndjson production')