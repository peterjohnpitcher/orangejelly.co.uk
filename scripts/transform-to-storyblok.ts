import fs from 'fs';
import path from 'path';

// Types for Sanity and Storyblok structures
interface SanityBlock {
  _type: string;
  _key?: string;
  style?: string;
  children?: Array<{
    _type: string;
    text?: string;
    marks?: string[];
  }>;
  listItem?: string;
  level?: number;
}

interface StoryblokRichTextNode {
  type: string;
  content?: StoryblokRichTextNode[];
  text?: string;
  marks?: Array<{ type: string }>;
  attrs?: any;
}

/**
 * Convert Sanity Portable Text to Storyblok Rich Text format
 * This is MUCH simpler than Portable Text!
 */
function convertPortableTextToRichText(portableText: SanityBlock[]): any {
  const doc: StoryblokRichTextNode = {
    type: 'doc',
    content: [],
  };

  if (!portableText || !Array.isArray(portableText)) {
    return doc;
  }

  let currentList: StoryblokRichTextNode | null = null;
  let currentListType: string | null = null;

  portableText.forEach((block) => {
    if (block._type === 'block') {
      // Handle list items
      if (block.listItem) {
        const listType = block.listItem === 'bullet' ? 'bullet_list' : 'ordered_list';

        // Create new list if needed
        if (!currentList || currentListType !== listType) {
          currentList = {
            type: listType,
            content: [],
          };
          currentListType = listType;
          doc.content!.push(currentList);
        }

        // Add list item
        const listItem: StoryblokRichTextNode = {
          type: 'list_item',
          content: [
            {
              type: 'paragraph',
              content: convertInlineContent(block.children || []),
            },
          ],
        };
        currentList.content!.push(listItem);
      } else {
        // Reset list tracking
        currentList = null;
        currentListType = null;

        // Handle headings
        if (block.style === 'h1') {
          doc.content!.push({
            type: 'heading',
            attrs: { level: 1 },
            content: convertInlineContent(block.children || []),
          });
        } else if (block.style === 'h2') {
          doc.content!.push({
            type: 'heading',
            attrs: { level: 2 },
            content: convertInlineContent(block.children || []),
          });
        } else if (block.style === 'h3') {
          doc.content!.push({
            type: 'heading',
            attrs: { level: 3 },
            content: convertInlineContent(block.children || []),
          });
        } else if (block.style === 'h4') {
          doc.content!.push({
            type: 'heading',
            attrs: { level: 4 },
            content: convertInlineContent(block.children || []),
          });
        } else if (block.style === 'blockquote') {
          doc.content!.push({
            type: 'blockquote',
            content: [
              {
                type: 'paragraph',
                content: convertInlineContent(block.children || []),
              },
            ],
          });
        } else {
          // Normal paragraph
          const content = convertInlineContent(block.children || []);
          if (content.length > 0) {
            doc.content!.push({
              type: 'paragraph',
              content,
            });
          }
        }
      }
    }
  });

  return doc;
}

/**
 * Convert inline content (text with marks)
 */
function convertInlineContent(children: any[]): StoryblokRichTextNode[] {
  const content: StoryblokRichTextNode[] = [];

  children.forEach((child) => {
    if (child._type === 'span' && child.text) {
      const node: StoryblokRichTextNode = {
        type: 'text',
        text: child.text,
      };

      // Convert marks
      if (child.marks && child.marks.length > 0) {
        node.marks = child.marks.map((mark: string) => {
          switch (mark) {
            case 'strong':
              return { type: 'bold' };
            case 'em':
              return { type: 'italic' };
            case 'code':
              return { type: 'code' };
            case 'underline':
              return { type: 'underline' };
            default:
              return { type: mark };
          }
        });
      }

      content.push(node);
    }
  });

  return content;
}

/**
 * Map Sanity category to Storyblok category
 */
function mapCategory(sanityCategory: any): string {
  if (!sanityCategory) return 'general';

  const categoryMap: { [key: string]: string } = {
    'empty-pubs': 'empty-pubs',
    competition: 'competition',
    marketing: 'marketing',
    operations: 'operations',
    finance: 'finance',
    compliance: 'compliance',
  };

  const slug =
    sanityCategory.slug?.current || sanityCategory.title?.toLowerCase().replace(/\s+/g, '-');
  return categoryMap[slug] || 'general';
}

/**
 * Transform a single Sanity blog post to Storyblok format
 */
function transformSanityToStoryblok(sanityPost: any, index: number) {
  // Generate a unique UUID for Storyblok
  const uuid = `blog-${sanityPost.slug.current}-${Date.now()}`;

  return {
    story: {
      name: sanityPost.title,
      slug: sanityPost.slug.current,
      parent_id: 0, // Will be set to blog folder ID
      content: {
        component: 'blog_article',
        _uid: uuid,

        // Core fields
        title: sanityPost.title,
        excerpt: sanityPost.excerpt || '',

        // Rich text content (much cleaner than Portable Text!)
        content: convertPortableTextToRichText(sanityPost.content),

        // Media
        featured_image: sanityPost.featuredImage?.asset?.url || '',
        featured_image_alt: sanityPost.featuredImage?.alt || '',

        // Dates
        published_date: sanityPost.publishedDate || new Date().toISOString(),
        updated_date: sanityPost.updatedDate || sanityPost._updatedAt,

        // Status
        status: sanityPost.status || 'draft',

        // Voice Search & AI
        quick_answer: sanityPost.quickAnswer || '',
        voice_queries: sanityPost.voiceSearchQueries || [],

        // SEO
        seo: {
          meta_title: sanityPost.seo?.metaTitle || sanityPost.title,
          meta_description: sanityPost.seo?.metaDescription || sanityPost.excerpt,
          keywords: sanityPost.seo?.keywords?.join(', ') || '',
        },

        // CTA
        cta_primary: sanityPost.ctaSettings?.primaryCTA || 'Get Help Now',
        whatsapp_message:
          sanityPost.ctaSettings?.whatsappMessage ||
          'Hi Peter, I read your article and need help with my pub.',

        // Organization
        category: mapCategory(sanityPost.category),
        tags: sanityPost.tags || [],
      },

      // Storyblok metadata
      is_startpage: false,
      position: index,
      published_at: sanityPost.status === 'published' ? sanityPost.publishedDate : null,
    },

    // For scheduling
    publish_at: sanityPost.status === 'scheduled' ? sanityPost.publishedDate : null,
  };
}

/**
 * Main transformation function
 */
async function transformContent() {
  console.log('🔄 Transforming Sanity content to Storyblok format...\n');

  try {
    // Load Sanity export
    const exportPath = path.join(process.cwd(), 'storyblok-migration', 'sanity-blogs-export.json');
    const sanityData = JSON.parse(fs.readFileSync(exportPath, 'utf-8'));

    console.log(`📚 Processing ${sanityData.length} blog posts...\n`);

    // Transform each post
    const storyblokStories = sanityData.map((post: any, index: number) => {
      console.log(`   ${index + 1}. ${post.title}`);
      return transformSanityToStoryblok(post, index);
    });

    // Create Storyblok import structure
    const storyblokImport = {
      stories: storyblokStories.map((s) => s.story),
    };

    // Save transformed content
    const outputDir = path.join(process.cwd(), 'storyblok-migration');
    const outputPath = path.join(outputDir, 'storyblok-import.json');

    fs.writeFileSync(outputPath, JSON.stringify(storyblokImport, null, 2), 'utf-8');

    console.log('\n✅ Transformation complete!');
    console.log(`📁 Storyblok import file: ${outputPath}`);

    // Create import instructions
    const instructions = `
# Storyblok Import Instructions

## 1. Create Space in Storyblok
- Go to https://app.storyblok.com/
- Create a new space called "orangejelly-blogs"
- Select "Start from scratch"

## 2. Set Up Blog Component
- Go to Block Library
- Create new component called "blog_article"
- Add fields as defined in STORYBLOK_MIGRATION_PLAN.md

## 3. Import Content
Use the Storyblok CLI:
\`\`\`bash
# Install CLI
npm install -g storyblok@latest

# Login with your token
storyblok login --token GkqeSgICQTy1lamlvxO0mgtt

# Import stories
storyblok import ./storyblok-import.json --space [YOUR_SPACE_ID]
\`\`\`

## 4. Verify Import
- Check all ${storyblokStories.length} articles imported
- Verify rich text formatting
- Test image display
- Check SEO metadata

## 5. Set Up Webhook (Optional)
For auto-sync with Next.js:
- Settings > Webhooks
- Add webhook URL: https://orangejelly.co.uk/api/revalidate
- Select events: Story published, Story unpublished
`;

    const instructionsPath = path.join(outputDir, 'IMPORT_INSTRUCTIONS.md');
    fs.writeFileSync(instructionsPath, instructions, 'utf-8');

    console.log(`📋 Import instructions: ${instructionsPath}`);

    // Summary statistics
    console.log('\n📊 Transformation Summary:');
    console.log(`   Total articles: ${storyblokStories.length}`);
    console.log(
      `   Published: ${storyblokStories.filter((s: any) => s.story.content.status === 'published').length}`
    );
    console.log(
      `   Draft: ${storyblokStories.filter((s: any) => s.story.content.status === 'draft').length}`
    );
    console.log(
      `   With images: ${storyblokStories.filter((s: any) => s.story.content.featured_image).length}`
    );
  } catch (error) {
    console.error('❌ Transformation failed:', error);
    process.exit(1);
  }
}

// Run transformation
transformContent().catch(console.error);
