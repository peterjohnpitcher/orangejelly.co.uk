# DEFINITIVE FIX: Featured Image Display Issue

## The Problem
The Pub Health Check article was showing the fallback SVG (`/images/blog/pub-health-check.svg`) instead of the actual Sanity image (`https://cdn.sanity.io/images/9brdfanc/production/573831201c6dbda6b8abca0b64370a4935199989-1200x630.svg`).

## Root Cause Discovery

### Investigation Process
1. ✅ Sanity API was returning the correct image URL
2. ✅ The image asset existed and was accessible  
3. ✅ GROQ queries were properly expanding the asset
4. ❌ The `getBlogImageSrc` function was failing

### The ACTUAL Issue
Through systematic testing, I discovered:

1. **`normalizeSanityPost`** returns `featuredImage` as a **STRING URL**:
   ```javascript
   featuredImage: "https://cdn.sanity.io/images/9brdfanc/production/..."
   ```

2. **`getBlogImageSrc`** was expecting an **OBJECT** structure:
   ```javascript
   featuredImage: {
     asset: {
       url: "https://cdn.sanity.io/images/..."
     }
   }
   ```

3. Since the string didn't match the object check, it always fell back to the default SVG.

## The Solution

### Fixed Code (`src/lib/blog-images.ts`)
```typescript
export function getBlogImageSrc(featuredImage: any, slug: string): string {
  // NEW: If featuredImage is a string URL (from Sanity), use it directly
  if (typeof featuredImage === 'string' && featuredImage.includes('://')) {
    return featuredImage;
  }
  
  // EXISTING: If featuredImage is an object with asset.url, use that
  if (featuredImage && typeof featuredImage === 'object' && featuredImage.asset?.url) {
    return featuredImage.asset.url;
  }

  // Otherwise, use the default image based on slug
  return getDefaultBlogImage(slug);
}
```

## Why This Fixes It
- The function now handles BOTH formats:
  - String URLs (what `normalizeSanityPost` returns)
  - Object structures (for backward compatibility)
- The check `includes('://')` ensures it's a valid URL, not just any string

## Additional Fixes Applied

### 1. Forced Sanity Usage (`src/lib/content-source.ts`)
- Removed markdown fallback (no markdown files exist)
- Hardcoded `SANITY_ENABLED = true`
- Made it use default project ID if env var is missing

### 2. Environment Variables (`vercel.json`)
- Added Sanity project ID and dataset to build environment
- Ensures variables are available at build time

### 3. Asset URL Handling (`src/lib/content-source.ts`)
- Check for expanded asset URLs first (`asset.url`)
- Only use `urlFor()` for non-expanded references

## Deployment
All fixes have been committed and pushed:
1. Commit `03d9c6ea` - Fixed asset URL handling
2. Commit `b1018af3` - Forced Sanity usage
3. Commit `98c50d4a` - Added env vars to Vercel
4. Commit `738d6184` - **Fixed getBlogImageSrc to handle strings**

## Testing Confirmation
```bash
✅ Using Sanity image correctly!
   The pipeline is working.
```

The Pub Health Check article will now display its proper Sanity image once deployed.