# CLAUDE.md - Orange Jelly Development Guide

**Quick, accurate guidance for maintaining the Orange Jelly website.**

## 🚀 Quick Start

### Essential Commands
```bash
npm run dev          # Start development
npm run build        # Production build
npm run lint         # Code quality
npm run type-check   # TypeScript validation
npm run test         # Run tests
```

### Critical Rules
1. **Components only**: Use `<Heading>`, `<Text>`, `<OptimizedImage>` - never raw HTML
2. **Real metrics only**: See Core Business Facts section
3. **Server Components default**: Add `"use client"` only when needed
4. **Blog in Sanity CMS**: NOT markdown files
5. **Test everything**: Mobile-first, accessibility, performance

### File Locations
- **Constants**: `src/lib/constants.ts`
- **Components**: `src/components/`
- **Pages**: `src/app/`
- **Blog**: Sanity CMS (NOT `/content/blog/`)
- **Sanity schemas**: `sanity-studio/schemas/`

## ✅ Core Business Facts

### Company
- **Founded**: March 5, 2019 (took over The Anchor)
- **Founder**: Peter Pitcher
- **Co-owner**: Billy Summers (runs day-to-day)
- **Location**: The Anchor, Stanwell Moor, Staines TW19 6AQ
- **First External Client**: September 2025

### REAL Metrics (USE ONLY THESE)
- Quiz Night: **25-35 regulars** (up from 20)
- Food GP: **58% → 71%**
- Social Media: **60-70K monthly views**
- Database: **300 contacts** (NOT 850!)
- Value Added: **£75-100K**
- Sunday Savings: **£250/week** (NOT £500!)
- Tasting Retention: **85%**
- AI Time Saved: **25 hours/week**

### Pricing
- **ONLY**: £75/hour plus VAT
- **NO packages or fixed prices**
- **30-day guarantee**

### Language
- Greene King: "Tenant" (not partner)
- BII: "Member"
- Competition: "30 mins from Wetherspoons"

## 🏗️ Component Standards

### Component Props Reference
```typescript
// Heading - NO size/weight props!
<Heading 
  level={1-6}           // Required
  align="left|center|right"
  color="charcoal|orange|teal|white"
  className=""
>

// Text - Max size is 2xl!
<Text
  size="xs|sm|base|lg|xl|2xl"  // NOT 3xl/4xl
  color="charcoal|muted|white"
  weight="normal|medium|semibold|bold"
  align="left|center|right"
>

// OptimizedImage - Alt text REQUIRED
<OptimizedImage
  src="/path"           // Required
  alt="Description"     // Required
  width={800}          // Required
  height={600}         // Required
  priority={true}      // Above-fold only
>

// Button
<Button
  variant="primary|secondary|ghost|outline"
  size="small|medium|large"
  href="/path"         // Makes it a link
  loading={false}
  disabled={false}
  aria-label=""        // Required if icon-only
>
```

### Server vs Client Components
```typescript
// ✅ Server (default - no directive)
export default function Component() {
  const data = await fetchData();
  return <div>{data}</div>;
}

// ✅ Client (only when needed)
"use client";
export default function Interactive() {
  const [state, setState] = useState();
  // Needs: state, effects, browser APIs, onClick
}
```

## ⚡ Performance Requirements

### Core Web Vitals (2025)
- **LCP**: < 2.5s
- **INP**: < 200ms (replaces FID)
- **CLS**: < 0.1
- **TTFB**: < 600ms

### Resource Budget
- **JS**: < 200KB compressed
- **CSS**: < 50KB compressed
- **Images**: < 100KB each (WebP/AVIF)
- **Total**: < 1MB per page

## ♿ Accessibility (WCAG 2.1 AA)

### Requirements
- **Contrast**: 4.5:1 normal text, 3:1 large
- **Touch targets**: 44×44px minimum
- **Focus indicators**: Always visible
- **Alt text**: All images

### Patterns
```typescript
// Form validation
<Input
  aria-required="true"
  aria-invalid={!!error}
  aria-describedby={error ? "error-id" : "hint-id"}
/>

// Dynamic content
<div aria-live="polite" aria-atomic="true">
  {message}
</div>
```

## 🧪 Testing

### Commands
```bash
npm test              # All tests
npm test Button       # Specific component
npm run test:watch    # Watch mode
npm run test:coverage # Coverage (target: 80%)
```

### Pattern
```typescript
// Test behavior, not implementation
it('subscribes user', async () => {
  const user = userEvent.setup();
  render(<NewsletterForm />);
  
  await user.type(
    screen.getByLabelText(/email/i),
    'pub@example.com'
  );
  await user.click(screen.getByRole('button'));
  
  expect(await screen.findByText(/thanks/i))
    .toBeInTheDocument();
});
```

## 🏗️ Sanity CMS

### Adding New Schema (3 STEPS!)
1. **Create schema**: `sanity-studio/schemas/newSchema.ts`
2. **Add to index**: `sanity-studio/schemas/index.ts`
3. **Add to menu**: `sanity-studio/sanity.config.ts` ← OFTEN MISSED!

### Common Issues
| Issue | Solution |
|-------|----------|
| Schema not in menu | Add to sanity.config.ts structure |
| Changes not showing | `rm -rf dist && npm run build && npx sanity deploy` |
| Icon errors | Icons go in menu ONLY, not schema |
| Missing _key | All array items need `_key: 'unique_id'` |

### Project Info
- **ID**: `9brdfanc`
- **Dataset**: `production`
- **Studio**: https://orangejelly.sanity.studio/

## 📝 Blog Article Creation

### Required Fields
- **title**: Problem-focused, use questions
- **slug**: Auto-generated from title
- **status**: draft → scheduled → published
- **publishedDate**: Monday 10:00 AM
- **excerpt**: 150-160 chars
- **quickAnswer**: 40-60 words (CRITICAL!)
- **faqs**: Minimum 3 with voice optimization

### Featured Image
1. Create custom SVG: `/public/images/blog/{slug}.svg`
2. Add to imageMap: `/src/lib/blog-images.ts`
3. Never use default.svg

### Content Structure
```markdown
## Opening Hook (2-3 paragraphs)
## The Real Problem 
## Main Solutions (3-5 sections)
## Your Action Plan
## Results You Can Expect
## Bottom Line
```

### Publishing Checklist
- [ ] Custom SVG created
- [ ] Image mapping added
- [ ] Quick Answer 40-60 words
- [ ] 3+ FAQs added
- [ ] 1,500-3,000 words
- [ ] Monday 10am publish time
- [ ] Tone: encouraging, solution-focused

## 📋 Pre-Commit Checklist

### Code Quality
```bash
npm run lint && npm run type-check && npm run test && npm run build
```

### Content Verification
- [ ] Real metrics only (see Core Business Facts)
- [ ] £75/hour pricing
- [ ] No false claims about other pubs
- [ ] Correct partnership language

### Component Usage
- [ ] No raw HTML tags
- [ ] Server Components by default
- [ ] Alt text on all images
- [ ] Mobile-first tested

## 🎯 Quick Reference

### Key Utilities
- **cn()**: Class name merger
- **urlFor()**: Sanity image URLs
- **generateMetadata()**: SEO helper

### Decision Framework
Ask yourself:
1. Would this help a struggling licensee?
2. Can Peter stand behind this claim?
3. Is the code maintainable?
4. Does it maintain performance?

If any answer is "no", reconsider.

## 📅 Scheduled Publishing

Blog posts auto-publish at scheduled times:
- Set status: "Scheduled"
- Set future publishedDate
- Utilities: `src/lib/scheduled-publishing.ts`
- Monitor: `/api/publish-scheduled`

## 🔗 Important Links

- [React Docs](https://react.dev)
- [Next.js 15](https://nextjs.org/docs)
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [Testing Library](https://testing-library.com)

---

**Version**: 6.0 (Optimized)  
**Updated**: January 2025  
**Remember**: You're helping struggling licensees with proven solutions