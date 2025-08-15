import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { createClient } from '@sanity/client';

// Create a new client with the token
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

// Function to fix markdown bold text
function fixMarkdownBold(text: string): { spans: any[] } {
  const spans: any[] = [];

  // Split by bold markers
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  parts.forEach((part, index) => {
    if (part) {
      if (part.startsWith('**') && part.endsWith('**')) {
        // Bold text
        spans.push({
          _key: `span_fixed_${Date.now()}_${index}`,
          _type: 'span',
          text: part.slice(2, -2),
          marks: ['strong'],
        });
      } else {
        // Regular text
        spans.push({
          _key: `span_fixed_${Date.now()}_${index}`,
          _type: 'span',
          text: part,
          marks: [],
        });
      }
    }
  });

  return { spans };
}

async function fixArticles() {
  console.log('🔧 Attempting to fix blog formatting issues...\n');

  const slugsToFix = [
    'terrible-online-reviews-damage-control',
    'young-people-wont-come-to-your-pub',
  ];

  for (const slug of slugsToFix) {
    console.log(`\n📄 Processing: ${slug}`);

    try {
      // Fetch the article
      const article = await client.fetch(
        `
        *[_type == "blogPost" && slug.current == $slug][0] {
          _id,
          _rev,
          title,
          content
        }
      `,
        { slug }
      );

      if (!article) {
        console.log(`❌ Article not found: ${slug}`);
        continue;
      }

      console.log(`Found: ${article.title}`);

      // Fix the content
      const fixedContent = article.content.map((block: Block) => {
        if (block._type === 'block' && block.children) {
          const fullText = block.children.map((c: any) => c.text || '').join('');

          // Check if text has markdown bold
          if (fullText.includes('**')) {
            const { spans } = fixMarkdownBold(fullText);
            return {
              ...block,
              children: spans,
            };
          }
        }
        return block;
      });

      // Try to update using mutations API
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
        console.log(`✅ Fixed: ${slug}`);
      } else {
        console.log(`❌ Failed to fix: ${slug}`);
        console.log('Error:', response.error?.description);
      }
    } catch (error: any) {
      console.log(`❌ Error processing ${slug}:`, error.message);
    }
  }

  console.log('\n✨ Process complete!');
}

fixArticles().catch(console.error);
