#!/usr/bin/env npx tsx
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_WRITE_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Function to fix list blocks in Portable Text
function fixPortableTextLists(content: any[]): any[] {
  if (!content || !Array.isArray(content)) return content
  
  const fixed: any[] = []
  
  for (const block of content) {
    // If it's a list block (wrong format), convert it
    if (block._type === 'list') {
      // Convert each child block to have the proper list properties
      for (const child of block.children) {
        if (child._type === 'block') {
          fixed.push({
            ...child,
            listItem: block.listItem, // Add listItem property
            level: 1, // Add level for nested lists (1 = top level)
          })
        }
      }
    } else {
      // Keep other blocks as-is
      fixed.push(block)
    }
  }
  
  return fixed
}

async function fixAllBlogPosts() {
  try {
    // Fetch all blog posts
    const posts = await client.fetch('*[_type == "blogPost"]{_id, _rev, content}')
    console.log(`Found ${posts.length} blog posts to check`)
    
    let fixedCount = 0
    let errorCount = 0
    
    for (const post of posts) {
      try {
        // Check if content needs fixing
        const hasListBlocks = post.content?.some((block: any) => block._type === 'list')
        
        if (hasListBlocks) {
          console.log(`Fixing lists in post: ${post._id}`)
          
          // Fix the content
          const fixedContent = fixPortableTextLists(post.content)
          
          // Update the document
          await client
            .patch(post._id)
            .set({ content: fixedContent })
            .commit()
          
          fixedCount++
          console.log(`✅ Fixed: ${post._id}`)
        }
      } catch (error) {
        console.error(`❌ Error fixing post ${post._id}:`, error)
        errorCount++
      }
    }
    
    console.log(`\n=================================`)
    console.log(`Fix completed!`)
    console.log(`✅ Fixed: ${fixedCount} posts`)
    console.log(`❌ Errors: ${errorCount} posts`)
    console.log(`⏭️  Skipped: ${posts.length - fixedCount - errorCount} posts (no lists to fix)`)
    console.log(`=================================`)
    
  } catch (error) {
    console.error('Error fetching posts:', error)
  }
}

// Run the fix
fixAllBlogPosts().catch(console.error)