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
npm run test         # Run component tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Check test coverage
```

### Key Facts to Remember
- **Pricing**: £62.50/hour plus VAT (no packages)
- **Real metrics**: 25-35 quiz attendees, 300 contacts, 71% food GP
- **First client**: September 2025 (training pub chain)
- **Founded**: March 2019 (took over The Anchor)
- **Tech stack**: Next.js 14, TypeScript, Tailwind CSS, React Server Components

### Most Important Rules
1. ✅ Always use components (`<Heading>`, `<Text>`, `<OptimizedImage>`)
2. ✅ Never use raw HTML (`<h1>`, `<p>`, `<img>`)
3. ✅ Use real metrics only (see Core Business Facts)
4. ✅ Test mobile-first
5. ✅ Include alt text on all images
6. ✅ Server Components by default (add `"use client"` only when needed)

### Where to Find Things
- **Constants**: `src/lib/constants.ts`
- **Components**: `src/components/`
- **Pages**: `src/app/`
- **Blog posts**: **IN SANITY CMS** (NOT markdown files!)
- **Public assets**: `public/`
- **Tests**: `src/components/**/*.test.tsx`

### ⚠️ CRITICAL: Blog Content Location
**ALL BLOG CONTENT IS STORED IN SANITY CMS, NOT IN MARKDOWN FILES!**
- Blog posts are managed through Sanity Studio
- Any `/content/blog/` folder with markdown files is OBSOLETE and should be deleted
- To update blog content, use Sanity write client or Sanity Studio
- Blog schema: `sanity-studio/schemas/blogPost.ts`

### 📅 Scheduled Publishing (NEW!)
**Blog posts can now be scheduled for automatic publication:**
- Set status to "Scheduled" and future publishedDate in Sanity Studio
- Posts automatically publish at the specified time (requires Sanity Growth plan)
- Utility functions: `src/lib/scheduled-publishing.ts`
- Monitoring API: `/api/publish-scheduled`
- Optimal publish times configured for UK pub industry

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

## 🏗️ Component Architecture Standards (2025)

### Server vs Client Components
Following React and Next.js 2025 best practices:

```typescript
// ✅ Server Component (default)
// No "use client" directive - runs on server
export default function ServiceCard({ service }: Props) {
  // Can fetch data, access databases, use server-only APIs
  const data = await fetchServiceData(service.id);
  
  return <Card>{/* ... */}</Card>;
}

// ✅ Client Component (only when needed)
"use client";
export default function InteractiveChart({ data }: Props) {
  const [selectedRange, setSelectedRange] = useState('week');
  // Needs state, effects, or browser APIs
}
```

**When to use Client Components:**
- User interactions (onClick, onChange)
- Browser APIs (window, document)
- State management (useState, useReducer)
- Effects (useEffect, useLayoutEffect)
- Third-party client libraries

### Component Composition Patterns

#### Compound Components
```typescript
// ✅ Flexible, composable API
<ServiceCard>
  <ServiceCard.Header>
    <ServiceCard.Title>Social Media Management</ServiceCard.Title>
    <ServiceCard.Price>£62.50/hour</ServiceCard.Price>
  </ServiceCard.Header>
  <ServiceCard.Body>
    <ServiceCard.Description>
      Proven strategies from The Anchor
    </ServiceCard.Description>
  </ServiceCard.Body>
</ServiceCard>
```

#### asChild Pattern (Radix UI Style)
```typescript
// ✅ Better than polymorphic "as" prop
<Button asChild>
  <Link href="/services">View Services</Link>
</Button>
```

### TypeScript Best Practices

#### Discriminated Unions for Variants
```typescript
// ✅ Type-safe variant props
type ButtonProps = 
  | { variant: 'primary'; primaryColor?: string }
  | { variant: 'secondary'; outlineStyle?: 'solid' | 'dashed' }
  | { variant: 'ghost'; hoverOpacity?: number };

// Usage enforces correct prop combinations
<Button variant="primary" primaryColor="#FF6B35" /> // ✅ Valid
<Button variant="ghost" primaryColor="#FF6B35" />  // ❌ Type error
```

#### Generic Components
```typescript
// ✅ Reusable, type-safe components
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

export function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map(item => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}
```

### Component Props Standards

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
  placeholder="blur"  // Optional - use with blurDataURL
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
  loading={false}  // Optional, shows loading state
  disabled={false}  // Optional
  external={true}  // Optional, for external links
  whatsapp={true}  // Optional, for WhatsApp buttons
  className=""  // Optional additional styles
  aria-label=""  // Required for icon-only buttons
>

// Card Component
<Card
  variant="bordered|shadowed|colored|default"  // Optional
  background="white|cream|orange|teal|orange-light"  // Optional
  padding="small|medium|large"  // Optional
  asChild={false}  // Optional, for composition
  className=""  // Optional additional styles
>
```

## ⚡ Performance Standards - 2025 Best Practices

### React Performance Features

#### React Compiler (New in 2025)
```typescript
// ✅ Automatic optimization - no manual memo needed
export default function ExpensiveComponent({ data }) {
  // React Compiler automatically memoizes
  const processed = expensiveCalculation(data);
  return <div>{processed}</div>;
}
```

#### Manual Optimization (When Needed)
```typescript
// ✅ Use when React Compiler isn't available
import { memo, useMemo, useCallback } from 'react';

export default memo(function ServiceList({ services, onSelect }) {
  const sortedServices = useMemo(
    () => services.sort((a, b) => a.order - b.order),
    [services]
  );
  
  const handleSelect = useCallback(
    (id: string) => onSelect(id),
    [onSelect]
  );
  
  return <>{/* ... */}</>;
});
```

### Next.js 15 Optimizations

#### Partial Prerendering (PPR)
```typescript
// app/layout.tsx
export const experimental_ppr = true;

// Mark dynamic sections with Suspense
<Suspense fallback={<LoadingMetrics />}>
  <LiveMetrics /> {/* Dynamic content */}
</Suspense>
```

#### Dynamic Imports with Prefetching
```typescript
// ✅ Load heavy components on demand
const ROICalculator = dynamic(
  () => import('@/components/ROICalculator'),
  {
    loading: () => <CalculatorSkeleton />,
    ssr: false,
    // Prefetch for better UX
    suspense: true,
  }
);
```

### Performance Budget
Every feature must respect our performance constraints:

#### Core Web Vitals Targets (2025)
- **LCP (Largest Contentful Paint)**: < 2.5s
- **INP (Interaction to Next Paint)**: < 200ms (replaces FID)
- **CLS (Cumulative Layout Shift)**: < 0.1
- **TTFB (Time to First Byte)**: < 600ms

#### Resource Budgets
- **JavaScript**: < 200KB compressed
- **CSS**: < 50KB compressed
- **Images**: < 100KB per image (WebP/AVIF format)
- **Total page weight**: < 1MB
- **Font files**: Maximum 2 font weights

### Image Optimization
```typescript
// ✅ Optimized image with blur placeholder
import { getImageWithPlaceholder } from '@/lib/images';

const imageProps = await getImageWithPlaceholder('/hero.jpg');

<OptimizedImage
  {...imageProps}
  alt="The Anchor on a busy Friday night"
  priority // LCP image
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

## ♿ Accessibility Standards - WCAG 2.1 AA Compliance

### Visual Design Requirements
- **Color contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Focus indicators**: Visible keyboard focus on all interactive elements
- **Text sizing**: Base font minimum 16px, scalable to 200%
- **Touch targets**: Minimum 44×44 CSS pixels (WCAG 2.2 coming: 24×24)

### ARIA Best Practices
**First Rule**: Prefer semantic HTML over ARIA

```typescript
// ❌ Bad - Using ARIA when semantic HTML exists
<div role="button" onClick={handleClick}>Click me</div>

// ✅ Good - Semantic HTML
<button onClick={handleClick}>Click me</button>

// ✅ Good - ARIA for complex patterns
<button
  aria-expanded={isOpen}
  aria-controls="menu-items"
  aria-haspopup="true"
>
  Menu
</button>
```

### Component Accessibility Patterns

#### Form Validation
```typescript
<Input
  label="Email"
  type="email"
  error={errors.email}
  aria-required="true"
  aria-invalid={!!errors.email}
  aria-describedby={errors.email ? "email-error" : "email-hint"}
/>
{errors.email && (
  <Text id="email-error" role="alert" color="error">
    {errors.email}
  </Text>
)}
```

#### Dynamic Content
```typescript
// ✅ Announce dynamic updates
<div aria-live="polite" aria-atomic="true">
  <Text>{savedMessage}</Text>
</div>

// ✅ Loading states
<Button loading aria-busy="true">
  <span aria-hidden="true">⚪</span>
  <span className="sr-only">Loading, please wait</span>
</Button>
```

### Keyboard Navigation
```typescript
// ✅ Implement roving tabindex for lists
function ServiceList({ services }) {
  const [focusedIndex, setFocusedIndex] = useState(0);
  
  const handleKeyDown = (e: KeyboardEvent, index: number) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((index + 1) % services.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((index - 1 + services.length) % services.length);
        break;
    }
  };
  
  return services.map((service, index) => (
    <ServiceCard
      key={service.id}
      tabIndex={index === focusedIndex ? 0 : -1}
      onKeyDown={(e) => handleKeyDown(e, index)}
    />
  ));
}
```

## 🧪 Testing Standards - Modern Approach

### Testing Philosophy (2025)
Following Kent C. Dodds' Testing Trophy:

```
       /\
      /  \    E2E Tests (Playwright)
     /    \
    /──────\  Integration Tests (Primary Focus)
   /        \
  /──────────\ Unit Tests (Minimal)
 /____________\
    Static     TypeScript, ESLint
```

### Component Testing with Vitest

#### Setup
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test/'],
    },
  },
});
```

#### Testing Patterns
```typescript
// ✅ Test user behavior, not implementation
import { render, screen, userEvent } from '@/test/utils';

describe('NewsletterForm', () => {
  it('subscribes user to newsletter', async () => {
    const user = userEvent.setup();
    render(<NewsletterForm />);
    
    // User fills form
    await user.type(
      screen.getByLabelText(/email address/i),
      'pub@example.com'
    );
    await user.click(screen.getByRole('button', { name: /subscribe/i }));
    
    // Verify success
    expect(await screen.findByText(/thanks for subscribing/i))
      .toBeInTheDocument();
  });
  
  it('shows validation errors', async () => {
    const user = userEvent.setup();
    render(<NewsletterForm />);
    
    // Submit without email
    await user.click(screen.getByRole('button', { name: /subscribe/i }));
    
    // Verify error
    expect(screen.getByRole('alert'))
      .toHaveTextContent(/valid email required/i);
  });
});
```

### Accessibility Testing
```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

it('has no accessibility violations', async () => {
  const { container } = render(<ServiceCard service={mockService} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### MSW for API Mocking
```typescript
// src/test/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/api/newsletter', async ({ request }) => {
    const { email } = await request.json();
    
    if (!email.includes('@')) {
      return HttpResponse.json(
        { error: 'Invalid email' },
        { status: 400 }
      );
    }
    
    return HttpResponse.json({ success: true });
  }),
];
```

## 🎨 Design System Standards

### Design Token Architecture

```typescript
// ✅ Three-tier token system
const tokens = {
  // Primitive tokens
  colors: {
    orange500: '#FF6B35',
    teal700: '#2C5F5F',
    cream100: '#FFF5EB',
  },
  
  // Semantic tokens
  semantic: {
    text: {
      primary: '{colors.charcoal}',
      error: '{colors.orange500}',
      muted: '{colors.charcoal.opacity(0.6)}',
    },
    background: {
      primary: '{colors.white}',
      accent: '{colors.cream100}',
    },
  },
  
  // Component tokens
  components: {
    button: {
      primary: {
        background: '{colors.orange500}',
        text: '{colors.white}',
      },
    },
  },
};
```

### Animation System
```typescript
// ✅ Consistent, performant animations
const animations = {
  // Durations
  quick: '200ms',
  normal: '300ms',
  slow: '500ms',
  
  // Easings
  easeOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  easeInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  
  // Prefers reduced motion
  '@media (prefers-reduced-motion: reduce)': {
    '*': {
      animationDuration: '0.01ms !important',
      transitionDuration: '0.01ms !important',
    },
  },
};
```

## 🔍 SEO Strategy - Maximizing Organic Visibility

### Heading Hierarchy
```typescript
// ✅ Configurable heading levels
interface HeroProps {
  headingLevel?: 1 | 2; // Prevent multiple h1s
}

<Hero headingLevel={1} title="Main Page Title" />
<Hero headingLevel={2} title="Section Title" />
```

### Meta Component
```typescript
// ✅ Centralized meta management
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: 'Page Title | Orange Jelly',
    description: 'Under 160 characters...',
    openGraph: {
      title: 'Page Title',
      description: 'Description',
      images: ['/og-image.jpg'],
    },
    alternates: {
      canonical: 'https://www.orangejelly.co.uk/page',
    },
  };
}
```

### Structured Data
```typescript
// ✅ Add relevant schema only
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: serviceName,
      provider: {
        '@id': 'https://www.orangejelly.co.uk/#organization',
      },
      areaServed: 'United Kingdom',
      price: '62.50',
      priceCurrency: 'GBP',
    }),
  }}
/>
```

## 📋 Quality Assurance Checklist

### Before Every Commit
```bash
# Automated checks
npm run lint          # ESLint validation
npm run type-check    # TypeScript validation
npm run test          # Run tests
npm run test:coverage # Check coverage (target: 80%)
npm run build         # Build validation

# Performance checks
npm run analyze       # Bundle analysis
npm run lighthouse    # Core Web Vitals
```

### Component Checklist
- [ ] Server Component by default (client only if needed)
- [ ] TypeScript props interface exported
- [ ] Accessibility: keyboard navigable, ARIA labels
- [ ] Tests: behavior covered, accessibility tested
- [ ] Performance: memoized if needed, images optimized
- [ ] Mobile: touch targets ≥44px, responsive design

### Content Checks
- [ ] No false metrics (check against REAL Metrics section)
- [ ] Pricing is £62.50/hour plus VAT
- [ ] No claims about helping other pubs
- [ ] Real partnership language used
- [ ] Timeline is accurate (March 2019)

## 🚀 Development Workflow

### Starting a New Component
```bash
# 1. Create component with test
touch src/components/NewComponent.tsx
touch src/components/NewComponent.test.tsx

# 2. Start with failing test
# 3. Implement component
# 4. Ensure tests pass
# 5. Add to exports
```

### Component Template
```typescript
// NewComponent.tsx
import { memo } from 'react';
import { cn } from '@/lib/utils';

export interface NewComponentProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent';
  className?: string;
}

function NewComponent({ 
  children, 
  variant = 'default',
  className 
}: NewComponentProps) {
  return (
    <div
      className={cn(
        'base-styles',
        variant === 'accent' && 'accent-styles',
        className
      )}
    >
      {children}
    </div>
  );
}

// Only memo if re-renders are expensive
export default process.env.NODE_ENV === 'production' 
  ? memo(NewComponent) 
  : NewComponent;
```

### Test Template
```typescript
// NewComponent.test.tsx
import { render, screen } from '@/test/utils';
import { axe } from 'jest-axe';
import NewComponent from './NewComponent';

describe('NewComponent', () => {
  it('renders children', () => {
    render(<NewComponent>Test Content</NewComponent>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
  
  it('applies variant styles', () => {
    const { container } = render(
      <NewComponent variant="accent">Content</NewComponent>
    );
    expect(container.firstChild).toHaveClass('accent-styles');
  });
  
  it('has no accessibility violations', async () => {
    const { container } = render(
      <NewComponent>Accessible Content</NewComponent>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

## 🛠️ Common Patterns

### Error Boundary Pattern
```typescript
// ✅ Graceful error handling
<ErrorBoundary
  fallback={<ErrorFallback />}
  onError={(error, errorInfo) => {
    console.error('Component error:', error, errorInfo);
  }}
>
  <ComplexComponent />
</ErrorBoundary>
```

### Loading Pattern
```typescript
// ✅ Progressive enhancement
<Suspense fallback={<ServiceCardSkeleton />}>
  <ServiceCard service={service} />
</Suspense>
```

### Form Pattern
```typescript
// ✅ Accessible form with validation
<form onSubmit={handleSubmit} noValidate>
  <Input
    label="Pub Name"
    name="pubName"
    error={errors.pubName}
    required
    aria-describedby={errors.pubName ? 'pub-name-error' : undefined}
  />
  {errors.pubName && (
    <Text id="pub-name-error" color="error" role="alert">
      {errors.pubName}
    </Text>
  )}
  <Button type="submit" loading={isSubmitting}>
    Submit
  </Button>
</form>
```

## 🎯 QUICK REFERENCE

### Key Constants Location
- **Pricing**: `src/lib/constants.ts` - PRICING object
- **Contact**: `src/lib/constants.ts` - CONTACT object
- **Company**: `src/lib/constants.ts` - COMPANY object

### Testing Commands
```bash
npm test              # Run all tests
npm test Button       # Test specific component
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
npm run test:ui       # Vitest UI
```

### Performance Commands
```bash
npm run analyze       # Bundle analyzer
npm run lighthouse    # Lighthouse audit
npm run measure       # Custom metrics
```

### Important Utilities
- **cn()**: Class name merger (clsx + tailwind-merge)
- **urlFor()**: Sanity image URL builder
- **generateMetadata()**: SEO metadata helper

## 🏗️ Sanity CMS Configuration Guide

### CRITICAL: When Adding New Schemas to Sanity

**You MUST update THREE places** (not just two!):

1. **Create the schema file** in `sanity-studio/schemas/`
2. **Add to schema index** in `sanity-studio/schemas/index.ts`
3. **Add to menu structure** in `sanity-studio/sanity.config.ts`

### Sanity Project Details
- **Project ID**: `9brdfanc`
- **Dataset**: `production`
- **Studio URL**: https://orangejelly.sanity.studio/

### Adding a New Schema - Complete Steps

#### Step 1: Create Schema File
```typescript
// sanity-studio/schemas/yourNewSchema.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'yourSchemaName',  // This MUST match filter in menu
  title: 'Your Schema Title',
  type: 'document',
  icon: () => '📄',  // Optional but recommended
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    // ... other fields
  ]
})
```

#### Step 2: Add to Schema Index
```typescript
// sanity-studio/schemas/index.ts
import yourNewSchema from './yourNewSchema';  // Add import

export const schemaTypes = [
  // ... existing schemas
  yourNewSchema,  // Add to array
];
```

#### Step 3: Add to Menu Structure (OFTEN MISSED!)
```typescript
// sanity-studio/sanity.config.ts
structure: (S) =>
  S.list()
    .title('Content')
    .items([
      // ... existing items
      S.listItem()
        .title('Your Schema Title')
        .icon(() => '📄')  // Optional
        .child(
          S.documentList()
            .title('Your Schema Title')
            .filter('_type == "yourSchemaName"')  // MUST match schema name
        ),
    ])
```

### Sanity Commands
```bash
# Development (from sanity-studio directory)
cd sanity-studio
npm run dev          # Start local studio at http://localhost:3333

# Deployment
npm run build        # Build studio
npx sanity deploy    # Deploy to orangejelly.sanity.studio

# Schema operations
npx sanity schema list     # List deployed schemas
npx sanity documents query # Query documents

# Migration scripts (from website root)
npm run migrate:claims     # Example migration script
```

### Common Sanity Issues & Solutions

#### Issue: New schema not appearing in menu
**Cause**: Forgot to add to menu structure in sanity.config.ts
**Solution**: Add listItem to structure function (see Step 3 above)

#### Issue: "project user not found" error
**Cause**: Invalid or expired API token
**Solution**: 
1. Go to https://www.sanity.io/manage/project/9brdfanc/api
2. Create new token with "Editor" permissions
3. Update SANITY_API_TOKEN in .env.local

#### Issue: Schema changes not reflecting
**Solution**: 
```bash
cd sanity-studio
rm -rf dist          # Clear build cache
npm run build        # Rebuild
npx sanity deploy    # Deploy
```
Then hard refresh browser (Cmd+Shift+R)

#### Issue: Cannot query new schema
**Cause**: Schema deployed but no documents created
**Solution**: Create at least one document through Studio UI

#### Issue: Schema shows {"error": {}} in Studio
**Possible Causes & Solutions**:
1. **Invalid icon definition in schema**
   - ❌ Wrong: `icon: () => '📊'` in schema file
   - ✅ Right: Add icon in menu structure only
2. **Invalid field conditions**
   - Check `hidden` conditions don't use `!value` for numbers (0 is falsy)
   - Use explicit checks: `value === undefined || value === null`
3. **Preview configuration issues**
   - Ensure preview doesn't reference undefined fields
   - Add fallbacks: `title || 'Untitled'`
4. **Browser cache**
   - Hard refresh (Cmd+Shift+R)
   - Clear local storage for Sanity Studio domain

#### Issue: "Failed to execute 'createElement' on 'Document'" error
**Cause**: Preview configuration trying to use invalid characters as media
**Common mistake**: Using emoji or special characters in preview media
```typescript
// ❌ Wrong - causes createElement error
prepare({ title, active }) {
  return {
    title,
    media: active ? '✓' : '✗'  // Invalid!
  }
}

// ✅ Right - no media or use React component
prepare({ title, active }) {
  return {
    title,
    subtitle: active ? 'Active' : 'Inactive'
  }
}
```
**Solution**: Remove media property or use proper React component

#### Issue: "Missing keys - Some items in the list are missing their keys"
**Cause**: Array items created without required `_key` property
**Common in**: Migration scripts that create arrays
```typescript
// ❌ Wrong - missing _key in array items
timeline: [
  {
    date: 'March 2019',
    title: 'Event'
  }
]

// ✅ Right - include _key in every array item
timeline: [
  {
    _key: 'timeline_0',
    date: 'March 2019',
    title: 'Event'
  }
]
```
**Solution**: 
1. Fix existing data: Run `npm run fix:sanity-keys`
2. Prevent in new migrations: Always add `_key` to array items
3. Use unique keys: `_key: 'prefix_' + index` or `_key: 'prefix_' + Date.now() + '_' + index`

### Sanity Menu Structure Pattern

The Orange Jelly Sanity Studio uses a custom menu structure:

```
Content
├── Blog Posts
├── Services  
├── Case Studies
├── ─────────── (divider)
├── Authors
├── Categories
├── FAQs
├── Claims & Metrics
├── ─────────── (divider)
└── Site Settings (singleton)
```

### Key Files Reference
- **Main config**: `sanity-studio/sanity.config.ts`
- **CLI config**: `sanity-studio/sanity.cli.ts`
- **Schema index**: `sanity-studio/schemas/index.ts`
- **Individual schemas**: `sanity-studio/schemas/*.ts`

### Schema Best Practices
1. **Naming**: Use camelCase for schema names
2. **Icons**: Add icons ONLY in menu structure, not schema definition
   - ✅ Right: `.icon(() => '📊')` in sanity.config.ts menu
   - ❌ Wrong: `icon: () => '📊'` in schema defineType
3. **Validation**: Add required fields validation
4. **Preview**: Configure preview for list display with fallbacks
5. **Initial values**: Set sensible defaults
6. **Hidden conditions**: Use explicit null/undefined checks for numbers

### Singleton Documents
For settings/config that should have only one instance:
```typescript
S.listItem()
  .title('Site Settings')
  .child(
    S.editor()
      .schemaType('siteSettings')
      .documentId('siteSettings')  // Fixed ID
  )
```

### Remember: THREE Places!
Every time you add a schema:
1. ✅ Schema file created
2. ✅ Added to schemas/index.ts
3. ✅ Added to menu in sanity.config.ts

Missing any of these = schema won't work properly!

## 🤝 Getting Help

### When You're Unsure
1. **Check test examples**: Look at existing component tests
2. **Review similar components**: Find patterns in the codebase
3. **Run accessibility audit**: Use axe DevTools
4. **Test on real devices**: Not just browser DevTools
5. **Measure performance**: Use Lighthouse and Web Vitals

### Resources
- [React Docs (2025)](https://react.dev)
- [Next.js 15 Docs](https://nextjs.org/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Testing Library](https://testing-library.com)
- [Web Vitals](https://web.dev/vitals/)

Remember: You're building something that genuinely helps struggling licensees. Every decision should support that mission.

---

**Last Updated**: January 2025  
**Version**: 5.0  
**Status**: ACTIVE - Your trusted development guide

## 📝 Creating Blog Articles - Complete Guide

### Creating a New Blog Article in Sanity

When creating new blog articles for the Licensees Guide, follow this comprehensive process to ensure proper formatting, SEO optimization, and visual consistency.

#### 1. Article Schema Requirements

Every blog article MUST have these fields properly filled:

**Essential Fields:**
- `title`: Compelling, problem-focused title (use questions when appropriate)
- `slug`: URL-friendly version of title (auto-generated from title)
- `status`: Set to "draft" initially, "scheduled" for future publication, or "published" when ready
- `publishedDate`: Set to Monday 10:00 AM for consistency (weekly publishing pattern)
- `excerpt`: 150-160 characters summarizing the article's value proposition
- `category`: Select appropriate category or create new one if needed
- `author`: Reference to Peter Pitcher (should already exist)

**SEO & Voice Search Fields:**
- `quickAnswer`: **CRITICAL** - 40-60 word direct answer to the title question
- `voiceSearchQueries`: Array of natural language questions users might ask
- `quickStats`: 3-4 key statistics with labels and values
- `faqs`: Minimum 3 FAQs with question, answer, and isVoiceOptimized flag
- `seo.metaDescription`: If different from excerpt
- `seo.keywords`: Focus keywords for the article

**Content Structure:**
- Use Portable Text blocks for content
- Structure with clear H2 and H3 headings
- Include bullet points and numbered lists for scannability
- Add comparison tables where relevant
- Keep paragraphs short (2-3 sentences max)

#### 2. Creating the Featured Image

**ALWAYS create a custom SVG image for each article:**

```typescript
// Template for creating article SVG
const articleSVG = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <!-- Background gradient -->
  <defs>
    <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FF6B35;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#F7931E;stop-opacity:1" />
    </linearGradient>
    <pattern id="pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
      <circle cx="30" cy="30" r="2" fill="white" opacity="0.1"/>
    </pattern>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg-gradient)"/>
  <rect width="1200" height="630" fill="url(#pattern)"/>
  
  <!-- Dark overlay for text contrast -->
  <rect width="1200" height="630" fill="black" opacity="0.3"/>
  
  <!-- Main Title -->
  <text x="600" y="340" font-family="Arial, sans-serif" font-size="56" font-weight="bold" text-anchor="middle" fill="white">
    ${title}
  </text>
  
  <!-- Subtitle -->
  <text x="600" y="400" font-family="Arial, sans-serif" font-size="32" text-anchor="middle" fill="white" opacity="0.9">
    ${subtitle}
  </text>
  
  <!-- Bottom branding -->
  <text x="600" y="550" font-family="Arial, sans-serif" font-size="20" text-anchor="middle" fill="white" opacity="0.7">
    The Licensee's Guide | Orange Jelly
  </text>
</svg>`;
```

**Steps to create the image:**
1. Save SVG to `/public/images/blog/{article-slug}.svg`
2. Add mapping to `/src/lib/blog-images.ts` in the imageMap object
3. Never use the generic default.svg for new articles

#### 3. Content Writing Guidelines

**Tone & Style:**
- **Encouraging and solution-focused** - Never doom and gloom
- **Personal and authentic** - Write as Peter, share real experiences
- **Practical and actionable** - Every section should have clear takeaways
- **Empathetic** - Acknowledge the struggle, provide the solution

**Content Structure Template:**

```markdown
## Opening Hook (2-3 paragraphs)
- Start with relatable scenario or shocking statistic
- Acknowledge the problem
- Promise the solution

## The Real Problem (It's Not What You Think)
- Reframe the issue
- Share personal experience
- Build hope

## Main Solutions (3-5 sections)
### Solution 1 Name
- Clear explanation
- Step-by-step process
- Real example with numbers
- Quick win they can implement today

### Solution 2 Name
[Continue pattern]

## Your Action Plan
### Today:
- 3 immediate actions

### This Week:
- 3 short-term goals

### This Month:
- 3 medium-term objectives

## The Results You Can Expect
- Realistic timeline
- Specific metrics
- Success indicators

## Bottom Line
- Encouraging summary
- Call to action
- Reminder of support available
```

#### 4. Publishing Checklist

Before publishing any article:

- [ ] Custom SVG created and added to `/public/images/blog/`
- [ ] Image mapping added to `/src/lib/blog-images.ts`
- [ ] All required schema fields completed
- [ ] Quick Answer is exactly 40-60 words
- [ ] Minimum 3 FAQs added
- [ ] Content is 1,500-3,000 words
- [ ] All statistics are verified and accurate
- [ ] Tone is encouraging and solution-focused
- [ ] Published date set to Monday 10:00 AM
- [ ] Category correctly assigned
- [ ] Author set to Peter Pitcher

#### 5. Technical Implementation

When creating articles programmatically:

```typescript
const articleDoc = {
  _type: 'blogPost',
  title: 'Article Title',
  slug: { current: 'article-slug' },
  status: 'draft', // Start as draft
  publishedDate: '2025-08-18T10:00:00Z', // Monday 10am
  excerpt: 'Brief description under 160 chars',
  quickAnswer: 'Direct 40-60 word answer to the title question',
  
  // Content as Portable Text blocks
  content: [
    {
      _type: 'block',
      _key: `block_${Date.now()}_0`,
      style: 'normal',
      children: [{
        _type: 'span',
        _key: `span_${Date.now()}_0`,
        text: 'Paragraph text'
      }]
    }
  ],
  
  // Arrays need _key for each item
  quickStats: [
    {
      _key: `stat_${Date.now()}_0`,
      label: 'Metric Name',
      value: 'Value',
      highlight: false
    }
  ],
  
  faqs: [
    {
      _key: `faq_${Date.now()}_0`,
      question: 'Natural question?',
      answer: 'Direct answer first sentence. Details follow.',
      isVoiceOptimized: true
    }
  ],
  
  // References
  category: { _type: 'reference', _ref: 'category-id' },
  author: { _type: 'reference', _ref: 'author-id' },
  
  // SEO
  seo: {
    metaDescription: 'Optional if different from excerpt',
    keywords: ['keyword1', 'keyword2']
  }
};
```

**Important Notes:**
- All array items MUST have unique `_key` properties
- Use timestamps in keys to ensure uniqueness
- Content blocks need proper structure with children
- References use `_type: 'reference'` and `_ref` to ID

## 📝 CHANGELOG

### Version 5.3 (January 2025)
- **SCHEDULED PUBLISHING**: Implemented native Sanity scheduled publishing for blog posts
- Added scheduled publishing utilities in `/src/lib/scheduled-publishing.ts`
- Created API endpoint `/api/publish-scheduled` for monitoring scheduled posts
- Updated GROQ queries to handle scheduled posts properly
- Documented scheduled publishing workflow and best practices

### Version 5.2 (January 2025)
- **CRITICAL UPDATE**: Documented that ALL blog content is in Sanity CMS, not markdown files
- Added warning about obsolete markdown blog files
- Clarified blog content management through Sanity Studio
- Updated "Where to Find Things" section with blog location

### Version 5.1 (August 2025)
- Added comprehensive Sanity CMS Configuration Guide
- Documented the THREE places requirement for new schemas
- Added common Sanity issues and solutions
- Added menu structure documentation
- Included troubleshooting steps for schema deployment

### Version 5.0 (January 2025)
- Added comprehensive 2025 best practices research
- Enhanced component architecture with Server/Client guidelines
- Added modern testing standards with Vitest and Testing Trophy
- Updated performance targets with INP metric
- Added React Compiler guidance
- Enhanced TypeScript patterns with discriminated unions
- Added accessibility testing patterns
- Improved design token architecture
- Added component templates with tests

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
- Added mandatory component usage rules
- Added comprehensive technical standards

### Version 1.0 (March 2024)
- Initial documentation