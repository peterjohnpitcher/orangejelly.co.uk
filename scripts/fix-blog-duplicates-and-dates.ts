#!/usr/bin/env ts-node
import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import { format, addDays, startOfWeek, nextMonday } from 'date-fns';

// Load environment variables
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: '9brdfanc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function fixBlogDuplicatesAndDates() {
  console.log('Fetching all blog posts from Sanity...\n');

  const posts = await client.fetch(`
    *[_type == "blogPost"] | order(publishedDate asc) {
      _id,
      title,
      "slug": slug.current,
      publishedDate,
      status,
      category->{
        _id,
        name,
        "slug": slug.current
      }
    }
  `);

  console.log(`Found ${posts.length} blog posts\n`);

  // Find duplicates by title
  const titleMap = new Map<string, any[]>();
  posts.forEach((post: any) => {
    if (!titleMap.has(post.title)) {
      titleMap.set(post.title, []);
    }
    titleMap.get(post.title)!.push(post);
  });

  // Delete duplicates (keep the one with category)
  const toDelete: string[] = [];
  titleMap.forEach((duplicates, title) => {
    if (duplicates.length > 1) {
      console.log(`Found ${duplicates.length} duplicates of: ${title}`);

      // Keep the one with a category, or the first one if none have categories
      const withCategory = duplicates.filter((p: any) => p.category);
      const toKeep = withCategory.length > 0 ? withCategory[0] : duplicates[0];

      duplicates.forEach((post: any) => {
        if (post._id !== toKeep._id) {
          console.log(`  - Will delete duplicate: ${post._id}`);
          toDelete.push(post._id);
        }
      });
    }
  });

  // Delete duplicates
  if (toDelete.length > 0) {
    console.log(`\nDeleting ${toDelete.length} duplicate posts...`);
    for (const id of toDelete) {
      await client.delete(id);
      console.log(`  - Deleted: ${id}`);
    }
  }

  // Get remaining posts
  const remainingPosts = await client.fetch(`
    *[_type == "blogPost"] | order(publishedDate asc) {
      _id,
      title,
      "slug": slug.current,
      publishedDate,
      status
    }
  `);

  console.log(`\nChecking dates for ${remainingPosts.length} posts...\n`);

  // Fix dates to ensure weekly pattern (Mondays)
  const updates: Array<{ id: string; date: string; title: string }> = [];
  let expectedDate = new Date('2025-02-10'); // First Monday in the series

  remainingPosts.forEach((post: any, index: number) => {
    if (post.publishedDate && post.status === 'published') {
      const currentDate = new Date(post.publishedDate);
      const expectedDateStr = format(expectedDate, 'yyyy-MM-dd');
      const currentDateStr = format(currentDate, 'yyyy-MM-dd');

      if (currentDateStr !== expectedDateStr) {
        console.log(`Post "${post.title}"`);
        console.log(`  Current date: ${currentDateStr}`);
        console.log(`  Should be: ${expectedDateStr}`);
        updates.push({
          id: post._id,
          date: expectedDate.toISOString(),
          title: post.title,
        });
      }

      // Move to next Monday
      expectedDate = addDays(expectedDate, 7);
    }
  });

  // Apply date fixes
  if (updates.length > 0) {
    console.log(`\nFixing dates for ${updates.length} posts...`);
    for (const update of updates) {
      await client.patch(update.id).set({ publishedDate: update.date }).commit();
      console.log(`  - Fixed date for: ${update.title}`);
    }
  } else {
    console.log('\nAll posts already follow the weekly Monday pattern!');
  }

  console.log('\n✅ Blog posts cleanup and date fixing complete!');
}

fixBlogDuplicatesAndDates().catch(console.error);
