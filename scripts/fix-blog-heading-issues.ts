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

// Define the fixes we need to make
const articleFixes = {
  'kitchen-nightmares-chef-quits': {
    blockIndex: 66,
    newStyle: 'h3',
    title: 'Success Stories from Real Pubs',
  },
  'food-allergies-gdpr-compliance': {
    blockIndex: 87,
    newStyle: 'h3',
    title: 'The Critical Choice',
  },
  'terrible-online-reviews-damage-control': [
    {
      blockIndex: 22,
      newStyle: 'h3',
      title: 'The Magic Number: 4.3',
    },
    {
      blockIndex: 42,
      newStyle: 'h3',
      title: 'The Recovery Formula',
    },
    {
      blockIndex: 75,
      newStyle: 'h3',
      title: 'Expected Rating Improvement',
    },
  ],
};

async function fixBlogHeadings() {
  console.log('🔧 Fixing blog heading issues...\n');

  try {
    // Get the specific articles that need fixing
    const slugsToFix = Object.keys(articleFixes);

    for (const slug of slugsToFix) {
      console.log(`\nProcessing: ${slug}`);

      // Fetch the article
      const query = `*[_type == "blogPost" && slug.current == "${slug}"][0] {
        _id,
        title,
        slug,
        content
      }`;

      const post = await client.fetch<BlogPost>(query);

      if (!post) {
        console.log(`❌ Article not found: ${slug}`);
        continue;
      }

      console.log(`Found article: ${post.title}`);

      // Get the fixes for this article
      const fixes = articleFixes[slug as keyof typeof articleFixes];
      const fixArray = Array.isArray(fixes) ? fixes : [fixes];

      let contentModified = false;
      const updatedContent = [...post.content];

      // Apply each fix
      for (const fix of fixArray) {
        const blockToFix = updatedContent[fix.blockIndex];

        if (!blockToFix) {
          console.log(`⚠️  Block ${fix.blockIndex} not found`);
          continue;
        }

        // Check if this is a normal text block that should be a heading
        if (blockToFix._type === 'block' && blockToFix.style === 'normal') {
          // Create a new heading block with the suggested title
          const existingText = blockToFix.children?.map((child: any) => child.text).join('') || '';

          console.log(`  Converting block ${fix.blockIndex}:`);
          console.log(`    From: "${existingText.substring(0, 50)}..."`);
          console.log(`    To: ${fix.newStyle} heading "${fix.title}"`);

          // Split the content: create heading and keep the rest as normal text
          const headingBlock = {
            _type: 'block',
            _key: `block_${Date.now()}_${fix.blockIndex}_heading`,
            style: fix.newStyle,
            children: [
              {
                _type: 'span',
                _key: `span_${Date.now()}_${fix.blockIndex}_heading`,
                text: fix.title,
                marks: [],
              },
            ],
            markDefs: [],
          };

          // Keep the original content as a separate block
          const contentBlock = {
            ...blockToFix,
            _key: `block_${Date.now()}_${fix.blockIndex}_content`,
          };

          // Replace the original block with heading + content
          updatedContent.splice(fix.blockIndex, 1, headingBlock, contentBlock);
          contentModified = true;
        } else if (blockToFix._type === 'block' && blockToFix.style !== 'normal') {
          console.log(
            `  Block ${fix.blockIndex} is already a heading (${blockToFix.style}), skipping`
          );
        }
      }

      // Update the document if we made changes
      if (contentModified) {
        console.log(`\n📝 Updating article: ${post.title}`);

        await client.patch(post._id).set({ content: updatedContent }).commit();

        console.log(`✅ Successfully updated: ${post.title}`);
      } else {
        console.log(`ℹ️  No changes needed for: ${post.title}`);
      }
    }

    console.log('\n' + '='.repeat(80));
    console.log('HEADING FIX COMPLETE');
    console.log('='.repeat(80));
    console.log('\nAll heading issues have been addressed.');
    console.log('Please review the articles in Sanity Studio to confirm the changes.');
  } catch (error) {
    console.error('Error fixing blog headings:', error);
  }
}

// Run the fix
fixBlogHeadings();
