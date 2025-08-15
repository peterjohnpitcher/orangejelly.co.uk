import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { writeClient } from '../src/lib/sanity.write-client';

interface SpanChild {
  _key: string;
  _type: 'span';
  text: string;
  marks?: string[];
}

interface Block {
  _key: string;
  _type: 'block';
  children: SpanChild[];
  style: string;
  listItem?: string;
  markDefs?: any[];
}

// Function to process text and convert markdown to proper Portable Text marks
function processMarkdownInText(text: string): SpanChild[] {
  const spans: SpanChild[] = [];

  // Split text by bold markers while preserving them for processing
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  parts.forEach((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      // Bold text - create span with strong mark
      const boldText = part.slice(2, -2);
      spans.push({
        _key: `span_${Date.now()}_${index}`,
        _type: 'span',
        text: boldText,
        marks: ['strong'],
      });
    } else if (part) {
      // Regular text
      spans.push({
        _key: `span_${Date.now()}_${index}`,
        _type: 'span',
        text: part,
        marks: [],
      });
    }
  });

  // If no spans were created, return the original text as a single span
  if (spans.length === 0) {
    return [
      {
        _key: `span_${Date.now()}`,
        _type: 'span',
        text: text,
        marks: [],
      },
    ];
  }

  return spans;
}

// Function to detect if a block should be a header
function detectHeaderFromMarkdown(text: string): {
  isHeader: boolean;
  level?: number;
  cleanText: string;
} {
  // Check for markdown header syntax
  if (text.startsWith('#### ')) {
    return { isHeader: true, level: 4, cleanText: text.substring(5).trim() };
  } else if (text.startsWith('### ')) {
    return { isHeader: true, level: 3, cleanText: text.substring(4).trim() };
  } else if (text.startsWith('## ')) {
    return { isHeader: true, level: 2, cleanText: text.substring(3).trim() };
  } else if (text.startsWith('# ')) {
    return { isHeader: true, level: 1, cleanText: text.substring(2).trim() };
  }

  // Check for bold text that should be a header
  // Pattern: **Text** at the start of a line, usually short
  const boldHeaderMatch = text.match(/^\*\*([^*]+)\*\*$/);
  if (boldHeaderMatch && boldHeaderMatch[1].length < 60) {
    return { isHeader: true, level: 3, cleanText: boldHeaderMatch[1] };
  }

  return { isHeader: false, cleanText: text };
}

// Function to fix content blocks
function fixContentBlocks(content: Block[]): Block[] {
  const fixedBlocks: Block[] = [];

  content.forEach((block, blockIndex) => {
    if (block._type !== 'block') {
      fixedBlocks.push(block);
      return;
    }

    // Get the text content
    let fullText = '';
    if (block.children && block.children.length > 0) {
      fullText = block.children.map((child) => child.text || '').join('');
    }

    // Check if this should be a header
    const { isHeader, level, cleanText } = detectHeaderFromMarkdown(fullText);

    if (isHeader && level) {
      // Convert to proper header block
      const styleMap: { [key: number]: string } = {
        1: 'h1',
        2: 'h2',
        3: 'h3',
        4: 'h4',
      };

      fixedBlocks.push({
        ...block,
        style: styleMap[level] || 'normal',
        children: [
          {
            _key: `span_${Date.now()}_${blockIndex}`,
            _type: 'span',
            text: cleanText,
            marks: [],
          },
        ],
      });
    } else {
      // Process markdown in regular blocks
      const processedChildren = processMarkdownInText(fullText);

      fixedBlocks.push({
        ...block,
        children: processedChildren.length > 0 ? processedChildren : block.children,
      });
    }
  });

  return fixedBlocks;
}

async function analyzeAndFixArticles() {
  console.log('🔍 Analyzing all blog articles for formatting issues...\n');

  try {
    // Fetch all articles from August 11th onwards
    const articles = await writeClient.fetch(`
      *[_type == "blogPost" && publishedDate >= "2025-08-11"] | order(publishedDate desc) {
        _id,
        title,
        slug,
        publishedDate,
        content
      }
    `);

    console.log(`Found ${articles.length} articles from August 11th onwards\n`);

    let totalFixed = 0;
    let totalIssues = 0;

    for (const article of articles) {
      console.log(`\n📄 Checking: ${article.title}`);
      console.log(`   Slug: ${article.slug.current}`);
      console.log(`   Published: ${article.publishedDate}`);

      if (!article.content || !Array.isArray(article.content)) {
        console.log(`   ⚠️  No content found`);
        continue;
      }

      // Check for markdown formatting issues
      let hasIssues = false;
      let issueCount = 0;

      article.content.forEach((block: any) => {
        if (block._type === 'block' && block.children) {
          const text = block.children.map((c: any) => c.text || '').join('');

          // Check for markdown headers
          if (text.match(/^#{1,4}\s/)) {
            hasIssues = true;
            issueCount++;
            console.log(`   ❌ Found markdown header: ${text.substring(0, 50)}...`);
          }

          // Check for markdown bold
          if (text.includes('**')) {
            hasIssues = true;
            issueCount++;
            console.log(`   ❌ Found markdown bold: ${text.substring(0, 50)}...`);
          }
        }
      });

      if (hasIssues) {
        console.log(`   🔧 Fixing ${issueCount} formatting issues...`);

        // Fix the content
        const fixedContent = fixContentBlocks(article.content);

        // Update the article
        const result = await writeClient.patch(article._id).set({ content: fixedContent }).commit();

        console.log(`   ✅ Fixed!`);
        totalFixed++;
        totalIssues += issueCount;
      } else {
        console.log(`   ✅ No formatting issues found`);
      }

      // Small delay to avoid overwhelming Sanity
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    console.log('\n' + '='.repeat(60));
    console.log(`🎉 Formatting fix complete!`);
    console.log(`📊 Fixed ${totalFixed} articles with ${totalIssues} total issues`);
    console.log('='.repeat(60));
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Run the script
analyzeAndFixArticles().catch(console.error);
