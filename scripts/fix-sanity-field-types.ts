#!/usr/bin/env ts-node
/**
 * Fix Sanity field type mismatches
 * This script converts string paths to proper Sanity image objects
 */

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

const client = createClient({
  projectId: '9brdfanc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function uploadImageFromPath(imagePath: string): Promise<any> {
  try {
    // Remove leading slash if present
    const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath
    const fullPath = path.join(process.cwd(), 'public', cleanPath)
    
    if (!fs.existsSync(fullPath)) {
      console.error(`Image file not found: ${fullPath}`)
      return null
    }
    
    const imageFile = fs.readFileSync(fullPath)
    const imageAsset = await client.assets.upload('image', imageFile, {
      filename: path.basename(cleanPath)
    })
    
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: imageAsset._id
      }
    }
  } catch (error) {
    console.error(`Failed to upload image ${imagePath}:`, error)
    return null
  }
}

async function fixAuthorImages() {
  console.log('Fixing author images...')
  
  const authors = await client.fetch(`*[_type == "author" && defined(image) && image != null]`)
  
  for (const author of authors) {
    if (typeof author.image === 'string') {
      console.log(`Converting image for author: ${author.name}`)
      const imageObject = await uploadImageFromPath(author.image)
      
      if (imageObject) {
        await client
          .patch(author._id)
          .set({ image: imageObject })
          .commit()
        console.log(`✓ Fixed image for ${author.name}`)
      }
    }
  }
}

async function fixBlogPostImages() {
  console.log('\nFixing blog post featured images...')
  
  const blogPosts = await client.fetch(`*[_type == "blogPost" && defined(featuredImage) && featuredImage != null]`)
  
  for (const post of blogPosts) {
    if (typeof post.featuredImage === 'string') {
      console.log(`Converting image for blog post: ${post.title}`)
      const imageObject = await uploadImageFromPath(post.featuredImage)
      
      if (imageObject) {
        await client
          .patch(post._id)
          .set({ featuredImage: imageObject })
          .commit()
        console.log(`✓ Fixed image for ${post.title}`)
      }
    }
  }
}

async function validateDataTypes() {
  console.log('\nValidating data types...')
  
  // Check for any other potential field type mismatches
  const queries = [
    {
      name: 'Author images',
      query: `*[_type == "author" && defined(image)]{_id, name, "imageType": image._type, "isString": image match "*.*"}`
    },
    {
      name: 'Blog featured images',
      query: `*[_type == "blogPost" && defined(featuredImage)]{_id, title, "imageType": featuredImage._type, "isString": featuredImage match "*.*"}`
    },
    {
      name: 'Blog content images',
      query: `*[_type == "blogPost" && defined(content)]{_id, title, "contentImages": content[_type == "image"]}`
    }
  ]
  
  for (const { name, query } of queries) {
    console.log(`\nChecking ${name}:`)
    const results = await client.fetch(query)
    console.log(JSON.stringify(results, null, 2))
  }
}

async function main() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('Error: SANITY_API_TOKEN environment variable is required')
    console.log('Please set it with: export SANITY_API_TOKEN="your-token-here"')
    process.exit(1)
  }
  
  try {
    await fixAuthorImages()
    await fixBlogPostImages()
    await validateDataTypes()
    
    console.log('\n✅ Field type fixes completed!')
  } catch (error) {
    console.error('Error fixing field types:', error)
    process.exit(1)
  }
}

main()