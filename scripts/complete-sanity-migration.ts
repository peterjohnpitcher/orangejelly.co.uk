#!/usr/bin/env npx tsx
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Helper to truncate text to max length
function truncateText(text: string, maxLength: number): string {
  if (!text) return ''
  if (text.length <= maxLength) return text
  
  const truncated = text.substring(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')
  
  if (lastSpace > 0) {
    return truncated.substring(0, lastSpace).trim()
  }
  
  return truncated.trim()
}

// Helper to convert markdown to Portable Text blocks - COMPLETE VERSION
function markdownToPortableText(markdown: string): any[] {
  if (!markdown) return []
  
  const blocks: any[] = []
  const lines = markdown.split('\n')
  let inList = false
  let listType: 'bullet' | 'number' | null = null

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]
    
    // Skip empty lines but preserve paragraph breaks
    if (!line.trim()) {
      if (inList) {
        inList = false
        listType = null
      }
      continue
    }

    // Check for headers FIRST (before trimming!)
    let isHeader = false
    let headerLevel = 0
    let headerText = ''
    
    if (line.startsWith('##### ')) {
      isHeader = true
      headerLevel = 5
      headerText = line.substring(6).trim()
    } else if (line.startsWith('#### ')) {
      isHeader = true
      headerLevel = 4
      headerText = line.substring(5).trim()
    } else if (line.startsWith('### ')) {
      isHeader = true
      headerLevel = 3
      headerText = line.substring(4).trim()
    } else if (line.startsWith('## ')) {
      isHeader = true
      headerLevel = 2
      headerText = line.substring(3).trim()
    } else if (line.startsWith('# ')) {
      isHeader = true
      headerLevel = 1
      headerText = line.substring(2).trim()
    }
    
    if (isHeader) {
      inList = false
      listType = null
      
      const styleMap: { [key: number]: string } = {
        1: 'h1',
        2: 'h2',
        3: 'h3',
        4: 'h4',
        5: 'h5'
      }
      
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: styleMap[headerLevel] || 'normal',
        markDefs: [],
        children: [{ 
          _type: 'span', 
          _key: generateKey(),
          text: headerText,
          marks: []
        }]
      })
      continue
    }
    
    // Now trim for other checks
    line = line.trim()
    
    // Bullet lists
    if (line.startsWith('- ') || line.startsWith('* ')) {
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
    // Numbered lists
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
  
  if (!text) {
    return [{
      _type: 'span',
      _key: generateKey(),
      text: '',
      marks: []
    }]
  }
  
  // Handle bold text (including nested patterns)
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  
  parts.forEach(part => {
    if (part.startsWith('**') && part.endsWith('**')) {
      // Bold text
      const boldText = part.slice(2, -2)
      children.push({
        _type: 'span',
        _key: generateKey(),
        text: boldText,
        marks: ['strong']
      })
    } else if (part) {
      // Regular text - check for italic
      const italicParts = part.split(/(\*[^*]+\*)/g)
      italicParts.forEach(italicPart => {
        if (italicPart.startsWith('*') && italicPart.endsWith('*') && italicPart.length > 2) {
          children.push({
            _type: 'span',
            _key: generateKey(),
            text: italicPart.slice(1, -1),
            marks: ['em']
          })
        } else if (italicPart) {
          children.push({
            _type: 'span',
            _key: generateKey(),
            text: italicPart,
            marks: []
          })
        }
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

// Extract category reference
function getCategoryReference(category: string): any {
  const categoryMap: { [key: string]: string } = {
    'empty-pub-solutions': 'empty-pub-solutions',
    'social-media': 'social-media',
    'competition': 'competition',
    'events-promotions': 'events-promotions',
    'menu-pricing': 'menu-pricing',
    'events': 'events-promotions',
    'marketing': 'social-media'
  }
  
  const categoryId = categoryMap[category] || 'empty-pub-solutions'
  
  return {
    _type: 'reference',
    _ref: `category-${categoryId}`
  }
}

// Main function to prepare COMPLETE import data
async function completeSanityMigration() {
  const blogDir = path.join(process.cwd(), 'content', 'blog')
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'))
  
  console.log(`Found ${files.length} blog posts to migrate with COMPLETE data`)
  console.log('=' .repeat(50))
  
  const documents: any[] = []
  const categories = new Set<string>()
  
  for (const file of files) {
    try {
      console.log(`\nProcessing: ${file}`)
      
      const filePath = path.join(blogDir, file)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { data: frontmatter, content } = matter(fileContent)
      
      const slug = file.replace('.md', '')
      
      // Track categories
      if (frontmatter.category) {
        categories.add(frontmatter.category)
      }
      
      // Parse ALL frontmatter fields with proper truncation
      const title = frontmatter.title || 'Untitled'
      const excerpt = truncateText(frontmatter.excerpt || '', 155)
      const publishedDate = frontmatter.publishedDate || new Date().toISOString()
      const category = frontmatter.category || 'empty-pub-solutions'
      const tags = frontmatter.tags || []
      
      // SEO fields
      const seoTitle = truncateText(frontmatter.seo?.title || frontmatter.metaTitle || title, 58)
      const seoDescription = truncateText(
        frontmatter.seo?.description || frontmatter.metaDescription || excerpt, 
        155
      )
      const seoKeywords = frontmatter.seo?.keywords || frontmatter.keywords || tags
      
      // Featured image
      const featuredImage = frontmatter.featuredImage
      
      // Convert FULL markdown content to Portable Text
      const portableTextContent = markdownToPortableText(content)
      
      // AI & Voice Search fields from frontmatter
      const quickAnswer = truncateText(frontmatter.quickAnswer || '', 75)
      const voiceSearchQueries = frontmatter.voiceSearchQueries || []
      const quickStats = frontmatter.quickStats || []
      
      // FAQs from frontmatter
      const faqs = frontmatter.faqs ? frontmatter.faqs.map((faq: any) => ({
        _type: 'object',
        _key: generateKey(),
        question: faq.question || '',
        answer: faq.answer || '',
        isVoiceOptimized: faq.isVoiceOptimized || false
      })) : []
      
      // Create the COMPLETE document
      const doc = {
        _type: 'blogPost',
        _id: `blogPost-${slug}`,
        title: title,
        slug: {
          _type: 'slug',
          current: slug
        },
        status: 'published',
        excerpt: excerpt,
        content: portableTextContent, // Full content converted
        publishedDate: publishedDate,
        updatedDate: frontmatter.updatedDate || publishedDate,
        
        // Category reference (will create separately)
        category: getCategoryReference(category),
        
        // Tags
        tags: tags,
        
        // Featured Image - store as URL string for now
        // (images need to be uploaded to Sanity separately)
        ...(featuredImage && {
          featuredImage: featuredImage
        }),
        
        // Complete SEO fields
        seo: {
          _type: 'object',
          metaTitle: seoTitle,
          metaDescription: seoDescription,
          keywords: seoKeywords
        },
        
        // AI & Voice Search fields  
        quickAnswer: quickAnswer,
        voiceSearchQueries: voiceSearchQueries,
        quickStats: quickStats.map((stat: any) => ({
          _type: 'object',
          _key: generateKey(),
          label: stat.label || '',
          value: stat.value || '',
          highlight: stat.highlight || false
        })),
        faqs: faqs,
        
        // Local SEO
        localSEO: {
          _type: 'object',
          targetLocation: frontmatter.localSEO?.targetLocation || 'Surrey',
          nearbyLandmarks: frontmatter.localSEO?.nearbyLandmarks || ['Heathrow', 'Staines', 'M25'],
          localModifiers: frontmatter.localSEO?.localModifiers || ['near me', 'local', 'in my area']
        },
        
        // CTA Settings
        ctaSettings: {
          _type: 'object',
          primaryCTA: frontmatter.ctaSettings?.primaryCTA || 'Get Help Now',
          whatsappMessage: frontmatter.ctaSettings?.whatsappMessage || 
            `Hi Peter, I read your article about ${title} and need help with my pub.`,
          urgency: frontmatter.ctaSettings?.urgency || 'medium'
        },
        
        // Author reference (create default)
        author: {
          _type: 'reference',
          _ref: 'author-peter-pitcher'
        }
      }
      
      documents.push(doc)
      console.log(`  ✅ Title: ${title}`)
      console.log(`  ✅ Content blocks: ${portableTextContent.length}`)
      console.log(`  ✅ Tags: ${tags.length}`)
      console.log(`  ✅ FAQs: ${faqs.length}`)
      
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error)
    }
  }
  
  // Add category documents
  const categoryDocs = Array.from(categories).map(cat => ({
    _type: 'category',
    _id: `category-${cat}`,
    name: cat.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    slug: {
      _type: 'slug',
      current: cat
    }
  }))
  
  // Add author document
  const authorDoc = {
    _type: 'author',
    _id: 'author-peter-pitcher',
    name: 'Peter Pitcher',
    bio: 'Licensee of The Anchor in Stanwell Moor and founder of Orange Jelly. Helping struggling pubs thrive with proven strategies from real experience.',
    // Image will need to be uploaded separately
    image: '/images/peter-pitcher.jpg'
  }
  
  // Combine all documents
  const allDocuments = [...documents, ...categoryDocs, authorDoc]
  
  // Write to NDJSON file for Sanity import
  const outputPath = path.join(process.cwd(), 'sanity-complete-migration.ndjson')
  const ndjsonContent = allDocuments.map(doc => JSON.stringify(doc)).join('\n')
  fs.writeFileSync(outputPath, ndjsonContent, 'utf-8')
  
  console.log(`\n${'='.repeat(50)}`)
  console.log(`COMPLETE MIGRATION FINISHED!`)
  console.log(`${'='.repeat(50)}`)
  console.log(`✅ Migrated ${documents.length} blog posts with ALL content`)
  console.log(`✅ Created ${categoryDocs.length} category documents`)
  console.log(`✅ Created author document`)
  console.log(`📁 Output file: sanity-complete-migration.ndjson`)
  console.log(`\n📊 Migration Summary:`)
  documents.forEach((doc, i) => {
    console.log(`  ${i + 1}. ${doc.title.substring(0, 50)}...`)
  })
  console.log(`\n🚀 To import into Sanity:`)
  console.log(`   cd sanity-studio`)
  console.log(`   npx sanity dataset import ../sanity-complete-migration.ndjson production --replace`)
  console.log(`${'='.repeat(50)}`)
}

// Run the complete migration
completeSanityMigration().catch(console.error)