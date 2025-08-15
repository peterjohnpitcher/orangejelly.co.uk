import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

const client = createClient({
  projectId: '9brdfanc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function exportBlogPosts() {
  console.log('📚 Exporting blog posts from Sanity...\n');

  try {
    // Fetch all blog posts with complete data
    const blogPosts = await client.fetch(`
      *[_type == "blogPost"] | order(publishedDate desc) {
        _id,
        _createdAt,
        _updatedAt,
        title,
        slug,
        status,
        excerpt,
        content,
        featuredImage {
          asset-> {
            _id,
            url,
            metadata {
              dimensions
            }
          },
          alt,
          caption
        },
        publishedDate,
        updatedDate,
        
        // Voice Search & AI
        quickAnswer,
        voiceSearchQueries,
        quickStats,
        
        // SEO
        seo {
          metaTitle,
          metaDescription,
          keywords
        },
        
        // CTA
        ctaSettings {
          primaryCTA,
          whatsappMessage,
          urgency
        },
        
        // Organization
        category-> {
          _id,
          title,
          slug
        },
        tags,
        
        // FAQs
        faqs,
        
        // Author
        author-> {
          _id,
          name,
          image,
          bio
        },
        
        // Local SEO
        localSEO {
          targetLocation,
          nearbyLandmarks,
          localModifiers
        }
      }
    `);

    console.log(`✅ Found ${blogPosts.length} blog posts\n`);

    // Display summary
    console.log('📊 Blog Posts Summary:');
    console.log('------------------------');
    blogPosts.forEach((post, index) => {
      const status = post.status || 'draft';
      const category = post.category?.title || 'Uncategorized';
      console.log(`${index + 1}. ${post.title}`);
      console.log(`   Slug: ${post.slug.current}`);
      console.log(`   Status: ${status}`);
      console.log(`   Category: ${category}`);
      console.log(`   Published: ${post.publishedDate || 'Not set'}`);
      console.log('');
    });

    // Create export directory
    const exportDir = path.join(process.cwd(), 'storyblok-migration');
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
    }

    // Save raw Sanity export
    const sanityExportPath = path.join(exportDir, 'sanity-blogs-export.json');
    fs.writeFileSync(sanityExportPath, JSON.stringify(blogPosts, null, 2), 'utf-8');

    console.log('💾 Export saved to:', sanityExportPath);

    // Create summary report
    const summary = {
      exportDate: new Date().toISOString(),
      totalPosts: blogPosts.length,
      categories: [...new Set(blogPosts.map((p) => p.category?.title || 'Uncategorized'))],
      statuses: {
        published: blogPosts.filter((p) => p.status === 'published').length,
        draft: blogPosts.filter((p) => p.status === 'draft').length,
        scheduled: blogPosts.filter((p) => p.status === 'scheduled').length,
      },
      hasImages: blogPosts.filter((p) => p.featuredImage?.asset).length,
      hasFAQs: blogPosts.filter((p) => p.faqs && p.faqs.length > 0).length,
      hasQuickAnswer: blogPosts.filter((p) => p.quickAnswer).length,
    };

    const summaryPath = path.join(exportDir, 'export-summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), 'utf-8');

    console.log('\n📋 Export Summary:');
    console.log(`   Total posts: ${summary.totalPosts}`);
    console.log(`   Published: ${summary.statuses.published}`);
    console.log(`   Draft: ${summary.statuses.draft}`);
    console.log(`   With images: ${summary.hasImages}`);
    console.log(`   With FAQs: ${summary.hasFAQs}`);
    console.log(`   With Quick Answer: ${summary.hasQuickAnswer}`);

    return blogPosts;
  } catch (error) {
    console.error('❌ Export failed:', error);
    process.exit(1);
  }
}

// Run export
exportBlogPosts()
  .then(() => {
    console.log('\n✅ Export completed successfully!');
    console.log('📁 Check storyblok-migration/ folder for exported data');
  })
  .catch(console.error);
