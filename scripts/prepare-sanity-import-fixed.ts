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

// Helper to convert markdown to Portable Text blocks (FIXED VERSION)
function markdownToPortableText(markdown: string): any[] {
  const blocks: any[] = []
  const lines = markdown.split('\n')
  let inList = false
  let listType: 'bullet' | 'number' | null = null

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    if (!line) {
      // Empty line - end any active list
      if (inList) {
        inList = false
        listType = null
      }
      continue
    }

    // Headers
    if (line.startsWith('## ')) {
      inList = false
      listType = null
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
      inList = false
      listType = null
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
      inList = false
      listType = null
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
    // Bullet lists - FIXED FORMAT
    else if (line.startsWith('- ') || line.startsWith('* ')) {
      const text = line.substring(2)
      inList = true
      listType = 'bullet'
      
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        markDefs: [],
        children: parseInlineText(text)
      })
    }
    // Numbered lists - FIXED FORMAT
    else if (line.match(/^\d+\.\s/)) {
      const text = line.replace(/^\d+\.\s/, '')
      inList = true
      listType = 'number'
      
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        listItem: 'number',
        level: 1,
        markDefs: [],
        children: parseInlineText(text)
      })
    }
    // Blockquote
    else if (line.startsWith('>')) {
      inList = false
      listType = null
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
      inList = false
      listType = null
      
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        markDefs: [],
        children: parseInlineText(line)
      })
    }
  }

  return blocks
}

// Helper to parse inline text with bold/italic
function parseInlineText(text: string): any[] {
  const children: any[] = []
  
  // Handle bold text (including nested patterns)
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  
  parts.forEach(part => {
    if (part.startsWith('**') && part.endsWith('**')) {
      // Bold text
      const boldText = part.slice(2, -2)
      
      // Check if there's a colon separator (common in lists)
      if (boldText.includes(':')) {
        // Just bold the whole thing
        children.push({
          _type: 'span',
          _key: generateKey(),
          text: boldText,
          marks: ['strong']
        })
      } else {
        children.push({
          _type: 'span',
          _key: generateKey(),
          text: boldText,
          marks: ['strong']
        })
      }
    } else if (part) {
      // Regular text
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
      const excerpt = truncateText(frontmatter.excerpt || '', 155)
      const metaDescription = truncateText(frontmatter.metaDescription || excerpt, 155)
      const metaTitle = truncateText(frontmatter.metaTitle || frontmatter.title, 58)
      const quickAnswer = truncateText(frontmatter.quickAnswer || '', 75)
      
      // Convert markdown to Portable Text with FIXED list format
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
  const outputPath = path.join(process.cwd(), 'sanity-blog-import-fixed.ndjson')
  const ndjsonContent = documents.map(doc => JSON.stringify(doc)).join('\n')
  fs.writeFileSync(outputPath, ndjsonContent, 'utf-8')
  
  console.log(`\n=================================`)
  console.log(`Preparation completed!`)
  console.log(`✅ Prepared ${documents.length} posts with FIXED list format`)
  console.log(`📁 Output file: sanity-blog-import-fixed.ndjson`)
  console.log(`\nTo import into Sanity:`)
  console.log(`1. cd sanity-studio`)
  console.log(`2. npx sanity dataset import ../sanity-blog-import-fixed.ndjson production --replace`)
  console.log(`=================================`)
}

// Run the preparation
prepareSanityImport().catch(console.error)