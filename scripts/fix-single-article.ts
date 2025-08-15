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
}

// Function to identify if text should be a header based on bold formatting patterns
function shouldBeHeader(text: string): { isHeader: boolean; style?: string; cleanText: string } {
  // Remove markdown bold formatting
  const cleanText = text.replace(/\*\*(.*?)\*\*/g, '$1');
  
  // Check if text contains bold markers
  const hasBoldMarkers = /\*\*.*?\*\*/.test(text);
  
  if (!hasBoldMarkers) {
    return { isHeader: false, cleanText };
  }
  
  // Split text into lines to check the first line for header patterns
  const firstLine = cleanText.split('\n')[0].trim();
  
  // Pattern for h3 sub-headings (specific action items, steps)
  const h3Patterns = [
    /^(Opening|Middle|Close|Sign Off):/i,
    /^(Week \d+|Month \d+|Day \d+|Step \d+|Phase \d+):/i,
    /^The \w+:/i,
    /^(What|How) [A-Z]/i,
    /^\w+ \w+:$/,  // Two words followed by colon
    /^[A-Z][^.]{5,30}$/,  // Short titles without periods
  ];
  
  // Pattern for h2 main headings (longer descriptive titles)
  const h2Patterns = [
    /^(The|What|How|Why|When|Where|Building|Creating|Understanding)/i,
    /^[A-Z][^.]*\s+(System|Framework|Protocol|Strategy|Approach|Plan|Guide|Method)$/i,
    /\?$/,  // Questions
    /^[A-Z][^.]{30,}$/,  // Longer titles without periods
    /^(When you|If you|For \w+)/i
  ];
  
  // Check for h3 patterns first (more specific)
  for (const pattern of h3Patterns) {
    if (pattern.test(firstLine)) {
      return { isHeader: true, style: 'h3', cleanText };
    }
  }
  
  // Then check for h2 patterns
  for (const pattern of h2Patterns) {
    if (pattern.test(firstLine)) {
      return { isHeader: true, style: 'h2', cleanText };
    }
  }
  
  // Fallback: if it has bold markers and looks like a header
  // (short, no sentence-ending punctuation, capitalized)
  if (firstLine.length < 80 && 
      !firstLine.includes('.') && 
      !firstLine.includes(',') &&
      firstLine.split(' ').length <= 10 &&
      /^[A-Z]/.test(firstLine)) {
    return { isHeader: true, style: 'h3', cleanText };
  }
  
  return { isHeader: false, cleanText };
}

// Function to clean bold formatting from paragraphs (keep only emphasis)
function cleanParagraphBold(text: string): { text: string; marks?: string[] } {
  // For now, we'll remove most bold formatting except for very specific emphasis cases
  // This is conservative - we can adjust based on content review
  
  // Keep bold for specific patterns that are likely intentional emphasis
  const emphasisPatterns = [
    /\*\*(DO NOT|DON'T|NEVER|ALWAYS|CRITICAL|IMPORTANT|WARNING|NOTE)\*\*/gi,
    /\*\*([A-Z]{2,})\*\*/g, // All caps words
    /\*\*([0-9]+%)\*\*/g, // Percentages
    /\*\*(£[0-9,]+)\*\*/g // Prices
  ];
  
  let hasEmphasis = false;
  let cleanText = text;
  
  // Check if any emphasis patterns exist
  for (const pattern of emphasisPatterns) {
    if (pattern.test(text)) {
      hasEmphasis = true;
      break;
    }
  }
  
  if (hasEmphasis) {
    // Keep emphasis but remove other bold formatting
    cleanText = text.replace(/\*\*((?!(?:DO NOT|DON'T|NEVER|ALWAYS|CRITICAL|IMPORTANT|WARNING|NOTE|[A-Z]{2,}|[0-9]+%|£[0-9,]+))[^*]+)\*\*/g, '$1');
    return { text: cleanText, marks: ['strong'] };
  } else {
    // Remove all bold formatting
    cleanText = text.replace(/\*\*(.*?)\*\*/g, '$1');
    return { text: cleanText };
  }
}

// Function to split content that contains both header and paragraph text
function splitMixedContent(text: string): { headerText?: string; headerStyle?: string; paragraphText?: string } {
  // Check if text contains bold markers
  const hasBoldMarkers = /\*\*.*?\*\*/.test(text);
  
  if (!hasBoldMarkers) {
    return { paragraphText: text };
  }
  
  const lines = text.split('\n');
  const firstLine = lines[0].trim();
  
  // Check if first line looks like a header
  const { isHeader, style, cleanText } = shouldBeHeader(`**${firstLine}**`);
  
  if (isHeader && style && lines.length > 1) {
    // Split: first line becomes header, rest becomes paragraph
    const headerText = firstLine.replace(/\*\*(.*?)\*\*/g, '$1');
    const paragraphText = lines.slice(1).join('\n').trim();
    return { headerText, headerStyle: style, paragraphText };
  }
  
  return { paragraphText: text };
}

// Function to fix content blocks
function fixContentBlocks(content: Block[]): Block[] {
  const newBlocks: Block[] = [];
  
  content.forEach((block, index) => {
    if (block._type === 'block' && block.children && block.children.length === 1) {
      const child = block.children[0];
      
      if (child._type === 'span' && child.text) {
        const { headerText, headerStyle, paragraphText } = splitMixedContent(child.text);
        
        if (headerText && headerStyle && paragraphText) {
          // Split into two blocks: header + paragraph
          const headerBlock: Block = {
            _key: `${block._key}_header`,
            _type: 'block',
            style: headerStyle,
            children: [{
              _key: `${child._key}_header`,
              _type: 'span',
              text: headerText
            }]
          };
          
          const paragraphBlock: Block = {
            _key: `${block._key}_paragraph`,
            _type: 'block',
            style: 'normal',
            children: [{
              _key: `${child._key}_paragraph`,
              _type: 'span',
              text: cleanParagraphBold(paragraphText).text
            }]
          };
          
          newBlocks.push(headerBlock, paragraphBlock);
        } else {
          // Check if this should be a header block
          const { isHeader, style, cleanText } = shouldBeHeader(child.text);
          
          if (isHeader && style) {
            // Convert to header block
            newBlocks.push({
              ...block,
              style,
              children: [{
                ...child,
                text: cleanText
              }]
            });
          } else {
            // Clean paragraph text
            const { text } = cleanParagraphBold(child.text);
            newBlocks.push({
              ...block,
              children: [{
                ...child,
                text
              }]
            });
          }
        }
      } else {
        newBlocks.push(block);
      }
    } else {
      // Handle blocks with multiple children or other types
      if (block._type === 'block' && block.children) {
        const newChildren = block.children.map(child => {
          if (child._type === 'span' && child.text) {
            const { text } = cleanParagraphBold(child.text);
            return {
              ...child,
              text
            };
          }
          return child;
        });
        
        newBlocks.push({
          ...block,
          children: newChildren
        });
      } else {
        newBlocks.push(block);
      }
    }
  });
  
  return newBlocks;
}

async function fixSingleArticle() {
  const slug = 'terrible-online-reviews-damage-control';
  
  console.log(`🔧 Fixing formatting for: ${slug}`);
  
  try {
    // Fetch the article
    const article = await writeClient.fetch(`
      *[_type == "blogPost" && slug.current == $slug][0] {
        _id,
        title,
        content
      }
    `, { slug });

    if (!article) {
      console.log(`❌ Article not found: ${slug}`);
      return;
    }

    console.log(`📄 Found article: ${article.title}`);
    
    if (!article.content || !Array.isArray(article.content)) {
      console.log(`⚠️  No content to fix for: ${slug}`);
      return;
    }

    console.log(`📊 Original blocks: ${article.content.length}`);
    
    // Fix the content
    const fixedContent = fixContentBlocks(article.content);
    
    console.log(`📊 Fixed blocks: ${fixedContent.length}`);
    
    // Count actual changes
    let changes = 0;
    
    // Since we might split blocks, we need to count differently
    if (fixedContent.length !== article.content.length) {
      changes = Math.abs(fixedContent.length - article.content.length);
      console.log(`📊 Block count changed by: ${changes}`);
    }
    
    // Also check for text changes
    const originalText = article.content.map((b: Block) => 
      b.children?.map((c: SpanChild) => c.text).join('') || ''
    ).join('');
    
    const fixedText = fixedContent.map((b: Block) => 
      b.children?.map((c: SpanChild) => c.text).join('') || ''
    ).join('');
    
    if (originalText !== fixedText) {
      console.log(`📊 Text content changed`);
      changes += 1;
    }
    
    if (changes === 0 && fixedContent.length === article.content.length) {
      console.log(`✅ No formatting issues found in: ${slug}`);
      return;
    }
    
    console.log(`📝 Applying ${changes} changes...`);
    
    // Update the article
    const result = await writeClient
      .patch(article._id)
      .set({ content: fixedContent })
      .commit();
    
    console.log(`✅ Fixed formatting for: ${slug}`);
    console.log(`📊 Final result: ${fixedContent.length} blocks`);
    
  } catch (error) {
    console.error(`❌ Error fixing ${slug}:`, error);
  }
}

fixSingleArticle().catch(console.error);