# CLAUDE.md - Orange Jelly Website Development Guide

This document contains important information for Claude when working on the Orange Jelly website.

## Project Overview

Orange Jelly Limited is a business that helps UK pubs use AI tools for marketing and business improvement. The website is built with:
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Schema.org structured data

## Key Business Context

- **Founder**: Peter Pitcher (runs The Anchor pub in Stanwell Moor)
- **Target Audience**: UK pub licensees struggling with empty tables and time management
- **Main Services**: Empty pub recovery, menu makeovers, social media automation, business analysis
- **Key Partnerships**: Greene King and British Institute of Innkeeping (BII)

## Schema Implementation

### Implemented Schema Types

1. **Organization Schema** (in layout.tsx)
   - Enhanced with founder details, awards, founding date
   - Includes contact points and service offerings

2. **FAQ Schema** 
   - Implemented on all major pages
   - Problem-focused Q&As that address customer pain points

3. **BlogPosting Schema**
   - Automatically added to all blog posts in /licensees-guide/
   - Includes speakable sections for voice search

4. **Product Schema**
   - Used for service packages (Empty Pub Recovery, Menu Makeover)
   - Includes pricing and aggregate ratings when available

5. **HowTo Schema**
   - Added to solution pages with step-by-step guides
   - Includes time estimates and required tools/supplies

6. **CollectionPage Schema**
   - Used on blog listing and category pages
   - Helps search engines understand content hierarchy

7. **Speakable Schema**
   - Added to key content sections for voice search optimization
   - Focuses on hero sections and value propositions

### Schema Components Available

- `/src/components/StructuredData.tsx` - Main schema components
- `/src/components/BlogPostingSchema.tsx` - Blog post schema
- `/src/components/SpeakableContent.tsx` - Voice search optimization
- `/src/components/ProductSchema.tsx` - Product/service schema
- `/src/components/CollectionPageSchema.tsx` - Collection pages
- `/src/components/EventSchema.tsx` - Event schema (for future use)
- `/src/components/VideoObjectSchema.tsx` - Video schema (for future use)
- `/src/components/AggregateRatingSchema.tsx` - Rating schema (only use with real ratings)

### Important Schema Guidelines

1. **Never add fake data** - Only use real reviews, ratings, and testimonials
2. **Test with Google's Rich Results Test** - Validate all schema before deployment
3. **Keep schema up-to-date** - Update prices, hours, and details as they change
4. **Use appropriate schema types** - Match schema to actual content type

## Development Best Practices

### When Adding New Features

1. Check existing components first - reuse before creating new
2. Follow the established patterns for styling and structure
3. Ensure all new pages have appropriate meta tags and schema
4. Test on mobile first - most pub owners check on phones

### Common Tasks

**Running the development server:**
```bash
npm run dev
```

**Building for production:**
```bash
npm run build
```

**Type checking:**
```bash
npm run type-check
```

**Linting:**
```bash
npm run lint
```

### Writing Style

- Direct and conversational
- Focus on problems and solutions
- Use "you" to address the reader
- Avoid corporate jargon
- Include specific examples from The Anchor

### Important URLs

- Production: https://orangejelly.co.uk
- The Anchor: https://the-anchor.pub
- WhatsApp: Use the helper function in lib/constants.ts

## Future Enhancements

1. Add schema validation tests
2. Set up Google Search Console monitoring for rich results
3. Implement review collection system for AggregateRating
4. Add more case studies with detailed metrics
5. Create video content with VideoObject schema

## Contact

For questions about the codebase or business logic, the founder Peter Pitcher can provide context about the pub industry and specific customer needs.