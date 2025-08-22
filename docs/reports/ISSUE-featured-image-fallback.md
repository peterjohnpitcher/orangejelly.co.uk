# Featured Image Fallback Issue - Pub Health Check Article

## Problem Description
The Pub Health Check article (`pub-health-check-essential-fundamentals-licensee-success`) is displaying the fallback SVG image (`/images/blog/pub-health-check.svg`) instead of the actual Sanity CDN image, even though the image exists in Sanity.

## Current State

### Sanity Asset Details
- **Asset URL**: `https://cdn.sanity.io/images/9brdfanc/production/573831201c6dbda6b8abca0b64370a4935199989-1200x630.svg`
- **Asset Reference**: `image-573831201c6dbda6b8abca0b64370a4935199989-1200x630-svg`
- **Status**: Successfully uploaded and visible in Sanity Studio

### User Reports
1. "I've got the old image showing now from this link..."
2. Image shows correctly in Sanity Studio
3. Website displays fallback SVG instead of Sanity image
4. Issue persists even in incognito mode (not a cache issue)

## Technical Analysis

### Image Pipeline Flow
1. **Sanity Storage**: Image stored as asset with reference
2. **GROQ Query**: Expands `featuredImage.asset->` to get URL
3. **normalizeSanityPost**: Uses `urlFor()` to build image URL
4. **BlogPostCard**: Uses `getBlogImageSrc()` to get final URL
5. **OptimizedImage**: Renders the image

### Key Files Involved
- `/src/lib/content-source.ts:63` - `urlFor(post.featuredImage).url()`
- `/src/lib/sanity.queries.ts:174-179` - GROQ query with asset expansion
- `/src/lib/blog-images.ts` - Fallback image logic
- `/src/components/blog/BlogPostCard.tsx:49` - Image rendering

## Hypothesis

The issue appears to be in the `normalizeSanityPost` function where it tries to use `urlFor()` on the featuredImage. The function may be failing silently and falling back to the local SVG path.

### Potential Causes
1. **urlFor() not handling assets correctly**: The `urlFor()` function expects specific image object structure
2. **Asset expansion issue**: GROQ query might not be properly expanding the asset reference
3. **Fallback logic too aggressive**: Lines 67-72 in content-source.ts always set a fallback

## Discovery Tasks

### 1. Test urlFor() Function
```typescript
// Check if urlFor() works with the asset structure
const testAsset = {
  asset: {
    _ref: 'image-573831201c6dbda6b8abca0b64370a4935199989-1200x630-svg',
    _type: 'reference'
  }
};
console.log(urlFor(testAsset).url());
```

### 2. Verify GROQ Query Response
```groq
*[_type == "blogPost" && slug.current == "pub-health-check-essential-fundamentals-licensee-success"][0] {
  featuredImage {
    asset->{
      _id,
      url
    }
  }
}
```

### 3. Check normalizeSanityPost Logic
- Line 62: Check if `post.featuredImage?.asset` exists
- Line 63: Test if `urlFor()` returns a valid URL
- Lines 67-72: Verify fallback is only used when no Sanity image exists

### 4. Test getBlogImageSrc Function
```typescript
// Test with actual Sanity data structure
const sanityImage = {
  asset: {
    _id: 'image-573831201c6dbda6b8abca0b64370a4935199989-1200x630-svg',
    url: 'https://cdn.sanity.io/images/9brdfanc/production/573831201c6dbda6b8abca0b64370a4935199989-1200x630.svg'
  }
};
getBlogImageSrc(sanityImage, 'pub-health-check-essential-fundamentals-licensee-success');
```

## Proposed Solution

### Option 1: Fix urlFor() Usage
```typescript
// In normalizeSanityPost function
if (post.featuredImage?.asset?.url) {
  // Use the URL directly from the expanded asset
  featuredImageUrl = post.featuredImage.asset.url;
} else if (post.featuredImage?.asset?._ref) {
  // Use urlFor() only when we have a reference
  featuredImageUrl = urlFor(post.featuredImage).url();
}
```

### Option 2: Simplify to Direct URL Usage
Since GROQ already expands the asset to include the URL, we can skip urlFor() entirely:
```typescript
featuredImageUrl = post.featuredImage?.asset?.url || `/images/blog/${post.slug}.svg`;
```

## Impact
- Affects all blog posts with Sanity images
- Currently showing fallback SVGs instead of actual images
- SEO impact: Wrong images in social shares
- User experience: Generic images instead of custom ones

## Priority
**HIGH** - User-facing issue affecting content display and SEO

## Next Steps
1. Run discovery scripts to confirm hypothesis
2. Test proposed solutions locally
3. Deploy fix
4. Verify all blog posts display correct images
5. Clear any CDN caches if needed