#!/usr/bin/env ts-node

/**
 * Migration script for Related Links clusters
 * Extracts hardcoded link clusters from RelatedLinks.tsx and creates Sanity documents
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Define the link clusters data structure matching the original export
const linkClusters = {
  about: {
    clusterId: 'about',
    title: 'About Related Links',
    links: [
      {
        title: "Our Services",
        description: "See how we can help transform your pub",
        href: "/services",
        emoji: "🚀"
      },
      {
        title: "Success Stories",
        description: "Real results from real pubs",
        href: "/results",
        emoji: "📈"
      },
      {
        title: "Get Started",
        description: "Book a free chat with Peter",
        href: "/contact",
        emoji: "💬"
      }
    ]
  },
  
  quickWins: {
    clusterId: 'quickWins',
    title: 'Quick Wins',
    links: [
      {
        title: "Quick Wins Consultation",
        description: "5 instant improvements for your pub",
        href: "/services#quick-wins",
        emoji: "⚡"
      },
      {
        title: "30-Minute AI Demo",
        description: "See AI in action for pub marketing",
        href: "/services#training",
        emoji: "🤖"
      },
      {
        title: "Free Social Media Review",
        description: "Get personalized improvement tips",
        href: "/contact",
        emoji: "📱"
      }
    ]
  },
  
  emptyPub: {
    clusterId: 'emptyPub',
    title: 'Empty Pub Solutions',
    links: [
      {
        title: "Empty Pub Recovery Package",
        description: "Fill your quiet nights in 30 days with our proven system",
        href: "/services#empty-pub-recovery",
        emoji: "⏰",
        highlight: true
      },
      {
        title: "Done-For-You Marketing",
        description: "We handle all your marketing while you focus on customers",
        href: "/services#done-for-you-marketing",
        emoji: "📱"
      },
      {
        title: "Real Pub Turnarounds",
        description: "See how other pubs went from empty to packed",
        href: "/results",
        emoji: "📈"
      }
    ]
  },
  
  competition: {
    clusterId: 'competition',
    title: 'Beat the Competition',
    links: [
      {
        title: "Beat Local Competition",
        description: "Stand out with strategies that bring customers back",
        href: "/services#empty-pub-recovery",
        emoji: "🏆"
      },
      {
        title: "Get Found Online",
        description: "Be first on Google when locals search for pubs",
        href: "/services#website",
        emoji: "🔍"
      },
      {
        title: "Find Hidden Profits",
        description: "Discover opportunities your competitors miss",
        href: "/services#business",
        emoji: "💡"
      }
    ]
  },
  
  budget: {
    clusterId: 'budget',
    title: 'Budget Solutions',
    links: [
      {
        title: "Boost Food Sales",
        description: "Turn your menu into a profit-driving machine",
        href: "/services#boost-food-sales",
        emoji: "💷"
      },
      {
        title: "Calculate Your ROI",
        description: "See exactly how much extra revenue you could generate",
        href: "/#roi-calculator",
        emoji: "🧮"
      },
      {
        title: "Payment Plans Available",
        description: "Spread the cost with flexible payment options",
        href: "/contact",
        emoji: "💳"
      }
    ]
  },
  
  time: {
    clusterId: 'time',
    title: 'Save Time',
    links: [
      {
        title: "AI Training for licensees",
        description: "Learn to automate the boring bits yourself",
        href: "/services#training",
        emoji: "🎓"
      },
      {
        title: "3 Months of Social in 3 Hours",
        description: "How we batch-created content for The Anchor",
        href: "/results#social-media",
        emoji: "📅"
      },
      {
        title: "About Peter & The Anchor",
        description: "How we save 5+ hours every week with AI",
        href: "/about",
        emoji: "⏰"
      }
    ]
  },

  quickStart: {
    clusterId: 'quickStart',
    title: 'Quick Start',
    links: [
      {
        title: "Free Chat with Peter",
        description: "Tell me your biggest problem - I'll share how we fixed it",
        href: "/contact",
        emoji: "💬",
        highlight: true
      },
      {
        title: "Our Proven Services",
        description: "Pick the problem that's keeping you up at night",
        href: "/services",
        emoji: "🚀"
      },
      {
        title: "Success Stories",
        description: "Real results from real pubs like yours",
        href: "/results",
        emoji: "🎯"
      }
    ]
  },

  services: {
    clusterId: 'services',
    title: 'Services',
    links: [
      {
        title: "Empty Pub Recovery",
        description: "Turn quiet nights into profitable ones",
        href: "/solutions/empty-pub-midweek",
        emoji: "🚨"
      },
      {
        title: "About Peter Pitcher",
        description: "The licensee behind Orange Jelly",
        href: "/about",
        emoji: "👤"
      },
      {
        title: "Real Pub Results",
        description: "See what's possible for your pub",
        href: "/results",
        emoji: "📊"
      }
    ]
  },

  contact: {
    clusterId: 'contact',
    title: 'Contact',
    links: [
      {
        title: "View Our Services",
        description: "Find the right solution for your pub",
        href: "/services",
        emoji: "🛠️"
      },
      {
        title: "Empty Pub Solutions",
        description: "Fill your quiet nights fast",
        href: "/solutions/empty-pub-midweek",
        emoji: "🌙"
      },
      {
        title: "Pub Marketing Guide",
        description: "Free marketing tips for licensees",
        href: "/licensees-guide",
        emoji: "📚"
      }
    ]
  }
}

// Function to create Sanity document from cluster data
function createSanityDocument(clusterId: string, data: any, order: number) {
  return {
    _id: `relatedLinks-${clusterId}`,
    _type: 'relatedLinks',
    cluster: clusterId,
    title: data.title,
    order: order,
    links: data.links.map((link: any) => ({
      _type: 'object',
      text: link.title,
      href: link.href,
      description: link.description,
      icon: link.emoji,
      external: false,
      ...(link.highlight && { highlight: link.highlight })
    }))
  }
}

async function migrateRelatedLinks() {
  console.log('🚀 Starting Related Links migration...')
  console.log('📋 Found', Object.keys(linkClusters).length, 'link clusters to migrate')
  
  const documents: any[] = []
  let order = 0
  
  // Create documents for each cluster
  for (const [key, data] of Object.entries(linkClusters)) {
    const doc = createSanityDocument(key, data, order++)
    documents.push(doc)
    console.log(`✅ Prepared cluster: ${key} with ${data.links.length} links`)
  }
  
  // Option 1: Generate NDJSON for manual import
  const ndjson = documents.map(doc => JSON.stringify(doc)).join('\n')
  const fs = require('fs')
  const outputPath = path.join(__dirname, 'related-links-import.ndjson')
  fs.writeFileSync(outputPath, ndjson)
  console.log(`\n📄 NDJSON file created at: ${outputPath}`)
  console.log('To import manually, run:')
  console.log(`sanity dataset import ${outputPath} ${process.env.NEXT_PUBLIC_SANITY_DATASET} --replace`)
  
  // Option 2: Direct import (uncomment to use)
  if (process.argv.includes('--direct')) {
    console.log('\n🔄 Performing direct import to Sanity...')
    
    try {
      // Delete existing related links documents
      const existingDocs = await client.fetch('*[_type == "relatedLinks"]')
      if (existingDocs.length > 0) {
        console.log(`🗑️  Deleting ${existingDocs.length} existing documents...`)
        for (const doc of existingDocs) {
          await client.delete(doc._id)
        }
      }
      
      // Create new documents
      for (const doc of documents) {
        await client.createOrReplace(doc)
        console.log(`✅ Created: ${doc.cluster}`)
      }
      
      console.log('\n🎉 Migration completed successfully!')
    } catch (error) {
      console.error('❌ Error during direct import:', error)
      process.exit(1)
    }
  }
  
  // Summary
  console.log('\n📊 Migration Summary:')
  console.log('──────────────────────')
  for (const [key, data] of Object.entries(linkClusters)) {
    console.log(`${key}: ${data.links.length} links`)
  }
  console.log('──────────────────────')
  console.log(`Total: ${documents.length} clusters, ${documents.reduce((sum, doc) => sum + doc.links.length, 0)} links`)
  
  // Usage instructions
  console.log('\n📚 Next Steps:')
  console.log('1. Review the generated NDJSON file')
  console.log('2. Import to Sanity using the command above')
  console.log('3. Or run with --direct flag for direct import: npm run migrate:related-links -- --direct')
  console.log('4. Update RelatedLinks.tsx component to fetch from Sanity instead of using hardcoded data')
}

// Run migration
migrateRelatedLinks().catch(error => {
  console.error('❌ Migration failed:', error)
  process.exit(1)
})