# CLAUDE.md - Orange Jelly Website Development Guide

**CRITICAL: This document defines the single source of truth for the Orange Jelly website. Always read this file first before making any changes.**

## 🚨 CRITICAL BUSINESS FACTS - NEVER CHANGE THESE

### Company Information
- **Company Name**: Orange Jelly Limited
- **Founder**: Peter Pitcher
- **Co-owner**: Billy Summers (husband, runs day-to-day at The Anchor)
- **Founded**: 2019 (pivoted from digital agency)
- **The Anchor Takeover**: March 5, 2019
- **Location**: The Anchor, Stanwell Moor, Staines TW19 6AQ

### REAL Metrics - USE ONLY THESE
- **Quiz Night Attendance**: 25-35 regulars (up from 20)
- **Food GP Improvement**: 58% to 71%
- **Social Media Views**: 60,000-70,000 monthly
- **Customer Database**: 300 opted-in contacts (NOT 850!)
- **Value Added to Business**: £75,000-£100,000
- **Sunday Lunch Waste Savings**: £250/week (NOT £500!)
- **Tasting Night Retention**: 85%
- **Hours Saved Weekly**: 25 hours using AI

### Pricing - NEVER DEVIATE
- **All Services**: £62.50 per hour plus VAT
- **NO PACKAGES**: No £99, £499, or fixed price packages
- **Payment Plans**: Available but not specific amounts
- **Guarantee**: 30-day money-back guarantee

### Business Reality Checks
- **First External Client**: September 2025 (haven't helped other pubs yet!)
- **NO FALSE CLAIMS**: Never say "dozens of pubs" or "12 pubs helped"
- **Competition**: No Wetherspoons nearby (30 mins away)
- **Staff**: Just Peter (part-time around full-time job)

### Partnerships (Use Correct Language)
- **Greene King**: "Tenant" relationship (not "partner")
- **BII**: "Member" (featured in Autumn 2025 magazine)
- **Suppliers**: Barrel And Stone, Brakes, Bidfood (food partnerships)

## ⛔ BANNED CONTENT - NEVER USE

### False Metrics
- ❌ "43% increase" in anything
- ❌ "85+ people" at quiz (it's 25-35)
- ❌ "850 contacts" (it's 300)
- ❌ "Helped 30+ pubs" or "dozens of pubs"
- ❌ "12 pubs" success stories
- ❌ "300% increase" claims
- ❌ Competition with nearby Wetherspoons

### False Pricing
- ❌ £99 packages
- ❌ £499 packages
- ❌ Any fixed package prices
- ❌ "Starting from £99"

### False Timeline
- ❌ "Since 2021" (pub taken over March 2019)
- ❌ "Multiple clients" (first one Sept 2025)

## ✅ ALWAYS DO

### Content Standards
1. **Verify Facts**: Check this document before adding any metrics
2. **Use Real Examples**: Only from The Anchor's actual experience
3. **Honest Language**: "We're planning to..." not "We've helped dozens..."
4. **Clear Pricing**: Always "£62.50/hour plus VAT"
5. **Real Events**: Quiz, bingo, drag nights, karaoke, games nights, tasting events

### Technical Standards

#### URLs and Environment
- **Base URL**: `https://www.orangejelly.co.uk` (with www)
- **Use Environment Variables**: `NEXT_PUBLIC_BASE_URL`
- **Dynamic Generation**: robots.txt and sitemap.xml are dynamic
- **Never Hardcode**: Always use baseUrl variable

#### File Structure
```
src/
├── app/              # Next.js 14 app router
├── components/       # Reusable components
├── lib/             
│   ├── constants.ts  # Business info, pricing
│   └── metadata.ts   # SEO helpers
content/
└── blog/            # Markdown blog posts
```

#### Schema.org Rules
1. **Never Add Fake Ratings**: No AggregateRating without real reviews
2. **Use Correct IDs**: `${baseUrl}/#organization`
3. **Test Everything**: Google Rich Results Test
4. **Real Data Only**: Actual business information

#### Component Usage - MANDATORY

**NEVER USE RAW HTML ELEMENTS - ALWAYS USE COMPONENTS**

```typescript
// ❌ NEVER DO THIS:
<h1>Title</h1>
<p>Some text</p>
<img src="/image.jpg" />
<div className="section">
<a href="/page">Link</a>
<button onClick={}>Click</button>

// ✅ ALWAYS DO THIS:
import Heading from '@/components/Heading'
import Text from '@/components/Text'
import OptimizedImage from '@/components/OptimizedImage'
import Section from '@/components/Section'
import Link from 'next/link'
import Button from '@/components/Button'

<Heading level={1}>Title</Heading>
<Text>Some text</Text>
<OptimizedImage src="/image.jpg" alt="Description" width={800} height={600} />
<Section background="cream">
<Link href="/page">Link</Link>
<Button variant="primary">Click</Button>
```

#### Required Components for Common Elements

| Element | ❌ Never Use | ✅ Always Use | Import |
|---------|-------------|--------------|---------|
| Headings | `<h1>`, `<h2>`, etc | `<Heading level={1}>` | `@/components/Heading` |
| Paragraphs | `<p>` | `<Text>` | `@/components/Text` |
| Images | `<img>`, Next `Image` | `<OptimizedImage>` | `@/components/OptimizedImage` |
| Sections | `<div>`, `<section>` | `<Section>` | `@/components/Section` |
| Buttons | `<button>`, `<a>` for actions | `<Button>` | `@/components/Button` |
| Links | `<a>` | Next.js `Link` or `Button` with href | `next/link` or `@/components/Button` |
| Cards | `<div className="card">` | `<Card>` | `@/components/Card` |
| Grids | `<div className="grid">` | `<Grid>` | `@/components/Grid` |
| Animations | Custom animations | `<AnimatedItem>` | `@/components/AnimatedItem` |
| WhatsApp | Custom WhatsApp links | `<WhatsAppButton>` | `@/components/WhatsAppButton` |

#### Component Props Standards

```typescript
// Heading Component
<Heading 
  level={1|2|3|4|5|6}  // Required
  align="left|center|right"  // Optional
  color="charcoal|orange|teal|white"  // Optional
  className=""  // Optional additional styles
>
// Note: Heading does NOT support size or weight props - use className for custom styling

// Text Component
<Text
  size="xs|sm|base|lg|xl|2xl"  // Optional (NOT 3xl or 4xl)
  color="charcoal|muted|white"  // Optional
  weight="normal|medium|semibold|bold"  // Optional
  align="left|center|right"  // Optional
  className=""  // Optional additional styles
>

// OptimizedImage Component
<OptimizedImage
  src="/path/to/image"  // Required
  alt="Description"  // Required - ALWAYS provide descriptive alt text
  width={800}  // Required
  height={600}  // Required
  priority={true}  // Optional - only for above-the-fold images
  className=""  // Optional additional styles
>

// Section Component
<Section
  background="white|cream|orange|teal|orange-light|teal-dark"  // Optional
  padding="small|medium|large"  // Optional, default is large
>

// Button Component
<Button
  variant="primary|secondary|ghost|outline"  // Optional
  size="small|medium|large"  // Optional
  href="/path"  // Optional, makes it a link
  onClick={() => {}}  // Optional, for client-side actions
  external={true}  // Optional, for external links
  whatsapp={true}  // Optional, for WhatsApp buttons
  className=""  // Optional additional styles
  aria-label=""  // Optional but recommended for icon-only buttons
>

// Card Component
<Card
  variant="bordered|shadowed|colored|default"  // Optional
  background="white|cream|orange|teal|orange-light"  // Optional
  padding="small|medium|large"  // Optional
  className=""  // Optional additional styles
>
```

#### Styling Rules

```typescript
// ❌ NEVER use inline styles
<div style={{ padding: '20px', margin: '10px' }}>

// ❌ NEVER create custom utility classes
<div className="my-custom-padding">

// ✅ ALWAYS use Tailwind utilities or component props
<Section padding="large">
<div className="p-5 m-2.5">  // If absolutely needed

// ✅ For custom spacing, use Tailwind's spacing scale
className="mb-4"  // margin-bottom: 1rem
className="p-6"   // padding: 1.5rem
className="gap-8" // gap: 2rem
```

## 📋 CHECKLIST FOR EVERY CHANGE

Before committing ANY change, verify:

### Content Checks
- [ ] No false metrics (check against REAL Metrics section)
- [ ] Pricing is £62.50/hour plus VAT
- [ ] No claims about helping other pubs
- [ ] Real partnership language used
- [ ] Timeline is accurate (March 2019)

### Technical Checks
- [ ] Build succeeds: `npm run build`
- [ ] TypeScript passes: `npm run type-check`
- [ ] No raw HTML elements (using components only)
- [ ] No inline styles (using Tailwind/props only)
- [ ] URLs use environment variables
- [ ] Schema is valid (no fake data)
- [ ] Mobile responsive
- [ ] Images use OptimizedImage component
- [ ] All links use Next.js Link or Button

### Component Verification
- [ ] All `<h1>` to `<h6>` replaced with `<Heading level={n}>`
- [ ] All `<p>` tags replaced with `<Text>`
- [ ] All `<img>` and Next.js `Image` replaced with `<OptimizedImage>`
- [ ] All `<button>` tags replaced with `<Button>`
- [ ] All CTA `<a>` tags replaced with `<Button href="">`
- [ ] No invalid component props (check Component Props Standards)

### SEO Verification
- [ ] Page has metadata export (using generateMetadata)
- [ ] Canonical URL is set
- [ ] Meta description includes key info
- [ ] Appropriate structured data added
- [ ] Alt text on all images

### Business Logic
- [ ] Would Peter approve this?
- [ ] Is this honest about current situation?
- [ ] Does this reflect The Anchor's real experience?

## 📝 CODE PATTERNS - COPY THESE

### Page Structure Pattern
```typescript
import Hero from '@/components/Hero'
import Section from '@/components/Section'
import Heading from '@/components/Heading'
import Text from '@/components/Text'
import Button from '@/components/Button'
import Card from '@/components/Card'
import Grid from '@/components/Grid'
import CTASection from '@/components/CTASection'

export default function PageName() {
  return (
    <>
      <Hero 
        title="Page Title"
        subtitle="Subtitle text"
      />
      
      <Section background="white">
        <Heading level={2} align="center">Section Title</Heading>
        <Text size="lg" color="muted">Description text</Text>
        
        <Grid columns={{ default: 1, md: 3 }} gap="medium">
          <Card variant="bordered">
            <Heading level={3}>Card Title</Heading>
            <Text>Card content</Text>
          </Card>
        </Grid>
      </Section>
      
      <CTASection />
    </>
  )
}
```

### Service Card Pattern
```typescript
<Card variant="colored" background="orange-light" padding="large">
  <Heading level={3} className="mb-4">Service Name</Heading>
  <Text className="mb-6">
    Service description using real metrics only.
  </Text>
  <Text size="lg" weight="bold" className="mb-4">
    £62.50 per hour plus VAT
  </Text>
  <Button href="/contact" variant="primary">
    Get Started
  </Button>
</Card>
```

### Image Usage Pattern
```typescript
import OptimizedImage from '@/components/OptimizedImage'

<OptimizedImage
  src="/images/pub-interior.jpg"
  alt="The Anchor interior showing busy quiz night with 25-35 people"
  width={800}
  height={600}
  priority  // Only for above-the-fold images
  className="rounded-lg"
/>
```

### WhatsApp Integration Pattern
```typescript
import WhatsAppButton from '@/components/WhatsAppButton'
import { MESSAGES } from '@/lib/constants'

<WhatsAppButton 
  text={MESSAGES.whatsapp.default}
  size="large"
  variant="primary"
/>
```

### FAQ Pattern
```typescript
import { FAQSchema } from '@/components/StructuredData'
import FAQItem from '@/components/FAQItem'

const faqs = [
  {
    question: "How much do you charge?",
    answer: "We charge £62.50 per hour plus VAT for all services."
  }
]

// In component:
<>
  <FAQSchema faqs={faqs} />
  {faqs.map((faq, i) => (
    <FAQItem key={i} {...faq} />
  ))}
</>
```

## 🎯 QUICK REFERENCE

### Key Constants Location
- **Pricing**: `src/lib/constants.ts` - PRICING object
- **Contact**: `src/lib/constants.ts` - CONTACT object
- **Company**: `src/lib/constants.ts` - COMPANY object

### Important Files
- **Layout**: `src/app/layout.tsx` - Global metadata and schema
- **Homepage**: `src/app/page.tsx` - Main landing page
- **Services**: `src/app/services/page.tsx` - Service offerings
- **Results**: `src/app/results/page.tsx` - Success stories

### Blog Posts
- **Location**: `content/blog/*.md`
- **URL Pattern**: `/licensees-guide/[slug]`
- **Categories**: empty-pub-solutions, social-media, competition, events, menu-pricing

## ⚡ SPECIAL COMPONENT CASES

### When to Use Which Component

#### Navigation vs Actions
- **Link (from next/link)**: For internal navigation between pages
- **Button with href**: For CTAs that navigate (styled as buttons)
- **Button with onClick**: For client-side actions
- **WhatsAppButton**: For WhatsApp CTAs specifically

#### Text Hierarchy
- **Heading level={1}**: Page main title only (one per page)
- **Heading level={2}**: Major sections
- **Heading level={3}**: Subsections
- **Heading level={4}**: Card titles, minor sections
- **Heading level={5-6}**: Rarely used, small UI elements
- **Text**: All body text, descriptions, captions

#### Image Usage
- **OptimizedImage**: ALL images without exception
- **priority={true}**: Only for above-the-fold images
- **Always include**: src, alt, width, height

#### Client Components
Some components require 'use client':
- Components with useState, useEffect
- Components with onClick handlers
- Components with animations/interactions
- VideoTestimonial, StickyCTA, Navigation, etc.

## 🧩 AVAILABLE COMPONENTS - USE THESE

### Layout Components
- **Hero**: Page hero sections with title/subtitle
- **Section**: Main content wrapper with backgrounds
- **Grid**: Responsive grid layouts
- **Card**: Content cards with variants
- **CTASection**: Call-to-action sections

### Typography Components
- **Heading**: All headings (h1-h6)
- **Text**: All paragraph text
- **Button**: All buttons and button-style links

### Navigation Components
- **Navigation**: Main nav (in layout)
- **Breadcrumb**: Breadcrumb navigation
- **FooterSimple**: Site footer

### Content Components
- **OptimizedImage**: All images
- **AnimatedItem**: Scroll animations
- **FeatureList**: Bullet point lists
- **ServiceCard**: Service display cards
- **ProblemCard**: Problem/solution cards
- **TrustBar**: Trust indicators
- **TrustBadges**: Credibility badges
- **Partnerships**: Partner logos

### Interactive Components
- **WhatsAppButton**: WhatsApp CTAs
- **ROICalculator**: Revenue calculator
- **ServiceComparison**: Service tables
- **FAQItem**: FAQ accordion items

### SEO Components
- **SEOMeta**: Meta tags
- **CanonicalLink**: Canonical URLs
- **StructuredData**: Schema.org
- **BlogPostingSchema**: Blog schema
- **ProductSchema**: Product/service schema
- **SpeakableContent**: Voice search

### Blog Components
- **BlogPost**: Blog post wrapper
- **ShareButtons**: Social sharing
- **RelatedLinks**: Related content

## 🔄 MAINTENANCE TASKS

### Regular Updates Needed
1. **Sitemap**: Automatically includes new blog posts
2. **Schema**: Update with real reviews when available
3. **Metrics**: Update as The Anchor achieves new milestones
4. **First Client**: Update after September 2025 training

### When Adding Blog Posts
1. Create `.md` file in `content/blog/`
2. Include all required frontmatter
3. Sitemap updates automatically
4. No need to update navigation

## ⚠️ COMMON MISTAKES TO AVOID

### Content Mistakes
1. **Adding Package Prices**: Everything is hourly (£62.50/hour)
2. **Inflating Metrics**: Use only verified numbers from this doc
3. **Future Promises**: Be clear about "planning to" vs "have done"
4. **Schema Spam**: Don't add schema for things that don't exist
5. **Hardcoding URLs**: Always use environment variables

### Technical Mistakes
6. **Using Raw HTML**: Always use components (`<Heading>`, `<Text>`, etc.)
7. **Direct Image Tags**: Never use `<img>` or raw Next.js `Image`
8. **Inline Styles**: Never use `style={{}}`, use Tailwind classes
9. **Custom CSS Classes**: Don't create new CSS, use Tailwind utilities
10. **Ignoring Mobile**: Always test mobile view first
11. **Skipping OptimizedImage**: All images must use this component
12. **Raw Divs for Layout**: Use `<Section>`, `<Grid>`, `<Card>`
13. **Direct WhatsApp Links**: Use `<WhatsAppButton>` component
14. **Forgetting alt text**: Every image needs descriptive alt text
15. **Using `<br>` tags**: Use proper spacing with Tailwind classes

### Component Prop Mistakes
16. **Wrong Heading props**: Heading doesn't support `size` or `weight` - use className
17. **Invalid Text sizes**: Only xs|sm|base|lg|xl|2xl (NOT 3xl or 4xl)
18. **Missing alt text**: OptimizedImage ALWAYS needs descriptive alt text
19. **Wrong Button usage**: Use Button for actions, Link for navigation
20. **onClick on Link**: Links shouldn't have onClick - use Button instead

### File Organization Mistakes
21. **Creating duplicate components**: Check if it exists first
22. **Wrong component location**: All in `/src/components/`
23. **Inline component logic**: Extract to separate files
24. **Missing TypeScript types**: Always add proper types
25. **Ignoring constants**: Use `lib/constants.ts` for all data

### SEO Mistakes
26. **Missing page metadata**: Every page needs metadata export using generateMetadata
27. **No canonical URLs**: All pages should have canonical via generateMetadata
28. **Missing structured data**: Add appropriate schema for each page type
29. **Poor meta descriptions**: Include key info and £62.50/hour pricing

## 🆘 WHEN IN DOUBT

If you're unsure about any content or claim:
1. Check this document first
2. Default to conservative/honest claims
3. Use "The Anchor" as the only proven example
4. State "First pub chain training September 2025" for credibility
5. Focus on the journey, not inflated results

## 📞 CONTACT FOR CLARIFICATION

**Peter Pitcher**
- Email: peter@orangejelly.co.uk
- Phone: 07990 587315
- WhatsApp: Available through site buttons

---

**Last Updated**: August 2025
**Version**: 3.0
**Status**: ACTIVE - This is the single source of truth

## 📝 CHANGELOG

### Version 3.0 (August 2025)
- Added detailed Component Props Standards with all valid props
- Added Special Component Cases section for clarity
- Enhanced checklist with component and SEO verification
- Added component prop mistakes to avoid
- Clarified Heading limitations (no size/weight props)
- Clarified Text size limitations (no 3xl/4xl)
- Added OptimizedImage requirements
- Added SEO mistakes section
- Updated all component violations fixed across codebase

### Version 2.0 (August 2024)
- Complete restructure with strict guidelines
- Added BANNED CONTENT section
- Added mandatory component usage rules
- Added comprehensive technical standards

### Version 1.0 (March 2024)
- Initial documentation