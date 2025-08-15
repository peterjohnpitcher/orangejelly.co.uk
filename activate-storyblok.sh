#!/bin/bash

# Orange Jelly - Activate Storyblok for Blogs
# Run this script to switch from Sanity to Storyblok for blog content

echo "🔄 Activating Storyblok for blog content..."

# Backup current blog pages
cp src/app/licensees-guide/[slug]/page.tsx src/app/licensees-guide/[slug]/page-sanity-backup.tsx
cp src/app/licensees-guide/page.tsx src/app/licensees-guide/page-sanity-backup.tsx

# Activate Storyblok versions
cp src/app/licensees-guide/[slug]/page-storyblok.tsx src/app/licensees-guide/[slug]/page.tsx
cp src/app/licensees-guide/page-storyblok.tsx src/app/licensees-guide/page.tsx

echo "✅ Storyblok activated for blog content!"
echo ""
echo "Next steps:"
echo "1. Run 'npm run dev' to test locally"
echo "2. Visit http://localhost:3000/licensees-guide"
echo "3. If everything works, deploy to production"
echo ""
echo "To revert back to Sanity:"
echo "cp src/app/licensees-guide/[slug]/page-sanity-backup.tsx src/app/licensees-guide/[slug]/page.tsx"
echo "cp src/app/licensees-guide/page-sanity-backup.tsx src/app/licensees-guide/page.tsx"
