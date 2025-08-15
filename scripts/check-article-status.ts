#!/usr/bin/env ts-node
import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: '9brdfanc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function checkArticle() {
  console.log('Checking article status in Sanity...\n');
  
  // Check the specific article
  const article = await client.fetch(`
    *[_type == 'blogPost' && slug.current == 'young-people-wont-come-to-your-pub'][0] {
      _id,
      title,
      "slug": slug.current,
      status,
      publishedDate,
      excerpt,
      category->{
        _id,
        name,
        "slug": slug.current
      },
      author->{
        _id,
        name
      },
      featuredImage,
      quickAnswer,
      content[0..2]
    }
  `);
  
  console.log('=== ARTICLE DETAILS ===');
  if (article) {
    console.log(`Title: ${article.title}`);
    console.log(`Slug: ${article.slug}`);
    console.log(`Status: ${article.status}`);
    console.log(`Published Date: ${article.publishedDate}`);
    console.log(`Category: ${article.category?.name || 'NO CATEGORY'}`);
    console.log(`Author: ${article.author?.name || 'NO AUTHOR'}`);
    console.log(`Has Featured Image: ${article.featuredImage ? 'Yes' : 'No'}`);
    console.log(`Has Quick Answer: ${article.quickAnswer ? 'Yes' : 'No'}`);
    console.log(`Has Content: ${article.content && article.content.length > 0 ? 'Yes' : 'No'}`);
    console.log(`Has Excerpt: ${article.excerpt ? 'Yes' : 'No'}`);
  } else {
    console.log('ARTICLE NOT FOUND IN SANITY!');
  }
  
  // Check what the blog listing query would return
  console.log('\n=== CHECKING BLOG LISTING QUERY ===');
  const publishedArticles = await client.fetch(`
    *[_type == "blogPost" && (
      status == "published" || 
      (status == "scheduled" && dateTime(publishedDate) <= dateTime(now()))
    )] | order(publishedDate desc) {
      title,
      "slug": slug.current,
      status,
      publishedDate
    }
  `);
  
  console.log(`Total articles matching publish criteria: ${publishedArticles.length}`);
  
  const found = publishedArticles.find((a: any) => a.slug === 'young-people-wont-come-to-your-pub');
  if (found) {
    console.log('✅ Article APPEARS in published list');
  } else {
    console.log('❌ Article DOES NOT appear in published list');
  }
  
  // Check the exact query used by the blog post page
  console.log('\n=== CHECKING SINGLE POST QUERY ===');
  const singlePost = await client.fetch(`
    *[_type == "blogPost" && slug.current == "young-people-wont-come-to-your-pub" && (
      status == "published" || 
      (status == "scheduled" && dateTime(publishedDate) <= dateTime(now()))
    )][0] {
      _id,
      title
    }
  `);
  
  if (singlePost) {
    console.log('✅ Article FOUND by single post query');
  } else {
    console.log('❌ Article NOT FOUND by single post query');
    console.log('This means either:');
    console.log('1. Status is not "published"');
    console.log('2. Published date is in the future');
    console.log('3. Slug doesn\'t match');
  }
  
  // Check current time comparison
  console.log('\n=== TIME COMPARISON ===');
  console.log(`Current time (Sanity): ${new Date().toISOString()}`);
  if (article?.publishedDate) {
    console.log(`Article published date: ${article.publishedDate}`);
    const pubDate = new Date(article.publishedDate);
    const now = new Date();
    if (pubDate <= now) {
      console.log('✅ Published date is in the past (should be visible)');
    } else {
      console.log('❌ Published date is in the future (won\'t be visible)');
    }
  }
}

checkArticle().catch(console.error);