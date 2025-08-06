# Sanity CMS Migration Plan - Orange Jelly Website

## Overview
This document outlines the comprehensive plan for migrating all content from the Orange Jelly website codebase to Sanity CMS. Currently, blog posts have been migrated, but significant content remains hardcoded throughout the application.

## Migration Objectives
1. **Centralize all content** in Sanity CMS for easier management
2. **Enable non-technical editing** of all website content
3. **Improve content consistency** across the site
4. **Reduce deployment needs** for content changes
5. **Enable content versioning** and preview capabilities

## Current State Analysis

### Already Migrated
- ✅ Blog posts (25 articles)
- ✅ Blog categories
- ✅ Author profiles

### Content Inventory by Location

#### 1. Constants and Configuration (`/src/lib/constants.ts`)
**Current Structure**: TypeScript objects
**Content Types**:
- Contact information (phone, email, WhatsApp, address)
- Company details (name, tagline, registration)
- Pricing configuration (hourly rate, VAT status)
- WhatsApp message templates
- Trust messages and response times
- Success metrics from The Anchor
- Service feature lists

**Migration Priority**: HIGH
**Estimated Items**: 50+ individual data points

#### 2. Homepage Content (`/src/lib/content/home-content.ts`)
**Current Structure**: TypeScript arrays and objects
**Content Types**:
- FAQs (10 questions)
- Problem cards (6 common pub problems)
- Feature list (4 key features)
- Success metrics (4 metrics)
- Mini case study

**Migration Priority**: HIGH
**Estimated Items**: 25+ content blocks

#### 3. Service Pages (`/src/app/services/page.tsx`)
**Current Structure**: Inline TypeScript objects
**Content Types**:
- 6 detailed service descriptions
  - Quiz Night Rescue
  - Social Media That Works
  - Menu Makeover
  - Midweek Marketing Magic
  - Event Planning That Pays
  - Staff Training Revolution
- 16 service-specific FAQs
- 6 training package options
- 20 AI help ideas (4 categories × 5 items)

**Migration Priority**: HIGH
**Estimated Items**: 48+ content items

#### 4. About Page (`/src/app/about/page.tsx`)
**Current Structure**: JSX with embedded content
**Content Types**:
- Company story (multiple paragraphs)
- Journey timeline (4 milestones)
- 12 comprehensive FAQs
- 6 achievement metrics
- Promise lists (will do/won't do)
- Personal story sections

**Migration Priority**: HIGH
**Estimated Items**: 30+ content blocks

#### 5. Results/Case Studies (`/src/app/results/page.tsx`)
**Current Structure**: Detailed TypeScript objects
**Content Types**:
- 6 comprehensive case studies, each containing:
  - Problem description
  - Failed attempts
  - Solution implemented
  - Results achieved
  - Time investment
  - Key learnings
  - Customer quote
- Bottom line metrics

**Migration Priority**: HIGH
**Estimated Items**: 42+ content elements

#### 6. Contact Page (`/src/app/contact/page.tsx`)
**Current Structure**: Mixed JSX and objects
**Content Types**:
- 12 urgent help FAQs
- Timeline expectations (3 timeframes)
- Preparation guide (3 categories)
- How we work (3 approach cards)
- 10 common concerns with responses
- 4 pub type success stories

**Migration Priority**: MEDIUM
**Estimated Items**: 35+ content items

#### 7. Landing Pages
**Locations**: 
- `/src/app/empty-pub-solutions/page.tsx`
- `/src/app/pub-marketing-no-budget/page.tsx`

**Content Types**:
- Step-by-step guides
- Landing page FAQs
- Strategy lists
- Template examples
- Weekly action plans

**Migration Priority**: MEDIUM
**Estimated Items**: 40+ content blocks

#### 8. Component-Level Content
**Locations**: Various components in `/src/components/`
**Content Types**:
- Trust indicators (TrustBar, TrustBadges)
- Partnership information
- Related link clusters
- CTA messages
- Footer content

**Migration Priority**: MEDIUM
**Estimated Items**: 25+ elements

#### 9. Metadata and SEO Content
**Locations**: Throughout page components
**Content Types**:
- Page titles
- Meta descriptions
- Keywords
- Open Graph data
- Structured data content

**Migration Priority**: HIGH
**Estimated Items**: 50+ metadata elements

## Content Relationships Map

```
siteSettings
├── contact
├── company
├── pricing
├── socialMedia
└── defaultMetadata

service
├── pricing (references siteSettings.pricing)
├── features[]
├── faqs[] (relationship to faq)
└── caseStudies[] (relationship to caseStudy)

caseStudy
├── service (relationship)
├── metrics[]
└── testimonial

faq
├── category (enum)
├── page (enum)
└── relatedServices[] (relationship)

landingPage
├── faqs[] (relationship to faq)
├── contentBlocks[]
└── cta (relationship to ctaSettings)
```

## Migration Challenges

### 1. Computed Content
- WhatsApp URLs generated from templates
- Pricing calculations with VAT
- Dynamic copyright years

### 2. Component Integration
- Content mixed with presentation logic
- Conditional content based on props
- Styled content within components

### 3. Content Duplication
- Same metrics appear in multiple places
- Contact info referenced throughout
- Trust messages repeated

### 4. Type Safety
- Current TypeScript interfaces need mapping
- Maintaining type safety with Sanity data
- Runtime validation requirements

## Proposed Sanity Schema Structure

### Core Schemas

#### 1. siteSettings (Singleton)
```
- businessName
- tagline
- contact (object)
  - email
  - phone
  - whatsapp
  - address
- pricing (object)
  - hourlyRate
  - currency
  - vatRate
  - includesVAT
- metrics (array)
  - label
  - value
  - description
- socialMedia (object)
```

#### 2. service
```
- title
- slug
- problem
- solution
- description
- features (array)
- pricing (object)
- timeEstimate
- example (portable text)
- faqs (reference to faq[])
- relatedCaseStudies (reference to caseStudy[])
- order (number)
```

#### 3. caseStudy
```
- title
- slug
- client
- problem (portable text)
- failedAttempts (array)
- solution (portable text)
- results (array of metrics)
- timeInvestment
- learnings (array)
- quote (object)
  - text
  - author
  - role
- relatedService (reference)
```

#### 4. faq
```
- question
- answer (portable text)
- category (string)
- page (string)
- isVoiceOptimized (boolean)
- order (number)
```

#### 5. landingPage
```
- title
- slug
- metaDescription
- heroSection (object)
- contentSections (array of blocks)
- faqs (reference to faq[])
- ctaSettings (object)
```

#### 6. contentBlock
```
- name
- type (enum: steps, features, problems, etc.)
- content (portable text or structured data)
- style (object)
```

## Migration Phases

### Phase 1: Foundation (Week 1)
1. Create all Sanity schemas
2. Migrate siteSettings (constants)
3. Migrate services
4. Migrate homepage content
5. Update components to fetch from Sanity

### Phase 2: Content Heavy (Week 2)
1. Migrate all case studies
2. Migrate all FAQ collections
3. Migrate about page content
4. Migrate landing pages
5. Update page components

### Phase 3: Polish (Week 3)
1. Migrate component-level content
2. Migrate metadata/SEO content
3. Set up content relationships
4. Implement preview functionality
5. Clean up hardcoded content

## Technical Implementation Steps

### 1. Schema Creation
- Define all schemas in Sanity Studio
- Set up validation rules
- Configure preview settings
- Establish relationships

### 2. Data Migration
- Export existing content to JSON
- Transform to match Sanity structure
- Import using Sanity CLI
- Verify data integrity

### 3. Code Updates
- Create Sanity queries
- Update components to use Sanity data
- Implement fallbacks
- Maintain TypeScript types

### 4. Testing
- Content accuracy verification
- Performance testing
- SEO impact assessment
- Mobile responsiveness

## Success Metrics
- [ ] All hardcoded content removed from codebase
- [ ] Content editable without deployments
- [ ] Page load performance maintained or improved
- [ ] SEO rankings maintained
- [ ] Type safety preserved
- [ ] Preview functionality working

## Risk Mitigation
1. **Content Loss**: Full backup before migration
2. **SEO Impact**: Maintain all URLs and metadata
3. **Performance**: Implement caching strategy
4. **Downtime**: Phased migration approach
5. **Type Safety**: Generate types from Sanity schemas

## Next Steps
1. Review and approve migration plan
2. Set up Sanity schemas
3. Begin Phase 1 migration
4. Document content editing procedures
5. Train content editors

## Deeper Discovery Findings

### Additional Content Discovered

#### Component-Level Content
1. **Navigation Component** (`/src/components/Navigation.tsx`)
   - 6 navigation menu items with labels
   - WhatsApp default messages
   - Brand tagline: "AI-Powered Pub Marketing"
   - **Migration Priority**: HIGH

2. **SuperFooter Component** (`/src/components/SuperFooter.tsx`)
   - Newsletter signup content
   - 4 problem categories with 12+ links each
   - 6 service descriptions with links
   - 10+ resource links
   - Personal message from Peter
   - **Migration Priority**: HIGH (largest content block)

3. **Error Pages and Messages**
   - 404 page with 6 suggestion cards
   - ErrorBoundary component messages
   - Loading states and UI feedback
   - **Migration Priority**: MEDIUM

4. **Interactive Components**
   - ROI Calculator: All labels, prompts, and result messages
   - Social Proof: 10+ notification messages
   - Trust Badges: 4 badges with titles/subtitles
   - StickyCTA: Persistent call-to-action content
   - **Migration Priority**: MEDIUM

5. **Form Components**
   - Newsletter form messages and states
   - WhatsApp button labels
   - Success/error messages
   - **Migration Priority**: LOW

### Content Relationships Map (Detailed)

```
constants.ts (Central Hub)
├── Used by 20+ components
├── WhatsApp URL generation
├── Price formatting
└── Business information

home-content.ts
├── Homepage FAQs (10)
├── Problem cards (6)
├── Features (4)
└── Metrics (4)

Service Pages
├── Service definitions (6)
├── Service FAQs (16)
├── Training options (6)
└── AI help ideas (20)

Case Studies
├── Detailed stories (6)
├── Metrics per story (5-7)
├── Quotes
└── Time investments

Landing Pages (7 total)
├── Unique FAQs per page
├── Step-by-step guides
├── Strategy lists
└── CTAs

Footer Content
├── Newsletter signup
├── Problem links (12+)
├── Service links (6)
├── Resource links (10+)
└── Trust messages
```

### SEO Content Structure

#### Metadata Patterns
- **Title Pattern**: `${pageTitle} | Orange Jelly`
- **Description Pattern**: Problem + Solution + Real Experience + Price
- **Canonical URLs**: Environment-based with normalization
- **OpenGraph**: Complete with images, type, and locale

#### Structured Data Schemas in Use
1. **Organization** (root schema)
2. **LocalBusiness** (with location)
3. **Service** (with OfferCatalog)
4. **FAQPage** (multiple instances)
5. **HowTo** (step-by-step guides)
6. **BlogPosting** (enhanced with author)
7. **BreadcrumbList** (navigation)
8. **WebPage** (with speakable)

### Dynamic Content Patterns

#### Computed Values
1. **WhatsApp URLs**: Generated with context-specific messages
2. **Reading Time**: Based on content length
3. **Copyright Year**: Currently hardcoded (needs fixing)
4. **Price Display**: With/without VAT based on context
5. **Image URLs**: Some from Sanity, some local

#### Content Dependencies
- **Critical Path**: constants.ts → components → pages
- **Type Safety**: TypeScript interfaces throughout
- **Fallbacks**: Markdown to Sanity for blog posts

### Migration Complexity Analysis

#### High Complexity Items
1. **constants.ts** - Referenced everywhere, needs careful migration
2. **Footer content** - Massive amount of interconnected links
3. **Service definitions** - Complex objects with relationships
4. **Dynamic URL generation** - Needs CMS field for templates

#### Medium Complexity Items
1. **FAQs** - Multiple collections, different schemas
2. **Case studies** - Rich content with metrics
3. **Landing pages** - SEO-focused with specific structure
4. **Navigation** - Simple but critical for site function

#### Low Complexity Items
1. **Static messages** - Error pages, form labels
2. **Trust badges** - Simple key-value pairs
3. **Newsletter content** - Limited scope
4. **UI text** - Button labels, loading states

### Final Content Inventory

**Total Content Items to Migrate**: ~500+ individual pieces
- **Configuration/Settings**: 50+ items
- **Marketing Content**: 200+ blocks
- **UI/UX Text**: 100+ labels/messages
- **SEO/Metadata**: 50+ entries
- **Media Assets**: 30+ images (content-related)

### Recommended Sanity Schema Count
- **15 main schemas** (detailed above)
- **5 object schemas** for nested content
- **3 singleton documents** (settings, navigation, footer)

### Migration Timeline Estimate
- **Phase 1**: 3-5 days (critical content)
- **Phase 2**: 5-7 days (marketing content)
- **Phase 3**: 3-5 days (UI/UX content)
- **Testing/QA**: 2-3 days
- **Total**: 13-20 days

---
*Document created: 2025-08-05*
*Status: COMPLETE - Ready for implementation*