/**
 * Example usage of the markdown utilities
 * This file demonstrates how to use the various markdown functions
 */

import {
  getAllMarkdownFiles,
  getMarkdownBySlug,
  parseMarkdownFile,
  markdownToHtml,
  extractExcerpt,
  calculateReadingTime,
  getAllBlogPosts,
  getAllCaseStudies,
  getAllServices,
  getAllFAQs,
  MarkdownFileFilter,
  MarkdownFileSortOptions,
} from './';

/**
 * Example: Get all markdown files from a directory
 */
export function exampleGetAllFiles() {
  try {
    // Get all markdown files from content directory
    const files = getAllMarkdownFiles('/path/to/content');
    console.log('Found markdown files:', files);

    // Get all markdown files recursively
    const allFiles = getAllMarkdownFiles('/path/to/content', true);
    console.log('All markdown files (recursive):', allFiles);
  } catch (error) {
    console.error('Error getting markdown files:', error);
  }
}

/**
 * Example: Get a specific markdown file by slug
 */
export function exampleGetBySlug() {
  try {
    const filePath = getMarkdownBySlug('/path/to/blog', 'my-blog-post');
    if (filePath) {
      console.log('Found blog post:', filePath);
    } else {
      console.log('Blog post not found');
    }
  } catch (error) {
    console.error('Error finding blog post:', error);
  }
}

/**
 * Example: Parse a markdown file
 */
export function exampleParseFile() {
  try {
    const parsed = parseMarkdownFile('/path/to/blog/my-post.md', {
      excerptLength: 200,
      includeReadingTime: true,
      stripHtml: true,
    });

    console.log('Parsed frontmatter:', parsed.frontMatter);
    console.log('Content preview:', parsed.content.substring(0, 100));
    console.log('Excerpt:', parsed.excerpt);
    console.log('Reading time:', parsed.readingTime);
  } catch (error) {
    console.error('Error parsing markdown file:', error);
  }
}

/**
 * Example: Convert markdown to HTML
 */
export async function exampleMarkdownToHtml() {
  try {
    const markdown = `
# Hello World

This is **bold** text and this is *italic* text.

- List item 1
- List item 2

[Link to Google](https://google.com)
    `;

    const html = await markdownToHtml(markdown);
    console.log('Generated HTML:', html);
  } catch (error) {
    console.error('Error converting markdown to HTML:', error);
  }
}

/**
 * Example: Extract excerpt from content
 */
export function exampleExtractExcerpt() {
  const content = `
# My Blog Post

This is the introduction paragraph that would make a good excerpt.

## Main Content

This is the main content of the blog post with more details.
  `;

  try {
    const excerpt = extractExcerpt(content, 100, true);
    console.log('Extracted excerpt:', excerpt);
  } catch (error) {
    console.error('Error extracting excerpt:', error);
  }
}

/**
 * Example: Calculate reading time
 */
export function exampleReadingTime() {
  const content = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  `.repeat(50); // Repeat to make it longer

  try {
    const readingTime = calculateReadingTime(content);
    console.log('Reading time:', readingTime);
  } catch (error) {
    console.error('Error calculating reading time:', error);
  }
}

/**
 * Example: Get all blog posts with filtering and sorting
 */
export function exampleGetBlogPosts() {
  try {
    // Filter for published, featured posts
    const filter: MarkdownFileFilter = {
      published: true,
      featured: true,
      category: 'marketing',
    };

    // Sort by publication date, newest first
    const sort: MarkdownFileSortOptions = {
      field: 'publishedAt',
      direction: 'desc',
    };

    const posts = getAllBlogPosts('/path/to/blog', filter, sort);
    console.log('Filtered and sorted blog posts:', posts.length);

    posts.forEach(post => {
      console.log(`- ${post.title} (${post.publishedAt})`);
      console.log(`  Reading time: ${post.readingTime?.text}`);
      console.log(`  Excerpt: ${post.excerpt}`);
    });
  } catch (error) {
    console.error('Error getting blog posts:', error);
  }
}

/**
 * Example: Get all case studies
 */
export function exampleGetCaseStudies() {
  try {
    const caseStudies = getAllCaseStudies('/path/to/case-studies');
    console.log('Case studies:', caseStudies.length);

    caseStudies.forEach(caseStudy => {
      console.log(`- ${caseStudy.title} (Client: ${caseStudy.client})`);
      console.log(`  Industry: ${caseStudy.industry}`);
      console.log(`  Results: ${caseStudy.results?.join(', ')}`);
    });
  } catch (error) {
    console.error('Error getting case studies:', error);
  }
}

/**
 * Example: Get all services
 */
export function exampleGetServices() {
  try {
    const services = getAllServices('/path/to/services');
    console.log('Services:', services.length);

    services.forEach(service => {
      console.log(`- ${service.title}`);
      console.log(`  Features: ${service.features?.length || 0}`);
      console.log(`  Pricing: ${service.pricing?.type}`);
    });
  } catch (error) {
    console.error('Error getting services:', error);
  }
}

/**
 * Example: Get all FAQs
 */
export function exampleGetFAQs() {
  try {
    const faqs = getAllFAQs('/path/to/faqs');
    console.log('FAQs:', faqs.length);

    faqs.forEach(faq => {
      console.log(`Q: ${faq.question}`);
      console.log(`A: ${faq.answer.substring(0, 100)}...`);
      console.log(`Category: ${faq.category || 'Uncategorized'}`);
    });
  } catch (error) {
    console.error('Error getting FAQs:', error);
  }
}

// Export all examples for easy testing
export const examples = {
  getAllFiles: exampleGetAllFiles,
  getBySlug: exampleGetBySlug,
  parseFile: exampleParseFile,
  markdownToHtml: exampleMarkdownToHtml,
  extractExcerpt: exampleExtractExcerpt,
  readingTime: exampleReadingTime,
  getBlogPosts: exampleGetBlogPosts,
  getCaseStudies: exampleGetCaseStudies,
  getServices: exampleGetServices,
  getFAQs: exampleGetFAQs,
};