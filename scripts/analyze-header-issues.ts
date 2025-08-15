import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '9brdfanc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

interface Block {
  _key: string;
  _type: 'block';
  children: any[];
  style: string;
  listItem?: string;
}

async function analyzeHeaderIssues() {
  console.log('🔍 Analyzing articles for incorrect header usage...\n');

  try {
    // Fetch all articles from August 11th onwards
    const articles = await client.fetch(`
      *[_type == "blogPost" && publishedDate >= "2025-08-11"] | order(publishedDate desc) {
        _id,
        title,
        slug,
        publishedDate,
        content
      }
    `);

    console.log(`Found ${articles.length} articles from August 11th onwards\n`);

    for (const article of articles) {
      console.log(`\n📄 ${article.title}`);
      console.log(`   Slug: ${article.slug.current}`);

      if (!article.content || !Array.isArray(article.content)) {
        console.log(`   ⚠️  No content found`);
        continue;
      }

      const headerCount = { h1: 0, h2: 0, h3: 0, h4: 0, normal: 0 };
      const suspiciousHeaders: any[] = [];

      article.content.forEach((block: Block, index: number) => {
        if (block._type === 'block') {
          if (block.style) {
            headerCount[block.style as keyof typeof headerCount] =
              (headerCount[block.style as keyof typeof headerCount] || 0) + 1;
          } else {
            headerCount.normal++;
          }

          // Check for suspicious headers (body text that shouldn't be headers)
          if (block.style && block.style.startsWith('h') && block.children) {
            const text = block.children.map((c: any) => c.text || '').join('');

            // Headers that are suspiciously long or look like body text
            if (
              text.length > 100 ||
              text.includes('. ') ||
              (text.includes(', ') && text.length > 60) ||
              text.startsWith('"') ||
              text.match(/^(Use |This |That |These |Those |We |You |They |It |The [a-z])/)
            ) {
              suspiciousHeaders.push({
                index,
                style: block.style,
                text: text.substring(0, 80) + (text.length > 80 ? '...' : ''),
                length: text.length,
              });
            }
          }
        }
      });

      console.log(`   Content blocks: ${article.content.length}`);
      console.log(
        `   Styles: h1(${headerCount.h1}), h2(${headerCount.h2}), h3(${headerCount.h3}), h4(${headerCount.h4}), normal(${headerCount.normal})`
      );

      if (suspiciousHeaders.length > 0) {
        console.log(`   ❌ Found ${suspiciousHeaders.length} suspicious headers:`);
        suspiciousHeaders.forEach((sh) => {
          console.log(`      Block ${sh.index} [${sh.style}]: "${sh.text}" (${sh.length} chars)`);
        });
      } else if (headerCount.h2 > 15 || headerCount.h3 > 20) {
        console.log(`   ⚠️  Unusually high header count - may have formatting issues`);
      } else {
        console.log(`   ✅ Header distribution looks normal`);
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('Analysis complete!');
    console.log('='.repeat(60));
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

analyzeHeaderIssues().catch(console.error);
