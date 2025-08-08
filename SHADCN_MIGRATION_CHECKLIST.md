# shadcn/ui Migration Checklist for Orange Jelly

## Pre-Migration Checklist

### ✅ Setup & Configuration
- [ ] Create feature branch: `feature/shadcn-migration`
- [ ] Install shadcn/ui CLI: `npx shadcn-ui@latest init`
- [ ] Configure shadcn with Orange Jelly theme:
  ```typescript
  // components.json
  {
    "style": "default",
    "tailwind": {
      "config": "tailwind.config.js",
      "css": "src/app/globals.css",
      "baseColor": "orange",
      "cssVariables": true
    }
  }
  ```
- [ ] Add CSS variables to globals.css for Orange Jelly colors
- [ ] Set up component aliases in tsconfig.json
- [ ] Install additional dependencies:
  - [ ] `react-hook-form` for forms
  - [ ] `framer-motion` for animations
  - [ ] `@radix-ui/react-navigation-menu` for nav
- [ ] Create `/components/ui` directory structure

### ✅ Testing Infrastructure
- [ ] Set up visual regression testing (Chromatic/Percy)
- [ ] Create component testing strategy
- [ ] Set up Storybook for component documentation
- [ ] Create migration test checklist

## Phase 1: Core UI Components (Week 1)

### Button Component
- [ ] Install: `npx shadcn-ui@latest add button`
- [ ] Create adapter at `/components/adapters/Button.tsx`
- [ ] Map variants:
  - `primary` → `default` (orange background)
  - `secondary` → `secondary` (teal background)
  - `outline` → `outline`
  - `ghost` → `ghost`
  - `custom` → keep as variant extension
- [ ] Add loading state support
- [ ] Add WhatsApp variant
- [ ] Update all imports (~50+ files)
- [ ] Test all button interactions
- [ ] Visual regression test

### Card Component
- [ ] Install: `npx shadcn-ui@latest add card`
- [ ] Create adapter for existing props
- [ ] Map variants:
  - `default` → base card
  - `bordered` → add border classes
  - `shadowed` → add shadow classes
  - `colored` → handle background prop
- [ ] Update all imports (~30+ files)
- [ ] Test responsive behavior
- [ ] Visual regression test

### Input Component
- [ ] Install: `npx shadcn-ui@latest add input`
- [ ] Add variants for existing styles
- [ ] Add error state styling
- [ ] Update form components
- [ ] Test with existing validation
- [ ] Check mobile behavior (no zoom)

### Badge Component
- [ ] Install: `npx shadcn-ui@latest add badge`
- [ ] Rename AnchorBadge usages
- [ ] Add Orange Jelly color variants
- [ ] Update imports
- [ ] Visual test all variants

## Phase 2: Form System (Week 2)

### Form Infrastructure
- [ ] Install: `npx shadcn-ui@latest add form`
- [ ] Set up react-hook-form integration
- [ ] Create form adapter for Zod schemas
- [ ] Test with existing validation rules

### ContactForm Migration
- [ ] Create new ContactForm with shadcn Form
- [ ] Migrate validation logic
- [ ] Keep sanitization functions
- [ ] Test error states
- [ ] Test loading states
- [ ] Test API submission
- [ ] A/B test against old form

### NewsletterForm Migration
- [ ] Migrate to shadcn Form
- [ ] Test Mailchimp integration
- [ ] Verify error handling
- [ ] Test success states

## Phase 3: Interactive Components (Week 3)

### Accordion (FAQ)
- [ ] Install: `npx shadcn-ui@latest add accordion`
- [ ] Migrate FAQItem to Accordion
- [ ] Keep schema markup
- [ ] Update all FAQ sections
- [ ] Test keyboard navigation
- [ ] Test screen readers

### Tabs Component
- [ ] Install: `npx shadcn-ui@latest add tabs`
- [ ] Update existing tab implementations
- [ ] Test responsive behavior
- [ ] Verify accessibility

### Navigation Menu
- [ ] Install: `npx shadcn-ui@latest add navigation-menu`
- [ ] Create responsive navigation
- [ ] Add mobile drawer/sheet
- [ ] Migrate mobile menu logic
- [ ] Test all breakpoints
- [ ] Test keyboard navigation

### Loading States
- [ ] Install: `npx shadcn-ui@latest add skeleton`
- [ ] Replace Loading component
- [ ] Create loading patterns for:
  - [ ] Cards
  - [ ] Lists
  - [ ] Forms
  - [ ] Images

## Phase 4: Layout Components (Week 4)

### Dialog/Modal
- [ ] Install: `npx shadcn-ui@latest add dialog`
- [ ] Create modal patterns
- [ ] Test focus management
- [ ] Test escape key handling

### Sheet (Mobile Drawer)
- [ ] Install: `npx shadcn-ui@latest add sheet`
- [ ] Use for mobile navigation
- [ ] Test swipe gestures
- [ ] Test backdrop clicks

### Separator
- [ ] Install: `npx shadcn-ui@latest add separator`
- [ ] Replace existing separators
- [ ] Test in different contexts

## Phase 5: Advanced Components (Week 5)

### Table (ServiceComparison)
- [ ] Install: `npx shadcn-ui@latest add table`
- [ ] Migrate ServiceComparison
- [ ] Add responsive behavior
- [ ] Test data sorting

### Progress
- [ ] Install: `npx shadcn-ui@latest add progress`
- [ ] Use in ROI Calculator
- [ ] Add to loading states
- [ ] Test animations

### Alert
- [ ] Install: `npx shadcn-ui@latest add alert`
- [ ] Create notification patterns
- [ ] Add to form feedback
- [ ] Test dismissal

### Tooltip
- [ ] Install: `npx shadcn-ui@latest add tooltip`
- [ ] Add to help text
- [ ] Test on mobile (touch)
- [ ] Verify positioning

## Breaking Changes Checklist

### Import Changes
- [ ] Create codemod for import updates
- [ ] Update all component imports
- [ ] Update test imports
- [ ] Update Storybook imports

### Prop Changes
- [ ] Document all prop mappings
- [ ] Create adapters for compatibility
- [ ] Update TypeScript interfaces
- [ ] Fix type errors

### Style Changes
- [ ] Map Tailwind classes to CSS variables
- [ ] Update custom animations
- [ ] Test dark mode (if applicable)
- [ ] Verify mobile styles

### Functionality Changes
- [ ] Test all interactive components
- [ ] Verify form submissions
- [ ] Check loading states
- [ ] Test error boundaries

## Performance Checklist

### Bundle Size
- [ ] Measure before migration bundle
- [ ] Measure after each phase
- [ ] Target: 10-20% reduction
- [ ] Tree-shake unused code

### Core Web Vitals
- [ ] Test LCP before/after
- [ ] Test INP before/after
- [ ] Test CLS before/after
- [ ] Run Lighthouse audits

### Accessibility
- [ ] Run axe DevTools audit
- [ ] Test keyboard navigation
- [ ] Test screen readers
- [ ] Verify ARIA labels

## Testing Checklist

### Unit Tests
- [ ] Update existing tests
- [ ] Add tests for adapters
- [ ] Test component variants
- [ ] Test error states

### Integration Tests
- [ ] Test form submissions
- [ ] Test navigation flows
- [ ] Test dynamic content
- [ ] Test API interactions

### E2E Tests
- [ ] Update Playwright tests
- [ ] Test critical user paths
- [ ] Test responsive behavior
- [ ] Test performance

### Manual Testing
- [ ] Test on real devices
- [ ] Test in all browsers
- [ ] Test offline behavior
- [ ] Test error scenarios

## Post-Migration Checklist

### Documentation
- [ ] Update component docs
- [ ] Create migration guide
- [ ] Update README
- [ ] Create Storybook stories

### Code Cleanup
- [ ] Remove old components
- [ ] Remove unused dependencies
- [ ] Update package.json
- [ ] Clean up adapters

### Monitoring
- [ ] Set up error tracking
- [ ] Monitor performance metrics
- [ ] Track user feedback
- [ ] Monitor bundle size

### Team Training
- [ ] Create shadcn guide
- [ ] Host knowledge session
- [ ] Update coding standards
- [ ] Create example patterns

## Rollback Plan

### If Issues Arise
1. [ ] Feature flag new components
2. [ ] A/B test critical paths
3. [ ] Keep old components available
4. [ ] Document rollback steps
5. [ ] Test rollback procedure

## Sign-offs

### Phase 1 Complete
- [ ] Dev Lead approval
- [ ] Design review
- [ ] QA sign-off
- [ ] Performance validated

### Phase 2 Complete
- [ ] Forms working correctly
- [ ] No regression in conversions
- [ ] Accessibility maintained

### Phase 3 Complete
- [ ] Interactive components stable
- [ ] Mobile experience improved
- [ ] No breaking changes

### Phase 4 Complete
- [ ] Layout consistency verified
- [ ] Responsive behavior tested
- [ ] Performance targets met

### Phase 5 Complete
- [ ] All components migrated
- [ ] Documentation complete
- [ ] Team trained
- [ ] Metrics improved

## Success Metrics

- [ ] 50% reduction in component code
- [ ] 80%+ test coverage achieved
- [ ] Bundle size reduced by 15%+
- [ ] Core Web Vitals maintained/improved
- [ ] Zero accessibility regressions
- [ ] Development velocity increased
- [ ] Team satisfaction improved

---

**Status**: Ready for Implementation
**Last Updated**: November 2024
**Owner**: Development Team