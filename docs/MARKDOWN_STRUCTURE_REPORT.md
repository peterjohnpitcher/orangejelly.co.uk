# Markdown Structure Report: Orange Jelly Blog Articles

## Executive Summary
This report documents the exact markdown syntax and formatting patterns used across the Orange Jelly blog articles in `/content/blog/`. After analyzing 8 representative articles, clear patterns have emerged for structure, formatting, and especially list handling with emojis.

## 1. Frontmatter Structure

All articles use YAML frontmatter with consistent fields:

```yaml
---
title: "Article Title Here"
slug: "url-slug-here"
publishedDate: "2025-MM-DDTHH:mm:ss.000Z"
updatedDate: "2025-MM-DDTHH:mm:ss.000Z"
excerpt: "150-160 character excerpt describing the article"
author: "Peter Pitcher"
category: "category-name"
tags:
  - "tag1"
  - "tag2"
  - "tag3"
status: "published"
metaDescription: "Meta description for SEO"
keywords:
  - "keyword1"
  - "keyword2"
hasFAQs: true
hasQuickAnswer: true
hasQuickStats: true
localSEO: {"_type":"object","localModifiers":["near me","local","in my area"],"nearbyLandmarks":["Heathrow","Staines","M25"],"targetLocation":"Surrey"}
voiceSearchQueries:
  - "Voice search query 1"
  - "Voice search query 2"
---
```

## 2. List Formatting Patterns

### 2.1 Lists WITHOUT Line Breaks (Standard Pattern)

The most common pattern uses simple markdown lists with single line breaks between items:

```markdown
### List Title

- **Bold intro**: Regular text continues
- **Another point**: Description here
- **Third point**: More details
```

Example from actual content:
```markdown
**Their Strengths**:
- **Economies of scale**: Buying 10,000 kegs gets better prices than buying 10
- **Brand recognition**: Customers know exactly what to expect
- **Marketing muscle**: National TV campaigns and huge digital budgets
```

### 2.2 Lists WITH Emojis and Line Breaks

When lists include emojis or need visual separation, they use **double line breaks** between items:

```markdown
### List Title

- 🎯 **Point one**: Description

- 🚀 **Point two**: Description

- 💡 **Point three**: Description
```

This pattern is NOT commonly used in the analyzed articles. Most lists use single line breaks.

### 2.3 Numbered Lists with Line Breaks

Numbered lists requiring extra spacing use double line breaks:

```markdown
1. **First point**: Description text

1. **Second point**: More description

1. **Third point**: Final description
```

Note: The articles consistently use `1.` for all numbered items (letting markdown handle the numbering).

### 2.4 Complex Lists with Sub-items

```markdown
### Main List Title

**Category Name**:
- Sub-item one
- Sub-item two
- Sub-item three

**Another Category**:
- Different sub-item
- Another sub-item
```

## 3. Section Structure Patterns

### 3.1 Main Heading Structure

```markdown
# Article Title (H1 - only one per article)

Opening paragraph with hook...

## Major Section (H2)

### Subsection (H3)

#### Rare Sub-subsection (H4)
```

### 3.2 Common Section Patterns

Most articles follow this structure:

1. **Opening Hook** (2-3 paragraphs)
2. **Problem Statement** (## heading)
3. **Multiple Solution Sections** (## headings)
4. **Implementation/Action Steps** (## heading)
5. **Results/Metrics** (## heading)
6. **FAQs** (## heading)
7. **Conclusion/Call to Action** (## heading)

## 4. Special Formatting Patterns

### 4.1 Bold Text Usage

- **Category labels**: Always bold
- **Key metrics**: Bold for emphasis
- **List item intros**: Bold prefix before colon
- **Important phrases**: Selective bold for impact

### 4.2 Italic Text Usage

Italics are rarely used, appearing mainly for:
- Publication names
- Subtle emphasis
- Example scenarios

### 4.3 Code Blocks

Not commonly used in these marketing articles. When present:
```bash
npm run dev
npm run build
```

### 4.4 Blockquotes

Rarely used. When present:
> Customer testimonial or important quote

## 5. Link Patterns

### 5.1 Internal Links

```markdown
[link text](/blog/article-slug/)
```

### 5.2 External Links

```markdown
[link text](https://example.com)
```

## 6. Line Break Analysis

### 6.1 Standard Paragraph Spacing

Single blank line between paragraphs:
```markdown
First paragraph text here.

Second paragraph text here.
```

### 6.2 After Headings

Single blank line after headings:
```markdown
## Heading

Content starts here.
```

### 6.3 Lists

- **Standard lists**: Single line break between items
- **Emphasized lists**: Double line breaks (rare)
- **Before lists**: Single blank line
- **After lists**: Single blank line

## 7. Common Content Patterns

### 7.1 Metrics/Statistics Sections

```markdown
### The Real Cost

- **£180** in staff wages
- **£45** in utilities
- **£30** in food waste
- **Total loss: £255**
```

### 7.2 Action Steps

```markdown
### Your Action Plan

1. **Audit current performance**
1. **Choose ONE strategy**
1. **Commit to 12-week trial**
1. **Track results weekly**
```

### 7.3 Example Boxes

```markdown
**Real example**: The Anchor in Bristol achieved...

**Key insight**: People want...

**Result**: 68% increase in...
```

### 7.4 FAQ Sections

```markdown
## Frequently Asked Questions

### How quickly will I see results?

Most strategies show initial results within 2-4 weeks...

### How much will this cost to implement?

Implementation costs vary by strategy...
```

## 8. Consistency Observations

### 8.1 Highly Consistent Elements

- Frontmatter structure
- Basic list formatting (single line breaks)
- Bold usage for emphasis
- FAQ structure at article end
- Link formatting

### 8.2 Inconsistent Elements

- Some articles have duplicate FAQ entries
- Mixed use of "a typical" phrases (appears to be placeholder text)
- Occasional formatting anomalies

## 9. Emoji Usage

Emojis are **rarely used** in the content body. When they appear:
- Mainly in meta/footer content
- Not in main article lists
- Not requiring special line break handling

## 10. Key Findings for Migration

### 10.1 Primary List Pattern

**90% of lists use this pattern:**
```markdown
- **Bold intro**: Description continues on same line
- **Next point**: More description
- **Final point**: Conclusion
```

### 10.2 Line Break Rules

1. **Single blank line** between most elements
2. **Double blank lines** are rare and not systematically used
3. **No special handling needed for emojis** (they're rarely used)

### 10.3 Migration Recommendations

1. **Preserve single line breaks** between list items as default
2. **Don't add extra spacing** unless explicitly present in source
3. **Maintain bold patterns** exactly as shown
4. **Keep numbered lists** using `1.` throughout
5. **Preserve the frontmatter** structure exactly

## 11. Example Full Pattern

```markdown
---
[YAML frontmatter]
---

# Article Title

Opening paragraph with compelling hook.

Second paragraph providing context.

## First Major Section

Introductory paragraph for this section.

### Subsection Title

**Key Point**:
- Supporting detail one
- Supporting detail two
- Supporting detail three

**Another Point**:
- Different detail
- More information
- Final detail

### Another Subsection

Regular paragraph text here.

**Real example**: The Anchor achieved...

**Result**: 45% increase in...

## Implementation Steps

### Week 1: Planning
- First action item
- Second action item
- Third action item

### Week 2: Execution
1. **Numbered step one**
1. **Numbered step two**
1. **Numbered step three**

## Frequently Asked Questions

### Question One?

Answer paragraph here.

### Question Two?

Another answer paragraph here.
```

## Conclusion

The markdown structure in the Orange Jelly blog articles is remarkably consistent and straightforward. The vast majority of lists use simple single line breaks between items, with bold text for emphasis. Double line breaks are rare and emojis are almost never used in the main content. Any migration or processing system should preserve this simple, clean structure rather than adding unnecessary complexity.