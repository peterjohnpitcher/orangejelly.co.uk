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

// Determine if a header should remain a header or be converted to normal text
function shouldRemainHeader(text: string, style: string): boolean {
  // Keep as header if it's short and looks like a title
  const isShortTitle = text.length < 60 && !text.includes('. ') && !text.includes(': ');

  // Keep h2 headers (main sections) - they're usually legitimate
  if (style === 'h2') {
    return true;
  }

  // For h3, check if it's actually a subheading or body text
  if (style === 'h3') {
    // These patterns indicate body text, not headers
    const bodyTextPatterns = [
      /^(Minute|Hour|Week|Day|Month|Year|Step|Phase) \d+[-:]/, // Time-based instructions
      /\n/, // Contains line breaks
      /:$/, // Ends with colon followed by content
      /^(Use |This |That |These |Those |We |You |They |It |The [a-z])/, // Starts with pronouns/articles
      /^"/, // Starts with quote
      /[.!?]$/, // Ends with punctuation
      /^\d+\./, // Starts with number and period (list item)
      /^[-•]/, // Starts with bullet
    ];

    // Check if it matches body text patterns
    for (const pattern of bodyTextPatterns) {
      if (pattern.test(text)) {
        return false; // Convert to normal paragraph
      }
    }

    // Check if it's too long to be a header
    if (text.length > 100) {
      return false; // Convert to normal paragraph
    }

    // Check if it contains multiple sentences
    if ((text.match(/[.!?]/g) || []).length > 1) {
      return false; // Convert to normal paragraph
    }

    // Keep short, title-like h3s
    return isShortTitle;
  }

  return true; // Keep other header styles
}

async function fixHeaders() {
  console.log('🔧 Fixing incorrect header usage in articles...\n');

  try {
    // Fetch all articles from August 11th onwards
    const articles = await client.fetch(`
      *[_type == "blogPost" && publishedDate >= "2025-08-11"] | order(publishedDate desc) {
        _id,
        _rev,
        title,
        slug,
        content
      }
    `);

    console.log(`Found ${articles.length} articles to process\n`);

    let totalFixed = 0;

    for (const article of articles) {
      console.log(`\n📄 Processing: ${article.title}`);

      if (!article.content || !Array.isArray(article.content)) {
        console.log(`   ⚠️  No content found`);
        continue;
      }

      let fixedCount = 0;
      const fixedContent = article.content.map((block: Block) => {
        if (block._type === 'block' && block.style && block.style.startsWith('h')) {
          const text = block.children?.map((c: any) => c.text || '').join('') || '';

          if (!shouldRemainHeader(text, block.style)) {
            fixedCount++;
            // Convert to normal paragraph
            return {
              ...block,
              style: 'normal',
            };
          }
        }
        return block;
      });

      if (fixedCount > 0) {
        console.log(`   🔧 Converting ${fixedCount} incorrectly styled headers to paragraphs...`);

        // Update the article using mutations API
        const mutations = [
          {
            patch: {
              id: article._id,
              set: {
                content: fixedContent,
              },
            },
          },
        ];

        const result = await fetch(
          `https://${client.config().projectId}.api.sanity.io/v${client.config().apiVersion}/data/mutate/${client.config().dataset}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
            },
            body: JSON.stringify({ mutations }),
          }
        );

        const response = await result.json();

        if (result.ok) {
          console.log(`   ✅ Fixed ${fixedCount} blocks`);
          totalFixed += fixedCount;
        } else {
          console.log(`   ❌ Failed to update: ${response.error?.description}`);
        }
      } else {
        console.log(`   ✅ No fixes needed`);
      }

      // Small delay to avoid overwhelming the API
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    console.log('\n' + '='.repeat(60));
    console.log(`🎉 Formatting fix complete!`);
    console.log(`📊 Fixed ${totalFixed} incorrectly styled headers across all articles`);
    console.log('='.repeat(60));
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

fixHeaders().catch(console.error);
