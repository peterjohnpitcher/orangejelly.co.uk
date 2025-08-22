#!/usr/bin/env node --loader ts-node/esm

import fs from 'fs/promises';
import path from 'path';

// TypeScript interfaces for Sanity portable text
interface PortableTextBlock {
  _key: string;
  _type: 'block';
  children: PortableTextSpan[];
  markDefs?: MarkDef[];
  style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote';
  listItem?: 'bullet' | 'number';
  level?: number;
}

interface PortableTextSpan {
  _key: string;
  _type: 'span';
  text: string;
  marks?: string[];
}

interface MarkDef {
  _key: string;
  _type: string;
  href?: string;
  [key: string]: any;
}

interface ImageBlock {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  caption?: string;
}

interface BlogPost {
  _id: string;
  _type: 'blogPost';
  title: string;
  slug: {
    current: string;
  };
  content: (PortableTextBlock | ImageBlock | any)[];
  author?: {
    name: string;
    bio?: string;
    image?: ImageBlock;
  };
  category?: {
    title?: string;
    slug?: {
      current: string;
    };
  };
  publishedDate?: string;
  updatedDate?: string;
  excerpt?: string;
  featuredImage?: ImageBlock | null;
  seo?: {
    metaDescription?: string;
    keywords?: string[];
  };
  tags?: string[];
  status?: string;
  faqs?: any[];
  quickAnswer?: any;
  quickStats?: any;
  ctaSettings?: any;
  localSEO?: any;
  voiceSearchQueries?: string[];
}

// Conversion utilities
class PortableTextConverter {
  private errors: string[] = [];
  private warnings: string[] = [];

  /**
   * Convert a single portable text block to markdown
   */
  convertBlock(block: PortableTextBlock | any): string {
    try {
      if (block._type === 'block') {
        return this.convertTextBlock(block as PortableTextBlock);
      } else if (block._type === 'image') {
        return this.convertImageBlock(block as ImageBlock);
      } else {
        this.warnings.push(`Unsupported block type: ${block._type}`);
        return `<!-- Unsupported block type: ${block._type} -->`;
      }
    } catch (error) {
      this.errors.push(`Error converting block ${block._key}: ${error}`);
      return `<!-- Error converting block: ${error} -->`;
    }
  }

  /**
   * Convert a text block (paragraph, heading, list item)
   */
  private convertTextBlock(block: PortableTextBlock): string {
    const text = this.convertSpans(block.children, block.markDefs || []);
    
    // Handle different styles
    switch (block.style) {
      case 'h1':
        return `# ${text}`;
      case 'h2':
        return `## ${text}`;
      case 'h3':
        return `### ${text}`;
      case 'h4':
        return `#### ${text}`;
      case 'h5':
        return `##### ${text}`;
      case 'h6':
        return `###### ${text}`;
      case 'blockquote':
        return `> ${text}`;
      case 'normal':
      default:
        // Handle list items
        if (block.listItem) {
          const indent = '  '.repeat((block.level || 1) - 1);
          const marker = block.listItem === 'bullet' ? '-' : '1.';
          return `${indent}${marker} ${text}`;
        }
        return text;
    }
  }

  /**
   * Convert spans with marks to markdown
   */
  private convertSpans(spans: PortableTextSpan[], markDefs: MarkDef[]): string {
    return spans.map(span => {
      let text = this.escapeMarkdown(span.text);
      
      if (span.marks && span.marks.length > 0) {
        // Process marks in reverse order to handle nested marks correctly
        const sortedMarks = [...span.marks].reverse();
        
        for (const mark of sortedMarks) {
          switch (mark) {
            case 'strong':
              text = `**${text}**`;
              break;
            case 'em':
              text = `*${text}*`;
              break;
            case 'code':
              text = `\`${text}\``;
              break;
            case 'underline':
              text = `<u>${text}</u>`;
              break;
            case 'strike-through':
              text = `~~${text}~~`;
              break;
            default:
              // Check if it's a link or custom mark
              const markDef = markDefs.find(def => def._key === mark);
              if (markDef) {
                if (markDef._type === 'link') {
                  text = `[${text}](${markDef.href || '#'})`;
                } else {
                  this.warnings.push(`Unsupported mark type: ${markDef._type}`);
                }
              } else {
                this.warnings.push(`Unknown mark: ${mark}`);
              }
              break;
          }
        }
      }
      
      return text;
    }).join('');
  }

  /**
   * Convert image block to markdown
   */
  private convertImageBlock(block: ImageBlock): string {
    const alt = block.alt || 'Image';
    const caption = block.caption ? `\n\n*${block.caption}*` : '';
    
    // Extract filename from asset reference
    const assetRef = block.asset._ref;
    const filename = this.extractFilenameFromAssetRef(assetRef);
    
    return `![${alt}](/images/${filename})${caption}`;
  }

  /**
   * Extract filename from Sanity asset reference
   */
  private extractFilenameFromAssetRef(ref: string): string {
    // Format: image-{hash}-{width}x{height}-{format}
    const parts = ref.split('-');
    if (parts.length >= 4) {
      const hash = parts[1];
      const dimensions = parts[2];
      const format = parts[3];
      return `${hash}-${dimensions}.${format}`;
    }
    return ref; // Fallback
  }

  /**
   * Escape special markdown characters
   */
  private escapeMarkdown(text: string): string {
    // Escape common markdown characters that aren't part of formatting
    return text
      .replace(/\\/g, '\\\\')
      .replace(/([#\[\]{}])/g, '\\$1');
      // Don't escape parentheses - they're common in text and rarely cause issues
      // Don't escape * and _ as they're handled by marks
      // Leave line breaks as-is - they're handled at the block level
  }

  /**
   * Generate frontmatter from blog post metadata
   */
  generateFrontmatter(post: BlogPost): string {
    const frontmatter: Record<string, any> = {
      title: post.title,
      slug: post.slug?.current,
      publishedDate: post.publishedDate,
      updatedDate: post.updatedDate,
      excerpt: post.excerpt,
      author: post.author?.name,
      category: post.category?.slug?.current || post.category?.title,
      tags: post.tags || [],
      status: post.status || 'published'
    };

    // Add SEO metadata
    if (post.seo) {
      frontmatter.metaDescription = post.seo.metaDescription;
      frontmatter.keywords = post.seo.keywords || [];
    }

    // Add featured image
    if (post.featuredImage) {
      const filename = this.extractFilenameFromAssetRef(post.featuredImage.asset._ref);
      frontmatter.featuredImage = `/images/${filename}`;
    }

    // Add other metadata if present
    if (post.faqs && post.faqs.length > 0) {
      frontmatter.hasFAQs = true;
    }

    if (post.quickAnswer) {
      frontmatter.hasQuickAnswer = true;
    }

    if (post.quickStats) {
      frontmatter.hasQuickStats = true;
    }

    if (post.localSEO) {
      frontmatter.localSEO = post.localSEO;
    }

    if (post.voiceSearchQueries && post.voiceSearchQueries.length > 0) {
      frontmatter.voiceSearchQueries = post.voiceSearchQueries;
    }

    // Convert to YAML frontmatter
    let yaml = '---\n';
    for (const [key, value] of Object.entries(frontmatter)) {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            yaml += `${key}:\n`;
            value.forEach(item => {
              yaml += `  - ${JSON.stringify(item)}\n`;
            });
          }
        } else if (typeof value === 'object') {
          yaml += `${key}: ${JSON.stringify(value)}\n`;
        } else {
          yaml += `${key}: ${JSON.stringify(value)}\n`;
        }
      }
    }
    yaml += '---\n\n';
    
    return yaml;
  }

  /**
   * Convert a full blog post to markdown
   */
  convertBlogPost(post: BlogPost): string {
    this.errors = [];
    this.warnings = [];

    try {
      let markdown = this.generateFrontmatter(post);
      
      // Convert content blocks
      if (post.content && Array.isArray(post.content)) {
        const contentBlocks = post.content
          .map(block => this.convertBlock(block))
          .filter(block => block.trim().length > 0);
        
        markdown += contentBlocks.join('\n\n');
      }

      // Add FAQs if present
      if (post.faqs && post.faqs.length > 0) {
        markdown += '\n\n## Frequently Asked Questions\n\n';
        post.faqs.forEach((faq: any) => {
          if (faq.question && faq.answer) {
            markdown += `### ${faq.question}\n\n${faq.answer}\n\n`;
          }
        });
      }

      return markdown;
    } catch (error) {
      this.errors.push(`Error converting blog post ${post._id}: ${error}`);
      throw error;
    }
  }

  /**
   * Get conversion errors
   */
  getErrors(): string[] {
    return [...this.errors];
  }

  /**
   * Get conversion warnings
   */
  getWarnings(): string[] {
    return [...this.warnings];
  }
}

// File operations
class FileManager {
  private exportDir: string;
  private outputDir: string;

  constructor(exportDir: string, outputDir: string) {
    this.exportDir = exportDir;
    this.outputDir = outputDir;
  }

  /**
   * Read and parse JSON export file
   */
  async readExportFile<T>(filename: string): Promise<T[]> {
    const filePath = path.join(this.exportDir, filename);
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      throw new Error(`Failed to read ${filename}: ${error}`);
    }
  }

  /**
   * Ensure output directory exists
   */
  async ensureOutputDir(): Promise<void> {
    try {
      await fs.mkdir(this.outputDir, { recursive: true });
    } catch (error) {
      throw new Error(`Failed to create output directory: ${error}`);
    }
  }

  /**
   * Write markdown file
   */
  async writeMarkdownFile(filename: string, content: string): Promise<void> {
    const filePath = path.join(this.outputDir, filename);
    try {
      await fs.writeFile(filePath, content, 'utf-8');
    } catch (error) {
      throw new Error(`Failed to write ${filename}: ${error}`);
    }
  }

  /**
   * Generate safe filename from slug
   */
  generateFilename(slug: string): string {
    return `${slug.replace(/[^a-z0-9-]/gi, '-').toLowerCase()}.md`;
  }
}

// Main conversion class
class SanityToMarkdownConverter {
  private converter: PortableTextConverter;
  private fileManager: FileManager;
  private allErrors: string[] = [];
  private allWarnings: string[] = [];

  constructor(exportDir: string, outputDir: string) {
    this.converter = new PortableTextConverter();
    this.fileManager = new FileManager(exportDir, outputDir);
  }

  /**
   * Convert all blog posts to markdown
   */
  async convertBlogPosts(): Promise<void> {
    console.log('🚀 Starting blog posts conversion...');
    
    try {
      // Read blog posts
      const posts = await this.fileManager.readExportFile<BlogPost>('blogPosts.json');
      console.log(`📖 Found ${posts.length} blog posts`);

      // Ensure output directory exists
      await this.fileManager.ensureOutputDir();

      let successCount = 0;
      let errorCount = 0;

      // Convert each post
      for (const post of posts) {
        try {
          console.log(`📝 Converting: ${post.title}`);
          
          const markdown = this.converter.convertBlogPost(post);
          const filename = this.fileManager.generateFilename(post.slug?.current || post._id);
          
          await this.fileManager.writeMarkdownFile(filename, markdown);
          
          // Collect errors and warnings
          this.allErrors.push(...this.converter.getErrors());
          this.allWarnings.push(...this.converter.getWarnings());
          
          successCount++;
          console.log(`✅ Converted: ${filename}`);
          
        } catch (error) {
          errorCount++;
          this.allErrors.push(`Failed to convert "${post.title}": ${error}`);
          console.error(`❌ Failed to convert: ${post.title} - ${error}`);
        }
      }

      // Print summary
      console.log('\n📊 Conversion Summary:');
      console.log(`✅ Successful: ${successCount}`);
      console.log(`❌ Failed: ${errorCount}`);
      console.log(`⚠️  Warnings: ${this.allWarnings.length}`);
      console.log(`🚨 Errors: ${this.allErrors.length}`);

      // Print warnings and errors if any
      if (this.allWarnings.length > 0) {
        console.log('\n⚠️  Warnings:');
        this.allWarnings.forEach(warning => console.log(`  - ${warning}`));
      }

      if (this.allErrors.length > 0) {
        console.log('\n🚨 Errors:');
        this.allErrors.forEach(error => console.log(`  - ${error}`));
      }

    } catch (error) {
      console.error('💥 Fatal error during conversion:', error);
      throw error;
    }
  }

  /**
   * Get all errors from conversion
   */
  getErrors(): string[] {
    return [...this.allErrors];
  }

  /**
   * Get all warnings from conversion
   */
  getWarnings(): string[] {
    return [...this.allWarnings];
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
📝 Sanity Portable Text to Markdown Converter

Usage:
  npx ts-node scripts/convert-portable-text.ts [options]

Options:
  --export-dir <path>    Directory containing Sanity export files (default: ./sanity-export)
  --output-dir <path>    Directory to write markdown files (default: ./content/blog)
  --help, -h             Show this help message

Examples:
  npx ts-node scripts/convert-portable-text.ts
  npx ts-node scripts/convert-portable-text.ts --output-dir ./markdown-content
`);
    process.exit(0);
  }

  // Parse arguments
  const exportDirIndex = args.indexOf('--export-dir');
  const outputDirIndex = args.indexOf('--output-dir');
  
  const exportDir = exportDirIndex !== -1 && args[exportDirIndex + 1] 
    ? args[exportDirIndex + 1] 
    : './sanity-export';
    
  const outputDir = outputDirIndex !== -1 && args[outputDirIndex + 1] 
    ? args[outputDirIndex + 1] 
    : './content/blog';

  console.log(`📂 Export directory: ${exportDir}`);
  console.log(`📁 Output directory: ${outputDir}`);

  try {
    const converter = new SanityToMarkdownConverter(exportDir, outputDir);
    await converter.convertBlogPosts();
    
    const errors = converter.getErrors();
    const warnings = converter.getWarnings();
    
    if (errors.length > 0) {
      console.log('\n🚨 Conversion completed with errors. Check the output above.');
      process.exit(1);
    } else if (warnings.length > 0) {
      console.log('\n⚠️  Conversion completed with warnings. Check the output above.');
      process.exit(0);
    } else {
      console.log('\n🎉 Conversion completed successfully!');
      process.exit(0);
    }
    
  } catch (error) {
    console.error('\n💥 Conversion failed:', error);
    process.exit(1);
  }
}

// Run CLI if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  });
}

// Export for use as module
export {
  PortableTextConverter,
  FileManager,
  SanityToMarkdownConverter,
  type BlogPost,
  type PortableTextBlock,
  type ImageBlock
};