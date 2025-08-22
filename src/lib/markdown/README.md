# Markdown Utilities

Comprehensive, production-ready markdown utilities for working with markdown files in your Next.js application.

## Features

- **File Management**: List and find markdown files in directories
- **Parsing**: Parse frontmatter and content with validation
- **HTML Conversion**: Convert markdown to HTML using remark
- **Content Extraction**: Extract excerpts and calculate reading time
- **Content Types**: Specialized functions for blogs, case studies, services, and FAQs
- **Filtering & Sorting**: Advanced filtering and sorting options
- **Error Handling**: Comprehensive error handling with custom error types
- **TypeScript**: Full TypeScript support with detailed type definitions

## Installation

The required packages are already installed:

- `gray-matter` - For parsing frontmatter
- `remark` & `remark-html` - For markdown to HTML conversion
- `reading-time` - For calculating reading time

## Basic Usage

```typescript
import {
  getAllMarkdownFiles,
  getMarkdownBySlug,
  parseMarkdownFile,
  markdownToHtml,
  extractExcerpt,
  calculateReadingTime,
} from '@/lib/markdown';

// Get all markdown files from a directory
const files = getAllMarkdownFiles('/path/to/content');

// Find a specific file by slug
const filePath = getMarkdownBySlug('/path/to/blog', 'my-post');

// Parse a markdown file
const parsed = parseMarkdownFile(filePath);

// Convert markdown to HTML
const html = await markdownToHtml(parsed.content);

// Extract excerpt
const excerpt = extractExcerpt(parsed.content, 160);

// Calculate reading time
const readingTime = calculateReadingTime(parsed.content);
```

## Content Type Functions

### Blog Posts

```typescript
import { getAllBlogPosts, MarkdownFileFilter, MarkdownFileSortOptions } from '@/lib/markdown';

// Get all blog posts
const posts = getAllBlogPosts('/content/blog');

// With filtering
const filter: MarkdownFileFilter = {
  published: true,
  featured: true,
  category: 'marketing',
};

const filteredPosts = getAllBlogPosts('/content/blog', filter);

// With sorting
const sort: MarkdownFileSortOptions = {
  field: 'publishedAt',
  direction: 'desc',
};

const sortedPosts = getAllBlogPosts('/content/blog', filter, sort);
```

### Case Studies

```typescript
import { getAllCaseStudies } from '@/lib/markdown';

const caseStudies = getAllCaseStudies('/content/case-studies');

// Each case study includes client, industry, challenge, solution, etc.
caseStudies.forEach(study => {
  console.log(`${study.title} - Client: ${study.client}`);
});
```

### Services

```typescript
import { getAllServices } from '@/lib/markdown';

const services = getAllServices('/content/services');

// Services include pricing, features, benefits, etc.
services.forEach(service => {
  console.log(`${service.title} - ${service.pricing?.type}`);
});
```

### FAQs

```typescript
import { getAllFAQs } from '@/lib/markdown';

const faqs = getAllFAQs('/content/faqs');

// FAQs are automatically sorted by order field, then by question
faqs.forEach(faq => {
  console.log(`Q: ${faq.question}`);
  console.log(`A: ${faq.answer}`);
});
```

## Frontmatter Schema

All markdown files should include frontmatter with these fields:

### Required Fields
- `title: string` - The title of the content
- `slug: string` - URL-friendly identifier (auto-generated from filename if missing)

### Common Optional Fields
- `description: string` - Brief description
- `publishedAt: string` - Publication date (ISO string)
- `updatedAt: string` - Last update date (ISO string)
- `author: string` - Author name
- `tags: string[]` - Array of tags
- `categories: string[]` - Array of categories
- `featured: boolean` - Whether content is featured
- `draft: boolean` - Whether content is a draft

### SEO Fields
- `seoTitle: string` - SEO title (overrides title)
- `seoDescription: string` - SEO description (overrides description)
- `ogImage: string` - Open Graph image URL
- `canonicalUrl: string` - Canonical URL for SEO

### Content-Specific Fields

**Blog Posts:**
```yaml
title: "My Blog Post"
slug: "my-blog-post"
description: "A brief description"
publishedAt: "2024-01-15T10:00:00Z"
author: "John Doe"
tags: ["marketing", "seo"]
categories: ["Business"]
featured: true
```

**Case Studies:**
```yaml
title: "Client Success Story"
slug: "client-success"
client: "Acme Corp"
industry: "Technology"
challenge: "Needed better marketing"
solution: "Implemented comprehensive strategy"
results:
  - "50% increase in leads"
  - "30% reduction in costs"
metrics:
  - name: "Lead Increase"
    value: "50%"
    description: "Monthly lead generation improvement"
```

**Services:**
```yaml
title: "Marketing Consultation"
slug: "marketing-consultation"
shortDescription: "Strategic marketing advice"
features:
  - "Market Analysis"
  - "Strategy Development"
  - "Implementation Plan"
pricing:
  type: "fixed"
  amount: 2500
  currency: "USD"
duration: "2-3 weeks"
```

**FAQs:**
```yaml
question: "How long does implementation take?"
category: "General"
order: 1
featured: true
```

## Error Handling

The utilities include comprehensive error handling with custom error types:

```typescript
import { MarkdownError, FrontMatterError, FileNotFoundError } from '@/lib/markdown';

try {
  const parsed = parseMarkdownFile('/path/to/file.md');
} catch (error) {
  if (error instanceof FileNotFoundError) {
    console.error('File not found:', error.filePath);
  } else if (error instanceof FrontMatterError) {
    console.error('Invalid frontmatter:', error.message);
  } else if (error instanceof MarkdownError) {
    console.error('Markdown error:', error.message);
  }
}
```

## Advanced Options

### Parsing Options

```typescript
import { parseMarkdownFile, MarkdownParseOptions } from '@/lib/markdown';

const options: MarkdownParseOptions = {
  excerptLength: 200,           // Maximum excerpt length
  excerptSeparator: '<!--more-->', // Custom excerpt separator
  includeReadingTime: true,     // Include reading time calculation
  stripHtml: true,             // Strip HTML from excerpts
};

const parsed = parseMarkdownFile('/path/to/file.md', options);
```

### Filtering Options

```typescript
import { MarkdownFileFilter } from '@/lib/markdown';

const filter: MarkdownFileFilter = {
  published: true,              // Only published content
  draft: false,                // Exclude drafts
  featured: true,              // Only featured content
  category: 'marketing',       // Specific category
  tag: 'seo',                 // Specific tag
  author: 'John Doe',         // Specific author
  dateFrom: new Date('2024-01-01'), // From date
  dateTo: new Date('2024-12-31'),   // To date
};
```

### Sorting Options

```typescript
import { MarkdownFileSortOptions } from '@/lib/markdown';

const sort: MarkdownFileSortOptions = {
  field: 'publishedAt',  // Field to sort by
  direction: 'desc',     // Sort direction (asc or desc)
};

// Available fields: 'publishedAt' | 'updatedAt' | 'title' | 'slug'
```

## Directory Structure

Organize your markdown files in a clear directory structure:

```
content/
├── blog/
│   ├── post-1.md
│   └── post-2.md
├── case-studies/
│   ├── client-a.md
│   └── client-b.md
├── services/
│   ├── consulting.md
│   └── development.md
└── faqs/
    ├── general.md
    └── pricing.md
```

## Integration with Next.js

### Static Generation

```typescript
// pages/blog/[slug].tsx
import { getAllBlogPosts, getMarkdownBySlug, parseMarkdownFile } from '@/lib/markdown';

export async function getStaticPaths() {
  const posts = getAllBlogPosts('/content/blog');
  
  return {
    paths: posts.map(post => ({
      params: { slug: post.slug }
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const filePath = getMarkdownBySlug('/content/blog', params.slug);
  const post = parseMarkdownFile(filePath);
  
  return {
    props: { post },
  };
}
```

### API Routes

```typescript
// pages/api/blog.ts
import { getAllBlogPosts } from '@/lib/markdown';

export default function handler(req, res) {
  try {
    const posts = getAllBlogPosts('/content/blog', {
      published: true,
      draft: false,
    });
    
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load blog posts' });
  }
}
```

## Performance Considerations

- Files are read synchronously for static generation
- Consider caching parsed results for frequently accessed content
- Use filtering to reduce the number of files processed
- Enable recursive search only when necessary

## Contributing

When adding new content types or features:

1. Update the TypeScript interfaces in `markdown-types.ts`
2. Add utility functions in `markdown.ts`
3. Update the examples in `example.ts`
4. Add tests for new functionality
5. Update this documentation

## License

This utility is part of the Orange Jelly website codebase.