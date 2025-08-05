# Sanity CMS Integration Documentation

## Overview
This document describes the Sanity CMS proof of concept implementation for the Orange Jelly website. The integration allows content management without code deployments while maintaining the existing Next.js frontend.

## Current Status
✅ **Completed:**
- Schema definitions for all content types
- Content source abstraction layer  
- Sample data migration (3 blog posts)
- Preview functionality setup
- CLI scripts for content creation
- Fallback to markdown files when Sanity not configured

🔄 **Next Steps:**
1. Create Sanity project at https://www.sanity.io/
2. Configure environment variables
3. Import sample data
4. Test preview workflow

## Architecture

### Content Source Abstraction
The system uses a content source abstraction layer (`src/lib/content-source.ts`) that:
- Checks if Sanity is configured via environment variables
- Falls back to markdown files if Sanity is not configured
- Provides unified interface for both content sources
- Handles both Portable Text (Sanity) and HTML (markdown) content

### Schema Structure

#### Blog Posts (`blogPost`)
- Title, slug, excerpt
- Content (Portable Text with rich formatting)
- Status (draft/published)
- Author reference
- Category reference
- Tags array
- Featured image with hotspot
- SEO metadata
- Publishing dates

#### Services (`service`)
- Title and description
- Problem statement
- Deliverable
- Time estimate
- Price breakdown (transparent pricing)
- Features list
- Highlight flag
- Real examples from The Anchor

#### Case Studies (`caseStudy`)
- Title and subtitle
- Problem/Failed/Solution structure
- Results array
- Time investment
- Key learnings
- Customer quotes

#### Supporting Types
- **Author**: Name, bio, image, role
- **Category**: Name, slug, description
- **Site Settings**: Business info, pricing, metrics
- **FAQ**: Question/answer pairs by page

## Environment Configuration

### Required Environment Variables
```bash
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-write-token  # For content creation
SANITY_PREVIEW_SECRET=your-preview-secret  # For preview mode
```

### Demo Mode
When `NEXT_PUBLIC_SANITY_PROJECT_ID` is not set or equals "demo-project", the system automatically falls back to markdown files.

## Content Migration

### Migration Script
Located at `scripts/migrate-to-sanity.ts`, this script:
1. Reads existing markdown blog posts
2. Converts markdown to Portable Text format
3. Generates JSON files for import
4. Creates sample author and categories

### Running Migration
```bash
# Generate migration data
npx tsx scripts/migrate-to-sanity.ts

# Import to Sanity (after project creation)
npx sanity dataset import sanity-studio/data/blog-posts.json production
```

### Sample Data Generated
- 3 blog posts (first 3 from content/blog/)
- Author: Peter Pitcher
- 5 categories matching existing structure
- Site settings with real metrics

## Content Creation Workflow

### CLI Tool for Claude
The `scripts/create-content.ts` script provides a CLI interface for content creation:

```bash
# Run the CLI
npx tsx scripts/create-content.ts

# Available actions:
# 1. Create new blog post draft
# 2. Update existing blog post
# 3. List draft posts
```

### Workflow Steps
1. **Claude creates draft**: Uses CLI to create draft content
2. **Preview generation**: Draft available at `/api/preview?secret=XXX&slug=YYY`
3. **Peter reviews**: Reviews content in preview mode
4. **Approval/edits**: Either approves or requests changes
5. **Publishing**: Changes status from draft to published
6. **ISR updates**: Site regenerates pages without deployment

## Preview Functionality

### Preview API Route
`src/app/api/preview/route.ts` handles:
- Secret validation
- Draft mode enabling
- Redirect to preview URL

### Preview URL Format
```
/api/preview?secret=YOUR_SECRET&slug=post-slug&type=blogPost
```

### Exiting Preview Mode
POST request to `/api/preview` disables draft mode.

## Component Integration

### Portable Text Rendering
`src/components/PortableTextContent.tsx` handles:
- Block content (paragraphs, headings, quotes)
- Lists (bullet, numbered)
- Marks (bold, italic, code, links)
- Images with captions
- Code blocks

### Content Type Detection
Blog components check `isPortableText` flag to render:
- Portable Text content using PortableTextContent component
- Markdown HTML using dangerouslySetInnerHTML

## Testing the Integration

### 1. Local Testing (Without Sanity)
```bash
npm run dev
# Site continues to work with markdown files
```

### 2. With Sanity (After Setup)
```bash
# Set environment variables
echo "NEXT_PUBLIC_SANITY_PROJECT_ID=your-id" >> .env.local

# Run development
npm run dev

# Content now loads from Sanity
```

### 3. Preview Testing
```bash
# Create draft content
npx tsx scripts/create-content.ts

# Access preview
open "http://localhost:3000/api/preview?secret=YOUR_SECRET&slug=draft-slug"
```

## Benefits of This Approach

### For Peter (Owner)
- ✅ Review content before publishing
- ✅ No code deployments for content updates
- ✅ Preview drafts before going live
- ✅ Single user access (no team complexity)
- ✅ Free tier available

### For Claude (Content Creator)
- ✅ CLI access for automation
- ✅ Create drafts programmatically
- ✅ Structured content format
- ✅ No direct publishing (safety)

### Technical Benefits
- ✅ Graceful fallback to markdown
- ✅ No breaking changes to existing site
- ✅ ISR for instant updates
- ✅ Type-safe schemas
- ✅ Portable content format

## Limitations & Considerations

### Current Limitations
- Studio UI not fully configured (needs Sanity project)
- Image handling requires Sanity CDN setup
- Rich text editing limited in CLI

### Future Enhancements
1. **Sanity Studio**: Web interface for content editing
2. **Webhook Integration**: Auto-rebuild on publish
3. **Asset Management**: Direct image uploads
4. **Scheduling**: Time-based publishing
5. **Version History**: Track content changes

## Troubleshooting

### Common Issues

#### "Cannot find module 'sanity'"
- This is expected in demo mode
- Install `sanity` package only when ready to use Sanity

#### Content not updating
- Check ISR cache settings
- Verify environment variables
- Clear Next.js cache: `rm -rf .next`

#### Preview not working
- Verify SANITY_PREVIEW_SECRET matches
- Check draft mode is enabled
- Ensure slug exists in drafts

## Next Steps for Production

1. **Create Sanity Project**
   ```bash
   npm create sanity@latest
   # Choose: Create new project
   # Name: orange-jelly-cms
   ```

2. **Configure Environment**
   - Add project ID to .env.local
   - Generate API tokens
   - Set preview secret

3. **Import Data**
   ```bash
   npx sanity dataset import sanity-studio/data/blog-posts.json production
   ```

4. **Deploy Studio** (Optional)
   ```bash
   npx sanity deploy
   # Access at: https://orange-jelly.sanity.studio
   ```

5. **Test Workflow**
   - Create draft via CLI
   - Review in preview
   - Publish and verify ISR

## Conclusion

This Sanity integration provides a robust CMS solution that:
- Maintains existing site functionality
- Enables content updates without deployments
- Provides review workflow for quality control
- Supports both CLI and web interfaces
- Scales from free tier to enterprise

The abstraction layer ensures the site continues to work whether using Sanity or markdown files, providing flexibility during the transition period.