#!/usr/bin/env npx tsx
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

// Create a minimal author document that won't crash Sanity
const authorDoc = {
  _type: 'author',
  _id: 'author-peter-pitcher',
  name: 'Peter Pitcher',
  bio: 'Licensee of The Anchor in Stanwell Moor and founder of Orange Jelly. Helping struggling pubs thrive with proven strategies from real experience.',
  role: 'Founder & Licensee'
  // Deliberately leaving out image field to avoid crash
}

// Write to NDJSON file
const fs = require('fs')
const path = require('path')

const outputPath = path.join(process.cwd(), 'sanity-author-fix.ndjson')
fs.writeFileSync(outputPath, JSON.stringify(authorDoc), 'utf-8')

console.log('Fixed author document created.')
console.log('To import:')
console.log('cd sanity-studio')
console.log('npx sanity documents delete author-peter-pitcher --dataset production')
console.log('npx sanity dataset import ../sanity-author-fix.ndjson production')