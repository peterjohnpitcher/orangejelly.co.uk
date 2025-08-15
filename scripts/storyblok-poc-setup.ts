#!/usr/bin/env node

/**
 * Storyblok Proof of Concept Setup Script
 *
 * This script demonstrates how we would set up Storyblok for Orange Jelly
 * and migrate content from Sanity.
 *
 * To run: npx tsx scripts/storyblok-poc-setup.ts
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Content schemas that would be created in Storyblok
const STORYBLOK_SCHEMAS = {
  blog_post: {
    name: 'blog_post',
    display_name: 'Blog Post',
    schema: {
      title: {
        type: 'text',
        required: true,
        pos: 0,
      },
      slug: {
        type: 'text',
        required: true,
        pos: 1,
      },
      excerpt: {
        type: 'textarea',
        max_length: 160,
        pos: 2,
      },
      content: {
        type: 'richtext',
        required: true,
        pos: 3,
        // Rich text is MUCH simpler than Portable Text
        // No complex block structure needed
      },
      featured_image: {
        type: 'asset',
        filetypes: ['images'],
        pos: 4,
      },
      author: {
        type: 'option',
        source: 'internal_stories',
        folder_slug: 'authors/',
        pos: 5,
      },
      category: {
        type: 'option',
        options: [
          { name: 'Marketing', value: 'marketing' },
          { name: 'Operations', value: 'operations' },
          { name: 'Finance', value: 'finance' },
          { name: 'Customer Service', value: 'customer-service' },
        ],
        pos: 6,
      },
      published_date: {
        type: 'datetime',
        pos: 7,
      },
      seo: {
        type: 'section',
        keys: ['meta_title', 'meta_description', 'keywords'],
        pos: 8,
      },
    },
  },

  service: {
    name: 'service',
    display_name: 'Service',
    schema: {
      name: { type: 'text', required: true },
      description: { type: 'richtext' },
      price: { type: 'text' },
      features: { type: 'bloks', restrict_components: true, component_whitelist: ['feature'] },
    },
  },

  case_study: {
    name: 'case_study',
    display_name: 'Case Study',
    schema: {
      title: { type: 'text', required: true },
      client: { type: 'text' },
      challenge: { type: 'richtext' },
      solution: { type: 'richtext' },
      results: { type: 'richtext' },
      metrics: { type: 'bloks', restrict_components: true, component_whitelist: ['metric'] },
    },
  },
};

// Example of how content would be structured in Storyblok
const EXAMPLE_BLOG_POST = {
  name: "Young People Won't Come to Your Pub?",
  slug: 'young-people-wont-come-to-your-pub',
  content: {
    component: 'blog_post',
    title: "Young People Won't Come to Your Pub? Here's How to Change That",
    excerpt:
      "Young people still want what pubs offer - community, experiences, and somewhere that isn't their flat. They just need a reason to choose you over Netflix.",
    content: {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: { level: 2 },
          content: [{ type: 'text', text: 'The Real Problem' }],
        },
        {
          type: 'paragraph',
          content: [
            { type: 'text', text: "Young people aren't avoiding pubs - they're avoiding " },
            { type: 'text', marks: [{ type: 'bold' }], text: 'boring pubs' },
            { type: 'text', text: '.' },
          ],
        },
        // Rich text is much cleaner than Portable Text!
      ],
    },
    featured_image: {
      filename: 'young-people-pub.jpg',
      alt: 'Young people enjoying a pub',
    },
    author: 'peter-pitcher',
    category: 'marketing',
    published_date: '2025-08-11T10:00:00Z',
    seo: {
      meta_title: 'How to Attract Young People to Your Pub | Orange Jelly',
      meta_description: 'Proven strategies to bring young customers back to your pub.',
      keywords: ['young people', 'pub marketing', 'millennials', 'gen z'],
    },
  },
};

// Migration utilities
const migrationUtils = {
  // Convert Sanity Portable Text to Storyblok Rich Text
  portableTextToRichText(portableText: any[]): any {
    const doc = {
      type: 'doc',
      content: [],
    };

    portableText.forEach((block) => {
      if (block._type === 'block') {
        if (block.style === 'h1') {
          doc.content.push({
            type: 'heading',
            attrs: { level: 1 },
            content: [{ type: 'text', text: block.children[0].text }],
          });
        } else if (block.style === 'h2') {
          doc.content.push({
            type: 'heading',
            attrs: { level: 2 },
            content: [{ type: 'text', text: block.children[0].text }],
          });
        } else if (block.listItem === 'bullet') {
          // Handle lists differently in Storyblok
          doc.content.push({
            type: 'bullet_list',
            content: [
              {
                type: 'list_item',
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: block.children[0].text }],
                  },
                ],
              },
            ],
          });
        } else {
          // Normal paragraph
          const paragraph = {
            type: 'paragraph',
            content: block.children.map((child: any) => {
              const text: any = { type: 'text', text: child.text };
              if (child.marks?.includes('strong')) {
                text.marks = [{ type: 'bold' }];
              }
              return text;
            }),
          };
          doc.content.push(paragraph);
        }
      }
    });

    return doc;
  },
};

// Main setup function
async function setupStoryblok() {
  console.log('🚀 Storyblok Proof of Concept Setup\n');
  console.log('This demonstrates how we would migrate from Sanity to Storyblok.\n');

  console.log('Step 1: Install Storyblok CLI');
  console.log('----------------------------------------');
  console.log('npm install -g storyblok@latest');
  console.log('');

  console.log('Step 2: Create Storyblok Account & Space');
  console.log('----------------------------------------');
  console.log('storyblok signup');
  console.log('storyblok login');
  console.log('storyblok spaces create --name "orangejelly"');
  console.log('');

  console.log('Step 3: Define Content Schemas');
  console.log('----------------------------------------');
  console.log('Creating the following schemas:');
  Object.entries(STORYBLOK_SCHEMAS).forEach(([key, schema]) => {
    console.log(`  - ${schema.display_name} (${key})`);
  });
  console.log('');

  console.log('Step 4: Example Content Structure');
  console.log('----------------------------------------');
  console.log('Example blog post in Storyblok format:');
  console.log(JSON.stringify(EXAMPLE_BLOG_POST, null, 2));
  console.log('');

  console.log('Step 5: Frontend Integration');
  console.log('----------------------------------------');
  console.log('Install packages:');
  console.log('npm install @storyblok/js @storyblok/react');
  console.log('');

  // Create example integration file
  const integrationCode = `
// lib/storyblok.ts
import { storyblokInit, apiPlugin } from "@storyblok/js";
import BlogPost from "@/components/storyblok/BlogPost";
import Service from "@/components/storyblok/Service";
import CaseStudy from "@/components/storyblok/CaseStudy";

export const { storyblokApi } = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  components: {
    blog_post: BlogPost,
    service: Service,
    case_study: CaseStudy,
  },
  apiOptions: {
    region: "eu", // or "us"
    cache: {
      type: "memory",
    },
  },
});

// Fetch all blog posts
export async function getBlogPosts() {
  const { data } = await storyblokApi.get('cdn/stories', {
    starts_with: 'blog/',
    version: 'published',
    sort_by: 'published_at:desc',
  });
  
  return data.stories;
}

// Fetch single blog post
export async function getBlogPost(slug: string) {
  const { data } = await storyblokApi.get(\`cdn/stories/blog/\${slug}\`, {
    version: 'published',
  });
  
  return data.story;
}
`;

  console.log('Example integration code:');
  console.log(integrationCode);
  console.log('');

  console.log('Step 6: Key Advantages Over Sanity');
  console.log('----------------------------------------');
  console.log('✅ Visual Editor - See changes in real-time');
  console.log('✅ No Schema Errors - Visual schema builder');
  console.log('✅ Simple Rich Text - No complex Portable Text');
  console.log('✅ Built-in Scheduling - No paid plan needed');
  console.log('✅ Better CLI - More reliable automation');
  console.log('✅ Cleaner API - RESTful, predictable');
  console.log('');

  console.log('Step 7: Migration Timeline');
  console.log('----------------------------------------');
  console.log('Day 1: Setup Storyblok, create schemas');
  console.log('Day 2-3: Export Sanity content, transform to Storyblok format');
  console.log('Day 4: Import content via CLI');
  console.log('Day 5: Update Next.js integration');
  console.log('Day 6-7: Testing and go-live');
  console.log('');

  // Save migration plan
  const migrationPlan = {
    rationale: 'Migrate from Sanity to Storyblok due to schema fragility issues',
    advantages: [
      'Visual editor for non-technical users',
      'More stable schema system',
      'Built-in scheduled publishing',
      'Better error messages',
      'Simpler rich text handling',
    ],
    timeline: '1 week',
    effort: 'Medium',
    risk: 'Low',
    schemas: STORYBLOK_SCHEMAS,
    example_content: EXAMPLE_BLOG_POST,
  };

  const planPath = path.join(process.cwd(), 'STORYBLOK_MIGRATION_PLAN.json');
  fs.writeFileSync(planPath, JSON.stringify(migrationPlan, null, 2));
  console.log(`📄 Migration plan saved to: ${planPath}`);
  console.log('');

  console.log('✅ Proof of Concept Complete!');
  console.log('');
  console.log('Next Steps:');
  console.log('1. Review the migration plan');
  console.log('2. Create a Storyblok account (free tier available)');
  console.log('3. Run the migration scripts');
  console.log('4. Test the new setup');
  console.log('');
  console.log('Would you like me to proceed with the actual migration?');
}

// Run the setup
setupStoryblok().catch(console.error);
