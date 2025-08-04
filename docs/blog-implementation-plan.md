# The Licensee's Guide - Blog Implementation Plan

## Overview
"The Licensee's Guide" is Orange Jelly's blog focused on providing practical, proven pub marketing advice from one licensee to another. It targets pub owners searching for solutions to specific problems.

## Blog Architecture

### URL Structure
- Main blog: `/licensees-guide`
- Individual posts: `/licensees-guide/[slug]`
- Category pages: `/licensees-guide/category/[category]`

### Categories
1. **Empty Pub Solutions** (`/empty-pub-solutions`)
2. **Social Media** (`/social-media`)
3. **Competition** (`/competition`)
4. **Food & Drink** (`/food-drink`)
5. **Events & Promotions** (`/events-promotions`)

## Content Strategy

### Initial Posts (Priority Order)
1. **"The Licensee's Guide to Fixing Your Failing Quiz Night"**
   - URL: `/licensees-guide/fix-failing-quiz-night`
   - Target: "pub quiz not working", "quiz night ideas"

2. **"The Licensee's Guide to TikTok (Is It Worth Your Time?)"**
   - URL: `/licensees-guide/pubs-on-tiktok`
   - Target: "should pubs use tiktok", "pub social media"

3. **"The Licensee's Guide to Competing with Wetherspoons"**
   - URL: `/licensees-guide/compete-with-wetherspoons`
   - Target: "compete with wetherspoons", "chain pub competition"

4. **"The Licensee's Guide to Food Photography That Sells"**
   - URL: `/licensees-guide/food-photography-that-sells`
   - Target: "pub food photos", "menu photography"

5. **"The Licensee's Guide to Monday Night Promotions"**
   - URL: `/licensees-guide/monday-night-promotions`
   - Target: "monday pub promotions", "quiet weeknight ideas"

## Technical Implementation

### Required Components

1. **BlogLayout Component**
   - Consistent layout for all blog pages
   - Breadcrumbs
   - Sidebar for categories/recent posts
   - Newsletter signup

2. **BlogPostCard Component**
   - Featured image
   - Title, excerpt
   - Author, date, reading time
   - Category badge

3. **BlogPost Component**
   - MDX support for rich content
   - Table of contents
   - Social sharing
   - Related posts
   - Author bio
   - CTA to services

4. **CategoryList Component**
   - Shows all categories
   - Post count per category
   - Active state

5. **RelatedPosts Component**
   - 3 related posts
   - Based on category/tags
   - Excludes current post

6. **AuthorInfo Component**
   - Peter's photo
   - Brief bio
   - Link to about page
   - Credentials (pub owner)

7. **ShareButtons Component**
   - WhatsApp
   - Facebook
   - Twitter/X
   - Copy link

8. **TableOfContents Component**
   - Auto-generated from headings
   - Sticky sidebar on desktop
   - Collapsible on mobile

### Data Structure

```typescript
interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // MDX
  author: Author;
  publishedDate: string;
  updatedDate?: string;
  category: Category;
  tags: string[];
  featuredImage: {
    src: string;
    alt: string;
  };
  seo: {
    metaTitle?: string;
    metaDescription: string;
    keywords: string[];
  };
  readingTime: number; // in minutes
}

interface Author {
  name: string;
  role: string;
  bio: string;
  image: string;
}

interface Category {
  slug: string;
  name: string;
  description: string;
}
```

## SEO Requirements

### Main Blog Page
- **Title**: "The Licensee's Guide | Real Pub Marketing Advice | Orange Jelly"
- **Meta Description**: "Practical pub marketing advice from a real licensee. No fluff, just proven strategies that fill empty tables and grow your pub."
- **H1**: "The Licensee's Guide to Pub Success"

### Individual Posts
- **Title Pattern**: "[Post Title] | The Licensee's Guide"
- **Meta Description**: Problem → Solution → Real experience → Action
- **Schema**: Article, Author, BreadcrumbList
- **Open Graph**: Auto-generated images with title

### Technical SEO
- Canonical URLs for all pages
- XML sitemap integration
- RSS feed at `/licensees-guide/feed.xml`
- Pagination with rel="prev/next"
- Category pages with unique meta descriptions

## Design Requirements

### Blog Listing Page
- Hero section with guide branding
- Featured post (latest or pinned)
- Grid of recent posts (6-9 per page)
- Category filter
- Pagination
- Newsletter signup

### Individual Post Page
- Progress indicator on scroll
- Sticky table of contents (desktop)
- Highlighted quotes/tips
- Before/after images
- Clear CTAs throughout
- Related posts at bottom

### Mobile Considerations
- Touch-friendly navigation
- Collapsible table of contents
- Optimized images
- Easy social sharing
- Readable typography (16px minimum)

## Content Guidelines

### Writing Style
- Conversational, licensee-to-licensee
- UK spelling and pub terminology
- Specific examples from The Anchor
- No corporate jargon
- Direct, actionable advice

### Post Structure
1. Hook - State the problem
2. Why it matters - Cost/impact
3. What we tried - Real experience
4. What worked - Specific solution
5. How to implement - Step by step
6. Results - Real numbers
7. Next steps - CTA to services

### Media Requirements
- Featured image: 1200x630px
- In-post images: 800px max width
- Before/after photos where relevant
- Screenshots of real results
- Infographics for complex topics

## Performance Targets

### SEO Metrics
- Rank page 1 for 10+ target keywords within 6 months
- Organic traffic growth of 50% in 6 months
- Average position improvement of 20+ places

### Engagement Metrics
- Average time on page: 3+ minutes
- Bounce rate: <60%
- Pages per session: 2+
- Blog → WhatsApp conversion: 2%+

### Technical Performance
- Page load: <3 seconds
- Core Web Vitals: All green
- Mobile score: 90+
- Accessibility: WCAG AA compliant

## Launch Checklist

- [ ] Blog infrastructure setup
- [ ] First 5 posts written and optimized
- [ ] Category pages created
- [ ] Newsletter integration ready
- [ ] Social sharing tested
- [ ] Schema markup validated
- [ ] XML sitemap updated
- [ ] Analytics tracking configured
- [ ] Internal linking strategy implemented
- [ ] Mobile experience tested

## Future Enhancements

### Phase 2
- Search functionality
- Popular posts widget
- Comment system (moderated)
- Email notifications for new posts

### Phase 3
- Guest posts from other licensees
- Video content integration
- Downloadable resources
- Member-only content area