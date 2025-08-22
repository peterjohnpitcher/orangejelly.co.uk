# Migration Execution TODO - Complete shadcn/ui Implementation

## 🎯 Pre-Migration Setup

### Environment Setup
- [ ] Create feature branch: `feature/shadcn-complete-migration`
- [ ] Install shadcn/ui CLI
- [ ] Configure shadcn with Orange Jelly theme
- [ ] Install required dependencies:
  - [ ] `@radix-ui/react-*` (all needed primitives)
  - [ ] `react-hook-form` for forms
  - [ ] `@hookform/resolvers` for Zod integration
  - [ ] `framer-motion` for animations
  - [ ] `schema-dts` for TypeScript schema types
  - [ ] `class-variance-authority` for variants
- [ ] Set up CSS variables in globals.css
- [ ] Configure component aliases
- [ ] Create `/components/ui` directory

### Testing & Validation Setup
- [ ] Configure Playwright for E2E tests
- [ ] Set up visual regression testing
- [ ] Install accessibility testing tools
- [ ] Create schema validation scripts
- [ ] Set up performance monitoring

## 📦 Phase 1: Core Components (Day 1-3)

### Button Component
- [ ] Install: `npx shadcn-ui@latest add button`
- [ ] Create adapter for existing props
- [ ] Add loading state variant
- [ ] Add WhatsApp variant
- [ ] Add size mappings (small → sm, medium → default, large → lg)
- [ ] Add external link support
- [ ] Add full aria-label support
- [ ] Create tests for all variants
- [ ] Update all imports (50+ files)

### Card Component  
- [ ] Install: `npx shadcn-ui@latest add card`
- [ ] Map existing variants (bordered, shadowed, colored)
- [ ] Add background color support
- [ ] Add padding variants
- [ ] Create compound component exports
- [ ] Test responsive behavior
- [ ] Update all imports (30+ files)

### Typography Components
- [ ] Create Heading component with:
  - [ ] Semantic h1-h6 rendering
  - [ ] Schema markup support
  - [ ] SEO-friendly props
  - [ ] Accessibility attributes
- [ ] Create Text component with:
  - [ ] p and span variants
  - [ ] Size system (xs → 2xl)
  - [ ] Color variants
  - [ ] Weight variants
- [ ] Create List components (ul, ol, li)
- [ ] Add schema support to all

### Form Components
- [ ] Install: `npx shadcn-ui@latest add form`
- [ ] Install: `npx shadcn-ui@latest add input`
- [ ] Install: `npx shadcn-ui@latest add label`
- [ ] Create form validation patterns
- [ ] Integrate with existing Zod schemas
- [ ] Add error state styling
- [ ] Add loading states
- [ ] Test with ContactForm

## 📦 Phase 2: Layout Components (Day 4-6)

### Navigation Components
- [ ] Install: `npx shadcn-ui@latest add navigation-menu`
- [ ] Install: `npx shadcn-ui@latest add sheet` (mobile drawer)
- [ ] Migrate Navigation.tsx
- [ ] Preserve mobile menu logic
- [ ] Add schema markup for SiteNavigationElement
- [ ] Test all breakpoints
- [ ] Ensure keyboard navigation

### Section & Layout
- [ ] Create Section wrapper with shadcn patterns
- [ ] Add background variants
- [ ] Add padding options
- [ ] Create Container component
- [ ] Create Grid component using shadcn principles
- [ ] Add responsive utilities

### Hero Component
- [ ] Create Hero using Card composition
- [ ] Add breadcrumb support
- [ ] Add CTA button integration
- [ ] Add schema markup
- [ ] Test all variants

## 📦 Phase 3: Interactive Components (Day 7-9)

### Accordion (FAQ)
- [ ] Install: `npx shadcn-ui@latest add accordion`
- [ ] Migrate all FAQItem usage
- [ ] Add FAQPage schema
- [ ] Add Question/Answer markup
- [ ] Test keyboard navigation
- [ ] Ensure smooth animations

### Tabs
- [ ] Install: `npx shadcn-ui@latest add tabs`
- [ ] Create tab patterns for content
- [ ] Add accessible labels
- [ ] Test responsive behavior

### Dialog/Modal
- [ ] Install: `npx shadcn-ui@latest add dialog`
- [ ] Create modal patterns
- [ ] Add focus management
- [ ] Test escape key handling

### Loading States
- [ ] Install: `npx shadcn-ui@latest add skeleton`
- [ ] Create loading patterns for:
  - [ ] Cards
  - [ ] Lists  
  - [ ] Forms
  - [ ] Images
  - [ ] Tables

## 📦 Phase 4: Complex Components (Day 10-12)

### Table (ServiceComparison)
- [ ] Install: `npx shadcn-ui@latest add table`
- [ ] Migrate ServiceComparison
- [ ] Add responsive behavior
- [ ] Add sorting capabilities
- [ ] Add schema markup

### ROI Calculator
- [ ] Keep calculation logic
- [ ] Update UI with shadcn components
- [ ] Add form validation
- [ ] Add loading states
- [ ] Add error handling
- [ ] Test all calculations

### Case Study Selector
- [ ] Migrate to Tabs + Cards
- [ ] Keep filtering logic
- [ ] Add smooth transitions
- [ ] Add schema markup
- [ ] Test performance

## 📄 Phase 5: Page Migration (Day 13-20)

### Week 3: Simple Pages First
- [ ] `/pub-marketing-no-budget`
  - [ ] Replace all raw HTML
  - [ ] Add full schema markup
  - [ ] Optimize meta tags
  - [ ] Test mobile experience
- [ ] `/compete-with-pub-chains`
- [ ] `/quiet-midweek-solutions`
- [ ] `/empty-pub-solutions`
- [ ] `/pub-rescue`
- [ ] `/not-found` (404 page)
- [ ] `/loading`

### Week 4: Core Pages
- [ ] `/services`
  - [ ] Migrate ServiceCard components
  - [ ] Add Service schema
  - [ ] Add Offer schema
  - [ ] Test dynamic imports
- [ ] `/contact`
  - [ ] Migrate ContactForm
  - [ ] Add ContactPage schema
  - [ ] Add LocalBusiness schema
  - [ ] Test form submission
- [ ] `/about`
  - [ ] Migrate timeline
  - [ ] Add Person schema
  - [ ] Add Organization schema
  - [ ] Preserve animations

### Week 5: Complex Pages
- [ ] `/` (Home)
  - [ ] Careful ROI Calculator migration
  - [ ] Add all schemas
  - [ ] Performance optimization
  - [ ] Test all sections
- [ ] `/results`
  - [ ] Migrate CaseStudySelector
  - [ ] Add Review schema
  - [ ] Add TestimonialPage schema
- [ ] Blog system
  - [ ] `/licensees-guide`
  - [ ] `/licensees-guide/[slug]`
  - [ ] `/licensees-guide/category/[category]`

## 🔍 Phase 6: SEO Implementation (Throughout)

### Schema Implementation
- [ ] Create schema components for:
  - [ ] Organization (site-wide)
  - [ ] WebSite with SearchAction
  - [ ] LocalBusiness
  - [ ] Service
  - [ ] FAQPage
  - [ ] Article/BlogPosting
  - [ ] Person (Peter Pitcher)
  - [ ] Review/AggregateRating
  - [ ] BreadcrumbList
  - [ ] ImageObject

### Meta Tag Optimization
- [ ] Unique titles for all pages (50-60 chars)
- [ ] Meta descriptions (150-160 chars)
- [ ] Open Graph tags
- [ ] Twitter Card tags
- [ ] Canonical URLs
- [ ] Language declarations

### Performance Optimization
- [ ] Image optimization with next/image
- [ ] Lazy loading implementation
- [ ] Code splitting
- [ ] Bundle size monitoring
- [ ] Core Web Vitals tracking

## ✅ Phase 7: Validation & Testing (Day 21-25)

### Component Testing
- [ ] Unit tests for all components
- [ ] Integration tests for forms
- [ ] Visual regression tests
- [ ] Accessibility tests
- [ ] Performance tests

### SEO Validation
- [ ] Google Rich Results Test for all pages
- [ ] Schema.org validator
- [ ] Lighthouse audits (target 90+)
- [ ] Mobile-Friendly Test
- [ ] PageSpeed Insights

### Cross-browser Testing
- [ ] Chrome
- [ ] Safari
- [ ] Firefox
- [ ] Edge
- [ ] Mobile Safari
- [ ] Chrome Mobile

### Device Testing
- [ ] iPhone (various models)
- [ ] Android phones
- [ ] iPad
- [ ] Desktop (various resolutions)

## 📊 Phase 8: Cleanup & Documentation (Day 26-30)

### Code Cleanup
- [ ] Remove old components
- [ ] Remove unused dependencies
- [ ] Update imports everywhere
- [ ] Clean up adapters
- [ ] Optimize bundle

### Documentation
- [ ] Component usage guide
- [ ] SEO implementation guide
- [ ] Migration notes
- [ ] Team training materials
- [ ] Troubleshooting guide

### Deployment
- [ ] Final testing on staging
- [ ] Performance benchmarking
- [ ] SEO validation
- [ ] Gradual rollout plan
- [ ] Monitoring setup

## 🎯 Success Criteria

### Must Complete
- [ ] 100% component coverage (no raw HTML)
- [ ] 100% schema implementation
- [ ] All pages migrated
- [ ] All tests passing
- [ ] Performance targets met

### Quality Gates
- [ ] Lighthouse scores 90+ on all pages
- [ ] Zero accessibility errors
- [ ] All schema validates
- [ ] No visual regressions
- [ ] Mobile experience perfect

### Final Checklist
- [ ] All 47 files with raw HTML fixed
- [ ] All 17 pages fully migrated
- [ ] All imports updated
- [ ] All tests written
- [ ] All documentation complete
- [ ] Team trained
- [ ] Rollback plan ready

---

**Timeline**: 30 days
**Status**: Ready to Execute
**First Action**: Set up feature branch and install shadcn/ui