# 🚨 COMPREHENSIVE ISSUES LIST: Raw Content & HTML Violations

**Generated**: 2025-08-07  
**Status**: ACTIVE ISSUES REQUIRING RESOLUTION  
**Total Issues Identified**: 1,750+ violations across 80+ files  
**Discovery Passes Completed**: 3 (Initial + 2 Deep Discovery)

---

## 📑 TABLE OF CONTENTS

1. [Critical Raw Content Issues](#1-critical-raw-content-issues)
2. [Raw HTML Violations](#2-raw-html-violations)
3. [Sanity Integration Gaps](#3-sanity-integration-gaps)
4. [Component Library Violations](#4-component-library-violations)
5. [Edge Cases and Hidden Issues](#5-edge-cases-and-hidden-issues)
6. [Systemic Patterns and Anti-Patterns](#6-systemic-patterns-and-anti-patterns)
7. [Priority Matrix](#7-priority-matrix)
8. [File-by-File Issues](#8-file-by-file-issues)

---

## 1. CRITICAL RAW CONTENT ISSUES

### 1.1 Services Page Content
**File**: `src/app/services/ServicesPage.tsx`
**Lines**: 23-313
**Issues**:
- [ ] 27 hardcoded FAQ items (lines 23-114)
- [ ] 8 complete service definitions with pricing (lines 118-313)
- [ ] "Empty Pub Recovery Package" full description (lines 119-144)
- [ ] "Menu Makeover" service details (lines 145-168)
- [ ] "Social Media Mastery" service content (lines 169-192)
- [ ] "Quiz Night Success" service definition (lines 193-216)
- [ ] "Business Analysis" service details (lines 217-240)
- [ ] "Event Planning" service content (lines 241-264)
- [ ] "Consultation" service definition (lines 265-288)
- [ ] "Website Presence" service details (lines 289-312)
- [ ] Hero section titles and subtitles (lines 337-338)
- [ ] "How it works" 4-step process (lines 370-415)
- [ ] Money-back guarantee text (lines 433-438)
- [ ] Final CTA content (lines 481-483)

### 1.2 About Page Content
**File**: `src/app/about/AboutPage.tsx`
**Lines**: 30-442
**Issues**:
- [ ] 12 complete FAQ items in `defaultAboutFAQs` (lines 30-79)
- [ ] "The Real Story Behind Orange Jelly" section (lines 109-131)
- [ ] "Quick Facts" 7-item feature list (lines 151-161)
- [ ] "Our Journey from Struggle to Success" timeline (lines 172-173)
- [ ] 8 timeline cards with dates and descriptions (lines 198-231)
- [ ] "What We Stand For" values section (lines 311-337)
- [ ] "Come See The Results Yourself" visit CTA (lines 395-413)
- [ ] Related links section content (lines 432-434)
- [ ] Final CTA titles and text (lines 441-442)

### 1.3 Homepage Content
**File**: `src/app/HomePage.tsx`
**Lines**: 156-371
**Issues**:
- [ ] "What's Killing Your Business?" section title (lines 156-157)
- [ ] "Explore Solutions to Your Biggest Problems" (lines 169-170)
- [ ] "Real Results from The Anchor" testimonial section (lines 208-219)
- [ ] "Calculate Your Potential Revenue" calculator intro (lines 237-242)
- [ ] "We're licensees, Just Like You" founder story (lines 263-273)
- [ ] "Proven Daily At" badge text (lines 298-299)
- [ ] "Real pub experience + proven strategies" tagline (line 311)
- [ ] "Stop Struggling. Start Thriving." CTA section (lines 328-333)
- [ ] Final CTA section content (lines 368-370)

### 1.4 Landing Pages Content

#### Empty Pub Solutions
**File**: `src/app/empty-pub-solutions/page.tsx`
**Issues**:
- [ ] "Is Your Empty Pub Killing Your Business?" hero (lines 76-77)
- [ ] Crisis description paragraphs (lines 99-101)
- [ ] Timeline section content (lines 123-127)
- [ ] "The 5 Power Strategies That Fill Empty Pubs" (lines 186-187)
- [ ] Service inclusions with 4 feature cards (lines 321-386)
- [ ] Social proof section content (lines 431-432)
- [ ] Final CTA content (lines 457-461)

#### Pub Rescue
**File**: `src/app/pub-rescue/page.tsx`
**Issues**:
- [ ] Emergency banner content (lines 69-71)
- [ ] Crisis description text (lines 73-76)
- [ ] Problem selector intro (lines 94-99)
- [ ] "Our Story" transformation metrics (lines 140-164)
- [ ] Emergency response promise points (lines 169-194)
- [ ] Crisis calculator with cost figures (lines 201-227)
- [ ] Rescue methodology week-by-week cards (lines 235-324)
- [ ] "Why Pubs Fail" problem/solution pairs (lines 352-431)
- [ ] Service inclusions and pricing (lines 439-517)

#### Compete with Pub Chains
**File**: `src/app/compete-with-pub-chains/page.tsx`
**Issues**:
- [ ] Hero section content about chain competition
- [ ] Strategy cards and descriptions
- [ ] Success metrics and case studies
- [ ] CTA sections and marketing copy

#### Quiet Midweek Solutions
**File**: `src/app/quiet-midweek-solutions/page.tsx`
**Issues**:
- [ ] Midweek crisis messaging
- [ ] Solution strategies content
- [ ] Event ideas and promotions
- [ ] Success stories and metrics

### 1.5 Marketing Constants
**File**: `src/lib/constants.ts`
**Lines**: 128-226
**Issues**:
- [ ] 7 WhatsApp message templates (lines 128-145)
- [ ] Response time explanations (lines 146-150)
- [ ] Trust messages and guarantees (lines 151-160)
- [ ] CTA button text variations (lines 161-176)
- [ ] SUCCESS_METRICS object (lines 178-195)
- [ ] FEATURES arrays (lines 197-212)
- [ ] QUIZ_EXAMPLE promotional copy (lines 214-218)

### 1.6 Component Default Content
**File**: `src/components/Hero.tsx`
**Issues**:
- [ ] Default WhatsApp CTA message (line 26)

---

## 2. RAW HTML VIOLATIONS

### 2.1 Heading Elements (`<h1>` - `<h6>`)
**Should use**: `<Heading level={1-6}>`

#### About Demo Page
**File**: `src/app/about-demo/AboutDemoPage.tsx`
- [ ] Line 54: `<h1 className="text-4xl md:text-6xl font-bold text-charcoal">`
- [ ] Line 108: `<h2 className="text-3xl font-bold text-center mb-8">`
- [ ] Line 207: `<h2 className="text-3xl font-bold">`
- [ ] Line 287: `<h2 className="text-3xl font-bold text-center mb-8">`
- [ ] Line 305: `<h2 className="text-3xl font-bold text-center mb-8">`
- [ ] Line 317: `<h2 className="text-3xl font-bold mb-6">`
- [ ] Line 350: `<h2 className="text-4xl font-bold mb-6">`

#### FAQ Accordion Component
**File**: `src/components/ui/faq-accordion.tsx`
- [ ] Line 172: `<h3 className="text-lg font-semibold">`

#### Tabs Adapter
**File**: `src/components/adapters/TabsAdapter.tsx`
- [ ] Line 133: `<h3 itemProp="name" className="sr-only">`

### 2.2 Paragraph Elements (`<p>`)
**Should use**: `<Text>`

#### About Demo Page (15 violations)
**File**: `src/app/about-demo/AboutDemoPage.tsx`
- [ ] Line 57: `<p className="text-xl text-charcoal/80 max-w-3xl mx-auto">`
- [ ] Line 123: `<p className="text-lg">`
- [ ] Line 127: `<p className="text-lg">`
- [ ] Line 132: `<p className="text-lg">`
- [ ] Line 160: `<p>{item.desc}</p>`
- [ ] Line 181: `<p className="text-sm text-muted-foreground">`
- [ ] Line 208: `<p className="text-muted-foreground">`
- [ ] Line 213: `<p className="text-lg">`
- [ ] Line 217: `<p className="text-lg">`
- [ ] Line 222: `<p className="text-lg">`
- [ ] Line 230: `<p className="italic text-lg">`
- [ ] Line 318: `<p className="text-xl mb-8">`
- [ ] Line 331: `<p className="text-muted-foreground">`
- [ ] Line 351: `<p className="text-xl mb-8">`

#### Super Footer
**File**: `src/components/SuperFooter.tsx`
- [ ] Line 358: `<p className="text-xs text-center opacity-50 max-w-2xl mx-auto">`
- [ ] Line 368: `<p className="text-xs mt-2 opacity-60">`

#### Case Study Selector
**File**: `src/components/CaseStudySelector.tsx`
- [ ] Line 72: `<p className="text-xl text-charcoal/80 mb-8">`
- [ ] Line 110: `<p className="text-lg italic">`
- [ ] Line 120: `<p className="text-sm text-charcoal/60">`
- [ ] Line 121: `<p className="text-xl font-bold text-charcoal">`

#### Additional Files with `<p>` violations:
- [ ] `src/components/FooterSimple.tsx` (multiple instances)
- [ ] `src/app/pub-rescue/page.tsx` (multiple instances)
- [ ] `src/app/empty-pub-solutions/page.tsx` (multiple instances)
- [ ] `src/app/compete-with-pub-chains/page.tsx` (multiple instances)
- [ ] `src/app/quiet-midweek-solutions/page.tsx` (multiple instances)

### 2.3 Link Elements (`<a>`)
**Should use**: `<Link>`

#### Super Footer
**File**: `src/components/SuperFooter.tsx`
- [ ] Line 230: External link to the-anchor.pub
- [ ] Line 245: WhatsApp link
- [ ] Line 248: Phone link
- [ ] Line 251: Email link

#### Footer Simple
**File**: `src/components/FooterSimple.tsx`
- [ ] Line 105: Phone link
- [ ] Line 108: Email link

### 2.4 Section Elements (`<section>`)
**Should use**: `<Section>`

#### About Demo Page (9 violations)
**File**: `src/app/about-demo/AboutDemoPage.tsx`
- [ ] Line 50: Hero section with gradient background
- [ ] Line 74: Performance metrics section
- [ ] Line 106: Story and values section
- [ ] Line 192: Founder section
- [ ] Line 255: Quick facts section
- [ ] Line 285: FAQ section
- [ ] Line 303: Partners section
- [ ] Line 315: Visit CTA section
- [ ] Line 348: Final CTA section

#### Landing Pages
- [ ] Multiple `<section>` elements in each landing page

### 2.5 Div Elements for Layout (`<div>`)
**Should use**: `<Box>` or `<Container>`

**200+ violations across all files**

Most common patterns:
- [ ] `<div className="max-w-* mx-auto">` → `<Container>`
- [ ] `<div className="flex *">` → `<Box>`
- [ ] `<div className="grid *">` → `<Grid>`
- [ ] `<div className="absolute *">` → `<Box>`
- [ ] `<div className="relative *">` → `<Box>`

### 2.6 Span Elements (`<span>`)
**Should use**: `<Text inline>`

**50+ violations across files**

Examples:
- [ ] Icon spans: `<span className="text-3xl">🍺</span>`
- [ ] Inline text: `<span className="font-bold">text</span>`
- [ ] Decorative: `<span className="text-red-500">•</span>`

### 2.7 Image Elements (`<img>`)
**Should use**: `<OptimizedImage>`

- [ ] Test file: `src/test/utils.tsx` line 10

---

## 3. SANITY INTEGRATION GAPS

### 3.1 Content in Sanity but Not Used
- [ ] Some CTA messages defined but components use hardcoded
- [ ] Trust badges defined but not consistently used
- [ ] Social proof content partially integrated

### 3.2 Content NOT in Sanity (Should Be)
- [ ] All service descriptions and pricing
- [ ] Landing page hero sections
- [ ] Landing page feature lists
- [ ] Process/methodology explanations
- [ ] Timeline content
- [ ] Company values
- [ ] Team member information
- [ ] Location/visit information
- [ ] Emergency/crisis messaging
- [ ] Promotional offers
- [ ] Event ideas and strategies

### 3.3 Inconsistent Sanity Usage
- [ ] Some pages fetch from Sanity, others don't
- [ ] Fallback content often hardcoded instead of Sanity defaults
- [ ] Mixed patterns of content fetching

---

## 4. COMPONENT LIBRARY VIOLATIONS

### 4.1 Not Using Design System Components
- [ ] Custom styled elements instead of design tokens
- [ ] Inline styles instead of component props
- [ ] Raw Tailwind classes instead of component variants

### 4.2 Component Prop Misuse
- [ ] Using className for primary styling instead of props
- [ ] Not using semantic props (level, size, variant)
- [ ] Missing required accessibility props

### 4.3 Missing Component Features
- [ ] Not using loading states
- [ ] Missing error boundaries
- [ ] No skeleton loaders
- [ ] Missing progressive enhancement

---

## 5. EDGE CASES AND HIDDEN ISSUES

### 5.1 Email Templates
**File**: `email-signature.html`
**Issues**:
- [ ] Entire email signature hardcoded with contact info
- [ ] Business messaging: "Helping pubs save at least 5 hours a week with AI"
- [ ] CTAs: "Let's Chat About Your Pub"
- [ ] Taglines: "30-day money-back guarantee • Honest pricing • No tech jargon"

### 5.2 Hardcoded Colors and Styling
**Files**: Multiple
- [ ] SVG icons with hex colors: `#F59E0B`, `#14B8A6` (JourneyIcons.tsx)
- [ ] WhatsApp brand colors: `#25D366`, `#128C7E` (ButtonAdapter.tsx)
- [ ] App icon background: `#FF6B35` (icon.tsx, apple-icon.tsx)
- [ ] Should use CSS custom properties/theme variables

### 5.3 Form Validation Messages
**File**: `src/lib/validation.ts`
**Issues**:
- [ ] "Email is required"
- [ ] "Please enter a valid email address"
- [ ] "Phone number is required"
- [ ] "Please enter a valid UK phone number"
- [ ] "Name is required"
- [ ] "Message is required"
- [ ] "Pub name is required"
- [ ] All placeholder text hardcoded

### 5.4 WhatsApp Message Templates
**File**: `src/lib/constants.ts`
**Additional Templates Found**:
- [ ] "Hi Peter, got time for a quick chat about my pub?"
- [ ] "Hi Peter, I'd like to chat about Orange Jelly"
- [ ] "Hi Peter, I'm interested in AI training for my pub"
- [ ] Multiple scenario-specific templates

### 5.5 Accessibility Content
**File**: `src/lib/accessibility.ts`
- [ ] Screen reader text: 'Required field', 'Mobile navigation menu'
- [ ] ARIA labels and descriptions hardcoded
- [ ] Should be in localization system

### 5.6 API Response Messages
**File**: `src/app/api/preview/route.ts`
- [ ] Error: 'Invalid token', 'Missing slug'
- [ ] Success: 'Preview mode disabled'
- [ ] Should be centralized

### 5.7 Mobile-Specific Content
**Files**: MobileCTA and utilities
- [ ] CSS comments: "16px to prevent zoom on iOS"
- [ ] Touch target instructions
- [ ] Safe area calculations hardcoded

### 5.8 Structured Data with Hardcoded Content
**File**: `src/app/about/page.tsx`
- [ ] Organization details in JSON-LD
- [ ] Person descriptions
- [ ] Awards and achievements
- [ ] Should be dynamically generated

### 5.9 Configuration Issues
**Files**: Multiple
- [ ] Google Analytics ID: `GTM-WBHJ7Q2H` hardcoded (GoogleTagManager.tsx)
- [ ] CSP domains hardcoded (middleware.ts)
- [ ] Should use environment variables

---

## 6. SYSTEMIC PATTERNS AND ANTI-PATTERNS

### 6.1 Data Fetching Anti-Patterns
**Critical Issues**:
- [ ] Client-side markdown processing in BlogPost (should be server-side)
- [ ] Missing error boundaries for async operations
- [ ] No Suspense boundaries for async components
- [ ] No retry mechanisms for failed requests
- [ ] Complex fallback chains (Sanity → Markdown → Hardcoded)

### 6.2 Component Anti-Patterns
**Major Issues**:
- [ ] **Component Duplication**: 4 different BlogPost components
  - BlogPost.tsx
  - BlogPost 2.tsx
  - BlogPost 3.tsx
  - BlogPostClient.tsx
- [ ] **Massive Layout**: layout.tsx with 331 lines and hardcoded schemas
- [ ] **Adapter Overuse**: 14+ adapter components that seem unnecessary
- [ ] **Mixed Responsibilities**: UI and business logic in same components

### 6.3 State Management Issues
- [ ] No centralized state management
- [ ] ROI Calculator state lost on navigation
- [ ] Form state scattered across components
- [ ] Duplicated constants across files
- [ ] Missing state persistence

### 6.4 Performance Issues
- [ ] Large JSON-LD schemas in client components
- [ ] Only 5 components use React.memo/useMemo
- [ ] Dynamic imports underutilized
- [ ] Client-side markdown processing
- [ ] 32+ uses of dangerouslySetInnerHTML

### 6.5 Testing Gaps
**Critical**:
- [ ] Only 1 test file exists (Button.test.tsx)
- [ ] No integration tests
- [ ] No CMS integration tests
- [ ] No accessibility automated tests
- [ ] Complex components excluded from testing
- [ ] No E2E tests for critical user paths

### 6.6 Documentation Gaps
- [ ] No JSDoc or prop documentation
- [ ] Architecture undocumented
- [ ] Migration artifacts ("2.tsx", "3.tsx" files)
- [ ] No Storybook or component examples
- [ ] Complex content abstraction undocumented

### 6.7 Code Duplication
- [ ] 4 BlogPost component versions
- [ ] constants.ts and constants-sanity.ts overlap
- [ ] JSON-LD schemas repeated across components
- [ ] 14 similar adapter components
- [ ] Base URL repeated in multiple files

### 6.8 Security Concerns
**Good**:
- ✅ Comprehensive CSP headers
- ✅ HTTPS enforcement
- ✅ XSS protection headers

**Needs Attention**:
- [ ] 32+ dangerouslySetInnerHTML uses
- [ ] No visible input sanitization
- [ ] Some configuration still hardcoded

### 6.9 Build and Deploy Issues
- [ ] Complex fallback logic adds fragility
- [ ] Migration artifacts not cleaned up
- [ ] Basic error boundary but no custom error pages
- [ ] Heavy reliance on Sanity availability

---

## 7. PRIORITY MATRIX

### 🔴 CRITICAL (Week 1)
**Impact: SEO, Accessibility, Legal**
1. Replace all heading elements with `<Heading>`
2. Replace all `<p>` with `<Text>`
3. Fix missing alt text on images
4. Add proper ARIA labels
5. Migrate pricing to Sanity

### 🟠 HIGH (Week 2)
**Impact: Maintenance, Consistency**
1. Migrate service descriptions to Sanity
2. Replace all `<a>` with `<Link>`
3. Replace `<section>` with `<Section>`
4. Migrate landing page content
5. Fix component prop usage

### 🟡 MEDIUM (Week 3-4)
**Impact: Developer Experience**
1. Replace layout `<div>` with proper components
2. Migrate FAQ content to Sanity
3. Update timeline content
4. Fix inline `<span>` usage
5. Standardize component patterns

### 🟢 LOW (Month 2)
**Impact: Code Quality**
1. Add loading states
2. Implement error boundaries
3. Add skeleton loaders
4. Document patterns
5. Add linting rules

---

## 8. FILE-BY-FILE ISSUES

### Most Problematic Files (Ranked)

#### 1. `src/app/services/ServicesPage.tsx`
- **Raw Content**: 290+ lines
- **Raw HTML**: 30+ violations
- **Priority**: CRITICAL

#### 2. `src/app/about/AboutPage.tsx`
- **Raw Content**: 200+ lines
- **Raw HTML**: 25+ violations
- **Priority**: CRITICAL

#### 3. `src/app/about-demo/AboutDemoPage.tsx`
- **Raw Content**: 150+ lines
- **Raw HTML**: 40+ violations
- **Priority**: HIGH

#### 4. `src/app/pub-rescue/page.tsx`
- **Raw Content**: 200+ lines
- **Raw HTML**: 35+ violations
- **Priority**: HIGH

#### 5. `src/app/empty-pub-solutions/page.tsx`
- **Raw Content**: 150+ lines
- **Raw HTML**: 30+ violations
- **Priority**: HIGH

#### 6. `src/app/HomePage.tsx`
- **Raw Content**: 100+ lines
- **Raw HTML**: 20+ violations
- **Priority**: HIGH

#### 7. `src/components/SuperFooter.tsx`
- **Raw Content**: 50+ lines
- **Raw HTML**: 15+ violations
- **Priority**: MEDIUM

#### 8. `src/app/compete-with-pub-chains/page.tsx`
- **Raw Content**: 100+ lines
- **Raw HTML**: 25+ violations
- **Priority**: MEDIUM

#### 9. `src/app/quiet-midweek-solutions/page.tsx`
- **Raw Content**: 100+ lines
- **Raw HTML**: 25+ violations
- **Priority**: MEDIUM

#### 10. `src/lib/constants.ts`
- **Raw Content**: 100+ lines
- **Raw HTML**: N/A
- **Priority**: MEDIUM

---

## 📊 SUMMARY STATISTICS

### Total Violations by Type
- **Raw Content Lines**: 1,200+ (including email templates, validation messages)
- **Raw HTML Elements**: 350+
- **Missing Sanity Integration**: 75+ content types
- **Component Violations**: 250+
- **Performance Issues**: 50+
- **Testing Gaps**: 95% of components untested
- **Code Duplication**: 100+ instances
- **Hardcoded Configuration**: 25+ items

### Files Affected
- **Total Files with Issues**: 80+
- **Critical Files**: 15 (including email templates, layout.tsx)
- **High Priority Files**: 20
- **Medium Priority Files**: 30
- **Low Priority Files**: 15
- **Duplicate/Migration Files to Remove**: 10+

### Estimated Remediation Effort
- **Critical Issues**: 30 hours (increased due to testing needs)
- **High Priority**: 40 hours (component consolidation)
- **Medium Priority**: 50 hours (state management, performance)
- **Low Priority**: 25 hours
- **Testing Implementation**: 40 hours
- **Documentation**: 15 hours
- **Total Estimate**: 200 hours

---

## 🔄 NEXT STEPS

1. **Immediate**: Start with critical heading and paragraph replacements
2. **This Week**: Begin Sanity content migration for services
3. **Next Week**: Standardize component usage across landing pages
4. **This Month**: Complete all high and medium priority items
5. **Next Month**: Implement tooling and documentation

---

**Document Status**: COMPLETE - All discovery passes finished
**Last Updated**: 2025-08-07
**Discovery Methodology**: 3 comprehensive passes (initial + edge cases + patterns)
**Next Steps**: Begin remediation starting with critical issues

---

## 🎯 KEY TAKEAWAYS

### Most Critical Issues to Address:
1. **Testing**: 95% of components have no tests
2. **Component Duplication**: 4 BlogPost versions need consolidation
3. **Hardcoded Content**: 1,200+ lines need CMS migration
4. **Performance**: Client-side processing and missing optimizations
5. **Raw HTML**: 350+ elements violating component standards

### Quick Wins (Can fix in 1 day):
- Consolidate BlogPost components
- Move Google Analytics ID to env var
- Extract email signature to CMS
- Fix heading elements with <Heading>
- Add basic error boundaries

### Systemic Changes Needed:
- Implement comprehensive testing strategy
- Add state management solution
- Complete Sanity CMS migration
- Standardize component library usage
- Document architecture and patterns