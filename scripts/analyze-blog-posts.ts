#!/usr/bin/env ts-node
import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import { format } from 'date-fns';

// Load environment variables
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: '9brdfanc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function analyzeBlogPosts() {
  console.log('Fetching all blog posts from Sanity...\n');

  const posts = await client.fetch(`
    *[_type == "blogPost"] | order(publishedDate desc) {
      _id,
      title,
      "slug": slug.current,
      publishedDate,
      status,
      category->{
        name,
        "slug": slug.current
      }
    }
  `);

  console.log(`Found ${posts.length} blog posts\n`);

  // Group posts by status
  const published = posts.filter((p: any) => p.status === 'published');
  const scheduled = posts.filter((p: any) => p.status === 'scheduled');
  const draft = posts.filter((p: any) => p.status === 'draft' || !p.status);

  console.log(`Status breakdown:`);
  console.log(`- Published: ${published.length}`);
  console.log(`- Scheduled: ${scheduled.length}`);
  console.log(`- Draft: ${draft.length}\n`);

  // Analyze publishing pattern
  console.log('Published Posts (chronological order):');
  console.log('=====================================');

  const sortedPosts = [...posts].sort((a: any, b: any) => {
    const dateA = new Date(a.publishedDate || '1900-01-01').getTime();
    const dateB = new Date(b.publishedDate || '1900-01-01').getTime();
    return dateA - dateB;
  });

  sortedPosts.forEach((post: any, index: number) => {
    if (post.publishedDate) {
      const date = new Date(post.publishedDate);
      const formattedDate = format(date, 'yyyy-MM-dd (EEEE)');
      const status = post.status || 'draft';

      console.log(`${index + 1}. ${formattedDate} - ${post.title}`);
      console.log(`   Status: ${status}, Category: ${post.category?.name || 'None'}`);

      // Calculate days between posts
      if (index > 0 && sortedPosts[index - 1].publishedDate) {
        const prevDate = new Date(sortedPosts[index - 1].publishedDate);
        const daysBetween = Math.round(
          (date.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        console.log(`   Days since previous: ${daysBetween}`);
      }
      console.log('');
    }
  });

  // Analyze weekly pattern
  console.log('\nAnalyzing Weekly Pattern:');
  console.log('========================');

  const today = new Date();
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);

  // Find posts that should follow weekly pattern
  const recentPosts = sortedPosts.filter((p: any) => {
    if (!p.publishedDate) return false;
    const date = new Date(p.publishedDate);
    return date >= oneWeekAgo;
  });

  if (recentPosts.length === 0) {
    console.log('No posts published in the last week');

    // Find the most recent post
    const mostRecent = sortedPosts.filter((p: any) => p.publishedDate).pop();
    if (mostRecent) {
      const lastDate = new Date(mostRecent.publishedDate);
      const daysSince = Math.round((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      console.log(`Last post was ${daysSince} days ago: ${mostRecent.title}`);
      console.log(`Published on: ${format(lastDate, 'yyyy-MM-dd (EEEE)')}`);
    }
  }

  // Calculate ideal next publishing dates (weekly)
  console.log('\nSuggested Publishing Schedule:');
  console.log('==============================');

  const lastPublishedPost = sortedPosts
    .filter((p: any) => p.publishedDate && p.status === 'published')
    .pop();
  let nextDate: Date;

  if (lastPublishedPost) {
    nextDate = new Date(lastPublishedPost.publishedDate);
    nextDate.setDate(nextDate.getDate() + 7);
  } else {
    nextDate = new Date(); // Start from today if no published posts
  }

  console.log('Next 5 weekly publishing dates:');
  for (let i = 0; i < 5; i++) {
    const dateStr = format(nextDate, 'yyyy-MM-dd (EEEE)');
    console.log(`${i + 1}. ${dateStr}`);
    nextDate.setDate(nextDate.getDate() + 7);
  }
}

analyzeBlogPosts().catch(console.error);
