#!/usr/bin/env npx tsx
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Helper to truncate text to max length
function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  
  const truncated = text.substring(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')
  
  if (lastSpace > 0) {
    return truncated.substring(0, lastSpace).trim()
  }
  
  return truncated.trim()
}

// Helper to convert markdown to simple text (removing markdown syntax)
function markdownToText(markdown: string): string {
  return markdown
    .replace(/#{1,6}\s/g, '') // Remove headers
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
    .replace(/\*([^*]+)\*/g, '$1') // Remove italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
    .replace(/^[-*]\s/gm, '') // Remove bullet points
    .replace(/^\d+\.\s/gm, '') // Remove numbered lists
    .replace(/^>\s/gm, '') // Remove blockquotes
    .replace(/\n{3,}/g, '\n\n') // Collapse multiple newlines
    .trim()
}

// Helper to convert markdown to Portable Text blocks
function markdownToPortableText(markdown: string): any[] {
  const blocks: any[] = []
  const lines = markdown.split('\n')
  let currentList: any = null

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    if (!line) {
      if (currentList) {
        blocks.push(currentList)
        currentList = null
      }
      continue
    }

    // Headers
    if (line.startsWith('## ')) {
      if (currentList) {
        blocks.push(currentList)
        currentList = null
      }
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'h2',
        markDefs: [],
        children: [{ 
          _type: 'span', 
          _key: generateKey(),
          text: line.substring(3),
          marks: []
        }]
      })
    }
    else if (line.startsWith('### ')) {
      if (currentList) {
        blocks.push(currentList)
        currentList = null
      }
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'h3',
        markDefs: [],
        children: [{ 
          _type: 'span',
          _key: generateKey(),
          text: line.substring(4),
          marks: []
        }]
      })
    }
    else if (line.startsWith('#### ')) {
      if (currentList) {
        blocks.push(currentList)
        currentList = null
      }
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'h4',
        markDefs: [],
        children: [{ 
          _type: 'span',
          _key: generateKey(),
          text: line.substring(5),
          marks: []
        }]
      })
    }
    // Bullet lists
    else if (line.startsWith('- ') || line.startsWith('* ')) {
      const text = line.substring(2)
      if (!currentList || currentList.listItem !== 'bullet') {
        if (currentList) blocks.push(currentList)
        currentList = {
          _type: 'list',
          _key: generateKey(),
          listItem: 'bullet',
          children: []
        }
      }
      
      currentList.children.push({
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        markDefs: [],
        children: parseInlineText(text)
      })
    }
    // Numbered lists
    else if (line.match(/^\d+\.\s/)) {
      const text = line.replace(/^\d+\.\s/, '')
      if (!currentList || currentList.listItem !== 'number') {
        if (currentList) blocks.push(currentList)
        currentList = {
          _type: 'list',
          _key: generateKey(),
          listItem: 'number',
          children: []
        }
      }
      
      currentList.children.push({
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        markDefs: [],
        children: parseInlineText(text)
      })
    }
    // Blockquote
    else if (line.startsWith('>')) {
      if (currentList) {
        blocks.push(currentList)
        currentList = null
      }
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'blockquote',
        markDefs: [],
        children: [{ 
          _type: 'span',
          _key: generateKey(),
          text: line.substring(1).trim(),
          marks: []
        }]
      })
    }
    // Normal paragraph
    else {
      if (currentList) {
        blocks.push(currentList)
        currentList = null
      }
      
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        markDefs: [],
        children: parseInlineText(line)
      })
    }
  }

  if (currentList) {
    blocks.push(currentList)
  }

  return blocks
}

// Helper to parse inline text with bold/italic
function parseInlineText(text: string): any[] {
  const children: any[] = []
  
  // Simple bold detection
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  
  parts.forEach(part => {
    if (part.startsWith('**') && part.endsWith('**')) {
      children.push({
        _type: 'span',
        _key: generateKey(),
        text: part.slice(2, -2),
        marks: ['strong']
      })
    } else if (part) {
      children.push({
        _type: 'span',
        _key: generateKey(),
        text: part,
        marks: []
      })
    }
  })
  
  return children.length > 0 ? children : [{
    _type: 'span',
    _key: generateKey(),
    text: text,
    marks: []
  }]
}

// Generate unique keys for Sanity
function generateKey(): string {
  return Math.random().toString(36).substring(2, 15)
}

// Main function to prepare import data
async function prepareSanityImport() {
  const blogDir = path.join(process.cwd(), 'content', 'blog')
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'))
  
  console.log(`Found ${files.length} blog posts to prepare`)
  
  const documents: any[] = []
  
  for (const file of files) {
    try {
      console.log(`Processing: ${file}`)
      
      const filePath = path.join(blogDir, file)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { data: frontmatter, content } = matter(fileContent)
      
      const slug = file.replace('.md', '')
      
      // Truncate fields with length limitations
      const excerpt = truncateText(frontmatter.excerpt || '', 155) // Leave room for safety
      const metaDescription = truncateText(frontmatter.metaDescription || excerpt, 155)
      const metaTitle = truncateText(frontmatter.metaTitle || frontmatter.title, 58)
      const quickAnswer = truncateText(frontmatter.quickAnswer || '', 75)
      
      // Convert markdown to Portable Text
      const portableTextContent = markdownToPortableText(content)
      
      // Prepare FAQ data
      const faqs = frontmatter.faqs ? frontmatter.faqs.map((faq: any) => ({
        _type: 'object',
        _key: generateKey(),
        question: faq.question,
        answer: faq.answer,
        isVoiceOptimized: false
      })) : []
      
      // Create the document
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
        quickAnswer: quickAnswer,
        voiceSearchQueries: frontmatter.voiceSearchQueries || [],
        faqs: faqs,
        
        // Tags
        tags: frontmatter.tags || [],
        
        // Quick Stats (if available)
        quickStats: frontmatter.quickStats || [],
        
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
          whatsappMessage: `Hi Peter, I read your article and need help with my pub.`,
          urgency: 'medium'
        }
      }
      
      documents.push(doc)
      console.log(`✅ Prepared: ${file}`)
      
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error)
    }
  }
  
  // Write to NDJSON file for Sanity import
  const outputPath = path.join(process.cwd(), 'sanity-blog-import.ndjson')
  const ndjsonContent = documents.map(doc => JSON.stringify(doc)).join('\n')
  fs.writeFileSync(outputPath, ndjsonContent, 'utf-8')
  
  console.log(`\n=================================`)
  console.log(`Preparation completed!`)
  console.log(`✅ Prepared ${documents.length} posts`)
  console.log(`📁 Output file: sanity-blog-import.ndjson`)
  console.log(`\nTo import into Sanity:`)
  console.log(`1. Go to your Sanity Studio`)
  console.log(`2. Run: npx sanity dataset import sanity-blog-import.ndjson production`)
  console.log(`=================================`)
}

// Run the preparation
prepareSanityImport().catch(console.error)