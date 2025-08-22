# Sanity Portable Text to Markdown Converter

A comprehensive TypeScript script that converts Sanity portable text content to clean, properly formatted markdown files.

## Features

### Core Conversion Capabilities
- **Portable Text Blocks**: Converts headings (h1-h6), paragraphs, blockquotes, and lists
- **Text Formatting**: Handles bold (`**text**`), italic (`*text*`), code (`\`code\``), underline, and strikethrough
- **Lists**: Supports both bullet points and numbered lists with proper nesting
- **Links**: Converts Sanity link marks to markdown links
- **Images**: Converts image blocks with alt text and captions
- **Special Characters**: Proper escaping of markdown special characters

### Metadata & Frontmatter
- **Complete Frontmatter**: All blog post metadata converted to YAML frontmatter
- **SEO Data**: Meta descriptions, keywords, and voice search queries
- **Taxonomy**: Categories, tags, and author information
- **Dates**: Published and updated dates preserved
- **Special Features**: FAQs, quick answers, quick stats, and local SEO data
- **Featured Images**: Asset references converted to proper image paths

### Error Handling & Validation
- **Robust Error Handling**: Continues processing even when individual blocks fail
- **Detailed Reporting**: Shows success/failure counts with specific error messages
- **Warning System**: Identifies unsupported block types and formatting issues
- **Graceful Degradation**: Falls back to HTML comments for unsupported content

## Installation & Setup

No additional dependencies required - uses Node.js built-in modules:
- `fs/promises` for file operations
- `path` for file path handling

## Usage

### Basic Usage
```bash
npx ts-node --esm scripts/convert-portable-text.ts
```

### With Custom Directories
```bash
npx ts-node --esm scripts/convert-portable-text.ts --export-dir ./my-export --output-dir ./my-markdown
```

### Command Line Options
- `--export-dir <path>`: Source directory with Sanity JSON exports (default: `./sanity-export`)
- `--output-dir <path>`: Destination directory for markdown files (default: `./content/blog`)
- `--help`, `-h`: Show help message

## Input Format

Expects Sanity export files in JSON format:
```
sanity-export/
├── blogPosts.json     # Main blog posts with portable text content
├── authors.json       # Author information (optional)
├── categories.json    # Category taxonomy (optional)
└── ...
```

## Output Format

### Generated Markdown Structure
```markdown
---
title: "Blog Post Title"
slug: "blog-post-slug"
publishedDate: "2025-01-15T10:00:00Z"
excerpt: "Post excerpt"
author: "Author Name"
category: "category-slug"
tags:
  - "tag1"
  - "tag2"
metaDescription: "SEO description"
keywords:
  - "keyword1"
  - "keyword2"
featuredImage: "/images/image-hash-1200x800.jpg"
---

# Main Content

Paragraph content with **bold**, *italic*, and `code` formatting.

## Subheading

- List item 1
- List item 2
  - Nested item

### FAQ Section

**Question**: Sample question?
**Answer**: Sample answer with formatting.
```

### File Naming
Files are named using the slug field: `blog-post-slug.md`

## Supported Block Types

### Text Blocks
- **Normal paragraphs**: Standard body text
- **Headings**: H1 through H6 (`# Heading`)
- **Blockquotes**: `> Quoted text`
- **Lists**: Bullet and numbered with nesting support

### Text Formatting (Marks)
- **Bold**: `**text**` (from `strong` mark)
- **Italic**: `*text*` (from `em` mark)  
- **Code**: `\`code\`` (from `code` mark)
- **Underline**: `<u>text</u>` (from `underline` mark)
- **Strikethrough**: `~~text~~` (from `strike-through` mark)
- **Links**: `[text](url)` (from link markDefs)

### Media Blocks
- **Images**: `![alt text](/images/filename.ext)`
- **Image Captions**: Added as italic text below images

### Special Features
- **FAQs**: Automatically appended as H2 section with Q&A format
- **Complex Metadata**: Preserved in frontmatter for later use

## Error Handling

### Non-Fatal Errors
- Unsupported block types → HTML comment placeholders
- Missing image assets → Warning logged, placeholder used
- Invalid mark definitions → Warning logged, text preserved
- Malformed content → Error logged, content skipped

### Fatal Errors
- Missing export file → Script exits with error
- Invalid JSON format → Script exits with error
- File system permissions → Script exits with error

## Performance

- **Speed**: Processes ~34 blog posts in ~2-3 seconds
- **Memory**: Efficient streaming processing, low memory usage
- **Batch Processing**: Handles large content collections without issues

## Example Output

**Input** (Sanity Portable Text):
```json
{
  "_type": "block",
  "style": "h2",
  "children": [
    {
      "_type": "span",
      "text": "Crisis Management",
      "marks": []
    }
  ]
}
```

**Output** (Markdown):
```markdown
## Crisis Management
```

## Troubleshooting

### Common Issues

1. **ESM Module Warnings**: Use `--esm` flag with ts-node
2. **Permission Errors**: Check read/write permissions on directories
3. **Missing Images**: Ensure image assets are accessible in the specified path
4. **Formatting Issues**: Check for unsupported Sanity block types in warnings

### Debug Mode
Check the console output for detailed error messages and warnings.

## Extending the Script

### Adding New Block Types
1. Add interface definition for the new block type
2. Extend `convertBlock()` method with new case
3. Implement conversion logic in separate method

### Custom Markdown Formatting
1. Modify the mark handling in `convertSpans()` method
2. Add new mark types to the switch statement
3. Define custom markdown output format

### Advanced Frontmatter
1. Extend the `generateFrontmatter()` method
2. Add new metadata fields from Sanity schema
3. Define YAML serialization for complex objects

## License

Part of the Orange Jelly website codebase. Internal use only.