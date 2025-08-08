# Related Links Migration Guide

## Overview
This guide documents the migration of hardcoded related links from `/src/components/RelatedLinks.tsx` to Sanity CMS.

## Migration Script
The migration script `/scripts/migrate-related-links.ts` extracts all 9 link clusters and prepares them for import into Sanity.

### Link Clusters Migrated
1. **about** - About page related links (3 links)
2. **quickWins** - Quick wins and consultations (3 links)
3. **emptyPub** - Empty pub recovery solutions (3 links)
4. **competition** - Beat the competition links (3 links)
5. **budget** - Budget and ROI related links (3 links)
6. **time** - Time-saving solutions (3 links)
7. **quickStart** - Quick start CTAs (3 links)
8. **services** - Services page links (3 links)
9. **contact** - Contact page links (3 links)

Total: 9 clusters, 27 links

## Schema Structure
Each related links document in Sanity contains:
- `cluster`: Unique identifier for the cluster
- `title`: Display title for the section
- `links`: Array of link objects containing:
  - `text`: Link title/text
  - `href`: URL/path
  - `description`: Optional description
  - `icon`: Emoji or icon identifier
  - `external`: Boolean for external links
  - `highlight`: Boolean for emphasized links
- `order`: Display order

## Running the Migration

### Step 1: Generate NDJSON file
```bash
npm run migrate:related-links
```
This creates `scripts/related-links-import.ndjson`

### Step 2: Import to Sanity (Manual)
```bash
cd sanity-studio
sanity dataset import ../scripts/related-links-import.ndjson production --replace
```

### Alternative: Direct Import
```bash
npm run migrate:related-links -- --direct
```
This will directly create/replace documents in Sanity (requires SANITY_API_TOKEN in .env.local)

## Updating Components

### Before (Hardcoded)
```tsx
// RelatedLinks.tsx
export const linkClusters = {
  about: [
    { title: "Our Services", href: "/services", emoji: "🚀" },
    // ...
  ]
}

// Usage
const links = linkClusters.about
```

### After (From Sanity)
```tsx
// Component using Sanity data
import { getRelatedLinksCluster } from '@/lib/sanity-related-links'

const cluster = await getRelatedLinksCluster('about')
const links = cluster?.links || []
```

## Helper Functions
Located in `/src/lib/sanity-related-links.ts`:
- `getRelatedLinksCluster(clusterId)` - Fetch single cluster
- `getRelatedLinksClusters(clusterIds[])` - Fetch multiple clusters
- `getAllRelatedLinksClusters()` - Fetch all clusters
- `transformClusterToLegacyFormat(cluster)` - Transform to match old format

## Verification Steps
1. Run the migration script
2. Check Sanity Studio to verify all clusters are created
3. Test fetching data using the helper functions
4. Update RelatedLinks component to use Sanity data
5. Verify all pages still display related links correctly

## Rollback
If needed, the original hardcoded data is preserved in:
- Git history of `/src/components/RelatedLinks.tsx`
- The migration script itself contains all original data

## Notes
- Each cluster has a unique document ID: `relatedLinks-{clusterId}`
- The schema supports ordering via the `order` field
- Links can be highlighted using the `highlight` boolean field
- External links open in new tabs when `external` is true