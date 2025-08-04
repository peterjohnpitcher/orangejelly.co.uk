# CLAUDE.md - Orange Jelly Website Development Guide

**Your trusted guide to maintaining and enhancing the Orange Jelly website with confidence and consistency.**

## 🚀 Quick Start - Get Productive Fast

### Essential Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Check code quality
npm run type-check   # Validate TypeScript
npm run format       # Auto-format code
```

### Key Facts to Remember
- **Pricing**: £62.50/hour plus VAT (no packages)
- **Real metrics**: 25-35 quiz attendees, 300 contacts, 71% food GP
- **First client**: September 2025 (training pub chain)
- **Founded**: March 2019 (took over The Anchor)
- **Tech stack**: Next.js 14, TypeScript, Tailwind CSS

### Most Important Rules
1. ✅ Always use components (`<Heading>`, `<Text>`, `<OptimizedImage>`)
2. ✅ Never use raw HTML (`<h1>`, `<p>`, `<img>`)
3. ✅ Use real metrics only (see Core Business Facts)
4. ✅ Test mobile-first
5. ✅ Include alt text on all images

### Where to Find Things
- **Constants**: `src/lib/constants.ts`
- **Components**: `src/components/`
- **Pages**: `src/app/`
- **Blog posts**: `content/blog/`
- **Public assets**: `public/`

## 🎯 Guiding Principles

### Our Development Philosophy
We believe in creating honest, effective, and maintainable solutions that genuinely help pub licensees succeed. Every line of code should:

1. **Be Authentic**: Reflect real experiences and proven results from The Anchor
2. **Be Maintainable**: Follow consistent patterns that any developer can understand
3. **Be Performant**: Load fast, work smoothly, respect users' time and data
4. **Be Accessible**: Work for everyone, regardless of ability or device
5. **Be Honest**: Never mislead or exaggerate - trust is our foundation

### Your Role as a Developer
You're not just coding - you're helping Peter Pitcher share proven strategies that saved The Anchor. Your work directly impacts struggling licensees who need real solutions. By following these guidelines, you ensure every visitor gets accurate information and every feature works reliably.

### Decision Framework
When uncertain, ask yourself:
- "Would this genuinely help a struggling licensee?"
- "Is this claim something Peter can confidently stand behind?"
- "Will this code be easy for the next developer to understand?"
- "Does this improve or maintain site performance?"

If the answer to any is "no," reconsider your approach.

## ✅ Core Business Facts - Your Foundation for Accuracy

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

## 📊 Content Accuracy Guidelines - Building Trust Through Truth

### Metrics to Avoid (Use Verified Numbers Instead)
Instead of unverified claims, always use our proven metrics:
- **Quiz attendance**: Use "25-35 regulars" not inflated numbers
- **Contact database**: Use "300 opted-in contacts" - quality over quantity
- **Client experience**: "First pub chain training September 2025" - building credibility honestly
- **Timeline**: "Pub taken over March 2019" - our real journey
- **Competition**: "30 minutes from nearest Wetherspoons" - accurate positioning

### Pricing Clarity
We maintain transparent, consistent pricing:
- **Always use**: "£62.50 per hour plus VAT"
- **Why no packages?**: Every pub is unique and deserves custom solutions
- **Payment plans**: Available to help cash flow without false promises

## 🚀 Best Practices - Your Path to Excellence

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

#### Component Architecture - Building Consistency

**Why Components Matter**: Using our component library ensures consistent styling, better performance, and easier maintenance. Every component has been optimized for our specific needs.

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

## 📋 Quality Assurance Checklist

Ensure your changes meet our high standards:

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

## 🔍 SEO Strategy - Maximizing Organic Visibility

### Keyword Research & Targeting
Our content targets licensees searching for specific solutions. Primary keyword clusters:

#### High-Intent Keywords (Prioritize These)
- **Empty pub solutions**: "why is my pub empty", "fill empty pub tables", "quiet pub marketing"
- **Midweek struggles**: "quiet tuesday pub", "midweek pub promotions", "boost monday pub sales"
- **Competition**: "compete with wetherspoons", "beat chain pubs", "small pub vs chains"
- **Budget marketing**: "pub marketing no budget", "free pub promotion ideas", "cheap pub advertising"

#### Supporting Keywords
- **Event ideas**: "pub quiz ideas", "live music pubs", "pub events calendar"
- **Food sales**: "increase pub food sales", "pub menu ideas", "food GP improvement"
- **Social media**: "pub facebook marketing", "instagram for pubs", "social media pub promotion"

### Internal Linking Strategy
Every page should contribute to our topic authority:

```typescript
// Example internal linking patterns
<Text>
  Struggling with {' '}
  <Link href="/empty-pub-solutions">empty tables on quiet nights</Link>? 
  Our proven strategies from The Anchor can help, just like our {' '}
  <Link href="/results">25-35 regular quiz attendees</Link> prove.
</Text>
```

#### Linking Rules
1. **Contextual relevance**: Only link when genuinely helpful
2. **Anchor text variety**: Use natural, descriptive phrases
3. **Link depth**: Aim for 3-5 internal links per page
4. **Hub pages**: Services and Results pages are primary hubs
5. **Blog network**: Cross-link related blog posts by category

### Meta Description Templates
Craft compelling meta descriptions that include:
- **Problem acknowledgment**: Start with the pain point
- **Solution promise**: What we offer
- **Credibility**: Real licensee experience
- **CTA**: Clear next step

```typescript
// Template examples
export const metaTemplates = {
  problem: "[Problem] making your pub struggle? [Solution] from a real licensee who increased [metric]. £62.50/hour.",
  guide: "Practical [topic] guide from a working licensee. No theory, just proven strategies that [result]. Real pub, real results.",
  service: "[Service] that actually works. We [achievement] at The Anchor using [method]. £62.50/hour plus VAT."
}
```

### Structured Data Implementation
Maximize rich results with appropriate schema:

```typescript
// Service pages
<ProductSchema 
  name="Pub Marketing Services"
  price="62.50"
  priceCurrency="GBP"
  priceUnit="hour"
  description="Proven marketing strategies from a real licensee"
/>

// Blog posts
<BlogPostingSchema
  headline={post.title}
  description={post.excerpt}
  author={defaultAuthor}
  datePublished={post.publishedDate}
  keywords={post.tags}
/>

// FAQ sections
<FAQSchema faqs={realFAQs} />
```

## ⚡ Performance Standards - Speed Matters

### Performance Budget
Every feature must respect our performance constraints:

#### Core Web Vitals Targets
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms  
- **CLS (Cumulative Layout Shift)**: < 0.1
- **TTFB (Time to First Byte)**: < 600ms

#### Resource Budgets
- **JavaScript**: < 200KB compressed
- **CSS**: < 50KB compressed
- **Images**: < 100KB per image (WebP format)
- **Total page weight**: < 1MB
- **Font files**: Maximum 2 font weights

### Performance Optimization Checklist
- [ ] Images lazy-loaded (except above-fold)
- [ ] Images in WebP format with fallbacks
- [ ] Critical CSS inlined
- [ ] JavaScript code-split by route
- [ ] Fonts preloaded with font-display: swap
- [ ] Third-party scripts loaded asynchronously
- [ ] No unused CSS or JavaScript

### Monitoring Performance
```bash
# Run before committing
npm run build
npm run analyze  # Check bundle sizes

# Lighthouse CI (if configured)
npm run lighthouse

# Manual checks
# - Test on 3G throttled connection
# - Check Core Web Vitals in Chrome DevTools
# - Verify no layout shifts on load
```

## ♿ Accessibility Standards - Building for Everyone

### WCAG 2.1 AA Compliance
We follow Web Content Accessibility Guidelines:

#### Visual Design
- **Color contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Focus indicators**: Visible keyboard focus on all interactive elements
- **Text sizing**: Base font minimum 16px, scalable to 200%
- **Touch targets**: Minimum 44x44px for mobile

#### Semantic HTML
```typescript
// ✅ Correct semantic structure
<main>
  <article>
    <Heading level={1}>Page Title</Heading>
    <Section aria-labelledby="services">
      <Heading level={2} id="services">Our Services</Heading>
    </Section>
  </article>
</main>

// ❌ Avoid generic containers
<div>
  <div className="title">Page Title</div>
  <div className="section">Content</div>
</div>
```

#### Interactive Elements
- **Keyboard navigation**: All features accessible via keyboard
- **Skip links**: Provide skip to main content
- **ARIA labels**: Descriptive labels for icon buttons
- **Form validation**: Clear error messages with suggestions

### Accessibility Testing Checklist
- [ ] Keyboard navigation works throughout
- [ ] Screen reader announces content logically
- [ ] Color contrast passes WCAG AA
- [ ] Forms have proper labels and error handling
- [ ] Images have descriptive alt text
- [ ] Videos have captions/transcripts
- [ ] No autoplay media with sound

## 🤖 Automation & Quality Control

### Pre-commit Hooks (Recommended Setup)
Automate quality checks before code reaches the repository:

```json
// package.json additions
{
  "scripts": {
    "pre-commit": "lint-staged",
    "prepare": "husky install"
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "prettier --write",
      "eslint --fix",
      "tsc-files --noEmit"
    ],
    "*.{json,md}": "prettier --write"
  }
}
```

### Recommended Husky Setup
```bash
# Install Husky and lint-staged
npm install -D husky lint-staged tsc-files

# Initialize Husky
npx husky install
npx husky add .husky/pre-commit "npm run pre-commit"
```

### Custom ESLint Rules
Enforce our component standards automatically:

```javascript
// .eslintrc.js additions
module.exports = {
  rules: {
    // Warn about raw HTML elements
    'no-restricted-syntax': [
      'warn',
      {
        selector: 'JSXElement[openingElement.name.name=/^(h[1-6]|p|img|button)$/]',
        message: 'Use component library instead of raw HTML elements'
      }
    ],
    // Enforce alt text on OptimizedImage
    'jsx-a11y/alt-text': ['error', {
      elements: ['OptimizedImage'],
    }],
  }
}
```

### Continuous Integration Checks
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run format:check
      - run: npm run build
      - run: npx lighthouse-ci
```

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

## 💡 Learning from Experience - Patterns for Success

### Content Excellence Patterns
These patterns help maintain trust and accuracy:

1. **Transparent Pricing**: Always state "£62.50/hour plus VAT" - transparency builds trust
2. **Verified Metrics**: Use numbers from this doc - real results are powerful enough
3. **Journey Storytelling**: Share "planning to" vs "have done" - honesty creates connection
4. **Appropriate Schema**: Add schema for real content only - quality over quantity
5. **Dynamic URLs**: Use environment variables - maintainability matters

### Technical Excellence Patterns
These patterns ensure consistency and performance:

6. **Component Architecture**: Use `<Heading>`, `<Text>`, etc. - consistency aids maintenance
7. **Optimized Images**: Always use `<OptimizedImage>` - performance impacts conversions
8. **Utility-First CSS**: Use Tailwind classes - reduces CSS bloat
9. **Mobile-First Design**: Test mobile first - 60%+ users are mobile
10. **Semantic HTML**: Use `<Section>`, `<Grid>`, `<Card>` - improves accessibility
11. **Smart CTAs**: Use `<WhatsAppButton>` component - optimized for conversions
12. **Descriptive Alt Text**: Every image needs context - accessibility is essential
13. **Clean Spacing**: Use Tailwind spacing utilities - avoid layout hacks

### Component Best Practices
Understanding component capabilities prevents errors:

14. **Heading Flexibility**: Use `className` for custom styling (no size/weight props)
15. **Text Sizing**: Stick to xs|sm|base|lg|xl|2xl - maintains design system
16. **Image Requirements**: Always include src, alt, width, height - prevents layout shift
17. **Button vs Link**: Button for actions, Link for navigation - semantic clarity
18. **Event Handling**: onClick on Buttons, not Links - proper interaction patterns

### Organization Excellence
Maintaining project structure aids collaboration:

19. **Component Reuse**: Check existing components first - avoid duplication
20. **Consistent Location**: Components in `/src/components/` - predictable structure
21. **Extracted Logic**: Separate files for complex logic - testability matters
22. **TypeScript Types**: Always add types - catch errors early
23. **Centralized Constants**: Use `lib/constants.ts` - single source of truth

### SEO Excellence
Maximizing visibility requires attention to detail:

24. **Complete Metadata**: Every page needs generateMetadata export - consistency is key
25. **Canonical URLs**: Set via generateMetadata - avoid duplicate content
26. **Rich Snippets**: Add appropriate structured data - stand out in search
27. **Compelling Descriptions**: Include problem, solution, price - drive clicks

## 🛠️ Development Workflow - Your Path to Productivity

### Starting a New Feature
Follow this workflow for consistent, quality development:

```bash
# 1. Pull latest changes
git pull origin main

# 2. Create feature branch
git checkout -b feature/description

# 3. Read CLAUDE.md for context
cat CLAUDE.md | head -100

# 4. Run development server
npm run dev

# 5. Make changes following patterns
# ... development work ...

# 6. Test your changes
npm run lint
npm run type-check
npm run build

# 7. Commit with clear message
git add .
git commit -m "feat: add [feature] following CLAUDE.md standards"

# 8. Push and create PR
git push origin feature/description
```

### Before Every Commit
Run this checklist to ensure quality:

```bash
# Automated checks
npm run lint          # ESLint validation
npm run type-check    # TypeScript validation
npm run format:check  # Prettier validation
npm run build        # Build validation

# Manual checks
- [ ] Review CLAUDE.md compliance
- [ ] Test on mobile device/emulator
- [ ] Check browser console for errors
- [ ] Verify all links work
- [ ] Test with slow 3G throttling
```

### Common Development Tasks

#### Adding a New Page
1. Create file in `src/app/[page-name]/page.tsx`
2. Add metadata using `generateMetadata`
3. Use existing page as template
4. Add to sitemap if needed
5. Test all responsive breakpoints

#### Adding a Blog Post
1. Create `.md` file in `content/blog/`
2. Include all required frontmatter
3. Use existing post as template
4. Verify images are optimized
5. Check internal links

#### Updating Content
1. Check if content is in `lib/constants.ts`
2. If not, check component files
3. Update using real metrics only
4. Test that changes propagate correctly
5. Verify schema.org still validates

#### Performance Optimization
1. Run Lighthouse audit before changes
2. Make optimization
3. Run Lighthouse audit after
4. Document improvements
5. Ensure no regressions

## 🤝 Getting Help - You're Not Alone

### When You're Unsure
If you're uncertain about any aspect:

1. **Consult this document**: Your primary reference for standards
2. **Check existing code**: Look for patterns in similar features
3. **Default to honesty**: Conservative claims are better than exaggeration
4. **Use real examples**: The Anchor's journey is compelling enough
5. **Focus on value**: How does this help struggling licensees?

### Getting Support
For technical questions or clarifications:
- Review existing code examples in the codebase
- Check the Git history for context on decisions
- Test changes thoroughly in development
- Document any new patterns you establish

### Contact Information
**Peter Pitcher**
- Email: peter@orangejelly.co.uk
- Phone: 07990 587315
- WhatsApp: Available through site buttons

Remember: You're building something that genuinely helps struggling licensees. Every decision should support that mission.

---

**Last Updated**: August 2025
**Version**: 4.0
**Status**: ACTIVE - Your trusted development guide

## 📝 CHANGELOG

### Version 4.0 (August 2025)
- Complete tone shift from restrictive to empowering
- Added Guiding Principles section with development philosophy
- Restructured with positive framing throughout
- Added comprehensive SEO Strategy section
- Added Performance Budget guidelines
- Added Accessibility Standards (WCAG 2.1 AA)
- Enhanced automation recommendations
- Improved document organization for better usability
- Added keyword research and internal linking strategy

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