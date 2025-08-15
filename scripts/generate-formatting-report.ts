import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { writeClient } from '../src/lib/sanity.write-client';
import * as fs from 'fs';

// List of articles to fix
const articlesToFix = [
  'young-people-wont-come-to-your-pub',
  'terrible-online-reviews-damage-control',
  'village-pub-dying-village-survival',
  'nobody-books-tables-anymore',
  'brewery-tie-improve-your-deal',
  'cash-flow-crisis-breaking-cycle',
  'food-allergies-gdpr-compliance',
  'kitchen-nightmares-chef-quits'
];

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

interface FormattingFix {
  blockIndex: number;
  blockKey: string;
  currentStyle: string;
  currentText: string;
  suggestedAction: 'convert_to_header' | 'split_block' | 'clean_bold';
  suggestedStyle?: string;
  cleanText?: string;
  splitInto?: {
    headerText: string;
    headerStyle: string;
    paragraphText: string;
  };
}

interface ArticleReport {
  slug: string;
  title: string;
  articleId: string;
  publishedDate: string;
  totalBlocks: number;
  issues: FormattingFix[];
  needsChanges: boolean;
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

// Function to analyze content for formatting issues
function analyzeContentFormatting(content: Block[]): FormattingFix[] {
  const issues: FormattingFix[] = [];
  
  content.forEach((block, index) => {
    if (block._type === 'block' && block.children && block.children.length === 1) {
      const child = block.children[0];
      
      if (child._type === 'span' && child.text) {
        const { isHeader, style, cleanText } = shouldBeHeader(child.text);
        
        // Check if this should be converted to a header
        if (isHeader && style && block.style !== style) {
          // Check if it needs to be split (header + paragraph content)
          const lines = child.text.split('\n');
          const firstLine = lines[0].trim();
          
          if (lines.length > 1 && shouldBeHeader(`**${firstLine}**`).isHeader) {
            // Needs to be split
            issues.push({
              blockIndex: index,
              blockKey: block._key,
              currentStyle: block.style,
              currentText: child.text,
              suggestedAction: 'split_block',
              splitInto: {
                headerText: firstLine.replace(/\*\*(.*?)\*\*/g, '$1'),
                headerStyle: style,
                paragraphText: lines.slice(1).join('\n').trim().replace(/\*\*(.*?)\*\*/g, '$1')
              }
            });
          } else {
            // Just convert to header
            issues.push({
              blockIndex: index,
              blockKey: block._key,
              currentStyle: block.style,
              currentText: child.text,
              suggestedAction: 'convert_to_header',
              suggestedStyle: style,
              cleanText
            });
          }
        } else if (child.text.includes('**') && !isHeader) {
          // Clean bold formatting from paragraphs
          const cleanedText = child.text.replace(/\*\*(.*?)\*\*/g, '$1');
          if (cleanedText !== child.text) {
            issues.push({
              blockIndex: index,
              blockKey: block._key,
              currentStyle: block.style,
              currentText: child.text,
              suggestedAction: 'clean_bold',
              cleanText: cleanedText
            });
          }
        }
      }
    } else if (block._type === 'block' && block.children) {
      // Check multi-child blocks for bold formatting
      let hasChanges = false;
      block.children.forEach((child, childIndex) => {
        if (child._type === 'span' && child.text && child.text.includes('**')) {
          hasChanges = true;
        }
      });
      
      if (hasChanges) {
        issues.push({
          blockIndex: index,
          blockKey: block._key,
          currentStyle: block.style,
          currentText: block.children.map(c => c.text).join(''),
          suggestedAction: 'clean_bold',
          cleanText: block.children.map(c => c.text?.replace(/\*\*(.*?)\*\*/g, '$1') || '').join('')
        });
      }
    }
  });
  
  return issues;
}

async function generateFormattingReport() {
  const reports: ArticleReport[] = [];
  
  console.log('🔍 Analyzing blog articles for formatting issues...\n');
  
  for (const slug of articlesToFix) {
    try {
      const article = await writeClient.fetch(`
        *[_type == "blogPost" && slug.current == $slug][0] {
          _id,
          title,
          slug,
          publishedDate,
          content
        }
      `, { slug });

      if (!article) {
        console.log(`❌ Article not found: ${slug}`);
        continue;
      }

      console.log(`📄 Analyzing: ${article.title}`);
      
      const issues = analyzeContentFormatting(article.content || []);
      
      const report: ArticleReport = {
        slug,
        title: article.title,
        articleId: article._id,
        publishedDate: article.publishedDate,
        totalBlocks: article.content?.length || 0,
        issues,
        needsChanges: issues.length > 0
      };
      
      reports.push(report);
      
      console.log(`   📊 Found ${issues.length} formatting issues`);
      
    } catch (error) {
      console.error(`❌ Error analyzing ${slug}:`, error);
    }
  }
  
  // Generate detailed report
  console.log('\n📋 Generating detailed report...');
  
  const reportContent = generateDetailedReport(reports);
  
  // Save report to file
  const reportPath = '/Users/peterpitcher/Documents/Cursor/orangejelly.co.uk/website/BLOG_FORMATTING_FIX_REPORT.md';
  fs.writeFileSync(reportPath, reportContent);
  
  console.log(`✅ Report saved to: ${reportPath}`);
  console.log(`📊 Total articles analyzed: ${reports.length}`);
  console.log(`📊 Articles needing fixes: ${reports.filter(r => r.needsChanges).length}`);
  console.log(`📊 Total issues found: ${reports.reduce((sum, r) => sum + r.issues.length, 0)}`);
}

function generateDetailedReport(reports: ArticleReport[]): string {
  const totalIssues = reports.reduce((sum, r) => sum + r.issues.length, 0);
  const articlesNeedingFixes = reports.filter(r => r.needsChanges).length;
  
  let markdown = `# Blog Formatting Fix Report

Generated on: ${new Date().toISOString()}

## Summary

- **Total articles analyzed:** ${reports.length}
- **Articles needing fixes:** ${articlesNeedingFixes}
- **Total formatting issues found:** ${totalIssues}

## Issues Found

The main formatting problems are:
1. **Bold headers**: Text using \`**bold**\` formatting that should be proper h2/h3 headers
2. **Mixed content blocks**: Blocks containing both header and paragraph content that need to be split
3. **Excessive bold formatting**: Paragraph text with unnecessary bold formatting

## Detailed Article Reports

`;

  reports.forEach(report => {
    markdown += `### ${report.title}\n\n`;
    markdown += `- **Slug:** \`${report.slug}\`\n`;
    markdown += `- **Article ID:** \`${report.articleId}\`\n`;
    markdown += `- **Published:** ${report.publishedDate}\n`;
    markdown += `- **Total blocks:** ${report.totalBlocks}\n`;
    markdown += `- **Issues found:** ${report.issues.length}\n\n`;
    
    if (report.issues.length === 0) {
      markdown += `✅ **No formatting issues found**\n\n`;
    } else {
      markdown += `#### Issues to Fix:\n\n`;
      
      report.issues.forEach((issue, index) => {
        markdown += `**${index + 1}. Block ${issue.blockIndex} (${issue.suggestedAction})**\n\n`;
        markdown += `- **Current style:** \`${issue.currentStyle}\`\n`;
        markdown += `- **Current text:** \`${issue.currentText.substring(0, 100)}${issue.currentText.length > 100 ? '...' : ''}\`\n`;
        
        if (issue.suggestedAction === 'convert_to_header') {
          markdown += `- **Action:** Convert to \`${issue.suggestedStyle}\` header\n`;
          markdown += `- **Clean text:** \`${issue.cleanText?.substring(0, 100)}${issue.cleanText && issue.cleanText.length > 100 ? '...' : ''}\`\n`;
        } else if (issue.suggestedAction === 'split_block') {
          markdown += `- **Action:** Split into header + paragraph\n`;
          markdown += `- **Header:** \`${issue.splitInto?.headerStyle}\` - "${issue.splitInto?.headerText}"\n`;
          markdown += `- **Paragraph:** "${issue.splitInto?.paragraphText?.substring(0, 100)}${issue.splitInto?.paragraphText && issue.splitInto.paragraphText.length > 100 ? '...' : ''}"\n`;
        } else if (issue.suggestedAction === 'clean_bold') {
          markdown += `- **Action:** Remove bold formatting\n`;
          markdown += `- **Clean text:** \`${issue.cleanText?.substring(0, 100)}${issue.cleanText && issue.cleanText.length > 100 ? '...' : ''}\`\n`;
        }
        
        markdown += '\n';
      });
    }
    
    markdown += '---\n\n';
  });
  
  markdown += `## Manual Fix Instructions

Since automated fixes require write permissions, here are manual instructions for implementing these changes:

### In Sanity Studio:

1. **For header conversions:**
   - Navigate to the blog post in Sanity Studio
   - Find the block with the bold formatted text
   - Change the style from "Normal" to "H2" or "H3" as indicated
   - Remove the \`**\` markers from the text

2. **For block splits:**
   - Find the block containing both header and paragraph content
   - Create a new block above it with the header style
   - Move the header text to the new block (without \`**\` markers)
   - Keep the paragraph content in the original block
   - Change the original block style to "Normal"

3. **For bold formatting removal:**
   - Find blocks with excessive \`**\` formatting
   - Remove the \`**\` markers while keeping the text content
   - Keep bold only for genuine emphasis (prices, percentages, important warnings)

### Bulk Approach:

If you have Sanity write permissions, you can use the automated script:
\`\`\`bash
npx tsx scripts/fix-blog-formatting.ts
\`\`\`

This will automatically apply all the fixes identified in this report.

## Next Steps

1. Review this report
2. Either apply fixes manually in Sanity Studio or run the automated script with proper permissions
3. Verify changes by checking the blog posts on the live site
4. The formatting should now be consistent with older articles (proper h2/h3 headers, minimal bold formatting)
`;

  return markdown;
}

generateFormattingReport().catch(console.error);