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
  
  // Pattern for main headings (longer titles, often questions or statements)
  const mainHeadingPatterns = [
    /^(The|What|How|Why|When|Where|Building|Creating|Understanding)/i,
    /^[A-Z][^.]*\s+(System|Framework|Protocol|Strategy|Approach|Plan|Guide|Method)$/i,
    /\?$/,  // Questions
    /^[A-Z][^.]{20,}$/  // Longer titles without periods
  ];
  
  // Pattern for sub-headings (shorter, often action-oriented)
  const subHeadingPatterns = [
    /^(Opening|Middle|Close|Sign Off|Week \d+|Month \d+|Day \d+|Step \d+|Phase \d+|The \w+|For \w+):/i,
    /^[A-Z][^.]{5,20}$/,  // Shorter titles
    /^(What|How|The) [A-Z]/i
  ];
  
  // Check if text contains bold markers and matches patterns
  const hasBoldMarkers = /\*\*.*?\*\*/.test(text);
  
  if (hasBoldMarkers) {
    // Check for main heading patterns
    for (const pattern of mainHeadingPatterns) {
      if (pattern.test(cleanText)) {
        return { isHeader: true, style: 'h2', cleanText };
      }
    }
    
    // Check for sub-heading patterns
    for (const pattern of subHeadingPatterns) {
      if (pattern.test(cleanText)) {
        return { isHeader: true, style: 'h3', cleanText };
      }
    }
    
    // If it has bold markers but doesn't match header patterns,
    // check if it's likely a header by length and structure
    if (cleanText.length < 100 && !cleanText.includes('.') && 
        cleanText.split(' ').length <= 8) {
      return { isHeader: true, style: 'h3', cleanText };
    }
  }
  
  return { isHeader: false, cleanText };
}

async function testFormattingFix() {
  try {
    // Test with the reviews article that we know has formatting issues
    const article = await writeClient.fetch(`
      *[_type == "blogPost" && slug.current == "terrible-online-reviews-damage-control"][0] {
        _id,
        title,
        content
      }
    `);

    if (!article) {
      console.log('Article not found');
      return;
    }

    console.log('Testing formatting fix for:', article.title);
    console.log('\n=== ANALYZING CONTENT ===\n');
    
    // Analyze each block for potential issues
    article.content.forEach((block: Block, index: number) => {
      if (block._type === 'block' && block.children) {
        block.children.forEach((child: SpanChild) => {
          if (child._type === 'span' && child.text) {
            const { isHeader, style, cleanText } = shouldBeHeader(child.text);
            
            if (isHeader) {
              console.log(`Block ${index}:`);
              console.log(`  Current style: ${block.style}`);
              console.log(`  Original text: "${child.text}"`);
              console.log(`  Suggested style: ${style}`);
              console.log(`  Clean text: "${cleanText}"`);
              console.log(`  Should change: ${block.style !== style ? 'YES' : 'NO'}`);
              console.log('---');
            } else if (child.text.includes('**')) {
              console.log(`Block ${index} (keeping bold in paragraph):`);
              console.log(`  Style: ${block.style}`);
              console.log(`  Text with bold: "${child.text}"`);
              console.log('---');
            }
          }
        });
      }
    });

  } catch (error) {
    console.error('Error:', error);
  }
}

testFormattingFix();