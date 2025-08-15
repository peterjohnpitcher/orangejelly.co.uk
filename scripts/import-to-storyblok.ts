#!/usr/bin/env npx tsx

import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

/**
 * Import content to Storyblok using the Management API
 *
 * Usage: npx tsx scripts/import-to-storyblok.ts --space YOUR_SPACE_ID
 */

// Get space ID from command line arguments
const args = process.argv.slice(2);
const spaceIndex = args.indexOf('--space');
const spaceId = spaceIndex !== -1 ? args[spaceIndex + 1] : null;

if (!spaceId) {
  console.error('❌ Please provide a space ID: --space YOUR_SPACE_ID');
  console.error('Your space ID appears to be: 286490266138783');
  process.exit(1);
}

// Clean up space ID (remove # if present)
const cleanSpaceId = spaceId.replace('#', '');

// Storyblok Management API configuration
const MANAGEMENT_API_TOKEN = 'GkqeSgICQTy1lamlvxO0mgtt';
const API_BASE_URL = 'https://mapi.storyblok.com/v1';

/**
 * Create a folder for blog posts
 */
async function createBlogFolder() {
  console.log('📁 Creating blog folder...');

  try {
    const response = await fetch(`${API_BASE_URL}/spaces/${cleanSpaceId}/stories`, {
      method: 'POST',
      headers: {
        Authorization: MANAGEMENT_API_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        story: {
          name: 'Blog',
          slug: 'blog',
          is_folder: true,
          content: {
            component: 'folder',
          },
        },
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Blog folder created with ID:', data.story.id);
      return data.story.id;
    } else if (response.status === 422) {
      // Folder might already exist
      console.log('ℹ️  Blog folder might already exist, continuing...');

      // Try to get the existing folder
      const getResponse = await fetch(
        `${API_BASE_URL}/spaces/${cleanSpaceId}/stories?starts_with=blog/`,
        {
          headers: {
            Authorization: MANAGEMENT_API_TOKEN,
          },
        }
      );

      if (getResponse.ok) {
        const data = await getResponse.json();
        if (data.stories && data.stories.length > 0) {
          const blogFolder = data.stories.find((s: any) => s.slug === 'blog' && s.is_folder);
          if (blogFolder) {
            console.log('✅ Using existing blog folder with ID:', blogFolder.id);
            return blogFolder.id;
          }
        }
      }
      return 0; // Root folder
    } else {
      const error = await response.text();
      console.error('❌ Failed to create blog folder:', error);
      return 0; // Use root folder as fallback
    }
  } catch (error) {
    console.error('❌ Error creating blog folder:', error);
    return 0;
  }
}

/**
 * Create the blog_article component schema
 */
async function createBlogComponent() {
  console.log('🔧 Creating blog_article component...');

  const componentSchema = {
    component: {
      name: 'blog_article',
      display_name: 'Blog Article',
      schema: {
        title: {
          type: 'text',
          pos: 0,
          required: true,
        },
        excerpt: {
          type: 'textarea',
          pos: 1,
          max_length: 160,
        },
        content: {
          type: 'richtext',
          pos: 2,
          required: true,
        },
        featured_image: {
          type: 'asset',
          pos: 3,
          filetypes: ['images'],
        },
        featured_image_alt: {
          type: 'text',
          pos: 4,
        },
        published_date: {
          type: 'datetime',
          pos: 5,
        },
        status: {
          type: 'option',
          pos: 6,
          options: [
            { name: 'Draft', value: 'draft' },
            { name: 'Published', value: 'published' },
          ],
        },
        category: {
          type: 'option',
          pos: 7,
          options: [
            { name: 'Empty Pubs', value: 'empty-pubs' },
            { name: 'Competition', value: 'competition' },
            { name: 'Marketing', value: 'marketing' },
            { name: 'Operations', value: 'operations' },
            { name: 'Finance', value: 'finance' },
            { name: 'Compliance', value: 'compliance' },
            { name: 'General', value: 'general' },
          ],
        },
        quick_answer: {
          type: 'textarea',
          pos: 8,
          max_length: 75,
        },
        cta_primary: {
          type: 'text',
          pos: 9,
          default_value: 'Get Help Now',
        },
        whatsapp_message: {
          type: 'textarea',
          pos: 10,
          default_value: 'Hi Peter, I read your article and need help with my pub.',
        },
        tags: {
          type: 'options',
          pos: 11,
          options: [
            { name: 'Quick Win', value: 'quick-win' },
            { name: 'Long Term', value: 'long-term' },
            { name: 'Crisis', value: 'crisis' },
            { name: 'Growth', value: 'growth' },
          ],
        },
      },
      is_root: false,
      is_nestable: true,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}/spaces/${cleanSpaceId}/components`, {
      method: 'POST',
      headers: {
        Authorization: MANAGEMENT_API_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(componentSchema),
    });

    if (response.ok) {
      console.log('✅ blog_article component created');
    } else if (response.status === 422) {
      console.log('ℹ️  blog_article component might already exist');
    } else {
      const error = await response.text();
      console.error('⚠️  Failed to create component:', error);
    }
  } catch (error) {
    console.error('⚠️  Error creating component:', error);
  }
}

/**
 * Import blog posts from JSON file
 */
async function importBlogPosts(parentId: number = 0) {
  console.log('\n📚 Importing blog posts...\n');

  // Load the transformed content
  const importPath = path.join(process.cwd(), 'storyblok-migration', 'storyblok-import.json');

  if (!fs.existsSync(importPath)) {
    console.error('❌ Import file not found. Run npm run storyblok:transform first');
    process.exit(1);
  }

  const importData = JSON.parse(fs.readFileSync(importPath, 'utf-8'));
  const stories = importData.stories;

  console.log(`Found ${stories.length} stories to import\n`);

  let successCount = 0;
  let errorCount = 0;

  // Import stories one by one with delay to avoid rate limiting
  for (let i = 0; i < stories.length; i++) {
    const story = stories[i];

    // Add parent_id if we have a blog folder
    if (parentId > 0) {
      story.parent_id = parentId;
    }

    // Adjust the slug to include blog/ prefix
    story.slug = story.slug.replace('blog/', '');

    console.log(`${i + 1}/${stories.length} Importing: ${story.name}`);

    try {
      const response = await fetch(`${API_BASE_URL}/spaces/${cleanSpaceId}/stories`, {
        method: 'POST',
        headers: {
          Authorization: MANAGEMENT_API_TOKEN,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ story }),
      });

      if (response.ok) {
        console.log(`   ✅ Imported successfully`);
        successCount++;
      } else {
        const error = await response.text();
        console.error(`   ❌ Failed to import: ${error.substring(0, 100)}...`);
        errorCount++;

        // If it's a duplicate, consider it a success
        if (error.includes('slug') && error.includes('taken')) {
          console.log(`   ℹ️  Story already exists, skipping`);
          successCount++;
          errorCount--;
        }
      }

      // Delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`   ❌ Error importing story:`, error);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`Import Summary:`);
  console.log(`✅ Successfully imported: ${successCount}/${stories.length}`);
  if (errorCount > 0) {
    console.log(`❌ Failed: ${errorCount}`);
  }
  console.log('='.repeat(60));
}

/**
 * Main import function
 */
async function runImport() {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║     📤 STORYBLOK CONTENT IMPORT                               ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝

Space ID: ${cleanSpaceId}
`);

  // Create component schema
  await createBlogComponent();

  // Create blog folder
  const blogFolderId = await createBlogFolder();

  // Import blog posts
  await importBlogPosts(blogFolderId);

  console.log(`
✨ Import Process Complete!

Next Steps:
1. Go to https://app.storyblok.com/#!/me/spaces/${cleanSpaceId}
2. Verify the blog posts are imported
3. Configure visual editor settings
4. Set up webhooks for revalidation

To activate Storyblok in your Next.js app:
  ./activate-storyblok.sh

Then test locally:
  npm run dev
  Visit http://localhost:3000/licensees-guide
`);
}

// Run the import
runImport().catch((error) => {
  console.error('❌ Import failed:', error);
  process.exit(1);
});
