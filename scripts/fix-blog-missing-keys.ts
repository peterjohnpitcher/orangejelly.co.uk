#!/usr/bin/env ts-node
import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: '9brdfanc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function fixMissingKeys() {
  console.log('Fetching blog posts with potential missing keys...\n');

  // Get ALL blog posts to check for missing keys
  const posts = await client.fetch(`
    *[_type == "blogPost"] {
      _id,
      title,
      quickStats,
      faqs,
      content
    }
  `);

  console.log(`Found ${posts.length} recent blog posts to check\n`);

  for (const post of posts) {
    console.log(`Checking: ${post.title}`);
    let needsUpdate = false;
    const updates: any = {};

    // Fix quickStats keys
    if (post.quickStats && Array.isArray(post.quickStats)) {
      const hasKeys = post.quickStats.every((stat: any) => stat._key);
      if (!hasKeys) {
        console.log('  - Fixing quickStats keys');
        updates.quickStats = post.quickStats.map((stat: any, index: number) => ({
          ...stat,
          _key: stat._key || `stat_${Date.now()}_${index}`,
        }));
        needsUpdate = true;
      }
    }

    // Fix FAQs keys
    if (post.faqs && Array.isArray(post.faqs)) {
      const hasKeys = post.faqs.every((faq: any) => faq._key);
      if (!hasKeys) {
        console.log('  - Fixing FAQs keys');
        updates.faqs = post.faqs.map((faq: any, index: number) => ({
          ...faq,
          _key: faq._key || `faq_${Date.now()}_${index}`,
        }));
        needsUpdate = true;
      }
    }

    // Fix content blocks keys
    if (post.content && Array.isArray(post.content)) {
      const needsContentFix = post.content.some((block: any) => {
        if (!block._key) return true;
        // Check for list items without keys
        if (block.listItem && block.children) {
          return block.children.some((child: any) => !child._key);
        }
        // Check for marks without keys
        if (block.markDefs && Array.isArray(block.markDefs)) {
          return block.markDefs.some((mark: any) => !mark._key);
        }
        return false;
      });

      if (needsContentFix) {
        console.log('  - Fixing content block keys');
        updates.content = post.content.map((block: any, blockIndex: number) => {
          const updatedBlock = {
            ...block,
            _key: block._key || `block_${Date.now()}_${blockIndex}`,
          };

          // Fix children keys
          if (updatedBlock.children && Array.isArray(updatedBlock.children)) {
            updatedBlock.children = updatedBlock.children.map((child: any, childIndex: number) => ({
              ...child,
              _key: child._key || `span_${Date.now()}_${blockIndex}_${childIndex}`,
            }));
          }

          // Fix markDefs keys
          if (updatedBlock.markDefs && Array.isArray(updatedBlock.markDefs)) {
            updatedBlock.markDefs = updatedBlock.markDefs.map((mark: any, markIndex: number) => ({
              ...mark,
              _key: mark._key || `mark_${Date.now()}_${blockIndex}_${markIndex}`,
            }));
          }

          return updatedBlock;
        });
        needsUpdate = true;
      }
    }

    // Apply updates if needed
    if (needsUpdate) {
      try {
        await client.patch(post._id).set(updates).commit();
        console.log(`  ✅ Fixed keys for: ${post.title}`);
      } catch (error) {
        console.error(`  ❌ Failed to fix keys for ${post.title}:`, error);
      }
    } else {
      console.log(`  ✓ No fixes needed`);
    }
  }

  console.log('\n✅ Key fixing complete!');
}

fixMissingKeys().catch(console.error);
