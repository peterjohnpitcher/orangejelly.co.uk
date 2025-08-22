# CMS Migration Plan - Orange Jelly Website

## Executive Summary
Migrating Orange Jelly website from static markdown files to Sanity.io CMS while maintaining the existing Next.js frontend. This will enable content updates without code deployments while preserving the ability to create content programmatically via CLI.

## Current State Analysis

### Existing Content Structure
- **Blog Posts**: 25 markdown files in `/content/blog/`
- **Static Data**: Business metrics, pricing, services hardcoded in components
- **Media**: Images stored in `/public/images/`
- **Deployment**: Every content change requires a Git commit and deployment

### Content Update Frequency
- **Blog Posts**: Weekly updates (created by AI assistant, reviewed by Peter)
- **Service Information**: Monthly updates
- **Metrics/Results**: Quarterly updates
- **Events**: As needed

## Proposed Solution: Sanity.io

### Why Sanity?
1. **Free Tier**: Sufficient for Orange Jelly's needs (3 users, 100k API calls/month)
2. **CLI Access**: Full programmatic content creation capabilities
3. **Preview System**: Built-in preview before publishing
4. **ISR Support**: Content updates without redeployment using Next.js ISR
5. **Version Control**: Revision history and rollback capabilities

## Implementation Plan

### Phase 1: Setup & Configuration (Day 1)

#### 1.1 Sanity Project Setup
```bash
# Install Sanity CLI
npm install -g @sanity/cli

# Initialize Sanity project
sanity init --project-id orangejelly --dataset production

# Project structure
orangejelly-cms/
├── schemas/
│   ├── blog-post.js
│   ├── service.js
│   ├── testimonial.js
│   ├── event.js
│   └── site-settings.js
├── desk/
│   └── structure.js
└── scripts/
    └── migrate-content.js
```

#### 1.2 Content Schemas

**Blog Post Schema**
```javascript
{
  name: 'blogPost',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', validation: Rule => Rule.required() },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'excerpt', type: 'text', rows: 3 },
    { name: 'content', type: 'markdown' },
    { name: 'publishedDate', type: 'datetime' },
    { name: 'category', type: 'reference', to: [{ type: 'category' }] },
    { name: 'tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'featuredImage', type: 'image' },
    { name: 'seo', type: 'object', fields: [
      { name: 'metaTitle', type: 'string' },
      { name: 'metaDescription', type: 'text' },
      { name: 'keywords', type: 'array', of: [{ type: 'string' }] }
    ]},
    { name: 'status', type: 'string', options: {
      list: [
        { title: 'Draft', value: 'draft' },
        { title: 'Review', value: 'review' },
        { title: 'Approved', value: 'approved' },
        { title: 'Published', value: 'published' }
      ]
    }}
  ]
}
```

**Service Schema**
```javascript
{
  name: 'service',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'problem', type: 'string' },
    { name: 'deliverable', type: 'text' },
    { name: 'description', type: 'text' },
    { name: 'features', type: 'array', of: [{ type: 'string' }] },
    { name: 'timeEstimate', type: 'string' },
    { name: 'priceBreakdown', type: 'string' },
    { name: 'price', type: 'string' }
  ]
}
```

### Phase 2: Content Migration (Day 2)

#### 2.1 Migration Script
```javascript
// scripts/migrate-content.js
const fs = require('fs');
const matter = require('gray-matter');
const sanityClient = require('@sanity/client');

const client = sanityClient({
  projectId: 'orangejelly',
  dataset: 'production',
  token: process.env.SANITY_TOKEN,
  useCdn: false
});

async function migrateBlogPosts() {
  const blogFiles = fs.readdirSync('./content/blog');
  
  for (const file of blogFiles) {
    const content = fs.readFileSync(`./content/blog/${file}`, 'utf8');
    const { data, content: markdown } = matter(content);
    
    await client.create({
      _type: 'blogPost',
      title: data.title,
      slug: { current: file.replace('.md', '') },
      excerpt: data.excerpt,
      content: markdown,
      publishedDate: data.publishedDate,
      category: data.category,
      tags: data.tags,
      status: 'published',
      seo: data.seo
    });
  }
}
```

#### 2.2 Content to Migrate
- [ ] 25 blog posts from `/content/blog/`
- [ ] Service descriptions from `/src/app/services/page.tsx`
- [ ] Success metrics from `/src/app/results/page.tsx`
- [ ] Business information from `/src/lib/constants.ts`

### Phase 3: Next.js Integration (Day 3)

#### 3.1 Sanity Client Setup
```typescript
// lib/sanity.client.ts
import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
});
```

#### 3.2 ISR Configuration
```typescript
// app/licensees-guide/[slug]/page.tsx
export const revalidate = 60; // Revalidate every 60 seconds

export async function generateStaticParams() {
  const posts = await client.fetch(`*[_type == "blogPost" && status == "published"]`);
  return posts.map((post) => ({ slug: post.slug.current }));
}
```

#### 3.3 Preview Configuration
```typescript
// app/api/preview/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');
  
  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 });
  }
  
  // Enable Draft Mode and redirect
  draftMode().enable();
  redirect(`/licensees-guide/${slug}`);
}
```

### Phase 4: Workflow Setup (Day 4)

#### 4.1 CLI Content Creation for AI Assistant
```bash
# Create draft blog post
sanity documents create \
  --type blogPost \
  --id draft-quiz-night-strategies \
  --replace '{
    "title": "10 Quiz Night Strategies That Pack Pubs",
    "status": "draft",
    "content": "..."
  }'

# Update to review status
sanity documents patch draft-quiz-night-strategies \
  --set 'status="review"'
```

#### 4.2 Peter's Review Workflow
1. **Access Studio**: studio.orangejelly.co.uk
2. **Review Queue**: Dashboard showing all "review" status posts
3. **Preview**: Live preview pane showing exact rendering
4. **Edit**: Make changes if needed
5. **Approve**: Change status to "approved"
6. **Publish**: Change status to "published" (goes live immediately)

#### 4.3 Automation Scripts
```javascript
// scripts/weekly-content.js
// AI Assistant runs this weekly to create blog drafts
const createWeeklyContent = async () => {
  const topics = await generateTopics(); // AI generates topics
  
  for (const topic of topics) {
    const content = await generateBlogPost(topic); // AI writes post
    await client.create({
      _type: 'blogPost',
      ...content,
      status: 'review'
    });
  }
  
  // Notify Peter via WhatsApp
  await sendNotification('3 new blog posts ready for review');
};
```

## Technical Requirements

### Dependencies to Add
```json
{
  "dependencies": {
    "@sanity/client": "^6.x",
    "@sanity/image-url": "^1.x",
    "next-sanity": "^9.x"
  },
  "devDependencies": {
    "@sanity/cli": "^3.x",
    "gray-matter": "^4.x"
  }
}
```

### Environment Variables
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=orangejelly
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk... (for write access)
SANITY_PREVIEW_SECRET=random-secret
```

### Hosting Setup
- **Sanity Studio**: Deploy to studio.orangejelly.co.uk (Vercel subdomain)
- **API**: Hosted by Sanity (included in free tier)
- **CDN**: Sanity's global CDN (included)

## Migration Checklist

### Pre-Migration
- [ ] Backup current website
- [ ] Document all content types
- [ ] Create Sanity project
- [ ] Set up schemas
- [ ] Test migration script locally

### Migration Day
- [ ] Run migration script
- [ ] Verify all content migrated
- [ ] Test preview functionality
- [ ] Configure ISR
- [ ] Update environment variables

### Post-Migration
- [ ] Train Peter on Studio interface
- [ ] Document workflow
- [ ] Create backup strategy
- [ ] Monitor API usage
- [ ] Set up alerts for errors

## Rollback Plan

If issues arise:
1. **Immediate**: Revert to markdown branch (keep both systems parallel initially)
2. **Content**: Export from Sanity back to markdown
3. **Code**: Git revert to pre-migration commit
4. **DNS**: No changes needed (studio is subdomain)

## Success Metrics

### Week 1 Post-Migration
- [ ] 3 blog posts created via CLI
- [ ] All posts reviewed and published via Studio
- [ ] Zero deployment needed for content updates
- [ ] Page load times maintained or improved

### Month 1 Post-Migration
- [ ] 12+ blog posts published
- [ ] Peter comfortable with Studio interface
- [ ] API usage < 50% of free tier limit
- [ ] No stability issues reported

## Cost Analysis

### Current Costs
- Hosting: £0 (Vercel free tier)
- CMS: £0 (markdown files)
- Total: £0/month

### Post-Migration Costs
- Hosting: £0 (Vercel free tier)
- Sanity: £0 (free tier: 3 users, 100k API calls)
- Total: £0/month

### When Costs Would Increase
- Over 100k API calls/month (unlikely with ISR caching)
- Over 3 users (currently just Peter)
- Over 1GB assets (currently ~100MB)

## Risk Assessment

### Low Risk
- Content migration (reversible)
- API integration (well-documented)
- Preview setup (standard feature)

### Medium Risk
- Learning curve for Peter (mitigated by training)
- API rate limits (mitigated by ISR caching)
- Schema changes (mitigated by versioning)

### High Risk
- None identified

## Timeline

### Week 1 (Setup)
- Day 1: Create Sanity project and schemas
- Day 2: Migrate existing content
- Day 3: Integrate with Next.js
- Day 4: Configure workflows
- Day 5: Testing and training

### Week 2 (Parallel Run)
- Run both systems in parallel
- Create new content in Sanity
- Monitor performance
- Gather feedback

### Week 3 (Cutover)
- Disable markdown pipeline
- Full production on Sanity
- Document lessons learned

## Next Steps

1. **Get approval** on this plan
2. **Create Sanity account** (free)
3. **Build proof of concept** with 3 blog posts
4. **Demo to Peter** for feedback
5. **Proceed with full migration** if approved

---

*Document created: August 2025*
*Last updated: August 2025*
*Status: PENDING APPROVAL*