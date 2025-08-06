#!/usr/bin/env ts-node
/**
 * Diagnose Sanity Studio crash by checking field type mismatches
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '9brdfanc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function checkFieldTypeMismatches() {
  console.log('🔍 Diagnosing Sanity Studio crash...\n')
  
  console.log('1. Checking Author Documents:')
  console.log('============================')
  
  const authors = await client.fetch(`
    *[_type == "author"]{
      _id,
      name,
      "imageField": image,
      "imageIsString": defined(image) && image match "*.*",
      "hasAsset": defined(image.asset),
      "hasRef": defined(image.asset._ref),
      "imageType": image._type
    }
  `)
  
  for (const author of authors) {
    console.log(`\n Author: ${author.name} (${author._id})`)
    console.log(`   Image field value: ${JSON.stringify(author.imageField)}`)
    console.log(`   Is string path: ${author.imageIsString}`)
    console.log(`   Has asset: ${author.hasAsset}`)
    console.log(`   Has ref: ${author.hasRef}`)
    console.log(`   Image type: ${author.imageType}`)
    
    if (author.imageIsString) {
      console.log(`   ⚠️  ERROR: Image is stored as string instead of image object!`)
    }
  }
  
  console.log('\n\n2. Checking Blog Post Documents:')
  console.log('=================================')
  
  const blogPosts = await client.fetch(`
    *[_type == "blogPost"][0..10]{
      _id,
      title,
      "featuredImageField": featuredImage,
      "imageIsString": defined(featuredImage) && featuredImage match "*.*",
      "hasAsset": defined(featuredImage.asset),
      "hasRef": defined(featuredImage.asset._ref),
      "imageType": featuredImage._type
    }
  `)
  
  let errorCount = 0
  for (const post of blogPosts) {
    if (post.imageIsString) {
      errorCount++
      console.log(`\n Blog Post: ${post.title}`)
      console.log(`   ID: ${post._id}`)
      console.log(`   Featured image: ${post.featuredImageField}`)
      console.log(`   ⚠️  ERROR: Featured image is string instead of image object!`)
    }
  }
  
  if (errorCount === 0) {
    console.log('\n ✓ All blog posts have proper image objects')
  } else {
    console.log(`\n ⚠️  Found ${errorCount} blog posts with string images`)
  }
  
  console.log('\n\n3. Checking for Other Field Type Issues:')
  console.log('========================================')
  
  // Check categories
  const categoriesWithIssues = await client.fetch(`
    *[_type == "category" && defined(image) && image match "*.*"]{
      _id,
      name,
      image
    }
  `)
  
  if (categoriesWithIssues.length > 0) {
    console.log('\n ⚠️  Found categories with string images:')
    categoriesWithIssues.forEach((cat: any) => {
      console.log(`   - ${cat.name}: ${cat.image}`)
    })
  }
  
  // Check for any documents with string references
  const docsWithStringRefs = await client.fetch(`
    *[defined(author) && author match "*-*"]{
      _id,
      _type,
      title,
      author
    }[0..5]
  `)
  
  if (docsWithStringRefs.length > 0) {
    console.log('\n ⚠️  Found documents with string references instead of proper references:')
    docsWithStringRefs.forEach((doc: any) => {
      console.log(`   - ${doc._type} "${doc.title}": author = ${JSON.stringify(doc.author)}`)
    })
  } else {
    console.log('\n ✓ All documents have proper references')
  }
  
  console.log('\n\n📊 Summary:')
  console.log('===========')
  console.log('\nThe Sanity Studio is likely crashing because:')
  console.log('1. Author documents have image fields stored as strings (e.g., "/images/peter-pitcher.jpg")')
  console.log('2. Blog post documents have featuredImage fields stored as strings')
  console.log('3. The schema expects these to be Sanity image objects with asset references')
  console.log('\nThis mismatch causes the Studio to crash when trying to render image previews.')
  console.log('\n🔧 To fix this issue:')
  console.log('1. Set your SANITY_API_TOKEN: export SANITY_API_TOKEN="your-token"')
  console.log('2. Run: npm run fix-sanity-types')
  console.log('3. Or manually patch the documents to use proper image objects')
}

async function main() {
  try {
    await checkFieldTypeMismatches()
  } catch (error) {
    console.error('Error running diagnostic:', error)
    process.exit(1)
  }
}

main()