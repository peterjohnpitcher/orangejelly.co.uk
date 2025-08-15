import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { writeClient } from '../src/lib/sanity.write-client';
import fs from 'fs';
import path from 'path';

interface Block {
  _key: string;
  _type: 'block';
  children: any[];
  style: string;
  listItem?: string;
  markDefs?: any[];
}

// Function to detect markdown formatting issues
function detectMarkdownIssues(content: Block[]): any[] {
  const issues: any[] = [];

  content.forEach((block, index) => {
    if (block._type !== 'block' || !block.children) return;

    const text = block.children.map((c: any) => c.text || '').join('');

    // Check for markdown headers
    if (text.match(/^#{1,4}\s/)) {
      issues.push({
        type: 'markdown_header',
        blockIndex: index,
        text: text.substring(0, 100),
        fix: 'Convert to proper header block (h1/h2/h3/h4)',
      });
    }

    // Check for markdown bold
    if (text.includes('**')) {
      issues.push({
        type: 'markdown_bold',
        blockIndex: index,
        text: text.substring(0, 100),
        fix: 'Convert ** to proper strong marks in Portable Text',
      });
    }
  });

  return issues;
}

// Generate fix instructions
function generateFixInstructions(issues: any[]): string {
  const instructions: string[] = [];

  issues.forEach((issue, index) => {
    instructions.push(`${index + 1}. Block ${issue.blockIndex}:`);
    instructions.push(`   Issue: ${issue.type}`);
    instructions.push(`   Text: "${issue.text}..."`);
    instructions.push(`   Fix: ${issue.fix}`);
    instructions.push('');
  });

  return instructions.join('\n');
}

async function analyzeArticles() {
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

    const report: string[] = [];
    report.push('# Blog Formatting Analysis Report');
    report.push(`Generated: ${new Date().toISOString()}\n`);
    report.push(`## Summary`);
    report.push(`- Total articles analyzed: ${articles.length}`);

    let totalIssues = 0;
    let articlesWithIssues = 0;
    const articleReports: string[] = [];

    for (const article of articles) {
      console.log(`📄 Analyzing: ${article.title}`);

      if (!article.content || !Array.isArray(article.content)) {
        console.log(`   ⚠️  No content found`);
        continue;
      }

      const issues = detectMarkdownIssues(article.content);

      if (issues.length > 0) {
        articlesWithIssues++;
        totalIssues += issues.length;
        console.log(`   ❌ Found ${issues.length} formatting issues`);

        articleReports.push(`\n### ${article.title}`);
        articleReports.push(`- **Slug:** ${article.slug.current}`);
        articleReports.push(`- **ID:** ${article._id}`);
        articleReports.push(`- **Published:** ${article.publishedDate}`);
        articleReports.push(`- **Issues found:** ${issues.length}\n`);
        articleReports.push('#### Fix Instructions:');
        articleReports.push(generateFixInstructions(issues));
      } else {
        console.log(`   ✅ No formatting issues found`);

        articleReports.push(`\n### ${article.title}`);
        articleReports.push(`- **Slug:** ${article.slug.current}`);
        articleReports.push(`- **Published:** ${article.publishedDate}`);
        articleReports.push(`- ✅ **No formatting issues found**`);
      }
    }

    // Complete the report
    report.push(`- Articles with issues: ${articlesWithIssues}`);
    report.push(`- Total issues found: ${totalIssues}\n`);
    report.push('## Article Details');
    report.push(...articleReports);

    // Add manual fix instructions
    report.push('\n## How to Fix These Issues\n');
    report.push('### Option 1: Manual Fix in Sanity Studio\n');
    report.push('1. Go to https://orangejelly.sanity.studio/');
    report.push('2. Navigate to the affected blog post');
    report.push('3. For each issue:');
    report.push('   - **Markdown headers** (##, ###): Change block style to H2 or H3');
    report.push('   - **Bold text** (\\*\\*text\\*\\*): Select text and use the bold button');
    report.push('   - Remove the markdown syntax characters\n');

    report.push('### Option 2: Get Write Access\n');
    report.push('To run the automated fix script, you need a Sanity token with write permissions:');
    report.push('1. Go to https://www.sanity.io/manage/project/9brdfanc/api');
    report.push('2. Create a new token with "Editor" permissions');
    report.push('3. Update SANITY_API_TOKEN in .env.local');
    report.push('4. Run: `npx tsx scripts/fix-all-blog-formatting.ts`\n');

    report.push('### Option 3: Quick Fix for Specific Article\n');
    report.push('For the article with issues (terrible-online-reviews-damage-control):');
    report.push('1. Open in Sanity Studio');
    report.push('2. Look for text starting with ** and convert to proper formatting');
    report.push('3. Save and publish\n');

    // Save report
    const reportPath = path.join(process.cwd(), 'BLOG_FORMATTING_ANALYSIS.md');
    fs.writeFileSync(reportPath, report.join('\n'), 'utf-8');

    console.log('\n' + '='.repeat(60));
    console.log(`📊 Analysis complete!`);
    console.log(`📄 Report saved to: BLOG_FORMATTING_ANALYSIS.md`);
    console.log(`\n🔧 Found ${totalIssues} issues in ${articlesWithIssues} articles`);
    if (articlesWithIssues > 0) {
      console.log(`\n⚠️  To fix these issues, you need write permissions in Sanity.`);
      console.log(`   See the report for detailed instructions.`);
    }
    console.log('='.repeat(60));
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Run the analysis
analyzeArticles().catch(console.error);
