# Markdown Rendering Issue Report for Senior Developer

## Executive Summary
We have a critical markdown rendering issue where blog articles are not displaying with proper formatting. Lists with emojis show everything on one line without breaks, and the overall formatting is inconsistent. This report documents the current implementation and the specific problems that need resolution.

## Current System Architecture

### 1. Data Flow
```
Markdown File (.md) → Page Component → BlogPostServer → BlogPost → MarkdownContent → HTML Output
```

### 2. Key Components

#### A. Markdown Files Location
- **Path**: `/content/blog/*.md`
- **Format**: Standard markdown with YAML frontmatter
- **Example Structure**:
```markdown
---
title: "Young People Won't Come to Your Pub? Here's How to Change That"
slug: "young-people-wont-come-to-your-pub"
publishedDate: "2025-08-11T00:00:00.000Z"
author: "Peter Pitcher"
category: "customer-acquisition"
tags: ["young customers", "millennials", "gen z"]
---

# Article Title

Regular paragraph text here.

## Section Heading

**Forget What You Think They Want**
❌ Generic quiz nights
❌ Cheesy themed parties
❌ "Student nights" with cheap shots
❌ DJ playing music from 2010

**What Actually Works**
✅ **Bottomless Brunch Done Right** - Not just prosecco, but craft cocktails
✅ **Board Game Cafés** - Partner with local board game groups
```

#### B. Page Component (`/src/app/licensees-guide/[slug]/page.tsx`)
```typescript
// Reads markdown file and passes content to components
async function getMarkdownPost(slug: string) {
  const contentDir = path.join(process.cwd(), 'content/blog');
  const filePath = getMarkdownBySlug(contentDir, slug);
  
  const parsedPost = parseMarkdownFile(filePath);
  
  return {
    title: parsedPost.frontMatter.title,
    content: parsedPost.content, // Raw markdown string
    isPortableText: false,
    // ... other fields
  };
}
```

#### C. BlogPostServer Component (`/src/components/blog/BlogPostServer.tsx`)
```typescript
export default async function BlogPostServer({ post, relatedPosts = [] }) {
  let processedPost = { ...post };

  if (!post.isPortableText && typeof post.content === 'string') {
    // Process markdown to HTML on the server
    const processedContent = await remark()
      .use(remarkHtml, { sanitize: false })
      .process(post.content);

    processedPost = {
      ...post,
      contentHtml: processedContent.toString(),
      isPreProcessed: true,
    };
  }

  return <BlogPost post={processedPost} relatedPosts={relatedPosts} />;
}
```

#### D. BlogPost Component (`/src/components/blog/BlogPost.tsx`)
```typescript
// Renders the content based on what's available
{post.isPortableText ? (
  <div className="prose prose-lg max-w-none">
    <MarkdownContent content={post.content} />
  </div>
) : post.contentHtml ? (
  // Use pre-processed HTML if available
  <div 
    className="prose prose-lg max-w-none prose-headings:font-display..."
    dangerouslySetInnerHTML={{ __html: post.contentHtml }}
  />
) : (
  // Fallback to client-side markdown processing
  <MarkdownContent 
    content={post.content as string} 
    className="prose prose-lg max-w-none" 
  />
)}
```

#### E. MarkdownContent Component (`/src/components/MarkdownContent.tsx`)
```typescript
'use client';

export default function MarkdownContent({ content, className = '' }) {
  const [processedContent, setProcessedContent] = React.useState<string>('');
  
  React.useEffect(() => {
    async function processMarkdown() {
      const result = await remark()
        .use(remarkHtml, { sanitize: false })
        .process(content);
      
      const html = result.toString();
      setProcessedContent(html);
    }
    processMarkdown();
  }, [content]);

  const proseClasses = `
    prose prose-lg max-w-none
    prose-headings:font-display prose-headings:text-charcoal
    prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-8
    prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-4
    prose-li:text-charcoal prose-li:mb-2
    ${className}
  `.trim();

  return (
    <div 
      className={proseClasses}
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
}
```

## The Problem

### 1. Primary Issue: Line Breaks Not Rendering
When markdown contains lists with emojis or needs line breaks, they render on a single line:

**Expected Output:**
```
❌ Generic quiz nights
❌ Cheesy themed parties
❌ "Student nights" with cheap shots
❌ DJ playing music from 2010
```

**Actual Output:**
```
❌ Generic quiz nights ❌ Cheesy themed parties ❌ "Student nights" with cheap shots ❌ DJ playing music from 2010
```

### 2. Root Cause Analysis

The markdown source uses **single line breaks** to separate list items:
```markdown
❌ Generic quiz nights
❌ Cheesy themed parties
```

However, standard markdown requires **double line breaks** to create separate paragraphs or a proper list format with dashes:
```markdown
- ❌ Generic quiz nights
- ❌ Cheesy themed parties
```

### 3. Processing Chain Issues

1. **Server-side processing** (`BlogPostServer`):
   - Uses `remark` with `remarkHtml`
   - Does NOT preserve single line breaks (standard markdown behavior)
   - Converts to HTML: `<p>❌ Generic quiz nights ❌ Cheesy themed parties</p>`

2. **Client-side fallback** (`MarkdownContent`):
   - Also uses `remark` with `remarkHtml`
   - Same issue - single line breaks are ignored

3. **Tailwind Prose styles**:
   - Applied correctly but can't fix missing HTML structure
   - Lists need proper `<ul>` and `<li>` tags which aren't being generated

## Attempted Solutions That Failed

### 1. Using remark-breaks Plugin
```typescript
import remarkBreaks from 'remark-breaks';

const result = await remark()
  .use(remarkBreaks) // Preserves line breaks
  .use(remarkHtml)
  .process(content);
```
**Result**: Added `<br>` tags EVERYWHERE, including between every paragraph and heading.

### 2. Custom Node Processing
```typescript
const processNode = (node: Node, key: number = 0): React.ReactNode => {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent || '';
    if (text.includes('\n')) {
      return text.split('\n').map((line, i) => (
        <React.Fragment key={`${key}-${i}`}>
          {i > 0 && <br />}
          {line}
        </React.Fragment>
      ));
    }
  }
  // ... rest of processing
}
```
**Result**: Lost all other formatting (bold, headings, etc.)

### 3. Regex Pre-processing
```typescript
let processedContent = content;
// Convert lines with emoji bullets to list items
processedContent = processedContent.replace(
  /^([❌✅✓✗•]\s+.+)$/gm,
  '- $1'
);
```
**Result**: Partial success but broke other formatting.

## Specific Requirements

### 1. Must Support These Patterns

#### A. Emoji Lists (with line breaks)
```markdown
❌ Generic quiz nights
❌ Cheesy themed parties
✅ Board game cafés
✅ Craft cocktails
```

#### B. Bold Text Lists
```markdown
✅ **Bottomless Brunch Done Right** - Not just prosecco, but craft cocktails
✅ **Board Game Cafés** - Partner with local board game groups
```

#### C. Standard Markdown Lists
```markdown
- Item one
- Item two
- Item three
```

#### D. Numbered Lists
```markdown
1. First item
2. Second item
3. Third item
```

### 2. Must Preserve

- Headers (h1, h2, h3, etc.)
- Bold text (`**text**`)
- Italic text (`*text*`)
- Links (`[text](url)`)
- Code blocks
- Blockquotes
- Paragraphs with proper spacing

## Recommended Solution Approach

### Option 1: Pre-process Markdown (Recommended)
Before passing to remark, transform the markdown to standard format:

```typescript
function preprocessMarkdown(content: string): string {
  // Convert emoji lines to proper list items
  let processed = content;
  
  // Handle lines that start with emojis
  processed = processed.replace(
    /^([❌✅✓✗])\s+(.+)$/gm,
    '- $1 $2'
  );
  
  // Handle bold lists that need breaks
  processed = processed.replace(
    /^(✅|❌)\s+\*\*(.+?)\*\*\s+-\s+(.+)$/gm,
    '- $1 **$2** - $3'
  );
  
  return processed;
}

// Then in BlogPostServer:
const preprocessed = preprocessMarkdown(post.content);
const processedContent = await remark()
  .use(remarkHtml, { sanitize: false })
  .process(preprocessed);
```

### Option 2: Custom Remark Plugin
Create a plugin that handles these special cases:

```typescript
function remarkEmojiLists() {
  return (tree) => {
    visit(tree, 'paragraph', (node, index, parent) => {
      const text = node.children[0]?.value || '';
      if (/^[❌✅✓✗]/.test(text)) {
        // Convert to list structure
        const lines = text.split('\n');
        const listItems = lines.map(line => ({
          type: 'listItem',
          children: [{
            type: 'paragraph',
            children: [{ type: 'text', value: line }]
          }]
        }));
        
        parent.children[index] = {
          type: 'list',
          ordered: false,
          children: listItems
        };
      }
    });
  };
}
```

### Option 3: Fix at Source
Update all markdown files to use standard list format:

```markdown
Instead of:
❌ Generic quiz nights
❌ Cheesy themed parties

Use:
- ❌ Generic quiz nights
- ❌ Cheesy themed parties
```

## Testing Requirements

The solution must correctly render:

1. **Test Case 1**: Emoji lists
   - Input: `❌ Item 1\n❌ Item 2`
   - Expected: Two separate lines with bullets

2. **Test Case 2**: Bold text in lists
   - Input: `✅ **Bold** - Description`
   - Expected: Bullet, bold text, dash, description

3. **Test Case 3**: Standard markdown
   - Input: `## Heading\n\nParagraph\n\n- List item`
   - Expected: Proper heading, paragraph, and bulleted list

4. **Test Case 4**: Mixed content
   - All above patterns in one document
   - Must maintain all formatting

## Environment Details

- **Next.js**: 14.2.32
- **React**: 18.x
- **remark**: 15.0.1
- **remark-html**: 16.0.1
- **Tailwind CSS**: With Typography plugin
- **Node**: 18+

## Critical Files to Review

1. `/src/components/MarkdownContent.tsx` - Client-side processor
2. `/src/components/blog/BlogPostServer.tsx` - Server-side processor
3. `/src/components/blog/BlogPost.tsx` - Display component
4. `/src/app/licensees-guide/[slug]/page.tsx` - Data fetching
5. `/content/blog/*.md` - Source markdown files

## Success Criteria

1. All lists (emoji, standard, numbered) render with proper line breaks
2. Bold text, links, and other formatting preserved
3. No excessive `<br>` tags between paragraphs
4. Server-side rendering works (for SEO)
5. Client-side fallback works identically
6. No performance degradation

## Questions for Senior Developer

1. Should we pre-process markdown files during build time or runtime?
2. Is modifying source markdown files acceptable, or must we handle any format?
3. Should emoji lists be converted to HTML `<ul>` lists or kept as separate paragraphs with breaks?
4. What's the preferred approach for maintaining backward compatibility?
5. Should we use a different markdown processor (marked, markdown-it) instead of remark?

## Appendix: Full Example of Problem Content

### Source Markdown
```markdown
## Events They Actually Want

Forget What You Think They Want
❌ Generic quiz nights
❌ Cheesy themed parties
❌ "Student nights" with cheap shots
❌ DJ playing music from 2010

What Actually Works
✅ **Bottomless Brunch Done Right** - Not just prosecco, but craft cocktails, decent food, 90 minutes, £35
✅ **Board Game Cafés** - Partner with local board game groups, Sunday afternoons, coffee focus
✅ **Small Plate Sundays** - Tapas-style sharing, encourages groups, lower price point
✅ **Work From Pub Days** - Fast WiFi, coffee, lunch deals, quiet background music till 5pm
```

### Current HTML Output (Broken)
```html
<h2>Events They Actually Want</h2>
<p>Forget What You Think They Want ❌ Generic quiz nights ❌ Cheesy themed parties ❌ "Student nights" with cheap shots ❌ DJ playing music from 2010</p>
<p>What Actually Works ✅ <strong>Bottomless Brunch Done Right</strong> - Not just prosecco, but craft cocktails, decent food, 90 minutes, £35 ✅ <strong>Board Game Cafés</strong> - Partner with local board game groups, Sunday afternoons, coffee focus...</p>
```

### Expected HTML Output
```html
<h2>Events They Actually Want</h2>
<p>Forget What You Think They Want</p>
<ul>
  <li>❌ Generic quiz nights</li>
  <li>❌ Cheesy themed parties</li>
  <li>❌ "Student nights" with cheap shots</li>
  <li>❌ DJ playing music from 2010</li>
</ul>
<p>What Actually Works</p>
<ul>
  <li>✅ <strong>Bottomless Brunch Done Right</strong> - Not just prosecco, but craft cocktails, decent food, 90 minutes, £35</li>
  <li>✅ <strong>Board Game Cafés</strong> - Partner with local board game groups, Sunday afternoons, coffee focus</li>
  <li>✅ <strong>Small Plate Sundays</strong> - Tapas-style sharing, encourages groups, lower price point</li>
  <li>✅ <strong>Work From Pub Days</strong> - Fast WiFi, coffee, lunch deals, quiet background music till 5pm</li>
</ul>
```

---

*Report prepared for senior developer review. All code snippets are from the actual implementation. The issue is blocking proper display of all blog content on the production site.*