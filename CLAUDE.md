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

#### Component Patterns
```typescript
// ALWAYS use these patterns:

// For images
import OptimizedImage from '@/components/OptimizedImage'

// For content sections
import Section from '@/components/Section'

// For headings (never use raw h1, h2, etc)
import Heading from '@/components/Heading'

// For text (never use raw p tags)
import Text from '@/components/Text'
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
- [ ] URLs use environment variables
- [ ] Schema is valid (no fake data)
- [ ] Mobile responsive

### Business Logic
- [ ] Would Peter approve this?
- [ ] Is this honest about current situation?
- [ ] Does this reflect The Anchor's real experience?

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

1. **Adding Package Prices**: Everything is hourly
2. **Inflating Metrics**: Use only verified numbers
3. **Future Promises**: Be clear about "planning to" vs "have done"
4. **Schema Spam**: Don't add schema for things that don't exist
5. **Hardcoding URLs**: Always use environment variables

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

**Last Updated**: August 2024
**Version**: 2.0
**Status**: ACTIVE - This is the single source of truth