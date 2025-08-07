# Page Template Migration Plan - Orange Jelly to shadcn/ui

## Executive Summary

The Orange Jelly website has 16 page templates across static pages, dynamic routes, and content marketing pages. This document outlines a comprehensive strategy for migrating all page templates to use shadcn/ui components while preserving business logic, SEO features, and Sanity CMS integrations.

**Total Effort Estimate**: 6-8 weeks (240-320 hours)
**Risk Level**: Medium
**Recommendation**: Phased migration starting with simple pages

## Page Template Inventory

### Complexity Distribution
- **Simple Pages**: 7 (44%)
- **Medium Pages**: 6 (37%)
- **Complex Pages**: 3 (19%)

### Page Categories
1. **Core Pages**: Home, About, Services, Contact, Results
2. **Content Marketing**: 5 solution-focused pages
3. **Blog System**: Listing, Post, Category pages
4. **System Pages**: 404, Loading, API routes

## Component Mapping Strategy

### Page Layout Components → shadcn/ui Patterns

| Current Pattern | shadcn/ui Solution | Implementation Notes |
|-----------------|-------------------|---------------------|
| `<Hero>` | Custom Hero using Card + Typography | Keep breadcrumb logic |
| `<Section>` | Custom Section wrapper | Preserve padding/background variants |
| `<CTASection>` | Card + Button composition | Maintain WhatsApp integration |
| `<TrustBar>` | Badge + Card composition | Keep animation timing |
| `<AnimatedItem>` | Framer Motion wrapper | Preserve animation types |

### Page-Specific Components → shadcn/ui

| Component | shadcn Base | Customization Required |
|-----------|-------------|----------------------|
| `ServiceCard` | Card + Badge | Service-specific props |
| `ProblemCard` | Card + Icon | Problem/solution layout |
| `ResultCard` | Card + Avatar | Testimonial formatting |
| `CaseStudySelector` | Tabs + Card | Interactive filtering |
| `ROICalculator` | Form + Input + Card | Complex state logic |
| `FAQItem` | Accordion | Schema markup |
| `RelatedLinks` | Card grid | Link clustering logic |

## Page-by-Page Migration Plan

### Phase 1: Simple Pages (Week 1-2)

#### 1. Content Marketing Pages (5 pages)
```typescript
// Example: pub-marketing-no-budget
// Current structure
<Hero />
<Section>
  <TrustBar />
  <ProblemCard />
  <FeatureList />
</Section>
<CTASection />

// shadcn/ui structure
<HeroSection /> // Custom component using Card
<ContentSection>
  <TrustIndicators /> // Badge composition
  <Card variant="problem" />
  <List /> // Custom list component
</ContentSection>
<CTABlock /> // Card + Button composition
```

**Migration Steps:**
1. Create HeroSection component using shadcn Card
2. Build TrustIndicators using Badge components
3. Convert ProblemCard to Card variant
4. Create reusable ContentSection wrapper
5. Test animations and responsive behavior

#### 2. System Pages
- **404 Page**: Simple Card-based layout
- **Loading Page**: Skeleton components
- **Preview API**: No UI changes needed

### Phase 2: Medium Complexity Pages (Week 2-3)

#### 1. About Page
**Key Components to Migrate:**
- Timeline visualization → Custom component with Card
- Journey icons → Keep as-is (SVG components)
- FAQ section → Accordion component
- Partner section → Badge grid

**Special Considerations:**
- Preserve PortableText rendering
- Maintain timeline animations
- Keep founder image optimization

#### 2. Services Page
**Key Components to Migrate:**
- ServiceCard grid → Card variants
- Money-back guarantee → Alert component
- Process steps → Stepper pattern

**Special Considerations:**
- Dynamic imports for performance
- Service comparison needs Table component
- WhatsApp button integration

#### 3. Contact Page
**Key Components to Migrate:**
- Contact options → Card grid
- Availability status → Badge + custom logic
- Contact form → Form components
- Map section → Keep iframe approach

#### 4. Blog Pages
**Key Components to Migrate:**
- BlogPostCard → Card composition
- CategoryList → Badge group
- TableOfContents → Navigation menu pattern
- ShareButtons → Button group

**Special Considerations:**
- Preserve markdown rendering
- Keep SEO schema generation
- Maintain reading time logic

### Phase 3: Complex Pages (Week 3-4)

#### 1. Home Page
**Migration Approach:**
```typescript
// Break into sections
const HomePage = () => {
  return (
    <>
      <HeroSection /> // shadcn components
      <TrustSection /> // Badge + Card
      <ProblemsSection /> // Card grid
      <CalculatorSection /> // Complex - keep logic
      <PartnershipsSection /> // Image grid
      <FAQSection /> // Accordion
    </>
  );
};
```

**Key Challenges:**
- ROI Calculator state management
- Multiple animation timings
- Heavy component composition
- Performance optimization

#### 2. Results Page
**Key Components:**
- CaseStudySelector → Tabs + Card + Filter
- Results grid → Card grid with data
- Statistics → Card with numbers

**Migration Strategy:**
1. Keep case study data logic
2. Use Tabs for filtering
3. Card compositions for display
4. Preserve animations

### Phase 4: Integration & Polish (Week 4-5)

#### Global Layout Updates
```typescript
// layout.tsx updates
- NavigationWrapper → NavigationMenu + Sheet (mobile)
- FooterWrapper → Custom footer with shadcn components
- ErrorBoundary → Keep as-is
- WhatsApp button → Keep custom implementation
```

#### Cross-Cutting Concerns
1. **Animations**:
   - Install Framer Motion
   - Create AnimatedWrapper component
   - Map animation types to Framer variants

2. **SEO/Schema**:
   - Preserve all schema generation
   - Keep Meta component structure
   - Maintain structured data

3. **Sanity Integration**:
   - No changes to data fetching
   - Keep PortableText rendering
   - Maintain fallback patterns

## Technical Implementation Guide

### 1. Setup shadcn/ui Theme
```typescript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#FF6B35", // Orange
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#2C5F5F", // Teal
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#FFF5EB", // Cream
          foreground: "#2D2D2D",
        },
      },
    },
  },
};
```

### 2. Create Page Template Patterns
```typescript
// templates/PageTemplate.tsx
export function PageTemplate({ 
  hero,
  sections,
  cta,
  schema 
}: PageTemplateProps) {
  return (
    <>
      {schema}
      <HeroSection {...hero} />
      {sections.map((section, i) => (
        <ContentSection key={i} {...section} />
      ))}
      <CTASection {...cta} />
    </>
  );
}
```

### 3. Component Adapter Pattern
```typescript
// adapters/Hero.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export function Hero({ title, subtitle, breadcrumbs }) {
  return (
    <section className="hero-gradient">
      <div className="container">
        {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
        <Card className="hero-card">
          <CardHeader>
            <h1>{title}</h1>
          </CardHeader>
          <CardContent>
            <p>{subtitle}</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
```

## Migration Checklist

### Pre-Migration
- [ ] Set up shadcn/ui in project
- [ ] Configure theme colors
- [ ] Create base template components
- [ ] Set up Framer Motion
- [ ] Create component library structure

### Per-Page Checklist
- [ ] Audit current component usage
- [ ] Create shadcn replacements
- [ ] Migrate layout structure
- [ ] Update imports
- [ ] Test responsive behavior
- [ ] Verify animations
- [ ] Check SEO/schema
- [ ] Test Sanity integration
- [ ] Performance audit
- [ ] Accessibility check

### Post-Migration
- [ ] Remove old components
- [ ] Update documentation
- [ ] Performance benchmarking
- [ ] SEO validation
- [ ] Cross-browser testing
- [ ] Mobile testing

## Risk Mitigation

### High Risk Areas
1. **ROI Calculator**: Keep existing logic, only update UI
2. **Sanity Integration**: Don't modify data layer
3. **SEO Schema**: Test thoroughly after each change
4. **Animations**: Create side-by-side comparisons

### Rollback Strategy
1. Use feature flags for gradual rollout
2. Keep old components during transition
3. A/B test critical pages
4. Monitor analytics for issues

## Success Metrics

### Technical Metrics
- [ ] Page load time improved by 15%
- [ ] Bundle size reduced by 20%
- [ ] Lighthouse scores maintained/improved
- [ ] Zero SEO regressions

### Quality Metrics
- [ ] 100% responsive behavior preserved
- [ ] All animations functioning
- [ ] Accessibility scores maintained
- [ ] Zero broken functionalities

### Developer Metrics
- [ ] 50% reduction in component code
- [ ] Improved TypeScript coverage
- [ ] Better component reusability
- [ ] Faster feature development

## Timeline & Resources

### Week-by-Week Breakdown
- **Week 1**: Setup + Simple pages (40h)
- **Week 2**: Medium pages part 1 (40h)
- **Week 3**: Medium pages part 2 (40h)
- **Week 4**: Complex pages (40h)
- **Week 5**: Integration & testing (40h)
- **Week 6**: Polish & documentation (40h)
- **Week 7-8**: Buffer & optimization (40-80h)

### Team Requirements
- 1-2 Senior Frontend Developers
- Design review at each phase
- QA testing throughout
- SEO specialist review

## Recommendations

1. **Start with pub-marketing-no-budget** as pilot page
2. **Create comprehensive Storybook** documentation
3. **Maintain feature parity** - no feature removal
4. **Test with real users** on staging
5. **Monitor Core Web Vitals** throughout

## Conclusion

Migrating all page templates to shadcn/ui is achievable within 6-8 weeks. The phased approach minimizes risk while allowing for continuous delivery. The investment will result in a more maintainable, performant, and developer-friendly codebase.

---

**Document Version**: 1.0
**Created**: November 2024
**Status**: Ready for Review