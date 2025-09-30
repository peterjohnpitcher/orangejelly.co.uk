# Production Content Verification Checklist

## Verification Strategy

To ensure content parity with production after our markdown migration, we will:

1. **Access Production Site**: https://orangejelly.co.uk
2. **Compare Each Page**: Line-by-line content verification
3. **Focus Areas**: Text content, headings, metrics, CTAs
4. **Ignore**: Styling differences (we're only verifying content)

## Pages to Verify

### Primary Pages
- [ ] **Homepage** (/)
  - Hero text and subtitle
  - Social proof numbers
  - Service cards content
  - CTA sections
  - Footer content

- [ ] **About** (/about)
  - Hero content
  - Story sections
  - Team information
  - Timeline/milestones
  - Key metrics

- [ ] **Services** (/services)
  - Service descriptions
  - Pricing information (£75/hour)
  - Process steps
  - FAQs
  - Guarantee text

- [ ] **Results** (/results)
  - Case studies content
  - Metrics displayed
  - Success stories
  - Trust indicators

- [ ] **Contact** (/contact)
  - Contact information
  - Form fields and labels
  - Office hours
  - Location details
  - FAQ section

### Specialized Landing Pages
- [ ] **Pub Rescue** (/pub-rescue)
  - Problem statements
  - Solutions offered
  - Success metrics
  - CTAs

- [ ] **Compete with Pub Chains** (/compete-with-pub-chains)
  - Unique value props
  - Comparison points
  - Strategy descriptions

- [ ] **Quiet Midweek Solutions** (/quiet-midweek-solutions)
  - Problem identification
  - Solutions presented
  - Case examples

### Global Elements
- [ ] **Navigation**
  - Menu items and order
  - WhatsApp CTA text
  - Mobile menu items

- [ ] **Footer**
  - Service links
  - Company links
  - Contact information
  - Copyright text

## Content Verification Process

For each page, I will:

1. **Fetch production content** using WebFetch
2. **Compare with local content** from JSON/markdown files
3. **Document any discrepancies**
4. **Fix content mismatches** if found
5. **Mark as verified** when complete

## Key Metrics to Verify

These MUST match production exactly:
- Quiz Night: 25-35 regulars
- Food GP: 58% → 71%
- Social Media: 60-70K monthly views
- Database: 300 contacts
- Value Added: £75-100K
- Sunday Savings: £250/week
- Tasting Retention: 85%
- AI Time Saved: 25 hours/week

## Pricing Verification

MUST show:
- £75/hour plus VAT
- NO package prices
- 30-day guarantee mentioned

## Quality Checks

- [ ] All pages load without errors
- [ ] Content hierarchy preserved
- [ ] No Lorem ipsum or placeholder text
- [ ] All CTAs have correct text
- [ ] Contact information consistent
- [ ] No broken internal references

## Verification Status

| Page | Production Fetched | Content Compared | Issues Found | Fixed | Verified |
|------|-------------------|------------------|--------------|-------|----------|
| Homepage | ⏳ | ⏳ | - | - | ⏳ |
| About | ⏳ | ⏳ | - | - | ⏳ |
| Services | ⏳ | ⏳ | - | - | ⏳ |
| Results | ⏳ | ⏳ | - | - | ⏳ |
| Contact | ⏳ | ⏳ | - | - | ⏳ |
| Pub Rescue | ⏳ | ⏳ | - | - | ⏳ |
| Compete with Chains | ⏳ | ⏳ | - | - | ⏳ |
| Quiet Midweek | ⏳ | ⏳ | - | - | ⏳ |
| Navigation | ⏳ | ⏳ | - | - | ⏳ |
| Footer | ⏳ | ⏳ | - | - | ⏳ |

## Notes

- Created: 2025-01-23
- Purpose: Ensure content parity after markdown migration
- Method: Systematic page-by-page verification
- Priority: Content accuracy over styling