import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9brdfanc',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedDate: string;
  content: any[];
}

async function analyzeBlogHeadings() {
  console.log('🔍 Analyzing blog articles from August 11th, 2025 onwards...\n');

  try {
    // Query for blog posts from August 11th, 2025 onwards
    const query = `*[_type == "blogPost" && publishedDate >= "2025-08-11T00:00:00Z"] | order(publishedDate desc) {
      _id,
      title,
      slug,
      publishedDate,
      content
    }`;

    const posts = await client.fetch<BlogPost[]>(query);

    if (posts.length === 0) {
      console.log('No blog posts found from August 11th, 2025 onwards.');
      return;
    }

    console.log(`Found ${posts.length} blog posts from August 11th, 2025 onwards.\n`);

    const issues: any[] = [];

    for (const post of posts) {
      const postIssues: any[] = [];
      const headings: string[] = [];

      if (!post.content || !Array.isArray(post.content)) {
        postIssues.push('No content array found');
        issues.push({
          post: post.title,
          slug: post.slug?.current,
          date: post.publishedDate,
          issues: postIssues,
        });
        continue;
      }

      // Analyze content blocks
      post.content.forEach((block, index) => {
        if (block._type === 'block') {
          const style = block.style || 'normal';

          // Check for heading styles
          if (style.startsWith('h')) {
            const text = block.children?.map((child: any) => child.text).join('') || '';
            headings.push(`${style}: ${text}`);

            // Check for common heading issues
            if (style === 'h1') {
              postIssues.push(
                `H1 found at block ${index}: "${text}" - Should use H2 for article sections`
              );
            }

            // Check for improper capitalization
            if (text && !text.match(/^[A-Z0-9]/) && !text.startsWith('"')) {
              postIssues.push(`Lowercase heading at block ${index} (${style}): "${text}"`);
            }

            // Check for missing text
            if (!text || text.trim() === '') {
              postIssues.push(`Empty heading at block ${index} (${style})`);
            }
          }

          // Check for blocks that might be intended as headings but aren't marked as such
          if (style === 'normal' && block.children?.length === 1) {
            const text = block.children[0].text || '';
            // Common heading patterns
            if (text.match(/^(Step \d+:|Section \d+:|Part \d+:|Chapter \d+:|\d+\.|The .+:)/)) {
              postIssues.push(`Possible heading as normal text at block ${index}: "${text}"`);
            }
            // All caps text that might be a heading
            if (text === text.toUpperCase() && text.length > 3 && text.match(/[A-Z]/)) {
              postIssues.push(`All-caps text that might be a heading at block ${index}: "${text}"`);
            }
          }
        }
      });

      // Check heading hierarchy
      let lastHeadingLevel = 0;
      let skippedLevel = false;

      headings.forEach((heading, index) => {
        const level = parseInt(heading.charAt(1));
        if (lastHeadingLevel > 0 && level > lastHeadingLevel + 1) {
          skippedLevel = true;
          postIssues.push(
            `Skipped heading level: ${heading} (jumped from H${lastHeadingLevel} to H${level})`
          );
        }
        lastHeadingLevel = level;
      });

      // Check if article has no headings at all
      if (headings.length === 0) {
        postIssues.push('No headings found in article - content structure may be missing');
      }

      // Check if article has too few headings for its content length
      if (post.content.length > 10 && headings.length < 3) {
        postIssues.push(
          `Only ${headings.length} headings for ${post.content.length} content blocks - may need more structure`
        );
      }

      if (postIssues.length > 0) {
        issues.push({
          post: post.title,
          slug: post.slug?.current,
          date: post.publishedDate,
          headings: headings,
          issues: postIssues,
        });
      }
    }

    // Report findings
    console.log('='.repeat(80));
    console.log('BLOG HEADING ANALYSIS REPORT');
    console.log('='.repeat(80));
    console.log(`\nAnalyzed: ${posts.length} posts from August 11th, 2025 onwards`);
    console.log(`Issues found: ${issues.length} posts with heading problems\n`);

    if (issues.length === 0) {
      console.log('✅ All blog posts have properly structured headings!');
    } else {
      console.log('Posts with heading issues:\n');

      issues.forEach((issue, index) => {
        console.log(`${index + 1}. ${issue.post}`);
        console.log(`   Slug: ${issue.slug}`);
        console.log(`   Date: ${new Date(issue.date).toLocaleDateString()}`);
        console.log(`   Headings found:`);
        if (issue.headings && issue.headings.length > 0) {
          issue.headings.forEach((h: string) => console.log(`     - ${h}`));
        } else {
          console.log(`     - None`);
        }
        console.log(`   Issues:`);
        issue.issues.forEach((i: string) => console.log(`     ⚠️  ${i}`));
        console.log('');
      });

      // Summary
      console.log('='.repeat(80));
      console.log('SUMMARY OF COMMON ISSUES:');
      console.log('='.repeat(80));

      const allIssues = issues.flatMap((i) => i.issues);
      const h1Count = allIssues.filter((i: string) => i.includes('H1 found')).length;
      const lowercaseCount = allIssues.filter((i: string) =>
        i.includes('Lowercase heading')
      ).length;
      const emptyCount = allIssues.filter((i: string) => i.includes('Empty heading')).length;
      const possibleCount = allIssues.filter((i: string) => i.includes('Possible heading')).length;
      const skippedCount = allIssues.filter((i: string) =>
        i.includes('Skipped heading level')
      ).length;
      const noHeadingsCount = allIssues.filter((i: string) =>
        i.includes('No headings found')
      ).length;

      if (h1Count > 0) console.log(`- H1 headings in articles: ${h1Count} (should be H2)`);
      if (lowercaseCount > 0) console.log(`- Lowercase headings: ${lowercaseCount}`);
      if (emptyCount > 0) console.log(`- Empty headings: ${emptyCount}`);
      if (possibleCount > 0) console.log(`- Text that might be headings: ${possibleCount}`);
      if (skippedCount > 0) console.log(`- Skipped heading levels: ${skippedCount}`);
      if (noHeadingsCount > 0) console.log(`- Articles with no headings: ${noHeadingsCount}`);
    }
  } catch (error) {
    console.error('Error analyzing blog headings:', error);
  }
}

// Run the analysis
analyzeBlogHeadings();
