#!/usr/bin/env npx tsx
import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
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

// Helper to truncate text to max length
function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  
  // Find the last complete word before the limit
  const truncated = text.substring(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')
  
  if (lastSpace > 0) {
    return truncated.substring(0, lastSpace).trim()
  }
  
  return truncated.trim()
}

// Helper to convert markdown to Portable Text blocks
function markdownToPortableText(markdown: string): any[] {
  const blocks: any[] = []
  const lines = markdown.split('\n')
  let currentList: any = null
  let listItemIndex = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    if (!line) {
      // Empty line - close any open list
      if (currentList) {
        blocks.push(currentList)
        currentList = null
        listItemIndex = 0
      }
      continue
    }

    // Headers
    if (line.startsWith('## ')) {
      if (currentList) {
        blocks.push(currentList)
        currentList = null
        listItemIndex = 0
      }
      blocks.push({
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: line.substring(3) }]
      })
    }
    else if (line.startsWith('### ')) {
      if (currentList) {
        blocks.push(currentList)
        currentList = null
        listItemIndex = 0
      }
      blocks.push({
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: line.substring(4) }]
      })
    }
    else if (line.startsWith('#### ')) {
      if (currentList) {
        blocks.push(currentList)
        currentList = null
        listItemIndex = 0
      }
      blocks.push({
        _type: 'block',
        style: 'h4',
        children: [{ _type: 'span', text: line.substring(5) }]
      })
    }
    // Bullet lists
    else if (line.startsWith('- ') || line.startsWith('* ')) {
      const text = line.substring(2)
      if (!currentList || currentList.listItem !== 'bullet') {
        if (currentList) blocks.push(currentList)
        currentList = {
          _type: 'list',
          listItem: 'bullet',
          children: []
        }
        listItemIndex = 0
      }
      
      // Parse for bold text
      const children = parseInlineMarks(text)
      currentList.children.push({
        _type: 'block',
        children: children
      })
    }
    // Numbered lists
    else if (line.match(/^\d+\.\s/)) {
      const text = line.replace(/^\d+\.\s/, '')
      if (!currentList || currentList.listItem !== 'number') {
        if (currentList) blocks.push(currentList)
        currentList = {
          _type: 'list',
          listItem: 'number',
          children: []
        }
        listItemIndex = 0
      }
      
      // Parse for bold text
      const children = parseInlineMarks(text)
      currentList.children.push({
        _type: 'block',
        children: children
      })
    }
    // Blockquote
    else if (line.startsWith('>')) {
      if (currentList) {
        blocks.push(currentList)
        currentList = null
        listItemIndex = 0
      }
      blocks.push({
        _type: 'block',
        style: 'blockquote',
        children: [{ _type: 'span', text: line.substring(1).trim() }]
      })
    }
    // Normal paragraph
    else {
      if (currentList) {
        blocks.push(currentList)
        currentList = null
        listItemIndex = 0
      }
      
      // Parse for bold and italic text
      const children = parseInlineMarks(line)
      blocks.push({
        _type: 'block',
        style: 'normal',
        children: children
      })
    }
  }

  // Don't forget to add the last list if there is one
  if (currentList) {
    blocks.push(currentList)
  }

  return blocks
}

// Helper to parse inline marks (bold, italic, links)
function parseInlineMarks(text: string): any[] {
  const children: any[] = []
  
  // Simple regex patterns for markdown
  const patterns = {
    bold: /\*\*([^*]+)\*\*/g,
    italic: /\*([^*]+)\*/g,
    link: /\[([^\]]+)\]\(([^)]+)\)/g
  }
  
  let lastIndex = 0
  let hasMatch = false
  
  // Process bold text
  text.replace(patterns.bold, (match, content, index) => {
    if (index > lastIndex) {
      children.push({ _type: 'span', text: text.substring(lastIndex, index) })
    }
    children.push({
      _type: 'span',
      text: content,
      marks: ['strong']
    })
    lastIndex = index + match.length
    hasMatch = true
    return match
  })
  
  // If no special formatting, return plain text
  if (!hasMatch) {
    children.push({ _type: 'span', text: text })
  } else if (lastIndex < text.length) {
    children.push({ _type: 'span', text: text.substring(lastIndex) })
  }
  
  return children
}

// Main migration function
async function migrateBlogPosts() {
  const blogDir = path.join(process.cwd(), 'content', 'blog')
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'))
  
  console.log(`Found ${files.length} blog posts to migrate`)
  
  let successCount = 0
  let errorCount = 0
  
  for (const file of files) {
    try {
      console.log(`\nMigrating: ${file}`)
      
      const filePath = path.join(blogDir, file)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { data: frontmatter, content } = matter(fileContent)
      
      // Prepare the document
      const slug = file.replace('.md', '')
      
      // Truncate fields that have length limitations
      const excerpt = truncateText(frontmatter.excerpt || '', 160)
      const metaDescription = truncateText(frontmatter.metaDescription || excerpt, 160)
      const metaTitle = truncateText(frontmatter.metaTitle || frontmatter.title, 60)
      
      // Convert markdown content to Portable Text
      const portableTextContent = markdownToPortableText(content)
      
      // Prepare FAQ data if exists
      const faqs = frontmatter.faqs ? frontmatter.faqs.map((faq: any) => ({
        _type: 'object',
        question: faq.question,
        answer: faq.answer,
        isVoiceOptimized: false
      })) : []
      
      // Prepare the blog post document
      const doc = {
        _type: 'blogPost',
        _id: `blogPost-${slug}`,
        title: frontmatter.title,
        slug: {
          _type: 'slug',
          current: slug
        },
        status: 'published',
        excerpt: excerpt,
        content: portableTextContent,
        publishedDate: frontmatter.publishedDate || new Date().toISOString(),
        
        // SEO fields
        seo: {
          _type: 'object',
          metaTitle: metaTitle,
          metaDescription: metaDescription,
          keywords: frontmatter.keywords || []
        },
        
        // AI & Voice Search fields
        quickAnswer: truncateText(frontmatter.quickAnswer || '', 80),
        voiceSearchQueries: frontmatter.voiceSearchQueries || [],
        faqs: faqs,
        
        // Tags
        tags: frontmatter.tags || [],
        
        // Local SEO
        localSEO: {
          _type: 'object',
          targetLocation: 'Surrey',
          nearbyLandmarks: ['Heathrow', 'Staines', 'M25'],
          localModifiers: ['near me', 'local', 'in my area']
        },
        
        // CTA Settings
        ctaSettings: {
          _type: 'object',
          primaryCTA: 'Get Help Now',
          whatsappMessage: `Hi Peter, I read your article about ${frontmatter.title} and need help with my pub.`,
          urgency: 'medium'
        }
      }
      
      // Create or update the document in Sanity
      const result = await client.createOrReplace(doc)
      console.log(`✅ Successfully migrated: ${file} (ID: ${result._id})`)
      successCount++
      
    } catch (error) {
      console.error(`❌ Error migrating ${file}:`, error)
      errorCount++
    }
  }
  
  console.log(`\n=================================`)
  console.log(`Migration completed!`)
  console.log(`✅ Success: ${successCount} posts`)
  console.log(`❌ Errors: ${errorCount} posts`)
  console.log(`=================================`)
}

// Run the migration
migrateBlogPosts().catch(console.error)