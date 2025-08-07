# Claims Migration Plan to Sanity CMS

## Overview
This document outlines the plan to migrate all hardcoded claims to Sanity CMS for centralized management and consistency.

## Phase 1: Setup (Complete)
✅ Created `claims` schema in Sanity
✅ Added claims to Sanity schema index
✅ Created migration script with approved claims
✅ Created utility functions for fetching claims
✅ Updated TrustBadges component as example

## Phase 2: Component Updates Needed

### High Priority Components
These components have hardcoded claims that need updating:

1. **Footer.tsx & SuperFooter.tsx**
   - Current: "Save At Least 5 Hours a Week"
   - Update to: Use `hoursSavedWeekly` claim from Sanity

2. **HomePage.tsx**
   - Multiple hardcoded metrics (25 hours, 300 contacts, etc.)
   - Update to: Fetch claims in page component and pass down

3. **ServiceComparison.tsx**
   - "30-day money-back guarantee" hardcoded
   - Update to: Use `moneyBack` claim

4. **ROICalculator.tsx**
   - Hardcoded calculations and claims
   - Update to: Use performance claims for calculations

5. **SocialProof.tsx**
   - Fallback testimonials with specific numbers
   - Update to: Show loading/error state instead

### Page Components
These pages have inline claims:

1. **empty-pub-solutions/page.tsx**
   - "25-40% increase in covers within 30 days"
   - "£30-50 lost revenue per empty chair"
   - Update timeline claims

2. **quiet-midweek-solutions/page.tsx**
   - "200% increase in midweek revenue"
   - "30-50% increase in midweek covers"
   - Update to approved percentages

3. **pub-rescue/page.tsx**
   - Response time claims
   - Financial recovery claims

4. **services/ServicesPage.tsx**
   - Various service-specific claims
   - Training hour claims

5. **about/AboutPage.tsx**
   - Partnership claims about Billy and Peter
   - Business value claims

## Phase 3: Constants File Update

**src/lib/constants.ts** needs major refactoring:
- Remove all hardcoded claims
- Keep only structural constants (URLs, navigation, etc.)
- Create helper to fetch commonly used claims

## Phase 4: Blog Content

Blog posts in `/content/blog/` contain many claims that should be reviewed:
- Time investment estimates (seem reasonable per your feedback)
- Performance percentages (some need updating)
- Consider adding disclaimer about results varying

## Implementation Strategy

### 1. Create Claim Fetching Hook
```typescript
// src/hooks/useClaims.ts
export function useClaims(keys?: string[]) {
  const [claims, setClaims] = useState<Record<string, Claim>>({});
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetchClaims() {
      const data = keys 
        ? await getClaimsByKeys(keys)
        : await getAllClaims();
      setClaims(data);
      setIsLoading(false);
    }
    fetchClaims();
  }, [keys]);
  
  return { claims, isLoading };
}
```

### 2. Update Components Pattern
```typescript
// Example: Footer.tsx
export default function Footer() {
  const { claims, isLoading } = useClaims(['hoursSavedWeekly']);
  
  if (isLoading) {
    return <FooterSkeleton />;
  }
  
  return (
    <footer>
      <Text>{claims.hoursSavedWeekly?.claim || 'Loading...'}</Text>
    </footer>
  );
}
```

### 3. Server Component Pattern
```typescript
// For pages and server components
export default async function HomePage() {
  const claims = await getCommonClaims();
  
  return <HomePageContent claims={claims} />;
}
```

## Error Handling Philosophy

Per your guidance: "I'd rather be honest about an error than show bad data"

1. **No Fallback Data**: Remove all hardcoded fallbacks
2. **Loading States**: Show skeletons or loading indicators
3. **Error Messages**: Clear, honest error states
4. **Graceful Degradation**: Components should still function without claims

## Migration Order

1. **Week 1**: Core components (Footer, Navigation, Homepage)
2. **Week 2**: Service pages and calculators
3. **Week 3**: Landing pages and specialized components
4. **Week 4**: Blog content review and updates

## Testing Strategy

1. Create test suite for claim fetching
2. Verify all claims render correctly
3. Test error states and loading states
4. Performance testing (caching strategy)

## Rollback Plan

1. Keep current hardcoded values in comments
2. Feature flag for gradual rollout
3. Monitoring for Sanity API failures

## Success Criteria

- ✅ All claims managed in one place
- ✅ No hardcoded claims in components
- ✅ Proper error handling throughout
- ✅ Billy and Peter's partnership properly highlighted
- ✅ All claims match approved values
- ✅ Easy to update claims without code changes

## Next Steps

1. Run migration script: `npm run migrate:claims`
2. Start with Footer/SuperFooter components
3. Move through high-priority components
4. Update pages systematically
5. Final review and testing

This migration will ensure consistency across the site and make future updates much easier.