#!/usr/bin/env node

// Export blog posts, remove featuredImage fields, and create import file

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Fixing blog posts to remove invalid featuredImage fields...\n');

// Step 1: Export all blog posts
console.log('1. Exporting blog posts from Sanity...');
const exportCmd = `cd sanity-studio && npx sanity documents query '*[_type == "blogPost"]{_id, _type, _rev, ...}' --dataset production --pretty`;

try {
  const blogPosts = execSync(exportCmd, { encoding: 'utf8' });
  const posts = JSON.parse(blogPosts);
  
  console.log(`   ✅ Exported ${posts.length} blog posts`);
  
  // Step 2: Remove featuredImage field from each post
  console.log('\n2. Removing featuredImage fields...');
  const fixedPosts = posts.map(post => {
    const { featuredImage, ...postWithoutImage } = post;
    return postWithoutImage;
  });
  
  // Step 3: Create NDJSON import file
  console.log('\n3. Creating import file...');
  const ndjsonContent = fixedPosts.map(post => JSON.stringify(post)).join('\n');
  const outputPath = path.join(__dirname, 'fixed-blog-posts.ndjson');
  fs.writeFileSync(outputPath, ndjsonContent);
  
  console.log(`   ✅ Created ${outputPath}`);
  console.log(`   📝 Contains ${fixedPosts.length} blog posts without featuredImage fields`);
  
  console.log('\n✅ DONE! To apply the fix:');
  console.log('   cd sanity-studio');
  console.log('   npx sanity dataset import ../scripts/fixed-blog-posts.ndjson production --replace');
  console.log('\n⚠️  This will replace all blog posts with versions that don\'t have featuredImage fields.');
  console.log('   After importing, Sanity Studio should work again!');
  
} catch (error) {
  console.error('Error exporting blog posts:', error.message);
  console.log('\nAlternative: Manually run these commands:');
  console.log('1. Export: cd sanity-studio && npx sanity dataset export production backup.tar.gz');
  console.log('2. Extract and fix the data manually');
  console.log('3. Import: npx sanity dataset import fixed-data.ndjson production --replace');
}