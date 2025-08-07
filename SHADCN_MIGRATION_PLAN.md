# shadcn/ui Migration Plan for Orange Jelly Website

## Executive Summary

The Orange Jelly website currently uses 87 custom components. Based on thorough analysis, approximately 35-40% can be directly replaced with shadcn/ui components, while 60-65% require custom implementation due to business logic, Sanity CMS integration, or specific design requirements.

**Estimated Timeline**: 4-6 weeks for full migration
**Risk Level**: Low to Medium
**Recommendation**: Phased migration starting with UI primitives

## Current Architecture Overview

### Component Statistics
- **Total Components**: 87
- **Direct shadcn Replacements**: 15-20 components
- **Partial Replacements**: 10-15 components  
- **Custom Required**: 50-55 components
- **Test Coverage**: <5% (only Button.test.tsx exists)

### Technology Stack
- Next.js 14.2.5 with App Router
- TypeScript (strict mode)
- Tailwind CSS 3.4.17
- Sanity CMS for content
- Limited Radix UI usage

## Component Migration Mapping

### ✅ Direct shadcn/ui Replacements

| Current Component | shadcn Component | Notes |
|------------------|------------------|-------|
| `Button.tsx` | Button | Add loading state variant |
| `Card.tsx` | Card | Use compound pattern |
| `Input.tsx` | Input | Minimal changes needed |
| `Badge.tsx` | Badge | Rename from AnchorBadge |
| `Separator.tsx` | Separator | Already using in demo |
| `Avatar.tsx` | Avatar | Already using in demo |
| `Accordion.tsx` | Accordion | Replace FAQItem usage |
| `Tabs.tsx` | Tabs | Already using in demo |
| `Loading.tsx` | Skeleton | Use for loading states |

### 🔄 Partial Replacements (Need Customization)

| Current Component | shadcn Base | Customization Needed |
|------------------|-------------|---------------------|
| `Heading.tsx` | Typography | Custom level system |
| `Text.tsx` | Typography | Size/color variants |
| `Form.tsx` | Form | Integrate with Zod |
| `ContactForm.tsx` | Form + Input | Keep validation logic |
| `NewsletterForm.tsx` | Form + Input | API integration |
| `CTASection.tsx` | Card + Button | Custom styling |
| `Hero.tsx` | Custom | Use shadcn patterns |
| `FAQItem.tsx` | Accordion | Schema markup |

### ❌ Custom Implementation Required

#### Business Logic Components
- `ROICalculator.tsx` - Complex calculator logic
- `ServiceComparison.tsx` - Comparison table
- `CaseStudySelector.tsx` - Interactive selector
- `AvailabilityStatus.tsx` - Real-time status
- `WhatsAppButton.tsx` - WhatsApp integration

#### Sanity CMS Components
- `PortableTextContent.tsx` - Rich text renderer
- `OptimizedImage.tsx` - Sanity image optimization
- All blog components - Deep CMS integration

#### Layout Components
- `Navigation.tsx` - Complex responsive nav
- `Footer.tsx` & variants - Custom design
- `StandardSections.tsx` - Composition patterns

#### SEO/Schema Components
- All `*Schema.tsx` files - Structured data
- `StructuredData.tsx` - Schema generation
- `Meta.tsx` - Meta tag management

## Migration Strategy

### Phase 1: Foundation (Week 1-2)
1. **Install shadcn/ui**
   ```bash
   npx shadcn-ui@latest init
   ```
2. **Configure shadcn**
   - Set up component aliases
   - Configure theme to match Orange Jelly colors
   - Set up CSS variables

3. **Migrate UI Primitives**
   - Button, Card, Input, Badge
   - Create compatibility layer for existing props
   - Update imports across codebase

### Phase 2: Forms & Interactions (Week 2-3)
1. **Form System Migration**
   - Implement shadcn Form with react-hook-form
   - Keep Zod validation schemas
   - Migrate ContactForm as pilot
   
2. **Interactive Components**
   - Accordion for FAQs
   - Tabs for content organization
   - Dialog/Modal for popups
   - Tooltip for help text

### Phase 3: Complex Components (Week 3-4)
1. **Layout Components**
   - Create NavigationMenu using shadcn patterns
   - Build responsive drawer for mobile
   - Implement Sheet for sidebars

2. **Data Display**
   - Table for ServiceComparison
   - Progress for loading states
   - Alert for notifications

### Phase 4: Polish & Testing (Week 4-5)
1. **Animation Integration**
   - Add Framer Motion for animations
   - Recreate AnimatedItem patterns
   - Ensure performance targets met

2. **Testing & QA**
   - Write tests for new components
   - Visual regression testing
   - Performance benchmarking
   - Accessibility audit

### Phase 5: Documentation (Week 5-6)
1. **Component Documentation**
   - Storybook setup for shadcn components
   - Usage examples
   - Migration guide for team

## Breaking Changes & Mitigation

### Prop Interface Changes
```typescript
// Current Button
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'custom';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  whatsapp?: boolean;
}

// shadcn Button - need adapter
interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}
```

**Solution**: Create adapter components during transition
```typescript
// adapters/Button.tsx
import { Button as ShadcnButton } from '@/components/ui/button';

export function Button({ variant, size, loading, ...props }) {
  const shadcnVariant = mapVariant(variant);
  const shadcnSize = mapSize(size);
  
  return (
    <ShadcnButton 
      variant={shadcnVariant} 
      size={shadcnSize}
      disabled={loading}
      {...props}
    >
      {loading && <Spinner />}
      {props.children}
    </ShadcnButton>
  );
}
```

### Style Conflicts
- Current components use direct Tailwind classes
- shadcn uses CSS variables for theming
- Need to map Orange Jelly colors to CSS variables

### Import Path Changes
```typescript
// Before
import Button from '@/components/Button';

// After  
import { Button } from '@/components/ui/button';
```

## Benefits of Migration

### Developer Experience
- ✅ Industry-standard component patterns
- ✅ Better TypeScript support
- ✅ Comprehensive documentation
- ✅ Active community support
- ✅ Regular updates and bug fixes

### Performance
- ✅ Smaller bundle size (tree-shaking)
- ✅ Optimized Radix UI primitives
- ✅ Better accessibility out-of-box
- ✅ Reduced custom CSS

### Maintainability
- ✅ Consistent API across components
- ✅ Less custom code to maintain
- ✅ Easier onboarding for new devs
- ✅ Better testing patterns

## Risk Assessment

### Low Risk
- UI primitive replacements
- Form components (well-tested patterns)
- Display components (badges, cards)

### Medium Risk  
- Navigation migration (complex logic)
- Animation system changes
- Form validation integration

### High Risk
- Breaking existing functionality
- Performance regression
- SEO impact from markup changes

## Resource Requirements

### Development Team
- 1-2 Frontend developers
- 4-6 weeks timeline
- ~160-240 hours total effort

### Additional Resources
- Designer review for UI consistency
- QA testing throughout
- Performance monitoring tools

## Success Metrics

1. **Code Quality**
   - 50% reduction in component code
   - 80%+ test coverage on new components
   - TypeScript strict mode compliance

2. **Performance**
   - Maintain or improve Core Web Vitals
   - Reduce JavaScript bundle by 10-20%
   - Faster development velocity

3. **Developer Satisfaction**
   - Easier component development
   - Better documentation
   - Reduced debugging time

## Recommendations

1. **Start Small**: Begin with Button and Card components
2. **Create Adapters**: Maintain backward compatibility
3. **Test Extensively**: Each phase needs thorough testing
4. **Document Changes**: Keep migration guide updated
5. **Monitor Performance**: Track metrics throughout

## Next Steps

1. Get stakeholder approval
2. Set up shadcn/ui in a feature branch
3. Create proof-of-concept with 2-3 components
4. Review with team and adjust plan
5. Begin phased migration

---

**Document Version**: 1.0  
**Last Updated**: November 2024  
**Status**: DRAFT - Pending Approval