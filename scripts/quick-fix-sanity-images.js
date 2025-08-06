#!/usr/bin/env node

// Quick fix to stop Sanity Studio crashes by removing invalid image strings

const fs = require('fs');
const path = require('path');

console.log('Creating patches to fix Sanity Studio crashes...\n');

// Create patches directory
const patchDir = path.join(__dirname, 'sanity-patches');
if (!fs.existsSync(patchDir)) {
  fs.mkdirSync(patchDir);
}

// Patch 1: Fix author document by removing string image field
const authorPatch = {
  _id: 'author-peter-pitcher',
  _type: 'author',
  name: 'Peter Pitcher',
  bio: 'Licensee of The Anchor in Stanwell Moor and founder of Orange Jelly. Helping struggling pubs thrive with proven strategies from real experience.',
  role: 'Founder & Licensee'
  // Removed image field - add manually in Studio later
};

// Write author patch
fs.writeFileSync(
  path.join(patchDir, 'author-patch.ndjson'),
  JSON.stringify(authorPatch)
);

console.log('✅ Created author patch (removes invalid image field)');

// Patch 2: Create mutations to unset all featuredImage fields in blog posts
const blogPatches = [];

// Generate patches for all blog posts
const blogSlugs = [
  'beat-chain-pubs',
  'christmas-pub-promotion-ideas',
  'compete-with-wetherspoons',
  'content-marketing-ideas-pubs',
  'email-marketing-pub-retention',
  'facebook-marketing-local-pubs',
  'fill-empty-pub-tables',
  'how-to-run-successful-pub-events',
  'instagram-marketing-for-pubs',
  'live-music-events-for-pubs',
  'local-pub-marketing',
  'low-budget-pub-marketing-ideas',
  'midweek-pub-offers-that-work',
  'premium-pub-positioning',
  'profitable-pub-food-menu-ideas',
  'pub-differentiation-strategies',
  'pub-empty-tuesday-nights',
  'pub-refurbishment-on-budget',
  'quiet-monday-night-promotions',
  'quiz-night-ideas',
  'recession-proof-pub-strategies',
  'seasonal-pub-events-calendar',
  'social-media-strategy-for-pubs',
  'summer-pub-event-ideas',
  'why-is-my-pub-empty'
];

// Create a mutation to unset featuredImage for all blogs
const mutations = blogSlugs.map(slug => ({
  patch: {
    id: `blogPost-${slug}`,
    unset: ['featuredImage']
  }
}));

// Write blog patches as mutations
fs.writeFileSync(
  path.join(patchDir, 'blog-mutations.json'),
  JSON.stringify({ mutations }, null, 2)
);

console.log(`✅ Created blog patches (removes invalid featuredImage from ${blogSlugs.length} posts)`);

console.log('\n📋 TO FIX SANITY STUDIO:');
console.log('\n1. First, apply the author fix:');
console.log('   cd sanity-studio');
console.log('   npx sanity dataset import ../scripts/sanity-patches/author-patch.ndjson production --replace');

console.log('\n2. Then, remove invalid featured images using the API:');
console.log('   You need to get a write token from: https://www.sanity.io/manage/project/9brdfanc/api');
console.log('   Then run:');
console.log(`   curl -X POST "https://9brdfanc.api.sanity.io/v2021-06-07/data/mutate/production" \\
     -H "Content-Type: application/json" \\
     -H "Authorization: Bearer YOUR_TOKEN" \\
     -d @scripts/sanity-patches/blog-mutations.json`);

console.log('\n3. After these fixes, Sanity Studio should work again!');
console.log('   You can then upload images properly through the Media library.');

// Alternative: Create individual NDJSON patches for blogs
console.log('\n🔧 Creating alternative NDJSON patches...');

// Write individual blog patches without featuredImage
const blogPatches2 = [];
blogSlugs.forEach(slug => {
  // We'll just create a patch to unset the field
  blogPatches2.push(JSON.stringify({
    _id: `blogPost-${slug}`,
    _type: 'patch',
    patch: {
      unset: ['featuredImage']
    }
  }));
});

fs.writeFileSync(
  path.join(patchDir, 'blog-patches.ndjson'),
  blogPatches2.join('\n')
);

console.log('\nAlternative fix (if API method doesn\'t work):');
console.log('   npx sanity dataset import ../scripts/sanity-patches/blog-patches.ndjson production');